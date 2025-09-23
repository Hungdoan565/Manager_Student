# Student Management System

## Tổng quan dự án

Hệ thống quản lý sinh viên dành cho giáo viên với quy mô trung bình (cho trường học). Dự án sử dụng Vite + React cho frontend và Django cho backend, với Supabase làm database.

## Công nghệ sử dụng

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
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
pip install -r requirements.txt
python manage.py runserver
```

### 2. Cấu hình môi trường

Tạo file `.env` trong thư mục `frontend` và `backend` theo template trong `DOCS/supabase_config.md`

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
