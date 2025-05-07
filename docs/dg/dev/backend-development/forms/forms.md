---
title: Forms
description: The document describes how to integrate and configure the Forms and Validator components of Spryker Commerce OS.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/form-and-validator
originalArticleId: 67d7349f-f667-4371-a0f4-e4632ff42567
redirect_from:
  - /docs/scos/dev/back-end-development/forms/forms.html
related:
  - title: Creating forms
    link: docs/dg/dev/backend-development/forms/create-forms.html
---

Spryker uses **Symfony Forms** as the default form engine and **Symfony Validator** for form validation. In combination with Symfony components, we also use an additional **Validator** Service.

{% info_block infoBox %}

For more details, see [Symfony Forms](https://symfony.com/doc/current/forms.html).

{% endinfo_block %}

In this guide, you will learn how to integrate and extend the service in your project.

## Modules

The following modules are related to the service:

* `spryker/form`
* `spryker/form-extension`
* `spryker/validator`
* `spryker/validator-extension`

## Installation

For information on how to install and integrate *Form* and *Validator* in your project, perform the steps detailed in the following guides:

* [Upgrade the Form module](/docs/dg/dev/upgrade-and-migrate/silex-replacement/upgrade-modules/upgrade-the-form-module.html)
* [Upgrade the Validator module](/docs/dg/dev/upgrade-and-migrate/silex-replacement/upgrade-modules/upgrade-the-validator-module.html)

## Extending the form

The *Form* component provides several possibilities to add additional functionality like form types or validators. The `spryker/form-extension` module was created for this purpose. It will be installed automatically together with the `spryker/form` module.

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

This interface gets the `FormFactoryBuilderInterface` and the `ContainerInterface` that are used to extend the *Form Service* with all possible extensions and get other services from the `ContainerInterface`, when required.

To use the *Validator Service* as an application plugin, it needs to be connected to the *Form Service*. To do so, we provide `ValidatorExtensionFormPlugin` for *Yves* and `ValidatorFormPlugin` for *Zed*.

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

## Extending the validator

The *Validator* offers several possibilities to extend it. For example, you can add a translator or enable a validation factory. To do so, we provide the `spryker/validator-extension` module, which will be installed automatically when the `spryker/validator` module is installed.

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

The interface gets `ValidatorBuilderInterface` and `ContainerInterface` to extend the *Validator Service* with all possible extensions and get other services from the `ContainerInterface` when required.

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

The interface gets `ContainerInterface` to get every service that a constraint might require. By default, Spryker has one *Constraint Plugin* out of the box.

**Implementation Example:**

```php
<?php

namespace Spryker\Yves\Security\Plugin\Validator;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ValidatorExtension\Dependency\Plugin\ConstraintPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Symfony\Component\Validator\ConstraintValidatorInterface;

class YvesUserPasswordValidatorConstraintPlugin extends AbstractPlugin implements ConstraintPluginInterface
{
    /**
     * @var string
     */
    protected const CONSTRAINT_NAME = 'security.validator.user_password';

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getName(): string
    {
        return static::CONSTRAINT_NAME;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Validator\ConstraintValidatorInterface
     */
    public function getConstraintInstance(ContainerInterface $container): ConstraintValidatorInterface
    {
        return $this->getFactory()->createUserPasswordValidatorConstraint()->getConstraintInstance($container);
    }
}
```

The constraint plugins should also be added to `ValidatorDependencyProvider` for the *Zed* and *Yves* layers.  

**Zed:**

```php
<?php

namespace Pyz\Zed\Validator;

use Spryker\Zed\Security\Communication\Plugin\Validator\ZedUserPasswordValidatorConstraintPlugin;
use Spryker\Zed\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ConstraintPluginInterface[]
     */
    protected function getConstraintPlugins(): array
    {
        return [
            new ZedUserPasswordValidatorConstraintPlugin(),
        ];
    }
}
```

**Yves:**

```php
<?php

namespace Pyz\Yves\Validator;

use Spryker\Yves\Security\Plugin\Validator\YvesUserPasswordValidatorConstraintPlugin;
use Spryker\Yves\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ConstraintPluginInterface[]
     */
    protected function getConstraintPlugins(): array
    {
        return [
            new YvesUserPasswordValidatorConstraintPlugin(),
        ];
    }
}
```
