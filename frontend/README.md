# 🎓 Student Management System (SMS)

## 📋 Overview

Hệ thống quản lý sinh viên với tính năng điểm danh, quản lý lớp học và báo cáo thống kê. Được xây dựng với React, Supabase và Tailwind CSS.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LoginForm.jsx     # Login form component
│   │   │   ├── RegisterForm.jsx  # Register form component
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── common/               # Reusable components
│   │   │   ├── AnimatedButton.jsx
│   │   │   ├── BenefitCard.jsx
│   │   │   ├── BlurText.jsx
│   │   │   ├── FloatingElements.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── TiltedCard.jsx
│   │   │   └── TiltedGuideCard.jsx
│   │   ├── layout/               # Layout components
│   │   │   ├── GooeyNav.jsx      # Animated navigation
│   │   │   ├── Layout.jsx        # Main layout
│   │   │   └── Navigation.jsx    # Navigation component
│   │   ├── sections/             # Page sections
│   │   │   └── FAQSection.jsx    # FAQ section
│   │   └── ui/                   # UI components
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Input.jsx
│   ├── data/
│   │   └── faqData.js            # FAQ data configuration
│   ├── hooks/
│   │   └── useDesignSystem.js    # Design system hook
│   ├── lib/
│   │   └── supabase.js           # Supabase client configuration
│   ├── pages/
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── LoginPage.jsx     # Login page
│   │   │   └── RegisterPage.jsx  # Register page
│   │   ├── dashboard/            # Dashboard pages (to be created)
│   │   ├── students/             # Student management (to be created)
│   │   ├── classes/              # Class management (to be created)
│   │   ├── attendance/           # Attendance tracking (to be created)
│   │   └── LandingPage.jsx       # Landing page
│   ├── services/
│   │   └── supabaseService.js    # Supabase service layer
│   ├── store/
│   │   └── authStore.js          # Authentication store (Zustand)
│   ├── utils/
│   │   ├── cn.js                 # Class name utility
│   │   └── designSystem.js       # Design system utilities
│   ├── App.jsx                   # Main app component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # App entry point
├── .env                          # Environment variables
├── design.json                   # Design system configuration
└── package.json                  # Dependencies
```

## 🚀 Features

### ✅ Completed

- **Landing Page**: Professional landing page with animations
- **Design System**: Complete UI component library
- **Supabase Integration**: Database and authentication setup
- **Authentication**: Real authentication with Supabase
- **Teacher Dashboard**: Overview and management interface
- **Student Dashboard**: Student-focused interface
- **Navigation**: Animated GooeyNav component
- **Responsive Design**: Mobile-first approach
- **Role-based Access**: Teacher/Student permissions

### 🚧 In Progress

- **Student Management**: CRUD operations for students
- **Class Management**: Class creation and management
- **Attendance System**: QR code attendance tracking
- **Schedule Management**: Class scheduling system
- **Reports & Analytics**: Data visualization and reports

## 🔧 Setup

### Prerequisites

- Node.js 18+
- Supabase account
- Git

### Installation

1. Clone repository
2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Setup environment variables:

   ```bash
   cp env.example .env
   # Update .env with your Supabase credentials
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## 🎨 Design System

### Colors

- **Primary**: Green (#22c55e) - Education theme
- **Secondary**: Light blue (#e0f2fe)
- **Background**: Alice blue (#f0f8ff)
- **Dark Mode**: Supported

### Components

- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Input**: Form inputs with validation
- **Card**: Flexible card component
- **Badge**: Status indicators
- **Navigation**: Animated GooeyNav

### Typography

- **Font Family**: DM Sans (primary), Lora (serif), IBM Plex Mono (mono)
- **Sizes**: xs (12px) to 4xl (36px)
- **Weights**: Light (300) to Bold (700)

## 🔐 Authentication

### User Roles

- **Teacher**: Full administrative access
- **Student**: Limited personal access

### Features

- JWT token authentication
- Role-based access control (RBAC)
- Password reset functionality
- Session management
- Protected routes

## 🗄️ Database Schema

### Tables

- **profiles**: User profiles with roles
- **students**: Student information
- **classes**: Class/course management
- **attendance**: Attendance records
- **schedules**: Class schedules

### Security

- Row Level Security (RLS) enabled
- Data isolation between users
- Audit logging
- Encrypted data storage

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features

- Mobile-first approach
- Touch-friendly interfaces
- Responsive navigation
- Optimized for all devices

## 🚀 Deployment

### Frontend

- Vite build system
- Optimized bundle size
- Code splitting
- Lazy loading

### Backend

- Supabase hosted database
- Real-time subscriptions
- Edge functions support
- Global CDN

## 📚 Documentation

- **Design System**: `/demo` (when available)
- **API Documentation**: Supabase docs
- **Component Library**: Inline documentation
- **User Roles**: `USER_ROLES_PERMISSIONS.md`

## 🤝 Contributing

1. Follow the design system guidelines
2. Use TypeScript for type safety
3. Write tests for new components
4. Follow the established file structure
5. Update documentation

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for educational institutions**
