const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Các route không cần check token
    const publicPaths = ['/login', '/register'];
    const isGetPosts = req.method === 'GET' && req.path.startsWith('/posts');

    if (publicPaths.includes(req.path) || isGetPosts) {
        return next();  // Bỏ qua kiểm tra Token
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Access Denied');

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Token Missing');

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};
