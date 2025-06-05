import { NextRequest, NextResponse } from 'next/server';
import { sendScheduleEmail, sendClientConfirmationEmail, ScheduleFormData } from '@/lib/email/mailtrap';

export async function POST(request: NextRequest) {
  try {
    const data: ScheduleFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.meetingType || !data.date || !data.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const appointmentDate = new Date(data.date + 'T' + data.time);
    const now = new Date();
    if (appointmentDate <= now) {
      return NextResponse.json(
        { error: 'Appointment date must be in the future' },
        { status: 400 }
      );
    }

    // Send notification email to business
    const businessResult = await sendScheduleEmail(data);
    
    // Send confirmation email to client
    const clientResult = await sendClientConfirmationEmail(data);
    
    if (businessResult.success && clientResult.success) {
      return NextResponse.json(
        { 
          message: 'Appointment scheduled successfully',
          businessMessageId: businessResult.messageId,
          clientMessageId: clientResult.messageId
        },
        { status: 200 }
      );
    } else {
      console.error('Failed to send emails:', { businessResult, clientResult });
      return NextResponse.json(
        { error: 'Failed to send confirmation emails' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Schedule form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

