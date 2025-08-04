const EventEmitter = require('events');

// Tạo instance EventEmitter
const emitter = new EventEmitter();

// Lắng nghe event 'post:created' -> Khi tạo bài viết mới
emitter.on('post:created', (post) => {
    console.log(`Event: New Post Created - ${post.title}`);
    // Có thể mở rộng ghi log vào file .log hoặc gửi email (mock)
});

// Export emitter để các controller có thể phát (emit) event
module.exports = emitter;
