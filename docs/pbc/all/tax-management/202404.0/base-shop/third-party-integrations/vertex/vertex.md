---
title: Vertex
description: Vertex technology partner
last_updated: May 17, 2024
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

The Spryker-Vertex integration is part of the tax Category of Spryker’s App Composition Platform. This integration is built with support for both the default Storefront as well as Spryker’s GLUE APIs. For more information about Vertex, see the [Vertex website](https://www.vertexinc.com/).

The Spryker Vertex app, based on the *Vertex O Series*, performs automatic, near-real-time tax calculations at the point of purchase while accounting for the following:

* Tax rates in each state, county, and city.  
* Laws, rules, and jurisdiction boundaries.  
* Special circumstances like tax holidays and product exemptions.

For more information about how Vertex calculates taxes, see the [Vertex O Series website](https://www.vertexinc.com/solutions/products/vertex-indirect-tax-o-series).

The Spryker Vertex app offers the following features that are worth considering when comparing it to the default Spryker [Tax Management capability](/docs/pbc/all/tax-management/{{page.version}}/tax-management.html):

- *Compliance in states or countries with complex tax calculations*: Takes into account various tax jurisdictions and rates applicable to different states and countries. This helps with tax calculations if you sell in states or countries where tax calculations are complex.
- *Dynamic tax calculation*: As tax rules or rates change in Vertex, these changes are applied to customers' quotes during the checkout process.
- *Reduction of manual errors*: Helps to automate tax calculations, reducing manual errors and saving time.
- *Tax exemption management*: You can manage tax exemptions and certificates efficiently, ensuring that exempt customers aren't charged taxes during the checkout process while maintaining proper documentation.
- *Tax reporting and filing*: You have the option of sending invoice requests to Vertex after an order is paid. You can generate accurate tax reports, which helps in the filing of sales tax returns across multiple jurisdictions, reducing the risk of audit and penalties.
- *Application of custom tax rules to products*: You can implement custom tax rules to accommodate unique product categorizations or specific tax regulations that apply to your business.

## Using the Vertex app in Spryker projects

To start using the Spryker Vertex app in your project, you need to do the following:

1. Enable ACP for your project. For instructions, see [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.
2. Create an account with [Vertex account](https://www.vertexinc.com/). If you need help with getting a Vertex account, contact the Spryker Support team or your Customer Success Manager.
3. [Install the Vertex app](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex.html).
4. [Configure the Vertex app](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/configure-vertex.html).
5. Ensure that the address form in your Storefront has the required fields in that country. For example, there should be a `State` field in the US and the `Province` field in Canada.

Once you have installed and configured the Vertex app, the taxes will be calculated by Vertex during the checkout process. See this video to understand the experience for the end user:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/vertex.md/Vertex+Demo.mp4" type="video/mp4">
  </video>
</figure>

By default, the following data is sent to Vertex for tax calculation:

 - User's shipping address
 - User's billing address
 - Warehouse address that also includes the Merchant warehouse address for a Marketplace model
 - Product SKUs
 - Product prices
 - Discounts
 - Shipping costs


{% info_block infoBox "Company code" %}

Vertex uses a hierarchy structure for tax determination. Company code is the highest in the hierarchy, so it determines what rates apply. So, make sure to set up your company code in Vertex and add it in the project. For information about adding the Company code, see [Configure Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/configure-vertex.html#company-code).

{% endinfo_block %}

Thus, the buyers see the tax amount calculated by Vertex during the checkout after they have provided their shipping address.
The Back Office users can see the taxes calculated by Vertex on the order details page.

{% info_block infoBox "Default tax values in the Back Office" %}

Keep in mind that when using Vertex for tax determination, no exact tax rate is received from Vertex instead of a default tax value in the Back Office. Therefore, to avoid confusion, we recommend removing the default tax rate that appears in the Back Office.

When the Vertex integration isn’t working, SCCOS displays the default tax, provided the plugins for Tax Calculation aren't disabled. This solution applies to the following errors:
- Timeout error
- Shipping address error


{% endinfo_block %}

The following diagram demonstrates the flow of the Vertex app integration:

![vertex-app-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/vertex.md/vertex-app-flow.png)


### Vertex app configuration options

You can configure the Vertex app so that the invoice is saved in Vertex. However, we recommend to send invoice requests only for paid orders, as specified in [Vertex installation](https://docs.spryker.com/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex.html#optional-if-you-plan-to-send-invoices-to-vertex-through-oms-configure-your-payment-oms). The current implementation works asynchronously hence no response is saved in SCCOS.

If you want to include other data, such as Customer Exemption Certificate in the requests to Vertex, you can do so via plugins and the `taxMetadata` fields. You can add more data to request any specific information that is not available in Spryker by default. For example, this could be data from ERP, other systems, and customized Spryker instances. For the implementation details, see [Vertex installation](https://docs.spryker.com/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex.html#implement-vertex-specific-metadata-extender-plugins).


If you still have questions about the Spryker Vertex app, see the [Vertex FAQ](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/vertex-faq.html), which provides clarification on several aspects.

## Next steps

[Install Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex.html)
