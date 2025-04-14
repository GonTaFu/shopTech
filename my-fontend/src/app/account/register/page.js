'use client'
import Image from "next/image"
import { Style } from "@mui/icons-material"
import RegisterPage from "../../../components/registerpage"
import { Container } from "@mui/material"

export default function AccountPage() {
  return (
    <Container>
       <RegisterPage></RegisterPage>
    </Container>
  )
}