---
title: "HowTo: Add a new shipment method"
description: This document describes the steps to add a new shipment method, without integrating with the shipment provider.

last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-add-new-shipment-method
originalArticleId: acc1e4a3-0d2e-459e-b57b-8a2eb20e4fd8
redirect_from:
  - /2021080/docs/ht-add-new-shipment-method
  - /2021080/docs/en/ht-add-new-shipment-method
  - /docs/ht-add-new-shipment-method
  - /docs/en/ht-add-new-shipment-method
  - /v6/docs/ht-add-new-shipment-method
  - /v6/docs/en/ht-add-new-shipment-method
  - /v5/docs/ht-add-new-shipment-method
  - /v5/docs/en/ht-add-new-shipment-method
  - /v4/docs/ht-add-new-shipment-method
  - /v4/docs/en/ht-add-new-shipment-method
  - /v3/docs/ht-add-new-shipment-method
  - /v3/docs/en/ht-add-new-shipment-method
  - /v2/docs/ht-add-new-shipment-method
  - /v2/docs/en/ht-add-new-shipment-method
  - /v1/docs/ht-add-new-shipment-method
  - /v1/docs/en/ht-add-new-shipment-method
  - /docs/pbc/all/carrier-management/202204.0/base-shop/tutorials-and-howtos/howto-add-a-new-shipment-method.html
related:
  - title: "Reference information: Shipment method plugins"
    link: docs/pbc/all/carrier-management/page.version/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html
---

This document shows how to add a new shipment method without integrating with the shipment provider.

This document considers the case when you need to add a new shipment method without integrating it with the shipment providers system.

{% info_block infoBox "Note" %}

In this situation, you *must* have multi-currency prices attached to the shipment method and the correct tax set linked to it. Also, the `ship` event *must* be manually triggerable from the Back Office.

{% endinfo_block %}

## Set up the state machine

The state machine that handles orders that use this shipment method needs to use a manual event for shipping so that it can be triggered from the Zed Admin UI.

<!--../../Resources/Images/ship_event.png -->

The corresponding XML for this transition would be as follows:

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

<!-- ../../Resources/Images/ui_add_carrier_cmpany.png-->

To add a new shipment method, follow these steps:
1. In the Back Office, navigate to the **Delivery Methods** section and click **Create new carrier company**.
2. Specify a name for the carrier company and the corresponding glossary key for having a localized name.
3. To use this carrier company in the shop, select **Enabled**.
4. Click **Save**.
![Enabled checkbox](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+a+New+Shipment+Method+2.0/ui_add_carrier_cmpany.png)

When you have a new shipment carrier, you can add a new shipment method to it.

{% info_block infoBox "Note" %}

For more detailed information about adding shipment methods, see [Add delivery methods](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-in-the-back-office/add-delivery-methods.html) and [Edit delivery methods](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-in-the-back-office/edit-delivery-methods.html).

{% endinfo_block %}

## Add a new carrier company

To add a shipment method to a carrier, follow these steps:
1. Click **Create new delivery method**. The **Create Delivery Method** page opens.
2. Select the **CARRIER** you have created in the [Add a new shipment method](#add-a-new-shipment-method) section.
3. Add the **NAME** and store- and currency-specific net and gross prices.
4. Select **IS ACTIVE**.
5. Select the corresponding **TAX SET**.
6. Click **Save**.
   The new shipment method is available in the shop.

{% info_block infoBox "Note" %}

For more detailed information about adding carrier companies, see [Creating carrier companies](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html).

{% endinfo_block %}

<!-- ../../Resources/Images/ui_shipment_method_6.png -->


<!-- ../../Resources/Images/ui_shipment_selection.png -->
