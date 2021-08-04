---
title: Retrieving concrete products
originalLink: https://documentation.spryker.com/v6/docs/retrieving-concrete-products
redirect_from:
  - /v6/docs/retrieving-concrete-products
  - /v6/docs/en/retrieving-concrete-products
---

This endpoint allows to retrieve general information about concrete products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](https://documentation.spryker.com/docs/glue-api-products-feature-integration)
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/glue-api-measurement-units-feature-integration)
* [Glue API: Product Options Feature Integration](https://documentation.spryker.com/docs/glue-product-options-feature-integration)
* [Glue API: Product Labels feature integration](https://documentation.spryker.com/docs/glue-api-product-labels-feature-integration)


## Retrieve a concrete product 
To retrieve general information about a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get information for. |

### Request 

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | concrete-product-image-sets, concrete-product-availabilities, product-options, product-reviews, product-offers, concrete-product-prices, product-measurement-units, sales-units, product-labels | 
| fields | 	Filters out the fields to be retrieved.  | name, image, description |

{% info_block warningBox "Performance" %}

* For performance and bandwidth usage optimization, we recommend filtering out only the needed information using the `fields` string parameter.

* If you include more resources, you can still use the `fields` string parameter to return only the needed fields. For example, `GET http://glue.mysprykershop.com/concrete-products/fish-1-1?include=sales-units&fields[concrete-products]=name,description&fields[sales-units]=conversion,precision`.


{% endinfo_block %}   


| Request  | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006` | Get information about the `001_25904006` product.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-image-sets` | Get information about the `001_25904006` product with its image sets.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-availabilities` | Get information about the `001_25904006` product with its availability.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-prices` | Get information about the `001_25904006` product with its prices.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-options` | Get information about the `001_25904006` product with its product options.  |
| `GET https://glue.mysprykershop.com/concrete-products/035_17360369?include=product-reviews` | Get information about the `001_25904006` product with its product reviews.  |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-offers` | Get information about the `001_25904006` product with its product offers.  |
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
 
 <details open>
    <summary>Response sample with product image sets</summary>
    
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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-image-sets"
        },
        "relationships": {
            "concrete-product-image-sets": {
                "data": [
                    {
                        "type": "concrete-product-image-sets",
                        "id": "001_25904006"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-image-sets",
            "id": "001_25904006",
            "attributes": {
                "imageSets": [
                    {
                        "name": "default",
                        "images": [
                            {
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904006-8438.jpg",
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904006-8438.jpg"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-image-sets"
            }
        }
    ]
}
```
    
</details>

 <details open>
    <summary>Response sample with product availability</summary>
    
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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-availabilities"
        },
        "relationships": {
            "concrete-product-availabilities": {
                "data": [
                    {
                        "type": "concrete-product-availabilities",
                        "id": "001_25904006"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-availabilities",
            "id": "001_25904006",
            "attributes": {
                "isNeverOutOfStock": false,
                "availability": true,
                "quantity": "10.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
            }
        }
    ]
}
```
    
</details>

 <details open>
    <summary>Response sample with concrete product prices</summary>
    
```json
{
    "data": {
        "type": "concrete-products",
        "id": "001_25904006",
        "attributes": {
            "sku": "001_25904006",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "name": "Canon IXUS 160",
            "description": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results while framing using Live View Control and enjoy sharing them with friends using the 6.8 cm (2.7”) LCD screen. Combine with a Canon Connect Station and you can easily share your photos and movies with the world on social media sites and online albums like irista, plus enjoy watching them with family and friends on an HD TV. Effortlessly enjoy great shots of friends thanks to Face Detection technology. It detects multiple faces in a single frame making sure they remain in focus and with optimum brightness. Face Detection also ensures natural skin tones even in unusual lighting conditions.",
            "attributes": {
                "megapixel": "20 MP",
                "flash_range_tele": "4.2-4.9 ft",
                "memory_slots": "1",
                "usb_version": "2",
                "brand": "Canon",
                "color": "Red"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "metaTitle": "Canon IXUS 160",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Add a personal touch Make shots your own with quick and easy control over picture settings such as brightness and colour intensity. Preview the results whi",
            "attributeNames": {
                "megapixel": "Megapixel",
                "flash_range_tele": "Flash range (tele)",
                "memory_slots": "Memory slots",
                "usb_version": "USB version",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=concrete-product-prices"
        },
        "relationships": {
            "concrete-product-prices": {
                "data": [
                    {
                        "type": "concrete-product-prices",
                        "id": "001_25904006"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-prices",
            "id": "001_25904006",
            "attributes": {
                "price": 9999,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9999,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 12564,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ]
}
```
    
</details>

 <details open>
    <summary>Response sample with product options</summary>
    
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
            "self": "https://glue.mysprykershop.com/concrete-products/001_25904006?include=product-options"
        },
        "relationships": {
            "product-options": {
                "data": [
                    {
                        "type": "product-options",
                        "id": "OP_insurance"
                    },
                    {
                        "type": "product-options",
                        "id": "OP_gift_wrapping"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-options",
            "id": "OP_insurance",
            "attributes": {
                "optionGroupName": "Insurance",
                "sku": "OP_insurance",
                "optionName": "Two (2) year insurance coverage",
                "price": 10000,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/product-options/OP_insurance"
            }
        },
        {
            "type": "product-options",
            "id": "OP_gift_wrapping",
            "attributes": {
                "optionGroupName": "Gift wrapping",
                "sku": "OP_gift_wrapping",
                "optionName": "Gift wrapping",
                "price": 500,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/product-options/OP_gift_wrapping"
            }
        }
    ]
}
```
    
</details>

 <details open>
    <summary>Response sample with reviews</summary>
    
```json
{
    "data": {
        "type": "concrete-products",
        "id": "035_17360369",
        "attributes": {
            "sku": "035_17360369",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": 4.7,
            "reviewCount": 3,
            "name": "Canon PowerShot N",
            "description": "Creative Shot Originality is effortless with Creative Shot. Simply take a shot and the camera will analyse the scene then automatically generate five creative images plus the original unaltered photo - capturing the same subject in a variety of artistic and surprising ways. The unique symmetrical, metal-bodied design is strikingly different with an ultra-modern minimalist style - small enough to keep in your pocket and stylish enough to take anywhere. HS System excels in low light allowing you to capture the real atmosphere of the moment without flash or a tripod. Advanced DIGIC 5 processing and a high-sensitivity 12.1 Megapixel CMOS sensor give excellent image quality in all situations.",
            "attributes": {
                "focus": "TTL",
                "field_of_view": "100%",
                "display": "LCD",
                "sensor_type": "CMOS",
                "brand": "Canon",
                "color": "Silver"
            },
            "superAttributesDefinition": [
                "color"
            ],
            "metaTitle": "Canon PowerShot N",
            "metaKeywords": "Canon,Entertainment Electronics",
            "metaDescription": "Creative Shot Originality is effortless with Creative Shot. Simply take a shot and the camera will analyse the scene then automatically generate five creat",
            "attributeNames": {
                "focus": "Focus",
                "field_of_view": "Field of view",
                "display": "Display",
                "sensor_type": "Sensor type",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/035_17360369?include=product-reviews"
        },
        "relationships": {
            "product-reviews": {
                "data": [
                    {
                        "type": "product-reviews",
                        "id": "29"
                    },
                    {
                        "type": "product-reviews",
                        "id": "28"
                    },
                    {
                        "type": "product-reviews",
                        "id": "30"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-reviews",
            "id": "29",
            "attributes": {
                "rating": 5,
                "nickname": "Maria",
                "summary": "Curabitur varius, dui ac vulputate ullamcorper",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-reviews/29"
            }
        },
        {
            "type": "product-reviews",
            "id": "28",
            "attributes": {
                "rating": 5,
                "nickname": "Spencor",
                "summary": "Donec vestibulum lectus ligula",
                "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-reviews/28"
            }
        },
        {
            "type": "product-reviews",
            "id": "30",
            "attributes": {
                "rating": 4,
                "nickname": "Maggie",
                "summary": "Aliquam erat volutpat",
                "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-reviews/30"
            }
        }
    ]
}
```
    
</details>



<a name="concrete-products-response-attributes"></a>


| Attribute | Type | Description |
| --- | --- | --- |
| sku | String | SKU of the concrete product. |
| name | String | Name of the concrete product. |
| description | String | Description of the concrete product. |
| attributes | Object | List of attribute keys and their values for the product. |
| superAttributeDefinition | String | List of attributes that are flagged as super attributes. |
| metaTitle|String|Meta title of the product. |
|metaKeywords|String|Meta keywords of the product. |
|metaDescription|String|Meta description of the product. |
|attributeNames | String | List of attribute keys and their translations. |
| productAbstractSku | String | Unique identifier of the abstract product owning this concrete product. |


| Included resource | Attribute |Type |Description |
| --- | --- | --- | --- |
| product-options | sku | String | Specifies the SKU of the product option. |
| product-options | optionName | String | Specifies the option name. |
| product-options | optionGroupName | String | Specifies the name of the group to which the option belongs. |
| product-options | price | Integer | Specifies the option price in cents. |
| product-options | currencyIsoCode | String | Specifies the ISO 4217 code of the currency in which the product option price is specified. |

For other attributes of the included resources, see:


*     [Retrieve sales units of a concrete product](https://documentation.spryker.com/docs/retrieving-sales-units#sales-units-response-attributes)
*     [Retrieve a measurement unit](https://documentation.spryker.com/docs/retrieving-measurement-units#measurement-units-response-attributes)
*     [Retrieve image sets of a concrete product](https://documentation.spryker.com/docs/retrieving-image-sets-of-concrete-products#concrete-image-sets-response-attributes)
*     [Retrieve availability of a concrete product](https://documentation.spryker.com/docs/retrieving-concrete-product-availability#concrete-product-availability-response-attributes)
*     [Retrieve prices of a concrete product](https://documentation.spryker.com/docs/retrieving-concrete-product-prices#concrete-product-prices-response-attributes)
*     [Retrieve a product label](https://documentation.spryker.com/docs/retrieving-product-labels#product-labels-response-attributes)
*     [Retrieve product ratings and reviews](https://documentation.spryker.com/docs/retrieving-product-ratings-and-reviews#product-ratings-and-reviews-response-attributes)


## Possible errors

| Code | Meaning |
| --- | --- |
| 302 | Concrete product is not found. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
