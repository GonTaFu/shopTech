"use client";
import Head from "next/head";
import CategoryManagement from "./CategoryManagement";

export default function CategoryPage() {
  return (
    <div>
      <Head>
        <title>Category Management Page</title>
      </Head>

      <h1>Category Management</h1>
      <CategoryManagement />

      <style jsx>{`
        h1 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          color: #1a237e;
        }
      `}</style>
    </div>
  );
}
