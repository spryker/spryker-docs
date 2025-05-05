---
title: Prepare a project for Spryker Code Upgrader
last_updated: Sep 4, 2023
description: Prepare your project for Spryker Code Upgrader by ensuring code compliance, updating modules, and meeting technical requirements for a smooth upgrade process.
template: concept-topic-template
redirect_from:
  - /docs/paas-plus/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html
---

To start managing upgrades with Spryker Code Upgrader, fulfill the following prerequisites.

## Make your code compliant with upgradability guidelines

Our [upgradability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html) ensure your project stays upgradable. When an application is compliant with the guidelines, it can take minor and patch updates without breaking functionality, even if it's highly customized.

To check if your code is compliant with the guidelines, [run the evaluator tool](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).


## Optional: Make your code compliant with the supported extensions scenarios

By sticking to the [recommended extension points](/docs/scos/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/extenstion-scenarios.html) when customizing your project, you avoid making manual code changes after taking automatic updates.

## Update all Spryker modules to version 2022.04 or higher

The Upgrader provides automatic minor and patch updates for the current version of each module. Because most updates are released for the latest module versions, modules need to be of the latest major version. To do that, in `composer.json`, update all `spryker-feature-*` packages to version `2022.04` or higher.

To check if your module versions are supported by the Upgrader, [run the evaluator tool](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).

## Implement E2E testing in development workflow

Upgrades are provided as PRs that are automatically created in a project's repository. To make sure all functionality works as expected, you will need to review and test the PRs before merging.

## Migrate to a supported version control system

Currently, the Upgrader supports GitHub, GitLab, and Azure. If you want to use a different version control system, [contact support](https://spryker.force.com/support/s/), so we can implement its support in future.

## Migrate to cloud

The Upgrader supports only projects that run in [cloud environments](/docs/ca/dev/getting-started-with-cloud-administration.html). If you are running Spryker on premises, [migrate to cloud](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud.html).

## Fulfill minimum technical requirements

For a smooth experience, make sure that your environments meet the minimum technical requirements:

* PHP 8.2+. The Upgrader supports a minimum version of PHP 8.1. However, PHP 8.1 reached end of life in September 2024, so make sure to update PHP to the [recommended version](/docs/dg/dev/supported-versions-of-php.html). To check if your PHP version is supported, [run the evaluator tool](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).
* Composer 2.5+
* Git 2.24+
* PHPStan 1.9+
* PHPCodeSniffer 3.6.2+

## Optional: Implement headless design

The Upgrader does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

## Next steps

[Get access to the Upgrader](/docs/ca/devscu/get-access-to-spryker-code-upgrader.html)
