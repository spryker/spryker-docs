---
title: Back Office Configuration Framework
description: A scalable, standardized way to expose business-relevant configuration options directly in the Backoffice, without requiring code changes or redeployment.
template: concept-topic-template
last_updated: Feb 23, 2026
label: early-access
---

The Back Office Configuration Framework is a structured approach to exposing business-relevant configuration options directly in the Spryker Back Office. Instead of defining configuration in code or YAML files that require redeployment, businesses can manage defined behaviors through structured UI pages. Developers define configuration options once in YAML, and the framework automatically renders them as configurable Back Office interfaces.

---

## Business problems it solves

Managing configuration in traditional commerce platforms creates friction between technical and business teams:

- Configuration changes require developer involvement, code modifications, and a full deployment cycle.
- Business teams depend on IT to adjust behaviors that are fundamentally business decisions.
- YAML and code-level configuration is inaccessible to non-technical stakeholders and prone to error.
- Each configuration change introduces risk, slows down operations, and increases the total cost of change.

The Back Office Configuration Framework addresses these challenges by creating a clear, controlled boundary between what developers define and what business users can adjust.

---

## Key value for your business

- **Faster time to change**
  Business users adjust configured behaviors directly in the Back Office. No code change, no pull request, no deployment required.

- **Reduced operational risk**
  Configuration is exposed through structured, validated UI pages. Business users work within defined options rather than editing raw configuration files.

- **Developer efficiency**
  Developers define configuration options once in YAML. The framework handles rendering, validation, and persistence automatically, eliminating repetitive UI work.

- **Consistent experience**
  All configuration pages follow the same structure and interaction patterns, making it easier for business users to navigate and manage settings across features.

- **Extensibility by design**
  The framework supports both out of the box Spryker features and project-specific customizations, so teams can introduce new configurable behaviors without building new infrastructure.

---

## Who benefits and how

### For business leaders

- **Lower cost of change**
  Adjusting business behaviors no longer requires a development sprint or deployment window. Teams can respond to market conditions and business needs faster.

- **Reduced dependency on IT**
  Business teams gain direct control over selected configuration options without needing to involve developers for every adjustment.

- **Stable, governed configurability**
  The framework exposes only explicitly defined options. Business users operate within guardrails set by the development team, reducing the risk of misconfiguration.

### For product and commerce teams

- **Self-service configuration**
  Manage feature behavior directly from the Back Office, using familiar UI patterns. No need to understand YAML syntax or request a deployment.

- **Faster iteration**
  Test different configurations, observe results, and adjust without waiting for a release cycle.

- **Visibility into configurable options**
  All available configuration options are surfaced in one place, making it easy to understand what can be changed and what the current settings are.

### For developers and architects

- **Define once, render automatically**
  Declare configuration options in YAML. The framework generates the corresponding Back Office UI, saving significant development and maintenance effort.

- **Separation of concerns**
  Configuration definition stays with the developer; configuration management becomes a business user activity. This boundary is enforced by the framework.

- **Standardized patterns**
  Avoid building custom configuration UIs for each feature. The framework provides consistent infrastructure that all teams benefit from.

---

## Key capabilities

### Support for out of the box and custom features

The framework supports configuration for existing Spryker out of the box features as well as project-specific customizations. Teams can use it to expose configuration options for both standard platform capabilities and bespoke features built for a specific project.

### Structured and controlled business configurability

Selected business-relevant configuration moves from code level to UI level without exposing low-level technical complexity. The developer controls which options are available, what values are valid, and how they are presented. The business user controls what value is set, within those defined parameters.

### First out of the box implementation: B2B Product Availability Display

The initial release of the Back Office Configuration Framework ships with a configuration UI for B2B Product Availability Display. This first implementation demonstrates the framework in a real-world use case, allowing business users to configure how product availability information is presented to B2B buyers directly from the Back Office.

---

## How it works

The Back Office Configuration Framework follows a developer-first definition approach with a business-user-facing runtime experience:

1. **Developer defines configuration options in YAML**
   The developer declares the available configuration options, their data types, validation rules, and default values in a structured YAML definition.

2. **Framework generates the Back Office UI**
   The framework reads the YAML definition and automatically renders the corresponding configuration page in the Back Office, including form fields, labels, and validation feedback.

3. **Business user manages configuration**
   A Back Office user with appropriate permissions accesses the configuration page, adjusts the available options, and saves changes.

4. **Changes take effect without redeployment**
   Configuration updates are stored and applied at runtime. No code changes or deployments are required.

---

## Comparison to traditional configuration approaches

### Code-level configuration

**Traditional approach:** Configuration values are hardcoded or set in PHP configuration files. Changing a value requires a code change, review, and deployment.

**Back Office Configuration Framework:** Configuration values are managed in the Back Office UI. Changes take effect immediately, within the boundaries defined by the developer.

### YAML-based configuration

**Traditional approach:** Configuration is declared in YAML files that are part of the codebase. Changing a value requires editing a file, committing the change, and triggering a deployment.

**Back Office Configuration Framework:** YAML is still used, but only by developers to define what options are available. Business users interact with the resulting UI, not with YAML directly.

### Custom configuration UIs

**Traditional approach:** Each feature that requires business-user configuration needs a custom-built UI, resulting in inconsistent experiences and duplicated development effort.

**Back Office Configuration Framework:** All configurable features share the same framework-generated UI infrastructure, reducing development effort and ensuring a consistent experience.


