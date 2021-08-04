---
title: Glue API- Development Tools feature integration
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-development-tools-feature-integration
redirect_from:
  - /2021080/docs/glue-api-development-tools-feature-integration
  - /2021080/docs/en/glue-api-development-tools-feature-integration
---

This document describes how to integrate the Glue: Development Tools feature into a Spryker project.

## Prerequisites
To start feature integration, integrate the required features:

| NAME | VERSION |
|-|-|
| Development Tools | 202009.0 |

## 1) Install the required modules using Composer
Install the required modules:
```bash
composer require "spryker/documentation-generator-rest-api":"^1.12.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

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
