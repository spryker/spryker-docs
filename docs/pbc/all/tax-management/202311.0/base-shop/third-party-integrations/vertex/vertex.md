---
title: Vertex
description: Vertex technology partner
last_updated: August 7, 2023
template: concept-topic-template
related:
  - title: Install Vertex
    link: docs/pbc/all/tax-management/page.version/vertex/install-vertex.html
redirect_from:
  - /docs/pbc/all/tax-management/202311.0/vertex/vertex.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/vertex/vertex.html
  - /docs/pbc/all/tax-management/202400.0/base-shop/third-party-integrations/vertex/vertex.html
---

![vertex-hero](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/vertex.md/vertex-hero.png)

The Spryker-Vertex integration is part of the tax Category of Spryker's App Composition Platform. This integration is built with support for both the default Storefront as well as Spryker's GLUE APIs. For more information about Vertex, see the [Vertex website](https://www.vertexinc.com/).

The Spryker Vertex app, constructed on the basis of the *Vertex O Series* software, performs automatic, near-real-time tax calculations at the point of purchase while accounting for the following:

* Tax rates in each state, county, and city.  
* Laws, rules, and jurisdiction boundaries.  
* Special circumstances like tax holidays and product exemptions.

For more information about how Vertex calculates taxes, see the [Vertex O Series website](https://www.vertexinc.com/solutions/products/vertex-indirect-tax-o-series).

The Spryker Vertex app offers the following features that are worth considering when comparing it to the default Spryker [Tax Management capability](/docs/pbc/all/tax-management/{{page.version}}/tax-management.html):

- **Configure Vertex in Spryker**: Add your Vertex configurations, including your company code, in the App Composition catalog to connect your Spryker project to Vertex.
- **Tax Determination & Calculation**: View tax estimates during checkout and calculated taxes before generating an invoice. This feature works across all regions, including countries where taxes are included in the price.
- **Discounts Support**: The Vertex App uses both the discount and the amount paid by the customer, sending this information to Vertex for tax calculation and estimation.
- **Manage Tax Exemptions**: Configure your project to exclude tax-exempt customers using the Vertex App.
- **View Invoice Reports in Vertex Dashboard**: The Vertex App allows customers to send invoice reports for paid orders from Spryker to Vertex. Customers can opt out of sending invoices to Spryker if they choose.
- **Support for Refunds**: When order items are returned, refunded, or a paid order is canceled, the Vertex App updates the tax report in Vertex for accurate reporting and compliance.
- **Failover Solution**: Store owners and marketplace operators can manage refunds and ensure accurate tax reporting even during downtime.
- **Supported Product Types**: The integration currently supports tax calculation only for items/products created using Spryker Product capabilities.
- **Application of custom tax rules to products**: You can implement custom tax rules to accommodate unique product categorizations or specific tax regulations that apply to your business. The Vertex Integration provides a means for taxes to be calculated using these rules.


Check the video below to understand how the Vertex App works:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/vertex.md/Vertex+Demo.mp4" type="video/mp4">
  </video>
</figure>


## Supported Use Cases and Business Models
1. Tax Calculation in Regions where taxes are excluded from prices. For example, in the US and Canada.
2. Tax Calculation in Regions where taxes are included in the price. For example, in the EU.
3. Marketplace: Every line item sent from Spryker to Vertex includes the customer's shipping address and the merchant's warehouse address, which Vertex uses for tax calculation.
4. Support for Delivery Terms: Vertex allows customers to set delivery terms within their dashboard, which are used in tax calculation. This is especially important for cross-border transactions when the seller wants to use the customer's location to determine the applicable tax rate.
5. Inclusion of Shipping Tax in the Total Tax Calculated: Spryker sends the selected shipping method to Vertex. The `delivery-method-key` set in Spryker is used for this purpose. Projects must ensure this is mapped correctly inside the Vertex App by following the steps below:
   - In Vertex you create a Taxability Driver with the same value from Spryker
   - In Vertex you create a Taxability Mapping for the driver to one of Vertex's defined Delivery Charges


The following diagram demonstrates the flow of the Vertex app integration:

![vertex-app-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/vertex.md/vertex-app-flow.png)


## Next steps

[Install Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html)
