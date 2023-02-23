---
title: Integrate Spryker Code Upgrader into your development process
description: How to integrate Spryker Code Upgrader into your development process
template: concept-topic-template
---

Spryker Code Upgrader works best when it is strategically integrated into your development process. hen integrating Spryker Code Upgrader into your development process it is important to consider your development process and integrate it correctly, here we would like to briefly explain how Spryker Code Upgrader can be integrated into your Scrum development process and Git flow.

![Spryker CI projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/integrate-spryker-code-upgrader.md/spryker-code-upgrader-integration-diagramm.png)

## Scrum

* Sprint Planning: The team can review the upgrade suggestions as pull requests in your repository hosting service and prioritize the software upgrades that need to be installed in the upcoming sprint.

* Sprint Execution: During the sprint, the team can review, validate, modify and merge the upgrades using the new process offered by Spryker Code Upgrader.

This approach will allow you to break up bigger list of upgrades into a list of smaller pieces, each smaller piece can be processed within a sprint ensuring continuity of this process.

## Git Flow

* When connecting Spryker Code Upgrader to your code hosting service you need to pick a base branch, that Spryker Code Upgrader will use. It can be Develop Branch.

* When Spryker Code Upgrader runs, it will pull the configured branch, analyze you installation, upgrade code and create a pull request.

* This pull request should be processed by the team as covered above, at the end it is either merged or closed. If Spryker Code Upgrader detects an open pull request, it will not suggest a new one.

* Develop Branch can then be deployed to your staging following your standard development process.

* After passing all your quality processes Develop Branch propagates into a release or Main branch where it gets deployed to production.

By integrating Spryker Code Upgrader into the development process using these methodologies, you can ensure that software upgrades are managed effectively and efficiently, and that the development process is streamlined and optimized.

Your team is responsible for:

* Prepare your project accordingly to [minimal requirements](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/prepare-your-project.html)

* [Activate integration](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader/how-to-connect-spryker-code-upgrader.html) of Spryker Code Upgrader with your code hosting service

* Cover your custom developments with automated tests to ensure safer and effortless upgrades

* Extend your development process with additional guidelines and quality checks aimed at ensuring safe upgrades

* Regularly review upgrade suggestions and explicitly merge or close pull requests

## Next steps

[Onboarding to Spryker Code Upgrader](/docs/paas-plus/dev/onboarding-to-spryker-code-upgrader.html)
