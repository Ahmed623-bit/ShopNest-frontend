"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import LandingNavbar from "@/app/components/LandingNavbar";

import { saveToken } from "@/app/utils/auth";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // إضافة حقل تأكيد كلمة المرور
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ لحالة عرض الباسورد
  const [passwordMatchError, setPasswordMatchError] = useState(false); // حالة للتحقق من تطابق كلمة المرور

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // التحقق من تطابق كلمة المرور مع تأكيد كلمة المرور
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://shopnest-backend-lus9.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "فشل إنشاء الحساب");
      }

      const data = await res.json();
      const token = data.token;

      if (!token) throw new Error("لم يتم استلام التوكن");

      saveToken(token);
      toast.success("تم إنشاء الحساب بنجاح ✅");
      router.push("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <LandingNavbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <form
          onSubmit={handleRegister}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-right"
          dir="rtl"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h2>

          <input
            type="text"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          {/* ✅ حقل الباسورد مع أيقونة العين */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pl-10 border rounded"
              required
            />
            <span
              className="absolute inset-y-0 left-2 flex items-center text-gray-500 cursor-pointer"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
            >
              👁️
            </span>
          </div>

          {/* ✅ حقل تأكيد كلمة المرور */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 pl-10 border rounded"
              required
            />
            {passwordMatchError && (
              <p className="text-red-500 text-sm mt-2">
                كلمة المرور غير متطابقة
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            لديك حساب؟{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
