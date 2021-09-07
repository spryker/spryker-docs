---
title: Marketplace Product Option + Checkout feature integration
last_updated: Jul 28, 2021
Description: This document describes the process how to integrate the Marketplace Product Option feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Option + Checkout feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Product Option feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | LINK |
| --------------- | ------- | ---------- |
| Marketplace Product Option | master      | [Marketplace Product Option Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-option-feature-integration.html) |
| Checkout | 202001.0 | [Checkout feature integration](https://github.com/spryker-feature/checkout) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionCheckoutPreConditionPlugin | Checks the approval status for merchant product option groups. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout |


**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout\MerchantProductOptionCheckoutPreConditionPlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new MerchantProductOptionCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that merchant product option information is displayed in the checkout.

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
checkout.item.option.pre.condition.validation.error.exists,"Product option of %name% is not available anymore.",en_US
checkout.item.option.pre.condition.validation.error.exists,"Produktoption von %name% ist nicht mehr verfügbar.",de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}
