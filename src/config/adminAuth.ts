export const ADMIN_AUTH_STORAGE_KEY = "admin-authenticated";

export const defaultAdminCredentials = {
  username: import.meta.env.VITE_ADMIN_USERNAME ?? "admin",
  password: import.meta.env.VITE_ADMIN_PASSWORD ?? "admin123",
};

export const nonProductionSecurityWarning =
  "⚠ Non-production security mode: this login gate is UI-only and does not protect backend endpoints.";
