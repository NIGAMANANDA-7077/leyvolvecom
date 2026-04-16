import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PremiumReveal from '../components/PremiumReveal.jsx'
import { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { LoadingContext } from '../App'

function GradientBackground() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none hidden dark:block overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[50%] rounded-full bg-orange-500/15 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-indigo-500/15 blur-[130px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none block dark:hidden overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[50%] rounded-full bg-orange-500/20 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-indigo-500/30 blur-[130px]" />
      </div>
    </>
  )
}

function Hero() {
  const { loading } = useContext(LoadingContext)
  const [badgeVisible, setBadgeVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setBadgeVisible(window.scrollY < 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Split text for reveal animation
  const splitText = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.1em] -mb-[0.1em]">
        <motion.span
          className="inline-block"
          initial={{ y: '100%' }}
          animate={!loading ? { y: 0 } : { y: '100%' }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.4 + i * 0.05
          }}
        >
          {word}
        </motion.span>
      </span>
    ))
  }

  return (
    <>
      <AnimatePresence>
        {badgeVisible && (
          <motion.div
            key="badge"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-0 inset-x-0 z-[9999] flex justify-center pointer-events-none"
          >
            <div className="inline-flex items-center gap-2.5 px-7 pt-2.5 pb-2.5 bg-[#2d2d2d] text-white rounded-b-2xl shadow-md pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span className="text-[13px] font-medium tracking-wide">Available for New Projects</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative z-20 min-h-[100svh] flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden dark:bg-[#0a0a0f]/70 bg-white/50 backdrop-blur-3xl rounded-b-[2rem] md:rounded-b-[3rem] transition-colors duration-500">
        <GradientBackground />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-4 flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex -space-x-3">
              <img className="w-9 h-9 rounded-full border-[3px] border-[#f4f4f4] object-cover filter grayscale" src="https://i.pravatar.cc/150?img=11" alt="Avatar 1" />
              <img className="w-9 h-9 rounded-full border-[3px] border-[#f4f4f4] object-cover filter grayscale" src="https://i.pravatar.cc/150?img=12" alt="Avatar 2" />
              <img className="w-9 h-9 rounded-full border-[3px] border-[#f4f4f4] object-cover" src="https://i.pravatar.cc/150?img=33" alt="Avatar 3" />
            </div>
            <span className="text-gray-500 font-medium text-[15px]">Trusted by founders.</span>
          </motion.div>

          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-tight dark:text-white text-[#1a1a1a] max-w-4xl mx-auto">
            We Don't Just Build Brands - We Scale Them
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-8 font-body text-[clamp(1rem,1.5vw,1.2rem)] text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            High-converting ads, funnels, and strategies designed to drive real revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={!loading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/contact"
              id="hero-cta-primary"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#FF5A1F] hover:bg-[#e04e18] text-white rounded-full font-semibold text-[15px] transition-all duration-300 shadow-lg shadow-orange-400/30 transform hover:scale-105"
            >
              Get Free Audit
              <svg className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="/work"
              id="hero-cta-secondary"
              className="group flex items-center justify-center gap-3 px-8 py-4 dark:bg-white/10 dark:text-white dark:border-white/20 bg-white text-[#1a1a1a] border border-slate-200 hover:border-slate-400 rounded-full font-medium text-[15px] transition-all duration-300 shadow-sm transform hover:scale-105"
            >
              View Our Work
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={!loading ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="mt-6 font-mono text-[11px] text-gray-400 tracking-widest uppercase"
          >
            100+ startups served · India's fastest-growing digital agency
          </motion.p>

        </div>
      </section>
    </>
  )
}

const topRibbonItems = [
  'Brand Design',
  'Logo Design',
  'Website Design',
  'Brand Design',
  'Logo Design',
  'Website Design',
]

const bottomRibbonItems = [
  '10 Years of Experience',
  'Over 100 Customers',
  'Senior Designer',
  '10 Years of Experience',
  'Over 100 Customers',
  'Senior Designer',
]

const Separator = () => (
  <span className="mx-6 md:mx-10 text-xl font-light opacity-80 select-none">✦</span>
)

function Services() {
  const containerRef = useRef(null)

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full overflow-hidden dark:bg-[#15151a]/80 bg-slate-50/60 backdrop-blur-3xl transition-colors py-16 md:py-32 flex flex-col justify-center items-center -mt-8 md:-mt-16"
      style={{ zIndex: 10 }}
    >
      <GradientBackground />
      <style>{`
        @keyframes marquee-left-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes marquee-right-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-lr {
          animation: marquee-left-right 25s linear infinite;
        }
        .animate-marquee-rl {
          animation: marquee-right-left 25s linear infinite;
        }
        .hover-pause:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r dark:from-[#15151a] from-[#f4f4f4] to-transparent z-20 pointer-events-none transition-colors" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l dark:from-[#15151a] from-[#f4f4f4] to-transparent z-20 pointer-events-none transition-colors" />

      <div className="w-[110vw] md:w-[120vw] relative left-1/2 -translate-x-1/2 transform rotate-[-3deg] origin-center mb-6 z-10">
        <div className="bg-[#FF5A1F] py-4 text-white shadow-xl overflow-hidden flex cursor-default">
          <div className="flex w-max animate-marquee-lr hover-pause will-change-transform">
            {[...topRibbonItems, ...topRibbonItems, ...topRibbonItems, ...topRibbonItems, ...topRibbonItems, ...topRibbonItems].map((item, i) => (
              <div key={i} className="flex items-center text-xl md:text-2xl font-bold uppercase tracking-wider whitespace-nowrap">
                {item}
                <Separator />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[110vw] md:w-[120vw] relative left-1/2 -translate-x-1/2 transform rotate-[3deg] origin-center z-0">
        <div className="bg-slate-900 dark:bg-[#000000] py-4 text-white shadow-xl overflow-hidden flex cursor-default transition-colors">
          <div className="flex w-max animate-marquee-rl hover-pause will-change-transform">
            {[...bottomRibbonItems, ...bottomRibbonItems, ...bottomRibbonItems, ...bottomRibbonItems, ...bottomRibbonItems, ...bottomRibbonItems].map((item, i) => (
              <div key={i} className="flex items-center text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-200 whitespace-nowrap">
                {item}
                <Separator />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { value: 100, suffix: '+', label: 'Projects Delivered' },
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 3, suffix: 'x', label: 'Average ROI' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
  ]

  function AnimatedCount({ target, suffix, active }) {
    const [count, setCount] = useState(0)
    useEffect(() => {
      if (!active) return
      let start = 0
      const step = target / (1.8 * 60)
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(Math.floor(start))
      }, 1000 / 60)
      return () => clearInterval(timer)
    }, [active, target])
    return <>{count}{suffix}</>
  }

  return (
    <section ref={ref} className="relative dark:bg-[#0a0a0f] bg-white transition-colors py-8 md:py-14 -mt-4 md:-mt-6 z-[5]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display font-black text-[clamp(2.2rem,5vw,3.5rem)] dark:text-white text-[#1a1a1a] leading-none tabular-nums">
                <AnimatedCount target={s.value} suffix={s.suffix} active={inView} />
              </span>
              <span className="mt-2 text-[13px] text-gray-500 font-medium tracking-wide">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const tags = [
  { label: 'Performance Ads', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
  { label: 'Conversion Design', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
  { label: 'Scaling Strategy', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { label: 'Analytics', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
]

function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full dark:bg-[#08080a]/80 bg-slate-100/60 backdrop-blur-3xl transition-colors py-14 md:py-32 flex flex-col items-center justify-center -mt-4 md:-mt-8"
      style={{ zIndex: 1 }}
    >
      <GradientBackground />
      <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-display italic text-[#ff5c00] text-xl md:text-2xl tracking-wide">
            (hello)
          </span>
        </motion.div>

        <h2 className="sr-only">We help fast moving digital startups launch sharper brands and websites - with clarity, speed, and no drama.</h2>
        <PremiumReveal 
          text="We help fast moving digital startups launch sharper brands and websites - with clarity, speed, and no drama."
          className="font-display font-medium text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight dark:text-white text-[#1a1a1a] mb-6"
          stagger={0.03}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-[clamp(1.1rem,1.8vw,1.4rem)] text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We don't just design - we build systems that bring you customers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl mx-auto"
        >
          {tags.map((tag, i) => (
            <motion.div
              key={tag.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2 rounded-full dark:bg-white/10 bg-[#525252] dark:text-white border dark:border-white/10 text-[#e0e0e0] text-[13px] md:text-[14px] font-medium shadow-md cursor-default dark:hover:bg-white/20 hover:bg-[#444] transition-colors"
            >
              <span className="opacity-70 flex items-center justify-center">{tag.icon}</span>
              {tag.label}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

const offerCards = [
  {
    id: 1,
    title: 'Web Design & Development',
    description: 'Stunning, high-converting websites built for startups. From landing pages to full e-commerce — fast, clean, and designed to grow.',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)',
    iconBg: 'rgba(255,255,255,0.18)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Digital Marketing',
    description: 'Performance-driven marketing that generates leads and revenue. Google Ads, Meta Ads, email funnels — built to scale your startup.',
    gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
    iconBg: 'rgba(255,255,255,0.18)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'SEO Optimization',
    description: 'Dominate Google with technical SEO, keyword strategy, and content that ranks. Compounding organic traffic that grows month over month.',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6d28d9 100%)',
    iconBg: 'rgba(255,255,255,0.18)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Influencer Marketing',
    description: 'Connect your brand with the right creators. We identify, manage, and track influencer campaigns that deliver real reach and real conversions.',
    gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
    iconBg: 'rgba(255,255,255,0.18)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Social Media Management',
    description: 'Strategic content, consistent posting, and community management across Instagram, LinkedIn, and more — so you stay top of mind.',
    gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
    iconBg: 'rgba(255,255,255,0.18)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Branding & Identity',
    description: 'Build a brand that people remember. Logo design, brand guidelines, visual identity — everything you need to stand out in a crowded market.',
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
    iconBg: 'rgba(255,255,255,0.18)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

function WhatWeOffer() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative dark:bg-[#0f0f13]/80 bg-white/60 backdrop-blur-3xl transition-colors py-14 md:py-32"
    >
      <GradientBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="font-mono text-[11px] text-[#FF5A1F] tracking-[0.3em] uppercase">(Our Services)</span>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] dark:text-white text-[#1a1a1a] mt-3 tracking-tight">
            WHAT WE OFFER
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Everything your startup needs to launch, grow, and scale — under one roof.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden p-8 flex flex-col gap-6 cursor-default shadow-lg hover:shadow-2xl transition-shadow duration-500"
              style={{ background: card.gradient, minHeight: '280px' }}
            >
              {/* Crescent + Icon */}
              <div className="relative w-16 h-16">
                {/* Crescent moon behind */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    transform: 'translateX(-6px) translateY(4px)',
                  }}
                />
                {/* Icon circle */}
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ background: card.iconBg, backdropFilter: 'blur(8px)' }}
                >
                  {card.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-display font-bold text-white text-2xl leading-snug">
                  {card.title}
                </h3>
                <p className="text-white/75 text-[15px] leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Subtle bottom link */}
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-colors duration-200 group"
              >
                Learn More
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Shine overlay */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return <WhatWeOffer />
}

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Gym Website',
    category: 'Business Website',
    link: 'https://gym-demo-beta.vercel.app/',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
  },
  {
    id: 2,
    number: '02',
    title: 'E-commerce Full Stack',
    category: 'E-commerce',
    link: 'https://inspiring-croissant-7e944d.netlify.app/',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80',
  },
  {
    id: 3,
    number: '03',
    title: 'Hotel Website',
    category: 'Business Website',
    link: 'https://heroic-dusk-708c85.netlify.app/',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
  },
  {
    id: 4,
    number: '04',
    title: 'Carpenter Furniture Service',
    category: 'Service Website',
    link: 'https://furnitureservice01.netlify.app/',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
  },
  {
    id: 5,
    number: '05',
    title: 'Furniture Website',
    category: 'E-commerce',
    link: 'https://rajafurniture123.netlify.app/',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
  },
  {
    id: 6,
    number: '06',
    title: 'Play School Website',
    category: 'Education',
    link: 'https://playschooldemo.netlify.app/',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80',
  },
]

function Portfolio() {
  const [activeCard, setActiveCard] = useState(1)

  return (
    <section id="portfolio" className="relative dark:bg-[#15151a]/80 bg-slate-50/60 backdrop-blur-3xl transition-colors pt-8 pb-14 md:pt-10 md:pb-24">
      <GradientBackground />

      <div className="absolute top-10 w-full flex justify-center pointer-events-none z-0 overflow-hidden pb-10 select-none">
        <p
          aria-hidden="true"
          className="font-display font-black text-[clamp(2.5rem,10vw,10rem)] text-slate-200 dark:text-white/5 leading-none tracking-tight whitespace-nowrap transition-colors"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.01)' }}
        >
          Our Portfolio
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mt-12">

        <div className="flex-shrink-0 text-center relative z-20 mb-6">
          <span className="font-mono text-[11px] text-[#FF5A1F] tracking-[0.3em] uppercase mb-3 block">(Our Portfolio)</span>
          <h2 className="font-display font-black text-[clamp(1.8rem,3.5vw,2.5rem)] dark:text-white text-[#1a1a1a] tracking-tight mb-2">
            Selected Works — Web &amp; Digital Projects
          </h2>
        </div>
        <div className="flex justify-center mb-8">
          <a
            href="/work"
            id="portfolio-view-all-cta"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/30 hover:bg-[#FF5A1F] hover:text-white text-sm font-semibold transition-all duration-300"
          >
            View All Case Studies
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-3 min-h-[500px]">
          {projects.map((project, index) => {
            const isActive = activeCard === project.id
            const isEven = index % 2 === 0

            return (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveCard(project.id)}
                initial={{ x: isEven ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.08,
                  ease: [0.33, 1, 0.68, 1]
                }}
                className={`
                  relative group flex flex-col justify-between rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md hover:shadow-2xl
                  ${isActive ? 'md:flex-[2.5]' : 'md:flex-1'}
                `}
                style={{ minHeight: '480px' }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                {/* Active orange glow */}
                {isActive && (
                  <div className="absolute inset-0 ring-2 ring-[#FF5A1F]/60 rounded-2xl pointer-events-none z-10" />
                )}

                {/* Top area: number + arrow */}
                <div className="relative z-10 flex justify-between items-start p-6">
                  <span className={`font-display font-black leading-none transition-all duration-500 drop-shadow-lg ${
                    isActive ? 'text-6xl text-white' : 'text-4xl text-white/40 group-hover:text-white/70'
                  }`}>
                    {project.number}
                  </span>

                  <div className={`
                    w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center
                    transition-all duration-500 transform
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-60'}
                  `}>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom area: category badge + title + CTA */}
                <div className="relative z-10 p-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FF5A1F]/80 text-white mb-3 backdrop-blur-sm">
                    {project.category}
                  </span>

                  <div className={`transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-80 md:opacity-100'}`}>
                    <h3 className={`font-bold text-white drop-shadow transition-all duration-500 ${isActive ? 'text-2xl mb-3' : 'text-lg md:absolute md:bottom-16 md:left-6 whitespace-normal w-[80%] mb-0'}`}>
                      {project.title}
                    </h3>

                    <div className={`
                      flex items-center gap-2 text-sm font-medium text-[#FF5A1F]
                      transition-all duration-500 overflow-hidden
                      ${isActive ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      View Project
                      <div className="w-8 h-[1px] bg-[#FF5A1F]/60" />
                    </div>
                  </div>
                </div>

              </motion.a>
            )
          })}
        </div>

      </div>
    </section>
  )
}

function CTA() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    // Phone validation
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
        throw new Error(result.message || "Failed to send.")
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative dark:bg-[#0a0a0f]/80 bg-white/60 backdrop-blur-3xl transition-colors py-14 md:py-32 overflow-hidden flex flex-col items-center">
      <GradientBackground />

      <div className="absolute top-10 w-full flex justify-center pointer-events-none z-0 overflow-hidden select-none">
        <h2
          className="font-display font-black text-[clamp(3rem,10vw,12rem)] text-slate-200 dark:text-white/5 leading-none tracking-tight whitespace-nowrap transition-colors"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
        >
          Let's Connect
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[85rem] px-4 md:px-8 mx-auto -mt-10">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] shadow-2xl min-h-[500px] flex flex-col justify-between"
        >

          <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" style={{ filter: 'blur(3px)' }}>
            <div className="grid grid-cols-4 gap-2 w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%] opacity-50">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-full bg-slate-800 rounded-sm"
                  style={{
                    background: i % 2 === 0
                      ? 'linear-gradient(45deg, #1f2937, #374151)'
                      : (i % 3 === 0 ? 'linear-gradient(to right, #7e22ce, #db2777)' : 'linear-gradient(to bottom, #d97706, #b45309)'),
                    opacity: 0.3 + (Math.random() * 0.5)
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between p-7 md:p-24 pb-10 md:pb-16 gap-8 md:gap-8">

            <div className="flex-1 md:max-w-md">
              <PremiumReveal 
                text="Ready to grow your startup?"
                className="font-display font-bold text-white text-3xl md:text-6xl tracking-tight leading-[1.1] mb-4 md:mb-6"
                stagger={0.05}
              />
              <p className="text-gray-300 text-sm md:text-base mb-8">
                Join 100+ startups already growing with Leyvolve. Get your free website audit today.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[['3x', 'Avg. Conversions'], ['287%', 'Traffic Growth'], ['90 Days', '#1 Google Ranking']].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="text-[#FF5A1F] font-display font-black text-xl md:text-2xl">{val}</div>
                    <div className="text-white/40 text-[10px] mt-1 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-display font-bold text-2xl mb-2">Message Sent!</h3>
                  <p className="text-white/50">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-white font-semibold text-sm">Your Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      placeholder="Enter Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/30 text-sm focus:ring-0 focus:border-white transition-colors py-2 px-0"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-white font-semibold text-sm">Your Email</label>
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="Enter Your Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/30 text-sm focus:ring-0 focus:border-white transition-colors py-2 px-0"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-white font-semibold text-sm">Mobile Number</label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      placeholder="Enter Your Mobile Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/30 text-sm focus:ring-0 focus:border-white transition-colors py-2 px-0"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="desc" className="text-white font-semibold text-sm">Describe Your Buisness</label>
                    <textarea
                      required
                      id="desc"
                      placeholder="Type Here..."
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/30 text-sm focus:ring-0 focus:border-white transition-colors py-2 px-0 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 mb-4 text-[10px] text-red-400 border border-red-400/20 rounded-lg bg-red-400/5">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    id="homepage-contact-submit"
                    disabled={isSubmitting}
                    className={`w-full mt-4 bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] hover:from-[#e05c00] hover:to-[#d03400] text-white font-bold text-sm rounded-full py-3.5 transition-all duration-300 shadow-lg shadow-orange-500/30 text-center ${isSubmitting ? 'opacity-70' : 'hover:scale-[1.02]'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Get Free Website Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="relative w-full overflow-hidden border-t border-white/10 py-6 mb-2">
            <div className="absolute inset-x-0 h-full bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 pointer-events-none" />

            <div className="flex w-[200%] whitespace-nowrap animate-marquee">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-4 text-white/50 text-xl font-display font-medium">
                  <span>info@leyvolve.com</span>
                  <span className="text-sm">✖</span>
                  <span>info@leyvolve.com</span>
                  <span className="text-sm">✖</span>
                  <span>info@leyvolve.com</span>
                  <span className="text-sm">✖</span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen font-body selection:bg-[#FF6A00] selection:text-white relative z-0 transition-colors duration-500 dark:bg-[#0a0a0f] bg-slate-50 dark:text-white text-slate-900">
      <Navbar />
      <main className="pb-20">
        <Hero />
        <Services />
        <StatsBar />
        <About />
        <Process />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
