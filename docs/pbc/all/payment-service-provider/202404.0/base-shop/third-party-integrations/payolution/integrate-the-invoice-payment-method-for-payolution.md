---
title: Integrating the invoice payment method for Payolution
description: Integrate invoice payment through Payolution into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payolution-invoice
originalArticleId: 77f3e81c-18a1-46e0-b4f6-492681bf66da
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/payolution/integrating-the-invoice-payment-method-for-payolution.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/payolution/integrating-the-invoice-payment-method-for-payolution.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payolution/integrate-the-invoice-payment-method-for-payolution.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/payolution/integrating-the-invoice-payment-method-for-payolution.html
related:
  - title: Installing and configuring Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/install-and-configure-payolution.html
  - title: Integrating Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-payolution.html
  - title: Payolution - Performing Requests
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-performing-requests.html
  - title: Payolution request flow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-request-flow.html
  - title: Integrating the installment payment method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html
---

## Workflow Scenarios

Payments from Payolution to Merchant are not included in the sequence diagrams since they occur on a regular basis (e.g. every week).
```html
<table>
        <col>
        <col>
        <tbody>
            <tr>
                <td>
                    <h3>Standard Case</h3>
                    <p>
                        <img>

                    </p>
                </td>
                <td>
                    <h3>Full Refund Before Payment</h3>
                    <p>
                        <img>

                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>Partial Refund Before Payment</h3>
                    <p>
                        <img>

                    </p>
                </td>
                <td>
                    <h3>Full Refund After Payment</h3>
                    <p>
                        <img>

                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>Partial Refund After Payment</h3>
                    <p>
                        <img>

                    </p>
                </td>
                <td>&#xA0;</td>
            </tr>
        </tbody>
    </table>
```

## Integrating Payolution Invoice Payment

To integrate invoice payments, two simple steps are needed: setting Payolution invoice payment configuration and calling the facade functions.

### Setting Payolution Invoice Configuration

The configuration to integrate invoice payments using Payolution is:
* `TRANSACTION_GATEWAY_URL`: the gateway URL to connect with Payolution services (required).
* `TRANSACTION_SECURITY_SENDER `: the sender id (required).
* `TRANSACTION_USER_LOGIN`: the sender username (required).
* `TRANSACTION_USER_PASSWORD`: the sender password (required).
* `TRANSACTION_MODE`: the mode of the transaction, either test or live (required).
* `TRANSACTION_CHANNEL_PRE_CHECK`: a Payolution channel for handling pre-check requests, in case of using Pre-check (optional).
* `TRANSACTION_CHANNEL_INVOICE`: a Payolution channel for handling invoice requests except Pre-check as it has its own channel (required).
* `MIN_ORDER_GRAND_TOTAL_INVOICE`: the allowed minimum order grand total amount for invoice payments in the shop e.g. the minimum allowed payment is $2 (required).
* `MAX_ORDER_GRAND_TOTAL_INVOICE`: the allowed maximum order grand total amount for invoice payments in the shop e.g. the maximum allowed payment is $5000 (required).
* `PAYOLUTION_BCC_EMAIL_ADDRESS`: Payolution email address to send copies of payment details to Payolution.

### Performing Requests

In order to perform the needed requests, you can easily use the implemented state machine commands and conditions. See [Payolution—Performing Requests](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payolution/payolution-performing-requests.html) for a summary. You can also use the facade methods directly which, however, are invoked by the state machine.
