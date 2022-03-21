---
title: Marketplace Product Options feature overview
description: The Marketplace Product Options feature lets merchants and Marketplace administrators create product option groups.
template: concept-topic-template
---

With the *Marketplace Product Options* feature, merchants and Marketplace administrators can create *product options* for marketplace products.

Product options are product additions that a customer can select on the product detail page before adding the product to the cart. For example, the product options can be gift wrappings for products, insurance, or warranty. Product options do not have stock but an SKU linked to product abstracts. Thus, you cannot purchase them without buying a corresponding product.

Each product option is defined by:

* product option group name
* tax set assigned on the product option group
* option value
* translation

*Product option group* holds all available options or *option values* that buyers select. For example, you can have the "Warranty" product option group and create "1-year warranty" and "2-year warranty" values for it.

{% info_block infoBox "Info" %}

Currently, you can create and manage general product options via the Back Office. However, you can only import merchant product options.

* For details about how you can create product options in the Back Office, see [Creating a product option](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html).
* For details about how you can manage the product options in the Back Office, see [Managing product options](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html).
* For details about how you can import merchant product options, see [File details: merchant product option group](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-option-group.csv.html).

{% endinfo_block %}

## Marketplace product options approval statuses

Product option groups created by merchants can have the following statuses:

* *Waiting for approval*: The product option group was created by a merchant and waits for the Marketplace administrator's approval. This is the default status assigned to all Marketplace product options that do not have a different approval status set.
* *Approved*: The product option group was approved by the Marketplace administrator. Merchants can use it for their products and offers, so if it is [active](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html#activating-a-product-option), the product option is displayed on the Storefront.
* *Denied*: The product option was rejected by the Marketplace administrator, and Merchants cannot use it for their products and offers. If they still use it, it will not be applied and will not be displayed on the Storefront.

Currently, you can only import the Marketplace options approval statuses. See [File details: merchant product option group](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-option-group.csv.html) for details.

## Marketplace product options in the Back Office
In the Back Office, a Marketplace administrator can:
* [create general product options](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html);
* [manage general product options](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html);
* [view product options for all or individual merchants](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/managing-product-options.html#filtering-product-options-by-merchants).

## Marketplace product options on the Storefront

On the product detail page, the product option group (1) is displayed as a drop-down list with its option values (2).

![Product options on the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/product-options-on-the-storefront.png)

The merchant product option groups are displayed on the Storefront only when:
* The product option group status is [active](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html#activating-a-product-option).
* The product option group approval status is [approved](#marketplace-product-options-approval-statuses).

After a merchant created a product option group and assigned it to their products, the product option group is displayed for all the offers of the products, including offers of other merchants. For example, in the following image, the Video King merchant's offer is selected, but the Spryker merchant's product option group is still displayed:

![Marketplace product options on the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/merchant-prodcut-options-on-the-storefront.png)

## Marketplace product options in the Merchant Portal

In the Merchant Portal, the product options are displayed on the order details page as part of the order:

<img class="width-100" ALT="Product options on the order details page" SRC="https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/product-options-in-the-merchant-portal.png"/>

## Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future:

* Product option values of a product option group can be only from one merchant.
* Product options of a merchant can be used with all offers from all merchants.
* There is no Back Office UI for approving or denying merchant product options.
* [Glue API](/docs/scos/dev/glue-api-guides/{{page.version}}/glue-rest-api.html) does not support merchant product option groups and values.
* Merchants can not create and manage product option groups and values in the Merchant Portal.

## Related Business User articles

|BACK OFFICE USER GUIDES |
|---------|
| [Creating a product option](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html)  
| [Managing product options](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/product-options/creating-product-options.html)|

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Product Options feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-options-feature-walkthrough.html) for developers.

{% endinfo_block %}
