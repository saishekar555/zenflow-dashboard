<div align="center">

# �ern ZenFlow Dashboard

### ⚡ Enterprise-Grade Analytics Dashboard · React + Vite · Azure Cloud · Azure DevOps CI/CD

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-App%20Service-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Azure DevOps](https://img.shields.io/badge/Azure%20DevOps-Pipelines-0078D7?style=for-the-badge&logo=azuredevops&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-2ea44f?style=for-the-badge&logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=githubactions&logoColor=white)

> A modern, enterprise-ready productivity & analytics dashboard — built for speed, designed for scale, deployed the DevOps way.

</div>

---

## 🌐 Live Demo

| Resource | Link |
|---|---|
| 🚀 **Live Website** | [https://zenflow.azurewebsites.net](https://zenflow.azurewebsites.net) |
| ☁️ **Azure Deployment URL** | `https://zenflow.azurewebsites.net` |
| 💻 **GitHub Repository** | [github.com/saishekar555/zenflow-dashboard](https://github.com/saishekar555/zenflow-dashboard) |

---

## 📖 Project Overview

**ZenFlow Dashboard** is a production-grade analytics & productivity dashboard built to demonstrate the **full lifecycle of a modern enterprise web app** — from frontend engineering to cloud deployment with automated CI/CD.

### 🎯 Business Use Case
Modern teams need a single pane of glass to track **tasks, goals, projects, and KPIs** without the bloat of heavyweight enterprise tools. ZenFlow delivers this with a fast, responsive, and beautiful UI — deployable to any cloud in minutes.

### 💡 Why This Dashboard Was Created
- To showcase **end-to-end DevOps** on Microsoft Azure
- To demonstrate **production-ready React architecture** with Vite
- To serve as a **portfolio-grade reference project** for cloud + frontend engineering
- To prove real-world **CI/CD automation** with Azure DevOps Classic Pipelines

### 🏢 Enterprise Relevance
The patterns used here — modular components, environment-based config, automated pipelines, artifact-based releases, and Azure App Service hosting — are the **same patterns used by Fortune 500 engineering teams** shipping React apps at scale.

---

## ✨ Key Features

- ✅ Responsive, modern dashboard UI
- 📊 Real-time analytics widgets
- 🌗 Dark / Light mode support
- 🧲 Drag-and-drop components (JSON backup restore)
- 🔐 Authentication-ready structure
- 🧩 Reusable component architecture
- 🔌 API-ready integration layer
- ⚡ Optimized Vite production build
- ☁️ Azure App Service deployment
- 🔁 Azure DevOps CI/CD pipeline
- 🗂️ Git/GitHub version control
- 🌱 Environment-based configurations
- 🏗️ Production-ready folder structure
- 🛡️ Centralized error handling system
- 💤 Lazy loading & code-splitting
- 📱 Mobile-first responsive design
- 📈 Scalable architecture

---

## 🏛️ Architecture Diagram

```text
   ┌────────────┐     ┌──────────┐     ┌─────────────────────┐
   │ Developer  │ ──▶ │  GitHub  │ ──▶ │ Azure DevOps Pipeline│
   └────────────┘     └──────────┘     └──────────┬──────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │   Build (CI) │
                                          │  npm install │
                                          │  npm run build│
                                          └──────┬───────┘
                                                 │ artifact (app.zip)
                                                 ▼
                                       ┌────────────────────┐
                                       │ Release Pipeline   │
                                       │       (CD)         │
                                       └─────────┬──────────┘
                                                 ▼
                                       ┌────────────────────┐
                                       │ Azure Linux Web App│
                                       │   (App Service)    │
                                       └─────────┬──────────┘
                                                 ▼
                                       ┌────────────────────┐
                                       │   Live Production  │
                                       └────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite 7** | Lightning-fast build tool |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |

### DevOps & Cloud
| Tool | Purpose |
|---|---|
| **Azure App Service (Linux)** | Production hosting |
| **Azure DevOps** | CI/CD orchestration |
| **Classic Build Pipeline** | Continuous Integration |
| **Classic Release Pipeline** | Continuous Deployment |
| **GitHub Actions (concepts)** | Alternative CI reference |

### Tools
- Git · GitHub · npm · VS Code · PM2 (SPA serve)

---

## 📂 Folder Structure

```text
zenflow-dashboard/
├── public/                 # Static assets (favicon, robots.txt)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Card.tsx
│   │   └── Layout.tsx
│   ├── pages/              # Route-level pages
│   │   ├── Dashboard.tsx
│   │   ├── Tasks.tsx
│   │   ├── Notes.tsx
│   │   ├── Goals.tsx
│   │   ├── Projects.tsx
│   │   └── Settings.tsx
│   ├── lib/                # Utilities, hooks, storage, theme
│   │   ├── storage.ts
│   │   ├── theme.ts
│   │   └── utils.ts
│   ├── App.tsx             # Root app component
│   ├── main.tsx            # Vite entry point
│   ├── styles.css          # Global styles + design tokens
│   └── vite-env.d.ts
├── index.html              # Vite HTML shell
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📸 Screenshots

| View | Preview |
|---|---|
| 🏠 **Dashboard Home** | _![Dashboard](./docs/screenshots/dashboard.png)_ |
| 📊 **Analytics Page** | _![Analytics](./docs/screenshots/analytics.png)_ |
| 📱 **Mobile View** | _![Mobile](./docs/screenshots/mobile.png)_ |
| ☁️ **Azure Deployment** | _![Azure](./docs/screenshots/azure.png)_ |
| ✅ **Pipeline Success** | _![Pipeline](./docs/screenshots/pipeline.png)_ |

> _Add your real screenshots under `docs/screenshots/`._

---

## 🧑‍💻 Installation Guide

```bash
# 1. Clone the repository
git clone https://github.com/saishekar555/zenflow-dashboard.git
cd zenflow-dashboard

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

App will be available at **http://localhost:5173**

---

## 🏗️ Production Build

```bash
npm run build
```

This generates the optimized static bundle in the **`dist/`** directory:

```text
dist/
├── index.html         # Hashed entrypoint
└── assets/            # JS, CSS, images (content-hashed)
```

Preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Azure Deployment Steps

> 🧱 **Dist-only deployment:** Only the contents of the `dist/` folder are shipped to Azure. Source code, `node_modules`, and dev tooling never reach the web app — the build is fully static (`dist/index.html` + `dist/assets/`).

| Step | Action |
|---|---|
| **1️⃣** | Create an **Azure Linux Web App** (Node 22 LTS) inside a resource group (`zenflow-rg`) |
| **2️⃣** | Create an **Azure Service Connection** in Azure DevOps (ARM, scoped to the subscription) |
| **3️⃣** | Configure a **Classic Build Pipeline** → Node installer → `npm install` → `npm run build` → **archive only `dist/`** (root folder = `$(System.DefaultWorkingDirectory)/dist`) → publish artifact as `app.zip` |
| **4️⃣** | Configure a **Classic Release Pipeline** with the build artifact as source, CD trigger enabled |
| **5️⃣** | Add an **Azure App Service Deploy** task pointing to `app.zip` (contents: `index.html` + `assets/`), then deploy to production |

**Archive task config (Classic Pipeline):**

```yaml
Root folder or file to archive: $(System.DefaultWorkingDirectory)/dist
Archive type:                   zip
Archive file to create:         $(Build.ArtifactStagingDirectory)/app.zip
Prepend root folder name:       false   # ship dist contents at zip root
```

Startup command for SPA hosting on Linux App Service (serves `dist/` contents from `/home/site/wwwroot`):

```bash
pm2 serve /home/site/wwwroot --no-daemon --spa
```

---

## 🔁 CI/CD Workflow

### Continuous Integration (CI)
- Triggered on every push to `main`
- Installs dependencies, builds Vite app
- Packages `dist/` into `app.zip`
- Publishes artifact for the release pipeline

### Continuous Deployment (CD)
- Auto-triggered on successful build
- Downloads artifact
- Deploys to **Azure Linux Web App** via Service Connection
- Zero-downtime release

```text
git push  →  CI build  →  artifact  →  CD release  →  Azure App Service  →  🌍
```

---

## ⚡ Performance Optimizations

- **Vite ESBuild bundling** — sub-second cold starts in dev
- **Route-based lazy loading** — smaller initial bundle
- **Component memoization** — prevents unnecessary re-renders
- **Asset hashing & long-term caching** — CDN-friendly
- **Tree-shaken Tailwind CSS** — minimal production CSS
- **Content-hashed assets** under `dist/assets/`

---

## 🔐 Security Considerations

- 🔑 **Environment variables** stored in Azure App Settings (never committed)
- 🛡️ **Service Connections** scoped with least privilege
- 🚫 **Protected configs** — `.env*` files git-ignored
- 🔒 **HTTPS-only** enforced at App Service level
- 🧱 **Strict CSP-ready** static hosting via PM2

---

## 🚀 Future Enhancements

- 🤖 AI-powered analytics & insights
- 👥 Role-based authentication (RBAC)
- 📈 Real-time charts via WebSockets
- 🔔 Notification system (in-app + email)
- 🗄️ Database integration (PostgreSQL / Cosmos DB)
- 🐳 Docker containerization
- ☸️ Kubernetes (AKS) deployment
- 🧪 E2E testing with Playwright

---

## 💼 Resume Highlights

- **Developed and deployed** a production-ready React + Vite analytics dashboard hosted on Microsoft Azure App Service.
- **Implemented end-to-end CI/CD pipelines** using Azure DevOps Classic Build and Release Pipelines.
- **Automated Azure deployment** with artifact-based releases, Service Connections, and continuous deployment triggers.
- **Built a scalable React dashboard** using a modular, reusable component architecture with TypeScript and Tailwind CSS.
- **Optimized frontend performance** through Vite bundling, lazy loading, and asset hashing — achieving sub-second load times.
- **Troubleshot real-world deployment issues** including SPA routing on Linux App Service via PM2 static hosting.

---

## 🎤 Interview Questions Preparation

<details>
<summary><b>Q1. How did you deploy a React SPA on Azure Linux App Service?</b></summary>

I built the app with `npm run build`, which produced a static `dist/` directory. I packaged it as `app.zip` and used the **Azure App Service Deploy** task in a Classic Release Pipeline. Because Linux App Service expects a Node process, I configured the **startup command** `pm2 serve /home/site/wwwroot --no-daemon --spa` to serve the SPA and handle client-side routing.
</details>

<details>
<summary><b>Q2. Walk me through your React architecture.</b></summary>

The app follows a **feature-based folder structure**: reusable primitives live in `src/components/`, route-level views in `src/pages/`, and cross-cutting concerns (storage, theme, utils) in `src/lib/`. State is managed locally with React hooks and persisted via a small `useLocalStorage` abstraction. All styling uses **semantic design tokens** defined in `src/styles.css` for consistent dark/light theming.
</details>

<details>
<summary><b>Q3. Explain your CI/CD pipeline.</b></summary>

I use **two Classic Pipelines**: a Build pipeline (CI) that installs deps, runs `npm run build`, archives `dist/`, and publishes the artifact; and a Release pipeline (CD) that consumes that artifact and deploys to Azure App Service via a Service Connection. The CD pipeline has a **continuous deployment trigger**, so every successful build auto-deploys to production.
</details>

<details>
<summary><b>Q4. Why Vite over Create React App?</b></summary>

Vite uses **native ES modules + esbuild** in dev (instant cold starts, fast HMR) and **Rollup** for production builds (better tree-shaking, smaller bundles). It also has first-class TypeScript support out of the box and a much simpler config surface than CRA/Webpack.
</details>

<details>
<summary><b>Q5. How do you handle environment-specific configs?</b></summary>

Vite exposes any `VITE_*` env var via `import.meta.env`. Locally I use `.env.local` (git-ignored); in production I configure values in **Azure App Service → Configuration → Application Settings**, which Azure injects at runtime.
</details>

---

## 👨‍💻 Author

**Sai Shekar**
🔗 [GitHub](https://github.com/saishekar555) · 💼 _Open to opportunities_

---

## 🤝 Contribution

Contributions are warmly welcomed! 🎉

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

Please follow the existing code style and add meaningful commit messages (Conventional Commits preferred).

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

### ⭐ If you found this project useful, please consider giving it a star!

**Built with ❤️ using React, Vite & Azure**

</div>
