---
title: Integrating code releases
description: Spryker Code Upgrader automatically integrates code releases
template: concept-topic-template
---

Spryker architecture supports the extensions of modules using extension points in the project code. With Spryker Code Upgrader, the process of integrating plugins, configuration updates, adding new translations, and other code changes is automated. As a result, to add new features, developers don't need to apply code changes manually.

The Upgrader supports the following extension points:
- Configuration of the following:
  - Module
  - Environment
- Copying module files
- Adding and removing the following:
  - Plugin
  - Navigation element
  - Widget
  - Glue relationship
- Adding the following:
  - Transfer definition
  - DB schema definition

## Release integrability rating

Release integrability rating is a measure of the integrability coverage of a code release. It represents the percentage of automatically integratable plugins, configurations, schemas, and other components.

This rating is determined during the internal testing where the generated integration code is compared with the manually released code to assess the level of integration achieved. If both are equal, then the release is fully auto-integratable.

There are types of releases that provide only dependency updates without any code integrations, so-called module-only releases. Such releases have 100% coverage.

Each of the Upgrader's PRs contains the release rating of the suggested release.

# Enable and configure

The Integrator is enabled by default. It integrates the releases with rating 70% or more. You can adjust this treshold to your requirements in Spryker CI.

After a release is integrated, a style fixer is applied to the changed files. We recommend implementing your own style fixer to expose project-specific code style conventions.

# What to do if you see a generated code, that is not valid

1. Make sure that your project code follows the Upgradability Guidelines and passes the [Evaluator check](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).
2. You can try manually correcting the generated code as a quick fix.
3. If none of the above solutions work, please contact us for further assistance.
