import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const settings = await client.fetch(siteSettingsQuery).catch(() => null)
    const receiverEmail = settings?.email || 'connect@techmiresolutions.com'

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: receiverEmail,
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">New Contact Message</h2>
            <p style="color: #555; font-size: 14px;">You have received a new message from the contact form.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
              <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="white-space: pre-wrap; color: #444; background-color: #f9f9f9; padding: 15px; border-radius: 6px;">${message}</div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
