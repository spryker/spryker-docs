---
title: "Backend API: Manage customer notes"
description: Learn how to retrieve and add customer notes in your Spryker shop using the Spryker Backend API.
last_updated: Sep 4, 2026
template: glue-api-storefront-guide-template
---

This document describes how to manage the notes of a customer using the Backend API. A note is an internal remark that a Back Office user records against a customer, such as the outcome of a phone call. Notes are a sub-resource of a customer, so every endpoint is addressed through the reference of the customer the note belongs to.

Notes are addressed by `uuid`. The internal database identifier is never exposed.

{% info_block infoBox "Notes are append-only" %}

The resource supports reading notes and adding notes. It has no update and no delete operation, so a customer note timeline is a permanent record. `PATCH` and `DELETE` requests to a note return `404`.

{% endinfo_block %}

## Installation

These endpoints are provided by API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

## Retrieve customer notes

To retrieve a paginated collection of the notes of a customer, send the request:

***
`GET` {% raw %}**/customers/*{{customer_reference}}*/notes**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer whose notes you want to retrieve. To get it, [retrieve customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html#retrieve-customers). |

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
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | createdAt, updatedAt, username |

Without a `sort` parameter, the collection returns the newest note first. Sorting by a field that is not on the list returns `400` with the error code `1203`, and the error message names the supported fields.

The collection does not accept filters.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customers/DE--1/notes` | Retrieve the first page of the notes of the customer `DE--1`, newest first. |
| `GET https://glue-backend.mysprykershop.com/customers/DE--1/notes?sort=createdAt` | Retrieve the notes of the customer `DE--1`, oldest first. |
| `GET https://glue-backend.mysprykershop.com/customers/DE--1/notes?page[limit]=50` | Retrieve up to 50 notes of the customer `DE--1`. |

### Response

<details>
  <summary>Response sample: retrieve customer notes</summary>

```json
{
    "data": [
        {
            "type": "notes",
            "id": "b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31",
            "attributes": {
                "uuid": "b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31",
                "customerReference": "DE--1",
                "message": "Called the customer about invoice 4711; they will pay by Friday.",
                "username": "Admin Spryker",
                "createdAt": "2026-08-31 10:06:00.000000",
                "updatedAt": "2026-08-31 10:06:00.000000",
                "pagination": {
                    "numFound": 2,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customers/DE--1/notes/b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31"
            }
        },
        {
            "type": "notes",
            "id": "c2a8d4e3-9b52-5d7f-8e81-3f6c9a1b5d42",
            "attributes": {
                "uuid": "c2a8d4e3-9b52-5d7f-8e81-3f6c9a1b5d42",
                "customerReference": "DE--1",
                "message": "Customer asked for the invoice to be reissued to the billing department.",
                "username": "Admin Spryker",
                "createdAt": "2026-08-29 14:22:00.000000",
                "updatedAt": "2026-08-29 14:22:00.000000"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customers/DE--1/notes/c2a8d4e3-9b52-5d7f-8e81-3f6c9a1b5d42"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/customers/DE--1/notes?page=1",
        "first": "https://glue-backend.mysprykershop.com/customers/DE--1/notes?page=1",
        "last": "https://glue-backend.mysprykershop.com/customers/DE--1/notes?page=1"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique note identifier. Addresses the note in every operation. |
| customerReference | String | Reference of the customer this note belongs to. |
| message | String | Text of the note. |
| username | String | Display name of the Back Office user who wrote the note. |
| createdAt | String | Date and time when the note was written. |
| updatedAt | String | Date and time when the note record was last touched. |

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

You can also retrieve the notes of a customer together with the customer. For more information, see [Retrieve a customer](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html#retrieve-a-customer).

## Retrieve a customer note

To retrieve a single note of a customer, send the request:

***
`GET` {% raw %}**/customers/*{{customer_reference}}*/notes/*{{note_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer the note belongs to. |
| {% raw %}***{{note_uuid}}***{% endraw %} | Uuid of the note to retrieve. To get it, [retrieve customer notes](#retrieve-customer-notes). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/customers/DE--1/notes/b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31`

### Response

The response contains the same attributes as [Retrieve customer notes](#retrieve-customer-notes), without the `pagination` object.

{% info_block infoBox "Notes of another customer" %}

A note is reachable only through the customer it belongs to. Requesting a note through a different customer reference returns `404` with the error code `1206`, exactly as an unknown uuid does, so the response never reveals that the note exists.

{% endinfo_block %}

## Add a customer note

To add a note to a customer, send the request:

***
`POST` {% raw %}**/customers/*{{customer_reference}}*/notes**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer to add the note to. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/customers/DE--1/notes`

```json
{
    "data": {
        "type": "notes",
        "attributes": {
            "message": "Called the customer about invoice 4711; they will pay by Friday."
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| message | String | &check; | Text of the note. Must not be blank, and must not exceed 65535 characters. |

{% info_block warningBox "The author comes from the access token" %}

Spryker attributes the note to the Back Office user whose access token you send, and resolves `username` from that token. You cannot set the author through the API: if you send `username` in the payload, the endpoint ignores it.

If the acting Back Office user cannot be resolved from the token, the request returns `401` with the error code `1207`.

{% endinfo_block %}

`message` is the only writable attribute of the resource.

### Response

Response sample:

```json
{
    "data": {
        "type": "notes",
        "id": "b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31",
        "attributes": {
            "uuid": "b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31",
            "customerReference": "DE--1",
            "message": "Called the customer about invoice 4711; they will pay by Friday.",
            "username": "Admin Spryker",
            "createdAt": "2026-09-04 10:06:00.000000",
            "updatedAt": "2026-09-04 10:06:00.000000"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customers/DE--1/notes/b1f7c3d2-8a41-5c6e-9d70-2e5b8f0a4c31"
        }
    }
}
```

## Other management options

- [Backend API: Manage customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html)
- [Backend API: Manage customer addresses](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-addresses.html)

## Possible errors

| CODE  | REASON |
| --- | --- |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1201 | No customer matches the given reference. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1206 | No note with the given uuid belongs to the given customer. |
| 1207 | The Back Office user acting on the request could not be resolved from the access token. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
