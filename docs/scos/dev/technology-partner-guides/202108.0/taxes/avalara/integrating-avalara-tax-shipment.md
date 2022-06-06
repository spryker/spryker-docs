---
title: Integrating Avalara Tax + Shipment
description: Integrate Avalara Tax + Shipment feature into your project.
last_updated: Jun 18, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/avalara-tax-shipment-feature-integration
originalArticleId: a93d12c8-c40a-4cbb-b866-755ad29f2852
redirect_from:
  - /2021080/docs/avalara-tax-shipment-feature-integration
  - /2021080/docs/en/avalara-tax-shipment-feature-integration
  - /docs/avalara-tax-shipment-feature-integration
  - /docs/en/avalara-tax-shipment-feature-integration
  - /docs/scos/user/technology-partners/202108.0/taxes/avalara-tax-shipment-feature-integration.html
related:
  - title: Tax feature overview
    link: docs/scos/user/features/page.version/tax-feature-overview.html
---

To enable the AvalaraTax + Shipment component of the Avalara partner integration, use the [spryker-eco/avalara-tax-shipment](https://github.com/spryker-eco/avalara-tax-shipment) module.  

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Shipment | master | [Shipment feature integration guide](/docs/scos/dev/feature-integration-guides/{{page.version}}/shipment-feature-integration.html) |
| Avalara Tax | master | [Avalara Tax integration](/docs/scos/dev/technology-partner-guides/{{page.version}}/taxes/avalara/integrating-avalara.html) |

### 1) Install the required modules using Composer


Install the required modules:

```bash
composer require spryker-eco/avalara-tax-shipment:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|---|---|
| AvalaraTaxShipment |vendor/spryker-eco/avalara-tax-shipment|

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

| DATABASE ENTITY | TYPE | EVENT |
|---|---|---|
| spy_shipment_method.avalara_tax_code | column | created |

{% endinfo_block %}

### 3) Set up behavior

1. Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AvalaraShipmentCreateTransactionRequestExpanderPlugin | Expands `AvalaraCreateTransactionRequestTransfer` with shipments. | None | SprykerEco\Zed\AvalaraTaxShipment\Communication\Plugin\AvalaraTax |
|AvalaraShipmentCreateTransactionRequestAfterPlugin | Calculates taxes for shipment methods based on `AvalaraCreateTransactionResponseTransfer`. | None | SprykerEco\Zed\AvalaraTaxShipment\Communication\Plugin\AvalaraTax |

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

Make sure you’ve enabled the plugins:
1. Add an item to a cart.
2. Proceeding to checkout.
3. On the summary page, you should see the calculated tax amount for your order, including taxes for product options and shipment methods.

{% endinfo_block %}

2. Update the following data import .csv files:

| FILE NAME | COLUMN TO ADD | LOCATION |
| --- | --- | --- |
| shipment.csv | avalara_tax_code | data/import/common/common/shipment.csv |

3. To handle the new field, adjust `Shipment` data importer using the following example:

**data/import/common/common/shipment.csv**

```csv
shipment_method_key,name,carrier,taxSetName,avalaraTaxCode
spryker_dummy_shipment-standard,Standard,Spryker Dummy Shipment,Shipment Taxes,PC040111
```

### 4) Import data:

Import data using the following command:

```bash
console data:import shipment
```

{% info_block warningBox "Verification" %}

Make sure that the data has been imported to `spy_shipment_method`.

{% endinfo_block %}
