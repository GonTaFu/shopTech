import Link from "next/link";

export default function Showroom() {
  const showrooms = [
    { id: 1, city: "Hà Nội", address: "123 Đường Láng, Đống Đa, Hà Nội", phone: "1900.1234" },
    { id: 2, city: "TP. Hồ Chí Minh", address: "456 Nguyễn Trãi, Quận 5, TP. HCM", phone: "1900.5678" },
    { id: 3, city: "Đà Nẵng", address: "789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng", phone: "1900.9012" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">GearVN</h1>
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <Link href="/profile" className="hover:underline">Hồ sơ</Link>
          </nav>
        </div>
      </header>

      {/* Showroom Section */}
      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Hệ thống Showroom</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showrooms.map((showroom) => (
            <div
              key={showroom.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">{showroom.city}</h2>
              <p className="text-gray-600 mt-2">Địa chỉ: {showroom.address}</p>
              <p className="text-gray-600 mt-1">Hotline: {showroom.phone}</p>
              <a
                href={`tel:${showroom.phone}`}
                className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Gọi ngay
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white p-4 text-center">
        <p className="text-lg md:text-xl font-semibold">© 2025 GearVN. All rights reserved.</p>
      </footer>
    </div>
  );
}