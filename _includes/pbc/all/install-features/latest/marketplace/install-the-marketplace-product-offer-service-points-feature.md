

This document describes how to install the Marketplace Product Offer + Service Points feature.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Service Points feature core.

### Prerequisites

Install the required features:

| NAME                         | VERSION          | INSTALLATION GUIDE                                                                                                                                                                               |
|------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Product Offer    | 202507.0 | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Product Offer + Service Points | 202507.0 | [Install the Product Offer + Service Points feature](/docs/pbc/all/offer-management/latest/unified-commerce/install-features/install-the-product-offer-service-points-feature.html)                            |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                          | DESCRIPTION                                                                 | PREREQUISITES | NAMESPACE                                                                                    |
|-------------------------------------------------|-----------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------|
| MerchantProductOfferServiceCollectionStorageFilterPlugin  | Filters product offer services collection by active and approved merchants. |               | Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferServicePointStorage |

**src/Pyz/Zed/ProductOfferServicePointStorage/ProductOfferServicePointStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferServicePointStorage;

use Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\ProductOfferServicePointStorage\MerchantProductOfferServiceCollectionStorageFilterPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\ProductOfferServicePointStorageDependencyProvider as SprykerProductOfferServicePointStorageDependencyProvider;

class ProductOfferServicePointStorageDependencyProvider extends SprykerProductOfferServicePointStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ProductOfferServicePointStorageExtension\Dependency\Plugin\ProductOfferServiceCollectionStorageFilterPluginInterface>
     */
    protected function getProductOfferServiceCollectionStorageFilterPlugins(): array
    {
        return [
            new MerchantProductOfferServiceCollectionStorageFilterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the only product offer service with active and approved merchant are published into Redis.

{% endinfo_block %}
