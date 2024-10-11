---
title: Create merchants
description: Learn how to create merchants in the Back Office.
last_updated: Sep 1, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-merchants
originalArticleId: e35ca668-b297-45bb-86ab-2fb4e519abfe
redirect_from:
  - /2021080/docs/managing-merchants
  - /2021080/docs/en/managing-merchants
  - /docs/managing-merchants
  - /docs/en/managing-merchants
  - /docs/scos/user/back-office-user-guides/202204.0/marketplace/merchants-and-merchant-relations/managing-merchants.html
  - docs/scos/user/back-office-user-guides/202311.0/marketplace/merchants/create-merchants.html
  - /docs/scos/user/back-office-user-guides/202204.0/marketplace/merchants/create-merchants.html
related:
  - title: Edit merchants
    link: docs/pbc/all/merchant-management/page.version/base-shop/manage-in-the-back-office/edit-merchants.html
  - title: Merchants and Merchant Relations feature overview
    link: docs/pbc/all/merchant-management/page.version/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html
---

This document describes how to create merchants in the Back Office.


{% info_block infoBox "" %}

In a non-marketplace environment, a merchant is a record of the company which sells goods and is the only one in the system.

{% endinfo_block %}


## Prerequisites

Review the [reference information](#reference-information-create-a-merchant) before you start, or look up the necessary information as you go through the process.

## Create a merchant

1. Go to **Marketplace&nbsp;<span aria-label="and then">></span> Merchants**.
2. On the **Overview of Merchants** page, click **Add Merchant**.
3. On the **Create Merchant** page, enter a **NAME**.
4. Optional: Enter a **REGISTRATION NUMBER**.
5. Enter a **MERCHANT REFERENCE**.
6. Enter an **EMAIL**
7. To make the merchant active after creating it, select the **IS ACTIVE** checkbox.
8. For **STORE RELATION**, select the stores you want the merchant to be active in.
9. Enter **MERCHANT URL** for each locale.
10. Click **Save**.

## Reference information: Create a merchant

| ATTRIBUTE | DESCRIPTION  |
| --- | --- |
| NAME | Merchant's name that will be displayed on the Storefront.  |
| REGISTRATION NUMBER | Unique registration identifier of the merchant. |
| MERCHANT REFERENCE | Unique merchant identifier in Spryker and an ERP. |
| EMAIL | Merchant's email address. Each email address can only be used by one merchant.  |
| IS ACTIVE | Defines if the merchant's profile and products will be displayed on the Storefront after you create it. |
| STORE RELATION | The stores in which the merchant's profile and products will be displayed. |
| MERCHANT URL | URL of the merchant's profile per store.  |

## Next steps

[Edit merchants](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/edit-merchants.html)
[View merchants](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/view-merchants.html)
[Create merchant relations](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/create-merchant-relations.html)
