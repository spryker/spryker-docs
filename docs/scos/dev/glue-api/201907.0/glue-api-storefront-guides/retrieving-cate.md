---
title: Browsing a Category Tree
originalLink: https://documentation.spryker.com/v3/docs/retrieving-category-trees
redirect_from:
  - /v3/docs/retrieving-category-trees
  - /v3/docs/en/retrieving-category-trees
---

By means of the category API, you are able to retrieve the exact structure of your category tree with its hierarchical characteristics. The category nodes, which describe the tree structure, as well as the categories themselves can be retrieved.

In your development, these resources can help you to:

* Retrieve a category tree for your catalog
* Retrieve сategory specific information
* Find out which categories a product belongs to

{% info_block infoBox %}
For more information on managing the category tree, see [Category Hierarchy](
{% endinfo_block %}.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Category API Feature Integration]().

## Get Full Category Tree
To retrieve the full category tree, containing all available nodes and their children, send a GET request to the following endpoint:
`/category-trees`
Sample request: `GET http://mysprykershop.com/category-trees`
If the request is successful, the resource responds with a **RestCategoryTreesResponse**.
**Response sample:**

| Field* | Type | Description |
| --- | --- | --- |
| nodeId | String | Category node ID |
| order | Integer | Digits between 1 and 100, with 100 ranking the highest (on one level under the parent node) |
| name | String | Name of category associated with the node |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned

<details open>
<summary>Sample </summary>

```js
{
		"data": [
			{
				"type": "category-trees",
				"id": null,
				"attributes": {
					"categoryNodesStorage": [
						{
							"nodeId": 5,
							"order": 100,
							"name": "Computer",
							"children": [
								{
									"nodeId": 6,
									"order": 100,
									"name": "Notebooks",
									"children": []
								},
								{
									"nodeId": 7,
									"order": 90,
									"name": "Pc's/Workstations",
									"children": []
								},
								{
									"nodeId": 8,
									"order": 80,
									"name": "Tablets",
									"children": []
								}
							]
						},
						{
							"nodeId": 2,
							"order": 90,
							"name": "Cameras & Camcorders",
							"children": [
								{
									"nodeId": 4,
									"order": 100,
									"name": "Digital Cameras",
									"children": []
								},
								{
									"nodeId": 3,
									"order": 90,
									"name": "Camcorders",
									"children": []
								}
							]
						},
						{
							"nodeId": 16,
							"order": 80,
							"name": "Food",
							"children": []
						},
						{
							"nodeId": 15,
							"order": 80,
							"name": "Cables",
							"children": {}
						},
						{
							"nodeId": 11,
							"order": 80,
							"name": "Telecom & Navigation",
							"children": [
							{
								"nodeId": 12,
								"order": 80,
								"name": "Smartphones",
								"children": {}
							}
						]
					},
					{
						"nodeId": 9,
						"order": 70,
						"name": "Smart Wearables",
						"children": [
							{
								"nodeId": 10,
								"order": 70,
								"name": "Smartwatches",
								"children": {}
							}
						]
					}
				]
			},
			"links": {
				"self": "http://mysprykershop.com/category-trees"
			}
		}
	],
	"links": {
		"self": "http://mysprykershop.com/category-trees"
	}
}
```
<br>
</details>

You can also use the **Accept-Language** header to specify the locale.
`Sample header: [{"key":"Accept-Language","value":"de, en;q=0.9"}]`
where **de**, **en** are the locales; **q=0.9** is a probability.

## Get Categories by Product
To get all categories a product belongs to, you can send a GET request to the following endpoint:
`/abstract-products/{sku}?include=category-nodes`
Sample request: `GET http://mysprykershop.com/abstract-products/058?include=category-nodes`
where `058` is the SKU of the abstract product.
If the request is successful, the response will contain category nodes which a product belongs to.

<details open>
<summary>Response sample </summary>

```js
{
		"data": {
			"type": "abstract-products",
			"id": "137",
			"attributes": {
				"sku": "137",
				"name": "Acer TravelMate P246-M",
				"description": "Work with style and simplicity The TravelMate P2 Series comes in 13.3\", 14\", 15.6\" and 17.3\" sizes to meet various business needs. Clad in a refined textile finish that both looks and feels great, these notebooks pack the latest Intel® Core™ processors1 and discrete graphics1 to keep you at your productive best. They are also loaded with tailor-made management and security software for easy, centralised control. The P2 series now comes with a fine linen textile pattern embossed on the outer covers. This lends a professional refined look and feel to the line that adds distinction to functionality. There are also practical benefits, as the pattern makes it a bit easier to keep a firm grip on the go, while also resisting scratches. The TravelMate P2 Series is certified to deliver the high audio and visual standards of Skype for Business1. Optimised hardware ensures that every word will be heard clearly with no gap or lag in speech, minimal background noise and zero echo. That means you can call or video chat with superior audio and visual quality.",
				"attributes": {
					"processor_cores": "2",
					"thermal_design_power": "15 W",
					"processor_codename": "Broadwell",
					"brand": "Acer",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": {
						"total_storage_capacity:128 GB": {
							"id_product_concrete": "137_29283480"
						},
						"total_storage_capacity:500 GB": {
							"id_product_concrete": "137_29283479"
						}
					},
					"super_attributes": {
						"total_storage_capacity": [
							"128 GB",
							"500 GB"
						]
					},
					"product_concrete_ids": [
						"137_29283479",
						"137_29283480"
					]
				},
				"metaTitle": "Acer TravelMate P246-M",
				"metaKeywords": "Acer,Entertainment Electronics",
				"metaDescription": "Work with style and simplicity The TravelMate P2 Series comes in 13.3\", 14\", 15.6\" and 17.3\" sizes to meet various business needs. Clad in a refined textil",
				"attributeNames": {
					"processor_cores": "Processor cores",
					"thermal_design_power": "Thermal Design Power (TDP)",
					"processor_codename": "Processor codename",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "http://mysprykershop.com/abstract-products/137"
			},
			"relationships": {
				"concrete-products": {
					"data": [
						{
							"type": "concrete-products",
							"id": "137_29283479"
						},
						{
							"type": "concrete-products",
							"id": "137_29283480"
						}
					]
				},
				"category-nodes": {
					"data": [
						{
							"type": "category-nodes",
							"id": "14"
						},
						{
							"type": "category-nodes",
							"id": "5"
						},
						{
							"type": "category-nodes",
							"id": "6"
						}
					]
				}
			}
		},
		"included": [
			{
				"type": "category-nodes",
				"id": "14",
				"attributes": {
					"nodeId": 14,
					"name": "Variant Showcase",
					"metaTitle": "Variant Showcase",
					"metaKeywords": "Variant Showcase",
					"metaDescription": "These are products that have more than 1 variant.",
					"isActive": true,
					"children": {},
					"parents": [
						{
							"nodeId": 1,
							"name": "Demoshop",
							"metaTitle": "Demoshop",
							"metaKeywords": "English version of Demoshop",
							"metaDescription": "English version of Demoshop",
							"isActive": true,
							"children": {},
							"parents": {},
							"order": null
						}
					],
					"order": 50
				},
				"links": {
					"self": "http://mysprykershop.com/category-nodes/14"
				}
			},
			{
				"type": "category-nodes",
				"id": "5",
				"attributes": {
					"nodeId": 5,
					"name": "Computer",
					"metaTitle": "Computer",
					"metaKeywords": "Computer",
					"metaDescription": "Computer",
					"isActive": true,
					"children": [
						{
							"nodeId": 6,
							"name": "Notebooks",
							"metaTitle": "Notebooks",
							"metaKeywords": "Notebooks",
							"metaDescription": "Notebooks",
							"isActive": true,
							"children": {},
							"parents": {},
							"order": 100
						},
						{
							"nodeId": 7,
							"name": "Pc's/Workstations",
							"metaTitle": "Pc's/Workstations",
							"metaKeywords": "Pc's/Workstations",
							"metaDescription": "Pc's/Workstations",
							"isActive": true,
							"children": {},
							"parents": {},
							"order": 90
						},
						{
							"nodeId": 8,
							"name": "Tablets",
							"metaTitle": "Tablets",
							"metaKeywords": "Tablets",
							"metaDescription": "Tablets",
							"isActive": true,
							"children": {},
							"parents": {},
							"order": 80
						}
						],
						"parents": [
							{
								"nodeId": 1,
								"name": "Demoshop",
								"metaTitle": "Demoshop",
								"metaKeywords": "English version of Demoshop",
								"metaDescription": "English version of Demoshop",
								"isActive": true,
								"children": {},
								"parents": {},
								"order": null
							}
						],
						"order": 100
					},
					"links": {
						"self": "http://mysprykershop.com/category-nodes/5"
					}
				},
				{
					"type": "category-nodes",
					"id": "6",
					"attributes": {
						"nodeId": 6,
						"name": "Notebooks",
						"metaTitle": "Notebooks",
						"metaKeywords": "Notebooks",
						"metaDescription": "Notebooks",
						"isActive": true,
						"children": {},
						"parents": [
							{
								"nodeId": 5,
								"name": "Computer",
								"metaTitle": "Computer",
								"metaKeywords": "Computer",
								"metaDescription": "Computer",
								"isActive": true,
								"children": {},
								"parents": [
									{
										"nodeId": 1,
										"name": "Demoshop",
										"metaTitle": "Demoshop",
										"metaKeywords": "English version of Demoshop",
										"metaDescription": "English version of Demoshop",
										"isActive": true,
										"children": {},
										"parents": {},
										"order": null
									}
								],
								"order": 100
							}
						],
						"order": 100
					},
					"links": {
						"self": "http://mysprykershop.com/category-nodes/6"
					}
				}
			]
		}
```
<br>
</details>

## Get a Single Category Node
To retrieve full information on a category node that a tree node represents, you need to get that specific node resource by node ID.

To identify the ID for the category you need, you can retrieve the whole category tree at `/category-trees`. The response will contain the ID of each node in the **nodeId** attribute:

Sample:

```js
"categoryNodesStorage": [
		{
			"nodeId": 5,
			"order": 100,
			"name": "Computer",
			"children": [
			...
```

To retrieve a specific node by ID, access the following endpoint:

`/category-nodes/{% raw %}{{{% endraw %}node_id{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/category-nodes/5`
where `5` is the node ID.
If the request is successful, the resource responds with a **RestCategoryNodeResponse**.

Response sample:

| Field* | Type | Description |
| --- | --- | --- |
| nodeId | String | Category node ID. |
| name | String | Name of category associated with the node. |
| metaTitle | String | Meta title of the category. |
| metaKeywords | String | Meta keywords of the category. |
| metaDescription | String | Meta description of the category. |
| isActive | Boolean | Boolean to see, if the category is active. |
| order | Integer | Digits between 1 and 100, with 100 ranking the highest (on one level under the parent node). |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample </summary>

```js
{
		"data": {
			"type": "category-nodes",
			"id": "5",
			"attributes": {
				"nodeId": 5,
				"name": "Computer",
				"metaTitle": "Computer",
				"metaKeywords": "Computer",
				"metaDescription": "Computer",
				"isActive": true,
				"children": [
					{
						"nodeId": 6,
						"name": "Notebooks",
						"metaTitle": "Notebooks",
						"metaKeywords": "Notebooks",
						"metaDescription": "Notebooks",
						"isActive": true,
						"children": [],
						"parents": [],
						"order": 100
					},
					{
						"nodeId": 7,
						"name": "Pc's/Workstations",
						"metaTitle": "Pc's/Workstations",
						"metaKeywords": "Pc's/Workstations",
						"metaDescription": "Pc's/Workstations",
						"isActive": true,
						"children": [],
						"parents": [],
						"order": 90
					},
					{
						"nodeId": 8,
						"name": "Tablets",
						"metaTitle": "Tablets",
						"metaKeywords": "Tablets",
						"metaDescription": "Tablets",
						"isActive": true,
						"children": [],
						"parents": [],
						"order": 80
					}
				],
				"parents": [
					{
						"nodeId": 1,
						"name": "Demoshop",
						"metaTitle": "Demoshop",
						"metaKeywords": "English version of Demoshop",
						"metaDescription": "English version of Demoshop",
						"isActive": true,
						"children": [],
						"parents": [],
						"order": null
					}
				],
				"order": 100
			},
			"links": {
				"self": "http://mysprykershop.com/category-nodes/5"
			}
		}
	}
```
<br>
</details>

### Possible errors
| Code | Reason |
| --- | --- |
| 701 | Node ID not specified or invalid. |
| 703 | A node with the specified ID was not found. |

_Last review date: Dec 13, 2018_ <!-- by Dmitry Beirak -->
