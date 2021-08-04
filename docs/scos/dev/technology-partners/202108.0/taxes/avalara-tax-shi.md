---
title: Avalara Tax + Shipment feature integration
originalLink: https://documentation.spryker.com/2021080/docs/avalara-tax-shipment-feature-integration
redirect_from:
  - /2021080/docs/avalara-tax-shipment-feature-integration
  - /2021080/docs/en/avalara-tax-shipment-feature-integration
---

*Avalara* is a software that calculates sales order taxes during checkout in the US market. It provides real-time tax calculation and automatic filing of returns. 

## General information

To enable AvalaraTax + Shipment partner integration, use the [spryker-eco/avalara-tax-shipment](https://github.com/spryker-eco/avalara-tax-shipment) module.  

## Install feature core

Follow the steps below to install the feature core.


### Prerequisites

To start the feature integration, overview and install the necessary features:
    

| Name | Version | Integration guide | 
| Shipment | master | [Shipment feature integration guide](https://documentation.spryker.com/docs/shipment-feature-integration) | 
| Avalara Tax | master | [Avalara Tax integration](https://documentation.spryker.com/docs/avalara-tax-integration) |

### 1) Install the required modules using Composer


Install the required modules:
```bash
composer require spryker-eco/avalara-tax-shipment:"^0.1.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}



Make sure that the following modules have been installed:

| Module | Expected Directory |
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

| Database Entity | Type | Event | 
|---|---|---|
| spy_shipment_method.avalara_tax_code | column | created |

{% endinfo_block %}
### 3) Set up behavior

1.  Activate the following plugins:
    

| Plugin | Specification | Prerequisites | Namespace |
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
1.  Add an item to a cart.
2.  Proceeding to checkout.   
3.  On the summary page, you should see the calculated tax amount for your order, including taxes for product options and shipment methods.

{% endinfo_block %}

2. Update the following data import .csv files:

| File name | Column to add | Location |
| --- | --- | --- |
| shipment.csv | avalara_tax_code | data/import/common/common/shipment.csv |


3. To handle the new field, adjust `Shipment` data importer using the following example:

**data/import/common/common/shipment.csv**
```csv
shipment_method_key,name,carrier,taxSetName,avalaraTaxCode
spryker_dummy_shipment-standard,Standard,Spryker Dummy Shipment,Shipment Taxes,PC040111
```
4. Import data:
```bash
console data:import shipment
```
{% info_block warningBox "Verification" %}

Make sure that the data has been imported to `spy_shipment_method`.

{% endinfo_block %}

