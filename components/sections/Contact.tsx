'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

type FormValues = {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>()
  
  useEffect(() => {
    if (!formRef.current) return
    const trigger = formRef.current

    const ctx = gsap.context(() => {
      const fields = trigger.querySelectorAll('.form-field-wrapper')
      gsap.from(fields, {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger,
          start: 'top 85%',
        }
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
    <section id="contact" ref={sectionRef} className="section-warm py-16 md:py-24 lg:py-[140px] px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel>GET IN TOUCH</SectionLabel>
          <h2 className="heading-section text-[var(--text-brown)]">Let&apos;s Make It Happen</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_40%] gap-12 lg:gap-[5%]">
          {/* Form Side */}
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="form-field-wrapper">
              <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Name *</label>
              <input 
                {...register("name", { required: "Name is required" })}
                className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all"
                placeholder="John Doe"
              />
              {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
            </div>

            <div className="form-field-wrapper">
              <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Email *</label>
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

            <div className="form-field-wrapper">
              <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Phone *</label>
              <input 
                {...register("phone", { required: "Phone is required" })}
                className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all"
                placeholder="(555) 555-5555"
              />
              {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
            </div>

            <div className="form-field-wrapper">
              <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Event Type *</label>
              <select 
                {...register("eventType", { required: "Please select an event type" })}
                className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all appearance-none"
              >
                <option value="" disabled>Event Type*</option>
                <option value="Wedding">Wedding</option>
                <option value="Sweet Sixteen">Sweet Sixteen</option>
                <option value="Bar/Bat Mitzvah">Bar/Bat Mitzvah</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Special Event">Special Event</option>
                <option value="Other">Other</option>
              </select>
              {errors.eventType && <span className="text-red-500 text-xs mt-1 block">{errors.eventType.message}</span>}
            </div>

            <div className="form-field-wrapper">
              <label className="block font-oswald font-medium text-[11px] uppercase tracking-[2px] text-[var(--gold)] mb-2">Message</label>
              <textarea 
                {...register("message")}
                rows={5}
                className="w-full bg-white border border-[var(--border)] rounded-sm px-4 py-3.5 font-barlow text-[15px] focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-glow)] outline-none transition-all resize-y"
                placeholder="Tell us about your event..."
              />
            </div>

            <div className="form-field-wrapper pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold-filled py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    SENDING…
                  </span>
                ) : 'SEND MESSAGE →'}
              </button>

              {submitState === 'success' && (
                <div className="flex items-center gap-3 px-4 py-3 bg-[var(--gold-pale)] border border-[var(--gold)] rounded-sm">
                  <svg viewBox="0 0 20 20" fill="var(--gold)" className="w-5 h-5 flex-shrink-0">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <p className="font-barlow text-[14px] text-[var(--gold-dark)]">
                    Thank you! We received your message and will be in touch shortly.
                  </p>
                </div>
              )}

              {submitState === 'error' && (
                <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-sm">
                  <svg viewBox="0 0 20 20" fill="#ef4444" className="w-5 h-5 flex-shrink-0">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <p className="font-barlow text-[14px] text-red-700">
                    Something went wrong. Please call us at{' '}
                    <a href="tel:7322940031" className="underline">(732) 294-0031</a>.
                  </p>
                </div>
              )}
            </div>
          </form>

          {/* Location Side */}
          <div className="flex flex-col gap-8">
            <div className="w-full h-[260px] rounded overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=17%20South%20Street,%20Freehold,%20NJ%2007728&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="flex flex-col gap-4 font-barlow text-[16px] text-[var(--text-brown)]">
              <div className="flex items-start gap-4">
                <span className="text-[18px]">📍</span>
                <p>17 South Street,<br />Freehold, NJ 07728</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[18px]">📞</span>
                <a href="tel:7322940031" className="hover:text-[var(--gold)] transition-colors">(732) 294-0031</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[18px]">🌐</span>
                <p>English & Spanish spoken</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
              <a href="https://www.instagram.com/Aurum_events/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                  <path fill="var(--gold-dark)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/Aurum-Events-and-Catering-269053676619639/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                  <path fill="var(--gold-dark)" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
