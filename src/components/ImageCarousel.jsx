import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Set to true to enable auto-advance on all carousels
const AUTO_ADVANCE = false
const AUTO_ADVANCE_INTERVAL = 4000 // ms

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

export default function ImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const hasManyImages = images.length > 1

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }, [images.length])

  const goToIndex = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  useEffect(() => {
    if (!AUTO_ADVANCE || !hasManyImages) return
    const timer = setInterval(() => paginate(1), AUTO_ADVANCE_INTERVAL)
    return () => clearInterval(timer)
  }, [hasManyImages, paginate, currentIndex])

  // Single image — render as-is, no carousel
  if (!hasManyImages) {
    return (
      <img
        src={images[0]}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Main image area */}
      <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            loading="lazy"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); paginate(-1) }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all opacity-70 lg:opacity-0 group-hover:opacity-100 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); paginate(1) }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all opacity-70 lg:opacity-0 group-hover:opacity-100 z-10"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>

        {/* Image counter badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 text-white text-xs backdrop-blur-sm opacity-70 lg:opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex items-center gap-1.5 p-2 th-bg-alt border-t th-border">
        <div className="flex gap-1.5 overflow-x-auto flex-1 justify-center scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`relative flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? 'border-[var(--accent)] shadow-sm'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
