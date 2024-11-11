---
title: Edit merchant relations
description: Learn how to edit merchant relations in the Back Office
template: back-office-user-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/marketplace/merchant-relations/edit-merchant-relations.html
  - /docs/scos/user/back-office-user-guides/202204.0/marketplace/merchant-relations/edit-merchant-relations.html
related:
  - title: Create merchant relations
    link: docs/pbc/all/merchant-management/page.version/base-shop/manage-in-the-back-office/create-merchant-relations.html
  - title: Merchants and Merchant Relations feature overview
    link: docs/pbc/all/merchant-management/page.version/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html
---

This document describes how to edit merchant relations in the Back Office.

## Prerequisites


1. Optional: [Create a product list](/docs/pbc/all/product-information-management/{{page.version}}/base-shop//manage-in-the-back-office/product-lists/create-product-lists.html). It's needed to allow or deny a company access to certain products.
2. Review the [reference information](#reference-information-edit-a-merchant-relation) before you start, or look up the necessary information as you go through the process.

## Edit a merchant relation

1. Next to the merchant relation you want to edit, click **Edit**.
2. On the **Edit Merchant Relation** page, update any of the following:
    * Select a **BUSINESS UNIT OWNER**.
    * Enter and select **ASSIGNED BUSINESS UNITS**.
    * Deassign **ASSIGNED BUSINESS UNITS** by clicking **x** next to the business units you want to deassign.
    * Enter and select **ASSIGNED PRODUCT LISTS**.
    * Deassign **ASSIGNED PRODUCT LISTS** by clicking **x** next to the business units you want to deassign.
3. Once done, click **Save**.


## Reference information: Edit a merchant relation

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| MERCHANT | A merchant that will be selling products to the company. |
| COMPANY | A company that will be buying products from the merchant. |
| BUSINESS UNIT OWNER | The business unit that has a contract with the merchant. |
| ASSIGNED BUSINESS UNITS | The business units that will be ordering products from the merchant. |
| ASSIGNED PRODUCT LISTS | Product lists that the company is allowed or denied access to. If you add an allowlist product list, only the product from the list will be available to the company. If you don't select any lists, the entire product catalog will be available to the company.   |
