---
title: Retrieving Business Unit Information
originalLink: https://documentation.spryker.com/v3/docs/retrieving-business-unit-information-201907
redirect_from:
  - /v3/docs/retrieving-business-unit-information-201907
  - /v3/docs/en/retrieving-business-unit-information-201907
---

In the B2B world, users represent their companies rather than act on their own behalf. Such users, called [Company Accounts](/docs/scos/dev/features/202001.0/company-account-management/company-account-overview/company-account), are organized in Business Units depending on their job role and the scope of their activity. The endpoints provided by the **Business Unit** and **Business Unit Address** APIs allow retrieving Business Unit information.

{% info_block warningBox "Authentication" %}
The endpoints provided by this API cannot be accessed anonymously. To access them, you need to impersonate users as Company Accounts and pass the authentication tokens received. For details on how to authenticate and retrieve such a token, see [Logging In as Company User](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/b2b-account-management/logging-in-as-c
{% endinfo_block %}.)

In your development, the endpoint can help you to provide information on the Business Units available in the company of the currently logged in user.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Company Account Feature Integration](https://documentation.spryker.com/v3/docs/company-account-api-feature-integration-201907).

## Retrieving General Business Unit Information
### Information on the Business Unit of the User
To retrieve information on the business unit a user belongs to, send a GET request to the following endpoint:

[/company-business-units/mine](https://documentation.spryker.com/v4/docs/rest-api-reference#/company-business-units)

Sample request: *GET http://glue.mysprykershop.com/company-business-units/mine*

{% info_block warningBox "Note" %}
You can use the Accept-Language header to specify the locale.Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de**, **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}.)

#### Response
The endpoint responds with a collection of **RestCompanyBusinessUnitResponse**, each containing information on a specific Business Unit.

**Response Attributes (for each unit):**

| Attribute* | Type | Description |
| --- | --- | --- |
| id | String | Specifies a unique identifier of the Business Unit. You can use the identifier to access the unit in the future. |
| name | String | Specifies the name of the Business Unit. |
| email | String | Specifies the email address of the Business Unit. |
| phone | String | Specifies the telephone number of the Business Unit. |
| externalUrl | String | Specifies the URL of the Business Unit's website. |
| bic | String | Specifies the Bank Identifier Code of the Business Unit. |
| iban | String | Specifies the International Bank Account Number of the Business Unit. |
| defaultBillingAddress | String | Specifies the ID of the Business Unit default billing address.For details on how to retrieve the actual address, see section *Retrieving Business Unit Addresses*. |

*The attributes mentioned are all attributes in the response. Type is not mentioned.

<details open>
<summary>Sample Response</summary>
    
```json
{
    "data": [
        {
            "type": "company-business-units",
            "id": "5a6032dc-fbce-5d0d-9d57-11ade1947bac",
            "attributes": {
                "name": "Cleaning Mitte",
                "email": "Cleaning.Mitte@spryker.com",
                "phone": "12345617",
                "externalUrl": "",
                "bic": "",
                "iban": "",
                "defaultBillingAddress": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-business-units/5a6032dc-fbce-5d0d-9d57-11ade1947bac"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/company-business-units/mine"
    }
}
```
    
</br>
</details>

### Information on Specific Business Unit
To retrieve information on a specific Business Unit, send a GET request to the following endpoint:

[/company-business-units/{% raw %}{{{% endraw %}business_unit_id{% raw %}}}{% endraw %}](https://documentation.spryker.com/docs/rest-api-reference#/company-business-units)

Sample request: *GET http://glue.mysprykershop.com/company-business-units/**b8a06475-73f5-575a-b1e9-1954de7a49ef***
where **b8a06475-73f5-575a-b1e9-1954de7a49ef** is the ID of the Business Unit you need.

{% info_block infoBox "Info" %}
The endpoint provides information only on the business units a user has access to. If a request is made against a unit a user is not allowed to view, the endpoint responds with a **404 Not Found** error code.
{% endinfo_block %}

{% info_block warningBox "Note" %}
You can use the Accept-Language header to specify the locale.Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de**, **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}.)

#### Response
The endpoint returns a **RestCompanyBusinessUnitResponse** containing information on the requested unit.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Specifies the name of the Business Unit. |
| email | String | Specifies the email address of the Business Unit. |
| phone | String | Specifies the telephone number of the Business Unit. |
| externalUrl | String | Specifies the URL of the Business Unit's website. |
| bic | String | Specifies the Bank Identifier Code of the Business Unit. |
| iban | String | Specifies the International Bank Account Number of the Business Unit. |
| defaultBillingAddress | String | Specifies the ID of the Business Unit default billing address. For details on how to retrieve the actual address, see section *Retrieving Business Unit Addresses*. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample Response</summary>
    
```json
{
    "data": {
        "type": "company-business-units",
        "id": "b8a06475-73f5-575a-b1e9-1954de7a49ef",
        "attributes": {
            "name": "Hotel Tommy Berlin",
            "email": "hotel.tommy@spryker.com",
            "phone": "+49 (30) 1234 56789",
            "externalUrl": "",
            "bic": "OSDD DE 81 005",
            "iban": "DE 91 10000000 0123456789",
            "defaultBillingAddress": null
        },
        "links": {
            "self": "http://glue.mysprykershop.com/company-business-units/b8a06475-73f5-575a-b1e9-1954de7a49ef"
        }
    }
}
```
    
</br>
</details>

### Fetching Additional Information
This endpoint allows you not only to retrieve the Business Unit information, but also the addresses registered for it, as well as the company where the unit is located. To do so, you need to include the companies and company-business-unit-addresses resource relationships in the response of the endpoint.

Sample request to include companies: *GET http://glue.mysprykershop.com/company-business-units/32b44d30-3c2d-5f0a-91d3-e66adad10dc1?include=companies*

The response will include the following additional attributes:

| Resource | Attribute* | Type | Description |
| --- | --- | --- | --- |
| companies | name | String | Specifies the Company name. |
| companies | isActive | Boolean | Indicates whether the Company is active. |
| companies | status | String | Specifies the status of the Company. Possible values: *Pending*, *Approved* or *Denied*. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample Response</summary>
    
```json
{
    "data": {
        "type": "company-business-units",
        "id": "32b44d30-3c2d-5f0a-91d3-e66adad10dc1",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "companies": {
                "data": [
                    {
                        "type": "companies",
                        "id": "0818f408-cc84-575d-ad54-92118a0e4273"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "companies",
            "id": "0818f408-cc84-575d-ad54-92118a0e4273",
            "attributes": {
                "isActive": true,
                "name": "Test Company",
                "status": "approved"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273"
            }
        }
    ]
}
```
    
</br>
</details>

Sample request to include Business Unit addresses: *GET http://glue.mysprykershop.com/company-business-units/32b44d30-3c2d-5f0a-91d3-e66adad10dc1?include=company-business-unit-addresses*

The response will include the following additional attributes:

| Resource | Attribute* | Type | Description |
| --- | --- | --- | --- |
| company-business-unit-addresses | address1 | String | Specifies the 1st line of the Business Unit address. |
| company-business-unit-addresses | address2 | String | Specifies the 2nd line of the Business Unit address. |
| company-business-unit-addresses | address3 | String | Specifies the 3rd line of the Business Unit address. |
| company-business-unit-addresses | zipCode  | String | Specifies the ZIP code. |
| company-business-unit-addresses | city | String | Specifies the city. |
| company-business-unit-addresses | phone | String | Specifies the phone number of the Business Unit. |
| company-business-unit-addresses | iso2Code | String | Specifies an ISO 2 Country Code to use. |
| company-business-unit-addresses | comment  | String | Specifies an optional comment to the Business Unit. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample Response</summary>
    
```json
{
    "data": {
        "type": "company-business-units",
        "id": "32b44d30-3c2d-5f0a-91d3-e66adad10dc1",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "company-business-unit-addresses": {
                "data": [
                    {
                        "type": "company-business-unit-addresses",
                        "id": "19a55c0d-7bf0-580c-a9e8-6edacdc1ecde"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "company-business-unit-addresses",
            "id": "19a55c0d-7bf0-580c-a9e8-6edacdc1ecde",
            "attributes": {
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "zipCode": "10247",
                "city": "Berlin",
                "phone": "4902890031",
                "iso2Code": "DE",
                "comment": ""
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-business-unit-addresses/19a55c0d-7bf0-580c-a9e8-6edacdc1ecde"
            }
        }
    ]
}
```
    
</br>
</details>

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing.</br>- OR -</br>The current Company Account is not set.</br>This can occur if you didn't properly impersonate the user as a Company User Account. For details on how to do so, see [Logging In as Company User](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/b2b-account-management/logging-in-as-c).|
| 404 | The specified Business Unit was not found or the user does not have access to it. |

## Retrieving Business Unit Addresses
To retrieve a Business Unit address, send a GET request to the following endpoint:

[/company-business-unit-addresses/{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/company-business-unit-addresses)

Sample request: *GET http://glue.mysprykershop.com/company-business-unit-addresses/**eec036ee-b999-5753-a7dd-8d0710a2312f***
where **eec036ee-b999-5753-a7dd-8d0710a2312f** is the ID of the Business Unit Address you need.

{% info_block warningBox "Note" %}
You can use the Accept-Language header to specify the locale.Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de**, **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}.)

### Response
The endpoint responds with a **RestCompanyBusinessUnitAddressResponse** that contains the requested address.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| address1 | String | Specifies the 1st line of the Business Unit address. |
| address2 | String | Specifies the 2nd line of the Business Unit address. |
| address3 | String | Specifies the 3rd line of the Business Unit address. |
| zipCode  | String | Specifies the ZIP code. |
| city  | String | Specifies the city. |
| phone | String | Specifies the phone number of the Business Unit. |
| iso2Code | String | Specifies an ISO 2 Country Code to use. |
| comment | String | Specifies an optional comment to the Business Unit. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample Response</summary>
    
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
    
</br>
</details>

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing.</br>- OR -</br>The current Company Account is not set.</br>This can occur if you didn't properly impersonate the user as a Company User Account. For details on how to do so, see [Logging In as Company User](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/b2b-account-management/logging-in-as-c).|
| 404 | The specified Business Unit was not found or the user does not have access to it. |

<!-- add to related articles:
See also:
Logging In as Company UserRetrieving Company User InformationRetrieving Company InformationCompany AccountAuthentication and AuthorizationCompany Account API Feature Integration  -->
