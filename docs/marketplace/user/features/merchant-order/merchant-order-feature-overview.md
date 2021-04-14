In the marketplace, when a buyer goes through checkout, the [Marketplace order](https://documentation.spryker.com/marketplace/docs/marketplace-order-feature-overview) is created. Such an order can contain offers and products from different merchants. The part of the order that belongs to a certain merchant is called *merchant order*, and it’s created in the system after the Marketplace order is has been placed. Thus, each merchant order contains at least one item from the Marketplace order.

![Merchant order](https://confluence-connect.gliffy.net/embed/image/1c2da1e6-9e30-4413-a799-bcf18d401167.png?utm_medium=live&utm_source=custom){height="" width=""}

Every merchant order has its own shipment and delivery method based on the merchant’s setup. However, a customer can customize the delivery settings at the *Address* step of the checkout and, for example, split one merchant order into several shipments if needed. See [Split Delivery feature overview](https://documentation.spryker.com/docs/split-delivery-overview){target="_blank"} for details.

## Merchant order calculation

The merchant order consists of the merchant order items, which are the items (products) purchased by the customer. All the calculations for the merchant order items are performed using the product offer, merchant products price, and *merchant order totals*. These are the [initial totals](https://documentation.spryker.com/docs/calculation-3-0#totals-transfer) that are calculated according to the product offer purchased:

| TOTAL | DESCRIPTION |
| -------- | -------------- |
| Canceled total   | Amount to be returned in case the order was canceled. `Canceled total = Merchant Order grand total - Merchant Order expense total` |
| Discount total  | Total discount amount.    |
| Merchant Order grand total   | Total amount the customer needs to pay after the discounts have been applied. |
| Merchant Order expense total  | Total expenses amount (e.g., shipping).   |
| Merchant Order refund total  | Total refundable amount.   |
| Merchant Order subtotal  | Total amount before taxes and discounts.  |
| Merchant Order tax total  | Total tax amount from the grand total.   |
| Marketplace Operator fees total | Total amount of fees paid to the Marketplace Administrator.  |

Rounding logic for the calculations is the same as the one used for the Marketplace order. See [Rounding in the Marketplace Order feature overview](https://documentation.spryker.com/marketplace/docs/marketplace-order-feature-overview#rounding) for details.

### Discounts total calculation
Discount totals calculations for merchant orders follow these rules:

* If the discount applies to the whole Marketplace order, the discount is distributed among all the merchant orders and calculated according to the total volume of each of the items.

![Merchant discount 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Merchant+order+feature+overview/mp-discount.png){height="" width=""}

* If the discount is related to a single product item, then the whole discount is assigned only to the merchant order that contains the discounted item.

![Merchant discount 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Merchant+order+feature+overview/mp-discount-2.png){height="" width=""}
