---last_updated: Jun 16, 2021

title: Sales Schema
originalLink: https://documentation.spryker.com/2021080/docs/db-schema-sales
originalArticleId: 704a1584-b580-4875-8306-11385484444a
redirect_from:
  - /2021080/docs/db-schema-sales
  - /2021080/docs/en/db-schema-sales
  - /docs/db-schema-sales
  - /docs/en/db-schema-sales
---



## Orders

### Sales Order with Items

Spryker saves orders with line items. There are three general approaches:

1. There is one Sales Order Item for every sold product to the Sales Order. Even when the same product was sold several times. This way we can have a clear state per item.
2. All data that is necessary to process the order is copied over from other tables. So we clearly separate dynamic data (like the current name of a product) from static data (like the name of the product at the moment when it was sold).
3. Prices are saved in an explicit way so that all numbers are fixed and there is no reason for a later re-calculation.
![Sales order item](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/sales-order-item.png)

* **Structure**:

  - The **Sales Order** contains only high-level information for the direct communication with the customer (e.g. the name).
  - `order_reference` - Order reference which is in an ascending order but not linear growing. This reference must be used for all external communications instead of the auto-increment ID to avoid conclusions.
  - `is_test` - This field was supposed to mark test orders so that the order can be processed in the production environment but all external communication is mocked or also switched to test mode.
{% info_block warningBox %}
This feature is currently not functional.
{% endinfo_block %}
  - `store` - The name of the Store where the order was placed
  - `price_mode` - This field shows if the order was calculated in a net or gross price mode.

* The **Sales Order Item** contains all item-related information like the SKU and product name.

  - `sku` - SKU of the product. This is a soft relation to the Concrete Product to avoid cross-boundary coupling.
  - `quantity` - Quantity of "same" products. Per default, this value is "1" so that we save one Sales Order Item per item sold. But in case of non-Splittable Products, we can use a higher value here. We may also use higher quantities for very high numbers to avoid performance problems.

    + "Same product" means products that have the same grouping key which is a hash of the SKU and the Product Options (see class `SkuGroupKeyPlugin`). The key is also saved in the field `group_key`

  - `is_quantity_splitable` - This flag declares if the quantity can be split (e.g. in case of partial cancelations). 
 {% info_block warningBox %}
It is currently not possible to realize splits with Sales Order Items that have a quantity bigger than "1".
{% endinfo_block %}

* The Sales Order Item also holds information that is injected from other features, especially the quantity and amount of metadata from the **Measurement and Packaging Unit** features.

### Customer Data

The Sales Order contains a copy of the Customer data so that it is not affected if the Customer makes changes.
![Customer data](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/customer-data.png)

**Structure**:

* The Sales Order has a relation to the Locale which was used during the checkout so that the same locale can be used for communication.
* The Sales Order has a shipping and a billing address.

### Sales Bundles and Options

See description of the [Product Bundle](/docs/scos/dev/database-schema-guide/{{page.version}}/catalog-schema.html#product-bundles) and [Product Option](/docs/scos/dev/database-schema-guide/{{page.version}}/catalog-schema.html#product-options) schemas for more details.
![Sales and bundles options](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/sales-bundles-options.png)

**Structure**:

* **Bundles**:

  - Bundled products are saved as regular Sales Order Items.
  - The Product Bundle itself is not represented as a Sales Order Item and is placed into a special table.

* **Options**:

  - Each Sales Order Item can have multiple Product Options.
  - Each Option contains the group name (e.g. "Insurance") and the value (e.g. "1 year").


### Expenses

Sales Orders and Sales Order Items can have additional costs. Typically this is the price for the Shipment that is attached to Sales Order.

{% info_block warningBox %}
Currently, Spryker only supports expenses for the whole order and not per item.
{% endinfo_block %}
![Expenses](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/expenses.png)

**Structure**:

* The order can have several expenses (typically none or one).
* Expenses have a relation to a Shipment which is the main (and only) use case.

### Discounts

See Discount Schema for a full description:
![Discount](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/discount.png)

**Structure**:

* Discounts are distributed to all objects.
* Each object can have multiple discounts.
* Discounts are saved with the name, amount, used code (if any) and metadata (e.g. `is_refundable`) to all objects where discounts can be applied (Order, Item, Option, and Expense).

### Payments

Orders can be paid with none, one or multiple payments. Each payment is identified by a provider (e.g. Payone) and a method (e.g. Creditcard)

| Use case | Payment Method(s) |
| --- | --- |
| The customer pays the whole order with a discount | None |
| The customer pays the order with a credit card | Credit card |
| The customer pays the order with two credit cards | Credit card A Credit card B |
| The customer pays the order with a credit card and a gift card | Credit card Gift card |
![Payments](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/payments.png)

**Structure**:

* Payments are related to Sales Orders.
* The amount field contains the amount which was paid by a payment method (which is important for refunds).

## OMS Process and States

### Sales Order Item States and Process

Spryker uses State Machine to process orders. Every Sales Order Item has a distinct State and belongs to a Process. The State Machine itself is modeled via XML files and therefore not visible in the schema.
![Sales order item states and process](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/sales-order-item-states-process.png)

**Structure**:

* Each Sales Order Item is related to exactly one Process and one State (e.g. State: "payment pending" in Process: "PrePayment").
* `spy_oms_order_item_state_history` tracks the history of state per item.
* The Sales Order Item has a `last_state_change` field to avoid expensive lockups on the history table.
* State names are filled automatically when they appear the first time. Any manual change of this table can lead to operational problems because the States are matched via the name field.

### Transition Log

{% info_block infoBox %}
When something goes wrong in the fulfillment of an order then it's a good idea to have a log with all transitions.
{% endinfo_block %}

{% info_block warningBox %}
This feature is not 100% reliable at the moment and may result in performance problems. The log can be retrieved in Zed UI via a hidden URL: `/oms/log?id-order=1`
{% endinfo_block %}
![Transition log](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/transition-log.png)

**Structure**:

* The log table holds all relevant information and is related to the Sales Order and the Sales Order Item.

### State Machine Lock

{% info_block infoBox %}
The State Machine cannot be executed in parallel for the same Sales Order. For this reason, there is a lock with a configurable TTL.
{% endinfo_block %}
![State machine lock](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/state-machine-lock.png)

## Quote

{% info_block infoBox %}
The quote object contains the Cart and all user input from the Checkout (like Addresses). When the Quote is persisted in the database then we filter out all data which does not belong the Cart.
{% endinfo_block %}

### Persisted Quote (Multi-Cart per Customer)

Customers can have more than one cart and they have the option to keep the cart after checkout.
![Persisted quote](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/persisted-quote.png)

**Structure**:

* A Quote has a name, belongs to a Customer is only valid in the scope of a Store
* A Customer can have multiple Quotes but only one of them is marked as `is_default`. This is a soft relation via `customer_reference`.
* `Quote::quote_data` - Serialized quote object which contains only the cart data. Other checkout information is filtered out before the data is saved.

### Shared Quotes (Carts)

{% info_block infoBox %}
Carts can be shared among Company Users.
{% endinfo_block %}
![Shared quotes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/shared-quotes.png)

## Sales Order Prices

All calculated price values are stored to the order. The assumption is that this information is not changed afterward except for the edge case when the whole order is changed before the payment ("Recalculation").

### Overview

It's important to obey the Sales Order's `price_mode` that defines if the calculation was executed in net or gross price mode.

{% info_block infoBox %}
You can have a look inside the calculation when you add some products to the cart and then open this URL in the shop: `/calculation/debug`
{% endinfo_block %}
![Sales order prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/sales-order-prices.png)

In general, there are several types of fields:

* Plain prices which are saved in the lowest unit (e.g. "Cent").
* Amounts which can be changed by user actions (e.g. `canceled_amount`).
* Aggregated values which are summed up from related objects (for instance the `price_to_pay_aggregation` of a Sales Order Item contains the price of the item plus the price of all options minus the applied discount values).
* Totals which are applied to the Sales Order.

Prices are attached to different objects like Products, Expenses, Options, ...

All prices in the are the line prices (so multiplied by the related quantity).

| Fields | Description | Calculation |
| --- | --- | --- |
|  `tax_rate` | The tax rate of the object loaded from DB | --- |
|  `tax_amount_full_aggregation` | The sum of the `tax_amount` of all related objects |  `∑tax_amount + ∑ItemExpense::tax_amount + ∑ProductOption::tax_amount` |
|  `tax_amount` | Tax amount of the object |  `(gross_price - discount_amount_aggregation) * tax_rate / (1+tax_rate)` |
|  `subtotal_aggregation` | The price of the item with product options but without discounts and expenses. |  `gross_price + product_option_price_aggregation	+ expense_price_aggregation` |
|  `refundable_amount` | The amount that can be canceled for the item (with options, expensed and discounts), Identical with price to pay when the order is created and changed later. |  `price_to_pay_aggregation - canceled_amount` |
|  `product_option_price_aggregation` | The sum of the price of all related options of a Sales Order Item |  `∑ProductOption::gross_price` |
|  `price_to_pay_aggregation` | The price to pay for the customer. This is used as the initial refund amount for the order. Usually this is not shown in cart. |  `gross_price + product_option_price_aggregation + expense_price_aggregation - discount_amount_full_aggregation` |
|  `price` | The (original) price of the object. Either net or gross. |  `net_price` OR `gross_price` |
|  `net_price` | New price of the object from the database | --- |
|  `gross_price` | Gross price of the object from the database | --- |
|  `expense_price_aggregation` | The sum of the price of all related item-expenses of a Sales Order Item |  `∑ItemExpense::gross_price` |
|  `discount_amount_full_aggregation` | The sum of the amounts of all related discounts. Example: the discounted value of a Sales Order Item is the sum of the values of all applied discounts on the item itself and all related options. |  `Item:discount_amount_aggregation + ∑ProductOption::discount_amount_aggregation	+ ∑ItemExpense::discount_amount_aggregation` |
|  `discount_amount_aggregation` | The sum of the unit_amount of all directly related discounts |  `∑Discount::amount` |
|  `canceled_amount` | The amount that was canceled. This is usually either 0 or equal with the `price_to_pay_aggregation` but can also be any other value in between. | User Input |

### Order Totals

Totals are sums of already aggregated values. They are shown in the checkout and in the invoices.
![Order totals](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Sales+Schema/order-totals.png)

| Field | Description | Calculation |
| --- | --- | --- |
|  `subtotal` | Subtotal that is shown in cart and used for invoices |  `∑Item::sum_aggregation - ∑Item::canceled_amount` |
|  `order_expense_total` | Total order expenses (~Sum of all applied shipment costs) |  `∑Expense::gross_price` |
|  `discount_total` | Sum of all discount values |  `∑Item::discount_amount_full_aggregation + ∑Expense::discount_amount_aggregation` |
|  `refund_total` | Totally refunded amount |  `∑Item::refundable_amount + ∑Expense::refundable_amount` |
|  `canceled_total` | Total amount which was canceled |  `∑Item::cancelled_amount + ∑Expense::cancelled_amount` |
|  `tax_total` | Total tax amount of the order |  `∑Item::tax_amount_full_aggregation + ∑Expense::tax_amount` |
|  `grand_total` | Final price that needs to be paid |  `∑Item::price_to_pay_aggregation - ∑Item::cancelled_amount + ∑Expense::price_to_pay_aggregation - ∑Expense::cancelled_amount` |
