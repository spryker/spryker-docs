---
title: Vertex FAQ
description: Frequently asked questions about the Spryker third party integration, Vertex. 
template: concept-topic-template
last_updated: May 17, 2024
---

## What is a Product Class Code for Vertex, and how can I use it?

The Product Class Code is used to represent groups or categories of products or services with identical taxability. By default, Spryker Product SKU is sent as `LineItems[].product.value` and `LineItems.lineItemId`. The Vertex App doesn't create any Vertex Tax Categories.


## How to use Item Flexible Fields? Should it contain some Product Class Code? Should I provide some class codes for order expenses as well?

​Item Flexible Fields are optional fields provided by a project. They are needed for the customization of tax calculation. Flexible Fields are supported by the Vertex app, and whether or not to use them is a business decision.


## How is stock address information used in the Marketplace? Does it calculate freight tax for shipment?

Spryker doesn't support freight shipment in terms of big packaging support; but calculation of taxes for shipping prices is supported.


## Could you share more information about sending invoices to Vertex through the OMS feature?

The Spryker OMS transition command is used as an execution point to send a full order with all existing and custom fields provided by the project. The results will be visible in the Invoice Tax Details report.


## How does the Vertex app handle tax calculation for different countries?

The Vertex app calculates taxes based on the tax rules and rates of the country where the product is shipped. The Vertex app uses the shipping address to determine the tax rate.

In some cases, the Vertex app can't calculate taxes and returns a 0 tax rate. For example, when a seller is located in EU, and the buyer is located in the US.

So, make sure your project has a logic for such cases. For example, when a buyer selects a shipping address different from the project's default tax region or country, a warehouse address in the respective region needs to be used.  