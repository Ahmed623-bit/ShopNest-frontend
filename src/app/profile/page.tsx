"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getToken, removeToken } from "@/app/utils/auth";

interface User {
  name: string;
  email: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsLoggedIn(true);

      fetch("https://shopnest-backend-lus9.onrender.com/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data: User) => {
          setUser(data);
        })
        .catch(() => {
          toast.error("حدث خطأ أثناء جلب البيانات");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      toast.error("يجب تسجيل الدخول أولًا");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    const token = getToken();

    try {
      const res = await fetch(
        "https://shopnest-backend-lus9.onrender.com/api/users/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Logout request failed");

      removeToken();
      setIsLoggedIn(false);
      setUser(null);
      toast.success("تم تسجيل الخروج بنجاح");
      router.push("/login");
    } catch {
      toast.error("فشل تسجيل الخروج");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>🚨 يجب تسجيل الدخول أولًا</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-green-700">🌿 ShopNest</div>

        <div className="flex items-center gap-4">
          {user && <span className="text-gray-800">Welcome {user.name}</span>}

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            تسجيل الخروج
          </button>
        </div>
      </nav>

      {/* ✅ Main Profile Content */}
      <div className="flex justify-center items-center py-10">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            مرحبًا بك في صفحة البروفايل
          </h1>

          {user && (
            <>
              <p className="mb-2">
                <strong>الاسم:</strong> {user.name}
              </p>
              <p className="mb-4">
                <strong>البريد الإلكتروني:</strong> {user.email}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
