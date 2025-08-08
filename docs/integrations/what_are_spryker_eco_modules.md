---
title: About Eco Modules
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: Mar 21, 2025
template: default
layout: custom_new
---


<div class="content_box">
Spryker Commerce OS is known for its modular architecture, designed for flexibility and the ability to handle complex ecommerce requirements. While the core platform provides essential ecommerce functions, modern online businesses often need to connect with various specialized third party services to create a complete solution. These external services can include payment gateways, Product Information Management (PIM) systems, monitoring tools, analytics platforms, and more.


**Spryker Eco Modules** are the specific components within the Spryker ecosystem designed precisely for this purpose: integrating these third party technologies.

</div>

## What are Spryker Eco Modules

Spryker Eco Modules are essential building blocks for extending the Spryker Commerce OS, enabling businesses to integrate seamlessly with external systems and services.

At their core, Spryker Eco Modules act as connectors or adapters. They bridge the functionality of Spryker Commerce OS with third party systems and services, empowering your platform to handle tasks like payment processing, product information management, and system monitoring without needing to reinvent the wheel.

For instance, instead of building a custom payment integration from scratch, you can leverage the Spryker Eco Module for Adyen to handle payments reliably and securely.

## Where do Eco Modules Live

Understanding where Eco Modules live in your project directory is key to maintaining a clean and organized codebase. You'll find them under the `vendor/spryker-eco/` directory, which distinguishes them from:

- **Spryker Core Modules**: Located under `vendor/spryker/`, these are the essential building blocks of the Spryker OS.
- **Project Specific Code**: Usually found in `src/Pyz/`, this is where your team implements customizations and business logic tailored to your project.

This clear separation helps developers navigate the project more efficiently and keeps external integrations modular and easy to manage.

## Installation of Eco Modules

Spryker Eco Modules are installed using Composer, just like other dependencies in a PHP project. They follow a consistent naming convention, using the `spryker-eco/` prefix in their package names. For example:

- `spryker-eco/adyen`
- `spryker-eco/akeneo-connector`

This naming standard makes it easy to identify Eco Modules and differentiate them from core packages or other vendor dependencies.

## Eco Module Examples

The functionality of Spryker Eco Modules is diverse, enabling Spryker applications to harness the power of external partners and services. Common use cases include:

- **Payments**: Processing payments through providers like Adyen or CrefoPay.
- **Product Information Management (PIM)**: Synchronizing product data with solutions like Akeneo.
- **Monitoring**: Sending performance data to services like New Relic for tracking and analysis.

These modules simplify the integration of powerful external tools, saving development time and reducing the risk of errors that can come with custom implementations.

## Relationship to Spryker Core Code

Although Eco Modules are distributed separately from the Spryker core, they are designed to integrate seamlessly. They leverage Spryker's standardized extension mechanisms, including Plugins and Dependency Providers, making them as extensible and customizable as the core modules themselves.

This consistent approach means you can treat Eco Modules like any other Spryker module, adapting or extending them to meet your project's specific needs.

## Using Eco Modules

In essence, Spryker Eco Modules provide a standardized and maintainable way to enhance the Spryker Commerce OS by connecting it to the broader technology ecosystem. They empower businesses to build tailored, best of breed solutions that combine the strength of Spryker with the capabilities of leading third party services.

With Eco Modules, you're not limited by what's built into the Spryker core you can tap into a world of possibilities, driving innovation and differentiation in your ecommerce platform.

## Disclaimer

{% info_block infoBox %}

<p class="note">But, to note, The Eco Modules that have been built are there as an example, they may not be fully up to date and may need work to integrate them in to your Spryker Project. Eco modules are not part of the paid Spryker Products or Services. Customers cannot claim maintenance of or updates for Eco Modules. Spryker cannot be held liable for any use of this kind of integration.</p>

{% endinfo_block %}
