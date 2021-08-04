---
title: Timed Product Availability Feature Overview
originalLink: https://documentation.spryker.com/v5/docs/product-ttl-feature-overview
redirect_from:
  - /v5/docs/product-ttl-feature-overview
  - /v5/docs/en/product-ttl-feature-overview
---

Timed product availability, or product TTL (Time to Live) allows you to define when your products are available online and when they are not. To get the main idea of the TTL, go to the general feature overview for more detailed information on how it works as well as familiarize yourself with its usage scenarios.

## Timed Product Availability Feature Details

The Timed Product Availability feature is implemented through the `isActive` field by introducing two more fields for product concretes in the Back Office - **Valid from** and **Valid to**. A product can have exactly one "life" - one (or no) start, one (or no) end. If the **Valid from** date has not come yet, or if **Valid to** has been reached, the value of isActive field is set to `false` and the product is invisible for customers. This being said, the product validity settings overrule manual (de)activation of products.

{% info_block infoBox %}
Which means that, if, for example, the following **conditions** are met: <br>* a product has been manually set to *Deactivated* <br> * this product has **Valid from** and **Valid to** values specified<br> * **Valid to** date lies in the future<br>The **result** is: the product will be displayed until after the time set in "Valid to" field.<br>To deactivate the product in this case, it would be necessary to clear the values in the **Valid from** and **Valid to** fields.
{% endinfo_block %}

Time set for the product validity **Valid from** and **Valid to** fields is accurate up to the minute. However, technically it is possible to change the accuracy (up to the second or up to the days) via a cronjob. The time is set in GMT by default.

## Use Cases
The table below shows possible usage scenarios with the TTL feature and resulting system behavior.

| Validity dates settings | Result |
| --- | --- |
| "Valid from" is set, "Valid to" is set and lies in the future | Product goes online starting from "Valid to" time and remains online until after the "Valid to" time. |
| "Valid from" is set, "Valid to" is not set | Product goes online from "Valid from" time and never goes offline. |
| "Valid from" is not set, "Valid to" is set | Product goes online after manual activation and remains online till "Valid to" time is reached. |
| "Valid to" is set in the past | Product will be deactivated shortly. |
| "Valid from" is set, "Valid to" is set and lies in the future, the product is deactivated manually | Message saying that the product will be activated because of setting "Valid from" and "Valid to" time.|


<!-- Last review date: Feb 23, 2018-- by Kyrylo Khatsko -->
