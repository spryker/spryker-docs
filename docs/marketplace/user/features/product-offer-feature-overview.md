The *product offer* entity is created when multiple merchants need to sell the same product on the Marketplace. 

Product offer is created per concrete product and contains product-specific information, information about the merchant selling this product, and the offer price. Any concrete product can have one or many offers from different merchants. Therefore, a unique *offer reference* is defined per each product offer and is used to identify the offer in the system. Offer reference mandatory and can only be defined once.

Every merchant can have multiple offers for the same concrete product. However, a product offer is related to a single merchant and cannot be shared between other merchants:

![Multiple product offers per product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-per-product.png)

![Product offers on PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-on-pdp.png)

## Product offer structure
To define visibility of a product offer on the Storefront, the following details are attached to the product offer entity:

| OFFER PARAMETER      | DESCRIPTION           |
| ------------------- | ----------------------------- |
| Concrete product SKU | Defines the concrete product the offer is created for.       |
| Merchant SKU         | Allows the merchant to identify the product offer in the ERP system. |
| Offer Reference      | A unique ID that helps to identify the product offer in the Marketplace. Offer reference is mandatory. |
| Store                | Defines the store where the product offer is available.      |
| Price                | Allows the merchant to set their price for the offer.        |
| Stock                | Allows the merchant to define stock for the product offer. The stock can be reserved and available. |
| Status               | Approval status: <ul><li>Approval status (Waiting for approval, Approved, Denied).</li><li>Visibility: Visibility (Active, Inactive).</li></ul> |
| Validity Dates       | Specifies the period during which the product offer is visible on the Storefront. Concrete product validity dates have higher priority over the Offer validity dates. |

A merchant can create product offers in the Merchnt Portal or import them using the data import.

## Product offer status 
Product offer status defines whether the offer is active and displayed on the Storefront. Based on this, the product offer may have:

### Offer approval status 

* *Waiting for Approval*: Default status that is applied to the offer after it has been created.

* *Approved*:  The approved offer can be displayed on the Storefront. Only the Marketplace administrator can approve the offer.

* *Denied*: If the offer is denied, it cannot be displayed on the Storefront. Only the Marketplace administrator can deny the offer.

### Visibility

* *Active*: When the offer is active, it is displayed on the Storefront. Either merchant or Marketplace administrator can make the offer active.

* *Inactive*: When the offer is inactive, it is not displayed on the Storefront. Either merchant or Marketplace administrator can make the offer inactive.

![Offer approval flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/offer-approval-flow.png)

## Product offer price

On the product detail page, a customer sees a list of product offers from one or several merchants. Each offer has its own price. This price is represented as a new price dimension—*product offer price*. 
The product offer prices support:

* Mode (Net/Gross)
* Volume
* Store
* Currency

Product offer price follows the [concrete product price inheritance model](https://documentation.spryker.com/docs/price-functionality#price-inheritance), so if the Merchant doesn't set a price in the offer, it is taken from the concrete product. Otherwise, the product offer price has a higher priority and substitutes the concrete product price if it is indicated. If at least one price is defined for the offer (e.g., original), it is valid for this offer even if the concrete product has a default price (sales price), but the offer does not. See [Price types](https://documentation.spryker.com/docs/scheduled-prices-feature-overview#price-types) for details on the price types.

## Product offer stores
The merchant product offer is defined per store. The merchant sets their own prices per store for the product offer.
However, defining the right store for the product offer affects its visibility. When setting the stores for the product offer, merchants need to pay attention to the stores where their abstract products are available.
The table below illustrates the logic according to which the product offer is displayed in the Storefront.

| Characteristics    | DE   | AT   | US   |
| ----------------------------------------- | ---- | ---- | ---- |
| Store where the abstract product is added | ✓    | ✓    | x    |
| Store where the product offer is added    | x    | ✓    | ✓    |
| Is product offer visible?                 | no   | yes  | no   |

## Product offer stock
A product offer has its own stock in one or many warehouses. A warehouse can hold stock for multiple offers.

The stock per offer in the warehouse is defined by merchant the same way it is defined for the concrete product. It means that offer reservation is assigned to every product offer separately. 

For the cases, when the offer doesn't have any physical stock and can always be purchased, there is the `is_never_out_of_stock` attribute that is added to the offer entity. 

When `is_never_out_of_stock` is set to `true`, then this offer is always available in terms of stock.
When the offer is out of stock, it is displayed as an out-of-stock product.

### Product offer availability
Product offer availability calculation differs from the calculation of concrete products availability:
| Concrete product availability   | Product offer availability   |
| --------------------- | ------------------------ |
| Formula: Concrete product availability = Concrete product quantity – Concrete product reservations | Formula: Offer availability = Offer quantity – Offer reservations |

In this way, the algorithm of calculating offer availability is updated, but the algorithm of calculating reservations is preserved.
Offer availability is considered on the Storefront: 

* On the product details page while adding the offer to cart.
* On the cart page: Product stays in the cart if the attached offer is not available anymore and a hint is shown.
* During the checkout: When pressing "Buy now" the availability is checked one more time.

:::(Info) (Example)
Let's assume that the merchant has defined quantity 10 for product offer 1. The customer adds 8 items of the product offer 1 into a shopping cart, and later updates the quantity to 12. In such a situation, the availability of the product offer 1 will be checked and the customer will be notified to update the quantity of the product offer to the available number to proceed with the purchase. 
:::

## Product offers in the Storefront
Merchant product offer with all the related offer information is visible on the product detail page, and further on the shopping cart page and checkout pages when the following conditions are met:

1. The merchant who owns the offer has "Active" status.
2. The product offer status is:
    *     Approved
    *     Active
3. The product offer is defined for the current store.
4. The current store is defined for the provided offer.
5. The current day is in the range of the product offer validity dates.

The decision of whether the product offer can be purchased depends on the offer availability. But it has no influence on offer visibility in the Storefront.

### Product offers on the product details page

All available product offers are listed in the **Sold by** area. If there are multiple product offers for a concrete product, there is always a default product offer pre-checked. Currently, a random offer is selected as a default one, however, you can change this logic on the project level. 

![Product offers on product details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-on-pdp.gif)

### Product offers in the shopping cart
Offers from different merchants are added as separate cart items, each with its quantity. You can add a note to the offer on the cart page.
A customer can review the merchant information by clicking the link in the **Sold By** hint.

![Product offers in cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/add-offers-to-cart.gif)

### Product offers during checkout
During the checkout, offers from the same merchant are grouped together for delivery so that the customer can always know how many shipments to expect and the merchants can smoothly fulfill the orders.

![Product offers during checkout](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-during-checkout.gif)

## Current constraints

* B2B Merchant-specific prices do not work with product offer prices.
* All cart-related B2B features (e.g., Quick Order, RFQ, Approval Process, etc.) will be supported later.
* Availability Notification is not supported.