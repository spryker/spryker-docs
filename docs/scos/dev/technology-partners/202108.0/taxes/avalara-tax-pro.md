---
title: Avalara Tax + Product Options feature integration
originalLink: https://documentation.spryker.com/2021080/docs/avalara-tax-product-options-feature-integration
redirect_from:
  - /2021080/docs/avalara-tax-product-options-feature-integration
  - /2021080/docs/en/avalara-tax-product-options-feature-integration
---

*Avalara* is a software that calculates sales order taxes during checkout in the US market. It provides real-time tax calculation and automatic filing of returns. 

## General information

To enable AvalaraTax + Product Options partner integration, use the [spryker-eco/avalara-tax-product-option](https://github.com/spryker-eco/avalara-tax-product-option) module.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

To start the feature integration, overview and install the necessary features:

|NAME | VERSION | INTEGRATION GUIDE | 
|--- | --- | --- | 
| Product Options | master |  |
| Avalara Tax | master | [Avalara Tax integration](https://documentation.spryker.com/docs/avalara-tax-integration)|

### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker-eco/avalara-tax-product-option:"^0.1.0" --update-with-dependencies
```


{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

|MODULE | EXPECTED DIRECTORY | 
| --- | --- | 
|AvalaraTaxProductOption | vendor/spryker-eco/avalara-tax-product-option|

{% endinfo_block %}
### 2) Set up database schema

Apply database changes, generate entity and transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

|DATABASE ENTITY| TYPE| EVENT |
|--- |---| ---|
|spy_product_option_value.avalara_tax_code |column | created |

{% endinfo_block %}
### 3) Set up behavior

1.  Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE | 
| --- | --- | --- | --- | 
| AvalaraProductOptionCreateTransactionRequestExpanderPlugin | Expands `AvalaraCreateTransactionRequestTransfer` with product option data. | None | SprykerEco\Zed\AvalaraTaxProductOption\Communication\Plugin\AvalaraTax |
| AvalaraProductOptionCreateTransactionRequestAfterPlugin | Calculates taxes for `ProductOptions` based on `AvalaraCreateTransactionResponseTransfer`. | None | SprykerEco\Zed\AvalaraTaxProductOption\Communication\Plugin\AvalaraTax |

<details open>
    <summary>src/Pyz/Zed/AvalaraTax/AvalaraTaxDependencyProvider.php</summary>
    
```php
<?php

namespace Pyz\Zed\AvalaraTax;

use SprykerEco\Zed\AvalaraTax\AvalaraTaxDependencyProvider as SprykerAvalaraTaxDependencyProvider;
use SprykerEco\Zed\AvalaraTaxShipment\Communication\Plugin\AvalaraTax\AvalaraShipmentCreateTransactionRequestAfterPlugin;
use SprykerEco\Zed\AvalaraTaxShipment\Communication\Plugin\AvalaraTax\AvalaraShipmentCreateTransactionRequestExpanderPlugin;

class AvalaraTaxDependencyProvider extends SprykerAvalaraTaxDependencyProvider
{
    /**
     * @return \SprykerEco\Zed\AvalaraTaxExtension\Dependency\Plugin\CreateTransactionRequestExpanderPluginInterface[]
     */
    protected function getCreateTransactionRequestExpanderPlugins(): array
    {
        return [
            new AvalaraShipmentCreateTransactionRequestExpanderPlugin(),
        ];
    }

    /**
     * @return \SprykerEco\Zed\AvalaraTaxExtension\Dependency\Plugin\CreateTransactionRequestAfterPluginInterface[]
     */
    protected function getCreateTransactionRequestAfterPlugins(): array
    {
        return [
            new AvalaraShipmentCreateTransactionRequestAfterPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure you’ve enabled the plugins:

1.  Add an item with a product option to a cart.
    
2.  Proceeding to checkout.
    
3.  On the summary page, you should see the calculated tax amount for your order, including taxes for product options.

{% endinfo_block %}    

2. Update the following data import .csv files:

|FILE NAME | COLUMN TO ADD | LOCATION | 
|--- | --- | --- | 
|product_option.csv | avalara_tax_code | data/import/common/common/product_option.csv|

3. To handle the new field, adjust `ProductOption` data importer using the following example:

**data/import/common/common/product\_option.csv**
```csv
shipment_method_key,name,carrier,taxSetName,avalaraTaxCode
spryker_dummy_shipment-standard,Standard,Spryker Dummy Shipment,Shipment Taxes,PC040111
```

4. Import data:
```bash
console data:import product-option
```

{% info_block warningBox "Verification" %}

Make sure that the data has been imported to `spy_product_option_value`.


{% endinfo_block %}
