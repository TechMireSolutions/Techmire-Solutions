'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnrollmentButtonModal({ courseTitle }: { courseTitle: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [mounted, setMounted] = useState(false)

  // Ensure portal only runs on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const r = await fetch('/api/quote', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          ...form, 
          service: `Academy Enrollment`, 
          budget: 'N/A', 
          description: `Enrollment Request for course: ${courseTitle}` 
        }) 
      })
      setStatus(r.ok ? 'success' : 'error')
    } catch { 
      setStatus('error') 
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#111] border border-white/10 p-8 sm:p-10 rounded-[32px] shadow-2xl custom-scrollbar"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors bg-white/5 rounded-full p-2"
            >
              <X size={20} />
            </button>

            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6 text-green-400 text-2xl">✓</div>
                <h3 className="text-white font-normal text-2xl mb-3">Enrollment Request Sent!</h3>
                <p className="text-white/50 text-[15px]">We have received your details for <strong>{courseTitle}</strong>. Our team will contact you shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-white font-normal text-3xl mb-2 pr-8">Enroll Now</h3>
                <p className="text-white/50 text-[14px] mb-8">Enter your details to enroll in <strong className="text-white">{courseTitle}</strong></p>

                <form onSubmit={submit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2">Full Name</label>
                    <input 
                      required 
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:border-orange focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:border-orange focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:border-orange focus:outline-none transition-colors"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-orange hover:bg-[#d4471f] text-black font-medium py-4 rounded-xl transition-colors mt-6 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                  </button>
                  {status === 'error' && <p className="text-red-400 text-[13px] text-center mt-2">Something went wrong. Please try again.</p>}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="cursor-pointer group flex items-center justify-between w-full"
      >
        <span className="text-[13px] font-medium text-white/50 group-hover:text-white transition-colors duration-300">
          Enroll Now
        </span>
        <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-orange text-white/50 group-hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10 group-hover:border-transparent">
          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>

      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}
