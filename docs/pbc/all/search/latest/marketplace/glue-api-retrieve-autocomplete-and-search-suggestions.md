---
title: "Glue API: Retrieve autocomplete and search suggestions"
description: This document provides information about which endpoints to use to get search and auto-completion suggestions for your products, categories, and CMS fields
template: glue-api-storefront-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202212.0/retrieving-autocomplete-and-search-suggestions.html
  - /docs/scos/dev/glue-api-guides/201811.0/retrieving-autocomplete-and-search-suggestions.html
related:
  - title: Searching the product catalog
    link: docs/pbc/all/search/latest/marketplace/glue-api-search-the-product-catalog.html
---

In addition to [catalog search](/docs/pbc/all/search/latest/base-shop/manage-using-glue-api/glue-api-search-the-product-catalog.html), Glue API lets you retrieve autocomplete suggestions for products, categories, and CMS pages. The feature lets developers predict search strings and provide customers with available options.

In your development, this resource can help you to enhance the customer experience by providing the relevant information for search, product filters, shopping cart, checkout, order history, wishlist, and many more.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see [Install the Catalog Glue API](/docs/pbc/all/search/latest/base-shop/install-and-upgrade/install-features-and-glue-api/install-the-catalog-glue-api.html).

## Retrieve a search suggestion

To retrieve a search suggestion, send the request:

***
`GET` **/catalog-search-suggestions**
***

### Request

| QUERY PARAMETER | DESCRIPTION  | POSSIBLE VALUES|
| ---------------- | -------------------- | -------------------- |
| q    | Restricts the returned items to the values of the provided parameters. | <ul><li>{% raw %}{{abstract_product_sku}}{% endraw %}</li><li>{% raw %}{{concrete_product_sku}}{% endraw %}</li><li>{% raw %}{{abstract_product_name}}{% endraw %}</li><li>{% raw %}{{product_attribute}} (for example, brand, color)—to provide multiple product attributes, use '+'</li><li>{% raw %}{{category_name}}{% endraw %}</li></ul> |
| include | Adds resource relationships to the request. | abstract-products  |
| currency | Sets a currency. | {% raw %}{{currency}}{% endraw %} |
| priceMode  | Sets a price mode.  | <ul><li>NET_MODE</li><li>GROSS_MODE</li></ul> |

| REQUEST | USAGE |
| ---------------------- | ------------------------ |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions` | Retrieve search suggestions. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=` | Retrieve suggestions for an empty search string.    |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=058` | Retrieve search suggestions for the SKU `058`. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=058&include=abstract-products` | Retrieve search suggestions for the SKU `058`, including product details. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=Acer Liquid Jade` | Retrieve search suggestions for the `Acer Liquid Jade` name. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=Ac` | Retrieve search suggestions for the two letters: `Ac`. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=acer+cb5-31` | Retrieve search suggestions for the 11 symbols: `acer+cb5-31`. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=058_24245592` | Retrieve search suggestions for the SKU `058_24245592`. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=acer+red` | Retrieve search suggestions for the following attributes: brand `acer` and color `red`. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=acer&currency=CHF` | Set the *CHF* currency in search suggestions.  |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=Sony&currency=EUR&priceMode=GROSS_MODE` | Retrieve search suggestions for the phrase `Sony` with the `EUR` currency and `GROSS_MODE` price mode. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=telecom-%26-navigation` | Retreive search suggestions for the phrase `telecom&navigation`.          |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=Smart` | Retrieve search suggestions for the word `Smart`, which is a part of a category name. |
| `GET https://glue.mysprykershop.com/catalog-search-suggestions?q=video%20king` | Retrieve search suggestions for the `video king` phrase, which is a merchant name. |

### Response

<details>
<summary>Response sample: retrieve suggestions for an empty search string</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q="
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q="
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for an abstract product</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "058_24245592",
                    "058_26175504"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 26432,
                        "abstractName": "Acer Liquid Jade",
                        "abstractSku": "058",
                        "url": "/en/acer-liquid-jade-58",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24245592_medium_1483521161_4318_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24245592-2688.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=058"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=058"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve suggestions for an abstract product with abstract product details included</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "058_24245592",
                    "058_26175504"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 26432,
                        "abstractName": "Acer Liquid Jade",
                        "abstractSku": "058",
                        "url": "/en/acer-liquid-jade-58",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24245592_medium_1483521161_4318_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24245592-2688.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=058&include=abstract-products"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "058"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=058&include=abstract-products"
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "058",
            "attributes": {
                "sku": "058",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Acer Liquid Jade",
                "description": "Edge Handle Assign a colour and place on People Edge to five of your favourite contacts. Reach out to them at any time by simply swiping inwards from the Edge Handle. When words aren't enough, send a poke or an emoticon to your People Edge contacts. OnCircle lets you communicate in ways that really count. When it comes to your favourite tracks, sound quality matters. Enjoy rich, balanced audio with Bluetooth audio accessories that support UHQ Audio. Celebrations are always better when you are sharing. Livestream the fun straight from your Galaxy S6 edge+ using the camera's Live Broadcast function. 4GB RAM and LTE Cat.9 support ensure uninterrupted streaming. No more shaky handheld videos. Video Digital Imaging Stabilisation meets Optical Image Stabilisation to ensure you get clear and steady footage every time.",
                "attributes": {
                    "form_factor": "Bar",
                    "sim_card_type": "NanoSIM",
                    "display_type": "IPS",
                    "internal_ram": "2048 MB",
                    "brand": "Acer",
                    "color": "White"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "superAttributes": {
                    "series": [
                        "Jade Plus",
                        "Jade Z"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "058_24245592",
                        "058_26175504"
                    ],
                    "super_attributes": {
                        "series": [
                            "Jade Plus",
                            "Jade Z"
                        ]
                    },
                    "attribute_variants": {
                        "series:Jade Plus": {
                            "id_product_concrete": "058_24245592"
                        },
                        "series:Jade Z": {
                            "id_product_concrete": "058_26175504"
                        }
                    }
                },
                "metaTitle": "Acer Liquid Jade",
                "metaKeywords": "Acer,Communication Electronics",
                "metaDescription": "Edge Handle Assign a colour and place on People Edge to five of your favourite contacts. Reach out to them at any time by simply swiping inwards from the E",
                "attributeNames": {
                    "form_factor": "Form factor",
                    "sim_card_type": "SIM card type",
                    "display_type": "Display type",
                    "internal_ram": "Internal RAM",
                    "brand": "Brand",
                    "color": "Color",
                    "series": "Series"
                },
                "url": "/en/acer-liquid-jade-58"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/058"
            }
        }
    ]
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for an abstract product name</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "acer liquid jade"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 41837,
                        "abstractName": "Acer Liquid Jade",
                        "abstractSku": "060",
                        "url": "/en/acer-liquid-jade-60",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/26027598-6953.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/26027598-6953.jpg"
                            }
                        ]
                    },
                    {
                        "price": 36742,
                        "abstractName": "Acer Liquid Jade",
                        "abstractSku": "059",
                        "url": "/en/acer-liquid-jade-59",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/26175504-2265.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/26175504-2265.jpg"
                            }
                        ]
                    },
                    {
                        "price": 26432,
                        "abstractName": "Acer Liquid Jade",
                        "abstractSku": "058",
                        "url": "/en/acer-liquid-jade-58",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24245592_medium_1483521161_4318_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24245592-2688.jpg"
                            }
                        ]
                    },
                    {
                        "price": 1879,
                        "abstractName": "Acer Liquid Z630",
                        "abstractSku": "054",
                        "url": "/en/acer-liquid-z630-54",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29406182_3072.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406182_3072.png"
                            }
                        ]
                    },
                    {
                        "price": 6277,
                        "abstractName": "Acer Liquid Leap",
                        "abstractSku": "100",
                        "url": "/en/acer-liquid-leap-100",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24675726_medium_1483613008_9797_25362.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24675726-2268.jpg"
                            }
                        ]
                    },
                    {
                        "price": 19137,
                        "abstractName": "Acer Liquid Z630",
                        "abstractSku": "055",
                        "url": "/en/acer-liquid-z630-55",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29406184_6175.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406182_3072.png"
                            }
                        ]
                    },
                    {
                        "price": 33265,
                        "abstractName": "Acer Liquid Zest 4G",
                        "abstractSku": "056",
                        "url": "/en/acer-liquid-zest-4g-56",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/35874112_7947608372.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_mediums/35874112_7947608372.jpg"
                            }
                        ]
                    },
                    {
                        "price": 41339,
                        "abstractName": "Acer Liquid Zest 4G",
                        "abstractSku": "057",
                        "url": "/en/acer-liquid-zest-4g-57",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32007641_9851.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/32007641_9851.png"
                            }
                        ]
                    },
                    {
                        "price": 32909,
                        "abstractName": "Acer Leap Active",
                        "abstractSku": "101",
                        "url": "/en/acer-leap-active-101",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29727910_5628.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29727910_5628.jpg"
                            }
                        ]
                    },
                    {
                        "price": 9999,
                        "abstractName": "Acer Veriton 6",
                        "abstractSku": "113",
                        "url": "/en/acer-veriton-6-113",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29885591_medium_1480617592_5216_14709.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29885591_7502.png"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Acer Liquid Jade"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Acer Liquid Jade"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for two letters</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "black",
                    "acer",
                    "acer liquid jade",
                    "acer extensa m2610",
                    "samsung galaxy ace",
                    "acer aspire switch 10 e",
                    "acer liquid z630",
                    "acer liquid zest 4g",
                    "acer aspire s7",
                    "acer chromebook cb5-311"
                ],
                "categories": [],
                "cmsPages": [
                    {
                        "name": "Imprint",
                        "url": "/en/imprint"
                    },
                    {
                        "name": "Data Privacy",
                        "url": "/en/privacy"
                    },
                    {
                        "name": "Demo Landing Page",
                        "url": "/en/demo-landing-page"
                    },
                    {
                        "name": "GTC",
                        "url": "/en/gtc"
                    },
                    {
                        "name": "Return policy",
                        "url": "/en/return-policy"
                    }
                ],
                "abstractProducts": [
                    {
                        "price": 29678,
                        "abstractName": "Samsung Galaxy Ace",
                        "abstractSku": "070",
                        "url": "/en/samsung-galaxy-ace-70",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/13374503-9343.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/13374503-9343.jpg"
                            }
                        ]
                    },
                    {
                        "price": 32909,
                        "abstractName": "Acer Leap Active",
                        "abstractSku": "101",
                        "url": "/en/acer-leap-active-101",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29727910_5628.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29727910_5628.jpg"
                            }
                        ]
                    },
                    {
                        "price": 9999,
                        "abstractName": "Acer Veriton 6",
                        "abstractSku": "113",
                        "url": "/en/acer-veriton-6-113",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29885591_medium_1480617592_5216_14709.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29885591_7502.png"
                            }
                        ]
                    },
                    {
                        "price": 20012,
                        "abstractName": "Acer Iconia B1-850",
                        "abstractSku": "156",
                        "url": "/en/acer-iconia-b1-850-156",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32018944_9673.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/32018944_9673.jpg"
                            }
                        ]
                    },
                    {
                        "price": 40651,
                        "abstractName": "Acer Aspire Switch 10 E",
                        "abstractSku": "132",
                        "url": "/en/acer-aspire-switch-10-e-132",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30619567_3161.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30619567_3161.jpg"
                            }
                        ]
                    },
                    {
                        "price": 35435,
                        "abstractName": "Acer Aspire Switch 10 E",
                        "abstractSku": "133",
                        "url": "/en/acer-aspire-switch-10-e-133",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/31743669_0971.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/31743669_0971.png"
                            }
                        ]
                    },
                    {
                        "price": 33265,
                        "abstractName": "Acer Chromebook C730-C8T7",
                        "abstractSku": "136",
                        "url": "/en/acer-chromebook-c730-c8t7-136",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24425591_medium_1483525296_3275_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24425591-5275.jpg"
                            }
                        ]
                    },
                    {
                        "price": 1879,
                        "abstractName": "Acer Liquid Z630",
                        "abstractSku": "054",
                        "url": "/en/acer-liquid-z630-54",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29406182_3072.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406182_3072.png"
                            }
                        ]
                    },
                    {
                        "price": 6277,
                        "abstractName": "Acer Liquid Leap",
                        "abstractSku": "100",
                        "url": "/en/acer-liquid-leap-100",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24675726_medium_1483613008_9797_25362.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24675726-2268.jpg"
                            }
                        ]
                    },
                    {
                        "price": 1879,
                        "abstractName": "Acer Aspire S7",
                        "abstractSku": "134",
                        "url": "/en/acer-aspire-s7-134",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29759322_2351.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29759322_2351.png"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": [
                    {
                        "name": "Imprint",
                        "url": "/en/imprint"
                    },
                    {
                        "name": "Data Privacy",
                        "url": "/en/privacy"
                    },
                    {
                        "name": "Demo Landing Page",
                        "url": "/en/demo-landing-page"
                    },
                    {
                        "name": "GTC",
                        "url": "/en/gtc"
                    },
                    {
                        "name": "Return policy",
                        "url": "/en/return-policy"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Ac"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Ac"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for 11 symbols</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "acer chromebook cb5-311"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 19137,
                        "abstractName": "Acer Chromebook CB5-311",
                        "abstractSku": "135",
                        "url": "/en/acer-chromebook-cb5-311-135",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29836399_medium_1480606969_3257_31346.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29836399_4420.jpg"
                            }
                        ]
                    },
                    {
                        "price": 9999,
                        "abstractName": "Acer Veriton 6",
                        "abstractSku": "113",
                        "url": "/en/acer-veriton-6-113",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29885591_medium_1480617592_5216_14709.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29885591_7502.png"
                            }
                        ]
                    },
                    {
                        "price": 20012,
                        "abstractName": "Acer Iconia B1-850",
                        "abstractSku": "156",
                        "url": "/en/acer-iconia-b1-850-156",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32018944_9673.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/32018944_9673.jpg"
                            }
                        ]
                    },
                    {
                        "price": 40651,
                        "abstractName": "Acer Aspire Switch 10 E",
                        "abstractSku": "132",
                        "url": "/en/acer-aspire-switch-10-e-132",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30619567_3161.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30619567_3161.jpg"
                            }
                        ]
                    },
                    {
                        "price": 35435,
                        "abstractName": "Acer Aspire Switch 10 E",
                        "abstractSku": "133",
                        "url": "/en/acer-aspire-switch-10-e-133",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/31743669_0971.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/31743669_0971.png"
                            }
                        ]
                    },
                    {
                        "price": 33265,
                        "abstractName": "Acer Chromebook C730-C8T7",
                        "abstractSku": "136",
                        "url": "/en/acer-chromebook-c730-c8t7-136",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24425591_medium_1483525296_3275_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24425591-5275.jpg"
                            }
                        ]
                    },
                    {
                        "price": 1879,
                        "abstractName": "Acer Liquid Z630",
                        "abstractSku": "054",
                        "url": "/en/acer-liquid-z630-54",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29406182_3072.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406182_3072.png"
                            }
                        ]
                    },
                    {
                        "price": 6277,
                        "abstractName": "Acer Liquid Leap",
                        "abstractSku": "100",
                        "url": "/en/acer-liquid-leap-100",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24675726_medium_1483613008_9797_25362.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24675726-2268.jpg"
                            }
                        ]
                    },
                    {
                        "price": 1879,
                        "abstractName": "Acer Aspire S7",
                        "abstractSku": "134",
                        "url": "/en/acer-aspire-s7-134",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29759322_2351.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29759322_2351.png"
                            }
                        ]
                    },
                    {
                        "price": 41339,
                        "abstractName": "Acer TravelMate P246-M",
                        "abstractSku": "137",
                        "url": "/en/acer-travelmate-p246-m-137",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29283479_6068.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29283479_6068.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=acer cb5-31"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=acer cb5-31"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for a concrete product SKU</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "058_24245592"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 26432,
                        "abstractName": "Acer Liquid Jade",
                        "abstractSku": "058",
                        "url": "/en/acer-liquid-jade-58",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24245592_medium_1483521161_4318_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24245592-2688.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=058_24245592"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=058_24245592"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve suggestions for multiple product attributes</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 17774,
                        "abstractName": "Sony SW2 SmartWatch",
                        "abstractSku": "108",
                        "url": "/en/sony-sw2-smartwatch-108",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_21047360_medium_1482828045_101_30852.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21047360-4814.jpg"
                            }
                        ]
                    },
                    {
                        "price": 9999,
                        "abstractName": "Canon IXUS 160",
                        "abstractSku": "001",
                        "url": "/en/canon-ixus-160-1",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904006-8438.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904006-8438.jpg"
                            }
                        ]
                    },
                    {
                        "price": 20012,
                        "abstractName": "Acer Iconia B1-850",
                        "abstractSku": "156",
                        "url": "/en/acer-iconia-b1-850-156",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32018944_9673.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/32018944_9673.jpg"
                            }
                        ]
                    },
                    {
                        "price": 6277,
                        "abstractName": "Acer Liquid Leap",
                        "abstractSku": "100",
                        "url": "/en/acer-liquid-leap-100",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24675726_medium_1483613008_9797_25362.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24675726-2268.jpg"
                            }
                        ]
                    },
                    {
                        "price": 34600,
                        "abstractName": "Canon IXUS 180",
                        "abstractSku": "010",
                        "url": "/en/canon-ixus-180-10",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30692994_4933.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30692994_4933.jpg"
                            }
                        ]
                    },
                    {
                        "price": 15799,
                        "abstractName": "Canon PowerShot SX610",
                        "abstractSku": "040",
                        "url": "/en/canon-powershot-sx610-40",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904665-1545.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904665-1545.jpg"
                            }
                        ]
                    },
                    {
                        "price": 5699,
                        "abstractName": "Canon IXUS 165",
                        "abstractSku": "013",
                        "url": "/en/canon-ixus-165-13",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904584-3409.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904584-3409.jpg"
                            }
                        ]
                    },
                    {
                        "price": 2800,
                        "abstractName": "Canon PowerShot SC620",
                        "abstractSku": "032",
                        "url": "/en/canon-powershot-sc620-32",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32125551_0486.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/32125551_0486.jpg"
                            }
                        ]
                    },
                    {
                        "price": 16999,
                        "abstractName": "Canon PowerShot SX710",
                        "abstractSku": "037",
                        "url": "/en/canon-powershot-sx710-37",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/25904011_5202.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/25904011_5202.jpg"
                            }
                        ]
                    },
                    {
                        "price": 4900,
                        "abstractName": "Sony Cyber-shot DSC-WX500",
                        "abstractSku": "027",
                        "url": "/en/sony-cyber-shot-dsc-wx500-27",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/7822599-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/medium/7822599-Sony.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=acer red"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=acer red"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions with a currency set</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "acer",
                    "acer liquid jade",
                    "acer extensa m2610",
                    "acer aspire switch 10 e",
                    "acer liquid z630",
                    "acer liquid zest 4g",
                    "acer aspire s7",
                    "acer chromebook cb5-311",
                    "acer travelmate p246-m",
                    "acer travelmate p258-m"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 11499,
                        "abstractName": "Acer Veriton 6",
                        "abstractSku": "113",
                        "url": "/en/acer-veriton-6-113",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29885591_medium_1480617592_5216_14709.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29885591_7502.png"
                            }
                        ]
                    },
                    {
                        "price": 23014,
                        "abstractName": "Acer Iconia B1-850",
                        "abstractSku": "156",
                        "url": "/en/acer-iconia-b1-850-156",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32018944_9673.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/32018944_9673.jpg"
                            }
                        ]
                    },
                    {
                        "price": 46749,
                        "abstractName": "Acer Aspire Switch 10 E",
                        "abstractSku": "132",
                        "url": "/en/acer-aspire-switch-10-e-132",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30619567_3161.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30619567_3161.jpg"
                            }
                        ]
                    },
                    {
                        "price": 40750,
                        "abstractName": "Acer Aspire Switch 10 E",
                        "abstractSku": "133",
                        "url": "/en/acer-aspire-switch-10-e-133",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/31743669_0971.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/31743669_0971.png"
                            }
                        ]
                    },
                    {
                        "price": 38255,
                        "abstractName": "Acer Chromebook C730-C8T7",
                        "abstractSku": "136",
                        "url": "/en/acer-chromebook-c730-c8t7-136",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24425591_medium_1483525296_3275_9985.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24425591-5275.jpg"
                            }
                        ]
                    },
                    {
                        "price": 2161,
                        "abstractName": "Acer Liquid Z630",
                        "abstractSku": "054",
                        "url": "/en/acer-liquid-z630-54",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29406182_3072.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406182_3072.png"
                            }
                        ]
                    },
                    {
                        "price": 7219,
                        "abstractName": "Acer Liquid Leap",
                        "abstractSku": "100",
                        "url": "/en/acer-liquid-leap-100",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_24675726_medium_1483613008_9797_25362.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24675726-2268.jpg"
                            }
                        ]
                    },
                    {
                        "price": 2161,
                        "abstractName": "Acer Aspire S7",
                        "abstractSku": "134",
                        "url": "/en/acer-aspire-s7-134",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29759322_2351.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29759322_2351.png"
                            }
                        ]
                    },
                    {
                        "price": 47540,
                        "abstractName": "Acer TravelMate P246-M",
                        "abstractSku": "137",
                        "url": "/en/acer-travelmate-p246-m-137",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/29283479_6068.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29283479_6068.jpg"
                            }
                        ]
                    },
                    {
                        "price": 30397,
                        "abstractName": "Acer TravelMate P258-M",
                        "abstractSku": "138",
                        "url": "/en/acer-travelmate-p258-m-138",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30046855_5806.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30046855_5806.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=acer&currency=CHF"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=acer&currency=CHF"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions with a currency and a price mode set</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "sony",
                    "sony experts",
                    "sony cyber-shot dsc-w830",
                    "sony smartwatch 3",
                    "sony cyber-shot dsc-wx350",
                    "sony cyber-shot dsc-wx500",
                    "sony xperia z3 compact",
                    "sony cyber-shot dsc-w800",
                    "sony cyber-shot dsc-wx220",
                    "sony fdr-axp33"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 3918,
                        "abstractName": "Sony NEX-VG20EH",
                        "abstractSku": "202",
                        "url": "/en/sony-nex-vg20eh-202",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/5782479-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/5782479-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "price": 20254,
                        "abstractName": "Sony NEX-VG20EH",
                        "abstractSku": "201",
                        "url": "/en/sony-nex-vg20eh-201",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/11217755-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/11217755-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "price": 14554,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "abstractSku": "077",
                        "url": "/en/sony-xperia-z3-compact-77",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24584210-216.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24584210-216.jpg"
                            }
                        ]
                    },
                    {
                        "price": 25214,
                        "abstractName": "Sony Xperia Z3",
                        "abstractSku": "080",
                        "url": "/en/sony-xperia-z3-80",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24394206-8583.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24394206-8583.jpg"
                            }
                        ]
                    },
                    {
                        "price": 6277,
                        "abstractName": "Sony HDR-MV1",
                        "abstractSku": "198",
                        "url": "/en/sony-hdr-mv1-198",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/19692589-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/19692589-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "price": 26641,
                        "abstractName": "Sony NEX-VG30E",
                        "abstractSku": "203",
                        "url": "/en/sony-nex-vg30e-203",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/15619960-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/15619960-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "price": 35711,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "abstractSku": "076",
                        "url": "/en/sony-xperia-z3-compact-76",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24394207-3552.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24394207-3552.jpg"
                            }
                        ]
                    },
                    {
                        "price": 25584,
                        "abstractName": "Sony Xperia Z3 Compact",
                        "abstractSku": "078",
                        "url": "/en/sony-xperia-z3-compact-78",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24602396-8292.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24602396-8292.jpg"
                            }
                        ]
                    },
                    {
                        "price": 42502,
                        "abstractName": "Sony Xperia Z3",
                        "abstractSku": "079",
                        "url": "/en/sony-xperia-z3-79",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24394211-4472.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24394211-4472.jpg"
                            }
                        ]
                    },
                    {
                        "price": 28861,
                        "abstractName": "Sony FDR-AXP33",
                        "abstractSku": "194",
                        "url": "/en/sony-fdr-axp33-194",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904145-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904145-Sony.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Sony&currency=EUR&priceMode=GROSS_MODE"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Sony&currency=EUR&priceMode=GROSS_MODE"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for a category name</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [],
                "categories": [
                    {
                        "name": "Telecom & Navigation",
                        "url": "/en/telecom-&-navigation"
                    }
                ],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 43458,
                        "abstractName": "Samsung Galaxy Note 3",
                        "abstractSku": "073",
                        "url": "/en/samsung-galaxy-note-3-73",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21927455-7956.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21927455-7956.jpg"
                            }
                        ]
                    },
                    {
                        "price": 1879,
                        "abstractName": "Acer Liquid Z630",
                        "abstractSku": "054",
                        "url": "/en/acer-liquid-z630-54",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29406182_3072.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406182_3072.png"
                            }
                        ]
                    },
                    {
                        "price": 33265,
                        "abstractName": "Acer Liquid Zest 4G",
                        "abstractSku": "056",
                        "url": "/en/acer-liquid-zest-4g-56",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/35874112_7947608372.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_mediums/35874112_7947608372.jpg"
                            }
                        ]
                    },
                    {
                        "price": 19137,
                        "abstractName": "Acer Liquid Z630",
                        "abstractSku": "055",
                        "url": "/en/acer-liquid-z630-55",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_lows/29406184_6175.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/29406182_3072.png"
                            }
                        ]
                    },
                    {
                        "price": 41339,
                        "abstractName": "Acer Liquid Zest 4G",
                        "abstractSku": "057",
                        "url": "/en/acer-liquid-zest-4g-57",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/32007641_9851.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_raw/32007641_9851.png"
                            }
                        ]
                    },
                    {
                        "price": 27975,
                        "abstractName": "Samsung Galaxy Note 4",
                        "abstractSku": "061",
                        "url": "/en/samsung-galaxy-note-4-61",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24752508-8866.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24752508-8866.jpg"
                            }
                        ]
                    },
                    {
                        "price": 2952,
                        "abstractName": "Samsung Galaxy Note 4",
                        "abstractSku": "062",
                        "url": "/en/samsung-galaxy-note-4-62",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24752467-6413.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24752467-6413.jpg"
                            }
                        ]
                    },
                    {
                        "price": 8005,
                        "abstractName": "Samsung Galaxy S5",
                        "abstractSku": "068",
                        "url": "/en/samsung-galaxy-s5-68",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/21927453-1632.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21927453-1632.jpg"
                            }
                        ]
                    },
                    {
                        "price": 34566,
                        "abstractName": "Samsung Galaxy Tab S2",
                        "abstractSku": "075",
                        "url": "/en/samsung-galaxy-tab-s2-75",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_29401702_medium_1480597709_3254_26649.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/29401702_3457.jpg"
                            }
                        ]
                    },
                    {
                        "price": 9080,
                        "abstractName": "Samsung Galaxy S7",
                        "abstractSku": "042",
                        "url": "/en/samsung-galaxy-s7-42",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/31040075_7752.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/31040075_7752.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [
                    {
                        "name": "Telecom & Navigation",
                        "url": "/en/telecom-&-navigation"
                    }
                ],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=telecom-&-navigation"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=telecom-&-navigation"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for a part of a category name</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "sony smartwatch 3",
                    "sony sw2 smartwatch",
                    "sony smartwatch",
                    "smart wearables",
                    "smartphones",
                    "smartwatches"
                ],
                "categories": [
                    {
                        "name": "Smartwatches",
                        "url": "/en/smart-wearables/smartwatches"
                    },
                    {
                        "name": "Smartphones",
                        "url": "/en/telecom-&-navigation/smartphones"
                    },
                    {
                        "name": "Smart Wearables",
                        "url": "/en/smart-wearables"
                    }
                ],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 19568,
                        "abstractName": "Sony SmartWatch",
                        "abstractSku": "111",
                        "url": "/en/sony-smartwatch-111",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_12295890_medium_1481715683_8105_13110.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/15743_12295890-6463.jpg"
                            }
                        ]
                    },
                    {
                        "price": 17774,
                        "abstractName": "Sony SW2 SmartWatch",
                        "abstractSku": "108",
                        "url": "/en/sony-sw2-smartwatch-108",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_21047360_medium_1482828045_101_30852.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/21047360-4814.jpg"
                            }
                        ]
                    },
                    {
                        "price": 12572,
                        "abstractName": "Sony SW2 SmartWatch",
                        "abstractSku": "109",
                        "url": "/en/sony-sw2-smartwatch-109",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/19416433-5073.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/19416433-5073.jpg"
                            }
                        ]
                    },
                    {
                        "price": 20160,
                        "abstractName": "Sony SmartWatch 3",
                        "abstractSku": "090",
                        "url": "/en/sony-smartwatch-3-90",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery/26219658_3401.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery_mediums/img_26219658_medium_1483953936_4642_16454.jpg"
                            }
                        ]
                    },
                    {
                        "price": 19712,
                        "abstractName": "Sony SmartWatch 3",
                        "abstractSku": "091",
                        "url": "/en/sony-smartwatch-3-91",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25873091-2214.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25873091-2214.jpg"
                            }
                        ]
                    },
                    {
                        "price": 17459,
                        "abstractName": "Sony SmartWatch 3",
                        "abstractSku": "092",
                        "url": "/en/sony-smartwatch-3-92",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24495842-3074.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24495842-3074.jpg"
                            }
                        ]
                    },
                    {
                        "price": 24899,
                        "abstractName": "Sony SmartWatch 3",
                        "abstractSku": "093",
                        "url": "/en/sony-smartwatch-3-93",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24495843-7844.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24495843-7844.jpg"
                            }
                        ]
                    },
                    {
                        "price": 17994,
                        "abstractName": "TomTom Golf",
                        "abstractSku": "095",
                        "url": "/en/tomtom-golf-95",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/24235707-6105.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/24235707-6105.jpg"
                            }
                        ]
                    },
                    {
                        "price": 28178,
                        "abstractName": "Sony SWR50",
                        "abstractSku": "094",
                        "url": "/en/sony-swr50-94",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/27033003_5327.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/27033003_5327.jpg"
                            }
                        ]
                    },
                    {
                        "price": 28861,
                        "abstractName": "TomTom Golf",
                        "abstractSku": "096",
                        "url": "/en/tomtom-golf-96",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/30856274_5420.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/gallery/30856274_5420.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [
                    {
                        "name": "Smartwatches",
                        "url": "/en/smart-wearables/smartwatches"
                    },
                    {
                        "name": "Smartphones",
                        "url": "/en/telecom-&-navigation/smartphones"
                    },
                    {
                        "name": "Smart Wearables",
                        "url": "/en/smart-wearables"
                    }
                ],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Smart"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=Smart"
    }
}
```

</details>


<details>
<summary>Response sample: retrieve search suggestions for a merchant name</summary>

```json
{
    "data": [
        {
            "type": "catalog-search-suggestions",
            "id": null,
            "attributes": {
                "completion": [
                    "video king"
                ],
                "categories": [],
                "cmsPages": [],
                "abstractProducts": [
                    {
                        "price": 28178,
                        "abstractName": "Samsung F90BN",
                        "abstractSku": "192",
                        "url": "/en/samsung-f90bn-192",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_17738941_medium_1482147097_3908_19487.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/17738941-1395.jpg"
                            }
                        ]
                    },
                    {
                        "price": 24899,
                        "abstractName": "Samsung F90BN",
                        "abstractSku": "191",
                        "url": "/en/samsung-f90bn-191",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_17681791_medium_1482143992_4607_19487.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/17681791-4446.jpg"
                            }
                        ]
                    },
                    {
                        "price": 19712,
                        "abstractName": "Kodak EasyShare M532",
                        "abstractSku": "189",
                        "url": "/en/kodak-easyshare-m532-189",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/7062537-1780.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/medium/7062537-1780.jpg"
                            }
                        ]
                    },
                    {
                        "price": 17459,
                        "abstractName": "Kodak EasyShare M532",
                        "abstractSku": "190",
                        "url": "/en/kodak-easyshare-m532-190",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/9032886-5977.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/medium/9032886-5977.jpg"
                            }
                        ]
                    },
                    {
                        "price": 18415,
                        "abstractName": "Canon LEGRIA HF R606",
                        "abstractSku": "185",
                        "url": "/en/canon-legria-hf-r606-185",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904533-7314.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904533-7314.jpg"
                            }
                        ]
                    },
                    {
                        "price": 3918,
                        "abstractName": "Sony NEX-VG20EH",
                        "abstractSku": "202",
                        "url": "/en/sony-nex-vg20eh-202",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/5782479-Sony.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/5782479-Sony.jpg"
                            }
                        ]
                    },
                    {
                        "price": 12572,
                        "abstractName": "Toshiba CAMILEO P20",
                        "abstractSku": "207",
                        "url": "/en/toshiba-camileo-p20-207",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/15721464-9569.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/15721464-9569.jpg"
                            }
                        ]
                    },
                    {
                        "price": 34668,
                        "abstractName": "Toshiba CAMILEO P20",
                        "abstractSku": "208",
                        "url": "/en/toshiba-camileo-p20-208",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/low/14678762-7696.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/14678762-7696.jpg"
                            }
                        ]
                    },
                    {
                        "price": 9865,
                        "abstractName": "Canon LEGRIA HF R606",
                        "abstractSku": "186",
                        "url": "/en/canon-legria-hf-r606-186",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/norm/medium/25904506-6830.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/25904506-6830.jpg"
                            }
                        ]
                    },
                    {
                        "price": 11611,
                        "abstractName": "Toshiba CAMILEO S30",
                        "abstractSku": "205",
                        "url": "/en/toshiba-camileo-s30-205",
                        "images": [
                            {
                                "externalUrlSmall": "https://images.icecat.biz/img/gallery_mediums/img_6350138_medium_1481633011_6285_13738.jpg",
                                "externalUrlLarge": "https://images.icecat.biz/img/norm/high/6350138-1977.jpg"
                            }
                        ]
                    }
                ],
                "categoryCollection": [],
                "cmsPageCollection": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=video king"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/catalog-search-suggestions?q=video king"
    }
}
```

</details>

| ATTRIBUTE| TYPE | DESCRIPTION |
| ---------------- | -------- | ---------- |
| completion | Array | Autocomplete suggestions for the search query. <br> Each item in the array is a string. |
| categories         | Array    | Categories that match the search query. The matching categories are now returned as the `categoryCollection` attribute. |
| cmsPages           | Array    | CMS pages that match the search query. This attribute is deprecated and will be removed soon. The matching CMS pages are now returned as the `cmsPageCollection` attribute. |
| abstractProducts   | Array    | Abstract products matching the search query. Each item in the array is an *Object* representing a product. |
| abstractProducts.price | Integer | Product price. |
| abstractProducts.abstractName | String | Product name. |
| abstractProducts.abstractSku | String | Product SKU. |
| abstractProducts.url | String | URL of the product's product details page. |
| abstractProducts.images | Object | URLs of the product's images. |
| abstractProducts.images.externalUrlSmall | String | URL of the product's preview image. |
| abstractProducts.images.externalUrlLarge | String | URL of the product's large image. |
| categoryCollection | Array    | Categories that match the search query. Each item in the array is an *Object* representing a category. |
| categoryCollection.name     | String   | Specifies the category name. |
| categoryCollection.URL    | String   | Specifies the category URL.  |
| cmsPageCollection  | Array    | CMS pages that match the search query. Each item in the array is an *Object* representing a single page. |
| cmsPageCollection.name       | String   | Specifies the page title. |
| cmsPageCollection.url      | String   | Specifies the page URL.   |

{% info_block warningBox "" %}

Although CMS pages also expose the `url` parameter, resolving of CMS page SEF URLs is not supported at the moment.

{% endinfo_block %}

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
