---
title: Navigation API Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/navigation-api-feature-integration-1
redirect_from:
  - /v3/docs/navigation-api-feature-integration-1
  - /v3/docs/en/navigation-api-feature-integration-1
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place. The current Feature Integration guide only adds the **Navigation REST API** functionality.
{% endinfo_block %}

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |
| Navigation | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/navigations-rest-api:"^2.0.0" spryker/navigations-category-nodes-resource-relationship:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox %}
Make sure that the following modules were installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `NavigationsRestApi` | `vendor/spryker/navigations-rest-api` |
| `NavigationsCategoryNodesResourceRelationship` | `vendor/spryker/navigations-category-nodes-resource-relationship` |

### 2) Set up Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox %}
Make sure that the following changes have been applied in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestNavigationAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestNavigationAttributesTransfer` |
| `RestNavigationNodeTransfer` | class | created | `src/Generated/Shared/Transfer/RestNavigationNodeTransfer` |

### 3) Set up Configuration
#### Configure navigation mapping
{% info_block infoBox %}
Specify mapping for the source field from which the resourceId field should be filled (depends on a navigation node type
{% endinfo_block %}.)

<details open>
<summary>src/Pyz/Glue/NavigationsRestApi/NavigationsRestApiConfig.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\NavigationsRestApi;
 
use Spryker\Glue\NavigationsRestApi\NavigationsRestApiConfig as SprykerNavigationsRestApiConfig;
 
class NavigationsRestApiConfig extends SprykerNavigationsRestApiConfig
{
	/**
	* @return array
	*/
	public function getNavigationTypeToUrlResourceIdFieldMapping(): array
	{
		return [
			'category' => 'fkResourceCategorynode',
			'cms_page' => 'fkResourcePage',
		];
	}
}
```

</br>
</details>

{% info_block warningBox %}
The verification for this step can be provided once the resource is provided in the *Set up Behavior* section below.
{% endinfo_block %}

### 4) Set up Behavior
#### Enable resources and relationships
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `NavigationsResourceRoutePlugin` | Registers the `navigations` resource. | None | `Spryker\Glue\NavigationsRestApi\Plugin\ResourceRoute` |
| `CategoryNodeByResourceIdResourceRelationshipPlugin` | Adds the `category node` resource as a relationship. | None | `\Spryker\Glue\NavigationsCategoryNodesResourceRelationship\Plugin\GlueApplication` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\NavigationsRestApi\Plugin\ResourceRoute\NavigationsResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new NavigationsResourceRoutePlugin(),
		];
	}
 
	/**
	* @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
	*
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
	*/
	protected function getResourceRelationshipPlugins(
		ResourceRelationshipCollectionInterface $resourceRelationshipCollection
	): ResourceRelationshipCollectionInterface {
		$resourceRelationshipCollection->addRelationship(
			NavigationsRestApiConfig::RESOURCE_NAVIGATIONS,
			new CategoryNodeByResourceIdResourceRelationshipPlugin()
		);
  
		return $resourceRelationshipCollection;
	}
}
```

</br>
</details>

{% info_block warningBox %}
`NavigationsResourceRoutePlugin` is set up correctly if the following endpoint is available: *http://glue.mysprykershop.com/navigations/{navigationId}*
{% endinfo_block %}

{% info_block warningBox %}
Now, it is possible to verify that the configuration of NavigationsRestApiConfig is done correctly. Perform the "http://glue.mysprykershop.com/navigations/{navigationId}" request and check that each node of the type you set up in the configuration (category and CMS pages in the example
{% endinfo_block %} "resourceId" is filled with the valid foreign key.)

{% info_block warningBox "your title goes here" %}
Send a request to *http://glue.mysprykershop.com/navigations/MAIN_NAVIGATION?include=category-nodes*.</br>Make sure that the response contains `category-nodes` as a relationship and `category-nodes` data included.
{% endinfo_block %}

<details open>
<summary>http://glue.mysprykershop.com/navigations/MAIN_NAVIGATION?include=category-nodes</summary>

```json
{
	"data": {
		"type": "navigations",
		"id": "MAIN_NAVIGATION",
		"attributes": {
			"nodes": [
				{
					"resourceId": null,
					"nodeType": "label",
					"children": [
						{
							"resourceId": 6,
							"nodeType": "category",
							"children": [],
							"isActive": true,
							"title": "Notebooks",
							"url": "/de/computer/notebooks",
							"cssClass": null,
							"validFrom": null,
							"validTo": null
						},
						{
							"resourceId": 8,
							"nodeType": "category",
							"children": [],
							"isActive": true,
							"title": "Tablets",
							"url": "/de/computer/tablets",
							"cssClass": null,
							"validFrom": null,
							"validTo": null
						},
						{
							"resourceId": 12,
							"nodeType": "category",
							"children": [],
							"isActive": true,
							"title": "Smartphones",
							"url": "/de/telekommunikation-&amp;-navigation/smartphones",
							"cssClass": null,
							"validFrom": null,
							"validTo": null
						},
						{
							"resourceId": 10,
							"nodeType": "category",
							"children": [],
							"isActive": true,
							"title": "Smartwatches",
							"url": "/de/intelligente-tragbare-geräte/smartwatches",
							"cssClass": null,
							"validFrom": null,
							"validTo": null
						}
					],
					"isActive": true,
					"title": "Top Kategorien",
					"url": null,
					"cssClass": null,
					"validFrom": null,
					"validTo": null
				}
			],
			"name": "Top Navigation",
			"isActive": true
		},
		"links": {
			"self": "http://glue.mysprykershop.com/navigations/MAIN_NAVIGATION?include=category-nodes"
		},
		"relationships": {
			"category-nodes": {
				"data": [
					{
						"type": "category-nodes",
						"id": "10"
					},
					{
						"type": "category-nodes",
						"id": "12"
					},
					{
						"type": "category-nodes",
						"id": "6"
					},
					{
						"type": "category-nodes",
						"id": "8"
					}
				]
			}
		}
	},
	"included": [
		{
			"type": "category-nodes",
			"id": "10",
			"attributes": {
				"nodeId": 10,
				"name": "Smartwatches",
				"metaTitle": "Smartwatches",
				"metaKeywords": "Smartwatches",
				"metaDescription": "Smartwatches",
				"isActive": true,
				"url": "/de/intelligente-tragbare-geräte/smartwatches",
				"children": [],
				"parents": [
					{
						"nodeId": 9,
						"name": "Intelligente tragbare Geräte",
						"metaTitle": "Intelligente tragbare Geräte",
						"metaKeywords": "Intelligente tragbare Geräte",
						"metaDescription": "Intelligente tragbare Geräte",
						"isActive": true,
						"url": "/de/intelligente-tragbare-geräte",
						"children": [],
						"parents": [
							{
								"nodeId": 1,
								"name": "Demoshop",
								"metaTitle": "Demoshop",
								"metaKeywords": "Deutsche Version des Demoshop",
								"metaDescription": "Deutsche Version des Demoshop",
								"isActive": true,
								"url": "/de",
								"children": [],
								"parents": [],
								"order": null
							}
						],
						"order": 70
					}
				],
				"order": 70
			},
			"links": {
				"self": "http://glue.mysprykershop.com/category-nodes/10"
			}
		},
		{
			"type": "category-nodes",
			"id": "12",
			"attributes": {
				"nodeId": 12,
				"name": "Smartphones",
				"metaTitle": "Smartphones",
				"metaKeywords": "Smartphones",
				"metaDescription": "Smartphones",
				"isActive": true,
				"url": "/de/telekommunikation-&amp;-navigation/smartphones",
				"children": [],
				"parents": [
					{
						"nodeId": 11,
						"name": "Telekommunikation &amp; Navigation",
						"metaTitle": "Telekommunikation &amp; Navigation",
						"metaKeywords": "Telekommunikation &amp; Navigation",
						"metaDescription": "Telekommunikation &amp; Navigation",
						"isActive": true,
						"url": "/de/telekommunikation-&amp;-navigation",
						"children": [],
						"parents": [
							{
								"nodeId": 1,
								"name": "Demoshop",
								"metaTitle": "Demoshop",
								"metaKeywords": "Deutsche Version des Demoshop",
								"metaDescription": "Deutsche Version des Demoshop",
								"isActive": true,
								"url": "/de",
								"children": [],
								"parents": [],
								"order": null
							}
						],
						"order": 80
					}
				],
				"order": 80
			},
			"links": {
				"self": "http://glue.mysprykershop.com/category-nodes/12"
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
				"url": "/de/computer/notebooks",
				"children": [],
				"parents": [
					{
						"nodeId": 5,
						"name": "Computer",
						"metaTitle": "Computer",
						"metaKeywords": "Computer",
						"metaDescription": "Computer",
						"isActive": true,
						"url": "/de/computer",
						"children": [],
						"parents": [
							{
								"nodeId": 1,
								"name": "Demoshop",
								"metaTitle": "Demoshop",
								"metaKeywords": "Deutsche Version des Demoshop",
								"metaDescription": "Deutsche Version des Demoshop",
								"isActive": true,
								"url": "/de",
								"children": [],
								"parents": [],
								"order": null
							}
						],
						"order": 100
					}
				],
				"order": 100
			},
			"links": {
				"self": "http://glue.mysprykershop.com/category-nodes/6"
			}
		},
		{
			"type": "category-nodes",
			"id": "8",
			"attributes": {
				"nodeId": 8,
				"name": "Tablets",
				"metaTitle": "Tablets",
				"metaKeywords": "Tablets",
				"metaDescription": "Tablets",
				"isActive": true,
				"url": "/de/computer/tablets",
				"children": [],
				"parents": [
					{
						"nodeId": 5,
						"name": "Computer",
						"metaTitle": "Computer",
						"metaKeywords": "Computer",
						"metaDescription": "Computer",
						"isActive": true,
						"url": "/de/computer",
						"children": [],
						"parents": [
							{
								"nodeId": 1,
								"name": "Demoshop",
								"metaTitle": "Demoshop",
								"metaKeywords": "Deutsche Version des Demoshop",
								"metaDescription": "Deutsche Version des Demoshop",
								"isActive": true,
								"url": "/de",
								"children": [],
								"parents": [],
								"order": null
							}
						],
						"order": 100
					}
				],
				"order": 80
			},
			"links": {
				"self": "http://glue.mysprykershop.com/category-nodes/8"
			}
		}
	]
}
```

</br>
</details>

*Last review date: Aug 02, 2019*

<!--by Anton Khabiuk, Yuliia Boiko-->
