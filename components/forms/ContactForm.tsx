'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const fieldCls = 'w-full bg-transparent border-b border-white/[0.12] focus:border-white/40 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none transition-colors duration-200'
const labelCls = 'block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setForm({ name: '', email: '', subject: '', message: '' })
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start justify-center h-full min-h-[300px]">
        <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 text-green-400 text-lg">✓</div>
        <h3 className="text-white font-normal text-2xl mb-2">Message sent!</h3>
        <p className="text-white/40 text-[14px]">We&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelCls}>Your Name</label>
          <input name="name" value={form.name} onChange={set} required placeholder="John Smith" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input name="email" type="email" value={form.email} onChange={set} required placeholder="john@company.com" className={fieldCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Subject</label>
        <input name="subject" value={form.subject} onChange={set} required placeholder="What's this about?" className={fieldCls} />
      </div>
      <div>
        <label className={labelCls}>Message</label>
        <textarea name="message" value={form.message} onChange={set} required placeholder="Your message…" rows={6} className={`${fieldCls} resize-none`} />
      </div>
      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 bg-white hover:bg-white/90 disabled:opacity-40 text-dark text-[14px] font-medium px-7 py-3.5 rounded-pill transition-colors"
        >
          {status === 'loading' ? 'Sending...' : (
            <><span>Send Message</span><ArrowUpRight aria-hidden size={14} /></>
          )}
        </button>
        {status === 'error' && <p className="text-red-400 text-[13px]">Something went wrong.</p>}
      </div>
    </form>
  )
}
