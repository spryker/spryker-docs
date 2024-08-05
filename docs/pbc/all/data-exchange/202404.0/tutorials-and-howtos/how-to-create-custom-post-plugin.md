---
title: How to create a custom post plugin for Data Exchange API
description: This document describes how to create custom post plugins for the Data Exchange API.
last_updated: Aug 5, 2024
template: howto-guide-template
---

## Prerequisites  

* [Install the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html)
* [Configure the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/configure-data-exchange-api.html)
* [Sending requests with Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/sending-requests-with-data-exchange-api.md)


## Create a post plugin

In some cases, you need to perform some actions after importing or changing data through the Data Exchange API.

For some specific requirements, you may need to create custom post plugins. Post plugins allow you to perform some manipulations after data import or data update. 
To implement custom post plugins, you need to create a new class that implements the `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface` or `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostUpdatePluginInterface` interface.

You can see more details in already existing plugins, please check documentation [Install the Data Exchange API + Category Management feature](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api-category-management-feature.html) or [Install the Data Exchange API + Inventory Management feature](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api-inventory-management-feature.html).


### Implement the `DynamicEntityPostCreatePluginInterface` interface

For example, we will create a plugin that will call a facade method after data import for a specific entity, it's an abstract example, and you can implement your logic. If you need to implement a plugin for data updates, you need to implement the  `DynamicEntityPostUpdatePluginInterface` interface. 
Methods `postCreate` and `postUpdate` should return `DynamicEntityPostEditResponseTransfer` object, you can add some errors in this transfer object if needed. `DynamicEntityPostEditRequestTransfer` object to get data from the request. Please see the example below.

**Code sample:**

```php
<?php

namespace Pyz\Zed\CustomModule\Communication\Plugin\DynamicEntity;

use Generated\Shared\Transfer\DynamicEntityPostEditRequestTransfer;
use Generated\Shared\Transfer\DynamicEntityPostEditResponseTransfer;
use Propel\Runtime\Collection\Collection;
use Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class CustomDynamicEntityPostCreatePlugin extends AbstractPlugin implements DynamicEntityPostCreatePluginInterface
{
    protected const TABLE_NAME = 'pyz_custom_table';

    public function postCreate(DynamicEntityPostEditRequestTransfer $dynamicEntityPostEditRequestTransfer): DynamicEntityPostEditResponseTransfer
    {
        if ($dynamicEntityPostEditRequestTransfer->getTableName() !== static::TABLE_NAME) {
            return new DynamicEntityPostEditResponseTransfer();
        }

        $responseTransfer = $this->getFacade()->createSubTestEntity($dynamicEntityPostEditRequestTransfer->getRawDynamicEntities()->getArrayCopy());

        return $this->buildDynamicEntityPostEditResponseTransfer($responseTransfer);
    }
}
```

To register your plugin, please add it to the `DynamicEntityDependencyProvider` in your module.

`src/Pyz/Zed/DynamicEntity/DynamicEntityDependencyProvider.php`

```php
<?php

namespace Pyz\Zed\DynamicEntity;

use Pyz\Zed\CustomModule\Communication\Plugin\CustomDynamicEntityPostCreatePlugin;
use Spryker\Zed\DynamicEntity\DynamicEntityDependencyProvider as SprykerDynamicEntityDependencyProvider;
use Spryker\Zed\ProductDynamicEntityConnector\Communication\Plugin\DynamicEntity\ProductAbstractLocalizedAttributesDynamicEntityPostUpdatePlugin;

class DynamicEntityDependencyProvider extends SprykerDynamicEntityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostUpdatePluginInterface>
     */
    protected function getDynamicEntityPostUpdatePlugins(): array
    {
        return [
            new ProductAbstractLocalizedAttributesDynamicEntityPostUpdatePlugin(),
        ];
    }

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