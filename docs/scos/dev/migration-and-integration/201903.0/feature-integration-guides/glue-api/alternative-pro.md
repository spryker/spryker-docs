---
title: Alternative Products API Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/alternative-products-api-feature-integration-201903
redirect_from:
  - /v2/docs/alternative-products-api-feature-integration-201903
  - /v2/docs/en/alternative-products-api-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required Sub-Feature |
| --- | --- | --- |
| Spryker Core | 201903.0 | [Glue Application Feature Integration](https://documentation.spryker.com/v2/docs/glue-application-feature-integration-201903) |
| Alternative Products | 201903.0 | |
| Products | 201903.0 | [Product API Feature Integration](https://documentation.spryker.com/v2/docs/product-api-feature-integration-201903) |

## 1) Install the Required Modules Using Composer

Run the following command to install the required modules:

```bash
composer require spryker/products-rest-api:"^2.2.3" spryker/product-image-sets-rest-api:"^1.0.3" --update-with-dependencies
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

<details open> <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

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

</br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following endpoints are available:

* `http://example.org/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/abstract-alternative-products`
* `http://example.org/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/abstract-alternative-products`
</div></section>

**See also:**
[Retrieving Alternative Products](/docs/scos/dev/glue-api/201903.0/glue-api-storefront-guides/managing-products/retrieving-alte)
 
*Last review date: Apr 10, 2019*

<!--by Volodymyr Volkov and Dmitry Beirak-->
