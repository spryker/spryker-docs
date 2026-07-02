title: Release notes 202606.0
description: Release notes for Spryker Cloud Commerce OS version 202606.0
last_updated: June 29, 2026
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide). 

## Connected, and AI-Enabled Platform

### AI Dev SDK: AI-Assisted Customization for Spryker Projects {% include badge.html type="early-access" %}

The AI Dev SDK helps teams customize Spryker projects faster and with less manual effort. It supports developers in generating quick proofs of concept and MVP customizations that follow Spryker's patterns and project conventions, with developers staying in control at each approval point. This helps teams validate ideas faster, keep customization quality more consistent, and lower the manual effort each one takes.

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

**Key capabilities:**
- Generates CMS page and block content directly in the Back Office authoring flow
- Accepts source attachments, such as documents with customer questions, to generate structured content like FAQ pages
- Understands Spryker-specific content items so generated content fits existing content structures

**Business benefits:**
- Reduces manual effort for routine content creation and updates
- Improves productivity for content editors and business admins
- Helps scale content operations more efficiently as content needs grow

**Documentation:**
- [Smart CMS Content Assistant](https://docs.spryker.com/docs/pbc/all/ai-commerce/latest/smart-cms-content-assistant)
- [Install Smart CMS Content Assistant](https://docs.spryker.com/docs/dg/dev/ai/ai-commerce/content-assistant/install-smart-cms-content-assistant#prerequisites)

### AI Foundation: Back Office AI Configuration {% include badge.html type="early-access" %}

AI Foundation now includes a unified configuration experience in the Back Office for managing AI providers, models, prompts, and feature-specific behavior. This gives business and operational users a clearer, more consistent way to activate and control AI-powered capabilities, including switching AI vendors or models on the fly, without developer involvement or redeployment.

**Key capabilities:**
- Centralizes AI provider and credential management in one configuration area
- Supports feature-level enablement and control of AI behavior, including AI vendor, model, and prompt configuration, with no code changes or deployments required
- Provides an extensible foundation designed to support additional AI-powered features over time

**Business benefits:**
- Simplifies setup and onboarding for AI-powered features
- Gives merchants more control over AI behavior, output quality, and governance
- Reduces configuration errors and repetitive administrative work

**Documentation:**
[Configure multiple AI providers for AI Commerce](https://docs.spryker.com/docs/dg/dev/ai/ai-commerce/configure-multiple-ai-providers)

### AI Foundation: Back Office AI Cost Estimator {% include badge.html type="early-access" %}

The AI Cost Estimator adds estimated AI cost visibility to the AI Audit Logs in the Back Office. Admins can configure model pricing once and then see estimated costs per interaction, total estimated spend, and breakdowns by provider and model. This makes it easier to understand the cost of individual AI-powered commerce features and make informed decisions about their value and continued use.

**Key capabilities:**
- Shows estimated cost per AI interaction in the Audit Logs page
- Provides total estimated cost and provider and model-level cost breakdowns based on active filters
- Uses customer-configured provider and model prices, including support for multiple currencies

**Business benefits:**
- Improves visibility into AI operating costs across commerce features
- Supports better governance and value assessment of AI capabilities
- Reduces manual work previously needed to estimate AI spend from token usage

**Documentation:**
[AI Audit Logs & Cost Estimations](https://docs.spryker.com/docs/dg/dev/ai/ai-foundation/ai-foundation-audit-logs)

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
[API Strategy](/docs/integrations/spryker-glue-api/getting-started-with-apis/api-strategy.html)
[Spryker API roadmap and adoption](/docs/integrations/spryker-glue-api/getting-started-with-apis/api-roadmap-and-adoption#whats-on-the-roadmap.html)
[Storefront API B2B Demo Shop reference](/docs/integrations/spryker-glue-api/storefront-api/api-references/storefront-api-b2b-demo-shop-reference.html)

### Spryker API Strategy - Back End API {% include badge.html type="feature" %}

Spryker introduced the foundation for standardized back-end APIs on API Platform to make integrations more consistent, predictable, and easier to adopt. This work establishes a unified approach for building APIs across the Back Office, merchant, and data exchange domains, helping customers and partners integrate with Spryker more efficiently.

**Key capabilities:**
- Standardized API foundation for Spryker back-end interfaces built on API Platform
- Consistent API development patterns for areas such as authentication, versioning, and endpoint design
- Foundation for discoverable and self-describing APIs that support future extensibility and automation use cases

**Business benefits:**
- Reduces integration complexity across Spryker back-end touchpoints
- Improves consistency and predictability for customer and partner implementations
- Strengthens Spryker’s enterprise API offering and readiness for future AI-driven operations

**Documentation:**


### Product CRUD API endpoints via API Platform {% include badge.html type="feature" %}

Spryker added CRUD API endpoints for abstract and concrete products on API Platform. This enables product data to be created, updated, retrieved, listed, and deleted through standardized back-end API endpoints protected by Back Office authentication.

**Key capabilities:**
- CRUD endpoints for abstract products and concrete products
- Support for paginated and filterable product listing endpoints
- Validated request and response structures for product operations, including related product data

**Business benefits:**
- Simplifies external and internal product management integrations
- Enables more efficient product maintenance through standardized API access
- Creates a more reliable foundation for automation and headless operational workflows

**Documentation:**

## B2B Business-Ready Commerce Experiences

### Recurring Orders (EA) {% include badge.html type="early-access" %} {% include badge.html type="feature" %}

Recurring Orders let buyers create cadence-based repeat purchases during checkout and execute them automatically on a defined schedule. The feature includes controls for confirmations and approvals, as well as review and recovery flows for basket changes, price changes, or ERP-related issues.

**Key capabilities:**
- Create recurring order schedules such as weekly, bi-weekly, or monthly
- Support buyer-controlled confirmations, skips, modifications, and approvals before execution
- Detect basket drift, price drift, and ERP errors with clear recovery flows

**Business benefits:**
- Reduces manual effort for repeat procurement
- Helps prevent missed or delayed replenishment orders
- Increases trust through controlled automation, governance, and auditability

**Documentation:**

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

### New Spryker Design System Storefront

We extended the Spryker design system across key storefront pages, including product listing, product detail, and cart pages. This creates a more consistent and modern buyer experience while giving teams reusable components for faster delivery.

**Key capabilities:**
- Design system applied across the product details page
- New reusable components such as cart entries, pagination, and quantity selectors
- Storybook documentation for reference and reuse

**Business benefits:**
- Improves buyer trust with a more polished storefront experience
- Reduces future implementation and QA effort through reusable patterns
- Strengthens Spryker’s out-of-the-box storefront for demos and evaluations

**Documentation:**

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

## Efficient and Flexible Cloud Foundation

### Key-Value Storage Optimization for Dynamic Store Mode {% include badge.html type="improvement" %}

We optimized key-value storage usage for Dynamic Store Mode to reduce duplicated data across store and locale combinations. This improvement lowers Valkey/Redis memory consumption and key volume while keeping the solution backward compatible and opt-in. It is especially valuable for deployments with multiple stores and locales.

**Key capabilities:**
- Reduces duplicated product abstract and URL storage data in Dynamic Store Mode
- Keeps compatibility with existing storage formats and supports gradual adoption
- Provides an opt-in configuration and migration path for controlled rollout

**Business benefits:**
- Lowers infrastructure costs by reducing Valkey/Redis memory usage
- Improves scalability for multi-store and multi-locale setups
- Helps delay or avoid costly cache instance size increases

**Documentation:**
https://docs.spryker.com/docs/dg/dev/guidelines/performance-guidelines/kv-storage-deduplication

### Cloud Hub usability and automation improvements {% include badge.html type="improvement" %}

We improved Cloud Hub to make self-service cloud management easier and more consistent. The update focuses on a clearer user experience, broader automation, and a smoother journey from environment setup to go-live. This helps customers manage cloud operations with less friction and fewer manual steps.

**Key capabilities:**
- Improves Cloud Hub user experience for common self-service activities
- Expands automation across more steps of the environment lifecycle
- Supports a more consistent journey from provisioning to production readiness

**Business benefits:**
- Shortens time from environment creation to go-live
- Reduces dependency on support teams for operational tasks
- Increases confidence in Spryker’s cloud operating experience

**Documentation:**

### Cloud security improvements {% include badge.html type="improvement" %}

We delivered a set of cloud security improvements to strengthen infrastructure protection and reduce unnecessary access paths. These updates address container-to-instance access risks, improve IAM controls, and support more secure cloud operations. They also include compatibility adjustments for newer managed service defaults.

**Key capabilities:**
- Restricts access from containers to EC2 instance metadata and inherited EC2-level AWS permissions
- Tightens IAM policy controls to prevent overly broad administrative permissions in customer PaaS accounts
- Adds compatibility handling for MariaDB 11.8 secure transport defaults in infrastructure templates

**Business benefits:**
- Reduces the risk of unauthorized access to cloud resources and secrets
- Improves security posture across customer environments
- Helps maintain secure operations as infrastructure components evolve

**Documentation:**

### TLS, authentication, and single sign-on for cloud services {% include badge.html type="feature" %}

We introduced centralized authentication and access management for cloud services, including support for secure access and single sign-on. This enables customers to manage user access more efficiently while improving protection for sensitive services. The update also lays the foundation for a more unified and enterprise-ready cloud access experience.

**Key capabilities:**
- Enables centralized access management for cloud services such as Jenkins and RabbitMQ
- Supports single sign-on for a smoother and more secure user experience
- Improves security with stronger access controls and support for customer identity providers

**Business benefits:**
- Reduces manual effort and delays in granting and revoking access
- Improves security through better user lifecycle management
- Aligns cloud service access with enterprise authentication expectations

**Documentation:**

### Bastion security hardening {% include badge.html type="feature" %}

We hardened bastion access by modernizing the host, separating workloads from the base operating system, and enforcing stronger authentication for human users. The rollout is designed to be transparent for customers and keep downtime minimal. This improves maintainability and raises the security baseline for administrative access.

**Key capabilities:**
- Upgrades bastion hosts to current supported operating system versions
- Separates workload from the host system through containerization
- Enforces SSO and MFA for human access while preserving SFTP integration flows

**Business benefits:**
- Strengthens security for administrative entry points
- Simplifies future maintenance and upgrade activities
- Minimizes customer impact during rollout

**Documentation:**

### Maintenance and service updates {% include badge.html type="improvement" %}

We rolled out regular maintenance and service updates across cloud components to keep environments secure, stable, and maintainable. This includes updates to core services and supporting infrastructure components. These changes help reduce operational risk and technical debt over time.

**Key capabilities:**
- Updates core services and infrastructure components such as Jenkins v2.555.1 and JVM v21, Nginx 1.30, and Docker images
- Improves long-term maintainability of cloud services
- Updated multiple dependencies

**Business benefits:**
- Reduces exposure to vulnerabilities and outdated components
- Improves system reliability and operational resilience
- Updates `shell-quote` to a patched version addressing a critical shell injection vulnerability.
- Upgrades `symfony/runtime` to address unsafe request argument handling.
- Upgrades `symfony/monolog-bridge` to address unauthenticated log listener exposure.

**Documentation:**
[Jenkins](/docs/about/all/releases/image-releases/jenkins/release-notes-spryker-jenkins-20260520.html)
[Docker Images](/docs/about/all/releases/image-releases/spryker-php/release-notes-spryker-php-20260608.html)

### Propel 2.0 LTS  {% include badge.html type="improvement" %}

This work includes advancing Propel toward a stable release and increasing active maintenance.

**Documentation:**
[PropelORM](https://github.com/propelorm/Propel2/releases/tag/2.0.0)


### API validation, messaging, and documentation improvements {% include badge.html type="improvement" %}

We improved API behavior for validation, error handling, and documentation across BAPI, SAPI, and dynamic entity endpoints. These updates make API integrations more predictable and easier to understand for both business and technical users.

**Key capabilities:**
- Improves error messages for invalid API requests and missing related entities
- Prevents 500 errors in several product and pricing API scenarios
- Fixes Swagger documentation for 204 responses and payload body definitions

**Business benefits:**
- Reduces integration friction for API consumers
- Makes API failures easier to understand and troubleshoot
- Improves confidence in documented API behavior

**Documentation:**


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
https://docs.spryker.com/docs/dg/dev/guidelines/performance-guidelines/keeping-dependencies-updated#publish-and-synchronization-queue-and-event-performance
https://docs.spryker.com/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines#enable-queue-worker-wait-limit


### Framework and kernel stability improvements {% include badge.html type="improvement" %}

We fixed several framework-level issues affecting class resolution, environment builds, dependency handling, and extensibility. These improvements help projects run more reliably, especially in customized or multi-namespace setups.

**Key capabilities:**
- Improves class resolution when optional core directories or packages are missing
- Prevents cache readers from accessing files before they are generated during environment build
- Improves support for additional project namespaces and abstract Propel base classes

**Business benefits:**
- Reduces project setup and deployment issues
- Improves reliability for customized enterprise project structures
- Simplifies maintenance for projects with extended framework usage

**Documentation:**


### Back Office usability improvements {% include badge.html type="improvement" %}

We improved several Back Office interactions to make administration tasks clearer and less error-prone. This covers block and slot assignment validation, merchant page navigation, and CMS page version handling.

**Key capabilities:**
- Restores validation feedback when saving block and slot assignments
- Fixes missing menu highlight on the View Merchant page in the Back Office
- Reduces heavy data loading when fetching CMS page versions for forms

**Business benefits:**
- Improves clarity during Back Office administration
- Helps business users navigate merchant management more easily
- Reduces delays and friction in CMS-related workflows

**Documentation:**


### Customer authentication and session handling {% include badge.html type="improvement" %}

We fixed issues affecting customer authentication and session behavior in edge cases. These changes improve reliability for API authentication and login flows across multiple environments.

**Key capabilities:**
- Prevents unintended API authentication behavior related to `spy_customer.registered = NULL`
- Improves error handling for invalid JWT tokens in warehouse token requests

**Business benefits:**
- Improves trust in authentication flows
- Reduces login-related support cases
- Helps secure customer access scenarios more consistently

**Documentation:**


### Storage, content file, and content security hardening {% include badge.html type="improvement" %}

We introduced fixes and hardening measures for storage operations and content-related security. This includes safer file access patterns, more accurate storage cleanup behavior, and mitigation for DOM-based XSS risks in selected Back Office JavaScript components.

**Key capabilities:**
- Prevents `storage:delete` from targeting the wrong Redis database
- Introduces safer file access direction for Content/Files usage
- Removes insecure jQuery execution patterns that could enable DOM-based XSS

**Business benefits:**
- Reduces risk in administrative and content-related operations
- Improves data safety for file-based content access
- Strengthens overall application security posture

**Documentation:**


### Demo shop security and dependency updates {% include badge.html type="improvement" %}

We updated demo shop dependencies and CI-related configurations to address multiple reported vulnerabilities. The updates cover GitHub workflow hardening and package upgrades across frontend, backend, and framework dependencies.

**Key capabilities:**
- Fixes insecure template usage in GitHub workflow actions
- Upgrades vulnerable packages such as Twig, Symfony components, Angular, and other affected dependencies
- Resolves CI-blocking security issues in demo shop repositories

**Business benefits:**
- Improves demo environment security and reliability
- Reduces exposure to known supply chain and dependency vulnerabilities
- Keeps customer-facing demos functional and trustworthy

**Documentation:**


### Payment and order processing reliability {% include badge.html type="improvement" %}

We fixed issues affecting checkout and order completion flows in selected payment and discount scenarios. This includes Stripe payment availability and more accurate processing of discount and voucher data.

**Key capabilities:**
- Restores Stripe payment availability in affected store setups
- Improves reliability of payment step completion during checkout
- Supports more accurate order-related promotion handling

**Business benefits:**
- Reduces checkout failures for customers
- Improves conversion by keeping payment options available
- Lowers operational effort around payment incident handling

**Documentation:**


### Developer tooling and package management improvements {% include badge.html type="improvement" %}

We fixed several issues that affected package visibility, dependency validation, and code generation behavior for developers. These updates improve consistency in build and development workflows.

**Key capabilities:**
- Fixes package visibility issues for `spryker/twig` in Composer
- Improves module constraint validation for beta packages
- Aligns transfer and builder Twig template location handling

**Business benefits:**
- Simplifies dependency management for development teams
- Reduces build and upgrade friction
- Improves predictability in code generation workflows

**Documentation:**

### Customer login and session handling improvements {% include badge.html type="improvement" %}

We improved customer authentication and session behavior to make login flows more stable, secure, and performant across storefront interactions. This update addresses inconsistent login states across multiple browsers, reduces unnecessary session blocking for concurrent HTTP requests, and ensures configured persistent connections are used for YVES, ZED, and session storage.

**Key capabilities:**
- Prevents broken intermediate login states when the same customer signs in from different browsers or sessions.
- Reduces request blocking caused by session storage lock handling for concurrent HTTP requests.
- Uses configured persistent connections for YVES, ZED, and session storage to improve runtime efficiency.

**Business benefits:**
- Delivers a more reliable sign-in experience for customers.
- Improves storefront responsiveness during parallel customer actions.
- Helps reduce infrastructure overhead and performance bottlenecks in session-heavy traffic.

**Documentation:**

### Safer customer data handling in Glue requests {% include badge.html type="improvement" %}

We improved how customer data is transferred in Glue-related request flows to avoid passing password hashes where they are not needed. This helps prevent requests from being blocked by AWS WAF rules when password hashes contain character sequences that can be interpreted as malicious payloads.

**Key capabilities:**
- Prevents password hashes from being unnecessarily exposed in transferred customer data.
- Avoids false-positive AWS WAF blocking caused by `../` sequences in password hashes.
- Improves compatibility of login-related Glue request processing.

**Business benefits:**
- Reduces login and request failures caused by infrastructure security filters.
- Improves security posture by minimizing sensitive data propagation.
- Makes customer authentication flows more robust in protected cloud environments.

**Documentation:**

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

**Documentation:**

### Marketplace cart validation for product offers in B2C {% include badge.html type="improvement" %}

We fixed product offer handling in B2C Marketplace carts so invalid product offer references are no longer silently accepted. Cart requests now validate the provided product offer reference as expected.

**Key capabilities:**
- Validates `productOfferReference` when items are added to the cart through the API.
- Rejects incorrect product offer references instead of ignoring them.
- Aligns B2C Marketplace behavior with expected marketplace cart validation.

**Business benefits:**
- Prevents invalid marketplace cart entries.
- Improves checkout reliability for marketplace scenarios.
- Reduces debugging effort for API-based integrations.

**Documentation:**

### Faster checkout address step for large Redis datasets {% include badge.html type="improvement" %}

We improved checkout performance by removing a Redis key scanning bottleneck affecting the address step in environments with very large Redis datasets. Checkout responsiveness is now no longer tied to the total number of Redis keys.

**Key capabilities:**
- Eliminates excessive Redis `SCAN` operations during checkout address step processing.
- Improves performance in projects with very large Redis key volumes.
- Makes shipment-type-related checkout rendering more efficient.

**Business benefits:**
- Speeds up checkout for large-scale projects.
- Improves customer experience by reducing page load times.
- Helps maintain predictable storefront performance as data volume grows.

**Documentation:**

### Search index mapping now generates child fields correctly {% include badge.html type="improvement" %}

We fixed index map generation so defined child fields are created correctly in the search index mappings. This is especially important for advanced analyzers and multi-field configurations such as n-gram search fields.

**Key capabilities:**
- Generates declared child fields in index mappings correctly.
- Supports multi-field search configurations more reliably.
- Preserves intended analyzer setups for search relevance tuning.

**Business benefits:**
- Improves search configuration accuracy.
- Enables better search quality for advanced language and analyzer use cases.
- Reduces manual troubleshooting of missing search fields.

**Documentation:**

### Payment method availability improved for concrete products and offers {% include badge.html type="improvement" %}

We fixed an issue where payment methods were not shown correctly during checkout, depending on whether the cart contained concrete products or marketplace offers. Payment options now appear according to the actual cart composition.

**Key capabilities:**
- Makes standard payment methods available when the cart contains concrete products.
- Makes marketplace payment methods available when the cart contains product offers.
- Restores correct payment method resolution during checkout.

**Business benefits:**
- Prevents checkout disruption caused by missing payment options.
- Improves conversion by ensuring eligible payment methods are shown.
- Reduces support cases related to unavailable payment methods.

**Documentation:**

### CMS page version history loads more efficiently {% include badge.html type="improvement" %}

We optimized the CMS page version history view in the Back Office to reduce unnecessary data loading. Performance is now more stable even for CMS pages with many historical versions.

**Key capabilities:**
- Reduces data volume loaded for version history forms.
- Improves page responsiveness for CMS pages with extensive version histories.
- Makes Back Office content management smoother at scale.

**Business benefits:**
- Saves time for content managers working with frequently updated pages.
- Improves Back Office usability for long-lived CMS content.
- Reduces delays when reviewing or restoring page history.

**Documentation:**

### Security dependency upgrades for demo shops {% include badge.html type="improvement" %}

We upgraded vulnerable dependencies in demo shop applications to address reported security issues and restore healthy CI execution. This includes fixes for vulnerable package behavior in frontend and Symfony runtime-related components.

**Key capabilities:**
- Updates `shell-quote` to a patched version addressing a critical shell injection vulnerability.
- Upgrades `symfony/runtime` to address unsafe request argument handling.
- Upgrades `symfony/monolog-bridge` to address unauthenticated log listener exposure.

**Business benefits:**
- Reduces security risk in demo shop environments.
- Keeps CI pipelines healthy and deployable.
- Aligns demo applications with patched dependency versions.

**Documentation:**

### Stripe payment availability restored {% include badge.html type="improvement" %}

We fixed an issue that caused Stripe payments to be unavailable during checkout in affected stores. Customers can now complete checkout without being sent back with a “Payment Provider unavailable” message.

**Key capabilities:**
- Restores Stripe payment method availability during checkout.
- Prevents failed payment attempts caused by provider unavailability.
- Improves stability of payment completion in affected storefronts.

**Business benefits:**
- Protects checkout conversion for stores using Stripe.
- Reduces abandoned orders caused by payment failures.
- Minimizes urgent operational support around payment disruptions.

**Documentation:**

### Product data publishing and indexing reliability {% include badge.html type="improvement" %}

We improved product data consistency across Storage and Search to prevent outdated or incomplete product information after product changes. This update addresses issues with product concrete deactivation, category publishing, and product concrete search indexing.

**Key capabilities:**
- Removes deactivated product concretes from Storage consistently
- Prevents category publish errors in multi-store and multi-locale setups
- Removes product concretes from the search index as intended

**Business benefits:**
- Reduces the risk of outdated product information in storefront and APIs
- Improves publishing stability for multi-store environments
- Helps keep search results aligned with active catalog data

**Documentation:**

### Product and catalog experience improvements {% include badge.html type="improvement" %}

We improved several product-related experiences in the Back Office and storefront to make catalog management and shopping journeys more reliable. The update covers product images in Zed, product readiness visibility, replacement product rendering, and marketplace product offer handling in carts.

**Key capabilities:**
- Restores product concrete image visibility in the Back Office
- Improves product readiness information to make status clearer
- Fixes cart handling for marketplace product offers in B2C Marketplace setups

**Business benefits:**
- Gives business users clearer product status information
- Reduces confusion during catalog maintenance in the Back Office
- Improves cart accuracy for marketplace shopping scenarios

**Documentation:**


### Localization and storefront session consistency {% include badge.html type="improvement" %}

We fixed multiple issues where locale selection could be lost or reset during common storefront and agent flows. This includes returning from the product configurator, agent emulation changes, and logout/login transitions.

**Key capabilities:**
- Preserves selected locale when returning from the product configurator to the PDP
- Prevents locale loss when starting or stopping agent emulation
- Improves locale continuity when agents log out

**Business benefits:**
- Creates a more consistent shopping experience across localized storefronts
- Reduces confusion for customers and support agents
- Helps avoid unintended language or store switches in active sessions

**Documentation:**


### Customer and checkout performance improvements {% include badge.html type="improvement" %}

We reduced unnecessary Zed requests on customer-facing pages to improve responsiveness and lower backend traffic. The improvements cover the customer profile, wishlist, shopping lists, and checkout flow.

**Key capabilities:**
- Reduces duplicate Zed calls on the customer profile page
- Streamlines customer-related validation requests during checkout
- Improves request efficiency on wishlist and shopping list pages

**Business benefits:**
- Speeds up customer account and checkout experiences
- Reduces backend load from duplicate or unnecessary requests
- Helps lower the chance of customer-facing errors caused by redundant validations

**Documentation:**
https://docs.spryker.com/docs/dg/dev/guidelines/performance-guidelines/keeping-dependencies-updated#cart-page-and-checkout-for-large-carts-100-items


### Voucher and discount handling accuracy {% include badge.html type="improvement" %}

We fixed issues in voucher processing and discount code handling to improve order accuracy and platform security. This includes correct display and usage tracking for multiple voucher codes on an order, as well as stronger protection against discount code brute-force attempts.

**Key capabilities:**
- Correctly displays multiple voucher codes in order details in the Back Office
- Tracks voucher usage counters accurately across multiple applied discounts
- Adds stronger protection against repeated discount code guessing attempts

**Business benefits:**
- Increases trust in promotion reporting and order data
- Reduces operational confusion for service and operations teams
- Improves storefront security for discount code usage

**Documentation:**


### PunchOut support in the Back Office {% include badge.html type="improvement" %}

PunchOut support in the Back Office makes PunchOut integrations easier to configure and manage with a more low-code approach. Building on Spryker’s native support for common PunchOut flows and cXML/OCI compatibility, this update adds a dedicated PunchOut section with relevant fields and configuration support. This helps solution teams deliver integrations with less custom development effort.

**Key capabilities:**
- Adds a dedicated PunchOut section in the Back Office
- Supports configuration of relevant PunchOut integration fields in a more low-code way
- Complements native cXML, OCI, and core PunchOut message handling capabilities

**Business benefits:**
- Reduces bespoke development effort for PunchOut integrations
- Makes implementations more repeatable and faster across projects
- Simplifies setup and maintenance for customers and implementation partners

**Documentation:**


### PunchCommerce Punchout Connector {% include badge.html type="feature" %}

The PunchCommerce Punchout Connector extends Spryker’s support for complex PunchOut scenarios through a partner integration. It is designed for use cases that require multiple eProcurement connectors and document handling beyond Spryker’s native capabilities. This helps customers address more advanced procurement integration requirements.

**Key capabilities:**
- Connects Spryker with PunchCommerce for advanced PunchOut scenarios
- Supports use cases with multiple eProcurement connectors
- Adds support for document-handling requirements not covered by native capabilities

**Business benefits:**
- Broadens PunchOut coverage for more complex B2B procurement scenarios
- Reduces the need for bespoke implementations in advanced projects
- Expands ecosystem support through a specialized partner solution

**Documentation:**

