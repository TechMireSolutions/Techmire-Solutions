import { NextRequest, NextResponse } from 'next/server'

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

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'TechmireSolutions <noreply@techmiresolutions.com>',
        to: 'connect@techmiresolutions.com',
        subject: `New Quote Request from ${name}`,
        html: `<h2>New Quote Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Service:</strong> ${service || 'N/A'}</p><p><strong>Budget:</strong> ${budget || 'N/A'}</p><p><strong>Description:</strong></p><p>${description}</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
