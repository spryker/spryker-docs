---
title: Upgradability reference
description: Rerference infomation for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---

## Transfer, Transfer property, DB table, DB column, Method, or Constant: Name is not unique

* Check that Transfer is unique and have the prefix
* Check that Transfer extend Core Transfer, and each property have the prefix
* Check that DB Table is unique and have the prefix
* Check that DB Column extend Core Table, and each column have the prefix
* Check that Method is unique and have the prefix
* Check that Constant is unique and have the prefix

### What is the nature of the upgradability error?

Spryker can release within minor or major the same item with the same name but with the different business logic.

### Example of code that can cause the upgradability errors

---

#### Check that Transfer is unique and have the prefix

* error output

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

* transfer xml

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="ProductAbstractStore">
        <property name="productAbstractSku" type="string"/>
        <property name="storeName" type="string"/>
    </transfer>
</transfers>
```

##### *How can I avoid this error?*

* Use project specific prefix, e.g Pyz

##### *Example of code achieving the same result but not causing upgradability errors*

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

#### Check that Transfer extend the Core Transfer, and each property has the prefix

* error output

```bash
************************************************************************************************************************
Evaluator\Business\Check\IsNotUnique\TransferPropertyShouldHavePrefixCheck
You should use Pyz prefix for properties in the extended transfer objects on the project level
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
LocaleCmsPageData
"\/src\/Pyz\/Shared\/Cms\/Transfer\/cms.transfer.xml"
["contentWidgetParameterMap"]
------------------------------------------------------------------------------------------------------------------------
```

* XML source

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="LocaleCmsPageData">
        <property name="contentWidgetParameterMap" type="array" singular="contentWidgetParameterMap"/>
    </transfer>
</transfers>
```

##### *How can I avoid this error?*

* Use project specific prefix, e.g Pyz

##### *Example of code achieving the same result but not causing upgradability errors*

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="LocaleCmsPageData">
        <property name="pyzContentWidgetParameterMap" type="array" singular="contentWidgetParameterMap"/>
    </transfer>
</transfers>
```

---

#### Check that DB Table is unique and have the prefix

* error output

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

* XML source

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

##### *How can I avoid this error?*

* Use project specific prefix, e.g Pyz

##### *Example of code achieving the same result but not causing upgradability errors*

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

---

#### Check that DB Column extend Core Table, and each column have the prefix

* error output

```bash
************************************************************************************************************************
Evaluator\Business\Check\IsNotUnique\DbColumnCheck
You should use Pyz prefix for extended db-schema columns on the project level
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
spy_product_abstract
"\/src\/Pyz\/Zed\/ProductGroup\/Persistence\/Propel\/Schema\/spy_product.schema.xml"
["color_code"]
```

* XML source

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://xsd.propelorm.org/1.6/database.xsd" namespace="Orm\Zed\Product\Persistence" package="src.Orm.Zed.Product.Persistence">
    <table name="spy_product_abstract" idMethod="native" allowPkInsert="true" phpName="SpyProductAbstract">
        <column name="color_code" required="false" type="VARCHAR" default="NULL" size="8"/>
    </table>
</database>
```

##### *How can I avoid this error?*

* Use project specific prefix, e.g Pyz

##### *Example of code achieving the same result but not causing upgradability errors*

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://xsd.propelorm.org/1.6/database.xsd" namespace="Orm\Zed\Product\Persistence" package="src.Orm.Zed.Product.Persistence">
    <table name="spy_product_abstract" idMethod="native" allowPkInsert="true" phpName="SpyProductAbstract">
        <column name="pyz_color_code" required="false" type="VARCHAR" default="NULL" size="8"/>
    </table>
</database>
```

---

#### Check that Method is unique and have the prefix

* error output

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

* PHP source

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

##### *How can I avoid this error?*

* Use project specific prefix, e.g Pyz

##### *Example of code achieving the same result but not causing upgradability errors*

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

#### Check that Constant is unique and have the prefix

* error output

```bash
************************************************************************************************************************
Evaluator\Business\Check\IsNotUnique\ConstantCheck
Use project specific prefix, e.g Pyz
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin
{"ADAPTER_CLASS_PATTERN":"Pyz\\Zed\\Propel\\Adapter\\Pdo\\%sAdapter"}
{"parentClass":"Spryker\\Zed\\Propel\\Communication\\Plugin\\Application\\PropelApplicationPlugin","parentConstants":{"DATA_SOURCE_NAME":"zed"}}
------------------------------------------------------------------------------------------------------------------------
```

* PHP source

```php
<?php
namespace Pyz\Zed\Propel\Communication\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin as SprykerPropelApplicationPlugin;

class PropelApplicationPlugin extends SprykerPropelApplicationPlugin
{
    protected const ADAPTER_CLASS_PATTERN = 'Pyz\Zed\Propel\Adapter\Pdo\%sAdapter';
    ...
}

```

##### *How can I avoid this error?*

* Use project specific prefix, e.g Pyz

##### *Example of code achieving the same result but not causing upgradability errors*

```php
<?php
namespace Pyz\Zed\Propel\Communication\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin as SprykerPropelApplicationPlugin;

class PropelApplicationPlugin extends SprykerPropelApplicationPlugin
{
    protected const PYZ_ADAPTER_CLASS_PATTERN = 'Pyz\Zed\Propel\Adapter\Pdo\%sAdapter';
    ...
}

```
