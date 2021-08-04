---
title: Glue API- Return management feature integration
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-return-management-feature-integration
redirect_from:
  - /2021080/docs/glue-api-return-management-feature-integration
  - /2021080/docs/en/glue-api-return-management-feature-integration
---

## Install Feature API

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 202009.0 | [Feature API](https://documentation.spryker.com/docs/spryker-core-feature-integration) |
| Return Management | 202009.0 | Feature |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker/sales-returns-rest-api:"202009.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| `SalesReturnsRestApi` | `vendor/spryker/sales-returns-rest-api` |

{% endinfo_block %}

### 2) Set up Transfer Objects
Run the following commands to generate transfer changes:
```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure that the configured data are added to the `spy_glossary` table  in the database.

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestReturnsAttributes` | class | created | `src/Generated/Shared/Transfer/RestReturnsAttributesTransfer` |
| `RestReturnReasonsAttributes` | class | created | `src/Generated/Shared/Transfer/RestReturnReasonsAttributesTransfer` |
| `RestReturnRequestAttributes` | class | created | `src/Generated/Shared/Transfer/RestReturnRequestAttributesTransfer` |
| `RestReturnItemRequestAttributes` | class | created | `src/Generated/Shared/Transfer/RestReturnItemRequestAttributesTransfer` |
| `RestReturnTotalsAttributes` | class | created | `src/Generated/Shared/Transfer/RestReturnTotalsAttributesTransfer` |
| `RestReturnItemsAttributes` | class | created | `src/Generated/Shared/Transfer/RestReturnItemsAttributesTransfer` |

{% endinfo_block %}

### 3) Set up Behavior
Enable resources and relationships:
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrderItemByResourceIdResourceRelationshipPlugin` | Adds order-items resource as relationship by order item uuid. | None | `Spryker\Glue\OrdersRestApi\Plugin` |
| `ReturnItemByReturnResourceRelationshipPlugin` | Adds return-items resource as relationship by return. | None | `Spryker\Glue\SalesReturnsRestApi\Plugin` |
| `ReturnsResourceRoutePlugin` | Registers /returns route. | None | `Spryker\Glue\SalesReturnsRestApi\Plugin` |
| `ReturnReasonsResourceRoutePlugin` | Registers /return-reasons route. | None | `Spryker\Glue\SalesReturnsRestApi\Plugin` |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\SalesReturnsRestApi\Plugin\ReturnItemByReturnResourceRelationshipPlugin;
use Spryker\Glue\SalesReturnsRestApi\Plugin\ReturnReasonsResourceRoutePlugin;
use Spryker\Glue\SalesReturnsRestApi\Plugin\ReturnsResourceRoutePlugin;
use Spryker\Glue\SalesReturnsRestApi\SalesReturnsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ReturnReasonsResourceRoutePlugin(),
            new ReturnsResourceRoutePlugin(),
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
            SalesReturnsRestApiConfig::RESOURCE_RETURNS,
            new ReturnItemByReturnResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            SalesReturnsRestApiConfig::RESOURCE_RETURN_ITEMS,
            new OrderItemByResourceIdResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that following endpoints are available now:
- `http://glue.mysprykershop.com/returns`
- `http://glue.mysprykershop.com/return-reasons`

Make sure that items from `http://glue.mysprykershop.com/orders` endpoint contain `isReturnable` and uuid properties.

{% endinfo_block %}
