import { FormEvent, useState } from "react";

import { apiFetch } from "@/api/client";
import { ADMIN_AUTH_STORAGE_KEY, adminLoginHint, defaultAdminCredentials } from "@/config/adminAuth";
import { AdminPanel } from "./admin/AdminPanel";

type LoginResponse = {
  authenticated: boolean;
  connected: boolean;
  message: string;
  email: string;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiFetch<LoginResponse>("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.authenticated || !response.connected) {
        setError(response.message || "Unable to authenticate");
        return;
      }

      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      return;
    } catch {
      const fallbackValid = email === defaultAdminCredentials.email && password === defaultAdminCredentials.password;

      if (!fallbackValid) {
        setError("Invalid credentials.");
        return;
      }

      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <AdminPanel onLogout={logout} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <form className="w-full max-w-md space-y-4 rounded-xl border bg-white p-6" onSubmit={login}>
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="rounded border border-amber-400 bg-amber-100 p-3 text-sm text-amber-900">{adminLoginHint}</p>
        <input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button disabled={loading} className="w-full rounded bg-slate-900 px-4 py-2 text-white">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
