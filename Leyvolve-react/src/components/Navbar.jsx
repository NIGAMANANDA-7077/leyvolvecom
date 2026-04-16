import { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LoadingContext } from '../App'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Works', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/aboutus' },
]

export default function Navbar() {
  const { loading } = useContext(LoadingContext)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const handleNav = (href) => {
    setMenuOpen(false)
    if (href.startsWith('/#') || href.startsWith('#')) {
      const hashId = href.replace(/^\/?#/, '#')
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.querySelector(hashId)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const el = document.querySelector(hashId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(href)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={!loading ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1 
        }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${scrolled ? 'top-4 px-4' : 'top-16 px-6'
          }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${scrolled
            ? 'bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-sm rounded-full px-6 py-3'
            : 'bg-transparent py-2'
            }`}
        >
          {/* Logo */}
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600 to-green-500 group-hover:from-blue-500 group-hover:to-green-400 transition-all duration-300" />
              <div className="absolute inset-[2px] rounded-[5px] bg-white flex items-center justify-center">
                <span className="text-gradient text-xs font-display font-black">L</span>
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
              Leyvolve
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.8 }}
                className="relative text-[15px] font-body transition-colors duration-300 text-slate-500 hover:text-slate-400 font-semibold"
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Actions: CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={!loading ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
              onClick={() => handleNav('/contact')}
              id="nav-cta-btn"
              className="px-7 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 text-white bg-gradient-to-r from-[#FF6A00] to-[#FF3C00] hover:shadow-lg hover:shadow-orange-400/40 hover:scale-105"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50 text-white"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-px origin-center transition-all bg-slate-800"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? -10 : 0 }}
              className="block w-4 h-px bg-slate-800"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-px origin-center transition-all bg-slate-800"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 text-slate-800 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                  onClick={() => handleNav(link.href)}
                  className="text-3xl font-display font-bold transition-colors text-slate-700 hover:text-slate-900"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNav('/#contact')}
                className="mt-4 px-8 py-3 text-lg font-medium rounded-full bg-slate-800 text-white"
              >
                Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
