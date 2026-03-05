---
title: Connect Vertex
description: Find out how you can configure Spryker's third-party Vertex integration into your Spryker-based project.
last_updated: Mar 5, 2026
template: howto-guide-template
---

This document describes how to connect a Spryker project to Vertex.

## Prerequisites

- [Install Vertex](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html).
- Create an account with [Vertex](https://www.vertexinc.com/). If you need support getting a Vertex account, contact [support](https://support.spryker.com/) or your Customer Success Manager.
- Optional: For Vertex Validator integration, create an account with [Vertex Validator](https://www.vertexinc.com/). If you need help getting a Vertex Validator account, contact [support](https://support.spryker.com/) or your Customer Success Manager.

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


## Verify Vertex Validator tax ID validation

Validate a tax ID by sending a request to `/tax-id-validate` using Glue API.

### Request

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

One of the following should be returned:

Successful response: HTTP code: 200.

```json
{
  "data": [],
  "links": []
}
```

Unsuccessful response: HTTP code: 400, 422.

```json
{
  "errors": [
    {
      "status": 400,
      "detail": "Wrong format of the tax number."
    }
  ]
}
```