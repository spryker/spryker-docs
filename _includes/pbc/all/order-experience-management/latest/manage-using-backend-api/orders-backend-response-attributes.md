| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| orderReference | String | Sales order reference. Identifies the order everywhere—for example, `GET /orders/{orderReference}`—and is also the resource `id`. |
| customerReference | String | Reference of the customer the order belongs to. |
| store | String | Store the order was placed in. |
| currency | String | ISO 4217 currency code. |
| createdAt | String | ISO 8601 creation timestamp. |
| orderCustomReference | String | The caller's own reference for the order, if one was supplied at creation—for example, a purchase-order number. Shown in the Back Office. |
| companyBusinessUnitUuid | String | Business unit the order was placed for, if any. |
| companyUuid | String | Company the order was placed for. Derived from `companyBusinessUnitUuid` at placement; absent for an order placed by a customer with no company user. |
| priceMode | String | Whether the order's unit prices are gross or net: `GROSS_MODE` or `NET_MODE`. |
| locale | String | Locale the order was placed in—for example, `de_DE`. |
| itemsCount | Integer | Number of line items on the order (line count, not ordered units). Always present, even when `items` itself is omitted. |
| itemStates | Array | Distinct OMS state names currently held by the order's items. An order has no state of its own—its items advance independently. |
| availableEvents | Array | OMS events an operator can currently trigger on the order—the union over its line items. `items[].availableEvents` says which lines each one applies to. Empty when every item is in a terminal state. |
| customer | Object | Read-only snapshot of the buyer, taken when the order was placed—not a live customer lookup. |
| customer.email | String | Email recorded on the order. |
| customer.salutation | String | Salutation recorded on the order: `Mr`, `Mrs`, `Dr`, `Ms`, or `n/a`. |
| customer.firstName | String | First name recorded on the order. |
| customer.lastName | String | Last name recorded on the order. |
| totals | Object | Order totals, in cents, using the same keys as the Storefront orders API. |
| totals.subtotal | Integer | Sum of item prices before discounts, expenses, or tax, in cents. |
| totals.expenseTotal | Integer | Total expenses (shipment, order-threshold surcharges), in cents. See `expenses` for the breakdown. |
| totals.discountTotal | Integer | Total discount applied across the order, in cents. See `calculatedDiscounts` for the breakdown. |
| totals.taxTotal | Integer | Total tax across the order, in cents. See `totals.taxBreakdown` for the per-rate detail. |
| totals.taxBreakdown | Array | `taxTotal` split by rate, since an order can mix rates. Empty on the response to `POST /orders`; present once the order is read back. |
| totals.taxBreakdown.taxRate | Number | The rate, in percent. |
| totals.taxBreakdown.taxAmount | Integer | Tax charged at this rate across the whole order, in cents. |
| totals.grandTotal | Integer | `subtotal - discountTotal + expenseTotal + tax`. What the order was placed at, in cents. |
| totals.canceledTotal | Integer | Value of the order's canceled items, in cents. |
| totals.refundableTotal | Integer | Amount still refundable on the order, in cents—not what has already been refunded. Starts at the grand total and falls as parts of the order are canceled. |
| totals.remunerationTotal | Integer | Amount settled by remuneration rather than payment, in cents. |
| expenses | Array | Shipment and surcharge lines that make up `totals.expenseTotal`. |
| expenses.type | String | Expense type—for example, `SHIPMENT_EXPENSE_TYPE`. |
| expenses.name | String | Display name—for example, the shipment method name. |
| expenses.sumPrice | Integer | Expense price in cents before discounts. |
| expenses.taxRate | Number | Tax rate applied to the expense, in percent. |
| expenses.sumTaxAmount | Integer | Tax charged on the expense, in cents. |
| expenses.sumDiscountAmountAggregation | Integer | Discount applied to the expense, in cents—a free-delivery rule shows here. |
| expenses.sumPriceToPayAggregation | Integer | What the expense actually costs after discounts, in cents. |
| expenses.canceledAmount | Integer | Canceled portion of the expense, in cents. |
| calculatedDiscounts | Array | Rules and vouchers applied to the order, one entry per discount with its total across the order. Per-line amounts are on `items[].calculatedDiscounts`. |
| calculatedDiscounts.displayName | String | Name of the discount as configured. Entries sharing a display name are grouped into one. |
| calculatedDiscounts.description | String | Description of the discount as configured. |
| calculatedDiscounts.voucherCode | String | The voucher code that triggered the discount. `null` for a cart rule. On a grouped entry, reflects only one of the merged discounts. |
| calculatedDiscounts.quantity | Integer | Ordered units the discount applied to, totaled across every line it applied to. |
| calculatedDiscounts.sumAmount | Integer | Discount total across the order, in cents, including any part applied to shipping or product options. |
| payments | Array | How the order was actually charged, one row per payment method used. |
| payments.paymentProvider | String | Payment provider key—for example, `DummyPayment` or `GiftCard`. |
| payments.paymentMethod | String | Payment method key—for example, `dummyPaymentInvoice` or `GiftCard`. |
| payments.amount | Integer | Amount charged to this payment method, in cents. |
| payments.meta | Object | Free-form, method-specific data for this payment—for example, `giftCard` carrying the redeemed code and its value. Only properties actually populated for this payment appear. |
| comments | Array | Back Office comments on the order, oldest first—the same thread [retrieved](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-order-comments.html) and appended to via the `order-comments` resource. Included only on the single-order response; omitted from the order collection response. |
