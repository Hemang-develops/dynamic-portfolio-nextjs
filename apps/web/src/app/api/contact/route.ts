import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    if (!safeName || !safeEmail || !safeMessage) {
      return NextResponse.json(
        { error: "Please provide your name, email, and a message." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        {
          error:
            "Contact service is not configured. Please set RESEND_API_KEY on the server.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL ?? process.env.RESEND_TO_EMAIL;

    if (!to) {
      console.error("Missing CONTACT_TO_EMAIL/RESEND_TO_EMAIL environment variable.");
      return NextResponse.json(
        {
          error:
            "Destination email is not configured. Please set CONTACT_TO_EMAIL or RESEND_TO_EMAIL.",
        },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      replyTo: safeEmail,
      subject: `Portfolio inquiry from ${safeName}`,
      html: `
        <div>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to submit contact form", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
