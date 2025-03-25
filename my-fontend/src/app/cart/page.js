import Image from "next/image";
// import styles from "./page.module.css";
import CartPage from "../../components/CartPage";
import { Container } from "@mui/material"

export default function Home() {
  return (
    <Container>
      <title>Giỏ hàng</title>
      <CartPage></CartPage>
    </Container>
  )
}