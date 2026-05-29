---
title: API Platform migration overview
description: End-to-end walk-through for migrating an existing Spryker shop from Glue REST to API Platform.
last_updated: May 29, 2026
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

This document walks through migrating an existing Spryker shop from Glue REST to API Platform. It covers the order to do things in: upgrade the migrated modules, confirm project configuration, batch-migrate, verify, then clean up. Module-by-module mechanics live in the [per-module guide](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html); project-level setup lives in the [integration guide](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html).

## What you're migrating to

API Platform replaces the internal infrastructure that Glue REST uses to serve API endpoints. Externally, contracts remain backward-compatible — clients keep working. Internally:

- **No more Controllers, Readers, or RestResourceBuilders.** Endpoint behavior is defined in YAML resource schemas plus a Provider (reads) and a Processor (writes).
- **Routing happens via API Platform**, served through `SymfonyFrameworkRouterPlugin`. The `GlueRouterPlugin` continues to serve any modules that haven't been migrated yet — they coexist by router order.

{% info_block infoBox "Migrated modules no longer rely on Controllers/Readers" %}

Once a module is migrated, its endpoint wiring is the API Platform resource schema and the Provider/Processor pair — not a `*ResourceRoutePlugin` plus a `*Reader`. If you find both, you're mid-migration; finish the switch (Step 3) before considering that module done.

{% endinfo_block %}

## Prerequisites

Before starting the migration, confirm:

- **Symfony Dependency Injection is in place.** See [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html).
- **API Platform is integrated** at the project level (bundles registered, project configuration applied, Symfony container compiled). See [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html).
- **PHP 8.1+ and Symfony 6.4+.**
- **You know which modules you're migrating.** The [Glue API to API Platform migration status page](/docs/dg/dev/architecture/api-platform/migrate-to-api-platform-status.html) lists every module, its migration status, and its prerequisites.
- **Existing Glue API tests pass** on your current shop before you start changing anything. The cleanest signal that the migration is working is that those tests keep passing through every step.

## Step 1 — Upgrade the migrated modules

A shop already lists its `spryker/*-rest-api` modules in the project `composer.json`, so upgrading them to versions that ship the API Platform schemas is a single pattern update:

```bash
composer update "spryker/*-rest-api" --with-dependencies
```

{% info_block warningBox "Endpoints are NOT yet routed after Step 1" %}

Updating the modules ships the API Platform resource schemas and the new Providers/Processors, but **all traffic still goes through the Glue plugins**. You will not see new behavior at this point — that's expected. Routing flips in Step 3, after the project configuration is in place and the Glue plugins are removed.

{% endinfo_block %}

## Step 2 — Confirm project configuration

API Platform must be integrated at the project level before any module can be served through it. This is the integration step, not part of the migration itself — follow [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html), which covers:

- Registering the bundles in `config/<Application>/bundles.php`.
- The `spryker_api_platform.php` config (including `excludedPathFragments` for the modules you keep on Glue).
- Wiring the router so `GlueRouterPlugin` and `SymfonyFrameworkRouterPlugin` coexist in the correct order.

For the per-setting `api_platform.php` reference, see [API Platform Configuration](/docs/dg/dev/architecture/api-platform/configuration.html). For authentication and authorization, see [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html).

## Step 3 — Batch migration (default)

The actual switch from Glue REST to API Platform for a given module is **removing that module's `*ResourceRoutePlugin` from the project-level dependency provider**. This is the single edit that flips routing.

Edit the dependency provider for the stack the module belongs to:

- Storefront API: `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider::getResourcePlugins()`
- Backend API: `src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider::getResourcePlugins()`
- Combined Glue: `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider::getResourceRoutePlugins()`

Remove the line that registers the migrated module's `*ResourceRoutePlugin`. Once removed, `GlueRouterPlugin` no longer finds a match for that resource and the request falls through to `SymfonyFrameworkRouterPlugin`, which serves it via API Platform.

{% info_block warningBox "Plugin removal is the switch — not excludedPathFragments" %}

`excludedPathFragments` in `spryker_api_platform.php` controls what the schema generator emits. It does **not** flip routing. A module stays on Glue as long as its `*ResourceRoutePlugin` is still registered in the project dependency provider, regardless of what `excludedPathFragments` says.

The `spryker/<module>-rest-api` composer package stays installed after you remove the plugin — it just no longer serves routes.

{% endinfo_block %}

### Module dependency order

Some modules cannot be migrated before their dependencies. The prerequisites for each module are tracked in the **Requires** column of the [migration status page](/docs/dg/dev/architecture/api-platform/migrate-to-api-platform-status.html) — migrate the listed prerequisites first (or in the same batch). For example, `ProductPricesRestApi` requires `ProductsRestApi`, so `ProductsRestApi` must be migrated first.

## Step 4 — Verify

After the plugins are removed and the project configuration is in place, verify each migrated endpoint end-to-end. **Now** all migrated endpoints should work via API Platform.

1. **List API Platform resources** per stack:

   ```bash
   docker/sdk cli glue api:debug --list
   docker/sdk cli GLUE_APPLICATION=GLUE_STOREFRONT glue api:debug --list
   docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:debug --list
   ```

   Expected: every resource belonging to a module you removed a `*ResourceRoutePlugin` for appears here under its corresponding stack. The list shows resource names, not module names.

2. **Run the existing Glue API test suite**. All tests should still pass — both the migrated endpoints (now served via API Platform) and any modules still on Glue:

   ```bash
   docker/sdk testing codecept run
   ```

3. **Confirm OpenAPI is generated** at the root URL of each stack:

   - `https://glue.<your-domain>/`
   - `https://glue-storefront.<your-domain>/`
   - `https://glue-backend.<your-domain>/`

   Each should render the interactive OpenAPI documentation, including the migrated resources.

## Step 5 — Cleanup

Once a module is migrated and Step 4 is green, clean up the remaining Glue artifacts for it.

1. **Remove the module's `*ResourceRoutePlugin` registration** (done in Step 3) and any project-level Glue overrides for that module under `src/Pyz/Glue/<Module>RestApi/`. Many projects have no such directory; only remove what your project actually added. The migration itself lives in the `spryker/<module>-rest-api` vendor package, which stays installed.

2. **Drop `GlueRouterPlugin`** from the router dependency provider — only when **every** module in the stack is migrated:

   `src/Pyz/Glue/Router/RouterDependencyProvider.php`

   ```php
   protected function getRouterPlugins(): array
   {
       return [
           // new GlueRouterPlugin(), // ← Remove once no modules remain on Glue
           new SymfonyFrameworkRouterPlugin(),
       ];
   }
   ```

3. **Remove Glue-specific tests** that are no longer relevant. Replace with API Platform tests if coverage gaps remain.

The endpoint URLs do not change — the migration is fully backward-compatible — so existing API consumers and integrations keep working without updates.
