"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Cart from "./cart";
import LoginPage from "./loginpage";
import RegisterPage from "./register";
import { Container } from "@mui/material"

export default function Home() {
  return (
    <Container>
      {/* <LoginPage></LoginPage> */}
      <RegisterPage></RegisterPage>
    </Container>
  )
}
