---
title: Payments feature walkthrough
last_updated: Aug 18, 2021
description: The Payments feature allows customers to pay for orders with none, one, or multiple payment methods during the checkout process.
template: concept-topic-template
---

The _Payments_ feature allows customers to pay for orders with none, one, or multiple payment methods during the checkout process.

<!--
To learn more about the feature and to find out how end users use it, see [Payments feature overview](https://documentation.spryker.com/docs/payments-feature-overview) for business users.
-->

## Entity diagram

The following schema illustrates relations between the _Payment_, _PaymentGui_, and _PaymentDataImport_ modules:

<div class="width-100">

![payment-methods-modules-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Payment/Payment+Methods+Overview/payment-methods-modules-scheme.png)

</div>


## Related Developer articles

| INTEGRATION GUIDES  | MIGRATION GUIDES | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|---|
| Payments feature integration | Payment migration guide | Updating payment data | File details: payment_method.csv | HowTo - Hydrate payment methods for an order | Payment partners |
|  |  |  | File details: payment_method_store.csv | Implementing Direct Debit Payment |  |
|  |  |  |  | Tutorial - Interacting with third party payment providers via Glue API |  |
