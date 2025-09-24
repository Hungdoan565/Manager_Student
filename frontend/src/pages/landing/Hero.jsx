import { motion } from 'motion/react'
import { ArrowRight, Heart } from 'lucide-react'
import AnimatedButton from '../../components/common/AnimatedButton'
import BlurText from '../../components/common/BlurText'
import FloatingElements from '../../components/common/FloatingElements'
import React, { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 overflow-hidden min-h-screen flex items-center pt-20"
      style={{ transform: `translateY(${scrollY * 0.3}px)`, transition: 'transform 0.1s ease-out' }}
    >
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/15 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/15 rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.22, 0.08] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <BlurText
              text="Quản lý sinh viên"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-relaxed"
              duration={0.8}
              stagger={0.15}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-8"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-5xl md:text-6xl font-bold">
                thông minh
              </span>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            Giải pháp toàn diện cho giáo viên và trường học. Điểm danh tự động, báo cáo chi tiết và quản lý lớp học hiệu quả.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <AnimatedButton to="/login" variant="primary" delay={2.4}>
              Bắt đầu ngay
            </AnimatedButton>

            <AnimatedButton to="/register" variant="secondary" delay={2.6}>
              Tìm hiểu thêm
            </AnimatedButton>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
