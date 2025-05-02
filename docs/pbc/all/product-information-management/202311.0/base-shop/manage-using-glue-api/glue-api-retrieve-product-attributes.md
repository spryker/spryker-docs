---
title: "Glue API: Retrieve product attributes"
description: The article explains how you can retrieve product attributes via the API
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-product-attributes
originalArticleId: 11708dbe-4c10-47db-8e40-d5cf23a8c3eb
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/retrieving-product-attributes.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/glue-api-retrieve-product-attributes.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-product-attributes.html
related:
  - title: Configurable Bundle feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html
---

The Product Management Attributes API allows you to retrieve all predefined [product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) available in your shop system.

{% info_block infoBox %}

Only preset attributes are retrieved. So if an attribute allows custom input ( `"allowInput":true`), and the custom value is provided, the custom value is not retrieved.

{% endinfo_block %}

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html).

<a name="{all-attributes}"></a>

## Retrieve all product attributes

To retrieve all product attributes, send the request:
***
`GET` **/product-management-attributes**
***

### Request

Request sample: retrieve all product attributes

`https://glue.mysprykershop.com/product-management-attributes`

### Response

<details>
<summary>Response sample: retrieve all product attributes</summary>

```json
{
    "data": [
        {
            "type": "product-management-attributes",
            "id": "storage_capacity",
            "attributes": {
                "key": "storage_capacity",
                "inputType": "text",
                "allowInput": false,
                "isSuper": true,
                "localizedKeys": [
                    {
                        "localeName": "en_US",
                        "translation": "Storage Capacity"
                    },
                    {
                        "localeName": "de_DE",
                        "translation": "Speichergröße"
                    }
                ],
                "values": [
                    {
                        "value": "128 GB",
                        "localizedValues": []
                    },
                    {
                        "value": "64 GB",
                        "localizedValues": []
                    },
                    {
                        "value": "32 GB",
                        "localizedValues": []
                    },
                    {
                        "value": "16 GB",
                        "localizedValues": []
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-management-attributes/storage_capacity"
            }
        },
        {
            "type": "product-management-attributes",
            "id": "white_balance",
            "attributes": {
                "key": "white_balance",
                "inputType": "text",
                "allowInput": false,
                "isSuper": false,
                "localizedKeys": [
                    {
                        "localeName": "en_US",
                        "translation": "White balance"
                    },
                    {
                        "localeName": "de_DE",
                        "translation": "Weißabgleich"
                    }
                ],
                "values": [
                    {
                        "value": "manual",
                        "localizedValues": [
                            {
                                "localeName": "en_US",
                                "translation": "Manual"
                            },
                            {
                                "localeName": "de_DE",
                                "translation": "Manuell"
                            }
                        ]
                    },
                    {
                        "value": "auto",
                        "localizedValues": [
                            {
                                "localeName": "en_US",
                                "translation": "Auto"
                            },
                            {
                                "localeName": "de_DE",
                                "translation": "Auto"
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-management-attributes/white_balance"
            }
        }
    ],
    "links": {
        "self": "glue.mysprykershop.com/product-management-attributes"
    }
}
```
</details>


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| allowInput | Boolean | Indicates if custom values can be entered for this product attribute. |
| isSuper | Boolean | Indicates if it's a super attribute or not. |
| inputType | String | Input type of the product attribute, for example, text, number, select, etc. |
| localeName | String | Name of the locale. |
| values | Array | Possible values of the attribute. |
| id | String | Product attribute key. |
| key | String | Product attribute key. |
| translation | String | Translation for the locale. |

## Retrieve a product attribute

To retrieve a product attribute, send the request:

***
`GET` **/product-management-attributes/{% raw %}{{{% endraw %}attribute_id{% raw %}}}{% endraw %}**
***

| PATH PARAMETER | 	DESCRIPTION |
| --- | --- |
| {% raw %}{{{% endraw %}attribute_id{% raw %}}}{% endraw %} | A unique identifier of an attribute. [Retrieve product attributes](#retrieve-all-product-attributes) to get it. |

### Request

Request sample: retrieve a product attribute

`https://glue.mysprykershop.com/product-management-attributes/storage_capacity`

### Response

<details>
<summary>Response sample: retrieve a product attribute</summary>

```json
{
    "data": {
        "type": "product-management-attributes",
        "id": "storage_capacity",
        "attributes": {
            "key": "storage_capacity",
            "inputType": "text",
            "allowInput": false,
            "isSuper": true,
            "localizedKeys": [
                {
                    "localeName": "en_US",
                    "translation": "Storage Capacity"
                },
                {
                    "localeName": "de_DE",
                    "translation": "Speichergröße"
                }
            ],
            "values": [
                {
                    "value": "32 GB",
                    "localizedValues": []
                },
                {
                    "value": "128 GB",
                    "localizedValues": []
                },
                {
                    "value": "16 GB",
                    "localizedValues": []
                },
                {
                    "value": "64 GB",
                    "localizedValues": []
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/product-management-attributes/storage_capacity"
        }
    }
}
```
</details>

For the attributes, see [Retrieve all product attributes](#retrieve-all-product-attributes).

Possible errors

| CODE | REASON |
| --- | --- |
| 4201 | Attribute not found. |

For generic Glue Application errors that can also occur, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
