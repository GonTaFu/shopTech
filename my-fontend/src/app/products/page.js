'use client';
import Image from "next/image";
import PageProductList  from "../../components/productlist";
import { Container } from "@mui/material";

export default function ProductList() {
    return (
        <Container maxWidth="lg" sx={{ marginBottom: 30 }}>
            <PageProductList></PageProductList>
        </Container>
    );
}
