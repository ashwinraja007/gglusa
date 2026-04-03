import { useMemo, useState } from "react";

import { useAdminCollections, useCreateRecord, useDeleteRecord } from "@/api/hooks";
import { nonProductionSecurityWarning } from "@/config/adminAuth";
import { useToast } from "@/hooks/use-toast";

type Module = "seo" | "content" | "pages" | "headers" | "locations";

const modules: Module[] = ["seo", "content", "pages", "headers", "locations"];

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState<Module>("seo");
  const [search, setSearch] = useState("");
  const [payload, setPayload] = useState("{}");
  const { toast } = useToast();
  const data = useAdminCollections(search);
  const createMutation = useCreateRecord(active);
  const deleteMutation = useDeleteRecord(active);

  const counters = useMemo(
    () => ({
      pages: data.pages.data?.total ?? 0,
      headers: data.headers.data?.total ?? 0,
      locations: data.locations.data?.total ?? 0,
    }),
    [data.headers.data?.total, data.locations.data?.total, data.pages.data?.total],
  );

  const activeRecords = (data[active].data?.items ?? []) as Array<Record<string, unknown>>;

  const onCreate = async () => {
    try {
      const parsed = JSON.parse(payload);
      await createMutation.mutateAsync(parsed);
      toast({ title: "Created", description: `${active} record created.` });
    } catch (error) {
      toast({ title: "Create failed", description: String(error), variant: "destructive" });
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "Deleted", description: `${active} #${id} deleted.` });
    } catch (error) {
      toast({ title: "Delete failed", description: String(error), variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <p className="mb-3 rounded border border-amber-400 bg-amber-100 p-3 text-sm text-amber-900">{nonProductionSecurityWarning}</p>
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border bg-white p-4">
          <h2 className="mb-3 font-semibold">Admin</h2>
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
            <span className="text-sm text-muted-foreground">Module: {active}</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Create / edit JSON payload</label>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              rows={7}
              className="w-full rounded border p-3 font-mono text-sm"
            />
            <button onClick={onCreate} className="rounded bg-slate-900 px-4 py-2 text-white">Save payload</button>
          </div>

          <div>
            <h3 className="mb-2 font-semibold capitalize">{active} records</h3>
            {!data[active].data ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : activeRecords.length === 0 ? (
              <p className="text-sm text-muted-foreground">No records found.</p>
            ) : (
              <div className="space-y-2">
                {activeRecords.map((item) => (
                  <div key={String(item.id)} className="flex items-start justify-between gap-3 rounded border p-3">
                    <pre className="max-h-56 overflow-auto text-xs">{JSON.stringify(item, null, 2)}</pre>
                    <button onClick={() => onDelete(Number(item.id))} className="rounded border px-3 py-1 text-sm">Delete</button>
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
