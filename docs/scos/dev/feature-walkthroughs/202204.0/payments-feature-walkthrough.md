---
title: Payments feature walkthrough
last_updated: Aug 18, 2021
description: The Payments feature lets customers to pay for orders with none, one, or multiple payment methods during the checkout process.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/payments-feature-walkthrough.html
---

The _Payments_ feature lets customers pay for orders with none, one, or multiple payment methods during the checkout process.


To learn more about the feature and to find out how end users use it, see [Payments feature overview](/docs/scos/user/features/{{page.version}}/payments-feature-overview.html) for business users.


## Entity diagram

The following schema illustrates relations between the _Payment_, _PaymentGui_, and _PaymentDataImport_ modules:

<div class="width-100">

![payment-methods-modules-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Payment/Payment+Methods+Overview/payment-methods-modules-scheme.png)

</div>


## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|---|
| [Payments feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/payments-feature-integration.html) | [Payment migration guide](/docs/scos/dev/module-migration-guides/migration-guide-payment.html) | [Update payment data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html) | [File details: payment_method.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method-store.csv.html) | [HowTo: Hydrate payment methods for an order](/docs/scos/dev/tutorials-and-howtos/howtos/howto-hydrate-payment-methods-for-an-order.html) | [Payment partners](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/adyen.html) <!-- must be a link to the whole directory payment-partnerts --> |
|  |  |  | [File details: payment_method_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method-store.csv.html) | [Implementing Direct Debit Payment](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/implementing-direct-debit-payment.html) |  |
|  |  |  |  | [Interact with third party payment providers using Glue API](/docs/pbc/all/payment-service-provider/{{site.version}}/interact-with-third-party-payment-providers-using-glue-api.html) |  |
