
This document describes how to install the ProductManagementAi module.

## Install feature core

Follow the steps below to install the ProductManagementAi module core.

### Prerequisites

Install the required features:

| NAME                | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                   |
|---------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OpenAi              | {{page.version}} | [Install the OpenAi feature](/docs/pbc/all/miscellaneous/{{page.version}}/third-party-integrations/open-ai/install-and-upgrade/install-the-open-ai-module.html)                                      |
| Product             | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                         |
| Category Management | {{page.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |

### 1) Install the required modules

Run the following command to install the required module:

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
| ProductCategoryProductAbstractPostCreatePlugin    | Assigns categories to the product abstract after the product abstract is created. |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\Product           |
| ProductCategoryProductAbstractAfterUpdatePlugin   | Assigns categories to the product abstract after the product abstract is updated. |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\Product           |
| ProductCategoryAbstractFormExpanderPlugin         | Expands ProductAbstract form with `categoryIds` field.                            |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |
| ImageAltTextProductConcreteEditFormExpanderPlugin | Expands ProductConcrete edit form with `alt_text` field.                          |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |
| ImageAltTextProductConcreteFormExpanderPlugin     | Expands ProductConcrete form with `alt_text` field.                               |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |
| ImageAltTextProductAbstractFormExpanderPlugin     | Expands ProductAbstract form with `alt_text` field.                               |               | SprykerEco\Zed\ProductManagementAi\Communication\Plugin\ProductManagement |


**src/Pyz/Zed/Product/ProductDependencyProvider.php**

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

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

- Verify `ProductCategoryAbstractFormExpanderPlugin` by checking that edit and create abstract product forms contain `categoryIds` fields.
- Verify `ProductCategoryProductAbstractAfterUpdatePlugin` by checking that after updating an abstract product, the categories from `categoryIds` field are assigned to the corresponding abstract product.
- Verify `ProductCategoryProductAbstractPostCreatePlugin` by checking that after creating an abstract product, the categories from `categoryIds` field are assigned to the corresponding abstract product.
- Verify `ImageAltTextProductAbstractFormExpanderPlugin` by checking that edit abstract product form contains `alt_text` field  for each image and after saving the form the value is saved to `spy_product_image.alt_text` DB column.
- Verify `ImageAltTextProductConcreteEditFormExpanderPlugin` and `ImageAltTextProductConcreteEditFormExpanderPlugin` by checking that edit concrete product form contains `alt_text` field  for each image and after saving the form the value is saved to `spy_product_image.alt_text` DB column.

{% endinfo_block %}

## Install feature frontend

See backoffice related code in the demoshops PRs as an example of how to integrate the ProductManagementAi module frontend into your project:
- B2B: https://github.com/spryker-shop/b2b-demo-shop/pull/491/files
- B2C: https://github.com/spryker-shop/b2c-demo-shop/pull/544/files
- B2B-MP: https://github.com/spryker-shop/b2b-demo-marketplace/pull/438/files
- B2C-MP: https://github.com/spryker-shop/b2c-demo-marketplace/pull/422/files

Run the following commands to apply the frontend changes:

```bash
npm install
console frontend:project:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Login to backoffice, go to product abstract create/update page and make sure that `name`, `description`, `categories`, `alt text` fields have new icon to open an AI Assistant popup.

{% endinfo_block %}