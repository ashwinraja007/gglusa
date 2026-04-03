import { useMemo, useState } from "react";

import { apiFetch } from "@/api/client";
import { nonProductionSecurityWarning } from "@/config/adminAuth";

type Module = "seo" | "content" | "pages" | "headers" | "locations";

type DummyRecord = Record<string, string | number | boolean | null>;

const modules: Module[] = ["seo", "content", "pages", "headers", "locations"];

const staticPagePaths = [
  "/",
  "/about",
  "/services",
  "/global-presence",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/careers",
  "/services/transportation",
  "/services/liquid-transportation",
  "/services/air-freight",
  "/services/ocean-freight",
  "/services/lcl-consolidation",
  "/services/project-cargo",
  "/services/customs-clearance",
  "/services/warehousing",
  "/services/e-commerce",
];

const seedData: Record<Module, DummyRecord[]> = {
  seo: staticPagePaths.map((path, index) => ({
    id: index + 1,
    path,
    title: `SEO title for ${path}`,
    description: `SEO description for ${path}`,
  })),
  content: [
    { id: 1, page_path: "/", section_key: "hero", status: "published" },
    { id: 2, page_path: "/", section_key: "about_us", status: "published" },
    { id: 3, page_path: "/", section_key: "services", status: "published" },
    { id: 4, page_path: "/", section_key: "global_presence", status: "published" },
    { id: 5, page_path: "/", section_key: "quick_enquiry", status: "published" },
    { id: 6, page_path: "/about", section_key: "main", status: "published" },
    { id: 7, page_path: "/services", section_key: "features", status: "published" },
  ],
  pages: staticPagePaths.map((path, index) => ({ id: index + 1, path, component_key: "static_page" })),
  headers: [
    { id: 1, label: "Home", url: "/", is_active: true },
    { id: 2, label: "About", url: "/about", is_active: true },
    { id: 3, label: "Services", url: "/services", is_active: true },
    { id: 4, label: "Contact", url: "/contact", is_active: true },
  ],
  locations: [
    { id: 1, name: "USA", country: "United States", email: "usa@example.com" },
    { id: 2, name: "UAE", country: "United Arab Emirates", email: "uae@example.com" },
    { id: 3, name: "India", country: "India", email: "india@example.com" },
  ],
};

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState<Module>("seo");
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<Record<Module, DummyRecord[]>>(seedData);
  const [status, setStatus] = useState("Showing bundled content.");
  const [loading, setLoading] = useState(false);

  const counters = useMemo(
    () => ({
      pages: records.pages.length,
      headers: records.headers.length,
      locations: records.locations.length,
    }),
    [records.headers.length, records.locations.length, records.pages.length],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records[active].filter((record) => JSON.stringify(record).toLowerCase().includes(q));
  }, [active, records, search]);

  const retrieveAllContent = async () => {
    setLoading(true);
    try {
      const [pages, content, seo, headers, locations] = await Promise.all([
        apiFetch<{ items: DummyRecord[] }>("/pages?page=1&page_size=500"),
        apiFetch<{ items: DummyRecord[] }>("/content?page=1&page_size=500"),
        apiFetch<{ items: DummyRecord[] }>("/seo?page=1&page_size=500"),
        apiFetch<{ items: DummyRecord[] }>("/headers?page=1&page_size=500"),
        apiFetch<{ items: DummyRecord[] }>("/locations?page=1&page_size=500"),
      ]);

      setRecords({
        pages: pages.items,
        content: content.items,
        seo: seo.items,
        headers: headers.items,
        locations: locations.items,
      });
      setStatus("Retrieved all contents from FastAPI successfully.");
    } catch {
      setStatus("FastAPI not reachable. Showing bundled content fallback.");
      setRecords(seedData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <p className="mb-3 rounded border border-amber-400 bg-amber-100 p-3 text-sm text-amber-900">{nonProductionSecurityWarning}</p>
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 font-semibold">Admin (Dummy Panel)</h2>
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
            <button onClick={retrieveAllContent} disabled={loading} className="rounded bg-slate-900 px-4 py-2 text-white">
              {loading ? "Retrieving..." : "Retrieve all contents"}
            </button>
            <span className="text-sm text-muted-foreground">{status}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search/filter records"
              className="w-full max-w-sm rounded border px-3 py-2"
            />
            <span className="text-sm text-muted-foreground">Current module: {active}</span>
          </div>

          <div>
            <h3 className="mb-2 font-semibold capitalize">{active} records</h3>
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No records found.</p>
            ) : (
              <div className="space-y-2">
                {filtered.map((item, index) => (
                  <div key={String(item.id ?? index)} className="rounded border p-3">
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
