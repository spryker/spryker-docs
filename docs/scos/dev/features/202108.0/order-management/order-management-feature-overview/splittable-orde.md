---
title: Splittable Order Items overview
originalLink: https://documentation.spryker.com/2021080/docs/splittable-order-items-overview
redirect_from:
  - /2021080/docs/splittable-order-items-overview
  - /2021080/docs/en/splittable-order-items-overview
---

As a final step of checkout, for each item in the cart, sales order items are created. By default, each product concrete is splittalble: i.e. if the product concrete is a pallet containing 1000 cans, 1000 sales order items will be created in the database upon checkout. To avoid creation of numerous individual sales order items for such products, you can make them non-splittable - i.e instead of many sales orders, just one will be created. This can be achieved by specifying either "true" of "false" value for `is_quantity_splittable` field in the product table. `is_quantity_splittable` attribute (true by default) controls how many sales order items should be created as a result of checkout.

Depending on the `is_quantity_splittable` value, different amount of splittable order items (SOI) is created. But the following is always true:

```
cart item quantity = sum(SOI[i].quantity)
```

The table below shows quantities that will be created in the system if a concrete product, containing 5 product, would have `is_quantity_splittable` attribute set to true and false:

| Cart item | is_quantity_splittable | Cart Item Quantity | Number of SOIs created | Quantities Within the SOIs |
| --- | --- | --- | --- | --- |
| example concrete 1 | true | 5 | 5 | _1 |
| example concrete 2 | false | 5 | 1 | 5 |

Product concrete with `is_quantity_splittable = true` has a separate line for each order item in the web shop:
![Order details](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Splittable+Order+Items/Splittable+Order+Items+Feature+Overview/SOI.png){height="" width=""}

Product concrete with `is_quantity_splittable = false` is counted as one sales item in the web shop:
![is_quantity_splittable = false](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Splittable+Order+Items/Splittable+Order+Items+Feature+Overview/SOI-false.png){height="" width=""}

It is possible to import splittable information for product concretes in the `product_concrete.csv` file by setting the value of the `is_splittable` field to either 1 or 0. 

To import concrete products, run the following command:

`console data:import product-concrete`

For non-splittable order items, a Back Office user sees just one product per non-splittable item in the Back Office. For example, if a customer makes an order containing a non-splittable product in the quantity of 2, just 1 sales item with quantity = 2 (1 line) is created in the database. A Back Office user aslo sees just one sales order item (1 line) in _Number of Items_ column of the *Order Overview* page, and actual quantity of items in the order is shown in the _Quantity_ field of the Order details page.

Both non-splittable and splittable order items can be refunded in the Back Office. However, unlike splittalbe orders, it is impossible to refund orders with unsplittable items partially - only the whole order can be refunded, irrespective of its quantity. Currently, there are 2 prices in the `ItemTransfer` which are in balance: _RefundableAmount_ and _CanceledAmount_. The refundable amount is calculated by the formula:

`refundable amount: sumPriceToPayAggregation - canceledAmount`


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li>Enable Splittable Order Items in your project:</li>
                <li><a href="https://documentation.spryker.com/docs/quick-order-non-splittable-products-feature-integration" class="mr-link">Integrate the Order Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/quick-order-non-splittable-products-feature-integration" class="mr-link">Integrate the Quick Add to Cart + Non-splittable Products feature</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/splittable-order-items-feature-overview" class="mr-link">Get a general idea of the Splittable Order Items feature</a></li>
                <!--<li><a href="#" class="mr-link">View splittable and non-splittable orders in the Back Office</a></li>-->
            </ul>
        </div>
    </div>
</div>

