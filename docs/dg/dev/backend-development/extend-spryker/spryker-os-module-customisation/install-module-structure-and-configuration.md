---
title: Install module structure and configuration
description: Starting from version 1.0.0 the Install package has become a regular Spryker module that can be extended on the project level
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/install-module-structure-and-configuration
originalArticleId: b3785d03-b408-47db-bf84-5c89dfdcbd11
redirect_from:
  - /docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/install-module-structure-and-configuration.html
  - /docs/scos/dev/set-up-spryker-locally/install-module-structure-and-configuration.html
related:
  - title: Manage dependencies with Composer
    link: docs/scos/dev/set-up-spryker-locally/manage-dependencies-with-composer.html
  - title: Redis configuration
    link: docs/scos/dev/set-up-spryker-locally/redis-configuration.html
---

Starting from [version 1.0.0 the Install package](https://github.com/spryker/install/releases/tag/1.0.0) has become a regular Spryker module, not a standalone tool as it used to be before version 1.0.0. This means that the Install module can be extended on the project level in the same way as any other module.

## Install module structure

The [Install module](https://github.com/spryker/install) has some layers that are available in a regular core module: *Business* and *Communication*. It also includes the `InstallConfig` class.

### Business layer

All of the models of the Install module reside in the *Business* layer. The Business layer facade consists of one method:

```php
  /**
  * @param \Symfony\Component\Console\Input\InputInterface $input
  * @param \Symfony\Component\Console\Output\OutputInterface $output
  *
  * @return void
  */
public function runInstall(InputInterface $input, OutputInterface $output): void;
```

This method starts the installation process and expects Symfony’s console `input` and `output` objects as its arguments.

### Communication layer

The *Communication* layer consists of just one console command - `InstallConsole`. The only thing it does is making the Business layer facade start the installation process. This command is triggered by the *install* script.

### Configuration

The fully extensible `\Spryker\Zed\Install\InstallConfig` class exposes two methods:

1. `::getEnvironment()`: for resolving the environment in which the installation is being run. Override this method with caution and only when needed.
2. `::getLogFilePath()`: for defining the path to the installation log file.

## Running the install script

Installation is triggered by the *install* script. As before version 1.0.0 of the Install module, the *install* script accepts one argument - the name of the store, however, in version 1.0.0, you can override some environment variables while running the script. These variables include: `APPLICATION_ENV`, `APPLICATION_CODE_BUCKET`, `APPLICATION_ROOT_DIR`, `APPLICATION_SOURCE_DIR`, `APPLICATION_VENDOR_DIR`, `APPLICATION_STATIC_DIR`. For example, to override `APPLICATION_ROOT_DIR`, one needs to run the *install* script like this:

```bash
APPLICATION_ROOT_DIR=./some_directory vendor/bin/install
```

## Extension

All the code in the Install module can be extended as usual. You can override the facade, business factory, module configuration class and develop your own implementations for all the interfaces provided by this module.

There is one restriction related to extending the code of this module - you cannot use transfers for obvious reasons: transfers are generated **during** the installation process and are not available at its early stages.
