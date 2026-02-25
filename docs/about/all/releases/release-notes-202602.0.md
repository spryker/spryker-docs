---
title: Release notes 202602.0
description: Release notes for Spryker Cloud Commerce OS version 202602.0
last_updated: February 28, 2026
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## B2B Business-Ready Commerce Experiences

### Lorem Ipsum

Lorem Ipsum


## Connected, and AI-Enabled Platform

### Lorem Ipsum

Lorem Ipsum

### API Platform improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This release enhances API Platform capabilities to improve your developer experience and reduce manual configuration overhead.

**Key capabilities**
- Enable support for relationships in API Platform.
- Add support for custom validation constraints (FQCN-based) in schema definitions.
- Improve dependency resolution for API Platform packages.
- Add support for Code Buckets.
- Provide API test examples to help you adopt the features more easily.

**Business benefits**
- Generate and validate API resources more cleanly and consistently.
- Reduce the need for manual dependency fixes.
- Improve consistency in your API implementations.
- Accelerate onboarding and increase developer productivity.

**Documentation:**
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html)
- [Code Buckets](/docs/dg/dev/architecture/api-platform/code-buckets.html)
- [Relationships](/docs/dg/dev/architecture/api-platform/relationships.html)
- [API Test Examples](/docs/dg/dev/architecture/api-platform/testing.html)

### OMS New Visual User Experience <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker transforms the community-driven OMS visualizer into a fully validated and productized capability.

![Screenshot of the OMS visualizer showing order state machine transitions](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/2026-OMS-visualizer.png)

**Key capabilities**
- Provides a streamlined visualization of complex Order State Machines (OMS).

**Business benefits**
- Enables faster OMS iteration cycles and improves clarity when you develop or validate OMS processes.
- Reduces the time you spend debugging OMS flows by providing better visibility and tooling support.

**Documentation:**
- [Original Community Contribution](https://github.com/spryker-community/oms-visualizer)

### Platform & Tooling Upgrades <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We have updated critical application and service components to long-term supported versions to ensure continued stability, performance, and compatibility.

**Key capabilities**
- Upgraded PHPUnit to version 12 (full PHP 8.3 support, improved test data handling).
- Upgraded PHPStan to version 2.x to reduce memory consumption and significantly improve performance.
- Upgraded Angular to the latest supported major version 20.

**Business benefits**
- Faster CI pipelines and reduced waiting times for static analysis.
- Continued alignment with PHP ecosystem and Angular support lifecycles.
- Improved quality assurance and development tooling performance across projects.

**Documentation:**
- [Upgrade to Angular 20](https://docs.spryker.com/docs/dg/dev/upgrade-and-migrate/upgrade-to-angular-20.html)
- [Release unlocking the new PHPUnit version](https://api.release.spryker.com/release-group/6334)
- Spryker is fully compatible with PHPStan 2.x, update it at your own schedule.

### Performance & Stability Fixes <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

**Key capabilities**
- Improved Stock Data Import performance by removing usage of `\ProductAbstractCheckExistenceStep` and `ProductConcreteCheckExistenceStep` to eliminate unnecessary full database loads.
- Multiple other bugfixes and improvements.

**Documentation:**
- See [Spryker Releases](https://api.release.spryker.com/release-history) or use `composer` to update all packages.

## Efficient and Flexible Cloud Foundation

### Cloud Self-Service Portal update <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The Cloud Self-Service Portal is now available on a new platform that improves usability and accelerates value delivery.

**Key capabilities**
- Spryker has moved the Cloud Self-Service Portal to a new platform to provide a better user experience and faster value delivery.
- In the new portal, you can access centralized Single Sign-On (SSO) management.

**Business benefits**
- Provides a structured migration path to Single Sign-On (SSO) to help you simplify access management.

###  RabbitMQ 4.1 rollout <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This update completes the rollout of RabbitMQ 4.1 across all platform environments.

### Key capabilities:
* Upgrade to RabbitMQ 4.1 for improved messaging infrastructure.
* Platform-wide rollout to ensure consistency across environments.

### Business benefits:
* Improved stability and performance of asynchronous processing.
* Enhanced scalability for event-driven workloads.
* Reduced operational risk through alignment with the latest supported messaging version.

**Documentation:**
- [Docker SDK service configuration](/docs/dg/dev/integrate-and-configure/configure-services.html)
- [System Requirements](/docs/dg/dev/system-requirements/latest/system-requirements.html)
