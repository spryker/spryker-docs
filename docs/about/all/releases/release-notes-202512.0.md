---
title: Release notes 202512.0
description: Release notes for Spryker Cloud Commerce OS version 202512.0
last_updated: Jan 9, 2026
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## Expanded B2B commerce capabilities

### Self-Service Portal models for asset-based catalogs <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Self-Service Portal (SSP) models help operators manage complex equipment structures and help customers find compatible spare parts and service products faster in asset-based catalogs.

![Self-Service Assets](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202512.0.md/SSP-assets-page.png)

**What are SSP models?**
 SSP models let you group multiple assets into a single product family (for example, a machine type or series). Assets in the SSP are now directly connected to the product catalog, including compatible spare parts and service offerings, making the Self-Service Portal fully transactional.
For each model, a curated list of compatible spare parts and services can be maintained. When a customer browses the catalog or opens a product detail page, results are automatically filtered to show only items compatible with the selected model or asset, enabling accurate identification and immediate purchase.

**Key capabilities:**
- Group assets that belong to the same machinery type or generation.
- Maintain compatibility at the model level instead of the individual asset level.
- Assign spare part lists to models so buyers see only relevant products.
- Filter the storefront catalog by model, asset, serial number, or model code.
- Run compatibility checks from the product detail page.
- Support transactional self-service so customers purchase the correct items faster.

**Business benefits:**
- Improve spare part identification accuracy in self-service journeys.
- Reduce maintenance effort for asset-to-product mapping.
- Speed up after-sales purchases with asset-specific filtering.
- Scale after-sales revenue with automation and self-service.

Models is available in the Self-Service Portal Back Office and Storefront.

**Documentation:**
- [Self-Service Portal Models](/docs/pbc/all/self-service-portal/latest/ssp-model-management-feature-overview)
- [Self-Service Portal Asset Based Catalog](/docs/pbc/all/self-service-portal/latest/ssp-asset-based-catalog-feature-overview)
- [Self-Service Portal](/docs/pbc/all/self-service-portal/latest/self-service-portal)

### Merchant Portal file-based product import is now generally available <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span> <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

File-based product import in Merchant Portal moves from Early Access to General Availability, with reliability and UX improvements based on customer feedback.

![merchant-portal-import](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202507.0.md/merchant-portal-import.png)

**Key capabilities**
- Provide clear post-import results (success and errors) in the UI or as a downloadable CSV.
- Strengthen validations and safeguards to reduce failed imports and incorrect updates.
- Improve import consistency for production usage, including better messaging and translations where applicable.

**Business benefits**
- Faster merchant onboarding and ongoing catalog maintenance at scale.
- Lower support effort thanks to clearer feedback and import logs.
- Higher confidence running bulk imports in production environments.

**Documentation:**
- [Merchant Portal Import Products](/docs/pbc/all/product-information-management/latest/marketplace/manage-in-the-merchant-portal/import-products-ui)
- [Merchant Portal Import Product Offers](/docs/pbc/all/offer-management/latest/marketplace/import-offers-ui)
- [Install Merchant Portal Product Data Import](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-product-data-import-feature)
- [Install Product Offer Data Import](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-product-offer-data-import-feature)

### Merchant Self-Registration <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Merchant onboarding is simplified with a storefront entry point while keeping marketplace quality and compliance under control through Back Office review and approval.

![merchant-self-registration](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202512.0.md/Merchant-Self-Registration.png)

**Key capabilities:**
- Added a storefront-led merchant self-registration flow, allowing prospective merchants to submit an application which can be reviewed and approved in Back Office before merchant entities and users are created.

**Business benefits:**
- Reduced manual onboarding effort and improved consistency of merchant intake.
- Faster and more controlled merchant onboarding for marketplace operators.

**Documentation:**
- [Merchant Self-Registration](/docs/pbc/all/merchant-management/latest/marketplace/merchant-self-registration-feature-overview)
- [Install Merchant Self-Registration](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-self-registration-feature)

### Agent assist order traceability <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span> <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Order traceability for Agent Assist flows is improved so operations and support teams can quickly see who submitted an order on behalf of a customer.

**Key capabilities:**
- Back Office now records and displays the submitting agent email for orders placed via Agent Assist, improving traceability and follow-up efficiency.

**Business benefits:**
- Faster issue resolution and clearer ownership for agent-created orders.
- Improved auditability for Agent Assist flows.

**Documentation:**
- [Agent Assist](/docs/pbc/all/user-management/latest/base-shop/agent-assist-feature-overview#setting-up-an-agent-user)
- [Install Agent Assist](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature#install-feature-core)

### Merchant Portal dashboard improvements <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span> <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Merchant day to day catalog work is simplified in Merchant Portal by adding a clearer entry point to product management directly from the dashboard.

![merchant-portal-dashboard](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202512.0.md/merchant-portal-dashboard.png)

**Key capabilities**
- Added a Products widget to the Merchant Portal dashboard to improve discoverability of product management.

**Business benefits**
- Faster access to core catalog workflows for merchants.
- Less navigation effort for merchants managing large assortments.

### Storefront merchant profile improvements <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span> <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Storefront discovery is improved by making it easier for buyers to navigate from a merchant profile to that merchant's products with the right catalog filters already applied.

**Key capabilities**
- Added a "Shop Merchant Products" button on the merchant profile page that opens the product catalog with an active merchant filter.

**Business benefits**
- Faster product discovery for buyers shopping by merchant.
- Smoother path from merchant pages to relevant catalog results.

### Clearer UI in Back Office and Storefront <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Core UI patterns are made more consistent to improve scanability, reduce cognitive load, and provide clearer next steps in common workflows.

**Key capabilities**
- Introduced a global empty state component for tables with two variants:
- Implemented a semantic status pill color system (success, warning, error, neutral) for tables and internal pages, with one-line enforcement for better scanability.
- Replaced blocking Storefront notification banners with floating toast notifications (stacked, auto-dismiss, responsive positioning).

**Business benefits**
- Faster scanning and fewer mistakes when working with large datasets.
- Clearer guidance when tables are empty, improving task completion.
- Less disruptive Storefront messaging that keeps customers in context.

## Spryker AI: Built for Real Enterprise Commerce

### AI Foundation <span class="inline-img">![early-access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span>

AI Foundation is a provider-agnostic integration layer for building AI powered commerce capabilities in a consistent, maintainable way.

**Key capabilities:**
- New AiFoundation module compatible with Spryker architecture and existing AI related Eco packages.
- Multi provider support through a single interface (for example OpenAI, Azure OpenAI, AWS Bedrock, Google Gemini, Anthropic, local providers).
- Prompt based client method that supports file attachments for richer use cases.

**Business benefits:**
- Faster delivery of AI enabled commerce features through a reusable platform layer.
- Provider freedom: adopt or switch AI providers without rewriting feature logic, and choose the best provider and model per use case without rewriting code.
- Best fit provider per use case: use different providers and models for different needs.
- Lower maintenance effort by centralizing AI integration patterns and configuration.

**Documentation:**
- [AI Foundation](/docs/pbc/all/ai-foundation/latest/ai-foundation.html)
- [Use the AiFoundation module](/docs/pbc/all/ai-foundation/latest/ai-foundation.html)

### Spryker AI Commerce: Back Office Smart Product Management <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span> <span class="inline-img">![early-access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span> <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Back Office Smart Product Management now uses AI Foundation as its AI integration layer, replacing the previous direct OpenAI coupling. This gives customers provider and model choice while keeping existing Smart Product Management AI capabilities working.

<figure class="video_container">
    <video width="100%" height="auto" controls aria-label="Smart PIM Product Translations">
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/releases/release-notes-202512.0.md/smart-pim-translations.m4v" type="video/mp4">
  </video>
</figure>

**Key capabilities:**
- Replace direct OpenAI integration in with AI Foundation as the unified AI layer.
- Enable provider and model selection based on customer needs (for example different providers for cost, latency, data residency, or model capabilities).

**Business benefits:**
- Protects existing customer functionality while enabling a standardized path for future AI enhancements.
- Reduces future integration effort and maintenance overhead for AI driven product management capabilities.

**Documentation:**
- [Smart Product Management](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/smart-product-management/smart-product-management)
- [Install Smart Product Management](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/smart-product-management/install-smart-product-management)

### Spryker AI Dev SDK <span class="inline-img">![early-access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span>

The AI Dev SDK improves local AI assisted development with an MCP server, Spryker aware context tools, and prompt library integration, so developers and AI assistants can work with accurate project information and reuse the same prompts across teams.

### Key capabilities

- Run a local MCP server for your Spryker project and extend it with custom tools and prompts.
- Give AI assistants access to Spryker contracts and data structures to reduce guesswork and implementation errors.
- Support OMS flow exploration by showing an order's current state and valid transitions, or listing transitions from any given state.
- Reuse and generate prompts from the shared Prompt Library via a typed PHP API.
- Keep console output integration friendly with quiet execution.

**Documentation:**
- [AI Dev Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html)
- [Configure the AiDev MCP server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server.html)

## Open Architecture for the upcoming Innovation

### Reduced boilerplate via Symfony Dependency Injection support <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker uses the Dependency Inversion Principle to reduce tight coupling, improve unit testability, and provide a clear, extensible architecture. This approach enables autowiring and reduces the need for repetitive `Factory` and `DependencyProvider` wiring. This approach streamlines development and remains compatible with Symfony Dependency Injection conventions and tooling.

<figure class="video_container">
    <video width="100%" height="auto" controls aria-label="Symfony Dependency Injection and Architecture Overview">
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202512/symfony_di.mp4" type="video/mp4">
  </video>
</figure>

**Key capabilities:**
- Reduced manual dependency wiring in your project code.
- Improved compatibility with Symfony bundles and Symfony Dependency Injection tooling, such as container introspection. Tools like `debug:container` help you visualize all services.
- Self-explanatory, declarative configuration.
- High performance through compiled and cached dependency injection.

**Business benefits:**
- **Code autowiring**: Reduce the boilerplate code you write and maintain by using Symfony Dependency Injection to automatically connect application components.
- **Faster feature delivery** by reducing repetitive scaffolding.
- **Easier onboarding** for developers who are already familiar with Symfony conventions.

**Documentation:**

- [Symfony Dependency Injection](/docs/dg/dev/architecture/dependency-injection.html)
- [Symfony Bundles in Spryker](/docs/dg/dev/architecture/symfony-bundles.html)

### API Platform <span class="inline-img">![early access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span> <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

The **API Platform** integration allows you to define API resources declaratively and automatically generate standards-compliant APIs with minimal manual effort. It reduces boilerplate, enforces consistency, and accelerates API development.

![API Platform](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202512/api-platform-2.6-api.png)

**Key capabilities:**
- **Declarative API definition**: Define API resources using simple YAML schemas instead of writing repetitive controller and transfer logic.
- **Automatic endpoint generation**: Generate endpoints with built-in validation, pagination, and serialization that are ready for production use.
- **OpenAPI documentation**: Interactive OpenAPI documentation is generated automatically and stays in sync with your API definitions.
- **Consistent data contracts**: Enforce uniform data contracts and operation-specific validation rules across all APIs.
- **Clear separation of concerns**: Separate read and write logic using providers and processors for better maintainability and extensibility.

**Business benefits:**
- **Faster API development**: Reduce boilerplate and repetitive scaffolding, enabling faster feature delivery.
- **Easier onboarding**: Simplify API development for new teams and partners by providing clear documentation and structured guidance.

**Documentation:**
- [API Platform](/docs/dg/dev/architecture/api-platform.html)

### API tooling and integration documentation improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

To make API development and partner onboarding easier, the following improvements are introduced:
- Enhanced the API documentation to be more structured and usable, with clearer terminology and guidance for integrations, including better support for exploring APIs and understanding data models.
- Enhanced documentation of the **Spryker data model**, including products, attributes, prices, and orders.
- Added a publicly available **Postman API collection** package, organized around practical "happy path" use cases and environments.

<figure class="video_container">
    <video width="100%" height="auto" controls aria-label="Interactive API documentation walkthrough">
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202512/interactive_API_docs.mp4" type="video/mp4">
  </video>
</figure>

**Key capabilities:**
- Ready-to-run Postman collections for common API flows.
- Improved documentation structure and integration guidance for solution partners.

**Business benefits:**
- Faster API adoption and easier onboarding for developers and partners.
- Reduced integration effort and fewer misunderstandings for partners and new teams.

**Documentation:**
- [Integrations Documentation Portal](/docs/integrations/integrate-with-spryker.html)
- [Integrations Catalog](/docs/integrations/third-party-integrations.html)
- [Interactive API Playground](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-marketplace-b2b-demo-shop-reference.html).
- [API reference with data model descriptions](/docs/integrations/spryker-glue-api/backend-api/api-references/backend-api-marketplace-b2b-demo-shop-reference.html). Expand each resposne to learn more about each field.
- [Postman Collections](https://github.com/spryker-community/glue-postman-collections)

### Publish & Synchronize stability and scalability improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Multiple enhancements improve the robustness and transparency of Publish & Synchronize processing, especially when you operate in high-volume environments.

**Key capabilities:**
- Better resource monitoring and utilization for workers.
- Reduced noise from excessive INFO logs and more meaningful statistics and log output.
- Improved handling of slow queues through configurable waiting to avoid blocking other processing.
- Fixes for known stability issues reported across multiple customers.
- Improved error logging in the `queue:worker:start` output, including the queue name, failed message content, and exception chain.
- Cleaner processing output that suppresses "all zeros" lines and logs data only when metrics indicate work.
- Better ability to adjust processing batch size per queue to isolate problematic messages.

**Business benefits:**
- More stable P&S execution under load.
- Easier scaling and debugging of complex event-driven catalog and offer updates.
- Reduced operational overhead for teams running large data volumes.
- Faster incident diagnosis for queue-related failures.
- Reduced log noise while keeping meaningful operational insights.

**Documentation and module releases:**

If you are using older versions, we recommend that you update to the referenced releases.

- [Implement Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html)
- [Metrics and resource-aware worker configuration](/docs/dg/dev/backend-development/data-manipulation/event/configure-event-queues.html#metrics-and-resource-aware-worker-configuration)
- [Newest Publish & Synchronize modules](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#use-the-newest-modules)
- [Split heavy entities from publish and event queues](https://api.release.spryker.com/release-group/6027)
- [Batch processing of Propel entities](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities.html)

### Performance improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Rendering of product items, cart pages, and URL resolution database queries has been optimized.

**Key capabilities:**
- Reduced repeated per-item loading patterns that previously caused multiple separate search calls for the cart, catalog listings, and PDP carousels.
- Improved widget and template behavior to avoid N-times Elasticsearch request patterns in common flows.
- Targeted cart performance improvements for large baskets.
- Eliminated unnecessary case-insensitive comparisons using `UPPER()` where the database collation is already case-insensitive.
- Improved performance for URL lookups in large datasets (reduces long-running queries and CPU pressure).

**Business benefits:**
- Faster page loads on high-traffic pages such as the cart, catalog, and PDP.
- Lower search infrastructure cost by cutting unnecessary requests.
- More predictable performance for customers with large carts and catalogs.
- Lower database CPU utilization.
- Faster request handling for URL-heavy flows (storefront and merchant portal routing scenarios).

**Documentation:**
- [Product review performance](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#product-review-performance)
- [Cart performance configuration](/docs/pbc/all/cart-and-checkout/latest/cart-page-performance-configuration.html#cart-page-performance-configuration)

**Module Important technical releases:**
- [Cart page performance optimization](https://api.release.spryker.com/release-group/6107)
- [UPPER() function optimization for URL lookups](https://api.release.spryker.com/release-group/6124)

### Reliability improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

**Key capabilities:**
- **Glue API**
  - Authentication is improved to avoid overloading JWT token payloads with large, mutable, session-relevant data, such as fine-grained permissions.
  - The API supports up-to-date permission and state resolution without relying on token reissuance.
- **Search**: Error handling in full-text search is improved to ensure that unexpected failures are logged and that users receive a consistent fallback experience.
- **OMS**: Order Management System processing is hardened against race conditions in which lock behavior can be unsafe in transactional or fast-response environments.

**Business benefits:**
- **Glue API**: Reduced risk of header-size-related failures in integrations that use extensive permission sets.
- **Search**: Faster production troubleshooting and fewer silent failures.
- **OMS**:
  - Fewer hard-to-reproduce concurrency issues in payment and order update flows.
  - Increased consistency of order state transitions under parallel event processing.

**Module releases:**
- [Glue API: Authentication improvements](https://api.release.spryker.com/release-group/6095)
- [Search: Improved error handling](https://api.release.spryker.com/release-group/6147)
- [OMS: Improved concurrency handling](https://api.release.spryker.com/release-group/5963)

### Infrastructure and runtime upgrades <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker updates its database support strategy to align MySQL and MariaDB versions with currently supported long-term support (LTS) releases. This change addresses the end of support for MySQL 5.7 and mitigates compatibility issues in production environments.

The update also includes changes to other components, such as PHP, RabbitMQ, and Bootstrap.

**Key capabilities:**
- Aligns supported **MySQL versions with modern LTS releases**, including MySQL 8.4.
- Continues support for **MariaDB 11.8** while ensuring secure and up-to-date LTS versions. Incremental rollouts are planned for early 2026.
- Enables **Redis compression by default** in demoshops to reduce memory footprint and improve cache efficiency.
- Ensures **PHP 8.4 readiness** through updates across modules and supporting tooling.
- Adds **RabbitMQ 4.1 support** to keep deployments current and benefit from performance improvements.
- Adds **Bootstrap 5** by default in Back Office.

**Business benefits:**
- Reduces memory usage and increases throughput for Valkey and Redis.
- Reduces security and operational risks by avoiding end-of-life database versions.
- Improved development–production parity, minimizing runtime incompatibilities.
- Future-proofs database, PHP, and RabbitMQ support to align with vendor support timelines and enterprise requirements.

**Documentation:**
- [Docker SDK service configuration](/docs/dg/dev/integrate-and-configure/configure-services.html)
- [System Requirements](/docs/dg/dev/system-requirements/latest/system-requirements.html)
- [Upgrade Back Office to Bootstrap 5](/docs/pbc/all/back-office/latest/base-shop/install-and-upgrade/upgrade-the-back-office-to-bootstrap-5.html)

### OpenTelemetry Instrumentation Update <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This update improves OpenTelemetry instrumentation to increase trace accuracy and compatibility across Storefront, Backend API, and GLUE applications. You benefit from resolved naming inconsistencies and improved locale handling for monitoring plugins.

**Key capabilities:**
- Corrected root span naming for Storefront and Backend API to ensure consistent and meaningful traces.
- Fixed compatibility of `MonitoringRequestTransactionEventDispatcherPlugin` with GLUE applications by improving locale resolution logic.
- Improved robustness of monitoring setup to better support multiple application contexts without relying on hard-coded application name checks.

**Business benefits:**
- More accurate and consistent distributed tracing across all application types.
- Improved observability for GLUE-based APIs.

**Documentation:**
- [OpenTelemetry instrumentation](/docs/ca/dev/monitoring/spryker-monitoring-integration/opentelemetry-instrumentation.html)

### Web Profiler enhancements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

You can now use an improved Web Profiler experience to better support performance investigations and troubleshooting during development:
- Fixed an incorrect template path used by `WebProfilerExternalHttpDataCollectorPlugin`.
- Added new profiling views for **Yves Ajax** and **Gateway** requests so you can more easily observe request and response flows.
- Introduced **Web Profiler improvements: External HTTP Logger**, which includes:
  - A data collector interface to capture and inspect third-party HTTP calls.
  - An in-memory logger to record external requests.
  - Public documentation describing configuration and usage.

**Key capabilities:**
- Improved visibility into third-party HTTP calls to help you detect bottlenecks, N+1 patterns, and slow dependencies.
- Broader profiling coverage across common Yves interaction patterns that you use in storefront development.

**Business benefits:**
- Faster root-cause analysis during development and quality assurance.
- Reduced time spent debugging external integrations and network-related performance regressions during development and testing.

**Module releases:**
- [Added Yves ajax and ZedRequest profiles to WebProfiler](https://api.release.spryker.com/release-group/6222)
- [Fix wrong template name in WebProfilerExternalHttpDataCollectorPlugin](https://api.release.spryker.com/release-group/6210)
- [External Custom Requests visible in Web Profiler](https://api.release.spryker.com/release-group/6162)

**Documentation:**
- [Web Profiler Widget for Yves AJAX](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html)
- [Web Profiler for Backend Gateway](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-backend-gateway.html)
- [WebProfiler Widget monitoring of external HTTP calls](/docs/dg/dev/guidelines/performance-guidelines/external-http-requests.html)

### Faster local development and CI builds through Composer optimization <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

This release introduces a Composer plugin for Demo Shops that splits broad PSR-4 namespaces into **layer- and module-specific** namespaces during autoload generation. This approach reduces autoload scanning overhead and improves rendering and build performance.

**Key capabilities:**
- Converts general `Spryker\\` namespace mappings into granular mappings, such as `Spryker\\Zed\\<Module>\\` and `Spryker\\Yves\\<Module>\\`.
- Works in both development and production modes and applies consistently across Demo Shops.

**Business benefits:**
- Improved page rendering speed in Yves and back office during development.
- Faster container and image build times in CI and cloud environments, which improves delivery throughput.

**Module release:**
- [Composer Autoload Plugin](https://github.com/spryker/composer-autoload-plugin/releases/tag/0.1.0)

### Improved developer productivity and efficiency <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

**Key capabilities:**
- The coding standards remove the need for docblocks that duplicate already declared type information for methods and properties, which reduces noise and maintenance overhead.
- A new console helper lets you run a CLI command in a loop for extended periods, which is useful for high-load projects and operational workflows.
- You can override Webpack, JavaScript, and SCSS configurations for ZED at the project level.

**Business benefits:**
- You spend less developer time on non-value-adding code formatting tasks.
- You have less need for custom scripts to safely rerun console commands.

**Module releases:**
- [Adjust sniffer rules for Spryker modules to exclude docblocks from checks](https://api.release.spryker.com/release-group/6097)
- [Multi-process run console](/docs/dg/dev/backend-development/cronjobs/multi-process-run-console.html)
- [Overriding Webpack, JS, SCSS for ZED on the project level](/docs/dg/dev/frontend-development/latest/zed/overriding-webpack-js-scss-for-zed-on-the-project-level.html)
