const Post = require('../models/Post');
const cacheService = require('../services/cacheService');
const eventService = require('../services/eventService');
const exportService = require('../services/exportService');

// Tạo bài viết mới (POST /posts)
exports.createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,            // Lấy từ req.user do verifyToken đã gắn
        category: req.body.category,
        thumbnail: req.file.path         // Đường dẫn file upload từ Multer
    });

    await post.save();
    eventService.emit('post:created', post);   // Phát sự kiện khi tạo bài viết mới
    await cacheService.clearCache('postsCache'); // Xoá cache danh sách bài viết (để lần sau lấy dữ liệu mới)

    res.json(post);
};

// Lấy danh sách bài viết (GET /posts) - Có cache, phân trang, lọc, sắp xếp
exports.getPosts = async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', category } = req.query;
    const cacheKey = `postsCache:${page}:${limit}:${sortBy}:${category}`;

    // Kiểm tra xem cache Redis đã có dữ liệu chưa
    const cached = await cacheService.getCache(cacheKey);
    if (cached) return res.json(cached);  // Nếu có thì trả về cache luôn

    // Nếu không có cache thì query từ MongoDB
    const query = category ? { category } : {};
    const posts = await Post.find(query).populate('author')
        .sort({ [sortBy]: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    // Set cache lại sau khi query
    await cacheService.setCache(cacheKey, posts);
    res.json(posts);
};

// Lấy chi tiết 1 bài viết (GET /posts/:id)
exports.getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author');
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
};

// Cập nhật bài viết của chính mình (PUT /posts/:id)
exports.updatePost = async (req, res) => {
    // Kiểm tra bài viết có phải của người dùng đang login không
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(403).send('Unauthorized');

    // Cập nhật dữ liệu
    Object.assign(post, req.body);
    if (req.file) post.thumbnail = req.file.path;  // Nếu có upload ảnh mới thì thay thế
    await post.save();

    await cacheService.clearCache('postsCache');  // Xoá cache để reload dữ liệu mới
    res.json(post);
};

// Xoá bài viết của chính mình (DELETE /posts/:id)
exports.deletePost = async (req, res) => {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(403).send('Unauthorized');

    await cacheService.clearCache('postsCache');  // Xoá cache
    res.send('Post Deleted');
};

// Export danh sách bài viết ra CSV (GET /posts/export/csv)
exports.exportPosts = async (req, res) => {
    const posts = await Post.find().populate('author');
    await exportService.exportToCSV(posts);  // Gọi service export CSV
    res.download('posts.csv');  // Trả file CSV cho client download
};
