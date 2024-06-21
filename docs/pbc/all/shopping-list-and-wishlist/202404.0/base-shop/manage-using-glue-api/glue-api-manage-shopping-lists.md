---
title: "Glue API: Manage shopping lists"
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-shopping-lists
originalArticleId: 23652c0f-92b4-45c1-9053-905389353411
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-shopping-lists/managing-shopping-lists.html
  - /docs/pbc/all/shopping-list-and-wishlist/202311.0/manage-using-glue-api/manage-shopping-lists-via-glue-api.html
  - /docs/pbc/all/shopping-list-and-wishlist/202204.0/base-shop/manage-using-glue-api/glue-api-manage-shopping-lists.html
related:
    - title: Install the Shopping Lists Glue API
      link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/install-and-upgrade/install-glue-api/install-the-shopping-lists-glue-api.html
    - title: Managing shopping list items
      link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/manage-using-glue-api/glue-api-manage-shopping-list-items.html
    - title: Shopping Lists feature overview
      link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html
---

With the help of the [Shopping Lists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) feature, company users can manage shopping lists for their company to plan purchasing activities beforehand. Unlike [Wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/wishlist-feature-overview.html), shopping lists contain not only a list of items to be purchased but also the quantity of each item.


In your development, the resources can help you to enable the shopping list functionality in your application.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Shopping Lists Glue API](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-shopping-lists-glue-api.html)
* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)


## Create a shopping list

To create a shopping list for a registered user, send the request:

---
`POST` **/shopping-lists**

---

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample: create a shopping list

`POST http://glue.mysprykershop.com/shopping-lists`

```json
{
    "data":{
        "type": "shopping-lists",
        "attributes":{
            "name":"My Shopping List"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | string | ✓ | Name of the shopping list to create. |

### Response

<details>
<summary markdown='span'>Response sample: create a shopping list</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "sdb17f85-953f-565a-a4ce-e5cb02405f83",
        "attributes": {
            "owner": "Anne Boleyn",
            "name": "Laptops",
            "numberOfItems": 0,
            "updatedAt": "2020-02-07 09:26:01.623754",
            "createdAt": "2020-02-07 09:26:01.623754"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83"
        }
    }
}
```
 <br>
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-lists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-lists-response-attributes.md -->


## Retrieve shopping lists

To retrieve shopping lists, send the request:

***
`GET` **/shopping-lists**
***

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox %}

To retrieve concrete products in a shopping list, include `shopping-list-items` and `concrete-products` resources.

{% endinfo_block %}

| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET http://glue.mysprykershop.com/shopping-lists` | Retrieve all shopping lists. |
| `GET http://glue.mysprykershop.com/shopping-lists?include=shopping-list-items,concrete-products` | Retrieve all shopping lists with its items and respective concrete products. |

### Response

<details>
<summary markdown='span'>Response sample: no shopping lists are retrieved</summary>

```json
  {
    "data": [],
    "links": {
        "self": "http://glue.mysprykershop.com/shopping-lists"
    }
}  
```
</details>    


<details>
<summary markdown='span'>Response sample: Retrieve own and shared shopping lists</summary>

```json
{
    "data": [
        {
            "type": "shopping-lists",
            "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
            "attributes": {
                "owner": "Spencor Hopkin",
                "name": "My Shopping List",
                "numberOfItems": 19,
                "updatedAt": "2020-02-07 07:59:09.621433",
                "createdAt": "2020-02-07 07:59:09.621433"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
            }
        },
        {
            "type": "shopping-lists",
            "id": "184ea79d-a2d3-549a-8ca2-4ea36879ceee",
            "attributes": {
                "owner": "Spencor Hopkin",
                "name": "My Shopping List 2",
                "numberOfItems": 0,
                "updatedAt": "2020-02-07 08:01:11.539074",
                "createdAt": "2020-02-07 08:01:11.539074"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/184ea79d-a2d3-549a-8ca2-4ea36879ceee"
            }
        },
        {
            "type": "shopping-lists",
            "id": "f5ce1365-1429-5d99-97a9-c1b19e4fede6",
            "attributes": {
                "owner": "Niels Barr",
                "name": "Shared Shopping List",
                "numberOfItems": 0,
                "updatedAt": "2020-02-07 09:34:41.438426",
                "createdAt": "2020-02-07 09:34:41.438426"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/f5ce1365-1429-5d99-97a9-c1b19e4fede6"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/shopping-lists"
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: retrieve shopping lists with the details on its items and concrete products</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "00fed212-3dc9-569f-885f-3ddca41dea08"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "136_24425591",
            "attributes": {
                "sku": "136_24425591",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Acer Chromebook C730-C8T7",
                "description": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long on a single charge. Indulge your e✓ and see everything in vivid detail on the Acer Chromebook's Full HD display. The Acer Chromebook features the latest 802.11ac wireless technology, for a smooth internet experience at connection speeds that are up to three times faster than that of previous-generation wireless technologies. The Acer Chromebook starts within 8 seconds, so you can wait less and do more. At less than an inch thin and extremely light, the Acer Chromebook is the perfect tool for on-the-go computing. Plus, it sports a fanless design for whisper-quiet computing.",
                "attributes": {
                    "product_type": "Chromebook",
                    "form_factor": "clamshell",
                    "processor_threads": "2",
                    "processor_boost_frequency": "2.58 GHz",
                    "brand": "Acer",
                    "color": "Grey"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "metaTitle": "Acer Chromebook C730-C8T7",
                "metaKeywords": "Acer,Entertainment Electronics",
                "metaDESCRIPTION": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long",
                "attributeNames": {
                    "product_type": "Product type",
                    "form_factor": "Form factor",
                    "processor_threads": "Processor Threads",
                    "processor_boost_frequency": "Processor boost frequency",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/136_24425591"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "136_24425591"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "005_30663301",
            "attributes": {
                "sku": "005_30663301",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Canon IXUS 175",
                "description": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more. Capture the stunning detail in everyday subjects using 1 cm Macro to get right up close. Enjoy exceptional quality, detailed images thanks to 20.0 Megapixels and DIGIC 4+ processing. Face Detection technology makes capturing great shots of friends effortless, while Auto Zoom intelligently helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "8 x",
                    "combined_zoom": "32 x",
                    "display": "LCD",
                    "hdmi": "no",
                    "brand": "Canon",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 175",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDESCRIPTION": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "combined_zoom": "Combined zoom",
                    "display": "Display",
                    "hdmi": "HDMI",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/005_30663301"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {...},
            "links": {....},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "005_30663301"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-lists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-lists-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-list-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-list-items-response-attributes.md -->

## Retrieve a shopping list

To retrieve a shopping list, send the request:

***
`GET` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to retrieve. |


### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXAMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox "Included resources" %}

To retrieve concrete products in a shopping list, include `shopping-list-items` and `concrete-products` resources.

{% endinfo_block %}

| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET http://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83` | Retrieve the shopping list with the id `sdb17f85-953f-565a-a4ce-e5cb02405f83`. |
| `GET http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items` | Retrieve the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` with its items. |
| `GET http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items,concrete-products` | Retrieve the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` with its items and respective concrete products. |

### Response

<details>
<summary markdown='span'>Response sample: retrieve a shopping list</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {
            "owner": "Spencor Hopkin",
            "name": "My Shopping List",
            "numberOfItems": 19,
            "updatedAt": "2020-02-07 07:59:09.621433",
            "createdAt": "2020-02-07 07:59:09.621433"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
        }
    }
}
```

</details>   

<details>
<summary markdown='span'>Response sample: retrieve a shopping list with the details on the shopping list items</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "00fed212-3dc9-569f-885f-3ddca41dea08"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {
                "quantity": 15,
                "sku": "136_24425591"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {
                "quantity": 4,
                "sku": "005_30663301"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
            }
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: retrieve a shopping list with the details on the shopping list items and concrete products</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "shopping-list-items": {
                "data": [
                    {
                        "type": "shopping-list-items",
                        "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
                    },
                    {
                        "type": "shopping-list-items",
                        "id": "00fed212-3dc9-569f-885f-3ddca41dea08"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "136_24425591",
            "attributes": {
                "sku": "136_24425591",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Acer Chromebook C730-C8T7",
                "description": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long on a single charge. Indulge your e✓ and see everything in vivid detail on the Acer Chromebook's Full HD display. The Acer Chromebook features the latest 802.11ac wireless technology, for a smooth internet experience at connection speeds that are up to three times faster than that of previous-generation wireless technologies. The Acer Chromebook starts within 8 seconds, so you can wait less and do more. At less than an inch thin and extremely light, the Acer Chromebook is the perfect tool for on-the-go computing. Plus, it sports a fanless design for whisper-quiet computing.",
                "attributes": {
                    "product_type": "Chromebook",
                    "form_factor": "clamshell",
                    "processor_threads": "2",
                    "processor_boost_frequency": "2.58 GHz",
                    "brand": "Acer",
                    "color": "Grey"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color"
                ],
                "metaTitle": "Acer Chromebook C730-C8T7",
                "metaKeywords": "Acer,Entertainment Electronics",
                "metaDESCRIPTION": "Amazing mobility Slip the Acer Chromebook into your bag and work from anywhere, without recharging, because it has enough battery life to last all day long",
                "attributeNames": {
                    "product_type": "Product type",
                    "form_factor": "Form factor",
                    "processor_threads": "Processor Threads",
                    "processor_boost_frequency": "Processor boost frequency",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/136_24425591"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "136_24425591"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "005_30663301",
            "attributes": {
                "sku": "005_30663301",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Canon IXUS 175",
                "description": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies look like miniature scale models and much more. Capture the stunning detail in everyday subjects using 1 cm Macro to get right up close. Enjoy exceptional quality, detailed images thanks to 20.0 Megapixels and DIGIC 4+ processing. Face Detection technology makes capturing great shots of friends effortless, while Auto Zoom intelligently helps you select the best framing at the touch of a button.",
                "attributes": {
                    "optical_zoom": "8 x",
                    "combined_zoom": "32 x",
                    "display": "LCD",
                    "hdmi": "no",
                    "brand": "Canon",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 175",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDESCRIPTION": "Creative play Play with your creativity using a range of Creative Filters. Re-create the distortion of a fish-eye lens, make scenes in stills or movies loo",
                "attributeNames": {
                    "optical_zoom": "Optical zoom",
                    "combined_zoom": "Combined zoom",
                    "display": "Display",
                    "hdmi": "HDMI",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/005_30663301"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {...},
            "links": {....},
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "005_30663301"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>    

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-lists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-lists-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-list-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-list-items-response-attributes.md -->


## Edit a shopping list

To edit a shopping list, send the request:

***
`PATCH` **/shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to edit. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | shopping-list-items, concrete-products|

{% info_block infoBox "Included resources" %}

To retrieve concrete products in a shopping list, include `shopping-list-items` and `concrete-products` resources.

{% endinfo_block %}


| REQUEST SAMPLE | USAGE |
| --- | --- |
| `PATCH http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` | Edit the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a`. |
| `PATCH http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a?include=shopping-list-items,concrete-products` | Edit the shopping list with the id `ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a` and include its items and respective concrete products into the response. |

```json
{
   "data": {
      "type": "shopping-lists",
      "attributes": {
         "name": "New Name"
      }
   }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION|
| --- | --- | --- |--- |
| name | String | ✓ | New name of the shopping list. |

### Response
<details>
<summary markdown='span'>Response sample: edit a shopping list</summary>

```json
{
    "data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {
            "owner": "Spencor Hopkin",
            "name": "New Name",
            "numberOfItems": 19,
            "updatedAt": "2020-02-08 14:17:38.288982",
            "createdAt": "2020-02-07 07:59:09.621433"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: edit a shopping list with the details on its items and concrete products</summary>

```json
"data": {
        "type": "shopping-lists",
        "id": "ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a",
        "attributes": {...},
        "links": {...},
        "relationships": {...},
    "included": [
        {
            "type": "concrete-products",
            "id": "090_24495844",
            "attributes": {
                "sku": "090_24495844",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony SmartWatch 3",
                "description": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps—formal, sophisticated, casual, vibrant colours and fitness style, all made from the finest materials. Designed to perform and impress, this smartphone watch delivers a groundbreaking combination of technology and style. Downloadable apps let you customise your SmartWatch 3 SWR50 and how you use it.         Tell SmartWatch 3 SWR50 smartphone watch what you want and it will do it. Search. Command. Find.",
                "attributes": {
                    "internal_ram": "512 MB",
                    "flash_memory": "4 GB",
                    "weight": "45 g",
                    "protection_feature": "Water resistent",
                    "brand": "Sony",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "flash_memory",
                    "color"
                ],
                "metaTitle": "Sony SmartWatch 3",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDESCRIPTION": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps—formal, sophisticated,",
                "attributeNames": {
                    "internal_ram": "Internal RAM",
                    "flash_memory": "Flash memory",
                    "weight": "Weight",
                    "protection_feature": "Protection feature",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/090_24495844"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17",
            "attributes": {
                "quantity": 1,
                "sku": "090_24495844"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/c3e12dfb-05e5-51c3-ae8f-ba2f07b6bd17"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "090_24495844"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "128_27314278",
            "attributes": {
                "sku": "128_27314278",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Lenovo ThinkCentre E73",
                "description": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep your business-critical information safe through USB port disablement and the password-protected BIOS and HDD. You can also safeguard your hardware by physically securing your mouse and keyboard, while the Kensington slot enables you to lock down your E73. Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology.",
                "attributes": {
                    "processor_threads": "8",
                    "pci_express_slots_version": "3",
                    "internal_memory": "8 GB",
                    "stepping": "C0",
                    "brand": "Lenovo",
                    "processor_frequency": "3.6 GHz"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCentre E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDESCRIPTION": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "pci_express_slots_version": "PCI Express slots version",
                    "internal_memory": "Max internal memory",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/128_27314278"
            }
        },
        {
            "type": "shopping-list-items",
            "id": "00fed212-3dc9-569f-885f-3ddca41dea08",
            "attributes": {
                "quantity": 1,
                "sku": "128_27314278"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shopping-lists/ecdb5c3b-8bba-5a97-8e7b-c0a5a8f8a74a/shopping-list-items/00fed212-3dc9-569f-885f-3ddca41dea08"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "128_27314278"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-lists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-lists-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/shopping-list-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shopping-list-items-response-attributes.md -->


## Delete a shopping list

To delete a shopping list, send the request:

***
`DELETE` **shopping-lists/*{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shopping_list_id{% raw %}}}{% endraw %}*** | Unique identifier of a shopping list to delete. To get it, [Retrieve shopping lists](#retrieve-shopping-lists). |

### Request

Request sample: delete a shopping list

`DELETE http://glue.mysprykershop.com/shopping-lists/sdb17f85-953f-565a-a4ce-e5cb02405f83`

### Response

If the shopping list is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is incorrect. |
| 002 | Access token is missing. |
| 400 | Provided access token is not an [access token of a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html). |
| 901 | Shop list name or item name is not specified or too long.<br>**OR** <br> Item quantity is not specified or too large.|
| 1501 | Shopping list ID or item is not specified. |
| 1503 | Specified shopping list is not found. |
| 1506 | Shopping list with given name already exists. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
