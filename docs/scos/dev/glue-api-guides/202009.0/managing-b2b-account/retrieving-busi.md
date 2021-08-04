---
title: Retrieving business unit addresses
originalLink: https://documentation.spryker.com/v6/docs/retrieving-business-unit-addresses
redirect_from:
  - /v6/docs/retrieving-business-unit-addresses
  - /v6/docs/en/retrieving-business-unit-addresses
---

This endpoint allows retrieving business unit addresses.


## Retrieve a business unit address
To retrieve a business unit address, send the request:

***
`GET` **/company-business-unit-addresses/*{% raw %}{{{% endraw %}business_unit_address_id{% raw %}}}{% endraw %}***
***


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}business_unit_address_id{% raw %}}}{% endraw %}*** | Unique identifier of a business unit address to retrieve.  |

### Request

| Header key | Type | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user) to get the value.  |

Request sample: `GET http://glue.mysprykershop.com/company-business-unit-addresses/eec036ee-b999-5753-a7dd-8d0710a2312f`


### Response


<details open>
    <summary>Response sample</summary>
    
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

| Attribute | Type | Description |
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

| Status | Reason |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 2001 | Сompany business unit address was not found.|

{% info_block infoBox "Note" %}

If your current company account is not set, you may get the `404` status code.

{% endinfo_block %}

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).


##  Next steps

* [Manage company user authentication tokens](https://documentation.spryker.com/docs/managing-company-user-authentication-tokens)
