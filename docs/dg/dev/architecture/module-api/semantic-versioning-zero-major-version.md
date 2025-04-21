---
title: Semantic Versioning - Zero-Major Version
description: Spryker releases early as zero-major. Learn more about them and their connection to the Early Access features in this document.
last_updated: Apr 9, 2025
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/architecture/module-api/module-api.html
related:
  - title: Semantic versioning - major vs. minor vs. patch release
    link: docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html
---


Spryker adheres to [semantic versioning](https://semver.org/) to communicate the stability and expected impact of changes within its modules. As part of this versioning scheme, any module with a version *below 1.0.0* is considered a *zero-major* module.

This document describes what using such a module means for *developers* and *project stakeholders*, focusing on technical expectations, functional completeness, and versioning behavior.

## Zero-major module definition

Zero-major modules are *early-stage implementations* that are publicly released for evaluation and early integration. These modules follow a versioning pattern of `0.x.x` and are not considered stable.

A module remains zero-major until it reaches version *1.0.0*, at which point it is considered **stable** and the full set of [semantic versioning guarantees](https://docs.spryker.com/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) apply.

## Technical characteristics of zero-major modules

| Characteristic                              | Description                                                                 |
|--------------------------------------------|-----------------------------------------------------------------------------|
| Backward Compatibility (BC)            | ❌ Not guaranteed, breaking changes may occur between `0.x.x` versions, and even as the module reaches `1.0.0`. |
| Migration Effort Predictability        | ❌ No guarantee, updates may introduce significant migration requirements. |
| Code Quality                           | ✅ Production-level, code must be free of known bugs.                      |
| Non-Functional Requirements (NFRs)     | ⚠️ May be partially met for example performance, scalability, entity count handling. |

While the code is expected to be operational and error-free, **NFRs may not be fully addressed** in a zero-major module. These aspects are typically matured and optimized closer to the 1.0.0 milestone.

---

## Business Characteristics

From a business perspective, zero-major modules are **not feature-complete** and **subject to change**. 

| Characteristic                         | Description                                                                  |
|----------------------------------------|------------------------------------------------------------------------------|
| **Liability**                          | ⚠️ Early Access functionality (see below).                                   |
| **Functional Gaps**                    | ⚠️ May exist, not all use cases or workflows may be supported yet.           |
| **Business Logic Stability**           | ❌ Not guaranteed, feature definitions may evolve up until 1.0.0.            |
| **Production Readiness**               | ⚠️ Validation recommended, depends on specific use case and module maturity. |

Business logic and behaviors may be redefined based on feedback, internal alignment, or ongoing development needs.

Important: **Early Access functionality** is not recommended for use in production environments and are not covered by Spryker's SLAs. These features are typically developed during the R&D phase and are made available primarily for educational and experimental purposes.

---

## What are the Gaps?

The level of readiness and the presence of gaps in a zero-major module can vary by case. To assess whether a zero-major module meets your project's technical and functional requirements, alignment with Spryker is essential.
- Which functional and non-functional capabilities are currently covered  
- Any known limitations or planned changes  

This ensures transparency around the module's maturity and avoids unexpected issues during integration.

---

## When Should You Use a Zero-Major Module?

- ✅ You want early access to upcoming functionality  
- ✅ You're building a PoC or MVP and can tolerate change  
- ✅ You've aligned with Spryker on current capabilities
- ❌ You require long-term BC and NFR guarantees today  
- ❌ You cannot afford migration costs in short iterations

---

## Related Topics

- [Semantic Versioning: Major vs. Minor vs. Patch Release](https://docs.spryker.com/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html)
