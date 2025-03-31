'use client';
import Image from "next/image";
import PayBill from "../../components/paybill.js";
import { Container } from "@mui/material";

export default function payPage() {
    return (
        <Container maxWidth="md" sx={{ height: 100 }}>

            <h1>Thanh toán</h1>
            <PayBill></PayBill>


            <style jsx>{`
            h1 {
                align-items: center;
                justify-content: center;
                display: flex;
                },
                `}</style>
        </Container>
    );
}
