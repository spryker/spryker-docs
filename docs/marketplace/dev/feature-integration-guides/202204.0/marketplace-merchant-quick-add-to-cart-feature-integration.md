---
title: Marketplace Merchant + Quick Add to Cart feature integration
last_updated: May 25, 2022
description: This document describes the process how to integrate the Marketplace Merchant + Quick Add to Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant + Quick Add to Cart feature into a Spryker project.

## Install feature frontend

Follow the steps below to install the Marketplace Merchant + Quick Add to Cart feature frontend.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                 | VERSION          | INTEGRATION GUIDE                                                                                                                                            |
|----------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html)  |
| Quick Add to Cart    | {{page.version}} | [Quick Add to Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-feature-integration.html)               |

### Add translations

Add Yves translations:

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
merchant_search_widget.all_merchants,All Merchants,en_US
merchant_search_widget.all_merchants,Alle Händler,de_DE
merchant_search_widget.merchants,Merchants,en_US
merchant_search_widget.merchants,Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

### Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------------- | ------------------ | ------------- | --------------- |
| MerchantSearchWidget | Provides a widget to render a merchants filter.  |   | SprykerShop\Yves\MerchantSearchWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantSearchWidget\Widget\MerchantSearchWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantSearchWidget::class,
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that Quick Order Page contains "Merchant Selector" dropdown with all active merchants.

{% endinfo_block %}
