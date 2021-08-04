---
title: Getting Abstract Product List Content Item Data
originalLink: https://documentation.spryker.com/v5/docs/getting-abstract-product-list-content-item-data-201907
redirect_from:
  - /v5/docs/getting-abstract-product-list-content-item-data-201907
  - /v5/docs/en/getting-abstract-product-list-content-item-data-201907
---

The **Abstract Product List API** implements resources allowing you to retrieve information on each abstract product included in the Abstract Product List content item available in the storage. The list consists of abstract products that come with concrete products (variants) and may have characteristic attributes, such as memory, brand or color, that help your customers distinguish your products and choose the one matching their needs.

In particular, you can:

* get a list of abstract products
* retrieve basic data on the abstract products related to the list
* get only specific details for abstract products
* view details of the abstract product and its variants
* check what image sets, product labels, and prices abstract products have
* retrieve information on categories abstract products are assigned to

In your development, these resources can help you get relevant information for your product list and the product detail pages for all or a specific locale.

{% info_block infoBox %}
See [Content Items](https://documentation.spryker.com/docs/en/content-items
{% endinfo_block %} to learn how to create and manage content items in the Back Office.)

## Installation
For details on the modules that provide the API functionality and how to install them, see [Content Items API](https://documentation.spryker.com/docs/en/content-items-api-feature-integration).

## Retrieving Abstract Product List Content Item Data
To retrieve the full information on the abstract product list by the content item key, send a GET request to the following endpoint:

_/content-product-abstract-lists/{content_item_key}/content-product-abstract_

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract_

where **content-product-abstract-lists** is the Abstract Product List content item type, **apl-1** is its key, and **content-product-abstract** is the abstract product list type.

{% info_block infoBox %}
The locale must be specified in the **header** of the GET request. If no locale is specified, data from the **default** locale will be returned.
{% endinfo_block %}

If the request is successful and the Abstract Product List content item with the specified content item key has been found, the endpoint will respond with a **RestAbstractProductsResponse**.

| Field* | Type | Description |
| --- | --- | --- |
|attributes  | string |List of the abstract product's attributes and their values.  |
| sku |string  | SKU of the abstract product. |
| name | string | Name of the abstract product. |
| description | string | Description of the abstract product. |
| attributes | string{} | List of all available attributes for the product. |
|superAttributesDefinition  | string[] |  Attributes used to distinguish between different variants of the abstract product.|
| superAttributes | string[] | List of super attributes and their values for the product variants. |
| attributeMap | object | Combination of super attribute/value the product has and the corresponding concrete product IDs. |
| attributeMap.attribute_variants | object | List of super attributes with the list of values. |
| attributeMap.super_attributes | object | Applicable super attribute and its values for the product variant. |
| attributeMap.product_concrete_ids | string[] | IDs of the product variant. |
| metaTitle | string | Meta title of the abstract product. |
| metaKeywords | string | Meta keywords of the abstract product. |
|  metaDescription|string | Meta description of the abstract product. |
| attributeNames | object | All attributes (except for the super attributes) and value combinations for the abstract product. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample response:</summary>
    
```php
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
				"self": "http://mysprykershop.com/abstract-products/204"
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
				"self": "http://mysprykershop.com/abstract-products/205"
			}
		}
	]
	"links": {
		"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract"
	}
}
```
    
</br>
</details>

## Retrieving Other Resources for Abstract Product Lists
You can extend the response of the content-product-abstract endpoint with the following resource relationships:

* abstract-product-image-sets
* abstract-product-availabilities
* abstract-product-prices
* category-nodes
* product-tax-sets
* product-labels
* concrete-products

Please see below for details of the resource relationships.

### Getting Image Sets for Abstract Products
To get image sets assigned to abstract products, request the resource from the abstract-product-image-sets relationships endpoint:

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=**abstract-product-image-sets**_
where **abstract-product-image-sets** is the image sets for its abstract products included in the list and **apl-1** is the key of the Abstract Product List content item.

The following additional attributes are added to the response:

| Field* | Type | Description |
| --- | --- | --- |
| imageSets | string | Set of images assigned to the abstract product. |
| name | string | Name of the image set. |
| images | string | Images in the image set assigned to the abstract product. |
| externalUrlLarge | string | URL of the large image displayed on the website. |
| externalUrlSmall | string | URL of the small image displayed on the website. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request is successful and the abstract product image sets with the specified ID have been found, the endpoint will respond with a **RestAbstractProductsResponse**. It provides only links to the images.

<details open>
<summary>Sample response:</summary>
    
```php
...
			},
			"links": {
				"self": "http://mysprykershop.com/abstract-products/204"
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
				"self": "http://mysprykershop.com/abstract-products/205"
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
		"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-image-sets"
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
				"self": "http://mysprykershop.com/abstract-products/204/abstract-product-image-sets"
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
				"self": "http://mysprykershop.com/abstract-products/205/abstract-product-image-sets"
			}
		}
	]
}
```
    
</br>
</details>

### Getting Information on Availability for Abstract Products
To retrieve the information on the availability of abstract products, request the resource from the abstract-product-availabilities relationships endpoint:

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?**include=abstract-product-availabilities**_
where **abstract-product-availabilities** is the availability of the abstract products included in the list and **apl-1** is the key of the Abstract Product List content item.

The following additional attributes will be added to the response:

| Field* | Type | Description |
| --- | --- | --- |
| availability | boolean | Boolean to inform whether the abstract product is available or unavailable (both in the warehouse and in open orders). |
| quantity | integer | Number of products available in the stock. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request is successful and the availability of abstract products with the specified content item key has been found, the resource will respond with a **RestAbstractProductAvailabilityResponse**. It provides only links to the images.

<details open>
<summary>Sample response:</summary>
    
```php
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
			"self": "http://mysprykershop.com/abstract-products/204"
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
			"self": "http://mysprykershop.com/abstract-products/205"
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
	"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-availabilities"
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
			"self": "http://mysprykershop.com/abstract-products/204/abstract-product-availabilities"
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
			"self": "http://mysprykershop.com/abstract-products/205/abstract-product-availabilities"
		}
	}
]
```

</br>
</details>

### Getting Prices for Abstract Products
To retrieve prices of abstract products, request the resource from the abstract-product-prices relationships endpoint:

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?**include=abstract-product-prices**_
where **abstract-product-prices** is the price of each abstract product included in the list and **apl-1** is the key of the Abstract Product List content item containing these products.

The following additional attributes will be added to the response:

| Field* | Type | Description |
| --- | --- | --- |
| price | integer | Abstract product price. |
| priceTypeName | string | Name of the price type. |
| netAmount | integer | Net price. |
| grossAmount | integer | Gross price. |
| currency.code | string | Currency code. |
| currency.name | string | Currency name. |
| currency.symbol | string | Currency symbol. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample response:</summary>

```php
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
			"self": "http://mysprykershop.com/abstract-products/204"
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
			"self": "http://mysprykershop.com/abstract-products/205"
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
	"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=abstract-product-prices"
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
				"self": "http://mysprykershop.com/abstract-products/204/abstract-product-prices"
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
				"self": "http://mysprykershop.com/abstract-products/205/abstract-product-prices"
			}
		}
	]
}
```

</br>
</details>

### Getting Information on the Category Assigned to Abstract Products

To get information on all available categories which the abstract products are assigned to, send the GET request expandable with the category-nodes relationships endpoint:

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?**include=category-nodes**_
where **category-nodes** is the category assigned to each abstract product included in the list and **apl-1** is the key of the Abstract Product List content item.

The following additional attributes will be added to the response:

| Field* | Type | Description |
| --- | --- | --- |
| parents[] | string | List of the parent category's values. |
| nodeId | string | Category node ID. |
| name | string | Name of a category associated with the node. |
| metaTitle | string | Meta title of the category. |
| metaKeywords | string | Meta keywords of the category. |
| metaDescription | string | Meta description of the category. |
| isActive | boolean | Informs if the category is active. |
| order | integer | Category arrangement displaying digits between 1 and 100, with 100 rankings the highest (on one level under the parent node). |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample response:</summary>
    
```php
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
				"self": "http://mysprykershop.com/abstract-products/204"
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
				"self": "http://mysprykershop.com/abstract-products/205"
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
		"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=category-nodes"
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
				"self": "http://mysprykershop.com/category-nodes/2"
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
				"self": "http://mysprykershop.com/category-nodes/3"
			}
		}
	]
}
```
    
</br>
</details>

### Getting Information on Tax Sets to Abstract Products
To get information on tax sets defined for abstract products, request the resource from the product-tax-sets relationships endpoint:

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?**include=product-tax-sets**_
where **product-tax-sets** is the tax set of each abstract product included in the list and **apl-1** is the ID of the Abstract Product List content item.

The following additional attributes will be added to the response:

| Field* | Type | Description |
| --- | --- | --- |
| name |string  | Tax set name. |
| restTaxRates.name |string | Tax rate name. |
| restTaxRates.rate | integer | Tax rate. |
| restTaxRates.country |string  | Country for which the tax rate is applicable. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample response:</summary>
    
```php
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
				"self": "http://mysprykershop.com/abstract-products/204"
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
				"self": "http://mysprykershop.com/abstract-products/205"
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
		"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=product-tax-sets"
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
				"self": "http://mysprykershop.com/abstract-products/205/product-tax-sets"
			}
		}
	]
}
```
    
</br>
</details>

### Getting Product Labels of Abstract Products
To get information on tax sets defined for abstract products, request the resource from the product-labels relationships endpoint:

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?**include=product-labels**_
where **product-labels** is the product label assigned to each abstract product included in the list and **apl-1** is the key of the Abstract Product List content item.

The following additional attributes will be added to the response:

| Field* | Type | Description |
| --- | --- | --- |
| name | string | Name of a product label. |
| isExclusive | boolean | Indicates if the label is Exclusive, i.e. takes precedence over other labels the product might have so that only this label can be displayed for the product. |
| position | integer | Number of the position in the priority set. |
| frontEndReference | string | Defines the custom product label type. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample response:</summary>
    
```php
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
				"self": "http://mysprykershop.com/abstract-products/204"
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
				"self": "http://mysprykershop.com/abstract-products/205"
			}
		}
	],
	"links": {
		"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?include=product-labels"
}
```
    
</br>
</details>

## Retrieving Specific Attribute of Abstract Product
To retrieve a specific attribute of the abstract product, send the GET request including the following resources:
/content-product-abstract-lists/{content_item_key}/content-product-abstract?fields[abstract-products]=sku,name,description&include=abstract-product-prices

Sample request: _GET http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?fields[abstract-products]=sku,name,description&include=abstract-product-prices_
where **apl-1** is the key of the Abstract Product List content item you want to retrieve.

**Sample response:**
    
```php
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
				"self": "http://mysprykershop.com/abstract-products/204"
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
				"self": "http://mysprykershop.com/abstract-products/205"
			}
		}
	],
	"links": {
		"self": "http://mysprykershop.com/content-product-abstract-lists/apl-1/content-product-abstract?fields[abstract-products]=sku,name,description&include=abstract-product-prices"
	}
}
```

## Possible Errors

| Code | Reason |
| --- | --- |
| 2201 | Content item not found. |
| 2202 | Content key is missing. |
| 2203 | Content type is invalid. |
