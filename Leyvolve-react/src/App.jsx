import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home.jsx'

// Create context for loading state
export const LoadingContext = createContext({ loading: true })

function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX - 5 + 'px'
      cursor.style.top = mouseY - 5 + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX - 20) * 0.12
      ringY += (mouseY - ringY - 20) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    const onMouseDown = () => {
      cursor.style.transform = 'scale(2)'
      ring.style.transform = 'scale(0.7)'
    }
    const onMouseUp = () => {
      cursor.style.transform = 'scale(1)'
      ring.style.transform = 'scale(1)'
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  )
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Aboutus from './pages/Aboutus.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Work from './pages/Work.jsx'
import Blog from './pages/Blog.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <LoadingContext.Provider value={{ loading }}>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Router>
            <CustomCursor />
            <WhatsAppButton />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/work" element={<Work />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/case-studies" element={<CaseStudies />} />
            </Routes>
          </Router>
        </motion.div>
      )}
    </LoadingContext.Provider>
  )
}
