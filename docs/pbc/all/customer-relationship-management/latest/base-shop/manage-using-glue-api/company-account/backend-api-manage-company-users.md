---
title: "Backend API: Manage company users"
description: Learn how to retrieve, create, update, activate, and delete company users in your Spryker shop using the Spryker Backend API.
last_updated: Sep 16, 2026
template: glue-api-storefront-guide-template
---

This document describes how to manage company users using the Backend API.

A company user links a customer to one business unit of one company and carries the roles that define what that customer may do there. A customer can have several company users - one per company and business unit combination - and one of them can be marked as their default.

Company users are addressed by `uuid`. The internal database identifier is never exposed.

{% info_block infoBox "Company users and customers" %}

This resource does not manage customers. It creates, moves, and removes the link between a customer and a business unit. To manage the customer record itself, see [Backend API: Manage customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html).

{% endinfo_block %}

## Installation

These endpoints are provided by API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

## Retrieve company users

To retrieve a paginated collection of company users across all companies, send the request:

***
`GET` **/company-users**
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
| q | Free-text search, matched against the first name and last name of the customer. | Any string. |
| filter[company-users.customerReference] | Filters the collection by an exact customer reference. | Any customer reference. |
| filter[company-users.companyUuid] | Filters the collection by company. | Any company uuid. |
| filter[company-users.companyBusinessUnitUuid] | Filters the collection by business unit. | Any business unit uuid. |
| filter[company-users.isActive] | Filters the collection by activation status. | `true`, `false` |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | companyName, customerEmail, customerFirstName, customerLastName |

Filters are combined with `AND`, so each filter you add narrows the result further. An unknown company uuid or business unit uuid returns an empty collection rather than an error.

The collection always excludes company users whose customer has been anonymized.

Sorting by a field that is not on the list returns `400` with the error code `1203`, and the error message names the supported fields.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/company-users` | Retrieve the first page of company users. |
| `GET https://glue-backend.mysprykershop.com/company-users?page[limit]=50&page[offset]=100` | Retrieve 50 company users, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/company-users?q=spencor` | Retrieve company users whose customer first name or last name matches `spencor`. |
| `GET https://glue-backend.mysprykershop.com/company-users?filter[company-users.customerReference]=DE--1` | Retrieve all company users of the customer `DE--1`. |
| `GET https://glue-backend.mysprykershop.com/company-users?filter[company-users.companyUuid]=3f2a1c9e-5d84-5b21-9f60-8a1c7d4e2b03&filter[company-users.isActive]=true` | Retrieve the active company users of one company. |
| `GET https://glue-backend.mysprykershop.com/company-users?sort=-customerLastName` | Retrieve company users, ordered by customer last name in descending order. |

### Response

<details>
  <summary>Response sample: retrieve company users</summary>

```json
{
    "data": [
        {
            "type": "company-users",
            "id": "f9c64276-a8b9-57f1-8fb3-a19c045dc85e",
            "attributes": {
                "uuid": "f9c64276-a8b9-57f1-8fb3-a19c045dc85e",
                "customerReference": "DE--1",
                "companyUuid": "3f2a1c9e-5d84-5b21-9f60-8a1c7d4e2b03",
                "companyBusinessUnitUuid": "9c81b4f0-2e73-5a18-bc45-6d90e3f7a218",
                "companyRoleUuids": [
                    "aa10f3c5-7b62-5e49-8d31-04f5c9b28e77"
                ],
                "isActive": true,
                "isDefault": true,
                "customer": {
                    "email": "spencor.hopkin@acme.com",
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "lastName": "Hopkin",
                    "gender": "Male",
                    "dateOfBirth": "1990-01-15",
                    "phone": "+49123456789"
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/company-users/f9c64276-a8b9-57f1-8fb3-a19c045dc85e"
            }
        },
        {
            "type": "company-users",
            "id": "c7b3e8d1-4f29-5a60-b812-7d04e6a9f135",
            "attributes": {
                "uuid": "c7b3e8d1-4f29-5a60-b812-7d04e6a9f135",
                "customerReference": "DE--2",
                "companyUuid": "3f2a1c9e-5d84-5b21-9f60-8a1c7d4e2b03",
                "companyBusinessUnitUuid": "9c81b4f0-2e73-5a18-bc45-6d90e3f7a218",
                "companyRoleUuids": [
                    "aa10f3c5-7b62-5e49-8d31-04f5c9b28e77",
                    "bb21e4d6-8c73-5f10-9a42-15d6e0c37f88"
                ],
                "isActive": false,
                "isDefault": false,
                "customer": {
                    "email": "jane.smith@acme.com",
                    "salutation": "Ms",
                    "firstName": "Jane",
                    "lastName": "Smith",
                    "gender": "Female",
                    "dateOfBirth": null,
                    "phone": null
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/company-users/c7b3e8d1-4f29-5a60-b812-7d04e6a9f135"
            }
        }
    ],
    "meta": {
        "pagination": {
            "numFound": 24,
            "currentPage": 1,
            "maxPage": 3,
            "currentItemsPerPage": 10
        }
    },
    "links": {
        "self": "https://glue-backend.mysprykershop.com/company-users",
        "first": "https://glue-backend.mysprykershop.com/company-users?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/company-users?page[limit]=10&page[offset]=20",
        "next": "https://glue-backend.mysprykershop.com/company-users?page[limit]=10&page[offset]=10"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique company user identifier. Addresses the company user in every operation. |
| customerReference | String | Reference of the customer this company user belongs to. |
| companyUuid | String | Uuid of the company this company user belongs to. |
| companyBusinessUnitUuid | String | Uuid of the business unit this company user belongs to. |
| companyRoleUuids | Array | Uuids of the company roles assigned to this company user. |
| isActive | Boolean | Defines whether this company user can currently act on behalf of the company. |
| isDefault | Boolean | Defines whether this is the company user its customer lands in after logging in. |
| customer | Object | Identification details of the customer. For the full customer record, see [Backend API: Manage customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html). |
| customer.email | String | Email address of the customer, also used as the Storefront username. |
| customer.salutation | String | Salutation of the customer. |
| customer.firstName | String | First name of the customer. |
| customer.lastName | String | Last name of the customer. |
| customer.gender | String | Gender of the customer. |
| customer.dateOfBirth | String | Date of birth of the customer, in the `YYYY-MM-DD` format. |
| customer.phone | String | Phone number of the customer. |

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

## Retrieve a company user

To retrieve a single company user, send the request:

***
`GET` {% raw %}**/company-users/*{{company_user_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_user_uuid}}***{% endraw %} | Uuid of the company user to retrieve. To get it, [retrieve company users](#retrieve-company-users). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/company-users/f9c64276-a8b9-57f1-8fb3-a19c045dc85e`

### Response

The response contains the same attributes as [Retrieve company users](#retrieve-company-users), without the `meta.pagination` object.

This endpoint also returns inactive company users, as well as company users of companies that are themselves inactive or not yet approved, so that you can inspect a company user before you reactivate it.

A company user whose customer has been anonymized is not returned, matching the collection. Requesting one returns `404` with the error code `1216`.

## Create a company user

To create a company user, send the request:

***
`POST` **/company-users**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

You can create a company user for an existing customer or create the customer together with the company user.

Request sample: create a company user for an existing customer

`POST https://glue-backend.mysprykershop.com/company-users`

```json
{
    "data": {
        "type": "company-users",
        "attributes": {
            "customerReference": "DE--1",
            "companyUuid": "3f2a1c9e-5d84-5b21-9f60-8a1c7d4e2b03",
            "companyBusinessUnitUuid": "9c81b4f0-2e73-5a18-bc45-6d90e3f7a218",
            "companyRoleUuids": [
                "aa10f3c5-7b62-5e49-8d31-04f5c9b28e77"
            ]
        }
    }
}
```

Request sample: create a company user together with a customer

`POST https://glue-backend.mysprykershop.com/company-users`

```json
{
    "data": {
        "type": "company-users",
        "attributes": {
            "companyUuid": "3f2a1c9e-5d84-5b21-9f60-8a1c7d4e2b03",
            "companyBusinessUnitUuid": "9c81b4f0-2e73-5a18-bc45-6d90e3f7a218",
            "companyRoleUuids": [
                "aa10f3c5-7b62-5e49-8d31-04f5c9b28e77"
            ],
            "customer": {
                "email": "spencor.hopkin@acme.com",
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "sendPasswordToken": true
            }
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| companyUuid | String | &check; | Uuid of the company to assign the company user to. Must be a valid uuid of an existing company. |
| companyBusinessUnitUuid | String | &check; | Uuid of the business unit to assign the company user to. Must be a valid uuid of a business unit that belongs to `companyUuid`. |
| companyRoleUuids | Array | &check; | Uuids of the company roles to assign. Must contain at least one role, and every role must belong to `companyUuid`. |
| customerReference | String |  | Reference of an existing customer. Must not exceed 255 characters. Required unless you send `customer`. |
| customer | Object |  | Details of the customer to create along with the company user. Required unless you send `customerReference`. |
| customer.email | String |  | Email address of the customer. Required when you create a customer. Must not exceed 100 characters and must not already be in use. |
| customer.salutation | String |  | Salutation of the customer. Required when you create a customer. One of `Mr`, `Mrs`, `Dr`, `Ms`, `n/a`. |
| customer.firstName | String |  | First name of the customer. Required when you create a customer. Must not exceed 100 characters or contain `:`, `/`, `<`, or `>`. |
| customer.lastName | String |  | Last name of the customer. Required when you create a customer. Must not exceed 100 characters or contain `:`, `/`, `<`, or `>`. |
| customer.gender | String |  | Gender of the customer. One of `Male`, `Female`. |
| customer.dateOfBirth | String |  | Date of birth of the customer, in the `YYYY-MM-DD` format. |
| customer.phone | String |  | Phone number of the customer. Must not exceed 255 characters. |
| customer.sendPasswordToken | Boolean |  | Sends the customer a mail that lets them choose their own password. |

{% info_block infoBox "Choosing between customerReference and customer" %}

`customerReference` is the only place an existing customer is named. When you send it, the endpoint ignores the `customer` object entirely, reads none of the customer data back, changes nothing about the customer, and sends no mail.

To create the customer at the same time, omit `customerReference` and send a `customer` object. The new customer receives the usual registration mail, and a password-reset mail as well if you set `customer.sendPasswordToken` to `true`. The resource never accepts a password.

If you send neither, the request returns `422` with the error code `1220`.

{% endinfo_block %}

The endpoint checks the company, business unit, and roles against each other before it saves anything: the company must exist, the business unit must belong to that company, every role must belong to that company, and the customer must not already have a company user in that business unit. If any check fails, the endpoint rejects the whole request and writes nothing — including the new customer account.

A customer can have several company users, one per company and business unit combination. Sending this request again for the same customer with a different business unit creates a second, independent company user and leaves the existing ones untouched. To point an existing company user at a different business unit, use [Edit a company user](#edit-a-company-user) instead.

{% info_block warningBox "Status of a new company user" %}

A new company user is always created active (`isActive` is `true`) and not default (`isDefault` is `false`), even when the customer has no other company user. No company user becomes the default automatically. To set one, use [Set a default company user](#set-a-default-company-user).

{% endinfo_block %}

### Response

Response sample:

```json
{
    "data": {
        "type": "company-users",
        "id": "f9c64276-a8b9-57f1-8fb3-a19c045dc85e",
        "attributes": {
            "uuid": "f9c64276-a8b9-57f1-8fb3-a19c045dc85e",
            "customerReference": "DE--1",
            "companyUuid": "3f2a1c9e-5d84-5b21-9f60-8a1c7d4e2b03",
            "companyBusinessUnitUuid": "9c81b4f0-2e73-5a18-bc45-6d90e3f7a218",
            "companyRoleUuids": [
                "aa10f3c5-7b62-5e49-8d31-04f5c9b28e77"
            ],
            "isActive": true,
            "isDefault": false,
            "customer": {
                "email": "spencor.hopkin@acme.com",
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "gender": "Male",
                "dateOfBirth": "1990-01-15",
                "phone": "+49123456789"
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/company-users/f9c64276-a8b9-57f1-8fb3-a19c045dc85e"
        }
    }
}
```

## Edit a company user

To update a company user, send the request:

***
`PATCH` {% raw %}**/company-users/*{{company_user_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_user_uuid}}***{% endraw %} | Uuid of the company user to update. To get it, [retrieve company users](#retrieve-company-users). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/company-users/f9c64276-a8b9-57f1-8fb3-a19c045dc85e`

```json
{
    "data": {
        "type": "company-users",
        "id": "f9c64276-a8b9-57f1-8fb3-a19c045dc85e",
        "attributes": {
            "companyBusinessUnitUuid": "9c81b4f0-2e73-5a18-bc45-6d90e3f7a218",
            "companyRoleUuids": [
                "aa10f3c5-7b62-5e49-8d31-04f5c9b28e77",
                "bb21e4d6-8c73-5f10-9a42-15d6e0c37f88"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| companyUuid | String |  | Uuid of the company to move the company user to. Must be a valid uuid of an existing company. |
| companyBusinessUnitUuid | String |  | Uuid of the business unit to move the company user to. Must be a valid uuid of a business unit that belongs to the company the company user points at. |
| companyRoleUuids | Array |  | Uuids of the company roles to assign. Must contain at least one role, and every role must belong to the company the company user points at. |

The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value. The list of roles you send becomes the complete new set, so include every role the company user is to keep.

The same checks as on create apply: the business unit and every role must belong to the company the company user now points at, and the customer must not already have another company user in the target business unit.

{% info_block infoBox "What this endpoint does not change" %}

This endpoint changes one company user and nothing else:

<ul>
<li>The other company users of the customer are neither read nor modified. Moving a company user to a different business unit does not create a second one. To give the customer an additional company user, use <a href="#create-a-company-user">Create a company user</a>.</li>
<li>No customer data is written. The endpoint ignores anything you send inside <code>customer</code>, and <code>customerReference</code> as well: a company user cannot be moved to a different customer.</li>
<li><code>isActive</code> and <code>isDefault</code> are read-only here. To change them, use <a href="#activate-or-deactivate-a-company-user">Activate or deactivate a company user</a> and <a href="#set-a-default-company-user">Set a default company user</a>.</li>
</ul>

{% endinfo_block %}

### Response

The response contains the updated company user, with the same attributes as [Retrieve a company user](#retrieve-a-company-user).

## Activate or deactivate a company user

To activate or deactivate a company user, send the request:

***
`POST` {% raw %}**/company-users/*{{company_user_uuid}}*/set-status**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_user_uuid}}***{% endraw %} | Uuid of the company user to activate or deactivate. To get it, [retrieve company users](#retrieve-company-users). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/company-users/f9c64276-a8b9-57f1-8fb3-a19c045dc85e/set-status`

```json
{
    "data": {
        "type": "company-users",
        "attributes": {
            "isActive": false
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| isActive | Boolean | &check; | Send `true` to activate the company user and `false` to deactivate it. |

A deactivated company user is kept in full: the customer, the roles, and the business unit stay as they are. The customer can no longer use it to act on behalf of the company in the Storefront, and the company stops appearing in their company switcher. Activating the company user again restores it exactly as it was, and the other company users of the customer are never affected.

Sending the status a company user already has succeeds and changes nothing.

If the request body is missing or unparseable, or if `isActive` is absent or not a boolean, the endpoint returns `400` with the error code `1219`.

### Response

The response contains the updated company user, with the same attributes as [Retrieve a company user](#retrieve-a-company-user).

## Set a default company user

To set or unset a company user as the default of its customer, send the request:

***
`POST` {% raw %}**/company-users/*{{company_user_uuid}}*/set-default**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_user_uuid}}***{% endraw %} | Uuid of the company user to set or unset as the default. To get it, [retrieve company users](#retrieve-company-users). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/company-users/f9c64276-a8b9-57f1-8fb3-a19c045dc85e/set-default`

```json
{
    "data": {
        "type": "company-users",
        "attributes": {
            "isDefault": true
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| isDefault | Boolean | &check; | Send `true` to make this the default company user of its customer and `false` to unset it. |

The default is the company user its customer lands in when they log in, before they switch manually. A customer has at most one default, so setting one unsets the previous default in the same request.

Unsetting leaves the customer with no default at all — no other company user takes its place, and this company user is otherwise untouched. Unsetting a company user that is not the default succeeds and changes nothing; it never unsets the default of another company user.

Sending the state a company user already has succeeds and changes nothing.

If the request body is missing or unparseable, or if `isDefault` is absent or not a boolean, the endpoint returns `400` with the error code `1221`.

### Response

The response contains the updated company user, with the same attributes as [Retrieve a company user](#retrieve-a-company-user).

## Delete a company user

To delete a company user, send the request:

***
`DELETE` {% raw %}**/company-users/*{{company_user_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_user_uuid}}***{% endraw %} | Uuid of the company user to delete. To get it, [retrieve company users](#retrieve-company-users). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/company-users/f9c64276-a8b9-57f1-8fb3-a19c045dc85e`

### Response

A successful request returns the `204 No Content` status code with an empty body.

Everything the company user owns inside the company — shopping lists, shared carts, quote requests, and merchant relation requests — is cleaned up first, and then the company user itself is removed.

{% info_block warningBox "Deleting a company user does not delete the customer" %}

The customer is kept. They lose this company user, but their account, their data, and their other company users stay untouched, and you can give them a new company user afterwards.

To revoke access without deleting anything, deactivate the company user with [Activate or deactivate a company user](#activate-or-deactivate-a-company-user) instead.

{% endinfo_block %}

## Other management options

- [Backend API: Manage customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html)
- [Backend API: Manage customer addresses](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-addresses.html)
- [Backend API: Manage customer notes](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-notes.html)

## Possible errors

| CODE  | REASON |
| --- | --- |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1201 | No customer matches the reference given in `customerReference`. |
| 1202 | The company user was rejected. For example, the customer already has a company user in the target business unit, or the new customer account could not be created because the email address is already in use. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1213 | No company matches the given `companyUuid`. |
| 1216 | No company user matches the given uuid. |
| 1217 | No business unit matches the given `companyBusinessUnitUuid`. |
| 1218 | No company role matches one of the given `companyRoleUuids`. |
| 1219 | The `set-status` request body does not contain an `isActive` boolean. |
| 1220 | Neither `customerReference` nor a `customer` object with an email address was sent. |
| 1221 | The `set-default` request body does not contain an `isDefault` boolean. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
