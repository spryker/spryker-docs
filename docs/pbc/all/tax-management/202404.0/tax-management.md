---
title: Tax Management
description: Tax Management PBC lets you define tax rates for different stores and products
template: concept-topic-template
last_updated: Dec 5, 2023
---

The default Spryker Tax Management capability lets you manage taxes per store, product, and country.

The capability consists of a base shop and the marketplace addon. The base shop features are needed for running a regular shop in which your company is the only entity fulfilling orders. To run a marketplace, the features from both the base shop and the marketplace addon are required.

We recommend using the Spryker OOTB Tax Capability if the following applies:

- You are operating in regions such as the European Union where tax rates aren't as complex as compared to other regions such as North America.
- You want to import or manually create tax rates in Spryker.
- You have both NET prices and GROSS prices and don't need an external system to determine taxes.
- You want to manually manage changes in Tax Rates.
- You do not want to send or record invoices in an external tax system.

However, if you need a solution that would automatically calculate taxes in near real-time, taking into account country-specific tax rates, laws, rules, etc., we recommend using the [Vertex app](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/vertex.html) or [Avalara](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/avalara/avalara.html) instead of the default Spryker Tax Management capability.
