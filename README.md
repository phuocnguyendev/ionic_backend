# 🎯 IELTS Online Test System - Backend API

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white" alt="Elasticsearch" />
</p>

<p align="center">
  Hệ thống thi IELTS online toàn diện với API backend mạnh mẽ được xây dựng bằng NestJS framework
</p>

---

## 📋 Mô tả dự án

**IELTS Online Test System** là một nền tảng thi IELTS trực tuyến hoàn chỉnh, cung cấp:

- 🎓 **Quản lý thi IELTS**: Tạo và quản lý các bài thi IELTS với đầy đủ 4 kỹ năng
- 👥 **Quản lý người dùng**: Hệ thống phân quyền role-based với authentication JWT
- 🏢 **Quản lý trung tâm**: Đa trung tâm Anh ngữ với quản lý khóa học
- 📊 **Chấm điểm tự động**: Tính toán band score IELTS theo tiêu chuẩn quốc tế
- 🎯 **Test session**: Quản lý phiên thi với theo dõi thời gian thực
- 📈 **Báo cáo & Thống kê**: Dashboard analytics chi tiết
- 🤖 **AI Recommendation**: Gợi ý học tập thông minh

## 🏗️ Kiến trúc hệ thống

### Core Technologies

- **Framework**: NestJS với TypeScript
- **Database**: PostgreSQL với Prisma ORM
- **Caching**: Redis cho session và caching
- **Search**: Elasticsearch cho tìm kiếm nâng cao
- **Authentication**: JWT-based với passport
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose

### Design Patterns

- **Repository Pattern**: Tách biệt logic database
- **Service Layer**: Business logic tập trung
- **Validator Pattern**: Validation dữ liệu chuyên sâu
- **Interceptor**: Transform response và logging
- **Guard**: Bảo mật và authorization
- **Decorator**: Custom decorators cho metadata

## 📁 Cấu trúc dự án

```
src/
├── 🏗️ app.module.ts              # Root module
├── 🚀 main.ts                    # Application bootstrap
├── ⚙️ config/                    # Configuration modules
│   ├── prisma/                   # Database configuration
│   └── elasticsearch/            # Search configuration
├── 🔧 core/                      # Core utilities
│   ├── global-validation.pipe.ts # Global validation
│   ├── transform.interceptor.ts  # Response transformation
│   └── customize.ts              # Custom decorators
├── 📦 modules/                   # Business modules
│   ├── 🔐 auth/                  # Authentication & Authorization
│   ├── 👤 user/                  # User management
│   ├── 🎯 test/                  # Test management
│   ├── 📊 test-result/           # Test results & scoring
│   ├── 🏢 english_center/        # Center management
│   ├── 📚 course/                # Course management
│   ├── ✅ user-answer/           # User answers tracking
│   ├── 🕐 test-session/          # Test session management
│   ├── 🎓 mock-exam/             # Mock examinations
│   ├── 🔔 notification/          # Notification system
│   ├── 🤖 ai-recommendation/     # AI recommendations
│   └── 📈 report/                # Reporting system
├── 🗃️ repository/                # Base repository pattern
├── 🛠️ utils/                     # Utility functions
└── 🔒 constants/                 # Application constants
```

## 🚀 Cài đặt và chạy dự án

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Elasticsearch 7.10+
- Docker & Docker Compose

### 1. Clone repository

```bash
git clone <repository-url>
cd ionic_backend
```

### 2. Cài đặt dependencies

```bash
yarn install
```

### 3. Setup môi trường

```bash
# Copy và cấu hình env
cp .env.example .env

# Chỉnh sửa .env với thông tin database, redis, elasticsearch
```

### 4. Khởi động services với Docker

```bash
# Start PostgreSQL, Redis, Elasticsearch
docker-compose up -d

# Hoặc start từng service
docker-compose up postgres redis elasticsearch
```

### 5. Database setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed initial data (optional)
npx prisma db seed
```

### 6. Chạy application

```bash
# Development mode
yarn start:dev

# Production mode
yarn build
yarn start:prod

# Debug mode
yarn start:debug
```

## 🔧 Scripts có sẵn

```bash
# Development
yarn start:dev          # Chạy với hot reload
yarn start:debug        # Chạy với debug mode

# Building
yarn build              # Build production
yarn start:prod         # Chạy production build

# Testing
yarn test               # Unit tests
yarn test:e2e           # End-to-end tests
yarn test:cov           # Test coverage

# Code Quality
yarn lint               # ESLint check
yarn format             # Prettier format

# Database
npx prisma studio       # Database GUI
npx prisma migrate dev  # Run migrations
npx prisma generate     # Generate Prisma client
```

## 📚 API Documentation

### Swagger UI

Sau khi start server, truy cập API documentation tại:

### Endpoints chính

#### Authentication

- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Đăng xuất

#### Test Management

- `GET /tests` - Danh sách bài thi
- `POST /tests` - Tạo bài thi mới
- `GET /tests/:id` - Chi tiết bài thi
- `PUT /tests/:id` - Cập nhật bài thi

#### Test Session

- `POST /test-sessions` - Bắt đầu thi
- `PUT /test-sessions/:id` - Cập nhật session
- `POST /test-sessions/:id/submit` - Nộp bài thi

#### User Answers

- `POST /user-answers` - Lưu câu trả lời
- `GET /user-answers/session/:sessionId` - Lấy answers theo session

#### Test Results

- `GET /test-results` - Danh sách kết quả
- `GET /test-results/:id` - Chi tiết kết quả
- `POST /test-results/calculate` - Tính toán điểm

## 🗄️ Database Schema

### Core Tables

- **users**: Thông tin người dùng
- **roles**: Vai trò hệ thống
- **english_centers**: Trung tâm Anh ngữ
- **tests**: Bài thi IELTS
- **test_questions**: Câu hỏi thi
- **test_sessions**: Phiên thi
- **test_results**: Kết quả thi
- **user_answers**: Câu trả lời người dùng

### Assessment Tables

- **writing_assessments**: Đánh giá Writing
- **speaking_assessments**: Đánh giá Speaking
- **speaking_part_attempts**: Chi tiết Speaking parts

### Supporting Tables

- **courses**: Khóa học
- **course_enrollments**: Đăng ký khóa học
- **notifications**: Thông báo
- **system_logs**: Logs hệ thống

## 🔐 Bảo mật

### Authentication & Authorization

- **JWT Tokens**: Access token (15min) + Refresh token (7 days)
- **Role-based Access**: Phân quyền chi tiết theo role và resource
- **Route Guards**: Bảo vệ endpoints với custom guards
- **Rate Limiting**: Giới hạn request để chống spam

### Data Security

- **Password Hashing**: bcrypt với salt rounds cao
- **Input Validation**: Class-validator cho tất cả DTOs
- **SQL Injection Prevention**: Prisma ORM với prepared statements
- **CORS Configuration**: Cấu hình CORS chặt chẽ

## 📊 Monitoring & Logging

### Application Logging

- **Winston Logger**: Structured logging với multiple transports
- **Request Logging**: Log tất cả HTTP requests
- **Error Tracking**: Chi tiết error logs với stack trace
- **Performance Monitoring**: Response time tracking

### Health Checks

- **Database Health**: Kiểm tra kết nối PostgreSQL
- **Redis Health**: Kiểm tra kết nối Redis
- **Elasticsearch Health**: Kiểm tra search service

## 🚀 Deployment

### Docker Deployment

```bash
# Build Docker image
docker build -t ielts-backend .

# Run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ielts_db"

# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379

# Elasticsearch
ELASTICSEARCH_URL="http://localhost:9200"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_SECRET="your-refresh-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"

# Application
PORT=5176
NODE_ENV="production"
```

## 🤝 Đóng góp

### Development Workflow

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

### Code Standards

- **ESLint + Prettier**: Code formatting tự động
- **Conventional Commits**: Commit message chuẩn
- **TypeScript Strict**: Strict mode cho type safety
- **Test Coverage**: Minimum 80% coverage cho core modules

## 📞 Hỗ trợ

### Documentation

- [MODULES_README.md](./MODULES_README.md) - Chi tiết kiến trúc modules
- [API Documentation](http://localhost:5176/api) - Swagger UI
- [Database Schema](./prisma/schema.prisma) - Prisma schema

### Contact

- **Project Lead**: [Your Name]
- **Email**: [your.email@example.com]
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

## 📝 License

Dự án này được phân phối dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

<p align="center">
  Made with ❤️ by IELTS Development Team
</p>
