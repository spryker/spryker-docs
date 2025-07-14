---
title: Add shipment methods
description: Use the guide to add a new shipment method with the currency and price specified without integrating the method with shipment providers.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-add-new-shipment-method-2
originalArticleId: 8237cdec-4f7a-4361-94b6-8ef7c04e80f5
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-add-a-new-shipment-method-2.0.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/tutorials-and-howtos/howto-add-a-new-shipment-method-2.0.html
related:
  - title: "Reference information: Shipment method plugins"
    link: docs/pbc/all/carrier-management/page.version/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html
---

This document shows how to add a new shipment method without integrating it with the shipment provider system.

{% info_block infoBox "Note" %}

In this situation, you *must* have multi-currency prices attached to the shipment method and the correct tax set linked to it. Also, the `ship` event *must* be manually triggerable from the Back Office.

{% endinfo_block %}

## Set up the state machine

The state machine which handles orders using this shipment method needs to use a manual event for shipping so that it can be triggered from the Back Office.

![Setting up State Machine](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ship_event.png)

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

## Add a new shipment method

To add a new shipment method, follow these steps:
1. In the Back Office, navigate to the **Delivery Methods** section and click **Create new carrier company**.
2. Specify a name for the carrier company and the corresponding glossary key for having a localized name.
3. To use this carrier company in the shop, select **Enabled**.
4. Click **Save**.
![Enabled checkbox](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ui_add_carrier_cmpany.png)

When you have a new shipment carrier, you can add a new shipment method to it.

{% info_block infoBox "Note" %}

For more detailed information about adding shipment methods, see [Add delivery methods](/docs/pbc/all/carrier-management/latest/base-shop/manage-in-the-back-office/add-delivery-methods.html) and [Edit delivery methods](/docs/pbc/all/carrier-management/latest/base-shop/manage-in-the-back-office/edit-delivery-methods.html).

{% endinfo_block %}

## Add a new carrier company

To add a shipment method to a carrier, follow these steps:
1. Click **Create new delivery method**. The **Create Delivery Method** page opens.
2. Select the **CARRIER** you have created in the [Add a new delivery method](#add-a-new-shipment-method) section.
3. Add the **NAME** and store- and currency-specific net and gross prices.
4. Select **IS ACTIVE**.
5. Select the corresponding **TAX SET**.
6. Click **Save**.

{% info_block infoBox "Note" %}

For more detailed information about adding carrier companies, see [Creating carrier companies](/docs/pbc/all/carrier-management/latest/base-shop/manage-in-the-back-office/add-carrier-companies.html).

{% endinfo_block %}

![Add shipment method ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ui_shipment_method_6.png)

The shipment methods with price are retrieved depending on your preconfigured price mode + current store and the selected currency.

Shipment methods can be excluded if their active flag is off. The connected `AvailabilityPlugin` plugin excludes them; otherwise, it has a price as NULL.

In this current example, the new shipment method is available in the shop for DE store, EUR currency, and gross price mode as 7 EUR.
![UI shipment selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ui_shipment_selection.png)
