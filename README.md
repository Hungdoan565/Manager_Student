# Student Management System

## Tổng quan dự án

Hệ thống quản lý sinh viên dành cho giáo viên với quy mô trung bình (cho trường học). Dự án sử dụng Vite + React cho frontend và Django cho backend, với Supabase làm database.

## Công nghệ sử dụng

- **Frontend**: Vite + React (JavaScript) + Tailwind CSS
- **Backend**: Django + Django REST Framework
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend), Railway/Heroku (Backend)
- **UI Design**: V0.dev

## Tính năng chính

- ✅ Quản lý lớp học
- ✅ Điểm danh sinh viên
- ✅ Quản lý thời khóa biểu
- ✅ Báo cáo và thống kê
- ✅ Quản lý sinh viên

## Cấu trúc dự án

```
QLSV/
├── frontend/                 # React + Vite frontend
├── backend/                  # Django backend
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
└── rules/                   # Development rules
```

## Hướng dẫn phát triển

### 1. Cài đặt môi trường

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env  # chỉnh sửa biến môi trường
# Khởi tạo schema trên Supabase Postgres (chạy một lần hoặc khi có thay đổi model)
python manage.py makemigrations apps.core_app apps.api
python manage.py migrate
# Chạy server
python manage.py runserver
```

### 2. Cấu hình môi trường

- Frontend: `.env` theo `frontend/.env.example` (Supabase URL + ANON KEY)
- Backend: `.env` theo `backend/.env.example`
  - SECRET_KEY, DEBUG, ALLOWED_HOSTS
  - DATABASE_URL (Supabase Postgres, sslmode=require)
  - CORS_ALLOWED_ORIGINS=http://localhost:3000
  - SUPABASE_URL=https://<project>.supabase.co (dùng để xác thực JWT)

Lưu ý: frontend hiện dùng JavaScript (không phải TypeScript).

### 3. Database Setup

Chạy các migration SQL trong Supabase dashboard hoặc sử dụng script migration.

## Documentation

- [PRD](DOCS/PRD.md) - Product Requirements Document
- [Implementation Guide](DOCS/implementation.md) - Hướng dẫn triển khai
- [UI/UX Guidelines](DOCS/UI_UX.md) - Thiết kế giao diện
- [Project Structure](DOCS/project_structure.md) - Cấu trúc dự án
- [Bug Tracking](DOCS/bug_tracking.md) - Quản lý lỗi
- [Supabase Config](DOCS/supabase_config.md) - Cấu hình database

## Development Rules

- [Workflow](rules/workflow.md) - Quy trình phát triển
- [Code Generation](rules/generate.md) - Hướng dẫn tạo code

## Roadmap

- **Phase 1** (4 tuần): Authentication, CRUD cơ bản
- **Phase 2** (3 tuần): Điểm danh, quản lý lớp
- **Phase 3** (3 tuần): Thời khóa biểu, báo cáo
- **Phase 4** (2 tuần): Testing, optimization, deployment

## Database constraints (Supabase Postgres)

If you already have existing tables in Supabase, running Django migrations to create tables may conflict with existing schema. Options:
- Fresh database: run migrations normally.
- Existing database: apply only the necessary constraints manually and skip table creation.

Recommended constraints:
- students: unique(student_code)
- attendance: unique(student_id, class_id, date)

Example SQL to run in Supabase SQL Editor:
- ALTER TABLE students ADD CONSTRAINT uniq_students_student_code UNIQUE (student_code);
- ALTER TABLE attendance ADD CONSTRAINT uniq_attendance_student_class_date UNIQUE (student_id, class_id, date);

## Endpoints (mở rộng)

- Students
  - GET /api/students/?page=&page_size=&search=&ordering=&expand=class
  - GET /api/students/export[?class_id=]
  - POST /api/students/import (multipart/form-data, file=CSV; columns: student_code,full_name,email,class_id,phone,is_active)
- Classes
  - GET /api/classes/?page=&page_size=&search=&ordering=
  - GET /api/classes/export
  - POST /api/classes/import (multipart/form-data, file=CSV; columns: name,grade,description,max_students,teacher_id,academic_year_id,is_active)
  - GET /api/classes/{id}/students
- Attendance
  - GET /api/attendance/?expand=student,class&status=&class_id=&date=
  - POST /api/attendance/ (unique per student/class/date)
  - GET /api/attendance/reports?class_id=&start_date=&end_date=&status=
  - GET /api/attendance/reports/timeseries?class_id=&start_date=&end_date=&status=
  - GET /api/attendance/reports/export?class_id=&start_date=&end_date=&status=

## CI

- Frontend CI: lint + vitest trên GitHub Actions (workflow: .github/workflows/frontend-ci.yml)
- Backend CI: makemigrations (ephemeral) + migrate (SQLite) + Django tests (workflow: .github/workflows/backend-ci.yml)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
