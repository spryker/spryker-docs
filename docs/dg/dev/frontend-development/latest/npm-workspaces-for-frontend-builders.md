---
title: npm workspaces for the frontend builders
description: Learn how Spryker frontend builders are wired into a project as npm workspaces, how the build commands change, and which npm dependencies come from the modules.
keywords: npm workspaces, frontend builder, ShopUi, ZedUi, shop-ui, mp-zed-ui, package.json, dependencies
last_updated: Sep 9, 2026
template: concept-topic-template
related:
  - title: Frontend builder for Yves v2
    link: docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves-v2.html
  - title: Frontend builder for the Merchant Portal v2
    link: docs/dg/dev/frontend-development/latest/marketplace/frontend-builder-for-merchant-portal-v2.html
---

Spryker frontend builders ship inside composer modules rather than in the project's `frontend/` directory. The build code lives in `vendor/`, and so do the npm dependencies it needs. npm reaches them through [workspaces](https://docs.npmjs.com/cli/using-npm/workspaces): the project declares each builder module as a workspace, and from then on the build commands address it by its package name.

This page explains what that setup does, how to add it, how the commands change, and which dependencies your project still owns. Each builder page documents what that builder does with them.

## Why the builders are workspaces

A builder module is an npm package that happens to be installed by composer. Declaring it as a workspace tells npm to treat that package as part of the project:

- The dependencies of the builder are installed into the project's root `node_modules` on a plain `npm install`, so nothing has to be listed twice.
- The scripts of the module become addressable by package name, which is what the project's `yves:*` and `mp:*` scripts call.
- Updates arrive with the composer update of the module. The project's `package.json` carries no build tooling of its own, so there is nothing to migrate by hand when a builder changes.

## The builders and their workspace names

| Frontend | Composer package | Workspace entry | Workspace name |
| --- | --- | --- | --- |
| Yves | `spryker-shop/shop-ui` | `vendor/spryker-shop/shop-ui` | `shop-ui` |
| Merchant Portal | `spryker/zed-ui` | `vendor/spryker/zed-ui` | `mp-zed-ui` |

The workspace name is the `name` field of the module's `package.json`, not the composer package name. A project declares only the builders it uses.

## Setting it up

1. Declare the builder modules as workspaces in the project's `package.json`:

```json
"workspaces": [
    "vendor/spryker-shop/shop-ui",
    "vendor/spryker/zed-ui"
]
```

A project that already declares broader globs, such as `vendor/spryker/*` or `vendor/spryker-shop/*`, needs no extra entry — the workspace is matched either way.

2. Point the project scripts at the workspaces:

```json
"scripts": {
    "yves": "npm run build -w shop-ui --",
    "yves:watch": "npm run build:watch -w shop-ui --",
    "yves:production": "npm run build:production -w shop-ui --",
    "yves:stylelint": "npm run stylelint -w shop-ui --",
    "yves:lint": "npm run lint -w shop-ui --",
    "mp:build": "npm run build -w mp-zed-ui --",
    "mp:build:watch": "npm run build:watch -w mp-zed-ui --",
    "mp:build:production": "npm run build:production -w mp-zed-ui --",
    "mp:test": "npm run test -w mp-zed-ui --",
    "mp:lint": "npm run lint -w mp-zed-ui --",
    "mp:stylelint": "npm run stylelint -w mp-zed-ui --",
    "mp:update:config": "npm run update:config -w mp-zed-ui --",
    "postinstall": "npm run update:config -w mp-zed-ui"
}
```

The trailing `--` forwards the options you pass on the command line to the script inside the workspace.

3. Install:

```bash
npm install
```

## How the commands change

Run the commands from the project root, the way you did before — the workspace is an implementation detail of the script:

```bash
npm run yves
npm run mp:build
```

Options go after a second `--`, which passes them through the project script and the workspace script to the builder:

```bash
npm run yves -- --help
npm run yves -- -n DE -t default
npm run mp:stylelint -- -f
npm run mp:stylelint -- -p 'src/Pyz/Zed/FooGui/Presentation/Components/**/*.less'
```

The builders resolve every path from the project root, which they find by walking up from the working directory until they see `package-lock.json`. The scripts inside the modules switch back to the directory npm was invoked from, so paths you pass on the command line are relative to the project root, not to `vendor/`.

## Where the npm dependencies come from

Open the `package.json` of the builder module — `vendor/spryker-shop/shop-ui/package.json` or `vendor/spryker/zed-ui/package.json`:

| Section | Who installs it | What it means for your project |
| --- | --- | --- |
| `dependencies` | the module | The runtime packages of that frontend. Remove them from your `package.json`. |
| `devDependencies` | the module | The build-time packages: compilers, loaders, plugins, test presets. Remove them too. |
| `peerDependencies` | your project | The packages the module expects the project to provide. Keep these, and follow the version ranges declared there — see [Peer dependencies, and why you install them yourself](#peer-dependencies-and-why-you-install-them-yourself). |

Declaring a package that the module already declares is not additive: it pins a second version of the same package, which is how two copies of a compiler or a framework end up in one build.

To see where an installed package comes from, run `npm ls <package>` in the project root. A package provided by a builder is listed under that builder's workspace name.

## Peer dependencies, and why you install them yourself

A peer dependency is a package the module needs but deliberately does not install. The module declares the version range it works with, and expects to find exactly one copy of that package, provided by the project. For the builders these are the tools the build itself is made of: webpack, TypeScript, Stylelint, `ts-jest` and `@jest/globals`, the `@typescript-eslint` packages, and, for Yves, the webpack loaders.

They are peer dependencies rather than ordinary dependencies for three reasons:

- **A second copy breaks the build.** A webpack loader or plugin only works when it runs against the same webpack instance as the build; `ts-jest` transforms for the Jest process that executes the tests; a Stylelint configuration resolves its plugins against the Stylelint that runs; TypeScript has to be a single version across one program. If a module installed these itself, npm could nest a second copy under the module whenever the versions differ, and the halves would no longer recognize each other.
- **The version is the project's decision.** The project runs the same tools on its own code — both builders, its own scripts, CI, and the IDE. A module that pinned webpack or TypeScript as an ordinary dependency would decide that version for the whole repository, and two builder modules would each decide it separately.
- **npm cannot resolve the disagreement for you.** npm installs a missing peer automatically when the tree allows it, but it does not backtrack on conflicts: when the declared ranges do not line up, the install stops with `ERESOLVE` rather than choosing a winner. An explicit declaration in the project is what makes the choice visible and reproducible in the lockfile.

So the peer dependencies are installed by hand: read the `peerDependencies` of each builder module you use, and declare every entry in the project's `devDependencies` with a version inside the range the module allows. Then run `npm install`.

What is automated is the check, not the installation. npm validates the installed copy against every declared range and reports a mismatch:

```text
$ npm ls typescript
typescript@5.9.3 deduped invalid: "~6.0.3" from the root project, ">=6.0.3 <6.1.0" from vendor/spryker/zed-ui
```

Run `npm ls <package>` for the peer dependencies after updating a builder module: an `invalid` line means the project's version no longer satisfies what the module declares, and the range in the project's `package.json` has to be widened or bumped.

## Troubleshooting

**`npm error No workspaces found: --workspace=shop-ui`**

The workspace entry is missing from `package.json`, the module is not installed in `vendor/`, or `npm install` has not been run since the entry was added. Check the entry, then reinstall.

**A package is installed twice**

`npm ls <package>` lists it both at the root and under a builder workspace. Remove the declaration from the project `package.json` — unless the package is a peer dependency of the builder, in which case the project's declaration is the correct one and the version range has to match.

**`ERESOLVE` on install**

npm does not backtrack on peer conflicts: it selects the highest version satisfying a range and then fails if the peers do not line up. This happens when a project stays on an older major of a framework while the module's ranges also allow a newer one. Pin the affected packages explicitly; the builder pages list the packages that need pinning for their frontend.
