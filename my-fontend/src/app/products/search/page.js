'use client';
import Image from "next/image";
import ProductListSearch  from "../../../components/ProductListSearch";
import { Container } from "@mui/material";

export default function ProductList() {
    return (
        <Container maxWidth="lg" sx={{ marginBottom: 30 }}>
            <ProductListSearch></ProductListSearch>
        </Container>
    );
}
