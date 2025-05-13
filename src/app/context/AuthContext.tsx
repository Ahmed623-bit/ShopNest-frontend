"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// تعريف نوع AuthContext
interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // يتم التحقق من التوكن عند تحميل التطبيق
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // هنا نرسل طلب للتحقق من صحة التوكن
      fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then(() => {
          // إذا كان التوكن صالحًا، نقوم بتحديث الحالة
          setToken(storedToken);
          setIsLoggedIn(true);
        })
        .catch(() => {
          // في حال كان التوكن غير صالح، نقوم بإزالته
          localStorage.removeItem("token");
          setToken(null);
          setIsLoggedIn(false);
        });
    }
  }, []); // يعتمد على أول تحميل للتطبيق

  const login = (newToken: string) => {
    // تخزين التوكن في localStorage
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // حذف التوكن من localStorage
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// استخدمها داخل أي مكون
export const useAuth = () => useContext(AuthContext);
