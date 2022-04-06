---
title: Entity name is not unique
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed, it can cause unexpected issues during updates.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

When you are extending public API on the project level, make sure that entity names are unique, so Spryker updates are compatible with project changes. If a Spryker update introduces a core entity with a name matching a project-level entity name, their behavior might change or cause issues. To make your code unique, you can use prefixes like `Pyz` or your project's name.

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
NotUnique:TransferName Transfer object name {name} has to have project prefix Pyz in {path}, like {proposedName}
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
        <property name="contentWidgetParameterMap" type="array" singular="contentWidgetParameterMap"/>
    </transfer>
...
```

### Example of related error in the Evaluator output: Transfer property name is not unique

```bash
-------------------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferProperty Transfer property {transferPropertyName} for {transferName} has to have project prefix Pyz in {path}, like {proposedTransferPropertyName}
-------------------------- ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Transfer property name is not unique

```xml
...
    <transfer name="LocaleCmsPageData">
        <property name="pyzContentWidgetParameterMap" type="array" singular="pyzContentWidgetParameterMap"/>
    </transfer>
...
```

## Database table name is not unique

Database table names must be unique.

### Example of code that causes an upgradability error: Database table name is not unique

```xml
...
    <table name="evaluator_spryker">
        ...
    </table>
...
```

### Example of related error in the Evaluator output: Database table name is not unique

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseTable Database table {tableName} has to have project prefix Pyz in {path}, like {proposedTableName}
----------------------- ----------------------------------------------------------------------------------------------------
```

### Example to resolve the Evaluator check error: Database table name is not unique

```xml
...
    <table name="pyz_evaluator_spryker">
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
        <column name="is_active"/>
    </table>
...
```

### Example of related error in the Evaluator output: Name of database table column is not unique

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseColumn Database column {columnName} has to have project prefix Pyz in {path}, like {proposedColumnName}
------------------------ ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Name of database table column is not unique

```xml
...
    <table name="spy_product">
        <column name="pyz_is_active"/>
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
NotUnique:Method Method name {path}::{methodName} should contains project prefix, like {proposedMethodName}
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
NotUnique:Constant {path}::{constName} name has to have project namespace, like {proposedConstName}.
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
