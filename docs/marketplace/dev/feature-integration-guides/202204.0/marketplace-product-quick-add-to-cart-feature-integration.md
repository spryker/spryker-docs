---
title: Marketplace Product + Quick Add to Cart feature integration
last_updated: May 16, 2022
description: This document describes the process how to integrate the Marketplace Product + Quick Add to Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product + Quick Add to Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product + Quick Add to Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                 | VERSION          | INTEGRATION GUIDE                                                                                                                                           |
|----------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core         | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html)                        |
| Product Options      | {{page.version}} | [Product Options feature integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/903151851/EMPTY+Product+Options+Feature+Integration+-+ongoing)   |  
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Quick Add to Cart    | {{page.version}} | [Quick Add to Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-feature-integration.html)              |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-product:"{{page.version}}" --update-with-dependencies
composer require spryker-feature/quick-add-to-cart:"^2018.11.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE                    | EXPECTED DIRECTORY                          |
|---------------------------|---------------------------------------------|
| MerchantProduct           | vendor/spryker/merchant-product             |
| MerchantProductDataImport | vendor/spryker/merchant-product-data-import |
| MerchantProductGui        | vendor/spryker/merchant-product-gui         |
| MerchantProductSearch     | vendor/spryker/merchant-product-search      |
| MerchantProductStorage    | vendor/spryker/merchant-product-storage     |
| MerchantProductWidget     | vendor/spryker-shop/merchant-product-widget |
| QuickOrderPage            | vendor/spryker-shop/quick-order-page        |

{% endinfo_block %}
