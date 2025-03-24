"use client"
import Image from "next/image";

import ProductDetail from "../../../components/ProductDetail";

const product = {
  id:"WH1000XM4",
  name: "Premium Wireless Headphones",
  description: "Experience premium sound quality and industry-leading noise cancellation with these wireless headphones. Perfect for music lovers and frequent travelers.",
  price: "349.99",
  rate: 4,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
  ],
  brand: "Logitech",
  status: "New",
  color: "Black",
  warranty: "24 Months",
}

export default function Home() {
  return (
    <div>
      <ProductDetail product={product}></ProductDetail>
    </div>
  );
}
