---

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the **Navigation REST API** functionality.

{% endinfo_block %}

## Install Feature API

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} | 
| Navigation | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/navigations-rest-api:"^2.0.0" spryker/navigations-category-nodes-resource-relationship:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| NavigationsRestApi | vendor/spryker/navigations-rest-api |
| NavigationsCategoryNodesResourceRelationship | vendor/spryker/navigations-category-nodes-resource-relationship |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestNavigationAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestNavigationAttributesTransfer |
| RestNavigationNodeTransfer | class | created | src/Generated/Shared/Transfer/RestNavigationNodeTransfer |

{% endinfo_block %}


### 3) Set up configuration

#### Configure navigation mapping

{% info_block infoBox %}

Specify mapping for the source field from which the resourceId field should be filled (depends on a navigation node type).

{% endinfo_block %}

**src/Pyz/Glue/NavigationsRestApi/NavigationsRestApiConfig.php**

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

{% info_block warningBox "Verification" %}

The verification for this step can be provided once the resource is provided in the *Set up Behavior* section below.

{% endinfo_block %}

### 4) Set up behavior

#### Enable resources and relationships

Activate the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| NavigationsResourceRoutePlugin | Registers the `navigations` resource. | None | Spryker\Glue\NavigationsRestApi\Plugin\ResourceRoute |
| CategoryNodeByResourceIdResourceRelationshipPlugin | Adds the `category node` resource as a relationship. | None | \Spryker\Glue\NavigationsCategoryNodesResourceRelationship\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

`NavigationsResourceRoutePlugin` is set up correctly if the following endpoint is available: *https://glue.mysprykershop.com/navigations/{navigationId}*

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Now, it's possible to verify that the configuration of NavigationsRestApiConfig is done correctly. Perform the "https://glue.mysprykershop.com/navigations/{navigationId}" request and check that each node of the type you set up in the configuration (category and CMS pages in the example "resourceId" is filled with the valid foreign key.)

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Send a request to *https://glue.mysprykershop.com/navigations/MAIN_NAVIGATION?include=category-nodes*.

Make sure that the response contains `category-nodes` as a relationship and `category-nodes` data included.

<details>
<summary>https://glue.mysprykershop.com/navigations/MAIN_NAVIGATION?include=category-nodes</summary>

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
			"self": "https://glue.mysprykershop.com/navigations/MAIN_NAVIGATION?include=category-nodes"
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
				"self": "https://glue.mysprykershop.com/category-nodes/10"
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
				"self": "https://glue.mysprykershop.com/category-nodes/12"
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
				"self": "https://glue.mysprykershop.com/category-nodes/6"
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
				"self": "https://glue.mysprykershop.com/category-nodes/8"
			}
		}
	]
}
```
</details>

{% endinfo_block %}
