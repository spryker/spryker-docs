---
title: Create discounts based on shipment
description: Use the guide to activate a discount rule based on a shipment carrier and add a shipment precheck plugin to checkout.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-activate-a-discount-rule-based-on-a-shipment-carrier
originalArticleId: 98408c10-05d0-4d84-a0a8-e01ba2cbdfea
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-create-discounts-based-on-shipment.html  
  - /docs/pbc/all/discount-management/202311.0/tutorials-and-howtos/howto-create-discounts-based-on-shipment.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/tutorials-and-howtos/howto-create-discounts-based-on-shipment.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/create-discounts-based-on-shipment.html
related:
  - title: Shipment feature overview
    link: docs/pbc/all/carrier-management/page.version/base-shop/shipment-feature-overview.html
  - title: "Reference information: Shipment method plugins"
    link: docs/pbc/all/carrier-management/page.version/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html
---

This How To guide shows how to do the following:

* Activate a discount rule based on a shipment carrier, a shipment method, or a shipment price.
* Add a shipment pre-check plugin to checkout.

## Activate a discount rule based on a shipment carrier

You can create a discount rule based on a shipment carrier, a shipment method, or a shipment price.

To have a discount calculated based on a shipment method, select the `shipment-method` rule in the discount UI, **Discount calculation**. The discount then applies only to the shipment expense with the chosen method. To define that your discount is applied only when the order is delivered by the chosen method, you can select a shipment method rule for **Conditions**.

The same approach works for a carrier (`shipment-carrier`) and price (`shipment.price`). You can combine these rules together based on your requirements.

To activate this feature, follow these steps:

1. In your project, install the `ShipmentDiscountConnector` module.
2. Activate the decision rule and the collector plugins in `\Pyz\Zed\Discount\DiscountDependencyProvider`:

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

You are now ready to use the shipment discounts.

## Add the checkout shipment precheck plugin to checkout

You can add the shipment precheck plugin to the checkout workflow, which checks if the shipment is active in the order placing. If it's not, then an error message is displayed, and a customer gets redirected to the shipment step to select another shipment method.

1. To install a new module, Composer requires `spryker/shipment-checkout-connector`. This module provides the plugin itself.
2. Add the `\Spryker\Zed\ShipmentCheckoutConnector\Communication\Plugin\Checkout\ShipmentCheckoutPreCheckPlugin` plugin to the checkout dependency provider precheck plugin stack:

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
