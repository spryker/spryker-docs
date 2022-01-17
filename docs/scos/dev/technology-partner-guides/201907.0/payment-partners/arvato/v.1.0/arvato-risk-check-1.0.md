---
title: Arvato - Risk Check 1.0
description: Arvato Risk Check evaluates the probability of payment default for the customer orders.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/arvato-risk-check-1-0
originalArticleId: 8c0b9492-d81b-475c-9765-646f19d99397
redirect_from:
  - /v3/docs/arvato-risk-check-1-0
  - /v3/docs/en/arvato-risk-check-1-0
related:
  - title: Installing and configuring Arvato 1.0
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/arvato/v.1.0/arvato-risk-solution-services-integration-1.0.html
  - title: Arvato
    link: docs/scos/user/technology-partners/page.version/payment-partners/arvato.html
---

Accounted for by external credit agency data and internal existing customer- and order-details  the RiskCheck evaluates the probability of payment default for the customer orders.
The returned decision codes (`Result` – `ActionCode` – `ResultCode`) manage the definition of the eShop's payment methods.
If a payment method is not permitted, the decision code provides information about alternate payment methods available for the customer.

The main entry point to risk check functionality is `performRiskCheck` method inside `ArvatoRssFacade` class.

Developer is supposed to call `performRiskCheck` method providing actual `QuoteTransfer` as the first argument.
In the response `QuoteTransfer` is returned with `ArvatoRssRiskCheckResponse` transfer inside. It contains
`Result`, `ResultCode`, `ActionCode`, `ResultText`.

Response can be taken with:
```php
 $quoteTransfer->getArvatoRssRiskCheckResponse();
 ```

{% info_block warningBox "Note" %}
The transfer can have all fields empty if error occurred during request.
{% endinfo_block %}

<b>Data, which is sent to Arvato RSS and must be present in the quote:</b>

| Name | Notes |
| --- | --- |
| Country | Is taken from `BillingAddress` |
| City | Is taken from `BillingAddress` |
| Street | Is taken from `BillingAddress` |
| StreetNumber | Is taken from `BillingAddress` |
| ZipCode | Is taken from `BillingAddress` |
| FirstName | Is taken from `BillingAddress` |
| LastName | Is taken from `BillingAddress` |
| RegisteredOrder | Shows if order is placed with registered customer or not. |
| Currency | Is taken from store configuration |
| GrossTotalBill | Total value of order incl. delivery fee, rebates/ credit notes and VAT (Grand Total) |
| TotalOrderValue | Value of goods for this order incl. VAT (Subtotal) |
| ProductNumber | Product number, defined by customer(default value 1). Sku is set there. |
| ProductGroupId | Product group number/product type (default value 1). 1 is set. |
| UnitPrice | Value of units incl. VAT |
| UnitCount | Quantity of units (maximum value 99999999) |

You can check the result codes, returned by Arvato in the attachment.
@(Embed)(https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Arvato/arvato-rss-result-codes.xlsx)
