# Supabase Configuration

## Cấu hình Supabase cho hệ thống quản lý sinh viên

### 1. Environment Variables

#### 1.1 Frontend (.env)

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# API Configuration
VITE_API_URL=http://localhost:8000/api

# App Configuration
VITE_APP_NAME=Student Management System
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

#### 1.2 Backend (.env)

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_ANON_KEY=your-anon-key

# Django Configuration
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DATABASE_URL=postgresql://postgres:password@db.your-project-id.supabase.co:5432/postgres

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 2. Database Schema

#### 2.1 Core Tables

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('teacher', 'admin', 'manager')) NOT NULL DEFAULT 'teacher',
    phone TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academic years table
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
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

-- Subjects table
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

-- Students table
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

-- Class subjects (many-to-many relationship)
CREATE TABLE class_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(class_id, subject_id)
);

-- Attendance table
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

-- Schedules table
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

-- Grades table
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

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('info', 'warning', 'error', 'success')) DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2.2 Indexes

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
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

#### 2.3 Row Level Security (RLS)

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
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Classes policies
CREATE POLICY "Teachers can view their classes" ON classes
    FOR SELECT USING (
        teacher_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

CREATE POLICY "Teachers can manage their classes" ON classes
    FOR ALL USING (
        teacher_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

-- Students policies
CREATE POLICY "Teachers can view students in their classes" ON students
    FOR SELECT USING (
        class_id IN (
            SELECT id FROM classes WHERE teacher_id = auth.uid()
        ) OR
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

-- Attendance policies
CREATE POLICY "Teachers can manage attendance for their classes" ON attendance
    FOR ALL USING (
        teacher_id = auth.uid() OR
        class_id IN (
            SELECT id FROM classes WHERE teacher_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

-- Schedules policies
CREATE POLICY "Teachers can manage schedules for their classes" ON schedules
    FOR ALL USING (
        teacher_id = auth.uid() OR
        class_id IN (
            SELECT id FROM classes WHERE teacher_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

-- Grades policies
CREATE POLICY "Teachers can manage grades for their classes" ON grades
    FOR ALL USING (
        teacher_id = auth.uid() OR
        class_id IN (
            SELECT id FROM classes WHERE teacher_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

-- Admin policies for system tables
CREATE POLICY "Admins can manage academic years" ON academic_years
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

CREATE POLICY "Admins can manage subjects" ON subjects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );
```

### 3. Functions and Triggers

#### 3.1 Update Timestamp Function

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academic_years_updated_at BEFORE UPDATE ON academic_years
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### 3.2 Audit Log Function

```sql
-- Function to create audit logs
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, new_values)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Apply audit triggers to important tables
CREATE TRIGGER audit_classes AFTER INSERT OR UPDATE OR DELETE ON classes
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_students AFTER INSERT OR UPDATE OR DELETE ON students
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_attendance AFTER INSERT OR UPDATE OR DELETE ON attendance
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_grades AFTER INSERT OR UPDATE OR DELETE ON grades
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

#### 3.3 Utility Functions

```sql
-- Function to get student attendance statistics
CREATE OR REPLACE FUNCTION get_student_attendance_stats(
    student_uuid UUID,
    start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
    end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
    total_days INTEGER,
    present_days INTEGER,
    absent_days INTEGER,
    late_days INTEGER,
    excused_days INTEGER,
    attendance_rate DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::INTEGER as total_days,
        COUNT(CASE WHEN status = 'present' THEN 1 END)::INTEGER as present_days,
        COUNT(CASE WHEN status = 'absent' THEN 1 END)::INTEGER as absent_days,
        COUNT(CASE WHEN status = 'late' THEN 1 END)::INTEGER as late_days,
        COUNT(CASE WHEN status = 'excused' THEN 1 END)::INTEGER as excused_days,
        ROUND(
            (COUNT(CASE WHEN status IN ('present', 'late') THEN 1 END)::DECIMAL /
             NULLIF(COUNT(*), 0)) * 100, 2
        ) as attendance_rate
    FROM attendance
    WHERE student_id = student_uuid
    AND date BETWEEN start_date AND end_date;
END;
$$ LANGUAGE plpgsql;

-- Function to get class attendance summary
CREATE OR REPLACE FUNCTION get_class_attendance_summary(
    class_uuid UUID,
    date_filter DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
    total_students INTEGER,
    present_students INTEGER,
    absent_students INTEGER,
    late_students INTEGER,
    excused_students INTEGER,
    attendance_rate DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(DISTINCT s.id)::INTEGER as total_students,
        COUNT(DISTINCT CASE WHEN a.status = 'present' THEN s.id END)::INTEGER as present_students,
        COUNT(DISTINCT CASE WHEN a.status = 'absent' THEN s.id END)::INTEGER as absent_students,
        COUNT(DISTINCT CASE WHEN a.status = 'late' THEN s.id END)::INTEGER as late_students,
        COUNT(DISTINCT CASE WHEN a.status = 'excused' THEN s.id END)::INTEGER as excused_students,
        ROUND(
            (COUNT(DISTINCT CASE WHEN a.status IN ('present', 'late') THEN s.id END)::DECIMAL /
             NULLIF(COUNT(DISTINCT s.id), 0)) * 100, 2
        ) as attendance_rate
    FROM students s
    LEFT JOIN attendance a ON s.id = a.student_id AND a.date = date_filter
    WHERE s.class_id = class_uuid AND s.is_active = true;
END;
$$ LANGUAGE plpgsql;
```

### 4. Initial Data

#### 4.1 Default Academic Year

```sql
-- Insert current academic year
INSERT INTO academic_years (name, start_date, end_date, is_current) VALUES
('2024-2025', '2024-09-01', '2025-06-30', true);
```

#### 4.2 Default Subjects

```sql
-- Insert common subjects
INSERT INTO subjects (name, code, description, credits) VALUES
('Mathematics', 'MATH', 'Mathematics subject', 3),
('English', 'ENG', 'English Language', 3),
('Science', 'SCI', 'General Science', 3),
('History', 'HIST', 'World History', 2),
('Geography', 'GEO', 'Geography', 2),
('Physical Education', 'PE', 'Physical Education', 1),
('Art', 'ART', 'Art and Crafts', 1),
('Music', 'MUSIC', 'Music', 1);
```

### 5. Supabase Client Configuration

#### 5.1 Frontend Supabase Client

```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "teacher" | "admin" | "manager";
          phone?: string;
          avatar_url?: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: "teacher" | "admin" | "manager";
          phone?: string;
          avatar_url?: string;
          is_active?: boolean;
        };
        Update: {
          email?: string;
          full_name?: string;
          role?: "teacher" | "admin" | "manager";
          phone?: string;
          avatar_url?: string;
          is_active?: boolean;
        };
      };
      // Add other table types...
    };
  };
};
```

#### 5.2 Backend Supabase Client

```python
# backend/core/supabase_client.py
import os
from supabase import create_client, Client

class SupabaseClient:
    def __init__(self):
        self.url = os.getenv('SUPABASE_URL')
        self.service_key = os.getenv('SUPABASE_SERVICE_KEY')
        self.client: Client = create_client(self.url, self.service_key)

    def get_client(self) -> Client:
        return self.client

# Initialize client
supabase_client = SupabaseClient()
```

### 6. Migration Scripts

#### 6.1 Database Migration Script

```sql
-- migrations/001_initial_schema.sql
-- This file contains all the table creation statements above

-- migrations/002_add_indexes.sql
-- This file contains all the index creation statements above

-- migrations/003_add_rls_policies.sql
-- This file contains all the RLS policy statements above

-- migrations/004_add_functions_triggers.sql
-- This file contains all the function and trigger statements above

-- migrations/005_insert_initial_data.sql
-- This file contains all the initial data insertion statements above
```

#### 6.2 Migration Runner Script

```python
# scripts/migrate_database.py
import os
import psycopg2
from pathlib import Path

def run_migration(sql_file_path: str):
    """Run a SQL migration file"""
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    cursor = conn.cursor()

    try:
        with open(sql_file_path, 'r') as file:
            sql_content = file.read()
            cursor.execute(sql_content)
            conn.commit()
            print(f"Successfully executed {sql_file_path}")
    except Exception as e:
        print(f"Error executing {sql_file_path}: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

def main():
    """Run all migrations in order"""
    migrations_dir = Path('migrations')
    migration_files = sorted(migrations_dir.glob('*.sql'))

    for migration_file in migration_files:
        print(f"Running migration: {migration_file.name}")
        run_migration(str(migration_file))

if __name__ == '__main__':
    main()
```

### 7. Backup and Restore

#### 7.1 Backup Script

```bash
#!/bin/bash
# scripts/backup_database.sh

# Set variables
DB_URL="postgresql://postgres:password@db.your-project-id.supabase.co:5432/postgres"
BACKUP_DIR="backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/sms_backup_${DATE}.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create backup
pg_dump $DB_URL > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

echo "Backup created: ${BACKUP_FILE}.gz"
```

#### 7.2 Restore Script

```bash
#!/bin/bash
# scripts/restore_database.sh

# Set variables
DB_URL="postgresql://postgres:password@db.your-project-id.supabase.co:5432/postgres"
BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file>"
    exit 1
fi

# Restore from backup
if [[ $BACKUP_FILE == *.gz ]]; then
    gunzip -c $BACKUP_FILE | psql $DB_URL
else
    psql $DB_URL < $BACKUP_FILE
fi

echo "Database restored from: $BACKUP_FILE"
```
