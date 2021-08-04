---
title: Form and Validator
originalLink: https://documentation.spryker.com/v6/docs/form-and-validator
redirect_from:
  - /v6/docs/form-and-validator
  - /v6/docs/en/form-and-validator
---

Spryker uses **Symfony Forms** as the default form engine and **Symfony Validator** for form validation. In combination with Symfony components, we also use an additional **Validator** Service.

{% info_block infoBox %}

For more details, see [Symfony Forms](https://symfony.com/doc/current/forms.html){target="_blank"}.

{% endinfo_block %}

In this guide, you will learn how to integrate and extend the service in your project.

## Modules
The following modules are related to the service:
*   `spryker/form`
*   `spryker/form-extension`
*   `spryker/validator`
*   `spryker/validator-extension`
    
## Installation
For information on how to install and integrate _Form_ and _Validator_ in your project, perform the steps detailed in the following guides:
*   [Migration Guide - Form](https://documentation.spryker.com/docs/migration-guide-form)
*   [Migration Guide - Validator](https://documentation.spryker.com/docs/migration-guide-validator)

## Extending Form
The _Form_ Component provides several possibilities to add additional functionality like form types, validators etc. The `spryker/form-extension` module was created for this purpose. It will be installed automatically together with the `spryker/form` module.

The extension module provides the `FormPluginInterface` interface as follows:
```php
<?php

namespace Spryker\Shared\FormExtension\Dependency\Plugin;

use Spryker\Service\Container\ContainerInterface;
use Symfony\Component\Form\FormFactoryBuilderInterface;

interface FormPluginInterface
{
    /**
     * @param \Symfony\Component\Form\FormFactoryBuilderInterface $formFactoryBuilder
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Form\FormFactoryBuilderInterface
     */
    public function extend(FormFactoryBuilderInterface $formFactoryBuilder, ContainerInterface $container): FormFactoryBuilderInterface;
}
```
This interface gets the `FormFactoryBuilderInterface` and the `ContainerInterface` that are used to extend the _Form Service_ with all possible extensions and get other services from the `ContainerInterface`, when required.

To use the _Validator Service_ as an application plugin, it needs to be connected to the _Form Service_. To do so, we provide `ValidatorExtensionFormPlugin` for _Yves_ and `ValidatorFormPlugin` for _Zed_.

**Implementation Sample:**

```php
<?php

namespace Spryker\Yves\Validator\Plugin\Form;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\FormExtension\Dependency\Plugin\FormPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Symfony\Component\Form\Extension\Validator\ValidatorExtension;
use Symfony\Component\Form\FormFactoryBuilderInterface;

/**
 * @method \Spryker\Yves\Validator\ValidatorFactory getFactory()
 */
class ValidatorExtensionFormPlugin extends AbstractPlugin implements FormPluginInterface
{
    protected const SERVICE_VALIDATOR = 'validator';

    /**
     * @param \Symfony\Component\Form\FormFactoryBuilderInterface $formFactoryBuilder
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Form\FormFactoryBuilderInterface
     */
    public function extend(FormFactoryBuilderInterface $formFactoryBuilder, ContainerInterface $container): FormFactoryBuilderInterface
    {
        $formFactoryBuilder->addExtension(
            $this->createValidatorExtension($container)
        );

        return $formFactoryBuilder;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Form\Extension\Validator\ValidatorExtension
     */
    protected function createValidatorExtension(ContainerInterface $container): ValidatorExtension
    {
        return new ValidatorExtension(
            $container->get(static::SERVICE_VALIDATOR)
        );
    }
}
```

To use the plugins, we need to add them to the corresponding plugin stacks.

**Zed:**

```php
<?php

namespace Pyz\Zed\Form;

use Spryker\Zed\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Zed\Validator\Communication\Plugin\Form\ValidatorFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    /**
     * @return \Spryker\Shared\FormExtension\Dependency\Plugin\FormPluginInterface[]
     */
    protected function getFormPlugins(): array
    {
        return [
            ...
            new ValidatorFormPlugin(),
            ...
        ];
    }
}
```

**Yves:**

```php
<?php

namespace Pyz\Yves\Form;

use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Yves\Validator\Plugin\Form\ValidatorExtensionFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    /**
     * @return \Spryker\Shared\FormExtension\Dependency\Plugin\FormPluginInterface[]
     */
    protected function getFormPlugins(): array
    {
        return [
            ...
            new ValidatorExtensionFormPlugin(),
            ...
        ];
    }
}
```

## Extending Validator
The _Validator_ offers several possibilities to extend it. For example, you can add a translator or a enable a validation factory. To be able to do so, we provide the `spryker/validator-extension` module, which will be installed automatically when the `spryker/validator` module is installed.

The extension module provides the `ValidatorPluginInterface` as follows:

```php
<?php

namespace Spryker\Shared\ValidatorExtension\Dependency\Plugin;

use Spryker\Service\Container\ContainerInterface;
use Symfony\Component\Validator\ValidatorBuilderInterface;

interface ValidatorPluginInterface
{
    /**
     * @param \Symfony\Component\Validator\ValidatorBuilderInterface $validatorBuilder
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Validator\ValidatorBuilderInterface
     */
    public function extend(ValidatorBuilderInterface $validatorBuilder, ContainerInterface $container): ValidatorBuilderInterface;
}
```

The interface gets the `ValidatorBuilderInterface` and the `ContainerInterface` to be able to extend the _Validator Service_ with all possible extensions and get other services from the `ContainerInterface` when required.

In order to enable a new constraint factory, we need to add it via a plugin that implements the interface.

**Implementation Example:**

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Spryker\Yves\Validator\Plugin\Validator;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\Validator\ConstraintValidatorFactory\ConstraintValidatorFactory;
use Spryker\Shared\ValidatorExtension\Dependency\Plugin\ValidatorPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Symfony\Component\Validator\ConstraintValidatorFactoryInterface;
use Symfony\Component\Validator\ValidatorBuilderInterface;

/**
 * @method \Spryker\Yves\Validator\ValidatorFactory getFactory()
 */
class ConstraintValidatorFactoryValidatorPlugin extends AbstractPlugin implements ValidatorPluginInterface
{
    /**
     * @param \Symfony\Component\Validator\ValidatorBuilderInterface $validatorBuilder
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Validator\ValidatorBuilderInterface
     */
    public function extend(ValidatorBuilderInterface $validatorBuilder, ContainerInterface $container): ValidatorBuilderInterface
    {
        $validatorBuilder->setConstraintValidatorFactory($this->createConstraintValidationFactory($container));

        return $validatorBuilder;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Validator\ConstraintValidatorFactoryInterface
     */
    protected function createConstraintValidationFactory(ContainerInterface $container): ConstraintValidatorFactoryInterface
    {
        return new ConstraintValidatorFactory($container, $this->getFactory()->getConstraintPlugins());
    }
}
```

To use the plugins, you need to add them to the corresponding plugin stacks.

**Zed:**

```php
<?php

namespace Pyz\Zed\Validator;

use Spryker\Zed\Validator\Communication\Plugin\Validator\ConstraintFactoryValidatorPlugin;
use Spryker\Zed\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ValidatorPluginInterface[]
     */
    protected function getValidatorPlugins(): array
    {
        return [
            ...
            new ConstraintFactoryValidatorPlugin(),
            ...
        ];
    }
}
```

**Yves:**

```php
<?php

namespace Pyz\Yves\Validator;

use Spryker\Yves\Validator\Plugin\Validator\ConstraintValidatorFactoryValidatorPlugin;
use Spryker\Yves\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ValidatorPluginInterface[]
     */
    protected function getValidatorPlugins(): array
    {
        return [
            ...
            new ConstraintValidatorFactoryValidatorPlugin(),
            ...
        ];
    }
}
```

Also, Spryker provides an additional extension point for `ConstraintValidatorFactoryValidatorPlugin` in order to add the possibility of adding new constraints easily. To do so, we have one more interface, `ConstraintPluginInterface`. It is implemented as follows:

```php
<?php

namespace Spryker\Shared\ValidatorExtension\Dependency\Plugin;

use Spryker\Service\Container\ContainerInterface;
use Symfony\Component\Validator\ConstraintValidatorInterface;

interface ConstraintPluginInterface
{
    /**
     * @return string
     */
    public function getName(): string;

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Validator\ConstraintValidatorInterface
     */
    public function getConstraintInstance(ContainerInterface $container): ConstraintValidatorInterface;
}
```

The interface gets the `ContainerInterface` to be able to get every service that a constraint might require. By default, Spryker has one _Constraint Plugin_ out of the box.

**Implementation Example:**

```php
<?php

namespace Spryker\Yves\Security\Plugin\Validator;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ValidatorExtension\Dependency\Plugin\ConstraintPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPasswordValidator;
use Symfony\Component\Validator\ConstraintValidatorInterface;

class UserPasswordValidatorConstraintPlugin extends AbstractPlugin implements ConstraintPluginInterface
{
    protected const CONSTRAINT_NAME = 'security.validator.user_password';

    protected const SERVICE_SECURITY_TOKEN_STORAGE = 'security.token_storage';
    protected const SERVICE_SECURITY_ENCODER_FACTORY = 'security.encoder_factory';

    /**
     * @return string
     */
    public function getName(): string
    {
        return static::CONSTRAINT_NAME;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Validator\ConstraintValidatorInterface
     */
    public function getConstraintInstance(ContainerInterface $container): ConstraintValidatorInterface
    {
        return $this->createUserPasswordValidator($container);
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Validator\ConstraintValidatorInterface
     */
    protected function createUserPasswordValidator(ContainerInterface $container): ConstraintValidatorInterface
    {
        return new UserPasswordValidator($this->getTokenStorage($container), $this->getEncoderStorage($container));
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface
     */
    protected function getTokenStorage(ContainerInterface $container): TokenStorageInterface
    {
        return $container->get(static::SERVICE_SECURITY_TOKEN_STORAGE);
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface
     */
    protected function getEncoderStorage(ContainerInterface $container): EncoderFactoryInterface
    {
        return $container->get(static::SERVICE_SECURITY_ENCODER_FACTORY);
    }
}
```

The constraint plugins should also be added to `ValidatorDependencyProvider` for the _Zed_ and _Yves_ layers.  

**Zed:**

```php
<?php

namespace Pyz\Zed\Validator;

use Spryker\Zed\Security\Communication\Plugin\Validator\UserPasswordValidatorConstraintPlugin;
use Spryker\Zed\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ConstraintPluginInterface[]
     */
    protected function getConstraintPlugins(): array
    {
        return [
            ...
            new UserPasswordValidatorConstraintPlugin(),
            ....
        ];
    }
}
```

**Yves:**

```php
<?php

namespace Pyz\Yves\Validator;

use Spryker\Yves\Security\Plugin\Validator\UserPasswordValidatorConstraintPlugin;
use Spryker\Yves\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ConstraintPluginInterface[]
     */
    protected function getConstraintPlugins(): array
    {
        return [
            ...
            new UserPasswordValidatorConstraintPlugin(),
            ...
        ];
    }
}
```
