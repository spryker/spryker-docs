---
title: Project guidelines for the Vertex app
description: Project guidelines for running Vertex
template: concept-topic-template
last_updated: June 12, 2024
---

## Modify the Address Form with country-specific fields

Ensure that the address form in your Storefront has the required fields in that country. 
For example, the `State` should be added in the US, and the `Province` should be added in Canada.

## Specify the Country Code
Vertex uses a hierarchy structure for tax determination. The highest in the structure is the Company code. Therefore, it is important to set up your company code in Vertex and in the Vertex configuration page in Spryker.

## Understand the data sent to Vertex

By default, the following data is sent to Vertex for tax calculation:

 - Customer Shipping address
 - Product SKU
 - Shipping(delivery) method key 
 - Warehouse address that also includes the Merchant warehouse address for a Marketplace model
 - Product SKUs
 - Product prices
 - Discounts
 - Shipping costs

## Project Configuration Guide

1. If you want to include other data, such as Customer Exemption Certificate in the requests to Vertex, you can do so via plugins and the `taxMetadata` fields. You can add more data to request any specific information that is not available in Spryker by default. For example, this could be data from ERP, other systems, and customized Spryker instances. For the implementation details, see [Vertex installation](https://docs.spryker.com/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex.html#implement-vertex-specific-metadata-extender-plugins).
   
2. You can configure the Vertex app so that the invoice is saved in Vertex. However, we recommend to send invoice requests only for paid orders, as specified in [Vertex installation](https://docs.spryker.com/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex.html#optional-if-you-plan-to-send-invoices-to-vertex-through-oms-configure-your-payment-oms). The current implementation works asynchronously hence no response is saved in SCCOS.

3. When using Vertex for tax determination, no exact tax rate is received from Vertex instead of a default tax value in the Back Office. Therefore, to avoid confusion, we recommend removing the default tax rate that appears in the Back Office.

## Failover Solution
The integration covers use cases for when there is a downtime and for reasons taxes cannot be calculated. In this scenario, no tax is displayed and the end-user can checkout without taxes.

In the future, we will include a flag that states: VERTEXDOWN – 0 rate to enable you differentiate the downtime scenario from when tax rates are actually calculated as 0 from Vertex.


If you still have questions about the Spryker Vertex app, see the [Vertex FAQ](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/vertex-faq.html), which provides some clarification on several aspects.

## Read also
[Configure the Vertex App](/docs/pbc/all/tax-management/202404.0/base-shop/third-party-integrations/vertex/configure-vertex.html)
[Install the Prerequisites](/docs/pbc/all/tax-management/202404.0/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html)
