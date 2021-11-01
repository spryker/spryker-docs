---
title: How to split Products by Stores
description: This document provides details on how to split products by stores.
template: howto-guide-template
---
Let's overview an example when our shop has 2 stores: DE and AT, and for each store we want to create a _Product Manager_ role:
- DE product manager
- AT product manager

The roles must be configured in such a way that the _DE Product Manager_ has access only to those Products that belong to the DE store.
Accordingly, the _AT Product Manager_ should only have access to AT store Products.

## Prerequisites
This example is convenient to consider using the example of [b2c-demo-shop](https://github.com/spryker-shop/b2c-demo-shop).
Please follow the [installation guide](https://github.com/spryker-shop/b2c-demo-shop#docker-installation) to set up the shop.

## Including AclEntity package
After installing the shop, you need to add the [spryker/acl-entity](https://github.com/spryker/acl-entity) package:
```shell
composer require spryker/acl-entity
```

Regenerate the transfer objects in order to have `AclEntity` related transfer objects in the system:
```shell
console transfer:generate
```

Here the structure of the database tables that relate to our use case.

![Product Store ERD](https://confluence-connect.gliffy.net/embed/image/cf459fd8-0710-4906-8cc8-f8a0cbaff18d.png?utm_medium=live&utm_source=custom)

## System configuration
Since we want to restrict access to the `Product`, first let's hook up the `AclEntityBehavior` to all related tables.

`.src/Pyz/Zed/Product/Persistence/Propel/Schema/spy_product.schema.xml`
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

`.src/Pyz/Zed/Store/Persistence/Propel/Schema/spy_store.schema.xml`
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

Next, we should extend the main configuration object of the Persistence Acl feature, and set the necessary configuration.
Let's use an [Basic inheritance configuration](./configuration.html#basic-inheritance-configuration) example and adopt it for the case.

`.src/Pyz/Zed/Product/Communication/Plugin/ProductAclEntityMetadataConfigExpanderPlugin.php`
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
From the code above we can see:
- The inheritance model of `Product` from `Store`.
- The segmentation support for `Store`.
- Default access mask with `Read` permission for `Store` (this is required for the login process). 

Next add the plugin to the `AclEntityDependencyProvider`:

`./src/Pyz/Zed/AclEntity/AclEntityDependencyProvider.php`
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

## Configure data importers
After completing the above steps, our system is configured to support the desired case.
Next we need to fill the system with required data.

### Install data importers
There are two data importer packages required: [spryker/acl-data-import](https://github.com/spryker/acl-data-import) and [spryker/acl-entity-data-import](https://github.com/spryker/acl-entity-data-import).
Run the command to install both of them:
```shell
composer require spryker/acl-data-import spryker/acl-entity-data-import
```
Run the command to align the database schema and active record models:
```shell
console propel:install
```


### Configure data importers
Extend `DataImportConfig`:
`.src/Pyz/Zed/DataImport/DataImportConfig.php`
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

Extend `ConsoleDependencyProvider`:
`./src/Pyz/Zed/DataImport/DataImportConfig.php`
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

Add new data importer plugins to the `DataImportDependencyProvider`:
`./src/Pyz/Zed/DataImport/DataImportDependencyProvider.php`

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

Extend the data importer yaml config:
`./data/import/local/full_EU.yml`

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

## Add required data 
Next we need to create the appropriate `AclRoles`, `AclGroups`, `AclEntityRules` and `AclEntitySegments`.

### Add AclRoles
Let's create required `AclRoles`.
Create or edit `acl_role.csv`:

`./data/import/common/common/acl_role.csv`
```csv
name,reference
DE product manager,de_product_manager
AT product manager,at_product_manager
```
Run the command to start data import for `AclRoles`:
```shell
console data:import:acl-role
```
After the command execution the system will have the following `AclRoles`:
- DE product manager
- US product manager

### Add AclGroups
As an example of `AclRole` we should create `AclGroup`s as well:
Prepare `acl_group.csv`:

`./data/import/common/common/acl_group.csv`
```csv
name,reference
DE product manager,de_product_manager
AT product manager,at_product_manager
```

Run the command:
```shell
console data:import:acl-group
```

### Connect AclRole and AclGroup
On this step we should set up relation between `AclGroups` and `AclRoles`:
Prepare `acl_group_role.csv`:

`./data/import/common/common/acl_group_role.csv`
```csv
group_reference,role_reference
de_product_manager,de_product_manager
at_product_manager,at_product_manager
```

Run the command:
```shell
console data:import:acl-group-role
```

### Add AclEntitySegments
Next we should create 2 segments for Store's: US and AT
Segments are needed in order to be able to delimit access to data.
Read [Segment scope documentation](./rules-and-scopes/segment-scope.html) to get more information about data segmentation.
Prepare `acl_entity_segment.csv`:

`./data/import/common/common/acl_entity_segment.csv`
```csv
name,reference
Store DE,store_de
Store AT,store_at
```
Run the command:
```shell
console data:import:acl-entity-segment
```

### Add AclEntitySegmentStore
Next, we need to link the segment data that we created above with US and AT `Store`.
Let's find out the DE and AT `Store`s identifiers:
```sql
SELECT id_store, name FROM spy_store;
```
From the result of the query we can see that DE `Store` identifier is `1` and AT `Store` identifier is `2`.
This data is enough to prepare the next import file: `acl_entity_segment_connector.csv`

`./data/import/common/common/acl_entity_segment_connector.csv`
```csv
data_entity,reference_field,entity_reference,acl_entity_segment_reference
Orm\Zed\Store\Persistence\SpyStore,id_store,1,store_de
Orm\Zed\Store\Persistence\SpyStore,id_store,2,store_at
```
Rnn the command to link `AclEntitySegment` and `Store`:
```shell
console data:import:acl-entity-segment-connector
```

### Add AclEntityRules
The final stage of data creation is creating the corresponding `AclEntityRules`.
Read more about `AclEntityRule` in the  [Rules and Scopes documentation](./rules-and-scopes/rules-and-scopes.html).
Each of the new `AclRole` (_DE product manager_ and _AT product manager_) should have the corresponding set of `AclEntityRules`.
Prepare `acl_entity_rule.csv` for the import:

`./data/import/common/common/acl_entity_rule.csv`
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

Run the command:
```shell
console data:import:acl-entity-rule
```

## Configure AclEntityFacade
Next we need to configure `\Spryker\Zed\AclEntity\Business\AclEntityFacade` to activate the feature.
It can be done through the application plugins system: just add `AclEntityApplicationPlugin` to the `ApplicationDependencyProvider`:
`./src/Pyz/Zed/Application/ApplicationDependencyProvider.php`
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
## Setup users
Finaly Persistence Acl feature is installed and configured to support the desired case.
The only thing is left is to add appropriate group (_DE product manager_ and/or _AT product manager_) to the required user.
This operation can be performed through the Zed UI. Don't forget to assign corresponding `AclRule` to the roles as well.

When you add the _DE product manager_ group to a user, only `Products` related to DE store will be available to the user.
If the user needs access to both the DE and AT store, you need to add 2 groups (_DE product manager_, _AT product manager_) at once.
