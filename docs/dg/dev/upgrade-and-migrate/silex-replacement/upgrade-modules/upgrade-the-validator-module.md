---
title: Upgrade the Validator module
description: Learn how you can upgrade the validator module of the Silex Migration within your Spryker based projects.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-validator
originalArticleId: 115a2847-c544-442c-b630-17b7c2a1f4a6
redirect_from:
  - /docs/scos/dev/migration-concepts/silex-replacement/migrate-modules/migrate-the-validator-module.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-validator.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-validator.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-validator.html
  - /docs/scos/dev/module-migration-guides/migration-guide-validator.html
---

{% info_block errorBox %}

This migration guide is a part of the [Silex migration effort](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using Composer:

```bash
composer require spryker/validator
```

2. Remove old service providers, if you have them in the project:

```php
\Silex\Provider\ValidatorServiceProvider
```

3. Enable new plugins in the corresponding files:

**Zed integration (when usable in ZED)**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Yves\Validator\Plugin\Application\ValidatorApplicationPlugin;

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
			new ValidatorApplicationPlugin(),
   			...
		];
	}
	...
}
```

**Yves integration (when usable in Yves)**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use Spryker\Zed\Validator\Communication\Plugin\Application\ValidatorApplicationPlugin;

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
			new ValidatorApplicationPlugin(),
   			...
		];
	}
	...
}
```

4. Enable additional plugins:

**Zed integration (when usable in ZED)**

```php
<?php

namespace Pyz\Zed\Validator;

use Spryker\Zed\Security\Communication\Plugin\Validator\ZedUserPasswordValidatorConstraintPlugin;
use Spryker\Zed\Translator\Communication\Plugin\Validator\TranslatorValidatorPlugin;
use Spryker\Zed\Validator\Communication\Plugin\Validator\ConstraintFactoryValidatorPlugin;
use Spryker\Zed\Validator\Communication\Plugin\Validator\MetadataFactoryValidatorPlugin;
use Spryker\Zed\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ValidatorPluginInterface[]
     */
    protected function getValidatorPlugins(): array
    {
        return [
            new MetadataFactoryValidatorPlugin(),
            new ConstraintFactoryValidatorPlugin(),
            new TranslatorValidatorPlugin(),
        ];
    }
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

**Yves integration (when usable in Yves)**

```php
<?php

namespace Pyz\Yves\Validator;

use Spryker\Yves\Security\Plugin\Validator\YvesUserPasswordValidatorConstraintPlugin;
use Spryker\Yves\Translator\Plugin\Validator\TranslatorValidatorPlugin;
use Spryker\Yves\Validator\Plugin\Validator\ConstraintValidatorFactoryValidatorPlugin;
use Spryker\Yves\Validator\Plugin\Validator\MetadataFactoryValidatorPlugin;
use Spryker\Yves\Validator\ValidatorDependencyProvider as SprykerValidatorDependencyProvider;

class ValidatorDependencyProvider extends SprykerValidatorDependencyProvider
{
    /**
     * @return \Spryker\Shared\ValidatorExtension\Dependency\Plugin\ValidatorPluginInterface[]
     */
    protected function getValidatorPlugins(): array
    {
        return [
            new MetadataFactoryValidatorPlugin(),
            new ConstraintValidatorFactoryValidatorPlugin(),
            new TranslatorValidatorPlugin(),
        ];
    }
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
