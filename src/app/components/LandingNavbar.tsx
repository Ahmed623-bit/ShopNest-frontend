// frontend/src/components/LandingNavbar.tsx

"use client";

import { useRouter } from "next/navigation";

export default function LandingNavbar() {
  const router = useRouter();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/")}
      >
        ShopNest 🛍️
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          تسجيل الدخول
        </button>
        <button
          onClick={() => router.push("/register")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          إنشاء حساب
        </button>
      </div>
    </nav>
  );
}
