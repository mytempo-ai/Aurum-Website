'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { gsap } from 'gsap'
import SectionLabel from '@/components/ui/SectionLabel'

type FormValues = {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
}

export default function BookATourPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>()

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (!formRef.current) return
    const trigger = formRef.current

    const ctx = gsap.context(() => {
      const fields = trigger.querySelectorAll('.form-field-wrapper')
      gsap.from(fields, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      })

      gsap.from('.booking-header', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    })

    return () => ctx.revert()
  }, [])

  const onSubmit = async (data: FormValues) => {
    setSubmitState('idle')
    try {
      const res = await fetch('https://zw87ga67.repcl.net/webhook/websiteaurum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitState('success')
      reset()
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <div className="min-h-screen pt-[100px] pb-20 px-4 sm:px-6 bg-[var(--surface-warm)]">
      <div className="max-w-[800px] mx-auto">
        
        <div className="booking-header text-center mb-12 md:mb-16">
          <SectionLabel>RESERVE YOUR PRIVATE TOUR</SectionLabel>
          <h1 className="heading-section heading-serif text-[var(--text-brown)] mb-6">Experience Aurum in Person</h1>
          <p className="font-barlow text-[16px] text-[var(--text-muted)] max-w-[600px] mx-auto leading-relaxed">
            Fill out the form below and our events team will reach out to schedule your 
            personalized tour of our premiere Freehold venue.
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-sm shadow-xl shadow-[rgba(200,147,58,0.08)] border border-[var(--border)]">
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field-wrapper">
                <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Full Name *</label>
                <input 
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
              </div>

              <div className="form-field-wrapper">
                <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Email Address *</label>
                <input 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                  className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field-wrapper">
                <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Phone Number *</label>
                <input 
                  {...register("phone", { required: "Phone is required" })}
                  className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all"
                  placeholder="(555) 555-5555"
                />
                {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
              </div>

              <div className="form-field-wrapper">
                <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Preferred Event Type *</label>
                <select 
                  {...register("eventType", { required: "Please select an event type" })}
                  className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select Event Type*</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Sweet Sixteen">Sweet Sixteen</option>
                  <option value="Bar/Bat Mitzvah">Bar/Bat Mitzvah</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Special Event">Special Event</option>
                  <option value="Other">Other</option>
                </select>
                {errors.eventType && <span className="text-red-500 text-xs mt-1 block">{errors.eventType.message}</span>}
              </div>
            </div>

            <div className="form-field-wrapper">
              <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Additional Details / Questions</label>
              <textarea 
                {...register("message")}
                rows={5}
                className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all resize-y"
                placeholder="Tell us about your vision..."
              />
            </div>

            <div className="form-field-wrapper pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold-filled py-5 text-[14px] tracking-[4px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    SUBMITTING REQUEST…
                  </span>
                ) : 'REQUEST TOUR ACCESS →'}
              </button>
            </div>

            {submitState === 'success' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-500 flex items-center gap-4 px-6 py-5 bg-[var(--gold-pale)] border border-[var(--gold)] rounded-sm mt-6">
                <svg viewBox="0 0 20 20" fill="var(--gold)" className="w-6 h-6 flex-shrink-0">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-oswald font-bold text-[var(--gold-dark)] uppercase tracking-wider">Success!</h4>
                  <p className="font-barlow text-[14px] text-[var(--gold-dark)]">
                    We've received your inquiry. One of our event specialists will contact you shortly.
                  </p>
                </div>
              </div>
            )}

            {submitState === 'error' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-500 flex items-center gap-4 px-6 py-5 bg-red-50 border border-red-200 rounded-sm mt-6">
                <svg viewBox="0 0 20 20" fill="#ef4444" className="w-6 h-6 flex-shrink-0">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <p className="font-barlow text-[14px] text-red-700">
                  Something went wrong. Please call us directly at{' '}
                  <a href="tel:7322940031" className="underline font-bold text-red-800 hover:text-red-900 transition-colors">(732) 294-0031</a>.
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="mt-12 text-center">
            <p className="font-barlow text-[13px] text-[var(--text-light)] uppercase tracking-[2px]">
                17 South Street, Freehold, NJ 07728 · (732) 294-0031
            </p>
        </div>
      </div>
    </div>
  )
}
