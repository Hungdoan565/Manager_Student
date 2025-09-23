// FAQ Data Configuration
export const faqConfig = {
  // Animation settings
  animations: {
    // Card animations
    card: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
      hover: {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }
    },
    
    // Content animations
    content: {
      title: {
        hover: { x: 2 },
        transition: { duration: 0.2 }
      },
      description: {
        hover: { x: 2 },
        transition: { duration: 0.2 }
      }
    },
    
    // Background gradient animations
    gradient: {
      transition: { duration: 0.5 },
      variants: [
        "from-primary/5 via-emerald-500/5 to-primary/5",
        "from-emerald-500/5 via-primary/5 to-emerald-500/5"
      ]
    }
  },
  
  // 3D transform settings
  transforms: {
    perspective: "1000px",
    variants: [
      { rotateY: 2, rotateX: 1 },
      { rotateY: -2, rotateX: 1 }
    ]
  },
  
  // Styling configuration
  styles: {
    card: {
      base: "bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group relative overflow-hidden",
      title: "text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300",
      description: "text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
    }
  }
};

// FAQ Items Data
export const faqItems = [
  {
    id: 1,
    question: "Hệ thống có hỗ trợ điểm danh bằng QR code không?",
    answer: "Có, hệ thống hỗ trợ đầy đủ tính năng điểm danh bằng QR code. Giáo viên có thể tạo QR code cho từng buổi học, sinh viên chỉ cần quét mã để điểm danh tự động. Điều này giúp tiết kiệm thời gian và giảm thiểu sai sót.",
    delay: 0.1,
    transformVariant: 0, // Index for transforms.variants
    gradientVariant: 0  // Index for gradient.variants
  },
  {
    id: 2,
    question: "Dữ liệu sinh viên có được bảo mật không?",
    answer: "Tuyệt đối có. Chúng tôi sử dụng mã hóa SSL/TLS và tuân thủ các tiêu chuẩn bảo mật quốc tế. Dữ liệu được lưu trữ trên server riêng biệt và chỉ có giáo viên được phân quyền mới có thể truy cập.",
    delay: 0.2,
    transformVariant: 1,
    gradientVariant: 1
  },
  {
    id: 3,
    question: "Có thể sử dụng trên điện thoại không?",
    answer: "Có, hệ thống được thiết kế responsive và hoạt động tốt trên mọi thiết bị. Giáo viên có thể quản lý lớp học và sinh viên có thể điểm danh trực tiếp từ điện thoại của mình.",
    delay: 0.3,
    transformVariant: 1,
    gradientVariant: 0
  },
  {
    id: 4,
    question: "Có hỗ trợ xuất báo cáo không?",
    answer: "Có, hệ thống cung cấp nhiều loại báo cáo: báo cáo điểm danh theo lớp, theo sinh viên, theo thời gian. Báo cáo có thể xuất dưới dạng PDF hoặc Excel để dễ dàng chia sẻ với ban giám hiệu.",
    delay: 0.4,
    transformVariant: 1,
    gradientVariant: 1
  },
  {
    id: 5,
    question: "Có cần cài đặt phần mềm không?",
    answer: "Không cần cài đặt phần mềm. Hệ thống hoạt động trên trình duyệt web, chỉ cần có kết nối internet. Điều này giúp dễ dàng sử dụng và không tốn dung lượng thiết bị.",
    delay: 0.5,
    transformVariant: 0,
    gradientVariant: 0
  },
  {
    id: 6,
    question: "Có hỗ trợ đào tạo sử dụng không?",
    answer: "Có, chúng tôi cung cấp đào tạo miễn phí cho giáo viên và nhân viên trường học. Bao gồm video hướng dẫn chi tiết, tài liệu PDF và hỗ trợ trực tiếp qua hotline.",
    delay: 0.6,
    transformVariant: 1,
    gradientVariant: 1
  }
];

// Helper functions
export const getFaqConfig = () => faqConfig;
export const getFaqItems = () => faqItems;
export const getFaqItemById = (id) => faqItems.find(item => item.id === id);
export const getFaqItemsByDelay = (delay) => faqItems.filter(item => item.delay === delay);
