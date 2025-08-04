const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');
const path = require('path');

// Cấu hình Multer để upload file ảnh thumbnail
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),  // Thư mục lưu file
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))  // Đặt tên file
});

// Giới hạn file size 2MB, chỉ chấp nhận .png, .jpg
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') cb(null, true);
        else cb(new Error('Only .png, .jpg allowed'));
    }
});

// Các route CRUD bài viết:
router.get('/', postController.getPosts);                          // GET /posts -> Lấy danh sách bài viết (public)
router.get('/:id', postController.getPostById);                    // GET /posts/:id -> Lấy chi tiết 1 bài viết
router.post('/', upload.single('thumbnail'), postController.createPost); // POST /posts -> Tạo bài viết (có upload ảnh)
router.put('/:id', upload.single('thumbnail'), postController.updatePost); // PUT /posts/:id -> Cập nhật bài viết
router.delete('/:id', postController.deletePost);                  // DELETE /posts/:id -> Xoá bài viết
router.get('/export/csv', postController.exportPosts);             // GET /posts/export/csv -> Export CSV

module.exports = router;
