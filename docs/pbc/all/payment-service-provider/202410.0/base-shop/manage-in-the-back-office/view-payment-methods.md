---
title: View payment methods
description: Learn how to view payment methods that are in the Back Office that are configured within your Spryker Cloud Commerce OS project.
last_updated: June 2, 2022
template: back-office-user-guide-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/administration/payment-methods/view-payment-methods.html
  - /docs/pbc/all/payment-service-provider/202311.0/manage-in-the-back-office/view-payment-methods.html  
  - /docs/scos/user/back-office-user-guides/202204.0/administration/payment-methods/view-payment-methods.html
related:
  - title: Payments feature overview
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/payments-feature-overview.html
---

To view a payment methods in the Back Office, follow the steps:

1. Go to **Administration&nbsp;<span aria-label="and then">></span> Payment Methods**.
    This opens the **Payment Methods** page.
2. Next to the payment method you want to view, click **View**.
    This opens **View** page with the following attributes.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Payment Method Key | Unique identifier of the payment method defined in the database. |
| Name | Name of the payment method. |
| Payment Provider | Company that provides the payment method. |
| Is this Payment Method active? | Defines if customers can use this payment method on the Storefront. |
| STORE RELATION | Stores in which this payment method is available. Even if **Is this Payment Method active?** is selected, but no stores are selected, the payment method is not available on the Storefront. |

## Next steps

[Edit payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html)
