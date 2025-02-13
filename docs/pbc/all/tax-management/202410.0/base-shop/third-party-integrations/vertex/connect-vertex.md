---
title: Connect Vertex
description: Find out how you can confiure Sprykers third party Vertex in to your Spryker Based project.
last_updated: Jan 8 2025
template: howto-guide-template
---

This document describes how to connect a Spryker project to Vertex.

## Prerequisites

- [Install Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html).
- Create an account with [Vertex](https://www.vertexinc.com/). If you need support getting a Vertex account, [contact support](https://support.spryker.com/) or your Customer Success Manager.
- Optional: For Taxamo integration, create an account with [Taxamo](https://www.taxamo.com/). If you need help getting a Taxamo account, [contact support](https://support.spryker.com/) or your Customer Success Manager.

## Connect Vertex

1. In the Back Office, go to **Apps**.
2. On the **App Composition Platform Catalog** page, click **Vertex**.
  This opens the Vertex app details page.
3. In the top right corner of the Vertex app details page, click **Connect app**.
  The notification saying that the application connection is pending is displayed.
4. In the top right corner of the Vertex app details page, click **Configure**.
5. To activate the app, for **Activate**, select **Active**.
6. In **SECURITY URI**, enter the Security URI of your Vertex platform. For details on the Security URI, see [Vertex documentation](https://tax-calc-api.vertexcloud.com/resources/index.html).
7. In **TRANSACTION CALLS URI**, enter the Transaction Calls URI of your Vertex platform. For details on the Transaction Calls URI, see [Vertex documentation](https://tax-calc-api.vertexcloud.com/resources/index.html).
8. For **CLIENT ID**, enter the Vertex client ID. For details on obtaining the ID, see [Vertex documentation](https://tax-calc-api.vertexcloud.com/resources/index.html).
9. For **CLIENT SECRET**, enter the Vertex client secret. For details on obtaining the secret, see [Vertex documentation](https://tax-calc-api.vertexcloud.com/resources/index.html).
10. For **DEFAULT TAXPAYER COMPANY CODE**, enter the company code you set in your Vertex account.
11. Optional: Enable Taxamo:
  1. Select **ENABLE TAX ID VALIDATION (TAXAMO)**.
  2. For **API URL (V3)**, enter the API URI of your Taxamo environment. For details on the API URI, see [Standalone Vertex Validator](https://docs.marketplace.taxamo.com/docs/standalone#useful-links).
  3. For **SELLER TOKEN**, enter your Taxamo seller token. For details on obtaining the token, see [Accessing the APIs](https://docs.marketplace.taxamo.com/docs/getting-started-1).
12. Optional: To enable invoice saving in Vertex, select **ENABLE INVOICE SAVE IN VERTEX**.
13. Click **Save**.

## Verify Vertex connection

{% info_block warningBox "Test the configuration" %}

To ensure accuracy and compliance with tax laws, we highly recommend thoroughly testing the Vertex integration.

{% endinfo_block %}

Once you've configured Vertex, the taxes are calculated in real time in the checkout. A message about this is displayed on the checkout page.

![vertex_checkout_page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/configure-vertex/vertex_checkout_page.png)

On the Storefront, the tax amount is displayed on the checkout summary page.

In the Back Office, the taxes are displayed on the order details page.

If you configured invoices to be saved in Vertex, you can view the taxes processed by Vertex as follows:

1. In the Vertex dashboard, go to **Reporting** > **Standard Reports**.
2. Click **Report Output**.
3. Next to the report you want to view the taxes for, click **Action**>**View report**.
![vertex-report-output](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/configure-vertex/vertex-report-output.png)
4. On the invoice page, you can verify the invoice number that corresponds to the Spryker order number and the applicable country tax calculated by Vertex.
![invoice-in-vertex](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/vertex/configure-vertex/invoice-in-vertex.png)


## Verify Taxamo tax ID validation

Validate a tax ID by sending a request to `/tax-id-validate` using Glue API.

```json
{
    "data": {
        "type": "tax-id-validate",
        "attributes": {
            "countryCode": "**",
            "taxId": "*****"
        }
    }
}
```


## Retain Vertex configuration after a destructive deployment

{% info_block errorBox "" %}
[Destructive deployment](https://spryker.com/docs/dg/dev/acp/retaining-acp-apps-when-running-destructive-deployments.html) permanently deletes the configuration of Vertex.

To run a destructive deployment, follow the steps:
1. Disconnect Vertex.
2. Run a destructive deployment.
3. Reconnect Vertex.

{% endinfo_block %}

## Next steps

* [Vertex FAQ](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/vertex-faq.html)
* [Troubleshooting Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/troubleshooting-vertex.html)
