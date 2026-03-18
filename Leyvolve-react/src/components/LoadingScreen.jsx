import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

export default function LoadingScreen({ onDone }) {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState('loading') // 'loading' | 'done'

    useEffect(() => {
        // Ramp up progress bar
        const steps = [10, 30, 55, 75, 90, 100]
        let i = 0
        const tick = () => {
            if (i < steps.length) {
                setProgress(steps[i])
                i++
                setTimeout(tick, i === steps.length ? 300 : 200 + Math.random() * 150)
            } else {
                setTimeout(() => setPhase('done'), 400)
                setTimeout(() => onDone?.(), 900)
            }
        }
        setTimeout(tick, 100)
    }, [])

    return (
        <AnimatePresence>
            {phase === 'loading' && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0A0E] overflow-hidden"
                >
                    {/* Ambient glow blobs */}
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6A00]/8 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-orange-500/6 blur-[100px] pointer-events-none" />

                    {/* Logo mark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center mb-12"
                    >
                        {/* Icon */}
                        <div className="relative mb-5">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute -inset-3 rounded-full border-2 border-transparent"
                                style={{ borderTopColor: '#FF6A00' }}
                            />
                            <img src={logo} alt="Leyvolve" className="w-24 h-24 object-contain rounded-2xl" />
                        </div>

                        <motion.span
                            className="font-display font-black text-white text-2xl tracking-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            Leyvolve
                        </motion.span>
                        <motion.span
                            className="text-white/25 text-xs font-medium tracking-[0.2em] uppercase mt-1.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35, duration: 0.4 }}
                        >
                            Digital Agency
                        </motion.span>
                    </motion.div>

                    {/* Progress track */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="w-[220px] flex flex-col items-center gap-3"
                    >
                        <div className="w-full h-[3px] rounded-full bg-white/8 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, #FF6A00, #FF3C00)' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Pulsing dot */}
                            <motion.span
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"
                            />
                            <span className="text-white/30 text-[11px] font-mono tracking-widest">
                                {progress < 100 ? 'Loading...' : 'Ready'}
                            </span>
                            <span className="text-white/20 text-[11px] font-mono ml-auto">{progress}%</span>
                        </div>
                    </motion.div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-[#FF6A00]/40"
                            style={{
                                top: `${20 + i * 12}%`,
                                left: `${10 + i * 15}%`,
                            }}
                            animate={{
                                y: [-10, 10, -10],
                                opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                                duration: 2.5 + i * 0.4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
