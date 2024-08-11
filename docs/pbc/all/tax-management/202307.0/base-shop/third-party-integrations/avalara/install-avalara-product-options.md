---
title: Install Avalara + Product Options
description: Integrate the Avalara Tax + Product Options feature into your project
last_updated: Aug 3, 2023
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/avalara-tax-product-options-feature-integration
originalArticleId: baa66b26-825e-404a-a8e4-1b48cb00cd67
redirect_from:
  - /docs/scos/user/technology-partners/202212.0/taxes/avalara-tax-product-options-feature-integration.html
  - /docs/scos/dev/technology-partner-guides/202212.0/taxes/avalara/integrating-avalara-tax-product-options.html
  - /docs/pbc/all/tax-management/202307.0/base-shop/avalara/install-avalara-product-options.html
---

To enable the Avalara + Product Options component of the Avalara partner integration, use the [spryker-eco/avalara-tax-product-option](https://github.com/spryker-eco/avalara-tax-product-option) module.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the necessary features:

|NAME | VERSION | INSTALLATION GUIDE |
|--- | --- | --- |
| Product Options | master |  |
| Avalara Tax | master | [Install Avalara](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/avalara/install-avalara.html) |

### Install the required modules using Composer

Install the required modules using Composer:

```bash
composer require spryker-eco/avalara-tax-product-option:"^0.1.0" --update-with-dependencies
```


{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

|MODULE | EXPECTED DIRECTORY |
| --- | --- |
|AvalaraTaxProductOption | vendor/spryker-eco/avalara-tax-product-option|

{% endinfo_block %}

### Set up database schema

Apply database changes, generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

|DATABASE ENTITY| TYPE| EVENT |
|--- |---| ---|
|spy_product_option_value.avalara_tax_code |column | created |

{% endinfo_block %}

### Set up behavior

1. Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AvalaraProductOptionCreateTransactionRequestExpanderPlugin | Expands `AvalaraCreateTransactionRequestTransfer` with product option data. |  | SprykerEco\Zed\AvalaraTaxProductOption\Communication\Plugin\AvalaraTax |
| AvalaraProductOptionCreateTransactionRequestAfterPlugin | Calculates taxes for `ProductOptions` based on `AvalaraCreateTransactionResponseTransfer`. |  | SprykerEco\Zed\AvalaraTaxProductOption\Communication\Plugin\AvalaraTax |

<details>
<summary markdown='span'>src/Pyz/Zed/AvalaraTax/AvalaraTaxDependencyProvider.php</summary>

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

1. Add an item with a product option to a cart.
2. Proceed to checkout.
3. On the summary page, you should see the calculated tax amount for your order, including taxes for product options.

{% endinfo_block %}    

2. Update the following data import files:

|FILE NAME | COLUMN TO ADD | LOCATION |
|--- | --- | --- |
|product_option.csv | avalara_tax_code | data/import/common/common/product_option.csv |

3. To handle the new field, adjust `ProductOption` data importer using the following example:

**data/import/common/common/product\_option.csv**
```csv
shipment_method_key,name,carrier,taxSetName,avalaraTaxCode
spryker_dummy_shipment-standard,Standard,Spryker Dummy Shipment,Shipment Taxes,PC040111
```

### 4) Import data:

```bash
console data:import product-option
```

{% info_block warningBox "Verification" %}

Make sure that the data has been imported to `spy_product_option_value`.

{% endinfo_block %}

## Next steps

[Install Avalara + Shipment](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/avalara/install-avalara-shipment.html)
