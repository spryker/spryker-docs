---
title: Edit merchants
description: Learn how to edit merchants that are configured in the Spryker Cloud Commerce OS Back Office for your B2B Projects.
template: back-office-user-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/201811.0/marketplace/merchants-and-merchant-relations/managing-merchants.html
  - /docs/scos/user/back-office-user-guides/202311.0/marketplace/merchants/edit-merchants.html
  - /docs/scos/user/back-office-user-guides/202204.0/marketplace/merchants/edit-merchants.html
related:
  - title: Create merchants
    link: docs/pbc/all/merchant-management/page.version/base-shop/manage-in-the-back-office/create-merchants.html
  - title: Merchants and Merchant Relations feature overview
    link: docs/pbc/all/merchant-management/page.version/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html
---

This document describes how to edit merchants in the Back Office.


## Prerequisites

Review the [reference information](#reference-information-edit-merchants) before you start, or look up the necessary information as you go through the process.

## Edit a merchant

1. Go to **Marketplace&nbsp;<span aria-label="and then">></span> Merchants**.
    This opens the **Overview of Merchants** page.
2. Next to the merchant you want to edit, click **Edit**.
3. On the **Edit Merchant** page, update any of the following:
    * Enter a **NAME**.
    * Enter a **REGISTRATION NUMBER**.
    * Enter an **EMAIL**.
    * To activate the merchant, select the **IS ACTIVE** checkbox.
    * To deactivate the merchant, clear the **IS ACTIVE** checkbox.
    * For **STORE RELATION**, select or clear the checkboxes next to the needed stores.
    * Enter a **MERCHANT URL** for the needed locales.
4. Click **Save**.

The page refreshes with a success message displayed.

## Reference information: Edit merchants

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| NAME | Merchant's name that is displayed on the Storefront.  |
| REGISTRATION NUMBER | Unique registration identifier of the merchant. |
| MERCHANT REFERENCE | Unique merchant identifier in Spryker and an ERP. |
| EMAIL | Merchant's email address. Each email address can only be used by one merchant.  |
| IS ACTIVE | Defines if the merchant's profile and products are displayed on the Storefront. |
| STORE RELATION | The stores in which the merchant's profile and products are displayed. |
| MERCHANT URL | URL of the merchant's profile per store.  |
