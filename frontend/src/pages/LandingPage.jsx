import {
    ArrowRight,
    BarChart3,
    Calendar,
    Check,
    ChevronUp,
    Clock,
    FileText,
    GraduationCap,
    Heart,
    Mail,
    MessageSquare,
    Phone,
    Plus,
    QrCode,
    Send,
    Shield,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../components/common/AnimatedButton';
import BlurText from '../components/common/BlurText';
import FloatingElements from '../components/common/FloatingElements';
import TestimonialCard from '../components/common/TestimonialCard';
import TiltedCard from '../components/common/TiltedCard';
import TiltedGuideCard from '../components/common/TiltedGuideCard';
import GooeyNav from '../components/layout/GooeyNav';
import FAQSection from '../components/sections/FAQSection';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    school: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  // Navigation items for GooeyNav - Teacher-focused
  const navigationItems = [
    { name: 'Tính năng', href: '#features', icon: BarChart3 },
    { name: 'Lợi ích', href: '#benefits', icon: TrendingUp },
    { name: 'Hướng dẫn', href: '#guide', icon: Users },
    { name: 'Đánh giá', href: '#testimonials', icon: Heart },
    { name: 'Liên hệ', href: '#contact', icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId, index) => {
    e.preventDefault();
    setActiveNavIndex(index);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Contact Form Handlers
  const validateForm = () => {
    const errors = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Vui lòng nhập họ tên';
    }
    
    if (!contactForm.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!contactForm.school.trim()) {
      errors.school = 'Vui lòng nhập tên trường học';
    }
    
    if (!contactForm.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+\-\s()]+$/.test(contactForm.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!contactForm.message.trim()) {
      errors.message = 'Vui lòng nhập nội dung tin nhắn';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        school: '',
        phone: '',
        message: ''
      });
      
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.');
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
  ];

  const benefits = [
    {
      title: 'Tiết kiệm thời gian',
      description: 'Giảm 70% thời gian quản lý so với phương pháp truyền thống',
      icon: Clock
    },
    {
      title: 'Tăng hiệu quả',
      description: 'Theo dõi tiến độ học tập và điểm danh tự động',
      icon: TrendingUp
    },
    {
      title: 'Dễ sử dụng',
      description: 'Giao diện thân thiện, phù hợp với mọi lứa tuổi giáo viên',
      icon: Users
    },
    {
      title: 'Báo cáo chính xác',
      description: 'Dữ liệu thống kê chi tiết và chính xác 100%',
      icon: BarChart3
    }
  ];

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
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SMS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Student Management</span>
            </div>

            {/* Navigation Links with GooeyNav */}
            <div className="hidden md:flex items-center">
              <GooeyNav
                items={navigationItems}
                initialActiveIndex={activeNavIndex}
                className="mx-4"
                onItemClick={(index, item) => handleNavClick(new Event('click'), item.href, index)}
              />
            </div>

            {/* Auth Buttons - Always visible */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link 
                to="/login"
                className="text-gray-700 hover:text-primary transition-colors duration-300 font-medium px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 text-sm sm:text-base"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register"
                className="text-gray-700 hover:text-primary transition-colors duration-300 font-medium px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 text-sm sm:text-base"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 overflow-hidden min-h-screen flex items-center pt-20"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Floating Elements */}
        <FloatingElements />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main Title with BlurText */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
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

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Giải pháp toàn diện cho giáo viên và trường học. Điểm danh tự động, 
              báo cáo chi tiết và quản lý lớp học hiệu quả.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <AnimatedButton
                to="/login"
                variant="primary"
                delay={2.4}
                className="group rounded-full"
              >
                Bắt đầu ngay
                <motion.div
                  className="ml-2"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
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
                <motion.div
                  className="ml-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
              </AnimatedButton>
            </motion.div>

            {/* Scroll Indicator */}
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

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tại sao chọn hệ thống của chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
              Được thiết kế đặc biệt cho môi trường giáo dục Việt Nam
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon; // Icon đã là component rồi
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tính năng chính
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
              Công cụ mạnh mẽ và dễ sử dụng để quản lý lớp học hiệu quả
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Được tin tưởng bởi giáo viên
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
              Những chia sẻ thực tế từ các giáo viên đang sử dụng hệ thống
            </p>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Đánh giá từ giáo viên
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những chia sẻ thực tế từ các giáo viên đã sử dụng hệ thống
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl border border-border p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cô Nguyễn Thị Mai</h4>
                  <p className="text-sm text-gray-600">Giáo viên Toán - THPT Nguyễn Du</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Hệ thống điểm danh này giúp tôi tiết kiệm rất nhiều thời gian. 
                Chỉ cần quét QR code là có thể điểm danh cả lớp trong vài giây."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl border border-border p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Thầy Trần Văn Nam</h4>
                  <p className="text-sm text-gray-600">Giáo viên Lý - THPT Lê Quý Đôn</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Báo cáo điểm danh rất chi tiết và dễ hiểu. Tôi có thể theo dõi 
                tình hình học tập của từng học sinh một cách hiệu quả."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl border border-border p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cô Phạm Thị Hoa</h4>
                  <p className="text-sm text-gray-600">Giáo viên Văn - THPT Trần Phú</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Giao diện thân thiện, dễ sử dụng. Học sinh cũng rất thích 
                việc điểm danh bằng QR code, cảm giác hiện đại và tiện lợi."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Được tin tưởng bởi hàng nghìn giáo viên
            </h2>
            <p className="text-xl text-gray-600">
              Thống kê thực tế từ người dùng
            </p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn giáo viên đang sử dụng hệ thống quản lý sinh viên thông minh
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Primary Button - Tạo tài khoản miễn phí */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-white rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="relative"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
                  y: -2
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-white/20"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Users className="mr-2 w-5 h-5" />
                  </motion.div>
                  <span>Tạo tài khoản miễn phí</span>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Secondary Button - Liên hệ tư vấn */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              <motion.button
                className="group inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                whileHover={{
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  y: -2
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent text-primary via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Heart className="mr-2 w-5 h-5 text-red-500 group-hover:text-red-600" />
                </motion.div>
                <span className="relative z-10 text-gray-900 font-semibold">Liên hệ tư vấn</span>
                
                {/* Pulsing Dot */}
                <motion.div
                  className="ml-2 w-2 h-2 bg-gray-900 rounded-full group-hover:bg-emerald-600"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

          {/* Quick Start Guide Section - Step by Step */}
          <section id="guide" className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Hướng dẫn sử dụng nhanh
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Bắt đầu sử dụng hệ thống chỉ trong vài bước đơn giản
                </p>
                </motion.div>
              </div>
              
              {/* Steps Container */}
              <div className="relative">
                {/* Progress Line - Animated */}
                <div className="hidden md:block absolute top-24 left-8 right-8 h-1 bg-gray-200 rounded-full">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />
                  </div>
                
                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                  {/* Step 1 */}
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
                    {/* Arrow */}
                    <motion.div 
                      className="hidden md:block absolute top-24 -right-6 z-10"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>
                  
                  {/* Step 2 */}
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
                    {/* Arrow */}
                    <motion.div 
                      className="hidden md:block absolute top-24 -right-6 z-10"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    >
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>
                  
                  {/* Step 3 */}
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
                    {/* Arrow */}
                    <motion.div 
                      className="hidden md:block absolute top-24 -right-6 z-10"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                    >
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>
                  
                  {/* Step 4 */}
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

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cần hỗ trợ hoặc có câu hỏi về hệ thống điểm danh? Chúng tôi luôn sẵn sàng giúp đỡ!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Điện thoại</h3>
                  <p className="text-gray-600">Hotline: 1900 1234</p>
                  <p className="text-gray-600">Hỗ trợ: 8:00 - 17:00 (T2-T6)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">support@sms.edu.vn</p>
                  <p className="text-gray-600">Phản hồi trong 24h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat trực tuyến</h3>
                  <p className="text-gray-600">Hỗ trợ trực tiếp</p>
                  <p className="text-gray-600">8:00 - 17:00 hàng ngày</p>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Tại sao chọn chúng tôi?</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    Hỗ trợ 24/7 cho giáo viên
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    Bảo mật dữ liệu cao
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    Cập nhật miễn phí
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-2" />
                    Đào tạo sử dụng miễn phí
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="email@truong.edu.vn"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                      Tên trường học *
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={contactForm.school}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        formErrors.school ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="THPT Nguyễn Du"
                    />
                    {formErrors.school && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.school}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0123 456 789"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Mô tả chi tiết về nhu cầu của bạn..."
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </motion.button>
              </form>
                </div>
              </div>
            </div>
          </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-foreground font-bold text-sm">SMS</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Student Management</span>
              </div>
              <p className="text-muted-foreground">
                Giải pháp quản lý sinh viên toàn diện cho giáo viên và trường học.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Tính năng</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Quản lý sinh viên</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Điểm danh</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Báo cáo</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Thời khóa biểu</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Liên hệ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Tài liệu</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Video hướng dẫn</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Về chúng tôi</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Giới thiệu</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Liên hệ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Student Management System. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {scrollY > 300 && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group:hover {
          transform: translateY(-8px) rotate(1deg);
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;