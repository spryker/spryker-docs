---
title: Spryker API Strategy for 2026
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: January 9, 2026
template: default
layout: custom_new
---

## Overview

Spryker is evolving its API strategy by introducing **API Platform–based integration** as a **new, strategic integration layer**, while continuing to **fully support existing Glue APIs**.

This evolution is designed to:

- protect existing customer implementations,
- avoid forced migrations,
- and enable a modern, future-ready integration approach for new Spryker features.

{% info_block warningBox "Important" %}

Existing Glue API implementations remain supported.
There is **no forced migration** and **no End-of-Life planned** for Glue APIs.

{% endinfo_block %}

---

## Key Principles

- **Stability first** – existing APIs continue to work
- **No forced migration** – customers decide if and when to migrate
- **Backward compatibility** – existing features remain unchanged
- **Clear direction** – new features use a modern integration foundation
- **Transparency** – predictable timelines and rules

---

## What Stays the Same

### Glue APIs

- Glue Storefront API and Glue Backend API remain:
  - supported
  - maintained
  - secured
- Existing Glue endpoints are **not removed**
- Existing customer integrations continue to run unchanged

### Existing Projects

- No migration required
- No deadlines imposed
- No loss of functionality

{% info_block infoBox %}

**If you are using Glue APIs today, nothing breaks and nothing must be changed.**

{% endinfo_block %}

---

## What Is Changing

Spryker is introducing [**API Platform–based integration**](/docs/dg/dev/architecture/api-platform.html) into its infrastructure code.

This new integration layer provides:

- contract-first APIs
- standardized integration patterns
- better support for large data exchange
- better developer experience
- can be used in parallel with Glue APIs for Storefront and Backend integrations

This change is **additive**, not a replacement for Glue APIs.

---

## Timeline & Lifecycle

### API Platform Integration

- **Early access:** until end of **Q1 2026**
- **General Availability:** **Next Product Release**

### During Early access

- early adoption is possible
- support scope is limited
- native Spryker features (authentication, codebuckets, full support JSON:API) are not fully integrated yet

### New Feature Development Policy

From **Q1 2026 onward**:

- All **new Spryker features** are created with **API Platform–based integration**
- No new Glue endpoints are introduced for new features
- Existing Glue endpoints remain unchanged and supported

### Glue APIs After Q1 2026

- Glue Storefront and Backend APIs enter **feature freeze**
- They continue to receive:
  - bugfixes
  - security updates
  - compatibility maintenance
- **No End-of-Life is planned**

{% info_block infoBox %}

Feature freeze does **not** mean deprecation.

{% endinfo_block %}

---

## What Changes vs What Stays the Same

| Topic                | Glue APIs          | API Platform Integration |
| -------------------- | ------------------ | ------------------------ |
| Existing features    | Supported          | Supported                |
| New Spryker features | ❌ No new endpoints | ✅ Default integration    |
| Forced migration     | ❌ No               | ❌ No                     |
| End-of-Life planned  | ❌ No               | ❌ No                     |
| Bugfixes & security  | ✅ Yes              | ✅ Yes                    |
| Strategic investment | Limited            | Primary focus            |

---

## Migration Strategy

### No Forced Migration

- Migration is **optional**
- Customers migrate **only if and when it makes sense**
- Glue APIs remain supported long-term

### When Migration Makes Sense

You may consider API Platform integration when:
- building **new integrations**
- exchanging **large datasets**
- integrating **external systems** (ERP, PIM, OMS)
- planning long-term platform evolution
- project requirements align better with API Platform features(supported formats, versioning, etc.)

### Migration Support

Spryker provides:
- documentation of behavioral differences
- existing Glue API endpoint can be migrated to API Platform integration one-by-one
- tools to help convert existing endpoints
- reference implementations and examples

---

## Developer Guidance

### Use Glue APIs When

- extending existing projects
- working with storefront interactions
- maintaining current integrations

### Use API Platform Integration When

- implementing new integrations
- working with backend system-to-system communication
- building new Spryker features
- planning long-term scalability

{% info_block infoBox %}

**Recommendation**
For new integrations starting in 2026, API Platform integration is the preferred choice.

{% endinfo_block %}

---

## FAQ

**Do I have to migrate my existing Glue APIs?**<br>
No. Migration is **not required**. Existing Glue APIs remain supported and functional.

**Will Glue APIs be removed?**<br>
No. There is **no End-of-Life planned** for Glue APIs.

**What does "feature freeze" mean?**<br>
Feature freeze means:
- no new functionality is added
- security updates, bugfixes, and compatibility fixes continue

**Can I still build new features using Glue?**<br>
New **Spryker core features** will not introduce new Glue endpoints after Q1 2026.
Customers may continue to use Glue in their projects, but new platform features are exposed via API Platform integration.

**Is API Platform integration mandatory?**<br>
No. It is **recommended for new integrations**, but existing Glue usage remains valid.

**Why is Spryker introducing API Platform integration?**<br>
To provide:
- a modern, standardized integration layer
- better scalability for data exchange
- clearer long-term API evolution
- improved developer experience
- more OOTB media types such as application/xml, application/csv application/json+ld, etc.

**When should I start using API Platform integration?**
- Early adoption: during early access (Q1 2026)
- Default choice: from Global Availability (Next Product Release) for new integrations

---

## Summary

- Glue APIs remain **supported and stable**
- No existing functionality is removed
- No forced migrations
- API Platform integration enables future growth
- New features move forward on a modern integration foundation

Spryker's API strategy ensures **continuity for existing customers** and **innovation for future development** — without disruption.
