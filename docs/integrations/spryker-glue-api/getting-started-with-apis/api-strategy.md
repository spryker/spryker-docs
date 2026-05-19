---
title: Spryker API Strategy
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: January 9, 2026
template: default
layout: custom_new
---

## Overview

Spryker is introducing **API Platform–based integration** as the strategic integration layer for new features while maintaining full support for existing Glue APIs. This additive approach protects existing implementations, avoids forced migrations, and enables a modern integration foundation for future development.

{% info_block warningBox "Important" %}

- Existing Glue API implementations remain supported with no End-of-Life planned
- Migration is optional—customers decide if and when to adopt API Platform integration
- All existing endpoints and integrations continue to work unchanged

{% endinfo_block %}

---

## API Platform Integration

[API Platform–based integration](/docs/dg/dev/architecture/api-platform.html) provides:

- contract-first APIs
- standardized integration patterns
- enhanced support for large data exchange
- improved developer experience
- parallel use with Glue APIs for Storefront and Backend integrations
- additional media types: application/xml, application/csv, application/json+ld

### Availability Timeline

- **Early access:** until end of Q1 2026
  - limited support scope
  - native Spryker features (authentication, codebuckets, full JSON:API support) not fully integrated
- **General Availability:** Next Product Release

---

## Glue APIs: Continued Support

Glue Storefront API and Glue Backend API remain supported, maintained, and secured with:

- All existing endpoints preserved
- Continued bugfixes and security updates
- Compatibility maintenance
- No removal of functionality

### Feature Freeze (Q1 2026 onward)

From Q1 2026, Glue APIs enter feature freeze:
- New Spryker features use API Platform integration exclusively
- No new Glue endpoints for new features
- Existing endpoints receive bugfixes, security updates, and compatibility fixes

{% info_block infoBox %}

Feature freeze means no new functionality—not deprecation or End-of-Life.

{% endinfo_block %}

---

## Comparison

| Topic                | Glue APIs          | API Platform Integration |
| -------------------- | ------------------ | ------------------------ |
| Existing features    | Supported          | Supported                |
| New Spryker features | ❌ No new endpoints | ✅ Default integration    |
| Forced migration     | ❌ No               | ❌ No                     |
| End-of-Life planned  | ❌ No               | ❌ No                     |
| Bugfixes & security  | ✅ Yes              | ✅ Yes                    |
| Strategic investment | Limited            | Primary focus            |

---

## Choosing the Right Integration

### Use Glue APIs for

- extending existing projects
- maintaining current integrations
- storefront interactions

### Use API Platform Integration for

- new integrations (recommended starting 2026)
- backend system-to-system communication (ERP, PIM, OMS)
- large dataset exchanges
- new Spryker features
- long-term scalability requirements
- projects requiring specific formats, versioning, or API Platform features

### Migration Path

Migration from Glue APIs is optional. Consider migrating when:
- building new integrations
- exchanging large datasets
- integrating external systems (ERP, PIM, OMS)
- planning long-term platform evolution
- project requirements align with API Platform features (supported formats, versioning, etc.)

Spryker provides:
- documentation of behavioral differences
- incremental migration support (endpoint-by-endpoint)
- conversion tools and reference implementations

---

## FAQ

**Do I have to migrate my existing Glue APIs?**<br>
No. Migration is optional. Existing Glue APIs remain supported.

**Will Glue APIs be removed?**<br>
No. There is no End-of-Life planned.

**Can I still build custom features using Glue in my project?**<br>
Yes. You can continue using Glue APIs in your projects. However, new Spryker core features after Q1 2026 will not introduce new Glue endpoints.

**Is API Platform integration mandatory?**<br>
No. It is recommended for new integrations, but existing Glue usage remains valid.

**When should I start using API Platform integration?**<br>
Early adoption is available during Q1 2026. For new integrations, use API Platform integration from General Availability (Next Product Release) onward.