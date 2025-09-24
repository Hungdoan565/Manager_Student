import { BarChart3, Clock, TrendingUp, Users } from 'lucide-react'
import TiltedCard from '../../components/common/TiltedCard'

const Benefits = () => {
  const benefits = [
    { title: 'Tiết kiệm thời gian', description: 'Giảm 70% thời gian quản lý so với phương pháp truyền thống', icon: Clock },
    { title: 'Tăng hiệu quả', description: 'Theo dõi tiến độ học tập và điểm danh tự động', icon: TrendingUp },
    { title: 'Dễ sử dụng', description: 'Giao diện thân thiện, phù hợp với mọi lứa tuổi giáo viên', icon: Users },
    { title: 'Báo cáo chính xác', description: 'Dữ liệu thống kê chi tiết và chính xác 100%', icon: BarChart3 }
  ]

  return (
    <section id="benefits" className="py-20 bg-card scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Tại sao chọn hệ thống của chúng tôi?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">Được thiết kế đặc biệt cho môi trường giáo dục Việt Nam</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <TiltedCard
                key={index}
                icon={Icon}
                title={benefit.title}
                description={benefit.description}
                color="text-primary"
                delay={index * 0.1}
                rotateAmplitude={12}
                scaleOnHover={1.05}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits
