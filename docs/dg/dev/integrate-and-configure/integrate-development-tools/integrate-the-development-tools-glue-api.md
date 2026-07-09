---
title: Integrate the Development Tools Glue API
description: This guide explains how to integrate the Glue- Development Tools feature into a Spryker project.
last_updated: Jun 18, 2021
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrate-the-development-tools-glue-api.html
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/glue-api-development-tools-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/glue-api-development-tools-feature-integration.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}



This document describes how to install the Glue: Development Tools feature.

## Prerequisites

Install the required features:

| NAME | VERSION |
|-|-|
| Development Tools | {{site.version}} |

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
