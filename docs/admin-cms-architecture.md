# Admin CMS + Public Website Architecture (FastAPI + Remote MySQL)

## A) High-level architecture

- **Frontend (React + Vite + TypeScript)**
  - Public routes include static pages and DB-driven dynamic pages.
  - `/admin` uses condition-based UI login gate (`localStorage` flag `admin-authenticated`).
  - Admin modules: SEO, content, page router, headers, locations.
  - TanStack Query handles caching/invalidation for CRUD actions.
- **Backend (FastAPI)**
  - `/api/v1/*` async endpoints via SQLAlchemy 2.0 + `aiomysql`.
  - Filtering + pagination for list endpoints.
  - Validation with Pydantic schemas.
  - Optional Redis layer for response caching of read-heavy endpoints.
- **Database (Remote MySQL)**
  - Normalized tables for `pages`, `content`, `seo_records`, `headers`, `locations`.

> Security warning: current admin login is **non-production security mode** (UI gating only). Backend endpoints are not strongly protected.

## B) Full DB schema SQL for MySQL

See: `backend/sql/schema.sql`.

## C) FastAPI folder structure + starter code

```text
backend/
  app/
    api/v1/endpoints/resources.py
    core/config.py
    db/models.py
    db/session.py
    schemas/resources.py
    schemas/common.py
    services/crud.py
    main.py
  sql/schema.sql
  requirements.txt
  README.md
```

Highlights:
- Endpoint groups implemented:
  - `/api/v1/pages`
  - `/api/v1/content`
  - `/api/v1/seo`
  - `/api/v1/headers`
  - `/api/v1/locations`
  - `/api/v1/admin/session`
- Image upload placeholder endpoint: `/api/v1/content/upload-image`.

## D) React admin folder structure + starter code

```text
src/
  api/
    client.ts
    hooks.ts
    types.ts
  config/
    adminAuth.ts
  components/
    dynamic/DynamicSections.tsx
    seo/SeoHead.tsx
  pages/
    Admin.tsx
    admin/AdminPanel.tsx
    HomeDynamic.tsx
    DynamicPage.tsx
    DynamicRouteResolver.tsx
```

Highlights:
- Static routes always available.
- Dynamic route resolver checks `pages` table via API and skips static-route conflicts.
- Homepage binds section keys: `hero`, `about_us`, `services`, `global_presence`, `quick_enquiry`.
- Dynamic renderer supports `hero`, `main`, `post_body`, `features`; excludes `seo` from visual output.
- `/admin` login gate:
  - state: `isAuthenticated`
  - storage: `admin-authenticated`
  - local/env credential check + optional API check.

## E) API contracts (request/response examples)

### `GET /api/v1/pages?page=1&page_size=20&q=about`
```json
{
  "items": [{ "id": 1, "path": "/about-us", "component_key": "dynamic_page" }],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

### `POST /api/v1/pages`
```json
{ "path": "/custom-page", "component_key": "dynamic_page" }
```

### `GET /api/v1/content?page_path=/`
```json
{
  "items": [
    { "id": 1, "page_path": "/", "section_key": "hero", "content_json": {"title":"..."}, "images_json": {} }
  ],
  "page": 1,
  "page_size": 500,
  "total": 1
}
```

### `POST /api/v1/seo`
```json
{
  "path": "/about",
  "title": "About",
  "description": "About page",
  "keywords": "about,company",
  "extra_meta_json": { "og:type": "website" }
}
```

### `POST /api/v1/admin/session`
```json
{ "username": "admin", "password": "admin123" }
```
Response:
```json
{ "success": true, "mode": "non-production security mode" }
```

## F) Step-by-step migration guide (Supabase direct calls -> FastAPI)

1. **Inventory all direct DB calls** in frontend.
2. **Map each call** to a FastAPI endpoint (`pages`, `content`, `seo`, etc.).
3. **Create frontend API client** (`apiFetch`) and typed models.
4. **Replace Supabase hooks** with TanStack Query hooks calling FastAPI.
5. **Preserve route logic**:
   - keep static routes hard-coded,
   - fetch dynamic routes from `/pages`,
   - ignore collisions with static routes.
6. **Move SEO handling** from inline/static metadata to `/seo` records + runtime `SeoHead` application.
7. **Implement admin CRUD** over HTTP only (no DB client in browser).
8. **Add image upload endpoint** integration and return storage URL in `images_json`.
9. **Run dual mode rollout** (feature flag): old path + new API path.
10. **Cutover + cleanup** once parity verified.

## G) Production hardening checklist

- Replace UI-only login with real backend auth (JWT/session + password hashing).
- Add RBAC for admin modules.
- Require HTTPS + secure cookies + CSRF strategy if cookie auth.
- Add rate limiting and IP throttling on auth + write endpoints.
- Add input sanitization + HTML sanitization for `post_body` rendering.
- Add audit logs for CRUD operations.
- Add structured logging + tracing.
- Restrict CORS to trusted origins.
- Configure Redis cache TTL + cache-busting policy.
- Add DB migrations (Alembic), backups, and replication strategy.
