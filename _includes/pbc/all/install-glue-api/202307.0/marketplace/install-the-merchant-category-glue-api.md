

This document describes how to integrate the Merchant Category Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Category Glue API feature core.

### Prerequisites

Install the required features:

| NAME   | VERSION | INSTALLATION GUIDE   |
| ---------------- | ------ | ------------------ |
| Spryker Core   | {{page.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Marketplace Merchant Category | {{page.version}}  | [Install the Marketplace Merchant Category feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-category-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-categories-rest-api:"^1.0.0" --update-with-dependencies
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

Make sure the following changes have been applied in transfer objects:

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
     * @return array<\Spryker\Glue\MerchantsRestApiExtension\Dependency\Plugin\MerchantRestAttributesMapperPluginInterface>
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

Make sure that when you send the request `GET https://glue.mysprykershop.com/merchants`, you can see the category keys and names for merchants assigned to categories.

Make sure that when you send the request `GET https://glue.mysprykershop.com/merchants?category-keys[]={% raw %}{{some-category-key}}{% endraw %}`, you can see only merchants that belong to the particular category in the response.

{% endinfo_block %}
