


This document describes how to install the Warehouse picking + [Product](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) feature.

## Prerequisites

Install the required features:

| NAME              | VERSION          | INSTALLATION GUIDE                                                                                                                                                 |
|-------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse Picking | {{page.version}} | [Install the Warehouse Picking feature](/docs/pbc/all/warehouse-management-system/latest/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)                    |
| Product           | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

## 1) Set up behavior

Enable the following plugins.

| PLUGIN                                                              | SPECIFICATION                                                                                    | PREREQUISITES | NAMESPACE                                                                                              |
|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------|
| ConcreteProductsByPickingListItemsBackendResourceRelationshipPlugin | Adds the `concrete-products` resource as a relationship to the `picking-list-items` resource.          |               | Spryker\Glue\ProductsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector         |
| ConcreteProductImageSetsByProductsBackendResourceRelationshipPlugin | Adds the `concrete-product-image-sets` resource as a relationship to the `concrete-products` resource. |               | Spryker\Glue\ProductImageSetsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |




**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\ProductsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ConcreteProductsByPickingListItemsBackendResourceRelationshipPlugin;
use Spryker\Glue\ProductsBackendApi\ProductsBackendApiConfig;
use Spryker\Glue\ProductImageSetsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ConcreteProductImageSetsByProductsBackendResourceRelationshipPlugin;

class GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            PickingListsBackendApiConfig::RESOURCE_PICKING_LIST_ITEMS,
            new ConcreteProductsByPickingListItemsBackendResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ProductsBackendApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ConcreteProductImageSetsByProductsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}


```

{% info_block warningBox "Verification" %}

Make sure the `concrete-products` and `concrete-product-image-sets` resources are returned as relationships to `picking-list-items` resource.

`GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=picking-list-items,concrete-products,concrete-product-image-sets`
<details>
  <summary>Response sample</summary>
```json
{
    "data": [
        {
            "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
            "type": "picking-lists",
            "attributes": {
                "status": "ready-for-picking",
                "createdAt": "2023-10-27 13:00:32.000000",
                "updatedAt": "2023-10-27 13:00:32.000000"
            },
            "relationships": {
                "picking-list-items": {
                    "data": [
                        {
                            "id": "9ac9fd06-f491-506e-b302-0b166786d91c",
                            "type": "picking-list-items"
                        },
                        {
                            "id": "54a264b8-dc2b-5a0e-9a78-ae7138e9d0b5",
                            "type": "picking-list-items"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=picking-list-items,concrete-products,concrete-product-image-sets"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/picking-lists?include=picking-list-items,concrete-products,concrete-product-image-sets"
    },
    "included": [
        {
            "id": "091_25873091",
            "type": "concrete-product-image-sets",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "locale": "de_DE",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25873091-2214.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25873091-2214.jpg"
                            }
                        ]
                    },
                    {
                        "name": "default",
                        "locale": "en_US",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25873091-2214.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25873091-2214.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/concrete-product-image-sets/091_25873091?include=picking-list-items,concrete-products,concrete-product-image-sets"
            }
        },
        {
            "id": "091_25873091",
            "type": "concrete-products",
            "attributes": {
                "sku": "091_25873091",
                "isQuantitySplittable": true,
                "isActive": true,
                "localizedAttributes": [
                    {
                        "locale": {
                            "locale_name": "de_DE",
                            "id_locale": 46,
                            "name": null,
                            "is_active": true
                        },
                        "name": "Sony SmartWatch 3",
                        "description": "Gear S2 X Atelier Mendini In einer wunderbaren Partnerschaft bringt Alessandro Mendini seinen Geschmack, Humor und Farbsinn in die Gestaltung der Gear S2 ein. Das Ergebnis ist eine Reihe von Zifferblättern und Armbändern, die Ihren persönlichen Stil zum Ausdruck bringen. Die wesentlichen Smartphone-Funktionen sind mit einer einfachen Drehung an der Gear S2 verfügbar. Drehen Sie leicht an der Blende, um lange E-Mails zu durchblättern, eine Karte zu vergrössern oder bei der Musikwiedergabe ein Stück zu überspringen. Mit jeder Drehung wird das Leben noch interessanter und bunter. Mit der Gear S2 können Sie sich sehr leicht um Ihre Gesundheit kümmern. Verfolgen Sie Ihre täglichen Aktivitäten, Ihren Puls und Ihren Wasserkonsum verglichen mit Ihrem Koffeinkonsum. Bleiben Sie fit mit zeitgerechten motivierenden Botschaften. Bleiben Sie auf dem Laufenden und fit. Und wenn es Zeit'st, die Smartwatch wieder aufzuladen, stellen Sie sie einfach auf eine drahtlose Ladestation.",
                        "isSearchable": true,
                        "attributes": {
                            "color": "Weiß"
                        }
                    },
                    {
                        "locale": {
                            "locale_name": "en_US",
                            "id_locale": 66,
                            "name": null,
                            "is_active": true
                        },
                        "name": "Sony SmartWatch 3",
                        "description": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps – formal, sophisticated, casual, vibrant colours and fitness style, all made from the finest materials. Designed to perform and impress, this smartphone watch delivers a groundbreaking combination of technology and style. Downloadable apps let you customise your SmartWatch 3 SWR50 and how you use it.         Tell SmartWatch 3 SWR50 smartphone watch what you want and it will do it. Search. Command. Find.",
                        "isSearchable": true,
                        "attributes": {
                            "color": "White"
                        }
                    }
                ],
                "imageSets": [
                    {
                        "name": "default",
                        "locale": {
                            "locale_name": "de_DE",
                            "id_locale": 46,
                            "name": null,
                            "is_active": true
                        },
                        "images": []
                    },
                    {
                        "name": "default",
                        "locale": {
                            "locale_name": "en_US",
                            "id_locale": 66,
                            "name": null,
                            "is_active": true
                        },
                        "images": []
                    }
                ]
            },
            "relationships": {
                "concrete-product-image-sets": {
                    "data": [
                        {
                            "id": "091_25873091",
                            "type": "concrete-product-image-sets"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/concrete-products/091_25873091?include=picking-list-items,concrete-products,concrete-product-image-sets"
            }
        },
        {
            "id": "9ac9fd06-f491-506e-b302-0b166786d91c",
            "type": "picking-list-items",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 0,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "120b7a51-69e4-54b9-96a6-3b5eab0dfe7a",
                    "sku": "091_25873091",
                    "quantity": 1,
                    "name": "Sony SmartWatch 3",
                    "amountSalesUnit": null,
                    "amount": null
                }
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "id": "091_25873091",
                            "type": "concrete-products"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/9ac9fd06-f491-506e-b302-0b166786d91c?include=picking-list-items,concrete-products,concrete-product-image-sets"
            }
        },
        {
            "id": "066_23294028",
            "type": "concrete-product-image-sets",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "locale": "de_DE",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/23294028_3275.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/23294028_3275.jpg"
                            }
                        ]
                    },
                    {
                        "name": "default",
                        "locale": "en_US",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/23294028_3275.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/23294028_3275.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/concrete-product-image-sets/066_23294028?include=picking-list-items,concrete-products,concrete-product-image-sets"
            }
        },
        {
            "id": "066_23294028",
            "type": "concrete-products",
            "attributes": {
                "sku": "066_23294028",
                "isQuantitySplittable": true,
                "isActive": true,
                "localizedAttributes": [
                    {
                        "locale": {
                            "locale_name": "de_DE",
                            "id_locale": 46,
                            "name": null,
                            "is_active": true
                        },
                        "name": "Samsung Galaxy S5 mini",
                        "description": "Ein Kunstwerk Das 5-Zoll-Display des Liquid Jade ist ein ansprechender Anblick. Die HD-Auflösung in Kombination mit der IPS1-Technologie verleiht Videos, Bildern und Web-Inhalten noch mehr Leben. Außerdem lässt das Zero Air Gap-Design alle Bilder gut aussehen – auch bei Sonnenlicht. Der Name sagt alles: ein Smartphone, das ist so schön ist wie Jade. Dank der 7,5 mm flachen und geschwungenen, ergonomischen Oberflächen liegt das Liquid Jade angenehm in der Hand. Die geschwungene Corning® Gorilla® Glass-Display unterstreicht die robuste und doch ansprechende Bauweise des Liquid Jade.",
                        "isSearchable": true,
                        "attributes": {
                            "color": "Blau"
                        }
                    },
                    {
                        "locale": {
                            "locale_name": "en_US",
                            "id_locale": 66,
                            "name": null,
                            "is_active": true
                        },
                        "name": "Samsung Galaxy S5 mini",
                        "description": "Galaxy S5 mini continues Samsung design legacy and flagship experience Outfitted with a 4.5-inch HD Super AMOLED display, the Galaxy S5 mini delivers a wide and vivid viewing experience, and its compact size provides users with additional comfort, allowing for easy operation with only one hand. Like the Galaxy S5, the Galaxy S5 mini features a unique perforated pattern on the back cover creating a modern and sleek look, along with a premium, soft touch grip. The Galaxy S5 mini enables users to enjoy the same flagship experience as the Galaxy S5 with innovative features including IP67 certification, Ultra Power Saving Mode, a heart rate monitor, fingerprint scanner, and connectivity with the latest Samsung wearable devices. The Galaxy S5 mini comes equipped with a powerful Quad Core 1.4 GHz processor and 1.5GM RAM for seamless multi-tasking, faster webpage loading, softer UI transition, and quick power up. The high-resolution 8MP camera delivers crisp and clear photos and videos, while the Galaxy S5 mini's support of LTE Category 4 provides users with ultra-fast downloads of movies and games on-the-go. ",
                        "isSearchable": true,
                        "attributes": {
                            "color": "Blue"
                        }
                    }
                ],
                "imageSets": [
                    {
                        "name": "default",
                        "locale": {
                            "locale_name": "de_DE",
                            "id_locale": 46,
                            "name": null,
                            "is_active": true
                        },
                        "images": []
                    },
                    {
                        "name": "default",
                        "locale": {
                            "locale_name": "en_US",
                            "id_locale": 66,
                            "name": null,
                            "is_active": true
                        },
                        "images": []
                    }
                ]
            },
            "relationships": {
                "concrete-product-image-sets": {
                    "data": [
                        {
                            "id": "066_23294028",
                            "type": "concrete-product-image-sets"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/concrete-products/066_23294028?include=picking-list-items,concrete-products,concrete-product-image-sets"
            }
        },
        {
            "id": "54a264b8-dc2b-5a0e-9a78-ae7138e9d0b5",
            "type": "picking-list-items",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 0,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "14d86bb2-ea23-57ed-904c-eecc63ef10ac",
                    "sku": "066_23294028",
                    "quantity": 1,
                    "name": "Samsung Galaxy S5 mini",
                    "amountSalesUnit": null,
                    "amount": null
                }
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "id": "066_23294028",
                            "type": "concrete-products"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/54a264b8-dc2b-5a0e-9a78-ae7138e9d0b5?include=picking-list-items,concrete-products,concrete-product-image-sets"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}
