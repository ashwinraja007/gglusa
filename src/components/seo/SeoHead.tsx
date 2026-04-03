import { useEffect } from "react";

import { useSeoByPath } from "@/api/hooks";

const upsertMeta = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name=\"${name}\"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

export function SeoHead({ path }: { path: string }) {
  const { data } = useSeoByPath(path);

  useEffect(() => {
    if (!data) return;
    document.title = data.title;
    upsertMeta("description", data.description);
    upsertMeta("keywords", data.keywords);

    Object.entries(data.extra_meta_json ?? {}).forEach(([name, value]) => {
      upsertMeta(name, String(value));
    });
  }, [data]);

  return null;
}
