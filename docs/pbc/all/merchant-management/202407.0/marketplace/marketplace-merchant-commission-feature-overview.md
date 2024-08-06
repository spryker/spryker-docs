---
title: Marketplace Merchant Commission feature overview
last_updated: Apr 23, 2021
description: Merchant categories help you easily find relevant merchants.
template: concept-topic-template
---


The Marketplace Commissions enables marketplace owners to monetize their services by calculating a fee on sales made through their platform. This feature allows for flexible commission structures, such as fixed fees, percentage-based fees, or a combination of both. Commissions can apply differently across various categories, products, or sellers. For example, you might want to collect a smaller commission from merchants that sell products in categories with smaller selling volumes.

## Managing merchant commissions

A Back Office user can import commissions by following [Import merchant commissions in the Back Office](/docs/pbc/all/merchant-management/202407.0/marketplace/import-merchant-commissions-in-the-back-office.html).

A developer can manually import commissions. For import file details, see [Import file details: merchant_commission.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant-comission.csv.html).


## Applying merchant commissions conditionally

Conditions are used to identify which commission is to be applied. Conditions can be applied to individual items or orders.

Conditions are based on the following criteria:
* Product attribute, like brand or color.
* Product category, like Electronics.
* Item price, for example—a price range of 100€ to 200€.
* Product SKU
* Merchant, like ACME Inc.

For a commission to be applied to an item or order, the item or order needs to fulfill all the conditions defined for a commission.


### Product attribute conditions

To specify conditions based on attributes, the following format is used: `attribute.{ATTRIBUTE_KEY} {OPERATOR} '{ATTRIBUTE_VALUE}'`.

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {ATTRIBUTE_KEY} | A product category attribute. For example, brand or color. |
| {OPERATOR} | The relationship between `{ATTRIBUTE_KEY}` and `{ATTRIBUTE_VALUE}`. Accepted operators: `>`, `<`, `>=`, `<=`,`!=`,`=`, `IS NOT IN`, `IS IN`. |
| {ATTRIBUTE_VALUE} | The attribute of a product in the category of ``{ATTRIBUTE_KEY}`. For example, in the brand category, the value can be Sony. Accepts multiple values separated by `;`.|

Examples:

* Apply commission to all black products: `attribute.color = 'black'`

* Apply commission to all black and blue products: `attribute.color IS IN 'black;blue'`


### Product category conditions

To specify conditions based on categories, the following format is used: `category {OPERATOR} '{CATEGORY_VALUE}'`

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {OPERATOR} | The relationship between category and `{CATEGORY_VALUE}`. Accepted operators: `IS NOT IN`, `IS IN`, `=`, `!=`. |
| {CATEGORY_VALUE} | The category for defining a condition. Accepts multiple values separated by `;`. |


Examples:
* Apply commission to all products in the Electronics category: `category IS IN 'electronics'`
* Apply commission to all products in the Smartphones and Smartwatches categories: `category IS IN 'smartphones;smartwatches'`.


If a category has child categories, applying a commission to the category applies it to the child categories too. For example, applying commission to the Electronics category also apply it to the Smart Watches category. So, you might want to set up conditions using child categories or exclude some child categories.

### Item price conditions

To specify conditions based on item prices, the following format is used: `item-price {OPERATOR} '{PRICE_VALUE}'`

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {OPERATOR} | The relationship between item-price and `{PRICE_VALUE}`. Accepted operators: `<`, `<=`, `=`, `!=`, `>=`, `>`, `IS IN`, `IS NOT IN`. |
| {PRICE_VALUE} | The price to check the condition against. Accepts decimal numbers and ranges. Item price is taken from the product's gross or net price depending on the price mode of the order. The product gross price is configured in the backend (including volume pricing) and does not include any discounts applied afterward in the shopping cart or checkout. |

Example: `item-price > '2' AND item-price <= '10.99'`.


### SKU-based conditions


To specify conditions based on SKU, use the following format: `SKU {OPERATOR} {SKU_VALUE}`

|PLACEHOLDER | DESCRIPTION |
| - | - |
| {OPERATOR} | The relationship between category and `{CATEGORY_VALUE}`. Accepted operators: `IS NOT IN`, `IS IN`, `=`, `!=`. |
| {SKU_VALUE} | The SKU to check the condition against. Accepts product concrete SKUs. Accepts multiple values separated by `;`. |

Example: `SKU IS IN '136_24425591;134_29759322'`

### Price mode based commissions

To specify conditions based on price mode, use the following format: `price-mode = '{PRICE_MODE}'`. For example, `price-mode = 'GROSS_MODE'`.

This can be useful if you want different commissions to be applied to orders in different prices modes.







### Combining conditions

Conditions can be combined using `AND` and `OR` operators. Examples:

* `category IS IN 'electronics';smart-watches' AND attribute.color IS IN 'black;blue'`
* `category IS IN 'electronics';smart-watches' OR attribute.color IS IN 'black;blue'`

When conditions are combined by the `OR` operator, they don't exclude each other. If an order fulfills both such conditions, the commission is still applied.


### Inclusion operators

`contains` and `does not contain` operators are supported by default for conditions based on attributes, item-price, categories, and SKU. *We don't recommend* using these operators to avoid accidental matches or matches caused by typos. For example, `cartoon` contains `art`. However, this might be useful when using special characters in product attributes.



## Applying commissions to specific merchants


The `merchants_allow_list` attribute lets you apply a commission to one or more particular merchants. This is useful when you only want to apply a commission to some of your merchants; or when you have a universal commission for most merchants and a special commission for some of them. For example, your setup could be as follows. We simplified the commissions for this example by removing irrelevant fields.

| KEY | PRIORITY | AMOUNT | merchants_allow_list |
| mc01 | 1 | 10 | MER000002,MER000004 |
| mc02 | 2 | 5 |   |

In the prior example, the system first checks if an order is fulfilled by merchants `MER000002` or `MER000004`. If this condition is fulfilled, the `mc01` commission is applied. If an order is fulfilled by any other merchant, the universal commission `mc02` is applied. The empty `merchants_allow_list` attribute means that this commission applies to all merchants.

If you have multiple commissions, depending on your setup, you will have to use priorities and groups to make sure that relevant commissions are applied. In the prior example, the merchant-specific commission with priority `1` is validated before the universal commission. If the merchant-specific commission had a lower priority, the universal commission would be applied because it doesn't have a merchant condition. For more details about priority, see [Merchant commission priority and groups](#merchant-commission-priority-and-groups)




## Merchant commission priority and groups

Priority and groups are used to make sure relevant commissions are applied when there are multiple commissions in a system.

Merchant commission groups are used when multiple commissions need to be applied per order. By default, there are `primary` and `secondary` commission groups. When commissions of both groups exist in a shop, for each order, one commission from each group is applied; the commission from the primary group is applied first.

Merchant commission priority is used to define which commission is to be applied within a commission group when there're multiple commissions in a system. Priority is defined in an ascending order starting from 1. If multiple commissions have the same priority, the last created commission is applied.

For example, your setup could be as follows. We simplified the commissions for this example by removing irrelevant fields.

| Commission Key | Priority | Group |
| - | - | - |
| MC01 | 1 | Primary |
| MC02 | 2 | Primary |
| MC03 | 2 | Secondary |
| MC04 | 1 | Secondary |

If an order item fulfills the conditions of all the commissions in the prior example, commissions `MC01` and `MC04` are applied. First, the system selects commission `MC01` as the commission with the highest priority in the `Primary` group. Then, the system selects commission `MC04` as the commission with the highest priority in the `Secondary` group.




## Apply commissions to GROSS or NET price

The price mode used to apply commissions is defined separately from the order price mode and applies to the whole store. This price mode configuration controls which prices are used as a basis to calculate commission: gross or net price. The item gross price and net price is configured in the backend, including volume pricing, and doesn't include any discounts applied in the shopping cart afterwards.

Price mode is defined in `MERCHANT_COMMISSION_PRICE_MODE_PER_STORE`. For details, see [Install the Marketplace Merchant Commission feature](https://docs.spryker.com/docs/pbc/all/merchant-management/202407.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html#set-up-configuration).



## Current limitations

Price Mode switcher is not supported. The Merchant Commission Price Mode must match the default price mode of the store that sets it for the sales order as a result. Otherwise, the percentage commission will be set to 0 for all items in the order.

Supported configuration:

| Order Price Mode | Merchant Commission Price Mode |
| - | - |
| GROSS_MODE | GROSS_MODE |
| NET_MODE | NET_MODE |



## Applying merchant commissions to the sum item total price to pay after discounts with additions

You might want to change how commission is calculated on the project level by applying commissions to the sum item total price to pay after discounts with additions. In Glue API, this is represented by `sumPriceToPayAggregation`. This can be useful when you want to apply commissions to total paid by a customer a line item. This amount is what the customer is getting charged. Sum of all line items plus expenses, like a shipment fee, is equal to the grand total.

This customization is factored into the application design. A developer can change this logic within two hours by following [Create merchant commission calculator type plugin].

Other use cases might be as follows:
* Apply commission to product price including product options differently
* Apply commission to special products like bundles or configurable differently


You might want to set up different commission rules based on this because it affects commission totals.

For example, if customer uses Net mode, you might want to apply 10% commission, while if customer uses Gross mode commission applied will be 12%.
