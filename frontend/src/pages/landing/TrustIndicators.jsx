const TrustIndicators = () => {
  return (
    <section className="py-16 bg-background" aria-labelledby="trust-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="trust-heading" className="text-3xl font-bold text-foreground mb-4">
            Được tin tưởng bởi hàng nghìn giáo viên
          </h2>
          <p className="text-xl text-muted-foreground">Thống kê thực tế từ người dùng</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Trường học</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-gray-600">Giáo viên</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-gray-600">Sinh viên</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustIndicators
