---
title: Upgradability guidelines
description: Reference information for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---

## Entity name is not unique

The names of the following entities should be unique to the extent of making it impossible to accidentally match the name of a core entity introduced in future:

* Transfers
* Transfer properties
* Database tables
* Database columns
* Methods
* Constants

If a minor or major release introduces an entity with the same name, the entity in your project might change behavior or cause issues.

### Making entity names unique

To avoid unexpected issues and achieve the same result, make the names of entities unique. This section contains examples of transfer, database table, and method names. You can apply the same solution to any other entity.

#### Examples of code and related errors

`ProductAbstractStore` transfer name is not unique:

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
    <transfer name="ProductAbstractStore">
        <property name="productAbstractSku" type="string"/>
        <property name="storeName" type="string"/>
    </transfer>
</transfers>
```

Related error in the Evaluator output:
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

`evaluator_spryker` table name is not unique:

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
Related error in the Evaluator output:

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


Related error in the Evaluator output:

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




#### Examples of making entity names unique

To resolve the errors provided in the preceding examples, rename the entities. For example, add the project name as a prefix.

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


Renamed table name:

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

Renamed method name:

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

After renaming the entity, re-evaluate the code. The same error shouldn't be returned.
