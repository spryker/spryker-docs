---
title: Integrating code releases
description: Automate the integration of code releases in Spryker with the Code Upgrader, handling plugins, configurations, schemas, and more to streamline feature additions.
template: concept-topic-template
last_updated: Oct 20, 2023
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

Release integrability rating is a measure of the integrability coverage of a code release. It is the percentage of automatically integratable plugins, configurations, schemas, and other components.

This rating is determined during the internal testing where the generated integration code is compared with the manually released code to assess the level of integration achieved. If both are equal, the release is fully auto-integratable.

There are types of releases that provide only dependency updates without any code integrations, so-called module-only releases. Such releases are 100% auto-integratable.

## Release integrability rating threshold

By default, the Upgrader creates PRs for all the releases with rating 70% or more. The description of the PRs contains the rating of the suggested release.

You can configure the threshold per your requirements in Spryker CI.

## Implementing and applying style fixers

After a release is integrated, a style fixer is applied to the changed files. We recommend implementing your own style fixer to expose project-specific code and style conventions.

## Fixing generated code

If you see errors in the generated code, do the following:

1. Double-check if your code follows the upgradability guidelines by [running the Evaluator](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).
    After fixing the upgradability issues, close the PR with errors and restart the Upgrader to get a new PR.
2. If you see any quick fixes, try manually correcting the errors.
3. [Contact us](/docs/about/all/support/using-the-support-portal.html) for further assistance.
