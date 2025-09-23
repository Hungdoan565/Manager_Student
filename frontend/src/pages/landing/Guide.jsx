import { motion } from 'motion/react'
import { ArrowRight, FileText, Plus, QrCode, Users } from 'lucide-react'
import TiltedGuideCard from '../../components/common/TiltedGuideCard'

const Guide = () => {
  return (
    <section id="guide" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Hướng dẫn sử dụng nhanh</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Bắt đầu sử dụng hệ thống chỉ trong vài bước đơn giản</p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-24 left-8 right-8 h-1 bg-gray-200 rounded-full" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="relative">
              <TiltedGuideCard
                stepNumber={1}
                icon={Users}
                title="Tạo tài khoản"
                description="Đăng ký tài khoản giáo viên với email trường học"
                delay={0.2}
                scaleOnHover={1.03}
                rotateAmplitude={8}
              />
              <motion.div className="hidden md:block absolute top-24 -right-6 z-10" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
                <ArrowRight className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            <div className="relative">
              <TiltedGuideCard
                stepNumber={2}
                icon={Plus}
                title="Tạo lớp học"
                description="Thêm lớp học và import danh sách sinh viên"
                delay={0.4}
                scaleOnHover={1.03}
                rotateAmplitude={8}
              />
              <motion.div className="hidden md:block absolute top-24 -right-6 z-10" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.4 }}>
                <ArrowRight className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            <div className="relative">
              <TiltedGuideCard
                stepNumber={3}
                icon={QrCode}
                title="Điểm danh"
                description="Sử dụng tính năng điểm danh nhanh trong giờ học"
                delay={0.6}
                scaleOnHover={1.03}
                rotateAmplitude={8}
              />
              <motion.div className="hidden md:block absolute top-24 -right-6 z-10" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1.6 }}>
                <ArrowRight className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            <div className="relative">
              <TiltedGuideCard
                stepNumber={4}
                icon={FileText}
                title="Xem báo cáo"
                description="Theo dõi thống kê và xuất báo cáo điểm danh"
                delay={0.8}
                scaleOnHover={1.03}
                rotateAmplitude={8}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
