---
title: Glue API - Content items API feature integration
description: The guide walks you through the process of installing and configuring the Content Items feature in the project.
last_updated: Aug 27, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/glue-api-content-items-api-feature-integration
originalArticleId: 69d8b3ca-0735-4494-b77d-6dc92ab82386
redirect_from:
  - /v6/docs/glue-api-content-items-api-feature-integration
  - /v6/docs/en/glue-api-content-items-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | 201907.0 | Glue Application feature integration |
| Product | 201907.0 | Products API feature integration |
| Content Item | 201907.0 |  |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/content-banners-rest-api:"^2.1.0" spryker/content-product-abstract-lists-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Ensure that the following modules have been installed in `vendor/spryker`:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `ContentBannersRestApi` | `vendor/spryker/content-banners-rest-api` |
| `ContentProductAbstractListsRestApi` | `vendor/spryker/content-product-abstract-lists-rest-api` |

### 2) Set up Transfer Objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes have been applied in transfer objects, see    `src/Generated/Shared/Transfer/` folder:
{% endinfo_block %}

| Transfer | Type | Event |
| --- | --- | --- |
| `RestErrorMessage` | class | created |
| `RestContentBannerAttributes` | class | created |
| `ContentProductAbstractListType` | class | created |
| `ContentBannerType` | class | created |
| `AbstractProductsRestAttributes` | class | created |

### 3) Set up Behavior
#### Enable resources and relationships

{% info_block infoBox %}
`ContentBannerResourceRoutePlugin` GET, `ContentProductAbstractListRoutePlugin` GET verbs are protected resources. Please refer to the Configure section of the *Configure documentation*.
{% endinfo_block %}

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ContentBannerResourceRoutePlugin` | Registers a `/content-banners/{CONTENT-KEY}` resource route. | None | `Spryker\Glue\ContentBannersRestApi\Plugin` |
| `ContentProductAbstractListRoutePlugin` | Registers a `/content-product-abstract-lists/{CONTENT-KEY}/content-product-abstract` resource route. | None | `Spryker\Glue\ContentProductAbstractListsRestApi\Plugin` |

src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\ContentBannersRestApi\Plugin\ContentBannerResourceRoutePlugin;
use Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\ContentProductAbstractListRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* {@inheritdoc}
	*
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new ContentBannerResourceRoutePlugin(),
			new ContentProductAbstractListRoutePlugin(),
		];
	}
}
```

{% info_block warningBox “Verification” %}

Make sure that the following endpoints return the result with the all necessary data (for example
{% endinfo_block %}:<ul><li>http://glue.mysprykershop.com/content-banners/{content_key}</li><li>http://glue.mysprykershop.com/content-product-abstract-lists/{content_key}/content-product-abstract</li></ul>)
