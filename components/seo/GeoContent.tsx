'use client'

import { useState } from 'react'

// ── FAQ accordion items ─────────────────────────────────────────────────────
const FAQ_ITEMS = [
    {
        q: 'Where is Aurum Events located?',
        a: 'We are located at 17 South Street, Freehold, NJ 07728 — in the heart of Freehold, Monmouth County, easily accessible from Route 9, Route 33, and the Garden State Parkway.',
    },
    {
        q: 'What types of events does Aurum Events host?',
        a: "We specialize in weddings, sweet sixteens, bar and bat mitzvahs, quinceañeras, corporate events, holiday parties, birthday milestones, and any special celebration. Our team handles every detail from start to finish.",
    },
    {
        q: 'Does Aurum provide in-house catering?',
        a: "Yes — our full-service in-house culinary team offers cocktail hour, action stations, plated dinners, children's menus, and stunning dessert displays. No outside caterers needed.",
    },

    {
        q: 'Which areas near Freehold NJ does Aurum serve?',
        a: 'We serve all of Monmouth County, Ocean County, and Middlesex County — including Manalapan, Marlboro, Howell, Jackson, Holmdel, Red Bank, Colts Neck, Eatontown, Rumson, Long Branch, and Asbury Park.',
    },
    {
        q: 'How do I book a tour or get a quote?',
        a: 'Visit our Book a Tour page to submit your request, call us at (732) 294-0031, or simply talk to our AI chatbot right here on the website! Our dedicated events team will schedule a personalized walkthrough and discuss your vision.',
    },
    {
        q: 'Is Aurum Events a full-service venue?',
        a: 'Absolutely. From the venue itself to in-house catering, event coordination, and premium enhancements, Aurum is a one-stop luxury event destination in Central New Jersey.',
    },
    {
        q: 'What is the capacity at Aurum Events?',
        a: 'Our flexible ballroom accommodates events of various sizes — from intimate celebrations to large galas. Contact us at (732) 294-0031 for specific capacity details based on your preferred layout.',
    },
]

// ── Single accordion item ───────────────────────────────────────────────────
function AccordionItem({ q, a }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false)

    return (
        <div
            style={{
                borderBottom: `1px solid ${open ? 'var(--gold)' : 'var(--border)'}`,
                transition: 'border-color 0.3s',
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 py-5 px-0 text-left"
                aria-expanded={open}
                type="button"
            >
                <div className="flex items-center gap-4">
                    {/* + / × icon button */}
                    <span
                        style={{
                            flexShrink: 0,
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: '1.5px solid var(--gold)',
                            backgroundColor: open ? 'var(--gold)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.25s',
                        }}
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke={open ? '#fff' : 'var(--gold)'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{
                                transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s, stroke 0.25s',
                            }}
                        >
                            <path d="M7 1v12M1 7h12" />
                        </svg>
                    </span>
                    <span
                        style={{
                            fontFamily: "'Inter', 'Barlow', sans-serif",
                            fontWeight: 600,
                            fontSize: '15px',
                            color: 'var(--text-brown)',
                            lineHeight: 1.35,
                            letterSpacing: '0.1px',
                            textAlign: 'left',
                        }}
                    >
                        {q}
                    </span>
                </div>
                <span
                    style={{
                        flexShrink: 0,
                        fontFamily: "'Inter', 'Barlow', sans-serif",
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        opacity: open ? 1 : 0.5,
                        transition: 'opacity 0.2s',
                    }}
                >
                    {open ? 'Close' : 'Read'}
                </span>
            </button>

            {/* Answer panel — smooth height transition */}
            <div
                style={{
                    maxHeight: open ? '300px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <p
                    style={{
                        fontFamily: "'Inter', 'Barlow', sans-serif",
                        fontSize: '14.5px',
                        lineHeight: 1.8,
                        color: 'var(--text-muted)',
                        paddingBottom: '20px',
                        paddingLeft: '44px',
                        paddingRight: '8px',
                    }}
                >
                    {a}
                </p>
            </div>
        </div>
    )
}

// ── Main GeoContent section ─────────────────────────────────────────────────
export default function GeoContent() {
    return (
        <section
            aria-label="About Aurum Events & Catering — Frequently Asked Questions"
            className="bg-[var(--surface-warm)] py-20 md:py-28 px-4 sm:px-6"
        >
            <div className="max-w-[1100px] mx-auto">

                {/* Section header */}
                <div className="text-center mb-14">
                    <p className="text-[11px] tracking-[4px] uppercase text-[var(--gold)] mb-3 font-medium" style={{ fontFamily: "'Inter', 'Barlow', sans-serif" }}>
                        Your Questions, Answered
                    </p>
                    <h2 className="font-oswald font-bold text-[var(--text-brown)] text-4xl md:text-5xl uppercase tracking-[2px] mb-4">
                        Everything About Aurum
                    </h2>
                    <div className="w-14 h-[2px] bg-[var(--gold)] mx-auto" />
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

                    {/* Left — About text */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-[var(--border)] rounded-sm p-7 md:p-9 shadow-[0_4px_30px_rgba(200,147,58,0.07)] h-full">
                            <h3 className="font-oswald font-semibold text-[var(--text-brown)] text-xl uppercase tracking-[1.5px] mb-5">
                                Freehold, NJ&apos;s Premier Event Space
                            </h3>
                            <p className="text-[14.5px] leading-[1.85] text-[var(--text-muted)] mb-4" style={{ fontFamily: "'Inter', 'Barlow', sans-serif" }}>
                                <strong className="text-[var(--text-brown)] font-semibold">Aurum Events &amp; Catering</strong> is located at{' '}
                                <strong className="text-[var(--text-brown)] font-semibold">17 South Street, Freehold, NJ 07728</strong>, serving all of Monmouth County and Central New Jersey.
                            </p>
                            <p className="text-[14.5px] leading-[1.85] text-[var(--text-muted)] mb-4" style={{ fontFamily: "'Inter', 'Barlow', sans-serif" }}>
                                We specialize in <strong className="text-[var(--text-brown)] font-medium">weddings</strong>, <strong className="text-[var(--text-brown)] font-medium">sweet sixteens</strong>, <strong className="text-[var(--text-brown)] font-medium">bar &amp; bat mitzvahs</strong>, <strong className="text-[var(--text-brown)] font-medium">quinceañeras</strong>, and <strong className="text-[var(--text-brown)] font-medium">corporate events</strong> — all backed by our world-class in-house culinary team.
                            </p>
                            <p className="text-[14px] leading-[1.8] text-[var(--text-muted)]" style={{ fontFamily: "'Inter', 'Barlow', sans-serif" }}>
                                Proudly serving <strong className="text-[var(--text-brown)] font-medium">Manalapan · Marlboro · Howell · Jackson · Holmdel · Colts Neck · Red Bank · Eatontown</strong> and all of NJ.
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex flex-col gap-3">
                                <a href="/book-a-tour" className="btn-gold-filled text-center text-[11px] tracking-[3px] py-3.5 w-full">
                                    BOOK A PRIVATE TOUR
                                </a>
                                <a href="tel:7322940031" className="btn-gold-outline text-center text-[11px] tracking-[3px] py-3.5 w-full">
                                    CALL (732) 294-0031
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right — Accordion FAQ */}
                    <div className="lg:col-span-3">
                        <div className="bg-white border border-[var(--border)] rounded-sm px-7 md:px-9 py-2 shadow-[0_4px_30px_rgba(200,147,58,0.07)]">
                            {FAQ_ITEMS.map((item, i) => (
                                <AccordionItem key={i} q={item.q} a={item.a} index={i} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
