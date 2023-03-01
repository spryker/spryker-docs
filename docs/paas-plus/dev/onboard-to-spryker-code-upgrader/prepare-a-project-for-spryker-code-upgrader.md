---
title: Prepare a project for Spryker Code Upgrader
description: Get your project ready to start using Spryker Code Upgrader
template: concept-topic-template
---

Before you can start managing the upgrades of your project with Spryker Code Upgrader, fulfill the following prerequisites.

## Update all Spryker modules to version 2022.04 or higher

The Upgrader provides automatic minor and patch updates for the current version of each module. Since we release most of the updates for the latest versions of modules, modules need to be of the latest major version to receive updates.

## Make your code compliant with Spryker Quality Gate

Spryker Quality Gate contains code checkers that ensure code compliance with Spryker development and customization guidelines. When an application is compliant with the guidelines, it can take minor and patch updates without breaking anything, even if it’s highly customized.

For instructions on making code compliant with the guidelines, see [Keeping a project upgradable](/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

## Implement E2E testing into development workflow

Upgrades are provided as PRs that are automatically created in a project’s repository. To make sure all business functionality works as expected, you will need to review and test the PRs before merging.

## Check if your version control system is supported

Currently, the Upgrader supports GitHub and GitLab. If you want to use a different version control system, [contact support](https://spryker.force.com/support/s/), so we can implement its support in future.

## Optional: Implement headless design

The Upgrader does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

## Migrate to Spryker Cloud Commerce OS

The upgrader supports only the projects that run on [Spryker Cloud Commerce OS (SCCOS)](/docs/cloud/dev/spryker-cloud-commerce-os/getting-started-with-the-spryker-cloud-commerce-os.html). If you are running Spryker on premises, migrate to SCCOS.

## Update PHP to version 7.4 or higher

The Upgrader still supports PHP 7.4 to help you upgrade your project. However, make sure to update PHP to the recommended version based on [Supported versions of PHP](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html).

## Next steps

[Spryker CI](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/spryker-ci.html)
