export type Paginated<T> = {
  items: T[];
  page: number;
  page_size: number;
  total: number;
};

export type PageRecord = {
  id: number;
  path: string;
  component_key: string;
};

export type ContentRecord = {
  id: number;
  page_path: string;
  section_key: string;
  content_json: Record<string, unknown>;
  images_json: Record<string, unknown>;
};

export type SeoRecord = {
  id: number;
  path: string;
  title: string;
  description: string;
  keywords: string;
  extra_meta_json: Record<string, string>;
};

export type HeaderRecord = {
  id: number;
  label: string;
  url: string;
  sort_order: number;
  is_active: boolean;
};

export type LocationRecord = {
  id: number;
  name: string;
  address: string;
  country: string;
  phone: string;
  email: string;
  lat?: number;
  lng?: number;
};
