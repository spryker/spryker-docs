---
title: Architectural Intro
description: Introduction to Spryker architecture and the Client layer for third-party integrations.
last_updated: July 9, 2025
template: default

---

The Client layer is a lightweight communication layer that connects the frontend to storage, search, and backend. Because it already handles session management and persistence, such as Redis, it's the ideal place to isolate calls to third‑party services.

- Place all HTTP and SDK calls in the Client layer
- Expose clear, reusable methods so any other layer can call the integration

For comprehensive information about Spryker architecture, see [Architecture](/docs/dg/dev/architecture/architecture.html).
