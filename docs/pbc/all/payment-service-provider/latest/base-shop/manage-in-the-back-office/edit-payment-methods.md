---
title: Edit payment methods
description: Learn how to edit payment methods in the Back Office.
last_updated: June 2, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-payment-methods
originalArticleId: d0dc8732-295d-4072-8dc2-63f439feb324
redirect_from:
  - /docs/scos/user/back-office-user-guides/201811.0/administration/payment-methods/managing-payment-methods.html
  - /docs/scos/user/back-office-user-guides/201903.0/administration/payment-methods/managing-payment-methods.html
  - /docs/scos/user/back-office-user-guides/201907.0/administration/payment-methods/managing-payment-methods.html
  - /docs/scos/user/back-office-user-guides/202204.0/administration/payment-methods/managing-payment-methods.html
  - /docs/scos/user/back-office-user-guides/202311.0/administration/payment-methods/edit-payment-methods.html
  - /docs/pbc/all/payment-service-provider/202311.0/manage-in-the-back-office/edit-payment-methods.html  
  - /docs/scos/user/back-office-user-guides/202204.0/administration/payment-methods/edit-payment-methods.html
related:
  - title: Payments feature overview
    link: docs/pbc/all/payment-service-provider/latest/base-shop/payments-feature-overview.html
---

To edit a payment method in the Back Office, follow the steps:

1. Go to **Administration&nbsp;<span aria-label="and then">></span> Payment Methods**.
    This opens the **Payment Methods** page.
2. Next to the payment method you want to edit, click **Edit**.
3. On the **Edit** page, for **IS THE PAYMENT METHOD ACTIVE?**, do any of the following:
    - To make the payment method available on the Storefront, select the checkbox.
    - To make the payment method unavailable on the Storefront, clear the checkbox.
4. Click the **Store Relation** tab.
5. For **AVAILABLE IN THE FOLLOWING STORE(S)**, do the following:
    - Select the stores you want to make this payment method available in.
    - Clear the checkboxes next to the stores you want to make this payment method unavailable in.
6. Click **Save**.
    This opens the **Payment Methods** page with a success message displayed. The changes are reflected on the **Payment Methods** page. The activated the payment methods becomes available for your customers at the checkout.


## Reference information: Editing payment method pages

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Payment Method Key | Unique identifier of the payment method defined in the database. |
| Name | Name of the payment method. |
| IS THE PAYMENT METHOD ACTIVE? | Option to activate (make a payment method visible during the checkout process) or deactivate (make a payment method invisible during the checkout process) the payment method. |
| AVAILABLE IN THE FOLLOWING STORE(S) | Stores in which this payment method is available. Even if **IS THE PAYMENT METHOD ACTIVE?** is selected, but no stores are selected, the payment method is not available on the Storefront. |
