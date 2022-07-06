---
title: Glue API - Alternative products feature integration
description: This guide will navigate you through the process of installing and configuring the Alternative Products API feature in the Spryker OS.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-alternative-products-feature-integration
originalArticleId: 0cac6f60-0429-4b7e-8ff4-9236b8cc51d0
redirect_from:
  - /2021080/docs/glue-api-alternative-products-feature-integration
  - /2021080/docs/en/glue-api-alternative-products-feature-integration
  - /docs/glue-api-alternative-products-feature-integration
  - /docs/en/glue-api-alternative-products-feature-integration
related:
  - title: Retrieving Alternative Products
    link: docs/scos/dev/glue-api-guides/page.version/managing-products/retrieving-alternative-products.html
---

## Install Feature API

### Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION | REQUIRED SUB-FEATURE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Alternative Products | {{page.version}} | |
| Products | {{page.version}} | [Product API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html) |

## 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/alternative-products-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following module is installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| AlternativeProductsRestApi | vendor/spryker/alternative-products-rest-api |

{% endinfo_block %}


## 2) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractAlternativeProductsResourceRoutePlugin | Registers the abstract alternative products resource. | None | Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication |
| ConcreteAlternativeProductsResourceRoutePlugin | Registers the concrete alternative products resource. | None | Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication |

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
