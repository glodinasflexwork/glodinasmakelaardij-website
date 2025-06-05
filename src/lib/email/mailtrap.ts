import nodemailer from 'nodemailer';

// Create transporter using Mailtrap API
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 587,
  auth: {
    user: 'api',
    pass: process.env.MAILTRAP_API_TOKEN,
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  propertyType?: string;
  budget?: string;
  message: string;
  preferredContact: string;
}

export interface ScheduleFormData {
  name: string;
  email: string;
  phone: string;
  meetingType: string;
  date: string;
  time: string;
  location: string;
  message?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `New Contact Form Submission - ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <div style="width: 50px; height: 3px; background-color: #16a34a; margin: 10px auto;"></div>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #16a34a;">${data.email}</a></p>
            ${data.phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #16a34a;">${data.phone}</a></p>` : ''}
            <p style="margin: 8px 0;"><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">Inquiry Details</h2>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${data.subject}</p>
            ${data.propertyType ? `<p style="margin: 8px 0;"><strong>Property Type:</strong> ${data.propertyType}</p>` : ''}
            ${data.budget ? `<p style="margin: 8px 0;"><strong>Budget Range:</strong> ${data.budget}</p>` : ''}
          </div>

          <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #ca8a04; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This email was sent from the Glodinas Makelaardij contact form.<br>
              Please respond promptly to maintain excellent customer service.
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: error };
  }
}

export async function sendScheduleEmail(data: ScheduleFormData) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `New Appointment Booking - ${data.meetingType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; margin: 0; font-size: 24px;">New Appointment Booking</h1>
            <div style="width: 50px; height: 3px; background-color: #16a34a; margin: 10px auto;"></div>
          </div>
          
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #16a34a;">
            <h2 style="color: #16a34a; margin: 0 0 15px 0; font-size: 20px;">📅 Appointment Details</h2>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Date:</strong> ${formatDate(data.date)}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Time:</strong> ${data.time}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Meeting Type:</strong> ${data.meetingType}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Location:</strong> ${data.location}</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">👤 Client Information</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #16a34a;">${data.email}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #16a34a;">${data.phone}</a></p>
          </div>

          ${data.message ? `
          <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #ca8a04; margin: 0 0 15px 0; font-size: 18px;">💬 Additional Notes</h2>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          ` : ''}

          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ef4444;">
            <h2 style="color: #dc2626; margin: 0 0 15px 0; font-size: 18px;">⚠️ Action Required</h2>
            <p style="margin: 0; line-height: 1.6;">
              Please confirm this appointment and send a calendar invite to the client.<br>
              Consider calling the client to confirm details and provide any additional information.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This appointment was booked through the Glodinas Makelaardij website.<br>
              Please respond promptly to confirm the appointment with the client.
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Schedule email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending schedule email:', error);
    return { success: false, error: error };
  }
}

export async function sendClientConfirmationEmail(data: ScheduleFormData) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: data.email,
    subject: `Appointment Confirmation - Glodinas Makelaardij`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; margin: 0; font-size: 24px;">Appointment Confirmed</h1>
            <div style="width: 50px; height: 3px; background-color: #16a34a; margin: 10px auto;"></div>
            <p style="color: #6b7280; margin: 10px 0 0 0;">Thank you for booking with Glodinas Makelaardij</p>
          </div>
          
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #16a34a;">
            <h2 style="color: #16a34a; margin: 0 0 15px 0; font-size: 20px;">📅 Your Appointment</h2>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Date:</strong> ${formatDate(data.date)}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Time:</strong> ${data.time}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Service:</strong> ${data.meetingType}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Location:</strong> ${data.location}</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">📞 Contact Information</h2>
            <p style="margin: 8px 0;">If you need to reschedule or have any questions:</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:+31681348551" style="color: #16a34a;">(6) 81 34 85 51</a></p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:cihatkaya@glodinas.nl" style="color: #16a34a;">cihatkaya@glodinas.nl</a></p>
          </div>

          <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #ca8a04; margin: 0 0 15px 0; font-size: 18px;">📋 What to Expect</h2>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Professional consultation with Cihat Kaya</li>
              <li>Market analysis and insights</li>
              <li>Personalized recommendations</li>
              <li>No obligation discussion</li>
              <li>Follow-up action plan</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              We look forward to meeting with you!<br>
              <strong>Glodinas Makelaardij</strong> - Your trusted real estate partner in Den Haag
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Client confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending client confirmation email:', error);
    return { success: false, error: error };
  }
}

