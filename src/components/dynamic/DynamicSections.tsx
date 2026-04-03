import type { ContentRecord } from "@/api/types";

const sectionRenderers: Record<string, (section: ContentRecord) => JSX.Element> = {
  hero: (section) => (
    <section className="rounded-xl bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold">{String(section.content_json.title ?? "Hero")}</h1>
      <p className="mt-3 text-slate-200">{String(section.content_json.subtitle ?? "")}</p>
    </section>
  ),
  main: (section) => (
    <section className="prose max-w-none" dangerouslySetInnerHTML={{ __html: String(section.content_json.html ?? "") }} />
  ),
  post_body: (section) => (
    <section className="prose max-w-none" dangerouslySetInnerHTML={{ __html: String(section.content_json.html ?? "") }} />
  ),
  features: (section) => {
    const list = Array.isArray(section.content_json.features) ? section.content_json.features : [];
    return (
      <section>
        <h2 className="mb-4 text-xl font-semibold">Features</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {list.map((item, index) => (
            <li key={index} className="rounded-lg border p-4">
              {String(item)}
            </li>
          ))}
        </ul>
      </section>
    );
  },
};

export function DynamicSections({ sections }: { sections: ContentRecord[] }) {
  const visualSections = sections.filter((section) => section.section_key !== "seo");

  return (
    <div className="space-y-6">
      {visualSections.map((section) => {
        const render = sectionRenderers[section.section_key];
        if (!render) return null;
        return <div key={section.id}>{render(section)}</div>;
      })}
    </div>
  );
}
