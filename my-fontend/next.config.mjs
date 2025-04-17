// Thêm Server Port mà không nhận được
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     serverActions: {}, // Nếu cần dùng Server Actions
//   },
//   server: {
//     port: process.env.PORT || 3000, // Đảm bảo sử dụng đúng cổng trên Render
//   },
// };
  
//   export default nextConfig;

//Cấu hình gốc
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // Nếu cần dùng Server Actions
  },
};

export default nextConfig;
