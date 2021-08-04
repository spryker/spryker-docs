---
title: Retrieving Product Information
originalLink: https://documentation.spryker.com/v1/docs/retrieving-product-information
redirect_from:
  - /v1/docs/retrieving-product-information
  - /v1/docs/en/retrieving-product-information
---

Different Product resources allow you to retrieve all the product information available in your storage. These resources follow the same hierarchical structure that [exists as a basis in the Spryker Commerce OS](/docs/scos/dev/features/201811.0/product-management/product-abstrac). Products can come with multiple Variants (Concrete products) and have Availability, Prices, Tax Sets, as well as Image Sets. Furthermore, you can see what category your product belongs to or what product label is available.

In your development, these resources can help you to retrieve relevant information for your product listing and detail pages, for search, shopping cart, checkout, order history, wishlist and many more.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Products API](https://documentation.spryker.com/v1/docs/products-feature-integration).

## Abstract and Concrete Products
As Spryker Commerce OS implements product data in a hierarchical structure, this concept is also implemented in the [Product API](https://documentation.spryker.com/v1/docs/products-feature-integration). The API provides separate endpoints for abstract and concrete products. Their names contain the abstract and concrete words, respectively.

## General Product Information
To retrieve full information about a product (regardless of whether it is available or not) via REST, use the endpoints listed below.
`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}`
Retrieves information on an abstract product by SKU.
Sample request: `GET http://mysprykershop.com/abstract-products/001`
where `001` is the SKU of the abstract product.

| Field* | Type | Description |
| --- | --- | --- |
| sku | String | SKU of the abstract product |
| name | String | Name of the abstract product |
| description | String | Description of the abstract product |
| attributes | Object | Dist of attributes and their values |
| superAttributeDefinition | String[] | Attributes flagged as super attributes, that are however not relevant to distinguish between the product variants |
| attributeMap|Object|Each super attribute / value combination and the corresponding concrete product IDs are listed here|
|attributeMap.super_attributes|Object|Applicable super attribute and its values for the product variants|
|attributeMap.attribute_variants|Object|List of super attributes with the list of values|
|attributeMap.product_concrete_ids|String[]|Product IDs of the product variants|
|metaTitle|String|Meta title of the product|
|metaKeywords|String|Meta keywords of the product.|
|metaDescription|String|Meta description of the product.|
|attributeNames | Object | All non-super attribute / value combinations for the abstract product. |
\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request was successful and a product with the specified SKU was found, the resource responds with a **RestAbstractProductsResponse**. :
**Sample response**
```js
{
    "data": {
        "type": "abstract-products",
        "id": "177",
        "attributes": {
            "sku": "177",
            "name": "Samsung Galaxy Tab Active 8.0 8 GB",
            "description": "Water and Dust Resistance (IP67) Keep working continuously in virtually any environment with IP67 environmental sealing that protects against damage from water and dust. Gain toughness and stability without sacrificing a premium design with 9.75-mm thickness(without cover) and a 393-gram light weight with rugged reinforcement. Don’t worry about drops or impacts in active business environments. With its included cover, Samsung Galaxy Tab Active is designed to handle drops of up to 1.2 meters with protective cover (3.9 feet). Save time on communications and work process management with easy NFC device pairing and tag reading. A 3.1-megapixel (MP) Auto Focus (AF) camera with a Flash feature enables easy, efficient barcode scanning to facilitate communication and workflow.\t",
            "attributes": {
                "storage_media": "flash",
                "processor_frequency": "1.2 GHz",
                "display_diagonal": "20.3 cm",
                "aspect_ratio": "16:09",
                "brand": "Samsung"
            },
            "superAttributesDefinition": [
                "storage_media",
                "processor_frequency"
            ],
            "attributeMap": {
                "attribute_variants": {
                    "internal_storage_capacity:8 GB": {
                        "id_product_concrete": "177_24867659"
                    },
                    "internal_storage_capacity:16 GB": {
                        "id_product_concrete": "177_24422865"
                    },
                    "internal_storage_capacity:32 GB": {
                        "id_product_concrete": "177_25913296"
                    }
                },
                "super_attributes": {
                    "internal_storage_capacity": [
                        "8 GB",
                        "16 GB",
                        "32 GB"
                    ]
                },
                "product_concrete_ids": [
                    "177_24867659",
                    "177_24422865",
                    "177_25913296"
                ]
            },
            "metaTitle": "Samsung Galaxy Tab Active 8.0 8 GB",
            "metaKeywords": "Samsung,Communication Electronics",
            "metaDescription": "Water and Dust Resistance (IP67) Keep working continuously in virtually any environment with IP67 environmental sealing that protects against damage from w",
            "attributeNames": {
                "storage_media": "Storage media",
                "processor_frequency": "Processor frequency",
                "display_diagonal": "Display diagonal",
                "aspect_ratio": "Aspect ratio",
                "brand": "Brand"
            }
        },
        "links": {
            "self": "http://mysprykershop.com/abstract-products/177"
        },
        "relationships": {
            "concrete-products": {
                "data": [
                    {
                        "type": "concrete-products",
                        "id": "177_24867659"
                    },
                    {
                        "type": "concrete-products",
                        "id": "177_24422865"
                    },
                    {
                        "type": "concrete-products",
                        "id": "177_25913296"
                    }
                ]
            },
            "abstract-product-image-sets": {
                "data": [
                    {
                        "type": "abstract-product-image-sets",
                        "id": "177"
                    }
                ]
            },
            "abstract-product-availabilities": {
                "data": [
                    {
                        "type": "abstract-product-availabilities",
                        "id": "177"
                    }
                ]
            },
            "abstract-product-prices": {
                "data": [
                    {
                        "type": "abstract-product-prices",
                        "id": "177"
                    }
                ]
            },
            "category-nodes": {
                "data": [
                    {
                        "type": "category-nodes",
                        "id": "14"
                    },
                    {
                        "type": "category-nodes",
                        "id": "5"
                    },
                    {
                        "type": "category-nodes",
                        "id": "8"
                    }
                ]
            },
            "product-tax-sets": {
                "data": [
                    {
                        "type": "product-tax-sets",
                        "id": "deb94215-a1fc-5cdc-af6e-87ec3a847480"
                    }
                ]
            }
        }
    }
}
```
`/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}`
Retrieves information on a concrete product by SKU.
Sample request: `GET http://mysprykershop.com/concrete-products/001_25904006`
where `001_25904006` is the SKU of the concrete product.

| Field* | Type | Description |
| --- | --- | --- |
| sku | String | SKU of the concrete product |
| name | String | Name of the concrete product |
| description | String | Description of the concrete product |
| attributes | Object | List of attribute keys and their values for the product |
| superAttributeDefinition | String[] | List of attributes that are flagged as super attributes |
| metaTitle|String|Meta title of the product|
|metaKeywords|String|Meta keywords of the product|
|metaDescription|String|Meta description of the product|
|attributeNames | String | List of attribute keys and their translations |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request was successful and a product with the specified SKU was found, the resource responds with a RestConcreteProductsResponse. :

**Sample response**
```js
{
    "data": {
        "type": "concrete-products",
        "id": "177_25913296",
        "attributes": {
            "sku": "177_25913296",
            "name": "Samsung Galaxy Tab Active 8.0 32 GB",
            "description": "Water and Dust Resistance (IP67) Keep working continuously in virtually any environment with IP67 environmental sealing that protects against damage from water and dust. Gain toughness and stability without sacrificing a premium design with 9.75-mm thickness(without cover) and a 393-gram light weight with rugged reinforcement. Don’t worry about drops or impacts in active business environments. With its included cover, Samsung Galaxy Tab Active is designed to handle drops of up to 1.2 meters with protective cover (3.9 feet). Save time on communications and work process management with easy NFC device pairing and tag reading. A 3.1-megapixel (MP) Auto Focus (AF) camera with a Flash feature enables easy, efficient barcode scanning to facilitate communication and workflow.",
            "attributes": {
                "storage_media": "flash",
                "processor_frequency": "1.2 GHz",
                "display_diagonal": "20.3 cm",
                "aspect_ratio": "16:09",
                "brand": "Samsung",
                "internal_storage_capacity": "32 GB"
            },
            "superAttributesDefinition": [
                "storage_media",
                "processor_frequency",
                "internal_storage_capacity"
            ],
            "metaTitle": "Samsung Galaxy Tab Active 8.0 8 GB",
            "metaKeywords": "Samsung,Communication Electronics",
            "metaDescription": "Water and Dust Resistance (IP67) Keep working continuously in virtually any environment with IP67 environmental sealing that protects against damage from w",
            "attributeNames": {
                "storage_media": "Storage media",
                "processor_frequency": "Processor frequency",
                "display_diagonal": "Display diagonal",
                "aspect_ratio": "Aspect ratio",
                "brand": "Brand",
                "internal_storage_capacity": "Internal storage capacity"
            }
        },
        "links": {
            "self": "http://mysprykershop.com/concrete-products/177_25913296"
        },
        "relationships": {
            "concrete-product-image-sets": {
                "data": [
                    {
                        "type": "concrete-product-image-sets",
                        "id": "177_25913296"
                    }
                ]
            },
            "concrete-product-availabilities": {
                "data": [
                    {
                        "type": "concrete-product-availabilities",
                        "id": "177_25913296"
                    }
                ]
            },
            "concrete-product-prices": {
                "data": [
                    {
                        "type": "concrete-product-prices",
                        "id": "177_25913296"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-image-sets",
            "id": "177_25913296",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//d2s0ynfc62ej12.cloudfront.net/b2c/24867659-4916.jpg",
                                "externalUrlSmall": "//d2s0ynfc62ej12.cloudfront.net/b2c/24867659-4916.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/concrete-products/177_25913296/concrete-product-image-sets"
            }
        },
        {
            "type": "concrete-product-availabilities",
            "id": "177_25913296",
            "attributes": {
                "availability": true,
                "quantity": 20,
                "isNeverOutOfStock": false
            },
            "links": {
                "self": "http://mysprykershop.com/concrete-products/177_25913296/concrete-product-availabilities"
            }
        },
        {
            "type": "concrete-product-prices",
            "id": "177_25913296",
            "attributes": {
                "price": 42502,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 42502,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/concrete-products/177_25913296/concrete-product-prices"
            }
        }
    ]
}
```
{% info_block errorBox "Performance" %}
By default, the response contains additional product information as relationships (e.g. product image sets, availability, prices, and categories.
{% endinfo_block %} The abstract product resource also contains information on the relevant concrete products and tax sets. For performance reasons and bandwidth usage optimization, it is recommended to filter out all information irrelevant to a specific use case. Examples:<ul><li>`/abstract-products/001?fields[abstract-products]=name,description` - return abstract product name and description only;</li><li>`/abstract-products/001?include=abstract-product-prices` - return abstract product information and prices;</li><li>`/abstract-products/001?include=concrete-products&fields[concrete-products]=name,description` - return abstract product information as well as name and description of each concrete product it relates to.</li></ul>)

## Availability
To find out how many items of a certain product are available, use the following endpoints:
`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-availabilities`
Retrieves the availability of an abstract product by SKU.
Sample request: `GET http://mysprykershop.com/abstract-products/001/abstract-product-availabilities`
where `001` is the SKU of the abstract product.

| Field* | Type | Description |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability |
| quantity | Integer | Available stock (all warehouses aggregated) |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
If the request was successful, the resource responds with a **RestAbstractProductAvailabilityResponse**.

**Sample response**
```js
{
    "data": [{
        "type": "abstract-product-availabilities",
        "id": "001",
        "attributes": {
            "availability": true,
            "quantity": 10
        },
        "links": {
            "self": "http://mysprykershop.com/abstract-products/001/abstract-product-availabilities"
        }
    }],
    "links": {
        "self": "http://mysprykershop.com/abstract-products/001/abstract-product-availabilities"
    }
}
```

`/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/concrete-product-availabilities`
Retrieves the availability of a concrete product by SKU.
Sample request: `GET http://mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities`
where `001_25904006` is the SKU of the concrete product.

| Field* | Type | Description |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability |
| quantity|Integer|Available stock (all warehouses aggregated) |
| isNeverOutOfStock | Boolean | A boolean to show if this is a product that is never out of stock |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request was successful, the resource responds with a **RestConcreteProductAvailabilityResponse**.

**Sample response**
```js
{
    "data": [{
        "type": "concrete-product-availabilities",
        "id": "001_25904006",
        "attributes": {
            "availability": true,
            "quantity": 10,
            "isNeverOutOfStock": false
        },
        "links": {
            "self": "http://mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
        }
    }],
    "links": {
        "self": "http://mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
    }
}
```

## Prices
The below endpoints return prices for a concrete or an abstract product.
{% info_block infoBox %}
For information on the different price types available in Spryker, see [Price](/docs/scos/dev/features/201811.0/price/price
{% endinfo_block %}.)

`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-prices`
Gets prices for an **abstract** product by SKU.
Sample request: `GET http://mysprykershop.com/abstract-products/001/abstract-product-prices`
where `001` is the SKU of the abstract product.

| Field* | Type | Description |
| --- | --- | --- |
| price | Integer | Price to pay for that product in cents |
| priceTypeName|String|Price type |
| netAmount|Integer|Net price in cents|
|grossAmount|Integer|Gross price in cents|
|currency.code|String|Currency code|
|currency.name|String|Currency name|
|currency.symbol | String | Currency symbol |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request was successful, the resource responds with a **RestProductPricesResponse**.

**Sample response**
```js
{
    "data": [
        {
            "type": "abstract-product-prices",
            "id": "001",
            "attributes": {
                "price": 9999,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9999,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 12564,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/001/abstract-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/abstract-products/001/abstract-product-prices"
    }
}
```

`/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/concrete-product-prices`
Gets prices for a concrete product by SKU.
Sample request: `GET http://mysprykershop.com/concrete-products/001_25904006/concrete-product-prices`
where `001_25904006` is the SKU of the concrete product.

| Field* | Type | Description |
| --- | --- | --- |
| price | Integer | Price to pay for that product in cents |
| priceTypeName|String|Price type |
| netAmount|Integer|Net price in cents|
|grossAmount|Integer|Gross price in cents|
|currency.code|String|Currency code|
|currency.name|String|Currency name|
|currency.symbol | String | Currency symbol |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request was successful, the resource responds with a RestProductPricesResponse, the same as the abstract resource.

**Sample response**
```js
{
    "data": [
        {
            "type": "concrete-product-prices",
            "id": "001_25904006",
            "attributes": {
                "price": 9999,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9999,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 12564,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
    }
}
```

`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-prices?currency={% raw %}{{{% endraw %}currency code{% raw %}}}{% endraw %}&priceMode={% raw %}{{{% endraw %}price mode{% raw %}}}{% endraw %}`

Gets prices for an abstract product by SKU with the specific currency and a price mode.

Sample request: `GET http://mysprykershop.com//abstract-products/001/abstract-product-prices?currency=CHF&priceMode=GROSS_MODE`

where `001` is the SKU of the abstract product; `CHF` is the currency to display (Swiss Franc); `GROSS_MODE` is the price mode.

**Sample response**
```js
{
    "data": [
        {
            "type": "concrete-product-prices",
            "id": "001_25904006",
            "attributes": {
                "price": 9999,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9999,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 12564,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
    }
}
```

| Field* | Type | Description |
| --- | --- | --- |
| price | Integer | Price to pay for that product (in cents) |
| priceTypeName | String | Price type |
| netAmount | Integer | Net price in cents |
| grossAmount | Integer | Gross price in cents |
| currency.code | String | Currency code |
| currency.name | String | Currency name |
| currency.symbol | String | Currency symbol |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

## Tax Sets
To retrieve information on tax-related information for a product, you can use the endpoint described below.

{% info_block infoBox %}
For more information on how to manage product taxes, see [Tax](/docs/scos/dev/features/201811.0/tax/tax
{% endinfo_block %}.)

`/abstract-products/{% raw %}{{{% endraw %}SKU{% raw %}}}{% endraw %}/tax-sets`
Gets prices for an abstract product by SKU.

{% info_block infoBox %}
Tax sets are available for abstract products only.
{% endinfo_block %}

Sample request: `GET http://mysprykershop.com/abstract-products/209/product-tax-sets`
where `209` is the SKU of the abstract product.

| Field* | Description |
| --- | --- |
| name | Tax set name |
| restTaxRates.name | Tax rate name |
| restTaxRates.rate | Tax rate |
| restTaxRates.country | Applicable country for the tax rate |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
 
If the request was successful, the resource responds with a **RestTaxSetsResponse**.

**Sample response**
```js
Sample response
{
    "data": [
        {
            "type": "product-tax-sets",
            "id": "deb94215-a1fc-5cdc-af6e-87ec3a847480",
            "attributes": {
                "name": "Communication Electronics",
                "restTaxRates": [
                    {
                        "name": "Austria Standard",
                        "rate": "20.00",
                        "country": "AT"
                    },
                    {
                        "name": "Belgium Standard",
                        "rate": "21.00",
                        "country": "BE"
                    },
                    {
                        "name": "Bulgaria Standard",
                        "rate": "20.00",
                        "country": "BG"
                    },
                    {
                        "name": "Czech Republic Standard",
                        "rate": "21.00",
                        "country": "CZ"
                    },
                    {
                        "name": "Denmark Standard",
                        "rate": "25.00",
                        "country": "DK"
                    },
                    {
                        "name": "France Standard",
                        "rate": "20.00",
                        "country": "FR"
                    },
                    {
                        "name": "Germany Standard",
                        "rate": "19.00",
                        "country": "DE"
                    },
                    {
                        "name": "Hungary Standard",
                        "rate": "27.00",
                        "country": "HU"
                    },
                    {
                        "name": "Italy Standard",
                        "rate": "22.00",
                        "country": "IT"
                    },
                    {
                        "name": "Netherlands Standard",
                        "rate": "21.00",
                        "country": "NL"
                    },
                    {
                        "name": "Romania Standard",
                        "rate": "20.00",
                        "country": "RO"
                    },
                    {
                        "name": "Slovakia Standard",
                        "rate": "20.00",
                        "country": "SK"
                    },
                    {
                        "name": "Slovenia Standard",
                        "rate": "22.00",
                        "country": "SI"
                    },
                    {
                        "name": "Luxembourg Reduced1",
                        "rate": "3.00",
                        "country": "LU"
                    },
                    {
                        "name": "Poland Reduced1",
                        "rate": "5.00",
                        "country": "PL"
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/177/product-tax-sets"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/abstract-products/177/product-tax-sets"
    }
}
```

## Image Sets
To get image sets that can be used to display a product, use the endpoints below.
`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-image-sets`
Gets images of an abstract product by SKU.
Sample request: `GET http://mysprykershop.com/abstract-products/001/abstract-product-image-sets`
where `001` is the SKU of the abstract product.

| Field* | Description |
| --- | --- |
| name | Image set name |
| externalUrlLarge | URLs to the image per image set per image |
| externalUrlSmall | URLs to the image per image set per image |

\The fields mentioned are all attributes in the response. Type and ID are not mentioned.
 
If the request was successful, the resource responds with a RestProductImageSetsResponse. It contains links to the images only, not the actual images.

**Sample response**
```js
Sample response
{
    "data": [
        {
            "type": "abstract-product-image-sets",
            "id": "177",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/norm/high/24867659-4916.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/norm/medium/24867659-4916.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/abstract-products/177/abstract-product-image-sets"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/abstract-products/177/abstract-product-image-sets"
    }
}
```

`/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/concrete-product-image-sets`
Gets images of a concrete product by SKU.
Sample request: `GET http://mysprykershop.com/concrete-products/001_25904006/concrete-product-image-sets`
where `001_25904006` is the SKU of the concrete product.

| Field* | Description |
| --- | --- |
| name | Image set name |
| externalUrlLarge | URLs to the image per image set per image |
| externalUrlSmall | URLs to the image per image set per image |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.
 
If the request was successful, the resource responds with a RestProductImageSetsResponse, the same as the abstract resource.

**Sample response**
```js
Sample response
{
    "data": [
        {
            "type": "concrete-product-image-sets",
            "id": "177_25913296",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "//images.icecat.biz/img/norm/high/24867659-4916.jpg",
                                "externalUrlSmall": "//images.icecat.biz/img/norm/medium/24867659-4916.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://mysprykershop.com/concrete-products/177_25913296/concrete-product-image-sets"
            }
        }
    ],
    "links": {
        "self": "http://mysprykershop.com/concrete-products/177_25913296/concrete-product-image-sets"
    }
}
```

## Possible errors

| Code | Constant | Meaning |
| --- | --- | --- |
| 301 | RESPONSE_CODE_CANT_FIND_ABSTRACT_PRODUCT | Abstract product is not found. |
| 302 | RESPONSE_CODE_CANT_FIND_CONCRETE_PRODUCT | Concrete product is not found. |
| 303 | RESPONSE_CODE_ABSTRACT_PRODUCT_IMAGE_SETS_NOT_FOUND | Can`t find abstract product image sets. |
| 304 | RESPONSE_CODE_CONCRETE_PRODUCT_IMAGE_SETS_NOT_FOUND | Can`t find concrete product image sets. |
| 305 | RESPONSE_CODE_ABSTRACT_PRODUCT_AVAILABILITY_NOT_FOUND | Availability is not found. |
| 306 | RESPONSE_CODE_CONCRETE_PRODUCT_AVAILABILITY_NOT_FOUND | Availability is not found. |
| 307 | RESPONSE_CODE_ABSTRACT_PRODUCT_PRICES_NOT_FOUND | Can`t find abstract product prices. |
| 308 | RESPONSE_CODE_CONCRETE_PRODUCT_PRICES_NOT_FOUND | Can`t find concrete product prices. |
| 310 | RESPONSE_CODE_CANT_FIND_PRODUCT_TAX_SETS | Could not get tax set, product abstract with provided id not found. |
| 311 | RESPONSE_CODE_ABSTRACT_PRODUCT_SKU_IS_MISSING | Abstract product SKU is not specified. |
| 312 | RESPONSE_CODE_CONCRETE_PRODUCT_SKU_IS_MISSING | Concrete product SKU is not specified. |
| 313 | RESPONSE_CODE_INVALID_CURRENCY | Currency is invalid. |
| 314 | RESPONSE_CODE_INVALID_PRICE_MODE | Price mode is invalid. |

