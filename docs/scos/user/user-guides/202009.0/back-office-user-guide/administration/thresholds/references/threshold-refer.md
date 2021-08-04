---
title: Reference information- Threshold
originalLink: https://documentation.spryker.com/v6/docs/threshold-reference-information
redirect_from:
  - /v6/docs/threshold-reference-information
  - /v6/docs/en/threshold-reference-information
---

This topic contains the reference information for working in the following Back Office sections:
* **Administration > Merchant Relationships Threshold** 
* **Administration > Global Threshold** 
* **Administration > Threshold Settings** 
***

<!--
![Hard Threshold)](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/Hard+Threshold.gif){height="" width=""}


![Soft Threshold with a message](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/soft-threshold-with-message.gif){height="" width=""}

![Soft Threshold with a fixed fee](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/soft-threshold-with-fixed-fee.gif){height="" width=""}

![Soft Threshold with a flexible fee](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Threshold/Threshold:+Reference+Information/soft-threshold-with-flexible-fee.gif){height="" width=""} 

-->




The following table describes the attributes used to configure thresholds:

| Attribute |Description|
| --- | --- |
|**Store and Currency** | Defines the store to which the threshold is applied and the currency in which it is displayed. |
|**Enter threshold value**| Depending on the threshold type, defines the value that should be reached or not reached.|
|**Message** |A short message that informs the customer about the threshold conditions. For example, _You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout._ </br></br> Enter {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} or {% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %} to reference the threshold name or the defined fee respectively. When the message is rendered on the Storefront, the placeholders are replaced with the values from **Enter threshold value** and **Enter flexible fee** or **Enter fixed fee** fields. |
| **Enter fixed fee** | Adds this value to cart if the threshold is not reached. |
| **Enter flexible fee** | A percentage of an order's sub-total that is added to cart if the threshold is not reached.|

