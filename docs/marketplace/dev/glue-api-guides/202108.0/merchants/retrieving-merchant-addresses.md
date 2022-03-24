---
title: Retrieving merchant addresses
description: Retrieve merchant addresses via Glue API
template: glue-api-storefront-guide-template
---

This document describes how to retrieve merchant addresses.

## Retrieve merchant addresses

To retrieve merchant addresses, send the request:

***
`GET` {% raw %}**/merchants/*{{merchantId}}*/merchant-addresses**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchantId}}***{% endraw %} | Unique identifier of a merchant to retrieve the addresses of. To get it, [retrieve all merchants](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchants.html#retrieve-merchants). |

{% info_block warningBox "Note" %}

This endpoint returns only [active](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#merchant-statuses) merchants. To learn how you can activate a merchant in the Back Office, see [Activating and deactivating merchants](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/merchants/managing-merchants.html#activating-and-deactivating-merchants).

{% endinfo_block %}


### Request

Request sample: retrieve merchant addresses

`GET http://glue.mysprykershop.com/merchants/MER000001/merchant-addresses`

### Response

<details><summary markdown='span'>Response sample: retrieve merchant addresses</summary>

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
| addresses.address1        | String   | 1st line of the merchant address.   |
| addresses.address2        | String   | 2nd line of the merchant address.   |
| addresses.address3        | String   | 3rd line of the merchant address.   |
| addresses.city            | String   | City name.                   |
| addresses.zipCode         | String   | ZIP code.                           |
| addresses.email           | String   | Email address.                      |

## Possible errors

For statuses, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
