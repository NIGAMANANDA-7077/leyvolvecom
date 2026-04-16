import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = ['All', 'Web Design', 'Digital Marketing', 'SEO', 'Branding', 'Startup Growth']

const blogPosts = [
  {
    id: 1,
    slug: 'website-cost-india-2025',
    title: 'How Much Does a Website Cost in India? (2025 Complete Guide)',
    excerpt: 'Planning to build a website for your startup or business in India? Here\'s a transparent breakdown of website design and development costs — from landing pages to full e-commerce platforms.',
    category: 'Web Design',
    readTime: '7 min read',
    date: 'Apr 8, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tag: 'Guide',
    tagColor: '#6366f1',
  },
  {
    id: 2,
    slug: 'best-web-design-agency-startups-india',
    title: 'How to Choose the Best Web Design Agency for Startups in India',
    excerpt: 'Not all web design agencies are created equal. Here\'s what India\'s top-performing startups look for when hiring a digital agency — and red flags to watch out for.',
    category: 'Web Design',
    readTime: '8 min read',
    date: 'Apr 5, 2026',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    tag: 'Strategy',
    tagColor: '#FF6A00',
  },
  {
    id: 3,
    slug: 'branding-vs-marketing-startups',
    title: 'Branding vs Marketing for Startups: What to Focus on First?',
    excerpt: 'One of the most common debates among early-stage founders: should you invest in branding or marketing first? The answer might surprise you — and depends entirely on your growth stage.',
    category: 'Branding',
    readTime: '6 min read',
    date: 'Apr 2, 2026',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
    tag: 'Insights',
    tagColor: '#f472b6',
  },
  {
    id: 4,
    slug: 'seo-strategies-indian-startups-2025',
    title: 'Top 10 SEO Strategies for Indian Startups in 2025',
    excerpt: 'Google\'s algorithm keeps evolving. Here are the 10 SEO tactics that are actually working for Indian startups in 2025 — based on real campaigns, not theory.',
    category: 'SEO',
    readTime: '10 min read',
    date: 'Mar 28, 2026',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    tag: 'Tactics',
    tagColor: '#10b981',
  },
  {
    id: 5,
    slug: 'choose-digital-marketing-agency-india',
    title: 'How to Choose a Digital Marketing Agency in India (Without Getting Burned)',
    excerpt: 'India has thousands of digital marketing agencies. How do you find one that actually delivers results — not vanity metrics? This guide reveals what to look for, what to avoid, and the right questions to ask.',
    category: 'Digital Marketing',
    readTime: '9 min read',
    date: 'Mar 21, 2026',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    tag: 'Guide',
    tagColor: '#6366f1',
  },
  {
    id: 6,
    slug: 'high-converting-website-startup',
    title: 'Why Your Startup Needs a High-Converting Website (Not Just a Pretty One)',
    excerpt: 'A beautiful website that doesn\'t convert is just an expensive digital brochure. Here\'s what separates a high-performing startup website from one that just looks good on Dribbble.',
    category: 'Startup Growth',
    readTime: '7 min read',
    date: 'Mar 15, 2026',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
    tag: 'CRO',
    tagColor: '#FF6A00',
  },
]

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

function BlogCard({ post, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: post.tagColor }}
            >
              {post.tag}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-semibold text-[#FF6A00] uppercase tracking-wider">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[11px] text-slate-400">{post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[11px] text-slate-400">{post.date}</span>
          </div>

          <h2 className="font-display font-bold text-[#111] text-lg leading-snug mb-3 group-hover:text-[#FF6A00] transition-colors duration-300 flex-1">
            {post.title}
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 text-sm font-semibold text-[#FF6A00] mt-auto">
            Read Article
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen font-body bg-slate-50 text-slate-900 selection:bg-[#FF6A00] selection:text-white">
      {/* SEO: Per-page meta handled via document title update */}
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[10%] left-[10%] w-[35%] h-[50%] rounded-full bg-orange-400/10 blur-[120px]" />
          <div className="absolute top-[30%] right-0 w-[25%] h-[40%] rounded-full bg-orange-300/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
              Digital Marketing & Web Design Insights
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[#111] mb-6">
              Digital Marketing & Web Design
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]">
                Blog for Startups
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Actionable insights on web design, SEO, digital marketing, and growth strategy — written for Indian startup founders and marketers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                id={`blog-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#FF6A00] text-white shadow-md shadow-orange-300/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No articles in this category yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[80%] rounded-full bg-[#FF6A00]/8 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <span className="font-mono text-[11px] text-[#FF6A00] tracking-[0.3em] uppercase">(Need Expert Help?)</span>
            <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] text-white mt-4 mb-6 leading-tight">
              Ready to Grow Your Startup?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF3C00]">
                Let's Build Your Strategy.
              </span>
            </h2>
            <p className="text-white/50 text-base mb-10">
              Join 100+ Indian startups that trust Leyvolve for web design, SEO &amp; digital marketing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                id="blog-cta-strategy"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] text-white font-semibold text-[15px] shadow-lg shadow-orange-500/30 hover:scale-105 transition-all duration-300"
              >
                Get Free Audit
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/services"
                id="blog-cta-services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-sm font-medium transition-all duration-300"
              >
                View Our Services
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
