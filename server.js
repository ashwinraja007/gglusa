import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(cors());
app.use(express.json());

const adminEmail = process.env.ADMIN_EMAIL ?? "admin@gglusa.us";
const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@12345";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

app.post("/api/v1/admin/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    return res.json({
      authenticated: true,
      email,
      connected: true,
      message: "Login successful and MySQL connection verified",
    });
  } catch (error) {
    return res.status(500).json({
      authenticated: false,
      connected: false,
      message: "Login passed but failed to connect to MySQL",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/v1/admin/summary", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS dbName, NOW() AS serverTime");
    const summary = Array.isArray(rows) ? rows[0] : null;

    return res.json({
      status: "ok",
      dbName: summary?.dbName ?? process.env.MYSQL_DATABASE,
      serverTime: summary?.serverTime,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/v1/health", async (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Admin API running on http://localhost:${port}`);
});
