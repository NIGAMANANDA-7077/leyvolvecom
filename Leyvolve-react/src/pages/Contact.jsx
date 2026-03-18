import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ─── Gradient Background ─── */
function GradientBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-orange-400/20 blur-[120px]" />
            <div className="absolute top-[20%] -right-[10%] w-[35%] h-[50%] rounded-full bg-orange-300/15 blur-[100px]" />
            <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-yellow-400/10 blur-[130px]" />
        </div>
    )
}

/* ─── Scroll Reveal ─── */
function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

const services = [
    'Web Development / Designing',
    'Influencer Marketing',
    'Digital Marketing',
    'Social Media Management',
    'SEO Optimization',
]

const faqs = [
    { q: 'How long does a project take?', a: 'Project timelines vary based on scope. A landing page typically takes 1-2 weeks, while a full website or campaign rollout may take 4-8 weeks. We give you a clear timeline upfront after discovery.' },
    { q: 'What industries do you work with?', a: 'We have worked with startups, e-commerce brands, SaaS companies, lifestyle brands, and local businesses across tech, retail, healthcare, and more.' },
    { q: 'Do you offer custom marketing strategies?', a: 'Absolutely. Every strategy is tailored to your goals, target audience, and budget. We do not do cookie-cutter — we do data-backed, custom growth plans.' },
    { q: 'What does the onboarding process look like?', a: 'We start with a discovery call to understand your goals, then move to strategy, followed by execution. You will have a dedicated point of contact throughout the project.' },
    { q: 'Do you work with international clients?', a: 'Yes! We work with clients across India, the US, UK, and beyond. Communication is easy via video calls, Slack, or email — whatever works for you.' },
]

const socials = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/leyvolve?igsh=MWY5OHU4eHM3MG4zbA%3D%3D&utm_source=qr',
        color: 'from-purple-500 to-pink-500',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61587986117048',
        color: 'from-blue-500 to-blue-700',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
]

/* ─────────────────────────────────────── */
/* 1. HERO */
/* ─────────────────────────────────────── */
function Hero() {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-40 pb-24 overflow-hidden bg-white/50 backdrop-blur-3xl rounded-b-[3rem]">
            <GradientBackground />

            {/* Floating cards */}
            <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                className="absolute top-36 left-8 hidden lg:block bg-[#0F0F0F]/90 border border-white/10 rounded-2xl p-5 w-52 backdrop-blur-xl shadow-2xl z-10"
            >
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/50 text-xs">Available Now</span>
                </div>
                <div className="text-white font-bold text-sm mb-1">New Project Slot</div>
                <div className="text-white/40 text-xs">March 2026 · 2 spots left</div>
                <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]" />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [10, -14, 10] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
                className="absolute bottom-28 right-8 hidden lg:block bg-[#0F0F0F]/90 border border-white/10 rounded-2xl p-5 w-56 backdrop-blur-xl shadow-2xl z-10"
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF3C00] mb-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="text-white font-semibold text-sm mb-1">Response Time</div>
                <div className="text-white/40 text-xs">Usually within 24 hours</div>
            </motion.div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                <Reveal>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                        Get In Touch
                    </span>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] tracking-tight text-[#111] mb-6">
                        Let's Build Something<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]">Amazing Together</span>
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Have a project idea or need digital marketing services?<br />
                        Tell us about your project and we'll get back to you soon.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <a
                        href="#contact-form"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' }) }}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] text-white font-semibold text-[15px] shadow-lg shadow-orange-300/30 hover:shadow-orange-400/50 transition-all duration-300 hover:scale-105"
                    >
                        Start Your Project
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────── */
/* 2. CONTACT FORM + INFO */
/* ─────────────────────────────────────── */
function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [focused, setFocused] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)
        
        try {
            const response = await fetch("http://localhost:5001/api/send-message", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                setSubmitted(true)
            } else {
                throw new Error(result.message || "Something went wrong. Please try again later.")
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setError(err.message || "Failed to send message. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputBase = "w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-300 resize-none"

    const infoCards = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Email',
            value: 'info@leyvolve.com',
            href: 'mailto:info@leyvolve.com',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            label: 'Phone',
            value: '+91 8114-862369',
            href: 'tel:+918114862369',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'Office Location',
            value: 'Bhubaneswar, Odisha, India',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Working Hours',
            value: 'Mon – Fri, 9 AM – 6 PM',
        },
    ]

    return (
        <section id="contact-form" className="relative py-28 overflow-hidden bg-slate-50/60 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <Reveal className="text-center mb-16">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Reach Out)</span>
                    <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-[#111] mt-3">Send Us a Message</h2>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                    {/* FORM */}
                    <Reveal>
                        <div className="bg-[#0F0F0F] rounded-3xl border border-white/10 overflow-hidden relative">
                            <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FF6A00, transparent)' }} />
                            <div className="p-8 md:p-10">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-16 text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}>
                                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-white font-display font-black text-3xl mb-3">Message Sent!</h3>
                                        <p className="text-white/50 text-base max-w-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                        <button
                                            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                                            className="mt-8 px-6 py-2.5 rounded-full text-sm font-medium text-[#FF6A00] border border-[#FF6A00]/30 hover:border-[#FF6A00]/80 transition-colors"
                                        >
                                            Send Another
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                                                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@company.com' },
                                            ].map(({ name, label, type, placeholder }) => (
                                                <div key={name}>
                                                    <label className="text-white/40 text-xs font-medium mb-2 block">{label}</label>
                                                    <input
                                                        required 
                                                        type={type} 
                                                        name={name}
                                                        placeholder={placeholder}
                                                        value={form[name]}
                                                        onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                                                        onFocus={() => setFocused(name)}
                                                        onBlur={() => setFocused('')}
                                                        disabled={isSubmitting}
                                                        className={`${inputBase} ${focused === name ? 'border-[#FF6A00]/60' : 'border-white/10'} ${isSubmitting ? 'opacity-50' : ''}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-white/40 text-xs font-medium mb-2 block">Phone Number</label>
                                                <input
                                                    type="tel" 
                                                    name="phone"
                                                    placeholder="+91 98765 43210"
                                                    value={form.phone}
                                                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                                    onFocus={() => setFocused('phone')}
                                                    onBlur={() => setFocused('')}
                                                    disabled={isSubmitting}
                                                    className={`${inputBase} ${focused === 'phone' ? 'border-[#FF6A00]/60' : 'border-white/10'} ${isSubmitting ? 'opacity-50' : ''}`}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-white/40 text-xs font-medium mb-2 block">Service Needed</label>
                                                <select
                                                    required 
                                                    name="service"
                                                    value={form.service}
                                                    onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                                                    onFocus={() => setFocused('service')}
                                                    onBlur={() => setFocused('')}
                                                    disabled={isSubmitting}
                                                    className={`${inputBase} appearance-none cursor-pointer ${focused === 'service' ? 'border-[#FF6A00]/60' : 'border-white/10'} ${isSubmitting ? 'opacity-50' : ''}`}
                                                >
                                                    <option value="" className="bg-[#0F0F0F]">Select a service</option>
                                                    {services.map(s => <option key={s} value={s} className="bg-[#0F0F0F]">{s}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-white/40 text-xs font-medium mb-2 block">Your Message</label>
                                            <textarea
                                                required 
                                                name="message"
                                                rows={5} 
                                                placeholder="Tell us about your project, goals, and timeline..."
                                                value={form.message}
                                                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                                onFocus={() => setFocused('message')}
                                                onBlur={() => setFocused('')}
                                                disabled={isSubmitting}
                                                className={`${inputBase} ${focused === 'message' ? 'border-[#FF6A00]/60' : 'border-white/10'} ${isSubmitting ? 'opacity-50' : ''}`}
                                            />
                                        </div>

                                        {error && (
                                            <div className="p-4 mb-4 text-xs font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl">
                                                {error}
                                            </div>
                                        )}

                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 20px 40px rgba(255,106,0,0.3)' } : {}}
                                            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                            className={`w-full py-4 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : 'Send Message →'}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </Reveal>

                    {/* RIGHT: INFO + SOCIALS */}
                    <div className="flex flex-col gap-5">
                        {/* Info cards */}
                        {infoCards.map((card, i) => (
                            <Reveal key={card.label} delay={i * 0.08}>
                                <motion.div
                                    whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(255,106,0,0.12)' }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-5 flex items-center gap-4 group relative overflow-hidden cursor-default"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, #FF6A00, transparent)' }} />
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}>
                                        {card.icon}
                                    </div>
                                    <div>
                                        <div className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">{card.label}</div>
                                        {card.href ? (
                                            <a href={card.href} className="text-white text-sm font-medium hover:text-[#FF6A00] transition-colors">{card.value}</a>
                                        ) : (
                                            <div className="text-white text-sm font-medium">{card.value}</div>
                                        )}
                                    </div>
                                </motion.div>
                            </Reveal>
                        ))}

                        {/* Socials */}
                        <Reveal delay={0.35}>
                            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-5">
                                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-4">Follow Us</div>
                                <div className="grid grid-cols-2 gap-3">
                                    {socials.map((s) => (
                                        <motion.a
                                            key={s.name}
                                            href={s.href}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            transition={{ duration: 0.2 }}
                                            className={`flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-r ${s.color} text-white text-xs font-semibold`}
                                        >
                                            {s.icon}
                                            {s.name}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────── */
/* 4. MAP */
/* ─────────────────────────────────────── */
function MapSection() {
    return (
        <section className="relative py-20 overflow-hidden bg-white/40 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <Reveal className="text-center mb-10">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Find Us)</span>
                    <h2 className="font-display font-black text-[clamp(1.8rem,4vw,2.8rem)] text-[#111] mt-3">Our Location</h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-200/50" style={{ height: '420px' }}>
                        <iframe
                            title="Office Location"
                            src="https://maps.google.com/maps?q=Odisha,India&t=&z=10&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────── */
/* 5. SOCIAL MEDIA */
/* ─────────────────────────────────────── */
function SocialSection() {
    return (
        <section className="relative py-20 overflow-hidden bg-slate-50/80 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <Reveal>
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Stay Connected)</span>
                    <h2 className="font-display font-black text-[clamp(2rem,5vw,3rem)] text-[#111] mt-3 mb-4">Connect With Us</h2>
                    <p className="text-slate-500 text-base mb-12">Follow us for the latest updates, case studies, and behind-the-scenes content.</p>
                </Reveal>

                <div className="flex flex-wrap justify-center gap-4">
                    {socials.map((s, i) => (
                        <Reveal key={s.name} delay={i * 0.08}>
                            <motion.a
                                href={s.href}
                                whileHover={{ scale: 1.08, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r ${s.color} text-white font-semibold text-sm shadow-lg`}
                            >
                                {s.icon}
                                {s.name}
                            </motion.a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────── */
/* 6. FAQ */
/* ─────────────────────────────────────── */
function FAQ() {
    const [open, setOpen] = useState(null)

    return (
        <section className="relative py-28 overflow-hidden bg-[#0F0F0F]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-[#FF6A00]/5 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto px-6">
                <Reveal className="text-center mb-14">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(FAQ)</span>
                    <h2 className="font-display font-black text-[clamp(2rem,5vw,3rem)] text-white mt-3">Common Questions</h2>
                </Reveal>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <Reveal key={i} delay={i * 0.07}>
                            <div
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
                                onClick={() => setOpen(open === i ? null : i)}
                            >
                                <div className="flex items-center justify-between px-6 py-5 gap-4">
                                    <h3 className="text-white font-semibold text-sm leading-snug">{faq.q}</h3>
                                    <motion.div
                                        animate={{ rotate: open === i ? 45 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[#FF6A00]"
                                        style={{ border: '1px solid rgba(255,106,0,0.3)' }}
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

 
 

/* ─────────────────────────────────────── */
/* PAGE EXPORT */
/* ─────────────────────────────────────── */
export default function Contact() {
    return (
        <div className="min-h-screen font-body bg-slate-50 text-slate-900 selection:bg-[#FF6A00] selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <ContactForm />
                <MapSection />
                <SocialSection />
                <FAQ />
                 
            </main>
            <Footer />
        </div>
    )
}
