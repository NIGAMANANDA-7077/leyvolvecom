import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * PremiumReveal component for staggered text masking.
 * @param {Object} props
 * @param {string} props.text - The text to animate.
 * @param {string} props.className - Additional classes for the container.
 * @param {number} props.delay - Initial delay before starting the animation.
 * @param {number} props.stagger - Delay between each word.
 * @param {string} props.variant - 'word' or 'char' (default: 'word').
 */
export default function PremiumReveal({ text, className = "", delay = 0, stagger = 0.05, variant = 'word' }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

    const words = text.split(' ')

    return (
        <div ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.1em] -mb-[0.1em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '100%', rotate: 2 }}
                        animate={isInView ? { y: 0, rotate: 0 } : { y: '100%', rotate: 2 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.33, 1, 0.68, 1],
                            delay: delay + i * stagger
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    )
}
