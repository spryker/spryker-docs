---
title: Release notes 202608.0
description: Release notes for Spryker Cloud Commerce OS version 202608.0
last_updated: August 29, 2026
template: concept-topic-template
---

## B2B Business-Ready Commerce Experiences

### Workflows {% include badge.html type="feature,early-access" %}

This release introduces a workflows infrastructure that lets teams model and manage workflows for different business entities directly in the Back Office, without requiring code changes or deployment. It provides a reusable, auditable, and versioned workflows foundation built on top of the existing state machine engine.

**Key capabilities:**
- Create and adjust workflows directly in the Back Office, including states, transitions, events, conditions, and timeouts that define each process
- Manage workflow versions and control which version is active
- Monitor workflow progress across different entities, with support for project-specific requirements

**Business benefits:**
- Enables business teams to create and adjust workflows faster without developer involvement
- Reduces duplication by replacing one-off workflow implementations with one reusable infrastructure
- Improves governance through versioned definitions and controlled building blocks

**Documentation:**
- [Workflows feature overview](https://docs.spryker.com/docs/pbc/all/back-office/latest/base-shop/workflows-feature-overview)
- [Workflows installation guide](https://docs.spryker.com/docs/dg/dev/integrate-and-configure/integrate-workflow-feature)

### Spryker Design System Storefront {% include badge.html type="improvement" %}

This release extends the Spryker Design System in the storefront by modernizing the product listing page and merchant profile page. It helps create a more consistent buying journey for B2B customers while giving teams a scalable foundation for future storefront enhancements.

**Key capabilities:**
- Modernized product listing page based on the B2B design system
- Added a reusable merchant page template for consistent merchant content
- Expanded the storefront design foundation introduced in earlier design-system phases

**Business benefits:**
- Improves product discovery with a more consistent and efficient browsing experience
- Increases storefront visual consistency for B2B buyers
- Reduces future design and development effort through reusable page structures

### Recurring Orders: general availability {% include badge.html type="feature" %}

Recurring Orders is now generally available. This release gives buyers real control over an upcoming order before it is placed. They can handle the exceptions that used to break a schedule f.e. swapping in a replacement when a product is discontinued, adjusting quantities, adding products that were missed and decide whether each change applies once or permanently. Budget problems can be corrected by the buyer directly rather than raised as a ticket

**Key capabilities:**
- Adjust an upcoming order before it is placed: replace an item that is no longer available, add or remove lines, and change quantities.
- Choose whether a change applies to the next delivery only or to every delivery from now on.
- Move an order to a different budget or cost center without cancelling the schedule.
- Resolve an order that is in review because of an exceeded budget.
- Proactively editing for Schedule Name, Frequency, Budget & Cost Center, Next Execution date
- Run schedules with up to 200 line items, at the speed buyers expect across list, overview, and review screens.

**Business benefits:**
- Supply continuity. A missed replenishment can stop a production line. Schedules that survive real-world exceptions keep materials arriving without anyone watching the calendar.
- Procurement capacity freed up. Repeat orders are already-made decisions. Automating them lets buyers spend their time on sourcing, not re-keying the same basket.
- Spend stays inside the guardrails. Budget and cost center governance travels with every scheduled order, so automation never becomes a route around approval control.
- Stickier customers. A buyer who runs replenishment through your storefront has embedded you in their production workflow, switching becomes a procurement project, not a price comparison.


**Documentation:**
- [Recurring Orders feature overview](https://docs.spryker.com/docs/pbc/all/order-experience-management/latest/base-shop/feature-overviews/recurring-orders-feature-overview)
- [Install the Recurring Orders feature](https://docs.spryker.com/docs/pbc/all/order-experience-management/latest/base-shop/install-and-upgrade/install-features/install-the-recurring-orders-feature)
- [Recurring Orders GA release](https://api.release.spryker.com/release-group/6689)

### Algolia API update {% include badge.html type="improvement" %}

The Algolia integration has been updated to use the newer PHP client version. This change helps keep the integration aligned with the supported Algolia SDK lifecycle and reduces risk related to the older client reaching the end of SLA.

**Key capabilities:**
- Updates the integration to the newer Algolia PHP client version
- Aligns the integration with Algolia's current supported SDK direction
- Prepares customers for continued use without relying on an outdated client

**Business benefits:**
- Reduces support and lifecycle risk for customers using the Algolia integration
- Improves confidence in long-term maintainability
- Helps customers stay current with less ambiguity around SDK support status

**Documentation:**
- [Algolia module update](https://github.com/spryker-eco/algolia/releases/tag/2.0.0)
- [Migration guide](https://docs.spryker.com/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/upgrade-the-algolia-module)


### Vertex Back Office Configuration {% include badge.html type="feature" %}

The Vertex configuration page in the Back Office has been updated to reflect the new integration and replace legacy App Composition Platform-oriented fields. This makes the setup clearer and better aligned with the current Vertex integration experience.

**Key capabilities:**
- Updates Vertex configuration fields in the Back Office
- Replaces legacy field structure inherited from the previous ACP-based setup
- Aligns configuration with the new integration model

**Business benefits:**
- Simplifies Vertex setup for business and implementation teams
- Reduces confusion caused by outdated configuration fields
- Helps shorten implementation and configuration time

**Documentation:**
- [Configure Vertex in the Back Office](https://docs.spryker.com/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/configure-vertex-in-the-back-office)

## Connected, and AI-Enabled Platform

### AI Dev SDK: Introduce Project Upgrade Helper {% include badge.html type="feature,early-access" %}

The AI Dev SDK now includes an AI-assisted upgrade workflow for customized Spryker projects. It carries a project from its current release to the target one, adopting major module releases into existing project code and verifying the result against a running application. Team checkpoints keep release choice and feature adoption under explicit control.

**Key capabilities:**
- Moves a customized project onto the target Spryker release and resolves the dependency work automatically
- Adopts major module releases into project code by applying the official migration guides to existing customizations
- Realigns customizations, including customized storefront and Back Office screens, with the updated platform
- Verifies the upgraded project against a running application, covering artifact regeneration, tests, and key pages
- Keeps release choice and new feature adoption under team control at defined checkpoints
- Records progress and findings so an upgrade can pause, resume, and run as repeatable CI checks

**Business benefits:**
- Turns weeks of manual upgrade investigation into a guided, largely automated run
- Keeps existing customizations working instead of quietly going dead after an upgrade
- Adopts new platform capabilities only when the team chooses them
- Makes upgrades reviewable and resumable across sprints

**Documentation:**
- [AI Dev SDK Upgrade Workflow](https://docs.spryker.com/docs/dg/dev/ai/ai-dev/ai-dev-upgrade-workflow)


### AI Dev SDK: Introduce Project Setup Wizard {% include badge.html type="feature,early-access" %}

The AI Dev SDK now provides a guided setup wizard for new Spryker B2B Marketplace projects based on a fresh demoshop clone. It captures project decisions once and applies them through a resumable setup workflow. This helps teams move faster from initial clone to a verified, project-shaped shop.

**Key capabilities:**
- Runs a guided setup interview covering project identity, services, stores, localization, CI, and run mode
- Applies setup decisions through orchestrated steps with resume support if the process is interrupted
- Produces setup artifacts, verification results, and a summary of remaining manual actions

**Business benefits:**
- Reduces time and effort needed to initialize a new project
- Improves consistency across early project setup decisions
- Gives teams a clearer and more reliable path to a ready-for-scope development environment

**Documentation:**
- [AI Dev SDK Project Starter Wizard](https://docs.spryker.com/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard)

### AI Dev SDK: Autonomous Bugfixer & Improved Customization Workflow {% include badge.html type="early-access" %} {% include badge.html type="feature" %}

The AI Dev SDK introduces a new guided workflow for turning bug reports into validated project changes and improves the existing workflow for feature requests. Teams can start with plain-language input and follow an orchestrated path through planning, implementation, verification, and review, while retaining decision-making throughout the workflow and reviewing and approving changes before they are delivered.

**Key capabilities:**
- Improves feature implementation from request intake through acceptance criteria, implementation planning, coding, and verification
- Supports bug fixing from symptom or ticket intake through reproduction, root-cause analysis, minimal fix, testing, QA, and final verification
- Produces traceable reports and supports collaborative or autonomous execution modes

**Business benefits:**
- Speeds up delivery from request or incident to validated change
- Reduces manual handoffs across implementation, QA, and review steps
- Improves consistency and traceability in AI-assisted development workflows

**Documentation:**
- [AI Dev SDK Bugfix Workflow](https://docs.spryker.com/docs/dg/dev/ai/ai-dev/ai-dev-bugfix-workflow)
- [AI Dev SDK Customization Workflow](https://docs.spryker.com/docs/dg/dev/ai/ai-dev/ai-dev-customization-workflow)

### AI Commerce: Configurable Instructions Prompt {% include badge.html type="improvement,early-access" %}

AI Commerce feature prompts can now be configured consistently through the Back Office across the platform, rather than being hardcoded in the codebase. This applies to capabilities such as Search by Image, Visual Add-to-Cart, the Back Office Assistant, and Smart PIM.

Teams can customise prompts more easily to reflect project-specific language, tone, and business requirements, without requiring deployments or support from developer teams.

**Key capabilities:**
- Moves prompt definitions to configurable project-level settings with default values provided out of the box
- Supports prompt customization without changing the codebase
- Enables easier tuning of AI behavior for specific catalogs, industries, and branding needs

**Business benefits:**
- Makes AI Commerce features easier to adapt for different business contexts
- Reduces custom code and upgrade friction in AI Commerce projects
- Shortens iteration cycles for prompt tuning and testing

**Documentation:**
- [AI Commerce Overview](https://docs.spryker.com/docs/dg/dev/ai/ai-commerce/ai-commerce-overview)

## Efficient and Flexible Cloud Foundation

### Enhancements to Symfony Scheduler

We improved scheduled job management to give teams more control and better visibility in the Back Office and PaaS environment. You can now manage job execution more easily, run multiple schedules in parallel within the same container, and review richer operational logs and status information.

**Key capabilities:**
- Start, stop, enable, and disable scheduled jobs from the Back Office
- Run multiple scheduled jobs in parallel in the same container to reduce infrastructure overhead
- View job status details such as running, waiting, error state, worker name, timing, priority, and error logs of the last run

**Business benefits:**
- Reduces operational effort for managing scheduled jobs
- Improves transparency for support and business teams through better job visibility
- Helps optimize infrastructure usage and costs

**Release:**
- [Enhancements to Symfony Scheduler](https://api.release.spryker.com/release-group/6718)

### Maintenance and Service Updates {% include badge.html type="improvement" %}

We delivered routine maintenance and service updates across the cloud foundation to keep environments secure, reliable, and aligned with current technology standards. These updates introduce PHP 8.5 as the default runtime version, add initial support for OpenSearch 2.x and 3.x, and establish the foundation for migrating from AWS OpenSearch 1.x.

**Key capabilities:**
- Added PHP 8.5 support to Docker SDK PHP images and enabled it as the default version. PHP 8.2 images are still available, while discontinuing further image generation for that version [after 2026](https://www.php.net/supported-versions.php)
- Added compatibility for indexing, reading, and writing data with newer OpenSearch versions.
- Support for the newer OpenSearch version in Spryker PaaS comes in the next release.

**Business benefits:**
- Improves security and stability through up-to-date platform components
- Helps teams remain aligned with supported PHP and OpenSearch technology versions
- Reduces operational risk and technical debt

**Documentation:**
- [Upgrade to PHP 8.5](https://docs.spryker.com/docs/dg/dev/upgrade-and-migrate/upgrade-to-php-85)
- [Supported versions of PHP](https://docs.spryker.com/docs/dg/dev/supported-versions-of-php)
- [OpenSearch migration to 3.5](https://docs.spryker.com/docs/pbc/all/search/latest/base-shop/install-and-upgrade/migrate-from-opensearch-1.3-to-3.5)

### Frontend builder for Yves moved into ShopUi {% include badge.html type="improvement" %}

We moved the Yves builder into ShopUi and introduced a cleaner extension approach for project-level customization. This makes the builder more reusable, configurable, and easier to maintain across projects.

**Key capabilities:**
- Builder logic is now centralized in ShopUi instead of the project layer
- Project teams can extend entry paths, discovery paths, and namespaces through configuration
- Supports project-level overrides without changing module internals

**Business benefits:**
- Reduces customization effort for frontend builds
- Improves maintainability and reuse across projects
- Simplifies frontend setup while preserving existing storefront behavior

**Documentation:**
- [Frontend builder for Yves v2](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves-v2)
- [Upgrade to frontend builder v2 for Yves](docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-yves)

### Dynamic multistore locale visibility fixes {% include badge.html type="improvement" %}

We fixed an issue where adding a new locale via Dynamic Multistore could result in products, category trees, and navigation not being visible as expected.

**Key capabilities:**
- Correctly populates entities with data for newly added locales
- Restores product visibility for newly added locales
- Ensures category trees and navigation are displayed correctly after locale addition


**Business benefits:**
- Reduces setup issues when expanding into new locales
- Helps teams launch localized storefronts with fewer manual corrections
- Ensures consistent and complete entity data across stores and locales

**Documentation:**
- [Adjusted editing navigation for new locale](https://api.release.spryker.com/release-group/6658)

### Customer login consistency improvements {% include badge.html type="improvement" %}

We fixed an issue that could break login behavior when a customer signed in from different places.

**Key capabilities:**
- Improves login handling across multiple customer sessions
- Prevents disruptions caused by parallel or distributed login activity
- Stabilizes customer authentication behavior

**Business benefits:**
- Reduces customer login friction
- Improves reliability of the customer account experience
- Lowers support effort related to authentication issues

**Documentation:**
- [Fixed session handler to avoid behavior inconsistency](https://api.release.spryker.com/release-group/6656)

### Reservation aggregation across multiple plugins {% include badge.html type="improvement" %}

We introduced a new, more flexible plugin stack for reservation calculation. The new mechanism executes all configured reservation aggregation plugins, ensuring that reservation data is processed completely and accurately.

**Key capabilities:**
- Executes multiple reservation aggregation plugins in sequence
- Prevents incomplete aggregation when reservations span multiple stores or warehouses
- Avoids incorrect merging behavior during reservation processing
- Provides a more flexible foundation for extending reservation calculation logic

**Business benefits:**
- Improves inventory and reservation accuracy
- Supports more complex multi-store and warehouse setups
- Reduces risk of stock inconsistencies

**Documentation:**
- [Install the Packaging Units feature](https://docs.spryker.com/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-packaging-units-feature#set-up-behavior)
- [Install the Marketplace Inventory Management + Order Management feature](https://docs.spryker.com/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-order-management-feature#prerequisites)
- [Install the Marketplace Inventory Management + Packaging Units feature](https://docs.spryker.com/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-packaging-units-feature#set-up-behavior)
- [Multistore reservation aggregation](https://api.release.spryker.com/release-group/6611)
- [Fix reservation aggregation request expander](https://api.release.spryker.com/release-group/6676)

### API Platform nested object schema support {% include badge.html type="improvement" %}

We extended API Platform resource YAML so a list of objects can declare its element shape. A `type: array` property with a sibling items block now publishes the element as a referenced component schema, instead of a bare untyped array. Single nested objects were already typed; this closes the gap for collections.

Key capabilities:
- Declare `items: {type: object, properties: …}` alongside `type: array` in a resource schema
- The generated OpenAPI document references a generated element schema and registers it in the same document
- Lists of scalars and canonical (shared) object shapes are supported
- Existing providers keep working — assigning raw arrays is still valid; no provider rewrite required

Adoption is per field, and opt-in for a reason: a typed element is a closed shape. Adding items to a list that is already part of a released response silently drops every payload key you did not declare. Before adopting an existing field, diff a real response payload against your intended items.properties. New fields are unaffected. Storefront APIs are unchanged.

Note: openapiContext.items is documentation passthrough only — it generates nothing. Only a sibling of type: array produces a typed element schema.

Documentation:
- [Typed collections in the published contract](/docs/integrations/spryker-api/api-platform/typed-collections.html)
- [Object collections](/docs/integrations/spryker-api/api-platform/resource-schemas.html#object-collections)

### Graceful handling of email delivery failures {% include badge.html type="improvement" %}

We improved email sending mechanisms across Storefront, Back Office, Merchant Portal, and API to handle delivery failures gracefully without causing system errors or disrupting application workflows.

**Key capabilities:**
- Prevents email delivery failures from interrupting or causing the failure of primary business processes, including cases where email addresses or domains are not whitelisted in AWS SES sandbox mode.
- Displays clear, non-disruptive error messages with error codes in the Storefront, Merchant Portal, and Back Office, while allowing the primary user action to complete successfully.
- Records comprehensive details for every email delivery failure, including the email type, sender, recipients, and relevant exception details.
- Logs email delivery failures that occur during Order Management System (OMS) processing without halting execution or leaving orders stuck.
- Standardizes REST/Glue API responses to return a 422 Unprocessable Entity status code instead of a 500 Internal Server Error

**Business benefits:**
- Delivers a smooth user experience by preventing app crashes during email failure scenarios
- Reduces support overhead and troubleshooting effort for technical and operations teams

**Documentation:**
- [Email service](/docs/ca/dev/email-service/email-service)
- [Email deliverability](/docs/ca/dev/email-service/email-deliverability)

### Community contributions {% include badge.html type="improvement" %}

We included several community-driven improvements in this release. These contributions help improve compatibility and code quality in commonly used modules.

**Key capabilities:**
- Made QuoteApproval compatible with PropelBehavior
- Replaced docblocks with typed class constants in Transfer
- Added support for sensitive properties in Transfer

**Business benefits:**
- Brings practical enhancements contributed by the community
- Improves maintainability, security, and compatibility in key modules
- Strengthens collaboration across the Spryker ecosystem

**Documentation:**
- [New community PR: Make QuoteApproval compatible to PropelBehavior](https://api.release.spryker.com/release-groups/6664)
- [New community PR: Add support of sensitive properties](https://api.release.spryker.com/release-group/6657)
