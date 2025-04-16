"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "../../../components/ProductDetail";
import HandleLoading from "../../../components/HandleLoading";
import HandleServerError from "../../../components/HandleServerError";

import API from "../../../utils/api";
import { Container } from "@mui/material";
  
export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  const fetchAPI = async () => {
    if (!id) return;

    try {
      const res = await API.get(`products/${id}`);

      const product = await res.data;

      setProduct(product);
      setError(false);
    }
    catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    if (!id) return;
    
    fetchAPI();
  }, [id]);

  // Hiển thị lỗi server
  if (error) return <HandleServerError/>;

  // Hiển thị loading trong khi chờ
  if (!product) return (
    <Container sx={{marginTop: "10%", marginBottom: "100%"}}>
      <HandleLoading></HandleLoading>
    </Container>
  );

  // Nếu dữ liệu hợp lệ thì hiển thị chi tiết
  return (
    <ProductDetail product={product} />
  );
}
