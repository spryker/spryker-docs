---
title: Managing global thresholds
description: Use the procedures to set up hard and soft thresholds when working with global thresholds in the Back Office.
last_updated: Aug 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-global-thresholds
originalArticleId: 99d7ee06-12fa-479a-a148-7728467fb950
redirect_from:
  - /2021080/docs/managing-global-thresholds
  - /2021080/docs/en/managing-global-thresholds
  - /docs/managing-global-thresholds
  - /docs/en/managing-global-thresholds
related:
  - title: Managing Merchant Order Thresholds
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-merchant-order-thresholds.html
  - title: Managing Merchant Relations
    link: docs/scos/user/back-office-user-guides/page.version/marketplace/merchants-and-merchant-relations/managing-merchant-relations.html
  - title: Managing Threshold Settings
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-threshold-settings.html
---

This topic describes how to manage global thresholds.

## Prerequisites
To start working with global thresholds, go to **Administration** > **Global threshold**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Setting up Minimum Hard Threshold

To set up a [hard minimum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#hard-minimum-threshold):
1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. In the *Minimum Hard Threshold* section, populate the **Enter threshold value** field.
3. Enter a **Message** for all the locales.
4. Scroll down the page and select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

See the [Reference information](#reference-information) section to know more about the hard threshold.

## Setting up Maximum Hard Threshold

To set up a [hard maximum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#hard-maximum-threshold):

1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. In the *Maximum Hard Threshold* section, populate the **Enter threshold value** field.
3. Enter a **Message** for all the locales.
4. Scroll down the page and select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

## Setting up Minimum Soft Threshold

To set up a [minimum soft threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#soft-minimum-threshold):
1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. In the *Soft Threshold* section, select a soft threshold type.
3. Populate the **Enter threshold value** field.
4. Based on the threshold type you have selected:
   * For the **Soft Threshold with fixed fee**, enter a **Enter fixed fee**.
   * For the **Soft Threshold with flexible fee**, enter a **Enter flexible fee**.
5. Populate a **Message** for all the locales.
6. Select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

See  [Reference information](#reference-information) to know more about the soft threshold and its types.

## Setting up several thresholds

To set up several threshold types:
1. Enter the fields in the sections of the thresholds you want to set up by following the respective instructions:
    * [Setting up a Hard Minimum Threshold](#setting-up-minimum-hard-threshold)
    * [Setting up a Hard Maximum Threshold](#setting-up-maximum-hard-threshold)
    * [Setting up a Soft Minimum Threshold](#setting-up-minimum-soft-threshold)
2. Select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

**Tips and tricks**
<br>In the **Message** field, enter *{% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}* or *{% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %}* to reference the threshold name or the defined fee, respectively. When the message is rendered on the Storefront, the placeholders are replaced with the values from **Enter threshold value** and **Enter flexible fee** or **Enter fixed fee** fields.

See  [Reference information](#reference-information) to know more about attributes.

## Reference information

The following table describes the attributes you select and enter when managing global order thresholds or when [managing merchant order thresholds](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-merchant-order-thresholds.html).

| ATTRIBUTE |DESCRIPTION|
| --- | --- |
|Store and Currency | Defines the store to which the threshold is applied and the currency in which it is displayed. |
|Enter threshold value| Depending on the threshold type, defines the value that should be reached or not reached.|
|Message |Short message that informs the customer about the threshold conditions. For example, _You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout._ <br><br> Enter {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} or {% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %} to reference the threshold name or the defined fee respectively. When the message is rendered on the Storefront, the placeholders are replaced with the values from **Enter threshold value** and **Enter flexible fee** or **Enter fixed fee** fields. |
| Enter fixed fee| Adds this value to cart if the threshold is not reached. |
| Enter flexible fee| Percentage of an order's sub-total that is added to cart if the threshold is not reached.|
