---
title: Release notes 202512.0
description: Release notes for Spryker Cloud Commerce OS version 202512.0
last_updated: December 18, 2025
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## Expanded B2B commerce capabilities

Lorem Ipsum

## Spryker AI: Built for real enterprise commerce

Lorem Ipsum

## Open architecture for the upcoming innovation

### Reduced boilerplate via Symfony Dependency Injection support <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker uses Dependency Inversion design pattern heavily to remove tight code coupling, improve unit testability, offer a clear architecture and flexibility to extend and customize. We introduced improvements toward enabling autowiring and reducing the need for repetitive Factory/DependencyProvider wiring. This streamlines development while staying compatible with Symfony DI conventions and tooling.

**Key capabilities**

- Less manual dependency wiring in project code.
- Better compatibility with Symfony bundles and Symfony DI tooling (for example, container introspection). Symfony tools (`debug:container`) help visualize all services.
- Self-explanatory and declarative configuration.
- Highest performance with compiled and cached DI.

**Business benefits**

- **Code Autowiring**. Reduce boilerplate code you need to write and maintain by using Symfony DI. It automatically connects the parts of your code so developers don't have to.
- **Faster feature delivery** with less repetitive scaffolding.
- **Easier onboarding** for developers familiar with Symfony conventions.

**Documentation**

- [Symfony  Dependency Injection](/docs/dg/dev/architecture/dependency-injection.html)
- [Symfony Bundles in Spryker](/docs/dg/dev/architecture/symfony-bundles.html)

### API Platform <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span> <span class="inline-img">![early access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span>

The **API Platform** integration enables you to define API resources declaratively and automatically generate fully functional, standards-compliant APIs with minimal manual effort. It reduces boilerplate, enforces consistency, and accelerates API development while maintaining production readiness.

![API Platform](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202512/api-platform-2.6-api.png)

**Key capabilities**
- **Declarative API definition**: Define API resources using simple YAML schemas instead of writing repetitive controller and transfer logic.
- **Automatic endpoint generation**: Generate production-ready endpoints with built-in validation, pagination, and serialization.
- **OpenAPI documentation**: Interactive OpenAPI documentation is generated automatically and stays in sync with your API definitions.
- **Consistent data contracts**: Enforce uniform data contracts and operation-specific validation rules across all APIs.
- **Clear separation of concerns**: Separate read and write logic using providers and processors for better maintainability and extensibility.

**Business benefits**
- **Faster API development**: Reduce boilerplate and repetitive scaffolding, enabling faster feature delivery.
- **Easier onboarding**: Simplify API development for new teams and partners with clear documentation and structured guidance.

**Documentation**

- [API Platform](/docs/dg/dev/architecture/api-platform)

### API tooling and integration documentation improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

To make API development and partner onboarding easier:
- Enhanced API documentation to be more structured and usable, with clearer terminology and guidance for integrations (including better support for exploring APIs and understanding data models).
- Added a publicly available **Postman API collection** package, organized around practical "happy path" use cases and environments.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202512/interactive_API_docs.mp4" type="video/mp4">
  </video>
</figure>

**Key capabilities**

- Ready-to-run Postman collections for common API flows.
- Improved documentation structure and integration guidance for solution partners.

**Business benefits**

- Faster API adoption and easier demos for headless use cases.
- Reduced integration effort and fewer misunderstandings for partners and new teams.

**Documentation**

- [Integraitons Documentation Portal](/docs/integrations/integrate-with-spryker.html)
- [Integraitons Catalog](/docs/integrations/third-party-integrations.html)
- [Interactive API Playground](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-marketplace-b2b-demo-shop-reference.html)
- [Postman Collections](https://github.com/spryker-community/glue-postman-collections)

### Publish & Synchronize stability and scalability improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Multiple enhancements improve the robustness and transparency of Publish & Synchronize processing, especially in high-volume environments.

**Key capabilities**

- Better resource monitoring and utilization for workers.
- Reduced noise from excessive INFO logs; more meaningful statistics and log output.
- Improved handling for slow queues (configurable waiting/avoid blocking other processing).
- Fixes for known stability issues reported across multiple customers.
- Improved error logging in queue:worker:start output including queue name, failed message content, and exception chain.
- Cleaner processing output (suppresses "all zeros" lines; logs only when metrics indicate work).
- Better ability to adjust processing batch size per queue to isolate problematic messages.

**Business benefits**

- More stable P&S execution under load.
- Easier scaling and debugging for complex event-driven catalog and offer updates.
- Reduced operational overhead for teams running large data volumes.
- Faster incident diagnosis for queue-related failures.
- Reduced log noise while keeping meaningful operational insights.

**Documentation & Module Releases**

If you already have older versions, we recommend to update

- [Implement Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-publish-and-synchronization)
- [Newest Publish & Synchronize Modules](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines#use-the-newest-modules)
- [Split heavy entities from publish and event queues](https://api.release.spryker.com/release-group/6027)
- [Batch processing of Propel entities](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities)


### Infrastructure and runtime upgrades <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker updates its database support strategy by aligning MySQL and MariaDB versions with currently supported long-term support (LTS) releases. This change addresses the end of support for MySQL 5.7 and mitigates compatibility issues observed in production environments.

**Key capabilities**

- Alignment of supported **MySQL versions with modern LTS releases** (MySQL 8.4).
- Continued support for **MariaDB 11.8** users while ensuring up-to-date and secure LTS versions. Incremental rollouts are planned for early 2026.
- **Redis compression enabled by default** in demoshops to reduce memory footprint and improve cache efficiency.
- **PHP 8.4 readiness** with updates across modules and supporting tooling.
- **RabbitMQ 4.1 support** to keep deployments current with supported versions and benefit from performance improvements.

**Business benefits**

- Reduced memory usage and increased throughput (Valkey/Redis).
- Reduced security and operational risks by avoiding end-of-life database versions.
- Improved development–production parity, minimizing runtime incompatibilities.
- Future-proof database, PHP, RabbitMQ support that aligns with vendor support timelines and enterprise requirements.

**Documentation**
- [Docker SDK service configuration](/docs/dg/dev/integrate-and-configure/configure-services.html)
- [System Requriements](/docs/dg/dev/system-requirements/latest/system-requirements.html)


### Web Profiler enhancements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We improved the Web Profiler experience to better support performance investigations and development-time troubleshooting:

- Fixed an incorrect template path used by `WebProfilerExternalHttpDataCollectorPlugin`.
- Added new profiling views for **Yves Ajax** and **Gateway** requests to make request/response flows more observable.
- Introduced **Web Profiler improvements: External HTTP Logger**, including:
  - A data collector interface to capture and inspect third-party HTTP calls.
  - An in-memory logger to record external requests.
  - Public documentation describing configuration and usage.

**Key capabilities**

- Better visibility into third-party HTTP calls to detect bottlenecks, N+1 patterns, and slow dependencies.
- Broader profiling coverage across common Yves interaction patterns.

**Business benefits**

- Faster root-cause analysis during development and QA.
- Reduced time spent debugging external integrations and network-related performance regressions.

**Module Releases**

- [Added Yves ajax and ZedRequest profiles to WebProfiler](https://api.release.spryker.com/release-group/6222)
- [Fix wrong template name in WebProfilerExternalHttpDataCollectorPlugin](https://api.release.spryker.com/release-group/6210)
- [External Custom Requests visible in Web Profiler](https://api.release.spryker.com/release-group/6162)

### Performance improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Rendering of product items and cart pages and URL resolution databse queries have been optimized..

**Key capabilities**

- Reduced repeated per-item loading patterns that previously caused many separate search calls (for cart, catalog listings, and PDP carousels).
- Improved widget/template behavior to avoid N× Elasticsearch request patterns in common flows.
- Targeted cart performance improvements for large baskets.
- Eliminated unnecessary case-insensitive comparisons using `UPPER()` where the database collation is already case-insensitive.
- Improved performance for URL lookups in large datasets (reduces long-running queries and CPU pressure).

**Business benefits**

- Faster page loads on high-traffic pages (cart, catalog, PDP).
- Lower search infrastructure cost by cutting unnecessary requests.
- More predictable performance for customers with large carts and catalogs.
- Lower database CPU utilization.
- Faster request handling for URL-heavy flows (storefront and merchant portal routing scenarios).

**Documentation**
- [Cart performance configuration](/docs/pbc/all/cart-and-checkout/latest/cart-page-performance-configuration.html#cart-page-performance-configuration.html)

### Reliability improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

**Key capabilities**

- Glue API authentication was improved to avoid overloading JWT token payloads with large, mutable session-relevant data (such as fine-grained permissions).
-

**Business benefits**

- Glue API: Reduced risk of header-size-related failures in integrations with extensive permissions usage.

### Faster local development and CI builds through Composer optimization <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We implemented a Composer plugin for Demo Shops that splits broad PSR-4 namespaces into **layer+module specific** namespaces during autoload generation. This reduces autoload scanning overhead and improves rendering/build performance.

**Key capabilities**

- Converts general `Spryker\\` namespace mappings into granular mappings such as `Spryker\\Zed\\<Module>\\`, `Spryker\\Yves\\<Module>\\`, etc.
- Works in both development and production modes and applies consistently across Demo Shops.

**Business benefits**

- Improved page rendering speed in Yves and Backoffice during development.
- Faster container/image build times in CI and cloud environments, improving delivery throughput.

**Module Releases**
- [Composer Autoload Plugin](https://github.com/spryker/composer-autoload-plugin/releases/tag/0.1.0)
