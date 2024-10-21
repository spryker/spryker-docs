---
title: Splittable Order Items overview
description: Product concretes are splittable. Avoid the creation of numerous sales order items, make them non-splittable (no many sales orders, only one will be created).
last_updated: Aug 18, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/splittable-order-items-overview
originalArticleId: 9f4bfeca-f799-42ba-ac91-0c8052aa6970
redirect_from:
  - /2021080/docs/splittable-order-items-overview
  - /2021080/docs/en/splittable-order-items-overview
  - /docs/splittable-order-items-overview
  - /docs/en/splittable-order-items-overview
  - /docs/scos/user/features/202200.0/order-management-feature-overview/splittable-order-items-overview.html
  - /docs/scos/user/features/202311.0/order-management-feature-overview/splittable-order-items-overview.html
  - /docs/scos/user/features/202204.0/order-management-feature-overview/splittable-order-items-overview.html
---

As a final step of checkout, for each item in the cart, sales order items are created. By default, each product concrete is splittable. For example, if the product concrete is a pallet containing 1000 cans, 1000 sales order items will be created in the database upon checkout. To avoid the creation of numerous individual sales order items for such products, you can make them non-splittable; that is, instead of many sales orders, just one will be created. This can be achieved by specifying either `true` or `false` value for `is_quantity_splittable` field in the product table. The `is_quantity_splittable` attribute (`true` by default) controls how many sales order items are created as a result of checkout.

Depending on the `is_quantity_splittable` value, a different number of splittable order items (SOI) is created. But the following is always true:

```
cart item quantity = sum(SOI[i].quantity)
```

The following table shows quantities that are created in the system if a concrete product containing five products has the `is_quantity_splittable` attribute set to `true` and `false`:

| CART ITEM | IS_QUANTITY_SPLITTABLE | CART ITEM QUANTITY | Number of SOIs created | QUANTITIES WITHIN THE SOIS |
| --- | --- | --- | --- | --- |
| example concrete 1 | true | 5 | 5 | _1 |
| example concrete 2 | false | 5 | 1 | 5 |

Product concrete with `is_quantity_splittable = true` has a separate line for each order item in the webshop:
![Order details](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Splittable+Order+Items/Splittable+Order+Items+Feature+Overview/SOI.png)

Product concrete with `is_quantity_splittable = false` is counted as one sales item in the web shop:
![is_quantity_splittable = false](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Splittable+Order+Items/Splittable+Order+Items+Feature+Overview/SOI-false.png)

You can import splittable information for product concretes in the `product_concrete.csv` file by setting the value of the `is_splittable` field to either 1 or 0.

To import concrete products, run the following command:

`console data:import product-concrete`

For non-splittable order items, a Back Office user sees just one product per non-splittable item in the Back Office. For example, if a customer makes an order containing a non-splittable product in the quantity of 2, just 1 sales item with quantity = 2 (1 line) is created in the database. A Back Office user also sees just one sales order item (1 line) in the **Number of Items** column of the **Order Overview** page, and the actual quantity of items in the order is shown in the **Quantity** field of the **Order Details** page.

Both non-splittable and splittable order items can be refunded in the Back Office. However, unlike splittable orders, you can't refund orders with unsplittable items partially - only the whole order can be refunded, irrespective of its quantity. There are 2 prices in the `ItemTransfer` which are in balance: `RefundableAmount` and `CanceledAmount`. The refundable amount is calculated by the formula:

`refundable amount: sumPriceToPayAggregation - canceledAmount`
