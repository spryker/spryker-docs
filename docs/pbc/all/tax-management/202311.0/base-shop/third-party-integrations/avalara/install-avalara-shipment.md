---
title: Install Avalara + Shipment
description: Install Avalara + Shipment.
last_updated: Jun 18, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/avalara-tax-shipment-feature-integration
originalArticleId: a93d12c8-c40a-4cbb-b866-755ad29f2852
redirect_from:
  - /docs/scos/user/technology-partners/202212.0/taxes/avalara-tax-shipment-feature-integration.html
  - /docs/scos/dev/technology-partner-guides/202212.0/taxes/avalara/integrating-avalara-tax-shipment.html
  - /docs/pbc/all/tax-management/third-party-integrations/integrate-avalara-tax-shipment.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/avalara/install-avalara-shipment.html
  - /docs/pbc/all/tax-management/202204.0/base-shop/third-party-integrations/integrate-avalara-tax-shipment.html
related:
  - title: Tax feature overview
    link: docs/pbc/all/tax-management/page.version/base-shop/tax-feature-overview.html
---

To enable the Avalara + Shipment component of the Avalara partner integration, use the [spryker-eco/avalara-tax-shipment](https://github.com/spryker-eco/avalara-tax-shipment) module.  

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Shipment | master | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html) |
| Avalara Tax | master | [Avalara Tax integration](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/avalara/install-avalara.html) |

### Install the required modules


Install the required modules using Composer:

```bash
composer require spryker-eco/avalara-tax-shipment:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|---|---|
| AvalaraTaxShipment |vendor/spryker-eco/avalara-tax-shipment|

{% endinfo_block %}

### Set up database schema

Apply database changes, generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
|---|---|---|
| spy_shipment_method.avalara_tax_code | column | created |

{% endinfo_block %}

### Set up behavior

1. Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AvalaraShipmentCreateTransactionRequestExpanderPlugin | Expands `AvalaraCreateTransactionRequestTransfer` with shipments. |  | SprykerEco\Zed\AvalaraTaxShipment\Communication\Plugin\AvalaraTax |
|AvalaraShipmentCreateTransactionRequestAfterPlugin | Calculates taxes for shipment methods based on `AvalaraCreateTransactionResponseTransfer`. |  | SprykerEco\Zed\AvalaraTaxShipment\Communication\Plugin\AvalaraTax |

**src/Pyz/Zed/AvalaraTax/AvalaraTaxDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

1. Add an item to a cart.
2. Proceed to checkout.
3. On the summary page, you should see the calculated tax amount for your order, including the taxes for shipment methods.

{% endinfo_block %}

2. Update the following data import files:

| FILE NAME | COLUMN TO ADD | LOCATION |
| --- | --- | --- |
| shipment.csv | avalara_tax_code | data/import/common/common/shipment.csv |

3. To handle the new field, adjust the `Shipment` data importer using the following example:

**data/import/common/common/shipment.csv**

```csv
shipment_method_key,name,carrier,taxSetName,avalaraTaxCode
spryker_dummy_shipment-standard,Standard,Spryker Dummy Shipment,Shipment Taxes,PC040111
```

### Import data

Import data using the following command:

```bash
console data:import shipment
```

{% info_block warningBox "Verification" %}

Make sure that the data has been imported to `spy_shipment_method`.

{% endinfo_block %}

## Next steps

[Apply Avalara tax codes](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/avalara/apply-avalara-tax-codes.html)
