"""
Django views for Excel import functionality
"""

import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import os
from pathlib import Path

# Supabase configuration
SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_KEY = "your-anon-key"

def get_supabase_client():
    """Get Supabase client"""
    from supabase import create_client
    return create_client(SUPABASE_URL, SUPABASE_KEY)

@csrf_exempt
@require_http_methods(["POST"])
def import_excel(request):
    """Handle Excel file import"""
    try:
        # Get uploaded file
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        
        file = request.FILES['file']
        import_type = request.POST.get('type', 'students')
        
        # Save file temporarily
        temp_path = f"/tmp/{file.name}"
        with open(temp_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        # Process based on type
        if import_type == 'students':
            result = process_student_excel(temp_path)
        elif import_type == 'classes':
            result = process_class_excel(temp_path)
        else:
            return JsonResponse({'error': 'Invalid import type'}, status=400)
        
        # Clean up temp file
        os.remove(temp_path)
        
        if result['success']:
            return JsonResponse({
                'success': True,
                'count': result['count'],
                'message': f"Successfully imported {result['count']} {import_type}"
            })
        else:
            return JsonResponse({'error': result['error']}, status=400)
            
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def process_student_excel(file_path):
    """Process student Excel file"""
    try:
        # Read Excel file
        df = pd.read_excel(file_path)
        print(f"Reading Excel file: {file_path}")
        print(f"Columns found: {list(df.columns)}")
        print(f"Shape: {df.shape}")
        
        # Get Supabase client
        supabase = get_supabase_client()
        
        # Transform data
        students_data = []
        for index, row in df.iterrows():
            # Handle different column names
            student_code = row.get('Mã sinh viên', row.get('student_code', ''))
            ho_dem = row.get('Họ đệm', row.get('Họ và tên đệm', ''))
            ten = row.get('Tên', '')
            gioi_tinh = row.get('Giới tính', 'Nam')
            ngay_sinh = row.get('Ngày sinh', '')
            lop_hoc = row.get('Lớp học', row.get('class_name', ''))
            
            # Combine name
            full_name = f"{ho_dem} {ten}".strip()
            
            # Convert gender
            gender = 'male' if gioi_tinh == 'Nam' else 'female' if gioi_tinh == 'Nữ' else 'other'
            
            # Format date
            if pd.notna(ngay_sinh):
                if isinstance(ngay_sinh, str):
                    # Handle DD/MM/YYYY format
                    try:
                        from datetime import datetime
                        date_obj = datetime.strptime(ngay_sinh, '%d/%m/%Y')
                        ngay_sinh = date_obj.strftime('%Y-%m-%d')
                    except:
                        ngay_sinh = ''
                else:
                    # Handle Excel date
                    try:
                        ngay_sinh = ngay_sinh.strftime('%Y-%m-%d')
                    except:
                        ngay_sinh = ''
            else:
                ngay_sinh = ''
            
            student_data = {
                'student_code': str(student_code),
                'full_name': full_name,
                'gender': gender,
                'date_of_birth': ngay_sinh,
                'class_name': str(lop_hoc),
                'is_active': True
            }
            
            students_data.append(student_data)
        
        print(f"Processed {len(students_data)} students")
        
        # Import to Supabase
        if students_data:
            # First, get all classes to map class names to IDs
            classes_response = supabase.table('classes').select('id, name').execute()
            classes = {cls['name']: cls['id'] for cls in classes_response.data}
            
            # Update student data with class IDs
            for student in students_data:
                class_name = student.pop('class_name', '')
                student['class_id'] = classes.get(class_name, None)
            
            # Insert students
            result = supabase.table('students').insert(students_data).execute()
            print(f"Successfully imported {len(result.data)} students")
            return {'success': True, 'count': len(result.data)}
        else:
            return {'success': False, 'error': 'No valid data found'}
            
    except Exception as e:
        print(f"Error processing student Excel: {str(e)}")
        return {'success': False, 'error': str(e)}

def process_class_excel(file_path):
    """Process class Excel file"""
    try:
        # Read Excel file
        df = pd.read_excel(file_path)
        print(f"Reading Excel file: {file_path}")
        print(f"Columns found: {list(df.columns)}")
        print(f"Shape: {df.shape}")
        
        # Get Supabase client
        supabase = get_supabase_client()
        
        # Transform data
        classes_data = []
        for index, row in df.iterrows():
            # Handle different column names
            ten_lop = row.get('Tên lớp', row.get('name', ''))
            khoi_lop = row.get('Khối lớp', row.get('grade', ''))
            mo_ta = row.get('Mô tả', row.get('description', ''))
            max_students = row.get('Số học sinh tối đa', row.get('max_students', 40))
            
            class_data = {
                'name': str(ten_lop),
                'grade': str(khoi_lop),
                'description': str(mo_ta),
                'max_students': int(max_students) if pd.notna(max_students) else 40,
                'is_active': True,
                'teacher_id': '1c1f3b9b-695c-4b20-abde-63918ac60c75',  # Default teacher
                'academic_year_id': '1c1f3b9b-695c-4b20-abde-63918ac60c75'  # Default academic year
            }
            
            classes_data.append(class_data)
        
        print(f"Processed {len(classes_data)} classes")
        
        # Import to Supabase
        if classes_data:
            result = supabase.table('classes').insert(classes_data).execute()
            print(f"Successfully imported {len(result.data)} classes")
            return {'success': True, 'count': len(result.data)}
        else:
            return {'success': False, 'error': 'No valid data found'}
            
    except Exception as e:
        print(f"Error processing class Excel: {str(e)}")
        return {'success': False, 'error': str(e)}
