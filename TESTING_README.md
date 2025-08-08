# Testing Guide - New Modules

## Overview

Các module đã được tạo:

1. **Test Question Module** - Quản lý câu hỏi thi và đáp án
2. **Test Section Time Module** - Quản lý thời gian cho từng phần thi
3. **Test Section Attempt Module** - Theo dõi tiến độ làm bài của user
4. **Permission Module** - Hệ thống phân quyền

## API Endpoints & Dummy Data

### 1. Test Question Module

#### Base URL: `/test-questions`

#### Create Test Question

```bash
POST /test-questions
```

**Dummy Data:**

```json
{
  "test_id": "uuid-test-id-here",
  "question_text": "What is the main idea of the passage?",
  "question_type": "multiple_choice",
  "section": "reading",
  "question_order": 1,
  "points": 1,
  "time_limit": 60,
  "explanation": "This question tests reading comprehension skills",
  "options": [
    {
      "option_text": "The passage discusses climate change",
      "is_correct": true,
      "option_order": 1
    },
    {
      "option_text": "The passage is about technology",
      "is_correct": false,
      "option_order": 2
    },
    {
      "option_text": "The passage covers education",
      "is_correct": false,
      "option_order": 3
    },
    {
      "option_text": "The passage talks about health",
      "is_correct": false,
      "option_order": 4
    }
  ]
}
```

#### Update Test Question

```bash
PUT /test-questions/{question_id}
```

**Dummy Data:**

```json
{
  "question_text": "What is the author's main argument in the passage?",
  "points": 2,
  "explanation": "Updated explanation for better clarity"
}
```

#### Get All Questions for a Test

```bash
GET /test-questions?test_id=uuid-test-id-here
```

#### Get Question by ID

```bash
GET /test-questions/{question_id}
```

---

### 2. Test Section Time Module

#### Base URL: `/test-section-times`

#### Create Section Time

```bash
POST /test-section-times
```

**Dummy Data:**

```json
{
  "test_id": "uuid-test-id-here",
  "section": "listening",
  "time_limit_minutes": 40
}
```

**More Examples:**

```json
// Reading Section
{
  "test_id": "uuid-test-id-here",
  "section": "reading",
  "time_limit_minutes": 60
}

// Writing Section
{
  "test_id": "uuid-test-id-here",
  "section": "writing",
  "time_limit_minutes": 60
}

// Speaking Section
{
  "test_id": "uuid-test-id-here",
  "section": "speaking",
  "time_limit_minutes": 14
}
```

#### Get Section Times for Test

```bash
GET /test-section-times?test_id=uuid-test-id-here
```

#### Update Section Time

```bash
PUT /test-section-times/{section_time_id}
```

**Dummy Data:**

```json
{
  "time_limit_minutes": 45
}
```

---

### 3. Test Section Attempt Module

#### Base URL: `/test-section-attempts`

#### Start Section Attempt

```bash
POST /test-section-attempts
```

**Dummy Data:**

```json
{
  "test_session_id": "uuid-session-id-here",
  "section": "listening",
  "user_id": "uuid-user-id-here"
}
```

#### Update Section Progress

```bash
PUT /test-section-attempts/{attempt_id}
```

**Dummy Data:**

```json
{
  "current_question": 5,
  "answers_submitted": 3,
  "time_spent_minutes": 15
}
```

#### Complete Section

```bash
PATCH /test-section-attempts/{attempt_id}/complete
```

**Dummy Data:**

```json
{
  "final_answers": 10,
  "completion_notes": "Completed all listening questions"
}
```

#### Get User's Section Attempts

```bash
GET /test-section-attempts?user_id=uuid-user-id-here
```

#### Get Section Attempt Details

```bash
GET /test-section-attempts/{attempt_id}
```

---

### 4. Permission Module

#### Base URL: `/permissions`

#### Create Permission

```bash
POST /permissions
```

**Dummy Data:**

```json
{
  "role_id": "uuid-role-id-here",
  "permission_type": "read",
  "resource_type": "test"
}
```

**More Permission Examples:**

```json
// Admin có full quyền trên tất cả
{
  "role_id": "admin-role-id",
  "permission_type": "manage",
  "resource_type": "system"
}

// Teacher có quyền tạo và sửa test
{
  "role_id": "teacher-role-id",
  "permission_type": "write",
  "resource_type": "test"
}

// Student chỉ có quyền đọc
{
  "role_id": "student-role-id",
  "permission_type": "read",
  "resource_type": "test"
}
```

#### Bulk Create Permissions

```bash
POST /permissions/bulk
```

**Dummy Data:**

```json
{
  "role_id": "teacher-role-id",
  "permissions": [
    {
      "permission_type": "read",
      "resource_type": "test"
    },
    {
      "permission_type": "write",
      "resource_type": "test"
    },
    {
      "permission_type": "update",
      "resource_type": "test"
    },
    {
      "permission_type": "read",
      "resource_type": "result"
    }
  ]
}
```

#### Grant Full Access

```bash
POST /permissions/full-access
```

**Dummy Data:**

```json
{
  "role_id": "admin-role-id",
  "resource_type": "system"
}
```

#### Check Permission

```bash
POST /permissions/check
```

**Dummy Data:**

```json
{
  "role_id": "teacher-role-id",
  "permission_type": "write",
  "resource_type": "test"
}
```

#### Get Permissions by Role

```bash
GET /permissions?role_id=teacher-role-id
```

#### Get Permissions by Role and Resource

```bash
GET /permissions?role_id=teacher-role-id&resource_type=test
```

---

## Testing Scenarios

### Scenario 1: Tạo một bài test hoàn chỉnh

1. **Tạo câu hỏi cho test:**

```bash
# Tạo câu hỏi listening
POST /test-questions
{
  "test_id": "test-123",
  "question_text": "What does the speaker mean when he says...?",
  "question_type": "multiple_choice",
  "section": "listening",
  "question_order": 1,
  "points": 1,
  "options": [...]
}

# Tạo câu hỏi reading
POST /test-questions
{
  "test_id": "test-123",
  "question_text": "According to the passage, which statement is true?",
  "question_type": "multiple_choice",
  "section": "reading",
  "question_order": 1,
  "points": 1,
  "options": [...]
}
```

2. **Cấu hình thời gian cho từng section:**

```bash
# Listening: 40 phút
POST /test-section-times
{
  "test_id": "test-123",
  "section": "listening",
  "time_limit_minutes": 40
}

# Reading: 60 phút
POST /test-section-times
{
  "test_id": "test-123",
  "section": "reading",
  "time_limit_minutes": 60
}
```

### Scenario 2: User làm bài thi

1. **Bắt đầu section listening:**

```bash
POST /test-section-attempts
{
  "test_session_id": "session-123",
  "section": "listening",
  "user_id": "user-456"
}
```

2. **Cập nhật tiến độ:**

```bash
PUT /test-section-attempts/{attempt_id}
{
  "current_question": 3,
  "answers_submitted": 2,
  "time_spent_minutes": 10
}
```

3. **Hoàn thành section:**

```bash
PATCH /test-section-attempts/{attempt_id}/complete
```

### Scenario 3: Cấu hình phân quyền

1. **Tạo quyền cho teacher:**

```bash
POST /permissions/bulk
{
  "role_id": "teacher-role",
  "permissions": [
    {"permission_type": "read", "resource_type": "test"},
    {"permission_type": "write", "resource_type": "test"},
    {"permission_type": "update", "resource_type": "test"},
    {"permission_type": "read", "resource_type": "result"}
  ]
}
```

2. **Kiểm tra quyền:**

```bash
POST /permissions/check
{
  "role_id": "teacher-role",
  "permission_type": "write",
  "resource_type": "test"
}
```

---

## Available Enums

### Permission Types:

- `read` - Đọc/xem
- `write` - Tạo mới
- `update` - Cập nhật
- `delete` - Xóa
- `manage` - Quản lý toàn quyền

### Resource Types:

- `user` - Người dùng
- `role` - Vai trò
- `test` - Bài test
- `course` - Khóa học
- `result` - Kết quả
- `question` - Câu hỏi
- `center` - Trung tâm
- `report` - Báo cáo
- `system` - Hệ thống

### Test Sections:

- `listening` - Nghe
- `reading` - Đọc
- `writing` - Viết
- `speaking` - Nói

### Question Types:

- `multiple_choice` - Trắc nghiệm
- `essay` - Tự luận
- `fill_blank` - Điền vào chỗ trống
- `matching` - Nối từ
- `ordering` - Sắp xếp

---

## Error Responses

Tất cả API sẽ trả về format chuẩn:

**Success:**

```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": { ... }
}
```

**Error:**

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

---

## Notes

1. **Authentication:** Tất cả API đều cần JWT token trong header `Authorization: Bearer <token>`
2. **UUIDs:** Sử dụng UUID cho tất cả các ID
3. **Validation:** Tất cả input đều được validate theo DTO
4. **Database:** Sử dụng Prisma ORM với PostgreSQL
5. **Documentation:** Swagger UI có sẵn tại `/api`

## Next Steps

1. Test các endpoint với Postman hoặc Thunder Client
2. Kiểm tra database có tạo records đúng không
3. Test các business logic như permission check
4. Tạo frontend integration

Happy Testing! 🚀
