This document describes how to install the Marketplace Merchant Portal Data Import feature.

## Prerequisites

Install the required features:

| NAME                             | VERSION  | INSTALLATION GUIDE                                                                                                                                                                                           |
|----------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | 202507.0 | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)              |
| Marketplace Product Offer        | 202507.0 | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html)                   |
| Marketplace Merchant Data Import | 202507.0 | [Install the Marketplace Merchant Data Import feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-data-import-feature) |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-product-offer-data-import:"^2.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                         | EXPECTED DIRECTORY                                |
|--------------------------------|---------------------------------------------------|
| MerchantProductOfferDataImport | vendor/spryker/merchant-product-offer-data-import |

{% endinfo_block %}


### Add file system configuration

Add file system configuration for storing merchant files:

**config/Shared/config_default.php**

```php
$config[MerchantProductOfferDataImportConstants::FILE_SYSTEM_NAME] = 'merchant-product-offer-data-import-files';
$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'merchant-product-offer-data-import-files' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('S3_MERCHANT_FILES_KEY') ?: '',
        'bucket' => getenv('S3_MERCHANT_FILES_BUCKET') ?: '',
        'secret' => getenv('S3_MERCHANT_FILES_SECRET') ?: '',
        'path' => '/merchant-product-offer-data-import-files',
        'version' => 'latest',
        'region' => getenv('AWS_REGION') ?: 'eu-central-1',
    ],
];
```

For local development, you can use the following configuration:

**config/Shared/config_default-docker.dev.php**

```php
$config[FileSystemConstants::FILESYSTEM_SERVICE]['merchant-product-offer-data-import-files'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => '/data/data/merchant-product-offer-data-import-files',
    'path' => '',
];
```

## Apply database changes and generate transfer objects

```bash
vendor/bin/console propel:install
vendor/bin/console transfer:generate
```

## Add translations

Generate a new translation cache:

```bash
vendor/bin/console translator:generate-cache
```

## Add configuration

Enable product offer data import by registering the plugins.

| PLUGIN                                                        | SPECIFICATION                                                                    | NAMESPACE                                                                          |
|---------------------------------------------------------------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| MerchantCombinedProductOfferDataImportPlugin                  | Adds a type of merchant product offer data import.                               | Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\DataImport         |
| MerchantCombinedProductOfferMerchantFileValidationPlugin      | Validates required headers in merchant combined product offer data import files. | Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\DataImportMerchant |
| MerchantCombinedMerchantProductOfferFileRequestExpanderPlugin | Expands a data import merchant file collection request.                          | Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\DataImportMerchant |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\DataImport\MerchantCombinedProductOfferDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantCombinedProductOfferDataImportPlugin(),
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
use Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\DataImportMerchant\MerchantCombinedMerchantProductOfferFileRequestExpanderPlugin;
use Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\DataImportMerchant\MerchantCombinedProductOfferMerchantFileValidationPlugin;

class DataImportMerchantDependencyProvider extends SprykerDataImportMerchantDependencyProvider
{
    protected function getDataImportMerchantFileValidatorPlugins(): array
    {
        return [
            new MerchantCombinedProductOfferMerchantFileValidationPlugin(),
        ];
    }

    protected function getDataImportMerchantFileRequestExpanderPlugins(): array
    {
        return [
            new MerchantCombinedMerchantProductOfferFileRequestExpanderPlugin(),
        ];
    }
}
```

## Configure behavior

1. Update `DataImportMerchantPortalGuiConfig` as follows:

- To enable merchants to import product offer data, add `MerchantProductOfferDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT_OFFER` to `getSupportedImporterTypes()`.

- Add the product offer data CSV template to `getDataImportTemplates()` so merchants can use it to prepare their files.

- Optional: Customize the name of the `CSV template Product Offer` template.

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImportMerchantPortalGui;

use Spryker\Zed\DataImportMerchantPortalGui\DataImportMerchantPortalGuiConfig as SprykerDataImportMerchantPortalGuiConfig;
use Spryker\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportConfig;

class DataImportMerchantPortalGuiConfig extends SprykerDataImportMerchantPortalGuiConfig
{
    public function getSupportedImporterTypes(): array
    {
        return [
            MerchantProductOfferDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT_OFFER,
        ];
    }

    public function getDataImportTemplates(): array
    {
        return [
            'CSV template Product Offer' => 'js/static/MerchantProductOfferDataImport/data/files/combined_product_offer.csv',
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
    public function getSupportedImporterTypes(): array
    {
        return [
            MerchantProductDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Merchant Portal go to **Data Import**. Make sure the following applies:
- **Product Offer** import type is displayed in import types
- You can download a product offer data import template labeled as **CSV template Product Offer**

{% endinfo_block %}
