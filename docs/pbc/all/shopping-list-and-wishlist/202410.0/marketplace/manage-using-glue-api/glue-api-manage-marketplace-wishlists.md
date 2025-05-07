---
title: "Glue API: Manage marketplace wishlists"
description: Retrieve details about wishlists and learn what else you can do with the resource in the Spryker Marketplace.
template: glue-api-storefront-guide-template
last_updated: Jan 2, 2024
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/201811.0/wishlists/managing-wishlists.html
  - /docs/marketplace/dev/glue-api-guides/201903.0/wishlists/managing-wishlists.html
  - /docs/marketplace/dev/glue-api-guides/201907.0/wishlists/managing-wishlists.html
  - /docs/marketplace/dev/glue-api-guides/202005.0/wishlists/managing-wishlists.html
related:
  - title: Managing wishlist items
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/manage-using-glue-api/glue-api-manage-wishlist-items.html
---

The Marketplace Wishlists API allows creating list and deleting [wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/wishlist-feature-overview.html) in the Marketplace, as well as managing the items in them.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see [Install the Marketplace Wishlist feature](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-wishlist-feature.html)

## Create a wishlist

To create a wishlist, send the request:

***
`POST` **/wishlists**
***

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION |
| ---------- | -------- | -------- | -------------- |
| Authorization | string       | &check;         | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

Request sample: create a wishlist

`POST https://glue.mysprykershop.com/wishlists`

```json
{
    "data": {
        "type": "wishlists",
        "attributes": {
            "name": "My_favourite_wishlist"
        }
    }
}
```

| ATTRIBUTE | TYPE   | REQUIRED | DESCRIPTION |
| ------- | ----- | ------- | -------------- |
| name      | string | &check;        | Name of the wishlist to create.|

### Response

Response sample: create a wishlist

```json
{
    "data": {
        "type": "wishlists",
        "id": "57c96d55-8a37-5998-927f-7bb663b69094",
        "attributes": {
            "name": "My_favourite_wishlist",
            "numberOfItems": 0,
            "createdAt": "2021-07-13 14:50:08.755124",
            "updatedAt": "2021-07-13 14:50:08.755124"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094"
        }
    }
}
```

| ATTRIBUTE    | TYPE   | DESCRIPTION     |
| ------------ | ------ | --------------- |
| name          | String  | Name of the wishlist.            |
| numberOfItems | Integer | Number of items in the wishlist. |
| createdAt     | String  | Creation date of the wishlist.   |
| updatedAt     | String  | Date when the wishlist was updated.         |

## Retrieve wishlists

To retrieve all wishlists of a customer, send the request:


***
`GET` **/wishlists**
***

### Request

| QUERY PARAMETER | DESCRIPTION    | POSSIBLE VALUES  |
| -------------- | ------------- | ----------- |
| include         | Adds resource relationships to the request. | <ul><li>wishlist-items</li><li>concrete-products</li><li>product-labels</li></ul> |

| REQUEST SAMPLE  | USAGE    |
| ------------ | ------------ |
| GET https://glue.mysprykershop.com/wishlists   | Retrieve all the wishlists of a customer.  |
| GET https://glue.mysprykershop.com/wishlists?include=wishlist-items | Retrieve all the wishlists of a customer with wishlist items. |
| GET https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products | Retrieve all the wishlists of a customer with wishlist items and respective concrete products. |
| GET https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products,product-labels | Retrieve all the wishlists of a customer with wishlist items, respective concrete products, and their product labels. |

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION |
| ------------ | ----------- | -------- | --------- |
| Authorization | string       | &check;         | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

### Response

<details>
<summary>Response sample: no wishlists found</summary>

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
<summary>Response sample: retrieve all the wishlists</summary>


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
<summary>Response sample: retrieve all the wishlists with wishlist items</summary>

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
<summary>Response sample: retrieve all the wishlists with wishlist items and respective concrete products</summary>

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
<summary>Response sample: retrieve all the wishlists with wishlist items, respective concrete products, and their product labels</summary>

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
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There's a range of modes to choose from – you don't even have to download image-editing software.",
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

| ATTRIBUTE     | TYPE    | DESCRIPTION  |
| --------- | ------ | ----------------- |
| name          | String  | Name of the wishlist.  |
| numberOfItems | Integer | Number of items in the wishlist. |
| createdAt     | String  | Creation date of the wishlist.|
| updatedAt     | String  | Date when the wishlist was updated.|


{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

For attributes of the included resources, see:

- [Add an item to a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlist-items.html#add-an-item-to-a-wishlist)
- [Retrieve a product label](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html)

## Retrieve a wishlist

To retrieve a specific wishlist, send the request:

***
`GET` {% raw %}**/wishlists/*{{wishlist_id}}***{% endraw %}
***

| PATH PARAMETER        | DESCRIPTION      |
| ---------------- | ------------------------- |
| {% raw %}***{{wishlist_id}}***{% endraw %} | Unique identifier of the wishlist to retrieve the items of. [Create a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-wishlists.html) to get it. |

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION  |
| ------------ | ----------- | ------- | -------------- |
| Authorization | string       | &check;        | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION     | POSSIBLE VALUES |
| ---------- | -------------------- | --------------------- |
| include    | Adds resource relationships to the request. | <ul><li>wishlist-items</li><li>concrete-products</li><li>product-labels</li><li>concrete-product-availabilities</li><li>concrete-product-prices</li><li>merchants</li></ul> |

| REQUEST SAMPLE   | USAGE   |
| ------------- | ------------ |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1 | Retrieve a wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items | Retrieve the wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. Include wishlist items in the response. |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products | Retrieve the wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. Include wishlist items and respective concrete products in the response. |
| GET https://glue.mysprykershop.com/wishlists/246591f8-4f30-55ce-8b17-8482859b4ac1?include=wishlist-items,concrete-products,product-labels | Retrieve the wishlist with the `246591f8-4f30-55ce-8b17-8482859b4ac1` identifier. Include wishlist items, respective concrete products and their product labels in the response. |
| GET https://glue.mysprykershop.com/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4?include=wishlist-items,concrete-products,concrete-product-availabilities | Retrieve the wishlist with the `bb7dbe75-d892-582f-b438-d7f6cbfd3fc4`identifier. Include wishlist items, concrete products and concrete product availabilities in the response. |
| GET https://glue.mysprykershop.com/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4?include=wishlist-items,concrete-products,concrete-product-prices | Retrieve the wishlist with the `bb7dbe75-d892-582f-b438-d7f6cbfd3fc4`identifier. Include wishlist items, concrete products, and their prices. |
| GET https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items,concrete-products,product-offers | Retrieve the wishlist with the `13c813a3-8916-5444-9f1b-e4d8c56a085d`identifier. Include wishlist items, concrete products and product offers for these products. |
| GET https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d?include=wishlist-items,concrete-products,product-offers,product-offer-availabilities | Retrieve the wishlist with the `13c813a3-8916-5444-9f1b-e4d8c56a085d`identifier. Include wishlist items and product offer availabilities. |
| GET https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d?include=wishlist-items,concrete-products,product-offers,product-offer-prices | Retrieve the wishlist with the `13c813a3-8916-5444-9f1b-e4d8c56a085d`identifier. Include wishlist items and product offer prices. |
| GET https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094?include=wishlist-items,merchants | Retrieve the wishlist with the `57c96d55-8a37-5998-927f-7bb663b69094`identifier. Include wishlist items and merchant information. |



### Response

<details>
<summary>Response sample: retrieve a wishlist</summary>

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
<summary>Response sample: retrieve a wishlist with wishlist items included</summary>

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
<summary>Response sample: retrieve a wishlist with wishlist items and respective concrete products included</summary>

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
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There's a range of modes to choose from – you don't even have to download image-editing software.",
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
<summary>Response sample: retrieve a wishlist with wishlist items, respective concrete products, and product labels included</summary>

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
                "description": "Styled for your pocket  Precision photography meets the portability of a smartphone. The W800 is small enough to take great photos, look good while doing it, and slip in your pocket. Shooting great photos and videos is easy with the W800. Buttons are positioned for ease of use, while a dedicated movie button makes shooting movies simple. The vivid 2.7-type Clear Photo LCD display screen lets you view your stills and play back movies with minimal effort. Whip out the W800 to capture crisp, smooth footage in an instant. At the press of a button, you can record blur-free 720 HD images with digital sound. Breathe new life into a picture by using built-in Picture Effect technology. There's a range of modes to choose from – you don't even have to download image-editing software.",
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

<details>
<summary>Response sample: retrieve a wishlist with wishlist items, concrete products and their availabilities</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "bb7dbe75-d892-582f-b438-d7f6cbfd3fc4",
        "attributes": {
            "name": "My_wishlist",
            "numberOfItems": 1,
            "createdAt": "2021-07-13 14:49:39.635172",
            "updatedAt": "2021-07-13 14:49:39.635172"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "109_19416433"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-availabilities",
            "id": "109_19416433",
            "attributes": {
                "isNeverOutOfStock": false,
                "availability": true,
                "quantity": "10.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/109_19416433/concrete-product-availabilities"
            }
        },
        {
            "type": "concrete-products",
            "id": "109_19416433",
            "attributes": {
                "sku": "109_19416433",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "109",
                "name": "Sony SW2 SmartWatch",
                "description": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on top of everything. If you like to get out running, you can use SmartWatch as your phone remote. If it rains, you can keep on going. SmartWatch 2 can take the rain. If it's bright and sunny, SmartWatch 2 has an impressive sunlight-readable display. Take it anywhere. When you are using a wireless Bluetooth® headset for music, you can use SmartWatch 2 as a phone remote to make or receive calls. When a call comes in, you can see who's calling in your SmartWatch display, press once to answer and enjoy hands-free calling at its easiest. You can also browse recent calls in your call log and use SmartWatch to initiate a call.",
                "attributes": {
                    "display_type": "LCD",
                    "shape": "square",
                    "bluetooth_version": "3",
                    "battery_life": "168 h",
                    "brand": "Sony",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SW2 SmartWatch",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on",
                "attributeNames": {
                    "display_type": "Display type",
                    "shape": "Shape",
                    "bluetooth_version": "Blootooth version",
                    "battery_life": "Battery life",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/109_19416433"
            },
            "relationships": {
                "concrete-product-availabilities": {
                    "data": [
                        {
                            "type": "concrete-product-availabilities",
                            "id": "109_19416433"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "109_19416433",
            "attributes": {
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "id": "109_19416433",
                "sku": "109_19416433",
                "availability": {
                    "isNeverOutOfStock": false,
                    "availability": true,
                    "quantity": "10.0000000000"
                },
                "prices": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4/wishlist-items/109_19416433"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "109_19416433"
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
<summary>Response sample: retrieve a wishlist with wishlist items, concrete products and their prices</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "bb7dbe75-d892-582f-b438-d7f6cbfd3fc4",
        "attributes": {
            "name": "My_wishlist",
            "numberOfItems": 1,
            "createdAt": "2021-07-13 14:49:39.635172",
            "updatedAt": "2021-07-13 14:49:39.635172"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "109_19416433"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-product-prices",
            "id": "109_19416433",
            "attributes": {
                "price": 12572,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 12572,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/109_19416433/concrete-product-prices"
            }
        },
        {
            "type": "concrete-products",
            "id": "109_19416433",
            "attributes": {
                "sku": "109_19416433",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "109",
                "name": "Sony SW2 SmartWatch",
                "description": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on top of everything. If you like to get out running, you can use SmartWatch as your phone remote. If it rains, you can keep on going. SmartWatch 2 can take the rain. If it's bright and sunny, SmartWatch 2 has an impressive sunlight-readable display. Take it anywhere. When you are using a wireless Bluetooth® headset for music, you can use SmartWatch 2 as a phone remote to make or receive calls. When a call comes in, you can see who's calling in your SmartWatch display, press once to answer and enjoy hands-free calling at its easiest. You can also browse recent calls in your call log and use SmartWatch to initiate a call.",
                "attributes": {
                    "display_type": "LCD",
                    "shape": "square",
                    "bluetooth_version": "3",
                    "battery_life": "168 h",
                    "brand": "Sony",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SW2 SmartWatch",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Anywhere. Any weather SmartWatch 2 is the wireless accessory that has something for everybody. If you are a busy communicator, you will appreciate being on",
                "attributeNames": {
                    "display_type": "Display type",
                    "shape": "Shape",
                    "bluetooth_version": "Blootooth version",
                    "battery_life": "Battery life",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/109_19416433"
            },
            "relationships": {
                "concrete-product-prices": {
                    "data": [
                        {
                            "type": "concrete-product-prices",
                            "id": "109_19416433"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "109_19416433",
            "attributes": {
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "id": "109_19416433",
                "sku": "109_19416433",
                "availability": {
                    "isNeverOutOfStock": false,
                    "availability": true,
                    "quantity": "10.0000000000"
                },
                "prices": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/bb7dbe75-d892-582f-b438-d7f6cbfd3fc4/wishlist-items/109_19416433"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "109_19416433"
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
<summary>Response sample: retrieve a wishlist with wishlist items, concrete products, and product offers</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "13c813a3-8916-5444-9f1b-e4d8c56a085d",
        "attributes": {
            "name": "My wish list",
            "numberOfItems": 3,
            "createdAt": "2021-07-15 08:55:22.109760",
            "updatedAt": "2021-07-15 08:55:22.109760"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d?include=wishlist-items,concrete-products,product-offers"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "011_30775359_offer59"
                    },
                    {
                        "type": "wishlist-items",
                        "id": "011_30775359_offer18"
                    },
                    {
                        "type": "wishlist-items",
                        "id": "111_12295890"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offers",
            "id": "offer59",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer59"
            }
        },
        {
            "type": "product-offers",
            "id": "offer18",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer18"
            }
        },
        {
            "type": "concrete-products",
            "id": "011_30775359",
            "attributes": {
                "sku": "011_30775359",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "011",
                "name": "Canon IXUS 180",
                "description": "Effortless creativity Just point and shoot to capture fantastic photos or movies with one touch of the Auto Button, which allows Smart Auto to take control and choose the perfect camera settings for you. Play with your creativity in stills or movies using a range of Creative Filters such as Fish Eye, Miniature and Toy Camera.  Enjoy exceptional quality, detailed images ideal for creating stunning poster sized prints thanks to 20.0 Megapixels and DIGIC 4+ processing. An intelligent optical Image Stabilizer ensures sharp stills and steady movies in any situation, while the 6.8 cm (2.7") LCD screen allows easy viewing and sharing.",
                "attributes": {
                    "megapixel": "20 MP",
                    "sensor_type": "CCD",
                    "display": "LCD",
                    "digital_zoom": "4 x",
                    "brand": "Canon",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 180",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Effortless creativity Just point and shoot to capture fantastic photos or movies with one touch of the Auto Button, which allows Smart Auto to take control",
                "attributeNames": {
                    "megapixel": "Megapixel",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "digital_zoom": "Digital zoom",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/011_30775359"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer59"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer18"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer59"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer18"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "011_30775359_offer59",
            "attributes": {
                "productOfferReference": "offer59",
                "merchantReference": "MER000001",
                "id": "011_30775359_offer59",
                "sku": "011_30775359",
                "availability": {
                    "isNeverOutOfStock": true,
                    "availability": true,
                    "quantity": "0.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 37881,
                        "netAmount": 34093,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 32940,
                        "netAmount": 29646,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/011_30775359_offer59"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "011_30775359"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "011_30775359_offer18",
            "attributes": {
                "productOfferReference": "offer18",
                "merchantReference": "MER000001",
                "id": "011_30775359_offer18",
                "sku": "011_30775359",
                "availability": {
                    "isNeverOutOfStock": false,
                    "availability": true,
                    "quantity": "10.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 39986,
                        "netAmount": 35987,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 34770,
                        "netAmount": 31293,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/011_30775359_offer18"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "011_30775359"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "111_12295890",
            "attributes": {
                "sku": "111_12295890",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "111",
                "name": "Sony SmartWatch",
                "description": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your world's just a tap, swipe or press away. Want to do more with your SmartWatch? Download compatible applications on Google Play™. And customise your SmartWatch to make it exclusively yours. Customise your SmartWatch with a 20mm wristband. Or wear its stylish wristband. You can even use it as a clip. This ultra-thin Android™ remote was designed to impress. An elegant Android watch that'll keep you discreetly updated and your hands free.",
                "attributes": {
                    "shape": "square",
                    "bluetooth_version": "3",
                    "battery_life": "72 h",
                    "display_type": "LCD",
                    "brand": "Sony",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SmartWatch",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your ",
                "attributeNames": {
                    "shape": "Shape",
                    "bluetooth_version": "Blootooth version",
                    "battery_life": "Battery life",
                    "display_type": "Display type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/111_12295890"
            }
        },
        {
            "type": "wishlist-items",
            "id": "111_12295890",
            "attributes": {
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "id": "111_12295890",
                "sku": "111_12295890",
                "availability": {
                    "isNeverOutOfStock": true,
                    "availability": true,
                    "quantity": "20.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 19568,
                        "netAmount": 17611,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 22503,
                        "netAmount": 20253,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 19568,
                        "netAmount": 17611,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 22503,
                        "netAmount": 20253,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/111_12295890"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "111_12295890"
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
<summary>Response sample: retrieve a wishlist with wishlist items, concrete products, product offers, and product offer availabilities</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "13c813a3-8916-5444-9f1b-e4d8c56a085d",
        "attributes": {
            "name": "My wish list",
            "numberOfItems": 3,
            "createdAt": "2021-07-15 08:55:22.109760",
            "updatedAt": "2021-07-15 08:55:22.109760"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d?include=wishlist-items,concrete-products,product-offers,product-offer-availabilities"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "011_30775359_offer59"
                    },
                    {
                        "type": "wishlist-items",
                        "id": "011_30775359_offer18"
                    },
                    {
                        "type": "wishlist-items",
                        "id": "111_12295890"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offer-availabilities",
            "id": "offer59",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer59/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer59",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer59"
            }
        },
        {
            "type": "product-offer-availabilities",
            "id": "offer18",
            "attributes": {
                "isNeverOutOfStock": false,
                "availability": true,
                "quantity": "10.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer18/product-offer-availabilities"
            }
        },
        {
            "type": "product-offers",
            "id": "offer18",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer18"
            }
        },
        {
            "type": "concrete-products",
            "id": "011_30775359",
            "attributes": {
                "sku": "011_30775359",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "011",
                "name": "Canon IXUS 180",
                "description": "Effortless creativity Just point and shoot to capture fantastic photos or movies with one touch of the Auto Button, which allows Smart Auto to take control and choose the perfect camera settings for you. Play with your creativity in stills or movies using a range of Creative Filters such as Fish Eye, Miniature and Toy Camera.  Enjoy exceptional quality, detailed images ideal for creating stunning poster sized prints thanks to 20.0 Megapixels and DIGIC 4+ processing. An intelligent optical Image Stabilizer ensures sharp stills and steady movies in any situation, while the 6.8 cm (2.7") LCD screen allows easy viewing and sharing.",
                "attributes": {
                    "megapixel": "20 MP",
                    "sensor_type": "CCD",
                    "display": "LCD",
                    "digital_zoom": "4 x",
                    "brand": "Canon",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 180",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Effortless creativity Just point and shoot to capture fantastic photos or movies with one touch of the Auto Button, which allows Smart Auto to take control",
                "attributeNames": {
                    "megapixel": "Megapixel",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "digital_zoom": "Digital zoom",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/011_30775359"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer59"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer18"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer59"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer18"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "011_30775359_offer59",
            "attributes": {
                "productOfferReference": "offer59",
                "merchantReference": "MER000001",
                "id": "011_30775359_offer59",
                "sku": "011_30775359",
                "availability": {
                    "isNeverOutOfStock": true,
                    "availability": true,
                    "quantity": "0.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 37881,
                        "netAmount": 34093,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 32940,
                        "netAmount": 29646,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/011_30775359_offer59"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "011_30775359"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "011_30775359_offer18",
            "attributes": {
                "productOfferReference": "offer18",
                "merchantReference": "MER000001",
                "id": "011_30775359_offer18",
                "sku": "011_30775359",
                "availability": {
                    "isNeverOutOfStock": false,
                    "availability": true,
                    "quantity": "10.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 39986,
                        "netAmount": 35987,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 34770,
                        "netAmount": 31293,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/011_30775359_offer18"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "011_30775359"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "111_12295890",
            "attributes": {
                "sku": "111_12295890",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "111",
                "name": "Sony SmartWatch",
                "description": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your world's just a tap, swipe or press away. Want to do more with your SmartWatch? Download compatible applications on Google Play™. And customise your SmartWatch to make it exclusively yours. Customise your SmartWatch with a 20mm wristband. Or wear its stylish wristband. You can even use it as a clip. This ultra-thin Android™ remote was designed to impress. An elegant Android watch that'll keep you discreetly updated and your hands free.",
                "attributes": {
                    "shape": "square",
                    "bluetooth_version": "3",
                    "battery_life": "72 h",
                    "display_type": "LCD",
                    "brand": "Sony",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SmartWatch",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your ",
                "attributeNames": {
                    "shape": "Shape",
                    "bluetooth_version": "Blootooth version",
                    "battery_life": "Battery life",
                    "display_type": "Display type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/111_12295890"
            }
        },
        {
            "type": "wishlist-items",
            "id": "111_12295890",
            "attributes": {
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "id": "111_12295890",
                "sku": "111_12295890",
                "availability": {
                    "isNeverOutOfStock": true,
                    "availability": true,
                    "quantity": "20.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 19568,
                        "netAmount": 17611,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 22503,
                        "netAmount": 20253,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 19568,
                        "netAmount": 17611,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 22503,
                        "netAmount": 20253,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/111_12295890"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "111_12295890"
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
<summary>Response sample: retrieve a wishlist with wishlist items, concrete products, product offers, and product offer prices</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "13c813a3-8916-5444-9f1b-e4d8c56a085d",
        "attributes": {
            "name": "My wish list",
            "numberOfItems": 3,
            "createdAt": "2021-07-15 08:55:22.109760",
            "updatedAt": "2021-07-15 08:55:22.109760"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d?include=wishlist-items,concrete-products,product-offers,product-offer-prices"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "011_30775359_offer59"
                    },
                    {
                        "type": "wishlist-items",
                        "id": "011_30775359_offer18"
                    },
                    {
                        "type": "wishlist-items",
                        "id": "111_12295890"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offer-prices",
            "id": "offer59",
            "attributes": {
                "price": 32940,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 32940,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer59/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer59",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer59"
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer18",
            "attributes": {
                "price": 34770,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 34770,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer18/product-offer-prices"
            }
        },
        {
            "type": "product-offers",
            "id": "offer18",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000002",
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer18"
            }
        },
        {
            "type": "concrete-products",
            "id": "011_30775359",
            "attributes": {
                "sku": "011_30775359",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "011",
                "name": "Canon IXUS 180",
                "description": "Effortless creativity Just point and shoot to capture fantastic photos or movies with one touch of the Auto Button, which allows Smart Auto to take control and choose the perfect camera settings for you. Play with your creativity in stills or movies using a range of Creative Filters such as Fish Eye, Miniature and Toy Camera.  Enjoy exceptional quality, detailed images ideal for creating stunning poster sized prints thanks to 20.0 Megapixels and DIGIC 4+ processing. An intelligent optical Image Stabilizer ensures sharp stills and steady movies in any situation, while the 6.8 cm (2.7") LCD screen allows easy viewing and sharing.",
                "attributes": {
                    "megapixel": "20 MP",
                    "sensor_type": "CCD",
                    "display": "LCD",
                    "digital_zoom": "4 x",
                    "brand": "Canon",
                    "color": "Blue"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Canon IXUS 180",
                "metaKeywords": "Canon,Entertainment Electronics",
                "metaDescription": "Effortless creativity Just point and shoot to capture fantastic photos or movies with one touch of the Auto Button, which allows Smart Auto to take control",
                "attributeNames": {
                    "megapixel": "Megapixel",
                    "sensor_type": "Sensor type",
                    "display": "Display",
                    "digital_zoom": "Digital zoom",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/011_30775359"
            },
            "relationships": {
                "product-offers": {
                    "data": [
                        {
                            "type": "product-offers",
                            "id": "offer59"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer18"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer59"
                        },
                        {
                            "type": "product-offers",
                            "id": "offer18"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "011_30775359_offer59",
            "attributes": {
                "productOfferReference": "offer59",
                "merchantReference": "MER000001",
                "id": "011_30775359_offer59",
                "sku": "011_30775359",
                "availability": {
                    "isNeverOutOfStock": true,
                    "availability": true,
                    "quantity": "0.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 37881,
                        "netAmount": 34093,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 32940,
                        "netAmount": 29646,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/011_30775359_offer59"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "011_30775359"
                        }
                    ]
                }
            }
        },
        {
            "type": "wishlist-items",
            "id": "011_30775359_offer18",
            "attributes": {
                "productOfferReference": "offer18",
                "merchantReference": "MER000001",
                "id": "011_30775359_offer18",
                "sku": "011_30775359",
                "availability": {
                    "isNeverOutOfStock": false,
                    "availability": true,
                    "quantity": "10.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 39986,
                        "netAmount": 35987,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 34770,
                        "netAmount": 31293,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/011_30775359_offer18"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "011_30775359"
                        }
                    ]
                }
            }
        },
        {
            "type": "concrete-products",
            "id": "111_12295890",
            "attributes": {
                "sku": "111_12295890",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "111",
                "name": "Sony SmartWatch",
                "description": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your world's just a tap, swipe or press away. Want to do more with your SmartWatch? Download compatible applications on Google Play™. And customise your SmartWatch to make it exclusively yours. Customise your SmartWatch with a 20mm wristband. Or wear its stylish wristband. You can even use it as a clip. This ultra-thin Android™ remote was designed to impress. An elegant Android watch that'll keep you discreetly updated and your hands free.",
                "attributes": {
                    "shape": "square",
                    "bluetooth_version": "3",
                    "battery_life": "72 h",
                    "display_type": "LCD",
                    "brand": "Sony",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SmartWatch",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Your world at your fingertips SmartWatch features an easy-to-use, ultra-responsive touch display. Finding your way around SmartWatch is super simple. Your ",
                "attributeNames": {
                    "shape": "Shape",
                    "bluetooth_version": "Blootooth version",
                    "battery_life": "Battery life",
                    "display_type": "Display type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/111_12295890"
            }
        },
        {
            "type": "wishlist-items",
            "id": "111_12295890",
            "attributes": {
                "productOfferReference": null,
                "merchantReference": "MER000001",
                "id": "111_12295890",
                "sku": "111_12295890",
                "availability": {
                    "isNeverOutOfStock": true,
                    "availability": true,
                    "quantity": "20.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 19568,
                        "netAmount": 17611,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 22503,
                        "netAmount": 20253,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 19568,
                        "netAmount": 17611,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 22503,
                        "netAmount": 20253,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/13c813a3-8916-5444-9f1b-e4d8c56a085d/wishlist-items/111_12295890"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "111_12295890"
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
<summary>Response sample: retrieve a wishlist with wishlist items and merchant information included</summary>

```json
{
    "data": {
        "type": "wishlists",
        "id": "57c96d55-8a37-5998-927f-7bb663b69094",
        "attributes": {
            "name": "My_favourite_wishlist",
            "numberOfItems": 1,
            "createdAt": "2021-07-13 14:50:08.755124",
            "updatedAt": "2021-07-13 14:50:08.755124"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094"
        },
        "relationships": {
            "wishlist-items": {
                "data": [
                    {
                        "type": "wishlist-items",
                        "id": "092_24495842_offer5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "merchants",
            "id": "MER000001",
            "attributes": {
                "merchantName": "Spryker",
                "merchantUrl": "/en/merchant/spryker",
                "contactPersonRole": "E-Commerce Manager",
                "contactPersonTitle": "Mr",
                "contactPersonFirstName": "Harald",
                "contactPersonLastName": "Schmidt",
                "contactPersonPhone": "+49 30 208498350",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png",
                "publicEmail": "info@spryker.com",
                "publicPhone": "+49 30 234567891",
                "description": "Spryker is the main merchant at the Demo Marketplace.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png",
                "deliveryTime": "1-3 days",
                "faxNumber": "+49 30 234567800",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>",
                    "dataPrivacy": "Spryker Systems GmbH values the privacy of your personal data."
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        },
        {
            "type": "wishlist-items",
            "id": "092_24495842_offer5",
            "attributes": {
                "productOfferReference": "offer5",
                "merchantReference": "MER000001",
                "id": "092_24495842_offer5",
                "sku": "092_24495842",
                "availability": {
                    "isNeverOutOfStock": true,
                    "availability": true,
                    "quantity": "10.0000000000"
                },
                "prices": [
                    {
                        "priceTypeName": "ORIGINAL",
                        "grossAmount": 17459,
                        "netAmount": 15713,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 7459,
                        "netAmount": 5713,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "DEFAULT",
                        "grossAmount": 10000,
                        "netAmount": 8070,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094/wishlist-items/092_24495842_offer5"
            },
            "relationships": {
                "merchants": {
                    "data": [
                        {
                            "type": "merchants",
                            "id": "MER000001"
                        }
                    ]
                }
            }
        }
    ]
}
```

</details>

| ATTRIBUTE  | TYPE  | DESCRIPTION     |
| ---------- | ----- | --------------- |
| name          | String  | Wishlist name.                      |
| numberOfItems | Integer | Number of items in the wishlist.    |
| createdAt     | String  | Creation date of the wishlist. |
| updatedAt     | String  | Date when the wishlist was updated. |

{% include pbc/all/glue-api-guides/{{page.version}}/concrete-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/concrete-products-response-attributes.md -->

For the attributes of the included resources, see

[Adding items to wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlist-items.html#add-an-item-to-a-wishlist)

[Retrieving concrete product availabilities](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html)

[Retrieving concrete product prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html)

[Retrieving product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/glue-api-retrieve-product-offers.html)

[Retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#merchants-response-attributes)

## Edit a wishlist

To edit a wishlist, send the request:

***
`PATCH` **/wishlists**
***

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION    |
| ------ | ------ | ------ | -------------- |
| Authorization | string       | &check;        | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

Request sample: edit a wishlist

`PATCH https://glue.mysprykershop.com/wishlists`

The following sample changes the name of a wishlist.

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

| ATTRIBUTE | TYPE   | REQUIRED | DESCRIPTION    |
| ------ | ---- | ------- | ----------------------- |
| id        | string | &check;   | Unique identifier of the wishlist to update the name of. [Create a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-wishlists.html) to get it. |
| name      | string | &check;   | New name of the wishlist.   |

### Response

| ATTRIBUTE | TYPE | DESCRIPTION     |
| --------- | ---- | --------------- |
| name          | String  | Name of the wishlist.            |
| numberOfItems | Integer | Number of items in the wishlist. |
| createdAt     | String  | Creation date of the wishlist.   |
| updatedAt     | String  | Date when the wishlist was updated.        |

## Delete a wishlist

To delete a wishlist, send the request:

------

`DELETE` **/wishlists/*{{wishlist_id}}***

------

| PATH PARAMETER   | DESCRIPTION     |
| --------- | ------------------- |
| ***{{wishlist_id}}*** | Unique identifier of the wishlist to delete. [Create a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-wishlists.html#create-a-wishlist) or [retrieve all wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-wishlists.html) to get it. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION   |
| ---------- | -------- | ----- | ----------------- |
| Authorization | string       | &check;        | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

Request sample:

`DELETE https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a`

### Response

If the wishlist is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON          |
| --- | ------------------------- |
| 201  | Cannot find the wishlist.                     |
| 202  | A wishlist with the same name already exists. |
| 203  | Cannot create a wishlist.                     |
| 204  | Cannot update the wishlist.                   |
| 205  | Cannot remove the wishlist.                   |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
