export const ADMIN_AUTH_STORAGE_KEY = "admin-authenticated";

export const defaultAdminCredentials = {
  email: import.meta.env.VITE_ADMIN_EMAIL ?? "admin@gglusa.us",
  password: import.meta.env.VITE_ADMIN_PASSWORD ?? "Admin@12345",
};

export const nonProductionSecurityWarning =
  "⚠ Non-production security mode: this admin login supports frontend fallback when API is unavailable.";
