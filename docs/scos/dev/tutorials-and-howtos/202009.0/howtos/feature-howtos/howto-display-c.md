---
title: HowTo - Display Custom Names for Order Item States on the Storefront
originalLink: https://documentation.spryker.com/v6/docs/howto-display-custom-names-for-order-item-states-on-the-storefront
redirect_from:
  - /v6/docs/howto-display-custom-names-for-order-item-states-on-the-storefront
  - /v6/docs/en/howto-display-custom-names-for-order-item-states-on-the-storefront
---

For the order items states on the Storefront, it is not always appropriate to display the states as they are in the state machine, as they do not make much sense for Buyers. For example, for the OMS *confirmed* state, you might want to display this sate as, for example, *waiting for shipment* for the Storefront users.

To display custom order states on the Storefront, do the following:

1. In your project, go to `/config/Zed/oms` and open the .XML file of the payment method or sub-process you want to change the order states on the Storefront for. For example, let’s take the default Spryker [DummyPayment01.xml](https://github.com/spryker-shop/suite/blob/master/config/Zed/oms/DummyPayment01.xml).

2. Specify the `display` value of the necessary state, as you want it on the Storefront. In the example below, we have set the `display` value of the *confirmed* OMS sate to *waiting for shipment*:

**config/Zed/oms/DummyPayment01.xml**

```xml
?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DummyPayment01" main="true">
    <subprocesses>
        <process>DummyRefund</process>
        <process>DummyReturn</process>
        <process>DummyInvoice</process>
        <process>CreateGiftCard</process>
    </subprocesses>

    <states>
       ...
        <state name="confirmed" reserved="true" display="waiting for shipment">
            <flag>cancellable</flag>
        </state>
```

{% info_block infoBox "Info" %}

It is possible to have the same display values for different OMS states.

{% endinfo_block %}

3. Go to **Back Office > Glossary**.

4. In the *List of translations* table, the *Name* column, find the state name as you specified it for the `display` parameter. For our example, it is *waiting for shipment*.

5. Provide the new glossary keys, that is, translations of the state:

a. Click **Edit** in the *Actions* column. You are taken to the *Edit translation* page.

b. Enter translations for the available locales and click **Save**. You are taken to the *Overview of Translation* page where you can see the translations of the order state for the Storefront.

That’s it! Now, on the *Order Overview* and *Order History* pages on the Storefront, customers see the states that correspond to the values of the `display` parameter you set in .XML files of the respective payment methods and sub-processes. 

{% info_block infoBox "your title goes here" %}

If you delete the `display` parameter with its value, the OMS state, that is, the one specified in the `state name` parameter, is displayed on the Storefront.

{% endinfo_block %}

