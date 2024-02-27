---
title: Release notes
description: New features and enhancements for Spryker Cloud Commerce OS.
template: howto-guide-template
last_updated: Oct 17, 2023
originalLink: https://cloud.spryker.com/docs/release-notes
originalArticleId: eee5e8bc-dd95-4b51-91f4-203962a2e8af
redirect_from:
  - /docs/release-notes
  - /docs/en/release-notes
  - /docs/cloud/dev/spryker-cloud-commerce-os/release-notes.html
---

This document describes new features and enhancements released for Spryker Cloud Commerce OS.

{% info_block infoBox %}

Although these features are available to all SCCOS projects, we are introducing them as part of a gradual rollout.

{% endinfo_block %}


## March 2023

The following features were released in March 2023.

### Environment variable management <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Manage environment variables and secrets of applications using a UI without having to create a support ticket. This lets you to make changes autonomously, controlling the scope of the variables: application, scheduler or both. You can decide if changes should be applied immediately or as part of the next deployment.

Benefits:

Flexibility. You can change environment variables according to a needed schedule, which lets you adapt more easily to changing needs and requirements.

#### Documentation

[Define parameter and secret values in SCCOS environments](/docs/ca/dev/managing-parameters-in-the-parameter-store.html)


### Maintenance mode <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Enable and disable the maintenance mode of an application using a dedicated pipeline without having to create a support ticket. This feature helps you deploy new versions of applications without disrupting the user experience by unexpected errors.

Benefits:

Faster maintenance. You can enable maintenance mode more quickly, reducing downtime and minimizing disruption.

#### Documentation

* [Enable and disable maintenance mode](/docs/ca/dev/manage-maintenance-mode/enable-and-disable-maintenance-mode.html)
* [Configure access to applications in maintenance mode](/docs/ca/dev/manage-maintenance-mode/configure-access-to-applications-in-maintenance-mode.html)


### Deployment optimization of RabbitMQ <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Optimized the deployment of RabbitMQ by moving it to another existing step. This significantly reduces the pipeline runtime. Deploy RabbitMQ is now part of another deployment step.


### Platform upgrades <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Upgraded MariaDB, Redis, Jenkins, and their dependencies.

Benefits:

* Improved performance and reliability
* Improved security


## August 2022

The following features were released in August 2022.


### Destructive pipeline support for Multi Logical DB


This feature lets you quickly delete logical databases and associated resources, such as tables and indexes, in a single pipeline.

Benefits:

* Improved efficiency: delete logical databases and associated resources more quickly and easily, streamlining the process and saving time.
* Improved flexibility: delete logical databases and associated resources according to a needed schedule, rather than having to coordinate it with Spryker Support & Operations teams.


### Deployment optimization of Jenkins

Optimized deployment pipeline images to speed up the build of Jenkins.


## April 2022

Introduced a multi-database setup for multi-store environments. Now you can create databases per store in the same AWS environment.

Benefits of a multi-store setup:
* Each store has a dedicated index for Elasticsearch and its own virtual key-value storage (Redis).
* Shared virtual separated database per store.
* A cluster can share the same or use different database setups.
* One region can have multiple stores.
* Use code buckets for store customization logic.
* Use themes for different visual look and feel per store.
* Optimized environment instances usage and costs.
* Solves the uniqueness problem with URLs for different locales with the same language.
* Enables distinct category navigation, product schema details, and users.
* Improves privacy store management: one store has no knowledge about the users of another.

### Documentation

[Multi-store setups](/docs/ca/dev/multi-store-setups/multi-store-setups.html)


## January 2022

Increased the stability of Jenkins deployment. This update addresses critical issues and bugs, resulting in a more reliable and efficient experience. You can expect fewer interruptions, faster deployment times, and overall improved performance.


## May 2021

**CI/CD Documentation**: updated documentation with CI configuration examples for GitHub Actions, Bitbucket Pipelines, GitLab, and Azure.

**PHP-FPM Workers**: for better resource utilization, enabled workers to be defined per application in the configuration.

**Improved image for CD pipelines**: extended the image used for CD pipelines with extra development tools and capabilities to run tests and benchmarks within a CD pipeline.

**Configuration of Redis replicas**: for a faster response on reading operations, enabled the number of Redis replicas to be defined in the Deploy file.

## April 2021

**Elasticsearch prefix definition**: enabled Docker SDK to support the Elasticsearch prefix definition using the namespace variable defined in a Deploy file. It allows several projects to share a single Elasticsearch instance.

## March 2021

**CD Pipeline documentation**: described the deployment pipeline and project-level customization: deployment stages and how to customize them using hooks and scripts. See Deployment pipelines | Spryker and Customizing deployment pipelines | Spryker.

## February 2021

* **Documentation about Docker SDK installation on Windows**: updated Docker prerequisites for Windows with instructions for WSL2. See [Installing Docker prerequisites on Windows](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html).

* **Documentation about Onboarding deliverables**: updated the cloud administration getting started page with the deliverables provided after the onboarding. See [Getting started with cloud administration](/docs/ca/dev/getting-started-with-cloud-administration.html).

* **Documentation about GitLab**: published the instructions on connecting a GitLab repository to the CD Pipeline. See [Connect a GitLab code repository](/docs/ca/dev/connect-a-code-repository.html#connect-a-gitlab-code-repository).

* **Documentation about Docker SDK**: published new and updated existing pages covering the following Docker SDK topics: deploy file reference, choosing a version, quick start guide, installation, services, modes overview, mount options, debugging, running tests, and troubleshooting. See [Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html).

* **Load and stress test tool**: released a tool that contains predefined Spryker-specific test scenarios. The tool is based on [Gatling.io](http://gatling.io/) and can be used as a package integrated into a Spryker project or as a standalone package.
