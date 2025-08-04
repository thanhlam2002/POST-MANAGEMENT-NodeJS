const mongoose = require('mongoose');

// Định nghĩa Schema cho User
// Gồm username và password (sẽ được hash khi đăng ký)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Export model User để dùng ở các nơi khác (controllers, routes)
module.exports = mongoose.model('User', userSchema);
