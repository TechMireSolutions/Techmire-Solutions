'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
      <h2 className="text-light font-medium text-2xl mb-6">Send a Message</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { label: 'Your Name', name: 'name', value: form.name, placeholder: 'John Smith' },
          { label: 'Email Address', name: 'email', value: form.email, placeholder: 'john@company.com', type: 'email' },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-light/60 text-[13px] mb-1.5">{f.label}</label>
            <input
              name={f.name} value={f.value} onChange={handleChange} required
              placeholder={f.placeholder} type={f.type || 'text'}
              className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-light text-[14px] placeholder-body focus:outline-none focus:border-[#e8522a]/60 transition-colors"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-light/60 text-[13px] mb-1.5">Subject</label>
        <input
          name="subject" value={form.subject} onChange={handleChange} required
          placeholder="What's this about?"
          className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-light text-[14px] placeholder-body focus:outline-none focus:border-[#e8522a]/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-light/60 text-[13px] mb-1.5">Message</label>
        <textarea
          name="message" value={form.message} onChange={handleChange} required
          placeholder="Your message..." rows={6}
          className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-light text-[14px] placeholder-body focus:outline-none focus:border-[#e8522a]/60 transition-colors resize-none"
        />
      </div>

      <button
        type="submit" disabled={status === 'loading'}
        className="w-full bg-[#e8522a] hover:bg-[#d4471f] disabled:opacity-60 text-white font-medium py-4 rounded-pill transition-colors text-[15px]"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message ↗'}
      </button>

      {status === 'success' && <p className="text-green-400 text-[14px] text-center">Message sent! We&apos;ll be in touch soon.</p>}
      {status === 'error' && <p className="text-red-400 text-[14px] text-center">Something went wrong. Please try again.</p>}
    </form>
  )
}
