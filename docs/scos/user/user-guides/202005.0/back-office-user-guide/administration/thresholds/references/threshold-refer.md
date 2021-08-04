---
title: Threshold- Reference Information
originalLink: https://documentation.spryker.com/v5/docs/threshold-reference-information
redirect_from:
  - /v5/docs/threshold-reference-information
  - /v5/docs/en/threshold-reference-information
---

This topic contains the reference information for working in the following Back Office sections:
* **Administration > Merchant Relationships Threshold** 
* **Administration > Global Threshold** 
* **Administration > Threshold Settings** 
***
## Hard and Soft Thresholds

With a **hard threshold** applied, a buyer cannot proceed with checkout and place an order if the buyer's cart value is below the minimum order value set in the Back Office:
* Global Threshold
* Merchant relationships (**for B2B only**)

This means that a buyer will need to add more products to the cart to meet the required minimum value.
**Example:**
If you set the hard threshold to be 400€, the buyer's cart grand total should not be less than that value. Otherwise:
    ![Hard Threshold)](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/Hard+Threshold.gif){height="" width=""}

A soft threshold allows a customer to proceed to checkout but displays a flash warning message and, if selected, adds an additional fee to the order sum as a penalty that the customer will need to pay.

A **soft threshold** can be of the following types:
* Soft Threshold with message
* Soft Threshold with fixed fee
* Soft Threshold with flexible fee

* **Soft Threshold with message**. No additional fees are applied. This just informs the user that a minimum order value exists.
    ![Soft Threshold with a message](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/soft-threshold-with-message.gif){height="" width=""}
* **Soft Threshold with fixed fee**. You can define an additional fixed fee in money equivalent (e.g. 30€) to be paid by a buyer in case the minimum order value is not met.
    ![Soft Threshold with a fixed fee](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/soft-threshold-with-fixed-fee.gif){height="" width=""}
* **Soft Threshold with flexible fee**. You can define an additional flexible fee in percentages (e.g. 10%) to be paid by a buyer in case the minimum order value is not met. That 10 % is recalculated based on the cart subtotal.  
    ![Soft Threshold with a flexible fee](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/soft-threshold-with-flexible-fee.gif){height="" width=""} 

## Merchant Relationships Thresholds Unique Feature (B2B)
The merchant thresholds are applied only to the products with special (merchant) prices.

If you add additional goods to the cart (the products for which the special prices are not set up), those are not taken into consideration.

For example, you have a threshold for 1000 euro, and you have added:
* Products with special prices for 800 euros
* Products with common prices for 250 euros

then the threshold is not passed even if the total price of the products is 1050 euros, as the merchant price is only 800.

## Hard and Soft Thresholds Attributes
The following table describes the attributes that you enter when defining a soft/hard threshold:

| Attribute |Description|
| --- | --- |
|**Store and Currency** | Defines the store to which the threshold is applied and the currency in which it is displayed. |
|**Enter threshold value**| A minimum order value cost (this is a money value).|
|**Message** |A short but descriptive message that informs the customer about a minimum order value conditions. E.g., _You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout._ </br></br>You can use the placeholders {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} and {% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %} in your message and the system will replace those with the actual values from the **Enter threshold value** and **Enter flexible fee**/**Enter fixed fee** fields.|
| **Enter fixed fee** |The value you enter will go as a surcharge in case the minimum order value is not met, e.g. 30€|
| **Enter flexible fee** |The value you enter will go as a surcharge in case the minimum order value is not met. You enter the percentage, and the system will then recalculate in money equivalent based on the cart subtotal.|

