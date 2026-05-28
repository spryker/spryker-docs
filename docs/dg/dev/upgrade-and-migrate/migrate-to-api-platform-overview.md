---
title: API Platform migration overview
description: End-to-end walk-through for migrating an existing Spryker shop from the legacy Glue REST stack to API Platform.
last_updated: 2026-05-28
template: howto-guide-template
related:
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: How to migrate to API Platform (per module)
    link: docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html
  - title: How to upgrade to Symfony Dependency Injection
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
---

This document is the single entry point for migrating an existing Spryker shop from the legacy Glue REST stack to API Platform. It covers the full path: upgrade the shop baseline, apply project configuration, batch-migrate modules, verify, then clean up. Module-by-module mechanics live in the [per-module guide](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html); project-level setup details live in the [integration guide](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html). This document tells you the order to do them in.

## What you're migrating to

API Platform replaces the internal infrastructure that Glue REST uses to serve API endpoints. Externally, contracts remain backward-compatible — clients keep working. Internally:

- **No more Controllers, Readers, or RestResourceBuilders.** Endpoint behavior is defined in YAML resource schemas plus a Provider (reads) and a Processor (writes).
- **Routing happens via API Platform**, served through `SymfonyFrameworkRouterPlugin`. The legacy `GlueRouterPlugin` continues to serve any modules that haven't been migrated yet — they coexist by router order.

{% info_block infoBox "Migrated modules no longer rely on Controllers/Readers" %}

Once a module is migrated, its endpoint wiring is the API Platform resource schema and the Provider/Processor pair — not a `*ResourceRoutePlugin` plus a `*Reader`. If you find both, you're mid-migration; finish the switch (Step 3) before considering that module done.

{% endinfo_block %}
