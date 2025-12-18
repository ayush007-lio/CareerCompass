# Fusion Starter — Stellar Landing

✨ **A polished, production-ready React + Express starter** with TypeScript, Vite, TailwindCSS, and an AI-powered roadmap feature.

---

## 🚀 Quick summary

Fusion Starter is a full-stack SPA template designed for fast development and production readiness. It ships a React 18 frontend (Vite + TypeScript + Tailwind), an integrated Express backend for API routes, a set of reusable UI components, and an AI-based roadmap generator that uses OpenAI to create structured career roadmaps.

Key highlights:
- Fast dev feedback loop (Vite + Express dev server) ✅
- Type-safe shared types between client & server ✅
- Pre-built UI primitives and pages ✅
- AI Roadmap endpoint (uses `OPENAI_API_KEY`) ✅

---

## 🧭 Project structure

```
client/                   # React SPA
  ├── pages/              # Route components (Index.tsx = home)
  └── components/         # UI components & utilities
server/                   # Express API backend
  ├── routes/             # API handlers
  └── services/           # Business logic (AI generator)
shared/                   # Types shared by frontend & backend
.env                      # Public env config
.env.local                # Local secrets (ignored by git)
```

---

## ⚙️ Prerequisites

- Node.js (recommended LTS, e.g., 18 or 20)
- Git (if you plan to clone this repo)
- pnpm (recommended)

If pnpm is not installed, enable or install via Corepack (recommended):

PowerShell / macOS / Linux:
```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

Or install pnpm directly:
```bash
npm i -g pnpm
```

> If you'd rather use npm, the scripts still work via `npm run <script>`.

---

## 🔧 Configuration & secrets

This project reads environment variables using `dotenv` on the server.

Important env variables:
- `OPENAI_API_KEY` — **required** for `/api/roadmap` (AI roadmap generator)
- `VITE_PUBLIC_BUILDER_KEY` — example public key used by the demo
- `PING_MESSAGE` — optional, custom reply for `/api/ping`

Best practice (local development):
1. Create a `.env.local` file in the project root (this repo includes `.env.local` in `.gitignore`):

```env
# .env.local (do NOT commit or share)
OPENAI_API_KEY=sk-<your-openai-key>
```

2. Restart the dev server after changing env vars.

Security notes:
- **Do not commit** secret keys. Rotate any key that was accidentally exposed.
- In production add env vars in your host (Netlify/ Vercel / Docker / Azure app settings).

---

## 🧪 Scripts (what they do)

| Script | Command | Purpose |
|---|---:|---|
| dev | `pnpm dev` | Start Vite dev server (client + hot server integration) |
| build | `pnpm build` | Build client and server bundles for production |
| start | `pnpm start` | Start the production server from `dist` |
| test | `pnpm test` | Run tests (Vitest) |
| typecheck | `pnpm typecheck` | Run TypeScript checks |

Use npm instead of pnpm if needed: `npm run dev`.

---

## ▶️ Run locally (step-by-step)

1) Clone repo and install deps
```bash
git clone <repo-url>
cd stellar-landing
pnpm install
```

2) Configure env
```bash
# create .env.local (not committed)
# add your OpenAI key
# OPENAI_API_KEY=sk-<your-key>
```

3) Start dev server
```bash
pnpm dev
```

4) Open the app in your browser
- Default Vite URL: `http://localhost:5173`
- Express API endpoints live under `/api` (same origin when using the integrated dev server)

---

## 🧠 AI Roadmap API

- Endpoint: `POST /api/roadmap`
- Request body: `{ "role": "Frontend Developer" }` (server code does `jobRole` param)
- Requires `OPENAI_API_KEY` to be set (the server will throw a clear error when missing).

Example (curl):
```bash
curl -X POST http://localhost:5173/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{"role": "Data Engineer"}'
```

---

## ✅ Deployment

This starter is ready for standard static+server hosting setups. Recommendations:
- Build: `pnpm build`
- Start server from `dist` (example: `pnpm start` or `node dist/server/node-build.mjs`)

Host on platforms like Netlify or Vercel and configure server functions or a separate Node host for the Express server. Set `OPENAI_API_KEY` in your host's environment settings — do NOT commit secrets.

---

## 🐞 Troubleshooting

- pnpm not found: enable corepack or `npm i -g pnpm`.
- `OPENAI_API_KEY` missing: server throws: `OPENAI_API_KEY environment variable is not set. Please set your OpenAI API key.`
- Port conflict: change `PORT` env or server code if necessary.

---

## ♻️ Best practices & tips

- Keep secrets in `.env.local` or host env variables, never commit them.
- Restart dev server after env changes.
- Add new pages in `client/pages/` and register routes in `client/App.tsx`.
- Use `shared/api.ts` for shared type safety between client and server.

---

## 🙌 Contributing

Contributions are welcome — open issues or PRs. Keep changes focused, add tests when relevant, and follow the existing TypeScript conventions.

---

## 📄 License

Open source / MIT (or modify to your preferred license).

---

Thanks for using Fusion Starter! ✨

If you'd like, I can also:
- Start the dev server now and show logs (say: **Start dev server**), or
- Add example Postman/Insomnia collection for the API (say: **Add API collection**)

Happy building! 🚀
