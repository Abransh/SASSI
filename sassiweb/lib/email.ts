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
      reply_to: email,
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
      hour: '2-digit',
      minute: '2-digit',
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
        <p>We look forward to seeing you there! If you need to cancel your registration or have any questions, please log in to your account or contact us.</p>
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