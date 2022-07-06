---
title: Onboarding to PaaS+
description: Get your project ready and start upgrading with PaaS+
template: concept-topic-template
---

Onboarding to PaaS+ happens in two steps:

1. Getting your project ready and compliant with a set of pre-requirements to ensure you fully benefit from all the features.
2. Getting started with Spryker CI.


## 1. Get your project ready for PaaS+  

Before you can start managing the upgrades of your project with PaaS+, fulfill the following prerequisites.

### 1.1. Update each module to the latest version

Spryker upgrader provides automatic minor and patch updates for the current version of each module. Since we release most of the updates for the latest versions of modules, if a module is not of the latest major version, it will not receive most of the updates.

### 1.2. Implement Spryker SDK in development

Using [Spryker SDK](/docs/sdk/dev/spryker-sdk.html) for development helps you achieve compliance with Spryker architecture and customization best practices.

### 1.3 Make your code compliant with Spryker Quality Gate

Spryker Quality Gate contains code checkers that ensure code compliance with Srpyker development and customization guidelines. When an application is compliant with the guidelines, it can take minor and patch updates without breaking anything, even if it’s highly customized.

For instructions on making your code compliant with the guidelines, see [Keeping a project upgradable](/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

### 1.4. Implement E2E testing into your project's development workflow

Upgrades are provided as PRs that are automatically created in a project’s repository. To make sure all business functionality works as expected, you will need to review and test the PRs before merging.

### 1.5. Migrate the codebase to GitHub or GitLab

At the moment, upgrades are provided only for repositories on GitHub or GitLab. If you want to use a different git provider, reach out to your CSM, so we can add it to our product roadmap.

### 1.6. Optional: Implement headless design

Currently, the quality gate does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

### 1.7 Migrate to Spryker Cloud Commerce OS

PaaS+ supports only the projects that run on Spryker Cloud Commerce OS (SCCOS). If you are running Spryker on premises, to use PaaS+, migrate to SCCOS.

## 2. Onboarding to Spryker CI

Onboarding to Spryker CI consists of the following steps.

### 2.1 Get initial access

To get started, provide the email of your SCCOS admin to your CSM. The admin user will be a super user. They will be able to change repository and invite new users to their workspace.

Once we receive the admin's email address, we will provision and send you an email invitation to your Spryker CI workspace.

![Onboarding to Spryker CI](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/onboarding-to-spryker-ci.png)

### 2.2. Go to your workspace

You receive an email with a one-time invitation token, but your invitation is always active when you sign in at [buddy.works](https://buddy.works). Create your account and accept the invitation to the workspace.

![Spryker CI invitation](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-invitation.png)


### 2.3. View projects inside your workspace

Your workspace contains the Spryker Upgrader Service project, as well as a project for each of your environments, like development or production.

![Spryker CI projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-projects.png)

### 2.4. Invite new users

Add new users to your project and assign user permissions. Two roles are available:

* Super users with read and write access that can configure repositories, run pipelines, and invite new users.
* Regular users with read access that can run pipelines.


### 2.5. Connect your repository

Connect your repository to a project, before running the pipelines. Open the“Code” section, click on the kebab menu and select "Switch repository or Git provider”.

![gif1](https://user-images.githubusercontent.com/83701393/176354903-a9d0a669-af3f-449d-bde7-cfc696e96569.gif)


Select your git provider and add a new integration. Authorization is possible via OAuth or Token. After connecting, choose “Clone repository from scratch”.

![gif2](https://user-images.githubusercontent.com/83701393/176354926-c486ddfc-25e2-4ae6-b32d-d0dad14d4aee.gif)



### 2.5. Push and have fun!
Main pipeline in each project is triggered when you push to a connected repository. More information on Pipelines is provided below.       
<img width="446" alt="Image 5 6" src="https://user-images.githubusercontent.com/83701393/176354944-9d097014-9f1e-4ec7-9788-287f447fde4a.png">


## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
