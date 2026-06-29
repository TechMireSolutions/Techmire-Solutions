'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const SERVICES = ['Web Development', 'Software Development', 'SEO', 'Graphic Design', 'Digital Marketing', 'App Development', 'UI/UX Design', 'Branding', 'Other']
const BUDGETS = ['< $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+']

const fieldCls = 'w-full bg-transparent border-b border-white/[0.12] focus:border-white/40 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none transition-colors duration-200'
const labelCls = 'block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2'

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', description: '' })

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const r = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setForm({ name: '', email: '', phone: '', service: '', budget: '', description: '' })
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start justify-center h-full min-h-[300px]">
        <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 text-green-400 text-lg">✓</div>
        <h3 className="text-white font-normal text-2xl mb-2">Message received!</h3>
        <p className="text-white/40 text-[14px]">We&apos;ll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelCls}>Full Name</label>
          <input name="name" value={form.name} onChange={set} required placeholder="John Smith" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input name="email" type="email" value={form.email} onChange={set} required placeholder="john@company.com" className={fieldCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Phone</label>
        <input name="phone" type="tel" value={form.phone} onChange={set} placeholder="+1 234 567 8900" className={fieldCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelCls}>Service</label>
          <select name="service" value={form.service} onChange={set} required className={`${fieldCls} bg-dark`}>
            <option value="">Select a service</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Budget</label>
          <select name="budget" value={form.budget} onChange={set} className={`${fieldCls} bg-dark`}>
            <option value="">Select a range</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Project Description</label>
        <textarea name="description" value={form.description} onChange={set} required placeholder="Tell us about your project..." rows={5} className={`${fieldCls} resize-none`} />
      </div>
      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 bg-white hover:bg-white/90 disabled:opacity-40 text-dark text-[14px] font-medium px-7 py-3.5 rounded-pill transition-colors"
        >
          {status === 'loading' ? 'Sending...' : (
            <><span>Submit Request</span><ArrowUpRight aria-hidden size={14} /></>
          )}
        </button>
        {status === 'error' && <p className="text-red-400 text-[13px]">Something went wrong.</p>}
      </div>
    </form>
  )
}
