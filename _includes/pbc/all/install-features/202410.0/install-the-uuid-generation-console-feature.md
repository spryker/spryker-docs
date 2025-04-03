This document describes how to install the Uuid Generation Console feature.

## Prerequisites

Install the required features:

| FEATURE | VERSION | INSTALLATION GUIDE |
| - | - | - |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |


## 1) Install the required modules

Run the following command to install the required modules:

```bash
composer require spryker/uuid:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY|
| - | - |
| Uuid | vendor/spryker/uuid |


{% endinfo_block %}


## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}


Make sure that the following changes in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| - | - | - | - |
| UuidGeneratorConfigurationTransfer | class | created | src/Generated/Shared/Transfer/UuidGeneratorConfigurationTransfer.php |
| UuidGeneratorReportTransfer | class | created |src/Generated/Shared/Transfer/UuidGeneratorReportTransfer.php |

{% endinfo_block %}


## 3) Set up console command

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| - | - | - | - |
| UuidGeneratorConsole | Provides the `uuid:generate` console command. | None | \Spryker\Zed\Uuid\Communication\Console\UuidGeneratorConsole |

**src/Pyz/Glue/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\CompanyUserStorage\Communication\Plugin\Event\Subscriber\CompanyUserStorageEventSubscriber;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            ...,
            new UuidGeneratorConsole(),
        ];

        return $commands;
    }
}
```

{% info_block warningBox "Verification" %}


To make sure you've set up `UuidGeneratorConsole`, run `console | grep uuid:generate` and check that the command is found.

{% endinfo_block %}
