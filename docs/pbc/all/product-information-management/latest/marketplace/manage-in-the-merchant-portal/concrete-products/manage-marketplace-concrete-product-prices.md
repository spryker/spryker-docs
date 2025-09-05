---
title: Manage marketplace concrete product prices
description: This document describes how to manage marketplace concrete product prices in the Merchant Portal.
template: back-office-user-guide-template
redirect_from:
last_updated: Nov 21, 2023
related:
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
  - title: Marketplace Merchant Custom Prices feature overview
    link: docs/pbc/all/price-management/page.version/marketplace/marketplace-merchant-custom-prices-feature-overview.html
---

This document describes how to manage marketplace concrete product prices in the Merchant Portal.

## Prerequisites

To start working with the marketplace concrete products, follow these steps:

1. Go to **Merchant Portal&nbsp;<span aria-label="and then">></span> Products**.
2. Hover over the three dots next to the abstract product for which you manage a concrete product and click **Manage Product** or just click the line. The ***[Product name]*** drawer opens.
3. Navigate to the **Concrete Products** tab.

This document contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Adding a marketplace concrete product price

To add a new price for a marketplace concrete product, follow these steps:

1. On the **Concrete Products** page, next to the concrete product you want to edit, hold the pointer over the three dots and click **Manage Product** or just click the line. The **Concrete Product SKU, Name** page opens.
2. Scroll down to the **Price** pane.
3. In the **Price** pane, click **+Add**. The empty cells appear in the following table.
4. Optional: To set a price for a specific customer, from the **Customer** drop-down menu, select the appropriate [business unit](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html) to apply the price to.

  {% info_block infoBox "Note" %}

  In order for the business unit to which the customer is assigned to appear in the **Customers** drop-down menu, in the Back Office, create the [merchant relation](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/edit-merchant-relations.html).

  You can set customer-specific prices for [marketplace products](/docs/pbc/all/offer-management/{{page.version}}/marketplace/marketplace-product-offer-feature-overview.html), not [product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/marketplace-product-offer-feature-overview.html).

  Also, you cannot combine customer-specific prices with volume prices.

  {% endinfo_block %}

5. From the drop-down menu **STORE**, select the store for which the price is created.
6. From the drop-down menu **CURRENCY**, select the currency in which the price is defined.
7. For the **NET DEFAULT** cell, enter a price. Use `.` or `,` separators.
8. For the **GROSS DEFAULT** cell, enter a price. Use `.` or `,` separators.
9. Optional: For the **GROSS DEFAULT** cell, enter a price. Use `.` or `,` separators.
10. Optional: For the **NET ORIGINAL** cell, enter a price. Use `.` or `,` separators.
11. Optional: For the **GROSS ORIGINAL** cell, enter a price. Use `.` or `,` separators.
12. For the **QUANTITY** cell, enter the number of items. By default, the quantity is 1. For an example, see [Adding volume prices](#adding-volume-prices).

**Tips and tricks**

To stop creating a new price, click **Cancel**.

To keep the prices of the abstract product, select **Use Abstract Product price for all locales**.

## Editing marketplace concrete product prices

To edit marketplace concrete product's prices, follow these steps:

1. On the **Concrete Products** page, next to the concrete product you want to edit, hold the pointer over the three dots and click **Manage Product** or just click the line. The **Concrete Product SKU, Name** page opens.
2. Scroll down to the **Price** pane.
3. Next to the price you want to edit, hover over the table and update the necessary cells.

**Tips and tricks**

You can sort the prices by stores and currencies. To do that, in the **Price** pane, in the **Stores** drop-down menu, select the stores for which the price is defined, and in the **Currencies** drop-down menu, select the currencies in which the price is defined.

## Deleting marketplace concrete product prices

To remove a marketplace concrete product's price, follow these steps:

1. On the **Concrete Products** page, next to the concrete product you want to edit, hold the pointer over the three dots and click **Manage Product** or just click the line. The **Concrete Product SKU, Name** page opens.
2. Scroll down to the **Price** pane.
3. Next to the price you want to remove, hold the pointer over the three dots in the table, and click **Delete**.

### Reference information: Price pane

|ATTRIBUTE  | DESCRIPTION   |
| ------------- | --------------------- |
| Customer | Defines whether the price will be applied to all customers or a specific one. If **Default** is selected, the price will be applied to all customers.   |
| Store          | [Store](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) in which the price will be displayed. |
| Currency       | Currency in which the concrete product price is defined.           |
| Net default    | Default item price before tax. |
| Gross default  | Item price after tax.   |
| Net original   | Item price before tax displayed as a strikethrough beside the default price on the Storefront. It is usually used to indicate a price change. |
| Gross original |Item price after tax displayed as a strikethrough beside the default price on the Storefront. It is usually used to indicate a price change. |
| Quantity       | Number of items for which the price is defined. This field ID is used to define the volume prices for the concrete product.  |

### Adding volume prices

Let's say you have a product that you want to sell with a special price if a user wants to buy a specific number of the same product. For example, a laptop costs €354.35, but you have defined that if a user buys three items, the cost will be €340 instead of €354.35. In this case, you can define a product quantity starting from which a special [volume price](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/volume-prices-overview.html) applies.

![Volume prices - marketplace product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Products/volume-prices-merchant-products.gif)

## Next steps

- [Manage concrete product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/edit-marketplace-concrete-products.html)
- [Manage concrete product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products-image-sets.html)
- [Manage concrete product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-attributes.html)
