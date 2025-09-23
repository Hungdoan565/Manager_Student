# Implementation Guide

## Hướng dẫn triển khai hệ thống quản lý sinh viên

### 1. Kiến trúc hệ thống

#### 1.1 System Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vite+React)  │◄──►│   (Django)      │◄──►│   (Supabase)    │
│   Port: 3000    │    │   Port: 8000    │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### 1.2 Technology Stack

- **Frontend**: Vite + React 18 + JavaScript + Tailwind CSS
- **Backend**: Django 4.2 + Django REST Framework + PostgreSQL
- **Database**: Supabase (PostgreSQL với RLS)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel (Frontend) + Railway (Backend)

#### 1.3 Communication Flow

1. **Frontend** ↔ **Backend**: REST API với JWT authentication
2. **Backend** ↔ **Database**: Django ORM với Supabase connection
3. **Real-time**: Supabase Realtime cho live updates
4. **File Storage**: Supabase Storage cho uploads

### 2. Cấu trúc thư mục dự án

#### 2.1 Root Structure

```
QLSV/
├── frontend/                 # React + Vite frontend
├── backend/                  # Django backend
├── DOCS/                     # Documentation
├── rules/                    # Development rules
├── scripts/                  # Utility scripts
├── .github/                  # GitHub workflows & templates
├── .vscode/                  # VS Code configuration
├── README.md                 # Project overview
├── .gitignore               # Git ignore rules
└── env.example              # Environment template
```

#### 2.2 Frontend Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Common UI components
│   │   ├── forms/          # Form components
│   │   ├── tables/         # Table components
│   │   ├── charts/         # Chart components
│   │   └── layout/         # Layout components
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── classes/        # Class management pages
│   │   ├── students/       # Student management pages
│   │   ├── attendance/     # Attendance pages
│   │   ├── schedules/      # Schedule pages
│   │   └── reports/        # Report pages
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── store/              # Zustand stores
│   ├── utils/              # Utility functions
│   ├── constants/          # Application constants
│   └── styles/             # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind CSS config
```

#### 2.3 Backend Structure

```
backend/
├── sms/                    # Main Django project
│   ├── settings/           # Settings modules
│   ├── urls.py            # Main URL configuration
│   └── wsgi.py            # WSGI configuration
├── apps/                   # Django applications
│   ├── authentication/    # User authentication
│   ├── classes/           # Class management
│   ├── students/          # Student management
│   ├── attendance/        # Attendance tracking
│   ├── schedules/         # Schedule management
│   └── reports/           # Reporting system
├── core/                  # Core utilities
├── media/                 # Media files
├── static/                # Static files
├── templates/             # HTML templates
├── requirements.txt       # Python dependencies
└── manage.py             # Django management script
```

### 3. Database Schema (Supabase)

#### 3.1 Core Tables

**Profiles Table** (extends Supabase auth.users)

```sql
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('teacher', 'admin', 'manager')) NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Academic Years Table**

```sql
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Classes Table**

```sql
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    grade TEXT NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id),
    teacher_id UUID REFERENCES profiles(id),
    max_students INTEGER DEFAULT 40,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Subjects Table**

```sql
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    credits INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Students Table**

```sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    phone TEXT,
    email TEXT,
    address TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    class_id UUID REFERENCES classes(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Class Subjects Table** (Many-to-many relationship)

```sql
CREATE TABLE class_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(class_id, subject_id)
);
```

**Attendance Table**

```sql
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT CHECK (status IN ('present', 'absent', 'late', 'excused')) NOT NULL,
    notes TEXT,
    teacher_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, class_id, subject_id, date)
);
```

**Schedules Table**

```sql
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES profiles(id),
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday, 6 = Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room TEXT,
    academic_year_id UUID REFERENCES academic_years(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Grades Table**

```sql
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    grade_type TEXT CHECK (grade_type IN ('quiz', 'midterm', 'final', 'assignment', 'participation')) NOT NULL,
    score DECIMAL(5,2) CHECK (score >= 0 AND score <= 100),
    max_score DECIMAL(5,2) DEFAULT 100,
    notes TEXT,
    teacher_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3.2 Indexes for Performance

```sql
-- Performance indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_classes_academic_year ON classes(academic_year_id);
CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_students_code ON students(student_code);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_attendance_class_date ON attendance(class_id, date);
CREATE INDEX idx_attendance_subject_date ON attendance(subject_id, date);
CREATE INDEX idx_schedules_class ON schedules(class_id);
CREATE INDEX idx_schedules_teacher ON schedules(teacher_id);
CREATE INDEX idx_grades_student ON grades(student_id);
CREATE INDEX idx_grades_subject ON grades(subject_id);
```

#### 3.3 Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Example RLS policies
CREATE POLICY "Teachers can view their classes" ON classes
    FOR SELECT USING (
        teacher_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

CREATE POLICY "Teachers can manage students in their classes" ON students
    FOR ALL USING (
        class_id IN (
            SELECT id FROM classes WHERE teacher_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );
```

### 4. API Endpoints (Django REST Framework)

#### 4.1 Authentication Endpoints

```
POST /api/auth/login/          # User login
POST /api/auth/logout/         # User logout
POST /api/auth/refresh/        # Refresh JWT token
GET  /api/auth/profile/        # Get user profile
PUT  /api/auth/profile/        # Update user profile
POST /api/auth/change-password/ # Change password
POST /api/auth/reset-password/  # Reset password
```

**Request/Response Examples:**

```json
// POST /api/auth/login/
{
  "email": "teacher@school.com",
  "password": "password123"
}

// Response
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "uuid",
    "email": "teacher@school.com",
    "full_name": "John Doe",
    "role": "teacher"
  }
}
```

#### 4.2 Classes Management Endpoints

```
GET    /api/classes/                    # List all classes
POST   /api/classes/                    # Create new class
GET    /api/classes/{id}/               # Get class details
PUT    /api/classes/{id}/               # Update class
DELETE /api/classes/{id}/               # Delete class
GET    /api/classes/{id}/students/      # Get class students
POST   /api/classes/{id}/students/      # Add student to class
DELETE /api/classes/{id}/students/{student_id}/ # Remove student from class
GET    /api/classes/{id}/subjects/      # Get class subjects
POST   /api/classes/{id}/subjects/      # Add subject to class
```

#### 4.3 Students Management Endpoints

```
GET    /api/students/                   # List all students
POST   /api/students/                   # Create new student
GET    /api/students/{id}/              # Get student details
PUT    /api/students/{id}/              # Update student
DELETE /api/students/{id}/              # Delete student
GET    /api/students/search/            # Search students
POST   /api/students/import/            # Import students from CSV
GET    /api/students/{id}/attendance/   # Get student attendance
GET    /api/students/{id}/grades/       # Get student grades
```

#### 4.4 Attendance Management Endpoints

```
GET    /api/attendance/                 # List attendance records
POST   /api/attendance/                # Create attendance record
GET    /api/attendance/class/{class_id}/ # Get class attendance
GET    /api/attendance/student/{student_id}/ # Get student attendance
PUT    /api/attendance/{id}/            # Update attendance record
DELETE /api/attendance/{id}/            # Delete attendance record
GET    /api/attendance/reports/         # Generate attendance reports
POST   /api/attendance/bulk/            # Bulk attendance update
GET    /api/attendance/statistics/      # Get attendance statistics
```

#### 4.5 Schedule Management Endpoints

```
GET    /api/schedules/                  # List all schedules
POST   /api/schedules/                  # Create new schedule
GET    /api/schedules/{id}/             # Get schedule details
PUT    /api/schedules/{id}/             # Update schedule
DELETE /api/schedules/{id}/             # Delete schedule
GET    /api/schedules/class/{class_id}/ # Get class schedules
GET    /api/schedules/teacher/{teacher_id}/ # Get teacher schedules
GET    /api/schedules/calendar/        # Get calendar view
```

#### 4.6 Reports & Analytics Endpoints

```
GET    /api/reports/attendance/         # Attendance reports
GET    /api/reports/grades/             # Grade reports
GET    /api/reports/students/           # Student reports
GET    /api/reports/classes/            # Class reports
GET    /api/analytics/dashboard/        # Dashboard analytics
GET    /api/analytics/statistics/       # General statistics
POST   /api/reports/export/             # Export reports
```

#### 4.7 API Response Format

```json
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": { ... }
  }
}

// Paginated Response
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 100,
    "total_pages": 5,
    "has_next": true,
    "has_previous": false
  }
}
```

### 5. Frontend Components Structure

#### 5.1 Core Components

```
src/components/
├── common/                    # Common UI components
│   ├── Header.tsx            # Main header with navigation
│   ├── Sidebar.tsx           # Sidebar navigation
│   ├── Loading.tsx            # Loading spinner
│   ├── ErrorBoundary.tsx     # Error boundary wrapper
│   ├── Modal.tsx             # Reusable modal
│   ├── Button.tsx            # Custom button component
│   ├── Input.tsx             # Custom input component
│   ├── Card.tsx              # Card container
│   └── Badge.tsx             # Status badges
├── forms/                     # Form components
│   ├── LoginForm.tsx         # Authentication form
│   ├── ClassForm.tsx         # Class creation/edit form
│   ├── StudentForm.tsx       # Student creation/edit form
│   ├── AttendanceForm.tsx    # Attendance form
│   ├── ScheduleForm.tsx      # Schedule form
│   └── ProfileForm.tsx       # User profile form
├── tables/                    # Table components
│   ├── StudentTable.tsx      # Students data table
│   ├── AttendanceTable.tsx   # Attendance data table
│   ├── ScheduleTable.tsx     # Schedule data table
│   ├── ClassTable.tsx        # Classes data table
│   └── DataTable.tsx         # Generic data table
├── charts/                    # Chart components
│   ├── AttendanceChart.tsx   # Attendance statistics chart
│   ├── StatisticsChart.tsx   # General statistics
│   ├── GradeChart.tsx        # Grade distribution chart
│   └── DashboardChart.tsx    # Dashboard overview chart
└── layout/                    # Layout components
    ├── MainLayout.tsx        # Main application layout
    ├── AuthLayout.tsx        # Authentication layout
    ├── DashboardLayout.tsx   # Dashboard layout
    └── PageLayout.tsx        # Generic page layout
```

#### 5.2 Pages Structure

```
src/pages/
├── auth/                      # Authentication pages
│   ├── LoginPage.tsx         # Login page
│   ├── RegisterPage.tsx      # Registration page
│   └── ForgotPasswordPage.tsx # Password reset page
├── dashboard/                 # Dashboard pages
│   ├── DashboardPage.tsx     # Main dashboard
│   ├── OverviewPage.tsx      # Overview statistics
│   └── AnalyticsPage.tsx     # Detailed analytics
├── classes/                   # Class management pages
│   ├── ClassListPage.tsx     # List all classes
│   ├── ClassDetailPage.tsx   # Class details
│   ├── CreateClassPage.tsx   # Create new class
│   ├── EditClassPage.tsx     # Edit class
│   └── ClassStudentsPage.tsx # Class students management
├── students/                  # Student management pages
│   ├── StudentListPage.tsx   # List all students
│   ├── StudentDetailPage.tsx # Student details
│   ├── CreateStudentPage.tsx # Create new student
│   ├── EditStudentPage.tsx   # Edit student
│   └── StudentProfilePage.tsx # Student profile
├── attendance/                # Attendance pages
│   ├── AttendanceListPage.tsx # List attendance records
│   ├── TakeAttendancePage.tsx # Take attendance
│   ├── AttendanceReportsPage.tsx # Attendance reports
│   └── AttendanceStatisticsPage.tsx # Attendance statistics
├── schedules/                 # Schedule pages
│   ├── ScheduleListPage.tsx  # List schedules
│   ├── CreateSchedulePage.tsx # Create schedule
│   ├── EditSchedulePage.tsx  # Edit schedule
│   ├── ScheduleCalendarPage.tsx # Calendar view
│   └── TeacherSchedulePage.tsx # Teacher schedule
└── reports/                   # Reports pages
    ├── ReportsPage.tsx        # Reports overview
    ├── AttendanceReportPage.tsx # Attendance reports
    ├── GradeReportPage.tsx    # Grade reports
    └── ExportReportPage.tsx   # Export reports
```

#### 5.3 Component Examples

**Button Component:**

```javascript
// src/components/common/Button.jsx
import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors";
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <LoadingSpinner size="sm" /> : children}
    </button>
  );
};

export default Button;
```

**Data Table Component:**

```javascript
// src/components/tables/DataTable.jsx
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const DataTable = ({
  data,
  columns,
  loading = false,
  pagination,
  onRowClick,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={onRowClick ? "cursor-pointer hover:bg-accent" : ""}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && <Pagination {...pagination} />}
    </div>
  );
};

export default DataTable;
```

### 6. State Management (Zustand)

#### 6.1 Store Structure

```
src/store/
├── authStore.js            # Authentication state
├── classStore.js           # Classes state
├── studentStore.js         # Students state
├── attendanceStore.js       # Attendance state
├── scheduleStore.js        # Schedule state
├── uiStore.js              # UI state (modals, loading)
└── index.js                # Store exports
```

#### 6.2 Authentication Store

```javascript
// stores/authStore.js
import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      const { access, refresh, user } = response.data;

      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);

      set({
        user,
        token: access,
        refreshToken: refresh,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  refreshToken: async () => {
    const { refreshToken } = get();
    if (!refreshToken) return;

    try {
      const response = await authService.refreshToken(refreshToken);
      const { access } = response.data;

      localStorage.setItem("token", access);
      set({ token: access });
    } catch (error) {
      get().logout();
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authService.updateProfile(data);
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
```

#### 6.3 Class Store

```typescript
// stores/classStore.ts
interface Class {
  id: string;
  name: string;
  grade: string;
  academic_year_id: string;
  teacher_id: string;
  max_students: number;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ClassState {
  classes: Class[];
  currentClass: Class | null;
  isLoading: boolean;
  error: string | null;
}

interface ClassActions {
  fetchClasses: () => Promise<void>;
  fetchClass: (id: string) => Promise<void>;
  createClass: (data: CreateClassData) => Promise<void>;
  updateClass: (id: string, data: UpdateClassData) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  setCurrentClass: (class: Class | null) => void;
  clearError: () => void;
}

export const useClassStore = create<ClassState & ClassActions>((set, get) => ({
  // State
  classes: [],
  currentClass: null,
  isLoading: false,
  error: null,

  // Actions
  fetchClasses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await classService.getClasses();
      set({ classes: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchClass: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await classService.getClass(id);
      set({ currentClass: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createClass: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await classService.createClass(data);
      set(state => ({
        classes: [...state.classes, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateClass: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await classService.updateClass(id, data);
      set(state => ({
        classes: state.classes.map(cls =>
          cls.id === id ? response.data : cls
        ),
        currentClass: state.currentClass?.id === id ? response.data : state.currentClass,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteClass: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await classService.deleteClass(id);
      set(state => ({
        classes: state.classes.filter(cls => cls.id !== id),
        currentClass: state.currentClass?.id === id ? null : state.currentClass,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  setCurrentClass: (classData) => set({ currentClass: classData }),
  clearError: () => set({ error: null }),
}));
```

#### 6.4 UI Store

```typescript
// stores/uiStore.ts
interface UIState {
  sidebarOpen: boolean;
  modals: {
    [key: string]: boolean;
  };
  notifications: Notification[];
  theme: "light" | "dark";
}

interface UIActions {
  toggleSidebar: () => void;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // State
  sidebarOpen: true,
  modals: {},
  notifications: [],
  theme: "light",

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  openModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),

  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Date.now().toString() },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
  },
}));
```

### 7. Security Implementation

#### 7.1 Authentication Security

- **JWT Tokens**: Access token (15 minutes) + Refresh token (7 days)
- **Password Hashing**: bcrypt với salt rounds = 12
- **Rate Limiting**: 5 attempts per minute cho login
- **Session Management**: Automatic token refresh
- **Logout Security**: Token blacklisting

**Implementation:**

```python
# backend/apps/authentication/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims
        data['user'] = {
            'id': str(self.user.id),
            'email': self.user.email,
            'full_name': self.user.full_name,
            'role': self.user.role,
        }

        return data
```

#### 7.2 Authorization (RBAC)

- **Role-based Access Control**: teacher, admin, manager
- **Resource-level Permissions**: Users chỉ access được resources của họ
- **API-level Security**: Django permissions + custom decorators

**Implementation:**

```python
# backend/apps/authentication/permissions.py
from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user or request.user.role in ['admin', 'manager']

class IsTeacherOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['teacher', 'admin', 'manager']
```

#### 7.3 Data Validation

- **Frontend**: React Hook Form + Zod schemas
- **Backend**: Django serializers + custom validators
- **Database**: Constraints và triggers

**Frontend Validation:**

```javascript
// src/utils/validation.js
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  grade: z.string().min(1, "Grade is required"),
  academic_year_id: z.string().uuid("Invalid academic year"),
  max_students: z.number().min(1).max(50),
  description: z.string().optional(),
});
```

**Backend Validation:**

```python
# backend/apps/classes/serializers.py
from rest_framework import serializers
from .models import Class

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

    def validate_max_students(self, value):
        if value < 1 or value > 50:
            raise serializers.ValidationError("Max students must be between 1 and 50")
        return value

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Class name cannot be empty")
        return value.strip()
```

#### 7.4 Input Sanitization

- **XSS Prevention**: React's built-in XSS protection
- **SQL Injection**: Django ORM protection
- **CSRF Protection**: Django CSRF middleware
- **File Upload Security**: File type validation, size limits

### 8. Performance Optimization

#### 8.1 Frontend Optimization

- **Code Splitting**: React.lazy() cho route-based splitting
- **Memoization**: React.memo(), useMemo(), useCallback()
- **Virtual Scrolling**: cho large lists (react-window)
- **Image Optimization**: WebP format, lazy loading
- **Bundle Optimization**: Tree shaking, dead code elimination

**Implementation:**

```javascript
// src/pages/Students/StudentListPage.jsx
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const StudentTable = lazy(() => import("@/components/tables/StudentTable"));

const StudentListPage = () => {
  return (
    <div>
      <h1>Students</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <StudentTable />
      </Suspense>
    </div>
  );
};

export default StudentListPage;
```

#### 8.2 Backend Optimization

- **Database Indexing**: Strategic indexes cho frequently queried fields
- **Query Optimization**: select_related(), prefetch_related()
- **Caching**: Redis cho frequently accessed data
- **Pagination**: Limit large datasets
- **Connection Pooling**: Database connection optimization

**Implementation:**

```python
# backend/apps/students/views.py
from django.core.cache import cache
from django.db.models import Prefetch

class StudentViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        cache_key = f"students_{self.request.user.id}"
        students = cache.get(cache_key)

        if not students:
            students = Student.objects.select_related('class_id').prefetch_related(
                Prefetch('attendance_set', queryset=Attendance.objects.filter(
                    date__gte=timezone.now().date() - timedelta(days=30)
                ))
            ).filter(class_id__teacher_id=self.request.user.id)

            cache.set(cache_key, students, 300)  # Cache for 5 minutes

        return students
```

#### 8.3 Database Optimization

- **Indexes**: Strategic indexes cho performance
- **Query Analysis**: EXPLAIN ANALYZE cho slow queries
- **Connection Pooling**: Supabase connection limits
- **Data Archiving**: Archive old attendance records

### 9. Testing Strategy

#### 9.1 Frontend Testing

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Component integration testing
- **E2E Tests**: Playwright cho user workflows
- **Visual Regression**: Screenshot testing

**Test Examples:**

```javascript
// src/components/__tests__/Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

#### 9.2 Backend Testing

- **Unit Tests**: Django TestCase cho models và utilities
- **API Tests**: Django REST Framework test client
- **Integration Tests**: Database integration testing
- **Performance Tests**: Load testing với pytest-benchmark

**Test Examples:**

```python
# backend/apps/classes/tests.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Class

User = get_user_model()

class ClassModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='teacher@test.com',
            password='testpass123',
            full_name='Test Teacher',
            role='teacher'
        )

    def test_class_creation(self):
        class_obj = Class.objects.create(
            name='Test Class',
            grade='10A',
            teacher_id=self.user,
            max_students=30
        )
        self.assertEqual(class_obj.name, 'Test Class')
        self.assertEqual(class_obj.teacher_id, self.user)

class ClassAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='teacher@test.com',
            password='testpass123',
            full_name='Test Teacher',
            role='teacher'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_class(self):
        data = {
            'name': 'Test Class',
            'grade': '10A',
            'max_students': 30
        }
        response = self.client.post('/api/classes/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Class.objects.count(), 1)
```

### 10. Deployment

#### 10.1 Frontend Deployment (Vercel)

```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
VITE_API_URL=https://your-backend-url.com
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Vercel Configuration:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm ci",
  "devCommand": "npm run dev"
}
```

#### 10.2 Backend Deployment (Railway)

```bash
# Requirements
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
psycopg2-binary==2.9.7
python-decouple==3.8
gunicorn==21.2.0
whitenoise==6.6.0

# Environment variables
SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=your-supabase-db-url
ALLOWED_HOSTS=your-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com
```

**Railway Configuration:**

```toml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "gunicorn sms.wsgi:application --bind 0.0.0.0:$PORT"
healthcheckPath = "/health/"
healthcheckTimeout = 100
restartPolicyType = "on_failure"
```

#### 10.3 Database Deployment (Supabase)

- **Production Database**: Supabase production project
- **Migrations**: Automated migration deployment
- **Backups**: Daily automated backups
- **Monitoring**: Database performance monitoring

### 11. Monitoring & Logging

#### 11.1 Error Tracking

- **Frontend**: Sentry integration
- **Backend**: Django logging + Sentry
- **Database**: Supabase error monitoring

**Sentry Configuration:**

```javascript
// src/utils/sentry.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  tracesSampleRate: 1.0,
});
```

#### 11.2 Analytics

- **User Behavior**: Google Analytics 4
- **Performance**: Web Vitals monitoring
- **API Monitoring**: Uptime monitoring với Pingdom
- **Database Performance**: Supabase analytics

#### 11.3 Logging Strategy

- **Structured Logging**: JSON format cho easy parsing
- **Log Levels**: DEBUG, INFO, WARNING, ERROR, CRITICAL
- **Log Aggregation**: Centralized logging với ELK stack
- **Retention Policy**: 30 days cho application logs, 1 year cho audit logs

**Django Logging Configuration:**

```python
# backend/sms/settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'json': {
            'format': '{"level": "%(levelname)s", "time": "%(asctime)s", "module": "%(module)s", "message": "%(message)s"}',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/django.log',
            'formatter': 'json',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
}
```
