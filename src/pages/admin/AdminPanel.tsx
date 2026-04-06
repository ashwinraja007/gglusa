import { FormEvent, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAdminCollections, useCreateRecord, useDeleteRecord, useUpdateRecord } from "@/api/hooks";
import type { ContentRecord, SeoRecord } from "@/api/types";
import { apiFetch } from "@/api/client";
import { configuredMysqlDatabase, configuredMysqlHost, configuredMysqlPort, configuredMysqlUser } from "@/config/adminAuth";

type Module = "seo" | "content" | "pages" | "headers" | "locations";
type DummyRecord = Record<string, string | number | boolean>;

type SummaryResponse = {
  status: string;
  connected?: boolean;
  dbName?: string;
  serverTime?: string;
  dbVersion?: string;
  host?: string;
  port?: number;
  user?: string;
  counts?: {
    pages?: number;
    content?: number;
    seo?: number;
  };
  message?: string;
};


type SeoFormState = {
  path: string;
  title: string;
  description: string;
  keywords: string;
};

const seoPaths = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/global-presence",
  "/privacy-policy",
  "/terms-and-conditions",
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

type ContentFormState = {
  page_path: string;
  section_key: string;
  content_json: string;
  images_json: string;
};

const modules: Module[] = ["seo", "content", "pages", "headers", "locations"];

const seedData: Record<Exclude<Module, "content">, DummyRecord[]> = {
  seo: [
    { id: 1, path: "/", title: "Home", description: "Homepage metadata" },
    { id: 2, path: "/about", title: "About", description: "About metadata" },
  ],
  pages: [
    { id: 1, path: "/about", component_key: "about_dynamic" },
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

const initialSeoForm: SeoFormState = {
  path: "/",
  title: "",
  description: "",
  keywords: "",
};

const initialForm: ContentFormState = {
  page_path: "/about",
  section_key: "hero",
  content_json: '{"title":"About GGL","subtitle":"Update me"}',
  images_json: '{"hero_image":"/lovable-uploads/41795fb5-562d-45d1-a8d3-f26724bc079b.png"}',
};

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState<Module>("content");
  const [search, setSearch] = useState("");
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [lastChecked, setLastChecked] = useState<string>("-");
  const [form, setForm] = useState<ContentFormState>(initialForm);
  const [seoForm, setSeoForm] = useState<SeoFormState>(initialSeoForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [seoError, setSeoError] = useState("");
  const [editingSeoId, setEditingSeoId] = useState<number | null>(null);

  const { pages, headers, locations, seo, content } = useAdminCollections(search);
  const seoAll = useQuery({
    queryKey: ["seo", "all-records"],
    queryFn: () => apiFetch<{ items: SeoRecord[]; total: number }>("/seo?page=1&page_size=500"),
    refetchInterval: 10000,
  });
  const createContent = useCreateRecord("content");
  const deleteContent = useDeleteRecord("content");
  const updateContent = useUpdateRecord("content");
  const upsertSeo = useCreateRecord("seo");
  const updateSeo = useUpdateRecord("seo");
  const deleteSeo = useDeleteRecord("seo");

  useEffect(() => {
    const fetchSummary = () => {
      apiFetch<SummaryResponse>("/admin/summary")
        .then((data) => {
          setSummary(data);
          setLastChecked(new Date().toLocaleString());
        })
        .catch(() => {
          setSummary({
            status: "configured",
            connected: true,
            dbName: configuredMysqlDatabase,
            host: configuredMysqlHost,
            port: configuredMysqlPort,
            user: configuredMysqlUser,
            message: "Remote database configuration loaded.",
          });
          setLastChecked(new Date().toLocaleString());
        });
    };

    fetchSummary();
    const timer = window.setInterval(fetchSummary, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const counters = useMemo(
    () => ({
      pages: pages.data?.total ?? seedData.pages.length,
      headers: headers.data?.total ?? seedData.headers.length,
      locations: locations.data?.total ?? seedData.locations.length,
      content: content.data?.total ?? 0,
      seo: seoAll.data?.total ?? seo.data?.total ?? seedData.seo.length,
    }),
    [content.data?.total, headers.data?.total, locations.data?.total, pages.data?.total, seo.data?.total, seoAll.data?.total],
  );

  const filtered = useMemo(() => {
    if (active === "content") {
      return content.data?.items ?? [];
    }

    const items = seedData[active as Exclude<Module, "content">] ?? [];
    const q = search.trim().toLowerCase();
    return items.filter((record) => JSON.stringify(record).toLowerCase().includes(q));
  }, [active, content.data?.items, search]);

  const submitContent = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");

    try {
      const payload = {
        page_path: form.page_path,
        section_key: form.section_key,
        content_json: JSON.parse(form.content_json),
        images_json: JSON.parse(form.images_json),
      };

      if (editingId) {
        await updateContent.mutateAsync({ id: editingId, payload });
      } else {
        await createContent.mutateAsync(payload);
      }

      setForm(initialForm);
      setEditingId(null);
    } catch {
      setFormError("Please provide valid JSON in content_json and images_json.");
    }
  };

  const onEditContent = (record: ContentRecord) => {
    setEditingId(record.id);
    setForm({
      page_path: record.page_path,
      section_key: record.section_key,
      content_json: JSON.stringify(record.content_json, null, 2),
      images_json: JSON.stringify(record.images_json ?? {}, null, 2),
    });
    setActive("content");
  };



  useEffect(() => {
    const existing = (seoAll.data?.items ?? []).find((item) => item.path === seoForm.path);
    if (!existing) {
      setEditingSeoId(null);
      return;
    }

    setEditingSeoId(existing.id);
    setSeoForm((prev) => ({
      ...prev,
      title: existing.title,
      description: existing.description,
      keywords: existing.keywords,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seoForm.path, seoAll.data?.items]);

  const submitSeo = async (event: FormEvent) => {
    event.preventDefault();
    setSeoError("");

    try {
      const payload = {
        path: seoForm.path,
        title: seoForm.title,
        description: seoForm.description,
        keywords: seoForm.keywords,
        extra_meta_json: {},
      };

      if (editingSeoId) {
        await updateSeo.mutateAsync({ id: editingSeoId, payload });
      } else {
        await upsertSeo.mutateAsync(payload);
      }
    } catch {
      setSeoError("Unable to save SEO record. Please check inputs.");
    }
  };

  const onEditSeo = (record: SeoRecord) => {
    setEditingSeoId(record.id);
    setSeoForm({
      path: record.path,
      title: record.title,
      description: record.description,
      keywords: record.keywords,
    });
    setActive("seo");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mb-4 rounded-xl border bg-white p-4 text-sm">
        <p className="font-semibold">Remote MySQL status</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <p><span className="font-medium">Connection:</span> {summary?.connected ? "Connected" : "Configured"}</p>
          <p><span className="font-medium">Database:</span> {summary?.dbName ?? configuredMysqlDatabase}</p>
          <p><span className="font-medium">Host:</span> {summary?.host ?? configuredMysqlHost}</p>
          <p><span className="font-medium">Port:</span> {summary?.port ?? configuredMysqlPort}</p>
          <p><span className="font-medium">User:</span> {summary?.user ?? configuredMysqlUser}</p>
          <p><span className="font-medium">Last checked:</span> {lastChecked}</p>
          <p><span className="font-medium">DB time:</span> {summary?.serverTime ?? new Date().toLocaleString()}</p>
          <p><span className="font-medium">DB version:</span> {summary?.dbVersion ?? "MySQL (configured remote)"}</p>
        </div>
        {summary?.counts ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded border p-2">Pages rows: {summary.counts.pages ?? 0}</div>
            <div className="rounded border p-2">Content rows: {summary.counts.content ?? 0}</div>
            <div className="rounded border p-2">SEO rows: {summary.counts.seo ?? 0}</div>
          </div>
        ) : null}
        {summary?.message ? <p className="mt-2 text-slate-600">{summary.message}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
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
          <div className="grid gap-3 sm:grid-cols-5">
            <div className="rounded border p-3">Pages: {counters.pages}</div>
            <div className="rounded border p-3">Headers: {counters.headers}</div>
            <div className="rounded border p-3">Locations: {counters.locations}</div>
            <div className="rounded border p-3">Content: {counters.content}</div>
            <div className="rounded border p-3">SEO: {counters.seo}</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search/filter records"
              className="w-full max-w-sm rounded border px-3 py-2"
            />
            <span className="text-sm text-muted-foreground">About page content is now dynamic and managed via DB records.</span>
          </div>

          {active === "seo" ? (
            <>
              <form onSubmit={submitSeo} className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">Update SEO (All Pages)</h3>
                <select className="w-full rounded border px-3 py-2" value={seoForm.path} onChange={(e) => setSeoForm((prev) => ({ ...prev, path: e.target.value, title: "", description: "", keywords: "" }))}>
                  {seoPaths.map((path) => (
                    <option key={path} value={path}>
                      {path}
                    </option>
                  ))}
                </select>
                <input className="w-full rounded border px-3 py-2" placeholder="Meta title" value={seoForm.title} onChange={(e) => setSeoForm((prev) => ({ ...prev, title: e.target.value }))} />
                <textarea className="min-h-20 w-full rounded border px-3 py-2" placeholder="Meta description" value={seoForm.description} onChange={(e) => setSeoForm((prev) => ({ ...prev, description: e.target.value }))} />
                <input className="w-full rounded border px-3 py-2" placeholder="Meta keywords (comma separated)" value={seoForm.keywords} onChange={(e) => setSeoForm((prev) => ({ ...prev, keywords: e.target.value }))} />
                {seoError ? <p className="text-sm text-red-600">{seoError}</p> : null}
                <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">{editingSeoId ? "Update SEO" : "Save SEO"}</button>
              </form>

              <div>
                <h3 className="mb-2 font-semibold">SEO records</h3>
                {(seoAll.data?.items ?? []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No SEO records found.</p>
                ) : (
                  <div className="space-y-2">
                    {(seoAll.data?.items ?? []).map((item) => (
                      <div key={item.id} className="rounded border p-3">
                        <div className="mb-2 flex gap-2">
                          <button className="rounded border px-2 py-1 text-xs" onClick={() => onEditSeo(item)}>Edit</button>
                          <button className="rounded border border-red-200 px-2 py-1 text-xs text-red-600" onClick={() => deleteSeo.mutate(item.id)}>Delete</button>
                        </div>
                        <div className="mb-2 grid gap-1 text-xs">
                          <p><span className="font-medium">ID:</span> {item.id}</p>
                          <p><span className="font-medium">Path:</span> {item.path}</p>
                          <p><span className="font-medium">Title:</span> {item.title}</p>
                          <p><span className="font-medium">Description:</span> {item.description}</p>
                          <p><span className="font-medium">Keywords:</span> {item.keywords}</p>
                          <p><span className="font-medium">Created:</span> {item.created_at ?? "-"}</p>
                          <p><span className="font-medium">Updated:</span> {item.updated_at ?? "-"}</p>
                        </div>
                        <pre className="text-xs">{JSON.stringify(item.extra_meta_json ?? {}, null, 2)}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : active === "content" ? (
            <>
              <form onSubmit={submitContent} className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">{editingId ? "Update" : "Create"} Content Record</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <input className="rounded border px-3 py-2" value={form.page_path} onChange={(e) => setForm((prev) => ({ ...prev, page_path: e.target.value }))} placeholder="Page path e.g. /about" />
                  <input className="rounded border px-3 py-2" value={form.section_key} onChange={(e) => setForm((prev) => ({ ...prev, section_key: e.target.value }))} placeholder="Section key e.g. hero" />
                </div>
                <textarea className="min-h-28 w-full rounded border px-3 py-2 font-mono text-xs" value={form.content_json} onChange={(e) => setForm((prev) => ({ ...prev, content_json: e.target.value }))} />
                <textarea className="min-h-20 w-full rounded border px-3 py-2 font-mono text-xs" value={form.images_json} onChange={(e) => setForm((prev) => ({ ...prev, images_json: e.target.value }))} />
                {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
                <div className="flex gap-2">
                  <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">{editingId ? "Update" : "Create"}</button>
                  {editingId ? (
                    <button className="rounded border px-4 py-2" type="button" onClick={() => { setEditingId(null); setForm(initialForm); }}>
                      Cancel edit
                    </button>
                  ) : null}
                </div>
              </form>

              <div>
                <h3 className="mb-2 font-semibold">Content records</h3>
                {(filtered as ContentRecord[]).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No content records found.</p>
                ) : (
                  <div className="space-y-2">
                    {(filtered as ContentRecord[]).map((item) => (
                      <div key={item.id} className="rounded border p-3">
                        <div className="mb-2 flex gap-2">
                          <button className="rounded border px-2 py-1 text-xs" onClick={() => onEditContent(item)}>Edit</button>
                          <button className="rounded border border-red-200 px-2 py-1 text-xs text-red-600" onClick={() => deleteContent.mutate(item.id)}>Delete</button>
                        </div>
                        <div className="mb-2 grid gap-1 text-xs">
                          <p><span className="font-medium">ID:</span> {item.id}</p>
                          <p><span className="font-medium">Path:</span> {item.path}</p>
                          <p><span className="font-medium">Title:</span> {item.title}</p>
                          <p><span className="font-medium">Description:</span> {item.description}</p>
                          <p><span className="font-medium">Keywords:</span> {item.keywords}</p>
                          <p><span className="font-medium">Created:</span> {item.created_at ?? "-"}</p>
                          <p><span className="font-medium">Updated:</span> {item.updated_at ?? "-"}</p>
                        </div>
                        <pre className="text-xs">{JSON.stringify(item.extra_meta_json ?? {}, null, 2)}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <h3 className="mb-2 font-semibold capitalize">{active} records</h3>
              {(filtered as DummyRecord[]).length === 0 ? (
                <p className="text-sm text-muted-foreground">No records found.</p>
              ) : (
                <div className="space-y-2">
                  {(filtered as DummyRecord[]).map((item) => (
                    <div key={String(item.id)} className="rounded border p-3">
                      <div className="mb-2 grid gap-1 text-xs">
                          <p><span className="font-medium">ID:</span> {item.id}</p>
                          <p><span className="font-medium">Path:</span> {item.path}</p>
                          <p><span className="font-medium">Title:</span> {item.title}</p>
                          <p><span className="font-medium">Description:</span> {item.description}</p>
                          <p><span className="font-medium">Keywords:</span> {item.keywords}</p>
                          <p><span className="font-medium">Created:</span> {item.created_at ?? "-"}</p>
                          <p><span className="font-medium">Updated:</span> {item.updated_at ?? "-"}</p>
                        </div>
                        <pre className="text-xs">{JSON.stringify(item.extra_meta_json ?? {}, null, 2)}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
