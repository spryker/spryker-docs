---
title: Entity name is not unique
description: Guidelines for making entity names unique
last_updated: Mar 23, 2022
template: concept-topic-template
---

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed with an update, it can cause unexpected issues.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

When extending public API on the project level, make sure that entity names are unique, so Spryker updates are compatible with project changes. If a Spryker update introduces a core entity with a name matching a project-level entity name, its behavior might change or cause issues. To make your code unique, you can use prefixes like `Pyz` or your project name.

The names of the following entities must be unique on the project level:

* Transfers
* Transfer properties
* Database tables
* Database columns
* Methods
* Constants

## Transfer name is not unique

Transfer names must be unique.

### Example of code that causes an upgradability error: Transfer name is not unique

```xml
...
    <transfer name="CustomProductData">
        ...
    </transfer>
...
```

### Example of related error in the Evaluator output: Transfer name is not unique

```bash
---------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferName Transfer object name "CustomProductData" has to have project prefix Pyz in ".../src/Pyz/Shared/PyzCustomProduct/Transfer/custom_product.transfer.xml", like "PyzCustomProductData"
---------------------- ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Transfer name is not unique

```xml
...
    <transfer name="PyzCustomProductData">
        ...
    </transfer>
...
```
---
## Transfer property name is not unique

Transfer property names must be unique.

### Example of code that causes an upgradability error: Transfer property name is not unique

```xml
...
    <transfer name="LocaleCmsPageData">
        <property name="customProperty"/>
    </transfer>
...
```

### Example of related error in the Evaluator output: Transfer property name is not unique

```bash
-------------------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferProperty Transfer property "customProperty" for "LocaleCmsPageData" has to have project prefix Pyz in ".../src/Pyz/Shared/Cms/Transfer/cms.transfer.xml", like "pyzCustomProperty"
-------------------------- ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Transfer property name is not unique

```xml
...
    <transfer name="LocaleCmsPageData">
        <property name="pyzCustomProperty"/>
    </transfer>
...
```

## Database table name is not unique

Database table names must be unique.

### Example of code that causes an upgradability error: Database table name is not unique

```xml
...
    <table name="custom_table">
        ...
    </table>
...
```

### Example of related error in the Evaluator output: Database table name is not unique

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseTable Database table "custom_table" has to have project prefix Pyz in ".../src/Orm/Zed/PyzCustomFunctionality/Persistence/Propel/Schema/custom_table.schema.xml", like "pyz_custom_table"
----------------------- ----------------------------------------------------------------------------------------------------
```

### Example to resolve the Evaluator check error: Database table name is not unique

```xml
...
    <table name="pyz_custom_table">
        ...
    </table>
...
```

## Name of database table column is not unique

Names of database table columns must be  unique

### Example of code that causes an upgradability error: Name of database table column is not unique

```xml
...
    <table name="spy_product">
        <column name="custom_column"/>
    </table>
...
```

### Example of related error in the Evaluator output: Name of database table column is not unique

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseColumn Database column "custom_column" has to have project prefix Pyz in ".../Persistence/Propel/Schema/spy_product.schema.xml", like "pyz_custom_column"
------------------------ ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Name of database table column is not unique

```xml
...
    <table name="spy_product">
        <column name="pyz_custom_column"/>
    </table>
...
```
---

## Method name is not unique

Method names must be unique.

### Example of code that causes an upgradability error: Method name is not unique

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * ...
     */
    protected function getCustomConfiguration(): ...
    {
        ...
    }
}
```

### Example of related error in the Evaluator output: Method name is not unique

```bash
---------------- ----------------------------------------------------------------------------------------------------
NotUnique:Method Method name "Pyz\Client\RabbitMq\RabbitMqConfig::getCustomConfiguration()" should contains project prefix, like "getPyzCustomConfiguration"
---------------- ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Method name is not unique

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * ...
     */
    protected function getPyzCustomConfiguration(): ...
    {
        ...
    }
}
```


## Constant name is not unique

Constant names must be unique.

### Example of code that causes an upgradability error: Method name is not unique

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    public const CUSTOM_CONST = 'CUSTOM_CONST';
}
```

### Example of related error in the Evaluator output: Method name is not unique

```bash
------------------ ----------------------------------------------------------------------------------------------------
NotUnique:Constant "Pyz\Client\RabbitMq\RabbitMqConfig::CUSTOM_CONST" name has to have project namespace, like "PYZ_CUSTOM_CONST".
------------------ ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Method name is not unique

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    public const PYZ_CUSTOM_CONST = 'PYZ_CUSTOM_CONST';
}
```
