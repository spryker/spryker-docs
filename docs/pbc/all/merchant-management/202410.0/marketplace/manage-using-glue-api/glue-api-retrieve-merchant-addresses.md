---
title: "Glue API: Retrieve merchant addresses"
description: Learn how to retrieve merchant addresses in your Spryker marketplace project via the Spryker Glue API
template: glue-api-storefront-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/merchants/retrieving-merchant-addresses.html
related:
  - title: Retrieving merchants
    link: docs/pbc/all/merchant-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html
  - title: Retrieving merchant opening hours
    link: docs/pbc/all/merchant-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-merchant-opening-hours.html
---

This document describes how to retrieve merchant addresses.

## Retrieve merchant addresses

To retrieve merchant addresses, send the request:

***
`GET` {% raw %}**/merchants/*{{merchantId}}*/merchant-addresses**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchantId}}***{% endraw %} | Unique identifier of a merchant to retrieve the addresses of. To get it, [retrieve all merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#retrieve-merchants). |

{% info_block warningBox "Note" %}

This endpoint returns only [active](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#merchant-statuses) merchants. You can activate merchants in the Back Office.

{% endinfo_block %}


### Request

Request sample: retrieve merchant addresses

`GET https://glue.mysprykershop.com/merchants/MER000001/merchant-addresses`

### Response

<details><summary>Response sample: retrieve merchant addresses</summary>

```json
{
    "data": [
        {
            "type": "merchant-addresses",
            "id": "MER000001",
            "attributes": {
                "addresses": [
                    {
                        "countryName": "CountryName",
                        "address1": "address1",
                        "address2": "address2",
                        "address3": null,
                        "city": "City",
                        "zipCode": null,
                        "email": null
                    },
                    {
                        "countryName": "CountryName2",
                        "address1": "address3",
                        "address2": "address4",
                        "address3": null,
                        "city": "City2",
                        "zipCode": null,
                        "email": null
                    },
                    {
                        "countryName": "Germany",
                        "address1": "Caroline-Michaelis-Straße",
                        "address2": "8",
                        "address3": "",
                        "city": "Berlin",
                        "zipCode": "10115",
                        "email": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001/merchant-addresses"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/merchants/MER000001/merchant-addresses"
    }
}
```
</details>

<a name="merchant-addresses-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTION  |
| ------------- | -------- | --------------- |
| addresses       | Array    | List of merchant addresses information. |
| addresses.countryName     | String   | Country name.                |
| addresses.address1        | String   | First line of the merchant address.   |
| addresses.address2        | String   | Second line of the merchant address.   |
| addresses.address3        | String   | Third line of the merchant address.   |
| addresses.city            | String   | City name.                   |
| addresses.zipCode         | String   | ZIP code.                           |
| addresses.email           | String   | Email address.                      |

## Possible errors

For statuses, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
