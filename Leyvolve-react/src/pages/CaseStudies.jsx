import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const caseStudies = [
  {
    id: 1,
    client: 'TechLaunch India',
    industry: 'SaaS / B2B',
    tagline: 'From zero presence to #1 on Google in 90 days',
    challenge: 'TechLaunch had a dated website and no organic traffic. They were spending heavily on paid ads with poor ROI and had no content strategy.',
    solution: 'Complete website redesign with conversion-first UX, on-page SEO overhaul, and a targeted content strategy built around high-intent keywords.',
    accent: '#6366f1',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    results: [
      { metric: '287%', label: 'Organic Traffic Increase' },
      { metric: '#1', label: 'Google Ranking (Target KW)' },
      { metric: '3.4x', label: 'Conversion Rate' },
    ],
    services: ['Web Design', 'SEO', 'Content Strategy'],
    duration: '3 Months',
  },
  {
    id: 2,
    client: 'Nova Streetwear',
    industry: 'D2C Fashion / E-commerce',
    tagline: '2M+ reach and 600% ROAS from influencer campaigns',
    challenge: 'Nova had great products but no brand presence online. Their Instagram had 800 followers and influencer campaigns were running without any strategy or tracking.',
    solution: 'Built a full influencer marketing strategy, identified 40+ micro-influencers in the fashion niche, designed campaign creatives, and implemented UTM-based ROI tracking.',
    accent: '#f472b6',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    results: [
      { metric: '2M+', label: 'Total Campaign Reach' },
      { metric: '600%', label: 'Return on Ad Spend' },
      { metric: '18K', label: 'New Instagram Followers' },
    ],
    services: ['Influencer Marketing', 'Content Strategy', 'Social Media'],
    duration: '2 Months',
  },
  {
    id: 3,
    client: 'GreenPath Consulting',
    industry: 'B2B Professional Services',
    tagline: '150+ qualified leads per month through targeted digital marketing',
    challenge: 'GreenPath had strong offline credibility but zero digital lead generation. Their website was not generating any leads and they had no paid or organic strategy.',
    solution: 'Redesigned their service landing pages, launched Google Ads targeting high-intent keywords, set up a lead nurturing email funnel, and optimized for conversions.',
    accent: '#10b981',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    results: [
      { metric: '150+', label: 'Qualified Leads / Month' },
      { metric: '42%', label: 'Email Open Rate' },
      { metric: '₹180', label: 'Avg. Cost per Lead' },
    ],
    services: ['Digital Marketing', 'Landing Page Design', 'Email Marketing'],
    duration: '4 Months',
  },
]

function CaseStudyCard({ study, index }) {
  const isEven = index % 2 === 0

  return (
    <Reveal delay={0.1}>
      <article
        id={`case-study-${study.id}`}
        className="relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 mb-10"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${study.accent}, transparent)` }} />

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0`}>
          {/* Image */}
          <div className={`relative overflow-hidden min-h-[340px] ${!isEven ? 'lg:order-2' : ''}`}>
            <img
              src={study.image}
              alt={`${study.client} — ${study.tagline}`}
              loading="lazy"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span
                className="inline-block mb-3 px-3 py-1 rounded-full text-[11px] font-bold text-white self-start"
                style={{ backgroundColor: study.accent }}
              >
                {study.industry}
              </span>
              <h2 className="font-display font-black text-white text-2xl leading-snug">
                {study.tagline}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className={`p-8 md:p-12 flex flex-col justify-between ${!isEven ? 'lg:order-1' : ''}`}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${study.accent}20` }}>
                  <span className="font-display font-black text-sm" style={{ color: study.accent }}>0{study.id}</span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Client</div>
                  <div className="font-display font-bold text-[#111]">{study.client}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">The Challenge</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{study.challenge}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Our Solution</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{study.solution}</p>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-8">
                {study.services.map(s => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-[11px] font-semibold border"
                    style={{ color: study.accent, borderColor: `${study.accent}30`, backgroundColor: `${study.accent}08` }}
                  >
                    {s}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500">
                  {study.duration}
                </span>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-2xl p-5" style={{ background: `${study.accent}08`, border: `1px solid ${study.accent}20` }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: study.accent }}>Key Results</div>
              <div className="grid grid-cols-3 gap-4">
                {study.results.map(r => (
                  <div key={r.label} className="text-center">
                    <div className="font-display font-black text-2xl" style={{ color: study.accent }}>{r.metric}</div>
                    <div className="text-slate-500 text-[10px] mt-1 leading-tight">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function CaseStudies() {
  return (
    <div className="min-h-screen font-body bg-slate-50 text-slate-900 selection:bg-[#FF6A00] selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[5%] left-[5%] w-[40%] h-[50%] rounded-full bg-orange-400/10 blur-[120px]" />
          <div className="absolute top-[20%] right-0 w-[30%] h-[40%] rounded-full bg-indigo-400/8 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
              Proof of Work
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[#111] mb-6">
              Startup Success Stories —
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]">
                Leyvolve Case Studies
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Real results for real startups. Explore how Leyvolve has helped Indian businesses grow through web design, SEO, digital marketing, and influencer campaigns.
            </p>
          </Reveal>

          {/* Stats Row */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
              {[['100+', 'Projects Delivered'], ['50+', 'Clients Served'], ['3x', 'Avg. ROI'], ['90 days', 'Avg. To Results']].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="font-display font-black text-3xl text-[#111]">{val}</div>
                  <div className="text-slate-400 text-xs mt-1 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Selected Case Studies)</span>
            <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] text-[#111] mt-3">
              How We Helped Startups Grow
            </h2>
          </div>

          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </section>

      {/* Process Teaser */}
      <section className="relative py-20 bg-[#0F0F0F] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[100%] rounded-full bg-[#FF6A00]/5 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Our Approach)</span>
            <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] text-white mt-4 mb-3">
              How We Deliver Results
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto">
              Every success story starts with the same proven process.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Discovery', desc: 'Understand your goals, audience &amp; competitors.' },
              { num: '02', title: 'Strategy', desc: 'Data-backed plan tailored to your growth stage.' },
              { num: '03', title: 'Execution', desc: 'Pixel-perfect delivery, on time, every time.' },
              { num: '04', title: 'Growth', desc: 'Measure, iterate, and compound results.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#FF6A00]/40 transition-all duration-300"
                >
                  <div className="font-display font-black text-4xl text-white/5 mb-3">{step.num}</div>
                  <h3 className="font-display font-bold text-white text-base mb-1">{step.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[15%] w-[35%] h-[80%] rounded-full bg-orange-400/10 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-[#111] mb-6 leading-tight">
              Want Results Like These?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]">
                Let's Talk.
              </span>
            </h2>
            <p className="text-slate-500 text-base mb-10">
              Book a free 30-minute strategy call. No commitment, no fluff — just a clear roadmap for your startup's growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                id="case-studies-cta-primary"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] text-white font-semibold text-[15px] shadow-lg shadow-orange-400/30 hover:scale-105 transition-all duration-300"
              >
                Book Free Strategy Call
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/services"
                id="case-studies-cta-services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-200 text-slate-600 hover:border-slate-400 text-sm font-medium transition-all duration-300 hover:bg-slate-50"
              >
                See Our Services
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
