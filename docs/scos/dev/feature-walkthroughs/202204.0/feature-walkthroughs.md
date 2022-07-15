---
title: Feature Walkthroughs
description: A collection of walkthroughs for Spryker Commerce OS features.
template: concept-topic-template
---

This section contains a collection of walkthroughs for the features found within the Spryker Commerce OS. Once Spryker has been installed, you can take advantage of its many different features as described below.

## Agent Assist

The [Agent Assist](/docs/scos/dev/feature-walkthroughs/202204.0/agent-assist-feature-walkthrough.html) feature allows adding an agent, a person who assists customers: advises the best fit for customers and performs various activities on behalf of a customer on the Storefront.

## Alternative Products

The [Alternative Products](/docs/scos/dev/feature-walkthroughs/202204.0/alternative-products-feature-walkthrough.html) feature allows defining alternative products for products that are discontinued or out of stock.

## Approval Process

The [Approval Process](/docs/scos/dev/feature-walkthroughs/202204.0/approval-process-feature-walkthrough.html) feature enables managers to control purchases requested by their employees.

## Availability Notification

The [Availability Notification](/docs/scos/dev/feature-walkthroughs/202204.0/availability-notification-feature-walkthrough.html) feature allows customers to subscribe to product availability notifications to receive emails when an out-of-stock product is back in stock.

## Cart

The [Cart](/docs/scos/dev/feature-walkthroughs/202204.0/cart-feature-walkthrough/cart-feature-walkthrough.html) feature provides functionality of the shopping cart and cart total calculations.

### Calculation 3.0

Spryker uses the [Calculation](/docs/scos/dev/feature-walkthroughs/202204.0/cart-feature-walkthrough/calculation-3-0.html) module to calculate the cart totals that are displayed in the cart/checkout or when the order is placed.

### Calculation data structure

This describes the structure of how Spryker [calculates its data](/docs/scos/dev/feature-walkthroughs/202204.0/cart-feature-walkthrough/calculation-data-structure.html) between different transfers.

### Calculator plugins

This states the various parts of the [Calculator plugin](/docs/scos/dev/feature-walkthroughs/202204.0/cart-feature-walkthrough/calculator-plugins.html) method.

### Cart module: reference information

Our [Cart consists of a few components](/docs/scos/dev/feature-walkthroughs/202204.0/cart-feature-walkthrough/cart-module-reference-information.html) in Yves and Zed. The Yves components create the cart requests and persist the cart into the session. The Zed components persist the data into the database and expand the items with data obtained from plugins.

### Resource Sharing

The [Resource Sharing](/docs/scos/dev/feature-walkthroughs/202204.0/cart-feature-walkthrough/resource-sharing-feature-walkthrough.html) allows creating a unique URL for any entity in the Spyker Commerce OS. For each entity, you should use an additional connector-module. For example, to share a cart through a URL, Resource Sharing should be combined with Persistent Cart Sharing.

## Catalog

The [Catalog](/docs/scos/dev/feature-walkthroughs/202204.0/catalog-feature-walkthrough.html) feature allows building and organizing products to meet your and your customer’s demands, primarily to make sure everyone can quickly find what they are looking for.

## Category Management

The [Category Management](/docs/scos/dev/feature-walkthroughs/202204.0/category-management-feature-walkthrough.html) feature allows managing your product catalog with customized categories, category pages, and filters. All products can be categorized into logical clusters so that customers can filter them on the Storefront.

## Checkout

The [Checkout](/docs/scos/dev/feature-walkthroughs/202204.0/checkout-feature-walkthrough.html) feature allows customizing the checkout workflow.

## Cms

The [CMS](/docs/scos/dev/feature-walkthroughs/202204.0/cms-feature-walkthrough/cms-feature-walkthrough.html) feature adds a content management system that allows creating and managing the content of custom pages that are not part of the product catalog.

### CMS extension points: reference information

The [CMS module](/docs/scos/dev/feature-walkthroughs/202204.0/cms-feature-walkthrough/cms-extension-points-reference-information.html) provides an extension point for post activation and deactivation of CMS pages.

## Comments

The [Comments](/docs/scos/dev/feature-walkthroughs/202204.0/comments-feature-walkthrough.html) feature allows adding multiple comments to any entity. The feature can be integrated into any page or entity of the online shop.

## Company Account

The [Company Account](/docs/scos/dev/feature-walkthroughs/202204.0/company-account-feature-walkthrough/company-account-feature-walkthrough.html) feature allows controlling user access to the system within an organization by configuring different permissions and roles for the company’s entities (units) and users.

### Company account: module relations

[This schema](/docs/scos/dev/feature-walkthroughs/202204.0/company-account-feature-walkthrough/company-account-module-relations.html) illustrates relations between company, business unit, company unit address and company user (customer).

### Customer Login by Token: reference information

[A token](/docs/scos/dev/feature-walkthroughs/202204.0/company-account-feature-walkthrough/customer-login-by-token-reference-information.html) is a unique identifier that contains all the information needed for authentication to fetch a specific resource without using a username and password. The tokens are JSON strings that are encoded in base64url format.

## Configurable Bundle

The [Configurable Bundle](/docs/scos/dev/feature-walkthroughs/202204.0/configurable-bundle-feature-walkthrough.html) feature allows creating a configurable list of items.

## Configurable Product

The [Configurable Product](/docs/scos/dev/feature-walkthroughs/202204.0/configurable-product-feature-walkthrough/configurable-product-feature-walkthrough.html) feature introduces a new type of product that can be customized by customers—a configurable product.

### Configuration process flow of Configurable Product

The [configuration process](/docs/scos/dev/feature-walkthroughs/202204.0/configurable-product-feature-walkthrough/configuration-process-flow-of-configurable-product.html) of a configurable product consists of eight phases.

## Content Items

The [Content Items](/docs/scos/dev/feature-walkthroughs/202204.0/content-items-feature-walkthrough/content-items-feature-walkthrough.html) feature creates an abstraction layer for content management in the Back Office. It allows content managers to create and preserve small content pieces, which can be inserted into CMS blocks and then into Storefront pages.

### Content item types: module relations

[This document](/docs/scos/dev/feature-walkthroughs/202204.0/content-items-feature-walkthrough/content-item-types-module-relations.html) describes each content item type and the module relations used for them.

## Customer Access

The [Customer Access](/docs/scos/dev/feature-walkthroughs/202204.0/customer-access-feature-walkthrough.html) feature allows you to limit what information guest customers can access.

## Customer Account Management

The [Customer Account Management](/docs/scos/dev/feature-walkthroughs/202204.0/customer-account-management-feature-walkthrough/customer-account-management-feature-walkthrough.html) feature enables a wide range of management options for customer accounts and additional functionalities.

### Customer module overview

The [Customer entity](/docs/scos/dev/feature-walkthroughs/202204.0/customer-account-management-feature-walkthrough/reference-information-customer-module-overview.html) wraps data around registered customers. Customer data is managed from the Back Office by the shop administrator and from the shop website itself by customers. This article describes how new customers can be created and managed and how to enable specific features related to customers.

## File Manager

The [File Manager](/docs/scos/dev/feature-walkthroughs/202204.0/file-manager-feature-walkthrough.html) feature allows uploading files required for your shop.

## Gift Cards

The [Gift Cards](/docs/scos/dev/feature-walkthroughs/202204.0/gift-cards-feature-walkthrough.html) feature enables you to create a virtual product (a gift card) with a chosen value amount. The purchase of a gift card generates an individual code that is used as a payment method during checkout.

## Inventory Management

The [Inventory Management](/docs/scos/dev/feature-walkthroughs/202204.0/inventory-management-feature-walkthrough/inventory-management-feature-walkthrough.html) feature adds stock and availability management as well as multiple warehouse stock management for products.

### Managing stocks in a multi-store environment: Best practices
In a [multi-store environment](/docs/scos/dev/feature-walkthroughs/202204.0/inventory-management-feature-walkthrough/managing-stocks-in-a-multi-store-environment-best-practices.html), you can manage the warehouses to stores and database relations in several ways. This article contains scenarios that can help you choose the most suitable warehouse management workflow and implement it using the Inventory Management feature.

### Reference information: AvailabilityStorage module overview

The [AvailabilityStorage module](/docs/scos/dev/feature-walkthroughs/202204.0/inventory-management-feature-walkthrough/reference-informaton-availabilitystorage-module-overview.html) publishes all the availability information for abstract and concrete products. Items are grouped by abstract product, and the process is handled by Publish and Synchronize.

## Mailing & Notifications

The [Mailing & Notifications ](/docs/scos/dev/feature-walkthroughs/202204.0/mailing-and-notifications-feature-walkthrough.html)feature allows you to manage newsletters and notifications.

## Measurement Units

The [Measurement Units](/docs/scos/dev/feature-walkthroughs/202204.0/measurement-units-feature-walkthrough.html) feature allows selling products by any unit of measure defined by in the Back Office.

## Merchant

The [Merchant](/docs/scos/dev/feature-walkthroughs/202204.0/merchant-feature-walkthrough.html) feature provides the core functionality for the SCOS B2B and Marketplace with the basic create-read-update operations over the Merchant entity. You cannot delete a merchant, but only deactivate.

## Merchant B2B Contracts

The [Merchant B2B Contracts](/docs/scos/dev/feature-walkthroughs/202204.0/merchant-b2b-contracts-feature-walkthrough.html) feature allows setting up contracts between a merchant and B2B customer.

## Merchant Custom Prices

The [Merchant Custom Prices](/docs/scos/dev/feature-walkthroughs/202204.0/merchant-custom-prices-feature-walkthrough.html) feature allows a merchant to define custom prices for B2B customers.

## Merchant Product Restrictions

The [Merchant Product Restrictions](/docs/scos/dev/feature-walkthroughs/202204.0/merchant-product-restrictions-feature-walkthrough/merchant-product-restrictions-feature-walkthrough.html) feature allows merchants to define what products are available to each of their B2B customers.

### Restricted products behavior

[On this page](/docs/scos/dev/feature-walkthroughs/202204.0/merchant-product-restrictions-feature-walkthrough/restricted-products-behavior.html), you can find commonly encountered cases of product restrictions behavior.

## Multiple Carts

The [Multiple Carts](/docs/scos/dev/feature-walkthroughs/202204.0/multiple-carts-feature-walkthrough.html) feature allows you to create and manage one or multiple shopping carts in one customer account.

## Navigation

The [Navigation](/docs/scos/dev/feature-walkthroughs/202204.0/navigation-feature-walkthrough/navigation-feature-walkthrough.html) feature enables product catalog managers to create intuitive navigation elements and display them on the Storefront.

### Navigation module: reference information

The [Navigation module](/docs/scos/dev/feature-walkthroughs/202204.0/navigation-feature-walkthrough/navigation-module-reference-information.html) manages multiple navigation menus that can be displayed on the frontend (Yves). Every navigation section can contain its own nested structure of navigation nodes. Navigation nodes have types that help define what kind of link they represent.

## Non-splittable Products

The [Non-splittable Products](/docs/scos/dev/feature-walkthroughs/202204.0/non-splittable-products-feature-walkthrough.html) feature allows controlling if items bought in quantities greater than 1 are grouped in the cart or processed as separate items.

## Order Management

The [Order Management](/docs/scos/dev/feature-walkthroughs/202204.0/order-management-feature-walkthrough/order-management-feature-wakthrough.html) feature adds a collection of functionalities that allow you to see the quantity of the order items, their status, and how long they exist. Also, you can view details per status and order page.

### Custom Order Reference: module relations

The module relations for the [Custom Order Reference](/docs/scos/dev/feature-walkthroughs/202204.0/order-management-feature-walkthrough/custom-order-reference-module-relations.html) feature.

### Sales

The [Sales](/docs/scos/dev/feature-walkthroughs/202204.0/order-management-feature-walkthrough/sales-module-reference-information.html) module provides the order management functionality. The functionality is obtained through the ZED UI that renders orders with order details and the Client API to get customer orders.

## Packaging Units

The [Packaging Units](/docs/scos/dev/feature-walkthroughs/202204.0/packaging-units-feature-walkthrough.html) feature defines if a packaging unit holds a fixed amount of products or if customers can buy any amount of products in this packaging unit. Also, it allows applying amount restrictions to products.

## Payments

The [Payments](/docs/scos/dev/feature-walkthroughs/202204.0/payments-feature-walkthrough.html) feature allows customers to pay for orders with none, one, or multiple payment methods during the checkout process.

## Persistent Cart Sharing

The [Persistent Cart Sharing](/docs/scos/dev/feature-walkthroughs/202204.0/persistent-cart-sharing-feature-walkthrough/persistent-cart-sharing-feature-walkthrough.html) feature allows company users to generate the URL to share the cart with different levels of access.

### Persistent Cart Sharing: module relations

[This schema](/docs/scos/dev/feature-walkthroughs/202204.0/persistent-cart-sharing-feature-walkthrough/persistent-cart-sharing-feature-module-relations.html) illustrates module relations in the Unique URL per Cart for Easy Sharing feature

## Prices

The [Prices](/docs/scos/dev/feature-walkthroughs/202204.0/prices-feature-walkthrough/prices-feature-walkthrough.html) feature enables Back Office users to effectively manage the prices of all types of products. They can set different types of prices, like default, original, and volume prices.

### Money

Handling monetary values can be a problem and is often quite hard. The [Money](/docs/scos/dev/feature-walkthroughs/202204.0/prices-feature-walkthrough/money-module-reference-information.html) module makes it easier to work with monetary values.

### PriceProduct module details: reference information

This article describes technical details of the [PriceProduct](/docs/scos/dev/feature-walkthroughs/202204.0/prices-feature-walkthrough/priceproduct-module-details-reference-information.html) module that are valid since version 2 of the module.

## Product

The [Product](/docs/scos/dev/feature-walkthroughs/202204.0/product-feature-walkthrough.html) feature allows for creating products, managing their characteristics and settings.

## Product Approval Process

The [Product Approval Process](/docs/scos/dev/feature-walkthroughs/202204.0/product-approval-process-feature-walkthrough.html) feature adds approval mechanisms for products by providing an optional spy_product_abstract.approval_status DB column to store product approval statuses. Thus, a shop owner can follow the review process and manage which products will be placed in the store by setting the corresponding approval statuses. The feature also provides the Back Office UI for managing the approval statuses and the corresponding Data importer.

## Product Barcode

The [Product Barcode](/docs/scos/dev/feature-walkthroughs/202204.0/product-barcode-feature-walkthrough.html) feature lets you create barcodes for any kind of entity.

## Product Bundles

The [Product Bundles](/docs/scos/dev/feature-walkthroughs/202204.0/product-bundles-feature-walkthrough.html) feature allows you to tie individual items together and sell them as a package.

## Product Groups

The [Product Groups](/docs/scos/dev/feature-walkthroughs/202204.0/product-groups-feature-walkthrough.html) feature allows product catalog managers to group products by attributes, like color or size.

## Product Labels

The [Product Labels](/docs/scos/dev/feature-walkthroughs/202204.0/product-labels-feature-walkthrough.html) feature enables product catalog managers to highlight the desired products by adding a special type of information—product labels.

## Product Lists

The [Product Lists](/docs/scos/dev/feature-walkthroughs/202204.0/product-lists-feature-walkthrough.html) feature allows configuring product availability for specific companies by blacklisting or whitelisting products for them.

## Product Options

The [Product Options](/docs/scos/dev/feature-walkthroughs/202204.0/product-options-feature-walkthrough.html) feature allows a Back Office user to create and assign product options to abstract products.

## Product Rating and Reviews

The [Product Rating & Reviews](/docs/scos/dev/feature-walkthroughs/202204.0/product-rating-reviews-feature-walkthrough.html) feature allows customers to add reviews and ratings to abstract products.

## Product Relations

The [Product Relations](/docs/scos/dev/feature-walkthroughs/202204.0/product-relations-feature-walkthrough/product-relations-feature-walkthrough.html) feature enables product catalog managers to create logical relations between products based on their actual properties. Product relations are displayed on the Storefront to achieve multiple purposes.

### Product Relations: module relations

[This schema](/docs/scos/dev/feature-walkthroughs/202204.0/product-relations-feature-walkthrough/product-relations-module-relations.html) illustrates the module relations within the Product Relations feature.

## Product Sets

The [Product Sets](/docs/scos/dev/feature-walkthroughs/202204.0/product-sets-feature-walkthrough/product-sets-feature-walkthrough.html) feature allows creating and selling collections of products.

### Product Sets: module relations

The [ProductSet](/docs/scos/dev/feature-walkthroughs/202204.0/product-sets-feature-walkthrough/product-sets-module-relations.html) module provides a spy_product_set table that stores some non-localized data about Product Sets entities. Localized data is stored in the spy_product_set_data table. These tables, along with their related URLs and product image sets, contain all the necessary data about Product Sets entities that you can list on the Storefront or show their representing Product details pages.

## Promotions and Discounts

The [Promotions & Discounts](/docs/scos/dev/feature-walkthroughs/202204.0/promotions-discounts-feature-walkthrough.html) feature allows defining several types of discounts based on a brand, overall cart value, certain product ranges, or special customer groups. You can also offer discount vouchers or incentivize certain products through coupon codes.

## Quick Add to Cart

The [Quick Add to Cart](/docs/scos/dev/feature-walkthroughs/202204.0/quick-add-to-cart-feature-walkthrough/quick-add-to-cart-feature-walkthrough.html) feature allows adding multiple products to cart at once.

## Quotation Process

The [Quotation Process](/docs/scos/dev/feature-walkthroughs/202204.0/quotation-process-feature-walkthrough/quotation-process-feature-walkthrough.html) feature adds functionality that allows customers to request special product prices and lets agents manage those quote requests.

### Quotation Process: module relations

[On this page](/docs/scos/dev/feature-walkthroughs/202204.0/quotation-process-feature-walkthrough/quotation-process-module-relations.html), you can find the module relations for the Quotation Process feature.

## Reclamations

The [Reclamations](/docs/scos/dev/feature-walkthroughs/202204.0/reclamations-feature-walkthrough.html) feature allows Back Office users to handle order claims issued by customers.

## Refunds

The [Refunds](/docs/scos/dev/feature-walkthroughs/202204.0/refunds-feature-walkthrough.html) feature allows issuing refunds on orders.

## Reorder

The [Reorder](/docs/scos/dev/feature-walkthroughs/202204.0/reorder-feature-walkthrough.html) feature allows customers to repeat their previous orders in one click.

## Resource Sharing

The [Resource Sharing](/docs/scos/dev/feature-walkthroughs/202204.0/resource-sharing-feature-walkthrough.html) allows creating a unique URL for any entity in the Spryker Commerce OS. For each entity, you should use an additional connector-module. For example, to share a cart through a URL, Resource Sharing should be combined with Persistent Cart Sharing.

## Return Management

The [Return Management](/docs/scos/dev/feature-walkthroughs/202204.0/return-management-feature-walkthrough.html) feature allows you to create and manage returns for a sales order.

## Scheduled Prices

The [Scheduled Prices](/docs/scos/dev/feature-walkthroughs/202204.0/scheduled-prices-feature-walkthrough.html) feature enables Back Office users to schedule price changes, which are to happen in the future for multiple products simultaneously.

## Search

The [Search](/docs/scos/dev/feature-walkthroughs/202204.0/search-feature-walkthrough.html) feature enables you to control search and filtering preferences and customize them to improve your customers’ user experience and help them quickly find what they are looking for. The feature includes textual search, multi-language search, full-site search, filter by a category, dynamically, and by filters & facets.

## Shared Carts

The [Shared Carts](/docs/scos/dev/feature-walkthroughs/202204.0/shared-carts-feature-walkthrough.html) feature allows sharing carts between company users.

## Shipment

The [Shipment](/docs/scos/dev/feature-walkthroughs/202204.0/shipment-feature-walkthrough/shipment-feature-walkthrough.html) feature allows you to create and manage carrier companies and assign multiple delivery methods associated with specific stores, which your customers can select during the checkout. With the feature in place, you can define delivery price and expected delivery time, tax sets, and availability of the delivery method per store.

### Shipment method entities in the database: reference information

[This schema](/docs/scos/dev/feature-walkthroughs/{{page.version}}/shipment-feature-walkthrough/shipment-method-entities-in-the-database-reference-information.html) shows how the sales order and shipment method entities are modeled in the database.

### Shipment method plugins: reference information

This provides a walkthrough to the [Shipment method](/docs/scos/dev/feature-walkthroughs/202204.0/shipment-feature-walkthrough/reference-information-shipment-method-plugins.html) plugin and its features.

## Shopping Lists

The [Shopping Lists](/docs/scos/dev/feature-walkthroughs/202204.0/shopping-lists-feature-walkthrough.html) feature allows customers to create and share multiple lists of products between company business units or single users. Shopping lists can be shared between users with different sets of permissions.

## Spryker Core Back Office

The [Spryker Core Back Office](/docs/scos/dev/feature-walkthroughs/202204.0/spryker-core-back-office-feature-walkthrough/spryker-core-back-office-feature-walkthrough.html) feature adds a comprehensive, intuitive administration area that provides the product and content management capabilities, categories and navigation building blocks, search and filter customizations, barcode generator, order handling, company structure creation (for B2B users), merchant-buyer contracts’ setup.

### Users and rights overview

[User and rights management](/docs/scos/dev/feature-walkthroughs/202204.0/spryker-core-back-office-feature-walkthrough/user-and-rights-overview.html) is a general term that describes the security functionality for controlling user access to perform various roles throughout the system.

## Tax

The [Tax](/docs/scos/dev/feature-walkthroughs/202204.0/tax-feature-walkthrough/tax-feature-walkthrough.html) feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets.

### Reference information: Tax module

The [Tax module](/docs/scos/dev/feature-walkthroughs/202204.0/tax-feature-walkthrough/reference-information-tax-module.html) is responsible for handling tax rates that can apply for products, product options, or shipment.

## Wishlist

The [Wishlist](/docs/scos/dev/feature-walkthroughs/202204.0/wishlist-feature-walkthrough.html) feature allows customers to track and save the products they wish to purchase through the wish list. Customers can create multiple wish lists and customize their names.
