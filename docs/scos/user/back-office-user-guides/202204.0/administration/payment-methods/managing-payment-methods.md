---
title: Edit payment methods
description: Learn how to edit payment methods in the Back Office.
last_updated: June 2, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-payment-methods
originalArticleId: d0dc8732-295d-4072-8dc2-63f439feb324
redirect_from:
  - /2021080/docs/managing-payment-methods
  - /2021080/docs/en/managing-payment-methods
  - /docs/managing-payment-methods
  - /docs/en/managing-payment-methods
  - /docs/scos/user/back-office-user-guides/201811.0/administration/payment-methods/managing-payment-methods.html
  - /docs/scos/user/back-office-user-guides/201903.0/administration/payment-methods/managing-payment-methods.html
  - /docs/scos/user/back-office-user-guides/201907.0/administration/payment-methods/managing-payment-methods.html
  - /docs/scos/user/back-office-user-guides/202204.0/administration/payment-methods/managing-payment-methods.html  
related:
  - title: Payments feature overview
    link: docs/scos/user/features/page.version/payments-feature-overview.html
---

To edit payment methods in the Back Office, follow the steps:

1. Go to **Administration&nbsp;<span aria-label="and then">></span> Payment Methods**.
    This opens the **Payment Methods** page
2. Next to the payment method you want to edit, click **Edit**.
3. On the **Configuration** tab, update the availability status of the payment method under **Is the Payment Method active?**:
* Select the checkbox to make the payment method available in the **Payment** step during the checkout process.
* Clear the checkbox to make the payment method unavailable in the **Payment** step during the checkout process.

![Edit the payment method](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Payment+Management/Payment+Methods/Managing+Payment+Methods/edit-payment-method.png)

3. On the **Store relation** tab, select stores you want the payment method to be displayed in.

4. To apply the changes, click **Save**.

{% info_block warningBox "Note" %}

The payment method must be assigned to a store; otherwise, it won’t be displayed during the checkout process.

{% endinfo_block %}

### Reference information: Editing payment method pages

The following table describes the attributes you see, select, or enter while viewing or editing a payment method.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Payment Method Key | Unique identifier of the payment method defined in the database. |
| Name | Name of the payment method. |
| Payment Provider | Company that offers payment services. |
| Status | Indicates whether a payment method is displayed during the checkout process or not. |
| Available in store | Lists stores in which a payment method is available. |
| Is this Payment Method active? | Option to activate (make a payment method visible during the checkout process) or deactivate (make a payment method invisible during the checkout process) the payment method. |
