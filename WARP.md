# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.
``

Project: Student Management System (QLSV)

Scope
- Monorepo with a Vite + React frontend and a Django backend.
- Supabase (PostgreSQL) is the primary data store and auth provider from the frontend; backend is positioned for REST APIs and future server logic.

Common commands (pwsh on Windows)

Frontend (Vite + React)
- Install deps
```bash path=null start=null
cd frontend
npm install
```
- Start dev server (default: http://localhost:3000)
```bash path=null start=null
npm run dev
```
- Build and preview
```bash path=null start=null
npm run build
npm run preview
```
- Lint entire project or a single file
```bash path=null start=null
npm run lint
npx eslint frontend/src/components/ui/Button.jsx
```
- Required environment (create frontend/.env)
```bash path=null start=null
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Student Management System
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```
Note: No frontend test runner is configured in package.json at this time.

Backend (Django)
- Create venv, install deps, configure env, run server (default: http://localhost:8000)
```bash path=null start=null
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# copy env and edit
cp .env.example .env  # or copy manually on Windows
# Initialize schema on Supabase Postgres (first time and whenever models change)
python manage.py makemigrations apps.core_app apps.api
python manage.py migrate
# Run server
python manage.py runserver
```
- Run tests
```bash path=null start=null
# All tests
python manage.py test
# Single test module
python manage.py test backend.apps.core_app.tests
# Single TestCase
python manage.py test backend.apps.core_app.tests:SomeTestCase
# Single test method
python manage.py test backend.apps.core_app.tests:SomeTestCase.test_something
```
- Notes
- REST API is served under /api/. Endpoints: /api/students/ (+ export/import, expand=class), /api/classes/ (+ export/import, expand=teacher), /api/classes/{id}/students, /api/attendance/ (+ expand=student,class), /api/attendance/reports|/reports/timeseries|/reports/export
  - Authentication expects Supabase JWT (the frontend attaches it automatically via axios interceptor). RBAC uses the `profiles` table in Supabase as source of truth; DRF permissions read role from DB (with JWT claims fallback).
  - DATABASE_URL should point to your Supabase Postgres; SSL is enabled automatically for supabase.co.
- Required environment (create backend/.env)
```bash path=null start=null
SECRET_KEY=...
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://...  # Supabase Postgres
CORS_ALLOWED_ORIGINS=http://localhost:3000
SUPABASE_URL=https://<your-project>.supabase.co  # for JWKS
```
Combined dev workflow
- Use two terminals or background one of them:
```bash path=null start=null
# Terminal A
cd frontend; npm run dev
# Terminal B
cd backend; .\.venv\Scripts\Activate.ps1; python manage.py runserver
```

High-level architecture

Overview
- frontend/: Vite + React SPA connecting directly to Supabase for auth and data access. State management via Zustand.
- backend/: Django project (sms_backend) with app scaffolds for students, classes, attendance, schedules, reports. Intended to expose REST APIs (per docs), though root urls currently only include the admin route.
- DOCS/: System design, schema, and environment documentation (authoritative for behavior beyond what’s currently wired in code).

Frontend (big picture)
- Entry points and routing
  - src/main.jsx boots the app; src/App.jsx defines top-level routing/layout.
  - AppInitializer initializes auth; ProtectedRoute.jsx guards routes by role/permission.
- Supabase integration
  - src/lib/supabase.js is used only for Auth (login/register/session). JWT is attached to requests via src/services/apiClient.js.
- State and services
  - Zustand stores in src/store orchestrate auth/session/profile and role-based checks.
  - Service layer calls Django API via axios (apiClient). Students/Classes/Attendance services support server-side pagination (page, page_size).
- UI + design system
  - Coherent component system under src/components/* and design utilities in src/utils/*.
  - Aliases defined in frontend/vite.config.js for '@/components', '@/pages', '@/services', etc. Development server runs on port 3000.

Backend (big picture)
- Project: backend/sms_backend now has DRF + CORS enabled and reads DATABASE_URL from env (Supabase Postgres supported). REST API is namespaced under /api/.
- API app: backend/apps/api exposes Students via DRF ModelViewSet backed by an unmanaged model mapped to the Supabase table (no migrations required). Extend similarly for classes/attendance/schedules.
- Auth: DRF uses a custom SupabaseAuthentication that verifies the Supabase JWT against the project JWKS and maps to a local Django user.
- Tests: Django-style tests scaffolded (e.g., backend/apps/core_app/tests.py). Use Django test runner commands above for single tests.

Data model and security (from DOCS)
- Supabase schema defines: profiles, classes, students, subjects, attendance, schedules, grades (plus supporting junction and audit tables) with RLS policies.
- Frontend reads/writes many of these tables directly via Supabase client; backend can mediate as APIs when needed.

Cross-cutting notes
- Environment management: Follow DOCS/supabase_config.md for required variables. Do not commit actual secrets.
- Scripts under scripts/ are Bash-oriented; on Windows, prefer running the equivalent npm/Django commands shown above.
- If you need to expose backend endpoints, wire app urls into backend/sms_backend/urls.py and add the app to INSTALLED_APPS in backend/sms_backend/settings.py.

CI
- Frontend: .github/workflows/frontend-ci.yml (Node 20, npm ci, lint, vitest)
- Backend: .github/workflows/backend-ci.yml (Python 3.11, pip cache, makemigrations ephemeral, migrate SQLite, manage.py test)

Key references
- README.md (root): High-level tech stack and quickstart for frontend/backend.
- DOCS/project_structure.md: Target/aspirational structure for apps, configuration, and CI/CD.
- DOCS/implementation.md: System architecture, intended endpoints, and testing strategy.
- DOCS/supabase_config.md: Environment variables and schema policies.
