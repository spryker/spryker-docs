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

A merchant can set two types of prices:

- *Default prices*. These are the prices shown by default to all regular customers.
- *Custom prices*. These are different prices meant for specific target audience.

Customers see custom prices for products based on their merchant relationship, or default prices if the merchant relationship doesn't have prices for marketplace products.

Prerequisite: Marketplace Operators need to define a relationship between the business units of the B2B Customer and the Merchant(s) before Merchants are able to define custom prices for these business unit users. Check the guide [here](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-b2b-contracts-feature-overview.html) to define a contract relationship between your marketplace B2B customers and the merchants. Once this relationship is established, merchants can see the existing contracts. 

## Related Business User articles

| MERCHANT PORTAL USER GUIDES  |
| -------------------- | 
| [Managing marketplace abstract product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-prices.html) |
| [Managing marketplace concrete product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product-prices.html)


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Merchant Custom Prices feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-custom-prices-feature-walkthrough.html) for developers.

{% endinfo_block %}
