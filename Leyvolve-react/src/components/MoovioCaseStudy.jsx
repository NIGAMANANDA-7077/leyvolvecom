import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* ─── Sub-Components ─── */

const ScrollReveal = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-10% 0px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ─── Main Component ─── */
export default function MoovioCaseStudy() {
    const sectionRef = useRef(null);

    // Parallax for the huge hero banner
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const bannerScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const bannerY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={sectionRef} className="relative bg-[#050505] text-white overflow-hidden py-32 rounded-[3rem] my-24 mx-4 md:mx-8 border border-white/5 shadow-2xl">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6A00]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

            {/* 1. Header / Intro */}
            <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="flex-1 max-w-2xl">
                    <ScrollReveal>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold text-[#FF6A00] border border-[#FF6A00]/30 bg-[#FF6A00]/10 uppercase tracking-widest">
                                Premium Case Study
                            </span>
                            <span className="text-white/40 text-sm font-mono tracking-widest uppercase">2025</span>
                        </div>
                        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6 break-words">
                            Moovio Inspired <br className="hidden md:block" /> E-commerce Platform.
                        </h2>
                        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg mb-0 text-balance">
                            A high-performance luxury streetwear storefront built for conversions. Featuring seamless navigation, BOGO promotional engines, and a dark minimalist aesthetic that puts the products front and center.
                        </p>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={0.2} className="flex-shrink-0">
                    <a
                        href="https://themoovio.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 px-8 py-5 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-wider transition-all hover:bg-[#FF6A00] hover:text-white"
                    >
                        Visit Live Site
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </ScrollReveal>
            </div>

            {/* 2. Hero Banner Parallax */}
            <div className="w-full h-[50vh] md:h-[75vh] overflow-hidden relative mb-24">
                <motion.div 
                    className="absolute inset-0 w-full h-[120%]"
                    style={{ y: bannerY, scale: bannerScale }}
                >
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop")' }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    {/* Gradient fades for seamless blending */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
                </motion.div>
                
                {/* Floating UI Element on banner */}
                <div className="absolute bottom-10 left-10 md:bottom-20 md:left-24 glass-card p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl max-w-xs">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-white/80 font-mono text-sm uppercase tracking-widest">Live Metrics</span>
                    </div>
                    <p className="text-3xl font-display font-bold text-white mb-1">+45%</p>
                    <p className="text-white/50 text-xs uppercase tracking-wider">Conversion Rate Increase</p>
                </div>
            </div>

            {/* 3. Features Bento Grid */}
            <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 mb-8">
                <ScrollReveal>
                    <div className="mb-12">
                        <h3 className="font-display font-bold text-3xl md:text-5xl mb-4">Core Platform Features</h3>
                        <div className="w-20 h-1 bg-[#FF6A00]" />
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                    {/* Main Feature */}
                    <ScrollReveal delay={0.1} className="md:col-span-2 md:row-span-2 bg-[#0F0F0F] rounded-3xl p-10 border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <svg className="w-10 h-10 text-[#FF6A00] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                <h4 className="text-3xl font-bold mb-4 font-display">Immersive Product Discovery</h4>
                                <p className="text-white/50 text-lg max-w-md leading-relaxed">
                                    A fluid grid structure combining high-res lookbooks with quick-add-to-cart functionality. Customers can browse hoodies, tees, and denim seamlessly without leaving the feed.
                                </p>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {['Tees', 'Hoodies', 'Denim', 'Accessories'].map(tag => (
                                    <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-xs text-white/70 uppercase tracking-widest bg-white/5">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Secondary Feature 1 */}
                    <ScrollReveal delay={0.2} className="bg-[#0F0F0F] rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-3 font-display">Promotional Engine</h4>
                            <p className="text-white/50 text-sm leading-relaxed mb-6">
                                Built-in support for complex promotional tiers. Features BOGO offers, countdown timers, and first-time buyer discounts integrated directly into the cart drawer.
                            </p>
                            <div className="w-full h-24 bg-[#1a1a1a] rounded-xl border border-white/5 flex items-center justify-center border-dashed group-hover:bg-[#FF6A00]/10 group-hover:border-[#FF6A00]/30 transition-colors">
                                <span className="text-[#FF6A00] font-mono font-bold text-lg">BUY 1 GET 1 50%</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Secondary Feature 2 */}
                    <ScrollReveal delay={0.3} className="bg-[#0F0F0F] rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h4 className="text-xl font-bold mb-3 font-display">Frictionless Checkout</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    One-page express checkout optimized for mobile. Includes fast delivery options, easy returns, and multiple payment gateways.
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-4 p-4 rounded-xl bg-white/5">
                                <span className="text-white font-medium text-sm">Cart Total</span>
                                <span className="text-white font-bold font-mono">Flexible</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
