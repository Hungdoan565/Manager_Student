import { motion } from 'motion/react'
import { ArrowRight, Heart, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 id="cta-heading" className="text-4xl font-bold text-white mb-6">Sẵn sàng bắt đầu?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Tham gia cùng hàng nghìn giáo viên đang sử dụng hệ thống quản lý sinh viên thông minh
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.div className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <motion.div
              className="absolute inset-0 bg-white rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              animate={{ scale: [1, 1.1, 1], opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div className="relative" whileHover={{ boxShadow: '0 20px 40px rgba(255,255,255,0.3)', y: -2 }} transition={{ duration: 0.3 }}>
              <Link
                to="/register"
                className="group inline-flex items-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-white/20"
                aria-label="Tạo tài khoản miễn phí"
              >
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                  <Users className="mr-2 w-5 h-5" />
                </motion.div>
                <span>Tạo tài khoản miễn phí</span>
                <motion.div className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"
              animate={{ scale: [1, 1.1, 1], opacity: [0, 0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.button
              className="group inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
              whileHover={{ backgroundColor: '#ffffff', color: '#1f2937', y: -2 }}
              transition={{ duration: 0.3 }}
              aria-label="Liên hệ tư vấn"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent text-primary via-white/10 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <Heart className="mr-2 w-5 h-5 text-red-500 group-hover:text-red-600" />
              </motion.div>
              <span className="relative z-10 text-gray-900 font-semibold">Liên hệ tư vấn</span>
              <motion.div className="ml-2 w-2 h-2 bg-gray-900 rounded-full group-hover:bg-emerald-600" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTA
