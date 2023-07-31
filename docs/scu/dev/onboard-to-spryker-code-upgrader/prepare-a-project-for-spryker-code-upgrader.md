---
title: Prepare a project for Spryker Code Upgrader
description: Get your project ready to start using Spryker Code Upgrader
template: concept-topic-template
redirect_from:
  - /docs/paas-plus/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html
---

Before you can start managing the upgrades of your project with Spryker Code Upgrader, fulfill the following prerequisites.

## Update all Spryker modules to version 2022.04 or higher

The Upgrader provides automatic minor and patch updates for the current version of each module. Since most updates are released for the latest module versions, modules need to be of the latest major version to receive updates.

To ensure that your project is suitable for the requirement, update all `spryker-feature-*` packages in composer.json to version `2022.04` or higher.

## Make sure your code is compliant with Upgradability Guidelines

Spryker Upgradability Guidelines contain rules that ensure code compliance with Spryker development and customization guidelines. When an application is compliant with the guidelines, it can take minor and patch updates without breaking functionality, even if it is highly customized.

## Implement E2E testing in development workflow

Upgrades are provided as PRs that are automatically created in a project’s repository. To make sure all business functionality works as expected, you will need to review and test the PRs before merging.

## Migrate to a supported version control system

Currently, the Upgrader supports GitHub, GitLab and Azure. If you want to use a different version control system, [contact support](https://spryker.force.com/support/s/), so we can implement its support in future.

## Migrate to Spryker Cloud Commerce OS

The Upgrader supports only projects that run on [Spryker Cloud Commerce OS (SCCOS)](/docs/cloud/dev/spryker-cloud-commerce-os/getting-started-with-the-spryker-cloud-commerce-os.html). If you are running Spryker on premises, migrate to SCCOS.

## Minimum technical requirements

To ensure a smooth experience, please make sure that your environments meet the minimum technical requirements outlined below:

* PHP 7.4+. The Upgrader still supports PHP 7.4 to help you upgrade your project. However, make sure to update PHP to the recommended version based on [Supported versions of PHP](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html).
* Composer 2.1+
* Git 2.24+

## Optional: Implement headless design

The Upgrader does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

## Optional: Ensure your code is compliant with the supported extensions scenarios.

To ensure the successful delivery of Spryker updates, we recommend using the extension points that exist in the [Keeping a project upgradable](/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html#Follow the upgradability best practices).

## Next steps

[Onboard to Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/onboard-to-spryker-code-upgrader.html)
