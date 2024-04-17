---
title: Integrate environment configuration enhancement
description: Learn how to replace the environment name settings with explicit configuration.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/environment-configuration-enhancement
originalArticleId: af8fcee2-4a53-4e77-9749-0e171bf899f3
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-environment-configuration-enhancement.html
  - /docs/scos/dev/technical-enhancements/environment-configuration-enhancement.html
---

Previously, the behavior of Spryker applications depended on the environment name and there was no other way to manage that.  This limited the number of possible names you could use to the four hardcoded ones:

* `production`
* `staging`
* `development`
* `devtest`

To be able to use any environment name and manage application behavior more efficiently, the environment name settings are replaced with explicit configuration.

## Integration

Follow the steps below to integrate the environment enhancement into your project.

### Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED SUB-FEATURE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/api:"^0.2.2" spryker/application:"^3.16.0" spryker/config:"^3.2.0" spryker/kernel:"^3.35.0" spryker/session:"^4.4.0" spryker/setup:"^4.3.0" spryker/zed-request:"^3.8.0" spryker-shop/shop-application:"^1.6.0" spryker-shop/error-page:"^1.2.0" spryker-shop/calculation-page:"^1.1.0"--update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
|  Api  |  vendor/spryker/api |
|  Application  |  vendor/spryker/application |
|  Config |  vendor/spryker/config |
|  Kernel |  vendor/spryker/kernel |
|  Session |  vendor/spryker/session |
|  Setup |  vendor/spryker/setup |
|  ZedRequest |  vendor/spryker/zed-request |
|  ShopApplication |  vendor/spryker-shop/shop-application |
|  ErrorPage |  vendor/spryker-shop/error-page |
|  CalculationPage |  vendor/spryker-shop/calculation-page |

{% endinfo_block %}


### 2) Clean up Code

{% info_block infoBox %}

`Spryker\Shared\Config\Environment` is deprecated.

{% endinfo_block %}

Delete the  `Spryker\* Zed || Yves *\Application\Communication\Plugin\
Provider\AssertUrlConfigurationServiceProvider ` dependency:

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

```php
use Spryker\Zed\Application\Communication\Plugin\ServiceProvider\AssertUrlConfigurationServiceProvider;

...

if (Environment::isDevelopment()) {
    array_unshift($providers, new AssertUrlConfigurationServiceProvider());    
}
...
```

**src/Pyz/Yves/ShopApplication/YvesBootstrap.php**

```php
use Spryker\Yves\Application\Communication\Plugin\ServiceProvider\AssertUrlConfigurationServiceProvider;

...

if (Environment::isDevelopment()) {
    $this->application->register(new AssertUrlConfigurationServiceProvider());   
}
...
```

### 3) Set up behavior

#### Adjust Console module on project layer

1. Init the new constant -  `Pyz\Shared\Console\ConsoleConstants::ENABLE_DEVELOPMENT_CONSOLE_COMMANDS`:

```php
<?php
 /**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
 namespace Pyz\Shared\Console;

 interface ConsoleConstants
{
    /**
     * Specification:
     * - Enables commands from modules included by require-dev composer section.
     * - Must be set to false for environments where composer install --no-dev is performed.
     *
     * @api
     */
    public const ENABLE_DEVELOPMENT_CONSOLE_COMMANDS = 'CONSOLE:ENABLE_DEVELOPMENT_CONSOLE_COMMANDS';
}
```

2. Introduce the new method -  `Pyz\Zed\Console\ConsoleConfig::isDevelopmentConsoleCommandsEnabled()`:

```php
...
/**
 * @return bool
 */
public function isDevelopmentConsoleCommandsEnabled(): bool
{
    return $this->get(ConsoleConstants::ENABLE_DEVELOPMENT_CONSOLE_COMMANDS, false);
}
...
```

3. Adjust  `Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands() ` by replacing  `Environment::isDevelopment() || Environment::isTesting() ` with  `$this->getConfig()->isDevelopmentConsoleCommandsEnabled() `:

```php
...
/**
 * @return bool
 */
public function isDevelopmentConsoleCommandsEnabled(): bool
{
    return $this->get(ConsoleConstants::ENABLE_DEVELOPMENT_CONSOLE_COMMANDS, false);
}
...
```

#### Adjust all configuration files

Adjust the following files:

**config/Shared/config_default.php**

```php
use Spryker\Shared\Api\ApiConstants;
use SprykerShop\Shared\CalculationPage\CalculationPageConstants;
use SprykerShop\Shared\ErrorPage\ErrorPageConstants;
use SprykerShop\Shared\ShopApplication\ShopApplicationConstants;
...

// ----------- Api
$config[ApiConstants::ENABLE_API_DEBUG] = false;
 // ----------- Kernel test
$config[KernelConstants::ENABLE_CONTAINER_OVERRIDING] = false;
 // ----------- Calculation page
$config[CalculationPageConstants::ENABLE_CART_DEBUG] = false;
 // ----------- Error page
$config[ErrorPageConstants::ENABLE_ERROR_404_STACK_TRACE] = false;
 // ----------- Application
$config[ApplicationConstants::TWIG_ENVIRONMENT_NAME]
    = $config[ShopApplicationConstants::TWIG_ENVIRONMENT_NAME]
    = APPLICATION_ENV;
 $config[ApplicationConstants::ENABLE_PRETTY_ERROR_HANDLER] = false;
```

**config/Shared/config_default-development.php**

```php
...
use Pyz\Shared\Console\ConsoleConstants;
use Spryker\Shared\Api\ApiConstants;
use SprykerShop\Shared\CalculationPage\CalculationPageConstants;
use SprykerShop\Shared\ErrorPage\ErrorPageConstants;

...

// ---------- Api
$config[ApiConstants::ENABLE_API_DEBUG] = true;
 // ---------- Calculation page
$config[CalculationPageConstants::ENABLE_CART_DEBUG] = true;
 // ---------- Error page
$config[ErrorPageConstants::ENABLE_ERROR_404_STACK_TRACE] = true;
 // ----------- Application
$config[ApplicationConstants::ENABLE_PRETTY_ERROR_HANDLER] = true;
 // ---------- Console
$config[ConsoleConstants::ENABLE_DEVELOPMENT_CONSOLE_COMMANDS] = true;
```

**config/Shared/config_default-devtest.php**

```php
...
use Pyz\Shared\Console\ConsoleConstants;

...
// ---------- Kernel
$config[KernelConstants::ENABLE_CONTAINER_OVERRIDING] = true;
 // ---------- Console
$config[ConsoleConstants::ENABLE_DEVELOPMENT_CONSOLE_COMMANDS] = true;
```
