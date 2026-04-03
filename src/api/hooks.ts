import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "./client";
import type {
  ContentRecord,
  HeaderRecord,
  LocationRecord,
  PageRecord,
  Paginated,
  SeoRecord,
} from "./types";

const key = {
  pages: ["pages"],
  content: ["content"],
  seo: ["seo"],
  headers: ["headers"],
  locations: ["locations"],
};

export const usePages = (q = "") =>
  useQuery({
    queryKey: [...key.pages, q],
    queryFn: () => apiFetch<Paginated<PageRecord>>(`/pages?q=${encodeURIComponent(q)}`),
  });

export const useContentByPath = (path: string) =>
  useQuery({
    queryKey: [...key.content, path],
    queryFn: () => apiFetch<Paginated<ContentRecord>>(`/content?page_path=${encodeURIComponent(path)}`),
  });

export const useSeoByPath = (path: string) =>
  useQuery({
    queryKey: [...key.seo, path],
    queryFn: async () => {
      const rows = await apiFetch<Paginated<SeoRecord>>(`/seo?q=${encodeURIComponent(path)}`);
      return rows.items.find((item) => item.path === path) ?? null;
    },
  });

export const useAdminCollections = (q = "") => {
  const pages = useQuery({ queryKey: [...key.pages, "admin", q], queryFn: () => apiFetch<Paginated<PageRecord>>(`/pages?q=${encodeURIComponent(q)}`) });
  const content = useQuery({ queryKey: [...key.content, "admin", q], queryFn: () => apiFetch<Paginated<ContentRecord>>(`/content?q=${encodeURIComponent(q)}`) });
  const seo = useQuery({ queryKey: [...key.seo, "admin", q], queryFn: () => apiFetch<Paginated<SeoRecord>>(`/seo?q=${encodeURIComponent(q)}`) });
  const headers = useQuery({ queryKey: [...key.headers, "admin", q], queryFn: () => apiFetch<Paginated<HeaderRecord>>(`/headers?q=${encodeURIComponent(q)}`) });
  const locations = useQuery({ queryKey: [...key.locations, "admin", q], queryFn: () => apiFetch<Paginated<LocationRecord>>(`/locations?q=${encodeURIComponent(q)}`) });

  return { pages, content, seo, headers, locations };
};

export const useCreateRecord = (resource: "pages" | "content" | "seo" | "headers" | "locations") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: unknown) => apiFetch(`/${resource}`, { method: "POST", body: JSON.stringify(payload) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
};

export const useDeleteRecord = (resource: "pages" | "content" | "seo" | "headers" | "locations") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch(`/${resource}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
};

export const loginViaApi = (username: string, password: string) =>
  apiFetch<{ success: boolean; mode: string }>("/admin/session", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
