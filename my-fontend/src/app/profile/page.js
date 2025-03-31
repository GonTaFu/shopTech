"use client";

import Link from "next/link";
import { useState } from "react";
import { Edit, Save, X } from "lucide-react"; // Icons for edit, save, and cancel

export default function Profile() {
  // Sample user data (in a real app, this would come from a backend)
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    address: "123 Đường Láng, Đống Đa, Hà Nội",
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData); // Update user data
    setIsEditing(false); // Exit editing mode
  };

  // Handle cancel editing
  const handleCancel = () => {
    setFormData(user); // Reset form data to original user data
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">GearVN</h1>
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <Link href="/showroom" className="hover:underline">Hệ thống Showroom</Link>
            <Link href="/profile" className="hover:underline">Hồ sơ</Link>
          </nav>
        </div>
      </header>

      {/* Profile Section */}
      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Hồ sơ người dùng</h1>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {isEditing ? (
            // Edit Form
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-semibold mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300"
                >
                  <Save size={20} className="mr-2" />
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
                >
                  <X size={20} className="mr-2" />
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            // Display Profile
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Thông tin cá nhân</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300"
                >
                  <Edit size={20} className="mr-2" />
                  Chỉnh sửa
                </button>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Họ và tên:</span> {user.name}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Số điện thoại:</span> {user.phone}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Địa chỉ:</span> {user.address}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white p-4 text-center">
        <p className="text-lg md:text-xl font-semibold">© 2025 GearVN. All rights reserved.</p>
      </footer>
    </div>
  );
}