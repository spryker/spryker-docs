---
title: Arvato - Store Order 2.0
description: In this article, you can get details about the  Store Order service in the Arvato module.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/arvato-store-order-2-0
originalArticleId: 57634a00-cd81-4f1b-82eb-0a9b54bb08c5
redirect_from:
  - /v3/docs/arvato-store-order-2-0
  - /v3/docs/en/arvato-store-order-2-0
related:
  - title: Arvato - Risk Check 2.0
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/arvato/v.2.0/arvato-risk-check-2.0.html
  - title: Installing and configuring Arvato 2.0
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/arvato/v.2.0/arvato-risk-solution-services-integration-2.0.html
  - title: Arvato
    link: docs/scos/user/technology-partners/page.version/payment-partners/arvato.html
---

 As soon as the order is activated in the eShop it has to be directly delivered by the service call StoreOrder in risk solution services. Based on the transmitted data a limit check is processed again. The result and action codes returned by `StoreOrder` should be analyzed and the order process should be stopped if applicable.

The store order call can be added to OMS. ArvatoRss module provides a <b>command</b> `(SprykerEco\Zed\ArvatoRss\Communication\Plugin\Oms\Command\StoreOrderPlugin)` to invoke store order call and a <b>condition</b> `(SprykerEco\Zed\ArvatoRss\Communication\Plugin\Oms\Command\IsStoreOrderSuccessfulPlugin)` which checks whether the call has been successful or not.

In case of obtaining the success result with `RiskCheck` call, `CommunicationToken` will be present in response. And need to be stored to quote and provided to store order call by developer.
All the operations over the communication token are processed by project.

<b>Data, which is sent to Arvato RSS and must be present in quote:</b>

|Name  | Description |
| --- | --- |
| `RegisteredOrder` | Shows if order is placed with registered customer or not. |
| `OrderNumber` | OrderReference is set here. |
| Debitor number | Customer id from the database. |
| Payment type | Payment type which is mapped to existing payment methods via configuration. See `config.dist.php` to get an example. |
| Currency | Is taken from store configuration. |
| `GrossTotalBill` | Total value of order incl. delivery fee, rebates/ credit notes and VAT (Grand Total). |
| `TotalOrderValue` | Value of goods for this order incl. VAT (Subtotal). |
| `ProductNumber` | Product number, defined by customer(default value 1). Sku is set there. |
| `ProductGroupId` | Product group number/product type (default value 1). 1 is set. |
| `UnitPrice` | Value of units incl. VAT. |
| `UnitCount` | Quantity of units (maximum value 99999999). |

You can check the result codes, returned by Arvato in the attachment.

@(Embed)(https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Arvato/arvato-rss-result-codes.xlsx)
