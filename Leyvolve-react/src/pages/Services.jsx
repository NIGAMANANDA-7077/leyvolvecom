import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PremiumReveal from '../components/PremiumReveal.jsx'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

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

/* ─── Scroll Reveal Wrapper ─── */
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

/* ─── Animated Counter ─── */
function Counter({ target, suffix = '', duration = 2 }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (!inView) return
        let start = 0
        const step = target / (duration * 60)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(start))
        }, 1000 / 60)
        return () => clearInterval(timer)
    }, [inView, target, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Services data ─── */
const servicesData = [
    {
        id: 'web',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Web Development & Design',
        short: 'Modern, high-performing websites that help businesses stand out online.',
        description: 'We design and develop modern, high-performing websites that help businesses stand out online.',
        features: ['Custom Website Design', 'Responsive Web Development', 'UI/UX Design', 'Landing Pages', 'E-commerce Websites'],
        accent: '#FF6A00',
    },
    {
        id: 'influencer',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: 'Influencer Marketing',
        short: 'Connect brands with the right influencers for measurable results.',
        description: 'We connect brands with the right influencers to increase reach, engagement, and brand awareness.',
        features: ['Influencer Partnerships', 'Campaign Strategy', 'Content Collaborations', 'Performance Tracking'],
        accent: '#FF3C00',
    },
    {
        id: 'digital',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        title: 'Digital Marketing',
        short: 'Performance-driven strategies that generate leads and revenue.',
        description: 'We help businesses grow online using performance-driven marketing strategies.',
        features: ['Paid Advertising', 'Google Ads Campaigns', 'Lead Generation', 'Conversion Optimization'],
        accent: '#FF6A00',
    },
    {
        id: 'social',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
        ),
        title: 'Social Media Management',
        short: 'Strategic social presence that builds community and drives engagement.',
        description: 'We manage your social media presence and create engaging content that builds your brand.',
        features: ['Content Strategy', 'Post Design', 'Community Management', 'Social Media Analytics'],
        accent: '#FF3C00',
    },
    {
        id: 'seo',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        title: 'SEO Optimization',
        short: 'Dominate search rankings and drive compounding organic traffic.',
        description: 'Improve your search rankings and drive organic traffic with advanced SEO strategies.',
        features: ['Technical SEO', 'On-page SEO', 'Keyword Research', 'Content Optimization', 'Website Audits'],
        accent: '#FF6A00',
    },
]

const stats = [
    { value: 100, suffix: '+', label: 'Clients' },
    { value: 150, suffix: '+', label: 'Projects' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 500, suffix: 'K+', label: 'Leads Generated' },
]

const steps = [
    { num: '01', title: 'Discovery', desc: 'Deep-dive into your brand, goals, and challenges.' },
    { num: '02', title: 'Strategy', desc: 'Craft a data-backed plan tailored to your business.' },
    { num: '03', title: 'Execution', desc: 'Deliver pixel-perfect work on time, every time.' },
    { num: '04', title: 'Optimization', desc: 'Analyse, iterate, and refine to get better results.' },
    { num: '05', title: 'Growth', desc: 'Scale what works and build compounding momentum.' },
]

const testimonials = [
    { name: 'Sarah Johnson', role: 'CEO, TechStart', avatar: 'https://i.pravatar.cc/150?img=5', text: 'Leyvolve transformed our online presence completely. The website they built for us increased conversions by 3x within the first month.' },
    { name: 'Michael Chen', role: 'Founder, GrowthCo', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Their digital marketing campaigns consistently deliver ROI. Best agency we\'ve worked with — data-driven and full of creative ideas.' },
    { name: 'Priya Sharma', role: 'CMO, BrandNova', avatar: 'https://i.pravatar.cc/150?img=25', text: 'The influencer marketing strategy they designed reached 2M+ people. Incredible execution and transparent reporting.' },
    { name: 'James Walker', role: 'Director, LaunchPad', avatar: 'https://i.pravatar.cc/150?img=33', text: 'Our SEO rankings shot up from page 3 to #1 in just 90 days. Absolutely outstanding work!' },
]

/* ─── 1. HERO ─── */
function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-40 pb-24 overflow-hidden bg-white/50 backdrop-blur-3xl rounded-b-[3rem]">
            <GradientBackground />

            {/* Floating UI cards */}
            <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                className="absolute top-32 left-10 hidden lg:block bg-[#0F0F0F]/90 border border-white/10 rounded-2xl p-5 w-56 backdrop-blur-xl shadow-2xl z-10"
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF3C00] mb-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div className="text-white font-semibold text-sm mb-1">+287% Growth</div>
                <div className="text-white/40 text-xs">Organic Traffic ↑</div>
                <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div animate={{ width: ['0%', '80%'] }} transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]" />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [10, -15, 10] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
                className="absolute bottom-32 right-10 hidden lg:block bg-[#0F0F0F]/90 border border-white/10 rounded-2xl p-5 w-52 backdrop-blur-xl shadow-2xl z-10"
            >
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/60 text-xs">Live Campaign</span>
                </div>
                <div className="text-white font-bold text-2xl mb-1">12.4K</div>
                <div className="text-white/40 text-xs">Impressions Today</div>
            </motion.div>

            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                <Reveal>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                        Digital Agency Services
                    </span>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="font-display font-black text-[clamp(2.8rem,7vw,6rem)] leading-[1.02] tracking-tight text-[#111] mb-6">
                        Web Design &amp; Digital Marketing
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]">Services for Startups in India</span>
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        High-converting website design, performance marketing &amp; branding — built for India's fastest-growing startups.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <a
                        href="/contact"
                        id="services-hero-cta"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] text-white font-semibold text-[15px] shadow-lg shadow-orange-300/30 hover:shadow-orange-400/50 transition-all duration-300 hover:scale-105"
                    >
                        Get Free Audit
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

/* ─── 2. SERVICES GRID ─── */
function ServicesGrid() {
    return (
        <section id="services-grid" className="relative py-28 overflow-hidden bg-slate-50/80 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <Reveal className="text-center mb-16">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(What We Do)</span>
                    <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-[#111] mt-3">
                        High-Converting Website Design &amp; Marketing Services
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesData.map((s, i) => (
                        <Reveal key={s.id} delay={i * 0.08}>
                            <motion.div
                                whileHover={{ y: -8, boxShadow: `0 24px 60px ${s.accent}25` }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="group relative bg-[#0F0F0F] rounded-3xl p-8 border border-white/10 cursor-default overflow-hidden"
                            >
                                {/* Gradient glow on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                                    style={{ background: `radial-gradient(circle at 50% 0%, ${s.accent}15 0%, transparent 70%)` }}
                                />
                                {/* Top accent line */}
                                <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)` }} />

                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white"
                                    style={{ background: `linear-gradient(135deg, ${s.accent}, #FF3C00)` }}
                                >
                                    {s.icon}
                                </motion.div>

                                <h3 className="font-display font-bold text-white text-xl mb-3">{s.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">{s.short}</p>

                                <a
                                    href={`#${s.id}`}
                                    onClick={(e) => { e.preventDefault(); document.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: 'smooth' }) }}
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6A00] group-hover:gap-3 transition-all duration-300"
                                >
                                    Learn More
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── 3. INDIVIDUAL SERVICE SECTIONS ─── */
function ServiceSection({ service, index }) {
    const isEven = index % 2 === 0

    // Visual for each service
    const visuals = {
        web: (
            <div className="relative w-full aspect-[4/3] bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 flex flex-col p-4 gap-2">
                    <div className="flex items-center gap-1.5">
                        {['#FF6A00', '#FFBD2E', '#28CA40'].map((c, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                    </div>
                    <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-3">
                        <div className="h-3 rounded bg-white/20 w-3/4" />
                        <div className="h-3 rounded bg-white/10 w-1/2" />
                        <div className="flex gap-2 mt-2">
                            {[1, 2, 3].map(i => <div key={i} className="flex-1 aspect-square rounded-xl bg-gradient-to-br from-[#FF6A00]/30 to-[#FF3C00]/10 border border-white/10" />)}
                        </div>
                        <div className="mt-auto h-8 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] w-32" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
            </div>
        ),
        influencer: (
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 w-full">
                    {['https://i.pravatar.cc/150?img=7', 'https://i.pravatar.cc/150?img=14', 'https://i.pravatar.cc/150?img=22'].map((src, i) => (
                        <motion.div key={i} animate={{ y: i % 2 === 0 ? [-8, 8, -8] : [8, -8, 8] }} transition={{ duration: 4 + i, ease: 'easeInOut', repeat: Infinity }}
                            className="bg-[#0F0F0F] rounded-2xl p-3 border border-white/10 flex flex-col items-center gap-2 shadow-xl"
                        >
                            <img src={src} className="w-12 h-12 rounded-full object-cover border-2 border-[#FF6A00]/30" />
                            <div className="h-2 rounded bg-white/20 w-3/4" />
                            <div className="h-2 rounded bg-white/10 w-1/2" />
                            <div className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)', color: '#fff' }}>
                                {['12K', '8.4K', '21K'][i]} follows
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
        digital: (
            <div className="relative w-full aspect-[4/3] bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/10 p-5 shadow-2xl">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Analytics Dashboard</div>
                <div className="flex items-end gap-2 mt-2 h-32">
                    {[40, 65, 45, 80, 55, 95, 70, 88, 60, 100].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                            className="flex-1 rounded-t-sm" style={{ background: i === 9 ? 'linear-gradient(180deg, #FF6A00, #FF3C00)' : `rgba(255,106,0,${0.15 + i * 0.05})` }}
                        />
                    ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {[['CTR', '4.8%', '+12%'], ['CPC', '$1.24', '-8%'], ['ROAS', '6.2x', '+34%']].map(([l, v, d]) => (
                        <div key={l} className="bg-white/5 rounded-xl p-2">
                            <div className="text-white/30 text-[9px]">{l}</div>
                            <div className="text-white font-bold text-sm">{v}</div>
                            <div className="text-emerald-400 text-[9px]">{d}</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        social: (
            <div className="relative w-full aspect-[4/3] flex flex-wrap items-center gap-3 p-2">
                {[
                    { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', label: 'Instagram', icon: '📸', stat: '12K Likes' },
                    { bg: 'bg-gradient-to-br from-blue-400 to-sky-500', label: 'Twitter/X', icon: '✦', stat: '3.2K RT' },
                    { bg: 'bg-gradient-to-br from-blue-700 to-blue-900', label: 'LinkedIn', icon: '💼', stat: '890 Shares' },
                    { bg: 'bg-gradient-to-br from-red-500 to-red-700', label: 'YouTube', icon: '▶', stat: '92K Views' },
                ].map((s, i) => (
                    <motion.div key={i} animate={{ y: i % 2 === 0 ? [-6, 6, -6] : [6, -6, 6] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                        className={`${s.bg} rounded-2xl p-4 flex-1 min-w-[44%] border border-white/20 shadow-xl`}
                    >
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <div className="text-white font-bold text-sm">{s.label}</div>
                        <div className="text-white/70 text-xs">{s.stat}</div>
                    </motion.div>
                ))}
            </div>
        ),
        seo: (
            <div className="relative w-full aspect-[4/3] bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/10 p-5 shadow-2xl">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Keyword Rankings</div>
                {[
                    { kw: 'digital marketing agency', rank: 1 },
                    { kw: 'influencer marketing', rank: 2 },
                    { kw: 'seo optimization services', rank: 3 },
                    { kw: 'social media management', rank: 5 },
                    { kw: 'web design company', rank: 7 },
                ].map(({ kw, rank }, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: rank <= 3 ? 'linear-gradient(135deg, #FF6A00, #FF3C00)' : 'rgba(255,255,255,0.05)', color: rank <= 3 ? '#fff' : '#fff6' }}>
                            {rank}
                        </div>
                        <div className="flex-1 text-white/60 text-xs truncate">{kw}</div>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.max(100 - rank * 12, 30)}%` }} transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="h-1.5 rounded-full max-w-[100px]" style={{ background: 'linear-gradient(90deg, #FF6A00, #FF3C00)' }}
                        />
                    </div>
                ))}
            </div>
        ),
    }

    return (
        <section id={service.id} className="relative py-28 overflow-hidden">
            <GradientBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
                    {/* Text */}
                    <div className="flex-1">
                        <Reveal>
                            <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Service {String(index + 1).padStart(2, '0')})</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-display font-black text-[clamp(1.8rem,4vw,3rem)] text-[#111] mt-3 mb-5 leading-tight">{service.title}</h2>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <p className="text-slate-500 text-base leading-relaxed mb-8">{service.description}</p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <ul className="space-y-3">
                                {service.features.map((f, i) => (
                                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 + 0.3 }}
                                        className="flex items-center gap-3 text-sm text-slate-600 font-medium"
                                    >
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}>
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {f}
                                    </motion.li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                                className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full text-sm font-semibold text-white border border-[#FF6A00]/30 hover:border-[#FF6A00]/80 transition-all duration-300"
                                style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}
                            >
                                Get Started
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </Reveal>
                    </div>

                    {/* Visual */}
                    <div className="flex-1 w-full">
                        <Reveal delay={0.2}>{visuals[service.id]}</Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ─── 4. PROCESS ─── */
function Process() {
    return (
        <section className="relative py-28 bg-[#0F0F0F] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[40%] h-[60%] rounded-full bg-[#FF6A00]/5 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <Reveal className="text-center mb-16">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(How We Work)</span>
                    <PremiumReveal 
                        text="Our Process"
                        className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-white mt-3"
                        stagger={0.05}
                    />
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {steps.map((step, i) => (
                        <Reveal key={step.num} delay={i * 0.1}>
                            <motion.div
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="relative bg-white/5 border border-white/10 rounded-3xl p-6 group hover:border-[#FF6A00]/40 transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'linear-gradient(90deg, transparent, #FF6A00, transparent)' }}
                                />
                                <div className="font-display font-black text-5xl text-white/5 leading-none mb-4">{step.num}</div>
                                <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── 5. STATS ─── */
function Stats() {
    return (
        <section className="relative py-24 bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.1}>
                            <div>
                                <div className="font-display font-black text-5xl text-white mb-2">
                                    <Counter target={s.value} suffix={s.suffix} />
                                </div>
                                <div className="text-white/70 font-medium text-sm">{s.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── 6. TESTIMONIALS ─── */
function Testimonials() {
    const [active, setActive] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 4000)
        return () => clearInterval(t)
    }, [])

    return (
        <section className="relative py-28 bg-slate-50/80 backdrop-blur-3xl overflow-hidden">
            <GradientBackground />
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <Reveal className="text-center mb-14">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Client Love)</span>
                    <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-[#111] mt-3">What Our Clients Say</h2>
                </Reveal>

                <div className="relative overflow-hidden min-h-[260px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#0F0F0F] rounded-3xl p-10 border border-white/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FF6A00, transparent)' }} />
                            <svg className="w-8 h-8 text-[#FF6A00]/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-white/70 text-lg leading-relaxed mb-8">{testimonials[active].text}</p>
                            <div className="flex items-center gap-4">
                                <img src={testimonials[active].avatar} className="w-12 h-12 rounded-full object-cover border-2 border-[#FF6A00]/30" />
                                <div>
                                    <div className="text-white font-semibold">{testimonials[active].name}</div>
                                    <div className="text-white/40 text-sm">{testimonials[active].role}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setActive(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#FF6A00]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── 7. CTA / CONTACT ─── */
function CTA() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)
        
        // Phone validation
        if (form.phone) {
            const phoneRegex = /^[\d\s+\-()]+$/;
            if (!phoneRegex.test(form.phone)) {
                setError("Mobile number contains invalid characters.")
                setIsSubmitting(false)
                return
            }

            const cleanedPhone = form.phone.replace(/\D/g, '');
            if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
                setError("Please enter a valid mobile number (10-15 digits).")
                setIsSubmitting(false)
                return
            }
        }
        
        try {
            const response = await fetch("https://leyvolvecombackend.onrender.com/api/send-message", {
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
                throw new Error(result.message || "Something went wrong. Please try again.")
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setError(err.message || "Failed to send message.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="relative py-32 bg-[#0A0A0A] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-[#FF6A00]/5 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left text */}
                    <div className="flex-1">
                        <Reveal>
                            <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Let's Talk)</span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-display font-black text-[clamp(2rem,5vw,4rem)] text-white mt-3 mb-5 leading-tight">
                                Let's Grow Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]">Together</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-white/50 text-base leading-relaxed mb-10">
                                Tell us about your project and we'll help you build the right digital strategy.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="space-y-5">
                                {[
                                    { icon: '📧', label: 'Email', value: 'info@leyvolve.com' },
                                    { icon: '📍', label: 'Location', value: 'India' },
                                    { icon: '⏰', label: 'Response', value: 'Within 24 hours' },
                                ].map(({ icon, label, value }) => (
                                    <div key={label} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">{icon}</div>
                                        <div>
                                            <div className="text-white/30 text-xs">{label}</div>
                                            <div className="text-white text-sm font-medium">{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Form */}
                    <div className="flex-1 w-full">
                        <Reveal delay={0.2}>
                            {submitted ? (
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}>
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-white font-display font-bold text-2xl mb-2">Message Sent!</h3>
                                    <p className="text-white/50">We'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                                    <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FF6A00, transparent)' }} />
                                    {[
                                        { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                                        { name: 'email', label: 'Your Email', type: 'email', placeholder: 'john@yourcompany.com' },
                                        { name: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '+91 98765 43210' },
                                    ].map(({ name, label, type, placeholder }) => (
                                        <div key={name}>
                                            <label className="text-white/50 text-xs font-medium mb-2 block">{label}</label>
                                            <input
                                                required type={type} placeholder={placeholder}
                                                value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF6A00]/50 transition-colors"
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label className="text-white/50 text-xs font-medium mb-2 block">Service Needed</label>
                                        <select required value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6A00]/50 transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-[#0F0F0F]">Select a service</option>
                                            {servicesData.map(s => <option key={s.id} value={s.id} className="bg-[#0F0F0F]">{s.title}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-white/50 text-xs font-medium mb-2 block">Message</label>
                                        <textarea required rows={4} placeholder="Tell us about your project..."
                                            value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF6A00]/50 transition-colors resize-none"
                                        />
                                    </div>
                                    {error && (
                                        <div className="p-4 mb-4 text-xs font-medium text-red-100 bg-red-500/10 border border-red-500/20 rounded-xl">
                                            {error}
                                        </div>
                                    )}

                                    <motion.button
                                        type="submit"
                                        id="services-contact-submit"
                                        disabled={isSubmitting}
                                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                        className={`w-full py-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Book Free 30-min Strategy Call →'}
                                    </motion.button>
                                </form>
                            )}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ─── PAGE EXPORT ─── */
export default function Services() {
    return (
        <div className="min-h-screen font-body bg-slate-50 text-slate-900 selection:bg-[#FF6A00] selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <ServicesGrid />
                {servicesData.map((s, i) => (
                    <ServiceSection key={s.id} service={s} index={i} />
                ))}
                <Process />
                <Stats />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    )
}
