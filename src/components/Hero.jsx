import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Mail, MapPin, Copy, Wrench } from 'lucide-react'
import { profile } from '../data/content'
import ForceField from './ForceField'

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
}

export default function Hero({ showToast }) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      showToast('Email copied to clipboard')
    } catch (err) {
      const textArea = document.createElement('textarea')
      textArea.value = profile.email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      showToast('Email copied to clipboard')
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-gradient">
      {/* Force field background */}
      <ForceField />

      <div className="relative max-w-5xl mx-auto px-6 py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full blur-sm" style={{ background: 'linear-gradient(to bottom right, var(--accent), transparent)', opacity: 0.3 }} />
              <img
                src={profile.avatar}
                alt={profile.name}
                className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-full object-cover border-4 th-bg-card th-shadow"
              />
            </div>
            {/* Status indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-1.5 th-bg-card rounded-full th-shadow border th-border"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium th-text-muted">Online</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="th-text-accent font-medium mb-2">Hi! I'm</p>
              <h1 className="text-4xl lg:text-5xl font-bold th-text mb-4 text-balance">
                {profile.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 th-text-muted mb-6"
            >
              {profile.companyUrl ? (() => {
                const [role, company] = profile.title.split(' | ')
                return (
                  <>
                    <span className="flex items-center gap-1 font-medium">
                      <Wrench size={14} />
                      {role}
                    </span>
                    <span style={{ color: 'var(--border)' }}>|</span>
                    <a
                      href={profile.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-medium hover:underline"
                      style={{ color: 'var(--accent)' }}
                    >
                      {profile.companyLogo && (
                        <img
                          src={profile.companyLogo}
                          alt={company}
                          className="w-4 h-4 object-contain"
                          style={{ filter: 'brightness(0) saturate(100%) invert(53%) sepia(91%) saturate(800%) hue-rotate(350deg) brightness(105%)' }}
                        />
                      )}
                      {company}
                    </a>
                  </>
                )
              })() : (
                <span className="font-medium">{profile.title}</span>
              )}
              <span style={{ color: 'var(--border)' }}>|</span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {profile.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="th-text-muted leading-relaxed mb-8 max-w-2xl"
            >
              {profile.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              {profile.social.map((social, index) => {
                const Icon = socialIcons[social.icon]
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5 th-bg-card border th-border rounded-xl th-text-muted th-hover-text th-hover-border th-shadow"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium hidden sm:inline">{social.name}</span>
                  </motion.a>
                )
              })}

              <motion.button
                onClick={copyEmail}
                className="group flex items-center gap-2 px-4 py-2.5 th-bg-card border th-border rounded-xl th-text-muted th-hover-text th-hover-border th-shadow"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Mail size={18} />
                <span className="text-sm font-medium hidden sm:inline">Email</span>
                <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 th-text-muted opacity-50"
          >
            <span className="text-xs font-medium">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 bg-current rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
