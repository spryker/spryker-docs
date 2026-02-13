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

The Buy Box feature displays multiple merchant offers for the same product on the product detail page in a marketplace environment. When multiple merchants sell the same product, the Buy Box shows all available offers. This lets you compare prices and availability and select the merchant you want to purchase from.

## Buy Box display

The Buy Box appears on the product detail page and presents merchant offers in a structured list.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/buy-box/buy-box-multiple-offers.png" alt="Buy Box showing multiple merchant offers" width="600">

### Merchant offer information

Each offer in the Buy Box displays the following information:

- Merchant name with a link to the merchant profile page
- Product price offered by the merchant
- Radio button for merchant selection
- Availability status (when the [Product Availability Display feature](/docs/pbc/all/warehouse-management-system/latest/base-shop/product-availability-display-feature-overview.html) is installed)

### Merchant selection

You select your preferred merchant using radio buttons. Only one merchant can be selected at a time. When you add the product to the cart, the selected merchant's offer is added.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/buy-box/buy-box-selection.png" alt="Merchant selection in Buy Box" width="600">

The first offer in the list is selected by default. The default selection depends on the configured sorting strategy.

### URL-based merchant selection

The Buy Box supports URL parameters that let you preselect a specific merchant offer. When the URL contains a merchant selection parameter, the corresponding offer is selected instead of the default offer.

## Sorting strategies

You can sort offers in the Buy Box by the following criteria:

- **Price**: Lowest to highest (default)
- **Stock availability**: Highest to lowest stock quantity (requires the [Product Availability Display feature](/docs/pbc/all/warehouse-management-system/latest/base-shop/product-availability-display-feature-overview.html))

When you sort by stock availability, merchants marked as never out of stock appear first, followed by merchants with the highest stock quantities.

The sorting strategy determines which offer is pre-selected by default when customers first view the product page.

## Integration with Product Availability Display

When the Product Availability Display feature is installed, the Buy Box shows availability information for each merchant offer. This lets you compare prices and stock availability across merchants.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/buy-box/buy-box-out-of-stock.png" alt="Buy Box with availability per merchant" width="600">

For details about availability display, see [Product Availability Display feature overview](/docs/pbc/all/warehouse-management-system/latest/base-shop/product-availability-display-feature-overview.html).

## Configuration

You can configure the Buy Box feature at the code level. The following configuration option is available:

- Sorting strategy: by price or by stock availability

For configuration details, see [Install the Buy Box feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-buy-box-feature.html).

## Use cases

Use the Buy Box feature in the following scenarios:
- Multiple merchants sell the same product in a marketplace
- Customers need to compare offers from different merchants
- Merchant selection should be visible and explicit on the product page

## Current constraints

- Merchant ratings or reviews are not displayed within the Buy Box. Links to merchant profiles are provided.
- Offers cannot be filtered based on shipping location, delivery time, or other criteria.
- Shipping costs per merchant are not shown.
- The feature does not provide offer recommendations based on customer preferences or purchase history.

## Related documents

- [Install the Buy Box feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-buy-box-feature.html)
