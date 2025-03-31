"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Eye } from "lucide-react"; // Added Eye for Quick View

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample product data
  const products = [
    { id: 1, name: "Laptop GearVN", price: "9.990.000đ", oldPrice: "12.990.000đ", image: "/product1.jpg", description: "High-performance laptop for professionals." },
    { id: 2, name: "Laptop Gaming", price: "14.490.000đ", oldPrice: "18.990.000đ", image: "/product2.jpg", description: "Ultimate gaming laptop with RTX graphics." },
    { id: 3, name: "PC 15 4060", price: "4.000.000đ", oldPrice: "5.000.000đ", image: "/product3.jpg", description: "Compact PC with powerful performance." },
    { id: 4, name: "Chuột Gaming", price: "800.000đ", oldPrice: "1.200.000đ", image: "/product4.jpg", description: "Ergonomic gaming mouse with RGB lighting." },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={40}
            />
          </div>

          <div className="hidden md:flex flex-1 mx-4 relative">
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <button className="bg-white text-red-600 p-2 rounded-r-md hover:bg-gray-200">
              Tìm
            </button>
          </div>

          <div className="hidden md:flex space-x-4">
            <a href="tel:19005301" className="hover:underline">Hotline: 1900.5301</a>
            <Link href="/showroom" className="hover:underline">Hệ thống Showroom</Link>
            <Link href="/profile" className="hover:underline">Hồ sơ</Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="md:hidden mt-2 relative">
          <input
            type="text"
            placeholder="Bạn cần tìm gì?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-1/5 bg-white p-4 shadow-md h-screen md:h-auto fixed md:static z-40 transition-all duration-300`}
        >
          <ul className="space-y-3">
            <li className="font-bold text-lg text-gray-800 flex items-center">
              <span className="mr-2">💻</span> Laptop
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🎮</span> Laptop Gaming
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🖥️</span> PC Gaming
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🛠️</span> Main, CPU, VGA
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🖨️</span> Case, Nguồn, Tản
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">💾</span> Ổ cứng, RAM, Thẻ nhớ
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🎙️</span> Loa, Micro, Webcam
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🖥️</span> Màn hình
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">⌨️</span> Bàn phím
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🖱️</span> Chuột & Lót chuột
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🎧</span> Tai nghe
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🪑</span> Ghế - Bàn
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">💻</span> Phần mềm, mạng
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🎮</span> Handheld, Console
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">🔌</span> Phụ kiện (Hub, sạc...)
            </li>
            <li className="text-gray-600 hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors duration-200 flex items-center">
              <span className="mr-2">ℹ️</span> Dịch vụ và Thông tin
            </li>
          </ul>
        </aside>

        <main className="w-full md:w-4/5 p-4 md:p-6">
          <div className="relative bg-blue-200 h-48 md:h-64 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            <Image
              src="/banner.jpg"
              alt="Banner"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute text-center text-white">
              <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                THƯỞNG CẤP PC NĂNG CẤP
              </h1>
              <p className="text-lg md:text-2xl drop-shadow-lg">
                TRỌN GÓI LÊN ĐẾN 32.000.000đ
              </p>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Xem ngay
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mx-auto mb-4 rounded-md"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-red-500 font-bold">{product.price}</p>
                  <p className="text-gray-500 text-sm line-through">{product.oldPrice}</p>
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center"
                    >
                      <Eye size={20} className="mr-2" />
                      Xem nhanh
                    </button>
                    <button className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">Không tìm thấy sản phẩm nào.</p>
            )}
          </div>
        </main>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative animate-fade-in-up">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={300}
              height={300}
              className="mx-auto mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold text-gray-800">{selectedProduct.name}</h2>
            <p className="text-gray-600">{selectedProduct.description}</p>
            <p className="text-red-500 font-bold mt-2">{selectedProduct.price}</p>
            <p className="text-gray-500 text-sm line-through">{selectedProduct.oldPrice}</p>
            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      )}

      <footer className="bg-blue-500 text-white p-4 text-center">
        <p className="text-lg md:text-xl font-semibold">FLASH SALE MỖI NGÀY</p>
        <div className="flex justify-center space-x-2 mt-2">
          <span className="bg-white text-black p-2 rounded font-mono">00</span>
          <span className="bg-white text-black p-2 rounded font-mono">01</span>
          <span className="bg-white text-black p-2 rounded font-mono">17</span>
          <span className="bg-white text-black p-2 rounded font-mono">54</span>
        </div>
      </footer>
    </div>
  );
}