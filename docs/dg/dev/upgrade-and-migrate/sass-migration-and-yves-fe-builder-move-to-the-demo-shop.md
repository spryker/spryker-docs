---
title: Migrate SASS to v1.97.0: Move Yves FE Builder to the ShopUi module
description: This document describes how to migrate the Demo Shop from the legacy Sass `@import` syntax to the `@use`/`@forward` module system and the new ShopUi frontend builder.
last_updated: Jul 09, 2026
template: howto-guide-template
---

# Integrate the Sass module-system migration into the Demo Shop

This guide explains how to integrate the **Sass module-system migration** into the **Spryker Demo Shop**.

The update replaces:

- the legacy Sass build flow based on `@import` and implicit global injections (historically through `sass-resources-loader`)
- the **Sass module system** that uses `@use` and `@forward`, aligned with the **ShopUi vendor builder**

Run the migration by using the provided codemod script (`migrate-sass.mjs`), which performs most of the required changes automatically.

## Scope

This guide covers:

- running the migration script and its phases
- frontend builder file changes (bootstrap and project settings override)
- TypeScript `tsconfig` path aliases required by the new style imports
- Sass module-system rules that you must follow after the migration
- verification and troubleshooting

## Audience

Use this guide if you maintain an **existing, customized** B2B Demo Shop with local SCSS overrides.

## Prerequisites

Before you start, make sure that you have:

- a clean Git working tree (commit or stash your changes)
- Node.js installed and available because the migration is a Node.js script
- updated Composer dependencies that include the ShopUi builder and module-system styles

{% info_block infoBox "Info" %}
The migration script validates the prerequisites during its preflight phase and stops if your installed vendor packages are not compatible.
{% endinfo_block %}

## 1. Update Composer dependencies

The migration requires a ShopUi version that provides:

- the frontend builder entry point: `vendor/.../ShopUi/builder/build.mjs`
- the module-system shared hub: `vendor/.../ShopUi/Theme/default/styles/shared.scss`, which contains `@forward`

Update your project dependencies by updating the relevant Spryker packages and then running `composer update` or `composer install`, as appropriate.

{% info_block warningBox "Warning" %}
Do not run the codemod before updating the vendor packages. The migration relies on the new builder and the new vendor styles.
{% endinfo_block %}

## 2. Run the migration script

Run the migration from the Demo Shop repository root:

```bash
node migrate-sass.mjs
```

The script is **idempotent**. You can rerun it after manual fixes or partial runs.

### 2.1 Run a dry run

To preview the changes without writing any files:

```bash
node migrate-sass.mjs --dry-run
```

### 2.2 Run only specific phases

To limit the migration scope:

```bash
node migrate-sass.mjs --phase=frontend,tsconfig,hub,components
```

### 2.3 Skip verification

If you want to apply the structural changes first and verify them later, run:

```bash
node migrate-sass.mjs --skip-verify
```

### 2.4 Run in modernize-only mode

If your project has already been migrated structurally and you only want to fix Sass deprecations (for example, global built-in functions or invalid selectors), run:

```bash
node migrate-sass.mjs --modernize-only
```

## 3. Install updated frontend dependencies

The frontend phase updates the `package.json` scripts and development dependencies.

After you run the script, install the Node.js dependencies:

```bash
npm install
```

{% info_block infoBox "Info" %}
The verification phase uses `sass-embedded`. If you skip `npm install`, the verification fails even if your SCSS changes are correct.
{% endinfo_block %}

## 4. Review the migration changes

### 4.1 Frontend builder integration

The script removes the legacy frontend build files and creates a new builder bootstrap.

After the migration, the following files are available:

- `frontend/build.mjs` — Builder bootstrap that calls the vendor builder `run()`.
- `frontend/settings.override.mjs` — Project-level builder settings override.
- `frontend/configs/asset-blacklist.mjs` — Project asset compilation blacklist.
- `frontend/libs/stylelint.mjs` — Stylelint runner.
- `frontend/libs/design-tokens.mjs` — Optional design token build hook.

The `package.json` scripts are updated to call `node ./frontend/build.mjs`, including `yves`, `yves:watch`, and `yves:production`.

The script also replaces `sass` with `sass-embedded` in `devDependencies` and removes `sass-resources-loader`, if it is present.

{% info_block infoBox "Info" %}
The legacy webpack-based image optimization integration described in [Implement Image Optimization](/docs/dg/dev/frontend-development/latest/yves/implement-image-optimization.html) has been removed from the Demo Shop builder flow.

This behavior is intentional:

- Spryker projects typically **serve images from third-party resources**, such as CDNs, DAM systems, or other external media services, instead of relying on build-time image processing in the storefront repository.
- In this setup, image transformations such as compression, resizing, and format conversion are handled closer to the delivery edge, while the storefront build remains focused on compiling CSS and JavaScript assets consistently.

If you still require build-time optimization for locally stored images, reintroduce it as a project-specific build step, such as a dedicated builder hook, so that it remains explicit and maintainable.
{% endinfo_block %}

#### Migrate component exclusions from `$setting-import-blacklist` to `asset-blacklist.mjs`

If your project previously excluded component styles by using the legacy Sass blacklist variable, migrate that configuration to the new builder configuration.

- **Legacy approach:** Add component patterns to the `$setting-import-blacklist` Sass variable, which is used by the legacy `helper-import` mechanism. This excludes **only SCSS** from the build. Component JavaScript can still be discovered and bundled.
- **Current approach:** Use `frontend/configs/asset-blacklist.mjs` to exclude **both SCSS and JavaScript** entry points from the Yves build.

**To migrate your configuration:**

1. Locate your `$setting-import-blacklist` configuration and any project documentation about excluded components.
2. Copy the same component patterns into `frontend/configs/asset-blacklist.mjs` as glob patterns.
3. If an excluded component also contains JavaScript entry points, exclude those as well. This is the primary behavioral difference from the legacy approach.

**Why this matters**

With the legacy approach, you could exclude a component's styles while still shipping its JavaScript. With `asset-blacklist.mjs`, you can exclude both styles and scripts consistently during the build.

{% info_block infoBox "Info" %}
The ShopUi frontend builder evaluates `asset-blacklist.mjs` by using the source roots configured in `frontend/settings.override.mjs`.
{% endinfo_block %}

{% info_block warningBox "Warning" %}
If you maintain custom frontend build logic under `frontend/`, review `frontend/settings.override.mjs` carefully. The migration overwrites only known legacy files. It does not remove arbitrary project-specific scripts.
{% endinfo_block %}

### 4.2 TypeScript path aliases (`tsconfig`)

The script ensures that the following path aliases exist in your Yves TypeScript configuration:

- `ShopUi/*` resolves to the vendor ShopUi theme.
- `src/ShopUi/*` resolves to the project ShopUi theme.

These aliases are required because the migrated SCSS uses imports such as:

- `@use 'ShopUi/styles/...';` for vendor modules
- `@use 'src/ShopUi/styles/...';` for project modules

## 5. Follow the Sass module-system rules after the migration

### 5.1 Treat `shared.scss` as a forward-only hub

The migration rewrites the project hub at `src/Pyz/Yves/ShopUi/Theme/default/styles/shared.scss` as a **forward-only hub**.

Follow these rules:

- Do not emit CSS from `shared.scss`.
- Keep the declarations in the following order:
  1. Settings
  2. Helpers

**Reason:** Components `@use` the shared hub. If `shared.scss` emits CSS, each component that loads it emits duplicate CSS.

### 5.2 Configure vendor settings through `src/ShopUi/...`

Project settings files under `src/Pyz/Yves/ShopUi/Theme/default/styles/settings/` configure vendor settings by using:

```scss
@forward 'ShopUi/styles/settings/<name>' with (...);
```

After the migration:

- Do not load vendor settings directly by using `@use 'ShopUi/styles/settings/<name>'` from project code.
- Always load the project wrapper instead:

```scss
@use 'src/ShopUi/styles/settings/<name>' as *;
```

**Reason:** Sass modules are loaded only once. If a vendor settings module is loaded before it is configured with `with (...)`, you cannot configure it later, and the compilation fails.

### 5.3 Use the standard component SCSS entry point

For components, templates, and views, the migration prepends:

```scss
@use 'src/ShopUi/styles/shared' as *;
```

This ensures that your component has access to the configured settings and the shared helper mixins and functions.

### 5.4 Move top-level `@include` statements into `style.scss` when required

If a component SCSS file contains trailing top-level `@include` statements (for example, a legacy pattern in which a mixin emits the final CSS), the script can:

- Move the `@include` statements into a sibling `style.scss` file.
- Update the component's `.ts` file to import `./style.scss`.

This approach keeps the base SCSS file reusable as a module while `style.scss` serves as the CSS entry point.

### 5.5 Modernize deprecated built-in functions and invalid selectors

The script modernizes deprecated Sass patterns, including:

- deprecated global built-in functions, for example:
  - `map-get(...)` → `map.get(...)`, and adds `@use 'sass:map';`
- invalid selectors with leading combinators, for example:
  - `+ & { ... }` → `& + & { ... }`

{% info_block warningBox "Warning" %}
Rewriting `+ &` to `& + &` can activate CSS rules that browsers previously ignored because the original selector was invalid. Verify the affected components visually after the migration.
{% endinfo_block %}

### 5.6 Replace `readyCallback()` with `init()`

The `readyCallback()` method has been removed from the core and replaced with `init()`. After the migration, check whether any of your project-level scripts define or call this method and update them accordingly:

- Replace `readyCallback()` with `init()`.
- Replace `super.readyCallback();` with `super.init();`.

{% info_block warningBox "Warning" %}

If your project-level scripts still use `readyCallback()` or `super.readyCallback();`, they do not run after the migration because the method no longer exists in the core.

{% endinfo_block %}

## 6. Verify the migration

### 6.1 Run a frontend build

Run the standard Yves build for your project:

```bash
npm run yves
```

Also verify the production build:

```bash
npm run yves:production
```

### 6.2 Verify SCSS compilation

By default, `node migrate-sass.mjs` ends with a verification phase that compiles the migrated stylesheets by using `sass-embedded` and the same alias resolution rules.

If you ran the script with `--skip-verify`, rerun it later without that flag to perform the verification.

## 7. Troubleshooting

### 7.1 Preflight error: ShopUi builder is missing

**Symptom:** The script fails during the preflight phase and reports that the ShopUi builder entry does not exist.

**Cause:** Your vendor packages do not include a ShopUi version that provides the frontend builder.

**Fix:** Update your Composer dependencies so that ShopUi provides `builder/build.mjs`, then rerun the script.

### 7.2 Preflight error: Vendor `shared.scss` is not `@forward`-based

**Symptom:** The script reports that the vendor `styles/shared.scss` file is not based on `@forward`.

**Cause:** Your ShopUi styles still use the legacy `@import` approach.

**Fix:** Update your vendor dependencies to a version that supports the Sass module system.

### 7.3 Sass error: "This module was already loaded, so it cannot be configured using with"

**Symptom:** Sass compilation fails with an error similar to the following:

- `This module was already loaded, so it cannot be configured using with`.

**Cause:** A vendor settings module was loaded directly (for example, `@use 'ShopUi/styles/settings/colors'`) before the project wrapper configured it.

**Fix:**

- Replace direct vendor settings imports with:

  ```scss
  @use 'src/ShopUi/styles/settings/<name>' as *;
  ```

- Ensure that `src/ShopUi/styles/shared` is loaded before any vendor helper or utility module that depends on settings.

### 7.4 Sass error: Missing TypeScript alias or unresolved import

**Symptom:** Sass cannot resolve imports such as `src/ShopUi/...` or `<Module>/...`.

**Cause:** The required `tsconfig` path aliases are missing.

**Fix:** Rerun the script with `--phase=tsconfig`, then commit the updated `tsconfig.json` file.

### 7.5 Visual regressions after the combinator fix

**Symptom:** Visual changes appear in components whose SCSS contains selectors such as `+ &`.

**Cause:** The migration rewrites `+ &` to `& + &`, which changes previously invalid CSS into valid CSS.

**Fix:** Review the affected selectors and confirm that they produce the intended behavior.

{% info_block infoBox "Info" %}
If you need to rerun only the deprecation fixes across the entire project, use:

```bash
node migrate-sass.mjs --modernize-only
```

{% endinfo_block %}

## 8. Commit strategy

To simplify code reviews, apply and commit the migration in separate commits:

1. Update the Composer dependencies (ShopUi builder and styles).
2. Commit the frontend builder and `package.json` changes.
3. Commit the `tsconfig` alias changes.
4. Commit the ShopUi styles hub migration.
5. Commit the component, template, and view migration.
6. Commit the manual fixes and visual regression adjustments.