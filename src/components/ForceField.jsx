import { useRef, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ForceField({ spacing: baseSpacing = 35, opacity = 1, fadeDown = false, fadeRange = [1, 0] }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const lastFrameTimeRef = useRef(0)
  const isVisibleRef = useRef(true)
  const { isDark } = useTheme()

  // Calculate responsive spacing - larger screens get more spacing
  const getResponsiveSpacing = useCallback(() => {
    if (typeof window === 'undefined') return baseSpacing
    const width = window.innerWidth
    if (width > 1920) return Math.max(baseSpacing, 55) // 4K+ screens
    if (width > 1440) return Math.max(baseSpacing, 45) // Large screens
    if (width > 1024) return Math.max(baseSpacing, 40) // Desktop
    return baseSpacing // Mobile/tablet - keep original
  }, [baseSpacing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width, height
    const TARGET_FPS = 30
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    // Intersection Observer - pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    // Resize handler with responsive spacing
    const resize = () => {
      const spacing = getResponsiveSpacing()
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Initialize particles grid
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1

      particlesRef.current = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particlesRef.current.push({
            x: i * spacing,
            y: j * spacing,
            baseRadius: 1.5 + Math.random() * 1 // Small variation in base size
          })
        }
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.targetX = e.clientX - rect.left
      mouseRef.current.targetY = e.clientY - rect.top
    }

    // Animation loop with frame rate throttling
    const animate = (currentTime) => {
      animationRef.current = requestAnimationFrame(animate)

      // Skip if not visible
      if (!isVisibleRef.current) return

      // Throttle to target FPS
      const elapsed = currentTime - lastFrameTimeRef.current
      if (elapsed < FRAME_INTERVAL) return
      lastFrameTimeRef.current = currentTime - (elapsed % FRAME_INTERVAL)

      // Smooth mouse following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw particles
      const particles = particlesRef.current
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Calculate distance from mouse
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Calculate radius - larger near mouse for "concentration" effect
        const concentrationRadius = 300
        const proximityFactor = Math.max(0, 1 - dist / concentrationRadius)
        const radius = p.baseRadius + proximityFactor * 4 // Grows up to 4px larger near mouse

        // Calculate opacity based on distance from mouse
        const baseOpacity = isDark ? 0.12 : 0.08
        const maxOpacity = isDark ? 0.6 : 0.45
        let particleOpacity = baseOpacity + Math.pow(proximityFactor, 0.8) * (maxOpacity - baseOpacity)

        // Apply vertical fade if enabled (fade out toward bottom)
        if (fadeDown) {
          const fadeStart = 0.05 // Start fading at 5% from top
          const yProgress = p.y / height
          const [startOpacity, endOpacity] = fadeRange
          const fadeProgress = yProgress < fadeStart ? 0 : Math.pow((yProgress - fadeStart) / (1 - fadeStart), 1.2)
          const fadeFactor = startOpacity - (startOpacity - endOpacity) * fadeProgress
          particleOpacity *= fadeFactor
        }

        // Skip nearly invisible particles
        if (particleOpacity < 0.01) continue

        // Color interpolation: orange near mouse, gray further away
        const colorRadius = 280
        const colorBlend = Math.pow(Math.max(0, 1 - dist / colorRadius), 0.7)

        // Accent color (near mouse) - matches theme
        const orangeR = isDark ? 232 : 255
        const orangeG = isDark ? 93 : 140
        const orangeB = isDark ? 4 : 50
        // Gray color (far from mouse)
        const grayR = isDark ? 148 : 100
        const grayG = isDark ? 163 : 116
        const grayB = isDark ? 184 : 139

        // Interpolate colors
        const r = Math.round(grayR + (orangeR - grayR) * colorBlend)
        const g = Math.round(grayG + (orangeG - grayG) * colorBlend)
        const b = Math.round(grayB + (orangeB - grayB) * colorBlend)

        // Draw circle
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particleOpacity})`
        ctx.fill()
      }
    }

    // Initialize
    resize()

    // Set initial mouse position to center
    mouseRef.current.x = width / 2
    mouseRef.current.y = height / 2
    mouseRef.current.targetX = width / 2
    mouseRef.current.targetY = height / 2

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDark, getResponsiveSpacing])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: opacity * 0.6 }}
    />
  )
}
