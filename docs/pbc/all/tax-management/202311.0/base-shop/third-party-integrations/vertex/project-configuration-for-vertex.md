---
title: Project guidelines for the Vertex app
description: Project guidelines for running Vertex
template: concept-topic-template
redirect_from:
last_updated: June 12, 2024
---

## Modify the Address Form with country-specific fields

Make sure that, in your Storefront, the address form has the required fields for each country. For example, the US store should have the **State** field, and the CA store should have the **Province** field.

## Specify the Country Code

Vertex uses a hierarchy structure for tax determination. The highest in the structure is the Company code. Make sure to set up your company code in Vertex and Spryker. For more information on configuring Vertex in Spryker, see [Configure Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/connect-vertex.html)

## The data sent to Vertex

By default, the following data is sent to Vertex for tax calculation:

 - Customer Shipping address
 - Product SKU
 - Shipping(delivery) method key
 - Warehouse address that also includes the Merchant warehouse address for a Marketplace model
 - Product SKUs
 - Product prices
 - Discounts
 - Shipping costs

## Additional configuration options for Vertex

1. You can send additional data to Vertex, like a Customer Exemption Certificate, using plugins and the `taxMetadata` fields. You can add more data to request any specific information that's not available in Spryker by default. For example, this could be data from ERP, other systems, and customized Spryker instances. For the implementation details, see [Install Vertex](https://docs.spryker.com/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html#implement-vertex-specific-metadata-extender-plugins).

2. You can configure the Vertex app so that the invoice is saved in Vertex. However, we recommend to send invoice requests only for paid orders, as specified in [Vertex installation](https://docs.spryker.com/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html#optional-if-you-plan-to-send-invoices-to-vertex-through-oms-configure-your-payment-oms). The current implementation works asynchronously, so no response is saved in Spryker.

3. When using Vertex for tax determination, no exact tax rate is received from Vertex instead the tax rates in Spryker. To avoid confusion, we recommend removing the tax rates in Spryker. In the Back Office, you can delete tax rates in **Administration** > **Tax Rates**.

## Failover solution

If the Vertex app is down or taxes can't be calculated for other reasons, taxes aren't displayed during checkout, but customers can still place their orders.

In the future, we will include a flag that states: VERTEXDOWN – 0 rate to enable you differentiate the downtime scenario from when tax rates are actually calculated as 0 from Vertex.


If you still have questions about the Spryker Vertex app, see the [Vertex FAQ](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/vertex-faq.html), which provides some clarification on several aspects.

## Read also
[Configure the Vertex App](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/connect-vertex.html)
[Install the Prerequisites](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html)
