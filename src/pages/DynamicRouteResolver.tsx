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
  "/admin",
]);

export default function DynamicRouteResolver() {
  const { pathname } = useLocation();
  const { data, isLoading } = usePages();

  if (isLoading) return <div className="p-8">Resolving route...</div>;

  if (STATIC_ROUTES.has(pathname)) return <NotFound />;

  const match = data?.items.find((page) => page.path === pathname && !STATIC_ROUTES.has(page.path));

  if (!match) return <NotFound />;

  return <DynamicPage />;
}
