---
title: Entity name is not unique
description: Guidelines for making entity names unique
last_updated: Mar 23, 2022
template: concept-topic-template
related:
  - title: Upgradability guidelines
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html
  - title: Private API is extended
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html
  - title: Private API is used on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-used-on-the-project-level.html
  - title: Private API method is overridden on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-method-is-overridden-on-the-project-level.html
---

All entities in your project should have the unique names. Not unique names on the project level could provide naming conflict during the auto-update process. The easiest way to ensure that is to use a prefix in entities' names. Unique entities names are required for successful delivery of Spryker autoupdates to your project.

When extending public API on the project level, make sure that entity names are unique, so Spryker updates are compatible with project changes. If a Spryker update introduces a core entity with a name matching a project-level entity name, its behavior might change or cause issues. To make your code unique, you can use prefixes like `Pyz` or your project name.

The names of the following entities must be unique on the project level:

* Transfers
* Transfer properties
* Database tables
* Database columns
* Methods
* Constants
* Modules


## Transfer name is not unique

Transfer names must be unique for the new transfers on the project level. Below you can find the code examples that show how to solve the described problem.

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

Transfer property names must be unique, when you extend transfer that exists on the vendor level. Below you can find the code examples that show how to solve the described problem.

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
---

## Database table name is not unique

On the project level all new tables in database must have unique names. Below you can find the code examples that show how to solve the described problem.

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

### Example to resolving the error: Database table name is not unique

```xml
...
    <table name="pyz_custom_table">
        ...
    </table>
...
```
---

## Name of database table column is not unique

Names of database table columns must be unique when you extend table that exists on the vendor level. Below you can find the code examples that show how to solve the described problem.

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

Method names must be unique. Below you can find the code examples that show how to solve the described problem.

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

---


## Constant name is not unique

Constant names must be unique. Below you can find the code examples that show how to solve the described problem.

### Example of code that causes an upgradability error: Constant name is not unique

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    public const CUSTOM_CONST = 'CUSTOM_CONST';
}
```

### Example of related error in the Evaluator output: Constant name is not unique

```bash
------------------ ----------------------------------------------------------------------------------------------------
NotUnique:Constant "Pyz\Client\RabbitMq\RabbitMqConfig::CUSTOM_CONST" name has to have project namespace, like "PYZ_CUSTOM_CONST".
------------------ ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Constant name is not unique

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    public const PYZ_CUSTOM_CONST = 'PYZ_CUSTOM_CONST';
}
```

---

## Module name is not unique

Module names must be unique. Below you can find the code examples that show how to solve the described problem.

### Example of source structure that causes an upgradability error: Module name is not unique

```php
src/Pyz/Zed/SomeModuleName
src/Pyz/Yves/ExampleStateMachine
```

### Example of related error in the Evaluator output: Module name is not unique

```bash
------------------ ----------------------------------------------------------------------------------------------------
NotUnique:ModuleName Module ExampleStateMachine has to have project prefix, like PyzSomeModuleName.
------------------ ----------------------------------------------------------------------------------------------------
```

### Example of resolving the error: Module name is not unique

```php
src/Pyz/Zed/PyzSomeModuleName
src/Pyz/Yves/PyzExampleStateMachine
```
