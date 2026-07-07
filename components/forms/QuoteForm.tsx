'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = ['Web Development', 'Software Development', 'SEO', 'Graphic Design', 'Digital Marketing', 'App Development', 'UI/UX Design', 'Branding', 'Other']
const BUDGETS = ['< $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+']

const fieldCls = 'w-full bg-transparent border-b border-white/[0.12] focus:border-white/40 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none transition-colors duration-200'
const labelCls = 'block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2'

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
  name,
  required
}: {
  options: string[]
  value: string
  onChange: (name: string, val: string) => void
  placeholder: string
  name: string
  required?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${fieldCls} flex items-center justify-between text-left`}
      >
        <span className={value ? 'text-white' : 'text-white/20'}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-300 text-white/40 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden z-50 max-h-[220px] overflow-y-auto shadow-2xl"
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => { onChange(name, opt); setOpen(false) }}
                className="px-4 py-3 text-[14px] text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hidden native select for HTML5 validation if required */}
      <select
        name={name}
        value={value}
        onChange={() => {}}
        required={required}
        className="absolute opacity-0 pointer-events-none inset-0 w-full h-full"
        tabIndex={-1}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

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
          <CustomSelect
            name="service"
            options={SERVICES}
            value={form.service}
            onChange={(n, v) => setForm(f => ({ ...f, [n]: v }))}
            placeholder="Select a service"
            required
          />
        </div>
        <div>
          <label className={labelCls}>Budget</label>
          <CustomSelect
            name="budget"
            options={BUDGETS}
            value={form.budget}
            onChange={(n, v) => setForm(f => ({ ...f, [n]: v }))}
            placeholder="Select a range"
          />
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
          className="inline-flex items-center gap-2 bg-white hover:bg-white/90 disabled:opacity-40 text-black text-[14px] font-medium px-7 py-3.5 rounded-full transition-colors"
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

