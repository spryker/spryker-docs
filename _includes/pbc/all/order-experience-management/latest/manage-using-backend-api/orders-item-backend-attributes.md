| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| items.uuid | String | Public identifier of the line item, and the value every other endpoint addresses a line by—for example, `itemUuids` on [firing an OMS event](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-fire-an-order-event.html). The internal ID is never exposed. |
| items.sku | String | Concrete product SKU. |
| items.name | String | Product name, snapshotted onto the line at order time. |
| items.quantity | Integer | Ordered quantity, in the product's base measurement unit. |
| items.salesUnit | Object | The measurement unit the line is ordered in—for example, "2 metres" rather than "200 base units". Absent for a product sold in base units. |
| items.salesUnit.code | String | Measurement unit code—for example, `METR`, `KILO`. |
| items.salesUnit.amount | Number | How many of `code` are ordered. |
| items.salesUnit.name | String | Measurement unit name, snapshotted onto the line at order time. |
| items.salesUnit.baseUnitName | String | Name of the base unit `quantity` is expressed in. |
| items.salesUnit.conversion | Number | Base units per one `code`. `quantity = amount * conversion`. |
| items.salesUnit.precision | Integer | Smallest fraction of `code` that can be ordered, as a divisor. |
| items.unitPrice | Integer | Unit price actually charged, in cents. |
| items.merchantReference | String | Merchant fulfilling the line, for a marketplace line. |
| items.productOfferReference | String | The specific offer the line was bought from, if the merchant holds several offers for the SKU. |
| items.cartNote | String | Free-text note carried on the line. |
| items.packagingAmount | Object | For a product sold as a package, how much of the contained product the line's packages hold. Absent for a product that is not sold as a package. |
| items.packagingAmount.amount | Number | Amount per package, not for the whole line—3 boxes of 250 is `quantity: 3` with `amount: 250`. |
| items.packagingAmount.salesUnitCode | String | Measurement unit the amount is expressed in—a unit of the contained product, not of the package itself. |
| items.packagingAmount.salesUnitName | String | Name of the unit the amount is expressed in. |
| items.packagingAmount.leadProductSku | String | SKU of the product contained in the package. |
| items.productOptions | Array | Product options selected for the line. |
| items.productOptions.groupName | String | Option group name, snapshotted onto the line at order time. |
| items.productOptions.value | String | The selected option value, snapshotted at order time. |
| items.productOptions.unitPrice | Integer | Option surcharge per unit, in cents. |
| items.productOptions.sumPrice | Integer | Option surcharge across all units of the line, in cents. Included in `items.sumSubtotalAggregation`. |
| items.productOptions.taxRate | Number | Tax rate applied to the option, in percent. |
| items.shipment | Object | Per-line delivery override. Falls back to the order-level `shipment` when absent. |
| items.shipment.shipmentMethod | String | Shipment method name for the line. |
| items.shipment.shippingAddress | Object | Delivery address for the line. Same shape as the order-level `shipment.shippingAddress`. |
| items.shipment.requestedDeliveryDate | String | Requested delivery date for the line. |
| items.sumPrice | Integer | Line price in cents before discounts. |
| items.taxRate | Number | Tax rate applied to the line, in percent. |
| items.sumTaxAmount | Integer | Tax charged on the line, in cents. |
| items.refundableAmount | Integer | Amount still refundable on the line, in cents. |
| items.canceledAmount | Integer | Canceled portion of the line, in cents. |
| items.calculatedDiscounts | Array | Rules and vouchers applied to the line. The order-level `calculatedDiscounts` reports the same discounts totaled per discount. |
| items.calculatedDiscounts.displayName | String | Name of the discount as configured. |
| items.calculatedDiscounts.voucherCode | String | The voucher code that triggered the discount. `null` for a cart rule. |
| items.calculatedDiscounts.unitAmount | Integer | Discount per unit, in cents. Rounded for display—use `sumAmount` for any calculation. |
| items.calculatedDiscounts.sumAmount | Integer | Discount for the line, in cents. |
| items.sumSubtotalAggregation | Integer | Line subtotal in cents. |
| items.sumDiscountAmountFullAggregation | Integer | Discount applied to the line, in cents. |
| items.sumPriceToPayAggregation | Integer | What the line actually costs after discounts, in cents. |
| items.state | String | Current OMS state of the item. |
| items.availableEvents | Array | Events an operator can currently trigger on this line item. This is the per-line detail behind the order-level `availableEvents`, which reports the union over all lines. Empty when the item sits in a terminal state. Returned only by [retrieving a single order](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html#retrieve-an-order)—the collection endpoint omits `items` entirely. |
