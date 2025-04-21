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

- ❌ Backward compatibility is not guaranteed: breaking changes may occur between `0.x.x` versions and even after reaching `1.0.0`  
- ❌ Migration effort is unpredictable: updates may introduce significant migration requirements  
- ✅ Code must be production-level and free of known bugs  
- ⚠️ Non-functional requirements may be only partially met, such as performance, scalability, and handling of high entity counts  


While the code is expected to be operational and error-free, *NFRs may not be fully addressed* in a zero-major module. These aspects are typically matured and optimized closer to the 1.0.0 milestone.

---

## Business characteristics

From a business perspective, zero-major modules are *not feature-complete* and *subject to change*. 

- Liability is limited because of Early Access functionality  
- Functional gaps may exist: not all use cases or workflows may be supported
- Business logic stability is not guaranteed: feature definitions may evolve until version 1.0.0  
- Production readiness requires validation and depends on the specific use case and module maturity  


Business logic and behaviors may be redefined based on feedback, internal alignment, or ongoing development needs.

{% info_block warningBox %}

Early Access functionality is not recommended for use in production environments and is not covered by Spryker's SLAs. These features are typically developed during the R&D phase and are made available primarily for educational and experimental purposes.

{% endinfo_block %}



## Evaluating module readiness and gaps

The readiness and potential gaps in a zero-major module can vary. To determine if it meets your project’s technical and functional needs, align with us to assess the following:

- Which functional and non-functional capabilities are currently supported  
- Limitations or planned changes  

This gives you a solid understanding of the module's maturity and avoids unexpected issues during integration.


## Zero-major module use cases

You might want to use a zero-major module in the following cases:
- ✅ You want early access to upcoming functionality  
- ✅ You're building a PoC or MVP and can tolerate change  
- ✅ You've aligned with us on the module's capabilities and limitations

You should not use a zero-major module in the following cases:
- ❌ You require long-term BC and NFR guarantees
- ❌ You can't afford migration costs in short iterations

---

## Related Topics

- [Semantic Versioning: Major vs. Minor vs. Patch Release](https://docs.spryker.com/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html)



























