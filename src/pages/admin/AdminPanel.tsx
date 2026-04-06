import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAdminCollections, useCreateRecord, useDeleteRecord, useUpdateRecord } from "@/api/hooks";
import { apiFetch } from "@/api/client";
import type { ContentRecord, SeoRecord } from "@/api/types";

type Module = "seo" | "content";

type SeoFormState = {
  path: string;
  title: string;
  description: string;
  keywords: string;
};

type ContentFormState = {
  page_path: string;
  section_key: string;
  content_json: string;
  images_json: string;
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

const initialSeoForm: SeoFormState = {
  path: "/",
  title: "",
  description: "",
  keywords: "",
};

const initialContentForm: ContentFormState = {
  page_path: "/about",
  section_key: "hero",
  content_json: '{"title":"About GGL","subtitle":"Update me"}',
  images_json: '{"hero_image":"/lovable-uploads/41795fb5-562d-45d1-a8d3-f26724bc079b.png"}',
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
  const seoItems = seoAll.data?.items?.length ? seoAll.data.items : (seo.data?.items ?? []);

  const createContent = useCreateRecord("content");
  const deleteContent = useDeleteRecord("content");
  const updateContent = useUpdateRecord("content");
  const upsertSeo = useCreateRecord("seo");
  const updateSeo = useUpdateRecord("seo");
  const deleteSeo = useDeleteRecord("seo");


  const [seoForm, setSeoForm] = useState<SeoFormState>(initialSeoForm);
  const [seoError, setSeoError] = useState("");
  const [editingSeoId, setEditingSeoId] = useState<number | null>(null);

  const [contentForm, setContentForm] = useState<ContentFormState>(initialContentForm);
  const [contentError, setContentError] = useState("");
  const [editingContentId, setEditingContentId] = useState<number | null>(null);

  const collections = useAdminCollections(search);
  const seoAll = useQuery({
    queryKey: ["seo", "all-records"],
    queryFn: () => apiFetch<{ items: SeoRecord[]; total: number }>("/seo?page=1&page_size=500"),
    refetchInterval: 10000,
  });

  const seoItems = seoAll.data?.items ?? [];
  const contentItems = collections.content.data?.items ?? [];

  const upsertSeo = useCreateRecord("seo");
  const updateSeo = useUpdateRecord("seo");
  const deleteSeo = useDeleteRecord("seo");

  const createContent = useCreateRecord("content");
  const updateContent = useUpdateRecord("content");
  const deleteContent = useDeleteRecord("content");

  useEffect(() => {
    const existing = seoItems.find((item) => item.path === seoForm.path);
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
      setSeoError("Unable to save SEO record.");
    }
  };

  const submitContent = async (event: FormEvent) => {
    event.preventDefault();
    setContentError("");

    try {
      const payload = {
        page_path: contentForm.page_path,
        section_key: contentForm.section_key,
        content_json: JSON.parse(contentForm.content_json),
        images_json: JSON.parse(contentForm.images_json),
      };

      if (editingContentId) {
        await updateContent.mutateAsync({ id: editingContentId, payload });
      } else {
        await createContent.mutateAsync(payload);
      }

      setEditingContentId(null);
      setContentForm(initialContentForm);
    } catch {
      setContentError("Invalid JSON in content fields.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 font-semibold">Admin Panel</h2>
          <button className="mb-3 rounded border px-3 py-1 text-sm" onClick={onLogout}>Logout</button>
          <div className="space-y-2">
            <button className={`block w-full rounded px-3 py-2 text-left ${active === "seo" ? "bg-slate-900 text-white" : "bg-slate-100"}`} onClick={() => setActive("seo")}>Seo</button>
            <button className={`block w-full rounded px-3 py-2 text-left ${active === "content" ? "bg-slate-900 text-white" : "bg-slate-100"}`} onClick={() => setActive("content")}>Content</button>
          </div>
        </aside>

        <section className="space-y-4 rounded-xl border bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-5">
            <div className="rounded border p-3">Pages: {collections.pages.data?.total ?? 0}</div>
            <div className="rounded border p-3">Headers: {collections.headers.data?.total ?? 0}</div>
            <div className="rounded border p-3">Locations: {collections.locations.data?.total ?? 0}</div>
            <div className="rounded border p-3">Content: {collections.content.data?.total ?? 0}</div>
            <div className="rounded border p-3">SEO: {seoAll.data?.total ?? collections.seo.data?.total ?? 0}</div>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search/filter records"
            className="w-full max-w-sm rounded border px-3 py-2"
          />

          {active === "seo" ? (
            <>
              <form onSubmit={submitSeo} className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">SEO CRUD (MySQL)</h3>
                <select className="w-full rounded border px-3 py-2" value={seoForm.path} onChange={(e) => setSeoForm((prev) => ({ ...prev, path: e.target.value, title: "", description: "", keywords: "" }))}>
                  {seoPaths.map((path) => (
                    <option key={path} value={path}>{path}</option>
                  ))}
                </select>
                <input className="w-full rounded border px-3 py-2" placeholder="Meta title" value={seoForm.title} onChange={(e) => setSeoForm((prev) => ({ ...prev, title: e.target.value }))} />
                <textarea className="min-h-20 w-full rounded border px-3 py-2" placeholder="Meta description" value={seoForm.description} onChange={(e) => setSeoForm((prev) => ({ ...prev, description: e.target.value }))} />
                <input className="w-full rounded border px-3 py-2" placeholder="Meta keywords" value={seoForm.keywords} onChange={(e) => setSeoForm((prev) => ({ ...prev, keywords: e.target.value }))} />
                {seoError ? <p className="text-sm text-red-600">{seoError}</p> : null}
                <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">{editingSeoId ? "Update SEO" : "Save SEO"}</button>
              </form>

              <div>
                <h3 className="mb-2 font-semibold">SEO records (real-time)</h3>
                {seoItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No SEO records found.</p>
                ) : (
                  <div className="space-y-2">
                    {seoItems.map((item) => (
                      <div key={item.id} className="rounded border p-3">
                        <div className="mb-2 flex gap-2">
                          <button className="rounded border px-2 py-1 text-xs" onClick={() => {
                            setEditingSeoId(item.id);
                            setSeoForm({ path: item.path, title: item.title, description: item.description, keywords: item.keywords });
                          }}>Edit</button>
                          <button className="rounded border border-red-200 px-2 py-1 text-xs text-red-600" onClick={() => deleteSeo.mutate(item.id)}>Delete</button>
                        </div>
                        <pre className="text-xs">{JSON.stringify(item, null, 2)}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <form onSubmit={submitContent} className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">Content CRUD (MySQL)</h3>
                <input className="w-full rounded border px-3 py-2" value={contentForm.page_path} onChange={(e) => setContentForm((prev) => ({ ...prev, page_path: e.target.value }))} />
                <input className="w-full rounded border px-3 py-2" value={contentForm.section_key} onChange={(e) => setContentForm((prev) => ({ ...prev, section_key: e.target.value }))} />
                <textarea className="min-h-24 w-full rounded border px-3 py-2 font-mono text-xs" value={contentForm.content_json} onChange={(e) => setContentForm((prev) => ({ ...prev, content_json: e.target.value }))} />
                <textarea className="min-h-20 w-full rounded border px-3 py-2 font-mono text-xs" value={contentForm.images_json} onChange={(e) => setContentForm((prev) => ({ ...prev, images_json: e.target.value }))} />
                {contentError ? <p className="text-sm text-red-600">{contentError}</p> : null}
                <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">{editingContentId ? "Update Content" : "Save Content"}</button>
              </form>

              <div>
                <h3 className="mb-2 font-semibold">Content records (real-time)</h3>
                {contentItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No content records found.</p>
                ) : (
                  <div className="space-y-2">
                    {contentItems.map((item: ContentRecord) => (
                      <div key={item.id} className="rounded border p-3">
                        <div className="mb-2 flex gap-2">
                          <button className="rounded border px-2 py-1 text-xs" onClick={() => {
                            setEditingContentId(item.id);
                            setContentForm({
                              page_path: item.page_path,
                              section_key: item.section_key,
                              content_json: JSON.stringify(item.content_json, null, 2),
                              images_json: JSON.stringify(item.images_json ?? {}, null, 2),
                            });
                          }}>Edit</button>
                          <button className="rounded border border-red-200 px-2 py-1 text-xs text-red-600" onClick={() => deleteContent.mutate(item.id)}>Delete</button>
                        </div>
                        <pre className="text-xs">{JSON.stringify(item, null, 2)}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
