---
title: Marketplace Product Options
description: 
template: concept-topic-template
---

With the *Marketplace Product Options* feature, merchants and Marketplace administrators can create [product options](https://documentation.spryker.com/docs/product-options-feature-overview) for merchant product and offers.

Currently, you can only import merchant-related product options. See for LINK details.

## Marketplace product options approval statuses
Product option groups created by merchants can have the following statuses:

* *Waiting for approval*: The product option group has been created by a merchant and waits for the Marketplace administrator's approval. This is the default status assigned to all Marketplace product options that do not have a different approval status set.
* *Approved*: The product option group has been approved by the Marketplace administrator. Merchants can use it for their products and offers, so if it is [active](LINK TO BO GUIDE), the product option will be visible on the Storefront.
* *Denied*: The product option has been rejected by the Marketplace administrator and Merchants cannot use it for their products and offers. If they still use it, it will not be applied and will not be visible on the Storefront.

Currently, you can only import the Marketplace options approval statuses. See LINK for details.

## Marketplace product options in the Back Office
In the Back Office, a Marketplace administrator can view product options for all or individual merchants. See LINK for details.

## Marketplace product options on the Storefront

The merchant product option groups display on the Storefront only when: 
* The product option group status is *active*.
* The product option group approval status is *approved*.

After a merchant created a product option group and assigned it to their products, the product option group is displayed for all offers of the products, including the offers of other merchants.

![Marketplace product options on the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/merchant-prodcut-options-on-the-storefront.png)

## Marketplace product options in the Merchant Portal

In the Merchant Portal, the product options are displayed as part of the order, on the order details page:

<div class=".width-100">
    ![Product options on the order details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/product-options-in-the-merchant-portal.png)

 </div>

![Product options on the order details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/product-options-in-the-merchant-portal.png){ width=100% }

<img src="[src](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product+options/product-options-in-the-merchant-portal.png)" alt="alt" class="width-100">

Data importer: default type is "waiting for approval" - so if this field is empty, this status is applied automatically


In the case of offers, product options can be used with all offers if the product itself is selected in product options.??
