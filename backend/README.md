# FastAPI service layer (Remote MySQL)

## Run
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Notes
- This API is designed to replace direct frontend DB calls.
- Admin login endpoint intentionally supports **non-production security mode** (UI-gated credentials).
- For production, replace with real auth (JWT/session + RBAC).
