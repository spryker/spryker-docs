---
title: Run Spryker Code Upgrader
description: Instructions for running Spryker Code Upgrader
template: concept-topic-template
---

This document describes how to manually trigger Spryker Code Upgrader.

## Prerequisites

Connect the Upgrader to your project using one of the following guides:

* [Connect Spryker Code Upgrader to a GitHub managed project](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.html)
* [Connect Spryker Code Upgrader to a GitLab managed project](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-gitlab-managed-project.html)

## Manually trigger Spryker Code Upgrader

1. In Spryker CI, go to **Projects**.
2. On the **Projects** page, select **Spryker Code Upgrader**.
    This opens the **Pipelines** page.
3. Next to the **Upgrader** pipeline, click **Run**.
    This manually triggers the Upgrader. It analyzes the connected project and creates a PR with updates. 

## Support for Spryker CI

* For help with Spryker CI, [contact support](https://spryker.force.com/support/s/).
* To learn more about Buddy, see their [docs](https://buddy.works/docs).
