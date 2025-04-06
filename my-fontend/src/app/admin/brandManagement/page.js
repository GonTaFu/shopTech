"use client";

import Image from "next/image";
import BrandManagement from "../../../components/BrandManage";
import { Container } from "@mui/material"

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 50 }}>
      {/* <LoginPage></LoginPage> */}
      {/* <RegisterPage></RegisterPage> */}
      <BrandManagement></BrandManagement>
    </Container>
  )
}