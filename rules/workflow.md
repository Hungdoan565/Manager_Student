# Workflow rules for QLSV

Scope
- This repository is a monorepo with:
  - frontend/: Vite + React (JavaScript), Zustand, Tailwind, Supabase client
  - backend/: Django project (sms_backend) prepared for DRF-based APIs

Branches
- main: stable
- feature/*: new features
- fix/*: bug fixes
- docs/*: documentation changes
- chore/*: maintenance, configs

Commits
- Use Conventional Commits: feat:, fix:, docs:, chore:, refactor:, test:, build:

Frontend rules
- Do not create multiple Supabase clients; import from src/lib/supabase.js (Auth only)
- All CRUD goes through Django API via src/services/apiClient.js (axios); do NOT call Supabase directly from components/services for data
- State: use Zustand stores under src/store; expose actions that return data or throw errors
- Routes must go through App.jsx; protect routes with ProtectedRoute/TeacherRoute/StudentRoute
- On app boot, ensure authentication state is initialized by calling checkAuth() once (e.g., in AppInitializer)
- Respect Vite aliases defined in vite.config.js (e.g., '@/components')
- Lint before commit: npm run lint

Backend rules
- DRF + CORS enabled; APIs live under apps/api. Use unmanaged models (managed=False) để map các bảng Supabase hiện có (không cần migrations) khi phù hợp
- Authentication: SupabaseAuthentication xác thực Bearer JWT; permissions dựa trên claims role (teacher, student, admin, manager)
- Read secrets from environment (.env); do not commit SECRET_KEY or DB creds
- Follow REST patterns from DOCS/implementation.md; mở rộng endpoints (students, classes, attendance, schedules) theo cùng pattern

Database & Supabase
- Django migrations là nguồn quản lý schema. Khi đổi models trong apps.core_app/apps.api: chạy makemigrations + migrate (DB: Supabase Postgres)
- Roles: source of truth ở bảng profiles; khi đổi role, cập nhật DB (JWT claims chỉ là fallback)
- Nếu áp RLS ở DB, đảm bảo không chặn kết nối của Django cho tác vụ hệ thống
- Any new table/policy must be documented and reflected in models/migrations

Testing
- Frontend: add Vitest + React Testing Library; create npm run test; colocate tests under src with *.test.jsx suffix
- Backend: use Django TestCase; python manage.py test for unit/integration

PR checklist
- [ ] Updated docs if schema or APIs changed
- [ ] Linted (npm run lint)
- [ ] Added/updated tests as applicable
- [ ] Secrets remain in env, not code