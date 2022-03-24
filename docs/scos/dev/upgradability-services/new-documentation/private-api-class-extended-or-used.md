---
title: Private API class was extended or used
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

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
    * Configuration provider

#### Example of the code that can be reason of upgradability errors

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

#### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
"Please avoid dependency: Spryker\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm in Pyz\\Zed\\CustomerAccessGui\\Communication\\Form\\CustomerAccessForm"
------------------------------------------------------------------------------------
```

#### Example of resolving this issue

To resolve this issue need to create new custom class and copy needed functionality that needed from the core's class
Do the following steps to resolve this issue:

1. Introduce a custom class. For example, `src/Pyz/Zed/CustomerAccessGui/Communication/Form/MyCustomerAccessForm.php`.
2. Copy the needed functionality. For example, from `CustomerAccessForm` to `MyCustomerAccessForm`.

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

4. Overwrite the `getCustomerAccessForm` method in `src/Pyz/Zed/CustomerAccessGui/Communication/CustomerAccessGuiCommunicationFactory.php`.
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