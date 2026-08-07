---
title: Install the Content Items Glue API
description: The guide walks you through the process of installing and configuring the Content Items feature in the project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-content-items-api-feature-integration
originalArticleId: 87cf9b21-06f9-4766-8645-bc62c4d64296
redirect_from:
  - /2021080/docs/glue-api-content-items-api-feature-integration
  - /2021080/docs/en/glue-api-content-items-api-feature-integration
  - /docs/glue-api-content-items-api-feature-integration
  - /docs/en/glue-api-content-items-api-feature-integration
  - /docs/scos/dev/feature-integration-guides/201811.0/glue-api/glue-api-content-items-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202311.0/glue-api/glue-api-content-items-feature-integration.html 
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/install-glue-api/install-the-content-items-glue-api.html 
related:
  - title: Install the Content Items feature
    link: docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-content-items-feature.html
  - title: "Glue API: Retrieve abstract product list content items"
    link: docs/pbc/all/content-management-system/latest/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-list-content-items.html
  - title: "Glue API: Retrieve banner content items"
    link: docs/pbc/all/content-management-system/latest/base-shop/manage-using-glue-api/glue-api-retrieve-banner-content-items.html
---

## Install Feature API

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Product | {{page.release_tag}} | [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html) |
| Content Item | {{page.release_tag}} |  |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/content-banners-rest-api:"^2.1.0" spryker/content-product-abstract-lists-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed in `vendor/spryker`:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ContentBannersRestApi | vendor/spryker/content-banners-rest-api |
| ContentProductAbstractListsRestApi | vendor/spryker/content-product-abstract-lists-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}


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

`ContentBannerResourceRoutePlugin` GET, `ContentProductAbstractListRoutePlugin` GET verbs are protected resources. Refer to the Configure section of the *Configure documentation*.

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

{% info_block warningBox "Verification" %}

Make sure that the following endpoints return the result with the all necessary data. For example:
- `https://glue.mysprykershop.com/content-banners/{content_key}`  
- `https://glue.mysprykershop.com/content-product-abstract-lists/{content_key}/content-product-abstract`


{% endinfo_block %}
