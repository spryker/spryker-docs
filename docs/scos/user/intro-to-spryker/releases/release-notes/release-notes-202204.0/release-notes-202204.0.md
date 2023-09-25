---
title: Release notes 202204.0
last_updated: May 3, 2022
template: concept-topic-template
description: Release notes for the Spryker SCOS release 202204.0
redirect_from:
  - /docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.html
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and enhancements.
For information about installing the Spryker Commerce OS, see [Getting started guide](https://documentation.spryker.com/docs/dev-getting-started).

## Spryker Commerce OS

This section describes the new features released for Spryker Commerce OS.

### Cart and Checkout

Inside the cart and checkout endpoints, we have added information about the minimal, soft, and hard thresholds defined in your Spryker project.

#### Documentation

[Order Threshold feature overview](/docs/scos/user/features/202204.0/checkout-feature-overview/order-thresholds-overview.html)

### Discount management

We have added several new features and improvements to discounts to allow for more control and transparency around your promotions.

#### Documentation

[Promotions and Discounts feature overview](/docs/scos/user/features/202204.0/promotions-discounts-feature-overview.html)


### Discount priority

For cases when several non-exclusive discounts apply to a customer’s cart, a Back Office user can set discount priorities to define the order in which discounts are applied and calculated.

![discount-priority](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/discount-priority.png)

#### Documentation

[Discount priority](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html#discount-priority)

### Category-based discounts

We have added `category` to the list of fields for discount conditions and calculation. A Back Office user can now use categories and subcategories to define when or to what products a discount should be applied.

![category-based-discounts](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/category-based-discounts.png)

#### Documentation

[Decision rule](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html#decision-rule)

### Time-defined discount validity

Discount validity now supports HH:MM time in addition to dates. For example, a voucher can be redeemed, or a discount applies to the cart starting from 01.12.2021 23:00 until 31.01.2022 22:59, UTC.

![time-defined-discount-validity](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/time-defined-discount-validity.png)

#### Documentation

[Discount validity interval](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html#discount-validity-interval)

### Strikethrough prices on promotional products

When the **Cart** page shows eligible promotional products, these products now show the discounted price with a strikethrough default price. This improves the customer experience by showing the discount a customer can receive if they add a product to the cart.

![strikethrough-prices-on-promotional-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/strikethrough-prices-on-promotional-products.png)

#### Documentation

[Promotions & Discounts feature overview](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html)


### Multiple abstract products within a promotional product discount

Promotional product discounts can now designate more than one abstract SKU as the promotional product. Back Office users can enter as many abstract SKUs as they want into the discount creation form, and customers will see all eligible products in a carousel below the products in their cart.

![multiple-abstract-products-within-a-promotional-product-discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/multiple-abstract-products-within-a-promotional-product-discount.png)


#### Documentation
[Promotional product](/docs/pbc/all/discount-management/{{site.version}}/base-shop/promotions-discounts-feature-overview.html#promotional-product)


### Storefront

Wherever a number is displayed, it corresponds to the current locale of the session of the guest or customer.

### Back-Office

Wherever a number is displayed, it corresponds to the current locale of the user’s session.

### Ecosystem

#### Computop

##### PayU (Poland)

Through Computop, you can now use the PayU set of payment services. This capability is only available in Poland.

##### PayPal Express

With PayPal Express, your customers can complete transactions in just a few steps using their shipping and billing information already stored securely at PayPal to check out, so they don’t have to re-enter it. When PayPal Express is configured with the default settings, customers must have a PayPal account to complete payment.

#### Documentation
[Installing and configuring Computop](/docs/scos/dev/technology-partner-guides/202204.0/payment-partners/computop/installing-and-configuring-computop.html)

#### Payone

##### Klarna

Use Klarna services to let your customers pay later for their purchases.

## PaaS+

Starting from this version, B2C and B2B Demo Shops are fully compatible with the industry and our own coding standards. The implemented fixes are based on the evaluation performed by the Evaluator tool.

You can now evaluate your code and make sure it’s upgradable by following the [Keeping a project upgradable](/docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html) guide. After a successful evaluation, headless projects can safely take minor and patch updates. For PaaS+ projects, if a project passes the evaluation, the updates are provided automatically.

## ACP (APP Composition Platform)

This version fully supports ACP. Details on ACP will be shared later.

## Technical enhancements

### Authorization strategy and implementation across availability notifications, carts, and addresses

We have implemented authorization strategy plugins using `AuthorizationStrategyPluginInterface` that can be identified by a name they define for themselves. These names can be used in resource routes implementing the `AuthorizationStrategyAwareResourceRoutePluginInterface` or at least the `DefaultAuthorizationStrategyAwareResourceRoutePluginInterface`. This lets us map a specific strategy to a resource and HTTP verb. The new authorization module puts these plugins into a collection from where they can be retrieved by name.

The `GlueApplicationAuthorization` module extracts the required information for an authorization request from the incoming HTTP request via the `AuthorizationRestUserValidatorPlugin` plugin. It passes the extracted data to the authorization mechanism using the authorization client.

![generic-authorization-strategy-concept](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202204.0/release-notes-202204.0.md/generic-authorization-strategy-concept.png)

## Export table views

Users can now export the data from the tables of the Back Office or the Merchant Portal. Users can export the fields of the Back Office tables into a CSV file using the **Export** button.
The developers, in their turn, can enable a business user to export a table view by assigning an exporting functionality (for example, plugin or trait) to a Table Query container or Repository.

#### Documentation

[Create and configure Zed tables](/docs/scos/dev/back-end-development/zed-ui-tables/create-and-configure-zed-tables.html)

## PHP compatibility window

As we have previously communicated, we are deprecating PHP 7.3 compatibility to maintain a “healthy” support window on the [allowed PHP versions](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html). We continue to work on the upcoming versions, and we have solved some bugs that were blocking full PHP 8.0 compatibility. Our main focus is on 8.1 preparation, especially on Propel library support.

## Symfony compatibility window

We have also made Symfony 5.4 compatible while preparing to support compatibility with Symfony 6. Our compatibility window deprecates Symfony 3, as three versions are maintained.
With the knowledge of 6.0 changes, we can now make our code 5.4 compatible with minimal BC breaks while already planning future 6.0 support for the next year.

#### Documentation
[Integrating Symfony 5](/docs/scos/dev/technical-enhancement-integration-guides/integrating-symfony-5.html)

## Performance upgrades

We have enhanced several points where performance has been improved to allow for a faster page load and better throughput. The main changes include:

* Upselling products, previously loaded synchronously, are now be loaded via AJAX.
* Cart items are also loaded into the cart using the AJAX calls.
* Checking availability for all the current SKUs at once instead of one by one.
* On the **Cart** page, we do a Zed call to validate the quote. Inside of that, previously, some queries were executed more than once.
* Gateway and ZedRestApi do not use the same resources as a "normal" Zed request; separating those reduces the required ApplicationPlugins and improves performance.
* Pagination enhancement.

## General bug fixes

### New Relic visibility

Navigation between Glue and Zed Gateway calls in New Relic are now visible to be able to understand the Zed Gateway trace as well as the Glue trace in the same instance of New Relic.

## B2B Marketplace Demo Shop

The Spryker B2B Marketplace Suite is a collection of ready-to-use B2B- Marketplace-specific features. The B2B Marketplace Demo Shop is a showcase that is pre-loaded with a combination of modules and functionalities best suited for the B2B Marketplace commerce. This Demo Shop is our recommended starting point for all standard B2B Marketplace commerce projects.

![b2b-marketplace-demo-shop-yves-home-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.md/b2b-marketplace-demo-shop-yves-home-page.png)

Documentation:<br>
[Marketplace B2B Demo Shop](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2b-suite.html)

## Marketplace Merchant Custom Prices in the Merchant Portal

With the Merchant Custom Prices in Merchant Portal feature, the 3rd-party Merchants of the B2B marketplaces can provide specific prices for their various customers’ business units using the Merchant Portal UI.

![merchant-products-custom-prices-in-merchant-portal-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.md/merchant-products-custom-prices-in-merchant-portal-1.png)

![merchant-products-custom-prices-in-merchant-portal-2](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.md/merchant-products-custom-prices-in-merchant-portal-2.png)

Documentation:<br>
[Marketplace Merchant Custom Prices feature overview](/docs/pbc/all/price-management/202212.0/marketplace/marketplace-merchant-custom-prices-feature-overview.html)

## Marketplace Product Approval Process

The Operator's main challenge is to ensure the quality of the data in the marketplace.  The Merchant Product Approval Process feature provides the marketplace operator with more control of 3rd-party merchants’ products.
The status can be either of the following: draft, waiting for approval, approved, and denied, with the option to set a default status per merchant.

![merchant-product-approval-process-back-office-product-list](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.md/merchant-product-approval-process-back-office-product-list.png)

![merchant-product-approval-process-merchant-product-list](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.md/merchant-product-approval-process-merchant-product-list.png)

Documentation:<br>
[Marketplace Product Approval Process feature overview](/docs/pbc/all/product-information-management/202212.0/marketplace/marketplace-product-approval-process-feature-overview.html)

## Marketplace Shopping Lists and API

The Marketplace Shopping Lists feature lets B2B customers create and share multiple lists of merchant products and product offers between company business units or single users.

![marketplace-shopping-lists](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.md/marketplace-shopping-lists.png)

Documentation:<br>
[Marketplace Shopping Lists feature overview](/docs/pbc/all/shopping-list-and-wishlist/202212.0/marketplace/marketplace-shopping-lists-feature-overview.html)

## Marketplace Quick Add to Cart

The Marketplace Quick Add to Cart feature lets B2B customers find and buy merchant products and product offers quickly and bulk add them to the cart.

![marketplace-quick-add-to-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-2022040.md/marketplace-quick-add-to-cart.png)

Documentation: <br>
[Marketplace Product feature overview](/docs/pbc/all/product-information-management/202212.0/marketplace/marketplace-product-feature-overview.html)<br>
[Marketplace Product Offer feature overview](/docs/pbc/all/offer-management/202212.0/marketplace/marketplace-product-offer-feature-overview.html)

## Technical Enhancements

### Angular v12

The frontend project of the Spryker Marketplace was upgraded to  Angular 12. Follow the steps from the migration guide to update the Angular version of the project.

Documentation:<br>
[Migration guide - Upgrade to Angular v12](/docs/scos/dev/migration-concepts/upgrade-to-angular-12.html)
