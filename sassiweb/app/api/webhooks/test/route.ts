// app/api/webhooks/test/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Test webhook received");
  return NextResponse.json({ success: true, message: "Test webhook received" });
}

export async function GET(req: Request) {
  console.log("Test webhook GET received");
  return NextResponse.json({ success: true, message: "Test webhook GET received" });
}