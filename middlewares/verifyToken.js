const jwt = require('jsonwebtoken');

// Middleware này dùng để kiểm tra JWT Token hợp lệ trước khi xử lý API
module.exports = (req, res, next) => {
    // Bỏ qua kiểm tra token cho các route /login và /register
    if (req.path === '/login' || req.path === '/register') return next();

    // Lấy header Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Access Denied');  // Không có header

    // Token sẽ nằm sau "Bearer ", cần tách ra
    const token = authHeader.split(' ')[1];  // Cắt bỏ "Bearer"
    if (!token) return res.status(401).send('Token Missing');  // Nếu không có token thực tế

    try {
        // Xác thực token và gắn dữ liệu user vào request
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();  // Cho phép đi tiếp sang controller
    } catch (err) {
        res.status(400).send('Invalid Token');  // Token sai hoặc hết hạn
    }
};
