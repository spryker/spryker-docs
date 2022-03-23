---
title: Entity name is not unique
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Entity name is not unique

The names of the following entities should be unique:

* Transfers
* Transfer properties
* Database tables
* Database columns
* Methods
* Constants

If a minor or major release introduces an entity with the same name, the entity in your project might change behavior or cause issues.

## Making transfer names unique

To resolve the errors provided in the preceding examples, rename the transfer names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core transfer introduced in the future.

{% endinfo_block %}

#### Examples of not unique transfer config

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="ProductAbstractStore">
        <property name="productAbstractSku" type="string"/>
        <property name="storeName" type="string"/>
    </transfer>
</transfers>
```

#### Examples related error in the Evaluator output for transfer:
```bash
************************************************************************************************************************
Evaluator\Business\Check\IsNotUnique\TransferShouldHavePrefixCheck
You should use Pyz prefix for unique transfer objects on the project level
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
ProductAbstractStore
"\/src\/Pyz\/Shared\/Product\/Transfer\/product.transfer.xml"
["productAbstractSku","storeName"]
************************************************************************************************************************
```

#### Examples renamed transfer name

Renamed transfer name:

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="PyzProductAbstractStore">
        <property name="productAbstractSku" type="string"/>
        <property name="storeName" type="string"/>
    </transfer>
</transfers>
```
---

## Making transfer property names unique

To resolve the errors provided in the preceding examples, rename the transfer property names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core transfer property introduced in the future.

{% endinfo_block %}

#### Example of not unique transfer property

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="LocaleCmsPageData">
        <property name="contentWidgetParameterMap" type="array" singular="contentWidgetParameterMap"/>
    </transfer>
</transfers>
```

#### Example of related error in the Evaluator output

```bash
-------------------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferProperty Transfer property contentWidgetParameterMap for LocaleCmsPageData has to have project prefix Pyz in /0000-fork-b2c-demo-shop/src/Pyz/Shared/Cms/Transfer/cms.transfer.xml, like pyzContentWidgetParameterMap
-------------------------- ----------------------------------------------------------------------------------------------------
```

#### Example of renamed transfer property name

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="LocaleCmsPageData">
        <property name="pyzContentWidgetParameterMap" type="array" singular="pyzContentWidgetParameterMap"/>
    </transfer>
</transfers>
```

## Making table names unique

To resolve the errors provided in the preceding examples, rename the table names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core table introduced in the future.

{% endinfo_block %}

#### Example of not unique table name

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" name="zed" namespace="Orm\Zed\EvaluatorSpryker\Persistence" package="src.Orm.Zed.EvaluatorSpryker.Persistence">
    <table name="evaluator_spryker" idMethod="native">
        <column name="id_evaluator_spryker" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
        <column name="reversed_string" required="true" size="128" type="VARCHAR"/>

        <id-method-parameter value="evaluator_spryker_pk_seq"/>
    </table>
</database>
```

#### Examples related error in the Evaluator output for tables:

```bash
************************************************************************************************************************
Evaluator\Business\Check\IsNotUnique\DbTableCheck
You should use project specific prefix "pyz" for the table
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
evaluator_spryker
"\/src\/Pyz\/Zed\/EvaluatorSpryker\/Persistence\/Propel\/Schema\/evaluator_spryker.schema.xml"
["id_evaluator_spryker","reversed_string"]
************************************************************************************************************************
```

#### Examples of renamed table column name

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" name="zed" namespace="Orm\Zed\EvaluatorSpryker\Persistence" package="src.Orm.Zed.EvaluatorSpryker.Persistence">
    <table name="pyz_evaluator_spryker" idMethod="native">
        <column name="id_evaluator_spryker" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
        <column name="reversed_string" required="true" size="128" type="VARCHAR"/>

        <id-method-parameter value="evaluator_spryker_pk_seq"/>
    </table>
</database>
```

After renaming the entity, re-evaluate the code. The same error shouldn't be returned.

---

## Making database column names unique

To resolve the errors provided in the preceding examples, rename the database column names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core database column introduced in the future.

{% endinfo_block %}

#### Example of not unique database column name

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" name="zed" namespace="Orm\Zed\EvaluatorSpryker\Persistence" package="src.Orm.Zed.EvaluatorSpryker.Persistence">
    <table name="pyz_evaluator_spryker" idMethod="native">
        <column name="reversed_string" required="true" size="128" type="VARCHAR"/>
    </table>
</database>
```

#### Example of related error in the Evaluator output

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseColumn Database column reversed_string has to have project prefix Pyz in /0000-fork-b2c-demo-shop/src/Orm/Zed/EvaluatorSpryker/Persistence/Propel/Schema/spy_evaluator_spryker.schema.xml, like pyz_reversed_string
------------------------ ----------------------------------------------------------------------------------------------------
```

#### Example of renamed database column name

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" name="zed" namespace="Orm\Zed\EvaluatorSpryker\Persistence" package="src.Orm.Zed.EvaluatorSpryker.Persistence">
    <table name="pyz_evaluator_spryker" idMethod="native">
        <column name="pyz_reversed_string" required="true" size="128" type="VARCHAR"/>
    </table>
</database>
```

## Making method names unique

To resolve the errors provided in the preceding examples, rename the method names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core method introduced in the future.

{% endinfo_block %}

#### Examples of not unique method name config

`getPublishQueueConfiguration` method name is not unique:

```php
/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    ...
    /**
     * @return array
     */
    protected function getPublishQueueConfiguration(): array
    {
        ...
    }
    ...
}
```

#### Example related error in the Evaluator output

```bash
************************************************************************************************************************
Evaluator\Business\Check\IsNotUnique\MethodCheck
Use project specific prefix, e.g Pyz
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
Pyz\Client\RabbitMq\RabbitMqConfig
{"name":"getPublishQueueConfiguration","class":"Pyz\\Client\\RabbitMq\\RabbitMqConfig"}
{"parentClass":"Spryker\\Client\\RabbitMq\\RabbitMqConfig","methods":["getQueueConnections","getMessageConfig","getDefaultQueueConnectionConfig","isRuntimeSettingUpEnabled","getQueueConnectionConfigs","getQueueOptions","getQueueConfiguration","getDefaultBoundQueueNamePrefix","createExchangeOptionTransfer","createQueueOptionTransfer","get","getConfig","setSharedConfig","getSharedConfig","resolveSharedConfig"]}
```

#### Example of renamed method name

```php
/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    ...
    /**
     * @return array
     */
    protected function getPyzPublishQueueConfiguration(): array
    {
        ...
    }
    ...
}
```
---

## Making constant names unique

To resolve the errors provided in the preceding examples, rename the constant names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core constant introduced in the future.

{% endinfo_block %}

#### Example of not unique constant
```php
namespace Pyz\Client\ProductStorage\Plugin\BundleProductsExpanderPlugin;

...

interface BundleProductsExpanderPlugin use SprykerBundleProductsExpanderPlugin
{
    /**
     * @var string
     */
    public const KEY_SKU = '...';
}
```

#### Example related error in the Evaluator output

```bash
------------------ ----------------------------------------------------------------------------------------------------
NotUnique:Constant Pyz\Client\ProductStorage\Plugin\BundleProductsExpanderPlugin::KEY_SKU name has to have project namespace, like PYZ_KEY_SKU.
------------------ ----------------------------------------------------------------------------------------------------
```

#### Example of renamed constant name

```php
namespace Pyz\Client\ProductStorage\Plugin\BundleProductsExpanderPlugin;

...

interface BundleProductsExpanderPlugin use SprykerBundleProductsExpanderPlugin
{
    /**
     * @var string
     */
    public const PYZ_KEY_SKU = '...';
}
```
---