# UI/UX Design Guidelines

## Thiết kế giao diện hệ thống quản lý sinh viên

### 1. Design Principles

#### 1.1 Core Principles

- **Simplicity**: Giao diện đơn giản, dễ sử dụng
- **Consistency**: Nhất quán về màu sắc, typography, spacing
- **Accessibility**: Tuân thủ WCAG 2.1 AA standards
- **Responsive**: Tương thích với mọi thiết bị
- **Performance**: Tải nhanh, mượt mà

#### 1.2 User Experience Goals

- Giảm thời gian thao tác cho giáo viên
- Giảm lỗi nhập liệu
- Tăng hiệu quả quản lý lớp học
- Dễ học và sử dụng

### 2. Frontend Architecture & Development Approach

#### 2.1 Component-First Development Strategy

**Approach**: Build từng component một cách độc lập và reusable

```javascript
// Component Structure Example
src/
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.stories.js
│   │   │   ├── Button.test.jsx
│   │   │   └── index.js
│   │   ├── Input/
│   │   ├── Card/
│   │   └── Modal/
│   ├── forms/                 # Form-specific components
│   │   ├── LoginForm/
│   │   ├── StudentForm/
│   │   └── AttendanceForm/
│   ├── layout/                # Layout components
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── MainLayout/
│   └── features/              # Feature-specific components
│       ├── StudentTable/
│       ├── AttendanceChart/
│       └── ScheduleCalendar/
```

#### 2.2 Design System Implementation

**Step 1: Create Design Tokens**

```javascript
// src/design-tokens/index.js
export const tokens = {
  colors: {
    primary: {
      50: "#f0fdf4",
      500: "#22c55e",
      900: "#14532d",
    },
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  typography: {
    fontFamily: {
      sans: ["DM Sans", "system-ui", "sans-serif"],
      mono: ["IBM Plex Mono", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
  },
};
```

### 3. Color Palette (Updated with Custom Colors)

#### 3.1 Custom Color System

```css
:root {
  /* Light Mode Colors */
  --background: #f0f8ff;
  --foreground: #374151;
  --card: #ffffff;
  --card-foreground: #374151;
  --popover: #ffffff;
  --popover-foreground: #374151;
  --primary: #22c55e;
  --primary-foreground: #ffffff;
  --secondary: #e0f2fe;
  --secondary-foreground: #4b5563;
  --muted: #f3f4f6;
  --muted-foreground: #6b7280;
  --accent: #d1fae5;
  --accent-foreground: #374151;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e5e7eb;
  --input: #e5e7eb;
  --ring: #22c55e;

  /* Chart Colors */
  --chart-1: #22c55e;
  --chart-2: #10b981;
  --chart-3: #059669;
  --chart-4: #047857;
  --chart-5: #065f46;

  /* Sidebar Colors */
  --sidebar: #e0f2fe;
  --sidebar-foreground: #374151;
  --sidebar-primary: #22c55e;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #d1fae5;
  --sidebar-accent-foreground: #374151;
  --sidebar-border: #e5e7eb;
  --sidebar-ring: #22c55e;
}

.dark {
  /* Dark Mode Colors */
  --background: #0f172a;
  --foreground: #d1d5db;
  --card: #1e293b;
  --card-foreground: #d1d5db;
  --popover: #1e293b;
  --popover-foreground: #d1d5db;
  --primary: #34d399;
  --primary-foreground: #0f172a;
  --secondary: #2d3748;
  --secondary-foreground: #a1a1aa;
  --muted: #1e293b;
  --muted-foreground: #6b7280;
  --accent: #374151;
  --accent-foreground: #a1a1aa;
  --destructive: #ef4444;
  --destructive-foreground: #0f172a;
  --border: #4b5563;
  --input: #4b5563;
  --ring: #34d399;

  /* Chart Colors Dark */
  --chart-1: #34d399;
  --chart-2: #2dd4bf;
  --chart-3: #22c55e;
  --chart-4: #10b981;
  --chart-5: #059669;

  /* Sidebar Colors Dark */
  --sidebar: #1e293b;
  --sidebar-foreground: #d1d5db;
  --sidebar-primary: #34d399;
  --sidebar-primary-foreground: #0f172a;
  --sidebar-accent: #374151;
  --sidebar-accent-foreground: #a1a1aa;
  --sidebar-border: #4b5563;
  --sidebar-ring: #34d399;
}
```

### 4. Typography System

#### 4.1 Font Stack

```css
:root {
  --font-sans: DM Sans, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: IBM Plex Mono, monospace;
}
```

#### 4.2 Typography Scale

```css
:root {
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
}
```

### 5. Layout System

#### 5.1 Grid System

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}
```

#### 5.2 Spacing System

```css
:root {
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
}
```

### 6. Component Development Examples

#### 6.1 Advanced Button Component

```javascript
// src/components/ui/Button/Button.jsx
import { cn } from "@/utils/cn";

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
    outline:
      "border border-border bg-background hover:bg-accent hover:text-accent-foreground focus:ring-ring",
    ghost: "hover:bg-accent hover:text-accent-foreground focus:ring-ring",
    link: "text-primary underline-offset-4 hover:underline focus:ring-ring",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

#### 6.2 Form System with Validation

```javascript
// src/components/forms/StudentForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

const studentSchema = z.object({
  studentCode: z.string().min(1, "Student code is required"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().optional(),
});

const StudentForm = ({ onSubmit, initialData, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="studentCode">Student Code</Label>
          <Input
            id="studentCode"
            {...register("studentCode")}
            error={errors.studentCode?.message}
          />
        </div>

        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Student"}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
```

#### 6.3 Advanced Data Table

```javascript
// src/components/features/StudentTable.jsx
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const StudentTable = ({ data, onEdit, onDelete }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        accessorKey: "studentCode",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Student Code
            <ChevronUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "class.name",
        header: "Class",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
```

### 5. Component Design

#### 5.1 Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--primary-500);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-600);
}

.btn-secondary {
  background-color: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
}

.btn-secondary:hover {
  background-color: var(--gray-200);
}
```

#### 5.2 Cards

```css
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid var(--gray-200);
}

.card-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--gray-900);
  margin: 0;
}
```

#### 5.3 Forms

```css
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem;
  font-size: var(--text-base);
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-error {
  color: var(--error-500);
  font-size: var(--text-sm);
  margin-top: 0.25rem;
}
```

### 6. Navigation Design

#### 6.1 Sidebar Navigation

```css
.sidebar {
  width: 256px;
  background: white;
  border-right: 1px solid var(--gray-200);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--gray-600);
  text-decoration: none;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: var(--gray-50);
  color: var(--gray-900);
}

.nav-item.active {
  background-color: var(--primary-50);
  color: var(--primary-700);
  border-right: 3px solid var(--primary-500);
}
```

#### 6.2 Top Header

```css
.header {
  height: 64px;
  background: white;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--gray-900);
}
```

### 7. Data Display

#### 7.1 Tables

```css
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.table th {
  background-color: var(--gray-50);
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--gray-700);
  border-bottom: 1px solid var(--gray-200);
}

.table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--gray-200);
  color: var(--gray-600);
}

.table tr:hover {
  background-color: var(--gray-50);
}
```

#### 7.2 Status Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: var(--text-xs);
  font-weight: 500;
}

.badge-success {
  background-color: var(--success-100);
  color: var(--success-700);
}

.badge-warning {
  background-color: var(--warning-100);
  color: var(--warning-700);
}

.badge-error {
  background-color: var(--error-100);
  color: var(--error-700);
}
```

### 8. Responsive Design

#### 8.1 Breakpoints

```css
:root {
  --breakpoint-sm: 640px; /* Small devices */
  --breakpoint-md: 768px; /* Medium devices */
  --breakpoint-lg: 1024px; /* Large devices */
  --breakpoint-xl: 1280px; /* Extra large devices */
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }
}
```

### 9. Animation & Transitions

#### 9.1 Micro-interactions

```css
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

### 10. Accessibility

#### 10.1 Focus States

```css
.focusable:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

.focusable:focus:not(:focus-visible) {
  outline: none;
}
```

#### 10.2 Screen Reader Support

```html
<!-- Skip to main content -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>

<!-- Screen reader only text -->
<span class="sr-only">Loading, please wait</span>
```

### 11. Dark Mode Support

#### 11.1 Dark Mode Variables

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --border-color: #374151;
  }
}
```

### 12. Performance Considerations

#### 12.1 Image Optimization

- Use WebP format when possible
- Implement lazy loading
- Provide appropriate alt text
- Use responsive images

#### 12.2 Loading States

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 25%,
    var(--gray-100) 50%,
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

### 7. Development Workflow & Best Practices

#### 7.1 Component Development Process

1. **Design First**: Create mockups in Figma
2. **Component Planning**: Break down into atomic components
3. **Implementation**: Build with JavaScript + Tailwind
4. **Testing**: Write unit and integration tests
5. **Documentation**: Create Storybook stories
6. **Review**: Code review and accessibility audit

#### 7.2 Quality Assurance Checklist

- [ ] Component is responsive
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Dark mode support
- [ ] Loading and error states handled
- [ ] Unit tests written
- [ ] Storybook story created
- [ ] Performance optimized
- [ ] Cross-browser tested

#### 7.3 Performance Optimization Strategies

**Code Splitting & Lazy Loading**

```javascript
// src/App.jsx
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy load pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Students = lazy(() => import("@/pages/Students"));
const Classes = lazy(() => import("@/pages/Classes"));
const Attendance = lazy(() => import("@/pages/Attendance"));
const Schedules = lazy(() => import("@/pages/Schedules"));
const Reports = lazy(() => import("@/pages/Reports"));

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
```

**Virtual Scrolling for Large Lists**

```javascript
// src/components/ui/VirtualList.jsx
import { FixedSizeList as List } from "react-window";

const VirtualList = ({ items, height = 400, itemHeight = 50 }) => {
  const Row = ({ index, style }) => (
    <div style={style} className="flex items-center px-4 border-b">
      {items[index].name}
    </div>
  );

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      className="border rounded-md"
    >
      {Row}
    </List>
  );
};

export default VirtualList;
```

#### 7.4 Testing Strategy

**Component Testing with React Testing Library**

```javascript
// src/components/ui/Button/Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
```

### 8. Design System Tools

#### 8.1 Recommended Tools

- **Design**: Figma (for mockups)
- **Prototyping**: Figma/Framer
- **Icons**: Heroicons, Lucide React
- **Illustrations**: Undraw, Storyset
- **Color Tools**: Coolors.co, Adobe Color

#### 8.2 Component Library

- **Base**: Headless UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Date Picker**: React DatePicker
- **Tables**: TanStack Table
- **State**: Zustand
- **Testing**: React Testing Library + Jest
