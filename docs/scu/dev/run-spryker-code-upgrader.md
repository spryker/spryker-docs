---
title: Run Spryker Code Upgrader
description: Instructions for running Spryker Code Upgrader
template: concept-topic-template
redirect_from:
  - /docs/paas-plus/dev/run-spryker-code-upgrader.html
---

This document describes how to manually trigger Spryker Code Upgrader.

## Prerequisites

Connect the Upgrader to your project using one of the following guides:

* [GitHub access token requirements](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-gitlab-managed-project.html#prerequisites)
* [GitLab access token requirements](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-gitlab-managed-project.html#prerequisites)
* [GitLab access token requirements for self-hosted projects](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-project-self-hosted-with-gitlab.html#prerequisites)
* [Azure access token requirements](/docs/scu/dev/onboard-to-spryker-code-upgrader/connect-spryker-ci-to-a-azure-managed-project.html#prerequisites)

## Manually trigger Spryker Code Upgrader

1. In Spryker CI, go to **Projects**.
2. On the **Projects** page, select **Spryker Code Upgrader**.
    This opens the **Pipelines** page.
3. Next to the **Upgrader** pipeline, click **Run**.
    This manually triggers the Upgrader. It analyzes the connected project and creates a PR with updates.

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
