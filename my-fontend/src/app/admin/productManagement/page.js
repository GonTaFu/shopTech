"use client"
import { Container } from "@mui/material";
import ProductsManager from "../../../components/ProductsManager";


export default function Home() {
    return (
      <Container sx={{marginBottom: "20%"}}>
        <ProductsManager></ProductsManager>
      </Container>
    );
  } 