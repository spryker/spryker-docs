---
title: HowTo - Create Discounts Based on Shipment
originalLink: https://documentation.spryker.com/2021080/docs/ht-activate-a-discount-rule-based-on-a-shipment-carrier
redirect_from:
  - /2021080/docs/ht-activate-a-discount-rule-based-on-a-shipment-carrier
  - /2021080/docs/en/ht-activate-a-discount-rule-based-on-a-shipment-carrier
---

The HowTo guide provides steps on how to:

* activate a discount rule based on a shipment carrier, a shipment method or a shipment price.
* add a shipment pre-check plugin to checkout 

## Activate a Discount Rule Based on a Shipment Carrier

It is possible to create a discount rule based on a shipment carrier, a shipment method or a shipment price.

To have a discount calculated based on a shipment method, select the `shipment-method` rule in the discount UI, **Discount calculation**. Then, the discount will be applied only to the shipment expense with the chosen method. You could also select shipment-method rule for **Conditions** to define that your discount will be applied only when the order will be delivered by the chosen method.

The same approach works for a carrier (`shipment-carrier`) and a price(`shipment.price`). You could combine these rules together based on your requirements.

Follow the steps below to activate this feature:

1. Install the `ShipmentDiscountConnector` module in your project.
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

Then, add the  `\Spryker\Zed\ShipmentCheckoutConnector\Communication\Plugin\Checkout\ShipmentCheckoutPreCheckPlugin` plugin to the checkout dependency provider pre-check plugin stack.

```php
<?php

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
