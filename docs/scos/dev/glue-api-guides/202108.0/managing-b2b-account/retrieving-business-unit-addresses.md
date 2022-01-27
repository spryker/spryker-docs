---
title: Retrieving business unit addresses
description: Learn how to retrieve business unit addresses via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-business-unit-addresses
originalArticleId: 9fd20b19-8917-4c1d-b1e6-b9eef0e4390f
redirect_from:
  - /2021080/docs/retrieving-business-unit-addresses
  - /2021080/docs/en/retrieving-business-unit-addresses
  - /docs/retrieving-business-unit-addresses
  - /docs/en/retrieving-business-unit-addresses
---

This endpoint allows retrieving business unit addresses.

## Retrieve a business unit address

To retrieve a business unit address, send the request:

***
`GET` **/company-business-unit-addresses/*{% raw %}{{{% endraw %}business_unit_address_id{% raw %}}}{% endraw %}***
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}business_unit_address_id{% raw %}}}{% endraw %}*** | Unique identifier of a business unit address to retrieve.  |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample: `GET http://glue.mysprykershop.com/company-business-unit-addresses/eec036ee-b999-5753-a7dd-8d0710a2312f`


### Response


<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": {
        "type": "company-business-unit-addresses",
        "id": "eec036ee-b999-5753-a7dd-8d0710a2312f",
        "attributes": {
            "address1": "Seeburger Str.",
            "address2": "270",
            "address3": "Block A 3 floor",
            "zipCode": "10115",
            "city": "Berlin",
            "phone": "4908892455",
            "iso2Code": null,
            "comment": ""
        },
        "links": {
            "self": "http://glue.mysprykershop.com/company-business-unit-addresses/eec036ee-b999-5753-a7dd-8d0710a2312f"
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| address1 | String | 1st line of the business unit address. |
| address2 | String | 2nd line of the business unit address. |
| address3 | String | 3rd line of the business unit address. |
| zipCode  | String | ZIP code. |
| city  | String | City. |
| phone | String | Phone number of the business unit. |
| iso2Code | String | ISO 2 Country Code to use. |
| comment | String | Optional comment describing the business unit address. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 2001 | Сompany business unit address is not found.|

{% info_block infoBox "Note" %}

If your current company account is not set, you may get the `404` status code.

{% endinfo_block %}

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).


##  Next steps

* [Manage company user authentication tokens](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/managing-company-user-authentication-tokens.html)
