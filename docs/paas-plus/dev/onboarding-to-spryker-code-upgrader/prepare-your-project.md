---
title: Prepare your project
description: Get your project ready to start using Spryker Code Upgrader
template: concept-topic-template
---

## 1. Get your project ready for Spryker Code Upgrader

Before you can start managing the upgrades of your project with Spryker Code Upgrader, fulfill the following prerequisites.

### 1.1. Update all Spryker modules at least till version 2022.04

Spryker Code Upgrader provides automatic minor and patch updates for the current version of each module. Since we release most of the updates for the latest versions of modules, if a module is not of the latest major version, it will not receive most of the updates.

### 1.2. Make your code compliant with Spryker Quality Gate

Spryker Quality Gate contains code checkers that ensure code compliance with Spryker development and customization guidelines. When an application is compliant with the guidelines, it can take minor and patch updates without breaking anything, even if it’s highly customized.

For instructions on making your code compliant with the guidelines, see [Keeping a project upgradable](/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

### 1.3. Implement E2E testing into your project's development workflow

Upgrades are provided as PRs that are automatically created in a project’s repository. To make sure all business functionality works as expected, you will need to review and test the PRs before merging.

### 1.4. Make sure your Git hosting provider is supported

At the moment Spryker Code Upgrader supports only the following Git hosting providers: GitHub and GitLab. If you want to use a different Git hosting provider, please [contact support](https://spryker.force.com/support/s/), so we can implement its support in the future.

### 1.5. Optional: Implement headless design

Spryker Code Upgrader does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

### 1.6. Migrate to Spryker Cloud Commerce OS

PaaS+ supports only the projects that run on Spryker Cloud Commerce OS (SCCOS). If you are running Spryker on premises, to use PaaS+, migrate to SCCOS.

### 1.7. Make sure you use PHP version 7.4+

PHP 7.4 was end of life on <strong>November 28th, 2022</strong>, that is why [Spryker has stopped supporting PHP 7.4](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html). But Spryker Code Upgrader still supports projects on PHP version 7.4 to help you to update your project. Please make sure that your projects uses PHP version 7.4 or higher.

## Next steps
[Spryker CI explanation](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/spryker-ci.html)
