---
title: Spryker Core Back Office feature overview
description: The article provides general information about the actions you can perform in Spryker Back Office.
last_updated: Nov 18, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/back-office
originalArticleId: 8d81c198-0006-4bba-b6b4-b50362f6e21e
redirect_from:
  - /v4/docs/the-back-office-overview
  - /v4/docs/en/the-back-office-overview
  - /v4/docs/back-office-login-overview
  - /v4/docs/en/back-office-login-overview
  - /v4/docs/back-office
  - /v4/docs/en/back-office
  - /v4/docs/spryker-core-back-office
  - /v4/docs/en/spryker-core-back-office
  - /v4/docs/back-office-management
  - /v4/docs/en/back-office-management
  - /v4/docs/customer-management
  - /v4/docs/en/customer-management
  - /v4/docs/data-protection
  - /v4/docs/en/data-protection
---

A Spryker-based shop ships with a comprehensive, intuitive administration area comprised of numerous features that give you a strong hold over the customization of your store. Here you can tailor features to your specific needs, manage orders, products, customers, modify look & feel of your store by, for example, designing the eye-catching marketing campaigns and promotions, and much more.

The Spryker Back Office provides you with a variety of sections that are logically connected to each other.

{% info_block infoBox "Spryker Back Office" %}

It provides the product and content management capabilities, categories and navigation building blocks, search and filter customizations, barcode generator, order handling, company structure creation (_for B2B users_), merchant-buyer contracts' setup.

{% endinfo_block %}

With Spryker Back Office, you can:
* Manage orders placed by your customers as well as create orders for customers
* Create and manage customers
* Build and manage product categories
* Create and manage CMS blocks and pages
* Handle translations
* Manage products and all elements related to them (availability, labels, options, types, etc.)
* Customize search and filters for the online store
* Create and manage discounts
* Build and manage the main navigation of your online store
* Create new carrier companies and shipment methods as well as manage those
* Create admin users, add roles and user groups

Depending on the roles and teams in your project, you can limit the access of different Back Office users to specific Back Office areas.

**Back Office provides both, B2B and B2C capabilities.**

{% info_block infoBox "Info" %}

The following diagram shows what features are used for both **B2B and B2C**, and which are **B2B specific**.

{% endinfo_block %}

![B2B and B2C features](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/features/spryker-core-back-office-feature-overview/spryker-core-back-office-feature-overview.md/b2b-and-b2c-features.png)

You can always define what exactly is going to be needed for your specific project.


## Current constraints

Currently, the feature has the following functional constraint:

Each of the Identity Managers is an ECO module that should be developed separately. After the module development, the Identity Manager’s roles and permissions should be mapped to the roles and permissions in Spryker. The mapping is always implemented at the project level.


## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of the Back Office Translations](/docs/scos/user/features/{{page.version}}/spryker-core-back-office-feature-overview/back-office-translations-overview.html) |
| **Work with the Back Office**: |
| [View Dashboard](/docs/scos/user/back-office-user-guides/{{page.version}}/dashboard/viewing-dashboard.html) |
| [Mange Punch Out](/docs/scos/user/back-office-user-guides/{{page.version}}/punch-out/managing-punch-out-connections.html) |
| [View Order Matrix](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/order-matrix/viewing-the-order-matrix.html) |
| [Manage customers](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customers.html) |
| [Create an abstract product and product bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) |
| [Create content items](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html) |
| [Create a voucher](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-vouchers.html) |
| [Manage users](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/creating-users.html) |
| [Manage merchants](/docs/scos/user/back-office-user-guides/{{page.version}}/marketplace/merchants-and-merchant-relations/managing-merchants.html) |
| [Create a warehouse](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/creating-warehouses.html) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Spryker Core back Office feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/spryker-core-back-office-feature-walkthrough/spryker-core-back-office-feature-walkthrough.html) for developers.

{% endinfo_block %}
