---
title: HowTo - Add a New Shipment Method 2.0
originalLink: https://documentation.spryker.com/v6/docs/ht-add-new-shipment-method-2
redirect_from:
  - /v6/docs/ht-add-new-shipment-method-2
  - /v6/docs/en/ht-add-new-shipment-method-2
---

{% info_block infoBox %}
This article describes the steps to add a new shipment method, without integrating with the shipment provider.
{% endinfo_block %}

In this tutorial we’ll consider the case when you need to add a new shipment method, without the need to integrate it with the shipment providers system.

What’s important for this situation is to have multi-currency prices attached to the shipment method and also to have the correct tax set linked to it. Also, the `ship` event should be manually triggerable from the Back Office.

## Setting Up the State Machine

The state machine that handles orders that use this shipment method needs to use a manual event for shipping, so that it can be triggered from the Back Office.
![Setting up State Machine](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ship_event.png){height="" width=""}
The corresponding XML for this transition would be:

```xml
<states>
   <state name="exported" reserved="true"/>
   <state name="shipped" reserved="true"/>
//..
</states>
<transitions>
    <transition happy="true">
        <source>exported</source>
        <target>shipped</target>
        <event>ship</event>
    </transition>
//..
</transitions>
<events>
    <event name="ship" manual="true"/>
//..
</events>
```

## Adding a New Shipment Method
**To add a new shipment method:**

1. In the Back Office, navigate to the **Shipment** section and click **Add new Carrier Company**. 
2. Specify a name for the carrier company and the corresponding glossary key for having a localized name. 
3. To  use this carrier company in the shop, select **Enabled** in the check box.
![Enabled checkbox](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ui_add_carrier_cmpany.png){height="" width=""}

Now that we have a new shipment carrier, we can add a new shipment method to it.

**To add a new shipment method to a carrier:**

1. Click **Add new Shipment Method**.
You will be redirected to the _Add a new shipment method_ dialog. 
2. Select the carrier you created in the previous step. 
3. Add the name and store/currency specific net and gross prices.
4. Mark it as "Active".
5. Select the corresponding tax set.
6. Click **Add Shipment Method**.
![Add shipment method ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ui_shipment_method_6.png){height="" width=""}

The shipment methods with price are retrieved depending on your preconfigured price mode + current store and the currently selected currency.

Shipment methods might be excluded if their active flag is off, connected `AvailabilityPlugin` plugin excludes them, or it would have a price as NULL.

In this current example, the new shipment method is available in the shop for DE store, EUR currency and gross price mode as 7 EUR.
![UI shipment selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ui_shipment_selection.png){height="" width=""}

<!-- Last review day: Feb 26, 2019 -by Karoly Gerner, Anastasija Datsun-->
