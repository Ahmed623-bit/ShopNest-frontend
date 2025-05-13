"use client";

import LandingNavbar from "./components/LandingNavbar";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center  text-center bg-gray-100">
      <LandingNavbar />

      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
          مرحبًا بك في ShopNest 🛒
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
          ShopNest هو متجرك الإلكتروني العصري حيث يمكنك شراء وبيع منتجاتك بسهولة
          وسرعة.
        </p>
      </div>
    </main>
  );
}
