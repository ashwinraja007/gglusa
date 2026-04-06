import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSeoByPath } from "@/api/hooks";

type MetaRecord = {
  title: string;
  description: string;
  keywords: string;
};

const defaultMeta: MetaRecord = {
  title: "GGL USA | Global Logistics Solutions",
  description:
    "GGL USA provides global logistics services including air freight, ocean freight, warehousing, transportation, customs clearance, and project cargo.",
  keywords: "GGL, logistics, freight forwarding, warehousing, transportation, customs, cargo",
};

const routeFallbackMeta: Record<string, MetaRecord> = {
  "/": {
    title: "GGL USA | Global Logistics Solutions",
    description:
      "Reliable global logistics partner for air, ocean, warehousing, transportation, customs clearance, and integrated supply chain services.",
    keywords: "global logistics, freight forwarding, supply chain, GGL USA",
  },
  "/about": {
    title: "About GGL USA | Logistics & Freight Expertise",
    description:
      "Learn about GGL USA, our global logistics network, service capabilities, and customer-first supply chain solutions.",
    keywords: "about GGL, logistics company, freight expertise, global network",
  },
};

const setMetaTag = (name: string, content: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[name=\"${name}\"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

export function RouteMeta() {
  const { pathname } = useLocation();
  const { data: dbSeo } = useSeoByPath(pathname);

  useEffect(() => {
    const fallback = routeFallbackMeta[pathname] ?? defaultMeta;
    const meta = dbSeo
      ? {
          title: dbSeo.title,
          description: dbSeo.description,
          keywords: dbSeo.keywords,
        }
      : fallback;

    document.title = meta.title;
    setMetaTag("description", meta.description);
    setMetaTag("keywords", meta.keywords);
  }, [dbSeo, pathname]);

  return null;
}
