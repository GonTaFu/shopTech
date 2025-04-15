"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "../../../components/ProductDetail";
import HandleLoading from "../../../components/HandleLoading";
import HandleServerError from "../../../components/HandleServerError";

import API from "../../../utils/api";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  const fetchAPI = async () => {
    if (!id) return;

    try {
      const res = await API.get(`products/${id}`);

      const product = await res.data;

      if (res.status != 200) {
        setError(true);
        return;
      }

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
  if (!product) return <center><HandleLoading></HandleLoading></center>;

  // Nếu dữ liệu hợp lệ thì hiển thị chi tiết
  return <ProductDetail product={product} />;
}
