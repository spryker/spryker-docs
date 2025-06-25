

This document describes how to install the CMS feature API.

## Prerequisites

Install the required features:

| NAME     | VERSION | REQUIRED SUB-FEATURE     |
| --------- | ------ | ------------------------ |
| Spryker Core | {{page.version}}  | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| CMS          | {{page.version}}  | [Install the CMS feature](/docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-cms-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/cms-pages-rest-api spryker/content-product-abstract-lists-rest-api spryker/cms-pages-content-banners-resource-relationship --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE   | EXPECTED DIRECTORY    |
| --------------------- | ------------------- |
| CmsPagesRestApi                            | vendor/spryker/cms-pages-rest-api                            |
| ContentProductAbstractListsRestApi         | vendor/spryker/content-product-abstract-lists-rest-api       |
| CmsPagesContentBannersResourceRelationship | vendor/spryker/cms-pages-content-banners-resource-relationship |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

1. Generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTRY    | TYPE  | EVENT   |
| -------------- | ---- | ------ |
| spy_cms_page.uuid | field | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the transfer objects:

| TRANSFER  | TYPE     | EVENT   | PATH |
| ------------- | ------ | ------ | ----------------------- |
| RestCmsPagesAttributesTransfer    | class    | created | src/Generated/Shared/Transfer/RestCmsPagesAttributesTransfer |
| LocaleCmsPageDataTransfer         | property | created | src/Generated/Shared/Transfer/LocaleCmsPageDataTransfer      |
| CmsPageStorageTransfer            | class    | created | src/Generated/Shared/Transfer/CmsPageStorageTransfer         |
| StoreTransfer                     | property | created | src/Generated/Shared/Transfer/StoreTransfer                  |
| RestErrorMessageTransfer          | class    | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer       |
| RestUrlResolverAttributesTransfer | class    | created | src/Generated/Shared/Transfer/RestUrlResolverAttributesTransfer |
| UrlStorageTransfer                | class    | created | src/Generated/Shared/Transfer/UrlStorageTransfer             |

{% endinfo_block %}

2. Update the UUID for the CMS pages that had existed before you've added the column:

```bash
console uuid:generate Cms spy_cms_page
```

{% info_block warningBox "Verification" %}

Make sure that all the records in the `spy_cms_page` have the `uuid` field populated with auto-generated values.

{% endinfo_block %}

## 3) Set up behavior

Activate the following plugins:

| PLUGIN   | SPECIFICATION   | PREREQUISITES | NAMESPACE  |
| ----------------------------- | --------------------- | ----------- | ------------------------ |
| ContentProductAbstractListAbstractProductsResourceRoutePlugin | Adds the `abstract-products` resource route with the `content-product-abstract-lists` resource as a parent. | None          | Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication |
| CmsPagesResourceRoutePlugin                                  | Adds the `cms-pages` resource route.                         | None          | Spryker\Glue\CmsPagesRestApi\Plugin\GlueApplication          |
| ContentProductAbstractListsResourceRoutePlugin               | Adds `the content-product-abstract-lists` resource route.    | None          | Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication |
| ContentBannerByCmsPageResourceRelationshipPlugin             | Adds the `content-banner` resource as a relationship for the `cms-pages` resource. | None          | Spryker\Glue\CmsPagesContentBannersResourceRelationship\Plugin\GlueApplication |
| ContentProductAbstractListByCmsPageResourceRelationshipPlugin | Adds the `content-product-abstract-lists` resource as a  relationship for the `cms-pages` resource. | None          | Spryker\Glue\CmsPagesContentProductAbstractListsResourceRelationship\Plugin\GlueApplication |
| ProductAbstractByContentProductAbstractListResourceRelationshipPlugin | Adds the `abstract-products` resource as a relatonship to the `content-product-abstract-lists` resource. | None          | Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication |
| CmsPageRestUrlResolverAttributesTransferProviderPlugin       | Looks up the CMS page in the key-value storage by id given in `UrlStorageTransfer`. Returns the `RestUrlResolverAttributesTransfer` with type "cms-pages" and CMS page UUID as entity ID. | None          | Spryker\Glue\CmsPagesRestApi\Plugin\UrlsRestApi;             |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CmsPagesContentBannersResourceRelationship\Plugin\GlueApplication\ContentBannerByCmsPageResourceRelationshipPlugin;
use Spryker\Glue\CmsPagesContentProductAbstractListsResourceRelationship\Plugin\GlueApplication\ContentProductAbstractListByCmsPageResourceRelationshipPlugin;
use Spryker\Glue\CmsPagesRestApi\CmsPagesRestApiConfig;
use Spryker\Glue\CmsPagesRestApi\Plugin\GlueApplication\CmsPagesResourceRoutePlugin;
use Spryker\Glue\ContentProductAbstractListsRestApi\ContentProductAbstractListsRestApiConfig;
use Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\AbstractProductsResourceRoutePlugin as ContentProductAbstractListAbstractProductsResourceRoutePlugin;
use Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\ContentProductAbstractListsResourceRoutePlugin;
use Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\ProductAbstractByContentProductAbstractListResourceRelationshipPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new CmsPagesResourceRoutePlugin(),
            new ContentProductAbstractListsResourceRoutePlugin(),
            new ContentProductAbstractListAbstractProductsResourceRoutePlugin(),
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
            CmsPagesRestApiConfig::RESOURCE_CMS_PAGES,
            new ContentBannerByCmsPageResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CmsPagesRestApiConfig::RESOURCE_CMS_PAGES,
            new ContentProductAbstractListByCmsPageResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ContentProductAbstractListsRestApiConfig::RESOURCE_CONTENT_PRODUCT_ABSTRACT_LISTS,
            new ProductAbstractByContentProductAbstractListResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

**src/Pyz/Glue/UrlsRestApi/UrlsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\UrlsRestApi;

use Spryker\Glue\CmsPagesRestApi\Plugin\UrlsRestApi\CmsPageRestUrlResolverAttributesTransferProviderPlugin;
use Spryker\Glue\UrlsRestApi\UrlsRestApiDependencyProvider as SprykerUrlsRestApiDependencyProvider;

class UrlsRestApiDependencyProvider extends SprykerUrlsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\UrlsRestApiExtension\Dependency\Plugin\RestUrlResolverAttributesTransferProviderPluginInterface[]
     */
    protected function getRestUrlResolverAttributesTransferProviderPlugins(): array
    {
        return [
            new CmsPageRestUrlResolverAttributesTransferProviderPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

Make sure that the `cms-pages` resource is available by sending the request:`GET https://glue.mysprykershop.com/cms-pages`.

Make sure that the `content-product-abstract-lists` resource is available by sending the request: `GET https://glue.mysprykershop.com/content-product-abstract-lists/{% raw %}{{{% endraw %}abstract_product_list_key{% raw %}}}{% endraw %}`.

Make sure that the `abstract-products` resource is available with `content-product-abstract-lists` as a parent by sending the request: `GET https://glue.mysprykershop.com/content-product-abstract-lists/{% raw %}{{{% endraw %}abstract_product_list_key{% raw %}}}{% endraw %}/abstract-product`.

Make sure that you can retrieve the banners added to a CMS page by sending the request: `GET https://glue.mysprykershop.com/cms-pages?includes=content-banners`

Make sure that you can retrieve the product abstract lists added to a CMS page by sending the request:`GET https://glue.mysprykershop.com/cms-pages?includes=content-product-abstract-lists`.

Make sure that you can retrieve the abstract products added to an abstract product list by sending the request: `GET https://glue.mysprykershop.com/content-product-abstract-lists?includes=abstract-products`.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE      | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE     |
| ---------- | ----------------- | ---------------------------- |
| Content items |                                  | [Install the Content Items feature](/docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-content-items-feature.html) |
| CMS           | ✓                                | [Install the CMS feature](/docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-cms-feature.html) |
