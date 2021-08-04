---
title: Shipment Overview
originalLink: https://documentation.spryker.com/v3/docs/shipment-overview
redirect_from:
  - /v3/docs/shipment-overview
  - /v3/docs/en/shipment-overview
---

The main concepts regarding shipping that are modeled in the database are :

* shipment carrier
* shipment method

The shipment method is linked to the sales order. The schema below shows how these entities are modeled in the database:
![Shipment method database](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shipment/Shipment+Overview/shipment_method_database.png){height="" width=""}

A sales order has associated a shipment method. Each shipment method is linked to a shipment carrier and a shipment carrier can have zero to many shipment methods. Shipping carriers and methods can be configured from Zed’s back office interface.

For a shipment carrier, the following information must be entered from the Zed Admin UI:

* **Glossary key name** - ID of the glossary key that holds the name of the shipment carrier (internationalization purpose)
* **Name** - name of the shipment carrier
* **Is Active** - if this flag is set to false, then the shipment methods linked to the current shipment carrier are also disabled

Multiple shipment methods can be added to a shipment carrier. For each shipment method the following details must be entered from the Zed Admin UI:

* **Tax Set** - shipment method must have an associated tax rate
* **Glossary Key Name** - ID of the glossary key that holds the name of the shipment method (internationalization purpose)
* **Glossary Key Description** - ID of the glossary key that holds the description of the shipment method (internationalization purpose)
* **Name** - name of the shipment method
* **Price**
* **Is Active** - flag that allows to disable/enable the shipment method

Additional behaviours can be attached to a shipment method from the Zed Admin UI:

* **Availability Plugin** - name of the plugin that checks the availability for this shipment method
* **Delivery Time Plugin** - name of the plugin that can calculate the delivery time for this shipment method
* **Price Calculation Plugin** - name of the plugin that can calculate the price for this shipment method.

{% info_block errorBox %}
For each glossary key linked to a shipment carrier or methods, the corresponding entry for each locale configured in the application must be added to the glossary keys.
{% endinfo_block %}

## Discounts Based on Shipment

It is possible to create a discount rule based on a shipment carrier, a shipment method or a shipment price.

To have a discount calculated based on a shipment method, select the shipment-method rule in the discount UI, **Discount calculation**. Then the discount will be applied only to the shipment expense with the chosen method. You could also select shipment-method rule for **Conditions** to define that your discount will be applied only when the order will be delivered by the chosen method.

The same approach works for a carrier (shipment-carrier) and a price(shipment.price). You could combine these rules together based on your requirements.

Follow the steps below to activate this feature:

1. Install ShipmentDiscountConnectormodule in your project.

2. Activate the Decision rule and the Collector plugins in

    

   ```
   \Pyz\Zed\Discount\DiscountDependencyProvider
   ```

   :

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

3. You are ready to use the shipment discounts.
