'use client';
import Image from "next/image";
import PayBill from "../../components/paybill.js";
import { Container } from "@mui/material";

export default function payPage() {
    return (
        <Container maxWidth="lg" sx={{ marginBottom: 50 }}>
            <PayBill></PayBill>
        </Container>
    );
}
