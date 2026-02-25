---
title: Release notes 202602.0
description: Release notes for Spryker Cloud Commerce OS version 202602.0
last_updated: February 28, 2026
template: concept-topic-template
---

Spryker Cloud Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and improvements.

For information about installing Spryker, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## B2B Business-Ready Commerce Experiences

### Product Attachments <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Introduces out-of-the-box Product Attachments capability commonly required in industrial B2B purchasing.

#### Key capabilities:
* **Product attachments** support:
  * Back Office management of product-related documents (for example, datasheets, certificates, manuals).
* Provide external links to product attachments via data import.
  * Display and download/view attachments on the Product Detail Page.

#### Business benefits:
* Supporting buyers' decisions by providing more detailed product information.
* Removes approval bottlenecks and shortens the path from product view to first transaction.

#### Documentation:

### Product & Merchant Offer Availability Display <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Introduces native, configurable product and merchant offer availability display for B2B Commerce and Marketplace scenarios, reducing customization and increasing buyer confidence at the point of decision.

#### Key capabilities:
* Native availability display on PDP and Cart
* Configurable display logic:
  * Availability indicator only (e.g., Available / Out of Stock)
  * Exact stock quantity combined with indicator
  * Configurations option for the sort order of the Merchant Offers within B2B Marketplace
* Built on existing Spryker stock data structures

#### Business benefits:
* Buyers see reliable availability information at the point of decision.
* Businesses no longer need custom implementations for basic stock visibility.
* Transparent stock visibility increases direct orders and reduces operational overhead.

#### Documentation:

### Backoffice Configuration Framework <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span> <span class="inline-img">![early-access](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/early-access.png)</span>

Introduces a structured, extensible framework to expose business-relevant configuration directly in the Spryker Back Office without code changes or redeployments.

#### Key capabilities:
* Structured Business Configuration via UI
  * Developers define configuration options in YAML once.
  * The framework automatically renders validated Back Office UI pages.
* Runtime Configuration Without Deployment
  * Configuration changes are applied at runtime, no code change, no pull request, no deployment required.
* Support for Out-of-the-Box and Custom Features. The framework works for:
  * Standard Spryker features
  * Project-specific customizations
* Built-in Validation & Guardrails
  * Business users can only adjust explicitly defined and validated options, preventing misconfiguration.

#### Business benefits:
* Faster Time to Change
  * Business teams adjust approved behaviors instantly, no development sprint required.
* Lower Total Cost of Change
  * Reduces repetitive engineering effort for configuration updates and eliminates custom UI builds per feature.
* Faster Experimentation
  * Test different configuration setups (e.g., display logic, marketplace sorting) without waiting for release cycles.

#### Documentation:

### B2B-only Mode Enablement

Reduces project set up time for customers and partners who want B2B Commerce only, without marketplace complexity.

#### Key capabilities:
* Added a **guideline and deployment script** to start the unified demo shop in a standardized **B2B Commerce–only mode**, reducing required manual cleanup and configuration.

#### Business benefits:
* Faster project initialization for B2B-only projects.
* Lower implementation cost and reduced efforts.
* Clearer positioning and smoother kick-off experience.

#### Documentation:

### New Industrial Homepage Sample Data <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

The new sample data allows you to explore more realistic B2B Commerce journeys and capabilities without needing to import your own data.

#### Key capabilities:
* Updated homepage content to industrial goods and services across key blocks (banners, featured categories, featured products, top sellers).

#### Business benefits:
* More realistic demos that reflect real industrial buying journeys.
* Faster evaluations by showing realistic catalog and merchandising scenarios out of the box.
* Less manual demo preparation for partners and solution teams.

#### Documentation:

## Connected, and AI-Enabled Platform

### Spryker AI Foundation: Operable, Structured, and Extensible AI Runtime <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Enhances the AI Foundation runtime layer to make AI executions easier to operate at scale, safer to integrate into product code, and more extensible for evolving use cases.

#### Key capabilities:
* Prompt responses now return **token usage** and **applied AI configuration details** (for example, provider/vendor, model, configuration name, and relevant parameters) for improved transparency and troubleshooting.
* Added **structured response support** aligned with **Spryker Transfers**, enabling validated, contract-based AI outputs rather than fragile free-text parsing.
* Introduced a supported **tool call extension mechanism** for AI Foundation, enabling standardized enrichment of tool call inputs/outputs without project-specific integration workarounds.
* **Persistent AI interaction audit logging**: AI interactions can now be stored in the database, capturing prompt, response, token usage, model and configuration details, timing, and metadata to enable traceability, troubleshooting, and compliance reporting.

#### Business benefits:
* Improved cost and performance control through token visibility and configuration traceability.
* Faster debugging and higher reproducibility across environments by knowing exactly which model/config produced an output.
* More reliable production integrations through typed, validated AI outputs (reduced downstream breakage from phrasing changes).
* Lower long-term maintenance and support effort via a standardized extension mechanism for evolving AI use cases.
* Improved governance and compliance readiness through a queryable audit trail of AI interactions (for example, EU AI Act aligned traceability).
* Faster incident resolution and higher confidence iteration through end to end traceability, session reconstruction, and prompt lineage analysis.

#### Documentation:
* [AI Foundation Developer Guide](https://docs.spryker.com/docs/scos/dev/ai-foundation/overview.html)

### Spryker AI Commerce: Agent Foundations and Smart PIM Improvements

Adds foundational capabilities for advanced agent workflows and improves Backoffice Smart PIM with safer, more reliable AI-assisted product description support.

#### Key capabilities:
* **Conversation history** support to maintain context across interactions, enabling better multi-step workflows.
* Introduced a **workflow orchestration layer** for predictable multi-step AI executions, including structured transitions, error handling, and auditability.
* Backoffice Smart PIM: **AI assistance for product descriptions** directly within abstract and concrete product create/edit pages:
  * Actions to **Translate content** and **Improve content**
  * Review-before-apply workflow to avoid accidental overwrites
  * Localized UI text (EN/DE)
* Backoffice Smart PIM: **Clear user feedback when AI is not configured or unavailable**:
  * Validates provider credentials before calling external AI services
  * Shows user-facing error messages instead of silent empty responses
  * Logs operator-friendly errors without exposing secrets
  * Optional UI safeguard: disables AI actions with an explanatory tooltip when AI is not configured

#### Business benefits:
* Higher adoption and trust in AI features due to clear error states and safer interaction patterns.
* Faster catalog enrichment through translation and content improvement with less manual effort and fewer review loops.
* Foundation for advanced B2B agent scenarios through context continuity and orchestrated workflows.
* Improved governance and auditability through workflow execution traceability.

#### Documentation:

### Spryker AI Dev SDK: Additional MCP Tools for Spryker-Aware AI Development <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Expands MCP tooling to make Spryker context retrieval, module discovery, documentation grounding, and demo data manipulation faster and more reliable for AI-assisted development.

#### Key capabilities:
* Added `getSprykerModuleMap` MCP tool to return **comprehensive module information**, including:
  * Paths and core API components (Facade, Client, Service, Config)
  * Available plugin interfaces and extension points
* Added `getSprykerModules` MCP tool to return a **simplified flat list** of unique module names for efficient discovery and reduced token usage.
* Added a **Spryker documentation** MCP tool supporting:
  * Docs web URL
  * GitHub tree URL for the markdown source
  * GitHub API URL for raw markdown retrieval
* Added **read-only database access** tooling for agents to retrieve required information without manual user intervention (SQL query input).
* Added MCP tools to accelerate **import/demo data workflows**:
  * CSV structure analysis (without loading full content)
  * CSV transform operations (update/replace/append)
  * Row deletion by filter criteria
  * ODS-to-CSV export per sheet (supporting Google Sheets → Spryker import pipelines)

#### Business benefits:
* Faster and more accurate AI-assisted development through Spryker-aware context (module APIs, extension points, docs grounding).
* Reduced onboarding time and fewer integration mistakes for developers and agents.
* Improved productivity for solution teams by standardizing CSV/ODS workflows and reducing failed import cycles.
* Lower token usage and faster tool responses due to simplified module discovery outputs.

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

### Performance & Stability Fixes <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

**Key capabilities**
- Improved Stock Data Import performance by removing usage of `\ProductAbstractCheckExistenceStep` and `ProductConcreteCheckExistenceStep` to eliminate unnecessary full database loads.
- Multiple other bugfixes and improvements.

**Documentation:**
- See [Spryker Releases](https://api.release.spryker.com/release-history) or use `composer` to upodate all packages.

## Efficient and Flexible Cloud Foundation

### Lorem Ipsum

Lorem Ipsum
