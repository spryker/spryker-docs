This document describes how to install the Marketplace Merchant Portal Data Import feature.

## Install feature core

Follow the steps below to install the Marketplace Merchant Portal Data Import feature.

### Prerequisites

Install the required features:

| NAME                              | VERSION  | INSTALLATION GUIDE                                                                                                                                                                                           |
|-----------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core  | 202507.0 | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)              |
| Marketplace Merchant              | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html)                          |
| Marketplace Merchant Data Import  | latest   | [Install the Marketplace Merchant Data Import feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-data-import-feature) |

### Install the required modules

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

### Generate required transfer objects and DB changes

```bash
vendor/bin/console transfer:generate
vendor/bin/console propel:install
```

### Add translations

Generate a new translation cache:

```bash
vendor/bin/console translator:generate-cache
```

### Update project configuration

#### Add plugins

Add the following plugins to the dependency providers:

| PLUGIN                                                                                                            | PLACE                                                                        | DESCRIPTION                                    |
|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------|
| `\Spryker\Zed\MerchantProductDataImport\Communication\Plugin\DataImport\MerchantCombinedProductDataImportPlugin`  | `\Pyz\Zed\DataImport\DataImportDependencyProvider::getDataImporterPlugins()` | Adds new type of merchant product data import. |

#### Configure Behavior

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

Open Merchant Portal, login with merchant user, open the **Data Import** section.
Check that the "Product" import type is listed among the available import types, and that a product data import template labeled "CSV template Product" (or a custom label) is available for download under the form.

{% endinfo_block %}

