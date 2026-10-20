import type { Metadata } from 'next'
import BookATourForm from './BookATourForm'
import JsonLd, { breadcrumbSchema, BUSINESS_REF } from '@/components/seo/JsonLd'
import { CONTACT, OPENING_HOURS, PRICING, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
    title: 'Book a Venue Tour in Freehold, NJ',
    description: 'Schedule a private tour of Aurum Events & Catering at 17 South Street, Freehold, NJ. Call (732) 294-0031, email info@aurum.events or use the form.',
    keywords: [
        'book event venue Freehold NJ',
        'tour event hall NJ',
        'wedding venue tour New Jersey',
        'Monmouth County event venue tour',
        'Aurum Events contact',
        'Aurum Events tour booking',
        'contact Aurum Events Freehold NJ',
        'event venue contact NJ',
        '(732) 294-0031',
        '17 South Street Freehold NJ',
        'Spanish speaking event venue NJ',
        'bilingual event venue NJ',
        'English Spanish event venue NJ',
    ],
    alternates: {
        canonical: 'https://aurum.events/book-a-tour',
    },
    openGraph: {
        title: 'Book a Venue Tour in Freehold, NJ | Aurum Events',
        description: 'Experience Aurum Events & Catering in person. Schedule your private venue tour today — Freehold, NJ\'s premier event space.',
        url: 'https://aurum.events/book-a-tour',
        images: [{ url: '/images/slide1.jpg', width: 1200, height: 630, alt: 'Book a Tour at Aurum Events Freehold NJ' }],
    },
}

export default function BookATourPage() {
    const contactSchema = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Aurum Events & Catering',
      url: `${SITE_URL}/book-a-tour`,
      about: BUSINESS_REF,
    }

    return (
        <>
            <JsonLd data={[contactSchema, breadcrumbSchema([{ name: 'Book a Tour', path: '/book-a-tour' }])]} />
            <BookATourForm />

            {/* Other ways to reach us */}
            <section aria-labelledby="contact-details" className="bg-[var(--surface-warm)] px-4 sm:px-6 pb-20 -mt-8">
                <div className="max-w-[800px] mx-auto bg-white border border-[var(--border)] rounded-sm p-6 md:p-10">
                    <h2 id="contact-details" className="font-oswald font-bold text-[22px] uppercase tracking-[1.5px] text-[var(--text-brown)] mb-6">
                        Prefer to Call or Email?
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 font-barlow text-[15px] text-[var(--text-brown)]">
                        <dl className="space-y-4">
                            <div>
                                <dt className="font-semibold uppercase tracking-[1.5px] text-[12px] text-[var(--gold-text)]">Phone</dt>
                                <dd><a href={CONTACT.phoneHref} className="underline underline-offset-4 hover:text-[var(--gold-text)]">{CONTACT.phoneDisplay}</a></dd>
                            </div>
                            <div>
                                <dt className="font-semibold uppercase tracking-[1.5px] text-[12px] text-[var(--gold-text)]">Email</dt>
                                <dd><a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-[var(--gold-text)]">{CONTACT.email}</a></dd>
                            </div>
                            <div>
                                <dt className="font-semibold uppercase tracking-[1.5px] text-[12px] text-[var(--gold-text)]">Address</dt>
                                <dd>
                                    {CONTACT.addressDisplay}
                                    <br />
                                    <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--gold-text)]">
                                        Get directions on Google Maps
                                    </a>
                                </dd>
                            </div>
                        </dl>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold uppercase tracking-[1.5px] text-[12px] text-[var(--gold-text)]">Office Hours</h3>
                                <ul>
                                    {OPENING_HOURS.map((h) => (
                                        <li key={h.label}>{h.label}: {h.display}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold uppercase tracking-[1.5px] text-[12px] text-[var(--gold-text)]">What Happens Next</h3>
                                <p className="text-[15px] leading-[1.7]">
                                    Once you send the form, a member of our events team will contact you by phone or email to set up your private walkthrough, check your date and share a quote. Packages with in-house catering range from {PRICING.display}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
