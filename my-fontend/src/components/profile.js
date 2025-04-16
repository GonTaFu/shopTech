"use client";
import { useEffect, useState } from "react";
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

import API from "../utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { notifySuccess, notifyError, NotifyContainer} from "../utils/notify";

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
  const [user, setUser] = useState(
    {
      _id: "",
      name: "Nguyễn Văn A",
      emailAddress: "nguyenvana@example.com",
      phoneNumber: "0901234567",
    }
  );

  const router = useRouter();

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [errorForm, setErrorForm] = useState({});

  // Check validation for submit
  const validateFormData = (data) => {
    const errors = {};
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!/^\d{10,11}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!data.emailAddress.trim()) {
      errors.emailAddress = "Địa chỉ email không được để trống";
    }
    else {
      const validateEmailRegex = /^\S+@\S+\.\S+$/;
      if (!validateEmailRegex.test(data.emailAddress)) {
        errors.emailAddress = "Địa chỉ email không hợp lệ";
      }
    }

    return errors;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle open dialog form
  const handleOpen = () => {
    setFormData(user);
    setIsEditing(true)
  }

  // Handle form submission
  const handleSave = async (e) => {
    try {
      e.preventDefault();

      const errors = validateFormData(formData);
      if (Object.keys(errors).length > 0) {
        setErrorForm(errors);
        notifyError("Không thể cập nhập");
        return; 
      }

      const res = await API.put(`/accounts/customer/update/${user._id}`, formData);
      const data = res.data.account;

      setIsEditing(false); // Exit editing mode

      Cookies.set("userName", data.name, { expires: 1 / 24 });
      Cookies.set("userID", data._id, { expires: 1 / 24 });
      Cookies.set("role", data.roleId, { expires: 1 / 24 });
      
      // Phát sự kiện để lắng nghe và cập nhật
      window.dispatchEvent(new Event("user-login"));

      fetchAPI();
      
      notifySuccess("Đã cập nhập thành công");

      router.refresh();
      return;
    }
    catch (err) {
      notifyError("Lỗi! Không thể cập nhập được");
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setFormData(user); // Reset form data to original user data
    setIsEditing(false); // Exit editing mode
  };

  const fetchAPI = async () => {
    try {
      const id = Cookies.get("userID");
      const name = Cookies.get("userName");
      if (!id || !name) {
        router.push("/account");
        return;
      }

      const res = await API.get(`/accounts/${id}`);

      setUser(prev => ({
        _id: res.data._id,
        name: res.data.name,
        phoneNumber: res.data.phoneNumber,
        emailAddress: res.data.emailAddress,
      }));
    } catch (err) {}
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <StyledContainer>
      {/* {console.log(formData)} */}
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
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              helperText={errorForm.emailAddress}
              required
              sx={{ marginBottom: 2 }}
            />
            <StyledTextField
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              helperText={errorForm.phoneNumber}
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
                onClick={handleOpen}
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
              <strong>Email:</strong> {user.emailAddress}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#424242",
                "& strong": { color: "#1a237e", fontWeight: "600" },
              }}
            >
              <strong>Số điện thoại:</strong> {user.phoneNumber}
            </Typography>
          </div>
        )}
      </StyledBox>
      <NotifyContainer/>
    </StyledContainer>
  );
}
