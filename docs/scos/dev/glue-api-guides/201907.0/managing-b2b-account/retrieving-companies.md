---
title: Retrieving Company Information
description: The article describes how to leverage endpoints provided by Spryker Glue API to retrieve company information.
last_updated: Feb 8, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v3/docs/retrieving-company-information-201907
originalArticleId: 97d79556-4638-4876-8d70-e3abe7a75d70
redirect_from:
  - /v3/docs/retrieving-company-information-201907
  - /v3/docs/en/retrieving-company-information-201907
related:
  - title: Logging In as Company User
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/authenticating-as-a-company-user.html
  - title: Retrieving Company User Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-company-users.html
  - title: Retrieving Company Role Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-company-roles.html
  - title: Retrieving Business Unit Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-business-units.html
  - title: Authentication and Authorization
    link: docs/scos/dev/glue-api-guides/page.version/authentication-and-authorization.html
---

Spryker provides the [Company Account](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-accounts-overview.html) feature that allows purchasing goods and performing other actions on behalf of a user's company. The endpoints provided by the Company API allow retrieving information on companies.

{% info_block warningBox "Authentication" %}
The endpoints provided by this API cannot be accessed anonymously. To access them, you need to impersonate users as Company Accounts and pass the authentication tokens received. For details on how to authenticate and retrieve such a token, see [Logging In as Company User](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html).
{% endinfo_block %}

In your development, the API can help you to provide information on the company that the authenticated user belongs to.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE: Company Account Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html)

## Retrieving Company Information
### Information on the User's Company
To retrieve information on the company a user belongs to, send a GET request to the following endpoint:

[/companies/mine](/docs/scos/dev/glue-api-guides/{{page.version}}/rest-api-reference.html#/companies)

Sample request: *GET http://glue.mysprykershop.com/companies/mine*

{% info_block warningBox "Note" %}
You can use the Accept-Language header to specify the locale.Sample header: [{"key":"Accept-Language","value":"de, en;q=0.9"}]where de, en are the locales; q=0.9 is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4).
{% endinfo_block %}

#### Response
The endpoint responds with a collection of **RestCompanyResponse** consisting of a single item that represents the user's company.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Specifies the name of the Company. |
| isActive | Boolean | Indicates whether the Company is active. |
| status | String | Specifies the status of the Company. Possible values: *Pending*, *Approved*, or *Denied*. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary markdown='span'>Sample Response</summary>
    
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
                "self": "http://glue.mysprykershop.com/companies/88efe8fb-98bd-5423-a041-a8f866c0f913"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/companies/mine"
    }
}
```
    
<br>
</details>

### Information on a Specific Company
To retrieve information on a specific company, send a GET request to the following endpoint:

[/companies/{% raw %}{{{% endraw %}company_id{% raw %}}}{% endraw %}](/docs/scos/dev/glue-api-guides/{{page.version}}/rest-api-reference.html#/companies)

Sample request: *GET http://glue.mysprykershop.com/companies/**59b6c025-cc00-54ca-b101-191391adf2af***
where **59b6c025-cc00-54ca-b101-191391adf2af** is the ID of the company you need.

{% info_block infoBox "Info" %}
The endpoint provides information only on the companies a user has access to. If an attempt is made to access a company that a user doesn't have access to, the endpoint will respond with a **404 Not Found** error code.
{% endinfo_block %}

{% info_block warningBox "Note" %}
You can use the Accept-Language header to specify the locale.Sample header: [{"key":"Accept-Language","value":"de, en;q=0.9"}]where de, en are the locales; q=0.9 is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4).
{% endinfo_block %}

#### Response
The endpoint responds with a **RestCompanyResponse** containing information on the requested company.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Specifies the name of the Company. |
| isActive | Boolean | Indicates whether the Company is active. |
| status | String | Specifies the status of the Company. Possible values: *Pending*, *Approved*, or *Denied*. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary markdown='span'>Sample Response</summary>
    
```json
{
    "data": {
        "type": "companies",
        "id": "59b6c025-cc00-54ca-b101-191391adf2af",
        "attributes": {
            "isActive": true,
            "name": "BoB-Hotel Jim",
            "status": "approved"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/companies/59b6c025-cc00-54ca-b101-191391adf2af"
        }
    }
}
```
    
<br>
</details>

### Possible Errors

| Code | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing.<br>- OR -<br>The current Company Account is not set.<br>This can occur if you didn't properly impersonate the user as a Company User Account. For details on how to do so, see [Logging In as Company User](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html). |
| 404 | The specified company was not found, or the user does not have access to it. |

<!-- add to related articles:
See also:
Logging In as Company UserRetrieving Company User InformationRetrieving Business Unit InformationRetrieving Company Role InformationCompany AccountAuthentication and AuthorizationCompany Account API Feature Integration -->
