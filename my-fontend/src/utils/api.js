"use client"

import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api", // Đổi nếu deploy backend
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export default API;