---
title: Platform as a Service Plus
description: PaaS+ is a key to easy upgrades
template: concept-topic-template
---

Keeping enterprise software up-to-date is a known hurdle. Especially when it comes to sophisticated transactional business models with complex customizations. Current upgrade strategies often require a high investment of time, resources, and money that projects would rather spend on innovation. However, low upgrade frequency comes with reduced access to security and improvements patches, as well as new features.

Platform as a Service Plus (PaaS+) is a new service on top of Spryker PaaS, which addresses application upgradability challenges. PaaS+ includes a CI that provides you with automated upgrades and code quality checks while giving you full control of what to bring to your platform. By reducing upgrade efforts to a minimum, PaaS+ offers a reliable way to keep up with Spryker’s daily updates.

![Spryker PaaS+](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/platform-as-a-service-plus.md/spryker-paas-plus.png)


## Spryker CI

Spryker CI is powered by [Buddy](https://buddy.works) and provides an intuitive UI for a seamless CI/CD experience. It comes with two major functionalities:

* Quality checks
* Automated upgrades

A CI pipeline provides automated checks, a quality gate, that guides  developers towards compliance with our best practices and further fuels upgradability success. The upgrader service provides automated upgrades for minor and patch releases.


## CI pipelines

Spryker CI is shipped with four pipelines per project.

![Spryker CI pipelines](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/platform-as-a-service-plus.md/pipelines.png)

The main pipeline is triggered when you push to your connected repository, and it automatically triggers the remaining pipelines, according to the following actions:

![Pipeline steps](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/platform-as-a-service-plus.md/pipeline-steps.png)


{% info_block warningBox "Always run the main pipeline" %}

Build, Quality Gate, and Deployment pipelines are not designed to run independently. Always run your main environment pipeline to trigger the rest of the pipelines.

{% endinfo_block %}

The last three pipelines do the following:

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


![Quality gate](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/platform-as-a-service-plus.md/quality-gate.png)


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

[Onboarding to PaaS+](/docs/paas-plus/dev/onboarding-to-paas-plus.html)
