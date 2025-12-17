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

## Spryker AI Built for Real Enterprise Commerce

### AI Foundation <span class="inline-img">![early-access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span>

AI Foundation is a provider-agnostic integration layer for building AI powered commerce capabilities in a consistent, maintainable way.

**Key capabilities**
- New AiFoundation module compatible with Spryker architecture and existing AI related Eco packages.
- Multi provider support through a single interface (for example OpenAI, Azure OpenAI, AWS Bedrock, Google Gemini, Anthropic, local providers).
- Prompt based client method that supports file attachments for richer use cases.

**Business benefits**
- Faster delivery of AI enabled commerce features through a reusable platform layer.
- Provider freedom: adopt or switch AI providers without rewriting feature logic, and choose the best provider and model per use case without rewriting code.
- Best fit provider per use case: use different providers and models for different needs.
- Lower maintenance effort by centralizing AI integration patterns and configuration.

**Documentation**
- [AI Foundation](/docs/pbc/all/ai-foundation/latest/ai-foundation)
- [Use the AiFoundation module](/docs/pbc/all/ai-foundation/ai-foundation)

### Spryker AI Commerce: Backoffice Smart Product Management <span class="inline-img">![early-access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span> <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Backoffice Smart Product Management now uses AI Foundation as its AI integration layer, replacing the previous direct OpenAI coupling. This gives customers provider and model choice while keeping existing Smart Product Management AI capabilities working.

**Key capabilities**
- Replace direct OpenAI integration in with AI Foundation as the unified AI layer.
- Enable provider and model selection based on customer needs (for example different providers for cost, latency, data residency, or model capabilities).

**Business benefits**
- Protects existing customer functionality while enabling a standardized path for future AI enhancements.
- Reduces future integration effort and maintenance overhead for AI driven product management capabilities.

**Documentation**
- [Smart Product Management](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/product-management-powered-by-openai/product-management-powered-by-openai)
- [Install Smart Product Management](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/product-management-powered-by-openai/install-product-management-powered-by-openai)

### Spryker AI Dev SDK <span class="inline-img">![early-access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span>

The AI Dev SDK improves local AI assisted development with an MCP server, Spryker aware context tools, and prompt library integration, so developers and AI assistants can work with accurate project information and reuse the same prompts across teams.

### Key capabilities

- Run a local MCP server for your Spryker project and extend it with custom tools and prompts.
- Give AI assistants access to Spryker contracts and data structures to reduce guesswork and implementation errors.
- Support OMS flow exploration by showing an order’s current state and valid transitions, or listing transitions from any given state.
- Reuse and generate prompts from the shared Prompt Library via a typed PHP API.
- Keep console output integration friendly with quiet execution.

### Business benefits

- Faster onboarding and iteration with a repeatable local MCP setup.
- More accurate AI assisted implementations by grounding assistants in real Spryker contracts, transfer structures, and OMS workflows.
- Reduced prompt drift and fewer prompt related defects through centralized, reusable prompts.
- Lower development friction for automation and tool integrations due to clean stdio output.

### Business benefits

- Faster onboarding and iteration with a repeatable local MCP setup.
- More accurate AI assisted implementations by grounding assistants in real Spryker contracts, transfer structures, and OMS workflows.
- Reduced prompt drift and fewer prompt related defects through centralized, reusable prompts.
- Lower development friction for automation and tool integrations due to clean stdio output.

**Documentation**
- [AI Dev Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview)
- [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server)

## Open Architecture for the upcoming Innovation

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

### API Platform <span class="inline-img">![early access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span> <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

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
If you already have older versions, we recommend to update the referenced releases.

- [Implement Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html)
- [Metrics and resource-aware worker configuration](/docs/dg/dev/backend-development/data-manipulation/event/configure-event-queues.html#metrics-and-resource-aware-worker-configuration)
- [Newest Publish & Synchronize Modules](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#use-the-newest-modules)
- [Split heavy entities from publish and event queues](https://api.release.spryker.com/release-group/6027)
- [Batch processing of Propel entities](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities.html)

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
- Glue API
  - Authentication was improved to avoid overloading JWT token payloads with large, mutable session-relevant data (such as fine-grained permissions).
  - Supports up-to-date permission/state resolution without relying on token re-issuance.
- Search: We improved error handling in full-text search to ensure unexpected failures are logged and users receive a consistent fallback experience.
- OMS: Order Management System processing is hardened against race conditions where lock behavior can be unsafe in transactional or fast-response environments.

**Business benefits**
- Glue API: Reduced risk of header-size-related failures in integrations with extensive permissions usage.
- Search: Faster production troubleshooting and fewer silent failures.
- OMS:
  - Fewer hard-to-reproduce concurrency issues in payment and order update flows.
  - Increased consistency of order state transitions under parallel event processing.

**Module Releases**
- [Glue API: Authentication](https://api.release.spryker.com/release-group/6095)
- [Search: Improved error handling](https://api.release.spryker.com/release-group/6147)
- [OMS: Improved concurrency handling](https://api.release.spryker.com/release-group/5963)

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

### OpenTelemetry Instrumentation Update <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This update refines OpenTelemetry instrumentation to improve trace accuracy and compatibility across Storefront, Backend API, and GLUE applications. It addresses naming inconsistencies and resolves limitations in locale handling for monitoring plugins.

### Key capabilities
- Corrected root span naming for Storefront and Backend API to ensure consistent and meaningful traces.
- Fixed compatibility of `MonitoringRequestTransactionEventDispatcherPlugin` with GLUE applications by improving locale resolution logic.
- Improved robustness of monitoring setup to better support multiple application contexts without relying on hard-coded application name checks.

### Business benefits
- More accurate and consistent distributed tracing across all application types.
- Improved observability for GLUE-based APIs.

**Documentation**
- [OpenTelemetry Instrumentation](/docs/ca/dev/monitoring/spryker-monitoring-integration/opentelemetry-instrumentation.html)

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

### Faster local development and CI builds through Composer optimization <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

We implemented a Composer plugin for Demo Shops that splits broad PSR-4 namespaces into **layer and module specific** namespaces during autoload generation. This reduces autoload scanning overhead and improves rendering/build performance.

**Key capabilities**
- Converts general `Spryker\\` namespace mappings into granular mappings such as `Spryker\\Zed\\<Module>\\`, `Spryker\\Yves\\<Module>\\`, etc.
- Works in both development and production modes and applies consistently across Demo Shops.

**Business benefits**
- Improved page rendering speed in Yves and Backoffice during development.
- Faster container/image build times in CI and cloud environments, improving delivery throughput.

**Module Releases**
- [Composer Autoload Plugin](https://github.com/spryker/composer-autoload-plugin/releases/tag/0.1.0)

### Improved developer productivity and efficiency <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

**Key capabilities**
- We adjusted coding standards to remove the need for doc-blocks that duplicate already-declared type information (methods/properties), reducing noise and maintenance overhead.
- A new console helper enables running a CLI command in a loop for longer periods—useful for high-load projects and operational workflows.

**Business benefits**
- Reduced developer time spent on non-value-adding code formatting.
- Reduced need for custom scripts to rerun console commands safely.

**Module Releases**
- [Adjust sniffer rules for Spryker modules to exclude docblocks from the check](https://api.release.spryker.com/release-group/6097)
- [Multi process run console](/docs/dg/dev/backend-development/cronjobs/multi-process-run-console.html)
