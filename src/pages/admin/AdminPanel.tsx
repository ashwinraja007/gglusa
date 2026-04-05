import { useEffect, useMemo, useState } from "react";

import { apiFetch } from "@/api/client";
import { nonProductionSecurityWarning } from "@/config/adminAuth";

type Module = "seo" | "content" | "pages" | "headers" | "locations";
type DummyRecord = Record<string, string | number | boolean>;

type SummaryResponse = {
  status: string;
  dbName?: string;
  serverTime?: string;
  message?: string;
};

const modules: Module[] = ["seo", "content", "pages", "headers", "locations"];

const seedData: Record<Module, DummyRecord[]> = {
  seo: [
    { id: 1, path: "/", title: "Home", description: "Homepage metadata" },
    { id: 2, path: "/about", title: "About", description: "About metadata" },
  ],
  content: [
    { id: 1, page_path: "/", section_key: "hero", status: "published" },
    { id: 2, page_path: "/", section_key: "about_us", status: "published" },
    { id: 3, page_path: "/", section_key: "services", status: "published" },
  ],
  pages: [
    { id: 1, path: "/about", component_key: "about_static" },
    { id: 2, path: "/services", component_key: "services_static" },
  ],
  headers: [
    { id: 1, label: "Home", url: "/", is_active: true },
    { id: 2, label: "Services", url: "/services", is_active: true },
  ],
  locations: [
    { id: 1, name: "USA", country: "United States" },
    { id: 2, name: "UAE", country: "United Arab Emirates" },
  ],
};

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState<Module>("seo");
  const [search, setSearch] = useState("");
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    apiFetch<SummaryResponse>("/admin/summary")
      .then(setSummary)
      .catch((error) => {
        setSummary({ status: "error", message: error instanceof Error ? error.message : "Failed to fetch summary" });
      });
  }, []);

  const counters = useMemo(
    () => ({
      pages: seedData.pages.length,
      headers: seedData.headers.length,
      locations: seedData.locations.length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return seedData[active].filter((record) => JSON.stringify(record).toLowerCase().includes(q));
  }, [active, search]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <p className="mb-3 rounded border border-amber-400 bg-amber-100 p-3 text-sm text-amber-900">{nonProductionSecurityWarning}</p>
      <div className="mb-4 rounded-xl border bg-white p-4 text-sm">
        <p className="font-semibold">Remote MySQL status</p>
        {summary?.status === "ok" ? (
          <p>
            Connected to <span className="font-semibold">{summary.dbName}</span>
            {summary.serverTime ? ` · Server time: ${summary.serverTime}` : ""}
          </p>
        ) : (
          <p className="text-red-600">{summary?.message ?? "Checking connection..."}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 font-semibold">Admin Panel</h2>
          <button className="mb-3 rounded border px-3 py-1 text-sm" onClick={onLogout}>Logout</button>
          <div className="space-y-2">
            {modules.map((m) => (
              <button
                key={m}
                className={`block w-full rounded px-3 py-2 text-left capitalize ${m === active ? "bg-slate-900 text-white" : "bg-slate-100"}`}
                onClick={() => setActive(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-4 rounded-xl border bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded border p-3">Pages: {counters.pages}</div>
            <div className="rounded border p-3">Headers: {counters.headers}</div>
            <div className="rounded border p-3">Locations: {counters.locations}</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search/filter records"
              className="w-full max-w-sm rounded border px-3 py-2"
            />
            <span className="text-sm text-muted-foreground">Dummy records mode with backend MySQL connectivity.</span>
          </div>

          <div>
            <h3 className="mb-2 font-semibold capitalize">{active} records</h3>
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No records found.</p>
            ) : (
              <div className="space-y-2">
                {filtered.map((item) => (
                  <div key={String(item.id)} className="rounded border p-3">
                    <pre className="text-xs">{JSON.stringify(item, null, 2)}</pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
