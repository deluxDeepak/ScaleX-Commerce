 
# 🚀 Scalable E‑Commerce System

![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Tests](https://img.shields.io/badge/Tests-Passing-success)
![CI/CD](https://img.shields.io/badge/CI-CD-orange)

A production‑ready full‑stack e‑commerce system designed with **scalability**, **performance**, and **observability** in mind.

---

## 📌 Overview

This project goes beyond a basic CRUD backend. It demonstrates how real‑world systems are built with:

* ⚖️ Load balancing and reverse proxy (Nginx)
* 🧩 Distributed backend services (Dockerized)
* 🚀 Caching layer (Redis)
* 📈 Observability (Prometheus, Grafana, Loki)
* ✅ End‑to‑end testing and CI/CD pipelines
* 🛡️ Rate limiting & advanced Node.js security (global + per‑API limits)

---

## 🏗️ System Architecture

High‑level view of the platform:
> Includes role-based access, authentication middleware, validation layer, caching, and observability pipeline.

![System Architecture](Backend/docs/image.png)

---

## 🔄 Request Flow

1. 🌐 Client sends HTTP request
2. 🧭 Nginx forwards request to a backend instance (load balancing)
3. 🛡️ Auth middleware verifies JWT / roles
4. ✅ Validation layer checks request body / params
5. 🧠 Controller executes business logic
6. ⚡ Checks Redis cache; if miss, hits MongoDB
7. 📦 Response is returned back through Nginx to the client

Flow summary: `Client → Nginx → Backend → Auth → Validation → Controller → Cache/DB → Response`

---

## 📂 Project Structure

```text
.
├── Backend/              # Node.js API, business logic, services
├── Front-end/            # React UI
├── nginx/                # Reverse proxy + load balancing configs
├── monitoring/           # Prometheus, Grafana, Loki setup
├── migrations/           # Database migrations
├── tests/                # E2E + integration tests (Playwright, etc.)
├── docker-compose.yml    # Local + prod‑like orchestration
├── docker-compose.ci.yml # CI/CD compose setup
└── README.md             # Root documentation
```

---

## 🔗 Module Documentation

To keep the project clean and modular, detailed documentation is separated:

* 🔧 **Backend (API + Business Logic)**
  👉 [Backend README](./Backend/README.md)

* 🎨 **Frontend (UI + Client Logic)**
  👉 [Frontend README](./Front-end/README.md)

---

## ⚙️ Tech Stack

| Layer        | Tech                                      | Role                          |
| ------------ | ----------------------------------------- | ----------------------------- |
| 🧠 Backend   | Node.js (Express)                         | REST APIs, business logic     |
| 🎨 Frontend  | React                                     | SPA client, UI/UX             |
| 🗄️ Database  | MongoDB                                   | Persistent data store         |
| 🌐 Proxy     | Nginx                                     | Reverse proxy, load balancing |
| ⚡ Cache     | Redis                                     | Caching, sessions, hot data   |
| 📈 Monitoring| Prometheus, Grafana, Loki                 | Metrics, dashboards, logs     |
| 🧪 Testing   | Playwright, Jest, Supertest               | E2E, unit, integration tests  |
| ⚙️ DevOps    | Docker, CI/CD (GitHub Actions, AWS EC2)   | Containers, pipelines, deploy |

---

## 🐳 Run Locally (Docker)

```bash
docker-compose up --build
```

---

## 🧪 Testing

```bash
# Full test suite (backend + frontend + e2e)
npm run test

# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend

# End-to-end tests
npm run test:e2e

# Integration tests
npm run test:integration
```

Includes:

* 🧪 End‑to‑end API + UI tests
* 🔍 Integration flows validated
* ⚙️ CI‑based test execution


---

## 📊 Performance

* 🚀 Load tested using **Autocannon**
* ⚖️ Nginx improves throughput via load balancing
* 🚄 Redis significantly reduces database latency
* 📉 Lower response times under concurrent load


## 📈 Observability

* 📊 Metrics → Prometheus
* 📉 Dashboards → Grafana
* 📜 Logs → Loki
* 🚨 Error tracking → Sentry

This setup ensures real‑time monitoring and debugging in production‑like environments.

---

## 🚀 Key Features

* 🔐 JWT authentication + role-based access control (Admin, Seller, Buyer)
* 🛡️ Request validation using Joi (schema-based validation)
* 🚦 Rate limiting (global + route-level)
* 🧱 Scalable backend architecture
* 🌐 Reverse proxy with load balancing
* ⚡ Redis caching layer
* 🐳 Full Dockerized environment
* 🔁 CI/CD-ready pipeline
* 📈 Observability (metrics + logs)
* 🧩 Clean, modular project structure


---

## 🔮 Future Improvements

* ☸️ Kubernetes deployment
* 🕵️ Distributed tracing (Jaeger)
* 🌍 CDN integration

---

## 🤝 Contributing

Happy to take ideas, bug reports, and small PRs.
If you spot something that can be improved, just open an issue or send a pull request.

---

## 👨‍💻 Author

**Deepak Kumar**  
Backend Engineer | Scalable Systems | DevOps & Observability
