import { useLocation } from "react-router-dom";

import { usePages } from "@/api/hooks";
import DynamicPage from "./DynamicPage";
import NotFound from "./NotFound";

const STATIC_ROUTES = new Set([
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
  "/admin",
]);

export default function DynamicRouteResolver() {
  const { pathname } = useLocation();
  const { data, isLoading, isError } = usePages();

  if (STATIC_ROUTES.has(pathname)) return <NotFound />;
  if (isLoading) return <div className="p-8">Resolving route...</div>;
  if (isError) return <NotFound />;

  const match = data?.items.find((page) => page.path === pathname && !STATIC_ROUTES.has(page.path));

  if (!match) return <NotFound />;

  return <DynamicPage />;
}
