// const redis = require('redis');

// // Tạo Redis client và kết nối
// const client = redis.createClient();
// client.connect().catch(console.error);

// // Hàm lấy dữ liệu từ Redis Cache
// exports.getCache = async (key) => {
//     const data = await client.get(key);
//     return data ? JSON.parse(data) : null;  // Nếu có cache thì trả về dữ liệu JSON
// };

// // Hàm set dữ liệu vào Redis Cache
// exports.setCache = async (key, value, ttl = 60) => {
//     await client.setEx(key, ttl, JSON.stringify(value));  // TTL: Thời gian sống (tính bằng giây)
// };

// // Hàm xoá Cache (thường dùng khi dữ liệu thay đổi)
// exports.clearCache = async (key) => {
//     await client.del(key);
// };

