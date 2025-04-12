"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "../../../components/ProductDetail";
import HandleLoading from "../../../components/HandleLoading";
// import ServerError from "../../../components/ServerError"; // thêm dòng này

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false); // thêm state kiểm tra lỗi

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi fetch sản phẩm:", err);
        setError(true); // nếu có lỗi thì bật error
      }
    };

    fetchData();
  }, [id]);

  // Hiển thị lỗi server
  // if (error) return <ServerError />;

  // Hiển thị loading trong khi chờ
  if (!product) return <center><HandleLoading></HandleLoading></center>;

  // Nếu dữ liệu hợp lệ thì hiển thị chi tiết
  return <ProductDetail product={product} />;
}
