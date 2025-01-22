---
title: Create merchant relations
description: Learn how to create merchant relations in the Spryker Marketplace Back Office for your Spryker B2B Projects.
template: back-office-user-guide-template
last_updated: Nov 17, 2023
---

This document describes how to create merchant relations in the Back Office.

## Prerequisites

* [Create a merchant](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/create-merchants.html).
* [Create a company](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-companies.html).
* Optional: [Create a product list](/docs/pbc/all/product-information-management/{{page.version}}/base-shop//manage-in-the-back-office/product-lists/create-product-lists.html). It's needed to allow or deny a company access to certain products.
* Review the [reference information](#reference-information-create-a-merchant-relation) before you start, or look up the necessary information as you go through the process.

## Create a merchant relation

1. Go to **B2B Contracts&nbsp;<span aria-label="and then">></span> Merchant Relations**.
2. On the **Overview of Merchant relation** page, click **Add Merchant relation**.
3. On the **Create Merchant Relation** page, select a **MERCHANT**.
4. Select a **COMPANY**.
5. Click **Confirm**.
6. Select a **BUSINESS UNIT OWNER**.
7. Optional: Enter and select one or more **ASSIGNED BUSINESS UNITS**.
8. Optional: Enter and select one or more **ASSIGNED PRODUCT LISTS**.
9. Click **Save**.

## Reference information: Create a merchant relation

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| MERCHANT | A merchant that will be selling products to the company. |
| COMPANY | A company that will be buying products from the merchant. |
| BUSINESS UNIT OWNER | The business unit that has a contract with the merchant. |
| ASSIGNED BUSINESS UNITS | The business units that will be ordering products from the merchant. |
| ASSIGNED PRODUCT LISTS | Product lists to allow or deny the company access to. If you add an allowlist product list, only the product from the list will be available to the company. If you don't select any lists, the entire product catalog will be available to the company.  |


## Next steps

* Define merchant-specific prices. For instructions, see [Creating abstract products and product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) and [Creating a product variant](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/products/create-product-variants.html).
* Define order thresholds for merchants. For instructions, see [Manage merchant order thresholds](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-in-the-back-office/define-merchant-order-thresholds.html).
