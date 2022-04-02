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

When we are extending public API we need to make sure that we have unique names, so Spryker updates are compatible with project changes.

Project names that have to be unique:

* Transfers
* Transfer properties
* Database tables
* Database columns
* Methods
* Constants

If core introduces with the same name that already introduced on project level, it might change behavior or cause issues.

## Making transfer names unique

To resolve the errors provided in the preceding examples, rename the transfer names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core transfer introduced in the future.

{% endinfo_block %}

#### Examples of not unique transfer name

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
---------------- ----------------------------------------------------------------------------------------------------
NotUnique:TransferName Transfer object name ProductAbstractStore has to have project prefix Pyz in /0000-fork-b2c-demo-shop/src/Pyz/Shared/Product/Transfer/product.transfer.xml, like PyzProductAbstractStore
---------------------- ----------------------------------------------------------------------------------------------------
```

#### Examples of unique transfer name

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
        ...
    </table>
</database>
```

#### Examples related error in the Evaluator output for tables

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseTable Database table evaluator_spryker has to have project prefix Pyz in /0000-fork-b2c-demo-shop/src/Pyz/Zed/EvaluatorSpryker/Persistence/Propel/Schema/evaluator_spryker.schema.xml, like pyz_evaluator_spryker
----------------------- ----------------------------------------------------------------------------------------------------
```

#### Examples of renamed table name

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" name="zed" namespace="Orm\Zed\EvaluatorSpryker\Persistence" package="src.Orm.Zed.EvaluatorSpryker.Persistence">
    <table name="pyz_evaluator_spryker" idMethod="native">
        ...
    </table>
</database>
```
---

## Making database column names unique

To resolve the errors provided in the preceding examples, rename the database column names. For example, add the project name as a prefix.

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core database column introduced in the future.

{% endinfo_block %}

#### Example of not unique database column name

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Product\Persistence" package="src.Orm.Zed.Product.Persistence">
    <table name="spy_product" idMethod="native" allowPkInsert="true" identifierQuoting="true">
        <column name="is_active" required="true" defaultValue="true" type="BOOLEAN"/>
    </table>
</database>
```

#### Example of related error in the Evaluator output

```bash
------------------------ ----------------------------------------------------------------------------------------------------
NotUnique:DatabaseColumn Database column is_active has to have project prefix Pyz in /0000-fork-b2c-demo-shop/src/Orm/Zed/Product/Persistence/Propel/Schema/spy_product.schema.xml, like pyz_is_active
------------------------ ----------------------------------------------------------------------------------------------------
```

#### Example of unique database column name

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Product\Persistence" package="src.Orm.Zed.Product.Persistence">
    <table name="spy_product" idMethod="native" allowPkInsert="true" identifierQuoting="true">
        <column name="pyz_is_active" required="true" defaultValue="true" type="BOOLEAN"/>
    </table>
</database>
```
---

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
---------------- ----------------------------------------------------------------------------------------------------
NotUnique:Method Method name Pyz\Client\RabbitMq\RabbitMqConfig::getPublishQueueConfiguration() should contains project prefix, like pyzGetPyzPublishQueueConfiguration
---------------- ----------------------------------------------------------------------------------------------------

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
NotUnique:Constant Pyz\Client\ProductStorage\Plugin\BundleProductsExpanderPlugin::KEY_SKU name has to have project namespace, like KEY_PYZ_SKU.
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
    public const KEY_PYZ_SKU = '...';
}
```
---
