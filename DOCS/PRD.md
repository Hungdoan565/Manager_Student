# Product Requirements Document (PRD)

## Hệ thống Quản lý Sinh viên cho Giáo viên

### 1. Tổng quan dự án

- **Tên dự án**: Student Management System (SMS)
- **Mục tiêu**: Xây dựng hệ thống quản lý sinh viên dành cho giáo viên với quy mô trung bình (cho trường học)
- **Đối tượng sử dụng**: Giáo viên, quản lý trường học
- **Quy mô**: Trung bình (500-2000 sinh viên)

### 2. Công nghệ sử dụng

- **Frontend**: Vite + React + TypeScript
- **Backend**: Django + Django REST Framework
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend), Railway/Heroku (Backend)
- **UI Design**: V0.dev

### 3. Tính năng chính

#### 3.1 Quản lý lớp học

- Tạo, sửa, xóa lớp học
- Phân công giáo viên chủ nhiệm
- Quản lý danh sách sinh viên trong lớp
- Import/Export danh sách sinh viên

#### 3.2 Điểm danh

- Điểm danh theo lớp học
- Điểm danh theo môn học
- Thống kê tỷ lệ có mặt/vắng mặt
- Xuất báo cáo điểm danh
- Lịch sử điểm danh

#### 3.3 Quản lý sinh viên

- Thông tin cá nhân sinh viên
- Lịch sử học tập
- Điểm số các môn học
- Thông tin liên hệ khẩn cấp

#### 3.4 Thời khóa biểu

- Tạo và quản lý thời khóa biểu
- Phân công giáo viên giảng dạy
- Quản lý phòng học
- Thông báo thay đổi lịch học

#### 3.5 Báo cáo và thống kê

- Báo cáo điểm danh
- Thống kê học tập
- Báo cáo tổng hợp theo lớp/môn học

### 4. Yêu cầu phi chức năng

- **Performance**: Hỗ trợ 500-2000 sinh viên đồng thời
- **Security**: Xác thực JWT, phân quyền RBAC
- **Scalability**: Kiến trúc microservices-ready
- **Usability**: Giao diện thân thiện, responsive
- **Reliability**: Uptime 99.5%

### 5. User Stories

#### Giáo viên

- Là giáo viên, tôi muốn tạo lớp học để quản lý sinh viên
- Là giáo viên, tôi muốn điểm danh nhanh chóng trong giờ học
- Là giáo viên, tôi muốn xem thống kê điểm danh của lớp
- Là giáo viên, tôi muốn tạo thời khóa biểu cho lớp

#### Quản lý trường

- Là quản lý, tôi muốn xem tổng quan tình hình điểm danh toàn trường
- Là quản lý, tôi muốn xuất báo cáo định kỳ
- Là quản lý, tôi muốn quản lý phân quyền giáo viên

### 6. Roadmap

- **Phase 1** (4 tuần): Authentication, CRUD cơ bản
- **Phase 2** (3 tuần): Điểm danh, quản lý lớp
- **Phase 3** (3 tuần): Thời khóa biểu, báo cáo
- **Phase 4** (2 tuần): Testing, optimization, deployment

### 7. Success Metrics

- Thời gian điểm danh < 30 giây/lớp
- Tỷ lệ sử dụng > 80% giáo viên
- Thời gian phản hồi < 2 giây
- Zero data loss
