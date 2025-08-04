const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Xử lý API POST /register
exports.register = async (req, res) => {
    // Hash password trước khi lưu vào DB
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Tạo user mới và lưu vào MongoDB
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();

    res.send('User Registered');
};

// Xử lý API POST /login
exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid Credentials');  // Không tìm thấy user

    // So sánh mật khẩu nhập vào với mật khẩu đã hash
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Credentials');  // Sai mật khẩu

    // Tạo JWT token và trả về cho client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
};
