---
title: {Meta name}
description: {Meta description}
template: howto-guide-template
---

This document describes all options for the multistore setup that we highly recommend you to learn at the stage of defining the architecture for your project, and before you start implementing a new store.

This document outlines the various options available for a multistore setup and is essential to review when defining the architecture for your project and prior to implementing a new store. 

## Assess whether your shop is fit for Spryker Multistore

When planning for multiple stores, it is crucial to determine whether your project supports the Spryker Multistore solution and assess whether it is necessary for your business needs.

The Spryker Multistore solution is designed to represent several business channels on a single platform. These channels include:

- Localization: The support of different locales, currencies, and languages for each store to ensure customers see the correct information and pricing based on their location. The localization channel can include:

    - Different regions: Americas, EU, MENA, APAC, etc.
    - Different countries: DE, FR, ES, NL, etc.
    - Combination of regions and countires.

- Custom functionality per store: The ability to offer a customized shopping experience to customers by displaying relevant products, content, and promotions based on their location or interest. This can include different brands under a single franchise, such as Swatch, Omega, etc., or different business models like new cars, used cars, spare parts.
- Sales and marketing: The ability to track sales and customer data for each store to monitor performance and make data-driven decisions about future expansion.
- Order management: The ability to manage orders from multiple stores effectively and track the progress of each order from start to finish.
- Reporting: The ability to generate reports for each store to see sales, customer data, and inventory levels, enabling informed business decisions.
- Shipping and fulfillment: The ability to offer shipping options based on the customer's location and automate the fulfillment process to ensure prompt and accurate delivery of orders.
- Customer service: Providing consistent customer service across all stores, ensuring customers have a positive experience regardless of which store they shop at.
- Integrations: Integrating with other tools, such as payment gateways, Tax Calculation, shipping carriers, and marketing platforms to streamline workflow and automate routine tasks.

## Select the appropriate setup

There are three types of setup that you can choose from.

### Setup 1: Shared infrastructure resources (default)
![setup-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups/setup-1.png)

This setup has the following characteristics:

