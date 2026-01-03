import { motion } from 'framer-motion'

export default function IntroScreen({ onComplete }) {
  const text = "Hi, I'm Gunjan"
  const characters = text.split('')

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center th-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="relative">
        {/* Animated text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold th-text">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          className="h-1 rounded-full mt-4"
          style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
        />

        {/* Fade out trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  )
}
