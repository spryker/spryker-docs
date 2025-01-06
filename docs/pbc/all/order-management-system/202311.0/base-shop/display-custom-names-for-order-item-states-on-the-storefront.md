---
title: Display custom names for order item states on the Storefront
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-display-custom-names-for-order-item-states-on-the-storefront
originalArticleId: 1e420a56-ad89-4c61-8e20-7913396610ab
redirect_from:
  - /2021080/docs/howto-display-custom-names-for-order-item-states-on-the-storefront
  - /2021080/docs/en/howto-display-custom-names-for-order-item-states-on-the-storefront
  - /docs/howto-display-custom-names-for-order-item-states-on-the-storefront
  - /docs/en/howto-display-custom-names-for-order-item-states-on-the-storefront
  - /v6/docs/howto-display-custom-names-for-order-item-states-on-the-storefront
  - /v6/docs/en/howto-display-custom-names-for-order-item-states-on-the-storefront
---

For the order items states on the Storefront, it's not always appropriate to display the states as they are in the state machine, as they do not make much sense for Buyers. For example, for the OMS *confirmed* state, you might want to display this sate as, for example, *waiting for shipment* for the Storefront users.

To display custom order states on the Storefront, do the following:

1. In your project, go to `/config/Zed/oms` and open the .XML file of the payment method or sub-process you want to change the order states on the Storefront for. For example, let’s take the default Spryker [DummyPayment01.xml](https://github.com/spryker-shop/suite/blob/master/config/Zed/oms/DummyPayment01.xml).
2. Specify the `display` value of the necessary state, as you want it on the Storefront. In the following example, the `display` value of the `confirmed` OMS sate is set to `waiting for shipment`:

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

You can have the same display values for different OMS states.

{% endinfo_block %}

3. In Back Office, go to **Administration&nbsp;<span aria-label="and then">></span> Glossary**.
4. In the **LIST OF TRANSLATIONS** table, in the **NAME** column, find the state name as you specified for the `display` parameter—for example, `waiting for shipment`.
5. Provide the new glossary keys, that is, translations of the state:
    1. In the **ACTIONS** column, click **Edit**. The **Edit Translation** page opens.
    2. For the available locales, enter translations and click **Save**. The **Overview of Translation** page opens, where you can see the translations of the order state for the Storefront.

On the Storefront, on the **Order Overview** and **Order History** pages, customers can see the states that correspond to the values of the `display` parameter you set in XML files of the respective payment methods and sub-processes.

{% info_block infoBox "Info" %}

If you delete the `display` parameter with its value, the OMS state, the one specified in the `state name` parameter, is displayed on the Storefront.

{% endinfo_block %}
