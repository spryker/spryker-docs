---
title: Migrate SASS to v1.97.0. Move Yves FE Builder to the ShopUi module
description: This document describes how to migrate the Demo Shop from legacy Sass @import to @use/@forward and the new ShopUi frontend builder.
last_updated: Jul 07, 2026
template: howto-guide-template
---

## Integrating the Sass module-system migration into the Demo Shop

This guide explains how to integrate the **Sass module-system migration** into the **Spryker Demo Shop**.

The update replaces:

- the legacy Sass build flow based on `@import` and implicit global injections (historically via `sass-resources-loader`),
- with the **Sass module system** using `@use` / `@forward`, aligned with the **ShopUi vendor builder**.

You run the migration using the provided codemod script (`migrate-sass.mjs`), which performs most changes automatically.

### Scope

This guide covers:

- running the migration script and its phases,
- frontend builder file changes (bootstrap + project settings override),
- TypeScript `tsconfig` path aliases required by the new style imports,
- Sass module-system rules you must follow after the migration,
- verification and troubleshooting.

### Audience

Use this guide if you maintain an **existing, customized** B2B Demo Shop with local SCSS overrides.

### Prerequisites

Before you start, make sure you have:

- a clean Git working tree (commit or stash changes),
- Node.js available (the migration is a Node script),
- updated Composer dependencies that include the ShopUi builder and module-system styles.

{% info_block infoBox "Info" %}
The migration script validates prerequisites during its preflight phase and stops early if your installed vendor packages are not compatible.
{% endinfo_block %}

## 1. Update Composer dependencies

The migration requires a ShopUi version that ships:

- the frontend builder entry: `vendor/.../ShopUi/builder/build.mjs`,
- the module-system shared hub: `vendor/.../ShopUi/Theme/default/styles/shared.scss` that contains `@forward`.

Update your project dependencies as you normally do (for example, by updating the relevant Spryker packages and running Composer install/update).

{% info_block warningBox "Warning" %}
Do not run the codemod before the vendor packages are updated. The migration relies on the presence of the new builder and the new vendor styles.
{% endinfo_block %}

## 2. Run the migration script

Run the migration from the demoshop repository root:

```bash
node migrate-sass.mjs
```

The script is **idempotent**: you can re-run it after manual fixes or after partial runs.

### 2.1 Dry run

To see what would change without writing files:

```bash
node migrate-sass.mjs --dry-run
```

### 2.2 Run only specific phases

To limit the migration scope:

```bash
node migrate-sass.mjs --phase=frontend,tsconfig,hub,components
```

### 2.3 Skip verification

If you want to run structural changes first and verify later:

```bash
node migrate-sass.mjs --skip-verify
```

### 2.4 Modernize-only mode

If your project is already migrated structurally and you only want to fix Sass deprecations (for example, global built-in functions or invalid selectors), run:

```bash
node migrate-sass.mjs --modernize-only
```

## 3. Install updated frontend dependencies

The frontend phase updates `package.json` scripts and development dependencies.

After you run the script, install Node dependencies:

```bash
npm install
```

{% info_block infoBox "Info" %}
The verify phase uses `sass-embedded`. If you skip `npm install`, verification fails even if your SCSS changes are correct.
{% endinfo_block %}

## 4. What the migration changes

### 4.1 Frontend builder integration

The script removes legacy frontend build files and writes a new builder bootstrap.

After the migration, expect the following files to exist:

- `frontend/build.mjs` — builder bootstrap that calls the vendor builder `run()`.
- `frontend/settings.override.mjs` — project-level builder settings override.
- `frontend/configs/asset-blacklist.mjs` — project asset compilation blacklist.
- `frontend/libs/stylelint.mjs` — stylelint runner.
- `frontend/libs/design-tokens.mjs` — optional design token build hook.

`package.json` scripts are updated to call `node ./frontend/build.mjs` (for example: `yves`, `yves:watch`, `yves:production`).

The script also replaces `sass` with `sass-embedded` in `devDependencies`, and removes `sass-resources-loader` if present.

{% info_block infoBox "Info" %}
The legacy webpack-based image optimization integration (as described in [Implement Image Optimization](/docs/dg/dev/frontend-development/latest/yves/implement-image-optimization.html)) was removed from the demoshop builder flow.

This is intentional:

- Spryker projects typically **serve images from third-party resources** (for example, CDNs, DAM systems, or other external media services) rather than relying on build-time image processing in the storefront repository.
- In that setup, image transformations (compression, resizing, format conversion) are handled closer to the delivery edge, and the storefront build stays focused on compiling assets (CSS/JS) consistently.

If you still require build-time optimization for locally stored images, reintroduce it as a project-specific build step (for example, as a dedicated builder hook) so it stays explicit and maintainable.
{% endinfo_block %}

#### Blocking components from building: migrate from `$setting-import-blacklist` to `asset-blacklist.mjs`

If your project previously blocked component styles via the legacy Sass blacklist variable, you must migrate that logic to the new builder configuration.

- **Old approach (legacy):** you added component patterns to the Sass variable `$setting-import-blacklist` (used by the legacy `helper-import` mechanism). This blocks **only SCSS** from being built. Component JavaScript may still be discovered and bundled.
- **New approach (current):** `frontend/configs/asset-blacklist.mjs` lets you exclude **both SCSS and JavaScript** entry points from the Yves build.

**What you need to do**

1. Locate your `$setting-import-blacklist` configuration (and any project documentation around blocked components).
2. Copy the intent (the same component patterns) into `frontend/configs/asset-blacklist.mjs` as glob patterns.
3. If a blocked component also has JavaScript entry points, blacklist them too (this is the key behavioral change versus the legacy approach).

**Why this matters**

With the legacy approach, you could exclude a component’s styles but still ship its JavaScript. With `asset-blacklist.mjs`, you can disable a component consistently at build time (styles and scripts).

{% info_block infoBox "Info" %}
`asset-blacklist.mjs` is evaluated by the ShopUi frontend builder using the configured source roots in `frontend/settings.override.mjs`.
{% endinfo_block %}

{% info_block warningBox "Warning" %}
If you maintain custom frontend build logic under `frontend/`, review `frontend/settings.override.mjs` carefully. The migration only overwrites known legacy files; it does not delete arbitrary project-specific scripts.
{% endinfo_block %}

### 4.2 TypeScript path aliases (`tsconfig`)

The script ensures the following path aliases exist in your Yves TypeScript configuration:

- `ShopUi/*` → resolves to the vendor ShopUi theme.
- `src/ShopUi/*` → resolves to the project ShopUi theme.

These aliases are required because the migrated SCSS uses imports like:

- `@use 'ShopUi/styles/...';` for vendor modules,
- `@use 'src/ShopUi/styles/...';` for project modules.

## 5. Sass module-system rules after migration

### 5.1 Treat `shared.scss` as a forward-only hub

The project hub `src/Pyz/Yves/ShopUi/Theme/default/styles/shared.scss` is rewritten as a **pure forward hub**.

Rules:

- Do not emit CSS from `shared.scss`.
- Keep the order **settings first, helpers second**.

Reason: components `@use` the shared hub. If `shared.scss` emits CSS, every component that loads it duplicates that CSS.

### 5.2 Always configure vendor settings via `src/ShopUi/...` (never directly)

Project settings files under `src/Pyz/Yves/ShopUi/Theme/default/styles/settings/` configure vendor settings using:

- `@forward 'ShopUi/styles/settings/<name>' with (...)`.

After the migration:

- Do not load vendor settings directly as `@use 'ShopUi/styles/settings/<name>'` from project code.
- Always load them through the project wrapper:

```scss
@use 'src/ShopUi/styles/settings/<name>' as *;
```

Reason: Sass modules load once. If a vendor settings module is loaded before it is configured with `with (...)`, it becomes impossible to configure it later and compilation fails.

### 5.3 Component SCSS entry-point convention

For components/templates/views, the migration prepends:

```scss
@use 'src/ShopUi/styles/shared' as *;
```

This ensures your component has access to the configured settings and shared helper mixins/functions.

### 5.4 `@include` moved into `style.scss` (when needed)

If a component SCSS contained **trailing top-level** `@include` statements (for example, legacy pattern where including a mixin emitted the final CSS), the script may:

- move these includes into a sibling `style.scss`,
- and update the component `.ts` import to import `./style.scss`.

This keeps the base SCSS file reusable as a module, while the `style.scss` acts as the build entry that emits CSS.

### 5.5 Deprecated built-ins and invalid selectors

The script modernizes:

- deprecated global built-ins, for example:
  - `map-get(...)` → `map.get(...)` and adds `@use 'sass:map';`
- invalid selectors with leading combinators, for example:
  - `+ & { ... }` → `& + & { ... }`

{% info_block warningBox "Warning" %}
Rewriting `+ &` to `& + &` can activate CSS rules that browsers previously dropped silently. Verify affected components visually.
{% endinfo_block %}

## 6. Verify the migration

### 6.1 Run a frontend build

Run the standard Yves build for your project:

```bash
npm run yves
```

Also verify production mode:

```bash
npm run yves:production
```

### 6.2 Verify SCSS compilation (script verify phase)

By default, `node migrate-sass.mjs` ends with a verify phase that compiles migrated stylesheets using `sass-embedded` and the same alias resolution rules.

If you ran with `--skip-verify`, run verification later by re-running the script without that flag.

## 7. Troubleshooting

### 7.1 Preflight error: ShopUi builder missing

**Symptom:** The script fails early and reports that the ShopUi builder entry does not exist.

**Cause:** Vendor packages are not updated to a version that ships the builder.

**Fix:** Update Composer dependencies so ShopUi provides `builder/build.mjs`, then rerun the script.

### 7.2 Preflight error: vendor `shared.scss` not `@forward`-based

**Symptom:** The script reports that vendor `styles/shared.scss` is not `@forward`-based.

**Cause:** ShopUi styles are still on the legacy `@import` approach.

**Fix:** Update vendor dependencies to a version that supports the Sass module system.

### 7.3 Sass error: “This module was already loaded, so it cannot be configured using with”

**Symptom:** Sass compilation fails with an error similar to:

- `This module was already loaded, so it cannot be configured using with`.

**Cause:** A vendor settings module was loaded directly (for example, `@use 'ShopUi/styles/settings/colors'`) before the project wrapper module configured it.

**Fix:**

- Replace direct vendor settings loads with `@use 'src/ShopUi/styles/settings/<name>' as *;`.
- Ensure `src/ShopUi/styles/shared` is loaded before any vendor helper/util module that depends on settings.

### 7.4 Sass error: missing TS alias / cannot resolve import

**Symptom:** Sass cannot resolve imports like `src/ShopUi/...` or `<Module>/...`.

**Cause:** Required `tsconfig` path aliases are missing.

**Fix:** Re-run the script with `--phase=tsconfig` and commit the updated tsconfig.

### 7.5 Visual regressions after bogus combinator fix

**Symptom:** Visual changes appear in components whose SCSS included selectors like `+ &`.

**Cause:** The migration rewrites `+ &` to `& + &`, which changes invalid CSS into valid CSS.

**Fix:** Review the affected selectors and confirm the intended behavior.

{% info_block infoBox "Info" %}
If you need to re-run only deprecation fixes across the whole project, use `node migrate-sass.mjs --modernize-only`.
{% endinfo_block %}

## 8. Commit strategy

For easier reviews, apply and commit the migration in separate commits:

1. Composer dependency update (vendor ShopUi builder + styles).
2. Frontend builder + `package.json` changes.
3. `tsconfig` alias changes.
4. ShopUi styles hub migration.
5. Component/template/view migration.
6. Manual fixes and visual regression adjustments.
