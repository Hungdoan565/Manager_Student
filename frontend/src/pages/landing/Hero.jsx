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
          className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
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
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-relaxed"
              duration={0.8}
              stagger={0.15}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-8"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 text-5xl md:text-6xl font-bold">
                thông minh
              </span>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
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
            <AnimatedButton to="/login" variant="primary" delay={2.4} className="group rounded-full">
              Bắt đầu ngay
              <motion.div className="ml-2" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </AnimatedButton>

            <AnimatedButton
              to="/register"
              variant="outline"
              delay={2.6}
              className="group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full"
            >
              Tìm hiểu thêm
              <motion.div className="ml-2" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Heart className="w-5 h-5" />
              </motion.div>
            </AnimatedButton>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
