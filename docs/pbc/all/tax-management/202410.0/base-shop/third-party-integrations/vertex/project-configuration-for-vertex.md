---
title: Project configuration for Vertex
description: Project guidelines for running Vertex
template: concept-topic-template
last_updated: June 12, 2024
---

This document describes the project configuration to consider when using Vertex for tax calculation.

## Adding country-specific fields to the address form

Make sure that, on the Storefront, the address form has the required fields for each country. For example, the US store should have the **State** field, and the CA store should have the **Province** field.

## Sending additional data to Vertex

By default, the following data is sent to Vertex for tax calculation:

 - Customer Shipping address
 - Product SKU
 - Shipping(delivery) method key
 - Warehouse address that also includes the Merchant warehouse address for a Marketplace model
 - Product SKUs
 - Product prices
 - Discounts
 - Shipping costs

You can send additional data to Vertex, like a Customer Exemption Certificate, using plugins and the `taxMetadata` fields. You can add more data to request any specific information that's not available in Spryker by default. For example, this could be data from ERP, other systems, and customized Spryker instances. For the implementation details, see [Install Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/integrate-the-vertex-app.html#implement-vertex-specific-metadata-extender-plugins).

## Additional configuration options for Vertex

* You can configure the Vertex app for invoices to be saved in Vertex. However, we recommend to send invoice requests only for paid orders, as specified in [Vertex installation](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/integrate-the-acp-connector-module-for-tax-calculation.html#optional-sending-tax-invoices-to-vertex-and-handling-refunds). The current implementation works asynchronously, so no response is saved in Spryker.

* The default Spryker functionality uses tax rates to manage taxes. When using Vertex for tax determination, Vertex doesn't provide any tax rates to Spryker. To avoid confusion, we recommend removing the default Spryker tax rates. In the Back Office, you can delete them in **Administration** > **Tax Rates**.

## Logging and tracking Vertex issues

If the Vertex app is down or taxes can't be calculated for other reasons, taxes are dispayed as 0, letting customers place orders. For some orders, taxes might actually be 0, so there is no way to identify if there is an issue with tax calculation. In future, there will be a flag to identify and track these issues.


## Next steps

* [Connect Vertex](/docs/pbc/all/tax-management/202404.0/base-shop/third-party-integrations/vertex/connect-vertex.html)








































