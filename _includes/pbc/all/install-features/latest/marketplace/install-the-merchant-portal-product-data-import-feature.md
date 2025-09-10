This document describes how to install the Marketplace Merchant Portal Data Import feature.

## Prerequisites

Install the required features:

| NAME                               | VERSION   | INSTALLATION GUIDE                                                                                                                                                                                           |
|------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core   | 202507.0  | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)              |
| Marketplace Product                | 202507.0  | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html)                 |
| Marketplace Merchant Data Import   | 202507.0  | [Install the Marketplace Merchant Data Import feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-data-import-feature) |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-product-data-import:"^0.5.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                     | EXPECTED DIRECTORY                           |
|----------------------------|----------------------------------------------|
| MerchantProductDataImport  | vendor/spryker/merchant-product-data-import  |

{% endinfo_block %}


### Add file system configuration

Add file system configuration for storing merchant files:

**config/Shared/config_default.php**

```php
$config[MerchantProductDataImportConstants::FILE_SYSTEM_NAME] = 'merchant-product-data-import-files';
$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'merchant-product-data-import-files' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_MERCHANT_PRODUCT_DATA_IMPORT_FILES_KEY') ?: '',
        'bucket' => getenv('SPRYKER_S3_MERCHANT_PRODUCT_DATA_IMPORT_FILES_BUCKET') ?: '',
        'secret' => getenv('SPRYKER_S3_MERCHANT_PRODUCT_DATA_IMPORT_FILES_SECRET') ?: '',
        'root' => '/',
        'path' => '/',
        'version' => 'latest',
        'region' => getenv('AWS_REGION') ?: 'eu-central-1',
    ],
];
```

For local development, you can use the following configuration:

**config/Shared/config_default-docker.dev.php**

```php
$config[FileSystemConstants::FILESYSTEM_SERVICE]['merchant-product-data-import-files'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => '/data',
    'path' => '/data/merchant-product-data-import-files',
];
```

## Generate required transfer objects and database changes

```bash
vendor/bin/console transfer:generate
vendor/bin/console propel:install
```

## Add translations

Generate a new translation cache:

```bash
vendor/bin/console translator:generate-cache
```

## Add configuration

Enable product data import by registering the plugin.

| PLUGIN                                                   | SPECIFICATION                                                                 | NAMESPACE                                                                     |
|----------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| MerchantCombinedProductDataImportPlugin                  | Adds a type of merchant product data import.                                  | Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImport         |
| MerchantCombinedProductMerchantFileValidationPlugin      | Validates required headers in merchant combined product data import files.    | Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImportMerchant |
| MerchantCombinedProductMerchantFileRequestExpanderPlugin | Expands data import merchant file collection request.                         | Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImportMerchant |
| MerchantCombinedProductPossibleCsvHeaderExpanderPlugin   | Expands possible CSV headers for merchant combined product data import files. | Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImportMerchant |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImport\MerchantCombinedProductDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantCombinedProductDataImportPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/DataImportMerchant/DataImportMerchantDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImportMerchant;

use Spryker\Zed\DataImportMerchant\DataImportMerchantDependencyProvider as SprykerDataImportMerchantDependencyProvider;
use Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImportMerchant\MerchantCombinedProductMerchantFileRequestExpanderPlugin;
use Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImportMerchant\MerchantCombinedProductMerchantFileValidationPlugin;
use Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImportMerchant\MerchantCombinedProductPossibleCsvHeaderExpanderPlugin;

class DataImportMerchantDependencyProvider extends SprykerDataImportMerchantDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImportMerchantExtension\Dependency\Plugin\DataImportMerchantFileValidatorPluginInterface>
     */
    protected function getDataImportMerchantFileValidatorPlugins(): array
    {
        return [
            new MerchantCombinedProductMerchantFileValidationPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\DataImportMerchantExtension\Dependency\Plugin\DataImportMerchantFileRequestExpanderPluginInterface>
     */
    protected function getDataImportMerchantFileRequestExpanderPlugins(): array
    {
        return [
            new MerchantCombinedProductMerchantFileRequestExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\DataImportMerchantExtension\Dependency\Plugin\PossibleCsvHeaderExpanderPluginInterface>
     */
    protected function getPossibleCsvHeaderExpanderPlugins(): array
    {
        return [
            new MerchantCombinedProductPossibleCsvHeaderExpanderPlugin(),
        ];
    }
}
```

## Configure behavior

Update `DataImportMerchantPortalGuiConfig` as follows:

- Add `MerchantProductDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT` to `getSupportedImporterTypes()` to enable merchants to import product data.

- Add the product data CSV template to `getDataImportTemplates()` so merchants can use it to prepare their files.

- Optional: Customize the name of the `CSV template Product` template.

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImportMerchantPortalGui;

use Spryker\Zed\DataImportMerchantPortalGui\DataImportMerchantPortalGuiConfig as SprykerDataImportMerchantPortalGuiConfig;
use Spryker\Zed\MerchantProductDataImport\MerchantProductDataImportConfig;

class DataImportMerchantPortalGuiConfig extends SprykerDataImportMerchantPortalGuiConfig
{
    /**
     * @return list<string>
     */
    public function getSupportedImporterTypes(): array
    {
        return [
            MerchantProductDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT,
        ];
    }

    /**
     * @return array<string, string>
     */
    public function getDataImportTemplates(): array
    {
        return [
            'CSV template Product' => 'js/static/MerchantProductDataImport/data/files/combined_product.csv',
        ];
    }
}
```

**src/Pyz/Zed/DataImportMerchantPortalGui/DataImportMerchantPortalGuiConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImportMerchantPortalGui;

use Spryker\Zed\DataImportMerchantPortalGui\DataImportMerchantPortalGuiConfig as SprykerDataImportMerchantPortalGuiConfig;
use Spryker\Zed\MerchantProductDataImport\MerchantProductDataImportConfig;

class DataImportMerchantPortalGuiConfig extends SprykerDataImportMerchantPortalGuiConfig
{
    /**
     * @return list<string>
     */
    public function getSupportedImporterTypes(): array
    {
        return [
            MerchantProductDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT,
        ];
    }
}
```

Define soft validation rules for CSV files:

**src/Pyz/Zed/MerchantProductDataImport/MerchantProductDataImportConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\MerchantProductDataImport;

use Spryker\Zed\MerchantProductDataImport\MerchantProductDataImportConfig as SprykerMerchantProductDataImportConfig;

class MerchantProductDataImportConfig extends SprykerMerchantProductDataImportConfig
{
    /**
     * @var list<string>
     */
    protected const POSSIBLE_CSV_HEADERS = [
        'abstract_sku',
        'is_active',
        'concrete_sku',
        'store_relations',
        'product_abstract.categories',
        'product_abstract.tax_set_name',
        'product_abstract.new_from',
        'product_abstract.new_to',
        'product.is_quantity_splittable',
        'product.assigned_product_type',
    ];

    /**
     * @var list<string>
     */
    protected const POSSIBLE_CSV_LOCALE_HEADERS = [
        'product_abstract.name.{locale}',
        'product_abstract.description.{locale}',
        'product_abstract.meta_title.{locale}',
        'product_abstract.meta_description.{locale}',
        'product_abstract.meta_keywords.{locale}',
        'product_abstract.url.{locale}',
        'product.name.{locale}',
        'product.description.{locale}',
        'product.is_searchable.{locale}',
    ];

    /**
     * @var list<string>
     */
    protected const POSSIBLE_CSV_ATTRIBUTE_HEADERS = [
        'product.{attribute}',
        'product.{attribute}.{locale}',
    ];

    /**
     * @var list<string>
     */
    protected const POSSIBLE_CSV_STOCK_HEADERS = [
        'product.{stock}.quantity',
        'product.{stock}.is_never_out_of_stock',
    ];

    /**
     * @var list<string>
     */
    protected const POSSIBLE_CSV_PRICE_HEADERS = [
        'product_price.{store}.default.{currency}.value_net',
        'product_price.{store}.default.{currency}.value_gross',
        'abstract_product_price.{store}.default.{currency}.value_net',
        'abstract_product_price.{store}.default.{currency}.value_gross',
    ];

    /**
     * @var list<string>
     */
    protected const POSSIBLE_CSV_IMAGE_HEADERS = [
        'product_image.DEFAULT.default.sort_order',
        'product_image.DEFAULT.default.external_url_large',
        'product_image.DEFAULT.default.external_url_small',
        'abstract_product_image.DEFAULT.default.sort_order',
        'abstract_product_image.DEFAULT.default.external_url_small',
        'abstract_product_image.DEFAULT.default.external_url_large',
        'abstract_product_image.{locale}.default.sort_order',
        'abstract_product_image.{locale}.default.external_url_small',
        'abstract_product_image.{locale}.default.external_url_large',
    ];
}
```

{% info_block warningBox "Verification" %}

In the Merchant Portal go to **Data Import**. Make sure the following applies:
- **Product** import type is displayed in import types
- You can download a product data import template labeled as **CSV template Product**

{% endinfo_block %}
