import { useContentByPath } from "@/api/hooks";
import { SeoHead } from "@/components/seo/SeoHead";

const HOME_KEYS = ["hero", "about_us", "services", "global_presence", "quick_enquiry"];

export default function HomeDynamic() {
  const { data, isLoading } = useContentByPath("/");

  if (isLoading) return <div className="p-8">Loading homepage content...</div>;

  const sections = data?.items.filter((row) => HOME_KEYS.includes(row.section_key)) ?? [];

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <SeoHead path="/" />
      {sections.length === 0 ? (
        <p className="text-muted-foreground">No homepage content found in CMS.</p>
      ) : (
        sections.map((section) => (
          <section key={section.id} className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold capitalize">{section.section_key.replaceAll("_", " ")}</h2>
            <pre className="mt-3 overflow-auto rounded bg-slate-50 p-4 text-sm">{JSON.stringify(section.content_json, null, 2)}</pre>
          </section>
        ))
      )}
    </main>
  );
}
