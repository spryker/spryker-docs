---
title: Prepare a project for Spryker Code Upgrader
last_updated: Sep 4, 2023
description: Get your project ready to start using Spryker Code Upgrader
template: concept-topic-template
redirect_from:
  - /docs/paas-plus/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html
---

Before you can start managing the upgrades of your project with Spryker Code Upgrader, fulfill the following prerequisites.

## Update all Spryker modules to version 2022.04 or higher

The Upgrader provides automatic minor and patch updates for the current version of each module. Since most updates are released for the latest module versions, modules need to be of the latest major version. To do that, in `composer.json `, update all `spryker-feature-*` packages to version `2022.04` or higher.

To check if your module versions are supported by the Spryker Code Upgrader, [Run the evaluator tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).

## Make your code compliant with Upgradability Guidelines

Spryker [Upgradability Guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html) contain rules that ensure code compliance with Spryker development and customization guidelines. When an application is compliant with the guidelines, it can take minor and patch updates without breaking functionality, even if it is highly customized.

## Implement E2E testing in development workflow

Upgrades are provided as PRs that are automatically created in a project’s repository. To make sure all business functionality works as expected, you will need to review and test the PRs before merging.

## Migrate to a supported version control system

Currently, the Upgrader supports GitHub, GitLab and Azure. If you want to use a different version control system, [contact support](https://spryker.force.com/support/s/), so we can implement its support in future.

## Migrate to Spryker Cloud Commerce OS

The Upgrader supports only projects that run on [Spryker Cloud Commerce OS (SCCOS)](/docs/cloud/dev/spryker-cloud-commerce-os/getting-started-with-the-spryker-cloud-commerce-os.html). If you are running Spryker on premises, migrate to SCCOS.

## Minimum technical requirements

For a smooth experience, make sure that your environments meet the minimum technical requirements:

* PHP 8.1+. The Upgrader supports a minimum version of PHP 8.0. However, PHP 8.0 reaches end of life in November 2023, so make sure to update PHP to the [recommended version](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html). To check if your PHP version is supported, [Run the evaluator tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).
* Composer 2.5+
* Git 2.24+

## Optional: Implement headless design

The Upgrader does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

## Optional: Make your code compliant with the supported extensions scenarios

To make sure you can take updates, stick to the [recommended extension points](/docs/scos/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/extenstion-scenarios.html) when customizing your project.

## Next steps

[Onboard to Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/onboard-to-spryker-code-upgrader.html)
