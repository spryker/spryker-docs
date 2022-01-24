---
title: Upgradability guidelines
description: Reference information for evaluator and upgrader tools.
last_updated: Nov 25, 2021
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

{% info_block infoBox "Future-proof names" %}

The names should be unique to the extent of making it impossible to accidentally match the name of a core entity introduced in future.

{% endinfo_block %}

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

## A core method is used on the project level

Modules have public and private APIs. The public API includes the entities like facade, plugin stack, dependency list, etc. This check covers private API entities, including Business model, Factory, Dependency provider, Repository, and Entity manager.

While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility in minor releases is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed, it can cause unexpected issues during minor updates.

### Moving core methods to the project level

To avoid unexpected issues and achieve the same result, replace the core methods with their copies on the project level.

#### Example of the code that causes the upgradability error

`CustomerAccessUpdater` uses the `setContentTypesToInaccessible` method from the core level.

```php
<?php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;
...
class CustomerAccessUpdater extends SprykerCustomerAccessUpdater
{
    ...
    /**
     * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerAccessTransfer
     */
    public function updateUnauthenticatedCustomerAccess(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer
    {
        return $this->getTransactionHandler()->handleTransaction(function () use ($customerAccessTransfer) {
            ...
            return $this->customerAccessEntityManager->setContentTypesToInaccessible($customerAccessTransfer);
        });
    }
}
```

Related error in the Evaluator output:
```text
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessUpdater
"Please avoid Spryker dependency: customerAccessEntityManager->setContentTypesToInaccessible(...)"
************************************************************************************************************************
```

#### Example of moving a core method to the project level

To resolve the error provided in the example, do the following:

1. Copy the method from the core to the project level and rename it, for example, by adding a prefix.

2. Add the method to the class and the interface:

```php
src/Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManager.php
/**
 * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
 *
 * @return \Generated\Shared\Transfer\CustomerAccessTransfer
 */
public function setContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer
{
   ...
}
```

```php
src/Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManagerInterface.php

/**
 * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
 *
 * @return \Generated\Shared\Transfer\CustomerAccessTransfer
 */
public function setContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer;
```

After replacing the core method with its project-level copy, re-evaluate the code. The same error shouldn't be returned.




## Method of an extended class is overridden on the project level

Factory, Dependency Provider, Repository, and Entity Manager methods belong to the private API. If you extend a core class and override one of its methods, minor releases can cause errors or unexpected changes in functionality.

### Using custom methods on the project level

To avoid unexpected issues and achieve the same result, instead of overriding the core methods, introduce custom ones.


#### Example of code that can cause upgradability errors

For example, the extended class `EvaluatorCategoryImageEntityManager` overrides the core method `CategoryImageEntityManager`.

```php
namespace Pyz\Zed\Evaluator\Persistence;

use Generated\Shared\Transfer\CategoryImageSetTransfer;
use Spryker\Zed\CategoryImage\Persistence\CategoryImageEntityManager;

class EvaluatorCategoryImageEntityManager extends CategoryImageEntityManager
{
    /**
     * @param \Generated\Shared\Transfer\CategoryImageSetTransfer $categoryImageSetTransfer
     *
     * @return \Generated\Shared\Transfer\CategoryImageSetTransfer
     */
    public function saveCategoryImageSet(CategoryImageSetTransfer $categoryImageSetTransfer): CategoryImageSetTransfer
    {
        ...
    }
}

```

Related error in the Evaluator output:
```bash
------------------------------------------------------------------------------------
************************************************************************************************************************
Evaluator\Business\Check\IsMethodOverridden\EntityManagerCheck
Introduce a new custom method without usage of existing one. Override usage of the current method in all usage of public API.
************************************************************************************************************************
------------------------------------------------------------------------------------
Pyz\Zed\EvaluatorSpryker\Persistence\EvaluatorSprykerCategoryImageEntityManager
{"name":"saveCategoryImageSet","class":"Pyz\\Zed\\EvaluatorSpryker\\Persistence\\EvaluatorSprykerCategoryImageEntityManager"}
{"parentClass":"Spryker\\Zed\\CategoryImage\\Persistence\\CategoryImageEntityManager"}
************************************************************************************************************************
```

{% info_block warningBox "Dependency Provider exception" %}

If you override a method and initialize a plugin, it does not break backward compatibility. For example, in `StorageRouterDependencyProvider`, `SprykerShopStorageRouterDependencyProvider` is overridden with a plugin introduced:

<details>
<summary markdown='span'>Example of an overridden method with a plugin</summary>

```php
<?php

namespace Pyz\Yves\StorageRouter;

use SprykerShop\Yves\CatalogPage\Plugin\StorageRouter\CatalogPageResourceCreatorPlugin;
use SprykerShop\Yves\CmsPage\Plugin\StorageRouter\PageResourceCreatorPlugin;
use SprykerShop\Yves\ProductDetailPage\Plugin\StorageRouter\ProductDetailPageResourceCreatorPlugin;
use SprykerShop\Yves\ProductSetDetailPage\Plugin\StorageRouter\ProductSetDetailPageResourceCreatorPlugin;
use SprykerShop\Yves\RedirectPage\Plugin\StorageRouter\RedirectResourceCreatorPlugin;
use SprykerShop\Yves\StorageRouter\StorageRouterDependencyProvider as SprykerShopStorageRouterDependencyProvider;

class StorageRouterDependencyProvider extends SprykerShopStorageRouterDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\StorageRouterExtension\Dependency\Plugin\ResourceCreatorPluginInterface[]
     */
    protected function getResourceCreatorPlugins(): array
    {
        return [
            new PageResourceCreatorPlugin(),
            new CatalogPageResourceCreatorPlugin(),
            new ProductDetailPageResourceCreatorPlugin(),
            new ProductSetDetailPageResourceCreatorPlugin(),
            new RedirectResourceCreatorPlugin(),
        ];
    }
}
```

</details>

{% endinfo_block %}


#### Example of using a custom method on the project level

To resolve the error:

1. Introduce a new custom method.

{% info_block infoBox "Unique method names" %}

The method name should be unique to the extent of making it impossible to accidentally match the name of a core method introduced in future.

{% endinfo_block %}

2. Replace the core method with the custom one you've created in the previous step.

When the core method is overriden with a custom one, re-evaluate the code. The same error shouldn't be returned.



## Private API class was extended or used

Private API updates can break backward compatibility. So, backward compatibility in minor releases is not guaranteed in the private API. For example, you use a core class or method on the project level. If it is updated or removed, it might change behavior or cause issues.

The following core classes are exceptions, and you can use and extend them on the project level:

* All the classes from the modules:
  * Kernel
  * Bootstrap
  * Development

* Particular classes:
  * Facade
  * Factory
  * Entity manager
  * Repository
  * Dependency provider
  * Config
  * ConfigurationProvider



### Using custom classes on the project level

To avoid unexpected issues and achieve the same result, replace core classes with custom ones.

### Example of code that can cause upgradability errors

`CustomerAccessForm` extends from `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm` class from the core level.

```php
<?php
...
**
 * @method \Spryker\Zed\CustomerAccessGui\Communication\CustomerAccessGuiCommunicationFactory getFactory()
 */
class CustomerAccessForm extends SprykerCustomerAccessForm
{
    public const OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA';
...
}
```

Related error in the Evaluator output:
```text
------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
"Please avoid dependency: Spryker\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm in Pyz\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm"
------------------------------------------------------------------------------------
```

### Example of replacing a core class with a custom one

To resolve the error provided in the example, do the following:

1. Introduce a custom class. For example, `src/Pyz/Zed/CustomerAccessGui/Communication/Form/MyCustomerAccessForm.php`.

2. Copy the needed functionality from `CustomerAccessForm` to `MyCustomerAccessForm`.


<details open>
    <summary markdown='span'>Example of MyCustomerAccessForm</summary>

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use ArrayObject;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;

/**
 * @method \Spryker\Zed\CustomerAccessGui\Communication\CustomerAccessGuiCommunicationFactory getFactory()
 */
class MyCustomerAccessForm extends AbstractType
{
    public const OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA';
    protected const FIELD_CONTENT_TYPE_ACCESS_NON_MANAGEABLE = 'contentTypeAccessNonManageable';
    public const OPTION_CONTENT_TYPE_ACCESS = 'OPTION_CONTENT_TYPE_ACCESS';
    public const FIELD_CONTENT_TYPE_ACCESS = 'contentTypeAccess';

    /**
     * @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
     *
     * @return void
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setRequired(static::OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE);
        $resolver->setRequired(static::OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE);
        $resolver->setRequired(static::OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param string[] $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->addContentTypeAccessManageable($builder, $options);
        $this->addContentTypeAccessNonManageable($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addContentTypeAccessManageable(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_CONTENT_TYPE_ACCESS, ChoiceType::class, [
            'expanded' => true,
            'multiple' => true,
            'required' => false,
            'label' => 'Content Types',
            'choice_label' => 'contentType',
            'choice_value' => 'contentType',
            'choices' => $options[static::OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE],
        ]);

        $builder
            ->get(static::FIELD_CONTENT_TYPE_ACCESS)
            ->addModelTransformer(new CallbackTransformer(function ($customerAccess): array {
                if ($customerAccess) {
                    return (array)$customerAccess;
                }

                return [];
            }, function ($customerAccess): ArrayObject {
                return new ArrayObject($customerAccess);
            }));

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addContentTypeAccessNonManageable(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_CONTENT_TYPE_ACCESS_NON_MANAGEABLE, ChoiceType::class, [
            'mapped' => false,
            'expanded' => true,
            'multiple' => true,
            'required' => false,
            'disabled' => true,
            'choice_label' => 'contentType',
            'choice_value' => 'contentType',
            'data' => $options[static::OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA],
            'choices' => $options[static::OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addContentTypeAccess(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_CONTENT_TYPE_ACCESS, ChoiceType::class, [
            'expanded' => true,
            'multiple' => true,
            'required' => false,
            'label' => 'Content Types',
            'choice_label' => 'contentType',
            'choice_value' => 'contentType',
            'choices' => $options[static::OPTION_CONTENT_TYPE_ACCESS],
        ]);

        $builder
            ->get(static::FIELD_CONTENT_TYPE_ACCESS)
            ->addModelTransformer(new CallbackTransformer(function ($customerAccess): array {
                if ($customerAccess) {
                    return (array)$customerAccess;
                }

                return [];
            }, function ($customerAccess): ArrayObject {
                return new ArrayObject($customerAccess);
            }));

        return $this;
    }
}
```

</details>

3. Overwrite the `getCustomerAccessForm` method in `src/Pyz/Zed/CustomerAccessGui/Communication/CustomerAccessGuiCommunicationFactory.php`.

```php
public function getCustomerAccessForm(CustomerAccessTransfer $customerAccessTransfer, array $options)
{
    return $this->getFormFactory()->create(
        MyCustomerAccessForm::class,
        $customerAccessTransfer,
        $options
    );
}
```

After replacing the core class with a custom one, re-evaluate the code. The same error shouldn't be returned.
