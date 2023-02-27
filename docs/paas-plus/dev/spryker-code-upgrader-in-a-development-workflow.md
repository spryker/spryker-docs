---
title: Spryker Code Upgrader in a development workflow
description: Instructions for integrating Spryker Code Upgrader into a development process
template: concept-topic-template
---

Spryker Code Upgrader works best when it is strategically integrated into your development process. This document describes how to integrate the Upgrader into your Scrum activities and Git flow to streamline and optimize the development workflow.

## Processing code upgrades with Scrum

When the Upgrader is integrated into your development process, we recommend processing updates during the following scrum activities:

* Sprint planning: review, prioritize, and select the upgrade suggestions to be installed in the upcoming sprint.

* Sprint execution: review, validate, modify, and merge the upgrades using the [Git flow](#git-flow).

This approach lets you break up big upgrades into smaller pieces. Each smaller piece can be processed within a sprint ensuring the continuity of the process.

## Git flow

The upgrader connects to a selected base branch in your project's repository. For example, a Development branch. Based on the defined schedule, the Upgrader pulls the branch, analyzes the code and creates a pull request with the needed updates. Your development team reviews the branch to merge or close it. For processing the PRs, you can use the process described in [Processing code upgrades with Scrum](#processing-code-upgrades-with-scrum).

{% info_block infoBox "Upgrade schedule" %}

If there is an open PR, the Upgrader does not create a new one.

{% endinfo_block %}


Following your standard development process, the updates are deployed to a staging environment. After passing all quality processes, the Development branch propagates into your release branch where it gets deployed to production.

![Spryker CI projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/integrate-spryker-code-upgrader.md/spryker-code-upgrader-integration-diagramm.png)

## Development team responsibilities

* [Prepare your project](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/prepare-your-project.html)

* [Activate integration](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.html) of Spryker Code Upgrader with your code hosting service

* Cover customizations with automated tests

* Extend development process with additional guidelines and quality checks

* Regularly process upgrade suggestions

## Next steps

[Onboarding to Spryker Code Upgrader](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader.html)
