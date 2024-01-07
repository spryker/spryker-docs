---
title: Default Glue API conventions provided with Spryker
description: This document will describe what convention Spryker provides OOTB
last_updated: December 12, 2023
template: howto-guide-template
---

Spryker provides some of the [conventions](/docs/scos/dev/glue-api-guides/{{page.version}}/conventions/what-is-api-convention.html) OOTB

## Available conventions

### JSON:API

JSON:API is available for usage OOTB in Spryker. In order to use it you need to implement the `Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface` interface in your resource plugin.

```php
<?php

namespace Spryker\Glue\ProductsBackendApi\Plugin\GlueApplication;

use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Generated\Shared\Transfer\ProductsBackendApiAttributesTransfer;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\Backend\AbstractResourcePlugin;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface;
use Spryker\Glue\ProductsBackendApi\Controller\ProductsResourceController;
use Spryker\Glue\ProductsBackendApi\ProductsBackendApiConfig;

class ProductsBackendResourcePlugin extends AbstractResourcePlugin implements JsonApiResourceInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getType(): string
    {
        return ProductsBackendApiConfig::RESOURCE_PRODUCT_ABSTRACT;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getController(): string
    {
        return ProductsResourceController::class;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer
     */
    public function getDeclaredMethods(): GlueResourceMethodCollectionTransfer
    {
        return (new GlueResourceMethodCollectionTransfer())
            ->setGetCollection(
                (new GlueResourceMethodConfigurationTransfer())
                    ->setAttributes(ProductsBackendApiAttributesTransfer::class),
            )
            ->setGet(
                (new GlueResourceMethodConfigurationTransfer())
                    ->setAttributes(ProductsBackendApiAttributesTransfer::class),
            )
            ->setPost(
                (new GlueResourceMethodConfigurationTransfer())
                    ->setAttributes(ProductsBackendApiAttributesTransfer::class),
            )
            ->setPatch(
                (new GlueResourceMethodConfigurationTransfer())
                    ->setAttributes(ProductsBackendApiAttributesTransfer::class),
            );
    }
}

```

If you need to extend it behaviour or add missing functionality you can add additional plugins in `\Pyz\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider`. All provided stacks are using the interfaces from `GlueApplicationExtension` modules and works in the same way as the similar plugins in specific application modules. For example if you want to add additional request validator plugin you can implement `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface` and add it to `\Pyz\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider::getRequestValidatorPlugins()` method. In this case all `JSON:API` related resources will execute this validator on each request.

```php
<?php

namespace Pyz\Glue\GlueJsonApiConvention;

use Spryker\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider as SprykerGlueJsonApiConventionDependencyProvider;
use Spryker\Glue\GlueJsonApiConvention\Plugin\GlueApplication\FilterRequestValidatorPlugin;

class GlueJsonApiConventionDependencyProvider extends SprykerGlueJsonApiConventionDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            new FilterRequestValidatorPlugin(),
        ];
    }
}

```
If you need to override default behaviour instead of adding new on top, you need to override methods with `Internal` prefix. E.g. `getInternalResponseFormatterPlugins` instead. In this case you can change all convention behavior if you need. The example below will disable all OOTB plugins that prepare a request for processing. 

```php
<?php

namespace Pyz\Glue\GlueJsonApiConvention;

use Spryker\Glue\GlueJsonApiConvention\GlueJsonApiConventionDependencyProvider as SprykerGlueJsonApiConventionDependencyProvider;

class GlueJsonApiConventionDependencyProvider extends SprykerGlueJsonApiConventionDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getInternalRequestBuilderPlugins(): array
    {
        return [];
    }

}

```
