/* Snapshot of the CMS content, used by tests, e2e and `npm run dev:fixtures`. Regenerate when the model changes. */
import type { RawContent } from './raw';

export const fixtureContent: RawContent = {
	"profile": {
		"full_name": "Konstantine Biganashvili",
		"headline": "Full-Stack & DevOps Engineer",
		"tagline": "I build web applications and the infrastructure they run on.",
		"summary": "I'm a full-stack and DevOps engineer based in Tbilisi. On the application side I write TypeScript: React and Next.js frontends, NestJS backends, real-time and 3D interfaces. On the platform side I run what those apps stand on: Kubernetes, Terraform-managed cloud across AWS, GCP and Oracle Cloud, GitOps delivery with ArgoCD, and the monitoring that says when something is wrong.\n\nMost of my work happens where the two meet: interfaces that need serious infrastructure behind them, pipelines that make shipping routine, and compliance requirements like SOC 2 built into the platform instead of bolted on afterwards.",
		"location": "Tbilisi, Georgia",
		"timezone": "Asia/Tbilisi",
		"email": "contact@biganashvili.dev",
		"calendly_url": "https://calendly.com/konstantine-biganashvili/30min",
		"available": true,
		"status_text": "Open to freelance, full-time and consulting work",
		"availability": [
			{
				"label": "Freelance",
				"available": true
			},
			{
				"label": "Full-time",
				"available": true
			},
			{
				"label": "Consulting",
				"available": true
			}
		],
		"socials": [
			{
				"label": "LinkedIn",
				"kind": "linkedin",
				"url": "https://www.linkedin.com/in/konstantine-biganashvili-553a20246"
			},
			{
				"label": "GitHub",
				"kind": "github",
				"url": "https://github.com/KonstantineBiganashvili"
			},
			{
				"label": "Email",
				"kind": "email",
				"url": "mailto:contact@biganashvili.dev"
			}
		],
		"stats": [
			{
				"value": "400+",
				"label": "cloud resources brought under Terraform",
				"detail": "nothing re-created, zero drift"
			},
			{
				"value": "~2 wks",
				"label": "full AWS → GCP migration",
				"detail": "EC2 → GCE, Lambda → Cloud Run, ECR → Artifact Registry"
			},
			{
				"value": "3",
				"label": "clouds run in production",
				"detail": "AWS, GCP, Oracle Cloud"
			},
			{
				"value": "2",
				"label": "master's degrees",
				"detail": "Computer Science, DevOps"
			}
		],
		"resume": "00000000-0000-4000-8000-000000000000",
		"photo": null,
		"seo_title": "Konstantine Biganashvili | Full-Stack & DevOps Engineer",
		"seo_description": "Full-stack and DevOps engineer building React, Next.js and NestJS applications and the cloud infrastructure they run on: Kubernetes, Terraform, GitOps and multi-cloud on AWS, GCP and OCI."
	},
	"experience": [
		{
			"id": 1,
			"sort": 1,
			"company": "Flex Soft",
			"role": "DevOps Engineer",
			"start_date": "2026-01-01",
			"end_date": null,
			"location": null,
			"employment": null,
			"summary": "Platform and delivery for development Kubernetes clusters on Oracle Cloud and Hetzner.",
			"highlights": [
				{
					"text": "Provision and manage Oracle Cloud infrastructure with Terraform, and maintain the Hetzner dedicated servers that run the development Kubernetes clusters."
				},
				{
					"text": "Built CI/CD on self-hosted GitLab with GitLab CI: automated build, test and deploy workflows."
				},
				{
					"text": "Implemented GitOps continuous deployment with ArgoCD, including an ephemeral preview environment for every feature branch."
				},
				{
					"text": "Designed and run the observability stack (Prometheus, Grafana, Loki, Promtail) with alerting for early incident detection."
				},
				{
					"text": "Operate self-hosted PostgreSQL, Redis and GitLab: configuration, secrets, networking and WireGuard VPN access."
				},
				{
					"text": "Manage Cloudflare DNS, caching and CDN across services."
				}
			],
			"stack": [
				"Terraform",
				"Oracle Cloud",
				"Hetzner",
				"Kubernetes",
				"ArgoCD",
				"GitLab CI",
				"Prometheus",
				"Grafana",
				"Loki",
				"WireGuard",
				"Cloudflare"
			],
			"visible": true
		},
		{
			"id": 2,
			"sort": 2,
			"company": "ThirstySprout",
			"role": "Software Engineer",
			"start_date": "2025-12-01",
			"end_date": null,
			"location": null,
			"employment": null,
			"summary": "Infrastructure as code, SOC 2 controls and full-stack work on a case-management product.",
			"highlights": [
				{
					"text": "Built the company's infrastructure as code from scratch, importing 400+ live GCP, AWS, Supabase and Vercel resources into Terraform with nothing re-created and zero drift, to meet a SOC 2 configuration-management control."
				},
				{
					"text": "Set up infrastructure CI/CD in GitHub Actions with keyless OIDC sign-in: a plan on every pull request, automatic deploys to dev and staging on merge, a separate manual run for prod, a nightly drift check and a guard against accidental deletions."
				},
				{
					"text": "Led the separation of production from dev and staging: per-environment service accounts, deploy identities and state, least-privilege access scoped to single resources, and AWS permission boundaries, so dev and staging can no longer read or change prod."
				},
				{
					"text": "Maintain a TypeScript/React SPA on Supabase (Postgres, Edge Functions, Storage), fixing production issues across the case-management UI and auth/onboarding flows."
				},
				{
					"text": "Hardened type safety with strict TypeScript, generated Supabase types and mapper utilities that catch schema drift early, and refactored a Node + Puppeteer form-automation service for clearer data flow and error handling."
				},
				{
					"text": "Own database hygiene: migrations, seeding, and dev/staging/prod alignment, with each Supabase branch's settings versioned in Terraform and checked for drift nightly."
				}
			],
			"stack": [
				"Terraform",
				"GitHub Actions",
				"OIDC",
				"GCP",
				"AWS",
				"Supabase",
				"Vercel",
				"React",
				"TypeScript",
				"Playwright"
			],
			"visible": true
		},
		{
			"id": 3,
			"sort": 3,
			"company": "Exists",
			"role": "Software Engineer (Full-Stack & DevOps)",
			"start_date": "2023-05-01",
			"end_date": "2025-07-31",
			"location": null,
			"employment": null,
			"summary": "Full stack and infrastructure for a real-time Unreal Engine streaming platform and its marketing site.",
			"highlights": [
				{
					"text": "Built two production TypeScript apps, a landing site and a UE streaming editor, with Next.js, React, React Three Fiber and GSAP, including a 2D-to-3D canvas editor on Fabric.js."
				},
				{
					"text": "Integrated Epic Games Pixel Streaming to deliver real-time UE5 sessions from Windows GPU machines straight into the browser."
				},
				{
					"text": "Developed a NestJS backend for users, projects and VM orchestration on Supabase Postgres, Redis and Bull queues."
				},
				{
					"text": "Automated the GPU machine lifecycle: CloudWatch, EventBridge and Lambda (later Pub/Sub and Cloud Run) watch stream activity and shut idle machines down."
				},
				{
					"text": "Led the full AWS → GCP migration (EC2 → GCE, Lambda → Cloud Run, ECR → Artifact Registry) in about two weeks."
				},
				{
					"text": "Containerised every service, built CI/CD (GitHub Actions, later Cloud Build), and set up zero-downtime deploys with multi-replica containers and NGINX failover."
				}
			],
			"stack": [
				"Next.js",
				"React Three Fiber",
				"NestJS",
				"Supabase",
				"Redis",
				"Pixel Streaming",
				"AWS",
				"GCP",
				"Docker",
				"NGINX"
			],
			"visible": true
		},
		{
			"id": 4,
			"sort": 4,
			"company": "Web.smart",
			"role": "Frontend Developer",
			"start_date": "2022-06-01",
			"end_date": "2023-05-31",
			"location": null,
			"employment": null,
			"summary": "Joined as an intern and grew into a frontend developer role.",
			"highlights": [
				{
					"text": "Built a TypeScript PWA for HR teams to create and run quizzes and questionnaires, with React, Material UI and real-time updates over WebSockets."
				},
				{
					"text": "Delivered UI components, forms, validation flows and interactive dashboards for internal users."
				},
				{
					"text": "Shipped features in an admin panel for a vehicle-parts logistics company, on the React/MUI frontend and the Express backend."
				}
			],
			"stack": [
				"React",
				"TypeScript",
				"Material UI",
				"WebSockets",
				"Express"
			],
			"visible": true
		},
		{
			"id": 5,
			"sort": 5,
			"company": "International Black Sea University",
			"role": "IT Specialist",
			"start_date": "2019-09-01",
			"end_date": "2022-03-31",
			"location": null,
			"employment": null,
			"summary": "Infrastructure, networking and support for the university's staff and faculty.",
			"highlights": [
				{
					"text": "Provided end-to-end technical support for 100+ staff and faculty members."
				},
				{
					"text": "Administered LAN/WAN networks, routers and switches, and managed accounts and access through Active Directory."
				},
				{
					"text": "Rolled out antivirus and firewall configuration and helped enforce internal security policies."
				}
			],
			"stack": [
				"Networking",
				"Active Directory",
				"Windows"
			],
			"visible": true
		},
		{
			"id": 6,
			"sort": 6,
			"company": "Esports.ge",
			"role": "Coordinator",
			"start_date": "2018-01-01",
			"end_date": "2019-12-31",
			"location": null,
			"employment": null,
			"summary": "Organised LAN and online esports tournaments and wrote event coverage.",
			"highlights": [],
			"stack": [],
			"visible": false
		}
	],
	"education": [
		{
			"id": 1,
			"sort": 1,
			"institution": "Business and Technology University",
			"degree": "Master of DevOps",
			"start_date": "2023-09-01",
			"end_date": "2025-07-31",
			"notes": null,
			"visible": true
		},
		{
			"id": 2,
			"sort": 2,
			"institution": "International Black Sea University",
			"degree": "Master of Computer Science",
			"start_date": "2020-09-01",
			"end_date": "2023-07-31",
			"notes": null,
			"visible": true
		},
		{
			"id": 3,
			"sort": 3,
			"institution": "International Black Sea University",
			"degree": "Bachelor of Computer Science",
			"start_date": "2016-09-01",
			"end_date": "2020-07-31",
			"notes": null,
			"visible": true
		},
		{
			"id": 4,
			"sort": 4,
			"institution": "Komarovi Campus School",
			"degree": "Physics and Mathematics",
			"start_date": "2010-09-01",
			"end_date": "2016-07-31",
			"notes": null,
			"visible": true
		}
	],
	"projects": [
		{
			"id": 1,
			"sort": 1,
			"slug": "exists",
			"name": "Exists",
			"tagline": "Interactive Unreal Engine 5 worlds, streamed live into the browser from on-demand GPU machines.",
			"context": "Built at Exists",
			"period": "2023 – 2025",
			"role": "Full-stack & DevOps engineer: frontend, backend and the cloud underneath",
			"status": "shipped",
			"summary": "A web platform for building and running interactive Unreal Engine 5 experiences without installing anything. Users work in a Next.js editor, a 3D world map plus a 2D canvas that maps onto the scene, and the platform starts a GPU machine on demand and streams the live UE5 session into the page. I also built the company's marketing site.",
			"body": "## The problem\n\nUnreal Engine 5 produces stunning real-time worlds, but running them normally means a gaming PC and a large download. Exists wanted people to open a browser tab and be inside a live UE5 scene, and to be able to arrange content in that world from a simple editor.\n\n## How it works\n\n- **Editor.** A Next.js app with a React Three Fiber world map and a Fabric.js 2D canvas whose layout maps onto the 3D scene.\n- **Backend.** A NestJS service owns users, projects and machine orchestration, backed by Supabase Postgres, with Redis and Bull queues for background jobs.\n- **Streaming.** When a session starts, the backend brings up a Windows GPU machine running the UE5 build, and Epic's Pixel Streaming sends the rendered frames to the browser over WebRTC while input flows back.\n- **Cost control.** A lifecycle service watches GPU and stream activity and shuts idle machines down, because GPU time is the single biggest bill.\n\n## The infrastructure\n\nEverything ran in containers. The platform started on AWS (EC2, Lambda, EventBridge, CloudWatch, ECR) and I later led its migration to GCP (Compute Engine, Cloud Run, Pub/Sub, Cloud Build, Artifact Registry) in about two weeks. Deploys were zero-downtime: multi-replica containers behind NGINX failover routing. Logs went from Winston into Graylog/Elastic and later Cloud Logging, with Mixpanel and Clarity for product analytics.\n\n## The marketing site\n\nAlongside the platform I built the public landing site with Next.js, Mantine, Tailwind and GSAP animation, hosted on AWS behind a CDN with a serverless contact endpoint.",
			"highlights": [
				{
					"title": "Live UE5 in a browser tab",
					"body": "Pixel Streaming over WebRTC turns a cloud GPU machine into something you open like a web page: no install, no download."
				},
				{
					"title": "GPU machines that switch themselves off",
					"body": "Activity monitoring shuts idle machines down automatically: first CloudWatch + EventBridge + Lambda, later Pub/Sub + Cloud Run."
				},
				{
					"title": "AWS → GCP in about two weeks",
					"body": "Moved compute, serverless, registries and CI to GCP equivalents with the product running throughout."
				},
				{
					"title": "Zero-downtime deploys",
					"body": "Multi-replica containers behind NGINX failover, so releases never dropped a live session."
				},
				{
					"title": "A 2D editor for a 3D world",
					"body": "A Fabric.js canvas mapped onto a React Three Fiber scene lets non-technical users lay out content spatially."
				}
			],
			"stack": [
				{
					"group": "Frontend",
					"items": [
						"Next.js",
						"React",
						"React Three Fiber",
						"Fabric.js",
						"GSAP",
						"Mantine",
						"Tailwind CSS"
					]
				},
				{
					"group": "Backend",
					"items": [
						"NestJS",
						"Supabase Postgres",
						"Redis",
						"Bull queues"
					]
				},
				{
					"group": "Streaming",
					"items": [
						"Unreal Engine 5",
						"Pixel Streaming",
						"WebRTC"
					]
				},
				{
					"group": "Cloud & delivery",
					"items": [
						"AWS EC2 / Lambda / EventBridge",
						"GCP Compute Engine / Cloud Run / Pub/Sub",
						"Docker",
						"NGINX",
						"GitHub Actions",
						"Cloud Build"
					]
				},
				{
					"group": "Observability",
					"items": [
						"Graylog / Elastic",
						"Cloud Logging",
						"Mixpanel",
						"Clarity"
					]
				}
			],
			"topology": {
				"nodes": [
					{
						"id": "user",
						"label": "Browser",
						"kind": "client"
					},
					{
						"id": "site",
						"label": "Marketing site",
						"kind": "service"
					},
					{
						"id": "editor",
						"label": "Editor (Next.js + R3F)",
						"kind": "service"
					},
					{
						"id": "api",
						"label": "API (NestJS)",
						"kind": "service"
					},
					{
						"id": "queue",
						"label": "Redis + Bull",
						"kind": "data"
					},
					{
						"id": "db",
						"label": "Supabase Postgres",
						"kind": "data"
					},
					{
						"id": "gpu",
						"label": "UE5 GPU machines",
						"kind": "infra"
					},
					{
						"id": "reaper",
						"label": "Idle-machine shutdown",
						"kind": "service"
					},
					{
						"id": "metrics",
						"label": "Cloud monitoring",
						"kind": "external"
					}
				],
				"edges": [
					{
						"from": "user",
						"to": "site",
						"label": "HTTPS"
					},
					{
						"from": "user",
						"to": "editor",
						"label": "HTTPS"
					},
					{
						"from": "editor",
						"to": "api",
						"label": "REST"
					},
					{
						"from": "api",
						"to": "db",
						"label": "SQL"
					},
					{
						"from": "api",
						"to": "queue",
						"label": "jobs"
					},
					{
						"from": "api",
						"to": "gpu",
						"label": "start / stop"
					},
					{
						"from": "gpu",
						"to": "user",
						"label": "WebRTC stream"
					},
					{
						"from": "gpu",
						"to": "metrics",
						"label": "activity"
					},
					{
						"from": "metrics",
						"to": "reaper",
						"label": "idle signal"
					},
					{
						"from": "reaper",
						"to": "gpu",
						"label": "shutdown"
					}
				]
			},
			"featured": true,
			"visible": true
		},
		{
			"id": 2,
			"sort": 2,
			"slug": "helmsman",
			"name": "Helmsman",
			"tagline": "An AI trading copilot: models have to agree before anything is proposed, and plain code, never the model, decides size, risk and execution.",
			"context": "Personal project",
			"period": "2026 – present",
			"role": "Solo: product, backend, frontend and infrastructure",
			"status": "running",
			"summary": "A single-operator system for trading US stocks. Several times a week it gathers prices, news, technical indicators and company filings, and independent AI models each argue the case for and against a trade. Only an agreed call becomes a recommendation, which I approve in a web app or hand to a supervised autopilot I can veto. Every decision is logged permanently and scored against a market benchmark after 1, 7 and 30 days, to find out whether the AI adds anything at all.",
			"body": "## Why build it\n\nLanguage models are persuasive, not reliable. Helmsman lets AI do the reading and arguing, and makes sure it can never be the part that moves money. The models suggest. Deterministic, tested code decides.\n\n## How a trade happens\n\n1. **Gather.** Scheduled jobs collect prices, bars, news, technical indicators and SEC filings for held and trending stocks.\n2. **Argue.** Each model returns a structured decision validated against a strict schema: a case for, a case against, and what would prove it wrong. Business rules re-check the output; for example, the case against can never be empty.\n3. **Agree.** Only agreement on a buy or sell is tradable, sized at the more cautious of the suggestions. When the models disagree, an optional debate round shows each one the other's reasoning.\n4. **Gate.** Risk code sizes the position, applies hard limits and signs the trade instruction. The model never outputs a price, an amount or a share count.\n5. **Execute.** Only the approval path can reach the order module, and it runs a final set of checks before the one irreversible call to the broker.\n\n## Safety by construction\n\n- **Structural isolation.** The execution module is imported only by approval, so the analysis job and the reconciler cannot place an order even by mistake.\n- **Layered gates.** An authorised-actor check, a kill switch that fails closed (a database error counts as halted), an HMAC-signed trade instruction compared in constant time, and quote freshness, market hours and a volatility (ATR) price band.\n- **A ledger the app can't rewrite.** Postgres triggers block UPDATE, DELETE and TRUNCATE on the history tables, an 11-state lifecycle lives in one pure transition table, and each status change and its event are written in a single transaction with optimistic locking. The app connects as a least-privilege role.\n- **Idempotent everything.** Deterministic client order IDs let the broker de-duplicate retries, mutating endpoints accept idempotency keys, and a reconciler recovers lost fills every minute.\n\n## Measuring the AI honestly\n\nEvery recommendation is scored, including the rejected ones, against a benchmark at 1, 7 and 30 days. Each model is checked for calibration: does a stated 0.8 confidence actually win 80% of the time? That uses Brier score, ECE, AUC and Wilson intervals. Prompt changes are replayed offline against stored inputs before they reach a live cycle.\n\n## Delivery\n\nThe frontend is a React 19 SPA that validates every API response with zod and keeps money as decimal strings (a lint rule bans float parsing). Backend CI applies migrations to a throwaway Postgres and smoke-tests the triggers before building an image. Both apps ship like everything else I run: CI pins an image digest into a GitOps repo, ArgoCD deploys it, migrations run in an init container, and containers run as non-root with all capabilities dropped.",
			"highlights": [
				{
					"title": "The model can't touch money",
					"body": "AI proposes; risk code sizes, limits and signs; only the approval path can reach the order module."
				},
				{
					"title": "Fail-closed order gates",
					"body": "Kill switch, signed instructions with constant-time comparison, fresh quotes and a volatility price band before every order."
				},
				{
					"title": "Tamper-proof ledger",
					"body": "Database triggers make history append-only; state changes are atomic with optimistic locking and advisory locks."
				},
				{
					"title": "Idempotent by design",
					"body": "Deterministic order IDs, idempotency keys and a reconciler that recovers lost fills every minute."
				},
				{
					"title": "Does the AI have an edge?",
					"body": "Every call is scored against a benchmark, and each model's confidence is checked for calibration."
				},
				{
					"title": "Contract-checked frontend",
					"body": "zod-validated API responses, decimal-safe money, accessibility checks and an 80% coverage gate in CI."
				}
			],
			"stack": [
				{
					"group": "Frontend",
					"items": [
						"React 19",
						"TypeScript",
						"Vite",
						"TanStack Query",
						"React Router",
						"Mantine",
						"Tailwind CSS",
						"Recharts",
						"zod",
						"decimal.js"
					]
				},
				{
					"group": "Backend",
					"items": [
						"Node.js",
						"NestJS",
						"TypeScript",
						"zod",
						"Swagger / OpenAPI",
						"JWT (JWKS)"
					]
				},
				{
					"group": "Data",
					"items": [
						"PostgreSQL",
						"Prisma",
						"Postgres triggers",
						"Supabase Auth",
						"Market data & news APIs",
						"SEC EDGAR"
					]
				},
				{
					"group": "AI",
					"items": [
						"OpenAI SDK",
						"Anthropic SDK",
						"Structured outputs",
						"Prompt caching"
					]
				},
				{
					"group": "Testing",
					"items": [
						"Jest",
						"Vitest",
						"Testing Library",
						"MSW",
						"axe-core",
						"Playwright"
					]
				},
				{
					"group": "Infra & delivery",
					"items": [
						"Docker",
						"GitHub Actions",
						"GHCR",
						"ArgoCD",
						"Kubernetes (k3s)",
						"Vault + External Secrets",
						"Telegram alerts"
					]
				}
			],
			"topology": {
				"nodes": [
					{
						"id": "op",
						"label": "Operator",
						"kind": "client"
					},
					{
						"id": "spa",
						"label": "React SPA",
						"kind": "service"
					},
					{
						"id": "auth",
						"label": "Auth provider",
						"kind": "external"
					},
					{
						"id": "api",
						"label": "API: approval, risk, execution",
						"kind": "service"
					},
					{
						"id": "jobs",
						"label": "Schedulers: analysis, autopilot, reconciler",
						"kind": "service"
					},
					{
						"id": "db",
						"label": "Append-only ledger",
						"kind": "data"
					},
					{
						"id": "llm",
						"label": "LLM analysts",
						"kind": "external"
					},
					{
						"id": "mkt",
						"label": "Market data, news, filings",
						"kind": "external"
					},
					{
						"id": "broker",
						"label": "Brokerage API",
						"kind": "external"
					},
					{
						"id": "alerts",
						"label": "Telegram alerts",
						"kind": "external"
					}
				],
				"edges": [
					{
						"from": "op",
						"to": "spa",
						"label": "HTTPS"
					},
					{
						"from": "spa",
						"to": "auth",
						"label": "sign-in"
					},
					{
						"from": "spa",
						"to": "api",
						"label": "REST + JWT"
					},
					{
						"from": "jobs",
						"to": "mkt",
						"label": "prices, news"
					},
					{
						"from": "jobs",
						"to": "llm",
						"label": "structured decisions"
					},
					{
						"from": "jobs",
						"to": "db",
						"label": "recommendations"
					},
					{
						"from": "jobs",
						"to": "api",
						"label": "autopilot approvals"
					},
					{
						"from": "api",
						"to": "db",
						"label": "atomic transitions"
					},
					{
						"from": "api",
						"to": "broker",
						"label": "signed orders"
					},
					{
						"from": "jobs",
						"to": "alerts",
						"label": "alerts"
					}
				]
			},
			"featured": true,
			"visible": true
		},
		{
			"id": 3,
			"sort": 3,
			"slug": "homelab",
			"name": "Homelab platform",
			"tagline": "A Kubernetes platform run entirely from Git: CI ships by committing an image digest, and ArgoCD does the rest.",
			"context": "Personal infrastructure",
			"period": "2026 – present",
			"role": "Solo: design, build and operations",
			"status": "running",
			"summary": "The platform this site runs on. A k3s cluster on a cloud server hosts this portfolio, the headless CMS behind it and Helmsman's production and development environments. One GitOps repository declares everything above the bootstrap layer, ArgoCD keeps the cluster matching it and reverts manual drift, and secrets live in Vault, so Git only ever holds pointers to them. It replaced a Docker Compose + Caddy setup and cut over in a single evening with no DNS change.",
			"body": "## Layers\n\n- **Bootstrap, done once by hand.** k3s with its bundled ingress and load balancer disabled, Vault with cloud-KMS auto-unseal, External Secrets Operator's Vault auth, and ArgoCD with a read-only deploy key. One `kubectl apply` of the root Application hands everything else to Git.\n- **Platform (sync wave 0–1).** cert-manager, External Secrets Operator and Traefik from pinned Helm charts, then Let's Encrypt issuers (DNS-01), a cluster-wide secret store and a wildcard certificate set as Traefik's default.\n- **Workloads (wave 3).** The portfolio, the CMS, Helmsman prod and dev, and a WireGuard VPN for operator access. Inside each app, secrets and config sync before Deployments, and a dev backend waits for its own database.\n\n## The request path\n\nBrowser → Cloudflare proxy (full strict TLS) → Traefik on the node, which redirects HTTP to HTTPS, serves the wildcard certificate and recovers the real client IP → host and path routing, plus IP allow-listing where needed → Service → pod.\n\n## Shipping\n\nApplication pipelines build an image, push it to a private registry and commit the new **sha256 digest** into the GitOps repo; about half of the repo's commits come from CI. ArgoCD notices and rolls it out. Floating tags are banned on purpose: several apps run one-way database migrations at start-up, so an unplanned image change could migrate live data. Prod and dev pipelines each edit their own file in their own concurrency group, so a dev push can never cancel a prod deploy.\n\n## Problems worth writing down\n\n- **A readiness probe that lied.** During init, the Postgres image runs a temporary server that listens only on a Unix socket, so a socket-based probe reported Ready too early and migrations ran against a database that wasn't ready. The probe checks TCP instead.\n- **Spoofable client IPs.** Behind a CDN, \"trust the proxy\" made the CMS read the leftmost forwarded-for entry, which the client controls. I reproduced the bypass, replaced the setting with an explicit list of trusted hops, and verified the fix live.\n- **A VPN with no internet.** Clients connected but couldn't reach anything: k3s sets the nftables FORWARD policy to DROP, while the VPN wrote its rules to legacy iptables. A tiny sidecar re-asserts the accept rule, so the fix survives resyncs and reboots.\n- **Rollouts that deadlock.** Pods that bind host ports can't surge, so Traefik rolls with `maxSurge: 0`. The CMS, the trading ledger and the VPN use `Recreate` so there is only ever one writer.\n\n## Secrets\n\nExternal Secrets Operator authenticates to Vault with Kubernetes auth and renders Kubernetes Secrets, including registry pull secrets and database URLs that are templated from a single copy of each password so they can't drift. `deletionPolicy: Retain` means a sealed or unreachable Vault can never delete a live Secret.\n\n## Upgrades\n\nCharts are pinned to exact versions and images to digests. Certificates were proven on the staging issuer before switching to production, and anything with one-way migrations gets a snapshot before its version moves.",
			"highlights": [
				{
					"title": "Deploy = a Git commit",
					"body": "CI commits a pinned image digest; ArgoCD reconciles. Every deploy is reviewable, revertible history."
				},
				{
					"title": "Ordered by sync waves",
					"body": "Secrets before workloads and databases before migrations, at both the platform and the app level."
				},
				{
					"title": "Secrets never touch Git",
					"body": "Vault + External Secrets with templated credentials and a retain policy that survives a sealed Vault."
				},
				{
					"title": "Real client IPs behind a CDN",
					"body": "Forwarded headers are trusted only from the CDN's published ranges, closing an IP allow-list bypass I reproduced and fixed."
				},
				{
					"title": "One writer at a time",
					"body": "Recreate strategies and zero-surge rollouts for anything holding a database, a ledger or a host port."
				},
				{
					"title": "Cut over in one evening",
					"body": "Moved from Docker Compose + Caddy to Kubernetes with no DNS change and no downtime beyond the switch itself."
				}
			],
			"stack": [
				{
					"group": "Cluster & GitOps",
					"items": [
						"k3s",
						"ArgoCD (app-of-apps)",
						"Helm",
						"Plain manifests"
					]
				},
				{
					"group": "Networking & TLS",
					"items": [
						"Cloudflare",
						"Traefik",
						"cert-manager",
						"Let's Encrypt DNS-01",
						"WireGuard"
					]
				},
				{
					"group": "Secrets & security",
					"items": [
						"HashiCorp Vault",
						"External Secrets Operator",
						"KMS auto-unseal",
						"IP allow-listing",
						"Least-privilege DB roles"
					]
				},
				{
					"group": "Data & storage",
					"items": [
						"Supabase Postgres",
						"Postgres StatefulSet",
						"Google Cloud Storage"
					]
				},
				{
					"group": "CI/CD",
					"items": [
						"GitHub Actions",
						"GHCR",
						"Digest pinning",
						"Migration init containers"
					]
				}
			],
			"topology": {
				"nodes": [
					{
						"id": "user",
						"label": "Visitors",
						"kind": "client"
					},
					{
						"id": "cdn",
						"label": "Cloudflare proxy",
						"kind": "external"
					},
					{
						"id": "traefik",
						"label": "Traefik + wildcard TLS",
						"kind": "infra"
					},
					{
						"id": "portfolio",
						"label": "Portfolio (Next.js)",
						"kind": "service"
					},
					{
						"id": "cms",
						"label": "Directus CMS",
						"kind": "service"
					},
					{
						"id": "helmsman",
						"label": "Helmsman prod + dev",
						"kind": "service"
					},
					{
						"id": "argocd",
						"label": "ArgoCD",
						"kind": "infra"
					},
					{
						"id": "secrets",
						"label": "Vault + External Secrets",
						"kind": "infra"
					},
					{
						"id": "github",
						"label": "CI + GitOps repo",
						"kind": "external"
					},
					{
						"id": "db",
						"label": "Managed Postgres",
						"kind": "data"
					},
					{
						"id": "gcs",
						"label": "Object storage",
						"kind": "data"
					}
				],
				"edges": [
					{
						"from": "user",
						"to": "cdn",
						"label": "HTTPS"
					},
					{
						"from": "cdn",
						"to": "traefik",
						"label": "proxied HTTPS"
					},
					{
						"from": "traefik",
						"to": "portfolio",
						"label": "route"
					},
					{
						"from": "traefik",
						"to": "cms",
						"label": "route"
					},
					{
						"from": "traefik",
						"to": "helmsman",
						"label": "allow-listed"
					},
					{
						"from": "portfolio",
						"to": "cms",
						"label": "content API"
					},
					{
						"from": "cms",
						"to": "db",
						"label": "SQL"
					},
					{
						"from": "cms",
						"to": "gcs",
						"label": "files"
					},
					{
						"from": "github",
						"to": "argocd",
						"label": "digest commits"
					},
					{
						"from": "argocd",
						"to": "traefik",
						"label": "reconciles cluster"
					},
					{
						"from": "secrets",
						"to": "helmsman",
						"label": "rendered Secrets"
					}
				]
			},
			"featured": true,
			"visible": true
		}
	],
	"skills": [
		{
			"id": 1,
			"sort": 1,
			"name": "Languages",
			"items": [
				"TypeScript",
				"JavaScript",
				"Python",
				"Bash",
				"PowerShell"
			],
			"visible": true
		},
		{
			"id": 2,
			"sort": 2,
			"name": "Frontend",
			"items": [
				"React",
				"Next.js",
				"Three.js / React Three Fiber",
				"GSAP",
				"Framer Motion",
				"Fabric.js",
				"Tailwind CSS",
				"Mantine",
				"Material UI",
				"Redux Toolkit",
				"Zustand",
				"React Query",
				"PWA"
			],
			"visible": true
		},
		{
			"id": 3,
			"sort": 3,
			"name": "Backend",
			"items": [
				"Node.js",
				"NestJS",
				"Express",
				"REST",
				"GraphQL",
				"WebSockets"
			],
			"visible": true
		},
		{
			"id": 4,
			"sort": 4,
			"name": "Cloud",
			"items": [
				"AWS",
				"GCP",
				"Oracle Cloud (OCI)",
				"Hetzner",
				"Cloud Run",
				"GKE",
				"OKE",
				"Lambda",
				"EC2",
				"Pub/Sub",
				"Cloud Build"
			],
			"visible": true
		},
		{
			"id": 5,
			"sort": 5,
			"name": "Platform & IaC",
			"items": [
				"Kubernetes",
				"Docker",
				"Terraform",
				"ArgoCD",
				"GitOps",
				"Helm",
				"HashiCorp Vault",
				"External Secrets"
			],
			"visible": true
		},
		{
			"id": 6,
			"sort": 6,
			"name": "CI/CD",
			"items": [
				"GitHub Actions",
				"GitLab CI",
				"Cloud Build"
			],
			"visible": true
		},
		{
			"id": 7,
			"sort": 7,
			"name": "Security & compliance",
			"items": [
				"Least-privilege IAM",
				"OIDC / Workload Identity Federation",
				"AWS permission boundaries",
				"SOC 2 controls"
			],
			"visible": true
		},
		{
			"id": 8,
			"sort": 8,
			"name": "Networking",
			"items": [
				"Traefik",
				"NGINX",
				"Caddy",
				"Cloudflare",
				"WireGuard"
			],
			"visible": true
		},
		{
			"id": 9,
			"sort": 9,
			"name": "Data",
			"items": [
				"PostgreSQL",
				"Redis",
				"MongoDB",
				"Prisma",
				"TypeORM",
				"Supabase"
			],
			"visible": true
		},
		{
			"id": 10,
			"sort": 10,
			"name": "Observability",
			"items": [
				"Prometheus",
				"Grafana",
				"Loki",
				"Promtail",
				"Graylog",
				"Elasticsearch",
				"Sentry"
			],
			"visible": true
		},
		{
			"id": 11,
			"sort": 11,
			"name": "Platforms & tools",
			"items": [
				"Vercel",
				"Firebase",
				"Directus",
				"Strapi",
				"Git",
				"Perforce Helix"
			],
			"visible": true
		}
	]
};
