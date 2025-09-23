#!/usr/bin/env python3
"""
Simple Excel import script - Không cần Django
Chỉ cần: pip install pandas openpyxl supabase
"""

import pandas as pd
import sys
import os
from pathlib import Path

# Cài đặt Supabase nếu chưa có
try:
    from supabase import create_client
except ImportError:
    print("Installing supabase...")
    os.system("pip install supabase")
    from supabase import create_client

# Import config
try:
    from config import SUPABASE_URL, SUPABASE_KEY, DEFAULT_TEACHER_ID, DEFAULT_ACADEMIC_YEAR_ID
except ImportError:
    # Fallback config
    SUPABASE_URL = "https://your-project-id.supabase.co"  # Thay bằng URL thực tế
    SUPABASE_KEY = "your-anon-key"  # Thay bằng anon key thực tế
    DEFAULT_TEACHER_ID = "1c1f3b9b-695c-4b20-abde-63918ac60c75"
    DEFAULT_ACADEMIC_YEAR_ID = "1c1f3b9b-695c-4b20-abde-63918ac60c75"

def get_supabase_client():
    """Get Supabase client"""
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def process_student_excel(file_path):
    """Xử lý file Excel sinh viên"""
    try:
        print(f"📖 Đang đọc file: {file_path}")
        
        # Đọc Excel file
        df = pd.read_excel(file_path)
        print(f"📊 Tìm thấy {len(df)} dòng dữ liệu")
        print(f"📋 Các cột: {list(df.columns)}")
        
        # Lấy Supabase client
        supabase = get_supabase_client()
        
        # Lấy danh sách lớp học để map
        print("🔍 Đang lấy danh sách lớp học...")
        classes_response = supabase.table('classes').select('id, name').execute()
        classes = {cls['name']: cls['id'] for cls in classes_response.data}
        print(f"📚 Tìm thấy {len(classes)} lớp học")
        
        # Xử lý dữ liệu
        students_data = []
        for index, row in df.iterrows():
            # Lấy dữ liệu từ các cột
            student_code = str(row.get('Mã sinh viên', row.get('student_code', '')))
            ho_dem = str(row.get('Họ đệm', row.get('Họ và tên đệm', '')))
            ten = str(row.get('Tên', ''))
            gioi_tinh = str(row.get('Giới tính', 'Nam'))
            ngay_sinh = row.get('Ngày sinh', '')
            lop_hoc = str(row.get('Lớp học', row.get('class_name', '')))
            
            # Bỏ qua dòng trống
            if not student_code or student_code == 'nan':
                continue
                
            # Gộp tên
            full_name = f"{ho_dem} {ten}".strip()
            
            # Chuyển giới tính
            gender = 'male' if gioi_tinh == 'Nam' else 'female' if gioi_tinh == 'Nữ' else 'other'
            
            # Xử lý ngày sinh
            if pd.notna(ngay_sinh):
                if isinstance(ngay_sinh, str):
                    try:
                        from datetime import datetime
                        date_obj = datetime.strptime(ngay_sinh, '%d/%m/%Y')
                        ngay_sinh = date_obj.strftime('%Y-%m-%d')
                    except:
                        ngay_sinh = ''
                else:
                    try:
                        ngay_sinh = ngay_sinh.strftime('%Y-%m-%d')
                    except:
                        ngay_sinh = ''
            else:
                ngay_sinh = ''
            
            # Tìm class_id
            class_id = classes.get(lop_hoc, None)
            
            student_data = {
                'student_code': student_code,
                'full_name': full_name,
                'gender': gender,
                'date_of_birth': ngay_sinh,
                'class_id': class_id,
                'is_active': True
            }
            
            students_data.append(student_data)
        
        print(f"✅ Đã xử lý {len(students_data)} sinh viên")
        
        # Import vào Supabase
        if students_data:
            print("📤 Đang import vào Supabase...")
            result = supabase.table('students').insert(students_data).execute()
            print(f"🎉 Thành công! Đã import {len(result.data)} sinh viên")
            return True
        else:
            print("❌ Không có dữ liệu hợp lệ để import")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi: {str(e)}")
        return False

def process_class_excel(file_path):
    """Xử lý file Excel lớp học"""
    try:
        print(f"📖 Đang đọc file: {file_path}")
        
        # Đọc Excel file
        df = pd.read_excel(file_path)
        print(f"📊 Tìm thấy {len(df)} dòng dữ liệu")
        print(f"📋 Các cột: {list(df.columns)}")
        
        # Lấy Supabase client
        supabase = get_supabase_client()
        
        # Xử lý dữ liệu
        classes_data = []
        for index, row in df.iterrows():
            # Lấy dữ liệu từ các cột
            ten_lop = str(row.get('Tên lớp', row.get('name', '')))
            khoi_lop = str(row.get('Khối lớp', row.get('grade', '')))
            mo_ta = str(row.get('Mô tả', row.get('description', '')))
            max_students = row.get('Số học sinh tối đa', row.get('max_students', 40))
            
            # Bỏ qua dòng trống
            if not ten_lop or ten_lop == 'nan':
                continue
                
            class_data = {
                'name': ten_lop,
                'grade': khoi_lop,
                'description': mo_ta,
                'max_students': int(max_students) if pd.notna(max_students) else 40,
                'is_active': True,
                'teacher_id': DEFAULT_TEACHER_ID,
                'academic_year_id': DEFAULT_ACADEMIC_YEAR_ID
            }
            
            classes_data.append(class_data)
        
        print(f"✅ Đã xử lý {len(classes_data)} lớp học")
        
        # Import vào Supabase
        if classes_data:
            print("📤 Đang import vào Supabase...")
            result = supabase.table('classes').insert(classes_data).execute()
            print(f"🎉 Thành công! Đã import {len(result.data)} lớp học")
            return True
        else:
            print("❌ Không có dữ liệu hợp lệ để import")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi: {str(e)}")
        return False

def main():
    """Hàm chính"""
    print("🚀 Excel Import Tool - Simple Version")
    print("=" * 50)
    
    if len(sys.argv) < 3:
        print("📝 Cách sử dụng:")
        print("  python simple_excel_import.py students <file_path>")
        print("  python simple_excel_import.py classes <file_path>")
        print("\n📋 Ví dụ:")
        print("  python simple_excel_import.py students students.xlsx")
        print("  python simple_excel_import.py classes classes.xlsx")
        return
    
    import_type = sys.argv[1]
    file_path = sys.argv[2]
    
    # Kiểm tra file tồn tại
    if not os.path.exists(file_path):
        print(f"❌ File không tồn tại: {file_path}")
        return
    
    # Xử lý theo loại
    if import_type == 'students':
        success = process_student_excel(file_path)
    elif import_type == 'classes':
        success = process_class_excel(file_path)
    else:
        print("❌ Loại không hợp lệ. Sử dụng 'students' hoặc 'classes'")
        return
    
    if success:
        print("\n🎉 Import hoàn thành thành công!")
    else:
        print("\n❌ Import thất bại!")

if __name__ == "__main__":
    main()
