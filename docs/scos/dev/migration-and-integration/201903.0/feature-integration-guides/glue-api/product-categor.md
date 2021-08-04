---
title: Product Category Relationship Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/product-category-relationship-feature-integration
redirect_from:
  - /v2/docs/product-category-relationship-feature-integration
  - /v2/docs/en/product-category-relationship-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:


| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Product Management | 2018.12.0 |
| Category | 2018.12.0 |
| ProductCategory | 2018.12.0 |
| CategoriesRestApi | 1.1.2 |
| ProductsRestApi | 2.2.3 |

## 1) Install the required modules

Run the following command to install the required modules:
`composer require spryker/products-categories-resource-relationship:"^1.0.0" --update-with-dependencies`

{% info_block infoBox "Veriication" %}
Make sure that the following module is installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `ProductsCategoriesResourceRelationship` | `vendor/spryker/products-categories-resource-relationship` |

## 2) Set up behavior
### Enable relationship
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductsCategoriesResourceRelationshipPlugin` | Adds the categories resource as a relationship to an abstract product  | None | `Spryker\Glue\ProductsCategoriesResourceRelationship\Plugin` |

**`src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`**
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductsCategoriesResourceRelationship\Plugin\AbstractProductsCategoriesResourceRelationshipPlugin;
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
            new AbstractProductsCategoriesResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

{% info_block infoBox "Verification" %}
Make a request to `http://example.org/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=category-nodes.`
{% endinfo_block %}
<details open>
<summary>Request Example</summary>

```yaml
{  
   "data":{  
      "type":"abstract-products",
      "id":"001",
      "attributes":{  
         ...
      },
      "links":{  
         "self":"http://example.org/abstract-products/001"
      },
      "relationships":{  
         "category-nodes":{  
            "data":[  
               {  
                  "type":"category-nodes",
                  "id":"4"
               },
               {  
                  "type":"category-nodes",
                  "id":"2"
               }
            ]
         }
      }
   },
   "included":[  
      {  
         "type":"category-nodes",
         "id":"4",
         "attributes":{  
            ...
         },
         "links":{  
            "self":"http://example.org/category-nodes/4"
         }
      },
      {  
         "type":"category-nodes",
         "id":"2",
         "attributes":{  
            ...
         },
         "links":{  
            "self":"http://example.org/category-nodes/2"
         }
      }
   ]
}
```
</br>
</details>

*Last review date: Feb 22, 2019*
