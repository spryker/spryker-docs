In some cases, after data is imported or changed through Data Exchange API, you might want particular events to be executed automatically. This document describes how to set up such events by creating custom post plugins.

To set up events that are executed after data import, you need to create a class that implements the `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface` interface. For events that are executed after data updates, use the `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostUpdatePluginInterface` interface. For more details on these interfaces, see [Install the Data Exchange API + Category Management feature](/docs/pbc/all/data-exchange/latest/install-and-upgrade/install-the-data-exchange-api-category-management-feature.html) or [Install the Data Exchange API + Inventory Management feature](/docs/pbc/all/data-exchange/latest/install-and-upgrade/install-the-data-exchange-api-inventory-management-feature.html).


## Prerequisites

* [Install the Data Exchange API](/docs/pbc/all/data-exchange/latest/install-and-upgrade/install-the-data-exchange-api.html)
* [Configure the Data Exchange API](/docs/pbc/all/data-exchange/latest/configure-data-exchange-api.html)


## Create a post plugin to activate products

As an example, this guide explains how to create a plugin that activates products after they're imported:

1. Implement a `DynamicEntityPostCreatePluginInterface` interface with the `postCreate(DynamicEntityPostEditRequestTransfer $dynamicEntityPostEditRequestTransfer): DynamicEntityPostEditResponseTransfer` method. Example:

```php
<?php

namespace Pyz\Zed\CustomModule\Communication\Plugin\DynamicEntity;

use Generated\Shared\Transfer\DynamicEntityPostEditRequestTransfer;
use Generated\Shared\Transfer\DynamicEntityPostEditResponseTransfer;
use Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class CustomDynamicEntityPostCreatePlugin extends AbstractPlugin implements DynamicEntityPostCreatePluginInterface
{
    protected const TABLE_NAME = 'spy_product';

    protected const ID_PRODUCT = 'id_product';

    public function postCreate(DynamicEntityPostEditRequestTransfer $dynamicEntityPostEditRequestTransfer): DynamicEntityPostEditResponseTransfer
    {
        if ($dynamicEntityPostEditRequestTransfer->getTableName() !== static::TABLE_NAME) {
            return new DynamicEntityPostEditResponseTransfer();
        }

        foreach ($dynamicEntityPostEditRequestTransfer->getRawDynamicEntities() as $rawDynamicEntity) {
            $this->productFacade->activateProductConcrete($rawDynamicEntity->getFields()[static::ID_PRODUCT]);
        }

        return new DynamicEntityPostEditResponseTransfer();
    }
}
```

2. To register the plugin, add it to the `DynamicEntityDependencyProvider` in the module.

**src/Pyz/Zed/DynamicEntity/DynamicEntityDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\DynamicEntity;

use Pyz\Zed\CustomModule\Communication\Plugin\CustomDynamicEntityPostCreatePlugin;
use Spryker\Zed\DynamicEntity\DynamicEntityDependencyProvider as SprykerDynamicEntityDependencyProvider;

class DynamicEntityDependencyProvider extends SprykerDynamicEntityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface>
     */
    protected function getDynamicEntityPostCreatePlugins(): array
    {
        return [
            new CustomDynamicEntityPostCreatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Configure the Product entity in `spy_dynamic_entity_configuration`. For instructions, see [Configure Data Exchange API](/docs/pbc/all/data-exchange/latest/configure-data-exchange-api.html).
2. Send a POST request to import product data. For instructions, see [Sending requests to Data Exchange API](/docs/integrations/spryker-glue-api/backend-api/data-exchange-api/sending-requests-to-data-exchange-api.html).
3. Send a GET request to check if the product is activated. For instructions, see [Sending requests to Data Exchange API](/docs/integrations/spryker-glue-api/backend-api/data-exchange-api/sending-requests-to-data-exchange-api.html).

{% endinfo_block %}