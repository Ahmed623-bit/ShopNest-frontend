"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { loginUser, saveToken } from "@/app/utils/auth";
import LandingNavbar from "@/app/components/LandingNavbar";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await loginUser(email, password);
      console.log("✅ Token received:", token);

      saveToken(token);
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/profile");
    } catch (error: unknown) {
      // تحديد نوع الخطأ كـ unknown
      if (error instanceof Error) {
        // التحقق إذا كان الخطأ من النوع Error
        console.error("❌ Login error:", error.message);
        toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
      } else {
        console.error("❌ Unknown error:", error);
        toast.error("حدث خطأ غير معروف");
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
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-right"
          dir="rtl"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h2>

          <label className="block mb-1 text-sm font-medium">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <label className="block mb-2 text-sm font-medium">كلمة المرور</label>
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full p-2 mb-4"
            required
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          <p className="text-center text-sm mt-4">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              أنشئ حسابًا الآن
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
