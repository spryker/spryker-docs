---
title: Release notes
description: New features and enhancements for Spryker Cloud Commerce OS.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/release-notes
originalArticleId: eee5e8bc-dd95-4b51-91f4-203962a2e8af
redirect_from:
  - /docs/release-notes
  - /docs/en/release-notes
---

This document describes new features and enhancements we released for Spryker Cloud Commerce OS.

{% info_block infoBox %}

Although these features will be available to all Spryker customers, we are introducing them as part of a gradual rollout.

{% endinfo_block %}



## March 2023

### Environment variable management <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Manage environment variables and secrets of applications using a UI without having to create a support ticket. This lets you to make changes autonomously, controlling the scope of the variables: application, scheduler or both. You can decide if changes should be applied immediately or as part of the next deployment.

Benefits:

Better flexibility and higher autonomy. Projects can now change their environment variables according to a needed schedule, enabling them to adapt more easily to changing needs and requirements.


### Maintenance mode <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Enable and disable the maintenance mode of an application using a dedicated pipeline without having to create a support ticket. This feature helps you deploy new versions of your application without disrupting the user experience by unexpected errors.

Benefits:

Faster maintenance. Projects can now enable maintenance mode more quickly, reducing downtime and minimizing disruption.


### Deployment optimization for RabbitMQ <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We have introduced deployment step optimization that significantly reduces the pipeline runtime for our Spryker Core Commerce solution. This optimization involves the decoupling of RabbitMQ in the deployment process. Improvement


### Platform upgrades <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Major platform upgrades. We have completed a series of upgrades to our diverse platform resources. These upgrades include MariaDB, Redis, Jenkins, and its dependencies.

Benefits:
Improved performance: The upgrades have resulted in increased performance and reliability for our platform.
Enhanced security: The upgrades include various security enhancements that improve the overall security of our platform.


## August 2022

### Destructive pipeline support for Multi Logical DB


This feature lets users quickly delete their logical databases and associated resources, such as tables and indexes, in a single pipeline.
Benefits:
Improved efficiency: The destructive pipeline support allows users to delete their logical databases and associated resources more quickly and easily, streamlining the process and saving time.
Enhanced flexibility: Users can now delete their logical databases and associated resources on their schedule, rather than having to coordinate with Spryker Support & Operations team.


### Speed up the deployment pipeline

Optimized deployment pipeline image to speed up the build of Jenkins.


## April 2022

Multi-Store with Multi Logical DB setup: Previously, it was possible to have only one logical DB in one AWS environment.

Benefits:
Each store has a dedicated index for ES and its own virtual key-value storage (Redis).
Shared virtual separated database per store.
Now it's possible to have the cluster sharing the same or use different database setups.
One region can now have multiple stores.
Use code buckets for store customization (logic).
Improved flexibility allowing to have user themes for different visual “look and feel” per store.
Optimize environment instances usage and costs.
Higher flexibility managing URLs (solve uniqueness problem with URLs for different locales with the same language).
Higher flexibility in managing store configuration, allowing distinct category navigation, product schema details, and users.
Improved privacy store management - one store has no knowledge about the users of another.




## January 2022

Increased stability of Jenkins deployment: This update addresses several critical issues and bugs, resulting in a more reliable and efficient experience. With this new release, you can expect fewer interruptions, faster deployment times, and improved overall performance.

…

//—----------- Footer —-----------





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

* **Documentation about Docker SDK installation on Windows**: updated Docker prerequisites for Windows with instructions for WSL2. See [Installing Docker prerequisites on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl2.html).

* **Documentation about Onboarding deliverables**: updated the Spryker Cloud Commerce OS getting started page with the deliverables provided after the onboarding. See [Getting started with the Spryker Cloud Commerce OS](/docs/cloud/dev/spryker-cloud-commerce-os/getting-started-with-the-spryker-cloud-commerce-os.html).

* **Documentation about GitLab**: published the instructions on connecting a GitLab repository to the CD Pipeline. See [Connect a GitLab code repository](/docs/cloud/dev/spryker-cloud-commerce-os/connecting-a-code-repository.html#connect-a-gitlab-code-repository).

* **Documentation about Docker SDK**: published new and updated existing pages covering the following Docker SDK topics: deploy file reference, choosing a version, quick start guide, installation, services, modes overview, mount options, debugging, running tests, and troubleshooting. See [Docker SDK](/docs/scos/dev/the-docker-sdk/{{site.version}}/the-docker-sdk.html).

* **Load and stress test tool**: released a tool that contains predefined Spryker-specific test scenarios. The tool is based on [Gatling.io](http://gatling.io/) and can be used as a package integrated into a Spryker project or as a standalone package.
