-- Seed data for QLSV (profiles, classes, students, attendance)
-- Requires: extensions for UUID generation enabled (Supabase has by default)

-- Teacher & student profiles
WITH teacher AS (
  INSERT INTO profiles (id, email, full_name, role, is_active)
  VALUES (gen_random_uuid(), 'teacher@example.com', 'Teacher One', 'teacher', true)
  RETURNING id
), student AS (
  INSERT INTO profiles (id, email, full_name, role, is_active)
  VALUES (gen_random_uuid(), 'student@example.com', 'Student One', 'student', true)
  RETURNING id
), cls AS (
  INSERT INTO classes (id, name, grade, teacher_id, max_students, is_active)
  VALUES (gen_random_uuid(), 'DH22TIN06', 'DH22TIN', (SELECT id FROM teacher), 50, true)
  RETURNING id
), stu AS (
  INSERT INTO students (
    id, student_code, full_name, email, class_id, is_active
  ) VALUES (
    gen_random_uuid(), 'SV001', 'Student One', 'student@example.com', (SELECT id FROM cls), true
  ) RETURNING id
)
INSERT INTO attendance (id, student_id, class_id, date, status, notes)
VALUES (gen_random_uuid(), (SELECT id FROM stu), (SELECT id FROM cls), CURRENT_DATE, 'present', 'Initial seed');
