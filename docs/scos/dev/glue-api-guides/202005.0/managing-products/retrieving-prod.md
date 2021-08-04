---
title: Retrieving Product Information
originalLink: https://documentation.spryker.com/v5/docs/retrieving-product-information
redirect_from:
  - /v5/docs/retrieving-product-information
  - /v5/docs/en/retrieving-product-information
---

Different Product resources allow you to retrieve all the product information available in your storage. These resources follow the same hierarchical structure that exists as a basis in the Spryker Commerce OS. Products can come with multiple Variants (Concrete products) and have Availability, Prices, Tax Sets, as well as Image Sets. Furthermore, you can see what category your product belongs to or what product label is available.

In your development, these resources can help you to retrieve relevant information for your product listing and detail pages, for search, shopping cart, checkout, order history, wishlist and many more.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](https://documentation.spryker.com/docs/en/glue-api-products-feature-integration).
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/en/glue-api-measurement-units-feature-integration).

## Abstract and Concrete Products
As Spryker Commerce OS implements product data in a hierarchical structure, this concept is also implemented in the Product API. The API provides separate endpoints for abstract and concrete products. Their names contain the abstract and concrete words, respectively.



## Retrieve Abstract Products
To retrieve general information about an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}***

---


| Path parameter | Description |
| --- | --- |
| {% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %} | SKU of an abstract product to get information for. |

### Request

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | abstract-product-prices, concrete-products, product-labels |
| fields | 	Filters out the fields to be retrieved.  | name, image, description |
{% info_block warningBox "Performance" %}

* For performance and bandwidth usage optimization, we recommend filtering out only the needed information using the `fields` string parameter.

* If you include more resources, you can still use the `fields` string parameter to return only the needed fields. For example, `GET http://glue.mysprykershop.com/abstract-products/001?include=concrete-products&fields[abstract-products]=name,description&fields[concrete-products]=name,image`.


{% endinfo_block %}


| Request | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/abstract-products/001` | Retrieve general information about the abstract product. |
| `GET http://glue.mysprykershop.com/abstract-products/001?include=product-labels` | Retrieve general information about the abstract product with its assigned product lables included. |





### Response

<details>
    <summary>Response sample</summary>
    
```json
{
    "data": {
        "type": "abstract-products",
        "id": "001",
        "attributes": {
            "sku": "001",
            "averageRating": null,
            "reviewCount": 0,
            "name": "Canon IXUS 160",
            "description": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results while framing using Live View Control and enjoy sharing them with friends using the 6.8 cm (2.7”) LCD screen. Combine with a Canon Connect Station and you can easily share your photos and movies with the world on social media sites and online albums like irista, plus enjoy watching them with family and friends on an HD TV. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions.",
            "attributes": {
                "megapixel": "20 MP",
                "flash_range_tele": "4.2-4.9 ft",
                "memory_slots": "1",
                "usb_version": "2",
                "brand": "Canon",
                "color": "Red"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "superAttributes": {
                "color": [
                    "Red"
                ]
            },
            "attributeMap": {
                "product_concrete_ids": [
                    "001_25904006"
                ],
                "super_attributes": {
                    "color": [
                        "Red"
                    ]
                },
                "attribute_variants": []
            },
            "metaTitle": "Canon IXUS 160",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results whi",
            "attributeNames": {
                "megapixel": "Megapixel",
                "flash_range_tele": "Flash range (tele)",
                "memory_slots": "Memory slots",
                "usb_version": "USB version",
                "brand": "Brand",
                "color": "Color"
            },
            "url": "/en/canon-ixus-160-1"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/abstract-products/001"
        }
    }
}
```

 </details>

<details>
    <summary>Response sample with product labels</summary>
    
```json
{
    "data": {
        "type": "abstract-products",
        "id": "001",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "product-labels": {
                "data": [
                    {
                        "type": "product-labels",
                        "id": "3"
                    },
                    {
                        "type": "product-labels",
                        "id": "5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "3",
            "attributes": {
                "name": "Standard Label",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": ""
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/3"
            }
        },
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 5,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```

 </details>








<a name="abstract-products-response-attributes"></a>

| Attribute | Type | Description |
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



| Included resource | Attribute | Type | Description |
| --- | --- | --- | --- |
| product-labels | name | String | Specifies the label name. |
| product-labels | isExclusive | Boolean | Indicates whether the label is `exclusive`.</br>If the attribute is set to true, the current label takes precedence over other labels the product might have. This means that only the current label should be displayed for the product, and all other possible labels should be hidden. |
| product-labels | position | Integer | Indicates the label priority.</br>Labels should be indicated on the frontend according to their priority, from the highest (**1**) to the lowest, unless a product has a label with the `isExclusive` attribute set.|
| product-labels | frontEndReference | String |Specifies the label custom label type (CSS class).</br>If the attribute is an empty string, the label should be displayed using the default CSS style. |





For the attributes of other included resources, see:
* [Retrieve Price of an Abstract Product](#prices-response-attributes)
* [Retrieve Concrete Products](#concrete-products-response-attributes)

## Retrieve Concrete Products 
To retrieve general information about a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| {% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %} | SKU of a concrete product to get information for. |

### Request 
| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-product-prices, product-measurement-units, sales-units, product-labels |
| fields | 	Filters out the fields to be retrieved.  | name, image, description |
{% info_block warningBox "Performance" %}

* For performance and bandwidth usage optimization, we recommend filtering out only the needed information using the `fields` string parameter.

* If you include more resources, you can still use the `fields` string parameter to return only the needed fields. For example, `GET http://glue.mysprykershop.com/concrete-products/fish-1-1?include=sales-units&fields[concrete-products]=name,description&fields[sales-units]=conversion,precision`.


{% endinfo_block %}   

Sample requests:
| Request  | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006` | Get information about the `001_25904006` product.  |
| `GET http://glue.mysprykershop.com/concrete-products/fish-1-1?include=sales-units,product-measurement-units` | Get information about the `fish-1-1` product with the information on its sales units and product mesurement units included. |
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006?include=product-labels` | Retrieve information about the `001_25904006` product with product labels included.  |

  


### Response
<details>
    <summary>Response sample</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "001_25904006",
        "attributes": {
            "sku": "001_25904006",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "name": "Canon IXUS 160",
            "description": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results while framing using Live View Control and enjoy sharing them with friends using the 6.8 cm (2.7”) LCD screen. Combine with a Canon Connect Station and you can easily share your photos and movies with the world on social media sites and online albums like irista, plus enjoy watching them with family and friends on an HD TV. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions.",
            "attributes": {
                "megapixel": "20 MP",
                "flash_range_tele": "4.2-4.9 ft",
                "memory_slots": "1",
                "usb_version": "2",
                "brand": "Canon",
                "color": "Red"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "metaTitle": "Canon IXUS 160",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results whi",
            "attributeNames": {
                "megapixel": "Megapixel",
                "flash_range_tele": "Flash range (tele)",
                "memory_slots": "Memory slots",
                "usb_version": "USB version",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "http://glue.mysprykershop.com/concrete-products/001_25904006"
        }
    }
}
```

 </details>

<details>
    <summary>Response sample with sales units and product measurement units</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "cable-vga-1-1",
        "attributes": {
            "sku": "cable-vga-1-1",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "name": "VGA cable (1.5m)",
            "description": "Enjoy clear, crisp, immediate connectivity with the High-Speed HDMI Cable. This quality High-Definition Multimedia Interface (HDMI) cable allows you to connect a wide variety of devices in the realms of home entertainment, computing, gaming, and more to your HDTV, projector, or monitor. Perfect for those that interact with multiple platforms and devices, you can rely on strong performance and playback delivery when it comes to your digital experience.",
            "attributes": {
                "packaging_unit": "Ring"
            },
            "superAttributesDefinition": [
                "packaging_unit"
            ],
            "metaTitle": "",
            "metaKeywords": "",
            "metaDescription": "",
            "attributeNames": {
                "packaging_unit": "Packaging unit"
            }
        },
        "links": {
            "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1?include=sales-units,product-measurement-units"
        },
        "relationships": {
            "product-measurement-units": {
                "data": [
                    {
                        "type": "product-measurement-units",
                        "id": "METR"
                    }
                ]
            },
            "sales-units": {
                "data": [
                    {
                        "type": "sales-units",
                        "id": "32"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-measurement-units",
            "id": "METR",
            "attributes": {
                "name": "Meter",
                "defaultPrecision": 100
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-measurement-units/METR"
            }
        },
        {
            "type": "sales-units",
            "id": "32",
            "attributes": {
                "conversion": 1,
                "precision": 100,
                "isDisplayed": true,
                "isDefault": true,
                "productMeasurementUnitCode": "METR"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-1/sales-units/32"
            },
            "relationships": {
                "product-measurement-units": {
                    "data": [
                        {
                            "type": "product-measurement-units",
                            "id": "METR"
                        }
                    ]
                }
            }
        }
    ]
}
```

 </details>
 
 <details>
    <summary>Response sample with product labels</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "001_25904006",
        "attributes": {
            "sku": "001_25904006",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "name": "Canon IXUS 160",
            "description": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results while framing using Live View Control and enjoy sharing them with friends using the 6.8 cm (2.7”) LCD screen. Combine with a Canon Connect Station and you can easily share your photos and movies with the world on social media sites and online albums like irista, plus enjoy watching them with family and friends on an HD TV. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions.",
            "attributes": {
                "megapixel": "20 MP",
                "flash_range_tele": "4.2-4.9 ft",
                "memory_slots": "1",
                "usb_version": "2",
                "brand": "Canon",
                "color": "Red"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "metaTitle": "Canon IXUS 160",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results whi",
            "attributeNames": {
                "megapixel": "Megapixel",
                "flash_range_tele": "Flash range (tele)",
                "memory_slots": "Memory slots",
                "usb_version": "USB version",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "http://glue.mysprykershop.com/concrete-products/001_25904006"
        }
    }
}
```

 </details>

<a name="concrete-products-response-attributes"></a>


| Attribute | Type | Description |
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


| Included resource | Attribute |Type |Description |
| --- | --- | --- | --- |
| product-measurement-units | attributes | object | List of attributes of the product measurement unit. |
| product-measurement-units| name| string| Measurement unit name. |
| product-measurement-units| defaultPrecision |integer| The default ratio between a sales unit and a base unit. It is used when precision for a related sales unit is not defined. |

For other attributes of the included resources, see:

*     [Retrieve Price of a Concrete Product](#prices-response-attributes) for price response attributes.
*     [Retrieve Sales Units](#sales-units-response-attributes) for sales units and product measurement units response attributes.
*     [Retrieve Abstract Products](#abstract-products-response-attributes) for product lables response attributes.





## Retrieve Availability of an Abstract Product
To retrieve availability of an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-availabilities**


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get abailability for. |

### Request

Request sample : `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities`

### Response

Response sample:

```json
{
    "data": [{
        "type": "abstract-product-availabilities",
        "id": "001",
        "attributes": {
            "availability": true,
            "quantity": 10
        },
        "links": {
            "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities"
        }
    }],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities"
    }
}
```


| Field | Type | Description |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability |
| quantity | Integer | Available stock (all warehouses aggregated) |




## Retrieve Availability of a Concrete Product

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-availabilities**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get abailability for. |

### Request

Request sample: `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities`


### Response
Response sample:

```json
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
            "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
        }
    }],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
    }
}
```

| Field | Type | Description |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability |
| quantity|Integer|Available stock (all warehouses aggregated) |
| isNeverOutOfStock | Boolean | A boolean to show if this is a product that is never out of stock |



## Retrieve Price of an Abstract Product

To retrieve price of an abstract prdocut, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-prices**

---


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get the price of. |


### Request


| Request  | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices` | Retrieve the price of the `001` product.  |
| `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices?currency=CHF&priceMode=GROSS_MODE` | Retrieve the gross price of the `001` product in Swiss Franc. |

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| currency | Defines the currency to retrieve the price in. | USD, EUR, CHF |
| priceMode | 	Defines the price mode to retrieve the price in.  | GROSS_MODE, NET_MODE |




### Response

Response sample:

```json
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
                "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices"
    }
}
```

Response sample with a gross price in Swiss Franc:

```
{
    "data": [
        {
            "type": "abstract-product-prices",
            "id": "001",
            "attributes": {
                "price": 11499,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 11499,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 14449,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/001/items?currency=CHF&priceMode=GROSS_MODE"
    }
}
```


<a name="prices-response-attributes"></a>
| Field | Type | Description |
| --- | --- | --- |
| price | Integer | Price to pay for that product in cents |
| priceTypeName|String|Price type |
| netAmount|Integer|Net price in cents|
|grossAmount|Integer|Gross price in cents|
|currency.code|String|Currency code|
|currency.name|String|Currency name|
|currency.symbol | String | Currency symbol |




## Retrieve Price of a Concrete Product

To retrieve price of an concrete prdocut, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-prices**

---


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get the price of. |



### Request


| Request  | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices` | Retrieve the price of the `001_25904006` product.  |
| `GET  http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices?currency=CHF&priceMode=GROSS_MODE` | Retrieve the gross price of the `001_25904006` product in Swiss Franc. |

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| currency | Defines the currency to retrieve the price in. | USD, EUR, CHF |
| priceMode | 	Defines the price mode to retrieve the price in.  | GROSS_MODE, NET_MODE |



### Response


Response sample:
```json
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
                "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
    }
}
```

Response sample with a gross price in Swiss Franc:

```
{
    "data": [
        {
            "type": "concrete-product-prices",
            "id": "001_25904006",
            "attributes": {
                "price": 11499,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 11499,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 14449,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/items?currency=CHF&priceMode=GROSS_MODE"
    }
}
```



| Field | Type | Description |
| --- | --- | --- |
| price | Integer | Price to pay for that product in cents |
| priceTypeName|String|Price type |
| netAmount|Integer|Net price in cents|
|grossAmount|Integer|Gross price in cents|
|currency.code|String|Currency code|
|currency.name|String|Currency name|
|currency.symbol | String | Currency symbol |



## Retrieve Tax Sets
To retrieve tax rates of a product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/tax-sets**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get the tax rates of. |

### Request

Request sample: `GET http://glue.mysprykershop.com/abstract-products/209/product-tax-sets`

### Response

Response sample:
```json
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
                "self": "http://glue.mysprykershop.com/abstract-products/177/product-tax-sets"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/177/product-tax-sets"
    }
}
```




| Field | Description |
| --- | --- |
| name | Tax set name |
| restTaxRates.name | Tax rate name |
| restTaxRates.rate | Tax rate |
| restTaxRates.country | Applicable country for the tax rate |


 



## Retrieve Image Sets of an Abstract Product
To retrieve image sets of an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-image-sets**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get the image sets of. |

### Request

Request sample : `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-image-sets`


### Response

Response sample:
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
                "self": "http://glue.mysprykershop.com/abstract-products/177/abstract-product-image-sets"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/177/abstract-product-image-sets"
    }
}
```


| Field | Description |
| --- | --- |
| name | Image set name |
| externalUrlLarge | URLs to the image per image set per image |
| externalUrlSmall | URLs to the image per image set per image |




## Retrieve Image Sets of a Concrete Product
To retrieve image sets of a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-image-sets**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get the image sets of. |

### Request
Request sample : `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-image-sets`


### Response


Response sample:

```json
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
                "self": "http://glue.mysprykershop.com/concrete-products/177_25913296/concrete-product-image-sets"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/177_25913296/concrete-product-image-sets"
    }
}
```

| Field | Description |
| --- | --- |
| name | Image set name |
| externalUrlLarge | URLs to the image per image set per image |
| externalUrlSmall | URLs to the image per image set per image |


## Retrieve Sales Units

To get sales unit of a product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/sales-units**

---


| Path parameter | Description |
| --- | --- |
|***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get sales units for. |

### Request
Request sample: `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units`

### Response
Response sample:

```json
{
    "data": [
        {
            "type": "sales-units",
            "id": "34",
            "attributes": {
                "conversion": 0.01,
                "precision": 10,
                "isDisplayed": true,
                "isDefault": false,
                "productMeasurementUnitCode": "CMET"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/34"
            }
        },
        {
            "type": "sales-units",
            "id": "33",
            "attributes": {
                "conversion": 1,
                "precision": 100,
                "isDisplayed": true,
                "isDefault": true,
                "productMeasurementUnitCode": "METR"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/33"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units"
    }
}
```

<a name="sales-units-response-attributes"></a>

| Attribute | Type | Description |
| --- | --- | --- |
| conversion | integer | Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions. |
| precision | integer | Ratio between a sales unit and a base unit. |
| is displayed | boolean | Defines if the sales unit is displayed on the product details page. |
| is default | boolean | Defines if the sales unit is selected by default on the product details page. |
| measurementUnitCode | string | Code of the measurement unit. | 


See [Retrieving Measurement Units](https://documentation.spryker.com/docs/en/retrieving-measurement-units) for more information on managing the sales units.


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
