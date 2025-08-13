---
title: Marketplace Product Options feature overview
description: The Marketplace Product Options feature lets merchants and Marketplace administrators create product option groups.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/user/features/202311.0/marketplace-product-options-feature-overview.html
related:
  - title: Creating product options
    link: docs/pbc/all/product-information-management/latest/marketplace/manage-in-the-back-office/product-options/create-product-options.html
  - title: Managing product options
    link: docs/pbc/all/product-information-management/latest/marketplace/manage-in-the-back-office/product-options/manage-product-options.html
---

With the *Marketplace Product Options* feature, merchants and Marketplace administrators can create *product options* for marketplace products.

Product options are product additions that a customer can select on the product detail page before adding the product to the cart. For example, the product options can be gift wrappings for products, insurance, or warranty. Product options do not have stock but an SKU linked to product abstracts. Thus, you cannot purchase them without buying a corresponding product.

Each product option is defined by the following:

- Product option group name
- Tax set assigned on the product option group
- Option value
- Translation

A *product option group* holds all available options or *option values* that buyers select. For example, you can have the *Warranty* product option group and create *1-year warranty* and *2-year warranty* values for it.

{% info_block infoBox "Info" %}

Currently, you can create and manage general product options via the Back Office. However, you can only import merchant product options.

- For details about how you can create product options in the Back Office, see [Creating a product option](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html).
- For details about how you can manage the product options in the Back Office, see [Managing product options](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html).
- For details about how you can import merchant product options, see [File details: merchant product option group](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-option-group.csv.html).

{% endinfo_block %}

## Marketplace product options approval statuses

Product option groups created by merchants can have the following statuses:

- *Waiting for approval*: The product option group was created by a merchant and waits for the Marketplace administrator's approval. This is the default status assigned to all Marketplace product options that do not have a different approval status set.
- *Approved*: The product option group was approved by the Marketplace administrator. Merchants can use it for their products and offers, so if it's [active](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html#activating-a-product-option), the product option is displayed on the Storefront.
- *Denied*: The Marketplace administrator rejected the product option, and merchants cannot use it for their products and offers. If they still use it, it will not be applied and will not be displayed on the Storefront.


Currently, you can only import the Marketplace options approval statuses. For details, see [File details: merchant product option group](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-option-group.csv.html).

## Marketplace product options in the Back Office

In the Back Office, a Marketplace administrator can:
- [create general product options](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html);
- [manage general product options](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html);
- [view product options for all or individual merchants](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/manage-product-options.html#filtering-product-options-by-merchants).

## Marketplace product options on the Storefront

On the product detail page, the product option group (1) is displayed as a drop-down list with its option values (2).

![Product options on the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/product-options-on-the-storefront.png)

The merchant product option groups are displayed on the Storefront only when:
- The product option group status is [active](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html#activating-a-product-option).
- The product option group approval status is [approved](#marketplace-product-options-approval-statuses).

After a merchant creates a product option group and assigns it to their products, the product option group is displayed for all the offers of the products, including offers of other merchants. For example, in the following image, the Video King merchant's offer is selected, but the Spryker merchant's product option group is still displayed:

![Marketplace product options on the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/merchant-prodcut-options-on-the-storefront.png)

## Marketplace product options in the Merchant Portal

In the Merchant Portal, the product options are displayed on the order details page as part of the order:

<img class="width-100" ALT="Product options on the order details page" SRC="https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/product-options-in-the-merchant-portal.png"/>

## Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future:

- Product option values of a product option group can be only from one merchant.
- Product options of a merchant can be used with all offers from all merchants.
- There is no Back Office UI for approving or denying merchant product options.
- [Glue API](/docs/dg/dev/glue-api/{{page.version}}/rest-api/glue-rest-api.html) does not support merchant product option groups and values.
- Merchants can not create and manage product option groups and values in the Merchant Portal.

## Related Business User documents

|BACK OFFICE USER GUIDES |
|---------|
| [Creating a product option](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html)  |
| [Managing product options](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/product-options/create-product-options.html)|

## Related Developer documents

| INSTALLATION GUIDES          | DATA IMPORT         |
|--------------------------------|----------------|
| [Install the Marketplace Product Options feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-options-feature.html)                                        | [File details: merchant product option group](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-option-group.csv.html)  |
| [Merchant Portal - Marketplace Product Options Management integration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-options-feature.html) |   |
