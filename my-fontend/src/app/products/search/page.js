'use client';
import Image from "next/image";
import ProductListSearch from "../../../components/ProductListSearch";
import { Container } from "@mui/material";
import { Suspense } from "react";

export default function ProductList() {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 30 }}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductListSearch />
      </Suspense>
    </Container>
  );
}
