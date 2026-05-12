---
title: Braintree - Request workflow
description: This article describes the request flow for the Braintree module in the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/braintree-workflow
originalArticleId: 9cfdb1b2-c552-40f0-9856-f39230b79e90
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/braintree/braintree-request-workflow.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/braintree/braintree-request-workflow.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/braintree/braintree-request-workflow.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/braintree/braintree-request-workflow.html
related:
  - title: Installing and configuring Braintree
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/braintree/install-and-configure-braintree.html
  - title: Integrating Braintree
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/braintree/integrate-braintree.html
  - title: Braintree - Performing Requests
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/braintree/braintree-performing-requests.html
---

Both credit card and PayPal utilize the same request flow in:

- **Pre-check**: to check the user information to make sure that all the needed information is correct before doing the actual pre-authorization.
- **Authorize**: to perform a payment risk check which is a mandatory step before every payment. The payment is considered accepted when it's authorized.
- **Revert**: to cancel the authorization step which cancels the payment before capturing.
- **Capture**: to capture the payment and receive money from the buyer.
- **Refund**: to refund the buyer when returning products.
