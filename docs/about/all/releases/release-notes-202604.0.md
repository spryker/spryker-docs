---
title: Release notes 202604.0
description: Release notes for Spryker Cloud Commerce OS version 202602.0
last_updated: Apr 22, 2026
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide).

## B2B Business-Ready Commerce Experiences

### Login UX improvements {% include badge.html type="improvement" %}

We improved the login experience across the Back Office, Storefront, and Marketplace to help users resume work faster and with less confusion. Users now land on a meaningful Back Office dashboard after login, and after session timeout they are returned to their previous page or workflow where supported.

**Key capabilities:**
- Redirects Back Office users to the dashboard instead of a blank technical page after login.
- Adds action-oriented quick actions to the Back Office dashboard for common tasks such as viewing orders, adding products, opening the catalog, and checking returns.
- Restores the last visited page after session timeout across the Back Office, Storefront, and Marketplace.
- Reopens create and edit pages after re-login, while unsaved data is not preserved.

**Business benefits:**
- Reduces onboarding friction for new users.
- Helps operational users continue workflows faster after session expiration.
- Improves usability and perceived product maturity across core daily journeys.
- Makes demos and first-touch product experiences more intuitive.

**Documentation:**

### Back Office Configuration Framework is now Generally Available

Spryker made the Back Office Configuration Framework generally available with important enterprise-readiness enhancements. The release improves governance, discoverability, operational efficiency, and usability for managing business-relevant configuration directly in the Back Office. It also makes configuration changes more transparent and easier to control.

**Key capabilities:**
- Audit logging for configuration changes
- Improved search and discoverability of configuration options
- UX enhancements for a more reliable configuration experience
- CLI-based import support for faster setup and operations
- Better visibility into conflicts between code-based and Back Office configuration

**Business benefits:**
- Increases confidence and accountability when managing configuration
- Reduces misconfiguration risk and operator effort
- Makes the framework ready for broader enterprise adoption

**Documentation:**

### Back Office support for merchant product ownership

Marketplace operators can now manage **merchant ownership of products directly in the Back Office**, without relying on the Merchant Portal. This makes it easier to maintain accurate product data in centrally managed or hybrid marketplace models. The result is smoother operations and clearer accountability across the catalog.

**Key capabilities:**
- **Assign or update merchant ownership** for any product directly in Back Office workflows.
- **See merchant ownership instantly** within product management views.
- **Maintain merchant‑related product data** as part of your standard PIM processes.

**Business benefits:**
- **Strengthens support for centrally managed catalogs and hybrid marketplace models**, giving operators more flexibility in how they run their marketplace.
- **Improves transparency and control**, making ownership clear, consistent, and auditable.
- **Reduces reliance on workarounds and custom tooling**, lowering operational overhead.
- **Supports more flexible marketplace operations**, enabling teams to scale product management with confidence.

**Documentation:**

### Budget & Cost Centers {% include badge.html type="early-access" %} {% include badge.html type="feature" %}

We introduced an Early Access version of budgets and cost centers to support policy-driven purchasing in B2B procurement. The release covers core budget enforcement and its integration with approval workflows.

**Key capabilities:**
- Lets companies create and manage cost centers and assign buyers to them.
- Supports budget creation with configurable enforcement rules such as block, warn, or require approval.
- Adds cost center selection and budget validation during checkout.
- Integrates budget-triggered approvals with Spryker's existing Approval Process.
- Tracks budget consumption and restoration as orders progress.

**Business benefits:**
- Improves financial control and purchasing compliance.
- Reduces overspending risk with enforceable budget rules.
- Aligns procurement workflows with departmental or project-based spending structures.
- Provides an early demoable foundation for customer and partner conversations.

**Documentation:**

### Basic Shop Theming {% include badge.html type="feature" %}

Business users can now manage core branding settings directly in the Back Office without code changes or deployments. This provides a standardized way to apply basic theming across Storefront, the Back Office, and Merchant Portal.

**Key capabilities:**
- Supports theme management with global and store-specific scope.
- Lets users upload and manage logos for Storefront, the Back Office, and Merchant Portal.
- Provides configuration for core branding colors and button styles.
- Uses a standardized Back Office configuration experience for theme administration.

**Business benefits:**
- Reduces dependency on developers for basic branding changes.
- Speeds up demo preparation, POCs, and early customer activation.
- Improves time to first transaction through self-service configuration.
- Strengthens perception of Spryker as an out-of-the-box ready solution.

**Documentation:**

### Back Office product import and export {% include badge.html type="early-access" %} {% include badge.html type="feature" %}

We introduced an Early Access Back Office experience for product import and export to reduce dependency on developer-driven CLI tooling. This helps business users prepare catalogs faster for demos, launches, and routine updates.

**Key capabilities:**
- Enables product-related import and export from the Back Office UI.
- Supports CSV-based jobs for creating or updating buyable product data.
- Processes imports asynchronously in batches for larger files.
- Introduces reusable job and run concepts for repeatable import and export operations.
- Focuses on business-user-friendly file handling and actionable validation feedback.

**Business benefits:**
- Removes a major bottleneck for catalog onboarding and updates.
- Reduces preparation effort for demos and staging-to-production catalog migration.
- Enables more self-service error resolution for business users.
- Improves operational efficiency for merchants, partners, and internal teams.

**Documentation:**

## Commerce Essentials

### Product attribute display types {% include badge.html type="feature" %}

You can now control where product attributes are visible without project-specific customization. This helps keep internal operational data hidden while displaying only relevant information to buyers.

**Key capabilities:**
- Adds visibility types for product attributes.
- Supports internal-only attributes as well as attributes shown on PDP, PLP, and cart-related experiences.
- Provides native configuration for attribute visibility management.

**Business benefits:**
- Reduces repeated custom development across projects.
- Keeps storefront product pages cleaner and more relevant for buyers.
- Supports operational and AI-related attributes without exposing them publicly.
- Improves time-to-market for B2B projects with standard attribute visibility needs.

**Documentation:**

### Search statistics and Google Analytics {% include badge.html type="feature" %}

Spryker now provides native search statistics for business users working with ElasticSearch-based projects. Teams can analyze search behavior directly in the Back Office and use the data to optimize discoverability.

**Key capabilities:**
- Tracks and displays frequent search terms.
- Highlights zero-result searches to uncover catalog and relevance gaps.
- Offers time-based filtering for analysis.
- Supports detailed list views and CSV export.
- Integrates event tracking via Google Analytics 4 for search insights.

**Business benefits:**
- Enables data-driven search optimization and synonym management.
- Reduces duplicate custom analytics implementations.
- Helps identify missed conversion opportunities caused by zero-result searches.
- Gives catalog and merchandising teams actionable visibility into buyer behavior.

**Documentation:**

## User Experience Foundation

### New Spryker Design System Storefront (1) {% include badge.html type="feature" %}

We introduced the first phase of a unified storefront design system to establish a scalable UI foundation. This release focuses on token-based design foundations and reusable composite components for more consistent storefront experiences.

**Key capabilities:**
- Defines the design system foundation with shared tokens and naming conventions.
- Introduces token-driven implementation patterns for new storefront components.
- Adds composite component patterns built from core UI elements.
- Covers common structures such as cards, lists, tabs, menus, breadcrumbs, dialogs, tables, search, and filters.

**Business benefits:**
- Improves consistency across storefront experiences.
- Reduces duplicate design and frontend implementation effort.
- Accelerates feature delivery with reusable UI patterns.
- Creates a stronger foundation for future storefront evolution.

**Documentation:**

### Back Office design theme update phase 1 {% include badge.html type="improvement" %}

We delivered the first phase of the Back Office theme modernization to improve clarity, consistency, and responsiveness. This update creates a more usable and scalable visual foundation without changing the overall information architecture.

**Key capabilities:**
- Improves visual hierarchy and component consistency across the Back Office.
- Reduces UX debt introduced by legacy Inspinia defaults.
- Enhances spacing, density, emphasis, and table presentation.
- Provides a more stable foundation for future Back Office UX improvements.

**Business benefits:**
- Improves daily usability for Back Office users.
- Makes the Back Office more credible and demo-ready.
- Reduces the need for one-off CSS customizations.
- Establishes a better base for future product evolution.

**Documentation:**

## Connected, and AI-Enabled Platform

### Algolia configuration in the Back Office {% include badge.html type="improvement" %}

Spryker updated the Algolia integration settings in the Back Office to replace the legacy ACP-based configuration experience. The new page uses the Back Office Configuration Framework and provides a more consistent and user-friendly way to manage Algolia credentials. This helps reduce setup effort and simplifies validation during implementation.

**Key capabilities:**
- New configuration section in **Back Office > Configuration > Integrations > Algolia**
- Manage Algolia credentials, including:
  - Application ID
  - Search-only API key
  - Admin API key
- Validate credentials directly via API calls
- Align Algolia setup with the current Spryker-native integration approach

**Business benefits:**
- Simplifies Algolia setup and maintenance in the Back Office
- Reduces implementation time and configuration errors
- Replaces legacy ACP-era fields with a clearer configuration experience

**Documentation:**

### Mollie PSP Integration {% include badge.html type="feature" %}

Spryker introduced a new Mollie payment service provider integration to support European B2B and B2C commerce scenarios. The integration helps customers implement a region-relevant PSP faster and with less custom development. It is delivered with support from Spryker Solution Partner KPS.

**Key capabilities:**
- New integration for the Mollie payment service provider
- Supports more localized payment setups for European markets
- Provides a productized alternative to building a custom Mollie integration from scratch

**Business benefits:**
- Speeds up go-live for European payment implementations
- Improves alignment with regional payment preferences and market expectations
- Lowers delivery effort, project risk, and long-term maintenance overhead

**Documentation:**

### OAuth SSO readiness for Spryker applications {% include badge.html type="feature" %}

Spryker introduced a standardized and reusable approach for OAuth 2.0 and OpenID Connect single sign-on across key applications. The release establishes a consistent integration pattern for identity providers such as Keycloak, Azure AD, and Okta for the Back Office, Storefront, and Merchant Portal. This makes identity integrations more predictable and reduces the need for project-specific implementations.

**Key capabilities:**
- Standardized SSO approach for:
  - the Back Office
  - Storefront
  - Merchant Portal
- Support for OAuth Authorization Code flow with PKCE
- Provider-agnostic integration based on configurable OAuth providers
- Persistent identity linking between external providers and Spryker users
- Reference implementation, templates, configuration patterns, and rollout guidance
- Backward compatibility with existing form-based login

**Business benefits:**
- Reduces time and cost for enterprise identity integrations
- Improves implementation predictability across projects
- Creates a reusable foundation for federated authentication across Spryker entry points

**Documentation:**

### Back Office Assistant {% include badge.html type="early-access" %} {% include badge.html type="feature" %}

**Key capabilities:**

**Business benefits:**

**Documentation:**

### AI Foundation Audit Logs {% include badge.html type="feature" %}

Spryker now provides AI interaction logging with a dedicated Back Office interface for reviewing all AI activity. Teams can access prompts, responses, model details, token usage, and metadata in a searchable view. This strengthens AI governance, accelerates troubleshooting, and supports continuous optimization.

**Key capabilities:**
- **Persistent storage** of AI interactions
- **Comprehensive audit trail** including prompts, responses, model info, token usage, timing, and metadata
- **Back Office UI** available under **Intelligence > Audit Logs**
- **Sorting, filtering, pagination, and aggregated statistics** for efficient analysis
- **Inline inspection** of prompts, responses, and metadata for deeper investigation

**Business benefits:**
- **Enhances traceability and governance** across all AI-powered features
- **Accelerates debugging and prompt optimization**, reducing operational friction
- **Supports compliance and oversight needs** with a centralized and transparent audit trail

**Documentation:**
- [AI Foundation Audit Logs](/docs/dg/dev/ai/ai-foundation/ai-foundation-audit-logs.html)

### Add to Cart from image {% include badge.html type="early-access" %} {% include badge.html type="improvement" %}

Buyers can turn image-based product lists into cart-ready entries with less manual effort. This capability has been packaged and integrated into the master demo to better support realistic B2B ordering scenarios.

**Key capabilities:**
- Extracts product names or SKUs and quantities from uploaded images.
- Prefills the existing quick order form with recognized items.
- Uses Spryker AI Foundation for AI-based processing.

**Business benefits:**
- Speeds up bulk and repeat ordering workflows.
- Reduces manual entry effort and ordering errors.
- Reflects real-world B2B buying behavior such as ordering from screenshots or product photos.
- Improves demoability of AI-assisted procurement use cases.

**Documentation:**

### Smart PIM in the public demo shop {% include badge.html type="early-access" %}

Spryker added Smart PIM to the public demo shop as an Early Access capability. The feature showcases AI-assisted product enrichment directly in the Back Office, helping teams create richer and more complete product data with less manual work. It is designed to demonstrate how AI can accelerate catalog management and localization.

**Key capabilities:**
- AI-assisted translation of product names and descriptions into any locale
- AI-powered improvement of product names and descriptions
- Alt-text generation for product images
- Suggested best-fit product categories
- Human-friendly error handling when AI integration is not configured

**Business benefits:**
- Reduces manual effort in product data enrichment
- Improves product content quality and consistency across locales
- Helps merchants scale catalog updates and localization faster

**Documentation:**

### AI visual search in the demo shop {% include badge.html type="early-access,improvement" %}

Spryker enhanced its demo-shop AI visual search experience and migrated it to use Spryker AI Foundation. Customers can search for products by uploading or capturing an image, making product identification faster and easier in complex buying scenarios. The updated implementation also includes mobile support.

**Key capabilities:**
- Search for products using an uploaded image or photo
- Mobile-supported visual search experience
- Integration routed through Spryker AI Foundation instead of direct OpenAI connectivity
- Improved demo implementation for AI-powered product discovery

**Business benefits:**
- Reduces friction in finding the correct product
- Improves buying experiences for technical and spare-parts use cases
- Demonstrates a more reusable and centralized AI integration approach

**Documentation:**

### AI workflow visualization in the Back Office {% include badge.html type="early-access,feature" %}

Spryker introduced an Early Access Back Office view for AI workflow execution visibility. The feature provides a list and detail pages for AI workflows, helping teams inspect workflow states and manually trigger available actions when needed. This improves transparency for AI-driven processes.

**Key capabilities:**
- Back Office list page for AI workflows
- Workflow detail view with state history
- Visualized state machine with highlighted current state
- Manual event trigger where supported

**Business benefits:**
- Improves visibility into AI workflow execution
- Helps operators monitor and troubleshoot AI-driven processes
- Supports more controlled handling of AI workflow states

**Documentation:**

### Native PunchOut Gateway for cXML and OCI {% include badge.html type="feature" %}

Spryker introduced native PunchOut Gateway capabilities for cXML and OCI to reduce bespoke integration work in procurement-driven B2B commerce. The release adds reusable building blocks for common PunchOut flows, including session start, shopping, cart updates, and cart return. This strengthens support for enterprise procurement environments, especially SAP-centric setups.

**Key capabilities:**
- Native compatibility for cXML and OCI PunchOut scenarios
- Support for basic PunchOut requisition and cart flows
- Standard OCI parameter handling
- OCI cart return support with line items
- Reusable message handling and implementation guidance

**Business benefits:**
- Reduces custom development effort for PunchOut implementations
- Speeds up procurement-channel enablement and time-to-revenue
- Improves repeatability and maintainability across B2B integration projects

**Documentation:**

### New Stripe Integration {% include badge.html type="improvement" %}

Spryker introduced a new Stripe integration that replaces the legacy ACP-based app with a more extensible Spryker-native implementation. The release also adds a dedicated configuration page in the Back Office for managing Stripe settings. This gives customers and partners more control over Stripe-based payment flows and reduces dependency on legacy integration boundaries.

**Key capabilities:**
- New installable Stripe Eco module without ACP runtime dependency
- Support for checkout payment method selection
- Support for payment initialization, authorization, capture, refund, and cancel flows
- New configuration section in **Back Office > Configuration > Integrations > Stripe**
- Validation of Stripe keys and webhook configuration
- Storage of Stripe settings in configuration storage

**Business benefits:**
- Improves flexibility for extending and customizing Stripe payment flows
- Reduces implementation risk and legacy dependency overhead
- Lowers long-term maintenance effort and supports faster payment innovation

**Documentation:**

### New Vertex Integration {% include badge.html type="improvement" %}

Spryker introduced a new Vertex integration to replace the legacy ACP-based approach for tax calculation scenarios. The new integration is designed to provide more flexibility and reduce legacy constraints when adapting tax-related processes. This supports more maintainable and extensible tax integrations over time.

**Key capabilities:**
- New Spryker-native Vertex integration
- Reduced reliance on legacy ACP-based architecture
- Improved extensibility for tax calculation and related scenarios

**Business benefits:**
- Supports more adaptable tax integrations for changing business needs
- Reduces integration friction and project-specific patching
- Lowers total cost of ownership through improved maintainability

**Documentation:**

### API Platform is now Generally Available {% include badge.html type="feature" %}

Spryker made API Platform generally available as the foundation for modern API development and migration. Existing APIs have been migrated to API Platform internally while keeping external contracts backward-compatible. This enables faster API delivery, easier extensibility, and more standardized API development.

**Key capabilities:**
- Declarative API development using YAML schemas
- API generation with validation, pagination, serialization, and operation-specific rules
- Interactive and always up-to-date OpenAPI documentation
- Backward-compatible migration of existing APIs to API Platform infrastructure
- Cleaner separation of read and write logic through providers and processors

**Business benefits:**
- Reduces development effort for new and existing APIs
- Improves consistency and maintainability of API implementations
- Accelerates delivery of integrations and future API capabilities

**Documentation:**

### Data import performance and stability enhancements {% include badge.html type="improvement" %}

We improved the data import experience and robustness for large data volumes. Data imports now provide better execution visibility through a progress bar, and memory usage has been optimized to better support very large imports, including merchant price imports with up to 1 million records.

**Key capabilities:**
- Added a progress bar for data import console commands to show execution progress.
- Reduced memory consumption in data import flows to prevent out-of-memory issues during large imports.
- Improved reliability for high-volume imports across data import entities.

**Business benefits:**
- Helps operators better monitor long-running imports.
- Reduces failures caused by memory exhaustion during large imports.
- Improves operational efficiency for bulk data onboarding.

**Documentation:**
- [Data import (memory usage)](/docs/dg/dev/guidelines/performance-guidelines/keeping-dependencies-updated.html#data-import-memory-usage)
- [Data import Progress bar](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html#progress-bar)

### Back Office performance improvements {% include badge.html type="improvement" %}

We improved performance in several areas of the Back Office to reduce response times and system load in large-scale environments. The update addresses ACL-related delays, order page performance, and slow product list rendering for projects with large product catalogs.

**Key capabilities:**
- Optimized ACL access checks to reduce unnecessary permission evaluations during Back Office requests.
- Reduced overhead caused by navigation filtering, especially for requests where navigation is not needed.
- Improved order page performance for orders with many items.
- Improved product list performance in the Back Office for large assortments and complex filtering scenarios.

**Business benefits:**
- Speeds up daily work for Back Office users.
- Improves usability in setups with many users, roles, and restricted permissions.
- Supports better scalability for large catalogs and complex order management scenarios.

**Documentation:**
- [Merchant Portal and Back Office performance with ACL rules](/docs/dg/dev/guidelines/performance-guidelines/keeping-dependencies-updated.html#merchant-portal-and-back-office-performance-with-acl-rules)
- [Order details page performance guidance](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-details-page-performance-overview.html)

### Queue and worker performance optimization {% include badge.html type="improvement" %}

We optimized queue worker processing to improve throughput and system stability under load. The update introduces dynamic waiting behavior, better control over parallel job execution, and compatibility improvements for Symfony Messenger resource-aware workers.

**Key capabilities:**
- Improved worker throughput with dynamic waiting time adjustments under load.
- Added the ability to limit the number of parallel jobs processed at the same time.
- Reduced the risk of out-of-memory issues through better workload control.
- Added support for resource-aware queue workers when using Symfony Messenger.

**Business benefits:**
- Processes asynchronous workloads faster.
- Improves stability of queue processing in high-load environments.
- Gives teams more flexibility to tune performance based on project needs.

**Documentation:**
- [Split publish queues for performance](/docs/dg/dev/guidelines/performance-guidelines/split-queues-performance.html)

### Widget performance optimization {% include badge.html type="improvement" %}

We optimized widget execution to improve overall storefront and application performance. These changes reduce processing overhead in widget-heavy pages and improve responsiveness.

**Key capabilities:**
- Improved widget execution efficiency.
- Reduced unnecessary overhead in widget rendering flows.

**Business benefits:**
- Enhances page responsiveness.
- Improves scalability for projects with extensive widget usage.

**Documentation:**
- [Yves widget performance best practices](/docs/dg/dev/guidelines/performance-guidelines/yves-performance-best-practice.html)

### Node.js 24 LTS upgrade {% include badge.html type="improvement" %}

We upgraded the main frontend tooling runtime to Node.js 24 LTS. This keeps the platform aligned with a supported long-term version and enables access to the latest reliability, security, and performance improvements.

**Key capabilities:**
- Updated frontend tooling runtime to Node.js 24 LTS.
- Aligned the platform with a current long-term support release.

**Business benefits:**
- Improves security by using a supported runtime version.
- Increases long-term stability for frontend tooling.
- Provides access to performance improvements in the latest runtime.

**Documentation:**

### Security update for symfony/http-foundation in app templates {% include badge.html type="improvement" %}

We updated `symfony/http-foundation` to address known vulnerabilities in affected application templates. This change improves the security posture of the related repositories.

**Key capabilities:**
- Upgraded `symfony/http-foundation` to version `6.4.29` in affected app templates.
- Addressed high-severity vulnerabilities reported for the dependency.

**Business benefits:**
- Reduces exposure to known security issues.
- Helps maintain compliance with secure dependency standards.

**Documentation:**

### Non-buffered log streaming support from community contribution {% include badge.html type="improvement" %}

We added support for non-buffered log streaming based on a community contribution. This improves how logs can be streamed and consumed in real time.

**Key capabilities:**
- Added support for non-buffered log streaming.

**Business benefits:**
- Improves log visibility for running processes.
- Enables more immediate access to log output.

**Documentation:**


## Efficient and Flexible Cloud Foundation

### Cloud observability: logs forwarding through SMI {% include badge.html type="improvement" %}

Spryker expanded cloud observability by enabling log forwarding through SMI to third-party monitoring platforms such as Dynatrace. This allows teams to correlate logs with traces, create alerts based on log data, and use their preferred monitoring tooling beyond CloudWatch.

**Key capabilities:**
- Forward application logs to external monitoring platforms through SMI
- Correlate logs with traces using trace and span identifiers
- Export application container logs and Jenkins job logs
- Support additional log types such as RDS slow query logs and application audit logs
- Configure log verbosity to control emitted log volume
- Monitor and meter log shipment for billing and operational visibility

**Business benefits:**
- Improved troubleshooting through unified logs and traces
- Better alerting capabilities based on application and infrastructure log events
- More flexibility to use customer-preferred monitoring solutions
- Increased transparency for observability-related usage and costs

**Documentation:**

### TLS, authentication, and SSO for Cloud services {% include badge.html type="feature" %}

Spryker introduced centralized access management for cloud services, including SSO support for customer identity providers such as Okta and OneLogin. This update reduces manual access handling, improves security, and simplifies onboarding and offboarding for users. It also includes rollout, production-readiness, and IAM cleanup measures to standardize and harden access controls.

**Key capabilities:**
- Connect your own identity provider for SSO access to cloud services
- Centralize user access management for services such as Jenkins, RabbitMQ, and others
- Reduce manual access management effort through self-service-oriented processes
- Review and clean up IAM roles and policies for better standardization
- Restrict overly broad IAM permissions in customer PaaS accounts
- Prevent creation of unrestricted `*:*` administrative IAM policies outside approved flows

**Business benefits:**
- Faster and more secure user onboarding and offboarding
- Reduced operational effort for access requests and changes
- Lower security risk through tighter permission boundaries
- Better compliance with least-privilege access principles

**Documentation:**

### Bastion security hardening {% include badge.html type="improvement" %}

Spryker improved Bastion host security and maintainability by upgrading the operating system, isolating workloads from the host, and enforcing SSO and MFA for human access. This change modernizes the setup while keeping customer impact minimal and preserving SFTP access for integrations.

**Key capabilities:**
- Upgrade Bastion hosts to a current LTS operating system
- Separate workload from the host through containerization
- Enforce SSO and MFA for human access
- Deprecate direct SSH access for human users
- Retain non-MFA access for SFTP-based integrations
- Roll out changes with a targeted maintenance window and no customer configuration changes

**Business benefits:**
- Improved security posture for administrative access
- Easier future maintenance and operating system upgrades
- Reduced platform risk through modernization of critical infrastructure
- Minimal disruption during rollout

**Documentation:**

### Maintenance and service updates {% include badge.html type="improvement" %}

Spryker delivered maintenance updates across cloud services and application tooling to keep the platform secure, supported, and maintainable. The release includes service upgrades, application dependency updates, and RabbitMQ upgrade preparations to reduce technical debt and improve operational stability.

**Key capabilities:**
- Upgrade Jenkins to a current LTS version
- Upgrade Nginx to a current supported version
- Replace Ubuntu-based service hosts with Amazon Linux where applicable
- Upgrade PHPUnit to version 12
- Upgrade PHPStan to version 2 for improved performance and PHP 8.4 support
- Prepare and validate RabbitMQ upgrade paths, including support for newer versions
- Implement near-zero-downtime RabbitMQ update strategy based on Blue/Green deployment concepts

**Business benefits:**
- Reduced security and operational risk from outdated components
- Better long-term maintainability of cloud infrastructure
- Faster CI and developer feedback cycles through tooling improvements
- Improved service continuity during infrastructure and messaging upgrades

**Documentation:**

## Other

### AI configuration management for runtime-resolved provider settings {% include badge.html type="feature" %}

AI provider configuration values can now be resolved at runtime from the Configuration Management module. This allows Back Office administrators to update settings such as model, API key, and system prompt without code changes or deployments.

**Key capabilities:**
- Supports resolving AI configuration values using the `configuration::` prefix.
- Allows runtime lookup of nested AI provider settings from Configuration Management.
- Keeps static configuration values unchanged where runtime resolution is not needed.
- Throws a dedicated exception when a referenced configuration key cannot be resolved.

**Business benefits:**
- Lets business users adjust AI behavior without involving developers.
- Reduces deployment effort for AI configuration changes.
- Improves flexibility and governance for AI-enabled features.

**Documentation:**

### AI Dev tooling for coding agents {% include badge.html type="feature" %}

We added new AI Dev tooling to help development teams work more effectively with coding agents in Spryker projects. The update provides ready-to-use agent instruction files and reusable Spryker-specific skill examples.

**Key capabilities:**
- Added commands to generate an `AGENTS.md` context file in the project root.
- Added commands to copy reusable skill examples into the project.
- Bundled Spryker-specific guidance for testing, data import, Propel schema conventions, static validation, and Yves atomic frontend development.

**Business benefits:**
- Improves developer experience for teams using AI coding agents.
- Helps teams start faster with Spryker-aware agent guidance.
- Encourages consistent development patterns across projects.

**Documentation:**

### Back Office Configuration Framework GA

Introduced the Back Office Configuration Framework as generally available to standardize and simplify configuration management in the Back Office.

**Key capabilities:**
- Provides a structured framework for Back Office configuration
- Supports more consistent configuration handling across Back Office features

**Business benefits:**
- Reduces complexity when managing Back Office configurations
- Improves maintainability and consistency for project teams

**Documentation:**

### AI Foundation: Audit logs {% include badge.html type="feature" %}

Added audit log capabilities to AI Foundation to improve traceability of AI-related actions and events.

**Key capabilities:**
- Captures audit-relevant events in AI Foundation
- Supports tracking and review of AI-related activity

**Business benefits:**
- Increases transparency for AI operations
- Helps support compliance and governance requirements

**Documentation:**

### OCI Phase 1 — API Compatibility & Documentation Enablement {% include badge.html type="feature" %}

Added initial OCI support to improve compatibility with SAP-centric procurement environments and reduce project-specific integration effort.

**Key capabilities:**
- Supports standard OCI parameters such as `HOOK_URL`, `OCI_VERSION`, and `USERNAME`
- Handles OCI cart return flows with line items posted back to the procurement system
- Provides documentation and integration guidance for SAP and Ariba use cases
- Includes a reference implementation example

**Business benefits:**
- Reduces implementation effort for OCI-based procurement integrations
- Improves Spryker's fit for enterprise B2B procurement scenarios
- Increases confidence in SAP-heavy customer environments

**Documentation:**

### AI Foundation: Audit logs in the Back Office {% include badge.html type="feature" %}

Added a Back Office user interface for AI Foundation audit logs so users can review audit information directly in the Back Office.

**Key capabilities:**
- Displays AI Foundation audit logs in the Back Office
- Improves access to recorded AI audit information for operational users

**Business benefits:**
- Simplifies audit log review for business and operations teams
- Improves usability of AI governance capabilities

**Documentation:**
