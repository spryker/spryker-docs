---
title: Feature Walkthroughs
description: A collection of walkthroughs for Spryker Commerce OS features.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202005.0/feature-walkthroughs.html
  - /docs/scos/dev/feature-walkthroughs/202009.0/feature-walkthroughs.html
  - /docs/scos/dev/feature-walkthroughs/201907.0/feature-walkthroughs.html
  - /docs/scos/dev/feature-walkthroughs/201811.0/feature-walkthroughs.html
  - /docs/scos/dev/feature-walkthroughs/202001.0/feature-walkthroughs.html
  - /docs/scos/dev/feature-walkthroughs/201903.0/feature-walkthroughs.html
  - /docs/scos/dev/feature-walkthroughs/202108.0/feature-walkthroughs.html
---

This section contains a collection of walkthroughs for the features found within the Spryker Commerce OS. Once Spryker has been installed, you can take advantage of its many different features as described below.

## Agent Assist

The [Agent Assist](/docs/scos/dev/feature-walkthroughs/{{page.version}}/agent-assist-feature-walkthrough.html) feature lets you add an agent, a person who assists customers: advises the best fit for customers and performs various activities on behalf of a customer on the Storefront.


## Cms

The [CMS](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cms-feature-walkthrough/cms-feature-walkthrough.html) feature adds a content management system that lets you create and manage the content of custom pages that are not part of the product catalog.

### CMS extension points: reference information

The [CMS module](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cms-feature-walkthrough/cms-extension-points-reference-information.html) provides an extension point for post activation and deactivation of CMS pages.

## Comments

The [Comments](/docs/scos/dev/feature-walkthroughs/{{page.version}}/comments-feature-walkthrough.html) feature lets you add multiple comments to any entity. The feature can be integrated into any page or entity of the online shop.

## Company Account

The [Company Account](/docs/scos/dev/feature-walkthroughs/{{page.version}}/company-account-feature-walkthrough/company-account-feature-walkthrough.html) feature lets you control user access to the system within an organization by configuring different permissions and roles for the company’s entities (units) and users.

### Company account: module relations

[This schema](/docs/scos/dev/feature-walkthroughs/{{page.version}}/company-account-feature-walkthrough/company-account-module-relations.html) illustrates relations between company, business unit, company unit address and company user (customer).

### Customer Login by Token: reference information

[A token](/docs/scos/dev/feature-walkthroughs/{{page.version}}/company-account-feature-walkthrough/customer-login-by-token-reference-information.html) is a unique identifier that contains all the information needed for authentication to fetch a specific resource without using a username and password. The tokens are JSON strings that are encoded in the base64url format.

### Configuration process flow of Configurable Product

The [configuration process](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html) of a configurable product consists of eight phases.

## Content Items

The [Content Items](/docs/scos/dev/feature-walkthroughs/{{page.version}}/content-items-feature-walkthrough/content-items-feature-walkthrough.html) feature creates an abstraction layer for content management in the Back Office. It lets content managers create and preserve small content pieces, which can be inserted into CMS blocks and then into Storefront pages.

### Content item types: module relations

[This document](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/domain-model-and-relationships/content-item-types-module-relations.html) describes each content item type and the module relations used for them.

## Customer Access

The [Customer Access](/docs/scos/dev/feature-walkthroughs/{{page.version}}/customer-access-feature-walkthrough.html) feature lets you limit what information guest customers can access.

## Customer Account Management

The [Customer Account Management](/docs/scos/dev/feature-walkthroughs/{{page.version}}/customer-account-management-feature-walkthrough/customer-account-management-feature-walkthrough.html) feature enables a wide range of management options for customer accounts and additional functionalities.

### Customer module overview

The [Customer entity](/docs/scos/dev/feature-walkthroughs/{{page.version}}/customer-account-management-feature-walkthrough/reference-information-customer-module-overview.html) wraps data around registered customers. Customer data is managed from the Back Office by a shop administrator and from a shop website itself by customers. This document describes how new customers can be created and managed and how to enable specific features related to customers.

## File Manager

The [File Manager](/docs/scos/dev/feature-walkthroughs/{{page.version}}/file-manager-feature-walkthrough.html) feature lets you upload files required for your shop.



### AvailabilityStorage module: reference information

The [AvailabilityStorage module](/docs/scos/dev/feature-walkthroughs/{{page.version}}/inventory-management-feature-walkthrough/availabilitystorage-module-reference-informaton.html) publishes all the availability information for abstract and concrete products. Items are grouped by abstract product, and the process is handled by Publish and Synchronize.

## Merchant

The [Merchant](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-feature-walkthrough.html) feature provides the core functionality for the SCOS B2B and Marketplace with the basic create-read-update operations over the Merchant entity. You cannot delete a merchant but only deactivate them.

## Merchant B2B Contracts

The [Merchant B2B Contracts](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-b2b-contracts-feature-walkthrough.html) feature lets you set up contracts between a merchant and B2B customer.


## Merchant Product Restrictions

The [Merchant Product Restrictions](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-product-restrictions-feature-walkthrough/merchant-product-restrictions-feature-walkthrough.html) feature lets merchants define what products are available to each of their B2B customers.

### Restricted products behavior

[On this page](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-product-restrictions-feature-walkthrough/restricted-products-behavior.html), you can find commonly encountered cases of product restrictions behavior.

### Navigation module: reference information

The [Navigation module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/extend-and-customize/navigation-module-reference-information.html) manages multiple navigation menus that can be displayed on the frontend (Yves). Every navigation section can contain its own nested structure of navigation nodes. Navigation nodes have types that help define what kind of link they represent.

## Non-splittable Products

The [Non-splittable Products](/docs/scos/dev/feature-walkthroughs/{{page.version}}/non-splittable-products-feature-walkthrough.html) feature lets you control if items bought in quantities greater than 1 are grouped in the cart or processed as separate items.

## Order Management

The [Order Management](/docs/scos/dev/feature-walkthroughs/{{page.version}}/order-management-feature-walkthrough/order-management-feature-wakthrough.html) feature adds a collection of functionalities that let you see the quantity of the order items, their status, and how long they exist. Also, you can view details per status and order page.

### Custom Order Reference: module relations

The module relations for the [Custom Order Reference](/docs/scos/dev/feature-walkthroughs/{{page.version}}/order-management-feature-walkthrough/custom-order-reference-module-relations.html) feature.

### Sales

The [Sales](/docs/scos/dev/feature-walkthroughs/{{page.version}}/order-management-feature-walkthrough/sales-module-reference-information.html) module provides the order management functionality. The functionality is obtained through the ZED UI that renders orders with order details and the Client API to get customer orders.


## Payments

The [Payments](/docs/scos/dev/feature-walkthroughs/{{page.version}}/payments-feature-walkthrough.html) feature lets customers pay for orders with none, one, or multiple payment methods during the checkout process.

### Persistent Cart Sharing: module relations

[This schema](/docs/scos/dev/feature-walkthroughs/{{page.version}}/persistent-cart-sharing-feature-walkthrough/persistent-cart-sharing-feature-module-relations.html) illustrates module relations in the Unique URL per Cart for the Easy Sharing feature


### PriceProduct module details: reference information

This document describes technical details of the [PriceProduct](/docs/pbc/all/price-management/{{site.version}}/base-shop/extend-and-customize/priceproduct-module-details-reference-information.html) module that are valid since version 2 of the module.


## Product Relations

The [Product Relations](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-relations-feature-walkthrough/product-relations-feature-walkthrough.html) feature enables product catalog managers to create logical relations between products based on their actual properties. Product relations are displayed on the Storefront to achieve multiple purposes.

### Product Relations: module relations

[This schema](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-relations-feature-walkthrough/product-relations-module-relations.html) illustrates the module relations within the Product Relations feature.

## Reclamations

The [Reclamations](/docs/scos/dev/feature-walkthroughs/{{page.version}}/reclamations-feature-walkthrough.html) feature lets Back Office users handle order claims issued by customers.


## Spryker Core Back Office

The [Spryker Core Back Office](/docs/scos/dev/feature-walkthroughs/{{page.version}}/spryker-core-back-office-feature-walkthrough/spryker-core-back-office-feature-walkthrough.html) feature adds a comprehensive, intuitive administration area that provides the product and content management capabilities, categories and navigation building blocks, search and filter customizations, barcode generator, order handling, company structure creation (for B2B users), merchant-buyer contracts’ setup.
