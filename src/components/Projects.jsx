import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content'
import ForceField from './ForceField'
import ImageCarousel from './ImageCarousel'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      className="group relative th-bg-card rounded-2xl border th-border overflow-hidden th-shadow hover:th-shadow-lg transition-shadow duration-300"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Image Section */}
        <div className="relative lg:w-[45%] flex-shrink-0 overflow-hidden th-bg-alt">
          <div className={`${project.images.length > 1 ? 'aspect-auto' : 'aspect-[4/3]'} lg:aspect-auto lg:absolute lg:inset-0`}>
            <ImageCarousel images={project.images} alt={project.title} />
          </div>
          {project.images.length === 1 && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}

          {project.isWip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 z-10"
            >
              <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Work in Progress
              </span>
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
          <div className="mb-4">
            <time className="text-sm th-text-accent font-medium">{project.dates}</time>
            <h3 className="text-xl lg:text-2xl font-semibold th-text mt-1 group-hover:th-text-accent transition-colors">
              {project.title}
            </h3>
          </div>

          <ul className="space-y-2.5 mb-5">
            {project.description.map((item, i) => (
              <li key={i} className="flex gap-3 th-text-muted text-sm leading-relaxed">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full" style={{ backgroundColor: 'var(--accent)', opacity: 0.6 }} />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 th-bg-accent text-white text-sm font-medium rounded-lg th-hover-accent transition-colors"
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ))}

            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 th-bg-alt th-text-muted text-sm font-medium rounded-lg border th-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="relative py-24 lg:py-32 th-bg">
      {/* Force field background - continues fade from Experience section */}
      <ForceField fadeDown={true} fadeRange={[0.4, 0]} />

      <div className="max-w-6xl mx-auto px-6">
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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 th-text-accent"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
          >
            Featured Work
          </motion.span>
          <h2 className="text-3xl lg:text-4xl font-bold th-text mb-4">Projects</h2>
          <p className="th-text-muted max-w-2xl mx-auto">
            I've worked on a variety of projects, from simple IoT devices to complex fully-fledged robots. Here are a few of my favorites.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
