---
title: Product API Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/product-api-feature-integration
redirect_from:
  - /v2/docs/product-api-feature-integration
  - /v2/docs/en/product-api-feature-integration
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Product Management | 2018.12.0 |

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:

```yaml
composer require spryker/products-rest-api:"^2.2.3" --update-with-dependencies
```
{% info_block infoBox "Verification" %}
Make sure that the following module is installed:
{% endinfo_block %}
|Module|Expected directory|
| --- | --- |
|`ProductsRestApi`|`vendor/spryker/products-rest-api`|
### 2) Set up Database Schema and Transfer objects
Run the following commands to apply database changes and generate entity and transfer changes:
```yaml
console transfer:generate
console propel:install
console transfer:generate 
```
**Verification**
{% info_block infoBox %}
Make sure that the following modules are installed:
{% endinfo_block %}
|Transfer|Type|Event|Path|
| --- | ---| --- | ---| 
|`ConcreteProductsRestAttributesTransfer`|class |created|`src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer`|`AbstractProductsRestAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer`|
         
{% info_block infoBox %}
Make sure that `SpyProductAbstractStorage` and `SpyProductConcreteStorage` are extended by synchronization behavior with these methods:
{% endinfo_block %}
 |Entity|Type|Event|Path|Methods|
 | --- | --- | --- | --- | --- |
|`SpyProductAbstractStorage`|class|extended|`src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductAbstractStorage`|`syncPublishedMessageForMappings(),syncUnpublishedMessageForMappings()`|`SpyProductConcreteStorage`|class|extended|`src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage`|`syncPublishedMessageForMappings(),syncUnpublishedMessageForMappings()`|
### 3) Set up behavior
#### Reload data to storage
Run the following commands to reload abstract and product data to storage.
```shell
console event:trigger -r product_abstract
console event:trigger -r product_concrete 
```

{% info_block infoBox "Verification" %}
Make sure that there are data in Redis with these keys:
{% endinfo_block %}
* `kv:product_abstract:{% raw %}{{{% endraw %}store_name{% raw %}}}{% endraw %}:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_abstract{% raw %}}}{% endraw %}`
* `kv:product_concrete:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_concrete{% raw %}}}{% endraw %}`

#### Enable resources
Activate the following plugin:
|Plugin|Specification|Prerequisites|Namespace|
 | --- | --- | --- | --- |
|`AbstractProductsResourceRoutePlugin`|Registers an abstract product resource.|None|`Spryker\Glue\ProductsRestApi\Plugin`|`ConcreteProductsResourceRoutePlugin`|Registers an concrete product resource.| None| `Spryker\Glue\ProductsRestApi\Plugin`|

<details open>   
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
 
```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductsRestApi\Plugin\AbstractProductsResourceRoutePlugin;
use Spryker\Glue\ProductsRestApi\Plugin\ConcreteProductsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductsResourceRoutePlugin(),
            new ConcreteProductsResourceRoutePlugin(),
        ];
    }
} 
```

</details>

*`http://example.org/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}`
*`http://example.org/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}`

*Last review date: Feb 19, 2019* 
