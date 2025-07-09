---
title: Integrating with Middleware
description: Learn how to integrate external systems with Middleware to streamline data exchange, enhance scalability, and simplify maintenance for your core platform.
last_updated: July 9, 2025
layout: custom_new
nav_pr: 3.4
---

**Middleware** is an external service or third‑party application that integrates multiple data sources and converts their data into the format your target system expects. Acting as a bridge, it applies complex logic - such as normalization, filtering, and enrichment - before the data reaches your core platform.

**Benefits**

- You can connect many external systems without changing your core code.
- You offload resource‑intensive data transformations, which improves overall performance.
- You gain better scalability and simpler maintenance as data formats and integration partners evolve.

**Trade‑offs**

- Middleware adds architectural complexity and new points of failure.
- It can increase infrastructure or licensing costs.
- It requires dedicated monitoring and support to maintain data consistency and reliability.