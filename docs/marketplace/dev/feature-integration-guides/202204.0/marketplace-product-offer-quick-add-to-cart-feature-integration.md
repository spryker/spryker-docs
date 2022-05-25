---
title: Marketplace Product Offer + Quick Add to Cart feature integration
last_updated: May 16, 2022
description: This document describes the process how to integrate the Marketplace Product Offer + Quick Add to Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer + Quick Add to Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Quick Add to Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:


| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |
| Quick Add to Cart | {{page.version}} | [Quick Add to Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-feature-integration.html) |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer: "^0.6.1" --update-with-dependencies
composer require spryker-feature/quick-add-to-cart:"^2018.11.0" --update-with-dependencies
```

### Add translations

Add translations as follows:

1. Append glossary for the feature:

```yaml
quick-order.input-label.merchant,Merchant,en_US
quick-order.input-label.merchant,Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                 | DESCRIPTION                                              | PREREQUISITES | NAMESPACE                                                 |
|----------------------------------------|----------------------------------------------------------|---------------|-----------------------------------------------------------|
| ProductOfferQuickOrderItemMapperPlugin | Maps product offer reference to QuickOrderItem transfer. |               | SprykerShop\Yves\ProductOfferWidget\Plugin\QuickOrderPage |


**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\ProductOfferWidget\Plugin\QuickOrderPage\ProductOfferQuickOrderItemMapperPlugin;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemMapperPluginInterface>
     */
    protected function getQuickOrderItemMapperPlugins(): array
    {
        return [
            new ProductOfferQuickOrderItemMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that product offer reference is transferred to Cart and SoldBy section contains proper merchant.

{% endinfo_block %}
