---
title: Managing marketplace concrete product prices
last_updated: Aug 11, 2021
description: This document describes how to manage marketplace concrete product prices in the Merchant Portal.
template: back-office-user-guide-template
---

This document describes how to manage marketplace concrete product prices in the Merchant Portal.

## Prerequisites

To start working with the marketplace concrete products, take the following steps:
1. Go to **Merchant Portal&nbsp;<span aria-label="and then">></span> Products**.
2. Hover over the three dots next to the abstract product for which you manage a concrete product and click **Manage Product** or just click the line. The ***[Product name]*** drawer opens.
3. Navigate to the **Concrete Products** tab.

This document contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Adding a marketplace concrete product price

To add a new price for a marketplace concrete product:

1. On the **Concrete Products** page, next to the concrete product you want to edit, hover over the three dots and click **Manage Product** or just click the line. The **Concrete Product SKU, Name** page opens.
2. Scroll down to the **Price** pane.
3. In the **Price** pane, click **+Add**. The empty cells appear in the following table.
4. From the drop-down menu **Store**, select the store for which the price is created.
5. From the drop-down menu **Currency**, select the currency in which the price is defined.
6. For the **NET DEFAULT** cell, enter a price. Use `.` or `,` separators.
7. For the **GROSS DEFAULT** cell, enter a price. Use `.` or `,` separators.
8. Optional: For the **GROSS DEFAULT** cell, enter a price. Use `.` or `,` separators.
9. Optional: For the **NET ORIGINAL** cell, enter a price. Use `.` or `,` separators.
10. Optional: For the **GROSS ORIGINAL** cell, enter a price. Use `.` or `,` separators.
11. For the **QUANTITY** cell, enter the number of items. By default, the quantity is 1. For an example, see [Adding volume prices](#adding-volume-prices).

**Tips and tricks**

To stop creating a new price, click **Cancel**.

To keep the prices of the abstract product, select **Use Abstract Product price for all locales**.

## Editing marketplace concrete product prices

To edit prices of a marketplace concrete product:
1. On the **Concrete Products** page, next to the concrete product you want to edit, hover over the three dots and click **Manage Product** or just click the line. The **Concrete Product SKU, Name** page opens.
2. Scroll down to the **Price** pane.
2. Hover over the table and update the necessary cells.

**Tips and tricks**

You can sort the prices by stores and currencies. To do that, in the **Price** pane, in the **Stores** drop-down menu, select the stores for which the price is defined, and in the **Currencies** drop-down menu, select the currencies in which the price is defined.

## Deleting marketplace concrete product prices

To remove price of a marketplace concrete product:

1. On the **Concrete Products** page, next to the concrete product you want to edit, hover over the three dots and click **Manage Product** or just click the line. The **Concrete Product SKU, Name** page opens.
2. Scroll down to the **Price** pane.
3. Next to the price you want to remove, hover over the three dots in the table, and click **Delete**.

### Reference information: Price pane

|ATTRIBUTE  | DESCRIPTION   |
| ------------- | --------------------- |
| Store          | [Store](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html) in which the price will be displayed. |
| Currency       | Currency in which the concrete product price is defined.           |
| Net default    | Default item price before tax. |
| Gross default  | Item price after tax.   |
| Net original   | Item price before tax displayed as a strikethrough beside the default price on the Storefront. It is usually used to indicate a price change. |
| Gross original |Item price after tax displayed as a strikethrough beside the default price on the Storefront. It is usually used to indicate a price change. |
| Quantity       | Number of items for which the price is defined. This field ID used to define the volume prices for the concrete product.  |

### Adding volume prices

Let's say you have a product that you want to sell with a special price if a user wants to buy a specific number of the same product. For example, a laptop costs €354.35, but you have defined that if a user buys three items, the cost will be €340 instead of €354.35. In this case, you can define a product quantity starting from which a special [volume price](/docs/scos/user/features/{{page.version}}/prices-feature-overview/volume-prices-overview.html) applies.

![Volume prices - marketplace product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Products/volume-prices-merchant-products.gif)

## Next steps

- [Manage concrete product](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product.html)
- [Manage concrete product image sets](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-products-image-sets.html)
- [Manage concrete product attributes](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product-attributes.html)
