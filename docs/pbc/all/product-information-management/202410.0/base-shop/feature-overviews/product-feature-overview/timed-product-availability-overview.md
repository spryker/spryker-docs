---
title: Timed Product Availability overview
description: Timed product availability, or product TTL (Time to Live) lets you define when your products are available online and when they are not.
last_updated: Jul 9, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/timed-product-availability-overview
originalArticleId: 1091da1e-29b2-46b4-96d1-6f283264230b
redirect_from:
  - /2021080/docs/timed-product-availability-overview
  - /2021080/docs/en/timed-product-availability-overview
  - /docs/timed-product-availability-overview
  - /docs/en/timed-product-availability-overview
  - /docs/scos/user/features/202200.0/product-feature-overview/timed-product-availability-overview.html
  - /docs/scos/user/features/202311.0/product-feature-overview/timed-product-availability-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/product-feature-overview/timed-product-availability-overview.html
---

Timed product availability, or product TTL (Time to Live) lets you define when your products are available online and when they are not. To get the main idea of the TTL, go to the general feature overview for more detailed information about how it works as well as familiarize yourself with its usage scenarios.

The Timed Product Availability feature is implemented through the `isActive` field by introducing two more fields for product concretes in the Back Office—**Valid from** and **Valid to**. A product can have exactly one "life"—one (or no) start, one (or no) end. If the **Valid from** date has not come yet, or if **Valid to** has been reached, the value of isActive field is set to `false` and the product is invisible for customers. This being said, the product validity settings overrule manual (de)activation of products.

{% info_block infoBox %}

Which means that, if, for example, the following **conditions** are met:
  - a product has been manually set to *Deactivated*
  - this product has **Valid from** and **Valid to** values specified
  - **Valid to** date lies in the future
  - The **result** is: the product will be displayed until after the time set in "Valid to" field.
 To deactivate the product in this case, it would be necessary to clear the values in the **Valid from** and **Valid to** fields.

{% endinfo_block %}

Time set for the product validity **Valid from** and **Valid to** fields is accurate up to the minute. However, technically you can change the accuracy (up to the second or up to the days) using a cronjob. The time is set in GMT by default.

## Use cases

The following table shows possible usage scenarios with the TTL feature and resulting system behavior.

| VALIDITY DATES SETTINGS | RESULT |
| --- | --- |
| "Valid from" is set, "Valid to" is set and lies in the future | Product goes online starting from "Valid to" time and remains online until after the "Valid to" time. |
| "Valid from" is set, "Valid to" is not set | Product goes online from "Valid from" time and never goes offline. |
| "Valid from" is not set, "Valid to" is set | Product goes online after manual activation and remains online till "Valid to" time is reached. |
| "Valid to" is set in the past | Product will be deactivated shortly. |
| "Valid from" is set, "Valid to" is set and lies in the future, the product is deactivated manually | Message saying that the product will be activated because of setting "Valid from" and "Valid to" time.|

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Manage concrete product validity dates](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/edit-product-variants.html) |
