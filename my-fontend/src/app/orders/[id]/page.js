"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HandleLoading from "../../../components/HandleLoading";
import OrderDetailCustomerPage from "../../../components/OrderDetailCustomerPage"; // Import trang chi tiết
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const userId = typeof window !== "undefined" ? Cookies.get("userID") : null;
    if (!userId) {
      router.push("/"); // Điều hướng về trang chủ nếu không có userID
    } else {
      setAccountId(userId);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <HandleLoading />;
  }

  return <OrderDetailCustomerPage accountId={accountId} />; // Truyền accountId vào OrderDetailCustomerPage
}