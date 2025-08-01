This document describes how to install the Marketplace Merchant Portal Data Import feature.

## Prerequisites

Install the required features:

| NAME                              | VERSION  | INSTALLATION GUIDE                                                                                                                                                                                           |
|-----------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core  | 202507.0 | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)              |
| Marketplace Merchant              | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html)                          |
| Marketplace Merchant Data Import  | 202507.0   | [Install the Marketplace Merchant Data Import feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-data-import-feature) |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-product-data-import:"^0.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                     | EXPECTED DIRECTORY                           |
|----------------------------|----------------------------------------------|
| MerchantProductDataImport  | vendor/spryker/merchant-product-data-import  |


{% endinfo_block %}

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

## Update project configuration

Add the configuration in the following sections.

1. Enable product data import by registering the plugin.

| PLUGIN | SPECIFICATION | NAMESPACE  |
| ---------------- | ------------- | ---------------- |
| MerchantCombinedProductDataImportPlugin | Adds a type of merchant product data import. | Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
namespace Pyz\Zed\DataImport;

use Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImport\MerchantCombinedProductDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            ...
            new MerchantCombinedProductDataImportPlugin(),
        ];
    }
}
```

### Configure behavior

Also update `FileImportMerchantPortalGuiConfig`:

- Add the `MerchantProductDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT` type to the list of available import types to allow merchants to import their products.
- Add the product data import file template to the list of templates. Spryker provides a specific CSV template for product data import, which merchants can use to prepare their product data files.

In the example below, the product data import template is labeled "CSV template Product", but it can be customized as needed.

```php
namespace Pyz\Zed\FileImportMerchantPortalGui;

use Spryker\Zed\FileImportMerchantPortalGui\FileImportMerchantPortalGuiConfig as SprykerFileImportMerchantPortalGuiConfig;
use Spryker\Zed\MerchantProductDataImport\MerchantProductDataImportConfig;

class FileImportMerchantPortalGuiConfig extends SprykerFileImportMerchantPortalGuiConfig
{
    /**
     * @return list<string>
     */
    public function getImportTypes(): array
    {
        return [
            MerchantProductDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT,
        ];
    }

    /**
     * @return array<string, list<string>>
     */
    public function getDataImportTemplates(): array
    {
        return [
            'CSV template Product' => 'js/static/MerchantProductDataImport/data/files/combined_product.csv',
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Merchant Portal go to **Data Import**. Make sure the following applies:
- **Product** import type is displayed in import types
- You can download a product data import template labeled as **CSV template Product**

{% endinfo_block %}

























