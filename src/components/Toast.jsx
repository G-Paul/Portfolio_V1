import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Toast({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-xl th-shadow-lg"
        style={{
          backgroundColor: 'var(--text)',
          color: 'var(--bg)'
        }}
      >
        <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
          <Check size={12} strokeWidth={3} className="text-white" />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </motion.div>
  )
}
