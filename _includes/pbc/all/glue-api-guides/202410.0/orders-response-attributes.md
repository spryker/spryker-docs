
**General order information**

| ATTRIBUTE       | TYPE   | DESCRIPTION  |
| ------ | ---| - |
| itemStates      | Array  | Statuses of the order's items in the [state machine](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html). |
| createdAt       | String | Date and time when the order was created.                    |
| currencyIsoCode | String | ISO 4217 code of the currency that was selected when placing the order. |
| priceMode       | String | Price mode that was active when placing the order. Possible values:<ul><li>**NET_MODE**—prices before tax.</li><li>**GROSS_MODE**—prices after tax.</li></ul> |

**Totals calculations**

 | Attribute                | Type    | Description                                     |
| ------- | ----------------------- | ------------------------ |
| totals                   | Object  | Totals calculations.                            |
| totals.expenseTotal      | Integer | Total amount of expenses, such as shipping costs. |
| totals.discountTotal     | Integer | Total amount of discounts applied.              |
| totals.taxTotal          | Integer | Total amount of taxes paid.                     |
| totals.subtotal          | Integer | Subtotal of the order.                          |
| totals.grandTotal        | Integer | Grand total of the order                        |
| totals.canceledTotal     | Integer | Total canceled amount.                          |
| totals.remunerationTotal | Integer | Total sum of remuneration.                      |

**Billing and shipping addresses**

 | Attribute                  | Type   | Description       |
| ------ | ------------- | --------------------------- |
| billingAddress             | object | List of attributes describing the billing address of the order. |
| billingAddress.salutation  | String | Salutation to use when addressing the customer.              |
| billingAddress.firstName   | String | Customer's first name.                                       |
| billingAddress.middleName  | String | Customer's middle name.                                      |
| billingAddress.lastName    | String | Customer's last name.                                        |
| billingAddress.address1    | String | first line of the customer's address.                          |
| billingAddress.address2    | String | second line of the customer's address.                          |
| billingAddress.address3    | String | third line of the customer's address.                          |
| billingAddress.company     | String | Specifies the customer's company.                            |
| billingAddress.city        | String | Specifies the city.                                          |
| billingAddress.zipCode     | String | ZIP code.                                                    |
| billingAddress.poBox       | String | PO Box to use for communication.                             |
| billingAddress.phone       | String | Specifies the customer's phone number.                       |
| billingAddress.cellPhone   | String | Mobile phone number.                                         |
| billingAddress.description | String | Address description.                                         |
| billingAddress.comment     | String | Address comment.                                             |
| billingAddress.email       | String | Email address to use for communication.                      |
| billingAddress.country     | String | Specifies the country.                                       |
| billingAddress.iso2Code    | String | ISO 2-Letter Country Code to use.                            |
| shippingAddress            | object | Shipment address of the order. This value is returned only if you submit an order without split delivery. See [Checking out purchases in version 202009.0](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html) to learn how to do that. |

**Order item information**

| ATTRIBUTE | TYPE | DESCRIPTION |
| ------- | ----------- | -------------- |
| items                                   | array   | Items in the order.                                          |
| items.state                             | String  | Defines the state of the order in the state machine.         |
| bundleItems | Array | Array of objects describing the concrete product bundles in the order. |
| bundleItems.bundleItemIdentifier | Integer | Defines the relation between the bundle and its items. The items of the bundle have the same value in the `relatedBundleItemIdentifier` attribute. |
| items.relatedBundleItemIdentifier | Integer | Defines the relation between the item and its bundle. The bundle to which this the item belongs has the same value in the `bundleItemIdentifier` attribute. |
| items.name                              | String  | Product name.                                                |
| items.sku                               | String  | Product SKU.                                                 |
| items.sumPrice                          | Integer | Sum of all product prices.                                   |
| items.quantity                          | Integer | Product quantity ordered.                                    |
| items.unitGrossPrice                    | Integer | Single item gross price.                                     |
| items.sumGrossPrice                     | Integer | Sum of items gross price.                                    |
| items.taxRate                           | Integer | Current tax rate, in percent.                                |
| items.unitNetPrice                      | Integer | Single item net price.                                       |
| items.sumNetPrice                       | Integer | Sum total of net prices for all items.                       |
| items.unitPrice                         | Integer | Single item price without assuming if it's new or gross. *This price should be displayed everywhere when a product price is displayed. It allows switching tax mode without side effects*. |
| items.unitTaxAmountFullAggregation      | Integer | Total tax amount for a given item, with additions.           |
| items.sumTaxAmountFullAggregation       | Integer | Total tax amount for a given sum of items, with additions.   |
| items.refundableAmount                  | Integer | Available refundable amount for an item (order only).        |
| items.canceledAmount                    | Integer | Total canceled amount for this item (order only).            |
| items.sumSubtotalAggregation            | Integer | Sum of subtotals of the items.                               |
| items.unitSubtotalAggregation           | Integer | Subtotal for the given item.                                 |
| items.unitProductOptionPriceAggregation | Integer | Item total product option price.                             |
| items.sumProductOptionPriceAggregation  | Integer | Item total of product options for the given sum of items.    |
| items.unitExpensePriceAggregation       | Integer | Item expense total for a given item.                         |
| items.sumExpensePriceAggregation        | Integer | Total amount of expenses for the given items.                |
| items.unitDiscountAmountAggregation     | Integer | Item total discount amount.                                  |
| items.sumDiscountAmountAggregation      | Integer | Sum of Item total discount amounts.                          |
| items.unitDiscountAmountFullAggregation | Integer | Sum of item total discount amount.                           |
| items.sumDiscountAmountFullAggregation  | Integer | Item total discount amount, with additions.                  |
| items.unitPriceToPayAggregation         | Integer | Item total price to pay after discounts, with additions.     |
| items.sumPriceToPayAggregation          | Integer | Sum of all prices to pay (after discounts were applied).     |
| items.taxRateAverageAggregation         | Integer | Item tax rate average, with additions. This value is used when recalculating the tax amount after cancellation. |
| items.taxAmountAfterCancellation        | Integer | Tax amount after cancellation, recalculated using tax average. |
| items.uuid                              | String  | Unique identifier of the item in the order.                  |
| items.isReturnable                      | Boolean | Defines if the customer can return the item.                 |
| items.idShipment                        | Integer | Unique identifier of the shipment to which the item belongs. To retrieve all the shipments of the order, include the `order-shipments` resource into the request.|
| items.bundleItemIdentifier                    | Integer | Defines the relation between the bundle and its items. The items of the bundle have the same value in the relatedBundleItemIdentifier attribute. |
| items.relatedBundleItemIdentifier             | Integer | Defines the relation between the item and its bundle. The bundle to which this the item belongs has the same value in the bundleItemIdentifier attribute. |
| items.salesOrderConfiguredBundle | Object | Contains information about the purhased configurable bundle. |
| items.idSalesOrderConfiguredBundle |Integer | Unique identifier of the purchased configured bundle.|
| items.idSalesOrderConfiguredBundle.configurableBundleTemplateUuid|String |Unique identifier of the configurable bundle template in the system. |
| items.idSalesOrderConfiguredBundle.name | String|Name of the configured bundle. |
| items.idSalesOrderConfiguredBundle.quantity | Integer| Quantity of the ordered configurable bundles.|
| items.salesOrderConfiguredBundleItem |Object |Contains information about the items of the configured bundle. |
| items.salesOrderConfiguredBundleItem.configurableBundleTemplateSlotUuid| String| Unique identifier of the configurable bundle slot in the system. |
| items.metadata                          | object  | Metadata of the concrete product.                            |
| items.metadata.superAttributes          | String  | [Attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) of the order item. |
| items.metadata.image                    | String  | Product image URL.                                           |

**Measurement unit calculations**

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| salesUnit | Object | List of attributes defining the sales unit to be used for item amount calculation. |
| conversion | integer | Factor to convert a value from sales to base unit. If it's "null", the information is taken from the global conversions. |
| precision | integer | Ratio between a sales unit and a base unit. |
| measurementUnit | string | Code of the measurement unit. |
| name | String | Name of the measurement unit. |
| code | String | Code of the measurement unit. |

**Calculated discounts for items**

| ATTRIBUTE  | TYPE    | DESCRIPTION   |
| ------ | ---------| -------- |
| items.calculatedDiscounts             | Array   | List of attributes describing the discount calculated for this item. |
| items.calculatedDiscounts.unitAmount  | Integer | Discount value applied to this order item.                  |
| items.calculatedDiscounts.sumAmount   | Integer | Sum of the discount values applied to this order item.       |
| items.calculatedDiscounts.displayName | String  | Name of the discount applied.                                |
| items.calculatedDiscounts.description | String  | Description of the discount.                                 |
| items.calculatedDiscounts.voucherCode | String  | Voucher code redeemed.                                       |
| items.calculatedDiscounts.quantity    | String  | Number of discounts applied to the product.                  |

**Product options**

| ATTRIBUTE   | TYPE    | DESCRIPTION   |
| ----- | -----------| -------------- |
| items.productOptions                 | Array   | List of product options ordered with this item.         |
| items.productOptions.optionGroupName | String  | Name of the group to which the product option belongs. |
| items.productOptions.sku             | String  | SKU of the product option.                             |
| items.productOptions.optionName      | String  | Name of the product option.                            |
| items.productOptions.price           | Integer | Price of the product option.                           |

**Calculated discounts**

| ATTRIBUTE   | TYPE    | DESCRIPTION    |
| ----- | ---------- | ------------- |
| calculatedDiscounts             | Array   | Discounts applied to this order item.                        |
| calculatedDiscounts.unitAmount  | Integer | Amount of the discount provided by the given item for each unit of the product, in cents. |
| calculatedDiscounts.sumAmount   | Integer | Total amount of the discount provided by the given item, in cents. |
| calculatedDiscounts.displayName | String  | Display name of the given discount.                          |
| calculatedDiscounts.description | String  | Description of the given discount.                           |
| calculatedDiscounts.voucherCode | String  | Voucher code applied, if any.                                |
| calculatedDiscounts.quantity    | String  | Number of times the discount was applied.                    |

**Expenses**

| ATTRIBUTE    | TYPE    | DESCRIPTION     |
| ----- | -----------| ------- |
| expenses                | array   | Additional expenses of the order. |
| expenses.type           | String  | Expense type.                     |
| expenses.name           | String  | Expense name.                     |
| expenses.sumPrice       | Integer | Sum of expenses calculated.       |
| expenses.unitGrossPrice | Integer | Single item's gross price.        |
| expenses.sumGrossPrice  | Integer | Sum of items' gross price.        |
| expenses.taxRate        | Integer | Current tax rate in percent.      |
| expenses.unitNetPrice                           | Integer | Single item net price.                                       |
| expenses.sumNetPrice                            | Integer | Sum of items' net price.                                     |
| expenses.canceledAmount                         | Integer | Total canceled amount for this item (order only).            |
| expenses.unitDiscountAmountAggregationexpenses. | Integer | Item total discount amount.                                  |
| expenses.sumDiscountAmountAggregation           | Integer | Sum of items' total discount amount.                         |
| expenses.unitTaxAmount                          | Integer | Tax amount for a single item, after discounts.               |
| expenses.sumTaxAmount                           | Integer | Tax amount for a sum of items (order only).                  |
| expenses.unitPriceToPayAggregation              | Integer | Item total price to pay after discounts with additions.      |
| expenses.sumPriceToPayAggregation               | Integer | Sum of items' total price to pay after discounts with additions. |
| expenses.taxAmountAfterCancellation             | Integer | Tax amount after cancellation, recalculated using tax average. |
| expenses.idShipment                             | Integer | Unique identifier of the shipment to which this expense belongs. To retrieve all the shipments of the order, include the order-shipments resource in the request. |
| expenses.idSalesExpense                         | Integer | Unique identifier of the expense.                            |

**Payments**

| ATTRIBUTE   | TYPE    |DESCRIPTION   |
| ------ | -------------| -------------- |
| payments        | Array   | A list of payments used in this order.                       |
| amount          | Integer | Amount paid via the corresponding payment provider in cents. |
| paymentProvider | String  | Name of the payment provider.                                |
| paymentMethod   | String  | Name of the payment method.                                  |

**Shipments**

| ATTRIBUTE | TYPE   | DESCRIPTION      |
| ----- | -------------| ---------- |
| shipments | object | Information about the shipments used in this order. This value is returned only if you submit an order without split delivery. To learn how to do that, see [Check out purchases](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html). To see all the attributes that are returned when retrieving orders without split delivery, see [Retrieving orders](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html). To retrieve shipment details, include the order-shipments resource in the request. |
