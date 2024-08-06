---
title: How to create a custom post create/update plugin for Data Exchange API
description: This document describes how to create custom post create/update plugin for the Data Exchange API.
last_updated: Aug 5, 2024
template: howto-guide-template
---

## Prerequisites  

* [Install the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html)
* [Configure the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/configure-data-exchange-api.html)
* [Sending requests with Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/sending-requests-with-data-exchange-api.md)


## Post plugin creation for Data Exchange API

In some cases, we need to perform some actions after importing or changing data through the Data Exchange API.

For some specific requirements, we may need to create a custom post plugin. Post plugins allow us to perform some manipulations after data import or data updates.
For some manipulation after data import, we may need to create a new class that implements the `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface` interface.
After data updates we may implement the `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostUpdatePluginInterface` interface.

For more details, please check documentation [Install the Data Exchange API + Category Management feature](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api-category-management-feature.html) or [Install the Data Exchange API + Inventory Management feature](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api-inventory-management-feature.html).

We will create a plugin that will create some related data after data import for a specific entity, it's an abstract example without concrete logic. If we need to implement a plugin for data import, we need to implement the `DynamicEntityPostCreatePluginInterface` interface with `postCreate(DynamicEntityPostEditRequestTransfer $dynamicEntityPostEditRequestTransfer): DynamicEntityPostEditResponseTransfer` method. Please see the example below.

**Code sample:**

```php
<?php

namespace Pyz\Zed\CustomModule\Communication\Plugin\DynamicEntity;

use Generated\Shared\Transfer\DynamicEntityPostEditRequestTransfer;
use Generated\Shared\Transfer\DynamicEntityPostEditResponseTransfer;
use Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class CustomDynamicEntityPostCreatePlugin extends AbstractPlugin implements DynamicEntityPostCreatePluginInterface
{
    protected const MAIN_TABLE_NAME = 'pyz_custom_table';

    public function postCreate(DynamicEntityPostEditRequestTransfer $dynamicEntityPostEditRequestTransfer): DynamicEntityPostEditResponseTransfer
    {
        if ($dynamicEntityPostEditRequestTransfer->getTableName() !== static::MAIN_TABLE_NAME) {
            return new DynamicEntityPostEditResponseTransfer();
        }

        $responseTransfer = $this->getSubTestCreator()->createSubTestEntity($dynamicEntityPostEditRequestTransfer->getRawDynamicEntities()->getArrayCopy());

        return $this->buildDynamicEntityPostEditResponseTransfer($responseTransfer);
    }
}
```

To register the plugin, we need add it to the `DynamicEntityDependencyProvider` in the module.

`src/Pyz/Zed/DynamicEntity/DynamicEntityDependencyProvider.php`

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

Make sure the new created data has been in the database table.

{% endinfo_block %}