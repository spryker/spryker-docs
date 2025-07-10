

This document describes how to install the [Product Raiting and Reviews](/docs/pbc/all/ratings-reviews/latest/ratings-and-reviews.html) Glue API feature.

## Install feature core

Follow the steps below to install the Product Raiting and Review Glue API feature core.


### Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core Glue API | 202507.0 | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Product Rating & Reviews  | 202507.0 | [Install the Product Rating and Reviews feature](/docs/pbc/all/ratings-reviews/latest/install-and-upgrade/install-the-product-rating-and-reviews-feature.html) |

### 1) Install the required modules

```bash
composer require spryker/product-reviews-rest-api:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductReviewsRestApi | vendor/spryker/product-reviews-rest-api |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the transfer objects:

| TRANSFER                               | TYPE | EVENT | PATH                                                                 |
|----------------------------------------| --- | --- |----------------------------------------------------------------------|
| RestProductReviewsAttributesTransfer   | class | created | src/Generated/Shared/Transfer/RestProductReviewsAttributesTransfer   |
| BulkProductReviewSearchRequestTransfer | class | created | src/Generated/Shared/Transfer/BulkProductReviewSearchRequestTransfer |
| StoreTransfer                          | class | created | src/Generated/Shared/Transfer/StoreTransfer                          |


Make sure that `SpyProductAbstractStorage` and `SpyProductConcreteStorage` are extended by synchronization behavior with these methods:

| ENTITY | TYPE | EVENT | PATH | METHODS |
| --- | --- | --- | --- | --- |
| SpyProductAbstractStorage | class | extended |src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductAbstractStorage | syncPublishedMessageForMappings(), syncUnpublishedMessageForMappings() |
| SpyProductConcreteStorage | class | extended | src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage | syncPublishedMessageForMappings(), yncUnpublishedMessageForMappings() |

{% endinfo_block %}

### 3) Reload data to storage

Reload abstract and product data to storage.

```bash
console event:trigger -r product_abstract
console event:trigger -r product_concrete
```

{% info_block warningBox "Verification" %}

Make sure that there is data in key-value store (Redis or Valkey) with keys:

- `kv:product_abstract:{% raw %}{{{% endraw %}store_name{% raw %}}}{% endraw %}:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_abstract{% raw %}}}{% endraw %}`
- `kv:product_concrete:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_concrete{% raw %}}}{% endraw %}`

{% endinfo_block %}

### 4) Enable resources

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractProductsProductReviewsResourceRoutePlugin | Registers the product-reviews resource. | None | Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use \Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\AbstractProductsProductReviewsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductsProductReviewsResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:
- `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/product-reviews`

<details>
<summary>Example</summary>

```json
{
    "data": [
        {
            "type": "product-reviews",
            "id": "21",
            "attributes": {
                "rating": 4,
                "nickname": "Spencor",
                "summary": "Donec vestibulum lectus ligula",
                "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews/21"
            }
        },
        {
            "type": "product-reviews",
            "id": "22",
            "attributes": {
                "rating": 4,
                "nickname": "Maria",
                "summary": "Curabitur varius, dui ac vulputate ullamcorper",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews/22"
            }
        },
        {
            "type": "product-reviews",
            "id": "23",
            "attributes": {
                "rating": 4,
                "nickname": "Maggie",
                "summary": "Aliquam erat volutpat",
                "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews/23"
            }
        },
        {
            "type": "product-reviews",
            "id": "25",
            "attributes": {
                "rating": 3,
                "nickname": "Spencor",
                "summary": "Curabitur ultricies, sapien quis placerat lacinia",
                "description": "Etiam venenatis sit amet lorem eget tristique. Donec rutrum massa nec commodo cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse scelerisque scelerisque augue eget condimentum. Quisque quis arcu consequat, lacinia nulla tempor, venenatis ante. In ullamcorper, orci sit amet tempus tincidunt, massa augue molestie enim, in finibus metus odio at purus. Mauris ut semper sem, a ornare sapien. Fusce eget facilisis felis. Integer imperdiet massa a tortor varius, tincidunt laoreet ipsum viverra."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews/25"
            }
        },
        {
            "type": "product-reviews",
            "id": "26",
            "attributes": {
                "rating": 5,
                "nickname": "Spencor",
                "summary": "Cras porttitor",
                "description": "Cras porttitor, odio vel ultricies commodo, erat turpis pulvinar turpis, id faucibus dolor odio a tellus. Mauris et nibh tempus, convallis ipsum luctus, mollis risus. Donec molestie orci ante, id tristique diam interdum eget. Praesent erat neque, sollicitudin sit amet pellentesque eget, gravida in lectus. Donec ultrices, nisl in laoreet ultrices, nunc enim lacinia felis, ac convallis tortor ligula non eros. Morbi semper ipsum non elit mollis, non commodo arcu porta. Mauris tincidunt purus rutrum erat ornare, varius egestas eros eleifend."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews/26"
            }
        }
    ],
    "links": {
        "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews?page[offset]=0&page[limit]=5",
        "last": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews?page[offset]=0&page[limit]=5",
        "first": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews?page[offset]=0&page[limit]=5"
    }
}
```

</details>

- `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/product-reviews/{% raw %}{{{% endraw %}review_id{% raw %}}}{% endraw %}`

<details>
<summary>Example</summary>

```json
{
    "data": {
        "type": "product-reviews",
        "id": "21",
        "attributes": {
            "rating": 4,
            "nickname": "Spencor",
            "summary": "Donec vestibulum lectus ligula",
            "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
        },
        "links": {
            "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews/21"
        }
    }
}
```

</details>

{% endinfo_block %}

### 5) Enable relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductReviewsRelationshipByProductAbstractSkuPlugin | Adds product-reviews relationship by abstract product sku. | None |\Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication |
| ProductReviewsRelationshipByProductConcreteSkuPlugin | Adds product-reviews relationship by concrete product sku. | None | \Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication |
| ProductReviewsAbstractProductsResourceExpanderPlugin | Expands abstract-products resource with reviews data. | None | Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi |
| ProductReviewsConcreteProductsResourceExpanderPlugin | Expands concrete-products resource with reviews data. | None | Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\ProductReviewsRelationshipByProductAbstractSkuPlugin;
use Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\ProductReviewsRelationshipByProductConcreteSkuPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
   /**
    * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    *
    * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
    */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new ProductReviewsRelationshipByProductAbstractSkuPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ProductReviewsRelationshipByProductConcreteSkuPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

**src/Pyz/Glue/ProductsRestApi/ProductsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi;

use Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi\ProductReviewsAbstractProductsResourceExpanderPlugin;
use Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi\ProductReviewsConcreteProductsResourceExpanderPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiDependencyProvider as SprykerProductsRestApiDependencyProvider;

class ProductsRestApiDependencyProvider extends SprykerProductsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\ConcreteProductsResourceExpanderPluginInterface[]
     */
    protected function getConcreteProductsResourceExpanderPlugins(): array
    {
        return [
            new ProductReviewsConcreteProductsResourceExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\AbstractProductsResourceExpanderPluginInterface[]
     */
    protected function getAbstractProductsResourceExpanderPlugins(): array
    {
        return [
            new ProductReviewsAbstractProductsResourceExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Make a request to `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=product-reviews`.

2. Make sure that the response contains `product-reviews` as a relationship and `product-reviews` data included.

3. Make sure that `averageRating` and `reviewCount` attributes are present in concrete-products and abstract-products resources attributes section.

<details>
<summary>Example</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "139",
        "attributes": {
            "sku": "139",
            "averageRating": 4,
            "reviewCount": 5,
            "name": "Asus Transformer Book T200TA",
            "description": "As light as you like Transformer Book T200 is sleek, slim and oh so light—just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach the 11.6-inch tablet for 11.95mm slenderness and a mere 750g weight! With up to 10.4 hours of battery life that lasts all day long, you're free to work or play from dawn to dusk. And ASUS Instant On technology ensures that Transformer Book T200 is always responsive and ready for action! Experience outstanding performance from the latest Intel® quad-core processor. You'll multitask seamlessly and get more done in less time. Transformer Book T200 also delivers exceptional graphics performance—with Intel HD graphics that are up to 30% faster than ever before! Transformer Book T200 is equipped with USB 3.0 connectivity for data transfers that never leave you waiting. Just attach your USB 3.0 devices to enjoy speeds that are up to 10X faster than USB 2.0!",
            "attributes": {
                "product_type": "Hybrid (2-in-1)",
                "form_factor": "clamshell",
                "processor_cache_type": "2",
                "processor_frequency": "1.59 GHz",
                "brand": "Asus",
                "color": "Black"
            },
            "superAttributesDefinition": [
                "form_factor",
                "processor_frequency",
                "color"
            ],
            "superAttributes": [],
            "attributeMap": {
                "product_concrete_ids": [
                    "139_24699831"
                ],
                "super_attributes": [],
                "attribute_variants": []
            },
            "metaTitle": "Asus Transformer Book T200TA",
            "metaKeywords": "Asus,Entertainment Electronics",
            "metaDescription": "As light as you like Transformer Book T200 is sleek, slim and oh so light—just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach t",
            "attributeNames": {
                "product_type": "Product type",
                "form_factor": "Form factor",
                "processor_cache_type": "Processor cache",
                "processor_frequency": "Processor frequency",
                "brand": "Brand",
                "color": "Color"
            },
            "url": "/en/asus-transformer-book-t200ta-139"
        },
        "links": {
            "self": "http://glue.de.suite-nonsplit.local/abstract-products/139?include=product-reviews"
        },
        "relationships": {
            "product-reviews": {
                "data": [
                    {
                        "type": "product-reviews",
                        "id": "21"
                    },
                    {
                        "type": "product-reviews",
                        "id": "22"
                    },
                    {
                        "type": "product-reviews",
                        "id": "23"
                    },
                    {
                        "type": "product-reviews",
                        "id": "25"
                    },
                    {
                        "type": "product-reviews",
                        "id": "26"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-reviews",
            "id": "21",
            "attributes": {
                "rating": 4,
                "nickname": "Spencor",
                "summary": "Donec vestibulum lectus ligula",
                "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/21"
            }
        },
        {
            "type": "product-reviews",
            "id": "22",
            "attributes": {
                "rating": 4,
                "nickname": "Maria",
                "summary": "Curabitur varius, dui ac vulputate ullamcorper",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/22"
            }
        },
        {
            "type": "product-reviews",
            "id": "23",
            "attributes": {
                "rating": 4,
                "nickname": "Maggie",
                "summary": "Aliquam erat volutpat",
                "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/23"
            }
        },
        {
            "type": "product-reviews",
            "id": "25",
            "attributes": {
                "rating": 3,
                "nickname": "Spencor",
                "summary": "Curabitur ultricies, sapien quis placerat lacinia",
                "description": "Etiam venenatis sit amet lorem eget tristique. Donec rutrum massa nec commodo cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse scelerisque scelerisque augue eget condimentum. Quisque quis arcu consequat, lacinia nulla tempor, venenatis ante. In ullamcorper, orci sit amet tempus tincidunt, massa augue molestie enim, in finibus metus odio at purus. Mauris ut semper sem, a ornare sapien. Fusce eget facilisis felis. Integer imperdiet massa a tortor varius, tincidunt laoreet ipsum viverra."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/25"
            }
        },
        {
            "type": "product-reviews",
            "id": "26",
            "attributes": {
                "rating": 5,
                "nickname": "Spencor",
                "summary": "Cras porttitor",
                "description": "Cras porttitor, odio vel ultricies commodo, erat turpis pulvinar turpis, id faucibus dolor odio a tellus. Mauris et nibh tempus, convallis ipsum luctus, mollis risus. Donec molestie orci ante, id tristique diam interdum eget. Praesent erat neque, sollicitudin sit amet pellentesque eget, gravida in lectus. Donec ultrices, nisl in laoreet ultrices, nunc enim lacinia felis, ac convallis tortor ligula non eros. Morbi semper ipsum non elit mollis, non commodo arcu porta. Mauris tincidunt purus rutrum erat ornare, varius egestas eros eleifend."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/26"
            }
        }
    ]
}
```

</details>


4. Make a request to `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=product-reviews`.

5. Make sure that the response contains `product-reviews` as a relationship and `product-reviews` data included.

<details>
<summary>Example</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "139_24699831",
        "attributes": {
            "sku": "139_24699831",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": 4,
            "reviewCount": 5,
            "name": "Asus Transformer Book T200TA",
            "description": "As light as you like Transformer Book T200 is sleek, slim and oh so light—just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach the 11.6-inch tablet for 11.95mm slenderness and a mere 750g weight! With up to 10.4 hours of battery life that lasts all day long, you're free to work or play from dawn to dusk. And ASUS Instant On technology ensures that Transformer Book T200 is always responsive and ready for action! Experience outstanding performance from the latest Intel® quad-core processor. You'll multitask seamlessly and get more done in less time. Transformer Book T200 also delivers exceptional graphics performance—with Intel HD graphics that are up to 30% faster than ever before! Transformer Book T200 is equipped with USB 3.0 connectivity for data transfers that never leave you waiting. Just attach your USB 3.0 devices to enjoy speeds that are up to 10X faster than USB 2.0!",
            "attributes": {
                "product_type": "Hybrid (2-in-1)",
                "form_factor": "clamshell",
                "processor_cache_type": "2",
                "processor_frequency": "1.59 GHz",
                "brand": "Asus",
                "color": "Black"
            },
            "superAttributesDefinition": [
                "form_factor",
                "processor_frequency",
                "color"
            ],
            "metaTitle": "Asus Transformer Book T200TA",
            "metaKeywords": "Asus,Entertainment Electronics",
            "metaDescription": "As light as you like Transformer Book T200 is sleek, slim and oh so light—just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach t",
            "attributeNames": {
                "product_type": "Product type",
                "form_factor": "Form factor",
                "processor_cache_type": "Processor cache",
                "processor_frequency": "Processor frequency",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "http://glue.de.suite-nonsplit.local/concrete-products/139_24699831?include=product-reviews"
        },
        "relationships": {
            "product-reviews": {
                "data": [
                    {
                        "type": "product-reviews",
                        "id": "21"
                    },
                    {
                        "type": "product-reviews",
                        "id": "22"
                    },
                    {
                        "type": "product-reviews",
                        "id": "23"
                    },
                    {
                        "type": "product-reviews",
                        "id": "25"
                    },
                    {
                        "type": "product-reviews",
                        "id": "26"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-reviews",
            "id": "21",
            "attributes": {
                "rating": 4,
                "nickname": "Spencor",
                "summary": "Donec vestibulum lectus ligula",
                "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/21"
            }
        },
        {
            "type": "product-reviews",
            "id": "22",
            "attributes": {
                "rating": 4,
                "nickname": "Maria",
                "summary": "Curabitur varius, dui ac vulputate ullamcorper",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/22"
            }
        },
        {
            "type": "product-reviews",
            "id": "23",
            "attributes": {
                "rating": 4,
                "nickname": "Maggie",
                "summary": "Aliquam erat volutpat",
                "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/23"
            }
        },
        {
            "type": "product-reviews",
            "id": "25",
            "attributes": {
                "rating": 3,
                "nickname": "Spencor",
                "summary": "Curabitur ultricies, sapien quis placerat lacinia",
                "description": "Etiam venenatis sit amet lorem eget tristique. Donec rutrum massa nec commodo cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse scelerisque scelerisque augue eget condimentum. Quisque quis arcu consequat, lacinia nulla tempor, venenatis ante. In ullamcorper, orci sit amet tempus tincidunt, massa augue molestie enim, in finibus metus odio at purus. Mauris ut semper sem, a ornare sapien. Fusce eget facilisis felis. Integer imperdiet massa a tortor varius, tincidunt laoreet ipsum viverra."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/25"
            }
        },
        {
            "type": "product-reviews",
            "id": "26",
            "attributes": {
                "rating": 5,
                "nickname": "Spencor",
                "summary": "Cras porttitor",
                "description": "Cras porttitor, odio vel ultricies commodo, erat turpis pulvinar turpis, id faucibus dolor odio a tellus. Mauris et nibh tempus, convallis ipsum luctus, mollis risus. Donec molestie orci ante, id tristique diam interdum eget. Praesent erat neque, sollicitudin sit amet pellentesque eget, gravida in lectus. Donec ultrices, nisl in laoreet ultrices, nunc enim lacinia felis, ac convallis tortor ligula non eros. Morbi semper ipsum non elit mollis, non commodo arcu porta. Mauris tincidunt purus rutrum erat ornare, varius egestas eros eleifend."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/26"
            }
        }
    ]
}
```

</details>

{% endinfo_block %}
