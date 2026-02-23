---
title: PSP Integration Template
description: Payment provider integration template for Spryker. Complete module scaffold with OMS workflows and documentation for custom PSP development.
last_updated: Feb 24, 2026
template: default
layout: custom_new
---

## Overview

The Payment Service Provider (PSP) Integration Template is a GitHub repository that provides an architectural foundation for building custom payment provider integrations in Spryker Commerce OS. The template contains the complete module structure, database schema, Order Management System (OMS) configuration, and integration points required for a PSP module. It clearly marks the locations where you implement provider-specific logic.

Use this template when you need to integrate a payment provider without an existing Spryker Eco module. The template eliminates the need to design the module architecture and integration patterns. This allows you to focus on implementing PSP-specific API communication and business logic.

**What you achieve**: A PSP integration that follows Spryker conventions, integrates with checkout and OMS workflows, and can be deployed either as a project-specific implementation or as a reusable module across multiple projects.

## When to use this template

### Your payment provider does not have an existing Spryker Eco module

You have selected a payment provider that does not have a ready-made integration available in the Spryker Eco marketplace. Common scenarios include regional payment providers, specialized B2B payment solutions, or payment providers with country-specific payment methods.

**Important**: If an Eco module already exists for your payment provider, use that module instead of this template. Existing modules provide a working integration structure that you can reference and build upon.

### You require multiple payment methods from a single provider

Your payment provider offers multiple payment methods (for example, credit card, invoice, direct debit, or digital wallets) that you want to integrate within a unified module structure. The template supports multiple payment methods and includes example configurations for credit card and invoice flows.

### You are an implementation agency building reusable modules

Your agency develops Spryker projects for multiple clients who use the same payment provider. The template enables you to create a standardized module under your organization's namespace that can be shared across client projects, reducing duplicate development effort.

## Prerequisites

Before you begin evaluating or implementing this template, ensure you have the following:

### Technical environment
- Spryker Commerce OS

### Project requirements
- Selected payment provider
- Defined payment methods to support
- Defined payment flow (authorization timing, capture timing, refund requirements)

### Payment provider access
- API credentials for sandbox environment
- Access to PSP technical documentation

## How to work with this template

The template supports two integration approaches depending on your requirements:

### Option 1: Direct project integration

Use this approach when you need a PSP integration for a single project. You clone the template and run the automated renaming script to copy files directly into your project's namespace. Then, you implement the PSP-specific logic. This is the fastest path from template to working integration.

**Outcome**: PSP module exists within your project codebase. You do not create a separate package or repository.

### Option 2: Reusable module development

Use this approach when you are building a module that will be used across multiple projects. You create a standalone Composer package under your organization's namespace (for example, `Acme\\Adyen`), implement the PSP logic, and publish the package to a repository. Multiple projects can then install the module via Composer.

**Outcome**: Standalone PSP module package that can be installed in multiple Spryker projects.

## Implementation workflow

### Step 1: Obtain and rename

You clone the template repository and use the included automated renaming script. The script replaces all occurrences of `PaymentTemplate` with your PSP name in files, classes, namespaces, and the database schema.

Refer to the Quick Start section in [README.md](https://github.com/spryker-community/payment-template/blob/main/README.md) for detailed instructions on all available options for obtaining and renaming the template, including GitHub template workflow and manual clone workflow.

### Step 2: Implement PSP logic

You implement the PSP-specific integration code by working through TODO comments in the template. The included [IMPLEMENTATION.md](https://github.com/spryker-community/payment-template/blob/main/IMPLEMENTATION.md) guide provides a complete checklist with specific file locations and implementation requirements for:

- API communication (authorization, capture, cancel operations)
- Request and response mapping between Spryker and PSP formats
- Payment status handling and database updates
- Webhook signature validation and event processing
- Payment forms customization
- OMS command and condition implementation

**Estimated scope**: The template provides module structure and integration points. You implement PSP-specific API calls, business logic, error handling, and testing.

### Step 3: Configure and test

You configure the API credentials, set up webhook endpoints in the PSP dashboard, and test the integration in the PSP sandbox environment. This includes testing payment authorization, capture, cancellation, webhook delivery, and OMS state transitions.

### Step 4: Deploy

After successful sandbox testing, you update the configuration with production API credentials and webhook URLs, run database migrations in the production environment, and monitor the initial payment transactions.

## Trade-offs and considerations

### Benefits of using this template

- Module structure follows Spryker architectural conventions
- Integration points with checkout, OMS, and persistence layers are pre-configured
- Supports both project-specific and reusable module workflows
- Automated renaming reduces manual editing and potential errors
- Includes working examples of payment forms and OMS configurations

### Considerations before adopting

- You are responsible for all PSP-specific implementation, testing, and ongoing maintenance
- Template assumes standard authorize-capture-cancel payment flow (customization required for non-standard flows)
- Requires development resources with knowledge of both Spryker module architecture and your PSP's API
- No vendor support or guaranteed updates are provided (community-maintained template)

### Alternative approaches

- **Wait for official Eco module**: If your PSP has significant market share, Spryker or a partner may develop an official module
- **Hire Spryker partner agency**: Contract an agency to build and maintain a custom integration
- **Build from scratch**: Develop a custom module architecture if your PSP requires integration patterns not covered by the template

## Next steps

### Evaluate fit for your project

Review the prerequisites and implementation scope sections to determine if you have the required resources and expertise. Compare the template's standard payment flow with your PSP's requirements to identify customization needs.

### Access template and documentation

- **GitHub repository**: https://github.com/spryker-community/payment-template
- **[README.md](https://github.com/spryker-community/payment-template/blob/main/README.md)**: Overview with quick start instructions for all integration workflows
- **[IMPLEMENTATION.md](https://github.com/spryker-community/payment-template/blob/main/IMPLEMENTATION.md)**: Detailed checklist for developers with file locations and implementation guidance
- **[INTEGRATION.md](https://github.com/spryker-community/payment-template/blob/main/INTEGRATION.md)**: Guide for installing a completed module into a Spryker project
