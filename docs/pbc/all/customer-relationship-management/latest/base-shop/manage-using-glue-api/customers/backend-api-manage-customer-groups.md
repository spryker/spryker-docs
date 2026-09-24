---
title: "Backend API: Manage customer groups"
description: Learn how to retrieve, create, update, and delete customer groups, and how to manage their members, in your Spryker shop using the Spryker Backend API.
last_updated: Sep 24, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage customer groups using the Backend API. You can use these endpoints to build Back Office extensions, CRM and marketing automation integrations, and segmentation pipelines.

A customer group is a named segment of customers. Discounts and other shop rules target a group, so moving a customer in or out of one changes what that customer sees. A customer can belong to any number of groups at the same time.

Customer groups are addressed by `uuid`. The internal database identifier is never exposed. The uuid is derived from the group id, so it is stable for the lifetime of the group — renaming the group does not change it.

The group itself and its members are managed through two resources: `/customer-groups` carries the name and description, and `/customer-groups/{uuid}/customers` carries the members.

## Installation

These endpoints are provided by API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

{% info_block warningBox "Backfill the uuids of existing customer groups" %}

The `uuid` column is new on `spy_customer_group`, and it is stamped only when a row is saved. Reads never backfill it.

If your installation had customer groups before the upgrade, generate the missing uuids once:

```bash
docker/sdk console uuid:generate CustomerGroup spy_customer_group
```

A single row with a `NULL` uuid makes `GET /customer-groups` fail with `400` for the whole collection, not only for that row. The command is idempotent — it touches only the rows where the column is still `NULL` — so it is safe to repeat and safe to add to a deployment recipe after `propel:migrate`.

{% endinfo_block %}

## Retrieve customer groups

To retrieve a paginated collection of customer groups, send the request:

***
`GET` **/customer-groups**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to any. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |
| q | Free-text search, matched against the name and the description of the group. A group matches when either of them matches. | Any string. |
| filter[customer-groups.name] | Filters the collection by an exact name. The comparison ignores case. | Any group name. |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | name, createdAt |

The free-text search and the name filter are combined with `AND`, so each one you add narrows the result further. A name that no group uses returns an empty collection rather than an error.

Sorting by a field that is not on the list returns `400` with the error code `1203`, and the error message names the supported fields. When you pass several fields, the second one decides the order only where the first one ties.

The members of a group are neither part of this response nor available as an `include`. To read them, see [Retrieve the customers of a customer group](#retrieve-the-customers-of-a-customer-group).

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customer-groups` | Retrieve the first page of customer groups. |
| `GET https://glue-backend.mysprykershop.com/customer-groups?page[limit]=50&page[offset]=100` | Retrieve 50 customer groups, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/customer-groups?q=wholesale` | Retrieve customer groups whose name or description matches `wholesale`. |
| `GET https://glue-backend.mysprykershop.com/customer-groups?filter[customer-groups.name]=Wholesale partners` | Retrieve the customer group named `Wholesale partners`. |
| `GET https://glue-backend.mysprykershop.com/customer-groups?sort=-createdAt` | Retrieve customer groups, newest first. |

### Response

<details>
  <summary>Response sample: retrieve customer groups</summary>

```json
{
    "data": [
        {
            "type": "customer-groups",
            "id": "4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5",
            "attributes": {
                "uuid": "4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5",
                "name": "Wholesale partners",
                "description": "Customers eligible for wholesale pricing tiers.",
                "createdAt": "2026-09-10T08:15:00+00:00"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5"
            }
        },
        {
            "type": "customer-groups",
            "id": "7d3c5f81-6a24-5e93-8c07-1b2f4a6d9e30",
            "attributes": {
                "uuid": "7d3c5f81-6a24-5e93-8c07-1b2f4a6d9e30",
                "name": "Tier one",
                "description": null,
                "createdAt": "2026-09-12T11:42:31+00:00"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customer-groups/7d3c5f81-6a24-5e93-8c07-1b2f4a6d9e30"
            }
        }
    ],
    "meta": {
        "pagination": {
            "numFound": 12,
            "currentPage": 1,
            "maxPage": 2,
            "currentItemsPerPage": 10
        }
    },
    "links": {
        "self": "https://glue-backend.mysprykershop.com/customer-groups",
        "first": "https://glue-backend.mysprykershop.com/customer-groups?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/customer-groups?page[limit]=10&page[offset]=10",
        "next": "https://glue-backend.mysprykershop.com/customer-groups?page[limit]=10&page[offset]=10"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique customer group identifier. Addresses the group in every operation. |
| name | String | Name of the customer group. Unique across all customer groups. |
| description | String | Free-text note about what the group is for. |
| createdAt | String | Date and time the group was created, in ISO 8601. Read-only. |

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

## Retrieve a customer group

To retrieve a single customer group, send the request:

***
`GET` {% raw %}**/customer-groups/*{{customer_group_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | Uuid of the customer group to retrieve. To get it, [retrieve customer groups](#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5`

### Response

The response contains the same attributes as [Retrieve customer groups](#retrieve-customer-groups), without the `meta.pagination` object.

If no group matches the uuid, the endpoint returns `404` with the error code `1222`.

## Create a customer group

To create a customer group, send the request:

***
`POST` **/customer-groups**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

You can create an empty group and fill it later, or assign its members in the same request.

Request sample: create an empty customer group

`POST https://glue-backend.mysprykershop.com/customer-groups`

```json
{
    "data": {
        "type": "customer-groups",
        "attributes": {
            "name": "Wholesale partners",
            "description": "Customers eligible for wholesale pricing tiers."
        }
    }
}
```

Request sample: create a customer group with members

`POST https://glue-backend.mysprykershop.com/customer-groups`

```json
{
    "data": {
        "type": "customer-groups",
        "attributes": {
            "name": "Wholesale partners",
            "description": "Customers eligible for wholesale pricing tiers.",
            "customerReferences": [
                "DE--1",
                "DE--2"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Name of the customer group. Must not be blank, must not exceed 70 characters, and must not already be taken. |
| description | String |  | Free-text note about what the group is for. Must not exceed 255 characters. |
| customerReferences | Array |  | References of the customers to assign to the new group. At most 1000 per request, with no duplicates, and each reference must not exceed 255 characters. Omit it, or send an empty array, to create the group empty. |

Names are compared without regard to case: with a group named `Wholesale partners` already present, `WHOLESALE PARTNERS` is rejected with `422` and the error code `1223`.

Every customer reference must belong to an existing customer. If any of them is unknown, the endpoint rejects the whole request and creates no group. The response returns `422` with the error code `1224` and one `errors[]` entry per unknown reference, so a single request tells you every reference you need to correct.

The customer accounts themselves are neither read back nor modified, and no mail is sent.

{% info_block infoBox "Assigning more than 1000 customers" %}

`customerReferences` is capped at 1000 entries per request. To fill a larger group, create it with the first batch and add the rest with [Add customers to a customer group](#add-customers-to-a-customer-group), which you can call as often as you need.

The cap applies to writing only. [Retrieve the customers of a customer group](#retrieve-the-customers-of-a-customer-group) is paginated, so it is not limited to 1000.

{% endinfo_block %}

### Response

A successful request returns the `201 Created` status code.

Response sample:

```json
{
    "data": {
        "type": "customer-groups",
        "id": "4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5",
        "attributes": {
            "uuid": "4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5",
            "name": "Wholesale partners",
            "description": "Customers eligible for wholesale pricing tiers.",
            "createdAt": "2026-09-24T09:05:12+00:00"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5"
        }
    }
}
```

`customerReferences` is write-only and is never returned. To confirm the assignment, see [Retrieve the customers of a customer group](#retrieve-the-customers-of-a-customer-group).

## Edit a customer group

To update a customer group, send the request:

***
`PATCH` {% raw %}**/customer-groups/*{{customer_group_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | Uuid of the customer group to update. To get it, [retrieve customer groups](#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5`

```json
{
    "data": {
        "type": "customer-groups",
        "id": "4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5",
        "attributes": {
            "name": "Wholesale partners EU",
            "description": "Customers eligible for wholesale pricing tiers in the EU."
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String |  | New name of the customer group. Must not be blank, must not exceed 70 characters, and must not be taken by another group. |
| description | String |  | New free-text note about what the group is for. Must not exceed 255 characters. |

The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

Renaming a group does not change its uuid, so links and integrations that address the group keep working. Sending the group its own current name succeeds and changes nothing. Sending a name another group already uses, in any casing, returns `422` with the error code `1223`.

{% info_block infoBox "Membership is not managed here" %}

This endpoint ignores `customerReferences`. Sending it changes nothing, and sending an empty array does not clear the group.

To change who belongs to the group, use the assignment endpoints:

<ul>
<li><a href="#add-customers-to-a-customer-group">Add customers to a customer group</a> adds members without removing any.</li>
<li><a href="#replace-the-customers-of-a-customer-group">Replace the customers of a customer group</a> sets the complete list of members.</li>
<li><a href="#remove-a-customer-from-a-customer-group">Remove a customer from a customer group</a> removes one member.</li>
</ul>

{% endinfo_block %}

### Response

The response contains the updated customer group, with the same attributes as [Retrieve a customer group](#retrieve-a-customer-group).

## Delete a customer group

To delete a customer group, send the request:

***
`DELETE` {% raw %}**/customer-groups/*{{customer_group_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | Uuid of the customer group to delete. To get it, [retrieve customer groups](#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5`

### Response

A successful request returns the `204 No Content` status code with an empty body.

The assignments of the group go with it. The customers themselves are kept, along with every other group they belong to.

{% info_block warningBox "Review the discounts that target the group" %}

Discounts and other rules that target a deleted group simply stop matching it. They are neither deleted nor rewritten, so a discount can go on running with a condition that can never be met again. Review them after you delete a group.

{% endinfo_block %}

## Retrieve the customers of a customer group

To retrieve a paginated collection of the customers assigned to a group, send the request:

***
`GET` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/customers**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | Uuid of the customer group whose members you want to retrieve. To get it, [retrieve customer groups](#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to any. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |
| q | Free-text search, matched against the email address, the first name, and the last name of the member. A member matches when any of them matches. | Any string. |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | email, firstName, lastName |

The collection lists only the members of the group in the URL. A customer who belongs to several groups appears in each of them.

Sorting by a field that is not on the list returns `400` with the error code `1203`, and the error message names the supported fields.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers` | Retrieve the first page of members. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers?q=sonia` | Retrieve the members whose email address, first name, or last name matches `sonia`. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers?sort=lastName,firstName` | Retrieve the members, ordered by last name and then by first name. |

### Response

<details>
  <summary>Response sample: retrieve the customers of a customer group</summary>

```json
{
    "data": [
        {
            "type": "customer-group-customers",
            "id": "DE--1",
            "attributes": {
                "customerReference": "DE--1",
                "email": "spencor.hopkins@acme.com",
                "firstName": "Spencor",
                "lastName": "Hopkins"
            }
        },
        {
            "type": "customer-group-customers",
            "id": "DE--2",
            "attributes": {
                "customerReference": "DE--2",
                "email": "jane.smith@acme.com",
                "firstName": "Jane",
                "lastName": "Smith"
            }
        }
    ],
    "meta": {
        "pagination": {
            "numFound": 2,
            "currentPage": 1,
            "maxPage": 1,
            "currentItemsPerPage": 10
        }
    },
    "links": {
        "self": "https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers",
        "first": "https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers?page[limit]=10&page[offset]=0"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| customerReference | String | Reference of the customer. Addresses the member when you remove it from the group. |
| email | String | Email address of the member. |
| firstName | String | First name of the member. |
| lastName | String | Last name of the member. |

All four attributes are read-only. To change customer data, see [Backend API: Manage customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html).

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

If no group matches the uuid, the endpoint returns `404` with the error code `1222`.

## Add customers to a customer group

To add customers to a group without removing the members it already has, send the request:

***
`POST` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/customers**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | Uuid of the customer group to add the customers to. To get it, [retrieve customer groups](#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers`

```json
{
    "data": {
        "type": "customer-group-customers",
        "attributes": {
            "customerReferences": [
                "DE--1",
                "DE--2"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| customerReferences | Array | &check; | References of the customers to add. Must contain at least one reference and at most 1000, with no duplicates, and each reference must not exceed 255 characters. |

The members the group already has stay as they are. References that are already members are skipped, so sending the same request twice is safe and changes nothing the second time.

The operation is all-or-nothing: if any reference is unknown, nothing is added, and the response returns `422` with the error code `1224` and one `errors[]` entry per unknown reference.

The customer accounts themselves are neither read back nor modified, and no mail is sent.

### Response

A successful request returns the `204 No Content` status code with an empty body. To read the resulting membership, see [Retrieve the customers of a customer group](#retrieve-the-customers-of-a-customer-group).

## Replace the customers of a customer group

To set the complete list of members of a group in one call, send the request:

***
`PATCH` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/customers**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | Uuid of the customer group whose members you want to replace. To get it, [retrieve customer groups](#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers`

```json
{
    "data": {
        "type": "customer-group-customers",
        "attributes": {
            "customerReferences": [
                "DE--1",
                "DE--3"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| customerReferences | Array | &check; | The complete new list of members. At most 1000 references, with no duplicates, and each reference must not exceed 255 characters. An empty array removes every member. |

The references you send become the complete new set of members, so include every customer the group is to keep. Customers missing from the list are removed from the group; their accounts, and their assignments to other groups, stay untouched.

An empty array removes every member and keeps the group itself, which is how you clear a group without deleting it.

The operation is all-or-nothing: if any reference is unknown or the list contains duplicates, the membership stays exactly as it was, and the response returns `422` with the error code `1224` and one `errors[]` entry per unknown reference. Sending the same list twice leaves the same members.

{% info_block warningBox "customerReferences is required here" %}

Unlike a `PATCH` on the group itself, omitting `customerReferences` is not a way to leave the membership alone. This operation exists only to set the membership, so a body without it is rejected with `422` rather than read as an empty list. The membership stays as it was.

To leave the membership alone, do not send this request at all.

{% endinfo_block %}

### Response

A successful request returns the `204 No Content` status code with an empty body. To read the resulting membership, see [Retrieve the customers of a customer group](#retrieve-the-customers-of-a-customer-group).

## Remove a customer from a customer group

To remove one customer from a group, send the request:

***
`DELETE` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/customers/*{{customer_reference}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | Uuid of the customer group to remove the customer from. To get it, [retrieve customer groups](#retrieve-customer-groups). |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer to remove. To get it, [retrieve the customers of a customer group](#retrieve-the-customers-of-a-customer-group). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/customer-groups/4b1e6a02-9f37-5c48-b6d1-2e8a70c9f4a5/customers/DE--1`

### Response

A successful request returns the `204 No Content` status code with an empty body.

The customer account is kept, and so is every other group the customer belongs to.

If no group matches the uuid, the endpoint returns `404` with the error code `1222`. If the group exists but the customer is not one of its members, the endpoint returns `404` with the error code `1225`.

## Other management options

- [Backend API: Manage customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html)
- [Backend API: Manage customer addresses](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-addresses.html)
- [Backend API: Manage customer notes](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-notes.html)
- [Backend API: Manage customer access](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/backend-api-manage-customer-access.html)
- [Manage customer groups in the Back Office](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html)
- [Customer groups overview](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html)

## Possible errors

| CODE  | REASON |
| --- | --- |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1202 | The customer group request was rejected by a validation rule that has no more specific code. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1222 | No customer group matches the given uuid. |
| 1223 | The name is already taken by another customer group. Names are compared without regard to case. |
| 1224 | No customer matches one of the given `customerReferences`. Each unknown reference gets its own `errors[]` entry. |
| 1225 | The customer is not a member of the customer group. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
