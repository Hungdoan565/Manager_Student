# Project Structure

## Cấu trúc dự án hệ thống quản lý sinh viên

### 1. Tổng quan cấu trúc

```
QLSV/
├── frontend/                    # React + Vite Frontend
├── backend/                     # Django Backend
├── docs/                        # Documentation
├── scripts/                     # Deployment & Utility Scripts
├── .github/                     # GitHub Actions & Templates
├── .vscode/                     # VS Code Settings
├── .gitignore
├── README.md
├── docker-compose.yml           # Local Development
└── LICENSE
```

### 2. Frontend Structure (React + Vite)

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── manifest.json
├── src/
│   ├── components/              # Reusable Components
│   │   ├── common/             # Common UI Components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   ├── forms/              # Form Components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── ClassForm.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   ├── AttendanceForm.tsx
│   │   │   └── ScheduleForm.tsx
│   │   ├── tables/             # Table Components
│   │   │   ├── StudentTable.tsx
│   │   │   ├── AttendanceTable.tsx
│   │   │   ├── ScheduleTable.tsx
│   │   │   └── DataTable.tsx
│   │   ├── charts/             # Chart Components
│   │   │   ├── AttendanceChart.tsx
│   │   │   ├── StatisticsChart.tsx
│   │   │   └── PieChart.tsx
│   │   └── layout/             # Layout Components
│   │       ├── DashboardLayout.tsx
│   │       ├── AuthLayout.tsx
│   │       └── PageLayout.tsx
│   ├── pages/                   # Page Components
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── classes/
│   │   │   ├── ClassList.tsx
│   │   │   ├── ClassDetail.tsx
│   │   │   ├── CreateClass.tsx
│   │   │   └── EditClass.tsx
│   │   ├── students/
│   │   │   ├── StudentList.tsx
│   │   │   ├── StudentDetail.tsx
│   │   │   ├── CreateStudent.tsx
│   │   │   └── EditStudent.tsx
│   │   ├── attendance/
│   │   │   ├── AttendanceList.tsx
│   │   │   ├── TakeAttendance.tsx
│   │   │   ├── AttendanceReports.tsx
│   │   │   └── AttendanceHistory.tsx
│   │   ├── schedules/
│   │   │   ├── ScheduleList.tsx
│   │   │   ├── ScheduleCalendar.tsx
│   │   │   ├── CreateSchedule.tsx
│   │   │   └── EditSchedule.tsx
│   │   └── reports/
│   │       ├── Reports.tsx
│   │       ├── AttendanceReport.tsx
│   │       └── StatisticsReport.tsx
│   ├── hooks/                   # Custom Hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── usePagination.ts
│   ├── services/                # API Services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── classes.ts
│   │   ├── students.ts
│   │   ├── attendance.ts
│   │   └── schedules.ts
│   ├── store/                   # State Management (Zustand)
│   │   ├── authStore.ts
│   │   ├── classStore.ts
│   │   ├── studentStore.ts
│   │   ├── attendanceStore.ts
│   │   └── scheduleStore.ts
│   ├── utils/                   # Utility Functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── dateUtils.ts
│   ├── types/                   # TypeScript Types
│   │   ├── auth.ts
│   │   ├── class.ts
│   │   ├── student.ts
│   │   ├── attendance.ts
│   │   ├── schedule.ts
│   │   └── api.ts
│   ├── styles/                  # Global Styles
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── utilities.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

### 3. Backend Structure (Django)

```
backend/
├── sms/                        # Main Django Project
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── development.py
│   │   ├── production.py
│   │   └── testing.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/                       # Django Apps
│   ├── authentication/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── permissions.py
│   │   ├── admin.py
│   │   ├── tests.py
│   │   └── migrations/
│   ├── classes/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── tests.py
│   │   └── migrations/
│   ├── students/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── tests.py
│   │   └── migrations/
│   ├── attendance/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── tests.py
│   │   └── migrations/
│   ├── schedules/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── tests.py
│   │   └── migrations/
│   └── reports/
│       ├── __init__.py
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       ├── urls.py
│       ├── admin.py
│       ├── tests.py
│       └── migrations/
├── core/                       # Core Utilities
│   ├── __init__.py
│   ├── permissions.py
│   ├── pagination.py
│   ├── filters.py
│   ├── exceptions.py
│   └── utils.py
├── static/                     # Static Files
│   ├── css/
│   ├── js/
│   └── images/
├── media/                      # Media Files
├── templates/                  # Django Templates (if needed)
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   ├── production.txt
│   └── testing.txt
├── manage.py
├── .env.example
└── README.md
```

### 4. Documentation Structure

```
docs/
├── PRD.md                      # Product Requirements Document
├── implementation.md           # Implementation Guide
├── UI_UX.md                    # UI/UX Design Guidelines
├── project_structure.md        # This file
├── bug_tracking.md             # Bug Tracking Guidelines
├── api/                        # API Documentation
│   ├── authentication.md
│   ├── classes.md
│   ├── students.md
│   ├── attendance.md
│   └── schedules.md
├── deployment/                 # Deployment Guides
│   ├── local.md
│   ├── staging.md
│   └── production.md
└── user_guides/                # User Documentation
    ├── teacher_guide.md
    ├── admin_guide.md
    └── faq.md
```

### 5. Scripts Structure

```
scripts/
├── setup/                      # Setup Scripts
│   ├── install_dependencies.sh
│   ├── setup_database.sh
│   └── create_superuser.py
├── deployment/                 # Deployment Scripts
│   ├── deploy_frontend.sh
│   ├── deploy_backend.sh
│   └── backup_database.sh
├── development/                # Development Scripts
│   ├── run_tests.sh
│   ├── lint_code.sh
│   └── generate_migrations.sh
└── utilities/                  # Utility Scripts
    ├── export_data.py
    ├── import_data.py
    └── cleanup_old_data.py
```

### 6. Configuration Files

#### 6.1 Root Level

```
.gitignore                      # Git ignore rules
.gitattributes                  # Git attributes
README.md                       # Project overview
LICENSE                         # License file
docker-compose.yml              # Docker compose for local dev
docker-compose.prod.yml         # Docker compose for production
```

#### 6.2 Frontend Configuration

```
frontend/
├── package.json                # Dependencies & scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .env.example                # Environment variables template
└── vercel.json                 # Vercel deployment config
```

#### 6.3 Backend Configuration

```
backend/
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
├── pytest.ini                 # Pytest configuration
├── .flake8                     # Flake8 linting config
├── .isort.cfg                  # Import sorting config
└── railway.json                # Railway deployment config
```

### 7. Database Structure

#### 7.1 Supabase Tables

```sql
-- Core tables
profiles                        # User profiles
classes                         # Class information
students                        # Student information
subjects                        # Subject information
attendance                      # Attendance records
schedules                       # Class schedules

-- Junction tables
class_students                  # Many-to-many: classes and students
class_subjects                  # Many-to-many: classes and subjects
teacher_subjects                # Many-to-many: teachers and subjects

-- Audit tables
audit_logs                      # System audit logs
```

### 8. Environment Variables

#### 8.1 Frontend (.env)

```bash
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_APP_NAME=Student Management System
VITE_APP_VERSION=1.0.0
```

#### 8.2 Backend (.env)

```bash
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=your-supabase-db-url
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-key
```

### 9. Testing Structure

#### 9.1 Frontend Tests

```
frontend/
├── src/
│   └── __tests__/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       └── utils/
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
└── playwright/
    ├── tests/
    └── fixtures/
```

#### 9.2 Backend Tests

```
backend/
├── apps/
│   └── */tests/
│       ├── test_models.py
│       ├── test_views.py
│       ├── test_serializers.py
│       └── test_permissions.py
└── tests/
    ├── test_integration.py
    └── test_api.py
```

### 10. Deployment Structure

#### 10.1 Frontend (Vercel)

```
vercel.json
├── buildCommand: npm run build
├── outputDirectory: dist
├── installCommand: npm install
└── env:
    ├── VITE_API_URL
    ├── VITE_SUPABASE_URL
    └── VITE_SUPABASE_ANON_KEY
```

#### 10.2 Backend (Railway/Heroku)

```
Procfile: web: gunicorn sms.wsgi:application
requirements.txt: Python dependencies
runtime.txt: Python version
```

### 11. Monitoring & Logging

#### 11.1 Error Tracking

```
frontend/
├── src/
│   └── utils/
│       └── errorTracking.ts    # Sentry integration

backend/
├── core/
│   └── logging.py               # Django logging config
```

#### 11.2 Analytics

```
frontend/
├── src/
│   └── utils/
│       └── analytics.ts         # Google Analytics
```

### 12. Security Structure

#### 12.1 Authentication

```
backend/
├── apps/
│   └── authentication/
│       ├── jwt_auth.py         # JWT authentication
│       ├── permissions.py      # Custom permissions
│       └── middleware.py      # Custom middleware
```

#### 12.2 Data Validation

```
frontend/
├── src/
│   ├── utils/
│   │   └── validators.ts       # Frontend validation
│   └── types/
│       └── schemas.ts          # Zod schemas

backend/
├── apps/
│   └── */serializers.py        # Django serializers
```

### 13. Performance Optimization

#### 13.1 Frontend

```
frontend/
├── src/
│   ├── components/
│   │   └── lazy/               # Lazy-loaded components
│   └── utils/
│       └── performance.ts      # Performance utilities
```

#### 13.2 Backend

```
backend/
├── core/
│   ├── caching.py              # Redis caching
│   └── optimization.py         # Query optimization
```

### 14. Development Workflow

#### 14.1 Git Workflow

```
main                           # Production branch
├── develop                    # Development branch
├── feature/*                  # Feature branches
├── hotfix/*                   # Hotfix branches
└── release/*                  # Release branches
```

#### 14.2 CI/CD Pipeline

```
.github/
└── workflows/
    ├── frontend-ci.yml        # Frontend CI
    ├── backend-ci.yml         # Backend CI
    ├── deploy-staging.yml     # Staging deployment
    └── deploy-production.yml  # Production deployment
```
