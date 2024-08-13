---
title: Release notes 202404.0
description: Release notes for the Spryker Cloud Commerce OS version 202404.0
last_updated: Apr 20, 2024
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).


## Stripe app<span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Stripe app is a new ACP app in the payment category. The initial version of the Stripe app offers a seamless and secure payment service for B2B and B2C transactions. With its global reach and adherence to regulatory standards, it ensures hassle-free electronic transactions while meeting compliance requirements.

Currently, Stripe app supports B2C and B2B modes. We are working on enabling Stripe for marketplace models, which offers easy merchant onboarding and management of the payouts from one application.


### Business benefits

- Diverse payment methods, wider reach: Offer a variety of convenient payment options to increase sales conversion rates and reach a broader audience.

- Accelerated time-to-market with a low-code integration. Easily integrate the Stripe app without having to allocate a lot of resources.

### Documentation

[Stripe](/docs/pbc/all/payment-service-provider/{{site.version}}/base-shop/third-party-integrations/stripe/stripe.html)

### Technical prerequisites

* [App Composition Platform](/docs/dg/dev/acp/app-composition-platform-installation.html)
* [Install and configure Stripe prerequisites](/docs/pbc/all/payment-service-provider/{{site.version}}/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html)


## Agent Assist in Merchant Portal <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The Agent Assist in Merchant Portal feature enables marketplace operators to impersonate merchant users. The merchant support team, logged in as agents, can act on behalf of merchants within the Merchant Portal.

![Agent assist in the Merchant Portal](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202404.0.md/agent-assist-in-merchant-portal.png)


### Business benefits

Excellence in merchant care: Provide your merchants with comprehensive support, guidance, and issue resolution.


### Documentation

[Merchant Portal Agent Assist feature overview](/docs/pbc/all/user-management/202404.0/marketplace/merchant-portal-agent-assist-feature-overview.html)


## Merchant B2B Contracts & Contract Requests <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

In a B2B business model, the partnership is usually based on contracts, or relations, between buyers and merchants. The Merchant B2B Contracts & Contract Requests feature introduces the initiation and management of relation requests, making it easier to connect both parties and to create buyer-merchant relations in B2B marketplaces and shops. These relations enable merchants and marketplace operators to specify buyer-specific products, prices, and order thresholds.


![Merchant B2B contact requests](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202404.0.md/merchant-b2b-contracts-and-requests.png)

### Business benefits

- Streamlined user journey: Enhance user satisfaction by simplifying the process for buyers to connect with merchants, creating a more seamless and user-friendly experience.
- Efficient operational management: Increase operational efficiency for merchants and marketplace operators by automating the initiation and management of merchant relation requests, which reduces the manual efforts required to establish these relations.


### Documentation

- [Marketplace Merchant B2B Contracts and Contract Requests features overview](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-b2b-contracts-and-contract-requests-feature-overview.html)
- [Merchant B2B Contracts and Contract Requests features overview](/docs/pbc/all/merchant-management/{{site.version}}/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html)


## Managed Security Operations Center <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The managed Security Operations Center (SOC) provides continuous monitoring, detection, and response to cybersecurity threats in your cloud environments. By leveraging advanced technologies, coupled with the expertise of skilled security professionals, our managed SOC offers comprehensive protection to safeguard your projects.

### Business benefits

- 24/7 security monitoring: Stay protected with round-the-clock vigilance against threats.
- Optimized for Spryker’s infrastructure: Tailored specifically for the Spryker ecosystem, our service seamlessly integrates with your existing infrastructure.
- Threat detection and analysis: Use cutting-edge technology and intelligence to promptly identify and assess cybersecurity risks. Our proactive approach ensures that potential threats are detected early, minimizing the risk to your business.
- Streamlined incident response: In the event of a security incident, our coordinated response mechanism allows for a swift reaction, mitigation, and remediation. This ensures that any impact is minimized and business continuity is maintained.
- Compliance and reporting: The service is aligned with industry regulations like SOC2 and ISO27001.

### Learn more

[Managed Security Operations Center (MSOC)](https://read.spryker.com/managed-security-operations-center-msoc)

### Technical prerequisites

Available for cloud environments.


## Merchant Portal UI/UX improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We introduced the following Merchant Portal improvements:
* Color adjustments
* Updated icons
* A reorganized sidebar.

The sidebar's state, whether expanded or collapsed, is now saved.

### Business benefits

- Better readability
- Better navigation

## Vertex improvement <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Store owners and marketplace operators can now effortlessly manage refunds and ensure accurate tax reporting through the updated Vertex app. Additionally, users can continue to use the app seamlessly even during periods of downtime.

### Business benefits

- Enhanced app reliability: uninterrupted service for users even during downtime.
- Tax report accuracy.

### Documentation

[Vertex](/docs/pbc/all/tax-management/{{site.version}}/base-shop/third-party-integrations/vertex/vertex.html)

### Technical prerequisites

[App Composition Platform](/docs/dg/dev/acp/app-composition-platform-installation.html)

## Spryker Code Upgrader: UX Improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>


Based on your input in the UX research, we restructured the layout of Pull Requests (PRs) created by Spryker Code Upgrader. Out of all supported platforms, you will get the best experience on GitHub. The information is now structured in the order of importance. Each PR is connected to the Release Catalog. If a release requires a manual integration, the catalog provides clear steps to integrate it. Also, PRs contain information on how much of a release is automatically integrated by the Upgrader, as well as potential conflicts or issues.

![scu-prs](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202404.0.md/scu-prs.png)

PR examples to compare:
Before: https://github.com/spryker-shop/b2c-demo-shop/pull/297
Now: https://github.com/spryker-shop/b2c-demo-shop/pull/441

### Business benefit

Slimmer layout of PRs enables engineers to review and merge upgrade PRs faster.


### Learn more

[Spryker Code Upgrader](/docs/ca/devscu/spryker-code-upgrader.html)


## Data Exchange API <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Traditionally, developing APIs required technical expertise and time-consuming coding processes. We removed complexities from the infrastructure of our innovative dynamic Data Exchange API, making creating APIs effortless. With this tool, you can quickly build, customize, and manage APIs tailored to your specific business requirements, all through an intuitive user interface.

In this release, we added the support of CRUD for combined entities allowing to write, read, and update not a single entity, but also other entities connected to it. For example, now you can import a product and all its variants with a single API call. This improves performance and simplifies the implementation of the data import process.

### Business benefits

* Faster data imports
* Friendlier API interface to import data into Spryker


### Documentation

* [Data Exchange API](/docs/scos/dev/feature-integration-guides/202307.0/glue-api/dynamic-data-api/data-exchange-api-integration.html)
* [Data Exchange](/docs/pbc/all/data-exchange/{{site.version}}/data-exchange.html#data-importers-and-data-exporters)
* [Data Exchange FAQ](/docs/pbc/all/data-exchange/{{site.version}}/data-exchange-faq.html)

### Technical prerequisites

* [Data Exchange API integration](/docs/pbc/all/data-exchange/{{site.version}}/install-and-upgrade/install-the-data-exchange-api.html#prerequisites)
* [Data Exchange API + Install the Inventory Management feature](/docs/scos/dev/feature-integration-guides/202307.0/glue-api/data-exchange-api/install-the-data-exchange-api-inventory-management-feature.html)


## Symfony 6.4 LTS support <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker now supports Symfony 6.4, a long-term support (LTS) version. LTS versions of frameworks provide sustained reliability and security for your applications. Symfony 6.4 provides various enhancements, such as a new Profiler feature, developer experience improvements, including better handling of server params and enhanced HTTP client functionality.

All Spryker products now require Symfony 6.4 or 5.4. We highly recommend migrating to the latest LTS version of Symfony.

As a follow-up of migration to Symfony 6.4, we migrated all critical security modules to the latest version:
- symfony/security-guard
- symfony/security-http
- symfony/security-core

### Business benefit

The latest Symfony framework LTS version provides enhanced stability, security, and performance.

### Documentation

* [Upgrade to Symfony 6](https://docs.spryker.com/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-6.html)
* [Symfony blog posts related to new features](https://symfony.com/blog/category/living-on-the-edge/7.0-6.4)

### Technical prerequisites

Upgrade spryker/symfony modules to the latest version by following [Upgrade to Symfony 6](https://docs.spryker.com/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-6.html) or running [Spryker Code Upgrader](https://docs.spryker.com/docs/ca/devscu/spryker-code-upgrader.html).


## Improved Search in Spryker Docs <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We implemented a new Algolia-based search on the Spryker Docs portal. Key highlights of the new search:

- High performance: Most search queries take less than 20ms.
- Crawler-based indexing: Regular indexing ensures that no irrelevant content or 404 pages appear in the search results.
- Enhanced relevance: The refined algorithm ensures that only relevant search results are returned.
- Search as you type: Instant suggestions for relevant search results.
- Typo tolerance: Algolia suggests results for inputs even with typos.
- Additional features such as search history and favorites.


### Business benefit

Find the needed content faster.
