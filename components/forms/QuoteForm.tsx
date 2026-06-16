'use client'

import { useState } from 'react'

const SERVICES = [
  'Web Development', 'Software Development', 'SEO', 'Graphic Design',
  'Digital Marketing', 'App Development', 'UI/UX Design', 'Branding', 'Other',
]
const BUDGETS = ['< $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+']

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', description: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', service: '', budget: '', description: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
      <h2 className="text-light font-medium text-2xl mb-6">Tell Us About Your Project</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" />
        <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" />
      </div>
      <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
      <SelectField label="Service Interested In" name="service" value={form.service} onChange={handleChange} options={SERVICES} required />
      <SelectField label="Project Budget" name="budget" value={form.budget} onChange={handleChange} options={BUDGETS} />
      <TextareaField label="Project Description" name="description" value={form.description} onChange={handleChange} required placeholder="Tell us about your project goals, timeline, and any specific requirements..." />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#e8522a] hover:bg-[#d4471f] disabled:opacity-60 text-white font-medium py-4 rounded-pill transition-colors text-[15px]"
      >
        {status === 'loading' ? 'Sending...' : 'Submit Request ↗'}
      </button>

      {status === 'success' && <p className="text-green-400 text-[14px] text-center">Message sent! We&apos;ll get back to you within 24 hours.</p>}
      {status === 'error' && <p className="text-red-400 text-[14px] text-center">Something went wrong. Please try again or email us directly.</p>}
    </form>
  )
}

interface FieldProps { label: string; name: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement>; required?: boolean; placeholder?: string; type?: string }
function Field({ label, name, value, onChange, required, placeholder, type = 'text' }: FieldProps) {
  return (
    <div>
      <label className="block text-light/60 text-[13px] mb-1.5">{label}</label>
      <input
        name={name} value={value} onChange={onChange} required={required}
        placeholder={placeholder} type={type}
        className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-light text-[14px] placeholder-body focus:outline-none focus:border-[#e8522a]/60 transition-colors"
      />
    </div>
  )
}

interface SelectFieldProps { label: string; name: string; value: string; onChange: React.ChangeEventHandler<HTMLSelectElement>; options: string[]; required?: boolean }
function SelectField({ label, name, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-light/60 text-[13px] mb-1.5">{label}</label>
      <select
        name={name} value={value} onChange={onChange} required={required}
        className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-light text-[14px] focus:outline-none focus:border-[#e8522a]/60 transition-colors"
      >
        <option value="">Select an option</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

interface TextareaFieldProps { label: string; name: string; value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement>; required?: boolean; placeholder?: string }
function TextareaField({ label, name, value, onChange, required, placeholder }: TextareaFieldProps) {
  return (
    <div>
      <label className="block text-light/60 text-[13px] mb-1.5">{label}</label>
      <textarea
        name={name} value={value} onChange={onChange} required={required}
        placeholder={placeholder} rows={5}
        className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-light text-[14px] placeholder-body focus:outline-none focus:border-[#e8522a]/60 transition-colors resize-none"
      />
    </div>
  )
}
