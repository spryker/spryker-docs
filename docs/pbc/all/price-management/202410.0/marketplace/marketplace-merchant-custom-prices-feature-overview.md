---
title: Marketplace Merchant Custom Prices feature overview
description: This document contains concept information for the Marketplace Merchant Custom Prices feature.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/user/features/202311.0/marketplace-merchant-custom-prices-feature-overview.html
related:
  - title: Managing marketplace abstract product prices
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-prices.html
  - title: Managing marketplace concrete product prices
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-prices.html
---

The *Marketplace Merchant Custom Prices* feature allows marketplace merchants to define custom prices for the marketplace products within specific business units of B2B customers via the Merchant Portal.

{% info_block infoBox "Prerequisite" %}

Marketplace operators need to define a relationship between the business units of the B2B customer and the merchants before merchants are able to define custom prices for these business unit users. For information on how to define a contract relationship between your marketplace B2B customers and the merchants, see [Merchant B2B contracts feature overview](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html). Once this relationship is established, merchants can see the existing contracts.

{% endinfo_block %}

A merchant can set two types of prices:

- *Default prices*. These are the prices shown by default to all regular customers.
- *Custom prices*. These are different prices meant for specific target audience.

Customers see custom prices for products based on their merchant relationship, or default prices if the merchant relationship doesn't have prices for marketplace products.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+merchant+custom+prices+feature+overview/merchant_custom_price.mp4" type="video/mp4">
  </video>
</figure>

## Related Business User documents

| MERCHANT PORTAL USER GUIDES  |
| -------------------- |
| [Managing marketplace abstract product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-prices.html) |
| [Managing marketplace concrete product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-prices.html)


## Related Developer documents

| INSTALLATION GUIDES|
|---------|
| [Marketplace Merchant Custom Install the Prices feature](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-custom-prices-feature.html) |
