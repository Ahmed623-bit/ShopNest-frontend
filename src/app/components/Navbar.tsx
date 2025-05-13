"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link href="/" className="text-xl font-bold">
        ShopNest
      </Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <span>Welcome, User</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login.</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
