import { ChevronUp, BarChart3, TrendingUp, Users, Heart, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import GooeyNav from '../components/layout/GooeyNav';
import FAQSection from '../components/sections/FAQSection';
import ErrorBoundary from '../components/common/ErrorBoundary';
import ThemeToggle from '../components/ui/ThemeToggle';

// Sections (some lazy-loaded)
import Hero from './landing/Hero';
import Benefits from './landing/Benefits';
import Features from './landing/Features';
const Testimonials = React.lazy(() => import('./landing/Testimonials'));
const TrustIndicators = React.lazy(() => import('./landing/TrustIndicators'));
const CTA = React.lazy(() => import('./landing/CTA'));
const Guide = React.lazy(() => import('./landing/Guide'));
const Contact = React.lazy(() => import('./landing/Contact'));

// Fallback skeletons for lazy sections
import TestimonialsFallback from './landing/fallbacks/TestimonialsFallback';
import TrustIndicatorsFallback from './landing/fallbacks/TrustIndicatorsFallback';
import CTAFallback from './landing/fallbacks/CTAFallback';
import GuideFallback from './landing/fallbacks/GuideFallback';
import ContactFallback from './landing/fallbacks/ContactFallback';

const LandingPage = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  // Navigation items for GooeyNav - Teacher-focused
  const navigationItems = [
    { name: 'Tính năng', href: '#features', icon: BarChart3 },
    { name: 'Lợi ích', href: '#benefits', icon: TrendingUp },
    { name: 'Hướng dẫn', href: '#guide', icon: Users },
    { name: 'Đánh giá', href: '#testimonials', icon: Heart },
    { name: 'Liên hệ', href: '#contact', icon: Phone },
  ];

  const handleNavClick = (targetId, index) => {
    setActiveNavIndex(index);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded focus:shadow">
        Bỏ qua đến nội dung chính
      </a>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200" role="navigation" aria-label="Điều hướng chính">
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
                onItemClick={(index, item) => handleNavClick(item.href, index)}
              />
            </div>

            {/* Auth Buttons + Theme Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle />
              <Link 
                to="/login"
                className="text-gray-700 hover:text-primary transition-colors duration-300 font-medium px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 text-sm sm:text-base"
                aria-label="Đăng nhập"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register"
                className="text-gray-700 hover:text-primary transition-colors duration-300 font-medium px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 text-sm sm:text-base"
                aria-label="Đăng ký"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main id="main-content" role="main">
        <Hero />
        <Benefits />
        <Features />

        <ErrorBoundary>
<Suspense fallback={<TestimonialsFallback />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
<Suspense fallback={<TrustIndicatorsFallback />}>
            <TrustIndicators />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
<Suspense fallback={<CTAFallback />}>
            <CTA />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
<Suspense fallback={<GuideFallback />}>
            <Guide />
          </Suspense>
        </ErrorBoundary>

        {/* FAQ giữ nguyên */}
        <FAQSection />

        <ErrorBoundary>
<Suspense fallback={<ContactFallback />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>



      {/* Footer */}
      <footer id="footer" className="bg-card border-t border-border py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
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
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
        aria-label="Về đầu trang"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>

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