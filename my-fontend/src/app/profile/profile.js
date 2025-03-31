"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Edit, Save, X } from "lucide-react"; // Icons for edit, save, and cancel
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

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
        <Typography variant="h3" align="center" gutterBottom>
          Hồ sơ người dùng
        </Typography>

        <Box
          component="section"
          sx={{
            maxWidth: 600,
            margin: "0 auto",
            padding: 3,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {isEditing ? (
            // Edit Form
            <form onSubmit={handleSave} className="space-y-4">
              <TextField
                label="Họ và tên"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Địa chỉ"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                sx={{ marginBottom: 2 }}
              />

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Save size={20} className="mr-2" />
                  Lưu
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <X size={20} className="mr-2" />
                  Hủy
                </Button>
              </Box>
            </form>
          ) : (
            // Display Profile
            <div className="space-y-4">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Thông tin cá nhân</Typography>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="contained"
                  color="primary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Edit size={20} className="mr-2" />
                  Chỉnh sửa
                </Button>
              </Box>
              <Typography>
                <strong>Họ và tên:</strong> {user.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography>
                <strong>Số điện thoại:</strong> {user.phone}
              </Typography>
              <Typography>
                <strong>Địa chỉ:</strong> {user.address}
              </Typography>
            </div>
          )}
        </Box>
    </div>
  );
}
