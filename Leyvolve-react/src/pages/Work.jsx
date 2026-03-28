import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PremiumReveal from '../components/PremiumReveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
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

/* ─── Drag-scroll hook ─── */
function useDragScroll() {
    const ref = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)
    const hasDragged = useRef(false)
    
    // Momentum state
    const velocity = useRef(0)
    const lastTime = useRef(0)
    const lastX = useRef(0)
    const animationFrame = useRef(null)

    const onMouseDown = (e) => {
        isDragging.current = true
        hasDragged.current = false
        startX.current = e.pageX - ref.current.offsetLeft
        scrollLeft.current = ref.current.scrollLeft
        
        lastX.current = e.pageX
        lastTime.current = Date.now()
        velocity.current = 0
        if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
        
        ref.current.style.cursor = 'grabbing'
        ref.current.style.userSelect = 'none'
    }

    const onMouseMove = (e) => {
        if (!isDragging.current) return
        e.preventDefault()
        
        const x = e.pageX - ref.current.offsetLeft
        const walk = (x - startX.current) * 1.5 // slightly faster tracking
        if (Math.abs(walk) > 4) hasDragged.current = true
        ref.current.scrollLeft = scrollLeft.current - walk

        // Calculate velocity
        const now = Date.now()
        const dt = now - lastTime.current
        if (dt > 0) {
            const dx = e.pageX - lastX.current
            velocity.current = dx / dt
        }
        lastX.current = e.pageX
        lastTime.current = now
    }

    const applyMomentum = () => {
        if (Math.abs(velocity.current) > 0.05) {
            ref.current.scrollLeft -= velocity.current * 16 // roughly 16ms per frame
            velocity.current *= 0.92 // friction multiplier
            animationFrame.current = requestAnimationFrame(applyMomentum)
        }
    }

    const onMouseUp = () => {
        if (!isDragging.current) return
        isDragging.current = false
        ref.current.style.cursor = 'grab'
        ref.current.style.userSelect = ''
        
        // Start momentum if dragging stopped but mouse is still moving (or moved recently)
        const dt = Date.now() - lastTime.current
        if (dt < 100) {
            animationFrame.current = requestAnimationFrame(applyMomentum)
        }
    }

    const onMouseLeave = () => {
        if (isDragging.current) onMouseUp()
    }

    /* Prevent click on child links if user just dragged */
    const onClickCapture = (e) => {
        if (hasDragged.current) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    return { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onClickCapture }
}

/* ─── Data ─── */
const portfolioCategories = ['All', 'E-commerce', 'Business Website', 'Service Website', 'Education']

const portfolioProjects = [
    {
        id: 1,
        title: 'Gym Website',
        url: 'https://gym-demo-beta.vercel.app/',
        description: 'Modern fitness website with responsive UI and booking sections',
        category: 'Business Website',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
    },
    {
        id: 2,
        title: 'E-commerce Full Stack',
        url: 'https://inspiring-croissant-7e944d.netlify.app/',
        description: 'Full stack shopping platform with cart and authentication',
        category: 'E-commerce',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80',
    },
    {
        id: 3,
        title: 'Hotel Website',
        url: 'https://heroic-dusk-708c85.netlify.app/',
        description: 'Hotel booking UI with modern design and responsiveness',
        category: 'Business Website',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    },
    {
        id: 4,
        title: 'Carpenter Furniture Service',
        url: 'https://furnitureservice01.netlify.app/',
        description: 'Service-based website for furniture repair and carpentry',
        category: 'Service Website',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
    },
    {
        id: 5,
        title: 'Furniture Website',
        url: 'https://rajafurniture123.netlify.app/',
        description: 'Furniture showcase website with clean UI',
        category: 'E-commerce',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    },
    {
        id: 6,
        title: 'Play School Website',
        url: 'https://playschooldemo.netlify.app/',
        description: 'Educational website for play school with engaging UI',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80',
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
/* 2. OUR PORTFOLIO            */
/* ─────────────────────────── */
function OurPortfolio() {
    const [activeFilter, setActiveFilter] = useState('All')
    const dragScroll = useDragScroll()

    const filtered = activeFilter === 'All'
        ? portfolioProjects
        : portfolioProjects.filter(p => p.category === activeFilter)

    const [featured, ...rest] = filtered

    return (
        <section className="relative py-28 overflow-hidden bg-slate-50/60 backdrop-blur-3xl">
            <GradientBackground />
            <div className="relative z-10 max-w-6xl mx-auto px-6">

                {/* Section header */}
                <Reveal className="text-center mb-10">
                    <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Our Portfolio)</span>
                    <PremiumReveal
                        text="Real Projects. Real Results."
                        className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-[#111] mt-3"
                        stagger={0.05}
                    />
                    <p className="text-slate-500 text-base mt-4 max-w-xl mx-auto leading-relaxed">
                        A selection of live websites we have built for clients across various industries.
                    </p>
                </Reveal>

                {/* Filter bar */}
                <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3 mb-14">
                    {portfolioCategories.map(cat => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeFilter === cat
                                    ? 'text-white shadow-lg shadow-orange-300/30'
                                    : 'text-slate-500 border border-slate-200 bg-white hover:border-orange-300'
                            }`}
                            style={activeFilter === cat ? { background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' } : {}}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </Reveal>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* Featured card – first filtered project, full width */}
                        {featured && (
                            <div className="mb-8">
                                <ProjectCard project={featured} featured={true} index={0} />
                            </div>
                        )}

                        {/* Horizontal scroll row – drag with mouse */}
                        {rest.length > 0 && (
                            <div
                                ref={dragScroll.ref}
                                onMouseDown={dragScroll.onMouseDown}
                                onMouseMove={dragScroll.onMouseMove}
                                onMouseUp={dragScroll.onMouseUp}
                                onMouseLeave={dragScroll.onMouseLeave}
                                onClickCapture={dragScroll.onClickCapture}
                                className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory select-none"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    cursor: 'grab',
                                }}
                            >
                                {rest.map((project, i) => (
                                    <div key={project.id} className="snap-start">
                                        <ProjectCard project={project} featured={false} index={i + 1} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {filtered.length === 0 && (
                            <div className="text-center py-20 text-slate-400">
                                No projects in this category yet.
                            </div>
                        )}
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
                <OurPortfolio />
                <CaseStudies />
                {/* <ClientLogos /> */}
                {/* <Testimonials /> */}
                <FinalCTA />
            </main>
            <Footer />
        </div>
    )
}
