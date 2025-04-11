import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email notification for contact form submission
 */
export async function sendContactFormEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'SASSI Contact Form <contact@sassimilan.com>',
      to: 'support@sassimilan.com', // Change to your admin email
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Error sending contact form email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendContactFormEmail:', error);
    throw error;
  }
}

/**
 * Send email confirmation for event registration
 */
export async function sendEventRegistrationEmail(
  userEmail: string,
  userName: string,
  eventTitle: string,
  eventDate: Date
) {
  try {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(eventDate);

    const { data, error } = await resend.emails.send({
      from: 'SASSI Events <events@sassimilan.com>',
      to: userEmail,
      subject: `Registration Confirmed: ${eventTitle}`,
      html: `
        <h1>You're registered for ${eventTitle}!</h1>
        <p>Hello ${userName},</p>
        <p>Your registration for <strong>${eventTitle}</strong> has been confirmed.</p>
        <p><strong>Event Date:</strong> ${formattedDate}</p>
        <p>Please join our WhatsApp group for event updates and discussions:</p>
        <p style="margin: 20px 0;">
          <a href="https://chat.whatsapp.com/EliM19BFkTZBS278gA3sqi" 
             style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Join WhatsApp Group
          </a>
        </p>
        <p>We look forward to seeing you there! If you have any questions, please contact us or log in to your dashboard for updates: <a href="https://sassimilan.com/dashboard">https://sassimilan.com/dashboard</a></p>
        <p>Best regards,<br>The SASSI Team</p>
      `,
    });

    if (error) {
      console.error('Error sending registration confirmation email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendEventRegistrationEmail:', error);
    throw error;
  }
}

/**
 * Send reminder email for upcoming event
 */
export async function sendEventReminderEmail(
  userEmail: string,
  userName: string,
  eventTitle: string,
  eventDate: Date,
  eventLocation: string
) {
  try {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(eventDate);

    const { data, error } = await resend.emails.send({
      from: 'SASSI Events <events@sassimilan.com>',
      to: userEmail,
      subject: `Reminder: ${eventTitle} is Tomorrow!`,
      html: `
        <h1>Event Reminder: ${eventTitle}</h1>
        <p>Hello ${userName},</p>
        <p>This is a friendly reminder that <strong>${eventTitle}</strong> is happening tomorrow!</p>
        <p><strong>Date and Time:</strong> ${formattedDate}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,<br>The SASSI Team</p>
      `,
    });

    if (error) {
      console.error('Error sending event reminder email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendEventReminderEmail:', error);
    throw error;
  }
}

/**
 * Send membership status update email
 */
export async function sendMembershipStatusEmail(
  userEmail: string,
  userName: string,
  status: "APPROVED" | "REJECTED",
  notes?: string
) {
  try {
    let subject, content;
    
    if (status === "APPROVED") {
      subject = "Your SASSI Membership Has Been Approved";
      content = `
        <h1>Your Membership Application Has Been Approved!</h1>
        <p>Hello ${userName},</p>
        <p>We're delighted to inform you that your application to join SASSI has been <strong>approved</strong>!</p>
        <p>You are now officially a member of the Students' Association of Indians in Milan. Welcome to our community!</p>
        ${notes ? `<p><strong>Note from the team:</strong> ${notes}</p>` : ''}
        <p>Next steps:</p>
        <ul>
          <li>Complete your profile to connect with other members. https://sassimilan.com/profile </li>
          <li>Check out upcoming events on our calendar https://sassimilan.com/events  </li>
          <li>Browse our resources for Indian students in Milan  https://sassimilan.com/resources </li>
        </ul>
        <p>If you haven't already completed your payment, please do so to activate all membership benefits.</p>
        <p>If you have any questions, feel free to reach out to us.</p>
        <p>Best regards,<br>The SASSI Team</p>
      `;
    } else {
      subject = "Update on Your SASSI Membership Application";
      content = `
        <h1>Your Membership Application Status</h1>
        <p>Hello ${userName},</p>
        <p>We've reviewed your application to join SASSI, and unfortunately, we are unable to approve it at this time.</p>
        ${notes ? `<p><strong>Reason:</strong> ${notes}</p>` : ''}
        <p>If you believe this is an error or would like to discuss your application further, please reply to this email.</p>
        <p>Best regards,<br>The SASSI Team</p>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'SASSI Membership <membership@sassimilan.com>',
      to: userEmail,
      subject,
      html: content,
    });

    if (error) {
      console.error('Error sending membership status email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendMembershipStatusEmail:', error);
    throw error;
  }
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmationEmail(
  userEmail: string,
  userName: string,
  expiryDate: Date
) {
  try {
    const formattedExpiryDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(expiryDate);

    const { data, error } = await resend.emails.send({
      from: 'SASSI Membership <membership@sassimilan.com>',
      to: userEmail,
      subject: "Your SASSI Membership Payment Confirmation",
      html: `
        <h1>Membership Payment Confirmed</h1>
        <p>Hello ${userName},</p>
        <p>We're pleased to confirm that your SASSI membership payment has been received and processed successfully.</p>
        <p>Your membership is now active and will be valid until <strong>${formattedExpiryDate}</strong>.</p>
        <p>As a member, you now have access to:</p>
        <ul>
          <li>All SASSI events and activities</li>
          <li>Our exclusive resources for Indian students in Milan</li>
          <li>Our member network and community support</li>
          <li>Special discounts with our partners</li>
        </ul>
        <p>You can log in to your account to access these benefits and update your profile.</p>
        <p>Thank you for joining our community!</p>
        <p>Best regards,<br>The SASSI Team</p>
      `,
    });

    if (error) {
      console.error('Error sending payment confirmation email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendPaymentConfirmationEmail:', error);
    throw error;
  }
}

/**
 * Send team application status email
 */
export async function sendTeamApplicationStatusEmail(
  userEmail: string,
  userName: string,
  department: string,
  status: "APPROVED" | "REJECTED",
  notes?: string
) {
  try {
    let subject, content;
    
    // Format department name
    const formattedDepartment = department
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    if (status === "APPROVED") {
      subject = `Welcome to the SASSI ${formattedDepartment} Team!`;
      content = `
        <h1>Your Team Application Has Been Approved!</h1>
        <p>Hello ${userName},</p>
        <p>We're excited to inform you that your application to join the <strong>${formattedDepartment}</strong> team has been <strong>approved</strong>!</p>
        <p>Welcome to the SASSI team! We're thrilled to have you on board and look forward to your contributions.</p>
        ${notes ? `<p><strong>Note from the team:</strong> ${notes}</p>` : ''}
        <p>Next steps:</p>
        <ul>
          <li>A team coordinator will contact you soon with more details</li>
          <li>You'll be added to the team's communication channels</li>
          <li>You'll receive an orientation to your role and responsibilities</li>
        </ul>
        <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>
        <p>Best regards,<br>The SASSI Team</p>
      `;
    } else {
      subject = "Update on Your SASSI Team Application";
      content = `
        <h1>Your Team Application Status</h1>
        <p>Hello ${userName},</p>
        <p>We've reviewed your application to join the <strong>${formattedDepartment}</strong> team, and unfortunately, we are unable to approve it at this time.</p>
        ${notes ? `<p><strong>Reason:</strong> ${notes}</p>` : ''}
        <p>We appreciate your interest in contributing to SASSI, and encourage you to apply again in the future or explore other ways to get involved with our community.</p>
        <p>If you would like to discuss your application further, please feel free to reply to this email.</p>
        <p>Best regards,<br>The SASSI Team</p>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'SASSI Team <team@sassimilan.com>',
      to: userEmail,
      subject,
      html: content,
    });

    if (error) {
      console.error('Error sending team application status email:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendTeamApplicationStatusEmail:', error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetUrl: string
) {
  try {
    await resend.emails.send({
      from: "SASSI Support <no-reply@sassimilan.com>",
      to: email,
      subject: "Reset Your SASSI Password",
      html: `
        <h1>Password Reset Request</h1>
        <p>Dear ${name},</p>
        <p>We received a request to reset your password for your SASSI account. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #ff6b00; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p>Alternatively, you can copy and paste this link in your browser:</p>
        <p style="word-break: break-all;">${resetUrl}</p>
        <p><strong>Note:</strong> This link will expire in 1 hour for security reasons.</p>
        <p>If you didn't request a password reset, please contact us immediately at support@sassimilan.com.</p>
        <p>Best regards,<br>The SASSI Team</p>
      `,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

/**
 * Send password changed confirmation email
 */
export async function sendPasswordChangedEmail(
  email: string,
  name: string
) {
  try {
    await resend.emails.send({
      from: "SASSI Support <no-reply@sassimilan.com>",
      to: email,
      subject: "Your SASSI Password Has Been Changed",
      html: `
        <h1>Password Changed Successfully</h1>
        <p>Dear ${name},</p>
        <p>This is a confirmation that the password for your SASSI account has been successfully changed.</p>
        <p>If you did not make this change, please contact us immediately at support@sassimilan.com.</p>
        <p>Best regards,<br>The SASSI Team</p>
      `,
    });
  } catch (error) {
    console.error("Error sending password changed email:", error);
    throw error;
  }
}