---
title: Release notes 202602.0
description: Release notes for Spryker Cloud Commerce OS version 202602.0
last_updated: February 28, 2026
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide).

## B2B Business-Ready Commerce Experiences

### Product Attachments {% include badge.html type="feature" %}

Introduces out-of-the-box Product Attachments capability commonly required in industrial B2B purchasing.

{% include carousel.html
images="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/product_attachments_storefront_pdp.png||::https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/product_attachments_backoffice_pim.png||"
%}

**Key capabilities**
- Back Office management of product-related documents (for example, datasheets, certificates, manuals).
- Provide external links to product attachments via data import.
- Display and download or view attachments on the product details page.

**Business benefits**
- Supporting buyers' decisions by providing more detailed product information.
- Removes approval bottlenecks and shortens the path from product view to first transaction.

**Documentation**
- [Product Attachments overview](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attachments-overview.html)
- [Install the Product Attachments feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-attachments-feature.html)

### Product & Merchant Offer Availability Display {% include badge.html type="feature" %}

Introduces native, configurable product and merchant offer availability display for B2B Commerce and Marketplace scenarios, reducing customization and increasing buyer confidence at the point of decision.

**Key capabilities**
- Native availability display on the product details page (PDP) and in the cart
- Configurable display logic:
  - Availability indicator only (for example Available / Out of Stock)
  - Exact stock quantity combined with indicator
  - Configuration option for the sort order of merchant offers in the B2B Marketplace
- Built on existing Spryker stock data structures

**Business benefits**
- Buyers see reliable availability information at the point of decision.
- Businesses no longer need custom implementations for basic stock visibility.
- Transparent stock visibility increases direct orders and reduces operational overhead.

**Documentation**
- [Product Availability Display feature overview](/docs/pbc/all/warehouse-management-system/latest/base-shop/product-availability-display-feature-overview)
- [Buy Box feature overview](/docs/pbc/all/offer-management/latest/marketplace/buy-box-feature-overview)

### Backoffice Configuration Framework {% include badge.html type="feature,early-access" %}

Introduces a structured, extensible framework to expose business-relevant configuration directly in the Spryker Back Office without code changes or redeployments.

**Key capabilities**
- Structured Business Configuration via UI
  - Developers define configuration options in YAML once.
  - The framework automatically renders validated Back Office UI pages.
- Runtime Configuration Without Deployment
  - Configuration changes are applied at runtime, no code change, no pull request, no deployment required.
- Support for Out-of-the-Box and Custom Features. The framework works for:
  - Standard Spryker features
  - Project-specific customizations
- Built-in Validation & Guardrails
  - Business users can only adjust explicitly defined and validated options, preventing misconfiguration.

**Business benefits**
- Faster Time to Change
  - Business teams adjust approved behaviors instantly, no development sprint required.
- Lower Total Cost of Change
  - Reduces repetitive engineering effort for configuration updates and eliminates custom UI builds per feature.
- Faster Experimentation
  - Test different configuration setups (for example display logic, marketplace sorting) without waiting for release cycles.

### B2B-only Mode Enablement

Reduces project setup time for customers and partners who want B2B Commerce only, without Marketplace complexity.

**Key capabilities**
- Added a **guideline and deployment script** to start the unified demo shop in a standardized **B2B Commerce–only mode**, reducing required manual cleanup and configuration.

**Business benefits**
- Faster project initialization for B2B-only projects.
- Lower implementation cost and reduced efforts.
- Clearer positioning and smoother kick-off experience.

**Documentation**
- [Uninstall the Marketplace from B2B Demo Marketplace](/docs/about/all/uninstall-marketplace-from-b2b-demo-marketplace)

### New Industrial Homepage Sample Data {% include badge.html type="improvement" %}

The new sample data allows you to explore more realistic B2B Commerce journeys and capabilities without needing to import your own data.

**Key capabilities**
- Updated homepage content to industrial goods and services across key blocks (banners, featured categories, featured products, top sellers).

**Business benefits**
- More realistic demos that reflect real industrial buying journeys.
- Faster evaluations by showing realistic catalog and merchandising scenarios out of the box.
- Less manual demo preparation for partners and solution teams.

### UX & Design Improvements for Storefront & Back Office {% include badge.html type="improvement" %}

Improves clarity, consistency, and perceived quality across core pages and navigation.

{% include carousel.html
   images="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/Menu Icons.png||::https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/Empty_status_page.png||::https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/Toast_notifications.png||"
%}

**Key capabilities**
- Redesigned the Back Office 404 page with clear recovery actions and consistent styling, removing technical error output for a smoother user experience.
- Improved empty states for Addresses, Orders, and Returns pages in storefront to guide users with clear next steps and better first-time usability.
- Updated navigation to Google Material Icons for visual consistency with the Merchant Portal.
- Replaced full-width banner of toast notifications with stacked, auto-dismissing toast notifications for lightweight, non-disruptive feedback.
- Fixed Back Office form validation errors showing untranslated message keys (restored translation rendering).

**Business benefits**
- Faster task completion and reduced confusion in Back Office operations.
- Better first-time experience for B2B customers on key storefront pages.
- Higher perceived product quality and consistency for enterprise users.
- Reduced support noise caused by unclear errors and untranslated validation messages.


### PunchOut: cXML Compatibility in Spryker API

Enables standardized B2B PunchOut integrations via cXML support.

**Key capabilities**
- Support for **cXML (Commerce XML)** as an additional data exchange format in the Spryker API Platform.
- Documentation and guidance for implementing PunchOut integrations with external eProcurement systems.

**Business benefits**
- Enterprise-ready B2B integration  API Compatibility with leading procurement platforms.
- Simplified implementation of PunchOut scenarios for customers and partners.
- Stronger positioning in complex B2B commerce environments.

**Documentation**
- [PunchOut Development Plan](/docs/integrations/custom-building-integrations/punchout-development-plan)

## Connected, and AI-Enabled Platform

### Spryker AI Foundation: Operable, Structured, and Extensible AI Runtime {% include badge.html type="early-access,improvement" %}

Enhances the AI Foundation runtime layer to make AI executions easier to operate at scale, safer to integrate into product code, and more extensible for evolving use cases.

**Key capabilities**
- Prompt responses now return **token usage** and **applied AI configuration details** (for example, provider/vendor, model, configuration name, and relevant parameters) for improved transparency and troubleshooting.
- Added **structured response support** aligned with **Spryker Transfers**, enabling validated, contract-based AI outputs rather than fragile free-text parsing.
- Introduced a supported **tool call extension mechanism** for AI Foundation, enabling standardized enrichment of tool call inputs/outputs without project-specific integration workarounds.

**Business benefits**
- Improved cost and performance control through token visibility and configuration traceability.
- More reliable production integrations through typed, validated AI outputs (reduced downstream breakage from phrasing changes).
- Lower long-term maintenance and support effort via a standardized extension mechanism for evolving AI use cases.

**Documentation**
- [AI Foundation](/docs/pbc/all/ai-foundation/latest/ai-foundation.html)
- [Install the AI Foundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-module.html)
- [Use AI tools with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-tool-support.html)
- [Use structured responses with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-transfer-response.html)

### Spryker AI Commerce: Agent Foundations and Smart PIM Improvements {% include badge.html type="early-access,improvement" %}

Adds foundational capabilities for advanced agent workflows and improves the Back Office Smart PIM with safer, more reliable AI-assisted product description support.

**Key capabilities**
- **Conversation history** support to maintain context across interactions, enabling better multi-step workflows.
- Introduced a **workflow orchestration layer** for predictable multi-step AI executions, including structured transitions, error handling, and auditability.
- Back Office Smart PIM: **AI assistance for product descriptions** directly within abstract and concrete product create and edit pages:
  - Actions to **Translate content** and **Improve content**
  - Review-before-apply workflow to avoid accidental overwrites
- Backoffice Smart PIM: **Clear user feedback when AI is not configured or unavailable**:
  - Validates provider credentials before calling external AI services
  - Shows user-facing error messages instead of silent empty responses
  - Logs operator-friendly errors without exposing secrets
  - UI safeguard disables AI actions with an explanatory tooltip when AI is not configured

**Business benefits**
- Higher adoption and trust in AI features due to clear error states and safer interaction patterns.
- Faster catalog enrichment through translation and content improvement with less manual effort and fewer review loops.
- Foundation for advanced B2B agent scenarios through context continuity and orchestrated workflows.
- Improved governance and auditability through workflow execution traceability.

**Documentation**
- [Smart Product Management](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/smart-product-management/smart-product-management.html)
- [Install Smart Product Management](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/smart-product-management/install-smart-product-management.html)
- [Manage conversation history with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-conversation-history.html)
- [AI workflow orchestration with state machines](/docs/dg/dev/ai/ai-foundation/ai-foundation-workflow-state-machine.html)

### Spryker AI Dev SDK: Additional MCP Tools for Spryker-Aware AI Development {% include badge.html type="early-access,improvement" %}

Expands MCP tooling to make Spryker context retrieval, module discovery, documentation grounding, and demo data manipulation faster and more reliable for AI-assisted development.

**Key capabilities**
- Added `getSprykerModuleMap` MCP tool to return **comprehensive module information**, including:
  - Paths and core API components (Facade, Client, Service, Config)
  - Available plugin interfaces and extension points
- Added `getSprykerModules` MCP tool to return a **simplified flat list** of unique module names for efficient discovery and reduced token usage.
- Added a **Spryker documentation** MCP tool supporting:
  - Docs web URL
  - GitHub tree URL for the markdown source
  - GitHub API URL for raw markdown retrieval
- Added **read-only database access** tooling for agents to retrieve required information without manual user intervention (SQL query input).
- Added MCP tools to accelerate **import/demo data workflows**:
  - CSV structure analysis (without loading full content)
  - CSV transform operations (update/replace/append)
  - Row deletion by filter criteria
  - ODS-to-CSV export per sheet (supporting Google Sheets → Spryker import pipelines)

**Business benefits**
- Faster and more accurate AI-assisted development through Spryker-aware context (module APIs, extension points, docs grounding).
- Reduced onboarding time and fewer integration mistakes for developers and agents.
- Improved productivity for solution teams by standardizing CSV/ODS workflows and reducing failed import cycles.
- Lower token usage and faster tool responses due to simplified module discovery outputs.

**Documentation**
- [AI Dev SDK Overview](/docs/dg/dev/ai/ai-dev/ai-dev-overview)
- [AI Dev MCP Server](/docs/dg/dev/ai/ai-dev/ai-dev-mcp-server)

### API Platform improvements {% include badge.html type="improvement" %}

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

**Documentation**
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html)
- [Code Buckets](/docs/dg/dev/architecture/api-platform/code-buckets.html)
- [Relationships](/docs/dg/dev/architecture/api-platform/relationships.html)
- [API Test Examples](/docs/dg/dev/architecture/api-platform/testing.html)

### OMS New Visual User Experience {% include badge.html type="improvement" %}

Spryker transforms the community-driven OMS visualizer into a fully validated and productized capability.

![Screenshot of the OMS visualizer showing order state machine transitions](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/2026-OMS-visualizer.png)

**Key capabilities**
- Provides a streamlined visualization of complex Order State Machines (OMS).

**Business benefits**
- Enables faster OMS iteration cycles and improves clarity when you develop or validate OMS processes.
- Reduces the time you spend debugging OMS flows by providing better visibility and tooling support.

**Documentation**
- [Original Community Contribution](https://github.com/spryker-community/oms-visualizer)
- Documentation for the productized version is coming soon.

### Messaging and scheduling modernization {% include badge.html type="improvement" %}

We introduced Symfony Messenger and Symfony Scheduler as modern, flexible alternatives to the current RabbitMQ adapter and scheduling mechanisms in Jenkins.

**Key capabilities**
- Feature toggle that lets you switch between RabbitMQ and Messenger without breaking compatibility.
- Migration path and supporting documentation to help you transition.
- Messenger becomes the default queue adapter.
- Scheduler lets you control the job schedule from within your application.

**Business benefits**
- Gain greater flexibility in queue transport configuration.
- Align scheduling with the Symfony ecosystem using a modern approach.

**Documentation**
- [Symfony Messenger](/docs/dg/dev/integrate-and-configure/integrate-symfony-messenger.html)
- [Symfony Scheduler](/docs/dg/dev/integrate-and-configure/integrate-symfony-scheduler.html)

### Secure handling of customer data in quote requests {% include badge.html type="improvement" %}

This update improves the quote request storage mechanism to ensure that the system does not unnecessarily persist sensitive customer data in version records.

Previously, the `spy_quote_request_version` table stored the complete quote JSON, which could include full company customer data, including encrypted passwords. Although the passwords were encrypted, storing them outside the dedicated customer table increased the risk of exposure and did not follow the principle of data minimization.

**Key capabilities**
- Removes unnecessary storage of sensitive customer data, such as encrypted passwords, from the `spy_quote_request_version` table.
- Ensures that customer credentials remain stored exclusively in the `spy_customer` table.
- Improves secure data handling in quote request versioning flows that the Storefront triggers.

**Business benefits**
- Reduces the risk of confidential data exposure.
- Strengthens compliance with secure data handling and data minimization principles.
- Improves overall database hygiene and reduces the attack surface.

**Documentation**
- [Quote Request](https://api.release.spryker.com/release-group/6300)

### Platform & Tooling Upgrades {% include badge.html type="improvement" %}

We have updated critical application and service components to long-term supported versions to ensure continued stability, performance, and compatibility.

**Key capabilities**
- Upgraded PHPUnit to version 12 (full PHP 8.3 support, improved test data handling).
- Upgraded PHPStan to version 2.x to reduce memory consumption and significantly improve performance.
- Upgraded Angular to the latest supported major version 20.

**Business benefits**
- Faster CI pipelines and reduced waiting times for static analysis.
- Continued alignment with PHP ecosystem and Angular support lifecycles.
  - Resolved a vulnerability in `@angular/common` affecting Spryker applications. The issue (CVE-2025-66035) allowed potential XSRF token leakage via protocol-relative URLs in Angular HTTP clients, potentially exposing CSRF tokens to attacker-controlled domains.
- Improved quality assurance and development tooling performance across projects.

**Documentation**
- [Upgrade to Angular 20](https://docs.spryker.com/docs/dg/dev/upgrade-and-migrate/upgrade-to-angular-20.html)
- [Release unlocking the new PHPUnit version](https://api.release.spryker.com/release-group/6334)
- Spryker is fully compatible with PHPStan 2.x, update it at your own schedule.

### Quality, Performance & Stability Fixes {% include badge.html type="improvement" %}

This release resolves several performance bottlenecks and technical inconsistencies identified in customer projects.

**Key capabilities**
- Improved Stock Data Import performance by removing the usage of `\ProductAbstractCheckExistenceStep` and `\ProductConcreteCheckExistenceStep`, which eliminates unnecessary full database loads.
- Preserved correct HTTP error codes by returning 4xx responses for expected application errors, such as invalid cart operations, instead of 500.
- Optimized customer session validation by removing resource-intensive password hash checks.
- Stabilized OpenTelemetry monitoring and New Relic instrumentation to prevent memory issues and improve trace grouping for Zed and Gateway traffic.
- Fixed concrete product publishing and product filter handling, including whitelist-aware category suggestions and hidden facets, to restore complete and consistent search results.
- Corrected the Data Import CSV reader configuration so that offset and limit options work as expected for partial imports.
- Restored Back Office form validation translations and eliminated redundant SQL execution in category rules.
- Improved cart behavior in the Glue API by merging guest carts with product bundles on login and introducing SKU-level quantity restriction plugins.

**Business benefits**
- Improved backend performance and reduced database and CPU load.
- Delivered more reliable and predictable product search, filtering, and category navigation for end users.
- Enabled more stable imports and storefront builds with safer customizations and improved dependency management.
- Improved Back Office and cart usability to reduce operational overhead and user friction.
- Add guidance to the public Spryker documentation on how to adopt the Cypress boilerplate.

**Documentation**
- See [Spryker Releases](https://api.release.spryker.com/release-history) or use `composer` to update all packages.
- [E2E Testing with Cypress](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html)

### Architecture Guidelines

A set of practical, reusable guidelines to reduce delivery risk, prevent recurring implementation pitfalls, and standardize engineering practices across Spryker projects.

**Key capabilities**
- **APM monitoring and troubleshooting using New Relic**
  - Standardized end-to-end troubleshooting workflow (metrics → transactions → DB queries → traces).
  - Clear mapping of New Relic entities to Spryker applications (Yves, Zed, Glue, Merchant Portal).
  - Practical examples for diagnosing common performance issues.
- **Performance best practices: common challenges and optimization strategies**
  - Documented top recurring performance pitfalls from real projects (symptoms, root cause patterns, proven optimizations).
  - Guidance on recognizing issues via response time, query patterns, and logs.
- **How to start a Spryker project**
  - Step-by-step setup guidance covering project structure, CI/CD basics, team practices, and quality tooling.
  - Focus on "must-do" principles to avoid rework and long-term quality degradation.

**Business benefits**
- Faster onboarding for partners and new project teams through standardized, actionable guidance.
- Reduced escalation rate by addressing known recurring delivery and performance pitfalls early.
- Improved project consistency and upgradeability through repeatable architecture and documentation patterns.
- Better diagnosability and prevention of performance degradation with a shared troubleshooting methodology.

**Documentation**
- [APM — New Relic based troubleshooting](/docs/dg/dev/guidelines/performance-guidelines/apm-newrelic-based-troubleshooting.html)
- [Perfromance best practices](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines.html)
- [Updated how to start Spryker project](/docs/dg/dev/development-getting-started-guide.html)

### Architecture as Code for Spryker projects

Live, version-controlled architecture documentation using industry standards that scales with your codebase. Enables team collaboration, decision traceability, and onboarding without custom tooling or specialized training.

**Key capabilities**
- Ready-to-use architecture templates for living, version-controlled architecture documentation that evolves with your code, based on arc42 (12 sections) and the C4 model (4-level visualization).
- Traceable architectural decision templates through Solution Designs (RFC-style exploration) and ADRs.
- Diagrams as code using Mermaid and PlantUML, with real examples for automated validation, generation, and AI analysis.

**Business benefits**
- Faster onboarding - with globally-recognized standards and all needed architecture documentation in one place - your code
  - Better decision making - RFC-style exploration and full decision history eliminate tribal knowledge
  - Alignment with business - Capture project requirements, trade-offs before implementation, ensuring delivery matches intent. Evolve further with architecture decision records  and Solution designs
  - AI-ready format - Markdown and code-based diagrams enable intelligent automation and documentation generation

**Documentation**
- [Architecture as a Code](/docs/dg/dev/architecture/architecture-as-code.html)

### ERP Integration Template

Provides a standardized foundation for building ERP integrations without starting from scratch.

**Key capabilities**
- Reusable module structure (Client and Shared layers) with transfer object definitions.
- Pre-built base classes (`BaseRequest`, `BaseRequestBuilder`) for:
  - Request handling and timeout configuration
  - Headers and authentication
  - Logging and error management
- Request/response mapper pattern for ERP-specific format transformations.
- Guzzle client configuration guidance with environment-specific credentials and connection setup.

**Business benefits**
- Faster ERP integration development with reduced boilerplate.
- Consistent architecture across projects and ERP systems.
- Lower risk of integration defects due to standardized logging and error handling.
- Improved maintainability and onboarding for new ERP integrations.

**Documentation**
- [ERP Integration Template](/docs/integrations/custom-building-integrations/erp-integration-template.html)

### Payment Integration Template (PSP Template)

Delivers a production-ready template repository for building payment service provider (PSP) integrations.

**Key capabilities**
- Covers all mandatory integration touchpoints with the SCCOS that must be considered when integrating a payment provider (business logic, configurations, OMS, frontend forms)  and payment lifecycle handling, with practical implementation examples.
- Support for core payment flows: **Authorize → Capture → Cancel**.
- Two payment method templates (for example Credit Card, Invoice) including:
  - OMS state machines for synchronous and asynchronous authorization.
- Webhook infrastructure:
  - Payload logging
  - Signature validation
  - Route provider setup
- Data import configuration with payment method CSV templates and glossary translations (EN, DE).
- Automated module renaming and setup guidance to accelerate project adoption.
- Comprehensive integration checklist to ensure no required system part is missed during implementation.

**Business benefits**
- Reduced development time for new PSP integrations
- Consistent payment architecture and OMS alignment across projects.
- Improved reliability through standardized webhook and lifecycle handling.
- Clear separation of module developer and project integrator responsibilities.

**Documentation**
- [PSP Integration Template](/docs/integrations/custom-building-integrations/psp-integration-template.html)

### New Algolia Eco-Module Integration

Replaces the legacy Algolia App model with a code-visible eco-module.

**Key capabilities**
- New Algolia integration as a standard Spryker eco-module.
- Full code visibility and extensibility for customers and partners.
- Support for current Algolia Search license–related features.
- Updated documentation for integration and customization.

**Business benefits**
- Increased flexibility and customization options.
- Reduced dependency on black-box App Spryker support and evolution implementations.
- Better alignment with project-level architecture and extension patterns.

**Documentation**
- [Integrate Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/integrate-algolia.html)

## Efficient and Flexible Cloud Foundation

### Cloud Self-Service Portal update {% include badge.html type="improvement" %}

The Cloud Self-Service Portal is now available on a new platform that improves usability and accelerates value delivery.

{% include carousel.html
   images="
   https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/cloud-hub1.png||::
   https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/cloud-hub2.png||::
   https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/release-notes-202602/cloud-hub3.png||"
%}

**Key capabilities**
- Spryker has moved the Cloud Self-Service Portal to a new platform to provide a better user experience and faster value delivery.
- In the new portal, you can access centralized Single Sign-On (SSO) management.

**Business benefits**
- Provides a structured migration path to Single Sign-On (SSO) to help you simplify access management.

**Portal access** 
- [Customer Portal](https://portal.spryker.com/)

### RabbitMQ 4.1 rollout {% include badge.html type="improvement" %}

This update completes the rollout of RabbitMQ 4.1 across all platform environments.

**Key capabilities**
- Upgrade to RabbitMQ 4.1 for improved messaging infrastructure.
- Platform-wide rollout to ensure consistency across environments.

**Business benefits**
- Improved stability and performance of asynchronous processing.
- Enhanced scalability for event-driven workloads.
- Reduced operational risk through alignment with the latest supported messaging version.

**Documentation**
- [Docker SDK service configuration](/docs/dg/dev/integrate-and-configure/configure-services.html)
- [System Requirements](/docs/dg/dev/system-requirements/latest/system-requirements.html)

### Security RSS feed: Docker image updates {% include badge.html type="improvement" %}

This update integrates Docker image security release notes into the official Spryker security RSS feed, ensuring timely notifications for infrastructure updates.

**Key capabilities**
- RSS Feed Integration: Docker image security releases are now automatically published to the security RSS stream (/feed-security.xml)
- Automated Visibility: Real-time visibility of image-related security patches alongside standard application news.

**Business benefits**
- Improved Security Posture: Ensures DevOps and Security teams are immediately alerted to infrastructure-level vulnerabilities and patches.
- Streamlined Compliance: Easier tracking and auditing of container image versions through a centralized, standardized feed.
- Proactive Maintenance: Reduces the window of exposure by eliminating the need to manually check for image updates.

**Documentation**
- [Spryker Security RSS Feed](/feed-security.xml)
- [Release notes](/docs/about/all/releases/product-and-code-releases.html)
