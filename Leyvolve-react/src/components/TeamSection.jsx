import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import debashreeImg from '../assets/debashree didi.jpeg';
import chinmayaImg from '../assets/chinmayabhai.jpeg';
import pradymnaImg from '../assets/pradymna bhai.jpeg';

// SVG Icons
const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
);

/* ─── Shared Animation Variants ─── */
const listVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

/* ─── Team Component Card ─── */
const TeamCard = ({ member, index }) => {
    const cardRef = useRef(null);
    
    // Smooth mouse position values for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Motion values for the cursor follow glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseXLocal = e.clientX - rect.left;
        const mouseYLocal = e.clientY - rect.top;

        // For rotation (-0.5 to 0.5)
        const xPct = mouseXLocal / width - 0.5;
        const yPct = mouseYLocal / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);

        // For hover glow (pixels)
        mouseX.set(mouseXLocal);
        mouseY.set(mouseYLocal);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        // Resetting glow position smoothly isn't strictly necessary if opacity drops, but keeping it clean.
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative w-full aspect-[4/5] rounded-[2rem] p-6 flex flex-col items-center justify-center cursor-pointer transition-colors duration-500 overflow-hidden bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-slate-200/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
            {/* Cursor Follow Glow (visible only on hover) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(255, 106, 0, 0.1),
                            transparent 40%
                        )
                    `
                }}
            />

            {/* Circular Image Container */}
            <div 
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105 z-10"
                style={{ transformStyle: "preserve-3d" }}
            >
                <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500" 
                />
                
                {/* Dark Gradient Overlay over the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                
                {/* Hidden Details (Slide Up strictly within the circle for a clean look, or over it. Let's do over the image container) */}
                <div className="absolute inset-0 flex flex-col justify-end items-center pb-6 px-4 opacity-0 translate-y-6 overflow-hidden group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                    <motion.div 
                        variants={listVariants}
                        initial="hidden"
                        whileInView="show"
                        className="flex gap-3 text-white"
                    >
                        <motion.a href="#" variants={itemVariants} className="p-2 rounded-full bg-white/20 hover:bg-[#FF6A00] hover:scale-110 transition-all backdrop-blur-sm">
                            <LinkedInIcon />
                        </motion.a>
                        <motion.a href="#" variants={itemVariants} className="p-2 rounded-full bg-white/20 hover:bg-[#FF6A00] hover:scale-110 transition-all backdrop-blur-sm">
                            <InstagramIcon />
                        </motion.a>
                        <motion.a href="#" variants={itemVariants} className="p-2 rounded-full bg-white/20 hover:bg-[#FF6A00] hover:scale-110 transition-all backdrop-blur-sm">
                            <FacebookIcon />
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Always Visible Name & Hidden Role Below */}
            <div 
                className="mt-6 text-center transform transition-all duration-500 ease-in-out group-hover:-translate-y-2 z-10"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }} // Pop out text slightly
            >
                <h4 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1 group-hover:text-[#FF6A00] transition-colors duration-300">
                    {member.name}
                </h4>

                <div className="overflow-hidden h-0 group-hover:h-auto group-hover:mt-2 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <p className="text-[#FF6A00] font-medium text-sm tracking-wide mb-2 uppercase">
                        {member.role}
                    </p>
                    <p className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed max-w-[200px] mx-auto hidden sm:block">
                        {member.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Main Section Export ─── */
export default function TeamSection() {
    const sectionContainerRef = useRef(null);
    const inView = useInView(sectionContainerRef, { once: true, margin: '-10% 0px' });

    const team = [
        { 
            name: "Chinmaya Satpathy", 
            role: "CEO", 
            img: chinmayaImg,
            desc: "Building culture, scaling teams, and leading our internal operations."
        },
        { 
            name: "Debashree Priyadarsini", 
            role: "CMO", 
            img: debashreeImg,
            desc: "Driving the creative vision and brand strategy for global startups."
        },
        { 
            name: "Pradymna Pradhan", 
            role: "CTO", 
            img: pradymnaImg,
            desc: "Architecting high-performance web applications and fluid animations."
        }
    ];

    return (
        <section className="relative overflow-hidden dark:bg-[#15151a]/80 bg-slate-50/60 backdrop-blur-3xl transition-colors duration-500 py-[120px]">
             <div className="max-w-[1200px] mx-auto px-6 relative z-10" ref={sectionContainerRef}>
                
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-slate-900 dark:text-white">
                        Meet Our Creative Team
                    </h2>
                    <div className="w-16 h-1 bg-[#FF6A00] mx-auto rounded-full" />
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 lg:max-w-5xl lg:mx-auto perspective-1000">
                    {team.map((member, i) => (
                        <TeamCard key={i} member={member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
