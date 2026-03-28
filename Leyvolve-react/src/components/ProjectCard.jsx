import { motion } from 'framer-motion'

/* Category → accent colour mapping */
const categoryColors = {
    'E-commerce': 'from-pink-600/30 to-rose-600/30',
    'Business Website': 'from-blue-600/30 to-indigo-600/30',
    'Service Website': 'from-emerald-600/30 to-teal-600/30',
    'Education': 'from-amber-600/30 to-yellow-600/30',
}

const categoryIcons = {
    'E-commerce': '🛍️',
    'Business Website': '🏢',
    'Service Website': '🔧',
    'Education': '📚',
}

/**
 * ProjectCard
 * @param {{ project: object, featured: boolean, index: number }} props
 */
export default function ProjectCard({ project, featured = false, index = 0 }) {
    const color = categoryColors[project.category] ?? 'from-orange-600/30 to-red-600/30'
    const icon = categoryIcons[project.category] ?? '🌐'

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.33, 1, 0.68, 1],
            }}
            className={featured ? 'w-full' : 'flex-shrink-0 w-72 sm:w-80'}
        >
            <motion.div
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 36px 72px rgba(255,106,0,0.18)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/10 h-full cursor-pointer"
            >
                {/* Orange top-border glow on hover */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10"
                    style={{ background: 'linear-gradient(90deg, transparent, #FF6A00, transparent)' }}
                />

                {/* Visual header */}
                <div className={`relative ${featured ? 'h-56' : 'h-40'} flex items-center justify-center overflow-hidden bg-slate-900`}>
                    
                    {/* Background image */}
                    {project.image && (
                        <div
                            className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />
                    )}

                    {/* Dark gradient overlay so the pill and hover effects are still visible/legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-black/20" />
                    
                    {/* Hover radial glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,106,0,0.12), transparent 70%)' }}
                    />

                    {/* Category pill */}
                    <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-black/40 backdrop-blur-sm shadow-lg">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={`relative z-10 p-6 ${featured ? 'sm:p-8' : ''} flex flex-col gap-3 -mt-4 bg-gradient-to-b from-transparent to-[#0F0F0F] rounded-t-xl`}>
                    {featured && (
                        <span className="font-mono text-[10px] text-[#FF6A00] tracking-[0.25em] uppercase">
                            ★ Featured Project
                        </span>
                    )}

                    <h3 className={`text-white font-display font-bold ${featured ? 'text-2xl' : 'text-lg'} leading-snug`}>
                        {project.title}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    {/* Footer */}
                    <div className="pt-2 flex items-center justify-between mt-auto">
                        <span className="px-3 py-1 rounded-full text-[10px] font-medium text-[#FF6A00] border border-[#FF6A00]/30 bg-[#FF6A00]/5">
                            {project.category}
                        </span>

                        <motion.a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.06, backgroundColor: '#FF7A2F' }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-colors duration-200"
                            style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3C00)' }}
                        >
                            View Project
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
