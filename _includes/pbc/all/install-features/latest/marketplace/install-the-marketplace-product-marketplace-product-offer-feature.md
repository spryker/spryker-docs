

This document describes how to install the Marketplace Product + Marketplace Product Offer feature.

## Install feature core

Follow the steps below to install the Marketplace Product + Marketplace Product Offer feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)  |
| Marketplace Product | {{page.version}} | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html)  |
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html)   |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductProductOfferReferenceStrategyPlugin | Allows selecting a merchant product by default on PDP. |  | Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage |

{% info_block warningBox "Note" %}

The order is important. Plugin has to be registered after `ProductOfferReferenceStrategyPlugin`.

{% endinfo_block %}

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferReferenceStrategyPluginInterface>
     */
    protected function getProductOfferReferenceStrategyPlugins(): array
    {
        return [
            new MerchantProductProductOfferReferenceStrategyPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure you can switch between merchant products and product offers on the **Product Details** page.

Make sure that merchant products selected on the **Product Details** page by default.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Marketplace Product + Marketplace Product Offer feature front end.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Marketplace Product | {{page.version}} | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html)  |
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html)   |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN   | DESCRIPTION  | PREREQUISITES | NAMESPACE  |
|------------------|--------------|---------------|----------------|
| MerchantProductMerchantProductOfferCollectionExpanderPlugin | Finds merchant product by sku and expands form choices with a merchant product's value. |               | SprykerShop\Yves\MerchantProductWidget\Plugin\MerchantProductOfferWidget |

**src/Pyz/Yves/MerchantProductOfferWidget/MerchantProductOfferWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\MerchantProductOfferWidget;

use SprykerShop\Yves\MerchantProductOfferWidget\MerchantProductOfferWidgetDependencyProvider as SprykerMerchantProductOfferWidgetDependencyProvider;
use SprykerShop\Yves\MerchantProductWidget\Plugin\MerchantProductOfferWidget\MerchantProductMerchantProductOfferCollectionExpanderPlugin;

class MerchantProductOfferWidgetDependencyProvider extends SprykerMerchantProductOfferWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\MerchantProductOfferWidgetExtension\Dependency\Plugin\MerchantProductOfferCollectionExpanderPluginInterface>
     */
    protected function getMerchantProductOfferCollectionExpanderPlugins(): array
    {
        return [
            new MerchantProductMerchantProductOfferCollectionExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the offers select field obtained via `MerchantProductOffersSelectWidget` is extended with the corresponding merchant product if it exists.

{% endinfo_block %}
