

This document describes how to install the Glue: Development Tools feature.

## Prerequisites

Install the required features:

| NAME | VERSION |
|-|-|
| Development Tools | {{page.version}} |

## 1) Install the required modules

Install the required modules using Composer:
```bash
composer require "spryker/documentation-generator-rest-api":"^1.12.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| DocumentationGeneratorRestApi | vendor/spryker/documentation-generator-rest-api |

{% endinfo_block %}

## 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| GenerateRestApiDocumentationConsole  | Generates Glue API specification. |   | Spryker\Zed\DocumentationGeneratorRestApi\Communication\Console\ |

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\DocumentationGeneratorRestApi\Communication\Console\GenerateRestApiDocumentationConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        if ($this->getConfig()->isDevelopmentConsoleCommandsEnabled()) {
            $commands[] = new GenerateRestApiDocumentationConsole();
        }

        return $commands;
    }
}
```

{% info_block warningBox "Verification" %}

Verify that it was set up correctly:

```bash
console rest-api:generate:documentation
```

{% endinfo_block %}
