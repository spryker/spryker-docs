---
title: Retrieving companies
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-companies
redirect_from:
  - /2021080/docs/retrieving-companies
  - /2021080/docs/en/retrieving-companies
---

This endpoint allows retrieving information about companies.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](https://documentation.spryker.com/docs/company-account-api-feature-integration-201907#glue-api--company-account-feature-integration).

## Retrieve a company

To retrieve information about a company, send the request:

***
`GET` **/companies/*{% raw %}{{{% endraw %}company_id{% raw %}}}{% endraw %}***
***


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}company_id{% raw %}}}{% endraw %}*** | Unique identifier of a company to retrieve information about. Enter `mine` to retrieve information about the company of the currently authenticated company user. |


### Request


| Header key | Type | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user) to get the value.  |


| Request | Usage |
| --- | --- |
| GET https://glue.mysprykershop.com/companies/59b6c025-cc00-54ca-b101-191391adf2af | Retrieve information about the company with id `59b6c025-cc00-54ca-b101-191391adf2af`. |
| GET https://glue.mysprykershop.com/companies/mine | Retrieve information about the company of the currently authenticated company user. |





#### Response


<details open>
    <summary>Response sample</summary>
    
```json
{
    "data": [
        {
            "type": "companies",
            "id": "88efe8fb-98bd-5423-a041-a8f866c0f913",
            "attributes": {
                "isActive": true,
                "name": "BoB-Hotel Mitte",
                "status": "approved"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/companies/88efe8fb-98bd-5423-a041-a8f866c0f913"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/companies/mine"
    }
}
```

</details>

| Attribute | Type | Description |
| --- | --- | --- |
| name | String | Company name. |
| isActive | Boolean | Defines if the company is active. |
| status | String | Company status. Possible values are: `Pending`, `Approved`, or `Denied`. |



## Possible errors

| Code | Reason |
| --- | --- |
| 001 | Authentication token is invalid. |
| 002 | Authentication token is missing.|
| 1801 | Specified company is not found, or the current authenticated company user does not have access to it. |
| 1803 | Current company account is not set. You need to select the current company user with /company-user-access-tokens in order to access the resource collection.|


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

##  Next steps

* [Retrieve business units](https://documentation.spryker.com/docs/retrieving-business-units)
* [Retrieve company company roles](https://documentation.spryker.com/docs/retrieving-company-roles)
* [Retrieve business unit addresses](https://documentation.spryker.com/docs/retrieving-business-unit-addresses)
* [Manage company user authentication tokens](https://documentation.spryker.com/docs/managing-company-user-authentication-tokens)
