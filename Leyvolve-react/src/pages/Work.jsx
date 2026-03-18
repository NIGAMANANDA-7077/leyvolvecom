import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PremiumReveal from '../components/PremiumReveal.jsx'
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ─── Helpers ─── */
function GradientBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-orange-400/20 blur-[120px]" />
            <div className="absolute top-[20%] -right-[10%] w-[35%] h-[50%] rounded-full bg-orange-300/15 blur-[100px]" />
            <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-yellow-400/10 blur-[130px]" />
        </div>
    )
}

function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
            {children}
        </motion.div>
    )
}

/* ─── Data ─── */
const categories = ['All', 'Web Development', 'Digital Marketing', 'Influencer Marketing', 'Social Media', 'SEO']

const projects = [
    {
        id: 1, title: 'NovaTech Startup Website', category: 'Web Development', service: 'Web Development & Design',
        desc: 'A blazing-fast startup website with 3D animations, conversion-optimised landing pages, and a custom CMS.',
        color: 'from-blue-600/30 to-purple-600/30', icon: '🖥️', result: '+340% conversion rate',
        tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    },
    {
        id: 2, title: 'FashionFirst E-commerce', category: 'Web Development', service: 'Web Development & Design',
        desc: 'Full-stack e-commerce store with AI-powered product recommendations and seamless checkout flow.',
        color: 'from-pink-600/30 to-rose-600/30', icon: '🛍️', result: '+220% online sales',
        tags: ['React', 'Stripe', 'Node.js'],
    },
    {
        id: 3, title: 'UrbanFit Influencer Drive', category: 'Influencer Marketing', service: 'Influencer Marketing',
        desc: 'Connected a fitness brand with 25 micro-influencers across Instagram & YouTube for a product launch.',
        color: 'from-emerald-600/30 to-teal-600/30', icon: '📸', result: '+150K reach in 30 days',
        tags: ['Instagram', 'YouTube', 'UGC'],
    },
    {
        id: 4, title: 'GrowthHive Google Ads', category: 'Digital Marketing', service: 'Digital Marketing',
        desc: 'Full-funnel paid advertising campaign generating qualified B2B leads at a 5x ROAS.',
        color: 'from-yellow-600/30 to-orange-600/30', icon: '📈', result: '+300% leads at 5x ROAS',
        tags: ['Google Ads', 'Meta Ads', 'Analytics'],
    },
    {
        id: 5, title: 'CaféWave Instagram Brand', category: 'Social Media', service: 'Social Media Management',
        desc: 'Grew a local café chain from 800 to 45K followers in 6 months through strategic content & reels.',
        color: 'from-amber-600/30 to-yellow-600/30', icon: '☕', result: '+45K followers, 6 months',
        tags: ['Instagram', 'Reels', 'Content'],
    },
    {
        id: 6, title: 'LegalEdge SEO Domination', category: 'SEO', service: 'SEO Optimization',
        desc: 'Moved a legal firm from page 5 to #1 Google ranking for 12 high-intent keywords in 90 days.',
        color: 'from-violet-600/30 to-indigo-600/30', icon: '⚖️', result: '#1 ranking, 90 days',
        tags: ['Technical SEO', 'Content', 'Link Building'],
    },
    {
        id: 7, title: 'MediCare Landing Pages', category: 'Web Development', service: 'Web Development & Design',
        desc: 'High-converting healthcare landing pages with booking integrations and HIPAA-compliant forms.',
        color: 'from-cyan-600/30 to-sky-600/30', icon: '🏥', result: '+180% appointment bookings',
        tags: ['React', 'Calendly API', 'UX'],
    },
    {
        id: 8, title: 'EduLearn Social Campaign', category: 'Social Media', service: 'Social Media Management',
        desc: 'Managed an ed-tech brand across LinkedIn, Twitter and Instagram with daily content & community management.',
        color: 'from-lime-600/30 to-green-600/30', icon: '📚', result: '+280% engagement rate',
        tags: ['LinkedIn', 'Twitter', 'Strategy'],
    },
]

const caseStudies = [
    {
        id: 1, project: 'GrowthHive Digital Transformation', industry: 'B2B SaaS',
        problem: 'The client was spending heavily on ads but generating low-quality leads with a 1.2x ROAS.',
        solution: 'We rebuilt their full-funnel with audience segmentation, custom landing pages, and automated lead nurturing sequences.',
        results: ['+300% lead volume', '5.2x ROAS', '-40% cost per acquisition'],
        visual: 'from-[#FF6A00] to-[#FF3C00]',
    },
    {
        id: 2, project: 'FashionFirst E-commerce Scale', industry: 'Retail & Fashion',
        problem: 'Existing Shopify store had poor mobile experience, high cart abandonment (78%) and no SEO visibility.',
        solution: 'Complete redesign with mobile-first UI, streamlined checkout, and a 6-month SEO roadmap targeting 50+ keywords.',
        results: ['+220% online revenue', '-55% cart abandonment', 'Page 1 for 28 keywords'],
        visual: 'from-purple-600 to-pink-600',
    },
]

const clients = ['TechNova', 'FashionFirst', 'GrowthHive', 'CaféWave', 'LegalEdge', 'EduLearn', 'MediCare', 'UrbanFit', 'BrandCo', 'LaunchPad', 'Scalify', 'Vortex']

const testimonials = [
    { name: 'Arjun Mehta', role: 'CEO, TechNova', avatar: 'https://i.pravatar.cc/150?img=11', text: 'Leyvolve completely transformed our digital presence. The website they built increased our demo requests by 340% in just the first two months.' },
    { name: 'Priya Sharma', role: 'CMO, FashionFirst', avatar: 'https://i.pravatar.cc/150?img=25', text: 'Their SEO and UX work on our e-commerce store was outstanding. We went from barely visible to dominating our category on Google.' },
    { name: 'Rahul Singh', role: 'Founder, GrowthHive', avatar: 'https://i.pravatar.cc/150?img=52', text: 'The Google Ads campaigns they managed delivered a consistent 5x ROAS. Best marketing investment we have ever made as a company.' },
    { name: 'Sneha Gupta', role: 'Marketing Head, CaféWave', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Our Instagram went from 800 followers to 45K in 6 months. The content strategy and reels they produced were absolutely unreal.' },
]

/* ─────────────────────────── */
/* 1. HERO */
/* ─────────────────────────── */
function Hero() {
    return (
        <section className="relative min-h-[88vh] flex flex-col items-center justify-center pt-40 pb-24 overflow-hidden rounded-b-[3rem] bg-white/50 backdrop-blur-3xl">
            <GradientBackground />

            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, y: [-12, 12, -12] }} 
                transition={{ 
                    x: { duration: 1, ease: [0.33, 1, 0.68, 1] },
                    opacity: { duration: 1 },
                    y: { duration: 6, ease: 'easeInOut', repeat: Infinity } 
                }}
                className="absolute top-36 left-8 hidden lg:block bg-[#0F0F0F]/90 border border-white/10 rounded-2xl p-5 w-56 backdrop-blur-xl shadow-2xl z-10"
            >
                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Latest Result</div>
                <div className="text-white font-bold text-2xl mb-1">+340%</div>
                <div className="text-white/50 text-xs">Conversion Rate ↑</div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div animate={{ width: ['0%', '85%'] }} transition={{ delay: 0.5, duration: 1.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]" />
                </div>
            </motion.div>

            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, y: [10, -14, 10] }} 
                transition={{ 
                    x: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 },
                    opacity: { duration: 1, delay: 0.2 },
                    y: { duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 } 
                }}
                className="absolute bottom-32 right-8 hidden lg:block bg-[#0F0F0F]/90 border border-white/10 rounded-2xl p-5 w-52 backdrop-blur-xl shadow-2xl z-10"
            >
                <div className="flex gap-1 mb-3">
                    {['#FF6A00', '#FFBD2E', '#28CA40'].map((c, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                </div>
                <div className="text-white font-bold text-sm mb-1">Project Showcase</div>
                <div className="text-white/40 text-xs">8+ case studies</div>
                <div className="flex gap-2 mt-3">
                    {[...Array(3)].map((_, i) => <div key={i} className="flex-1 h-10 rounded-lg bg-white/5 border border-white/10" />)}
                </div>
            </motion.div>

            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                <Reveal>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                        Our Portfolio
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <PremiumReveal 
                        text="Our Work That Drives Real Results"
                        className="font-display font-black text-[clamp(2.8rem,7vw,6rem)] leading-[1.02] tracking-tight text-[#111] mb-6"
                        stagger={0.05}
                    />
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Explore how we help businesses grow through strategic design, digital marketing, and innovative technology.
                    </p>
                </Reveal>
                <Reveal delay={0.3}>
                    <motion.a 
                        href="/contact" 
                        whileHover={{ 
                            scale: 1.05, 
                            boxShadow: '0 0 30px rgba(255,106,0,0.4)',
                            backgroundColor: '#FF7A2F'
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-[15px] shadow-lg shadow-orange-300/30 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}
                    >
                        Start Your Project
                        <motion.svg 
                            className="w-4 h-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                    </motion.a>
                </Reveal>
            </div>
        </section>
    )
}

/* ─────────────────────────── */
/* 2. FEATURED PROJECTS */
/* ─────────────────────────── */
function FeaturedProjects() {
    const featured = projects.slice(0, 4)
    return (
        <section className="relative py-28 overflow-hidden bg-slate-50/60 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <Reveal className="text-center mb-16">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Featured Work)</span>
                    <PremiumReveal 
                        text="Selected Projects"
                        className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-[#111] mt-3"
                        stagger={0.05}
                    />
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {featured.map((p, i) => (
                        <motion.div 
                            key={p.id}
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                        >
                            <motion.div whileHover={{ y: -12, boxShadow: '0 40px 80px rgba(255,106,0,0.18)' }} transition={{ duration: 0.4 }}
                                className="group relative bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/10 cursor-default">
                                {/* Visual area */}
                                <div className={`relative h-52 bg-gradient-to-br ${p.color} flex items-center justify-center overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,106,0,0.1), transparent 70%)' }} />
                                    <motion.div className="text-6xl" whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.3 }}>
                                        {p.icon}
                                    </motion.div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-white/5 backdrop-blur-sm">
                                            {p.service}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}>
                                            {p.result}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-7">
                                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'linear-gradient(90deg, transparent, #FF6A00, transparent)' }} />
                                    <h3 className="text-white font-display font-bold text-xl mb-2">{p.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-5">{p.desc}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {p.tags.map(t => (
                                                <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-medium text-white/60 border border-white/10 bg-white/5">{t}</span>
                                            ))}
                                        </div>
                                        <motion.div whileHover={{ x: 4 }} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#FF6A00]">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────── */
/* 3 + 4. FILTER + PORTFOLIO GRID */
/* ─────────────────────────── */
function PortfolioGrid() {
    const [active, setActive] = useState('All')

    const filtered = active === 'All' ? projects : projects.filter(p =>
        p.category.toLowerCase().includes(active.toLowerCase()) ||
        active.toLowerCase().includes(p.category.toLowerCase())
    )

    return (
        <section className="relative py-28 overflow-hidden bg-white/40 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <Reveal className="text-center mb-10">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(All Work)</span>
                    <PremiumReveal 
                        text="Browse by Category"
                        className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-[#111] mt-3"
                        stagger={0.05}
                    />
                </Reveal>

                {/* Filter tabs */}
                <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3 mb-14">
                    {categories.map(cat => (
                        <motion.button key={cat} onClick={() => setActive(cat)}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === cat
                                ? 'text-white shadow-lg shadow-orange-300/30'
                                : 'text-slate-500 border border-slate-200 bg-white hover:border-orange-200'}`}
                            style={active === cat ? { background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' } : {}}>
                            {cat}
                        </motion.button>
                    ))}
                </Reveal>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((p, i) => (
                            <motion.div 
                                key={p.id} 
                                initial={{ opacity: 0, scale: 0.9, y: 40 }} 
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ 
                                    opacity: { duration: 0.6 },
                                    scale: { type: "spring", stiffness: 100, damping: 20, delay: i * 0.05 },
                                    y: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: i * 0.05 }
                                }}
                                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 30px 60px rgba(255,106,0,0.15)' }}
                                className="group bg-[#0F0F0F] rounded-2xl overflow-hidden border border-white/10 cursor-default max-w-sm mx-auto w-full"
                            >
                                <div className={`h-36 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}>
                                    <span className="text-4xl">{p.icon}</span>
                                    <div className="absolute bottom-3 left-3">
                                        <span className="text-[9px] font-semibold uppercase tracking-widest text-white/50">{p.category}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-white font-bold text-base mb-1.5">{p.title}</h3>
                                    <p className="text-white/40 text-xs leading-relaxed mb-3">{p.desc.substring(0, 80)}...</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#FF6A00] text-xs font-bold">{p.result}</span>
                                        <div className="flex gap-1.5">
                                            {p.tags.slice(0, 2).map(t => <span key={t} className="text-[9px] text-white/30 border border-white/10 rounded-full px-2 py-0.5">{t}</span>)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

/* ─────────────────────────── */
/* 5. CASE STUDIES */
/* ─────────────────────────── */
function CaseStudies() {
    return (
        <section className="relative py-28 overflow-hidden bg-[#0A0A0E]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-[#FF6A00]/5 blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <Reveal className="text-center mb-16">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Deep Dives)</span>
                    <PremiumReveal 
                        text="Case Studies"
                        className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-white mt-3"
                        stagger={0.05}
                    />
                </Reveal>

                <div className="flex flex-col gap-16">
                    {caseStudies.map((cs, i) => {
                        const isEven = i % 2 === 0
                        return (
                            <motion.div 
                                key={cs.id}
                                initial={{ x: isEven ? -60 : 60, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                            >
                            <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}>
                                {/* Visual */}
                                <div className="flex-1 w-full">
                                    <div className={`h-72 rounded-3xl bg-gradient-to-br ${cs.visual} flex items-center justify-center relative overflow-hidden border border-white/10`}>
                                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                        <div className="text-center z-10">
                                            <div className="text-white font-black text-5xl mb-2">{cs.results[0]}</div>
                                            <div className="text-white/60 text-sm">{cs.project}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <motion.span 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold text-[#FF6A00] border border-[#FF6A00]/30 mb-4"
                                    >
                                        {cs.industry}
                                    </motion.span>
                                    <PremiumReveal 
                                        text={cs.project}
                                        className="font-display font-black text-2xl text-white mb-6"
                                        delay={0.3}
                                    />
                                    <div className="space-y-4 mb-6">
                                        {[{ label: 'Problem', text: cs.problem }, { label: 'Solution', text: cs.solution }].map(({ label, text }) => (
                                            <div key={label}>
                                                <div className="text-[#FF6A00] text-xs font-semibold uppercase tracking-widest mb-1">{label}</div>
                                                <p className="text-white/50 text-sm leading-relaxed">{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {cs.results.map((r, j) => (
                                            <div key={j} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                                <div className="text-white font-bold text-sm">{r}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )})}
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────── */
/* 6. CLIENT LOGOS */
/* ─────────────────────────── */
function ClientLogos() {
    return (
        <section className="relative py-20 overflow-hidden bg-slate-50/60 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mb-10">
                <Reveal>
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Our Clients)</span>
                    <h2 className="font-display font-black text-[clamp(1.8rem,4vw,2.8rem)] text-[#111] mt-3">Trusted by Growing Brands</h2>
                </Reveal>
            </div>

            {/* Infinite scroll marquee */}
            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />
                <motion.div
                    className="flex gap-6 py-3"
                    animate={{ x: [0, -(clients.length * 160)] }}
                    transition={{ duration: 18, ease: 'linear', repeat: Infinity }}>
                    {[...clients, ...clients].map((c, i) => (
                        <div key={i} className="flex-shrink-0 w-36 h-14 bg-white rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-center">
                            <span className="font-display font-bold text-slate-400 text-sm">{c}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

/* ─────────────────────────── */
/* 7. TESTIMONIALS */
/* ─────────────────────────── */
function Testimonials() {
    const [active, setActive] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 4500)
        return () => clearInterval(t)
    }, [])

    return (
        <section className="relative py-28 overflow-hidden bg-[#0A0A0E]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-[40%] h-[40%] rounded-full bg-[#FF6A00]/5 blur-[100px]" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <Reveal className="text-center mb-14">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Social Proof)</span>
                    <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-white mt-3">Client Results & Reviews</h2>
                </Reveal>

                <div className="relative overflow-hidden min-h-[240px]">
                    <AnimatePresence mode="wait">
                        <motion.div key={active} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-10 relative overflow-hidden">
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
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#FF6A00]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} />
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────── */
/* 8. FINAL CTA */
/* ─────────────────────────── */
function FinalCTA() {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00] via-[#FF4500] to-[#FF3C00]">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                <Reveal>
                    <PremiumReveal 
                        text="Have a Project in Mind? Let's Build Something Great Together."
                        className="font-display font-black text-[clamp(2.2rem,6vw,4.5rem)] text-white leading-tight mb-5"
                        stagger={0.05}
                    />
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="text-white/70 text-lg mb-10">Tell us about your project and we will create a strategy that delivers.</p>
                </Reveal>
                <Reveal delay={0.2}>
                    <motion.a href="/contact" whileHover={{ scale: 1.06, boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }} whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white font-bold text-base shadow-2xl text-[#FF6A00]">
                        Start Your Project
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </Reveal>
            </div>
        </section>
    )
}

/* ─────────────────────────── */
/* PAGE EXPORT */
/* ─────────────────────────── */
export default function Work() {
    return (
        <div className="min-h-screen font-body bg-slate-50 text-slate-900 selection:bg-[#FF6A00] selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <FeaturedProjects />
                <CaseStudies />
                {/* <ClientLogos /> */}
                {/* <Testimonials /> */}
                <FinalCTA />
            </main>
            <Footer />
        </div>
    )
}
