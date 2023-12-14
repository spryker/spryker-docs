---
title: Default conventions
description: This document will describe what convention Spryker provides OOTB
last_updated: December 12, 2023
template: howto-guide-template
---

Spryker provides some of the [conventions](/docs/scos/dev/glue-api-guides/{{page.version}}/conventions/what-is-api-convention.html) OOTB

## Available conventions

### JSON:API

JSON:API is available for usage OOTB in Spryker. In order to use it you need to implement the `Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface` interface in your resource plugin.
If you need to extend it behaviour or add missing functionality you can add additional plugins in `\Pyz\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider`. All provided stacks are using the interfaces from `GlueApplicationExtension` modules and works in the same way as the similar plugins in specific application modules.
Be advised that those plugin stacks are additional stacks and overriding those methods will not disable existing behaviours. If you need to override default behaviour instead, you need to override methods with `Internal` prefix. E.g. `getInternalResponseFormatterPlugins` instead.

```php
<?php

namespace Pyz\Glue\GlueJsonApiConvention;

use Spryker\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider as SprykerGlueJsonApiConventionDependencyProvider;

class GlueJsonApiConventionDependencyProvider extends SprykerGlueJsonApiConventionDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestAfterRoutingValidatorPluginInterface>
     */
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    protected function getResponseFormatterPlugins(): array
    {
        return [];
    }

    /**
     * @return array<\Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\RelationshipProviderPluginInterface>
     */
    public function getRelationshipProviderPlugins(): array
    {
        return [];
    }

}

```
