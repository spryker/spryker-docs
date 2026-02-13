---
title: Buy Box feature overview
description: The Buy Box feature displays multiple merchant offers on product pages, letting customers compare and select which merchant to purchase from.
last_updated: February 12, 2026
template: concept-topic-template
related:
  - title: Install the Buy Box feature
    link: /docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-buy-box-feature.html
  - title: Product Availability Display feature overview
    link: /docs/pbc/all/warehouse-management-system/latest/base-shop/product-availability-display-feature-overview.html
---

The Buy Box feature displays multiple merchant offers for the same product on product detail pages in marketplace scenarios. When multiple merchants sell the same product, the Buy Box shows all available merchant products and offers, letting customers compare prices and availability and select which merchant to purchase from.

## Buy Box display

The Buy Box appears on product detail pages, presenting merchant offers in a structured list.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/buy-box/buy-box-multiple-offers.png" alt="Buy Box showing multiple merchant offers" width="600">

### Merchant offer information

Each offer in the Buy Box displays:
- Merchant name with link to merchant profile page
- Product price from that merchant
- Radio button for merchant selection
- Availability status (when Product Availability Display feature is installed)

### Merchant selection

Customers select their preferred merchant using radio buttons. Only one merchant can be selected at a time. The selected merchant's offer is added to the cart when the customer adds the product.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/buy-box/buy-box-selection.png" alt="Merchant selection in Buy Box" width="600">

The first offer in the list is pre-selected by default. The pre-selected offer depends on the configured sorting strategy.

### URL-based merchant selection

The Buy Box supports URL parameters to pre-select a specific merchant offer. When a merchant selection parameter is present in the URL, that merchant's offer is pre-selected instead of the default first offer.

## Sorting strategies

Offers in the Buy Box can be sorted by:
- **Price**: Lowest to highest price (default)
- **Stock availability**: Highest to lowest stock (requires Product Availability Display feature)

When sorted by stock, merchants marked as never out of stock appear first, followed by merchants with the highest stock quantities.

The sorting strategy determines which offer is pre-selected by default when customers first view the product page.

## Integration with Product Availability Display

When the Product Availability Display feature is installed, the Buy Box shows availability information for each merchant offer. This lets customers compare not just prices but also stock availability across merchants.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/buy-box/buy-box-out-of-stock.png" alt="Buy Box with availability per merchant" width="600">

For details about availability display, see [Product Availability Display feature overview](/docs/pbc/all/warehouse-management-system/latest/base-shop/product-availability-display-feature-overview.html).

## Configuration

The Buy Box feature can be configured at the code level. Configuration options:
- Sorting strategy: by price or by stock availability

For configuration details, see [Install the Buy Box feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-buy-box-feature.html).

## Use cases

Use the Buy Box feature when:
- Multiple merchants sell the same product in a marketplace
- Customers need to compare offers from different merchants
- Merchant selection should be visible and explicit on the product page

## Current constraints

- Merchant ratings or reviews are not displayed within the Buy Box. Links to merchant profiles are provided.
- Offers cannot be filtered based on shipping location, delivery time, or other criteria.
- Shipping costs per merchant are not shown.
- The feature does not provide offer recommendations based on customer preferences or purchase history.

## Related developer documents

| INSTALLATION GUIDES |
|---------|
| [Install the Buy Box feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-buy-box-feature.html) |
