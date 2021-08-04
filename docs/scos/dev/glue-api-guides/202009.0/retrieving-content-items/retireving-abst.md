---
title: Retrieving abstract product list content items
originalLink: https://documentation.spryker.com/v6/docs/retireving-abstract-product-list-content-items
redirect_from:
  - /v6/docs/retireving-abstract-product-list-content-items
  - /v6/docs/en/retireving-abstract-product-list-content-items
---

This endpoint allows retrieving information about abstract product list content items.

## Installation
For details on the modules that provide the API functionality and how to install them, see [Content Items API](https://documentation.spryker.com/docs/content-items-api-feature-integration).

## Retrieve an abstract product list content item

To retrieve information about an abstract product list content item, send the request:

***
`GET` **content-product-abstract-lists/*{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}*/content-product-abstract**
***


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}*** | Unique identifier of the content item to retrieve. |

### Request



| Header key | Required | Description |
| --- | --- | --- |
| locale |  | Defines the locale to retreive the content item information for. If not specified, the endpoint returns the information for the *default* locale.  |



| Query parameter | Description | Exemplary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | abstract-product-image-sets, abstract-product-availabilities, abstract-product-prices, category-nodes, product-tax-sets, product-labels, concrete-products |
| fields | Filters out the fields to be retrieved. | name, image, description |



| Request | Usage |
| --- | --- |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract | Retrieve information about the abstract product list with id `apl-1`. |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-availabilities | Retrieve information about the abstract product list with id `apl-1`. Include information about availablility of the abstact products in the list. |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-image-sets | Retrieve information about the abstract product list with id `apl-1`. Include information about product image sets of the abstact products in the list.  |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-prices | Retrieve information about the abstract product list with id `apl-1`. Include information about the prices of the abstact products in the list. |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=category-nodes | Retrieve information about the abstract product list with id `apl-1`. Include information about the category nodes the abstact products in the list are related to. |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=product-tax-sets | Retrieve information about the abstract product list with id `apl-1`. Include information about the tax sets of the abstact products in the list. |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=product-labels | Retrieve information about the abstract product list with id `apl-1`. Include information about the product labels of the abstact products in the list. |
| GET https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?fields[abstract-products]=sku,name,description | Retrieve information about the abstract product list with id `apl-1`. From the `abstract-products` resource, retrieve only the `sku`, `name`, and `description` fields. |




.

<details open>
<summary>Response sample</summary>
    
```json
{
	"data": [
		{
			"type": "abstract-products",
			"id": "204",
			"attributes": {
				"sku": "204",
				"name": "Sony PXW-FS5K",
				"description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
				"attributes": {
					"iso_sensitivity": "3200",
					"sensor_type": "CMOS",
					"white_balance": "Auto",
					"wi_fi": "yes",
					"brand": "Sony",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"204_29851280"
					]
				},
				"metaTitle": "Sony PXW-FS5K",
				"metaKeywords": "Sony,Smart Electronics",
				"metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
				"attributeNames": {
					"iso_sensitivity": "ISO sensitivity",
					"sensor_type": "Sensor type",
					"white_balance": "White balance",
					"wi_fi": "Wi-Fi",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204"
			}
		},
		{
			"type": "abstract-products",
			"id": "205",
			"attributes": {
				"sku": "205",
				"name": "Toshiba CAMILEO S30",
				"description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
				"attributes": {
					"total_megapixels": "8 MP",
					"display": "LCD",
					"self_timer": "10 s",
					"weight": "118 g",
					"brand": "Toshiba",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"total_megapixels",
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"205_6350138"
					]
				},
				"metaTitle": "Toshiba CAMILEO S30",
				"metaKeywords": "Toshiba,Smart Electronics",
				"metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
				"attributeNames": {
					"total_megapixels": "Total Megapixels",
					"display": "Display",
					"self_timer": "Self-timer",
					"weight": "Weight",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205"
			}
		}
	]
	"links": {
		"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract"
	}
}
```

</details>

<details open>
    <summary>Response sample with abstact product availability</summary>
    
```json
{
"data": [
	{
		"type": "abstract-products",
		"id": "204",
		"attributes": {
			"sku": "204",
			"name": "Sony PXW-FS5K",
			"description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
			"attributes": {
				"iso_sensitivity": "3200",
				"sensor_type": "CMOS",
				"white_balance": "Auto",
				"wi_fi": "yes",
				"brand": "Sony",
				"color": "Black"
			},
			"superAttributesDefinition": [
				"color"
			],
			"superAttributes": [],
			"attributeMap": {
				"attribute_variants": [],
				"super_attributes": [],
				"product_concrete_ids": [
					"204_29851280"
				]
			},
			"metaTitle": "Sony PXW-FS5K",
			"metaKeywords": "Sony,Smart Electronics",
			"metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
			"attributeNames": {
				"iso_sensitivity": "ISO sensitivity",
				"sensor_type": "Sensor type",
				"white_balance": "White balance",
				"wi_fi": "Wi-Fi",
				"brand": "Brand",
				"color": "Color"
			}
		},
		"links": {
			"self": "https://glue.mysprykershop.com/abstract-products/204"
		},
		"relationships": {
			"abstract-product-availabilities": {
				"data": [
					{
						"type": "abstract-product-availabilities",
						"id": "204"
					}
				]
			}
		}
	},
	{
		"type": "abstract-products",
		"id": "205",
		"attributes": {
			"sku": "205",
			"name": "Toshiba CAMILEO S30",
			"description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
			"attributes": {
				"total_megapixels": "8 MP",
				"display": "LCD",
				"self_timer": "10 s",
				"weight": "118 g",
				"brand": "Toshiba",
				"color": "Black"
			},
			"superAttributesDefinition": [
				"total_megapixels",
				"color"
			],
			"superAttributes": [],
			"attributeMap": {
				"attribute_variants": [],
				"super_attributes": [],
				"product_concrete_ids": [
					"205_6350138"
				]
			},
			"metaTitle": "Toshiba CAMILEO S30",
			"metaKeywords": "Toshiba,Smart Electronics",
			"metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
			"attributeNames": {
				"total_megapixels": "Total Megapixels",
				"display": "Display",
				"self_timer": "Self-timer",
				"weight": "Weight",
				"brand": "Brand",
				"color": "Color"
			}
		},
		"links": {
			"self": "https://glue.mysprykershop.com/abstract-products/205"
		},
		"relationships": {
			"abstract-product-availabilities": {
				"data": [
					{
						"type": "abstract-product-availabilities",
						"id": "205"
					}
				]
			}
		}
	}
],
"links": {
	"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-availabilities"
},
"included": [
	{
		"type": "abstract-product-availabilities",
		"id": "204",
		"attributes": {
			"availability": true,
			"quantity": 10
		},
		"links": {
			"self": "https://glue.mysprykershop.com/abstract-products/204/abstract-product-availabilities"
		}
	},
	{
		"type": "abstract-product-availabilities",
		"id": "205",
		"attributes": {
			"availability": true,
			"quantity": 10
		},
		"links": {
			"self": "https://glue.mysprykershop.com/abstract-products/205/abstract-product-availabilities"
		}
	}
]
```

</details>

<details open>
    <summary>Response sample with abstract product image sets</summary>
    
```json
...
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204"
			},
			"relationships": {
				"abstract-product-image-sets": {
					"data": [
						{
							"type": "abstract-product-image-sets",
							"id": "204"
						}
					]
				}
			}
		},
	...
	
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205"
			},
			"relationships": {
				"abstract-product-image-sets": {
					"data": [
						{
							"type": "abstract-product-image-sets",
							"id": "205"
						}
					]
				}
			}
		}
	],
	"links": {
		"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-image-sets"
	},
	"included": [
		{
			"type": "abstract-product-image-sets",
			"id": "204",
			"attributes": {
				"imageSets": [
					{
						"name": "default",
						"images": [
							{
								"externalUrlLarge": "//images.icecat.biz/img/gallery/29851280_5571.jpg",
								"externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/29851280_5571.jpg"
							}
						]
					}
				]
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204/abstract-product-image-sets"
			}
		},
		{
			"type": "abstract-product-image-sets",
			"id": "205",
			"attributes": {
				"imageSets": [
					{
						"name": "default",
						"images": [
							{
								"externalUrlLarge": "//images.icecat.biz/img/norm/high/6350138-1977.jpg",
								"externalUrlSmall": "//images.icecat.biz/img/gallery_mediums/img_6350138_medium_1481633011_6285_13738.jpg"
							}
						]
					}
				]
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205/abstract-product-image-sets"
			}
		}
	]
}
```
    
</details>

<details open>
<summary>Response sample with abstract product prices</summary>

```json
{
"data": [
	{
		"type": "abstract-products",
		"id": "204",
		"attributes": {
			"sku": "204",
			"name": "Sony PXW-FS5K",
			"description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
			"attributes": {
				"iso_sensitivity": "3200",
				"sensor_type": "CMOS",
				"white_balance": "Auto",
				"wi_fi": "yes",
				"brand": "Sony",
				"color": "Black"
			},
			"superAttributesDefinition": [
				"color"
			],
			"superAttributes": [],
			"attributeMap": {
				"attribute_variants": [],
				"super_attributes": [],
				"product_concrete_ids": [
					"204_29851280"
				]
			},
			"metaTitle": "Sony PXW-FS5K",
			"metaKeywords": "Sony,Smart Electronics",
			"metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
			"attributeNames": {
				"iso_sensitivity": "ISO sensitivity",
				"sensor_type": "Sensor type",
				"white_balance": "White balance",
				"wi_fi": "Wi-Fi",
				"brand": "Brand",
				"color": "Color"
			}
		},
		"links": {
			"self": "https://glue.mysprykershop.com/abstract-products/204"
		},
		"relationships": {
			"abstract-product-prices": {
				"data": [
					{
						"type": "abstract-product-prices",
						"id": "204"
					}
				]
			}
		}
	},
	{
		"type": "abstract-products",
		"id": "205",
		"attributes": {
			"sku": "205",
			"name": "Toshiba CAMILEO S30",
			"description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
			"attributes": {
				"total_megapixels": "8 MP",
				"display": "LCD",
				"self_timer": "10 s",
				"weight": "118 g",
				"brand": "Toshiba",
				"color": "Black"
			},
			"superAttributesDefinition": [
				"total_megapixels",
				"color"
			],
			"superAttributes": [],
			"attributeMap": {
				"attribute_variants": [],
				"super_attributes": [],
				"product_concrete_ids": [
					"205_6350138"
				]
			},
			"metaTitle": "Toshiba CAMILEO S30",
			"metaKeywords": "Toshiba,Smart Electronics",
			"metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
			"attributeNames": {
				"total_megapixels": "Total Megapixels",
				"display": "Display",
				"self_timer": "Self-timer",
				"weight": "Weight",
				"brand": "Brand",
				"color": "Color"
			}
		},
		"links": {
			"self": "https://glue.mysprykershop.com/abstract-products/205"
		},
		"relationships": {
			"abstract-product-prices": {
				"data": [
					{
						"type": "abstract-product-prices",
						"id": "205"
					}
				]
			}
		}
	}
],
"links": {
	"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-prices"
},
	"included": [
		{
			"type": "abstract-product-prices",
			"id": "204",
			"attributes": {
				"price": 44713,
				"prices": [
					{
						"priceTypeName": "DEFAULT",
						"netAmount": null,
						"grossAmount": 44713,
						"currency": {
							"code": "EUR",
							"name": "Euro",
							"symbol": "€"
						}
					}
				]
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204/abstract-product-prices"
			}
		},
		{
			"type": "abstract-product-prices",
			"id": "205",
			"attributes": {
				"price": 11611,
				"prices": [
					{
						"priceTypeName": "DEFAULT",
						"netAmount": null,
						"grossAmount": 11611,
						"currency": {
							"code": "EUR",
							"name": "Euro",
							"symbol": "€"
						}
					}
				]
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205/abstract-product-prices"
			}
		}
	]
}
```

</details>


<details open>
    <summary>Response sample with category nodes</summary>
    
```json
{
	"data": [
		{
			"type": "abstract-products",
			"id": "204",
			"attributes": {
				"sku": "204",
				"name": "Sony PXW-FS5K",
				"description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
				"attributes": {
					"iso_sensitivity": "3200",
					"sensor_type": "CMOS",
					"white_balance": "Auto",
					"wi_fi": "yes",
					"brand": "Sony",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"204_29851280"
					]
				},
				"metaTitle": "Sony PXW-FS5K",
				"metaKeywords": "Sony,Smart Electronics",
				"metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
				"attributeNames": {
					"iso_sensitivity": "ISO sensitivity",
					"sensor_type": "Sensor type",
					"white_balance": "White balance",
					"wi_fi": "Wi-Fi",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204"
			},
			"relationships": {
				"category-nodes": {
					"data": [
						{
							"type": "category-nodes",
							"id": "2"
						},
						{
							"type": "category-nodes",
							"id": "3"
						}
					]
				}
			}
		},
		{
			"type": "abstract-products",
			"id": "205",
			"attributes": {
				"sku": "205",
				"name": "Toshiba CAMILEO S30",
				"description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
				"attributes": {
					"total_megapixels": "8 MP",
					"display": "LCD",
					"self_timer": "10 s",
					"weight": "118 g",
					"brand": "Toshiba",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"total_megapixels",
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"205_6350138"
					]
				},
				"metaTitle": "Toshiba CAMILEO S30",
				"metaKeywords": "Toshiba,Smart Electronics",
				"metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
				"attributeNames": {
					"total_megapixels": "Total Megapixels",
					"display": "Display",
					"self_timer": "Self-timer",
					"weight": "Weight",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205"
			},
			"relationships": {
				"category-nodes": {
					"data": [
						{
							"type": "category-nodes",
							"id": "2"
						},
						{
							"type": "category-nodes",
							"id": "3"
						}
					]
				}
			}
		}
	],
	"links": {
		"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=category-nodes"
	},
	"included": [
		{
			"type": "category-nodes",
			"id": "2",
			"attributes": {
				"nodeId": 2,
				"name": "Cameras and Camcorders",
				"metaTitle": "Cameras and Camcorders",
				"metaKeywords": "Cameras and Camcorders",
				"metaDescription": "Cameras and Camcorders",
				"isActive": true,
				"children": [
					{
						"nodeId": 4,
						"name": "Digital Cameras",
						"metaTitle": "Digital Cameras",
						"metaKeywords": "Digital Cameras",
						"metaDescription": "Digital Cameras",
						"isActive": true,
						"children": [],
						"parents": [],
						"order": 100
					},
					{
						"nodeId": 3,
						"name": "Camcorders",
						"metaTitle": "Camcorders",
						"metaKeywords": "Camcorders",
						"metaDescription": "Camcorders",
						"isActive": true,
						"children": [],
						"parents": [],
						"order": 90
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
				"order": 90
			},
			"links": {
				"self": "https://glue.mysprykershop.com/category-nodes/2"
			}
		},
		{
			"type": "category-nodes",
			"id": "3",
			"attributes": {
				"nodeId": 3,
				"name": "Camcorders",
				"metaTitle": "Camcorders",
				"metaKeywords": "Camcorders",
				"metaDescription": "Camcorders",
				"isActive": true,
				"children": [],
				"parents": [
					{
						"nodeId": 2,
						"name": "Cameras and Camcorders",
						"metaTitle": "Cameras and Camcorders",
						"metaKeywords": "Cameras and Camcorders",
						"metaDescription": "Cameras and Camcorders",
						"isActive": true,
						"children": [],
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
						"order": 90
					}
				],
				"order": 90
			},
			"links": {
				"self": "https://glue.mysprykershop.com/category-nodes/3"
			}
		}
	]
}
```
    
</details>


<details open>
<summary>Response sample with tax sets</summary>
    
```json
{
	"data": [
		{
			"type": "abstract-products",
			"id": "204",
			"attributes": {
				"sku": "204",
				"name": "Sony PXW-FS5K",
				"description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
				"attributes": {
					"iso_sensitivity": "3200",
					"sensor_type": "CMOS",
					"white_balance": "Auto",
					"wi_fi": "yes",
					"brand": "Sony",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"204_29851280"
					]
				},
				"metaTitle": "Sony PXW-FS5K",
				"metaKeywords": "Sony,Smart Electronics",
				"metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
				"attributeNames": {
					"iso_sensitivity": "ISO sensitivity",
					"sensor_type": "Sensor type",
					"white_balance": "White balance",
					"wi_fi": "Wi-Fi",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204"
			},
			"relationships": {
				"product-tax-sets": {
					"data": [
						{
							"type": "product-tax-sets",
							"id": "b1b7984e-c7dc-5be4-89f0-0ea50d20cbe1"
						}
					]
				}
			}
		},
		{
			"type": "abstract-products",
			"id": "205",
			"attributes": {
				"sku": "205",
				"name": "Toshiba CAMILEO S30",
				"description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
				"attributes": {
					"total_megapixels": "8 MP",
					"display": "LCD",
					"self_timer": "10 s",
					"weight": "118 g",
					"brand": "Toshiba",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"total_megapixels",
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"205_6350138"
					]
				},
				"metaTitle": "Toshiba CAMILEO S30",
				"metaKeywords": "Toshiba,Smart Electronics",
				"metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
				"attributeNames": {
					"total_megapixels": "Total Megapixels",
					"display": "Display",
					"self_timer": "Self-timer",
					"weight": "Weight",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205"
			},
			"relationships": {
				"product-tax-sets": {
					"data": [
						{
							"type": "product-tax-sets",
							"id": "b1b7984e-c7dc-5be4-89f0-0ea50d20cbe1"
						}
					]
				}
			}
		}
	],
	"links": {
		"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=product-tax-sets"
	},
	"included": [
		{
			"type": "product-tax-sets",
			"id": "b1b7984e-c7dc-5be4-89f0-0ea50d20cbe1",
			"attributes": {
				"name": "Smart Electronics",
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
						"name": "Hungary Standard",
						"rate": "27.00",
						"country": "HU"
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
					},
					{
						"name": "Germany Reduced",
						"rate": "7.00",
						"country": "DE"
					},
					{
						"name": "Italy Reduced1",
						"rate": "4.00",
						"country": "IT"
					}
				]
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205/product-tax-sets"
			}
		}
	]
}
```
    
</details>


<details open>
<summary>Response sample with product labels</summary>

```json
{
	"data": [
		{
			"type": "abstract-products",
			"id": "204",
			"attributes": {
				"sku": "204",
				"name": "Sony PXW-FS5K",
				"description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots.",
				"attributes": {
					"iso_sensitivity": "3200",
					"sensor_type": "CMOS",
					"white_balance": "Auto",
					"wi_fi": "yes",
					"brand": "Sony",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"204_29851280"
					]
				},
				"metaTitle": "Sony PXW-FS5K",
				"metaKeywords": "Sony,Smart Electronics",
				"metaDescription": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic vide",
				"attributeNames": {
					"iso_sensitivity": "ISO sensitivity",
					"sensor_type": "Sensor type",
					"white_balance": "White balance",
					"wi_fi": "Wi-Fi",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204"
			}
		},
		{
			"type": "abstract-products",
			"id": "205",
			"attributes": {
				"sku": "205",
				"name": "Toshiba CAMILEO S30",
				"description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second.",
				"attributes": {
					"total_megapixels": "8 MP",
					"display": "LCD",
					"self_timer": "10 s",
					"weight": "118 g",
					"brand": "Toshiba",
					"color": "Black"
				},
				"superAttributesDefinition": [
					"total_megapixels",
					"color"
				],
				"superAttributes": [],
				"attributeMap": {
					"attribute_variants": [],
					"super_attributes": [],
					"product_concrete_ids": [
						"205_6350138"
					]
				},
				"metaTitle": "Toshiba CAMILEO S30",
				"metaKeywords": "Toshiba,Smart Electronics",
				"metaDescription": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to",
				"attributeNames": {
					"total_megapixels": "Total Megapixels",
					"display": "Display",
					"self_timer": "Self-timer",
					"weight": "Weight",
					"brand": "Brand",
					"color": "Color"
				}
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205"
			}
		}
	],
	"links": {
		"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=product-labels"
}
```
   
</details>



<details open>
    <summary>Response sample with filtered fields</summary>
    
```json
{
	"data": [
		{
			"type": "abstract-products",
			"id": "204",
			"attributes": {
				"sku": "204",
				"name": "Sony PXW-FS5K",
				"description": "Take control and shoot your way Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second. Add some power to your shots: Add an E-mount lens with a power zoom and smoothly focus in on your subject with up to 11x magnification. Capture it all in HD: Capture all the detail with Full HD 1920 x 1080 video shooting (AVCHD format) at 24mbs for increased detail and clarity. DSLR quality photos: Shoot stills with DSLR-like picture quality and shallow depth of field for professional looking shots."
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/204"
			}
		},
		{
			"type": "abstract-products",
			"id": "205",
			"attributes": {
				"sku": "205",
				"name": "Toshiba CAMILEO S30",
				"description": "Reach out Reach out with your 10x digital zoom and control recordings on the large 3-inch touchscreen LCD monitor. Create multi-scene video files thanks to the new Pause feature button! Save the best moments of your life with your CAMILEO S30 camcorder. Real cinematic images and sound: Explore a new dimension in creative artistry. Capture beautifully detailed, cinematic video images plus high-quality audio in cinematic 24 frames per second."
			},
			"links": {
				"self": "https://glue.mysprykershop.com/abstract-products/205"
			}
		}
	],
	"links": {
		"self": "https://glue.mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?fields[abstract-products]=sku,name,description"
	}
}
```

</details>

| Attribute | Type | Description |
| --- | --- | --- |
|attributes  | string |List of the abstract product's attributes and their values.  |
| sku |string  | SKU of the abstract product. |
| name | string | Name of the abstract product. |
| description | string | Description of the abstract product. |
| attributes | string | List of all available attributes for the product. |
|superAttributesDefinition  | string |  Attributes used to distinguish between different variants of the abstract product.|
| superAttributes | string | List of super attributes and their values for the product variants. |
| attributeMap | object | Combination of super attribute/value the product has and the corresponding concrete product IDs. |
| attributeMap.attribute_variants | object | List of super attributes with the list of values. |
| attributeMap.super_attributes | object | Applicable super attribute and its values for the product variant. |
| attributeMap.product_concrete_ids | string | IDs of the product variant. |
| metaTitle | string | Meta title of the abstract product. |
| metaKeywords | string | Meta keywords of the abstract product. |
|  metaDescription|string | Meta description of the abstract product. |
| attributeNames | object | All attributes (except for the super attributes) and value combinations for the abstract product. |



For the attributes of the included resource, see:
* [Retrieve availability of an abstract product](https://documentation.spryker.com/docs/retrieving-abstract-product-availability#abstract-product-availability-response-attributes)
* [Retrieve image sets of an abstract product](https://documentation.spryker.com/docs/retrieving-image-sets-of-abstract-products#abstract-product-sets-response-attributes)
* [Retrieve prices of an abstract product](https://documentation.spryker.com/docs/retrieving-abstract-product-prices#prices-response-attributes)
* [Retrieve a category node](https://documentation.spryker.com/docs/retrieving-category-nodes#category-nodes-response-attributes)
* [Retrieve tax sets](https://documentation.spryker.com/docs/retrieving-tax-sets#tax-sets-response-attributes)
* [Retrieve a product label](https://documentation.spryker.com/docs/retrieving-product-labels#product-labels-response-attributes)


## Possible errors

| Code | Reason |
| --- | --- |
| 2201 | Content item is not found. |
| 2202 | Content key is missing. |
| 2203 | Content type is invalid. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
