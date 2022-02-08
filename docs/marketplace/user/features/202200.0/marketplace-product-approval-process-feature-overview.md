---
title: Marketplace Product Approval Process feature overview
description: This document contains concept information for the Marketplace Product Approval Process feature.
template: concept-topic-template
---
The [marketplace operator](/docs/marketplace/user/intro-to-the-spryker-marketplace/back-office-for-marketplace-operator.html) is primarily responsible for ensuring the quality of data on the marketplace, including merchants, products, and offers. To control those things in the Marketplace, the approval mechanism is a key feature.

Marketplace Product Approval Process is based on the [approval concept](/docs/scos/user/features/202108.0/approval-process-feature-overview.html#approval-process-concept)

## Product lifecycle

{% info_block warningBox "Note" %}

The following workflow is valid only in case the Marketplace Product Approval Process feature is enabled.

{% endinfo_block %}

A product can have one of the following statuses:

| STATUS               | DESCRIPTION                                                  |
| -------------------- | ------------------------------------------------------------ |
| Draft                | When the product is created, it obtains the *draft* status.  |
| Waiting for approval | When the product is sent for approval, the status changes to *waiting for approval*. At this point, you can cancel the approval procedure and return the product into *draft* status. |
| Approved             | The marketplace administrator can  approve the product in the Back Office and in this case the status of the product will change to the *approved* one in the Merchant Portal. The marketplace administrator can cancel the approval procedure and and return the product into *draft* status. |
| Denied               | When the marketplace administrator doesn't approve the product in the Back Office, the product gets *denied* status in the Merchant Portal. The marketplace administrator can cancel the approval procedure and and return the product into *draft* status. |

{% info_block infoBox "Info" %}

You can configure the logic of statuses on the project level.

{% endinfo_block %}

A product is only displayed in the Storefront if it is *approved* and its status is *Active*.

## Marketplace Product Approval process workflow
