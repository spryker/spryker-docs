---
title: Shipment Module Overview
originalLink: https://documentation.spryker.com/v1/docs/shipment-module-overview
redirect_from:
  - /v1/docs/shipment-module-overview
  - /v1/docs/en/shipment-module-overview
---

The main concepts regarding shipping that are modeled in the database are :

* shipment carrier
* shipment method

The schema below shows how the sales order and shipment method entities are modeled in the database:
![Shipment Module schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shipment/Shipment+Module+Overview/shipment_method_database_schema_2.png){height="" width=""}

A sales order has an associated sales shipment entity which has an associated sales expense. The values of these entities are calculated and stored during the creation of the sales order, using the current state of shipment method, shipment method plugins, shipment method price, shipment carrier, and tax set data.

Note: The sales order can have additional, not shipment-related expenses.

For a shipment carrier, the following information must be entered from the Zed Admin UI:

* **Glossary key name** - ID of the glossary key that holds the name of the shipment carrier (internationalization purpose)
* **Name** - name of the shipment carrier
* **Is Active** - if this flag is set to false, then the shipment methods linked to the current shipment carrier are also disabled

Multiple shipment methods can be added to a shipment carrier. For each shipment method the following details must be entered from the Back Office:

* **Tax Set** - shipment method must have an associated tax rate
* **Glossary Key Name** - ID of the glossary key that holds the name of the shipment method (internationalization purpose)
* **Glossary Key Description** - ID of the glossary key that holds the description of the shipment method (internationalization purpose)
* **Name** - name of the shipment method
* **Price**
* **Is Active** - flag that allows to disable/enable the shipment method

Additional behaviors can be attached to a shipment method from the Back Office:

* **Availability Plugin** - name of the plugin that checks the availability for this shipment method
* **Delivery Time Plugin** - name of the plugin that can calculate the delivery time for this shipment method
* **Price Calculation Plugin** - name of the plugin that can calculate the price for this shipment method

{% info_block errorBox %}
For each glossary key linked to a shipment carrier or methods, the corresponding entry for each locale configured in the application must be added to the glossary keys.
{% endinfo_block %}

For more information about the shipment method plugins, see [Shipment Methods Plugins](/docs/scos/dev/features/201811.0/shipment/shipment-method).

## Discounts Based on Shipment

It is possible to create a discount rule based on a shipment carrier, a shipment method or a shipment price.

To have a discount calculated based on a shipment method, select the shipment-method rule in the discount UI, **Discount calculation**. Then the discount will be applied only to the shipment expense with the chosen method. You could also select shipment-method rule for **Conditions** to define that your discount will be applied only when the order will be delivered by the chosen method.

The same approach works for a carrier (shipment-carrier) and a price(shipment.price). You could combine these rules together based on your requirements.

Follow the steps below to activate this feature:

1. Install ShipmentDiscountConnector module in your project.
2. Activate the Decision rule and the Collector plugins in `\Pyz\Zed\Discount\DiscountDependencyProvider`:

```php
<?php
namespace Pyz\Zed\Discount;

use Spryker\Zed\ShipmentDiscountConnector\Communication\Plugin\DecisionRule\ShipmentCarrierDecisionRulePlugin;
use Spryker\Zed\ShipmentDiscountConnector\Communication\Plugin\DecisionRule\ShipmentMethodDecisionRulePlugin;
use Spryker\Zed\ShipmentDiscountConnector\Communication\Plugin\DecisionRule\ShipmentPriceDecisionRulePlugin;
use Spryker\Zed\ShipmentDiscountConnector\Communication\Plugin\DiscountCollector\ItemByShipmentCarrierPlugin;
use Spryker\Zed\ShipmentDiscountConnector\Communication\Plugin\DiscountCollector\ItemByShipmentMethodPlugin;
use Spryker\Zed\ShipmentDiscountConnector\Communication\Plugin\DiscountCollector\ItemByShipmentPricePlugin;
...

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{

    /**
     * @return \Spryker\Zed\Discount\Dependency\Plugin\DecisionRulePluginInterface[]
     */
    protected function getDecisionRulePlugins()
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            ...
            new ShipmentCarrierDecisionRulePlugin(),
            new ShipmentMethodDecisionRulePlugin(),
            new ShipmentPriceDecisionRulePlugin(),
        ]);
    }

    /**
     * @return \Spryker\Zed\Discount\Dependency\Plugin\CollectorPluginInterface[]
     */
    protected function getCollectorPlugins()
    {
        return array_merge(parent::getCollectorPlugins(), [
            ...
            new ItemByShipmentCarrierPlugin(),
            new ItemByShipmentMethodPlugin(),
            new ItemByShipmentPricePlugin(),
        ]);
    }

}
					
```

You are ready to use the shipment discounts.

## Checkout Shipment Pre-Check Plugin

You can add shipment pre-check plugin to checkout workflow, which will check if the shipment is active in order placing. If it's not - then error message will be displayed and customer will get redirected to the shipment step to select another shipment method.

First, you have to composer install a new module composer require spryker/shipment-checkout-connector. This module will provide plugin itself.

Then add `\Spryker\Zed\ShipmentCheckoutConnector\Communication\Plugin\Checkout\ShipmentCheckoutPreCheckPlugin` plugin to checkout dependency provider pre-check plugin stack.

```
	namespace Pyz\Zed\Checkout;
	
	use Spryker\Zed\ShipmentCheckoutConnector\Communication\Plugin\Checkout\ShipmentCheckoutPreCheckPlugin;
	
	class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
	{
	    /**
	       * @param \Spryker\Zed\Kernel\Container $container ’
	       *
	       * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreConditionInterface[]
	       */
	      protected function getCheckoutPreConditions(Container $container)
	      {
	          return [
	              ...//other plugins
	              new ShipmentCheckoutPreCheckPlugin()
	          ];
	      }
	}						
```

## Current Constraints

{% info_block infoBox %}
Currently, the feature has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* a shipment method created in the Back Office is available across all the stores of a project
* It is possible to define a store relation for a shipment method on a project level using an availability plugin that defines if a shipment method is to be shown during checkout

<!-- Last review date: Dec 4, 2017-- by Aurimas Ličkus -->
