import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { createTeamApplicationCheckoutSession } from "@/lib/stripe";
import crypto from 'crypto';

// Schema for team application
const teamApplicationSchema = z.object({
  department: z.string().min(1, "Department is required"),
  motivation: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to submit a team application" },
        { status: 401 }
      );
    }
    
    // Check if user is already payment verified (skip payment if already verified)
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        paymentVerified: true,
      },
    });
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = teamApplicationSchema.parse(body);
    
    // Check if user already has a pending application
    const existingApplication = await prisma.teamApplication.findFirst({
      where: {
        userId: session.user.id,
        status: "PENDING",
      },
    });
    
    if (existingApplication) {
      return NextResponse.json(
        { error: "You already have a pending team application" },
        { status: 400 }
      );
    }
    
    // Create the team application
    const application = await prisma.teamApplication.create({
      data: {
        department: validatedData.department,
        motivation: validatedData.motivation || "",
        userId: session.user.id,
      },
    });
    
    // If user has already paid, return success
    if (user?.paymentVerified) {
      return NextResponse.json({
        application,
        paymentRequired: false
      }, { status: 201 });
    }
    
    // Create a Stripe checkout session for payment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/dashboard?membership=success`;
    const cancelUrl = `${baseUrl}/join/team?cancelled=true`;
    
    const stripeSession = await createTeamApplicationCheckoutSession({
      userId: session.user.id,
      department: validatedData.department,
      successUrl,
      cancelUrl
    });
    
    // Create a payment record
    const payment = await prisma.$executeRaw`
      INSERT INTO "StripePayment" (
        id, "stripeSessionId", amount, currency, status,
        "paymentType", "userId", "teamApplicationId", "createdAt", "updatedAt"
      )
      VALUES (
        ${crypto.randomUUID()}, ${stripeSession.id}, 5.0, 'eur', 'PENDING',
        'TEAM_APPLICATION', ${session.user.id}, ${application.id}, now(), now()
      )
      RETURNING id
    `;
    
    // Get the payment ID
    const paymentResult = await prisma.$queryRaw`
      SELECT id FROM "StripePayment" WHERE "stripeSessionId" = ${stripeSession.id}
    `;
    const paymentId = Array.isArray(paymentResult) && paymentResult.length > 0
      ? paymentResult[0].id
      : null;
    
    // Update team application with payment ID
    if (paymentId) {
      await prisma.$executeRaw`
        UPDATE "TeamApplication"
        SET "paymentId" = ${paymentId}
        WHERE id = ${application.id}
      `;
    }
    
    // Return the checkout URL
    return NextResponse.json({
      application,
      paymentRequired: true,
      checkoutUrl: stripeSession.url
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error creating team application:", error);
    return NextResponse.json(
      { error: "Failed to create team application" },
      { status: 500 }
    );
  }
}