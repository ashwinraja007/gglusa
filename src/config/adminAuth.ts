export const ADMIN_AUTH_STORAGE_KEY = "admin-authenticated";

export const defaultAdminCredentials = {
  email: import.meta.env.VITE_ADMIN_EMAIL ?? "admin@gglusa.us",
  password: import.meta.env.VITE_ADMIN_PASSWORD ?? "Admin@12345",
};

export const adminLoginHint = "Use your admin email and password to access the panel.";
export const configuredMysqlDatabase = import.meta.env.VITE_MYSQL_DATABASE ?? "u546576758_ggl_usa";
export const configuredMysqlHost = import.meta.env.VITE_MYSQL_HOST ?? "srv1900.hstgr.io";
export const configuredMysqlPort = Number(import.meta.env.VITE_MYSQL_PORT ?? 3306);
export const configuredMysqlUser = import.meta.env.VITE_MYSQL_USER ?? "u546576758_karthik";
