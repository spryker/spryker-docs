---
title: Upgrade to Symfony 5
description: Learn about the main changes in the new Symfony version 5, and how you can make your project compatible with it
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/symfony-5-integration
originalArticleId: d5e96c3b-3ed6-49ed-982c-aa641e09b558
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-symfony-5.html
  - /docs/scos/dev/technical-enhancements/symfony-5-integration.html
---

Spryker supports Symfony 5 that was released in November 2019. We tried to keep BC for all three major versions of Symfony, but because of some changes in version 5, we had to partially drop support for Symfony 3.

{% info_block warningBox "Avoid old Symfony versions" %}

Although Spryker still supports older versions of Symfony, avoid installing them. Installing older versions of Symfony may cause conflicts with other packages that may have different requirements. Always try to keep your dependencies updated.

{% endinfo_block %}

<a name="changes"></a>

## Main changes in Symfony 5

Most of the changes in Symfony 5 are related to changes in `symfony/http-kernel` and the `symfony/translation` components. In version 4 of the `symfony/http-kernel` component, new event classes were introduced, some were deprecated, and the event classes are final in version 5. Thus, we had to use the new final event classes and refactor some modules that use the old event classes.

In version 5 of the `symfony/translation` component, some interfaces were extracted into the `symfony/translation-contracts` component. Because of this, we had to refactor some modules that used those interfaces.

## Upgrade Symfony to version 5

To make your project compatible with Symfony 5, update the [Symfony](https://github.com/spryker/symfony) module and all modules that use it:

```bash
composer require spryker/symfony:"^3.5.0"
```

If you can't install the required version, check what else you need to update:

```bash
composer why-not spryker/symfony:3.5.0
```

This gives you a list of modules that require the latest `spryker/symfony` module and that need to be updated as well.


## Automated migration of your project code

Make sure to check if you need to update your project code to make it compatible with the [changes in Symfony 5](#changes).

Before you manually start to migrate your project code, consider using [Rector](https://github.com/rectorphp/rector). Rector is a tool that does instant upgrades and instant refactoring of your code. To install Rector, follow the [installation instructions](https://github.com/rectorphp/rector#install).

Once Rector is installed, run it on your codebase using the following command:

```bash
vendor/bin/rector process path/to/files -c path/to/configuration
```
We have refactored our code with two configurations. The first one uses some default sets provided by Rector:

```php
<?php

/**
 * Copyright © 2020-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use Rector\Core\Configuration\Option;
use Rector\Set\ValueObject\SetList;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $parameters = $containerConfigurator->parameters();
    $parameters->set(Option::SETS, [
        SetList::SYMFONY_34,
        SetList::SYMFONY_40,
        SetList::SYMFONY_41,
        SetList::SYMFONY_42,
        SetList::SYMFONY_43,
        SetList::SYMFONY_44,
        SetList::SYMFONY_50,
        SetList::SYMFONY_50_TYPES,
    ]);

    $parameters->set(Option::AUTO_IMPORT_NAMES, true);
};
```

The second configuration we have added:

```php
<?php

/**
 * Copyright © 2020-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

declare(strict_types = 1);

use Rector\Core\Configuration\Option;
use Rector\Renaming\Rector\MethodCall\RenameMethodRector;
use Rector\Renaming\Rector\Name\RenameClassRector;
use Rector\Renaming\ValueObject\MethodCallRename;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use function Rector\SymfonyPhpConfig\inline_value_objects;

return static function (ContainerConfigurator $containerConfigurator): void {
    $services = $containerConfigurator->services();

    $services->set(RenameClassRector::class)
        ->call('configure', [[
            RenameClassRector::OLD_TO_NEW_CLASSES => [
                'Symfony\Component\Translation\TranslatorInterface' => 'Symfony\Contracts\Translation\TranslatorInterface',
                'Symfony\Component\Debug\Exception\FlattenException' => 'Symfony\Component\ErrorHandler\Exception\FlattenException',
                'Symfony\Component\Validator\ValidatorBuilderInterface' => 'Symfony\Component\Validator\ValidatorBuilder',
            ],
        ]]);

    $services->set(RenameMethodRector::class)
        ->call('configure', [[
            RenameMethodRector::METHOD_CALL_RENAMES => inline_value_objects([
                new MethodCallRename('Symfony\Component\HttpKernel\Event\ExceptionEvent', 'getException', 'getThrowable'),
            ]),
        ]]);
};
```
