---
title: Install Product Management powered by OpenAI
description: Learn how to integrate the ProductManagementAi module into a Spryker project.
last_updated: Nov 12, 2024
template: feature-integration-guide-template
---

AI-powered product management adds the following functionality to the Back Office:
* Automates product categorization in the Back Office.  
* Automates the translation of product information in the Back Office.  
* Generates alt text for product images in the Back Office to improve accessibility and SEO.


This document describes how to install Product Management powered by OpenAI.

## Install feature core

Follow the steps below to install the ProductManagementAi module core.

### Prerequisites

Install the required features:

| NAME                | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                   |
|---------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OpenAI              | {{page.version}} | [Integrate OpenAI](/docs/pbc/all/miscellaneous/{{page.version}}/third-party-integrations/open-ai/integrate-openai.html)                                      |
| Product             | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                         |
| Category Management | {{page.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |

### 1) Install the required modules

Install the required module:

```bash
composer require spryker-eco/product-management-ai:"^0.1.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE              | EXPECTED DIRECTORY                       |
|---------------------|------------------------------------------|
| ProductManagementAi | vendor/spryker-eco/product-management-ai |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY            | TYPE   | EVENT   |
|----------------------------|--------|---------|
| spy_product_image.alt_text | column | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                     | TYPE     | EVENT   | PATH                                                       |
|------------------------------|----------|---------|------------------------------------------------------------|
| AiTranslatorRequest          | class    | created | src/Generated/Shared/Transfer/AiTranslatorRequestTransfer  |
| AiTranslatorResponseTransfer | class    | created | src/Generated/Shared/Transfer/AiTranslatorResponseTransfer |
| ProductImage.altText         | property | created | src/Generated/Shared/Transfer/ProductImageTransfer         |
| ProductImageStorage.altText  | property | created | src/Generated/Shared/Transfer/ProductImageStorageTransfer  |
| ProductAbstract.categoryIds  | property | created | src/Generated/Shared/Transfer/ProductAbstractTransfer      |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                            | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                                 |
|---------------------------------------------------|-----------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------|
| ProductCategoryProductAbstractPostCreatePlugin    | Assigns categories to a product abstract after the product abstract is created. |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\Product           |
| ProductCategoryProductAbstractAfterUpdatePlugin   | Assigns categories to a product abstract after the product abstract is updated. |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\Product           |
| ProductCategoryAbstractFormExpanderPlugin         | Expands the `ProductAbstract` form with `categoryIds` field.                            |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |
| ImageAltTextProductConcreteEditFormExpanderPlugin | Expands the `ProductConcrete` edit form with the `alt_text` field.                          |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |
| ImageAltTextProductConcreteFormExpanderPlugin     | Expands the `ProductConcrete` form with the `alt_text` field.                               |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |
| ImageAltTextProductAbstractFormExpanderPlugin     | Expands the `ProductAbstract` form with the `alt_text` field.                               |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |


<details>
  <summary>src/Pyz/Zed/Product/ProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use SprykerEco\Zed\ProductManagementAi\Communication\Plugin\Product\ProductCategoryProductAbstractAfterUpdatePlugin;
use SprykerEco\Zed\ProductManagementAi\Communication\Plugin\Product\ProductCategoryProductAbstractPostCreatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface>
     */
    protected function getProductAbstractPostCreatePlugins(): array
    {
        return [
            new ProductCategoryProductAbstractPostCreatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginUpdateInterface>
     */
    protected function getProductAbstractAfterUpdatePlugins(Container $container): array
    {
        return [
            new ProductCategoryProductAbstractAfterUpdatePlugin(),
        ];
    }
}

```

</details>


<details>
  <summary>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement\ImageAltTextProductAbstractFormExpanderPlugin;
use SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement\ImageAltTextProductConcreteEditFormExpanderPlugin;
use SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement\ImageAltTextProductConcreteFormExpanderPlugin;
use SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement\ProductCategoryAbstractFormExpanderPlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
/**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteEditFormExpanderPluginInterface>
     */
    protected function getProductConcreteEditFormExpanderPlugins(): array
    {
        return [
            new ImageAltTextProductConcreteEditFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface>
     */
    protected function getProductAbstractFormExpanderPlugins(): array
    {
        return [
            new ProductCategoryAbstractFormExpanderPlugin(),
            new ImageAltTextProductAbstractFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormExpanderPluginInterface>
     */
    protected function getProductConcreteFormExpanderPlugins(): array
    {
        return [
            new ImageAltTextProductConcreteFormExpanderPlugin(),
        ];
    }
}

```

</details>

{% info_block warningBox "Verification" %}

| PLUGIN | VERIFICATION |
| - | - |
| `ProductCategoryAbstractFormExpanderPlugin` |  Edit and create abstract product forms contain `categoryIds` field.
| `ProductCategoryProductAbstractAfterUpdatePlugin` |  After updating an abstract product, the categories from `categoryIds` field are assigned to the corresponding abstract product. |
| `ProductCategoryProductAbstractPostCreatePlugin` |  After creating an abstract product, the categories from `categoryIds` field are assigned to the corresponding abstract product. |
| `ImageAltTextProductAbstractFormExpanderPlugin` | The edit abstract product form contains the `alt_text` field for each image. After saving the form, the value is saved to the `spy_product_image.alt_text` database column. |
| `ImageAltTextProductConcreteEditFormExpanderPlugin` and `ImageAltTextProductConcreteEditFormExpanderPlugin` | The edit concrete product form contains the `alt_text` field for each image. After saving the form, the value is saved to the `spy_product_image.alt_text` database column. |

{% endinfo_block %}

## Install feature frontend

1. Integrate the frontend part using the example integration in Demo Shops:
* B2B: https://github.com/spryker-shop/b2b-demo-shop/pull/491/files
* B2C: https://github.com/spryker-shop/b2c-demo-shop/pull/544/files
* B2B-MP: https://github.com/spryker-shop/b2b-demo-marketplace/pull/438/files
* B2C-MP: https://github.com/spryker-shop/b2c-demo-marketplace/pull/422/files

2. Apply the frontend changes:

```bash
npm install
console frontend:project:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

In the Back Office, make sure that, on the product abstract create and update pages, and AI assistant icon is displayed next to `name`, `description`, `categories`, and `alt text` fields.

{% endinfo_block %}
