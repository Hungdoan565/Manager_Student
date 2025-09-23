import TestimonialCard from '../../components/common/TestimonialCard'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Cô Nguyễn Thị Lan',
      role: 'Giáo viên Toán, THPT Nguyễn Du',
      quote: 'Hệ thống này giúp tôi quản lý lớp học hiệu quả hơn rất nhiều. Điểm danh chỉ mất vài giây.',
      rating: 5,
      avatar: 'L'
    },
    {
      name: 'Thầy Trần Văn Minh',
      role: 'Hiệu trưởng, THCS Lê Lợi',
      quote: 'Báo cáo chi tiết giúp chúng tôi theo dõi tiến độ học tập của học sinh một cách khoa học.',
      rating: 5,
      avatar: 'M'
    },
    {
      name: 'Cô Lê Thị Hoa',
      role: 'Giáo viên Vật lý, THPT Trần Hưng Đạo',
      quote: 'Giao diện đơn giản, dễ sử dụng. Học sinh cũng thích hệ thống điểm danh mới này.',
      rating: 5,
      avatar: 'H'
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Được tin tưởng bởi giáo viên</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">Những chia sẻ thực tế từ các giáo viên đang sử dụng hệ thống</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              rating={testimonial.rating}
              avatar={testimonial.avatar}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
