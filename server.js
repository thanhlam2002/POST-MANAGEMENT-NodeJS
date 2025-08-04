require('dotenv').config();  // Load biến môi trường từ file .env
const express = require('express');
const mongoose = require('mongoose');

const logger = require('./middlewares/logger');         // Middleware in log request
const verifyToken = require('./middlewares/verifyToken'); // Middleware kiểm tra token

const authRoutes = require('./routes/authRoutes');      // Route Đăng nhập / Đăng ký
const postRoutes = require('./routes/postRoutes');      // Route CRUD Bài viết

const app = express();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Middleware để parse body JSON
app.use(express.json());

// Middleware logger: In log mỗi request
app.use(logger);

// Middleware verifyToken: Xác thực token cho tất cả route (trừ /login, /register)
app.use(verifyToken);

// Serve static files trong folder uploads (để truy cập ảnh thumbnail)
app.use('/uploads', express.static('uploads'));

// Gắn route
app.use('/', authRoutes);   // Route cho /register, /login
app.use('/posts', postRoutes); // Route cho CRUD bài viết

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
