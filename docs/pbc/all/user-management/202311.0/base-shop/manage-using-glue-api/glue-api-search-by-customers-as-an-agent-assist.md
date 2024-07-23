---
title: "Glue API: Search by customers as an agent assist"
description: As an agent assist, search by customers to find the customer reference you want to impersonate.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/searching-by-customers-as-an-agent-assist
originalArticleId: 7e16c84e-9baf-4c1b-bab3-bb2d1db0a7d9
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-agent-assists/searching-by-customers-as-an-agent-assist.html
  - /docs/pbc/all/user-management/202204.0/base-shop/manage-using-glue-api/glue-api-search-by-customers-as-an-agent-assist.html
related:
  - title: Agent Assist feature overview
    link: docs/pbc/all/user-management/page.version/base-shop/agent-assist-feature-overview.html
  - title: Authenticate as an agent assist
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html
  - title: Impersonate customers as an agent assist
    link: docs/pbc/all/user-management/page.version/base-shop/manage-using-glue-api/glue-api-impersonate-customers-as-an-agent-assist.html
  - title: Managing agent assist authentication tokens
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-agent-assist-authentication-tokens.html
---


Search by customers to find out information about them. This endpoint is mostly used by [agent assists](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html) to find out the customer reference needed to [impersonate a customer](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-impersonate-customers-as-an-agent-assist.html#impersonate-a-customer).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Agent Assist Glue API](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-glue-api.html)
* [Install the Customer Account Management + Agent Assist feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-agent-assist-feature.html)
* [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)

## Search by customers

To search by customers, send the request:

***
`GET` **/agent-customer-search**
***

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Agent-Authorization | string | ✓ |  String containing digits, letters, and symbols that authorize the agent assist. [Authenticate as an agent assist](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html#authenticate-as-an-agent-assist) to get the value.  |



| STRING PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| q | The value to search for in the list of customers. If you enter a part of an email address, first name, or last name, the endpoint returns all the customer entries partially matching the search query. To search by a customer reference, enter full customer reference. | {% raw %}{{{% endraw %}customerEmail{% raw %}}}{% endraw %}, {% raw %}{{{% endraw %}firstName{% raw %}}}{% endraw %}, {% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}, {% raw %}{{{% endraw %}lastName{% raw %}}}{% endraw %} |
| page[offset] | The offset of the item at which to begin the response. <br> Works only together with `page[limit]`. <br> To work correctly, the value should be devisable by the value of `page[limit]`. <br> The default value is `0`.  | From `0` to any. |
| page[limit] | The maximum number of entries to return. <br> Works only together with `page[offset]`. <br> The default value is `10`. | From `1` to any. |

| REQUEST | USAGE |
| --- | --- |
| `GET http://glue.mysprykershop.com/agent-customer-search` | Return the list of all customers. |
| `GET http://glue.mysprykershop.com/agent-customer-search?page[limit]=5&page[offset]=5` | Return a list of 5 customer entries starting from the 6th entry. |
| `GET http://glue.mysprykershop.com/agent-customer-search?q=sonia@spryker.com` | Search for the customer with the `sonia@spryker.com` email address. |
| `GET http://glue.mysprykershop.com/agent-customer-search?q=spencor` | Search for the customer with the `spencor` name. |
| `GET http://glue.mysprykershop.com/agent-customer-search?q=DE--5` | Search for the customer with the `DE--5` customer reference. |

### Response

<details><summary markdown='span'>Response sample: return the list of all customers</summary>

```json
{
    "data": [
        {
            "type": "agent-customer-search",
            "id": null,
            "attributes": {
                "customers": [
                    {
                        "customerReference": "DE--1",
                        "email": "spencor.hopkin@spryker.com",
                        "firstName": "Spencor",
                        "lastName": "Hopkin"
                    },
                    {
                        "customerReference": "DE--2",
                        "email": "maria.williams@spryker.com",
                        "firstName": "Maria",
                        "lastName": "Williams"
                    },
                    {
                        "customerReference": "DE--3",
                        "email": "maggie.may@spryker.com",
                        "firstName": "Maggie",
                        "lastName": "May"
                    },
                    {
                        "customerReference": "DE--4",
                        "email": "bill.martin@spryker.com",
                        "firstName": "Bill",
                        "lastName": "Martin"
                    },
                    {
                        "customerReference": "DE--5",
                        "email": "george.freeman@spryker.com",
                        "firstName": "George",
                        "lastName": "Freeman"
                    },
                    {
                        "customerReference": "DE--6",
                        "email": "henry.tudor@spryker.com",
                        "firstName": "Henry",
                        "lastName": "Tudor"
                    },
                    {
                        "customerReference": "DE--7",
                        "email": "anne.boleyn@spryker.com",
                        "firstName": "Anne",
                        "lastName": "Boleyn"
                    },
                    {
                        "customerReference": "DE--8",
                        "email": "andrew@ottom.de",
                        "firstName": "Andrew",
                        "lastName": "Wedner"
                    },
                    {
                        "customerReference": "DE--9",
                        "email": "Ahill@ottom.de",
                        "firstName": "Ahill",
                        "lastName": "Grant"
                    },
                    {
                        "customerReference": "DE--10",
                        "email": "Alexa@ottom.de",
                        "firstName": "Alexa",
                        "lastName": "Simons"
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/agent-customer-search"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/agent-customer-search",
        "last": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=20&page[limit]=10",
        "first": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=0&page[limit]=10",
        "next": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=10&page[limit]=10"
    }
}
```
</details>

<details><summary markdown='span'>Response sample: search for a customer with page limit and page offset</summary>

```json
{
    "data": [
        {
            "type": "agent-customer-search",
            "id": null,
            "attributes": {
                "customers": [
                    {
                        "customerReference": "DE--6",
                        "email": "henry.tudor@spryker.com",
                        "firstName": "Henry",
                        "lastName": "Tudor"
                    },
                    {
                        "customerReference": "DE--7",
                        "email": "anne.boleyn@spryker.com",
                        "firstName": "Anne",
                        "lastName": "Boleyn"
                    },
                    {
                        "customerReference": "DE--8",
                        "email": "andrew@ottom.de",
                        "firstName": "Andrew",
                        "lastName": "Wedner"
                    },
                    {
                        "customerReference": "DE--9",
                        "email": "Ahill@ottom.de",
                        "firstName": "Ahill",
                        "lastName": "Grant"
                    },
                    {
                        "customerReference": "DE--10",
                        "email": "Alexa@ottom.de",
                        "firstName": "Alexa",
                        "lastName": "Simons"
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=5&page[limit]=5"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=5&page[limit]=5",
        "last": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=25&page[limit]=5",
        "first": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=0&page[limit]=5",
        "prev": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=0&page[limit]=5",
        "next": "http://glue.mysprykershop.com/agent-customer-search?page[offset]=10&page[limit]=5"
    }
}
```
</details>

<details><summary markdown='span'>Response sample: search for a customer by email address</summary>

```json
{
    "data": [
        {
            "type": "agent-customer-search",
            "id": null,
            "attributes": {
                "customers": [
                    {
                        "customerReference": "DE--21",
                        "email": "sonia@spryker.com",
                        "firstName": "Sonia",
                        "lastName": "Wagner"
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/agent-customer-search?q=sonia@spryker.com"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/agent-customer-search?q=sonia@spryker.com",
        "last": "http://glue.mysprykershop.com/agent-customer-search?q=sonia@spryker.com&page[offset]=0&page[limit]=10",
        "first": "http://glue.mysprykershop.com/agent-customer-search?q=sonia@spryker.com&page[offset]=0&page[limit]=10"
    }
}    
```
</details>

<details><summary markdown='span'>Response sample: search for a customer by name</summary>

```json
 {
    "data": [
        {
            "type": "agent-customer-search",
            "id": null,
            "attributes": {
                "customers": [
                    {
                        "customerReference": "DE--1",
                        "email": "spencor.hopkin@spryker.com",
                        "firstName": "Spencor",
                        "lastName": "Hopkin"
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/agent-customer-search?q=spencor"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/agent-customer-search?q=spencor",
        "last": "http://glue.mysprykershop.com/agent-customer-search?q=spencor&page[offset]=0&page[limit]=10",
        "first": "http://glue.mysprykershop.com/agent-customer-search?q=spencor&page[offset]=0&page[limit]=10"
    }
}   
```
</details>

<details><summary markdown='span'>Response sample: search for a customer by customer reference</summary>

```json
{
    "data": [
        {
            "type": "agent-customer-search",
            "id": null,
            "attributes": {
                "customers": [
                    {
                        "customerReference": "DE--5",
                        "email": "george.freeman@spryker.com",
                        "firstName": "George",
                        "lastName": "Freeman"
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/agent-customer-search?q=de--5"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/agent-customer-search?q=de--5",
        "last": "http://glue.mysprykershop.com/agent-customer-search?q=de--5&page[offset]=0&page[limit]=10",
        "first": "http://glue.mysprykershop.com/agent-customer-search?q=de--5&page[offset]=0&page[limit]=10"
    }
}    
```
</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| customerReference | string | Unique customer identifier. |
| email | string | Email address of the customer. |
| firstName | string | First name of the customer. |
| lastName | string | Last name of the customer. |

## Possible errors

| CODE  | REASON |
| --- | --- |
| 001 | Access token is invalid.|
| 4103 | Agent access token is missing; or the action is available to an agent user only.|

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).

## Next steps

After you’ve found the reference of the customer you want to assist, impersonate the customer to perform any actions available to them. See [Impersonate customers as an agent assist](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-impersonate-customers-as-an-agent-assist.html) for details.
