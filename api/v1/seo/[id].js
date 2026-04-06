import { parseJsonField, pool } from "../../_lib/mysql.js";

export default async function handler(req, res) {
  try {
    const id = Number(req.query.id);

    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid SEO id" });
    }

    if (req.method === "PUT") {
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
      return res.status(200).json({ ...record, extra_meta_json: parseJsonField(record?.extra_meta_json) });
    }

    if (req.method === "DELETE") {
      const [result] = await pool.query("DELETE FROM seo_records WHERE id = ?", [id]);

      if (!result?.affectedRows) {
        return res.status(404).json({ message: "SEO record not found" });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to handle seo id request",
    });
  }
}
