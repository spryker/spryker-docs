---
title: Frontend builder for Yves v2
description: Learn about the TypeScript-based frontend builder v2 that ships with the ShopUi module and builds Yves assets for all namespaces and themes.
last_updated: Jul 29, 2026
template: howto-guide-template
related:
  - title: Frontend builder for Yves (deprecated)
    link: docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves.html
  - title: Upgrade to frontend builder v2 for Yves
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-yves.html
  - title: Design tokens
    link: docs/dg/dev/frontend-development/latest/design-tokens.html
---

Frontend builder v2 is the build tool that prepares Yves assets—CSS, JavaScript, images, fonts, icons—for all configured namespaces and their themes.

Starting from `spryker-shop/shop-ui` version 2.0.0, the builder is part of the ShopUi module and lives in `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/FrontendBuilder/`. The previous builder, which was copied into every project's `frontend/` directory, is deprecated—see [Frontend builder for Yves (deprecated)](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves.html).

## Builder v2 at a glance

|  | Builder v1 (legacy) | Builder v2 |
| --- | --- | --- |
| Build tooling in your project | ~1,400 lines across 17 files, owned and migrated by hand | 0 files—ships and updates with the ShopUi module |
| Repeated development build* | ~17.6 s | ~7.5 s (persistent filesystem cache, **2.3× faster**) |
| Seeing a CSS change in the browser | rebuild + manual page reload | applied in place within ~1 s, **no page reload** |
| Seeing a Twig change in the browser | manual page reload | automatic reload, scroll and form state preserved |
| Registering a custom namespace | edit 3 arrays in `frontend/settings.js` | 1 entry in `frontend/yves.settings.mts` |
| Sass deprecation warnings | silenced (`quietDeps`) | 0 suppressed—core fixed at the source |
| Asset discovery order | filesystem order—differs per machine and run | sorted, identical on every machine |
| Sources scanned for component styles | 3 of 5 (no eco, no project) | all 5 |
| Extending core component base styles | copy the component or fight the cascade | 71 base hooks across 62 ShopUi components |
| Builder language | JavaScript (CommonJS) | TypeScript (native ESM), 0 transpilation steps |

\* Measured on the Spryker Suite demo shop: first (cold) build versus the following build with a warm cache.

## What's new

### Ships with the ShopUi module

The builder is no longer project-owned code in the `frontend/` directory: roughly 1,400 lines of build tooling that every project had to copy and migrate by hand are gone from the project tree. The builder is distributed inside the `spryker-shop/shop-ui` composer package, so fixes and improvements arrive with regular module updates—the same way as any other Spryker code.

### TypeScript, native ESM, no build step

The builder is written in TypeScript (`.mts` files) and executed directly by Node.js using [native type stripping](https://nodejs.org/api/typescript.html)—there is no transpilation or build step for the builder itself. This requires Node.js 24 or later. All builder code is native ESM.

### Faster builds

Two changes speed up day-to-day builds:

- **Persistent filesystem cache**: webpack's cache survives between builds. On the Spryker Suite demo shop, a repeated development build drops from ~17.6 s to ~7.5 s—about 2.3× faster. The cache is invalidated automatically when the Sass injection context changes, so it never serves stale styles.
- **Native Sass compiler**: styles are compiled by `sass-embedded`, the native Dart Sass compiler, which is significantly faster than the pure-JavaScript `sass` package the v1 builder used.

### Live reload in watch mode

`npm run yves:watch` now includes live reload without any dev server or extra infrastructure:

- After every rebuild, the builder writes a build manifest next to the assets; a small client injected into development bundles polls it once per second.
- CSS-only changes swap the changed stylesheets in place—the page never reloads, so overlays, drawers, and form input survive styling work.
- JavaScript and Twig template changes trigger a full page reload that preserves scroll position, form values, and focus.
- Twig templates are watched natively; in v1 they weren't watched at all.

The live reload client is only injected in watch mode; production and one-shot development builds never contain it.

### Automatic source layout detection, zero config

The builder detects where Spryker modules live by probing the project tree:

- **Project layout**: modules installed by composer under `vendor/spryker-shop`, `vendor/spryker`, `vendor/spryker-eco`, and `vendor/spryker-feature`; project code in `src/Pyz/Yves`.
- **Monorepo layout**: modules in `src/SprykerShop`, `src/Spryker`, and `src/SprykerFeature` (used for Spryker suite development).

A standard project needs no path configuration at all—the v1 builder's 286-line `frontend/settings.js` is replaced by a single optional override file. If the layout can't be detected, the build fails with an error that explains what was probed and what to do next.

### Modern Sass with automatic shared-context injection

The builder compiles styles with the Sass module system (`@use`). Component SCSS files no longer depend on globals being prepended to every file by the build tool. Instead, the builder's custom Sass importer injects the required context into each component file at compile time:

- the ShopUi `shared` stylesheet (settings, helpers, and shared mixins), including the project-level override of `shared` when one exists;
- the Sass built-in modules (`sass:map`, `sass:math`, and others);
- the files that define any cross-component mixins the file includes, resolved through a **mixin index** built from all component styles.

If a mixin can't be resolved, the build fails with an error naming the file, the unknown mixin, the closest matching names, and the suggested next step. Run the build with `--debug-injection` to print the exact context injected into every file.

### No silenced Sass deprecation warnings

The v1 builder silenced Sass deprecation warnings (`quietDeps`), which let real problems accumulate invisibly until a Sass upgrade turned them into hard errors. Builder v2 suppresses nothing: deprecations in core styles were fixed at the source, and warnings from your own code point at the real file so you can fix them early. One notable fix is the `mixed-decls` deprecation—see the next section.

### Base hooks: 71 extension points in core components

Every ShopUi component mixin now exposes an optional **base hook**—71 hooks across 62 core components. Defining a `shop-ui-<component>-base-hook` mixin at the project level injects your declarations into the base of the core component, before its element and modifier rules. This replaces the cascade-breaking pattern of appending base declarations through the mixin body, which Sass 1.92+ flags as the `mixed-decls` deprecation. For details and examples, see [Extending components](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html#extend-base-styles-with-a-base-hook).

### Deterministic asset order

The v1 builder bundled component files in the order the filesystem happened to return them, so the same sources could produce a different CSS order on a colleague's machine or in CI. Builder v2 sorts discovery, scans component styles from all five sources instead of three, and gives the project level priority over feature modules. For the before-and-after examples, see [Discovery order and precedence](#discovery-order-and-precedence).

### Built-in design tokens step

If the project provides a design tokens source file at `frontend/assets/global/<theme>/design-tokens/design-tokens.json`, the builder generates `design-tokens.css` and bundles it at the start of the critical CSS—no project-level build hook required. The `style-dictionary` package is an optional dependency: without it, a previously generated `design-tokens.css` is served as is. For details, see [Design tokens](/docs/dg/dev/frontend-development/latest/design-tokens.html).

### Legacy style rescue

Component styles written against the v1 contract—files that emit CSS at the top level without being imported from a component entry point—are still compiled, with a warning that names the file and explains how to migrate it. Their CSS stays in the bundles until the affected modules are updated, so the upgrade doesn't silently drop styles.

### Actionable error messages

Every error the builder reports contains the offending file, the reason in plain language, and the next action to take—no more guessing which of five stack frames points at your code.

## Commands

The builder has several modes to build the frontend:

- `npm run yves`—builds assets in the development mode for all namespaces and themes.
- `npm run yves:watch`—builds assets in the watch mode with live reload. Rebuilds immediately after SCSS, TypeScript, or Twig files change.
- `npm run yves:production`—builds assets in the production mode (minified files, no comments) for all namespaces and themes.
- `npm run yves -- --help`—displays all available parameters.
- `npm run yves:stylelint`—lints Yves styles.
- `npm run yves:lint`—lints Yves TypeScript and JavaScript.

## Parameters

- `-n <namespace name>` or `--namespace <namespace name>`—generates the assets for all themes of this `<namespace name>`. To generate several namespaces, use this parameter several times. For example, `npm run yves -- -n DE -n US`.
- `-t <theme name>` or `--theme <theme name>`—generates assets for all the namespaces which contain `<theme name>`. To generate several themes, use this parameter several times. For example, `npm run yves -- -t default -t red-theme`.
- `-c <path>` or `--config <path>`—defines the path to the config JSON file that overwrites the default config JSON file.
- `-i` or `--info`—displays a list of namespaces with all the available themes.
- `--debug-injection`—prints the Sass context injected into every compiled file and the mixin index resolution reasons. Use it to debug unknown-mixin errors or unexpected style overrides.
- `-h` or `--help`—shows the usage message.

{% info_block infoBox "Namespace configuration" %}

The namespace and theme config file format is unchanged from v1 and is located at `config/Yves/frontend-build-config.json` by default. For multi-theme setup, see [Multi-theme](/docs/dg/dev/frontend-development/latest/yves/multi-theme.html).

{% endinfo_block %}

## Project-level builder settings

The v1 builder was configured by editing `frontend/settings.js`, which the project owned entirely. In v2, project overrides live in a single optional file: `frontend/yves.settings.mts`. When the file exists, the builder loads it automatically; when it doesn't, the defaults apply.

The file exports the result of `defineConfig()`, which merges your overrides into the packaged defaults:

```ts
// frontend/yves.settings.mts
import { defineConfig } from '../vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/FrontendBuilder/settings.mts';

export default defineConfig({
    paths: {
        sources: {
            // Register a custom namespace: SCSS/TS under this path is scanned for components.
            newNamespace: './PATH_TO_YOUR_FOLDER',
        },
    },
});
```

Projects may override:

- `paths.sources`—the directories the builder scans for component assets. Use this to register custom namespaces; there is no longer a separate `dirs` list to keep in sync.
- `paths.iconSprite`—icon sprite source and target locations.
- `buildHooks`—project build steps that run before webpack assembly and may contribute entries to the bundles.

All other settings are fixed and inherited from the packaged defaults.

{% info_block warningBox "Note" %}

`frontend/yves.settings.mts` is executed by Node.js directly via type stripping, so it must use only erasable TypeScript syntax: type annotations are fine, but `enum`, `namespace`, and constructor parameter properties fail at runtime.

{% endinfo_block %}

## How the builder collects SCSS and JS files

The builder scans the following source directories (in a standard project layout):

| Source | Path |
| --- | --- |
| Core | `./vendor/spryker-shop` |
| Spryker core | `./vendor/spryker` |
| Eco | `./vendor/spryker-eco` |
| Features | `./vendor/spryker-feature` |
| Project | `./src/Pyz/Yves` |

Entry points are discovered per component (`components/atoms/*/index.ts`, `components/molecules/*/index.ts`, `components/organisms/*/index.ts`, `templates/*/index.ts`, `views/*/index.ts`) for the configured theme, with a fallback to the default theme.

The project directory is scanned last and has the highest priority: a project-level component or mixin overrides a same-named one from any other source.

### Discovery order and precedence

The order in which the builder collects component files decides two things: which component wins when several sources provide the same one, and in which order their CSS lands in the bundle. Builder v2 changes that order in three ways.

**1. The project level now wins over features.** The v1 builder scanned features after the project, so a feature module silently overrode a same-named project component:

```text
Builder v1 (entry points)     core → spryker core → eco → project → features
                                                                    ^^^^^^^^ wins

Builder v2 (all discovery)    core → spryker core → eco → features → project
                                                                     ^^^^^^^ wins
```

If your project and a feature module both provide `molecules/product-price`, v1 bundled the feature module's version and v2 bundles yours. This matches the precedence customers expect from a project-level override.

**2. Component styles are collected from every source.** In v1, the style scan that builds the shared Sass environment covered only three of the five sources—`eco` and `project` were missing from it, so mixins defined by eco or project components weren't available to other components:

```text
Builder v1 (component styles)   core → spryker core → features
Builder v2 (component styles)   core → spryker core → eco → features → project
```

**3. Discovery is deterministic.** The v1 builder used the order in which the filesystem returned matches (`readdir` order), which differs between machines and even between runs on the same machine. Two developers could get a different CSS declaration order—and therefore a different winner among same-specificity rules—from identical sources. Builder v2 sorts every directory expansion and every file match lexicographically, so the same sources always produce the same bundle:

```text
Builder v1     .../molecules/product-card/product-card.scss      # order as returned
               .../molecules/ajax-loader/ajax-loader.scss        # by the filesystem:
               .../molecules/form/form.scss                      # machine-dependent

Builder v2     .../molecules/ajax-loader/ajax-loader.scss        # lexicographic:
               .../molecules/form/form.scss                      # identical on every
               .../molecules/product-card/product-card.scss      # machine and run
```

Within a source, the tier order above still applies first; sorting only makes the order inside each tier stable.

{% info_block infoBox "What this means for your styles" %}

Relying on discovery order to win a same-specificity conflict was never reliable in v1 and is now explicit: either raise specificity, or use a [base hook](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html#extend-base-styles-with-a-base-hook) to place your declarations in the component's base.

{% endinfo_block %}

### Code buckets

A [code bucket](/docs/dg/dev/architecture/code-buckets.html) lets a namespace ship its own variant of a module—for example, `ShopUiDE` next to `ShopUi`. The builder reads the code bucket per namespace from the `codeBucket` field of `config/Yves/frontend-build-config.json`:

```json
{
    "path": "assets/%namespace%/%theme%/",
    "staticPath": "assets/static",
    "namespaces": [
        {
            "namespace": "DE",
            "codeBucket": "DE",
            "themes": [],
            "defaultTheme": "default"
        }
    ]
}
```

For a namespace with code bucket `DE`, the builder:

- additionally scans `<Module>DE/Theme/<theme>` directories for components, on every source level;
- lets a code bucket component override the same-named component of the plain module—`ShopUiDE`'s `side-drawer` wins over `ShopUi`'s;
- excludes modules of all *other* code buckets from this namespace's build, so `ShopUiUS` code never leaks into the `DE` assets.

Duplicate components are resolved by component name: when several sources provide `molecules/side-drawer`, the one found last (code bucket over plain module, later source level over earlier) becomes the entry point.

## Public assets

All public assets are generated into `/public/Yves/` plus the path defined in the config file, which is `assets/%namespace%/%theme%/` by default. For example, for the `DE` namespace and default theme, it's `/public/Yves/assets/DE/default/`.

All incoming files (images, fonts, etc.) are copied from `global` (for every namespace) and namespace-specific folders:

- `frontend/assets/global/default`
- `frontend/assets/DE/default`

{% info_block infoBox "Info" %}

If the assets were generated earlier for this namespace and theme, they are substituted by the newest ones. If a namespace or theme is removed from the config file, its assets aren't removed automatically—remove them manually if necessary.

{% endinfo_block %}
