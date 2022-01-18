---
title: Accessing Product Labels
last_updated: Jul 31, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v2/docs/retrieving-product-labels
originalArticleId: 26a2e350-e9ac-4787-bb3e-f6bee5546af4
redirect_from:
  - /v2/docs/retrieving-product-labels
  - /v2/docs/en/retrieving-product-labels
---

[Product labels](/docs/scos/user/features/{{page.version}}/product-labels-feature-overview.html) are used to draw your customers' attention to some specific products. Each of them has a name, a priority, and a validity period. The Product Labels API provides endpoints for getting labels via the REST HTTP requests.

{% info_block infoBox "Note" %}
Product labels are available only for abstract products.
{% endinfo_block %}

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Product Labels API](/docs/scos/dev/feature-integration-guides/{{page.version}}/discount-promotion-feature-integration.html).

## Get Product Label by ID
To retrieve a product label, send this GET request:

`/product-labels/{% raw %}{{{% endraw %}label-id{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/product-labels/3`
where `3` is the ID of the label you want to retrieve.
Label IDs can be found in the `Products / Product Labels` section of the administration interface.

![Product Labels 2.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/Product%20Labels%202.png)

**Sample Response**
```json
{
    "data": {
			"type": "product-labels",
			"id": "3",
			"attributes": {
				"name": "Standard Label",
				"isExclusive": false,
				"position": 3,
				"frontEndReference": ""
			},
			"links": {
				"self": "http://mysprykershop.com/product-labels/3"
			}
		}
	}
```

### Possible errors
| Code | Reason |
| --- | --- |
| 1201 | Product label is missing |
| 1202 | Product label ID is missing |

## Get Product Labels by Product
To retrieve the labels of a product, send this GET request:
`/abstract-products/{% raw %}{{{% endraw %}product-sku{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/abstract-products/001`
where `001` is the SKU of the product.

**Sample Response**
```json
{
		"data": {
			"type": "abstract-products",
			"id": "001",
			"attributes": {
				"sku": "001",
				"name": "Canon IXUS 160",
				...
				}
				...
				"relationships": {
				...
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
			...
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
					"self": "http://mysprykershop.com/product-labels/3"
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
					"self": "http://mysprykershop.com/product-labels/5"
				}
			}
		]
	}
```

### Possible errors
| Code | Reason |
| --- | --- |
| 301 | Abstract product is missing |
| 311 | Abstract product SKU not specified |
