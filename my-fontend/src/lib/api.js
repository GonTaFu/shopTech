// src/lib/api.js
import axios from "axios";

const API_BASE = "http://localhost:4000/api"; // sửa lại nếu khác

export const fetchProducts = () => axios.get(`${API_BASE}/products`);
export const fetchBrands = () => axios.get(`${API_BASE}/brands`);   
export const fetchCategories = () => axios.get(`${API_BASE}/categories`);

export const createProduct = (data) => axios.post(`${API_BASE}/products`, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/products/${id}`);
