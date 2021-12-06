---
title: Migration guide - Translator
description: Use the guide to perform the Translator part of the Silex Migration Effort.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-translator
originalArticleId: 2b81331f-01f6-4f5e-aa80-5cc439e688b9
redirect_from:
  - /2021080/docs/migration-guide-translator
  - /2021080/docs/en/migration-guide-translator
  - /docs/migration-guide-translator
  - /docs/en/migration-guide-translator
  - /v5/docs/migration-guide-translator
  - /v5/docs/en/migration-guide-translator
  - /v5/docs/migration-guide-translator
  - /v5/docs/en/migration-guide-translator
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-translator.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-translator.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-translator.html
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using composer:

```bash
composer update spryker/translator
```
2. Remove old service providers, if you have them in the project:

```php
\Silex\Provider\TranslationServiceProvider
\SprykerShop\Yves\ShopTranslator\Plugin\Provider\TranslationServiceProvider
```
3. Add new plugins to dependency providers:

**Zed Integration**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Translator\Communication\Plugin\Application\TranslatorApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new TranslatorApplicationPlugin(),
            ...
        ];
    }
     ...
}
```

**Yves Integration**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Yves\Twig\Plugin\Application\TwigApplicationPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    ...
     /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new TwigApplicationPlugin(),
            ...
        ];
    }
     ...
}
```

4. Enable additional plugins:

**Twig Zed Integration**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Translator\Communication\Plugin\Twig\TranslatorTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new TranslatorTwigPlugin(),
            ...
        ];
    }
}
```

**Validator Zed Integration**

```php
<?php

namespace Pyz\Zed\Validator;

use Spryker\Zed\Translator\Communication\Plugin\Validator\TranslatorValidatorPlugin;
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
            new TranslatorValidatorPlugin(),
            ...
        ];
    }
}
```

**Twig Yves Integration**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Yves\Translator\Plugin\Twig\TranslatorTwigPlugin;
use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new TranslatorTwigPlugin(),
            ...
        ];
    }
}
```

**Validator Yves Integration**

```php
<?php

namespace Pyz\Yves\Validator;

use Spryker\Yves\Translator\Plugin\Validator\TranslatorValidatorPlugin;
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
            new TranslatorValidatorPlugin(),
            ...
        ];
    }
}
```
