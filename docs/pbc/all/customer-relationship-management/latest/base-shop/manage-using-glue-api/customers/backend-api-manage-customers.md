---
title: "Backend API: Manage customers"
description: Learn how to retrieve, create, update, and anonymize customers in your Spryker shop using the Spryker Backend API.
last_updated: Sep 4, 2026
template: glue-api-storefront-guide-template
---

This document describes how to manage customers using the Backend API. These endpoints expose the same customer lifecycle that the Back Office uses, so you can build Back Office extensions, ERP integrations, and internal tools against one contract.

Customers are addressed by `customerReference`. The internal database identifier is never exposed.

{% info_block infoBox "Backend API and Back Office API" %}

The Backend API is an *application*, and the Back Office API is one of the *types* of API it hosts. These endpoints are served by the Backend API application at `glue-backend` and authorize Back Office users. For more information, see [Spryker API strategy](/docs/integrations/spryker-api/getting-started-with-apis/api-strategy.html).

{% endinfo_block %}

## Installation

These endpoints are provided by API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

## Retrieve customers

To retrieve a paginated collection of customers, send the request:

***
`GET` **/customers**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page | Page number to return. | From `1` to any. Defaults to `1`. |
| page[limit] | Maximum number of items to return per page. | From `1` to any. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |
| q | Free-text search, matched against the email, first name, and last name. | Any string. |
| filter[customers.customerReference] | Filters the collection by an exact customer reference. | Any customer reference. |
| filter[customers.email] | Filters the collection by an exact email address. | Any email address. |
| filter[customers.firstName] | Filters the collection by a partial first name. | Any string. |
| filter[customers.lastName] | Filters the collection by a partial last name. | Any string. |
| filter[customers.includeAnonymized] | Includes anonymized customers in the result. By default, the collection contains active customers only. | `1`, `0` |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | customerReference, createdAt, email, firstName, lastName, registered |
| include | Adds resource relationships to the request. | notes |

{% info_block infoBox "Pagination" %}

You can page the collection in two ways: with `page` as a page number, or with the `page[limit]` and `page[offset]` item window. Do not combine the two forms in one request.

{% endinfo_block %}

{% info_block infoBox "Free-text search and name filters" %}

`q` takes precedence over `filter[customers.firstName]` and `filter[customers.lastName]`. If you send `q`, the endpoint ignores both name filters. Combining `q` with `filter[customers.email]`, `filter[customers.customerReference]`, or `filter[customers.includeAnonymized]` works as expected.

{% endinfo_block %}

Sorting by a field that is not on the list returns `400` with the error code `1203`, and the error message names the supported fields.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customers` | Retrieve the first page of customers. |
| `GET https://glue-backend.mysprykershop.com/customers?page[limit]=50&page[offset]=100` | Retrieve 50 customers, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/customers?q=hopkin` | Retrieve customers whose email, first name, or last name matches `hopkin`. |
| `GET https://glue-backend.mysprykershop.com/customers?filter[customers.email]=spencor.hopkin@acme.com` | Retrieve the customer with the given email address. |
| `GET https://glue-backend.mysprykershop.com/customers?sort=-createdAt` | Retrieve customers, newest first. |
| `GET https://glue-backend.mysprykershop.com/customers?filter[customers.includeAnonymized]=1` | Retrieve customers, including the anonymized ones. |

### Response

<details>
  <summary>Response sample: retrieve customers</summary>

```json
{
    "data": [
        {
            "type": "customers",
            "id": "DE--1",
            "attributes": {
                "customerReference": "DE--1",
                "email": "spencor.hopkin@acme.com",
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "gender": "Male",
                "dateOfBirth": "1990-01-15",
                "phone": "+49123456789",
                "company": "Acme Inc.",
                "localeName": "en_US",
                "storeName": "DE",
                "registered": "2026-08-27",
                "createdAt": "2026-08-27 10:06:00.000000",
                "updatedAt": "2026-08-27 12:30:00.000000",
                "anonymizedAt": null,
                "pagination": {
                    "numFound": 42,
                    "currentPage": 1,
                    "maxPage": 5,
                    "currentItemsPerPage": 10
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customers/DE--1"
            }
        },
        {
            "type": "customers",
            "id": "DE--2",
            "attributes": {
                "customerReference": "DE--2",
                "email": "harald.schmidt@acme.com",
                "salutation": "Mr",
                "firstName": "Harald",
                "lastName": "Schmidt",
                "gender": null,
                "dateOfBirth": null,
                "phone": null,
                "company": null,
                "localeName": "de_DE",
                "storeName": "DE",
                "registered": null,
                "createdAt": "2026-08-28 09:14:00.000000",
                "updatedAt": "2026-08-28 09:14:00.000000",
                "anonymizedAt": null
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customers/DE--2"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/customers?page=1",
        "first": "https://glue-backend.mysprykershop.com/customers?page=1",
        "last": "https://glue-backend.mysprykershop.com/customers?page=5",
        "next": "https://glue-backend.mysprykershop.com/customers?page=2"
    }
}
```

</details>

<details>
  <summary>Response sample: retrieve a customer with notes</summary>

```json
{
    "data": {
        "type": "customers",
        "id": "DE--1",
        "attributes": {
            "customerReference": "DE--1",
            "email": "spencor.hopkin@acme.com",
            "salutation": "Mr",
            "firstName": "Spencor",
            "lastName": "Hopkin"
        },
        "relationships": {
            "notes": {
                "data": [
                    {
                        "type": "notes",
                        "id": "b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customers/DE--1"
        }
    },
    "included": [
        {
            "type": "notes",
            "id": "b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31",
            "attributes": {
                "customerReference": "DE--1",
                "message": "Called the customer about invoice 4711; they will pay by Friday.",
                "username": "Admin Spryker",
                "createdAt": "2026-08-31 10:06:00.000000",
                "updatedAt": "2026-08-31 10:06:00.000000"
            }
        }
    ]
}
```

</details>

{% info_block infoBox "Included notes" %}

When you request notes with `include=notes`, the endpoint returns the first 10 notes of the customer and ignores the `page` and `sort` parameters of the request, because those parameters address the customer collection. To page or sort notes, use [Retrieve customer notes](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-notes.html).

{% endinfo_block %}

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| customerReference | String | Public unique customer identifier. Addresses the customer in every operation. |
| email | String | Email address of the customer, also used as the Storefront username. |
| salutation | String | Salutation of the customer. |
| firstName | String | First name of the customer. |
| lastName | String | Last name of the customer. |
| gender | String | Gender of the customer. |
| dateOfBirth | String | Date of birth of the customer, in the `YYYY-MM-DD` format. |
| phone | String | Phone number of the customer. |
| company | String | Company label stored on the customer record and shown in the Back Office. |
| localeName | String | Locale assigned to the customer. |
| storeName | String | Store context used for outgoing mail templates. |
| registered | String | Date on which the customer confirmed the registration. `null` until the customer confirms it. |
| createdAt | String | Date and time when the customer was created. |
| updatedAt | String | Date and time when the customer was last updated. |
| anonymizedAt | String | Date and time when the customer was anonymized. A non-null value means the record is anonymized. |

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

## Retrieve a customer

To retrieve a single customer, send the request:

***
`GET` {% raw %}**/customers/*{{customer_reference}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer to retrieve. To get it, [retrieve customers](#retrieve-customers). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | notes |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customers/DE--1` | Retrieve the customer with the reference `DE--1`. |
| `GET https://glue-backend.mysprykershop.com/customers/DE--1?include=notes` | Retrieve the customer with the reference `DE--1` and their notes. |

### Response

The response contains the same attributes as [Retrieve customers](#retrieve-customers), without the `pagination` object.

An anonymized customer is no longer retrievable by reference and returns `404` with the error code `1201`. To read an anonymized record, retrieve the collection with `filter[customers.includeAnonymized]=1`.

## Create a customer

To create a customer, send the request:

***
`POST` **/customers**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/customers`

```json
{
    "data": {
        "type": "customers",
        "attributes": {
            "email": "spencor.hopkin@acme.com",
            "salutation": "Mr",
            "firstName": "Spencor",
            "lastName": "Hopkin",
            "storeName": "DE",
            "sendPasswordToken": true
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| email | String | &check; | Email address of the customer. Must not exceed 100 characters. Uniqueness is validated case-insensitively. |
| salutation | String | &check; | Salutation of the customer. One of `Mr`, `Mrs`, `Dr`, `Ms`, `n/a`. |
| firstName | String | &check; | First name of the customer. Must not exceed 100 characters or contain `:`, `/`, `<`, or `>`. |
| lastName | String | &check; | Last name of the customer. Must not exceed 100 characters or contain `:`, `/`, `<`, or `>`. |
| gender | String |  | Gender of the customer. One of `Male`, `Female`. |
| dateOfBirth | String |  | Date of birth of the customer, in the `YYYY-MM-DD` format. |
| phone | String |  | Phone number of the customer. Must not exceed 255 characters. |
| company | String |  | Company label of the customer. Must not exceed 100 characters. |
| localeName | String |  | Locale to assign to the customer. Must not exceed 15 characters. If you omit it, the customer receives the current locale. |
| storeName | String |  | Store context for outgoing mail templates. Must not exceed 255 characters. Required when `sendPasswordToken` is `true`. |
| sendPasswordToken | Boolean |  | Sends a password-restore mail so that the customer sets their own password. Requires `storeName`. |
| skipSendingRegistrationToken | Boolean |  | Suppresses the registration-confirmation mail that customer registration sends by default. |

{% info_block infoBox "Setting a password" %}

The resource has no `password` attribute. Sending `sendPasswordToken` with `storeName` is the only way to give a customer a password through this API, which mirrors the **Send password token through email** checkbox in the Back Office. Sending `sendPasswordToken` without `storeName` returns `422` with the error code `1204`.

{% endinfo_block %}

`sendPasswordToken` and `skipSendingRegistrationToken` are write-only. The response does not echo them back.

### Response

Response sample:

```json
{
    "data": {
        "type": "customers",
        "id": "DE--42",
        "attributes": {
            "customerReference": "DE--42",
            "email": "spencor.hopkin@acme.com",
            "salutation": "Mr",
            "firstName": "Spencor",
            "lastName": "Hopkin",
            "storeName": "DE",
            "registered": null,
            "createdAt": "2026-09-04 10:06:00.000000",
            "updatedAt": "2026-09-04 10:06:00.000000",
            "anonymizedAt": null
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customers/DE--42"
        }
    }
}
```

The database assigns the `customerReference` that addresses the customer from now on. `registered` stays `null` until the customer confirms the registration.

## Edit a customer

To update a customer, send the request:

***
`PATCH` {% raw %}**/customers/*{{customer_reference}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer to update. To get it, [retrieve customers](#retrieve-customers). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/customers/DE--1`

```json
{
    "data": {
        "type": "customers",
        "id": "DE--1",
        "attributes": {
            "firstName": "Spencer"
        }
    }
}
```

The request accepts the same writable attributes as [Create a customer](#create-a-customer), and all of them are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

### Response

The response contains the updated customer, with the same attributes as [Retrieve a customer](#retrieve-a-customer).

## Anonymize a customer

To anonymize a customer, send the request:

***
`DELETE` {% raw %}**/customers/*{{customer_reference}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer to anonymize. To get it, [retrieve customers](#retrieve-customers). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/customers/DE--1`

### Response

A successful request returns the `204 No Content` status code with an empty body.

{% info_block warningBox "Anonymization is not deletion" %}

This endpoint anonymizes the customer to satisfy the right to erasure. The record is retained, `anonymizedAt` is set, and the personal data is scrubbed. The customer is no longer retrievable by reference, and the collection returns the record only with `filter[customers.includeAnonymized]=1`. There is no endpoint that deletes a customer row.

{% endinfo_block %}

## Other management options

- [Backend API: Manage customer addresses](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-addresses.html)
- [Backend API: Manage customer notes](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-notes.html)

## Possible errors

| CODE  | REASON |
| --- | --- |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1201 | No customer matches the given reference. |
| 1202 | The customer was rejected. For example, the email address is already in use. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1204 | `sendPasswordToken` was sent without `storeName`. |
| 1208 | The given store does not exist. The error message lists the available stores. |
| 1209 | The given locale does not exist. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
