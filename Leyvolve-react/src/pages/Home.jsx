import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PremiumReveal from '../components/PremiumReveal.jsx'
import { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
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

          <div className="font-display font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight dark:text-white text-[#1a1a1a] max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 mb-2">
              {splitText('Effortless')}
              <motion.span 
                initial={{ scale: 0, rotate: -20 }}
                animate={!loading ? { scale: 1, rotate: -6 } : { scale: 0, rotate: -20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-[clamp(3.5rem,8vw,5.5rem)] h-[clamp(3.5rem,8vw,5.5rem)] rounded-full overflow-hidden shadow-sm bg-orange-100 flex items-center justify-center p-1.5"
              >
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=200&h=200&auto=format&fit=crop" alt="Phone" className="w-full h-full object-cover rounded-full mix-blend-multiply" />
              </motion.span>
              <span className="text-[#ff5c00] overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%' }}
                  animate={!loading ? { y: 0 } : { y: '100%' }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  Design
                </motion.span>
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 mb-2">
              <span className="text-gray-500 font-medium text-[clamp(2rem,5vw,4.5rem)] overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%' }}
                  animate={!loading ? { y: 0 } : { y: '100%' }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  for
                </motion.span>
              </span>
              <motion.span 
                initial={{ scale: 0 }}
                animate={!loading ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-[clamp(3.5rem,8vw,5.5rem)] h-[clamp(3.5rem,8vw,5.5rem)] rounded-full overflow-hidden shadow-sm bg-stone-800 p-0.5"
              >
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&h=200&auto=format&fit=crop" alt="Working" className="w-full h-full object-cover rounded-full opacity-90" />
              </motion.span>
              {splitText('Design Startups')}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4">
              <span className="text-gray-500 font-medium text-[clamp(2rem,5vw,4.5rem)] overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%' }}
                  animate={!loading ? { y: 0 } : { y: '100%' }}
                  transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  based in
                </motion.span>
              </span>
              {splitText('INDIA')}
              <motion.span 
                initial={{ scale: 0 }}
                animate={!loading ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-[clamp(3.5rem,8vw,5.5rem)] h-[clamp(3.5rem,8vw,5.5rem)] rounded-full overflow-hidden border-2 border-slate-200"
              >
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=200&h=200&auto=format&fit=crop" alt="INDIA" className="w-full h-full object-cover" />
              </motion.span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-10 font-body text-[clamp(0.9rem,1.5vw,1.1rem)] text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            We make it easy for startups to launch, grow, and scale with clean,
            <br className="hidden md:block" /> conversion focused designs — no delays, no drama.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={!loading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-12"
          >
            <button
              onClick={() => scrollTo('#pricing')}
              className="group flex items-center justify-center gap-3 px-8 py-4 dark:bg-white dark:text-black bg-[#3d3d3d] hover:bg-[#222] text-white rounded-full font-medium text-[15px] transition-all duration-300 shadow-md transform hover:scale-105"
            >
              View Plans
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>

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
      className="relative w-full overflow-hidden dark:bg-[#15151a]/80 bg-slate-50/60 backdrop-blur-3xl transition-colors py-32 flex flex-col justify-center items-center -mt-16"
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

const tags = [
  { label: 'Branding', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
  { label: 'Logo', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
  { label: 'Website', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
  { label: 'Illustration', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
  { label: 'Interface', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg> },
  { label: 'Strategy', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
]

function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full dark:bg-[#08080a]/80 bg-slate-100/60 backdrop-blur-3xl transition-colors py-24 md:py-32 flex flex-col items-center justify-center -mt-8"
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

        <PremiumReveal 
          text="We help fast moving digital startups launch sharper brands and websites — with clarity , speed, and no drama."
          className="font-display font-medium text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight dark:text-white text-[#1a1a1a] mb-12"
          stagger={0.03}
        />

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

const cards = [
  {
    id: 1,
    title: 'Web Development & Design',
    description: "We've helped startups and brands across industries launch stunning, high-performance websites that captivate and convert. Here are some of our selected works.",
    year: '2025',
    role: 'Lead Designer',
    services: ['Website Design', 'Product Design', 'Branding', 'Development'],
    accent: '#6366f1',
    tag: 'Ps',
    mockupBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    mockupAccent: 'rgba(99,102,241,0.3)',
    mockupTitle: 'Archin Design Studio',
    mockupSubtitle: 'Web & Brand Identity',
  },
  {
    id: 2,
    title: 'Influencer Marketing',
    description: "Connecting brands with the right creators for measurable reach. We identify, manage, and track influencer campaigns that deliver authentic results and real conversions.",
    year: '2025',
    role: 'Campaign Lead',
    services: ['Influencer Strategy', 'Creator Outreach', 'Campaign Tracking', 'ROI Analysis'],
    accent: '#f472b6',
    tag: 'Ai',
    mockupBg: 'linear-gradient(135deg, #2e1a2e 0%, #3d0f3d 50%, #5c0a3f 100%)',
    mockupAccent: 'rgba(244,114,182,0.3)',
    mockupTitle: 'Nova Creator Network',
    mockupSubtitle: 'Influencer Campaigns',
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description: "Full-funnel digital strategies built to scale. From paid acquisition to email funnels, we help startups build predictable revenue engines — no guesswork, just growth.",
    year: '2025',
    role: 'Growth Strategist',
    services: ['PPC Ads', 'Email Marketing', 'Conversion Funnels', 'Analytics'],
    accent: '#fb923c',
    tag: 'Xd',
    mockupBg: 'linear-gradient(135deg, #2e1a0a 0%, #3d2a10 50%, #5c3a18 100%)',
    mockupAccent: 'rgba(251,146,60,0.3)',
    mockupTitle: 'Launchpad Growth Co.',
    mockupSubtitle: 'Digital Marketing Suite',
  },
  {
    id: 4,
    title: 'Social Media Management',
    description: "Strategic social presence that builds community and drives engagement. We create, schedule, and optimize content across all major platforms with data at the helm.",
    year: '2025',
    role: 'Social Strategist',
    services: ['Content Creation', 'Scheduling', 'Instagram', 'LinkedIn'],
    accent: '#34d399',
    tag: 'Fg',
    mockupBg: 'linear-gradient(135deg, #0a2e1a 0%, #103d20 50%, #155c30 100%)',
    mockupAccent: 'rgba(52,211,153,0.3)',
    mockupTitle: 'Greenwave Social Hub',
    mockupSubtitle: 'Social Media Strategy',
  },
  {
    id: 5,
    title: 'SEO Optimization',
    description: "Dominate search rankings with technical precision. Keyword research, on-page optimization, authority building — compounding organic traffic that grows month over month.",
    year: '2025',
    role: 'SEO Lead',
    services: ['Technical SEO', 'Keyword Research', 'Link Building', 'Content Strategy'],
    accent: '#38bdf8',
    tag: 'In',
    mockupBg: 'linear-gradient(135deg, #0a1a2e 0%, #0f2a40 50%, #153d5c 100%)',
    mockupAccent: 'rgba(56,189,248,0.3)',
    mockupTitle: 'Apex Search Consulting',
    mockupSubtitle: 'SEO & Content Strategy',
  },
]

function LaptopMockup({ card }) {
  return (
    <div className="relative w-full flex items-center justify-center">

      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${card.mockupAccent} 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      <div className="relative w-[85%] max-w-[520px]">

        <div
          className="relative rounded-t-2xl overflow-hidden border border-white/10"
          style={{ paddingTop: '62%', background: card.mockupBg }}
        >
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded"
                style={{ backgroundColor: card.accent, color: '#000' }}
              >
                {card.tag}
              </div>
              <div className="flex-1 h-1 rounded bg-white/5" />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accent }} />
            </div>

            <div
              className="flex-1 rounded-xl overflow-hidden relative flex items-end p-4"
              style={{
                background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%), ${card.mockupBg}`,
                border: `1px solid ${card.accent}25`,
              }}
            >
              <div className="absolute inset-0 opacity-30">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 rounded-t-sm"
                    style={{
                      left: `${10 + i * 14}%`,
                      width: '10%',
                      height: `${30 + (i % 3) * 20}%`,
                      backgroundColor: card.accent,
                      opacity: 0.4 + (i % 3) * 0.2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <p className="text-white/50 text-[9px] uppercase tracking-widest mb-1">{card.mockupSubtitle}</p>
                <h3 className="text-white font-bold text-base leading-tight">{card.mockupTitle}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="h-2.5 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b border-t border-white/5" />
        <div className="h-1.5 bg-gradient-to-b from-[#1a1a1a] to-[#111] rounded-b-xl mx-4 border-x border-b border-white/5" />

        <div
          className="absolute -bottom-4 -right-4 w-[22%] rounded-xl overflow-hidden border border-white/10 shadow-xl"
          style={{ aspectRatio: '9/16', background: card.mockupBg }}
        >
          <div className="p-1.5 h-full flex flex-col gap-1">
            <div className="w-full rounded bg-white/10 flex-1" style={{ background: `${card.accent}25` }} />
            <div className="w-2/3 h-1 rounded bg-white/10" />
            <div className="w-1/2 h-1 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ScrollCard({ card, index, totalCards }) {
  const wrapperRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const topOffset = `12vh`

  return (
    <div ref={wrapperRef} className="w-full relative" style={{ height: '100vh' }}>
      <div
        className="sticky w-full flex justify-center px-4 md:px-10"
        style={{ top: topOffset }}
      >
        <motion.div
          style={{
            scale: index === totalCards - 1 ? 1 : scale,
            opacity: index === totalCards - 1 ? 1 : opacity,
            transformOrigin: 'top center',
          }}
          className="relative w-full max-w-[85rem] rounded-[32px] overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-[#0A0A0E] border border-white/10 transition-colors"
            style={{
              boxShadow: `0 -10px 40px rgba(0,0,0,0.1), 0 30px 60px rgba(0,0,0,0.4)`,
            }}
          />

          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent 0%, ${card.accent}80 50%, transparent 100%)` }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[280px_1fr_240px]" style={{ height: 'clamp(380px, 75vh, 650px)' }}>

            <div className="flex flex-col justify-between p-8 md:p-12 border-r border-white/5">
              <div className="mt-8">
                <p className="text-[#a0a0a0] text-[15px] leading-relaxed transition-colors">
                  {card.description}
                </p>
              </div>
              <button
                className="self-start text-xs font-medium px-5 py-2.5 rounded-full border transition-all hover:opacity-80"
                style={{ color: card.accent, borderColor: `${card.accent}40`, backgroundColor: `${card.accent}12` }}
              >
                View Work →
              </button>
            </div>

            <div className="flex items-center justify-center px-6 py-8 relative">
              <LaptopMockup card={card} />
            </div>

            <div className="flex flex-col justify-center gap-8 p-8 md:p-12 border-l border-white/5">
              <div>
                <p className="text-[#666] text-[10px] uppercase tracking-[0.15em] mb-2 font-semibold">Year</p>
                <p className="text-white font-bold text-2xl">{card.year}</p>
              </div>
              <div>
                <p className="text-[#666] text-[10px] uppercase tracking-[0.15em] mb-2 font-semibold">Role</p>
                <p className="text-[#f0f0f0] text-sm">{card.role}</p>
              </div>
              <div>
                <p className="text-[#666] text-[10px] uppercase tracking-[0.15em] mb-2 font-semibold">Services</p>
                <div className="flex flex-col gap-1.5">
                  {card.services.map((s, i) => (
                    <p key={i} className="text-[#f0f0f0] font-medium text-[13px]">{s}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 md:px-12 py-5 border-t border-white/5 bg-[#0A0A0E] backdrop-blur-md transition-colors"
          >
            <h3 className="text-white font-bold text-lg tracking-tight">{card.title}</h3>
            <span className="text-[#666] font-mono text-sm tracking-widest font-semibold">
              0{card.id} / 0{totalCards}
            </span>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

function Process() {
  return (
    <section id="process" className="relative dark:bg-[#0f0f13]/80 bg-white/60 backdrop-blur-3xl transition-colors pt-20 pb-0">
      <GradientBackground />
      <div className="sticky top-10 w-full flex justify-center pointer-events-none z-0 overflow-hidden select-none">
        <h2
          className="font-display font-black text-[clamp(4rem,14vw,12rem)] text-slate-200 dark:text-white/5 leading-none tracking-tight transition-colors"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.02)' }}
        >
          Recent Works
        </h2>
      </div>

      <div className="relative z-10 w-full mx-auto pb-0">
        <div className="flex-shrink-0 pt-4 pb-0 text-center relative z-20">
          <span className="font-mono text-[11px] text-[#555] tracking-[0.3em] uppercase">(Why clients love us)</span>
        </div>

        <div className="mt-10">
          {cards.map((card, i) => (
            <ScrollCard
              key={card.id}
              card={card}
              index={i}
              totalCards={cards.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
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
    <section id="portfolio" className="relative dark:bg-[#15151a]/80 bg-slate-50/60 backdrop-blur-3xl transition-colors pt-10 pb-24">
      <GradientBackground />

      <div className="sticky top-10 w-full flex justify-center pointer-events-none z-0 overflow-hidden select-none">
        <h2
          className="font-display font-black text-[clamp(4rem,14vw,12rem)] text-slate-200 dark:text-white/5 leading-none tracking-tight whitespace-nowrap transition-colors"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.01)' }}
        >
          Our Portfolio
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 -mt-20">

        <div className="flex-shrink-0 pt-4 pb-0 text-center relative z-20 mb-12">
          <span className="font-mono text-[11px] text-[#555] tracking-[0.3em] uppercase">(Selected Works)</span>
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
                    <h3 className={`font-bold text-white drop-shadow transition-all duration-500 ${isActive ? 'text-2xl mb-3' : 'text-lg md:-rotate-90 md:origin-bottom-left md:absolute md:bottom-16 md:left-6 whitespace-nowrap mb-0'}`}>
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
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
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
    <section id="contact" className="relative dark:bg-[#0a0a0f]/80 bg-white/60 backdrop-blur-3xl transition-colors py-32 overflow-hidden flex flex-col items-center">
      <GradientBackground />

      <div className="absolute top-10 w-full flex justify-center pointer-events-none z-0 overflow-hidden select-none">
        <h2
          className="font-display font-black text-[clamp(4rem,14vw,14rem)] text-slate-200 dark:text-white/5 leading-none tracking-tight whitespace-nowrap transition-colors"
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

          <div className="relative z-10 flex flex-col md:flex-row justify-between p-12 md:p-24 pb-16 gap-16 md:gap-8">

            <div className="flex-1 md:max-w-md">
              <PremiumReveal 
                text="Got a project in mind?"
                className="font-display font-bold text-white text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6"
                stagger={0.05}
              />
              <p className="text-gray-300 text-sm md:text-base">
                Let's make something happen together
              </p>
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
                    <label htmlFor="desc" className="text-white font-semibold text-sm">Project Description</label>
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
                    disabled={isSubmitting}
                    className={`w-full mt-4 bg-white/90 hover:bg-white text-black font-semibold text-sm rounded-full py-3 transition-colors text-center ${isSubmitting ? 'opacity-70' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Now!'}
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
        <About />
        <Process />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
