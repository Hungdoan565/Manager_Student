# Bug Tracking Guidelines

## Hướng dẫn theo dõi và quản lý lỗi

### 1. Bug Classification

#### 1.1 Severity Levels

- **Critical (P0)**: Hệ thống không hoạt động, mất dữ liệu
- **High (P1)**: Tính năng chính không hoạt động
- **Medium (P2)**: Tính năng phụ không hoạt động
- **Low (P3)**: Lỗi UI/UX nhỏ, không ảnh hưởng chức năng

#### 1.2 Priority Levels

- **Urgent**: Cần fix ngay lập tức
- **High**: Cần fix trong 24h
- **Medium**: Cần fix trong 1 tuần
- **Low**: Có thể fix sau

#### 1.3 Bug Types

- **Functional**: Lỗi chức năng
- **Performance**: Lỗi hiệu suất
- **Security**: Lỗi bảo mật
- **UI/UX**: Lỗi giao diện
- **Data**: Lỗi dữ liệu
- **Integration**: Lỗi tích hợp

### 2. Bug Report Template

#### 2.1 Basic Information

```markdown
## Bug Report

### Basic Information

- **Bug ID**: BUG-YYYY-MM-DD-001
- **Title**: [Brief description of the bug]
- **Reported By**: [Reporter name]
- **Reported Date**: [YYYY-MM-DD]
- **Assigned To**: [Developer name]
- **Status**: [Open/In Progress/Testing/Closed]

### Bug Details

- **Severity**: [Critical/High/Medium/Low]
- **Priority**: [Urgent/High/Medium/Low]
- **Type**: [Functional/Performance/Security/UI/UX/Data/Integration]
- **Component**: [Frontend/Backend/Database/API]
- **Module**: [Authentication/Classes/Students/Attendance/Schedules]

### Description

[Detailed description of the bug]

### Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior

[What should happen]

### Actual Behavior

[What actually happens]

### Environment

- **OS**: [Windows/Mac/Linux]
- **Browser**: [Chrome/Firefox/Safari/Edge]
- **Version**: [Browser version]
- **Device**: [Desktop/Mobile/Tablet]
- **Screen Resolution**: [e.g., 1920x1080]

### Additional Information

- **Screenshots**: [Link to screenshots]
- **Error Messages**: [Copy error messages]
- **Console Logs**: [Copy console logs]
- **Network Logs**: [Copy network logs]

### Workaround

[If any workaround exists]

### Related Issues

[Link to related bugs or features]
```

### 3. Bug Tracking Workflow

#### 3.1 Bug Lifecycle

```
Reported → Triage → Assigned → In Progress → Testing → Resolved → Closed
    ↓         ↓        ↓          ↓           ↓         ↓        ↓
   New    Verified  Accepted   Working    Testing   Fixed   Closed
```

#### 3.2 Status Definitions

- **New**: Bug mới được báo cáo
- **Triage**: Đang phân loại và xác minh
- **Assigned**: Đã giao cho developer
- **In Progress**: Developer đang fix
- **Testing**: Đang test fix
- **Resolved**: Bug đã được fix
- **Closed**: Bug đã được đóng
- **Reopened**: Bug bị mở lại
- **Duplicate**: Bug trùng lặp
- **Invalid**: Bug không hợp lệ

### 4. Bug Tracking Tools

#### 4.1 GitHub Issues

```yaml
# .github/ISSUE_TEMPLATE/bug_report.yml
name: Bug Report
description: Report a bug
title: "[BUG] "
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you for taking the time to fill out this bug report!

  - type: input
    id: bug-id
    attributes:
      label: Bug ID
      description: "Format: BUG-YYYY-MM-DD-XXX"
      placeholder: "BUG-2024-01-15-001"
    validations:
      required: true

  - type: dropdown
    id: severity
    attributes:
      label: Severity
      options:
        - Critical (P0)
        - High (P1)
        - Medium (P2)
        - Low (P3)
    validations:
      required: true

  - type: dropdown
    id: priority
    attributes:
      label: Priority
      options:
        - Urgent
        - High
        - Medium
        - Low
    validations:
      required: true

  - type: dropdown
    id: component
    attributes:
      label: Component
      options:
        - Frontend
        - Backend
        - Database
        - API
    validations:
      required: true

  - type: dropdown
    id: module
    attributes:
      label: Module
      options:
        - Authentication
        - Classes
        - Students
        - Attendance
        - Schedules
        - Reports
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Description
      description: "Detailed description of the bug"
      placeholder: "Describe the bug in detail..."
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: "Step-by-step instructions to reproduce the bug"
      placeholder: |
        1. Go to...
        2. Click on...
        3. See error...
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: "What should happen?"
      placeholder: "Describe what should happen..."
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: "What actually happens?"
      placeholder: "Describe what actually happens..."
    validations:
      required: true

  - type: input
    id: environment
    attributes:
      label: Environment
      description: "OS, Browser, Device, etc."
      placeholder: "Windows 10, Chrome 120, Desktop"
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: Additional Information
      description: "Screenshots, error messages, console logs, etc."
      placeholder: "Any additional information that might be helpful..."
```

#### 4.2 Bug Tracking Labels

```yaml
# GitHub Labels
labels:
  - name: "bug"
    color: "d73a4a"
    description: "Something isn't working"
  - name: "critical"
    color: "b60205"
    description: "Critical bug - system down"
  - name: "high"
    color: "ff6b6b"
    description: "High priority bug"
  - name: "medium"
    color: "ffa500"
    description: "Medium priority bug"
  - name: "low"
    color: "ffff00"
    description: "Low priority bug"
  - name: "frontend"
    color: "0075ca"
    description: "Frontend related"
  - name: "backend"
    color: "0e8a16"
    description: "Backend related"
  - name: "database"
    color: "5319e7"
    description: "Database related"
  - name: "ui-ux"
    color: "e99695"
    description: "UI/UX related"
  - name: "performance"
    color: "1d76db"
    description: "Performance related"
  - name: "security"
    color: "ff0000"
    description: "Security related"
```

### 5. Bug Resolution Process

#### 5.1 Triage Process

1. **Initial Review**: Xem xét bug report
2. **Severity Assessment**: Đánh giá mức độ nghiêm trọng
3. **Priority Assignment**: Gán độ ưu tiên
4. **Component Assignment**: Xác định component liên quan
5. **Developer Assignment**: Giao cho developer phù hợp

#### 5.2 Development Process

1. **Bug Analysis**: Phân tích nguyên nhân
2. **Root Cause**: Tìm nguyên nhân gốc
3. **Solution Design**: Thiết kế giải pháp
4. **Implementation**: Triển khai fix
5. **Testing**: Test fix
6. **Code Review**: Review code
7. **Deployment**: Deploy fix

#### 5.3 Testing Process

1. **Unit Testing**: Test đơn vị
2. **Integration Testing**: Test tích hợp
3. **Regression Testing**: Test hồi quy
4. **User Acceptance Testing**: Test chấp nhận người dùng
5. **Performance Testing**: Test hiệu suất

### 6. Bug Metrics & Reporting

#### 6.1 Key Metrics

- **Bug Count**: Tổng số bug
- **Bug Rate**: Tỷ lệ bug/KLOC
- **Resolution Time**: Thời gian fix bug
- **Bug Density**: Mật độ bug/module
- **Reopen Rate**: Tỷ lệ bug bị mở lại
- **Escalation Rate**: Tỷ lệ bug bị escalate

#### 6.2 Weekly Bug Report

```markdown
## Weekly Bug Report - Week of [Date]

### Summary

- **Total Bugs**: [Number]
- **New Bugs**: [Number]
- **Resolved Bugs**: [Number]
- **Open Bugs**: [Number]

### By Severity

- **Critical**: [Number]
- **High**: [Number]
- **Medium**: [Number]
- **Low**: [Number]

### By Component

- **Frontend**: [Number]
- **Backend**: [Number]
- **Database**: [Number]
- **API**: [Number]

### Top Issues

1. [Issue 1]
2. [Issue 2]
3. [Issue 3]

### Action Items

- [ ] [Action 1]
- [ ] [Action 2]
- [ ] [Action 3]
```

### 7. Bug Prevention

#### 7.1 Code Quality

- **Code Reviews**: Review tất cả code
- **Unit Testing**: Test coverage > 80%
- **Integration Testing**: Test tích hợp đầy đủ
- **Static Analysis**: Sử dụng ESLint, SonarQube
- **Type Checking**: Sử dụng TypeScript

#### 7.2 Development Process

- **Feature Flags**: Sử dụng feature flags
- **Staging Environment**: Test trên staging
- **Automated Testing**: CI/CD pipeline
- **Documentation**: Tài liệu đầy đủ
- **Training**: Đào tạo team

#### 7.3 Monitoring

- **Error Tracking**: Sentry, Bugsnag
- **Performance Monitoring**: New Relic, DataDog
- **Log Analysis**: ELK Stack
- **User Feedback**: Feedback system
- **Health Checks**: System health monitoring

### 8. Emergency Bug Response

#### 8.1 Critical Bug Response

1. **Immediate Assessment**: Đánh giá ngay lập tức
2. **Team Notification**: Thông báo team
3. **Hotfix Development**: Phát triển hotfix
4. **Emergency Testing**: Test khẩn cấp
5. **Emergency Deployment**: Deploy khẩn cấp
6. **Post-Mortem**: Phân tích sau sự cố

#### 8.2 Communication Plan

- **Slack Channel**: #critical-bugs
- **Email Alerts**: Critical bug alerts
- **Phone Calls**: For P0 bugs
- **Status Page**: Public status updates
- **Customer Communication**: Customer notifications

### 9. Bug Tracking Best Practices

#### 9.1 Reporting

- **Be Specific**: Mô tả chi tiết
- **Include Context**: Cung cấp context
- **Attach Evidence**: Screenshots, logs
- **Test Reproducibility**: Test khả năng tái tạo
- **Follow Template**: Theo template

#### 9.2 Resolution

- **Fix Root Cause**: Fix nguyên nhân gốc
- **Test Thoroughly**: Test kỹ lưỡng
- **Document Changes**: Tài liệu thay đổi
- **Update Tests**: Cập nhật tests
- **Communicate**: Thông báo kết quả

#### 9.3 Prevention

- **Learn from Bugs**: Học từ bug
- **Improve Process**: Cải thiện quy trình
- **Share Knowledge**: Chia sẻ kiến thức
- **Regular Reviews**: Review định kỳ
- **Continuous Improvement**: Cải thiện liên tục

### 10. Tools Integration

#### 10.1 GitHub Integration

```yaml
# .github/workflows/bug-tracking.yml
name: Bug Tracking
on:
  issues:
    types: [opened, closed, reopened]
  pull_request:
    types: [opened, closed, merged]

jobs:
  update-metrics:
    runs-on: ubuntu-latest
    steps:
      - name: Update Bug Metrics
        run: |
          # Update bug metrics
          echo "Updating bug metrics..."
```

#### 10.2 Slack Integration

```yaml
# Slack webhook for critical bugs
slack:
  webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  channel: "#critical-bugs"
  message: |
    🚨 Critical Bug Alert!
    Title: ${{ github.event.issue.title }}
    Severity: ${{ github.event.issue.labels }}
    Link: ${{ github.event.issue.html_url }}
```

### 11. Bug Database Schema

#### 11.1 Supabase Tables

```sql
-- Bug tracking table
CREATE TABLE bugs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bug_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('critical', 'high', 'medium', 'low')) NOT NULL,
    priority TEXT CHECK (priority IN ('urgent', 'high', 'medium', 'low')) NOT NULL,
    type TEXT CHECK (type IN ('functional', 'performance', 'security', 'ui-ux', 'data', 'integration')) NOT NULL,
    component TEXT CHECK (component IN ('frontend', 'backend', 'database', 'api')) NOT NULL,
    module TEXT CHECK (module IN ('authentication', 'classes', 'students', 'attendance', 'schedules', 'reports')) NOT NULL,
    status TEXT CHECK (status IN ('new', 'triage', 'assigned', 'in-progress', 'testing', 'resolved', 'closed', 'reopened', 'duplicate', 'invalid')) NOT NULL,
    reporter_id UUID REFERENCES profiles(id),
    assignee_id UUID REFERENCES profiles(id),
    steps_to_reproduce TEXT,
    expected_behavior TEXT,
    actual_behavior TEXT,
    environment TEXT,
    additional_info TEXT,
    workaround TEXT,
    resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE
);

-- Bug comments table
CREATE TABLE bug_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bug_id UUID REFERENCES bugs(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bug attachments table
CREATE TABLE bug_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bug_id UUID REFERENCES bugs(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    uploaded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
