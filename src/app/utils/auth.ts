export async function loginUser(email: string, password: string): Promise<string> {
  const response = await fetch("https://shopnest-backend-lus9.onrender.com/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("فشل تسجيل الدخول. تأكد من البيانات.");
  }

  const data = await response.json();
  return data.token;
}

export function saveToken(token: string) {
  localStorage.setItem("userToken", token); // ✅ تأكد من تطابق اسم المفتاح مع getToken/removeToken
}

export function getToken(): string | null {
  return localStorage.getItem("userToken");
}

export function removeToken() {
  localStorage.removeItem("userToken");
}
