---
title: Platform as a Service Plus
description: PaaS+ is a key to easy upgrades
template: concept-topic-template
---

Keeping enterprise software up-to-date is a known hurdle. Especially when it comes to sophisticated transactional business models with individualization and customizations. Current upgrade strategies require a high investment of time, resources, and money that projects would rather spend on innovation. However, low upgrade frequency comes with reduced access to security and improvements patches, as well as new features.

Platform as a Service Plus (PaaS+) is the next generation of Spryker PaaS that addresses application upgradability challenges via Spryker CI. PaaS+ automates  upgrades and code quality checks, while providing full control on what to bring to your platform. By reducing upgrade efforts to a minimum, PaaS+ is offering a reliable way to keep up with Spryker’s daily updates.

![Spryker PaaS+](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-paas-plus.png)


## Spryker CI overview

Spryker CI is powered by [Buddy](https://buddy.works) and provides an intuitive UI for a seamless CI/CD experience. It comes with two major functionalities:

* Quality checks
* Automated upgrades

A CI pipeline provides automated checks, a quality gate, that guides  developers towards compliance with our best practices and further fuels upgradability success. The new upgrader service provides effortless upgrades for minor and patch releases.

## Onboarding to PaaS+

Onboarding to PaaS+ happens in two steps:

1. Getting your project ready and compliant with a set of pre-requirements to ensure you fully benefit from all the features.
2. Getting started with Spryker CI.


## 1. Get your project ready for PaaS+  

Before you can start managing the upgrades of your project with PaaS+, fulfill the following prerequisites:

### 1.1. Update each module to the latest version

Spryker upgrader provides automatic minor and patch updates for the current version of each module. Since we release most of the updates for the latest versions of modules, if a module is not of the latest major version, it will not receive most of the updates.

### 1.2. Make your code compliant with Spryker Quality Gate

Spryker Quality Gate contains code checkers that ensure code compliance with Srpyker development and customization guidelines. When an application is compliant with the guidelines, it can safely take minor and patch updates, even if it’s highly customized.

For instructions on making your code compliant with the guidelines, see [Keeping a project upgradable](/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

**3. Customer should develop their Spryker application using Spryker SDK**
**Why?** Customers need to use Spryker SDK throughout the development life cycle, to ensure compliance with Spryker architecture and customization best practices.

## 1.4. Include E2E testing into your project's development workflow

Upgrades are provided as PRs that are automatically created in a project’s repository. To make sure all business functionality works as expected, you will need to review and test the PRs before merging.

## 1.5. Codebase is on GitHub or GitLab

At the moment, upgrades are provided only  on repositories using GitHub or GitLab. If your project uses a different git provider, please reach out to your CSM to ensure we can incorporate it in our product roadmap.

## 1.6. Optional: Project should be headless

Currently, the the quality gate does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

//needs better formating
Disclaimer: As we evolve the product, we will be working on extending functionalities and pre-requirements will be adjusted accordindly.

### Assumptions and Exceptions
We assume customers are already using Spryker PaaS Cloud services. When not applicable, customer needs to migrate to our Cloud service.



## 2. Onboarding to Spryker CI
Once you finalize step 1, you will be onboarded to Spryker CI and benefit from Spryker quality gate and automated upgrades.

### Get

To get started, provide the email of your Spryker Cloud Admin to your CSM. The  Spryker Cloud Admin user will be a super user. They will be able to change repository and invite new users to their workspace.

Once we receive the admin's email address, we will provision and send you an email invitation to your Spryker CI workspace.

![Onboarding to Spryker CI](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/onboarding-to-spryker-ci.png)

### 2.1. Go to your $(workspacename) workspace

You receive an email with a one-time invitation token, but your invitation is always active when you sign in at [buddy.works](https://buddy.works). Create your account and accept the invitation to your workspace.

![Spryker CI invitation](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-invitation.png)


### 2.2. View projects inside your workspace

Your Spryker CI workspace contains the Spryker Upgrader Service project, as well as a project for each of your environments, like development or production.

![Spryker CI projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-projects.png)

### 2.3. Invite new users
*Feature only available for Super Users.

Add new users to your project and assign user permissions. Two roles are available: Super Users (RW) and Regular Users (RO & ability to run pipelines).


### 2.4. Connect your repository

*Feature only available for Super Users.

Connect your repository to a project, before running the pipelines. Open the“Code” section, click on the kebab menu and select "Switch repository or Git provider”.

![gif1](https://user-images.githubusercontent.com/83701393/176354903-a9d0a669-af3f-449d-bde7-cfc696e96569.gif)


Select your git provider and add a new integration. Authorization is possible via OAuth or Token. After connecting, choose “Clone repository from scratch”.

![gif2](https://user-images.githubusercontent.com/83701393/176354926-c486ddfc-25e2-4ae6-b32d-d0dad14d4aee.gif)



## 2.5. Push and have fun!
Main pipeline in each project is triggered when you push to a connected repository. More information on Pipelines is provided below.       
<img width="446" alt="Image 5 6" src="https://user-images.githubusercontent.com/83701393/176354944-9d097014-9f1e-4ec7-9788-287f447fde4a.png">




## What pipelines are available by default?

### Main pipeline inside environment-related projects
The main pipeline inside a project is named as follows:
<b>*** {environment_name} Pipeline ***</b>.

![Spryker CI pipelines](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-pipelines.png)

The main pipeline is triggered when you push from your connected repository, and it automatically triggers the remaining pipelines, according to the following actions:
<img width="186" alt="Image7" src="https://user-images.githubusercontent.com/83701393/176355028-49e4b72e-19d0-49f1-9216-6ff909da7f26.png">


### What happens in each step of the pipeline?

{% info_block warningBox "What pipelines to run" %}

Build, Quality Gate, and Deployment pipelines are not designed to run independently. Always run your main environment pipeline to trigger the rest of the pipelines.

{% endinfo_block %}

Please note, the sub-pipelines (i.e. Build, Quality Gate and Deployment) **should not be run independently **and would lead to deployment failure.

1. Build:
* Builds Docker images
* Pushes the image to ECR

2. Quality Gate:
* Provides automated code quality feedback to ensure your [project is always upgradable] (https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

* Evaluates compliance of Spryker Core and project specific code with our customization best practices. These are relevant for backend customizations that may cause incompatibility with minor releases and patches.

* For non-compliant code, displays an issue report. For instructions on solving compatibility issues, see [Upgradability guidelines](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).
* For an effortless & safer upgrade experience, Spryker recommends to only deploy code that passes the Quality Gate assessment.
<img width="743" alt="Image8" src="https://user-images.githubusercontent.com/83701393/176355054-9259da5c-2200-4a69-93fc-f5c4485d6ca9.png">


3. Deployment: Deploys to your specific AWS environment.


## Spryker Upgrader service

The upgrader service provides automated upgrades for your Spryker application:
- Scheduled once per week.
- Upgrades for minor and patches are automatically prepared in the form of a pull request (PR) created in your connected Git repository.
- Code changes, like deprecations, are automatically applied.
- If major releases are available, a PR contains a link to instructions for manual upgrade.
- Customers shall review and perform end to end testing for each prepared PR, before applying suggested changes.



## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
