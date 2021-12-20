---
title: "Glue API: Merchant Category feature integration"
last_updated: Mar 04, 2021
description: This document describes the process how to integrate the Merchant Category Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Category Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Category Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME   | VERSION | INTEGRATION GUIDE   |
| ---------------- | ------ | ------------------ |
| Spryker Core   | {{page.version}}   | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Marketplace Merchant Category | {{page.version}}  | [Marketplace Merchant Category feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-category-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/merchant-categories-rest-api:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| -------------- | ----------------- |
| MerchantCategoriesRestApi | vendor/spryker/merchant-categories-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| -------------- | ---- | ----- | ------------------ |
| RestMerchantsAttributes | object | Created | src/Generated/Shared/Transfer/RestMerchantsAttributes |

{% endinfo_block %}

### 3) Enable resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --------------- | -------------- | ------------- | ----------------- |
| MerchantCategoryMerchantRestAttributesMapperPlugin | Maps active categories from `MerchantStorageTransfer` to `RestMerchantsAttributesTransfer`. |  | Spryker\Glue\MerchantCategoriesRestApi\Plugin\MerchantsRestApi |

**src/Pyz/Glue/MerchantsRestApi/MerchantsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\MerchantsRestApi;

use Spryker\Glue\MerchantCategoriesRestApi\Plugin\MerchantsRestApi\MerchantCategoryMerchantRestAttributesMapperPlugin;
use Spryker\Glue\MerchantsRestApi\MerchantsRestApiDependencyProvider as SprykerMerchantsRestApiDependencyProvider;

class MerchantsRestApiDependencyProvider extends SprykerMerchantsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\MerchantsRestApiExtension\Dependency\Plugin\MerchantRestAttributesMapperPluginInterface[]
     */
    public function getMerchantRestAttributesMapperPlugins(): array
    {
        return [
            new MerchantCategoryMerchantRestAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you send the request `GET http://glue.mysprykershop.com/merchants`, you can see the category keys and names for merchants assigned to categories.

Make sure that when you send the request `GET http://glue.mysprykershop.com/merchants?categoryKeys[]={% raw %}{{some-category-key}}{% endraw %}`, you can see only merchants that belong to the particular category in the response.

{% endinfo_block %}
