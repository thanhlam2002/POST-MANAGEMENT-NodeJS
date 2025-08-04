const mongoose = require('mongoose');

// Định nghĩa Schema cho Post (Bài viết)
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },        // Tiêu đề bài viết
    content: { type: String, required: true },      // Nội dung bài viết
    author: {                                       // Tham chiếu tới User
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: { type: String, required: true },     // Danh mục (category)
    thumbnail: { type: String },                    // Đường dẫn ảnh thumbnail
    createdAt: { type: Date, default: Date.now }    // Ngày tạo bài viết (tự động)
});

// Export model Post để dùng ở controllers, routes
module.exports = mongoose.model('Post', postSchema);
