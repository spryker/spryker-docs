---
title: Configuration Management
originalLink: https://documentation.spryker.com/v1/docs/configuration-management
redirect_from:
  - /v1/docs/configuration-management
  - /v1/docs/en/configuration-management
---

## Default and Local Configuration Files
Under `config/Shared` you’ll find several files that are used for the system’s configuration, that can be used by both Yves and Zed.

The files are merged in a fixed order if they exist. So the entries of `config_default.php` are overwritten by the entries in `config_default-[environment].php` etc.

These configuration files are used for global configuration, like database credentials, URLs or the search engine ports. For settings that are used inside a specific module, use the module configuration instead.

There are several files that allow you to add the needed configuration for the exact use-case you want.

|                   Filename                   |                           Purpose                            |        Example file name         | on gitignore |
| :------------------------------------------: | :----------------------------------------------------------: | :------------------------------: | :----------: |
|              `config_default.php`              | Configuration that is used for all environments, all locations and for all stores. Usually that’s the place to put default data for the whole project. |        `config_default.php`        |      no      |
|       `config_default-[environment].php`      | Configuration that is used for a specific environment but for all stores. Usually this place is used for global flags, for example, tracking is active on production and staging only. |  `config_default-production.php`   |      no      |
|        `config_default-[storename].php`        | Configuration that contains the default information for each store. |      `config_default_DE.php`       |      no      |
| `config_default-[environment]_[storename].php` | Configuration for a specific environment and a specific store. | `config_default-production_DE.php` |      no      |
|               `config_local.php`               | Configuration that only applies to one location (for example, your laptop or a concrete server). On the server this file is usually written automatically by provisioning system like Saltstack or Puppet. This is the right place for confidential information like database login or payment credentials which must not be committed to the repository. |         `config_local.php`         |     yes      |
|         `config_local_[storename].php`         | Confidential information which only applies for one store goes into here. |       `config_local_DE.php`        |     yes      |

These configuration files are merged on the fly in a fixed order. First, the system reads the content of the `config_default.php`, then it reads the content of the current `config_default-[environment].php` file and so on. All entries which are defined more than once are overwritten. You can have a look into `Spryker\Shared\Library\Config` to see exactly how it works.

## Constant Interfaces
As you can see in the configuration files, the whole configuration is a big array with keys and values. To enable traceability (which entry is used where?), it is a good practice to use constants as keys. These constants are defined in shared interfaces which are provided by the related module.

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

### Additional Configuration Files
There are some other configuration files for specific purposes.

|       Filename        |                           Purpose                            |
| :-------------------: | :----------------------------------------------------------: |
| `console_env_local.php` | This file returns the default environment for command line calls. This file is on gitignore. It is optional. If it is missing you need to explicitly pass the environment to all [command line calls](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/data-manipulation/data-enrichment/console-commands/console-command). |
|   `default_store.php`   | This file returns the default store which is used for all [command line calls](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/data-manipulation/data-enrichment/console-commands/console-command). |
|      `stores.php`       | This file contains an array with all stores and their configuration like locale, date format, currency, etc. |

## How to Retrieve the Configuration
**Static Method**
You can retrieve the configuration from the configuration files with a static method:

```php
<?php
...
	use Spryker\Shared\Config;
...
	$value = Config::get($key);
```

Each module ships with special classes which gives access to the configuration. Here you can also add more configuration which needs more programming. For instance, when you need to parse a CSV file to get more configuration, this code would be here. Although you can use the same global mechanism like in Yves to read the documentation, it is a better practice to access it through the module config file. This snippet can be used to create a new module config. Just replace `MyModule` with your current module name.

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

**Module Shared Configuration**
From kernel version 3.14, it is possible to create shared configuration classes, which are shared between application layers. That means you can access them in Yves, Zed, Client. To use it, create a `Config` class in your module Shared namespace, for example:

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
 
 The same way it can also be included to Yves, Client configuration classes.
 
 ## Related Spryks
You might use the following definitions to generate related code:

* `console spryk:run AddZedConfig`
    * Adds a new module config to the Zed application

* `console spryk:run AddZedConfigMethod`
    * Adds a new method to the Zed module config

* `console spryk:run AddYvesConfig`
    * Adds a new module config to the Yves application

* `console spryk:run AddYvesConfigMethod`
    * Adds a new method to the Yves module config

* `console spryk:run AddGlueConfig`
    * Adds a new module config to the Glue application

* `console spryk:run AddGlueConfigMethod`
    * Adds a new method to the Glue module config

* `console spryk:run AddClientConfig`
    * Adds a new module config to the Client application

* `console spryk:run AddClientConfigMethod`
    * Adds a new method to the Client module config

* `console spryk:run AddSharedConstantsInterface`
    * Adds a Shared Constants Interface
See the [Spryk](https://documentation.spryker.com/v1/docs/spryk-201903) documentation for details.
