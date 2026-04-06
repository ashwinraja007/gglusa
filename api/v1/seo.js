import { parseJsonField, pool } from "../_lib/mysql.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
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

      const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM seo_records ${whereSql}`, whereParams);

      const items = Array.isArray(rows)
        ? rows.map((row) => ({
            ...row,
            extra_meta_json: parseJsonField(row.extra_meta_json),
          }))
        : [];

      const total = Array.isArray(countRows) ? Number(countRows[0]?.total ?? 0) : 0;
      return res.status(200).json({ items, page: Math.max(page, 1), page_size: Math.max(pageSize, 1), total });
    }

    if (req.method === "POST") {
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
        return res.status(200).json({ ...record, extra_meta_json: parseJsonField(record?.extra_meta_json) });
      }

      const [insertResult] = await pool.query(
        "INSERT INTO seo_records (path, title, description, keywords, extra_meta_json) VALUES (?, ?, ?, ?, ?)",
        [path, title, description, keywords, JSON.stringify(extra_meta_json ?? {})],
      );

      const insertedId = Number(insertResult?.insertId);
      const [insertedRows] = await pool.query(
        "SELECT id, path, title, description, keywords, extra_meta_json, created_at, updated_at FROM seo_records WHERE id = ?",
        [insertedId],
      );

      const record = Array.isArray(insertedRows) ? insertedRows[0] : null;
      return res.status(201).json({ ...record, extra_meta_json: parseJsonField(record?.extra_meta_json) });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to handle seo request",
    });
  }
}
