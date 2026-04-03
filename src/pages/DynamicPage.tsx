import { useLocation } from "react-router-dom";

import { useContentByPath } from "@/api/hooks";
import { DynamicSections } from "@/components/dynamic/DynamicSections";
import { SeoHead } from "@/components/seo/SeoHead";
import NotFound from "./NotFound";

export default function DynamicPage() {
  const { pathname } = useLocation();
  const { data, isLoading } = useContentByPath(pathname);

  if (isLoading) return <div className="p-8">Loading page...</div>;

  const sections = data?.items ?? [];
  if (!sections.length) return <NotFound />;

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <SeoHead path={pathname} />
      <DynamicSections sections={sections} />
    </main>
  );
}
