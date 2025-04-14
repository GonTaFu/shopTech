const jwt = require("jsonwebtoken");

// Middleware xác thực token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token. Bạn cần đăng nhập." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Giải mã token và lưu thông tin user vào req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // chứa { userId, roleId }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  }
};

// Middleware phân quyền theo vai trò (chỉ cho phép admin truy cập)
const authorize = (roles = []) => {
  return (req, res, next) => {
    // Nếu danh sách roles không rỗng và role người dùng không có trong danh sách, từ chối quyền truy cập
    if (roles.length && !roles.includes(req.user.roleId)) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập." });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
