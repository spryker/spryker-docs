---
title: "Glue API: Retrieve CMS pages"
description: Learn how you can retrieve details on Spryker CMS pages via the Spryker Glue API.
last_updated: Jun 18, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-cms-pages
originalArticleId: 790ea5b1-23b6-4db1-8878-1de75bc438dd
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/retrieving-cms-pages.html
  - /docs/scos/dev/glue-api-guides/202005.0/retrieving-cms-pages.html
  - /docs/scos/dev/glue-api-guides/202311.0/retrieving-cms-pages.html
  - /docs/pbc/all/content-management-system/202311.0/manage-using-glue-api/retrieve-cms-pages.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/manage-using-glue-api/retrieve-cms-pages.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-cms-pages.html
related:
  - title: CMS Pages overview
    link: docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-pages-overview.html
  - title: Install the CMS Glue API
    link: docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cms-glue-api.html
---

[CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-pages-overview.html) are meant for creating customized content for your online shop. The CMS Pages API allows you to retrieve details on CMS pages, including information on Abstract Product List and Banner content items available for each of them.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

- [Install the Content Items feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-content-items-feature.html)
- [Glue API: CMS feature integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cms-glue-api.html)

<a name="all-cms-pages"></a>

## Retrieve all CMS pages

To retrieve all active CMS pages, send the request:

***
`GET` **/cms-pages**
***

{% info_block infoBox %}

This endpoint returns activated CMS pages only. Also, if there are more than 12 active CMS pages, the endpoint returns the number of pages multiple of 12. See the Request section below for details.

{% endinfo_block %}

### Request

Because of the Storefront layout, by default, the number of the retrieved pages is a multiple of 12. If you have less than 12 active CMS pages, the above request returns all of them. If you have more, you can enable paging and receive results in pages. For this purpose, use the `limit` and `offset` parameters in your request.

Keep in mind that you can not retrieve the number of results, which is not a multiple of 12. Except for the cases when:

You have less than 12 active CMS pages. In this case, all of them are returned.
You have more than 12 CMS pages but less than its multiple. For example, if you have 14 pages, you can set the `limit` to 24 - this returns all 14 pages.
You set the `offset` value, which equals the difference by which the actual number of active CMS pages is greater than a multiple of 12. For example, if you have 14 pages and set the `offset` to 12 and `limit` to 12, this returns 2 results - thirteenth and fourteenth CMS pages, so the ones you would not see when the `limit` is 12.

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| offset | 	Specifies the number of results to skip | numeric |
| limit | Specifies the number of results per single request | numeric |
| include | Adds resource relationships to the request | content-product-abstract-lists, content-banners |

{% info_block infoBox "Info" %}

To retrieve abstract products for the `content-product-abstract-lists` relationship, include the `abstract-products` relationship as well.

{% endinfo_block %}


| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/cms-pages` | Retrieve all active CMS pages. |
| `GET https://glue.mysprykershop.com/cms-pages?page[limit]=24&page[offset]=0` | Return maximum 24 CMS pages. |
| `GET https://glue.mysprykershop.com/cms-pages?page[limit]=12&page[offset]=12` | Return CMS pages 13 and further, maximum 12 pages. |
| `GET https://glue.mysprykershop.com/cms-pages?include=content-product-abstract-lists` | Retrieve information about [Abstract Product List](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html#reference-information-abstract-product-list-content-item-widget) content item for CMS pages. |
| `GET https://glue.mysprykershop.com/cms-pages?include=content-product-abstract-list,abstract-products` | Retrieve information about Abstract Product List content item with its abstract products. |
| `GET https://glue.mysprykershop.com/cms-pages?include=content-banners` | Retrieve information about [Banner](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html#reference-information-banner-content-item-widget) content item for CMS pages. |

### Response

<details>
<summary>Response sample: retrieve all active CMS pages</summary>

```json
{
    "data": [
        {
            "type": "cms-pages",
            "id": "0726761d-d58c-5cc6-ac61-e4c1ac212ae9",
            "attributes": {
                "pageKey": null,
                "name": "Imprint",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/imprint"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/0726761d-d58c-5cc6-ac61-e4c1ac212ae9"
            }
        },
        {
            "type": "cms-pages",
            "id": "cb1bbd1f-b245-5920-a19b-ebdd1459e995",
            "attributes": {
                "pageKey": null,
                "name": "GTC",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/gtc"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/cb1bbd1f-b245-5920-a19b-ebdd1459e995"
            }
        },
        {
            "type": "cms-pages",
            "id": "1e9fb640-9073-55f4-a2d2-535090c92025",
            "attributes": {
                "pageKey": null,
                "name": "Data Privacy",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/privacy"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/1e9fb640-9073-55f4-a2d2-535090c92025"
            }
        },
        {
            "type": "cms-pages",
            "id": "0783656d-03c6-59b2-b6bc-48b7b6d77f9d",
            "attributes": {
                "pageKey": null,
                "name": "Dolor sit amet",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/dolor"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/0783656d-03c6-59b2-b6bc-48b7b6d77f9d"
            }
        },
        {
            "type": "cms-pages",
            "id": "10014bd9-4bba-5a54-b84f-31b4b7efd064",
            "attributes": {
                "pageKey": null,
                "name": "Demo Landing Page",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/demo-landing-page"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/10014bd9-4bba-5a54-b84f-31b4b7efd064"
            }
        },
        {
            "type": "cms-pages",
            "id": "8d378933-22f9-54c7-b45e-db68f2d5d9a3",
            "attributes": {
                "pageKey": null,
                "name": "Return policy",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/return-policy"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/8d378933-22f9-54c7-b45e-db68f2d5d9a3"
            }
        },
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cms-pages"
    }
}
```

</details>

<details>
<summary>Response sample: retrieve CMS pages with pagination included</summary>

```json
{
    "data": [
        {
            "type": "cms-pages",
            "id": "0455b56c-55bf-54b6-859d-68753e6f480c",
            "attributes": {
                "pageKey": null,
                "name": "rst1",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/rst1"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c?page[limit]=12&page[offset]=12"
            }
        },
        {
            "type": "cms-pages",
            "id": "9763385e-d57b-5fe5-b9d8-75f3c6d75661",
            "attributes": {
                "pageKey": null,
                "name": "klm",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/klm"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/9763385e-d57b-5fe5-b9d8-75f3c6d75661?page[limit]=12&page[offset]=12"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cms-pages?page[limit]=12&page[offset]=12",
        "last": "https://glue.mysprykershop.com/cms-pages?page[offset]=12&page[limit]=12",
        "first": "https://glue.mysprykershop.com/cms-pages?page[offset]=0&page[limit]=12",
        "prev": "https://glue.mysprykershop.com/cms-pages?page[offset]=0&page[limit]=12"
    }
}
```

</details>

{% info_block infoBox %}

When paging is enabled, the links section of the response contains links for the first, previous, next, and the last pages.

{% endinfo_block %}

<details>
<summary>Response sample: retrieve CMS pages with the details on the Abstract Product List and Banner content items</summary>

```json
{
    "data": [
       {
            "type": "cms-pages",
            "id": "8d378933-22f9-54c7-b45e-db68f2d5d9a3",
            "attributes": {
                "pageKey": null,
                "name": "Return policy",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/return-policy"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/8d378933-22f9-54c7-b45e-db68f2d5d9a3?include=content-banners,content-product-abstract-lists"
            },
            "relationships": {
                "content-product-abstract-lists": {
                    "data": [
                        {
                            "type": "content-product-abstract-lists",
                            "id": "apl-1"
                        }
                    ]
                }
            }
        },
        {
            "type": "cms-pages",
            "id": "0455b56c-55bf-54b6-859d-68753e6f480c",
            "attributes": {
                "pageKey": null,
                "name": "rst1",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/rst1"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c?include=content-banners,content-product-abstract-lists"
            },
            "relationships": {
                "content-product-abstract-lists": {
                    "data": [
                        {
                            "type": "content-product-abstract-lists",
                            "id": "apl-3"
                        }
                    ]
                }
            }
        },
        {
            "type": "cms-pages",
            "id": "12b88497-6120-5c58-b3c0-5645ca697fdb",
            "attributes": {
                "pageKey": null,
                "name": "uvw",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/uvw"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/12b88497-6120-5c58-b3c0-5645ca697fdb?include=content-banners,content-product-abstract-lists"
            },
            "relationships": {
                "content-banners": {
                    "data": [
                        {
                            "type": "content-banners",
                            "id": "br-1"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cms-pages?include=content-banners,content-product-abstract-lists"
    },
    "included": [
        {
            "type": "content-product-abstract-lists",
            "id": "apl-1",
            "links": {
                "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1"
            }
        },
        {
            "type": "content-product-abstract-lists",
            "id": "apl-3",
            "links": {
                "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-3"
            }
        },
        {
            "type": "content-banners",
            "id": "br-1",
            "attributes": {
                "title": "banner title 1",
                "subtitle": "banner sub-title 1",
                "imageUrl": "http://d2s0ynfc62ej12.cloudfront.net/b2c/24699831-1991.jpg",
                "clickUrl": "/en/asus-transformer-book-t200ta-139",
                "altText": "banner image 1"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/content-banners/br-1"
            }
        }
    ]
}
```

</details>

<details>
<summary>Response sample: retrieve CMS pages with the details on the Abstract Product List content items and their abstract products</summary>

```json
{
    "data": [
        {
            "type": "cms-pages",
            "id": "12b88497-6120-5c58-b3c0-5645ca697fdb",
            "attributes": {
                "pageKey": null,
                "name": "uvw",
                "validTo": null,
                "isSearchable": true,
                "url": "/en/uvw"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cms-pages/12b88497-6120-5c58-b3c0-5645ca697fdb?include=content-product-abstract-lists,abstract-products"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/cms-pages?include=content-product-abstract-lists,abstract-products"
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "205",
            "attributes": {
                "sku": "205",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Toshiba CAMILEO S30",
                "description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
                "attributes": {
                    "total_megapixels": "8 MP",
                    "display": "LCD",
                    "self_timer": "10 s",
                    "weight": "118 g",
                    "brand": "Toshiba",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "total_megapixels",
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Grey"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "205_6350138"
                    ],
                    "super_attributes": {
                        "color": [
                            "Grey"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "Toshiba CAMILEO S30",
                "metaKeywords": "Toshiba,Smart Electronics",
                "metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
                "attributeNames": {
                    "total_megapixels": "Total Megapixels",
                    "display": "Display",
                    "self_timer": "Self-timer",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/toshiba-camileo-s30-205"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/205"
            }
        },
        {
            "type": "content-product-abstract-lists",
            "id": "apl-1",
            "links": {
                "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "204"
                        },
                        {
                            "type": "abstract-products",
                            "id": "205"
                        }
                    ]
                }
            }
        },
        {
            "type": "abstract-products",
            "id": "152",
            "attributes": {
                "sku": "152",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Lenovo Essential B70-80",
                "description": "Multimedia Powerhouse A perfect business companion and desktop replacement, the B70 laptop also delivers great cinema-style multimedia features - a DVD Rambo drive, 2GB of video RAM and Dolby® certified speakers for an immersive surround sound experience. So whether you're catching up on work, gaming or relaxing to your favourite music, the B70 ticks all the boxes. Premium performance, powerful possibilities. With stunning visuals and performance, the new 5th gen Intel® Core™ processor delivers processing power that takes your computing to the next level so that you can work smarter and play harder. Enjoy amazing battery life that keeps you productive on the go so that you don't have to worry about recharging. That's serious processing. Only with Intel Inside®. The B70 spares nothing when it comes to robust graphics performance. With up to NVIDIA® GeForce® 920M graphics, you'll encounter enhanced graphics when work demands it, and a vivid gaming and video experience when it's time for fun.",
                "attributes": {
                    "processor_cores": "3",
                    "processor_cache_type": "3",
                    "bus_type": "DMI2",
                    "system_bus_rate": "4 GT/s",
                    "brand": "Lenovo"
                },
                "superAttributesDefinition": [],
                "superAttributes": {
                    "processor_frequency": [
                        "1.9 GHz",
                        "2.2 GHz"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "152_27104941",
                        "152_29810130"
                    ],
                    "super_attributes": {
                        "processor_frequency": [
                            "1.9 GHz",
                            "2.2 GHz"
                        ]
                    },
                    "attribute_variants": {
                        "processor_frequency:1.9 GHz": {
                            "id_product_concrete": "152_29810130"
                        },
                        "processor_frequency:2.2 GHz": {
                            "id_product_concrete": "152_27104941"
                        }
                    }
                },
                "metaTitle": "Lenovo Essential B70-80",
                "metaKeywords": "Lenovo,Entertainment Electronics",
                "metaDescription": "Multimedia Powerhouse A perfect business companion and desktop replacement, the B70 laptop also delivers great cinema-style multimedia features - a DVD Ram",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "processor_cache_type": "Processor cache",
                    "bus_type": "Bus type",
                    "system_bus_rate": "System bus rate",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "url": "/en/lenovo-essential-b70-80-152"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/152"
            }
        },
        {
            "type": "abstract-products",
            "id": "151",
            "attributes": {
                "sku": "151",
                "averageRating": null,
                "reviewCount": 0,
                "name": "HP Chromebook 11",
                "description": "Processing power Get trusted processing power from an Intel® Celeron® processor2 that quickly launches apps, allows fast web browsing, and efficiently manages battery power. Enhance visual connections during collaboration and group discussions with an optional IPS panel1 for a wide viewing angle. Optimize Google Hangouts and video collaboration with noise suppression software for improved audio clarity.         Inspire learning and help elevate productivity to the next level with HP Chromebook 11. Affordable collaboration at school and work has never been so easy with Intel® processors, long battery life, and an optional HD IPS panel.1 The Chrome OS™ delivers a low maintenance highly manageable platform with automatic software updates and virus protection built in. The optional Chrome Management Console1 provides easy and comprehensive web-based management tools.",
                "attributes": {
                    "processor_threads": "2",
                    "scenario_design_power": "4.5 W",
                    "stepping": "C0",
                    "processor_cache_type": "L2",
                    "brand": "HP",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "151_30983682"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "HP Chromebook 11",
                "metaKeywords": "HP,Entertainment Electronics",
                "metaDescription": "Processing power Get trusted processing power from an Intel® Celeron® processor2 that quickly launches apps, allows fast web browsing, and efficiently mana",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "scenario_design_power": "Scenario Design Power",
                    "stepping": "Stepping",
                    "processor_cache_type": "Processor cache",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/hp-chromebook-11-151"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/151"
            }
        },
        {
            "type": "content-product-abstract-lists",
            "id": "apl-3",
            "links": {
                "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-3"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "152"
                        },
                        {
                            "type": "abstract-products",
                            "id": "151"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/cms-pages-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/cms-pages-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->


## Retrieve a CMS page

To retrieve a specific CMS page, send the request:

***
`GET` **/cms-pages/{cms-page-uuid}**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| cms-page-uuid | Unique identifier of the CMS page. You can get this in the response when [retrieving all CMS pages](#all-cms-pages). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | content-product-abstract-lists,content-banners |

{% info_block infoBox "Info" %}

To retrieve abstract products for the `content-product-abstract-lists` relationship, include the `abstract-products` relationship as well.

{% endinfo_block %}


| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c` | Retrieve the specific CMS page. |
| `GET https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c?include=content-product-abstract-lists` | Retrieve information about [Abstract Product List](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html#reference-information-abstract-product-list-content-item-widget) content item for the CMS page. |
| `GET https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c?include=content-product-abstract-list,abstract-products` | Retrieve information about Abstract Product List content item with its abstract products. |
| `GET https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c?include=content-banners` | Retrieve information about [Banner](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html#reference-information-banner-content-item-widget) content item for the CMS page. |

<details>
<summary>Response sample: retrieve a specific CMS page</summary>

```json
{
    "data": {
        "type": "cms-pages",
        "id": "0455b56c-55bf-54b6-859d-68753e6f480c",
        "attributes": {
            "pageKey": null,
            "name": "rst1",
            "validTo": null,
            "isSearchable": true,
            "url": "/en/rst1"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c"
        }
    }
}
```

</details>

<details>
<summary>Response sample: retrieve a CMS page with the details on the Abstract Product List and Banner content items</summary>

```json
{
    "data": {
        "type": "cms-pages",
        "id": "0455b56c-55bf-54b6-859d-68753e6f480c",
        "attributes": {
            "pageKey": null,
            "name": "rst1",
            "validTo": null,
            "isSearchable": true,
            "url": "/en/rst1"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c?include=content-product-abstract-lists,content-banners"
        },
        "relationships": {
            "content-banners": {
                "data": [
                    {
                        "type": "content-banners",
                        "id": "br-1"
                    }
                ]
            },
            "content-product-abstract-lists": {
                "data": [
                    {
                        "type": "content-product-abstract-lists",
                        "id": "apl-3"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "content-banners",
            "id": "br-1",
            "attributes": {
                "title": "banner title 1",
                "subtitle": "banner sub-title 1",
                "imageUrl": "http://d2s0ynfc62ej12.cloudfront.net/b2c/24699831-1991.jpg",
                "clickUrl": "/en/asus-transformer-book-t200ta-139",
                "altText": "banner image 1"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/content-banners/br-1"
            }
        },
        {
            "type": "content-product-abstract-lists",
            "id": "apl-3",
            "links": {
                "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-3"
            }
        }
    ]
}
```

</details>

<details>
<summary>Response sample: retrieve a CMS page with the details on the Abstract Product List content items and abstract products</summary>

```json
{
    "data": {
        "type": "cms-pages",
        "id": "0455b56c-55bf-54b6-859d-68753e6f480c",
        "attributes": {
            "pageKey": null,
            "name": "rst1",
            "validTo": null,
            "isSearchable": true,
            "url": "/en/rst1"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/cms-pages/0455b56c-55bf-54b6-859d-68753e6f480c?include=content-product-abstract-lists,abstract-products"
        },
        "relationships": {
            "content-product-abstract-lists": {
                "data": [
                    {
                        "type": "content-product-abstract-lists",
                        "id": "apl-3"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "152",
            "attributes": {
                "sku": "152",
                "averageRating": null,
                "reviewCount": 0,
                "name": "Lenovo Essential B70-80",
                "description": "Multimedia Powerhouse A perfect business companion and desktop replacement, the B70 laptop also delivers great cinema-style multimedia features - a DVD Rambo drive, 2GB of video RAM and Dolby® certified speakers for an immersive surround sound experience. So whether you're catching up on work, gaming or relaxing to your favourite music, the B70 ticks all the boxes. Premium performance, powerful possibilities. With stunning visuals and performance, the new 5th gen Intel® Core™ processor delivers processing power that takes your computing to the next level so that you can work smarter and play harder. Enjoy amazing battery life that keeps you productive on the go so that you don't have to worry about recharging. That's serious processing. Only with Intel Inside®. The B70 spares nothing when it comes to robust graphics performance. With up to NVIDIA® GeForce® 920M graphics, you'll encounter enhanced graphics when work demands it, and a vivid gaming and video experience when it's time for fun.",
                "attributes": {
                    "processor_cores": "3",
                    "processor_cache_type": "3",
                    "bus_type": "DMI2",
                    "system_bus_rate": "4 GT/s",
                    "brand": "Lenovo"
                },
                "superAttributesDefinition": [],
                "superAttributes": {
                    "processor_frequency": [
                        "1.9 GHz",
                        "2.2 GHz"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "152_27104941",
                        "152_29810130"
                    ],
                    "super_attributes": {
                        "processor_frequency": [
                            "1.9 GHz",
                            "2.2 GHz"
                        ]
                    },
                    "attribute_variants": {
                        "processor_frequency:1.9 GHz": {
                            "id_product_concrete": "152_29810130"
                        },
                        "processor_frequency:2.2 GHz": {
                            "id_product_concrete": "152_27104941"
                        }
                    }
                },
                "metaTitle": "Lenovo Essential B70-80",
                "metaKeywords": "Lenovo,Entertainment Electronics",
                "metaDescription": "Multimedia Powerhouse A perfect business companion and desktop replacement, the B70 laptop also delivers great cinema-style multimedia features - a DVD Ram",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "processor_cache_type": "Processor cache",
                    "bus_type": "Bus type",
                    "system_bus_rate": "System bus rate",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "url": "/en/lenovo-essential-b70-80-152"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/152"
            }
        },
        {
            "type": "abstract-products",
            "id": "151",
            "attributes": {
                "sku": "151",
                "averageRating": null,
                "reviewCount": 0,
                "name": "HP Chromebook 11",
                "description": "Processing power Get trusted processing power from an Intel® Celeron® processor2 that quickly launches apps, allows fast web browsing, and efficiently manages battery power. Enhance visual connections during collaboration and group discussions with an optional IPS panel1 for a wide viewing angle. Optimize Google Hangouts and video collaboration with noise suppression software for improved audio clarity.         Inspire learning and help elevate productivity to the next level with HP Chromebook 11. Affordable collaboration at school and work has never been so easy with Intel® processors, long battery life, and an optional HD IPS panel.1 The Chrome OS™ delivers a low maintenance highly manageable platform with automatic software updates and virus protection built in. The optional Chrome Management Console1 provides easy and comprehensive web-based management tools.",
                "attributes": {
                    "processor_threads": "2",
                    "scenario_design_power": "4.5 W",
                    "stepping": "C0",
                    "processor_cache_type": "L2",
                    "brand": "HP",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "superAttributes": {
                    "color": [
                        "Black"
                    ]
                },
                "attributeMap": {
                    "product_concrete_ids": [
                        "151_30983682"
                    ],
                    "super_attributes": {
                        "color": [
                            "Black"
                        ]
                    },
                    "attribute_variants": []
                },
                "metaTitle": "HP Chromebook 11",
                "metaKeywords": "HP,Entertainment Electronics",
                "metaDescription": "Processing power Get trusted processing power from an Intel® Celeron® processor2 that quickly launches apps, allows fast web browsing, and efficiently mana",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "scenario_design_power": "Scenario Design Power",
                    "stepping": "Stepping",
                    "processor_cache_type": "Processor cache",
                    "brand": "Brand",
                    "color": "Color"
                },
                "url": "/en/hp-chromebook-11-151"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/151"
            }
        },
        {
            "type": "content-product-abstract-lists",
            "id": "apl-3",
            "links": {
                "self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-3"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "152"
                        },
                        {
                            "type": "abstract-products",
                            "id": "151"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/cms-pages-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/cms-pages-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->

## Possible errors

| CODE | REASON |
| --- | --- |
| 3801 | CMS page is not found. |
