---
title: Glue API - Alternative products feature integration
description: This guide will navigate you through the process of installing and configuring the Alternative Products API feature in Spryker OS.
last_updated: Jan 21, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/alternative-products-api-feature-integration-201907
originalArticleId: 2e07a869-a881-4bec-82d9-beb5c555c177
redirect_from:
  - /v3/docs/alternative-products-api-feature-integration-201907
  - /v3/docs/en/alternative-products-api-feature-integration-201907
related:
  - title: Retrieving Alternative Products
    link: docs/scos/dev/glue-api-guides/page.version/managing-products/retrieving-alternative-products.html
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required Sub-Feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Alternative Products | 201907.0 | |
| Products | 201907.0 | [Product API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/products-feature-integration.html) |

## 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/alternative-products-rest-api:"^1.0.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following module is installed:

| Module | Expected Directory |
| --- | --- |
| `AlternativeProductsRestApi` | `vendor/spryker/alternative-products-rest-api` |
</div></section>

## 2) Set up Behavior

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractAlternativeProductsResourceRoutePlugin` | Registers the abstract alternative products resource. | None | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication` |
| `ConcreteAlternativeProductsResourceRoutePlugin` | Registers the concrete alternative products resource. | None | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication` |

<details open> <summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication\AbstractAlternativeProductsResourceRoutePlugin;
use Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication\ConcreteAlternativeProductsResourceRoutePlugin

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractAlternativeProductsResourceRoutePlugin(),
            new ConcreteAlternativeProductsResourceRoutePlugin(),
        ];
    }
}
```

<br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">
Make sure that the following endpoints are available:

* `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/abstract-alternative-products`
* `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/abstract-alternative-products`

</div></section>
