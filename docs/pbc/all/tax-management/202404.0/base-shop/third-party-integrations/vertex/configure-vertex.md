---
title: Configure Vertex
description: Find out how you can configure Vertex in your Spryker shop
last_updated: Nov 3 2023
template: howto-guide-template
---

Once you have [installed the Vertex app](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html), you can configure it.

## Prerequisites

Before configuring Vertex, ensure the following prerequisites are met:

- You have an account with [Vertex](https://www.vertexinc.com/). Contact the Spryker Support team or your Customer Success Manager if you need support getting a Vertex account.
- Company Code is set up in Vertex and added to your project. See the [information about Company code](#company-code) for more details.
- You removed the default tax rate value from the Back Office. When you use Vertex to determine taxes, the tax rate received from Vertex does not overwrite the existing tax rate values in the Back Office. Therefore, before using Vertex, we recommend removing the default values from the Back Office. To remove the default tax rates, in your store's Back Office, go to **Administration -> Tax rates** and delete the tax rates.

## Configure Vertex

To configure Vertex, do the following:

1. In your store's Back Office, go to **Apps**.
2. On the *App Composition Platform Catalog* page, click **Vertex**. This takes you to the Vertex app details page.
3. In the top right corner of the Vertex app details page, click **Connect app**. The notification saying that the application connection is pending is displayed.
4. In the top right corner of the Vertex app details page, click **Configure**.
5. To activate the app, select *Active*.
6. In *Security URI*, enter the Security URI of your Vertex platform. For details on the Security URI, see [Vertex documentation](https://tax-calc-api.vertexcloud.com/resources/index.html).
7. In *Transaction calls URI*, enter the Transaction Calls URI of your Vertex platform. For details on the Transaction Calls URI, see [Vertex documentation](https://tax-calc-api.vertexcloud.com/resources/index.html).
7. In *Client ID/Client secret*, enter your Vertex client secret. See [Vertex documentation](https://tax-calc-api.vertexcloud.com/resources/index.html) for details about how to obtain it.
8. Optional: To enable invoice saving in Vertex, check *Enable invoice save in Vertex*.
9. Click **Save**.

![vertex-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/configure-vertex/vertex-configuration.png)

<a name="company-code"></a>

{% info_block infoBox "Company code" %}

Vertex expects to receive the Company Code you have set in Vertex from Spryker and use it to determine taxes. Although the Company Code field is not currently included in the Vertex app configuration page, we recommend that you provide this code as [Quote/Order TaxMetadata](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/integrate-the-vertex-app.html#reference-mapping-of-quote-and-order-objects-to-vertex-api) in your projects.


{% endinfo_block %}

## Configuration verification

{% info_block warningBox "Test the configuration" %}

To ensure accuracy and compliance with tax laws, we highly recommend thoroughly testing the Vertex integration.

{% endinfo_block %}

Once you have configured Vertex, the taxes are calculated in real time in the checkout. The respective note appears on the checkout page.

![vertex_checkout_page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/configure-vertex/vertex_checkout_page.png)

On the Storefront, the tax amount is displayed on the checkout summary page.

In the Back Office, the taxes are displayed on the order details page.

If you enabled invoice saving in Vertex in your configuration, you can view the taxes processed by Vertex for the Spryker order on the Vertex platform. Do the following:

1. Go to **Reporting -> Standard Reports**.
2. Click **Report Output**.
3. Find the necessary report and click **Action -> View report**.
![vertex-report-output](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/configure-vertex/vertex-report-output.png)
4. On the invoice page, you verify the invoice number that corresponds to the Spryker order number and the applicable country tax calculated by Vertex.
![invoice-in-vertex](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/configure-vertex/invoice-in-vertex.png)
