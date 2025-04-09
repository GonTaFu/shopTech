var express = require('express');
var router = express.Router();

var api = require('./api')

// Routes
// Thể hiện các API trả về dữ liệu JSON và Sử dụngPostman để tương tác vớiAPI (tạo, sửa, xóa, lấy danh sách sản phẩm).
router.use('/api', api);

router.get("/", (req, res) => {
    return res.json({message: "Hello World!"})
});

module.exports = router;