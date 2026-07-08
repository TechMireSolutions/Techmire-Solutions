import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, budget, description } = body

    if (!name || !email || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const token = process.env.SANITY_API_TOKEN

    // Save to Sanity only if real credentials are configured
    if (projectId && token && /^[a-z0-9-]+$/.test(projectId)) {
      const { createClient } = await import('@sanity/client')
      const sanityClient = createClient({
        projectId,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: '2024-01-01',
        token,
        useCdn: false,
      })
      await sanityClient.create({
        _type: 'quoteRequest',
        name, email, phone, service, budget, description,
        submittedAt: new Date().toISOString(),
      })
    }

    const settings = await client.fetch(siteSettingsQuery).catch(() => null)
    const receiverEmail = settings?.email || 'connect@techmiresolutions.com'

    // Send email via SMTP
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
      
      const emailSubject = service === 'Academy Enrollment' 
        ? `Academy Enrollment: ${name}` 
        : `New Quote Request: ${name}`

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: receiverEmail,
        replyTo: email,
        subject: emailSubject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">${service === 'Academy Enrollment' ? 'New Academy Enrollment' : 'New Quote Request'}</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p style="margin: 0 0 10px 0;"><strong>Service/Course:</strong> ${service || 'N/A'}</p>
              ${service !== 'Academy Enrollment' ? `<p style="margin: 0 0 10px 0;"><strong>Budget:</strong> ${budget || 'N/A'}</p>` : ''}
            </div>
            <h3 style="color: #333; margin-bottom: 10px;">${service === 'Academy Enrollment' ? 'Details:' : 'Project Description:'}</h3>
            <div style="white-space: pre-wrap; color: #444; background-color: #f9f9f9; padding: 15px; border-radius: 6px;">${description}</div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
