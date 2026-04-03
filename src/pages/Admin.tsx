import { FormEvent, useMemo, useState } from "react";

import { ADMIN_AUTH_STORAGE_KEY, defaultAdminCredentials, nonProductionSecurityWarning } from "@/config/adminAuth";
import { AdminPanel } from "./admin/AdminPanel";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "true");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const creds = useMemo(() => defaultAdminCredentials, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const localValid = username === creds.username && password === creds.password;

    if (localValid) {
      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    } else {
      setError("Invalid credentials.");
    }

    setLoading(false);
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
        <p className="rounded border border-amber-400 bg-amber-100 p-3 text-sm text-amber-900">{nonProductionSecurityWarning}</p>
        <input className="w-full rounded border px-3 py-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button disabled={loading} className="w-full rounded bg-slate-900 px-4 py-2 text-white">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
