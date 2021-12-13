---
title: Upgradability reference
description: Reference information for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---

## Method of an extended class is overridden on the project level

Factory, Dependency Provider, Repository, and Entity Manager methods belong to the private API. If you extend a core class and override one of its methods, minor releases can cause errors or unexpected changes in functionality.

### Using custom methods on the project level

To avoid the error during updates and achieve the same result, instead of overriding the core methods, introduce custom ones.


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
------------------------------------------------------------------------------------------------------------------------
************************************************************************************************************************
Evaluator\Business\Check\IsMethodOverridden\EntityManagerCheck
Introduce a new custom method without usage of existing one. Override usage of the current method in all usage of public API.
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
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


#### Introducing custom methods

To resolve the error:

1. Introduce a new custom method.

{% info_block infoBox "Unique method names" %}

The method name should be unique to the extent of making it impossible to accidentally match the name of a core method introduced in future.

{% endinfo_block %}

2. Override the core method with the custom one you've created in the previous step.

When the core method is overriden with a custom one, re-evaluate the code. The same error shouldn't be returned.



## Non-public API class was extended or used

Private API updates can break backward compatibility. So, backward compatibility in minor releases is not guaranteed in the private API. For example, if you use a core class or method on the project level, and it is updated or removed, the error may occur during an update.

Also there are exceptions, models on project level can extends from Core:

1. Facade, Factory, Entity manager, Repository, Dependency provider, Config, ConfigurationProvider.

2. All models from Kernel, Bootstrap, and Development modules.

### Overriding a core method on the project level

To avoid the error during updates and achieve the same result, provide the custom business model in the private API.

### Example of code that can cause the error and example of the error itself

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
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
"Please avoid dependency: Spryker\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm in Pyz\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm"
------------------------------------------------------------------------------------------------------------------------
```

### How do I achieve the same result without the error?

To resolve the error provided in the example, do the following:

1. Change extending from `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm` to extending from `Spryker\Zed\Kernel\Communication\Form\AbstractType`

2. Copy necessary functionality from the Core.

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use ArrayObject;
use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @method \Spryker\Zed\CustomerAccessGui\Communication\CustomerAccessGuiCommunicationFactory getFactory()
 */
class CustomerAccessForm extends AbstractType
{
    public const OPTION_CONTENT_TYPE_ACCESS = 'OPTION_CONTENT_TYPE_ACCESS';
    public const FIELD_CONTENT_TYPE_ACCESS = 'contentTypeAccess';
    public const OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE';
    public const OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA = 'OPTION_CONTENT_TYPE_ACCESS_NON_MANAGEABLE_DATA';
    protected const FIELD_CONTENT_TYPE_ACCESS_NON_MANAGEABLE = 'contentTypeAccessNonManageable';

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
        $resolver->setRequired(static::OPTION_CONTENT_TYPE_ACCESS);
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
     * @return \Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
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

When the extending is avoided, re-evaluate the code. The same error shouldn't be returned.
