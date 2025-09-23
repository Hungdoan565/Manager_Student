# 🚀 Excel Import Tool - Simple Version

## 📋 Yêu cầu

- Python 3.7+
- pip

## 🔧 Cài đặt

```bash
# Cài đặt dependencies
pip install pandas openpyxl supabase

# Hoặc chạy script sẽ tự động cài đặt
python simple_excel_import.py
```

## ⚙️ Cấu hình

1. Mở file `config.py`
2. Cập nhật thông tin Supabase:
   ```python
   SUPABASE_URL = "https://your-project-id.supabase.co"
   SUPABASE_KEY = "your-anon-key"
   ```

## 📊 Cách sử dụng

### Import sinh viên

```bash
python simple_excel_import.py students students.xlsx
```

### Import lớp học

```bash
python simple_excel_import.py classes classes.xlsx
```

## 📋 Định dạng Excel

### Sinh viên

| STT | Mã sinh viên | Họ đệm      | Tên | Giới tính | Ngày sinh  | Lớp học   |
| --- | ------------ | ----------- | --- | --------- | ---------- | --------- |
| 1   | 221222       | Lê Văn Nhựt | Anh | Nam       | 30/10/2004 | DH22TIN06 |

### Lớp học

| Tên lớp   | Khối lớp | Mô tả                             | Số học sinh tối đa |
| --------- | -------- | --------------------------------- | ------------------ |
| DH22TIN06 | DH22TIN  | Lớp Công nghệ thông tin khóa 2022 | 50                 |

## 🎯 Ưu điểm

- ✅ Đơn giản, dễ sử dụng
- ✅ Không cần Django
- ✅ Tự động cài đặt dependencies
- ✅ Xử lý lỗi tốt
- ✅ Hỗ trợ nhiều định dạng Excel
- ✅ Mapping cột linh hoạt

## 🔍 Troubleshooting

### Lỗi "Module not found"

```bash
pip install pandas openpyxl supabase
```

### Lỗi "File not found"

- Kiểm tra đường dẫn file
- Đảm bảo file Excel tồn tại

### Lỗi "Supabase connection"

- Kiểm tra SUPABASE_URL và SUPABASE_KEY trong config.py
- Đảm bảo kết nối internet

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:

1. File Excel có đúng định dạng không
2. Cấu hình Supabase có đúng không
3. Kết nối internet có ổn định không
