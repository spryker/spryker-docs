---
title: Spryker API Strategy
description: What to build on, what changes, and how to choose the right Spryker API.
last_updated: Jun 25, 2026
template: default
layout: custom_new
---

## What this means for you

- **On Glue today?** Nothing breaks. Glue is fully supported, there is no End-of-Life, and you don't have to migrate existing features.
- **Building something new?** Build it on **API Platform integration**. It is generally available and is where all new Spryker features ship.
- **Need a Spryker Core feature released after Q1 2026?** It will be available through API Platform integration only.

Everything below is supporting detail.

{% info_block warningBox %}

Glue keeps working and isn't going away. New features are built on API Platform integration. Migration is optional.

{% endinfo_block %}

---

## How the pieces fit

Spryker's APIs are described by three **independent** axes. They are easy to confuse because some names repeat across axes, so read them as orthogonal:

1. **Application** — *where* the API lives. Two of them: **Storefront API** and **Backend API**.
2. **API type** — *what* you call and *who* the caller is (a customer, an administrator, a merchant, a system). Several types live under each application.
3. **Foundation** — *how* it's built underneath: **Glue** or **API Platform integration**. This is a foundation beneath the API, not something you call directly.

| API type | Application (where) | Foundation (how it's built) |
| --- | --- | --- |
| Storefront API | Storefront API | Glue **or** API Platform integration |
| Back Office API | Backend API | Glue **or** API Platform integration |
| Merchant API | Backend API | API Platform integration |
| Merchant Data Exchange API | Backend API | API Platform integration |
| Data Exchange API | Backend API | API Platform integration |
| Async Event API | Backend API | API Platform integration |

Read the table across, not down: each API type belongs to one application and is built on one foundation, and those two facts are independent of each other. "Storefront API" names both an application and the type it hosts; "API Platform integration" is a foundation, not an endpoint you target. During the transition, an existing type can be served by either foundation.

{% info_block infoBox "Naming watch-out" %}

The **Backend API** *application* is not the same as the **Back Office API** *type*. The Backend API application hosts several types of API, one of which is Back Office API.

{% endinfo_block %}

---

## What you can build on today

These are callable now:

| API type | Application | Caller (actor) | Use it when |
| --- | --- | --- | --- |
| **Storefront API** | Storefront | Customer (authenticated or guest) | You're building any customer-facing shopping experience |
| **Back Office API** | Backend | Back Office administrator or trusted internal service | You're automating or replacing Back Office administration |

Everything in the next section is on the roadmap and not yet callable — don't design against it yet.

---

## What's on the roadmap

Planned API types, listed so you can plan ahead. Availability is announced per type; treat these as direction, not a build target.

| API type | Application | Caller (actor) | Use it when |
| --- | --- | --- | --- |
| **Merchant API** | Backend | Marketplace merchant (single-merchant scope) | A merchant manages their own catalog, offers, orders, or payouts record-by-record through a UI or tool |
| **Merchant Data Exchange API** | Backend | Merchant-side integration system | A merchant bulk-imports or bulk-exports their own data between their systems and the marketplace |
| **Data Exchange API** | Backend | Platform-operator integration system | The operator moves large datasets in or out at platform level (PIM, ERP, OMS, BI) |
| **Async Event API** | Backend | Event subscriber (broker or webhook) | An external system needs to react to Spryker events instead of polling |

---

## Choosing an API type

Pick by **who is calling** and **the shape of the data flow** (one record at a time, bulk, or event-driven).

| Your situation | Use |
| --- | --- |
| A customer browses, shops, and checks out | Storefront API |
| An administrator manages catalog, orders, or customers | Back Office API |
| A merchant manages their own data through a UI, record by record | Merchant API |
| A merchant bulk-imports or bulk-exports their own data | Merchant Data Exchange API |
| The platform operator moves large datasets (PIM, ERP, OMS) | Data Exchange API |
| An external system reacts to events (order placed, stock changed) | Async Event API |

**Each API type has its own actor and authentication**, so a token for one type does not grant access to another. Storefront uses customer authentication; Back Office uses administrator authentication; Merchant uses merchant-scoped authentication that restricts every call to a single merchant's data; the data and event types use system credentials issued by the platform operator.

---

## Why API Platform integration

What you get, in developer terms:

- **Contract-first APIs** → the contract is the source of truth, so you can generate typed clients and catch breaking changes before they ship.
- **Versioning and content negotiation** → platform upgrades stop silently breaking your integration; you opt into changes.
- **`application/csv`, `application/xml`, `application/ld+json`** → your ERP or PIM integration can drop its custom transformation layer and exchange the format it already speaks.
- **Built for large data exchange** → bulk import/export is a first-class path, not a workaround.
- **Standardized integration patterns** → the same conventions across every API type, so a second integration is faster than the first.
- **Runs alongside Glue** → adopt it per endpoint, with no flag day and nothing to switch off.

---

## Before and after: your migration decision

You only have a decision to make if you're on Glue and weighing a move. Here's the whole picture:

| | On Glue today | After moving to API Platform integration |
| --- | --- | --- |
| Existing endpoints | Keep working, supported, no EOL | Unchanged — migrate only what you choose |
| New endpoints you build | Possible, but no new Spryker features land here | Recommended path; new features available |
| Breaking changes on upgrade | Possible | Controlled through versioning |
| Data format handling | Custom transformation in your code | Native CSV / XML / JSON-LD |
| Effort to adopt | — | Incremental, endpoint by endpoint |

**You should consider moving when** you're building a new integration, exchanging large datasets, connecting an external system (ERP, PIM, OMS), or you want upgrade-safe versioning. **You can stay on Glue** indefinitely for everything that already works.

Spryker supports the move with documentation of behavioral differences, endpoint-by-endpoint migration, and conversion tools and reference implementations.

---

## Timeline

API Platform integration is generally available. The rollout ran as follows:

| Milestone | When | What it means |
| --- | --- | --- |
| Early access | Through Q1 2026 | Available for new features ahead of GA, with a limited support scope; native features (authentication, codebuckets, full JSON:API) not yet fully integrated |
| Glue feature freeze | From Q1 2026 | New Spryker features target API Platform integration only. Glue gets bugfixes, security, and compatibility — no new endpoints |
| General availability | Apr 30, 2026 | Full support; recommended for all new integrations |
| Glue REST module migration | Through Q2 2026 | Spryker-provided modules move to API Platform. Check the [migration status page](/docs/dg/dev/architecture/api-platform/migrate-to-api-platform-status.html) |

The Q1 feature freeze and the April GA work together: from Q1, new features were built on API Platform integration and shipped through the **early-access** window, reaching full support at GA. Feature freeze means no new Glue functionality — it is not deprecation, and there is no End-of-Life.

---

## FAQ

These cover the edge cases the tables above don't.

**Is API Platform integration something I call, or something underneath what I call?**
Underneath. You call an API type (Storefront, Back Office, and so on). API Platform integration is the foundation it's built on, replacing Glue for new work.

**How is the Backend API application different from the Back Office API type?**
The Backend API is the application that hosts several types. Back Office is one of those types, for administrator-level operations. Same word root, different axis.

**How is the Merchant API different from the Back Office API?**
Back Office serves Spryker administrators with platform-wide scope. Merchant serves a single marketplace merchant — every call is restricted to that merchant's own data.

**How is the Merchant API different from the Merchant Data Exchange API?**
Both are merchant-scoped. Merchant API is for record-by-record operations through interfaces and tools. Merchant Data Exchange API is for bulk, file-based, or queue-based flows between a merchant's systems and the marketplace.

**How is the Data Exchange API different from the Merchant Data Exchange API?**
Same capabilities, different scope. Data Exchange operates at platform level with operator credentials. Merchant Data Exchange is restricted to one merchant's data with per-merchant credentials.

**How is the Data Exchange API different from the Async Event API?**
Data Exchange is request-driven — your system calls Spryker to import, export, or read. Async Event is event-driven — Spryker notifies your system when something happens. Choose by whether you poll or react.

**Do I have to migrate my existing Glue APIs?**
No. Migration is optional and there is no End-of-Life.
