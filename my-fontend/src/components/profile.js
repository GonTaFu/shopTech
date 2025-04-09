"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Edit, Save, X } from "lucide-react"; // Icons for edit, save, and cancel
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Subtle gradient background
  padding: theme.spacing(4),
  fontFamily: "sans-serif",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: "0 auto",
  padding: theme.spacing(4),
  background: "linear-gradient(145deg, #ffffff, #e6e6e6)", // Subtle gradient for the profile card
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)", // Slight scale on hover
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)", // Stronger shadow on hover
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#f9f9f9", // Light background for input fields
    transition: "background 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#1a237e", // Deep indigo for labels
    fontWeight: "500",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1976d2", // Blue when focused
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1976d2",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1976d2",
    borderWidth: "2px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1.5),
  fontWeight: "bold",
  transition: "background 0.3s ease-in-out",
}));

const EditButton = styled(StyledButton)(({ theme }) => ({
  background: "linear-gradient(90deg, #1976d2 30%, #42a5f5 90%)", // Gradient for edit button
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(90deg, #1565c0 30%, #1976d2 90%)", // Darker gradient on hover
  },
}));

const SaveButton = styled(StyledButton)(({ theme }) => ({
  background: "linear-gradient(90deg, #2e7d32 30%, #4caf50 90%)", // Green gradient for save button
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(90deg, #1b5e20 30%, #2e7d32 90%)", // Darker green on hover
  },
}));

const CancelButton = styled(StyledButton)(({ theme }) => ({
  borderColor: "#d32f2f",
  color: "#d32f2f",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "rgba(211, 47, 47, 0.1)", // Light red background on hover
    borderColor: "#b71c1c",
    color: "#b71c1c",
  },
}));

export default function ProfilePage() {
  // Sample user data (in a real app, this would come from a backend)
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    address: "123 Đường Láng, Đống Đa, Hà Nội",
  }
  // {
  //   name: "Nguyễn Thị B",
  //   email: "nguyenthib@example.com",
  //   phone: "0123456789",
  //   address: "456 Đường Láng, Đống Đa, Hà Nội",
  // }
  );

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
    <StyledContainer>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1a237e",
          letterSpacing: "1px",
          textTransform: "uppercase",
          background: "linear-gradient(to right, #1a237e, #1976d2)", // Gradient text
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          borderBottom: "2px solid #1976d2", // Underline effect
          paddingBottom: "8px",
          marginBottom: "32px",
        }}
      >
        Hồ sơ người dùng
      </Typography>

      <StyledBox component="section">
        {isEditing ? (
          // Edit Form
          <form onSubmit={handleSave} className="space-y-4">
            <StyledTextField
              label="Họ và tên"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              sx={{ marginBottom: 2 }}
            />
            <StyledTextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ marginBottom: 2 }}
            />
            <StyledTextField
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              sx={{ marginBottom: 2 }}
            />
            <StyledTextField
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
              <SaveButton
                variant="contained"
                type="submit"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Save size={20} className="mr-2" />
                Lưu
              </SaveButton>
              <CancelButton
                variant="outlined"
                onClick={handleCancel}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <X size={20} className="mr-2" />
                Hủy
              </CancelButton>
            </Box>
          </form>
        ) : (
          // Display Profile
          <div className="space-y-4">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "#1a237e",
                  borderLeft: "4px solid #1976d2",
                  paddingLeft: "12px",
                }}
              >
                Thông tin cá nhân
              </Typography>
              <EditButton
                onClick={() => setIsEditing(true)}
                variant="contained"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Edit size={20} className="mr-2" />
                Chỉnh sửa
              </EditButton>
            </Box>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#424242",
                "& strong": { color: "#1a237e", fontWeight: "600" },
              }}
            >
              <strong>Họ và tên:</strong> {user.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#424242",
                "& strong": { color: "#1a237e", fontWeight: "600" },
              }}
            >
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#424242",
                "& strong": { color: "#1a237e", fontWeight: "600" },
              }}
            >
              <strong>Số điện thoại:</strong> {user.phone}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#424242",
                "& strong": { color: "#1a237e", fontWeight: "600" },
              }}
            >
              <strong>Địa chỉ:</strong> {user.address}
            </Typography>
          </div>
        )}
      </StyledBox>
    </StyledContainer>
  );
}
