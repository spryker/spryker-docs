---
title: Spryker GitHub organizations and repositories
description: Learn what source code is published in each Spryker GitHub organization and how product code, feature packages, integrations, development tools, reference implementations, and community projects differ.
last_updated: Oct 1, 2026
template: concept-topic-template
related:
  - title: Code contribution guide
    link: docs/dg/dev/code-contribution-guide.html
---

Spryker publishes source code across several GitHub organizations. Each organization has a different purpose: some contain
Spryker product modules, while others contain feature packages, reference implementations, third-party integrations,
development tools, or community projects.

## GitHub organizations at a glance

| GitHub organization | Main purpose | Typical content |
| --- | --- | --- |
| [spryker](https://github.com/spryker) | Spryker product and framework modules | Core business modules, framework components, APIs, and shared technical capabilities |
| [spryker-shop](https://github.com/spryker-shop) | Shop-layer modules and reference applications | Storefront and Back Office modules, widgets, demo shops, and project-level reference implementations |
| [spryker-feature](https://github.com/spryker-feature) | Business feature packages | Composer metapackages that group the modules required for a business capability |
| [spryker-eco](https://github.com/spryker-eco) | Third-party ecosystem integrations | Connectors for payment providers, search services, tax services, PIM systems, and other external technologies |
| [spryker-sdk](https://github.com/spryker-sdk) | Development tools | Development, code quality, testing, migration, automation, and productivity tools |
| [spryker-community](https://github.com/spryker-community) | Community projects and contributions | Community-maintained tools, templates, examples, and experimental projects |

## Product modules

### `spryker`

The [spryker](https://github.com/spryker) organization contains product and framework modules in the `Spryker` namespace.
These modules provide business logic and shared technical capabilities used by Spryker applications.

Use the release information, module documentation, and upgrade guides for the package version used by your project.

### `spryker-shop`

The [spryker-shop](https://github.com/spryker-shop) organization contains modules in the `SprykerShop` namespace and reference applications assembled from Spryker modules.

The organization includes two different kinds of repositories:

- **Shop-layer modules** — Storefront, Back Office, Merchant Portal, widgets, and other presentation or application-layer components.
- **Reference applications and demo shops** — preconfigured applications that demonstrate how modules and features can be integrated into a project.

## Business feature packages

### `spryker-feature`

The [spryker-feature](https://github.com/spryker-feature) organization contains installable business feature packages.

A feature package groups the modules that implement a business capability.
It is primarily a dependency definition and release vehicle; the implementation usually remains in the modules required by the feature.

Use the corresponding feature documentation to understand prerequisites, installation steps, configuration, and version compatibility.
When troubleshooting or extending a feature, identify the individual `spryker/*` and `spryker-shop/*` modules that provide the relevant behavior.

## Third-party ecosystem integrations

### `spryker-eco`

The [spryker-eco](https://github.com/spryker-eco) organization contains modules that connect Spryker projects to third-party systems and services.

For more information, see [Eco modules](/docs/integrations/eco-modules.html).

## Development tools

### `spryker-sdk`

The [spryker-sdk](https://github.com/spryker-sdk) organization contains tools used to develop, validate, test, migrate, and operate Spryker projects.

Examples include the Spryker SDK, code-generation tools, quality checks, testing utilities, and migration or automation tools.

For an introduction to the main SDK, see [Spryker SDK](/docs/dg/dev/sdks/sdk/spryker-sdk.html).

## Community projects

### `spryker-community`

The [spryker-community](https://github.com/spryker-community) organization hosts community contributions such as tools, templates, examples, and experimental projects.

Unless a repository explicitly states otherwise, treat projects in this organization as community-provided software rather than supported Spryker product functionality.
Maintenance activity and compatibility can vary by repository.

Contributions are governed by the contribution instructions and license in the individual repository.

For more information, see [Community contributions](/docs/integrations/community-contributions.html).
