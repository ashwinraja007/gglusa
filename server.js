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
    const [summaryRows] = await pool.query("SELECT DATABASE() AS dbName, NOW() AS serverTime, VERSION() AS dbVersion");
    const [contentCountRows] = await pool.query("SELECT COUNT(*) AS total FROM content");
    const [seoCountRows] = await pool.query("SELECT COUNT(*) AS total FROM seo_records");
    const [pagesCountRows] = await pool.query("SELECT COUNT(*) AS total FROM pages");

    const summary = Array.isArray(summaryRows) ? summaryRows[0] : null;
    const contentCount = Array.isArray(contentCountRows) ? Number(contentCountRows[0]?.total ?? 0) : 0;
    const seoCount = Array.isArray(seoCountRows) ? Number(seoCountRows[0]?.total ?? 0) : 0;
    const pagesCount = Array.isArray(pagesCountRows) ? Number(pagesCountRows[0]?.total ?? 0) : 0;

    return res.json({
      status: "ok",
      connected: true,
      dbName: summary?.dbName ?? process.env.MYSQL_DATABASE,
      serverTime: summary?.serverTime,
      dbVersion: summary?.dbVersion,
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER,
      counts: {
        pages: pagesCount,
        content: contentCount,
        seo: seoCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      connected: false,
      dbName: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});



const parseJsonField = (value) => {
  if (!value) return {};
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

app.get("/api/v1/seo", async (req, res) => {
  try {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.page_size ?? 20);
    const q = String(req.query.q ?? "").trim();
    const offset = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);

    const whereSql = q ? "WHERE path LIKE ? OR title LIKE ? OR description LIKE ? OR keywords LIKE ?" : "";
    const whereParams = q ? [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`] : [];

    const [rows] = await pool.query(
      `SELECT id, path, title, description, keywords, extra_meta_json, created_at, updated_at FROM seo_records ${whereSql} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...whereParams, Math.max(pageSize, 1), offset],
    );

    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM seo_records ${whereSql}`,
      whereParams,
    );

    const items = Array.isArray(rows)
      ? rows.map((row) => ({
          ...row,
          extra_meta_json: parseJsonField(row.extra_meta_json),
        }))
      : [];

    const total = Array.isArray(countRows) ? Number(countRows[0]?.total ?? 0) : 0;

    return res.json({ items, page: Math.max(page, 1), page_size: Math.max(pageSize, 1), total });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to fetch SEO records",
    });
  }
});

app.post("/api/v1/seo", async (req, res) => {
  try {
    const { path, title, description, keywords, extra_meta_json } = req.body ?? {};
    if (!path || !title || !description || !keywords) {
      return res.status(400).json({ message: "path, title, description, keywords are required" });
    }

    const [existingRows] = await pool.query("SELECT id FROM seo_records WHERE path = ? LIMIT 1", [path]);
    const existingId = Array.isArray(existingRows) && existingRows[0] ? Number(existingRows[0].id) : null;

    if (existingId) {
      await pool.query(
        "UPDATE seo_records SET title = ?, description = ?, keywords = ?, extra_meta_json = ? WHERE id = ?",
        [title, description, keywords, JSON.stringify(extra_meta_json ?? {}), existingId],
      );
      const [updatedRows] = await pool.query(
        "SELECT id, path, title, description, keywords, extra_meta_json, created_at, updated_at FROM seo_records WHERE id = ?",
        [existingId],
      );
      const record = Array.isArray(updatedRows) ? updatedRows[0] : null;
      return res.json({ ...record, extra_meta_json: parseJsonField(record?.extra_meta_json) });
    }

    const [result] = await pool.query(
      "INSERT INTO seo_records (path, title, description, keywords, extra_meta_json) VALUES (?, ?, ?, ?, ?)",
      [path, title, description, keywords, JSON.stringify(extra_meta_json ?? {})],
    );

    const insertedId = Number(result?.insertId);
    const [insertedRows] = await pool.query(
      "SELECT id, path, title, description, keywords, extra_meta_json, created_at, updated_at FROM seo_records WHERE id = ?",
      [insertedId],
    );

    const record = Array.isArray(insertedRows) ? insertedRows[0] : null;
    return res.status(201).json({ ...record, extra_meta_json: parseJsonField(record?.extra_meta_json) });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to save SEO record",
    });
  }
});

app.put("/api/v1/seo/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { path, title, description, keywords, extra_meta_json } = req.body ?? {};

    const [result] = await pool.query(
      "UPDATE seo_records SET path = ?, title = ?, description = ?, keywords = ?, extra_meta_json = ? WHERE id = ?",
      [path, title, description, keywords, JSON.stringify(extra_meta_json ?? {}), id],
    );

    if (!result?.affectedRows) {
      return res.status(404).json({ message: "SEO record not found" });
    }

    const [rows] = await pool.query(
      "SELECT id, path, title, description, keywords, extra_meta_json, created_at, updated_at FROM seo_records WHERE id = ?",
      [id],
    );
    const record = Array.isArray(rows) ? rows[0] : null;
    return res.json({ ...record, extra_meta_json: parseJsonField(record?.extra_meta_json) });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to update SEO record",
    });
  }
});

app.delete("/api/v1/seo/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query("DELETE FROM seo_records WHERE id = ?", [id]);

    if (!result?.affectedRows) {
      return res.status(404).json({ message: "SEO record not found" });
    }

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to delete SEO record",
    });
  }
});

app.get("/api/v1/health", async (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Admin API running on http://localhost:${port}`);
});
