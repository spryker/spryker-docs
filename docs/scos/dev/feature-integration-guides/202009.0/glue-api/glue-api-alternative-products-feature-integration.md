---
title: Glue API - Alternative products feature integration
description: This guide will navigate you through the process of installing and configuring the Alternative Products API feature in Spryker OS.
last_updated: Aug 27, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/glue-api-alternative-products-feature-integration
originalArticleId: bd5fb4f2-bdc0-43c5-bba0-2648b234fc1c
redirect_from:
  - /v6/docs/glue-api-alternative-products-feature-integration
  - /v6/docs/en/glue-api-alternative-products-feature-integration
related:
  - title: Retrieving Alternative Products
    link: docs/scos/dev/glue-api-guides/page.version/managing-products/retrieving-alternative-products.html
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required Sub-Feature |
| --- | --- | --- |
| Spryker Core | 202009.0 | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Alternative Products | 201907.0 | |
| Products | 202009.0 | [Product API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html) |

## 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/alternative-products-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following module is installed:

| Module | Expected Directory |
| --- | --- |
| `AlternativeProductsRestApi` | `vendor/spryker/alternative-products-rest-api` |

{% endinfo_block %}

## 2) Set up Behavior

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractAlternativeProductsResourceRoutePlugin` | Registers the abstract alternative products resource. | None | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication` |
| `ConcreteAlternativeProductsResourceRoutePlugin` | Registers the concrete alternative products resource. | None | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication` |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

{% info_block warningBox “Verification” %}

Make sure that the following endpoints are available:

* `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/abstract-alternative-products`
* `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/abstract-alternative-products`

{% endinfo_block %}
