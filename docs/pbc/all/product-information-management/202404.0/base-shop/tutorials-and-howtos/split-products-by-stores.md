---
title: Split products by stores
description: This document provides details about how to split products by stores.
template: howto-guide-template
last_updated: Aug 2, 2023
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-split-products-by-stores.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-split-products-by-stores.html

related:
    - title: Persistence ACL feature walkthrough
      link: docs/pbc/all/user-management/page.version/marketplace/persistence-acl-feature-overview/persistence-acl-feature-overview.html
---

This document explains how you can split products by stores. For more clarity, we consider an example of a shop with two stores: DE and AT. For each store, we want to create separate _Product Manager_ roles:

- DE product manager
- AT product manager

The roles must be configured in such a way that the _DE Product Manager_ has access only to products that belong to the DE store.
Accordingly, the _AT Product Manager_ should only have access to the AT store products.

To separate products by stores, follow the steps below.

## Prerequisites

This example is convenient to consider on the basis of the [B2C Demo Shop](/docs/about/all/b2c-suite.html).
Follow the [installation guide](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-development-mode-on-macos-and-linux.html) to set it up.

## 1. Add the AclEntity package to the system

1. Add the [spryker/acl-entity](https://github.com/spryker/acl-entity) package:

```shell
composer require spryker/acl-entity
```

2. Regenerate the transfer objects to have `AclEntity` related transfer objects in the system:

```shell
console transfer:generate
```

The following database tables structure relates to our use case:

![Product Store ERD](https://confluence-connect.gliffy.net/embed/image/cf459fd8-0710-4906-8cc8-f8a0cbaff18d.png?utm_medium=live&utm_source=custom)

## 2. System configuration

1. To restrict access to the `Product` entity, first hook up `AclEntityBehavior` to all the related tables:

**.src/Pyz/Zed/Product/Persistence/Propel/Schema/spy_product.schema.xml**
```xml
<?xml version="1.0"?>
<database
        xmlns="spryker:schema-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        name="zed"
        xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
        namespace="Orm\Zed\Product\Persistence"
        package="src.Orm.Zed.Product.Persistence">

    <table name="spy_product_abstract">
        <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>
    <table name="spy_product">
        <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>
    <table name="spy_product_abstract_store">
        <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>
</database>
```

**.src/Pyz/Zed/Store/Persistence/Propel/Schema/spy_store.schema.xml**
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\Store\Persistence"
          package="src.Orm.Zed.Store.Persistence">

    <table name="spy_store">
        <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
    </table>

</database>

```

2. Extend the main configuration object of the Persistence Acl feature and configure as necessary.
In our case, we use the [basic inheritance configuration](/docs/pbc/all/user-management/{{site.version}}/marketplace/persistence-acl-feature-overview/persistence-acl-feature-configuration.html) example and adopt it:

**.src/Pyz/Zed/Product/Communication/Plugin/ProductAclEntityMetadataConfigExpanderPlugin.php**
```php
<?php

namespace Pyz\Zed\Product\Communication\Plugin;

use Generated\Shared\Transfer\AclEntityMetadataConfigTransfer;
use Generated\Shared\Transfer\AclEntityMetadataTransfer;
use Generated\Shared\Transfer\AclEntityParentMetadataTransfer;
use Orm\Zed\Product\Persistence\SpyProduct;
use Orm\Zed\Product\Persistence\SpyProductAbstract;
use Orm\Zed\Product\Persistence\SpyProductAbstractStore;
use Orm\Zed\Store\Persistence\SpyStore;
use Spryker\Shared\AclEntity\AclEntityConstants;
use Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class ProductAclEntityMetadataConfigExpanderPlugin extends AbstractPlugin implements AclEntityMetadataConfigExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
     *
     * @return \Generated\Shared\Transfer\AclEntityMetadataConfigTransfer
     */
    public function expand(AclEntityMetadataConfigTransfer $aclEntityMetadataConfigTransfer
    ): AclEntityMetadataConfigTransfer {
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyProduct::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyProduct::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyProductAbstract::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyProductAbstract::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyProductAbstract::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyProductAbstractStore::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyProductAbstractStore::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyProductAbstractStore::class)
                ->setParent(
                    (new AclEntityParentMetadataTransfer())
                        ->setEntityName(SpyStore::class)
                )
        );
        $aclEntityMetadataConfigTransfer->getAclEntityMetadataCollectionOrFail()->addAclEntityMetadata(
            SpyStore::class,
            (new AclEntityMetadataTransfer())
                ->setEntityName(SpyStore::class)
                ->setHasSegmentTable(true)
                ->setDefaultGlobalOperationMask(AclEntityConstants::OPERATION_MASK_READ)
        );

        return $aclEntityMetadataConfigTransfer;
    }
}
```
The code above shows:

- The inheritance model of `Product` from `Store`.
- The segmentation support for `Store`.
- Default access mask with `Read` permission for `Store`, which is required for the login process.

3. Add the plugin to `AclEntityDependencyProvider`:

**./src/Pyz/Zed/AclEntity/AclEntityDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\AclEntity;

use Pyz\Zed\Product\Communication\Plugin\ProductAclEntityMetadataConfigExpanderPlugin;
use Spryker\Zed\AclEntity\AclEntityDependencyProvider as SprykerAclEntityDependencyProvider;
use Spryker\Zed\Console\Communication\Plugin\AclEntity\ConsoleAclEntityDisablerPlugin;

class AclEntityDependencyProvider extends SprykerAclEntityDependencyProvider
{
    /**
     * @return \Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface[]
     */
    protected function getAclEntityMetadataCollectionExpanderPlugins(): array
    {
        return [
            new ProductAclEntityMetadataConfigExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\Console\Communication\Plugin\AclEntity\ConsoleAclEntityDisablerPlugin[]
     */
    protected function getAclEntityDisablerPlugins(): array
    {
        return [
            new ConsoleAclEntityDisablerPlugin(),
        ];
    }
}
```

## 3. Configure data importers
After completing the above steps, the system is configured to support the desired case. Next, you need to fill the system with the required data, as explained below.

### 1. Install data importers
Two data importer packages are required: [spryker/acl-data-import](https://github.com/spryker/acl-data-import) and [spryker/acl-entity-data-import](https://github.com/spryker/acl-entity-data-import). To install both of them, run:

```shell
composer require spryker/acl-data-import spryker/acl-entity-data-import
```
Align the database schema and active record models:

```shell
console propel:install
```


### 2. Configure the data importers

1. Extend `DataImportConfig`:

<details>
<summary markdown='span'>./src/Pyz/Zed/DataImport/DataImportConfig.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport;

use Spryker\Zed\AclDataImport\AclDataImportConfig;
use Spryker\Zed\AclEntityDataImport\AclEntityDataImportConfig;
use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;
use Spryker\Zed\StockAddressDataImport\StockAddressDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return string[]
     */
    public function getFullImportTypes(): array
    {
        $customImportTypes = [
            // ...
            AclDataImportConfig::IMPORT_TYPE_ACL_ROLE,
            AclDataImportConfig::IMPORT_TYPE_ACL_GROUP,
            AclDataImportConfig::IMPORT_TYPE_ACL_GROUP_ROLE,
            AclEntityDataImportConfig::IMPORT_TYPE_ACL_ENTITY_SEGMENT,
            AclEntityDataImportConfig::IMPORT_TYPE_ACL_ENTITY_RULE,
            AclEntityDataImportConfig::IMPORT_TYPE_ACL_ENTITY_SEGMENT_CONNECTOR,
        ];

        return array_merge(parent::getFullImportTypes(), $customImportTypes);
    }
}
```

</details>

2. Extend `ConsoleDependencyProvider`:

<details>
<summary markdown='span'>./src/Pyz/Zed/DataImport/DataImportConfig.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Console;

// ...
use Spryker\Zed\AclDataImport\AclDataImportConfig;
use Spryker\Zed\AclEntityDataImport\AclEntityDataImportConfig;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Kernel\Container;

/**
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            //core data importers
            // ...          
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclDataImportConfig::IMPORT_TYPE_ACL_GROUP),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclDataImportConfig::IMPORT_TYPE_ACL_ROLE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclDataImportConfig::IMPORT_TYPE_ACL_GROUP_ROLE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclEntityDataImportConfig::IMPORT_TYPE_ACL_ENTITY_RULE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclEntityDataImportConfig::IMPORT_TYPE_ACL_ENTITY_SEGMENT),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . AclEntityDataImportConfig::IMPORT_TYPE_ACL_ENTITY_SEGMENT_CONNECTOR),
        ];
        // ...

        return $commands;
```

</details>

3. Add the new data importer plugins to `DataImportDependencyProvider`:

**./src/Pyz/Zed/DataImport/DataImportDependencyProvider.php`**
```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport;

// ...
use Spryker\Zed\AclDataImport\Communication\Plugin\AclGroupDataImportPlugin;
use Spryker\Zed\AclDataImport\Communication\Plugin\AclGroupRoleDataImportPlugin;
use Spryker\Zed\AclDataImport\Communication\Plugin\AclRoleDataImportPlugin;
use Spryker\Zed\AclEntityDataImport\Communication\Plugin\AclEntityRuleDataImportPlugin;
use Spryker\Zed\AclEntityDataImport\Communication\Plugin\AclEntitySegmentConnectorDataImportPlugin;
use Spryker\Zed\AclEntityDataImport\Communication\Plugin\AclEntitySegmentDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            // ...
            new AclGroupDataImportPlugin(),
            new AclRoleDataImportPlugin(),
            new AclGroupRoleDataImportPlugin(),
            new AclEntityRuleDataImportPlugin(),
            new AclEntitySegmentDataImportPlugin(),
            new AclEntitySegmentConnectorDataImportPlugin(),
        ];
    }
```

4. Extend the data importer yaml config:

**/data/import/local/full_EU.yml**

```yaml
# ...

#7. Acl import
- data_entity: acl-role
  source: data/import/common/common/acl_role.csv
- data_entity: acl-group
  source: data/import/common/common/acl_group.csv
- data_entity: acl-group-role
  source: data/import/common/common/acl_group_role.csv

#8. AclEntity import
- data_entity: acl-entity-segment
  source: data/import/common/common/acl_entity_segment.csv
- data_entity: acl-entity-rule
  source: data/import/common/common/acl_entity_rule.csv
- data_entity: acl-entity-segment-connector
  source: data/import/common/common/acl_entity_segment_connector.csv
```

## 4. Add the required data
Next, you should create the appropriate `AclRoles`, `AclGroups`, `AclEntityRules`, and `AclEntitySegments` entities by following the instructions below.

### 1. Add AclRoles
Create the required `AclRoles`. To do this:

1. Create or edit the `acl_role.csv` import file:

**./data/import/common/common/acl_role.csv**
```csv
name,reference
DE product manager,de_product_manager
AT product manager,at_product_manager
```
2. Start data import for `AclRoles`:
```shell
console data:import:acl-role
```
After the command execution, the following `AclRoles` appear in the system:
- DE product manager
- US product manager

### 2. Add AclGroups
As an example of `AclRole`, you should create `AclGroup`s as well. To do this, tale the following steps:

1. Prepare the `acl_group.csv` import file:

**./data/import/common/common/acl_group.csv**
```csv
name,reference
DE product manager,de_product_manager
AT product manager,at_product_manager
```

2. Run the command:
```shell
console data:import:acl-group
```

### 3. Connect AclRole and AclGroup
At this step, set up the relation between `AclGroups` and `AclRoles`. To do so, take the following steps:

1. Prepare the `acl_group_role.csv` import file:

**./data/import/common/common/acl_group_role.csv**

```csv
group_reference,role_reference
de_product_manager,de_product_manager
at_product_manager,at_product_manager
```

2. Run the command:
```shell
console data:import:acl-group-role
```

### 4. Add AclEntitySegments
Next, you should create two segments for the US and AT stores. You need the segments to be able to delimit access to data.
For more information about the data segmentation, see [Segment scope documentation](/docs/pbc/all/user-management/{{site.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/segment-scope.html).

1. Prepare the `acl_entity_segment.csv` import file:

`./data/import/common/common/acl_entity_segment.csv`
```csv
name,reference
Store DE,store_de
Store AT,store_at
```
2. Run the command:
```shell
console data:import:acl-entity-segment
```

### 5. Add AclEntitySegmentStore

Next, you need to link the segment data created in the previous step, with US and AT `Store`. To do so:

1. Find out the DE and AT `Store`s identifiers:

```sql
SELECT id_store, name FROM spy_store;
```
From the result of the query, in our case, the DE store's identifier is `1` and the AT store's identifier is `2`.

2. Prepare the `acl_entity_segment_connector.csv` import file:

**./data/import/common/common/acl_entity_segment_connector.csv**

```csv
data_entity,reference_field,entity_reference,acl_entity_segment_reference
Orm\Zed\Store\Persistence\SpyStore,id_store,1,store_de
Orm\Zed\Store\Persistence\SpyStore,id_store,2,store_at
```
3. Link `AclEntitySegment` and `Store`:

```shell
console data:import:acl-entity-segment-connector
```

### 6. Add AclEntityRules
The final stage of the data creation is creating the corresponding `AclEntityRules`.
For more information about `AclEntityRule`, see [Rules and scopes](/docs/pbc/all/user-management/{{site.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/rules-and-scopes.html).

{% info_block infoBox "Info" %}

Each of the new `AclRole` (_DE product manager_ and _AT product manager_) should have the corresponding set of `AclEntityRules`.

{% endinfo_block %}

1. Prepare the `acl_entity_rule.csv` import file:

**./data/import/common/common/acl_entity_rule.csv**

```csv
acl_role_reference,entity,scope,permission_mask,segment_reference
de_product_manager,Orm\Zed\Product\Persistence\SpyProduct,inherited,CRUD,
de_product_manager,Orm\Zed\Product\Persistence\SpyProductAbstract,inherited,CRUD,
de_product_manager,Orm\Zed\Product\Persistence\SpyProductAbstractStore,inherited,CRUD,
de_product_manager,Orm\Zed\Product\Persistence\SpyProductAbstractStore,inherited,CRUD,
de_product_manager,Orm\Zed\Store\Persistence\SpyStore,segment,R,store_de
at_product_manager,Orm\Zed\Product\Persistence\SpyProduct,inherited,CRUD,
at_product_manager,Orm\Zed\Product\Persistence\SpyProductAbstract,inherited,CRUD,
at_product_manager,Orm\Zed\Product\Persistence\SpyProductAbstractStore,inherited,CRUD,
at_product_manager,Orm\Zed\Product\Persistence\SpyProductAbstractStore,inherited,CRUD,
at_product_manager,Orm\Zed\Store\Persistence\SpyStore,segment,R,store_at
```

2. Run the command:
```shell
console data:import:acl-entity-rule
```

## 5. Configure AclEntityFacade
Next, configure `\Spryker\Zed\AclEntity\Business\AclEntityFacade` to activate the feature.
You can do that through the application plugins system by adding `AclEntityApplicationPlugin` to `ApplicationDependencyProvider`:
`./src/Pyz/Zed/Application/ApplicationDependencyProvider.php`:

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Application;

// ...
use Spryker\Zed\AclEntity\Communication\Plugin\Application\AclEntityApplicationPlugin;
use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\WebProfiler\Communication\Plugin\Application\WebProfilerApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getBackofficeApplicationPlugins(): array
    {
        $plugins = [
            // ...
            new AclEntityApplicationPlugin()
        ];
        // ...

        return $plugins;
    }

    // ...
}
```

## 6. Set up users
At this stage, the Persistence Acl feature is installed and configured to support the desired case.
The only thing left is to add an appropriate group (_DE product manager_ or _AT product manager_) to the required user.
You can do this through the Back Office. For details about how you can do that, see [Managing groups](/docs/pbc/all/user-management/{{site.version}}/base-shop/manage-in-the-back-office/manage-user-groups/create-user-groups.html)  Make sure to [assign corresponding `AclRule`](/docs/pbc/all/user-management/{{site.version}}/base-shop/user-and-rights-overview.html) to the roles as well.

When you add the _DE product manager_ group to a user, only `Products` related to the DE store become available to that user.
If the user needs access to both DE and AT stores, add two groups,_DE product manager_ and _AT product manager_, at once.
