---
title: Glue API - Content Items API feature integration
description: The guide walks you through the process of installing and configuring the Content Items feature in the project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-content-items-api-feature-integration
originalArticleId: 87cf9b21-06f9-4766-8645-bc62c4d64296
redirect_from:
  - /2021080/docs/glue-api-content-items-api-feature-integration
  - /2021080/docs/en/glue-api-content-items-api-feature-integration
  - /docs/glue-api-content-items-api-feature-integration
  - /docs/en/glue-api-content-items-api-feature-integration
  - /docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-content-items-feature-integration.html
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Product | {{page.version}} | [Products API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html) |
| Content Item | {{page.version}} |  |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/content-banners-rest-api:"^2.1.0" spryker/content-product-abstract-lists-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Ensure that the following modules have been installed in `vendor/spryker`:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ContentBannersRestApi | vendor/spryker/content-banners-rest-api |
| ContentProductAbstractListsRestApi | vendor/spryker/content-product-abstract-lists-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox “Verification” %}


Make sure that the following changes have been applied in transfer objects, see `src/Generated/Shared/Transfer/` folder:

| TRANSFER | TYPE | EVENT |
| --- | --- | --- |
| RestErrorMessage | class | created |
| RestContentBannerAttributes | class | created |
| ContentProductAbstractListType | class | created |
| ContentBannerType | class | created |
| AbstractProductsRestAttributes | class | created |

{% endinfo_block %}


### 3) Set up Behavior

#### Enable resources and relationships

{% info_block infoBox %}

`ContentBannerResourceRoutePlugin` GET, `ContentProductAbstractListRoutePlugin` GET verbs are protected resources. Please refer to the Configure section of the *Configure documentation*.
{% endinfo_block %}

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ContentBannerResourceRoutePlugin | Registers a `/content-banners/{CONTENT-KEY}` resource route. | None | Spryker\Glue\ContentBannersRestApi\Plugin |
| ContentProductAbstractListRoutePlugin | Registers a `/content-product-abstract-lists/{CONTENT-KEY}/content-product-abstract` resource route. | None | Spryker\Glue\ContentProductAbstractListsRestApi\Plugin |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

Make sure that the following endpoints return the result with the all necessary data. For example:
- http://glue.mysprykershop.com/content-banners/{content_key}-
- http://glue.mysprykershop.com/content-product-abstract-lists/{content_key}/content-product-abstract
-
{% endinfo_block %}
