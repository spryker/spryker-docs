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

For the API types on the roadmap, guidance on choosing between them, why API Platform integration, your migration decision, and the rollout timeline, see [Spryker API roadmap and adoption](/docs/integrations/spryker-glue-api/getting-started-with-apis/api-roadmap-and-adoption.html).

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
