import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experience } from '../data/content'
import ForceField from './ForceField'

function TimelineItem({ job, index, isLast }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex gap-6 lg:gap-10"
    >
      {/* Timeline left side - logo and line */}
      <div className="flex flex-col items-center">
        {/* Company logo as timeline marker */}
        <motion.div
          className="relative w-12 h-12 rounded-full overflow-visible border-2 th-bg-card th-shadow z-10 flex-shrink-0"
          style={{ borderColor: isHovered ? 'var(--accent)' : 'var(--border)' }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {job.url ? (
            <a href={job.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full rounded-full overflow-hidden" title={`Visit ${job.company}`}>
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-full h-full object-cover"
              />
            </a>
          ) : (
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {job.isCurrent && (
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 z-20"
              style={{ borderColor: 'var(--bg-card)' }}
            />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div
            className="flex-1 w-0.5 my-4"
            style={{ backgroundColor: 'var(--border)' }}
          />
        )}
      </div>

      {/* Content right side */}
      <div
        className="flex-1 pb-10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Company name */}
        <h3 className="text-xl font-semibold th-text mb-1">{job.company}</h3>

        {/* Role and date on same line */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="th-text-accent font-medium flex-1">{job.role}</p>
          <p className="text-sm th-text-muted text-right shrink-0 w-24 sm:w-auto sm:whitespace-nowrap">{job.dates}</p>
        </div>

        {/* Description - only visible on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="th-text-muted leading-relaxed pt-2">
                {job.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="relative py-24 lg:py-32 th-bg">
      {/* Force field background - same density as hero, fades partially */}
      <ForceField fadeDown={true} fadeRange={[1, 0.4]} />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header - same style as Projects section */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 th-text-accent"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
          >
            <Briefcase size={14} />
            Career
          </motion.span>
          <h2 className="text-3xl lg:text-4xl font-bold th-text mb-4">Work Experience</h2>
          <p className="th-text-muted">Places I've worked and the impact I've made.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experience.map((job, index) => (
            <TimelineItem
              key={job.id}
              job={job}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
