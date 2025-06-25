

This document describes how to install the Prices feature API.

## Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Product | {{page.version}} | [Install the Product Glue API - ongoing](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html) |
| Price | {{page.version}} | [Install the Prices feature - ongoing](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)|

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-prices-rest-api:"^1.1.0" spryker/products-product-prices-resource-relationship:"^1.0.0" spryker/price-product-volumes-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductPricesRestApi | vendor/spryker/product-prices-rest-api |
| ProductsProductPricesResourceRelationship| vendor/spryker/products-product-prices-resource-relationship|
| PriceProductVolumesRestApi| vendor/spryker/price-product-volume-rest-api|

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes exist in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestProductPriceAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer.php |
| RestProductPricesAttributesTransfer |class |created |src/Generated/Shared/Transfer/RestProductPricesAttributesTransfer.php|
|  RestCurrencyTransfer| class| created |src/Generated/Shared/Transfer/RestCurrencyTransfer.php|
| RestProductPriceVolumesAttributesTransfer| class| created |src/Generated/Shared/Transfer/RestProductPriceVolumesAttributesTransfer.php|
| RestProductPriceAttributesTransfer.volumePrices |property| added| src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer.php|

{% endinfo_block %}

## 3) Enable resources and relationships

Activate the following plugins:  

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractProductPricesRoutePlugin | Registers the `abstract-product-prices` resource. | None | Spryker\Glue\ProductPricesRestApi\Plugin |
| ConcreteProductPricesRoutePlugin |Registers the `concrete-product-prices` resource. |None| Spryker\Glue\ProductPricesRestApi\Plugin|
|AbstractProductsProductPricesResourceRelationshipPlugin| Adds the `abstract-product-prices` resource as a relationship to the `abstract-products` resource.| None |Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin|
|ConcreteProductsProductPricesResourceRelationshipPlugin |Adds the `concrete-product-prices` resource as a relationship to the `concrete-products` resource. |None |Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin|
|PriceProductVolumeRestProductPricesAttributesMapperPlugin |Adds volume price data to `abstract-product-prices`  and `concrete-product-prices` resources. |None| Spryker\Glue\PriceProductVolumesRestApi\Plugin\ProductPriceRestApi|

<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductPricesRestApi\Plugin\AbstractProductPricesRoutePlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\ConcreteProductPricesRoutePlugin;
use Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin\AbstractProductsProductPricesResourceRelationshipPlugin;
use Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin\ConcreteProductsProductPricesResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductPricesRoutePlugin(),
			new ConcreteProductPricesRoutePlugin(),
        ];
    }

 	/**
    * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    *
    * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
    */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new AbstractProductsProductPricesResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ConcreteProductsProductPricesResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>

{% info_block warningBox "Verification" %}

- Make sure that the following endpoints are available:

  - `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-prices`

  - `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-prices`

- Send the `GET http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-prices` request. Make sure that the response contains relationships to the `abstract-product-prices` resources.

- Send the `GET http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=concrete-product-prices` request. Make sure that the response contains relationships to the `concrete-product-prices` resources.  

{% endinfo_block %}


**src/Pyz/Glue/ProductPricesRestApi/ProductPricesRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductPricesRestApi;

use Spryker\Glue\PriceProductVolumesRestApi\Plugin\ProductPriceRestApi\PriceProductVolumeRestProductPricesAttributesMapperPlugin;
use Spryker\Glue\ProductPricesRestApi\ProductPricesRestApiDependencyProvider as SprykerProductPricesRestApiDependencyProvider;

class ProductPricesRestApiDependencyProvider extends SprykerProductPricesRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ProductPricesRestApiExtension\Dependency\Plugin\RestProductPricesAttributesMapperPluginInterface[]
     */
    protected function getRestProductPricesAttributesMapperPlugins(): array
    {
        return [
            new PriceProductVolumeRestProductPricesAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

To verify that you've activated `PriceProductVolumeRestProductPricesAttributesMapperPlugin`:

1. Create an abstract product with a volume price.
2. Send the request `GET https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-prices` request and make sure that the response contains volume prices data.

{% endinfo_block %}
