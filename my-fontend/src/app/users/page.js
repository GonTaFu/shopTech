'use client';
import Image from "next/image";
import AdminUserManagement  from "../../components/UserManagement";
import { Container } from "@mui/material";

export default function ProductList() {
    return (
        <Container maxWidth="lg" sx={{ marginBottom:50 }}>
            <AdminUserManagement></AdminUserManagement>
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
