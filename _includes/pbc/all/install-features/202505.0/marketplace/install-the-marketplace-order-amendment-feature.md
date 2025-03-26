# Install the Order Amendment feature

This document describes how to install the Marketplace Order Amendment feature.

## Install feature core

Follow the steps below to install the Marketplace Order Amendment feature core.

### Prerequisites

Install the required features:

| NAME                      | VERSION           | INSTALLATION GUIDE |
|---------------------------|-------------------|--------------------|
| Order Amendment           | {{page.version}}  |                    |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-order-amendment: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules have been installed:

| MODULE                               | EXPECTED DIRECTORY                                       |
|--------------------------------------|----------------------------------------------------------|
| PriceProductOfferSalesOrderAmendment | vendor/spryker/price-product-offer-sales-order-amendment |

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                         | SPECIFICATION                                                                                            | PREREQUISITES                                                                                                                                    | NAMESPACE                                                                                   |
|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| ProductOfferOriginalSalesOrderItemPriceGroupKeyExpanderPlugin  | Expands provided group key with product offer reference if `ItemTransfer.productOfferReference` is set.  | None                                                                                                                                             | Spryker\Service\PriceProductOfferSalesOrderAmendment\Plugin\PriceProductSalesOrderAmendment |

**src/Pyz/Service/PriceProductSalesOrderAmendment/PriceProductSalesOrderAmendmentDependencyProvider.php**

```php
<?php

namespace Pyz\Service\PriceProductSalesOrderAmendment;

use Spryker\Service\PriceProductOfferSalesOrderAmendment\Plugin\PriceProductSalesOrderAmendment\ProductOfferOriginalSalesOrderItemPriceGroupKeyExpanderPlugin;
use Spryker\Service\PriceProductSalesOrderAmendment\PriceProductSalesOrderAmendmentDependencyProvider as SprykerPriceProductSalesOrderAmendmentDependencyProvider;

class PriceProductSalesOrderAmendmentDependencyProvider extends SprykerPriceProductSalesOrderAmendmentDependencyProvider
{
    /**
     * @return list<\Spryker\Service\PriceProductSalesOrderAmendmentExtension\Dependency\Plugin\OriginalSalesOrderItemPriceGroupKeyExpanderPluginInterface>
     */
    protected function getOriginalSalesOrderItemPriceGroupKeyExpanderPlugins(): array
    {
        return [
            new ProductOfferOriginalSalesOrderItemPriceGroupKeyExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Make an order with a product offer.
- Change price for the product offer from the order to the higher one.
- Start the order amendment process for the newly created order, make sure the price from the original order is applied for the order item instead of the new higher price.
- In Storefront go to PDP page of the product offer from the order, make sure the price from the original order is applied instead of the new higher price.

{% endinfo_block %}
