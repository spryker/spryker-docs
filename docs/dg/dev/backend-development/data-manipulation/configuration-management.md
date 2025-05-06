---
title: Configuration management
description: Several files let you add the needed configuration for the exact use case you want.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configuration-management
originalArticleId: d0060038-0140-4763-824e-aaa264ac39fe
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/configuration-management.html
---

A configuration file is a set of key-value pairs, properties, and methods that define how to manage and configure the settings. Spryker config is represented as a set of the files located in the `/project/config/` folder of your project.

The directory includes the following subfolders with configuration files:

* `install`
* `Shared`
* `Yves`
* `Zed`

These configuration files are used only for the global environment configuration, like database credentials, URLs, or search engine ports. For settings that are used inside a specific module, use the module configuration instead.

## Default and local configuration files

`config/Shared` contains several files necessary for the system's configuration, that can be used by both Yves and Zed.

There are several files that let you add the needed configuration for your specific exact use case.

|  FILENAME  |  DESCRIPTION | EXAMPLE FILE NAME | ON GITIGNORE |
| ------------------- | ---------------- | -------------- | ---------- |
|              `config_default.php`              | Configuration that is used for all environments, all locations, and for all stores. Usually that's the place to put default data for the whole project. |        `config_default.php`        |      no      |
|       `config_default-[environment].php`      | Configuration that is used for a specific environment but for all stores. Usually, this place is used for global flags—for example, tracking is active on production and staging only. |  `config_default-production.php`   |      no      |
|        `config_default-[storename].php`        | Configuration that contains the default information for each store. |      `config_default_DE.php`       |      no      |
| `config_default-[environment]_[storename].php` | Configuration for a specific environment and a specific store. | `config_default-production_DE.php` |      no      |
|               `config_local.php`               | Configuration that only applies to one location—for example, your laptop or a concrete server. On the server, this file is usually written automatically by provisioning systems like Salt stack or Puppet. This is the right place for confidential information like database login or payment credentials, which must not be committed to the repository. |         `config_local.php`         |     yes      |
|         `config_local_[storename].php`         | Confidential information which only applies for one store goes into here. |       `config_local_DE.php`        |     yes      |

All of these files are merged automatically by Spryker when the application is running. First, the system reads the content of  `config_default.php`; then it reads the content of the current `config_default-[environment].php` file and overrides the values for the specified environment. So, all the entries that are defined more than once are overwritten. To see how it works, have a look at `Spryker\Shared\Config\Config`.

### Constant interfaces

As you can see in the configuration files, the whole configuration is a big array of keys and values. To enable traceability, it's a good practice to use constants as keys. These constants are defined in shared interfaces that are provided by the related module.

```php
<?php

namespace Pyz\Shared\MyBundle;

interface MyBundleConstants
{
    public const ANY_CONSTANT = 'ANY_CONSTANT';
    public const ANOTHER_CONSTANT = 'ANOTHER_CONSTANT';
}
```

Now, you can use the constant inside of the configuration files like this:

```php
<?php // inside of config_default.php

use Pyz\Shared\MyBundle\MyBundleConstants;

$config[MyBundleConstants::ANY_CONSTANT] = 'Foo';
$config[MyBundleConstants::ANOTHER_CONSTANT] = ['Bar', 'Baz'];
```

### Additional configuration files

There are some other configuration files for specific purposes.

| FILENAME | PURPOSE  |
| ----------------- | -------------------- |
| `console_env_local.php` | This file returns the default environment for command line calls. This file is on gitignore. It is optional. If it's missing, you need to explicitly pass the environment to all [command line calls](/docs/dg/dev/backend-development/console-commands/implement-console-commands.html). |
|   `default_store.php`   | This file returns the default store which is used for all [command line calls](/docs/dg/dev/backend-development/console-commands/implement-console-commands.html). |
|      `stores.php`       | This file contains an array with all stores and their configuration like locale, date format, currency. |

## Static method

You can retrieve the configuration from the configuration files with a static method:

```php
<?php
...
	use Spryker\Shared\Config;
...
	$value = Config::get($key);
```

Each module ships with specific classes, which gives access to the configuration. Here you can also add more configuration which needs more programming. For instance, when you need to parse a CSV file to get more configuration, this code would be here. Although you can use the same global mechanism as in Yves to read the documentation, it's a better practice to access it through the module config file. This snippet can be used to create a new module config. Just replace `MyModule` with your current module name.

```php
<?php

namespace Pyz\Zed\MyBundle;

use Pyz\Shared\MyBundle\MyBundleConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class MyModuleConfig extends AbstractBundleConfig
{
    public function getFoo()
    {
        return $this->get(MyBundleConstants::ANY_CONSTANT); // Equivalent to Config::get($MyBundleConstants::ANY_CONSTANT);
    }
}
```

The same is valid for other layers: Client, Yves, Shared, Service.

## Module-shared configuration

From kernel version 3.14, you can create shared configuration classes, which are shared between application layers. That means you can access them in `Yves`, `Zed`, and `Client`. To use it, create a `Config` class in your module `Shared` namespace—for example:

```php
<?php

namespace Spryker\Shared\ModuleName;

use Spryker\Shared\Kernel\AbstractSharedConfig;

class ModuleNameConfig extends AbstractSharedConfig
{
     /**
      * @return string
      */
      public function getConfigurationValue(): string
      {
          return 'value';
      }
}
```

Then, you can use it in your application configuration as follows:

```php
<?php

namespace Spryker\Zed\ModuleName;

use Spryker\Zed\Kernel\AbstractBundleConfig;

/**
 * @method \Spryker\Shared\ModuleName\ModuleNameConfig getSharedConfig()
 */
 class ModuleNameConfig extends AbstractBundleConfig
 {
     /**
      * @return string
      */
     public function getConfigurationValue(): string
     {
         return $this->getSharedConfig()->getConfigurationValue();
     }
 }
 ```

 The same way it can also be included in `Yves`, `Client` configuration classes.

## Related Spryks

You might use the following definitions to generate related code:

* `console spryk:run AddZedConfig`: Adds a new module config to the Zed application.
* `console spryk:run AddZedConfigMethod`: Adds a new method to the Zed module config.
* `console spryk:run AddYvesConfig`: Adds a new module config to the Yves application.
* `console spryk:run AddYvesConfigMethod`: Adds a new method to the Yves module config.
* `console spryk:run AddGlueConfig`: Adds a new module config to the Glue application.
* `console spryk:run AddGlueConfigMethod`: Adds a new method to the Glue module config.
* `console spryk:run AddClientConfig`: Adds a new module config to the Client application.
* `console spryk:run AddClientConfigMethod`: Adds a new method to the Client module config.
* `console spryk:run AddSharedConstantsInterface`: Adds a Shared Constants Interface. For details, see the [Spryk](/docs/dg/dev/sdks/sdk/spryks/spryks.html) documentation
