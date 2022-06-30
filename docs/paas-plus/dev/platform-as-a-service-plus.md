---
title: Platform as a Service Plus
description: PaaS+ is a key to easy upgrades
template: concept-topic-template
---

Keeping enterprise software up-to-date is a known hurdle. Especially when it comes to sophisticated transactional business models with individualization and customizations. Current upgrade strategies require a high investment of time, resources, and money that projects would rather spend on innovation. However, low upgrade frequency comes with reduced access to security and improvements patches, as well as new features.

Platform as a Service Plus (PaaS+) is the next generation of Spryker PaaS, that addresses application upgradability challenges by providing a new Spryker CI service for automating upgrades and code quality reviews, while still providing full control on what to bring to your platform. By reducing upgrade efforts to a minimum, PaaS+ is offering a reliable way to keep up with Spryker’s daily update deliverables.

![Spryker PaaS+](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-paas-plus.png)


## Spryker CI overview

Spryker CI is powered by [Buddy](https://buddy.works) and provides an intuitive UI for a seamless CI/CD experience.

It comes with two major functionalities:
* Automated upgrades
* Quality checks

The new upgrader service provides effortless upgrades for minor and patch releases. A CI pipeline provides automated checks, a quality gate, that guides  developers towards compliance with our best practices and further fuels upgradability success.

## Onboarding to PaaS upgradability

Onboarding to PaaS+ happens in two steps:

1. Getting your project ready and compliant with a set of pre-requirements to ensure you fully benefit from all the features.
2. Getting started with Spryker CI.


## 1. Getting your project ready for PaaS Upgradability  
For our current version of the upgradability package, the following pre-requisites apply:

//need better formating for the pre-requisites

### 1.1. Each module should be of the latest version

Spryker upgrader service will automatically provide minor and patches. If your application is not on the latest major of a module, you will only be able to receive minor and patches that apply to the latest major version you have upgraded to.

### 1.2. Code should be compliant with Spryker Quality Gate

Spryker Quality Gate contains code checkers to ensure code compliance with Srpyker development and customization best practices. These code checkers ensure that your Spryker application is compatible with minor and patch updates, even when it’s highly customized.

#### How can I make my code compliant?

Please read our documentation on [Keeping a project upgradable](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html#select-a-development-strategy). You can check if your customized project is compliant with Spryker Quality Gate by using our [tool] (https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html#check-if-project-is-upgradable-using-the-evaluator-tool). Follow our [guidelines] (https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html) in order to solve any non-compliance issues.

**3. Customer should develop their Spryker application using Spryker SDK**
**Why?** Customers need to use Spryker SDK throughout the development life cycle, to ensure compliance with Spryker architecture and customization best practices.

## 1.4. Project's development workflow should include full E2E testing

Upgrades are provided as a PR that is automatically created in the project’s repository. To ensure all business functionality works as expected, you will need to review and test the PRs before merging.

## 1.5. Codebase is on GitHub or GitLab

At the moment, upgrades are provided only  on repositories using GitHub or GitLab. If your project uses a different git provider, please reach out to your CSM to ensure we can incorporate it in our product roadmap.

## 1.6. Optional: Project should be headless

Currently, the the quality gate does not evaluate frontend customizations. You can either move to headless or apply frontend upgrades manually.

//needs better formating
Disclaimer: As we evolve the product, we will be working on extending functionalities and pre-requirements will be adjusted accordindly.

### Assumptions and Exceptions
We assume customers are already using Spryker PaaS Cloud services. When not applicable, customer needs to migrate to our Cloud service.



## Step 2: Onboarding to Spryker CI
Once you finalize step 1, you will be onboarded to Spryker CI and benefit from Spryker quality gate and automated upgrades.

### What do you need to provide?
In order to get you started, please provide the email of your Spryker Cloud Admin to your CSM. Your Spryker Cloud Admin user will be a Super User, which mean they will have RW rights on Spryker CI (e.g. ability to change repository; ability to invite new users to their workspace).
Once we receive your user email, we will provision a Spryker CI workspace for you. You will then receive the invitation to your Spryker CI workspace via email.

![Onboarding to Spryker CI](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/onboarding-to-spryker-ci.png)

## 5 steps to get started with Spryker CI

**Step 1. Go to your $(workspacename) workspace**
You receive an email with a one-time invitation token, but your invitation is always accessible by signing in on Buddy.works. Create your account & accept the invitation to your workspace.

![Spryker CI invitation](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-invitation.png)


**Step 2. View projects inside your workspace**
Your Spryker CI workspace contains the Spryker Upgrader Service project, as well as a project for each of your environments (e.g. development, production, etc).

![Spryker CI projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-projects.png)

**Step 3. Invite new users***
*Feature only available for Super Users.

Add new users to your project and assign user permissions. Two roles are available: Super Users (RW) and Regular Users (RO & ability to run pipelines).


**Step 4. Connect your repository***
*Feature only available for Super Users.

Connect your repository to a project, before running the pipelines. Open the“Code” section, click on the kebab menu and select "Switch repository or Git provider”.

![gif1](https://user-images.githubusercontent.com/83701393/176354903-a9d0a669-af3f-449d-bde7-cfc696e96569.gif)


Select your git provider & add a new integration. Authorization is possible via OAuth or Token. After connecting, choose “Clone repository from scratch”.

![gif2](https://user-images.githubusercontent.com/83701393/176354926-c486ddfc-25e2-4ae6-b32d-d0dad14d4aee.gif)



**Step 5. Push & have fun!**
Main pipeline in each project is triggered when you commit & push from your connected repository. More information on Pipelines is provided below.       
<img width="446" alt="Image 5 6" src="https://user-images.githubusercontent.com/83701393/176354944-9d097014-9f1e-4ec7-9788-287f447fde4a.png">




## What pipelines are automatically included in your workspace?

**###Main pipeline inside environment-related projects**
The main pipeline inside a project is named as follows:
[“***” + ”environment_name” + ”Pipeline” + ”***”].

![Spryker CI pipelines](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-pipelines.png)

Examples of main pipelines names:  “*** Dev Pipeline ***” or “*** Prod Pipeline ***”


The main pipeline is triggered when you push from your connected repository, and it automatically triggers the remaining pipelines, according to the following actions:
<img width="186" alt="Image7" src="https://user-images.githubusercontent.com/83701393/176355028-49e4b72e-19d0-49f1-9216-6ff909da7f26.png">


####What happens in each step of the pipeline?
Please note, the sub-pipelines (i.e. Build, Quality Gate and Deployment) **should not be run independently **and would lead to deployment failure.

**1. Build**
- Builds Docker images
- Pushes the image to ECR

**2. Quality Gate**
- Provides automated code quality feedback, to ensure your [project is always upgradable] (https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).
- Checks for compliance of Spryker Core and project specific code with our customization best practices. These are relevant for BE customizations that may cause incompatibility with minor releases or patches.
- For non-compliant code, the Quality Gate displays an issue report. Additional guidelines for further development improvements are also available in [Spryker documentation portal] (https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).
- For an effortless & safer upgrade experience, Spryker recommends to only deploy code that passes the Quality Gate assessment.
<img width="743" alt="Image8" src="https://user-images.githubusercontent.com/83701393/176355054-9259da5c-2200-4a69-93fc-f5c4485d6ca9.png">


**Approval step**
Manually approve if you want to deploy your current changes.

**3. Deployment**
Deploys to your specific AWS environment.


**###Spryker Upgrader Service**
The upgrader service provides automated upgrades for your Spryker application:
- Scheduled once per week.
- Upgrades for minor and patches are automatically prepared in the form of a pull request (PR) created in your connected Git repository.
- Code changes, such as deprecations, are automatically applied.
- In case major releases are available, this information is shown in the PR together with a link to relevant documentation the customer needs to manually upgrade to the latest major.
- Customers shall review and perform end to end testing for each prepared PR, before applying suggested changes.



##Need support with Spryker CI?
We are here to help! Contact us via [Spryker support portal] (https://spryker.force.com/support/s/).
To learn more about [Buddy.works] (https://buddy.works/docs), these docs will help you out.
