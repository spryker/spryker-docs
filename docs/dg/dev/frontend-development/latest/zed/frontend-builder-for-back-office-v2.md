---
title: Frontend builder for the Back Office v2
description: Learn about the frontend builder that ships with the Gui module and builds the Back Office assets of core, feature, and project modules.
keywords: Gui, spryker-zed-gui, frontend builder, Back Office, Zed, webpack, TypeScript, build, live reload, oryx-for-zed
last_updated: Sep 30, 2026
template: howto-guide-template
related:
  - title: Upgrade to frontend builder v2 for the Back Office
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-back-office.html
  - title: npm workspaces for the frontend builders
    link: docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html
  - title: Oryx for Zed (deprecated)
    link: docs/dg/dev/frontend-development/latest/zed/oryx-for-zed.html
---

The Back Office frontend builder compiles the assets of the Back Office (Zed): the JavaScript and TypeScript entry points of every Back Office module, their styles, fonts, and images.

Starting from `spryker/gui` version 5.8.0, the builder ships inside the Gui module and lives in `vendor/spryker/gui/src/Spryker/Zed/Gui/FrontendBuilder/`. This generation is builder v2. The previous one, the external npm package `@spryker/oryx-for-zed`, is deprecated — see [Oryx for Zed](/docs/dg/dev/frontend-development/latest/zed/oryx-for-zed.html).

For the upgrade steps, see [Upgrade to frontend builder v2 for the Back Office](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-back-office.html).

## Builder v2 at a glance

|  | `oryx-for-zed` (legacy) | Builder v2 |
| --- | --- | --- |
| Build tooling in your project | the `@spryker/oryx-for-zed` npm package, pinned and updated in `package.json` by hand | 0 packages — ships and updates with the Gui module |
| Toolchain | webpack 5.94, babel-loader 8, css-loader 6, sass-loader 10 with the JavaScript Dart Sass | webpack 5.110, babel-loader 10, css-loader 7, sass-loader 17 with the native `sass-embedded` compiler |
| TypeScript in Back Office assets | not supported | `.entry.ts` entry points and `.ts` modules, type-checked by `npm run zed:lint` |
| Project assets in `src/Pyz/Zed` | not scanned — every project needed its own `frontend/zed/build.js` | scanned by default; a project entry overrides a core entry of the same name |
| Project build configuration | a custom build script merged with `webpack-merge` | one optional `frontend/backoffice.settings.mts` |
| Seeing a change in the browser | rebuild + manual page reload | CSS applied in place; JavaScript and Twig changes reload the page with scroll and form state preserved |
| Twig templates in watch mode | not watched | watched |
| Code loaded on demand with `import()` | merged into the shared bundle every page loads | emitted as separate, hashed chunks and fetched when needed |
| ESLint and Stylelint for Back Office assets | none | `npm run zed:lint` and `npm run zed:stylelint`, scoped to what the repository owns |
| Sass deprecation warnings in your stylesheets | logged | fail the build, so they never become errors in a later Sass version |
| Asset discovery order | filesystem order — differs per machine and run | sorted, identical on every machine |
| Switching between the monorepo and a project | not applicable | detected automatically, no configuration |
| Builder language | JavaScript (CommonJS) | TypeScript (native ESM), no transpilation step |

## What's new

### Ships with the Gui module

The Back Office build tooling is no longer an npm package the project has to keep current. The builder is distributed inside the `spryker/gui` composer package together with the whole npm dependency set of the Back Office — the runtime libraries such as jQuery, Bootstrap, DataTables, and Select2, and the build-time packages such as webpack, Babel, `sass-embedded`, ESLint, Stylelint, and TypeScript. Fixes and improvements arrive with a regular module update, the same way as any other Spryker code. See [Dependencies that come with the module](#dependencies-that-come-with-the-module).

### TypeScript in Back Office assets

A Back Office module can ship `*.entry.ts` entry points and `.ts` modules next to, or instead of, its JavaScript. Babel compiles them, so the build itself does not check types; `npm run zed:lint` runs the TypeScript compiler over the sources afterwards. See [TypeScript](#typescript).

### Project sources are scanned

The builder scans `src/Pyz/Zed` as one of its source roots, so a project adds Back Office JavaScript, styles, or a whole entry point without a custom build script. Because the project root is scanned last, a project entry point with the same name as a core one replaces it. See [How the builder collects entry points](#how-the-builder-collects-entry-points).

### Live reload in watch mode

`npm run zed:watch` reloads the open Back Office page after an edited `.js`, `.ts`, `.scss`, or `.twig` file, without a dev server or any extra infrastructure. A change that only touches CSS is applied in place, without a page reload. See [Live reload](#live-reload).

### Lint for Back Office assets

ESLint and Stylelint ship with the builder and cover the Back Office JavaScript, TypeScript, and stylesheets — in a project, the ones in `src/Pyz`. There was no lint for Back Office assets before. See [What lint covers](#what-lint-covers).

### No silenced Sass deprecation warnings

Sass deprecation warnings in your own stylesheets fail the build, with the file and the fix in the error message. Warnings from installed packages are reported as a single summary line, never suppressed with `quietDeps` or `silenceDeprecations`. See [Stylesheets](#stylesheets).

### Code loaded on demand

A module that loads a library with `import()` gets it as a separate chunk in `js/chunks/`, fetched the first time it is needed. The legacy builder merged every such library into the shared bundle that every Back Office page loads.

### Automatic source layout detection

Nothing configures the difference between the Spryker monorepo and a project: the builder detects the layout from a marker directory and resolves the core, eco, SDK, feature, and project module paths from it. The same commands work in both. See [Source layout detection](#source-layout-detection).

### Generated TypeScript configuration

The TypeScript configuration of the Back Office — the `@zed/*` path aliases and the `include` globs — depends on where the modules are installed, so the builder generates it. `npm install` runs the generation for you through `postinstall`, and values you own are left untouched. See [Generated configuration](#generated-configuration).

### Errors that name the file and the next step

Every error the builder raises names the offending path, states the reason in plain language, and says what to do next. An undetectable source layout, for example, names both marker directories it looked for and tells you to run the command from the project root.

## Requirements

- Node.js 24.15.0 or later. The builder is TypeScript executed by Node.js directly through type stripping.
- npm 10 or later.
- `spryker/gui` 5.8.0 or later.

## Commands

The project runs the builder through the npm workspace named `spryker-zed-gui`, which is the `assets/Zed` directory of the Gui module, and its `zed:*` scripts delegate to it. For the setup and what it does, see [npm workspaces for the frontend builders](/docs/dg/dev/frontend-development/latest/npm-workspaces-for-frontend-builders.html).

All commands are run from the project root:

| Command | What it does |
| --- | --- |
| `npm run zed` | Development build |
| `npm run zed:watch` | Development build in watch mode, with live reload |
| `npm run zed:production` | Production build: minified, without source maps |
| `npm run zed:lint` | ESLint over the Back Office JavaScript and TypeScript, then the TypeScript compiler over the TypeScript sources |
| `npm run zed:stylelint` | Stylelint over the Back Office stylesheets |
| `npm run update:config -w spryker-zed-gui` | Regenerates the TypeScript configuration; `postinstall` runs it for you |

Options after a second `--` are passed to the tool. `npm run zed:stylelint -- --fix` fixes what Stylelint can fix.

The console commands `frontend:zed:build` and `frontend:zed:build --environment production` call `npm run zed` and `npm run zed:production`, so the Docker SDK and deployment pipelines need no change.

### Output

The built assets are written to `public/Backoffice/assets`:

| Directory | Content |
| --- | --- |
| `js/<entry>.js` | one file per entry point, named after the entry point and never hashed |
| `js/chunks/` | code loaded on demand with `import()`, hashed |
| `css/<entry>.css` | one file per entry point that imports styles |
| `css/chunks/` | styles of the code loaded on demand, hashed |
| `fonts/`, `img/` | fonts and images referenced from the stylesheets |

The entry point names are part of the contract: templates reference them through `assetsPath()`, so they stay the same across builds and builder versions. Only the chunk names are hashed, because nothing references them by name.

After a successful build, the whole directory is mirrored to `public/Zed/assets`. The Docker SDK checks for that directory to decide whether the assets are built, so the mirror cannot be turned off.

## Dependencies that come with the module

The Gui module declares the whole npm dependency set of the Back Office in `vendor/spryker/gui/assets/Zed/package.json`: its `dependencies` are the runtime libraries, its `devDependencies` are the build toolchain. The module has no peer dependencies, so the project declares nothing for the Back Office build — not even webpack or TypeScript.

Declaring one of these packages in the project `package.json` is not additive: it pins a second version of the same package, which is how two copies of jQuery end up in one build. To see where an installed package comes from, run `npm ls <package>` in the project root; a package provided by the builder is listed under `spryker-zed-gui`.

A Back Office module that needs a library of its own — a module in `src/Pyz/Zed` included — declares it in its own `assets/Zed/package.json`, and the project lists that directory as an npm workspace. The builder adds every `assets/Zed/node_modules` directory it finds to webpack's module resolution, so the library resolves from wherever npm installed it.

## Source layout detection

The builder resolves every path from the project root, which it finds by walking up from the working directory until it sees `package-lock.json`. It then detects the layout from a marker directory:

| Layout | Marker | Source roots, in scan order |
| --- | --- | --- |
| Project | `vendor/spryker` | `vendor/spryker`, `vendor/spryker-eco`, `vendor/spryker-sdk`, `vendor/spryker-feature`, `src/Pyz/Zed` |
| Spryker monorepo | `src/Spryker` | `src/Spryker`, `vendor/spryker-eco`, `vendor/spryker-sdk`, `src/SprykerFeature`, `src/Pyz/*/src/Pyz/Zed` |

Nothing has to be configured for this: the same commands work in both layouts, and the detected layout decides which modules are built, linted, and type-checked. The scan order is also the precedence order — see the next section.

## How the builder collects entry points

In every source root, the builder collects the files matching `**/Zed/**/*.entry.js` and `**/Zed/**/*.entry.ts`. The entry name is the file name without the suffix: `spryker-zed-tax-main.entry.js` in `vendor/spryker/tax/assets/Zed/js/` becomes `js/spryker-zed-tax-main.js`, and `css/spryker-zed-tax-main.css` when its import graph contains styles.

Source roots are scanned in the order of the table above, and a later root replaces an earlier one. So a project entry point in `src/Pyz/Zed/<Module>/assets/Zed/js/` with the same file name as a core one replaces the core entry point — no alias, no custom build script.

Within a root, files are discovered in sorted order, so the same sources produce the same bundles on every machine.

Every entry point depends on the shared entry `spryker-zed-gui-commons`, which the Gui module ships and every Back Office layout loads first. It holds jQuery, the shared modules, and the webpack runtime that `import()` needs, so no other entry point duplicates them. A page adds its own entry point with a script tag, exactly as before:

```twig
{% raw %}
<script src="{{ assetsPath('js/spryker-zed-tax-main.js') }}"></script>
<link rel="stylesheet" href="{{ assetsPath('css/spryker-zed-tax-main.css') }}">
{% endraw %}
```

### Path aliases

The builder generates a path alias per module out of the discovered `assets/Zed` directories, named after the module in kebab case: `@zed/product-management/*` resolves to `<ProductManagement module>/assets/Zed/*`. A module imports another module's code through its alias rather than by relative path:

```ts
// Resolves to src/Pyz/Zed/PriceFormatting/assets/Zed/js/modules/price-formatter.ts
import { formatPrice } from '@zed/price-formatting/js/modules/price-formatter';
```

The legacy aliases keep working, so existing Back Office JavaScript needs no change: `ZedGui` resolves to the `js/modules/commons.js` module of Gui, `ZedGuiEditorConfiguration` to its `js/modules/editor.js` module, and `ZedGuiModules` to its `js/modules` directory.

The aliases are written into the generated `tsconfig.zed.json`, and webpack reads them from there, so the editor and the bundler resolve every import the same way.

### Globals

Webpack provides `$`, `jQuery`, `SprykerAjax`, `SprykerAjaxCallbacks`, and `SprykerAlert` to every module, and defines `DEV` and `WATCH` as build-mode flags. For TypeScript, they are declared in `vendor/spryker/gui/assets/Zed/types/zed-globals.d.ts`, which the generated configuration includes.

## TypeScript

The Back Office TypeScript is compiled by Babel, which erases the types without checking them. Type checking is a separate step that `npm run zed:lint` runs after ESLint: the TypeScript compiler over `tsconfig.zed.lint.json`, which covers the `.ts` files of the sources the repository owns. The legacy JavaScript is compiled but never type-checked.

In the Spryker monorepo, type checking is on. In a project, it is off by default, because the project's Back Office sources were never type-checked before and turning it on in a minor release would fail the project's lint on code nobody changed. To enable it, set `typecheck` in the project settings file:

```ts
// frontend/backoffice.settings.mts
import { defineConfig } from '../vendor/spryker/gui/src/Spryker/Zed/Gui/FrontendBuilder/settings.mts';

export default defineConfig({
    // Default: false in a project, true in the Spryker monorepo.
    // true: `npm run zed:lint` also runs `tsc --noEmit` over the project's Back Office TypeScript.
    typecheck: true,
});
```

The compiler options of the Back Office are strict: `strict` and `noImplicitAny` are on, `allowJs` lets a TypeScript module import the legacy JavaScript, and `checkJs` is off. The options are generated into `tsconfig.defaults.json`; to override one, set it in the project root `tsconfig.json` — see [Generated configuration](#generated-configuration).

## Generated configuration

`tsconfig.zed.json`, `tsconfig.zed.lint.json`, and `tsconfig.defaults.json` contain values that depend on where the modules are installed — `vendor/spryker` in a project, `src/Spryker` in the Spryker monorepo — so the Gui module cannot ship them ready-made. `npm run update:config -w spryker-zed-gui` generates them, and the project's `postinstall` script runs it on every `npm install`.

The files are written inside the builder directory, unless the project already keeps a file of that name in its root — in that case the reconciliation works on that file and writes no second copy. A file inside the builder directory lives in `vendor/` and is written from scratch after a fresh install, so hand-written entries survive only in a root copy: to keep an alias or an `include` entry of your own, keep `tsconfig.zed.json` in the project root and commit it.

| File | Owner |
| --- | --- |
| `tsconfig.defaults.json` | the builder — rewritten on every run; holds the Back Office compiler options |
| `tsconfig.zed.json` → `compilerOptions.paths` | generated — the `@zed/*` and legacy aliases are added, repointed, and removed as modules come and go; an alias you added by hand is kept |
| `tsconfig.zed.json` → `include`, `extends` | generated — the `.ts` globs of every source root and the ambient type declarations; an entry you added is kept |
| `tsconfig.zed.json` → everything else | yours |
| `tsconfig.zed.lint.json` | generated — the same, narrowed to the sources the repository owns |

`tsconfig.zed.json` extends `tsconfig.defaults.json` first and the project root `tsconfig.json` last, so a compiler option set in the root `tsconfig.json` overrides the builder default for the Back Office.

The root `tsconfig.json` itself is handled in one of three ways:

- It does not exist: the builder creates it as an editor-only solution file, `{ "files": [], "references": [...] }`, referencing `tsconfig.zed.json` so that editors pick up the Back Office configuration. The other Spryker builders add their references to the same file.
- It is a solution file: the reference to `tsconfig.zed.json` is added or repointed, and everything else is kept.
- It is a complete configuration of your own: it is never modified, and its `compilerOptions` act as the overrides described above.

Because the reconciliation happens in place rather than as a rewrite, a value the builder does not generate survives it. A value the builder *does* generate belongs to it, so a hand edit is corrected on the next run.

## What lint covers

`npm run zed:lint` and `npm run zed:stylelint` report on the modules the running repository owns:

- In a project, the core, eco, SDK, and feature modules arrive in `vendor/`. They are installed code, not the project's to report on, so only `src/Pyz/Zed` is covered.
- In the Spryker monorepo, the core and feature modules are sources of the repository, so they are covered together with the project modules.

Both commands look at the `assets/Zed` directory of each module: ESLint at the `.js` and `.ts` files, Stylelint at the `.css` and `.scss` files. The vendored Inspinia theme directories and minified files are excluded from Stylelint.

Project-level lint configuration is picked up from the project root when present: `eslint.config.backoffice.mjs` replaces the packaged ESLint configuration, and `stylelint.config.backoffice.mjs` replaces the packaged Stylelint configuration. Without them, the configurations shipped in the module are used.

## Stylesheets

The builder compiles Sass with the native `sass-embedded` compiler through the modern Sass API. Sass deprecation warnings are classified by where they come from:

- A warning in a stylesheet the repository owns — in a project, anything outside `vendor/` and `node_modules/` — fails the build. The error names each file and the fix: `@import` of your own partial becomes `@use`, `@import` of a package stylesheet becomes `@use 'package/file.css' as *`, and a global color function such as `darken()` becomes its `sass:color` equivalent. Each of these deprecations is removed in Dart Sass 3, so the build reports it now rather than when it becomes an error.
- Warnings from installed packages, from the vendored Inspinia theme, and from the Gui module's own legacy stylesheets are printed as one summary line per build, for example `Sass: 21 deprecation warning(s) from vendored stylesheets (bootstrap x21)`. They are never suppressed with `quietDeps` or `silenceDeprecations`.

Package stylesheets resolve from `node_modules` directly, so there is no webpack `~` prefix in `@use`. A package stylesheet can also be loaded from JavaScript instead:

```js
require('jstree/dist/themes/default/style.css');
require('../sass/main.scss');
```

Stylesheets are only compiled when an entry point imports them; the generated CSS file is named after the entry point.

## Live reload

`npm run zed:watch` writes a build manifest next to the bundles and injects a small polling client into the shared entry, so every Back Office page gets live reload without a template change:

- A change that only touches CSS swaps the changed stylesheets in place — the page does not reload, so open modals, tabs, and form input survive styling work.
- A JavaScript or TypeScript change reloads the page with scroll position, form values, and focus preserved.
- A Twig template change in any `Presentation` directory of the scanned source roots reloads the page the same way. The builder only triggers the reload; the new markup shows up because Zed recompiles a changed template on the next request when the application debug mode is on. `ApplicationConstants::ENABLE_APPLICATION_DEBUG` is on in a Docker SDK development environment — Twig derives its `auto_reload` option from it. With debug mode off, Zed serves the cached template: the page reloads, but the markup does not change until you run `docker/sdk console twig:cache:warmer`.

Production and plain development builds contain neither the client nor the manifest.

Two environment variables adjust watch mode:

| Variable | Effect |
| --- | --- |
| `SPRYKER_FRONTEND_RELOAD=0` | Turns live reload off; `zed:watch` becomes a plain watch. |
| `SPRYKER_FRONTEND_WATCH_POLL=<milliseconds>` | Watches by polling instead of native file events, for a build running inside a container whose mount does not forward them. |

The client fetches the manifest from `/assets/dev-build-manifest.json`, that is, from the default Back Office assets base URL. A project that repoints `GuiConstants::ZED_ASSETS_BASE_URL` does not get live reload.

## Project-level builder settings

The legacy builder was extended by writing a build script that merged your settings into its defaults. In v2, project overrides live in a single optional file, `frontend/backoffice.settings.mts`. When the file exists, the builder loads it automatically; when it does not, the defaults apply.

The file exports the result of `defineConfig()`, which merges your overrides into the packaged defaults:

```ts
// frontend/backoffice.settings.mts
import { defineConfig } from '../vendor/spryker/gui/src/Spryker/Zed/Gui/FrontendBuilder/settings.mts';

export default defineConfig({
    paths: {
        sources: {
            // A further project namespace, scanned for Back Office modules after src/Pyz/Zed.
            acme: './src/Acme/Zed',
        },
    },
    // Off by default in a project — see TypeScript above.
    typecheck: true,
});
```

Projects may override:

- `paths.sources` — the directories the builder scans for entry points and path aliases, and that `npm run zed:lint` and `npm run zed:stylelint` cover. An entry with the name of a built-in root (`core`, `eco`, `sdk`, `features`, `project`) replaces that root; a new name adds a root, scanned after the built-in ones.
- `paths.publicDir` — the build output directory, `./public/Backoffice/assets` by default.
- `paths.mirrorDir` — the mirror the Docker SDK checks, `./public/Zed/assets` by default.
- `typecheck` — whether `npm run zed:lint` runs the TypeScript compiler. `false` by default in a project, `true` in the Spryker monorepo.

All other settings are fixed and inherited from the packaged defaults.

{% info_block warningBox "Note" %}

`frontend/backoffice.settings.mts` is executed by Node.js directly via type stripping, so it must use only erasable TypeScript syntax: type annotations are fine, but `enum`, `namespace`, and constructor parameter properties fail at runtime.

{% endinfo_block %}
