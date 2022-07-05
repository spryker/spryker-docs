---
title: Platform as a Service Plus
description: PaaS+ is a key to easy upgrades
template: concept-topic-template
---

Keeping enterprise software up-to-date is a known hurdle. Especially when it comes to sophisticated transactional business models with individualization and customizations. Current upgrade strategies require a high investment of time, resources, and money that projects would rather spend on innovation. However, low upgrade frequency comes with reduced access to security and improvements patches, as well as new features.

Platform as a Service Plus (PaaS+) is the next generation of Spryker PaaS that addresses application upgradability challenges via Spryker CI. PaaS+ automates  upgrades and code quality checks, while providing full control on what to bring to your platform. By reducing upgrade efforts to a minimum, PaaS+ is offering a reliable way to keep up with Spryker’s daily updates.

![Spryker PaaS+](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-paas-plus.png)


## Spryker CI

Spryker CI is powered by [Buddy](https://buddy.works) and provides an intuitive UI for a seamless CI/CD experience. It comes with two major functionalities:

* Quality checks
* Automated upgrades

A CI pipeline provides automated checks, a quality gate, that guides  developers towards compliance with our best practices and further fuels upgradability success. The new upgrader service provides effortless upgrades for minor and patch releases.


## CI pipelines

By default, there is a main pipeline and sub-pipelines.

![Spryker CI pipelines](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas-plus/dev/platform-as-a-service-plus.md/spryker-ci-pipelines.png)

The main pipeline is triggered when you push to your connected repository, and it automatically triggers the remaining pipelines, according to the following actions:
<img width="186" alt="Image7" src="https://user-images.githubusercontent.com/83701393/176355028-49e4b72e-19d0-49f1-9216-6ff909da7f26.png">


{% info_block warningBox "Always run the main pipeline" %}

Build, Quality Gate, and Deployment pipelines are not designed to run independently. Always run your main environment pipeline to trigger the rest of the pipelines.

{% endinfo_block %}

The sub-pipelines do the following:

1. Build:
    * Builds Docker images.
    * Pushes the image to ECR.

2. Quality Gate:
    * Provides automated code quality feedback to ensure your [project is always upgradable](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html).

    * Evaluates compliance of Spryker Core and project specific code with our customization best practices. These are relevant for backend customizations that may cause incompatibility with minor and patch releases.

    * For non-compliant code, displays an issue report. For instructions on solving compatibility issues, see [Upgradability guidelines](https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).


{% info_block warningBox "Verification" %}

For an effortless and safer upgrade experience, we recommend deploying only the  code that passes the Quality Gate evaluation.

{% endinfo_block %}


<img width="743" alt="Image8" src="https://user-images.githubusercontent.com/83701393/176355054-9259da5c-2200-4a69-93fc-f5c4485d6ca9.png">


3. Deployment: Deploys to the defined AWS environment.


## Spryker Upgrader Service

The upgrader service provides automated upgrades for your application as follows:
* Runs upgrades once per week.
* Provides upgrades for minor and patch releases by creating PRs in your connected Git repository.
* Automatically applies code changes, like deprecations.
* If major releases are available, adds links to instructions for manual upgrades to PRs.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).

## Next steps

[Onboarding to PaaS+](/docs/paas-plus/dev/onboarding-to-paas+.md)
