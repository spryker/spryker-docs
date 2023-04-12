---
title: Marketplace Merchant Custom Prices feature overview
description: This document contains concept information for the Marketplace Merchant Custom Prices feature.
template: concept-topic-template
related:
  - title: Managing marketplace abstract product prices
    link: docs/marketplace/user/merchant-portal-user-guides/page.version/products/abstract-products/managing-marketplace-abstract-product-prices.html
  - title: Managing marketplace concrete product prices
    link: docs/marketplace/user/merchant-portal-user-guides/page.version/products/concrete-products/managing-marketplace-concrete-product-prices.html
---

The *Marketplace Merchant Custom Prices* feature allows marketplace merchants to define custom prices for the marketplace products within specific business units of B2B customers via the Merchant Portal.

{% info_block infoBox "Prerequisite" %}

Marketplace operators need to define a relationship between the business units of the B2B customer and the merchants before merchants are able to define custom prices for these business unit users. For information on how to define a contract relationship between your marketplace B2B customers and the merchants, see [Merchant B2B contracts feature overview](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-b2b-contracts-feature-overview.html). Once this relationship is established, merchants can see the existing contracts.

{% endinfo_block %}

A merchant can set two types of prices:

- *Default prices*. These are the prices shown by default to all regular customers.
- *Custom prices*. These are different prices meant for specific target audience.

Customers see custom prices for products based on their merchant relationship, or default prices if the merchant relationship doesn't have prices for marketplace products.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+merchant+custom+prices+feature+overview/merchant_custom_price.mov" type="video/mov">
  </video>
</figure>

## Related Business User documents

| MERCHANT PORTAL USER GUIDES  |
| -------------------- |
| [Managing marketplace abstract product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-prices.html) |
| [Managing marketplace concrete product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product-prices.html)


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Merchant Custom Prices feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-custom-prices-feature-walkthrough.html) for developers.

{% endinfo_block %}
