---
title: Marketplace Product Approval Process feature overview
description: This document contains concept information for the Marketplace Product Approval Process feature.
template: concept-topic-template
---
The [marketplace operator](/docs/marketplace/user/intro-to-the-spryker-marketplace/back-office-for-marketplace-operator.html) is primarily responsible for ensuring the quality of data on the marketplace, including merchants, products, and offers. To control those things in the Marketplace, the approval mechanism is a key feature.

The Marketplace Product Approval Process allows marketplace owners to verify the products of merchants before showing them to customers.

Thus, only the approved and active products within the validity dates range and existing for the defined store are displayed in the Storefront.

## Product lifecycle

{% info_block warningBox "Note" %}

The following workflow is valid only in case the Marketplace Product Approval Process feature is enabled.

{% endinfo_block %}

A product can have one of the following statuses:

| STATUS               | DESCRIPTION                                                  |
| -------------------- | ------------------------------------------------------------ |
| Draft                | When the product is created, it obtains the *draft* status.  |
| Waiting for approval | When the product is sent for approval by a merchant in the Merchant Portal, the status changes to *waiting for approval*. |
| Approved             | The marketplace administrator can  approve the product in the Back Office and in this case the status of the product will change to the *approved* one in the Merchant Portal. The marketplace administrator can cancel the approval procedure and and return the product into *draft* status. |
| Denied               | When the marketplace administrator rejects the product in the Back Office, the product gets *denied* status in the Merchant Portal. The marketplace administrator can cancel the approval procedure and and return the product into *draft* status. |

{% info_block infoBox "Info" %}

You can configure the logic of the statuses on the project level.

{% endinfo_block %}

A product is only displayed in the Storefront if it is *approved* and its status is *Active*.

## Marketplace Product Approval process workflow

In order for the marketplace product to be displayed in the Storefront, every [merchant](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) needs this product to be approved by the marketplace administrator. The approval process goes through the following stages:

1. **Submitting the product for approval.** The [merchant user](https://docs.spryker.com/docs/marketplace/user/intro-to-the-spryker-marketplace/marketplace-personas.html) submits the request for product approval in the Merchant Portal. The status of the product changes to *Waiting for approval*.

2. **Product approval or rejection.** The marketplace administrator can view the products and update their status in the Back Office. If the product is approved, the approval status changes to *Approved*. If the marketplace administrator rejects the product, the product gets *Denied* status.

## Marketplace Product Approval data import

A marketplace owner can set a default approval status for marketplace products owned by a certain merchant via data import. See [File details: merchant_product_approval_status_default.csv](docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-approval-status-default.csv.html) to learn more how to do it.