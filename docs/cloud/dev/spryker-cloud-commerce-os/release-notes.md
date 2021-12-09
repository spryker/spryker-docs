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

* **Documentation about Docker SDK**: published new and updated existing pages covering the following Docker SDK topics: deploy file reference, choosing a version, quick start guide, installation, services, modes overview, mount options, debugging, running tests, troubleshooting. See [Docker SDK](https://documentation.spryker.com/docs/docker-sdk).

* **Load and stress test tool**: released a tool that contains predefined Spryker-specific test scenarios. The tool is based on [Gatling.io](http://gatling.io/) and can be used as a package integrated into a Spryker project or as a standalone package.
