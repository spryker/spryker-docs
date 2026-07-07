---
title: Release notes 202606.0
description: Release notes for Spryker Cloud Commerce OS version 202606.0
last_updated: July 7, 2026
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide).

## B2B Business-Ready Commerce Experiences

### Recurring Orders {% include badge.html type="early-access,feature" %}

Recurring Orders let buyers create cadence-based repeat purchases during checkout and execute them automatically on a defined schedule. The feature includes controls for confirmations and approvals, as well as review and recovery flows for basket changes, price changes, or ERP-related issues.

**Key capabilities:**
- Create recurring order schedules such as weekly, bi-weekly, or monthly
- Support buyer-controlled confirmations, skips, modifications
- Detect basket drift, price drift, and ERP errors with clear recovery flows

**Business benefits:**
- Reduces manual effort for repeat procurement
- Helps prevent missed or delayed replenishment orders
- Increases trust through controlled automation, governance, and auditability

**Documentation:**
- [Recurring Orders Feature Overview](/docs/pbc/all/order-experience-management/latest/base-shop/feature-overviews/recurring-orders-feature-overview.html)
- [Install Recurring Orders](/docs/pbc/all/order-experience-management/latest/base-shop/install-and-upgrade/install-features/install-the-recurring-orders-feature)

### Budget & Cost Centers {% include badge.html type="feature" %}

Budget & Cost Centers introduces native purchasing controls for departmental or project-based spending in B2B commerce. Companies can manage budgets and cost centers directly in Spryker to support compliant, auditable, and policy-driven purchasing workflows.

**Key capabilities:**
- Define and manage cost centers for purchasing activities
- Enforce budgets directly within procurement workflows
- Align spend controls with existing approval processes

**Business benefits:**
- Reduces overspending risk through built-in budget enforcement
- Improves financial transparency across teams and projects
- Streamlines procurement with consistent spend governance in one system

**Documentation:**
- [Purchasing Control Feature Overview](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/purchasing-control-feature-overview)
- [Install Purchasing Control](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature)

### New Spryker Design System Storefront

We extended the Spryker design system across key storefront pages, including product listing, product detail, and cart pages. This creates a more consistent and modern buyer experience while giving teams reusable components for faster delivery.

**Key capabilities:**
- Design system applied across the product details page
- New reusable components such as cart entries, pagination, and quantity selectors
- Storybook documentation for reference and reuse

**Business benefits:**
- Improves buyer trust with a more polished storefront experience
- Reduces future implementation and QA effort through reusable patterns
- Strengthens Spryker's out-of-the-box storefront for demos and evaluations

<figure class="video_container">
    <video width="100%" height="auto" controls>
      <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/spryker+b2b+design+system-no+voice.mp4" type="video/mp4">
  </video>
</figure>


### Search Statistics & Google Analytics {% include badge.html type="feature" %}

Search Statistics brings native search analytics to the Back Office for customers using ElasticSearch. Business users can review frequent searches and zero-result searches to better understand buyer behavior and optimize product discovery.

**Key capabilities:**
- View top frequent searches and top zero-result searches in the Back Office
- Filter analytics by time period and review detailed search data
- Export search statistics to Google Analytics for further analysis and sharing

**Business benefits:**
- Reduces the need for custom project-specific search analytics implementations
- Helps teams improve search relevance, synonyms, and catalog quality based on real data
- Identifies search gaps that can negatively affect discoverability and conversion

**Documentation:**
- [Search Statistics Feature Overview](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/search-statistics)
- [Install Search Statistics](/docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/analytics/google-analytics/install-search-statistics)

### Back Office usability improvements {% include badge.html type="improvement" %}

We improved several Back Office interactions to make administration tasks clearer and less error-prone. This covers block and slot assignment validation.

**Key capabilities:**
- Restores validation feedback when saving block and slot assignments
- Fixes missing menu highlight on the View Merchant page in the Back Office

**Business benefits:**
- Improves clarity during Back Office administration
- Helps business users navigate merchant management more easily

**Releases:**
- [No validation errors when saving block + slot assignment](https://api.release.spryker.com/release-group/6509)


### PunchOut support in the Back Office {% include badge.html type="improvement" %}

PunchOut support in the Back Office makes PunchOut integrations easier to configure and manage with a more low-code approach. Building on Spryker's native support for common PunchOut flows and cXML/OCI compatibility, this update adds a dedicated PunchOut section with relevant fields and configuration support. This helps solution teams deliver integrations with less custom development effort.

**Key capabilities:**
- Adds a dedicated PunchOut section in the Back Office
- Supports configuration of relevant PunchOut integration fields in a more low-code way
- Complements native cXML, OCI, and core PunchOut message handling capabilities

**Business benefits:**
- Reduces bespoke development effort for PunchOut integrations
- Makes implementations more repeatable and faster across projects
- Simplifies setup and maintenance for customers and implementation partners

**Documentation:**
- [PunchOut Gateway](/docs/pbc/all/punchout-gateway/punchout-gateway.html)

### PunchCommerce Punchout Connector {% include badge.html type="feature" %}

The PunchCommerce Punchout Connector extends Spryker's support for complex PunchOut scenarios through a partner integration. It is designed for use cases that require multiple eProcurement connectors and document handling beyond Spryker's native capabilities. This helps customers address more advanced procurement integration requirements.

**Key capabilities:**
- Connects Spryker with PunchCommerce for advanced PunchOut scenarios
- Supports use cases with multiple eProcurement connectors
- Adds support for document-handling requirements not covered by native capabilities

**Business benefits:**
- Broadens PunchOut coverage for more complex B2B procurement scenarios
- Reduces the need for bespoke implementations in advanced projects
- Expands ecosystem support through a specialized partner solution

**Documentation:**
- [https://gitlab.netzdirektion.de/packages/punchcommerce-spryker-module](https://gitlab.netzdirektion.de/packages/punchcommerce-spryker-module)

## Connected, and AI-Enabled Platform

### AI Dev SDK: AI-Assisted Customization for Spryker Projects {% include badge.html type="early-access" %}

The AI Dev SDK helps teams customize Spryker projects faster and with less manual effort. It supports developers in generating quick proofs of concept and MVP customizations that follow Spryker's patterns and project conventions, with developers staying in control at each approval point. This helps teams validate ideas faster, keep customization quality more consistent, and lower the manual effort each one takes.

<figure class="video_container">
    <video width="100%" height="auto" controls>
      <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-dev/ai-dev-sdk-workflow.mp4" type="video/mp4">
  </video>
</figure>

**Key capabilities:**
- Orchestrates the full Spryker customization workflow, from research and planning through code generation, testing, and verification, with self-correction when issues are detected and developer approval at key checkpoints
- Automates the technical work needed after every code change, including database migrations, cache rebuilds, and frontend builds
- Offers two quality levels: quick PoC for validating ideas fast, and MVP for delivering code that follows Spryker's canonical patterns and project conventions

**Business benefits:**
- Speeds up delivery of Spryker customizations, whether a quick proof of concept or an MVP-grade build.
- Reduces development effort and catches issues against Spryker and project standards earlier.
- Lowers the cost of experimentation — quick PoCs make it cheap to validate an idea before investing in a full implementation.

**Documentation:**
- [AI Dev SDK Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html)
- [AI Dev SDK Customization Workflow](/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow.html)
- [Claude Code Plugin](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code-plugin.html)

### AI Commerce: Smart CMS for AI-assisted content creation {% include badge.html type="early-access" %}

Smart CMS brings AI assistance directly into the CMS page and block creation in the Back Office. Content editors and business users can generate structured text content in-flow instead of writing or copying content manually. This reduces the effort required to create and update commerce content experiences at scale.

{% include carousel.html
images="
https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/bo_smart_cms_1.png||::
https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/bo_smart_cms_2.png||::
https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/bo_smart_cms_3.png||"
%}

**Key capabilities:**
- Generates CMS page and block content directly in the Back Office authoring flow
- Accepts source attachments, such as documents with customer questions, to generate structured content like FAQ pages
- Understands Spryker-specific content items so generated content fits existing content structures

**Business benefits:**
- Reduces manual effort for routine content creation and updates
- Improves productivity for content editors and business admins
- Helps scale content operations more efficiently as content needs grow

**Documentation:**
- [Smart CMS Content Assistant](/docs/pbc/all/ai-commerce/latest/smart-cms-content-assistant)
- [Install Smart CMS Content Assistant](/docs/dg/dev/ai/ai-commerce/content-assistant/install-smart-cms-content-assistant#prerequisites)

### AI Foundation: Back Office AI Configuration {% include badge.html type="early-access" %}

AI Foundation now includes a unified configuration experience in the Back Office for managing AI providers, models, prompts, and feature-specific behavior. This gives business and operational users a clearer, more consistent way to activate and control AI-powered capabilities, including switching AI vendors or models on the fly, without developer involvement or redeployment.

{% include carousel.html
images="
https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/bo_ai_configuration_1.png||::
https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/bo_ai_configuration_2.png||"
%}

**Key capabilities:**
- Centralizes AI provider and credential management in one configuration area
- Supports feature-level enablement and control of AI behavior, including AI vendor, model, and prompt configuration, with no code changes or deployments required
- Provides an extensible foundation designed to support additional AI-powered features over time

**Business benefits:**
- Simplifies setup and onboarding for AI-powered features
- Gives merchants more control over AI behavior, output quality, and governance
- Reduces configuration errors and repetitive administrative work

**Documentation:**
- [Configure multiple AI providers for AI Commerce](/docs/dg/dev/ai/ai-commerce/configure-multiple-ai-providers)

### AI Foundation: Back Office AI Cost Estimator {% include badge.html type="early-access" %}

The AI Cost Estimator adds estimated AI cost visibility to the AI Audit Logs in the Back Office. Admins can configure model pricing once and then see estimated costs per interaction, total estimated spend, and breakdowns by provider and model. This makes it easier to understand the cost of individual AI-powered commerce features and make informed decisions about their value and continued use.

{% include carousel.html
images="
https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/bo_ai_cost_estimator_1.png||::
https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202606/bo_ai_cost_estimator_2.png||"
%}

**Key capabilities:**
- Shows estimated cost per AI interaction in the Audit Logs page
- Provides total estimated cost and provider and model-level cost breakdowns based on active filters
- Uses customer-configured provider and model prices, including support for multiple currencies

**Business benefits:**
- Improves visibility into AI operating costs across commerce features
- Supports better governance and value assessment of AI capabilities
- Reduces manual work previously needed to estimate AI spend from token usage

**Documentation:**
- [AI Audit Logs & Cost Estimations](/docs/dg/dev/ai/ai-foundation/ai-foundation-audit-logs)

### GLUE REST API migration to API Platform {% include badge.html type="feature" %}

Spryker has modernized its internal GLUE REST API infrastructure by migrating it to API Platform. This change is backward compatible for existing API clients, while making APIs easier to maintain, extend, and evolve internally. It also improves the foundation for delivering new endpoints and capabilities faster.

**Key capabilities:**
- Keeps existing external API contracts unchanged for current clients and consumers
- Replaces custom internal API infrastructure with API Platform
- Enables more standardized API generation, validation, and documentation

**Business benefits:**
- Accelerates API delivery and reduces development effort for new endpoints
- Improves maintainability and extensibility of the API layer
- Supports more consistent and predictable machine-to-machine integrations

**Documentation:**
- [API Strategy](/docs/integrations/spryker-glue-api/getting-started-with-apis/api-strategy.html)
- [Spryker API roadmap and adoption](/docs/integrations/spryker-glue-api/getting-started-with-apis/api-roadmap-and-adoption#whats-on-the-roadmap.html)
- [Storefront API B2B Demo Shop reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-b2b-demo-shop-reference.html)

### Backend API added to the Spryker API Strategy {% include badge.html type="feature" %}

Spryker extended its API strategy to cover the Backend API, the application for administrative and system-to-system integrations. The strategy now documents the API types available under the Backend API—starting with the Back Office API you can build on today—and the types planned on the roadmap, all built on API Platform integration. As with the rest of the strategy, existing Glue Backend APIs remain fully supported with no End-of-Life and no forced migration.

**Key capabilities:**
- Documents the Backend API application and its API types, and clarifies that the Backend API application is distinct from the Back Office API type
- Back Office API is available today for administrator-level and trusted internal integrations
- Roadmap types documented for planning: Merchant API, Merchant Data Exchange API, Data Exchange API, and Async Event API
- Guidance for choosing a Backend API type by caller and data-flow shape—record-by-record, bulk, or event-driven

**Business benefits:**
- Gives a clear, forward-looking view of backend integration options across administration, merchant, data exchange, and events
- Protects existing Glue Backend API investments with a no-End-of-Life, no-forced-migration commitment
- Speeds up planning for ERP, PIM, OMS, and marketplace integrations with consistent guidance

**Documentation:**
- [Spryker API Strategy](/docs/integrations/spryker-glue-api/getting-started-with-apis/api-strategy.html)
- [Spryker API roadmap and adoption](/docs/integrations/spryker-glue-api/getting-started-with-apis/api-roadmap-and-adoption.html)

## Efficient and Flexible Cloud Foundation

### Propel 2.0 LTS  {% include badge.html type="improvement" %}

This work includes advancing Propel toward a stable release and increasing active maintenance.

**Documentation:**
- [PropelORM](https://github.com/propelorm/Propel2/releases/tag/2.0.0)

### Maintenance and service updates {% include badge.html type="improvement" %}

We rolled out regular maintenance and service updates across cloud components to keep environments secure, stable, and maintainable. This includes updates to core services and supporting infrastructure components. These changes help reduce operational risk and technical debt over time.

**Key capabilities:**
- Updates core services and infrastructure components such as Nginx 1.30, and Docker images
- Improves long-term maintainability of cloud services
- Updated multiple dependencies

**Business benefits:**
- Improves system reliability and operational resilience
- Updates `shell-quote` to a patched version addressing a critical shell injection vulnerability.
- Upgrades `symfony/runtime` to address unsafe request argument handling.
- Upgrades `symfony/monolog-bridge` to address unauthenticated log listener exposure.

**Documentation:**
- [Docker Images](/docs/about/all/releases/image-releases/spryker-php/release-notes-spryker-php-20260608.html)

### Key-Value Storage Optimization for Dynamic Store Mode {% include badge.html type="improvement" %}

We optimized key-value storage usage for Dynamic Store Mode to reduce duplicated data across store and locale combinations. This improvement lowers Valkey/Redis memory consumption and key volume while keeping the solution backward compatible and opt-in. It is especially valuable for deployments with multiple stores and locales.

**Key capabilities:**
- Reduces duplicated product abstract and URL storage data in Dynamic Store Mode
- Keeps compatibility with existing storage formats and supports gradual adoption
- Provides an opt-in configuration and migration path for controlled rollout

**Business benefits:**
- Improves scalability for multi-store and multi-locale setups
- Helps delay or avoid costly cache instance size increases

**Documentation:**
- [KV Storage Deduplication](/docs/dg/dev/guidelines/performance-guidelines/kv-storage-deduplication.html)

### Queue processing resilience and worker behavior {% include badge.html type="improvement" %}

We improved queue processing behavior to reduce the risk of blocked or stalled message handling. The update addresses long-running worker processes, retry queue handling, and premature worker exits while messages are still waiting.

**Key capabilities:**
- Improves handling of long-running or stuck queue worker child processes
- Prevents failed messages from being lost when no retry queue exists
- Ensures `queue:worker:start --stop-when-empty` behaves more reliably

**Business benefits:**
- Reduces the risk of blocked publish and processing pipelines
- Improves operational stability for queue-based workloads
- Helps teams recover from processing failures more predictably

**Documentation:**
- [Publish and synchronization (queue and event performance)](/docs/dg/dev/guidelines/performance-guidelines/keeping-dependencies-updated#publish-and-synchronization-queue-and-event-performance)
- [Enable queue worker wait limit](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines#enable-queue-worker-wait-limit)

### Cloud security improvements {% include badge.html type="improvement" %}

We delivered a set of cloud security improvements to strengthen infrastructure protection and reduce unnecessary access paths. These updates address container-to-instance access risks, improve IAM controls, and support more secure cloud operations. They also include compatibility adjustments for newer managed service defaults.

**Key capabilities:**
- Tightens IAM policy controls to prevent overly broad administrative permissions in customer PaaS accounts
- Adds compatibility handling for MariaDB 11.8 secure transport defaults in infrastructure templates

**Business benefits:**
- Reduces the risk of unauthorized access to cloud resources and secrets
- Improves security posture across customer environments
- Helps maintain secure operations as infrastructure components evolve

### RDS Auditability Extensions {% include badge.html type="feature" %}

We have introduced advanced activity tracking for database operations to enhance security governance and accountability across your environments. This update provides clear visibility into data modifications and structural changes within your live production systems.
**Key capabilities:**
- Monitors and records database operations performed in production environments
- Securely retains activity logs for a rolling two-year period to satisfy standard corporate compliance and security policies.

**Business benefits:**
- Provides complete transparency into exactly who executed which database operation, ensuring robust compliance and clear user accountability
- Enhances Security Auditing: Simplifies the detection of potential application exploits—such as SQL injections—by tracking critical service account behaviors

### Persistent Jenkins Configuration {% include badge.html type="improvement" %}

We have updated our cloud automation storage model to significantly improve platform stability. This enhancement ensures that your custom adjustments are safely preserved during routine platform updates and security maintenance.
**Key capabilities:**
- Permanently safeguards all manually created configurations and fine-tunings across system upgrades and server restarts
- Unlocks continuous, automated operating system upgrades and critical infrastructure patching to keep your system completely protected

**Business benefits:**
- Eliminates the risk of losing bespoke operational settings, removing the need for costly and repetitive manual reconfiguration work
- Enhances your overall security posture by allowing the seamless deployment of critical patches without disrupting business continuity

### Customer authentication and session handling {% include badge.html type="improvement" %}

We fixed issues affecting customer authentication and session behavior in edge cases. These changes improve reliability for API authentication and login flows.

**Key capabilities:**
- Prevents unintended API authentication behavior related to `spy_customer.registered = NULL`
- Improves error handling for invalid JWT tokens in warehouse token requests
- Avoids false-positive WAF blocking caused by `../` sequences in password hashes.

**Business benefits:**
- Improves trust in authentication flows
- Reduces login-related support cases
- Helps secure customer access scenarios more consistently

**Documentation:**
- [spy_customer.registered=NULL allows API auth](https://api.release.spryker.com/release-group/6618)
- [Adjusted Quote data and UI fixes](https://api.release.spryker.com/release-group/6621)
- [Added optional base64 encoding for gateway](https://api.release.spryker.com/release-group/6633)

### Voucher code tracking and order display accuracy in the Back Office {% include badge.html type="improvement" %}

We fixed issues with orders that use multiple voucher-code discounts. The Back Office now shows the correct voucher code for each applied discount, and usage counters are updated correctly for all voucher codes used in an order.

**Key capabilities:**
- Displays the actual voucher code used for each discount in the Back Office order overview.
- Correctly increments usage counters for all voucher codes applied to an order.
- Supports orders with multiple non-exclusive voucher-based discounts more accurately.

**Business benefits:**
- Improves trust in discount reporting and order auditability.
- Reduces manual verification effort for merchandising and support teams.
- Ensures voucher campaign performance is tracked correctly.

**Release:**
- [Multiple voucher codes on order](https://api.release.spryker.com/release-group/6640)

### Product and catalog experience improvements {% include badge.html type="improvement" %}

We improved several product-related experiences in the Back Office and storefront to make catalog management and shopping journeys more reliable. The update covers product images in Zed, product readiness visibility, replacement product rendering, and marketplace product offer handling in carts.

**Key capabilities:**
- Restores product concrete image visibility in the Back Office

**Business benefits:**
- Gives business users clearer product status information
- Reduces confusion during catalog maintenance in the Back Office
- Improves cart accuracy for marketplace shopping scenarios

**Documentation:**
- [Show Product Concrete images in Zed](https://api.release.spryker.com/release-group/6501)

### Storefront performance, search, and content management improvements {% include badge.html type="improvement" %}

We improved storefront performance, search reliability, content management efficiency, and product data consistency to deliver faster customer experiences, more accurate search results, and better scalability across high-volume environments.

**Key capabilities:**
- Improves checkout and customer-facing page performance by reducing unnecessary backend requests and eliminating Redis bottlenecks for large datasets.
- Enhances product data publishing and search indexing to keep Storage and Search synchronized with catalog changes across multi-store and multi-locale environments.
- Generates search index mappings correctly for advanced analyzer and multi-field configurations.
- Optimizes CMS page version history loading for better Back Office performance when managing long-lived content.
- Preserves locale selection across storefront, configurator, agent emulation, and authentication flows for a more consistent user experience.

**Business benefits:**
- Delivers faster storefront and checkout experiences, even at scale.
- Improves search accuracy and product data consistency across channels.
- Enhances Back Office productivity for content managers.
- Reduces backend load and improves platform scalability.
- Provides a more consistent localized shopping experience for customers and support agents.

**Documentation and Releases:**
- [Cart page and checkout for large carts](/docs/dg/dev/guidelines/performance-guidelines/keeping-dependencies-updated#cart-page-and-checkout-for-large-carts-100-items)
- [Adjusted reading shipment type uuids on Checkout](https://api.release.spryker.com/release-group/5736)
- [Added child fields to index map](https://api.release.spryker.com/release-group/6616)
- [CMS page versions query for the form loads too much data](https://api.release.spryker.com/release-group/6630)
- [Remediate error in spryker/category >= 5.23.0](https://api.release.spryker.com/release-group/6452)
- [Remove Concrete Product on deactivation](https://api.release.spryker.com/release-group/6500)
- [Remove product concrete from the search index](https://api.release.spryker.com/release-group/6574)
- [Locale selection preserved when navigating in the Storefront](https://api.release.spryker.com/release-group/6521)
- [Performance improvements to the checkout](https://api.release.spryker.com/release-group/6479)
