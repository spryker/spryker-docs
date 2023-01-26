---
title: Spryker CI
description: PaaS+ is a key to easy upgrades
template: concept-topic-template
---

Spryker CI is powered by [Buddy](https://buddy.works) and provides an intuitive UI for a seamless CI/CD experience. It comes with two major functionalities:

* Quality checks
* Automated upgrades

A CI pipeline provides automated checks, a quality gate, that guides developers towards compliance with our best practices and further fuels upgradability success. The upgrader service provides automated upgrades for minor and patch releases.


## CI pipeline

Spryker CI is shipped with `Upgrader` pipelines per project.

// TODO: Change image here
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


### How to connect project to Upgrader Service in Spryker CI

To connect your project to Upgrader Service in Spryker CI, you will need to do the following:

1. Go to your Project in Spryker CI and click the "Code" tab.

// TODO: Add image here

2. Select your Git hosting provider that you are using (e.g. GitHub, GitLab) and click on "+" button to add the new integration.

// TODO: Add image here

3. Fill the form with required information and click "New integration" button when you will be ready.

// TODO: Add image here

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).

## Next steps

[Onboarding to PaaS+](/docs/paas-plus/dev/onboarding-to-paas-plus.html)
