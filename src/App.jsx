import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Toast from './components/Toast'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 2000)
  }

  const handleIntroComplete = () => {
    setTimeout(() => setShowIntro(false), 400)
  }

  return (
    <div className="min-h-screen th-bg">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Navbar />
            <main>
              <Hero showToast={showToast} />
              <Experience />
              <Projects />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.show && <Toast message={toast.message} />}
      </AnimatePresence>
    </div>
  )
}

export default App
