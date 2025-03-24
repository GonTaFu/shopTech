import Image from "next/image";
import styles from "./page.module.css";
import Cart from "./cart";
import { Container } from "@mui/material"

export default function Home() {
  return (
    <Container>
      <title>Giỏ hàng</title>
      <Cart></Cart>
    </Container>
  )
}