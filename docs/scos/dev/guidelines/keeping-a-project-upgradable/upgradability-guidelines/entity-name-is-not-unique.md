---
title: Entity name is not unique
description: Guidelines for making entity names unique
last_updated: Mar 23, 2022
template: concept-topic-template
related:
  - title: Upgradability guidelines
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html
  - title: Private API is used on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-used-on-the-project-level.html
---

To avoid naming conflicts when taking semi-automatic updates, all entities in a project should have unique names. When extending public API on the project level, make sure that entity names are unique, so Spryker updates are compatible with project changes. If an update introduces a core entity with a name matching a project-level entity name, its behavior might change or cause issues. To make entity names unique, you can use prefixes like `Pyz` or your project name.

The names of the following entities must be unique on the project level:

* Transfer
* Transfer property
* Database table
* Database column
* Method
* Constant
* Module


## NotUnique:TransferName

Transfer names must be unique on the project level. This ensures that there are no conflicts with core transfers that may be introduced in future. For an example of the issue and how to solve it, see the following sections.

### Example of error in the Evaluator output: Transfer name is not unique

```bash
---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
NotUnique:TransferName Transfer object name "CustomProductData" has to have project prefix Pyz in ".../src/Pyz/Shared/PyzCustomProduct/Transfer/custom_product.transfer.xml", like "PyzCustomProductData"
---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error: Transfer name is not unique

```xml
...
    <transfer name="CustomProductData">
        ...
    </transfer>
...
```

### Example of resolving the error: Transfer name is not unique

```xml
...
    <transfer name="PyzCustomProductData">
        ...
    </transfer>
...
```

In the example, we add `Pyz` to transfers name, but you can use any other prefix, for example, your project name. After applying the solution, re-evaluate the code. The same error shouldn’t be returned.

---

## NotUnique:TransferProperty

Transfers property names that extend core-level transfers must be unique. This ensures that there are no conflicts with core transfer properties that may be introduced in future. For an example of the issue and how to solve it, see the following sections.

### Example of error in the Evaluator output: Transfer property name is not unique

```bash
-------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
NotUnique:TransferProperty Transfer property "customProperty" for "LocaleCmsPageData" has to have project prefix Pyz in ".../src/Pyz/Shared/Cms/Transfer/cms.transfer.xml", like "pyzCustomProperty"
-------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error: Transfer property name is not unique

```xml
...
    <transfer name="LocaleCmsPageData">
        <property name="customProperty"/>
    </transfer>
...
```

### Example of resolving the error: Transfer property name is not unique

```xml
...
    <transfer name="LocaleCmsPageData">
        <property name="pyzCustomProperty"/>
    </transfer>
...
```

In the example, we add `Pyz` to transfer property name, but you can use any other prefix, for example, your project name. After applying the solution, re-evaluate the code. The same error shouldn’t be returned.

---

## NotUnique:DatabaseTable

On the project level, database table names must be unique. This ensures that there are no conflicts with core database tables that may be introduced in future. For an example of the issue and how to solve it, see the following sections.

### Example of error in the Evaluator output: Database table name is not unique

```bash
----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
NotUnique:DatabaseTable Database table "custom_table" has to have project prefix Pyz in ".../src/Orm/Zed/PyzCustomFunctionality/Persistence/Propel/Schema/custom_table.schema.xml", like "pyz_custom_table"
----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error: Database table name is not unique

```xml
...
    <table name="custom_table">
        ...
    </table>
...
```

### Example to resolving the error: Database table name is not unique

```xml
...
    <table name="pyz_custom_table">
        ...
    </table>
...
```

In the example, we add `pyz` to table name, but you can use any other prefix, for example, your project name. After applying the solution, re-evaluate the code. The same error shouldn’t be returned.

---

## NotUnique:DatabaseColumn

Names of database table columns that extend core-level database tables must be unique. This ensures that there are no conflicts with the core database tables that may be introduced in future. For an example of the issue and how to solve it, see the following sections.

### Example of error in the Evaluator output: Name of database table column is not unique

```bash
------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------
NotUnique:DatabaseColumn Database column "custom_column" has to have project prefix Pyz in ".../Persistence/Propel/Schema/spy_product.schema.xml", like "pyz_custom_column"
------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error: Name of database table column is not unique

```xml
...
    <table name="spy_product">
        <column name="custom_column"/>
    </table>
...
```

### Example of resolving the error: Name of database table column is not unique

```xml
...
    <table name="spy_product">
        <column name="pyz_custom_column"/>
    </table>
...
```

In the example, we add `pyz` to the table column name, but you can use any other prefix, for example,  your project name. After applying the solution, re-evaluate the code. The same error shouldn’t be returned.

---

## NotUnique:Method

Method names must be unique. This ensures that there are no conflicts with the core methods that may be introduced in future. For an example of the issue and how to solve it, see the following sections.

### Example of error in the Evaluator output: Method name is not unique

```bash
---------------- -------------------------------------------------------------------------------------------------------------------------------------------
NotUnique:Method Method name "Pyz\Client\RabbitMq\RabbitMqConfig::getCustomConfiguration()" should contains project prefix, like "getPyzCustomConfiguration"
---------------- -------------------------------------------------------------------------------------------------------------------------------------------
```

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

In the example, we use `Pyz` prefix, but you can use any other prefix, for example, your project name. After applying the solution, re-evaluate the code. The same error shouldn’t be returned.

---

## NotUnique:Constant

Constant names must be unique. This ensures that there are no conflicts with the core constants that may be introduced in future. For an example of the issue and how to solve it, see the following sections.

### Example of error in the Evaluator output: Constant name is not unique

```bash
------------------ ---------------------------------------------------------------------------------------------------------------
NotUnique:Constant "Pyz\Client\RabbitMq\RabbitMqConfig::CUSTOM_CONST" name has to have project namespace, like "PYZ_CUSTOM_CONST".
------------------ ---------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error: Constant name is not unique

```php
namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    public const CUSTOM_CONST = 'CUSTOM_CONST';
}
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

In the example, we add `PYZ` as a constant prefix, but you can use any other prefix, for example, your project name. After applying the solution, re-evaluate the code. The same error shouldn’t be returned.

---

## NotUnique:ModuleName

Module names must be unique. This ensures that your modules will not conflict with core modules that may be introduced in future. For an example of the issue and how to solve it, see the following sections.

### Example of error in the Evaluator output: Module name is not unique

```bash
-------------------- ------------------------------------------------------------------------------
NotUnique:ModuleName Module ExampleStateMachine has to have project prefix, like PyzSomeModuleName.
-------------------- ------------------------------------------------------------------------------
```

### Example of source structure that causes an upgradability error: Module name is not unique

```php
src/Pyz/Zed/SomeModuleName
src/Pyz/Yves/ExampleStateMachine
```

### Example of resolving the error: Module name is not unique

```php
src/Pyz/Zed/PyzSomeModuleName
src/Pyz/Yves/PyzExampleStateMachine
```

In the example, we add `Pyz` as a prefix, but you can use any other prefix, for example, your project name. After applying the solution, re-evaluate the code. The same error shouldn’t be returned.
