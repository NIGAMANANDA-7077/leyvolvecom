import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PremiumReveal from '../components/PremiumReveal';

// --- Reusable Components & Helpers ---

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

const AnimatedNumber = ({ value }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = parseInt(value, 10);
            if (start === end) return;

            const duration = 2000;
            const incrementTime = (duration / end);

            const timer = setInterval(() => {
                start += 1;
                setDisplayValue(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [value, inView]);

    return <span ref={ref}>{displayValue}</span>;
};

// --- Main Page Component ---

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
    );
}

export default function Aboutus() {
    const { scrollYProgress } = useScroll();
    const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div className="min-h-screen font-body selection:bg-[#FF6A00] selection:text-white relative z-0 transition-colors duration-500 dark:bg-[#0a0a0f] bg-slate-50 dark:text-white text-slate-900">

            <Navbar />

            <main className="pb-20">

                {/* 1. Hero Section */}
                <section className="relative overflow-hidden dark:bg-[#0a0a0f]/70 bg-white/50 backdrop-blur-3xl transition-colors duration-500 border-b dark:border-white/10 border-slate-200/50">
                    <GradientBackground />
                    <div className="max-w-[1200px] mx-auto px-6 pt-[160px] pb-[120px] flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                        {/* Subtle blurred background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#FF6A00]/10 to-[#FF3C00]/5 blur-[120px] pointer-events-none" />

                        <div className="flex-1 relative z-10">
                            <PremiumReveal 
                                text="Designing Digital Experiences For Fast-Growing Startups"
                                className="font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6"
                                stagger={0.05}
                            />

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-xl dark:text-gray-300 text-gray-600 max-w-lg mb-10 leading-relaxed"
                            >
                                To help brands stand out online, tell their story, and drive measurable success through digital creativity.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <button className="group relative px-8 py-4 dark:bg-white dark:text-black bg-slate-900 text-white rounded-full font-medium text-sm md:text-base overflow-hidden transition-transform hover:scale-105 shadow-xl">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start a Project
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </button>
                            </motion.div>
                        </div>

                        <div className="flex-1 relative w-full h-[500px] perspective-1000 hidden md:block">
                            {/* Floating UI Elements */}
                            <motion.div
                                animate={{ y: [-15, 15, -15] }}
                                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                                className="absolute top-10 right-10 w-64 glass-card p-6 rounded-2xl z-20 bg-gradient-to-br from-[#FF6A00]/20 to-[#FF3C00]/20"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00] to-[#FF3C00] rounded-xl mb-4" />
                                <div className="w-3/4 h-3 bg-white/20 rounded-full mb-2" />
                                <div className="w-1/2 h-3 bg-white/10 rounded-full" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -20, 10] }}
                                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                                className="absolute bottom-20 left-10 w-72 glass-card p-5 rounded-2xl shadow-xl z-10 bg-gradient-to-br from-[#FF6A00]/20 to-[#FF3C00]/20"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full dark:bg-white/20 bg-slate-200" />
                                    <div>
                                        <div className="w-24 h-2 dark:bg-white/30 bg-slate-300 rounded-full mb-1" />
                                        <div className="w-16 h-2 dark:bg-white/20 bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                                <div className="w-full h-24 dark:bg-white/5 bg-slate-300 border dark:border-white/30 border-slate-200 rounded-xl flex items-end px-2 gap-2">
                                    {[40, 70, 45, 90, 60, 100].map((h, i) => (
                                        <div key={i} className="w-full bg-[#FF6A00] rounded-t-sm" style={{ height: `${h}%`, opacity: 0.2 + (i * 0.1) }} />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Back Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF6A00]/20 blur-[80px] rounded-full" />
                        </div>
                    </div>
                </section>

                {/* 2. Our Story Section */}
                <section className="relative overflow-hidden dark:bg-[#15151a]/80 bg-slate-50/60 backdrop-blur-3xl transition-colors duration-500">
                    <GradientBackground />
                    <div className="max-w-[1200px] mx-auto px-6 py-[120px] relative z-10">
                        <div className="flex flex-col md:flex-row gap-16 items-center">
                            <ScrollReveal className="flex-1">
                                <PremiumReveal 
                                    text="Our Story"
                                    className="font-display font-bold text-4xl md:text-5xl mb-6 text-slate-900 dark:text-white"
                                    stagger={0.05}
                                />
                                <p className="dark:text-gray-300 text-gray-600 text-lg leading-relaxed mb-6">
                                    We started as a small creative team focused on building beautiful websites for startups.
                                    Today we help companies launch brands, products, and digital experiences that scale globally.
                                </p>
                                <p className="dark:text-gray-300 text-gray-600 text-lg leading-relaxed">
                                    Design isn't just about looking good—it's about working flawlessly. We combine aesthetics with deep strategic thinking to craft products that users actually love.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2} className="flex-1 w-full">
                                <motion.div style={{ y: heroParallax }} className="relative h-[400px] md:h-[600px] w-full rounded-[2rem] overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                                        alt="Team collaborating"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                                </motion.div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                {/* 3. Stats Section */}
                {/* <section className="relative overflow-hidden dark:bg-[#08080a]/80 bg-slate-100/60 backdrop-blur-3xl transition-colors duration-500 py-[120px] dark:text-white text-slate-800 my-10 border-t dark:border-white/10 border-slate-200">
                    <GradientBackground />

                    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { number: "100", label: "Clients", suffix: "+" },
                                { number: "10", label: "Years Experience", suffix: "+" },
                                { number: "150", label: "Projects", suffix: "+" },
                                { number: "20", label: "Startup Brands", suffix: "+" }
                            ].map((stat, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center group transition-all duration-300 transform hover:-translate-y-2">
                                        <h3 className="font-display font-bold text-5xl md:text-6xl text-transparent bg-clip-text dark:bg-gradient-to-b bg-gradient-to-b dark:from-white from-slate-900 dark:to-gray-400 to-slate-500 mb-2">
                                            <AnimatedNumber value={stat.number} />{stat.suffix}
                                        </h3>
                                        <p className="dark:text-gray-400 text-slate-500 text-sm md:text-base font-medium uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* 4. Our Services Section */}
                <section className="relative overflow-hidden dark:bg-[#0f0f13]/80 bg-white/60 backdrop-blur-3xl transition-colors duration-500 py-[120px]">
                    <GradientBackground />
                    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                        <ScrollReveal>
                            <PremiumReveal 
                                text="Our Services"
                                className="font-display font-bold text-4xl md:text-5xl mb-16 text-center"
                                stagger={0.05}
                            />
                        </ScrollReveal>

                        <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-10 hide-scrollbar snap-x snap-mandatory">
                            {[
                                { step: "01", title: "Web development/ designing", desc: "Building stunning, high-performance websites and digital platforms." },
                                { step: "02", title: "Influencers marketing", desc: "Connecting brands with the right creators for measurable reach." },
                                { step: "03", title: "Digital marketing", desc: "Full-funnel digital strategies built to scale predictable revenue." },
                                { step: "04", title: "Social media management", desc: "Strategic social presence that builds community and engagement." },
                                { step: "05", title: "Seo optimization", desc: "Dominate search rankings with technical precision and content strategy." }
                            ].map((item, i) => (
                                <ScrollReveal key={i} delay={i * 0.15} className="min-w-[280px] flex-1 snap-center">
                                    <div className="glass-card p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 group h-full">
                                        <span className="text-4xl font-display font-black dark:text-white/10 text-slate-200 group-hover:text-[#FF6A00]/40 transition-colors duration-300 block mb-6">{item.step}</span>
                                        <h3 className="font-display font-bold text-2xl mb-3 dark:text-white text-slate-900">{item.title}</h3>
                                        <p className="dark:text-gray-300 text-slate-600">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Team Section */}
                <section className="relative overflow-hidden dark:bg-[#15151a]/80 bg-slate-50/60 backdrop-blur-3xl transition-colors duration-500 py-[120px]">
                    <GradientBackground />
                    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                        <ScrollReveal>
                            <PremiumReveal 
                                text="Meet Our Creative Team"
                                className="font-display font-bold text-4xl md:text-5xl mb-16 text-center"
                                stagger={0.05}
                            />
                        </ScrollReveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {[
                                { name: "Sayad Salman Alli", role: "Founder & Creative Director", img: "https://i.pravatar.cc/300?img=11" },
                                { name: "Sayad Masim Alli", role: "HR Manager", img: "https://i.pravatar.cc/300?img=12" },
                                { name: "Sarah Jenkins", role: "Lead UI/UX", img: "https://i.pravatar.cc/300?img=5" },
                                { name: "David Chen", role: "Lead Developer", img: "https://i.pravatar.cc/300?img=33" }
                            ].map((member, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="group text-center cursor-pointer">
                                        <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden mb-6 transform transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                                            <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            {/* Social overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-xl dark:text-white text-slate-900">{member.name}</h4>
                                        <p className="text-[#FF6A00] font-medium text-sm mt-1">{member.role}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Why Choose Us Section */}
                <section className="relative overflow-hidden dark:bg-[#0a0a0f]/80 bg-white/60 backdrop-blur-3xl transition-colors duration-500 py-[120px] border-t border-white/10 border-slate-200">
                    <GradientBackground />

                    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                        <ScrollReveal>
                            <PremiumReveal 
                                text="Why Choose Us"
                                className="font-display font-bold text-4xl md:text-5xl mb-16 dark:text-white text-slate-900 text-center"
                                stagger={0.05}
                            />
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Startup Focused", desc: "We know the speed and agility required to win in the startup ecosystem." },
                                { title: "Fast Delivery", desc: "No red tape. We ship high-quality products faster than traditional agencies." },
                                { title: "Strategic Design", desc: "Everything we build is rooted in business strategy and user psychology." },
                                { title: "Long-Term Partner", desc: "We don't just hand off files. We act as your extended design and tech team." }
                            ].map((feature, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="glass-card p-8 rounded-3xl h-full flex flex-col justify-start transform transition-transform duration-300 hover:-translate-y-2">
                                        <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-[#FF6A00]/10 flex items-center justify-center mb-6 text-[#FF6A00]">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h3 className="font-bold dark:text-white text-slate-900 text-xl mb-3">{feature.title}</h3>
                                        <p className="dark:text-gray-400 text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
