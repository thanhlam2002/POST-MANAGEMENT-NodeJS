// Middleware này in log mỗi request để theo dõi hoạt động
module.exports = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${req.method} ${req.url} [${timestamp}]`);
    next();  // Cho phép request đi tiếp
};
