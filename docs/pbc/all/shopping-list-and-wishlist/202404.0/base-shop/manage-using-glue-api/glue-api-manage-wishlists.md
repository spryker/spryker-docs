---
title: "Glue API: Manage wishlists"
description: Create, update and delete wishlists via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-wishlists
originalArticleId: b4729aa0-f527-4fd0-bf46-6d8e62b3013e
redirect_from:
  - /docs/scos/dev/glue-api-guides/202200.0/managing-wishlists/managing-wishlists.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-wishlists/managing-wishlists.html  
  - /docs/pbc/all/shopping-list-and-wishlist/202311.0/manage-via-glue-api/manage-wishlists-via-glue-api.html
  - /docs/pbc/all/shopping-list-and-wishlist/202204.0/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html
related:
  - title: Managing wishlist items
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/manage-using-glue-api/glue-api-manage-wishlist-items.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Wishlist feature overview
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/wishlist-feature-overview.html

---

The Wishlists API allows creating list and deleting [wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/wishlist-feature-overview.html), as well as managing the items inside them.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Install the Wishlist Glue API](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-wishlist-glue-api.html)
* [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
* [Glue API: Product Labels feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-labels-glue-api.html)

## Create a wishlist

To create a wishlist, send the request:

---
`POST` **/wishlists**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: create a wishlist

`POST https://glue.mysprykershop.com/wishlists`

```json
{
		"data":{
			"type": "wishlists",
			"attributes":{
				"name":"christmas_gifts"
			}
		}
	}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | string | &check; | Name of the wishlist to create. |

### Response

<details>
<summary markdown='span'>Response sample: create a wishlist</summary>

```json
{
		"data": {
			"type": "wishlists",
			"id": "09264b7f-1894-58ed-81f4-d52d683e910a",
			"attributes": {
				"name": "Name of the wishlist",
				"numberOfItems": 0,
				"createdAt": "2018-08-17 10:04:35.311557",
				"updatedAt": "2018-08-17 10:04:35.311557"
			},
			"links": {
				"self": "https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a"
			}
		}
	}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/wishlists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlists-response-attributes.md -->


## Retrieve wishlists

To retrieve all wishlists of a customer, send the request:

---
`GET` **/wishlists**

---

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>wishlist-items</li><li>concrete-products</li><li>product-labels</li></ul>|

| REQUEST SAMPLE | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/wishlists` | Retrieve all the wishlists of a customer. |
| `GET https://glue.mysprykershop.com/wishlists?include=wishlist-items` | Retrieve all the wishlists of a customer with wishlist items. |
| `GET https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products` | Retrieve all the wishlists of a customer with wishlist items and respective concrete products.  |
| `GET https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products,product-labels` | Retrieve all the wishlists of a customer with wishlist items, respective concrete products, and their product labels.  |

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

### Response

<details>
<summary markdown='span'>Response sample: no wishlists are retrieved</summary>

```json
{
		"data": [],
		"links": {
			"self": "https://glue.mysprykershop.com/wishlists"
		}
	}
```
</details>

<details>
<summary markdown='span'>Response sample: retrieve wishlists</summary>

```json
{
	"data": [
		{
			"type": "wishlists",
			"id": "1623f465-e4f6-5e45-8dc5-987b923f8af4",
			"attributes": {
				"name": "My Wishlist Name",
				"numberOfItems": 0,
				"createdAt": "2018-12-16 17:24:12.601033",
				"updatedAt": "2018-12-16 17:24:12.601033"
			},
			"links": {
				"self": "https://glue.mysprykershop.com/wishlists/1623f465-e4f6-5e45-8dc5-987b923f8af4"
			}
		}
	],
	"links": {
		"self": "https://glue.mysprykershop.com/wishlists"
	}
}
```
</details>

<details>
<summary markdown='span'>Response sample: retrieve wishlists with the details on the wishlist items</summary>

```json
{
    "data": [
        {
            "type": "wishlists",
            "id": "246591f8-4f30-55ce-8b17-8482859b4ac1",
            "attributes": {
                "name": "My wishlist",
                "numberOfItems": 1,
                "createdAt": "2021-02-16 15:02:21.121613",
                "updatedAt": "2021-02-16 15:02:21.121613"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items"
            },
            "relationships": {
                "wishlist-items": {
                    "data": [
                        {
                            "type": "wishlist-items",
                            "id": "149_28346778"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/wishlists?include=wishlist-items"
    },
    "included": [
        {
            "type": "wishlist-items",
            "id": "149_28346778",
            "attributes": {
                "sku": "149_28346778"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1/wishlist-items/149_28346778"
            }
        }
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: retrieve wishlists with the details on the wishlist items and respective concrete products</summary>

```json
{
    "data": [
        {
            "type": "wishlists",
            "id": "246591f8-4f30-55ce-8b17-8482859b4ac1",
            "attributes": {
                "name": "My wishlist",
                "numberOfItems": 1,
                "createdAt": "2021-02-16 15:02:21.121613",
                "updatedAt": "2021-02-16 15:02:21.121613"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products"
            },
            "relationships": {
                "wishlist-items": {
                    "data": [
                        {
                            "type": "wishlist-items",
                            "id": "149_28346778"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products"
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "149_28346778",
            "attributes": {
                "sku": "149_28346778",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "HP 200 250 G4",
                "description": "Durable mobile design Rest assured that the HP 250 can keep up with assignments on the run. The durable chassis protects the notebook so it looks as professional as you do. Get connected with the value-priced HP 250 Notebook PC. Complete business tasks with Intel technology, essential multimedia tools and Windows 8.1 loaded on the HP 250. The durable chassis helps protect the notebook from the rigors of the day. HP, a world leader in PCs and touch technology helps equip you with a fully functional notebook ready to connect to all your peripherals and designed to fit the needs of business. HP, a world leader in PCs and touch technology helps equip you with a fully functional notebook ready to connect to all your peripherals and designed to fit the needs of business.",
                "attributes": {
                    "form_factor": "clamshell",
                    "processor_cores": "2",
                    "thermal_design_power": "15 W",
                    "brand": "HP",
                    "color": "Black",
                    "processor_frequency": "1.6 GHz"
                },
                "superAttributesDefinition": [
                    "form_factor",
                    "color",
                    "processor_frequency"
                ],
                "metaTitle": "HP 200 250 G4",
                "metaKeywords": "HP,Entertainment Electronics",
                "metaDescription": "Durable mobile design Rest assured that the HP 250 can keep up with assignments on the run. The durable chassis protects the notebook so it looks as profes",
                "attributeNames": {
                    "form_factor": "Form factor",
                    "processor_cores": "Processor cores",
                    "thermal_design_power": "Thermal Design Power (TDP)",
                    "brand": "Brand",
                    "color": "Color",
                    "processor_frequency": "Processor frequency"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/149_28346778"
            }
        },
        {
            "type": "wishlist-items",
            "id": "149_28346778",
            "attributes": {
                "sku": "149_28346778"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1/wishlist-items/149_28346778"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "149_28346778"
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
<summary markdown='span'>Response sample: retrieve wishlists with the details on the wishlist items, respective concrete products, and their product labels</summary>

```json
{
    "data": [
        {
            "type": "wishlists",
            "id": "246591f8-4f30-55ce-8b17-8482859b4ac1",
            "attributes": {
                "name": "My wishlist",
                "numberOfItems": 1,
                "createdAt": "2021-02-16 15:02:21.121613",
                "updatedAt": "2021-02-16 15:02:21.121613"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products,product-labels"
            },
            "relationships": {
                "wishlist-items": {
                    "data": [
                        {
                            "type": "wishlist-items",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products,product-labels"
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "concrete-products",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony Cyber-shot DSC-W830",
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
                "attributes": {
                    "hdmi": "no",
                    "sensor_type": "CCD",
                    "display": "TFT",
                    "usb_version": "2",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony Cyber-shot DSC-W830",
                "metaKeywords": "Sony,Entertainment Electronics",
                "metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i",
                "attributeNames": {
                    "hdmi": "HDMI",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "usb_version": "USB version",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/020_21081478"
            },
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "5"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1/wishlist-items/020_21081478"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/wishlists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlists-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/wishlist-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlist-items-response-attributes.md -->

{% include /pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md -->


## Retrieve a wishlist

To retrieve wishlist items, send the request:

---
`GET` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to retrieve the items of. [Create a wishlist](#create-a-wishlist) or [retrieve all wishlists](#retrieve-wishlists) to get it. |

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>wishlist-items</li><li>concrete-products</li><li>product-labels</li></ul>|

| REQUEST SAMPLE | USAGE |
| --- | --- |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1 | Retrieve the wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items | Retrieve the wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. Include wishlist items into the response. |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products | Retrieve the wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. Include wishlist items and respective concrete products into the response. |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products,product-labels | Retrieve the wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. Include wishlist items, respective concrete products and their product labels into the response. |

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

### Response

<details>
<summary markdown='span'>Response sample: retrieve a wishlist</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "246591f8-4f30-55ce-8b17-8482859b4ac1",
        "attributes": {
            "name": "My wishlist",
            "numberOfItems": 1,
            "createdAt": "2021-02-24 13:52:34.582421",
            "updatedAt": "2021-02-24 13:52:34.582421"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: retrieve a wishlist with the details on the wishlist items</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "246591f8-4f30-55ce-8b17-8482859b4ac1",
        "attributes": {
            "name": "My wishlist",
            "numberOfItems": 1,
            "createdAt": "2021-02-24 13:52:34.582421",
            "updatedAt": "2021-02-24 13:52:34.582421"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "020_21081478"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "wishlist-items",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1/wishlist-items/020_21081478"
            }
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: retrieve a wishlist with the details on the wishlist items and respective concrete products</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "246591f8-4f30-55ce-8b17-8482859b4ac1",
        "attributes": {
            "name": "My wishlist",
            "numberOfItems": 1,
            "createdAt": "2021-02-24 13:52:34.582421",
            "updatedAt": "2021-02-24 13:52:34.582421"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "020_21081478"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony Cyber-shot DSC-W830",
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
                "attributes": {
                    "hdmi": "no",
                    "sensor_type": "CCD",
                    "display": "TFT",
                    "usb_version": "2",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony Cyber-shot DSC-W830",
                "metaKeywords": "Sony,Entertainment Electronics",
                "metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i",
                "attributeNames": {
                    "hdmi": "HDMI",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "usb_version": "USB version",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/020_21081478"
            }
        },
        {
            "type": "wishlist-items",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1/wishlist-items/020_21081478"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "020_21081478"
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
<summary markdown='span'>Response sample: retrieve a wishlist with the details on the wishlist items, respective concrete products, and their product labels</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "246591f8-4f30-55ce-8b17-8482859b4ac1",
        "attributes": {
            "name": "My wishlist",
            "numberOfItems": 1,
            "createdAt": "2021-02-24 13:52:34.582421",
            "updatedAt": "2021-02-24 13:52:34.582421"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products,product-labels"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "020_21081478"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 3,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        },
        {
            "type": "concrete-products",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "name": "Sony Cyber-shot DSC-W830",
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There’s a range of modes to choose from – you don’t even have to download image-editing software.",
                "attributes": {
                    "hdmi": "no",
                    "sensor_type": "CCD",
                    "display": "TFT",
                    "usb_version": "2",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony Cyber-shot DSC-W830",
                "metaKeywords": "Sony,Entertainment Electronics",
                "metaDescription": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing i",
                "attributeNames": {
                    "hdmi": "HDMI",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "usb_version": "USB version",
                    "brand": "Brand",
                    "color": "Color"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/020_21081478"
            },
            "relationships": {
                "product-labels": {
                    "data": [
                        {
                            "type": "product-labels",
                            "id": "5"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "020_21081478",
            "attributes": {
                "sku": "020_21081478"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1/wishlist-items/020_21081478"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "020_21081478"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/wishlists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlists-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/wishlist-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlist-items-response-attributes.md -->

{% include /pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/product-labels-response-attributes.md -->


## Edit a wishlist

To edit a wishlist, send the request:

---
`PATCH` **/wishlists**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: edit a wishlist. The following sample changes the name of a wishlist.

`PATCH https://glue.mysprykershop.com/wishlists`


```json
{
		"data": {
			"type": "wishlists",
			"id": "09264b7f-1894-58ed-81f4-d52d683e910a",
			"attributes": {
				"name": "birthday party"
			}
		}
	}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| id | string | &check; | Unique identifier of the wishlist to update the name of. [Create a wishlist](#create-a-wishlist) or [retrieve all wishlists](#retrieve-wishlists) to get it. |
| name | string | &check; | New name of the wishlist. |

### Response

{% include pbc/all/glue-api-guides/{{page.version}}/wishlists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/wishlists-response-attributes.md -->


## Delete a wishlist

To delete a wishlist, send the request:

---
`DELETE` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to delete. [Create a wishlist](#create-a-wishlist) or [retrieve all wishlists](#retrieve-wishlists) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

Request sample: delete a wishlist

`DELETE https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a`

### Response

If the wishlist is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 201 | Wishlist with the specified ID is not found. |
| 202 | Wishlist with the same name already exists. |
| 203 | Cannot create a wishlist. |
| 204 | Cannot update the wishlist. |
| 205 | Cannot remove the wishlist. |
| 209 | ID is not specified. |
| 210 | Please enter the name using only letters, numbers, underscores, spaces or dashes.  |
| 901 | `name` field is empty. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
