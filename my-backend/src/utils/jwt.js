const jwt = require("jsonwebtoken");

const secret = "your_secret_key"; // bạn nên lưu trong .env

exports.generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};
