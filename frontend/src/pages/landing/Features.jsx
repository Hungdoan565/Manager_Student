import { BarChart3, Calendar, GraduationCap, Shield, Users, Zap } from 'lucide-react'
import TiltedCard from '../../components/common/TiltedCard'

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Quản lý sinh viên',
      description: 'Theo dõi thông tin cá nhân, điểm số và lịch sử học tập của từng sinh viên',
      color: 'text-blue-500',
      delay: '0.1s'
    },
    {
      icon: Calendar,
      title: 'Điểm danh thông minh',
      description: 'Hệ thống điểm danh tự động với QR code và nhận diện khuôn mặt',
      color: 'text-green-500',
      delay: '0.2s'
    },
    {
      icon: BarChart3,
      title: 'Báo cáo chi tiết',
      description: 'Tạo báo cáo thống kê, biểu đồ và phân tích dữ liệu học tập',
      color: 'text-purple-500',
      delay: '0.3s'
    },
    {
      icon: GraduationCap,
      title: 'Quản lý lớp học',
      description: 'Tổ chức và quản lý các lớp học, thời khóa biểu hiệu quả',
      color: 'text-orange-500',
      delay: '0.4s'
    },
    {
      icon: Shield,
      title: 'Bảo mật cao',
      description: 'Mã hóa dữ liệu và tuân thủ quy định bảo mật giáo dục',
      color: 'text-red-500',
      delay: '0.5s'
    },
    {
      icon: Zap,
      title: 'Tốc độ nhanh',
      description: 'Giao diện tối ưu, tải trang nhanh và phản hồi tức thì',
      color: 'text-yellow-500',
      delay: '0.6s'
    }
  ]

  return (
    <section id="features" className="py-20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Tính năng chính</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Công cụ mạnh mẽ và dễ sử dụng để quản lý lớp học hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <TiltedCard
                key={index}
                icon={Icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                delay={parseFloat(feature.delay)}
                rotateAmplitude={8}
                scaleOnHover={1.03}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
