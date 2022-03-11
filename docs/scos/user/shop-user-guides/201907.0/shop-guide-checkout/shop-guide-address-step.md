---
title: Shop Guide - Address Step
description: Use the procedures to create a delivery address, and assign multiple delivery addresses to the order in the Storefront.
last_updated: Dec 23, 2019
template: howto-guide-template
originalLink: https://documentation.spryker.com/v3/docs/address-step-shop-guide-201911
originalArticleId: 0978e254-e4c3-4552-9a32-cede9dc39181
redirect_from:
  - /v3/docs/address-step-shop-guide-201911
  - /v3/docs/en/address-step-shop-guide-201911
  - /docs/scos/user/shop-user-guides/page.version/checkout/shop-guide-address-step.html
---

The topic provides a list of steps to select billing and shipping addresses for the order.

{% info_block infoBox %}
You can proceed to the *Address* step as a:<ul><li>registered user: In the Login step, sign up by filling out the fields marked with * in the form and click **Register**.</li><li>guest: In the Login step, fill in the fields marked with *, select the **Accept Terms** checkbox in the **Order as guest** form, and click **Submit**.</li><li>logged-in user: Log in to your account on top of the page.</li></ul>
{% endinfo_block %}
***
To open the *Address* step, click **Checkout** in the corresponding shopping cart.

![Shopping cart checkout](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Checkout/Shop+Guide+-+Address+Step/checkout-btn.png) 

Here you can do the following:

* Create a new delivery address
* Use an existing delivery address
* Assign multiple delivery addresses to the items
***

## Creating a New Delivery Address
To create a new delivery address:

{% info_block infoBox %}
If there are no pre-saved addresses, the **Define new address** option is displayed in the drop-down menu by default.
{% endinfo_block %}

1. On the **Address** page, select the **Define new address** option from the drop-down menu.
![Create a new address](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Checkout/Shop+Guide+-+Address+Step/define-new-address.png) 

2. Fill in all the required information.
3. To proceed to the *Shipment* step, click **Next**.

**Tips and tricks**

The **Save new address to address book** and **Billing same as shipping** options are enabled by default:

* If you want to use a different billing address, clear the checkbox for **Billing same as shipping** and use the existing one or add a new address.
* If you don't want to save a new address, clear the checkbox for **Save new address to address book**. If you decide to add the new address to your contacts, it will appear only after you complete the order.
***

## Use Existing Delivery Address
To use one of the addresses you created before:

1. On the **Address** page, select the necessary address from the drop-down menu. You can select among *Customer Addresses* or *Business Addresses*.

![Existing addresses](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Checkout/Shop+Guide+-+Address+Step/select-existing-address.png)
2. In the *Billing Address* section, select an existing billing address or create a new one.
3. To proceed to the *Shipment* step, click **Next**.

**Tips and tricks**

The **Billing same as shipping** option is enabled by default:

* If you want to use a different billing address, clear the checkbox for **Billing same as shipping** and use the existing one or add a new address.
***

**What's next?**

The delivery addresses are added to your items. Now, you need to select shipment methods for each delivery address.

To learn more on how to select a shipment method, see [Shop Guide - Shipment Step](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-checkout/shop-guide-shipment-step.html).

<!-- Last review date: Sep 24, 2019 -->
