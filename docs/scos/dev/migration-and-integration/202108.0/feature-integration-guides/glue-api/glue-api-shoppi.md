---
title: Glue API- Shopping lists feature integration
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-shopping-lists-feature-integration
redirect_from:
  - /2021080/docs/glue-api-shopping-lists-feature-integration
  - /2021080/docs/en/glue-api-shopping-lists-feature-integration
---

{% info_block infoBox "Included features" %}

The following Feature Integration guide expects the basic feature to be in place.
The current Feature Integration guide only adds the Shopping List Rest API functionality.


{% endinfo_block %}

Follow the steps below to install Shopping List feature API.

## Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature|
| --- | --- |--- |
| Spryker Core	 | 202009.0 |[Glue API: Spryker Core Feature Integration](https://documentation.spryker.com/docs/glue-spryker-core-feature-integration) |
| Shopping Lists	 | 202009.0 |[Shopping Lists Feature Integration](https://documentation.spryker.com/docs/shopping-lists-feature-integration-201907) |

## 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
omposer require spryker/shopping-lists-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module is installed:
| Module | Expected Directory |
| --- | --- |   
| `ShoppingListsRestApi` | `vendor/spryker/shopping-lists-rest-api` |

 
{% endinfo_block %}

## 2) Set up Transfer Objects
Run the following commands to generate the transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| Database Entity | Type | Event |
| --- | --- | --- |
| `spy_shopping_list.uuid` | column | added |
| `spy_shopping_list_item.uuid` | column | added |

{% endinfo_block %}
    

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:
| Transfer | Type | Event | Path | 
| --- | --- | --- | --- |
| `RestShoppingListsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestShoppingListsAttributesTransfer` |
| `RestShoppingListRequestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestShoppingListRequestAttributesTransfer` |
| `ShoppingListItemRequestTransfer` | class | created | `src/Generated/Shared/Transfer/ShoppingListItemRequestTransfer` |
| `RestShoppingListItemsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestShoppingListItemsAttributesTransfer` |
| `ShoppingListTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/ShoppingListTransfer` |
| `ShoppingListItemTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/ShoppingListItemTransfer` |


{% endinfo_block %}
    



## 3) Set up Behavior

Set up the following behavior. 


### Generate UUIDs for existing records that do not have IDs:

Run the following commands:

```bash
console uuid:generate ShoppingList spy_shopping_list
console uuid:generate ShoppingList spy_shopping_list_item
```

{% info_block warningBox "Verification" %}

Make sure that the uuid field is populated for all records in the spy_shopping_list table. To do so, run the following SQL query and make sure that the result is **0 records**. :
```php
SELECT COUNT(*) FROM spy_shopping_list WHERE uuid IS NULL;
```
Make sure that the uuid field is populated for all records in the spy_shopping_list_item table. To do so, run the following SQL query and make sure that the result is **0 records**. 
```php
SELECT COUNT(*) FROM spy_shopping_list_item WHERE uuid IS NULL;
```

{% endinfo_block %}

### Enable resources
{% info_block infoBox %}

ShoppingListsResourcePlugin GET, POST, PATCH and DELETE, ShoppingListItemsResourcePlugin POST, PATCH and DELETE verbs are protected resources. For details, refer to the Configure section of [Glue Infrastructure documentation](https://documentation.spryker.com/docs/glue-infrastructure#resource-routing).

{% endinfo_block %}


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| ShoppingListsResourcePlugin | Registers the shopping-lists resource. | None | Spryker\Glue\ShoppingListsRestApi\Plugin |
| ShoppingListItemsResourcePlugin | Registers the shopping-list-items resource. | None | Spryker\Glue\ShoppingListsRestApi\Plugin |
| ShoppingListItemByShoppingListResourceRelationshipPlugin | Adds the shopping-list-items resource as a relationship to shopping-lists. | None | Spryker\Glue\ShoppingListsRestApi\Plugin\GlueApplication |
| ConcreteProductBySkuResourceRelationshipPlugin | Adds the `concrete-products` resource as a relationship to the `shopping-list-items` resource. | None | Spryker\Glue\ProductsRestApi\Plugin\GlueApplication |

<details open>
<summary>
src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
```
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ConcreteProductBySkuResourceRelationshipPlugin;
use Spryker\Glue\ShoppingListsRestApi\Plugin\ShoppingListItemByShoppingListResourceRelationshipPlugin;
use Spryker\Glue\ShoppingListsRestApi\Plugin\ShoppingListItemsResourcePlugin;
use Spryker\Glue\ShoppingListsRestApi\Plugin\ShoppingListsResourcePlugin;
use Spryker\Glue\ShoppingListsRestApi\ShoppingListsRestApiConfig;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ShoppingListsResourcePlugin(),
            new ShoppingListItemsResourcePlugin(),
        ];
    }
 
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LIST_ITEMS,
            new ConcreteProductBySkuResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LISTS,
            new ShoppingListItemByShoppingListResourceRelationshipPlugin()
        );
         
        return $resourceRelationshipCollection;
    }
}

```
<br>
</details>

{% info_block warningBox "Verification" %}

To verify that the `ShoppingListsResourcePlugin` resource route plugin and the `ShoppingListItemByShoppingListResourceRelationshipPlugin`, `ConcreteProductBySkuResourceRelationshipPlugin` relationship plugins are set up correctly, make sure that following endpoint and relationships are available:

* http://glue.mysprykershop.com/shopping-lists/{% raw %}{{{% endraw %}shopping_list_uuid{% raw %}}}{% endraw %}?include=shopping-list-items,concrete-products

Check the response:
<details open>
<summary>GET http://glue.mysprykershop.com/shopping-lists/{% raw %}{{{% endraw %}shopping_list_uuid{% raw %}}}{% endraw %}?include=shopping-list-items,concrete-products</summary>
   
```
{
    "data": [
        {
            "type": "shopping-lists",
            "id": "adb17f85-953f-565a-a4ce-e5cb02405f83",
            "attributes": {
                "owner": "Sonia Wagner",
                "name": "Workstations",
                "numberOfItems": 1,
                "updatedAt": "2020-03-16 13:07:38.286054",
                "createdAt": "2020-03-16 13:07:38.286054"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/adb17f85-953f-565a-a4ce-e5cb02405f83?include=shopping-list-items,concrete-products"
            },
            "relationships": {
                "shopping-list-items": {
                    "data": [
                        {
                            "type": "shopping-list-items",
                            "id": "0615fe0d-fdbe-576b-a220-3398b9965d73"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/shopping-lists?include=shopping-list-items,concrete-products"
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "115_27295368",
            "attributes": {
                "sku": "115_27295368",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "DELL OptiPlex 3020",
                "description": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and easy serviceability. Stop advanced threats and zero-day attacks with Dell Data Protection | Protected Workspace — a proactive, real-time solution for malware protection. Ensure authorized access through multifactor, single sign-on (SSO) and preboot authentication with Dell Data Protection | Security Tools. Streamline administration with integration into Dell KACE appliances, Microsoft System Center and industry-standard tools. Deploy with flexibility through multiple chassis options. Select the small form factor chassis, optimized for constrained workspaces, or the expandable mini tower with support for up to four PCIe cards.",
                "attributes": {
                    "processor_cache": "3 MB",
                    "bus_type": "DMI",
                    "processor_threads": "2",
                    "tcase": "72 °",
                    "brand": "DELL",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_cache",
                    "processor_frequency"
                ],
                "metaTitle": "DELL OptiPlex 3020",
                "metaKeywords": "DELL,Tax Exempt",
                "metaDescription": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and ",
                "attributeNames": {
                    "processor_cache": "Processor cache type",
                    "bus_type": "Bus type",
                    "processor_threads": "Processor Threads",
                    "tcase": "Tcase",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/115_27295368"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "0615fe0d-fdbe-576b-a220-3398b9965d73",
            "attributes": {
                "quantity": 1,
                "sku": "115_27295368"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/adb17f85-953f-565a-a4ce-e5cb02405f83/shopping-list-items/0615fe0d-fdbe-576b-a220-3398b9965d73"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "115_27295368"
                        }
                    ]
                }
            }
        }
    ]
}
```
 <br>
</details>


{% endinfo_block %}

:::(Warning) (Verification)
To verify that the `ShoppingListItemsResourcePlugin` is set up correctly, make sure that the following endpoint is available:

* http://glue.mysprykershop.com/shopping-lists/{% raw %}{{{% endraw %}shopping_list_uuid{% raw %}}}{% endraw %}/shopping-list-items

Post a request with the following body:
<details open>
<summary>Body request</summary>
   
```
{
    "data": {
        "type": "shopping-list-items",
        "attributes": {
            "sku": "218_1234",
            "quantity": 1
        }
    }
}
```
 <br>
</details>

Check the response:
<details open>
<summary>POST http://glue.mysprykershop.com/shopping-lists/{% raw %}{{{% endraw %}shopping_list_uuid{% raw %}}}{% endraw %}/shopping-list-items</summary>
   
```
{
    "data": {
        "type": "shopping-list-items",
        "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
        "attributes": {
            "quantity": 1,
            "sku": "218_1234"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/shopping-lists/d8c5539b-774e-509b-87a9-58cead6a1486/shopping-list-items/c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
        }
    }
}
```
 <br>
</details>

