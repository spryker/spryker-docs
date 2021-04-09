---
title: Merchant Category feature integration
last_updated: Nov 10, 2020
summary: This document describes the process how to integrate the Merchant Category Glue API feature into a Spryker project.
---

## Install feature core

Follow the steps below to install the Merchant Category Glue API feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name   | Version | Link   |
| ---------------- | ------ | ------------------ |
| Spryker Core   | master   | [Glue API: Spryker Core feature integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/639173086) |
| Marketplace Merchant Category | master  | [Marketplace Merchant Category Feature Integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1874690281) |

### 1) Install the required modules using composer

Run the following commands to install the required modules:

```bash
composer require spryker/merchant-categories-rest-api:"^0.1.0" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| Module  | Expected Directory   |
| -------------- | ----------------- |
| MerchantCategoriesRestApi | vendor/spryker/merchant-categories-rest-api |

---

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| Transfer  | Type   | Event   | Path   |
| -------------- | ---- | ----- | ------------------ |
| RestMerchantsAttributes | object | Created | src/Generated/Shared/Transfer/RestMerchantsAttributes |

---

### 3) Set up behavior

#### Enable resources and relationships

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --------------- | -------------- | ------------- | ----------------- |
| MerchantCategoryMerchantRestAttributesMapperPlugin | Maps active categories from MerchantStorageTransfer to RestMerchantsAttributesTransfer. | None | Spryker\Glue\MerchantCategoriesRestApi\Plugin\MerchantsRestApi |

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

---
**Verification**

Make sure that when you sending the request `GET http://glue.mysprykershop.com/merchants`, you can see the category keys and names for merchants that assigned to categories.

Make sure that when you sending the request `GET http://glue.mysprykershop.com/merchants?categoryKeys[]={some-category-key}`, you can see only merchants that belongs to the particular category in the response.

---
