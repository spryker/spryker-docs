---
title: Managing marketplace abstract product prices
description: This document describes how to manage marketplace abstract product prices in the Merchant Portal.
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/user/merchant-portal-user-guides/202311.0/products/abstract-products/managing-marketplace-abstract-product-prices.html
related:
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
  - title: Marketplace Merchant Custom Prices feature overview
    link: docs/pbc/all/price-management/page.version/marketplace/marketplace-merchant-custom-prices-feature-overview.html
---

This document describes how to manage marketplace abstract product prices in the Merchant Portal.

## Prerequisites

To start working with marketplace abstract products, go to **Merchant Portal&nbsp;<span aria-label="and then">></span> Products**.

This document contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Adding a marketplace abstract product price

To add a new price for a marketplace abstract product, follow these steps:

1. Next to the abstract product, where you want to add a price for, hover over the three dots, or just click the line, and then click **Manage Product**. This takes you to the **_[Product name]_**, **Abstract Product Details** tab.
2. Scroll down to the **Price** pane.
3. In the **Price** pane, click **+Add**. The empty cells appear in the following table.

4. Optional: To set a price for a specific customer, from the **Customer** drop-down menu, select the appropriate customer's [business unit](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html) to apply the price to.

  {% info_block infoBox "Note" %}

  In order for the business unit to which the customer is assigned to appear in the **Customers** drop-down menu, in the Back Office, create the [merchant relation](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/edit-merchant-relations.html).

  You can set customer-specific prices for the [marketplace products](/docs/pbc/all/offer-management/{{page.version}}/marketplace/marketplace-product-offer-feature-overview.html), not [product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/marketplace-product-offer-feature-overview.html).

  {% endinfo_block %}

5. From the **STORE** drop-down menu, select the store for which the price is created.
6. From the **CURRENCY** drop-down menu, select the currency in which the price is defined.
7. For the **NET DEFAULT** field, enter a price. Use `.` or `,` separators.
8. For the **GROSS DEFAULT** field, enter a price. Use `.` or `,` separators.
9. Optional: For the **NET ORIGINAL** field, enter a price. Use `.` or `,` separators.
10. Optional: For the **GROSS ORIGINAL** field, enter a price. Use `.` or `,` separators.
11. For the **QUANTITY** field, enter the number of items. By default, the quantity is 1. For an example, see [Adding volume prices](#adding-volume-prices).

**Tips and tricks**

Click **Cancel** to stop creating a new price.


## Editing abstract product prices

To edit a marketplace abstract product's prices, follow these steps:

1. Next to the abstract product, the price of which you want to edit, hover over the three dots, or just click the line, and then click **Manage Product**. This takes you to the **_[Product name]_**, **Abstract Product Details** tab.
2. Scroll down to the **Price** pane.
3. Next to the price you want to edit, hover over the table and update the necessary cells.

**Tips and tricks**

You can sort the prices by stores and currencies. To do that, in the **Price** pane, in the **Stores** drop-down menu, select the stores for which the price is defined, and in the **Currencies** drop-down menu, select the currencies in which the price is defined.


## Deleting abstract product prices

To remove abstract product's price, follow these steps:

1. Next to the abstract product, the price of which you want to delete, hover over the three dots, or just click the line, and then click **Manage Product**. This takes you to the **_[Product name]_**, **Abstract Product Details** tab.
2. Scroll down to the **Price** pane.
3. Next to the price you want to remove, hover over the three dots in the table, and click **Delete**.


## Reference information: Price pane


|ATTRIBUTE  | DESCRIPTION   |
| ------------- | --------------------- |
| Customer | Defines whether the price will be applied to all customers or a specific one. If **Default** is selected, the price will be applied to all customers.  |
| Store          | [Store](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) in which the price will be displayed. |
| Currency       | Currency in which the abstract product price is defined.           |
| Net default    | Default item price before tax. |
| Gross default  | Item price after tax.   |
| Net original   | Item price before tax displayed as a strikethrough beside the default price on the Storefront. It is usually used to indicate a price change. |
| Gross original | Item price after tax displayed as a strikethrough beside the default price on the Storefront. It is usually used to indicate a price change. |
| Quantity | Quantity of the product to which the prices from the **Gross price** and **Net price** fields apply. |


### Adding volume prices

Let's say you have a product that you want to sell with a special price if a user wants to buy a specific number of the same product. For example, a laptop costs €354.35, but you have defined that if a user buys three items, the cost will be €340 instead of €354.35. In this case, you can define a product quantity starting from which a special [volume price](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/volume-prices-overview.html) applies.

![Volume prices - marketplace product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Products/volume-prices-merchant-products.gif)


## Next steps

- [Edit abstract product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-products.html)
- [Manage abstract product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-attributes.html)
- [Manage abstract product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-image-sets.html)
- [Manage abstract product meta information](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-meta-information.html)
