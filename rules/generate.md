# Code generation rules for QLSV

Purpose
- Standardize how we add new features/entities across frontend and backend in this repo.

General
- Keep entity names singular in service functions (e.g., getStudent, createStudent) and plural for collections (getStudents)
- Keep UI-only code in components; keep data fetching/mutation in services; keep cross-page state in stores

When adding a new entity (example: subjects)
1) Frontend service (Supabase-first)
- Create or extend src/services/<entity>Service.js with CRUD functions using the Supabase client from src/lib/supabase.js
- Ensure filters, pagination, and sorting are supported similarly to StudentService

2) Store (Zustand)
- Add src/store/<entity>Store.js exposing:
  - state: list, current, loading/error, filters, pagination
  - actions: fetch*, create*, update*, delete*, search*, updateFilters, updatePagination

3) Routing & pages
- Add pages under src/pages/<entity>/ (ListPage, DetailPage, CreatePage/EditPage when needed)
- Wire routes in src/App.jsx and protect with ProtectedRoute/TeacherRoute/StudentRoute as appropriate

4) Components
- Place reusable UI in src/components/<entity>/; prefer dumb/presentational components driven via props

5) Access control
- Gate actions via role/permission checks using helpers in ProtectedRoute.jsx (e.g., PermissionRoute, hasPermission)
- Keep permission strings consistent with useAuthStore().hasPermission()

6) Styling
- Use Tailwind utility classes; follow design tokens in src/utils/designSystem.js; avoid inline styles

7) Telemetry & errors
- Surface user-facing errors with react-hot-toast; log to console for developer context only

Backend (when API layer is introduced)
- Create a Django app per bounded context (e.g., subjects) and expose endpoints matching DOCS/implementation.md
- Add the app to INSTALLED_APPS and include its urls in backend/sms_backend/urls.py
- Use DRF serializers/viewsets; enforce permissions; keep business rules server-side where appropriate

Environment & secrets
- Never hardcode keys; use .env files (see frontend/.env.example and backend/env.example)

Review checklist for generated changes
- [ ] Service functions use the shared Supabase client
- [ ] Store exposes consistent actions and updates state immutably
- [ ] Routes are protected correctly and match the UX flow
- [ ] No secrets or hardcoded URLs committed
- [ ] Lint passes (npm run lint)
