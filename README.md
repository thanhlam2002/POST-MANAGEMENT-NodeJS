# Post Management System

## Mô tả
Hệ thống quản lý bài viết sử dụng Node.js, Express và MongoDB.  
Hỗ trợ:
- Đăng ký & đăng nhập (JWT Authentication)
- CRUD bài viết (upload ảnh thumbnail)
- Phân trang, lọc, sắp xếp bài viết
- Caching với Redis
- Xuất CSV danh sách bài viết
- EventEmitter để log sự kiện tạo bài viết

---

## Công nghệ sử dụng
- Node.js, Express
- MongoDB Atlas / Mongoose
- Multer (upload file)
- JSON Web Token (JWT)
- Redis (cache)
- csv-writer (export CSV)
- EventEmitter (Node.js)

---

## Cài đặt và chạy local

### 1. Clone repo
```bash
git clone https://github.com/thanhlam2002/POST-MANAGEMENT-NodeJS.git
cd POST-MANAGEMENT-NodeJS
```

### 2. Cài dependencies
```bash
npm install
```

### 3. Tạo `.env` ở thư mục gốc với nội dung:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_secret
PORT=3000
```

### 4. Tạo folder để lưu ảnh upload:
```bash
mkdir uploads
```

### 5. Khởi động server:
```bash
node server.js
```

---

## API Endpoints

| Method | Endpoint                | Mô tả                                              |
|--------|-------------------------|-----------------------------------------------------|
| POST   | `/register`             | Đăng ký user mới                                    |
| POST   | `/login`                | Đăng nhập, nhận JWT token                           |
| GET    | `/posts`                | Lấy danh sách bài viết (phân trang, lọc, sắp xếp)   |
| POST   | `/posts`                | Tạo bài viết mới (upload thumbnail) — **require token** |
| GET    | `/posts/:id`            | Lấy chi tiết bài viết                               |
| PUT    | `/posts/:id`            | Cập nhật bài viết — **require token**               |
| DELETE | `/posts/:id`            | Xóa bài viết   — **require token**                  |
| GET    | `/posts/export/csv`     | Xuất toàn bộ bài viết ra CSV                         |

---

## Phân trang, lọc, sắp xếp (GET /posts)
- `page` — số trang (mặc định 1)
- `limit` — số lượng mỗi trang (mặc định 10)
- `category` — lọc theo danh mục
- `sortBy` — sắp xếp theo trường (ví dụ: `createdAt`, `title`)

Ví dụ:
```
GET /posts?page=1&limit=5&category=tech&sortBy=title
```

---

## Triển khai (Go Live)

### Render.com
1. Push code lên GitHub.
2. Trên Render dashboard: tạo Web Service, kết nối GitHub.
3. Thiết lập:
   - Build command: `npm install`
   - Start command: `node server.js`
   - Env vars: `MONGO_URI`, `JWT_SECRET`, `PORT`
4. Deploy và lấy URL public.

### Railway.app
- Cũng tương tự, dễ sử dụng miễn phí.

**Lưu ý**: Upload file thumbnail sẽ bị mất nếu server restart do lưu trên filesystem (Render free). Có thể xử lý bằng lưu lên Cloud Storage nếu cần thực tế.

---

## Hướng dẫn test (Postman)
1. Import file Collection JSON (mình sẽ cung cấp).
2. Test lần lượt các chức năng:
   - Đăng ký → Đăng nhập → Lấy token JWT.
   - CRUD bài viết (gửi token qua header `Authorization: Bearer <token>`).
   - GET `/posts` với phân trang, lọc, sắp xếp.
   - GET `/posts/export/csv` để tải file.

---

## Cấu trúc thư mục

```
controllers/
middlewares/
models/
routes/
services/
uploads/
server.js
.env
README.md
```

---

## Lưu ý
- Ảnh thumbnail phải nhỏ hơn 2MB, định dạng `.png` hoặc `.jpg`.
- Redis cache chỉ chạy local — nếu deploy bạn có thể tạm bỏ hoặc chuyển dùng in-memory cache.
- Không commit file `.env`, không commit folder `uploads/`.
