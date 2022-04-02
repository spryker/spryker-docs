---
title: Entity name is not unique
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Entity name is not unique

Modules have public and private APIs. More information you can get here - https://docs.spryker.com/docs/scos/dev/architecture/module-api/definition-of-module-api.html

{% info_block infoBox "" %}
While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API.
{% endinfo_block %}

When we are extending public API on the project level we need to make sure that we have unique names, so Spryker updates are compatible with project changes.

Project names that have to be unique:

* Transfers
* Transfer properties
* Database tables
* Database columns
* Methods
* Constants

If core introduces an update with the same name that already defined on project level, it might change behavior or cause issues.

{% info_block infoBox "" %}
To make your code unique you can use prefixes. F.e. "Pyz" or {Project_mane}
{% endinfo_block %}

## Unique transfer name
New transfer has to have unique name.
#### Example of code that causes the upgradability error (not unique transfer name)

```xml
...
    <transfer name="CustomProductData">
        ...
    </transfer>
...
```

#### Example of related error in the Evaluator output (not unique transfer name)
```bash
---------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferName Transfer object name {name} has to have project prefix Pyz in {path}, like {proposedName}
---------------------- ----------------------------------------------------------------------------------------------------
```

#### Example to resolve the Evaluator check error (unique transfer name)
```xml
...
    <transfer name="PyzCustomProductData">
        ...
    </transfer>
...
```
---
## Unique transfer property name
New transfer property has to have unique names.
#### Example of code that causes the upgradability error (not unique transfer property name)

```xml
...
    <transfer name="LocaleCmsPageData">
        <property name="contentWidgetParameterMap" type="array" singular="contentWidgetParameterMap"/>
    </transfer>
...
```

#### Example of related error in the Evaluator output (not unique transfer property name)

```bash
-------------------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferProperty Transfer property {transferPropertyName} for {transferName} has to have project prefix Pyz in {path}, like {proposedTransferPropertyName}
-------------------------- ----------------------------------------------------------------------------------------------------
```

#### Example to resolve the Evaluator check error (unique transfer property name)

```xml
...
    <transfer name="LocaleCmsPageData">
        <property name="pyzContentWidgetParameterMap" type="array" singular="pyzContentWidgetParameterMap"/>
    </transfer>
...
```

## Unique database table name
New DB table has to have unique names.
#### Example of not unique database table name
```xml
...
    <table name="evaluator_spryker">
        ...
    </table>
...
```

#### Example of related error in the Evaluator output (not unique database table name)
```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseTable Database table {tableName} has to have project prefix Pyz in {path}, like {proposedTableNamw}
----------------------- ----------------------------------------------------------------------------------------------------
```

#### Example to resolve the Evaluator check error (unique database table name)

```xml
...
    <table name="pyz_evaluator_spryker">
        ...
    </table>
...
```
---

## Unique database table column name
New DB table column has to have unique names.
#### Example of not unique database table column name

```xml
...
    <table name="spy_product">
        <column name="is_active"/>
    </table>
...
```

#### Example of related error in the Evaluator output (unique database table column name)

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseColumn Database column {columnName} has to have project prefix Pyz in {path}, like {proposedColumnName}
------------------------ ----------------------------------------------------------------------------------------------------
```

#### Example to resolve the Evaluator check error (unique database table column name)

```xml
...
    <table name="spy_product">
        <column name="pyz_is_active"/>
    </table>
...
```
---

## Unique method names
New methods has to have unique names.

#### Example of not unique method name 
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

#### Example of related error in the Evaluator output (unique method name)

```bash
---------------- ----------------------------------------------------------------------------------------------------
NotUnique:Method Method name {path}::{methodName} should contains project prefix, like {proposedMethodName}
---------------- ----------------------------------------------------------------------------------------------------

```

#### Example to resolve the Evaluator check error (unique method name)
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
---

## Unique constant name
New constant has to have unique names.

#### Example of not unique constant name
```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    public const CUSTOM_CONST = 'CUSTOM_CONST';
}
```

#### Example of related error in the Evaluator output (unique constant name)

```bash
------------------ ----------------------------------------------------------------------------------------------------
NotUnique:Constant {path}::{constName} name has to have project namespace, like {proposedConstName}.
------------------ ----------------------------------------------------------------------------------------------------
```

#### Example to resolve the Evaluator check error (unique constant name)

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    public const PYZ_CUSTOM_CONST = 'PYZ_CUSTOM_CONST';
}
```
---
