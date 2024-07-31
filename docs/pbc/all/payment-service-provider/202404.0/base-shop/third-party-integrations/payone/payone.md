---
title: Integrate PayOne
description: Payone partner integ
template: concept-topic-template
last_updated: Jul 31, 2024
---

The Payone partner integration is available through the following integration methods:

## Current limitations

- Payments can be properly canceled only from the the Back Office and not from the Payone PMI.
- Payments can't be partially canceled. We create one payment intent per order and it can either be authorized or fully cancelled.
- When you cancel an item on the order details page, all order items are canceled.

* [Manual integration](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/manual-integration/integrate-payone.html)
* [Integration in the Back Office](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html)
