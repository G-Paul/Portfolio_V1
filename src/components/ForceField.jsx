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

  // Small sway noise for organic movement
  const getSwayOffset = useCallback((x, y, time) => {
    const scale = 0.008
    const timeScale = 0.001
    const nx = x * scale + time * timeScale
    const ny = y * scale + time * timeScale * 0.7

    // Gentle multi-frequency sway
    const sway1 = Math.sin(nx * 1.5 + ny * 1.2) * Math.cos(ny * 0.9)
    const sway2 = Math.sin(nx * 2.8 - ny * 2.1 + time * 0.0005) * 0.4

    return (sway1 + sway2) * 0.15 // Small sway amplitude (radians)
  }, [])

  // Calculate flow angle - always pointing toward mouse with subtle sway
  const getFlowAngle = useCallback((x, y, time, mouseX, mouseY) => {
    // Calculate angle pointing toward mouse
    const dx = mouseX - x
    const dy = mouseY - y
    const angleToMouse = Math.atan2(dy, dx)

    // Add subtle organic sway
    const sway = getSwayOffset(x, y, time)

    return angleToMouse + sway
  }, [getSwayOffset])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width, height
    let startTime = Date.now()
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
            angle: 0,
            length: 12 + Math.random() * 6
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

      const time = Date.now() - startTime

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

        // Get target angle - pointing toward mouse with sway
        const targetAngle = getFlowAngle(p.x, p.y, time, mouseX, mouseY)

        // Smooth angle interpolation - faster response for mouse tracking
        let angleDiff = targetAngle - p.angle
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
        p.angle += angleDiff * 0.12

        // Calculate end point
        const endX = p.x + Math.cos(p.angle) * p.length
        const endY = p.y + Math.sin(p.angle) * p.length

        // Calculate opacity and color based on distance from mouse
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const baseOpacity = isDark ? 0.15 : 0.1
        const maxOpacity = isDark ? 0.7 : 0.55
        let particleOpacity = baseOpacity + Math.max(0, 1 - dist / 350) * (maxOpacity - baseOpacity)

        // Apply vertical fade if enabled (fade out toward bottom)
        if (fadeDown) {
          const fadeStart = 0.05 // Start fading at 5% from top
          const yProgress = p.y / height
          const [startOpacity, endOpacity] = fadeRange
          const fadeProgress = yProgress < fadeStart ? 0 : Math.pow((yProgress - fadeStart) / (1 - fadeStart), 1.2)
          const fadeFactor = startOpacity - (startOpacity - endOpacity) * fadeProgress
          particleOpacity *= fadeFactor
        }

        // Color interpolation: orange near mouse, gray further away
        const colorRadius = 280
        const colorBlend = Math.pow(Math.max(0, 1 - dist / colorRadius), 0.7) // Smoother falloff

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

        // Draw arrow line
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(endX, endY)

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${particleOpacity})`
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.stroke()

        // Draw small arrowhead
        const arrowSize = 3
        const arrowAngle = Math.PI / 6
        ctx.beginPath()
        ctx.moveTo(endX, endY)
        ctx.lineTo(
          endX - arrowSize * Math.cos(p.angle - arrowAngle),
          endY - arrowSize * Math.sin(p.angle - arrowAngle)
        )
        ctx.moveTo(endX, endY)
        ctx.lineTo(
          endX - arrowSize * Math.cos(p.angle + arrowAngle),
          endY - arrowSize * Math.sin(p.angle + arrowAngle)
        )
        ctx.stroke()
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
  }, [isDark, getFlowAngle, getResponsiveSpacing])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: opacity * 0.6 }}
    />
  )
}
