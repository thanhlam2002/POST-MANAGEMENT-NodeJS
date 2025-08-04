const { createObjectCsvWriter } = require('csv-writer');

// Hàm export danh sách bài viết ra file CSV
exports.exportToCSV = async (posts) => {
    const csvWriter = createObjectCsvWriter({
        path: 'posts.csv',  // Tên file CSV xuất ra
        header: [            // Cột tiêu đề của CSV
            { id: 'title', title: 'Title' },
            { id: 'content', title: 'Content' },
            { id: 'author', title: 'Author' },
            { id: 'category', title: 'Category' },
            { id: 'createdAt', title: 'Created At' }
        ]
    });

    // Mapping dữ liệu từ MongoDB sang định dạng CSV
    await csvWriter.writeRecords(posts.map(post => ({
        title: post.title,
        content: post.content,
        author: post.author.username,  // Populate username
        category: post.category,
        createdAt: post.createdAt
    })));
};
