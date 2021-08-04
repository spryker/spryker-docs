---
title: Tax Module
originalLink: https://documentation.spryker.com/v4/docs/tax-module
redirect_from:
  - /v4/docs/tax-module
  - /v4/docs/en/tax-module
---

The Tax module is responsible for handling tax rates that can apply for products, product options or shipment.

## Overview
The tax sets can have different tax rates for each country defined in your shop. You can see in the diagram below how these entities are modeled in the database.
![Database for tax sets](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Tax+Version+1.0/tax.png){height="" width=""}

A tax set is defined by a name and is uniquely identified by an `id`. As its name says, it’s associated to a set of rates. A tax rate is defined by a name, a numeric rate value and it’s linked to a country.

All in one, a tax set contains of collection of tax rates that apply by country.

The `SpyTaxSetTax` table is used to model the many-to-many relation between tax set and tax rate tables.

{% info_block infoBox "Tax Related Entities" %}
There are a couple of entities that have a tax set associated as a foreign key, such as abstract products, product options and shipment methods.
{% endinfo_block %}

## Implementation Details

### TaxDefault Class
TaxDefault class contains two important operations:

* getDefaultTaxCountry() - retrieves the default tax country from the configuration file (e.g.: Germany).
* getDefaultTaxRate() - retrieved the default tax rate from the configuration file (e.g.: 19%).

These methods are called if the tax calculator cannot find the corresponding tax rate for one of the related entities.

These methods can be extended on the project side, depending on your needs.

### Calculator Plugins
Tax module ships with a set of calculator plugins, dedicated for calculating the taxes for each of the corresponding items in the QuoteTransfer.

The calculators are called to recalculate the taxes every time addToCart() method is called or the payment step is entered. If the customer has changed the country during the address step, this is not an issue because the tax rates are recalculated.

#### Calculator Plugins for Tax Rates:

* `ProductItemTaxCalculatorsPlugin` - calculates tax rates based on `IdAbstractProduct` in the items contained in the QuoteTransfer (Tax module)
* `ProductIOptionTaxCalculatorsPlugin` - calculated tax rates based on `IdOptionValueUsage` for every product option of the items contained in the QuoteTransfer (ProductOption module)
* `ShipmentTaxCalculatorsPlugin` - calculates tax rates based on the shipment method set in the `QuoteTransfer` (Shipment module)

The calculator plugins are registered in the `CalculationDependencyProvider:getCalculatorStack()` method.

## Extending Tax Module
One of the most common use cases of extending the Tax module is to provide a custom calculator.

In the coding example below, we’ll implement a calculator that uses a flat tax rate for all the products.

The new calculator plugin must extend the `AbstractPlugin` class and implement the `CalculatorPluginInterface`.

In Zed, inside the `Tax/Communication/Plugin/` folder, create the `FlatTaxRateCalculatorPlugin` class.

```php
<?php
...
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Calculation\Dependency\Plugin\CalculatorPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
...
class NewTaxRateCalculatorPlugin extends AbstractPlugin implements CalculatorPluginInterface
{
...
   public function recalculate(QuoteTransfer $quoteTransfer)
    {
        $this->getFacade()->calculateProductItemTaxRate($quoteTransfer);
    }
}
```

Next, implement the business logic; create the FlatTaxRateCalculator inside the Model folder.

```php
<?php
...

use Spryker\Zed\Tax\Persistence\TaxQueryContainer;
use Spryker\Zed\Tax\Persistence\TaxQueryContainerInterface;

class FlatTaxRateCalculator implements CalculatorInterface
{
    public function recalculate(QuoteTransfer $quoteTransfer)
    {
       //TODO implement new calculation ….
    }
}
```

Create a method that returns an instance of the calculator in the factory.

```php
<?php
class TaxBusinessFactory extends AbstractBusinessFactory
{
    //..

    public function createProductItemTaxRateCalculator()
    {
        return new FlatTaxRateCalculator();
    }
}
```

Expose this functionality through the facade:

```php
<?php
class TaxFacade extends AbstractFacade implements TaxFacadeInterface
{
    //..
   public function calculateFlatTaxRate(QuoteTransfer $quoteTransfer)
   {
        $this->getFactory()->createFlatTaxRateCalculator()->recalculate($quoteTransfer);
   }
}
```

Register the new plugin in the CalculationDependencyProvide:getCalculatorStack() method:

```php
<?php
class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
    protected function getCalculatorStack(Container $container)
    {
        return [
            new FlatTaxRateCalculatorPlugin(),
             ...
        ];
    }

}
```

## Migration Guide
If you’re migrating the Tax module from version 2 to version 3, you need to follow the steps described in the [Migration Guide - Tax](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-tax).
