'use client'
import Image from "next/image"
import { Style } from "@mui/icons-material"
import LoginPage from "../../components/loginpage"
import { Container } from "@mui/material"

export default function AccountPage() {
  return (
    <Container>
       <LoginPage></LoginPage>
    </Container>
  )
}