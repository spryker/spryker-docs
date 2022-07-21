---
title: Retrieve tax sets of abstract products
description: Retrieve general information about abstract products and related resources.
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
---

This document describes how to retrieve tax sets of abstract products. To retrieve full information of abstract products, see [Retrieve abstract products](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-products/abstract-products/retrieving-abstract-products.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Products Feature Integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-product-feature-integration.html).

## Retrieve tax sets of an abstract product

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}?include=product-tax-sets***

---


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get information for. |

### Request


`GET https://glue.mysprykershop.com/abstract-products/001?include=product-tax-sets`:  Retrieve information about the abstract product with SKU `001` with its tax sets.



### Response




<details>
<summary markdown='span'>Response sample: retrieve information about an abstract product with the details about tax sets</summary>

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
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=product-tax-sets"
        },
        "relationships": {
            "product-tax-sets": {
                "data": [
                    {
                        "type": "product-tax-sets",
                        "id": "0e93b0d4-6d83-5fc1-ac1d-d6ae11690406"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-tax-sets",
            "id": "0e93b0d4-6d83-5fc1-ac1d-d6ae11690406",
            "attributes": {
                "name": "Entertainment Electronics",
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
                        "name": "Luxembourg Standard",
                        "rate": "17.00",
                        "country": "LU"
                    },
                    {
                        "name": "Netherlands Standard",
                        "rate": "21.00",
                        "country": "NL"
                    },
                    {
                        "name": "Poland Standard",
                        "rate": "23.00",
                        "country": "PL"
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
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/001/product-tax-sets"
            }
        }
    ]
}
```
</details>

<a name="abstract-products-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| sku | String | SKU of the abstract product. |
| averageRating | String | Average rating of the product based on customer rating. |
| reviewCount | Integer | Number of reviews left by customer for this abstract product. |
| name | String | Name of the abstract product. |
| description | String | Description of the abstract product. |
| attributes | Object | List of attributes and their values. |
| superAttributeDefinition | String | Attributes flagged as super attributes that are, however, not relevant to distinguish between the product variants. |
| attributeMap | Object | Each super attribute / value combination and the corresponding concrete product IDs are listed here. |
| attributeMap.super_attributes | Object | Applicable super attribute and its values for the product variants. |
| attributeMap.attribute_variants | Object | List of super attributes with the list of values. |
| attributeMap.product_concrete_ids | String | Product IDs of the product variants. |
| metaTitle | String | Meta title of the product. |
| metaKeywords | String | Meta keywords of the product. |
| metaDescription | String | Meta description of the product. |
| attributeNames | Object | All non-super attribute / value combinations for the abstract product. |

For the attributes of tax sets, see [Retrieve tax sets](/docs/pbc/all/tax-management/manage-via-glue-api/retrieve-tax-sets.html#tax-sets-response-attributes).

## Possible errors

| CODE | REASON |
|-|-|
| 301 | Abstract product is not found. |
| 311 | Abstract product SKU is not specified. |
