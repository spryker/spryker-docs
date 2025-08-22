This document describes how to install the Text Alternatives feature.

## Install feature

Follow the steps below to install the Text Alternatives feature.

### Prerequisites

Install the required features:

| NAME         | VERSION           | INSTALLATION GUIDE                                                                                                                                             |
|--------------| ----------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)              |
| Product      | 202507.0 | [Install the Product feature](/docs/pbc/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

In case you want to integrate the Text Alternatives feature for the Product Sets feature, you also need to install the following features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Product Sets | 202507.0 | [Install the Product Sets feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-sets-feature.html) |

To start feature integration, overview, and install the necessary packages:

| NAME                          | VERSION |
|-------------------------------|---------|
| spryker/product-image         | 3.20.0  |
| spryker/product-image-storage | 1.19.0  |
| spryker/product-management    | 0.19.53 |
| spryker/glossary              | 3.16.0  |
| spryker/glossary-storage      | 1.5.0   |
| spryker-shop/shop-ui          | 1.96.0  |

In case you want to integrate the Text Alternatives feature for the Product Sets feature, you also need to install the following packages:

| NAME                               | VERSION |
|------------------------------------|--------|
| spryker/product-set-gui            | 2.13.0 |
| spryker/product-set-page-search    | 1.13.0 |
| spryker/product-set-storage        | 1.13.0 |
| spryker-shop/product-set-list-page | 1.2.0  |
| spryker-shop/product-set-widget    | 1.10.0 |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/glossary:^3.16.0 spryker/glossary-storage:^1.5.0 spryker/product-image:^3.20.0 spryker/product-image-storage:1.19.0 spryker/product-management:^0.19.53 spryker-shop/shop-ui:^1.96.0 --update-with-dependencies
composer require spryker/product-image spryker/product-image-storage spryker/product-management spryker-shop/shop-ui --update-with-dependencies
```

```bash
composer require spryker/product-set-gui:^2.13.0 spryker/product-set-page-search:^1.13.0 spryker/product-set-storage:^1.13.0 spryker-shop/product-set-list-page:^1.2.0 spryker-shop/product-set-widget:^1.10.0 --update-with-dependencies
composer require spryker/product-set-gui spryker/product-set-page-search spryker/product-set-storage spryker-shop/product-set-list-page spryker-shop/product-set-widget --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE              | EXPECTED DIRECTORY                   |
|---------------------|--------------------------------------|
| ProductImage        | vendor/spryker/spryker/product-image |
| ProductImageStorage | vendor/spryker/product-image-storage |
| ProductManagement   | vendor/spryker/product-management    |
| Glossary            | vendor/spryker/glossary              |
| GlossaryStorage     | vendor/spryker/glossary-storage      |
| ShopUi              | vendor/spryker-shop/shop-ui          |

In case you want to integrate the Text Alternatives feature for the Product Sets feature, make sure that the following modules have been installed:

| MODULE               | EXPECTED DIRECTORY                        |
|----------------------|-------------------------------------------|
| ProductSetGui        | vendor/spryker/product-set-gui            |
| ProductSetPageSearch | vendor/spryker/product-set-page-search    |
| ProductSetStorage    | vendor/spryker/product-set-storage        |
| ProductSetListPage   | vendor/spryker-shop/product-set-list-page |
| ProductSetWidget     | vendor/spryker-shop/product-set-widget    |

{% endinfo_block %}

### 2) Enable the feature in the ProductImage module configuration

**src/Pyz/Shared/ProductImage/ProductImageConfig.php**

```php
<?php
declare(strict_types = 1);

namespace Pyz\Shared\ProductImage;

use Spryker\Shared\ProductImage\ProductImageConfig as SprykerProductImageConfig;

class ProductImageConfig extends SprykerProductImageConfig
{
    /**
     * @return bool
     */
    public function isProductImageAlternativeTextEnabled(): bool
    {
        return true;
    }
}

```

### 3) Set up database schema and transfer objects

1. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY    | TYPE  | EVENT   |
|--------------------|-------|---------|
| spy_product_image.alt_text_small | field | created |
| spy_product_image.alt_text_large | field | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                         | TYPE     | EVENT   | PATH                                                          |
|----------------------------------|----------|---------|---------------------------------------------------------------|
| ProductImage.altTextSmall        | property | created | src/Generated/Shared/Transfer/ProductImageTransfer            |
| ProductImage.altTextLarge        | property | created | src/Generated/Shared/Transfer/ProductImageTransfer            |
| ProductImage.translations        | property | created | src/Generated/Shared/Transfer/ProductImageTransfer            |
| ProductImageStorage.altTextSmall | property | created | src/Generated/Shared/Transfer/ProductImageStorageTransfer     |
| ProductImageStorage.altTextLarge | property | created | src/Generated/Shared/Transfer/ProductImageStorageTransfer     |
| ProductImageTranslation          | class    | created | src/Generated/Shared/Transfer/ProductImageTranslationTransfer |

In case you want to integrate the Text Alternatives feature for the Product Sets feature, make sure that the following changes have been applied in transfer objects:

| TRANSFER                         | TYPE     | EVENT   | PATH                                                      |
|----------------------------------|----------|---------|-----------------------------------------------------------|
| StorageProductImage.altTextSmall        | property | created | src/Generated/Shared/Transfer/StorageProductImageTransfer |
| StorageProductImage.altTextLarge        | property | created | src/Generated/Shared/Transfer/StorageProductImageTransfer |

{% endinfo_block %}


### 4) Import text alternatives data

Follow the steps to import text alternatives data:

1. Add text alternatives data for product images by adding new fields to the data import file, using the following example:

**data/import/common/common/product_image.csv**

```csv
alt_text_small.de_DE,alt_text_small.en_US,alt_text_large.de_DE,alt_text_large.en_US
"Details ansehen: Samsung Gear S2","View details of Samsung Gear S2","Back view of Samsung Gear S2 Black","Rückansicht von Samsung Gear S2 Black"
```

New fields are `alt_text_small` and `alt_text_large` with the locale name as a suffix.

In case you want to integrate the Text Alternatives feature for the Product Sets feature, add text alternatives data for product set images by adding new fields to the data import file, using the following example:

**data/import/common/AT/combined_product.csv**

```csv
alt_text.image_small.1.1.de_DE,alt_text.image_small.1.1.en_US,alt_text.image_large.1.1.de_DE,alt_text.image_large.1.1.en_US
"Details ansehen: Samsung Gear S2","View details of Samsung Gear S2","Back view of Samsung Gear S2 Black","Rückansicht von Samsung Gear S2 Black"
```

New fields are `alt_text_small` and `alt_text_large` with the image number and the locale name as a suffix.

2. Apply the changes to the data import business logic:

Here is an example of how to extend the data import business logic for product images to handle the new fields: [https://github.com/spryker-shop/b2c-demo-shop/pull/781/files](https://github.com/spryker-shop/b2c-demo-shop/pull/781/files)

3. Run the following console command to import data:

```bash
console data:import --config=data/import/local/full_EU.yml product-image
```

In case you want to import text alternatives data for product set images, run the following console command:

```bash
console data:import --config=data/import/local/full_EU.yml product-set
```
