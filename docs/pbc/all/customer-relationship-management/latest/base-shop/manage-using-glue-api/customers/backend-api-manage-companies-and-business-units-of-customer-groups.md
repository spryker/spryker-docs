---
title: "Backend API: Manage companies and business units of customer groups"
description: Learn how to retrieve, add, replace, and remove the companies and business units that belong to a customer group in your Spryker shop using the Spryker Backend API.
last_updated: Oct 14, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage the company and business unit memberships of customer groups using the Backend API. You can use these endpoints to keep the membership of customer groups in sync from integrations, such as ERP and CRM systems or partner administration tools.

Besides customers, a customer group can have companies and business units as members. A company or a business unit can belong to any number of groups at the same time. These are the same memberships that you manage on the **Companies** and **Business Units** tabs of a customer group in the Back Office.

Company and business unit memberships are stored and managed with the group, and they do not affect discounts, prices, catalogs, or the Storefront. Discounts and other rules that target a customer group evaluate only the customers of the group.

The memberships are managed through two resources: `/customer-groups/{uuid}/companies` carries the member companies, and `/customer-groups/{uuid}/company-business-units` carries the member business units. Both address the customer group by its `uuid`. To manage the group itself and its customers, see [Backend API: Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html).

## Installation

These endpoints are provided by the B2B Customer Groups feature. To install the feature, see [Install the B2B Customer Groups feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html).

The endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

If your project had customer groups before it installed the customer group UUIDs, generate the missing UUIDs as described in [Backend API: Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#installation).

## How company and business unit memberships relate

A customer group keeps its companies and its business units as two independent sets of members. Changing one set never changes the other:

- Adding a company does not add its business units. Adding a business unit does not add its company, its parent or child business units, or its company users.
- Removing a company keeps the business units of that company that belong to the group.
- Removing the last business unit of a company keeps the membership of the company.
- Replacing the companies of a group leaves its business units as they are, and replacing the business units leaves its companies as they are.

As a result, a group can have business units of a company without having the company itself, and it can have business units of several companies.

The endpoints change only memberships. The companies, business units, and company users themselves are never modified, and the customers of the group stay as they are.

A membership is removed automatically when its customer group, company, or business unit is deleted.

## Retrieve the companies of a customer group

To retrieve a paginated collection of the companies assigned to a group, send the request:

***
`GET` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/companies**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group whose companies you want to retrieve. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to `100`. Defaults to `10`. A larger value returns 100 items per page. |
| page[offset] | Number of items to skip before the page begins. The offset is rounded down to a multiple of `page[limit]`, so every response is a whole page. | From `0` to any. Defaults to `0`. |
| q | Free-text search, matched against the company name. A company matches when its name contains the search text. The comparison ignores case. | Any string. |
| sort | Sorts the collection by the company name. Prefix the field with `-` to sort in descending order. | name, -name |
| include | Adds the `companies` relationship to each item and returns the companies in `included`. | companies |

Without `sort`, the companies are listed in the order in which they were created. Companies with the same name keep a fixed order, so paging through the collection never repeats or skips a company.

Sorting by any other field returns `400` with the error code `1203`, and the error message names the supported field. The collection supports no filters: a `filter` parameter returns `400` with the error code `1215`.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies` | Retrieve the first page of companies. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies?sort=name&page[limit]=2` | Retrieve the first two companies, ordered by name. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies?q=hotel` | Retrieve the companies whose name contains `hotel`. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies?include=companies` | Retrieve the companies, with the full company resources in `included`. |

### Response

<details>
  <summary>Response sample: retrieve the companies of a customer group, ordered by name, two per page</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies?sort=name",
        "first": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies?sort=name&page[limit]=2&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies?sort=name&page[limit]=2&page[offset]=8",
        "next": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies?sort=name&page[limit]=2&page[offset]=2"
    },
    "meta": {
        "pagination": {
            "numFound": 9,
            "currentPage": 1,
            "maxPage": 5,
            "currentItemsPerPage": 2
        }
    },
    "data": [
        {
            "id": "59b6c025-cc00-54ca-b101-191391adf2af",
            "type": "customer-group-companies",
            "attributes": {
                "companyUuid": "59b6c025-cc00-54ca-b101-191391adf2af",
                "companyName": "BoB-Hotel Jim"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies/59b6c025-cc00-54ca-b101-191391adf2af"
            }
        },
        {
            "id": "94f34a90-4217-5165-8a92-1332e4dd011b",
            "type": "customer-group-companies",
            "attributes": {
                "companyUuid": "94f34a90-4217-5165-8a92-1332e4dd011b",
                "companyName": "BoB-Hotel Ku'damm"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies/94f34a90-4217-5165-8a92-1332e4dd011b"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| companyUuid | String | UUID of the member company. It is also the `id` of the membership, so it addresses the membership when you retrieve it or remove it from the group. |
| companyName | String | Name of the member company. |

Both attributes are read-only. Without `include`, a membership has no `relationships`. To change company data, see [Backend API: Manage companies](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-companies.html).

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

If no group matches the UUID, the endpoint returns `404` with the error code `1222`.

## Retrieve a company of a customer group

To retrieve one company membership of a group, send the request:

***
`GET` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/companies/*{{company_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |
| {% raw %}***{{company_uuid}}***{% endraw %} | UUID of the company. To get it, [retrieve the companies of a customer group](#retrieve-the-companies-of-a-customer-group). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds the `companies` relationship to the membership and returns the company in `included`. | companies |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies/88efe8fb-98bd-5423-a041-a8f866c0f913` | Retrieve the membership of the company in the group. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies/88efe8fb-98bd-5423-a041-a8f866c0f913?include=companies` | Retrieve the membership, with the full company resource in `included`. |

### Response

<details>
  <summary>Response sample: retrieve a company of a customer group with the company included</summary>

```json
{
    "data": {
        "id": "88efe8fb-98bd-5423-a041-a8f866c0f913",
        "type": "customer-group-companies",
        "attributes": {
            "companyUuid": "88efe8fb-98bd-5423-a041-a8f866c0f913",
            "companyName": "BoB-Hotel Mitte"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies/88efe8fb-98bd-5423-a041-a8f866c0f913?include=companies"
        },
        "relationships": {
            "companies": {
                "data": [
                    {
                        "type": "companies",
                        "id": "88efe8fb-98bd-5423-a041-a8f866c0f913"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "id": "88efe8fb-98bd-5423-a041-a8f866c0f913",
            "type": "companies",
            "attributes": {
                "uuid": "88efe8fb-98bd-5423-a041-a8f866c0f913",
                "name": "BoB-Hotel Mitte",
                "status": "approved",
                "isActive": true
            },
            "links": {
                "self": "/companies/88efe8fb-98bd-5423-a041-a8f866c0f913"
            }
        }
    ]
}
```

</details>

The membership has the same attributes as in [Retrieve the companies of a customer group](#retrieve-the-companies-of-a-customer-group). An included company has the attributes that [Backend API: Manage companies](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-companies.html) describes.

If no group matches the UUID, the endpoint returns `404` with the error code `1222`. If the company is not a member of the group, the endpoint returns `404` with the error code `1237`, whether or not the company exists.

## Add companies to a customer group

To add companies to a group without removing the companies it already has, send the request:

***
`POST` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/companies**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group to add the companies to. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies`

```json
{
    "data": {
        "type": "customer-group-companies",
        "attributes": {
            "companyUuids": [
                "59b6c025-cc00-54ca-b101-191391adf2af",
                "88efe8fb-98bd-5423-a041-a8f866c0f913"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| companyUuids | Array | &check; | UUIDs of the companies to add. Must contain at least one UUID and at most 1000, with no duplicates. Each entry must be a UUID in lowercase. To get the UUIDs, [retrieve companies](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-companies.html#retrieve-companies). |

The companies the group already has stay as they are. Companies that are already members are skipped, so sending the same request twice is safe and changes nothing the second time.

The operation is all-or-nothing: if any UUID matches no company, nothing is added, and the response returns `422` with the error code `1236` and one `errors[]` entry per unknown UUID.

Adding a company does not add its business units. To add them too, see [Add business units to a customer group](#add-business-units-to-a-customer-group).

### Response

A successful request returns the `204 No Content` status code with an empty body. To read the resulting membership, see [Retrieve the companies of a customer group](#retrieve-the-companies-of-a-customer-group).

## Replace the companies of a customer group

To set the complete list of member companies of a group in one call, send the request:

***
`PATCH` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/companies**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group whose companies you want to replace. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies`

```json
{
    "data": {
        "type": "customer-group-companies",
        "attributes": {
            "companyUuids": [
                "59b6c025-cc00-54ca-b101-191391adf2af",
                "94f34a90-4217-5165-8a92-1332e4dd011b"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| companyUuids | Array | &check; | The complete new list of member companies. At most 1000 UUIDs, with no duplicates. Each entry must be a UUID in lowercase. An empty array removes every company from the group. |

The UUIDs you send become the complete new set of member companies, so include every company the group is to keep. Companies missing from the list are removed from the group; the companies themselves, and their memberships in other groups, stay untouched. The business units of the group stay as they are.

An empty array removes every company from the group in one request, whatever the number of companies, and keeps the group itself.

The operation is all-or-nothing: if any UUID matches no company, the membership stays exactly as it was, and the response returns `422` with the error code `1236` and one `errors[]` entry per unknown UUID. Sending the same list twice leaves the same companies.

{% info_block warningBox "companyUuids is required here" %}

Omitting `companyUuids` is not a way to leave the membership alone. A body without it is rejected with `422` rather than read as an empty list, and the membership stays as it was.

{% endinfo_block %}

{% info_block infoBox "Groups with more than 1000 companies" %}

`companyUuids` is capped at 1000 entries per request, so this operation can set at most 1000 companies. To change a group that keeps more than 1000 companies, use [Add companies to a customer group](#add-companies-to-a-customer-group) and [Remove a company from a customer group](#remove-a-company-from-a-customer-group), which you can call as often as you need.

The cap applies to writing only. [Retrieve the companies of a customer group](#retrieve-the-companies-of-a-customer-group) is paginated, so it is not limited to 1000.

{% endinfo_block %}

### Response

A successful request returns the `204 No Content` status code with an empty body. To read the resulting membership, see [Retrieve the companies of a customer group](#retrieve-the-companies-of-a-customer-group).

## Remove a company from a customer group

To remove one company from a group, send the request:

***
`DELETE` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/companies/*{{company_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group to remove the company from. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |
| {% raw %}***{{company_uuid}}***{% endraw %} | UUID of the company to remove. To get it, [retrieve the companies of a customer group](#retrieve-the-companies-of-a-customer-group). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/companies/88efe8fb-98bd-5423-a041-a8f866c0f913`

### Response

A successful request returns the `204 No Content` status code with an empty body.

The company is kept, and so are its memberships in other groups. The business units of the group, including the business units of the removed company, stay as they are.

If no group matches the UUID, the endpoint returns `404` with the error code `1222`. If the group exists but the company is not one of its members, the endpoint returns `404` with the error code `1237`.

## Retrieve the business units of a customer group

To retrieve a paginated collection of the business units assigned to a group, send the request:

***
`GET` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/company-business-units**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group whose business units you want to retrieve. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to `100`. Defaults to `10`. A larger value returns 100 items per page. |
| page[offset] | Number of items to skip before the page begins. The offset is rounded down to a multiple of `page[limit]`, so every response is a whole page. | From `0` to any. Defaults to `0`. |
| q | Free-text search, matched against the business unit name. A business unit matches when its name contains the search text. The comparison ignores case. | Any string. |
| filter[customer-group-company-business-units.companyUuid] | Returns only the business units of the company with this UUID. | UUID of a company. |
| sort | Sorts the collection by the business unit name. Prefix the field with `-` to sort in descending order. | name, -name |
| include | Adds the `company-business-units` relationship, the `companies` relationship, or both to each item, and returns the business units and their companies in `included`. Separate several values with a comma. | company-business-units, companies |

Without `sort`, the business units are listed in the order in which they were created. Business units with the same name keep a fixed order, so paging through the collection never repeats or skips a business unit.

Sorting by any other field returns `400` with the error code `1203`, and the error message names the supported field.

`companyUuid` is the only filterable property. A filter on any other property, or a `companyUuid` filter with more than one value, returns `400` with the error code `1215`. A filter key that is not in the `filter[customer-group-company-business-units.<property>]` form returns `400` with the error code `011`.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units` | Retrieve the first page of business units. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units?filter[customer-group-company-business-units.companyUuid]=62de4ab6-b768-5c21-8835-455d9f341625&sort=name&page[limit]=2` | Retrieve the first two business units of one company, ordered by name. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units?q=berlin` | Retrieve the business units whose name contains `berlin`. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units?include=company-business-units,companies` | Retrieve the business units, with the full business unit and company resources in `included`. |

### Response

<details>
  <summary>Response sample: retrieve the business units of one company in a customer group, ordered by name, two per page</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units?filter%5Bcustomer-group-company-business-units.companyUuid%5D=62de4ab6-b768-5c21-8835-455d9f341625&sort=name",
        "first": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units?filter[customer-group-company-business-units.companyUuid]=62de4ab6-b768-5c21-8835-455d9f341625&sort=name&page[limit]=2&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units?filter[customer-group-company-business-units.companyUuid]=62de4ab6-b768-5c21-8835-455d9f341625&sort=name&page[limit]=2&page[offset]=4",
        "next": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units?filter[customer-group-company-business-units.companyUuid]=62de4ab6-b768-5c21-8835-455d9f341625&sort=name&page[limit]=2&page[offset]=2"
    },
    "meta": {
        "pagination": {
            "numFound": 5,
            "currentPage": 1,
            "maxPage": 3,
            "currentItemsPerPage": 2
        }
    },
    "data": [
        {
            "id": "ff1c18c9-fb5d-514d-9358-79887ed6d5c6",
            "type": "customer-group-company-business-units",
            "attributes": {
                "companyBusinessUnitUuid": "ff1c18c9-fb5d-514d-9358-79887ed6d5c6",
                "companyBusinessUnitName": "Acme Corporation",
                "companyUuid": "62de4ab6-b768-5c21-8835-455d9f341625",
                "companyName": "Acme Corporation"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units/ff1c18c9-fb5d-514d-9358-79887ed6d5c6"
            }
        },
        {
            "id": "d8943c86-4481-5c2a-b5f6-28c8dbdf1a23",
            "type": "customer-group-company-business-units",
            "attributes": {
                "companyBusinessUnitUuid": "d8943c86-4481-5c2a-b5f6-28c8dbdf1a23",
                "companyBusinessUnitName": "Acme Corporation Barcelona",
                "companyUuid": "62de4ab6-b768-5c21-8835-455d9f341625",
                "companyName": "Acme Corporation"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units/d8943c86-4481-5c2a-b5f6-28c8dbdf1a23"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| companyBusinessUnitUuid | String | UUID of the member business unit. It is also the `id` of the membership, so it addresses the membership when you retrieve it or remove it from the group. |
| companyBusinessUnitName | String | Name of the member business unit. |
| companyUuid | String | UUID of the company the business unit belongs to. |
| companyName | String | Name of the company the business unit belongs to. |

All four attributes are read-only. Without `include`, a membership has no `relationships`. To change business unit data, see [Backend API: Manage company business units](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-business-units.html).

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

If no group matches the UUID, the endpoint returns `404` with the error code `1222`.

## Retrieve a business unit of a customer group

To retrieve one business unit membership of a group, send the request:

***
`GET` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/company-business-units/*{{company_business_unit_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |
| {% raw %}***{{company_business_unit_uuid}}***{% endraw %} | UUID of the business unit. To get it, [retrieve the business units of a customer group](#retrieve-the-business-units-of-a-customer-group). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds the `company-business-units` relationship, the `companies` relationship, or both to the membership, and returns the business unit and its company in `included`. Separate several values with a comma. | company-business-units, companies |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units/073389b6-9ee8-5c90-a8a7-a830aab6a330` | Retrieve the membership of the business unit in the group. |
| `GET https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units/073389b6-9ee8-5c90-a8a7-a830aab6a330?include=company-business-units,companies` | Retrieve the membership, with the full business unit and company resources in `included`. |

### Response

<details>
  <summary>Response sample: retrieve a business unit of a customer group with the business unit and its company included</summary>

```json
{
    "data": {
        "id": "073389b6-9ee8-5c90-a8a7-a830aab6a330",
        "type": "customer-group-company-business-units",
        "attributes": {
            "companyBusinessUnitUuid": "073389b6-9ee8-5c90-a8a7-a830aab6a330",
            "companyBusinessUnitName": "Acme Corporation Berlin",
            "companyUuid": "62de4ab6-b768-5c21-8835-455d9f341625",
            "companyName": "Acme Corporation"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units/073389b6-9ee8-5c90-a8a7-a830aab6a330?include=company-business-units,companies"
        },
        "relationships": {
            "company-business-units": {
                "data": [
                    {
                        "type": "company-business-units",
                        "id": "073389b6-9ee8-5c90-a8a7-a830aab6a330"
                    }
                ]
            },
            "companies": {
                "data": [
                    {
                        "type": "companies",
                        "id": "62de4ab6-b768-5c21-8835-455d9f341625"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "id": "62de4ab6-b768-5c21-8835-455d9f341625",
            "type": "companies",
            "attributes": {
                "uuid": "62de4ab6-b768-5c21-8835-455d9f341625",
                "name": "Acme Corporation",
                "status": "approved",
                "isActive": true
            },
            "links": {
                "self": "/companies/62de4ab6-b768-5c21-8835-455d9f341625"
            }
        },
        {
            "id": "073389b6-9ee8-5c90-a8a7-a830aab6a330",
            "type": "company-business-units",
            "attributes": {
                "uuid": "073389b6-9ee8-5c90-a8a7-a830aab6a330",
                "name": "Acme Corporation Berlin",
                "companyUuid": "62de4ab6-b768-5c21-8835-455d9f341625",
                "parentBusinessUnitUuid": "ff1c18c9-fb5d-514d-9358-79887ed6d5c6",
                "iban": "",
                "bic": "",
                "phone": "4902890021",
                "addressUuids": [
                    "1d65a9de-b308-504a-9582-6d955237906f"
                ]
            },
            "links": {
                "self": "/company-business-units/073389b6-9ee8-5c90-a8a7-a830aab6a330"
            }
        }
    ]
}
```

</details>

The membership has the same attributes as in [Retrieve the business units of a customer group](#retrieve-the-business-units-of-a-customer-group). An included business unit has the attributes that [Backend API: Manage company business units](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-business-units.html) describes, and an included company has the attributes that [Backend API: Manage companies](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-companies.html) describes.

If no group matches the UUID, the endpoint returns `404` with the error code `1222`. If the business unit is not a member of the group, the endpoint returns `404` with the error code `1239`, whether or not the business unit exists.

## Add business units to a customer group

To add business units to a group without removing the business units it already has, send the request:

***
`POST` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/company-business-units**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group to add the business units to. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units`

```json
{
    "data": {
        "type": "customer-group-company-business-units",
        "attributes": {
            "companyBusinessUnitUuids": [
                "073389b6-9ee8-5c90-a8a7-a830aab6a330",
                "5860fdd0-21fc-5389-87c9-5f1507d1ef3e"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| companyBusinessUnitUuids | Array | &check; | UUIDs of the business units to add. Must contain at least one UUID and at most 1000, with no duplicates. Each entry must be a UUID in lowercase. To get the UUIDs, [retrieve business units](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-business-units.html#retrieve-business-units). |

The business units the group already has stay as they are. Business units that are already members are skipped, so sending the same request twice is safe and changes nothing the second time.

The operation is all-or-nothing: if any UUID matches no business unit, nothing is added, and the response returns `422` with the error code `1238` and one `errors[]` entry per unknown UUID.

Adding a business unit does not add its company, its parent or child business units, or its company users. A group can have business units of several companies.

### Response

A successful request returns the `204 No Content` status code with an empty body. To read the resulting membership, see [Retrieve the business units of a customer group](#retrieve-the-business-units-of-a-customer-group).

## Replace the business units of a customer group

To set the complete list of member business units of a group in one call, send the request:

***
`PATCH` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/company-business-units**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group whose business units you want to replace. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units`

```json
{
    "data": {
        "type": "customer-group-company-business-units",
        "attributes": {
            "companyBusinessUnitUuids": [
                "073389b6-9ee8-5c90-a8a7-a830aab6a330",
                "d8943c86-4481-5c2a-b5f6-28c8dbdf1a23"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| companyBusinessUnitUuids | Array | &check; | The complete new list of member business units. At most 1000 UUIDs, with no duplicates. Each entry must be a UUID in lowercase. An empty array removes every business unit from the group. |

The UUIDs you send become the complete new set of member business units, so include every business unit the group is to keep. Business units missing from the list are removed from the group; the business units themselves, and their memberships in other groups, stay untouched. The companies of the group stay as they are, including the companies whose last business unit you remove.

An empty array removes every business unit from the group in one request, whatever the number of business units, and keeps the group itself.

The operation is all-or-nothing: if any UUID matches no business unit, the membership stays exactly as it was, and the response returns `422` with the error code `1238` and one `errors[]` entry per unknown UUID. Sending the same list twice leaves the same business units.

As with companies, `companyBusinessUnitUuids` is required, and a body without it is rejected with `422`. The list is capped at 1000 entries, so to change a group that keeps more than 1000 business units, use [Add business units to a customer group](#add-business-units-to-a-customer-group) and [Remove a business unit from a customer group](#remove-a-business-unit-from-a-customer-group) instead.

### Response

A successful request returns the `204 No Content` status code with an empty body. To read the resulting membership, see [Retrieve the business units of a customer group](#retrieve-the-business-units-of-a-customer-group).

## Remove a business unit from a customer group

To remove one business unit from a group, send the request:

***
`DELETE` {% raw %}**/customer-groups/*{{customer_group_uuid}}*/company-business-units/*{{company_business_unit_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_group_uuid}}***{% endraw %} | UUID of the customer group to remove the business unit from. To get it, [retrieve customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#retrieve-customer-groups). |
| {% raw %}***{{company_business_unit_uuid}}***{% endraw %} | UUID of the business unit to remove. To get it, [retrieve the business units of a customer group](#retrieve-the-business-units-of-a-customer-group). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/customer-groups/d01a3f13-7687-50d0-8aac-2cac53ff7a61/company-business-units/073389b6-9ee8-5c90-a8a7-a830aab6a330`

### Response

A successful request returns the `204 No Content` status code with an empty body.

The business unit is kept, and so are its memberships in other groups. The companies of the group stay as they are, including the company of the removed business unit.

If no group matches the UUID, the endpoint returns `404` with the error code `1222`. If the group exists but the business unit is not one of its members, the endpoint returns `404` with the error code `1239`.

## Other management options

- [Backend API: Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html)
- [Backend API: Manage companies](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-companies.html)
- [Backend API: Manage company business units](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-business-units.html)
- [Manage customer groups in the Back Office](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html)
- [Customer groups overview](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html)

## Possible errors

| CODE  | REASON |
| --- | --- |
| 011 | A filter key is not in the `filter[customer-group-company-business-units.<property>]` form. |
| 901 | The request body failed validation: `companyUuids` or `companyBusinessUnitUuids` is missing, is empty on an add, holds more than 1000 entries or a duplicate, or holds a value that is not a UUID in lowercase. |
| 1203 | The `sort` parameter names a field other than `name`. |
| 1215 | The collection does not support the filter: any filter on the companies of a group, or a filter on the business units of a group that addresses a property other than `companyUuid` or passes more than one value. |
| 1222 | No customer group matches the given UUID. |
| 1223 | The name of the customer group differs only in letter case from the name of another customer group, so the changed membership cannot be saved. |
| 1236 | No company matches one of the given `companyUuids`. Each unknown UUID gets its own `errors[]` entry. |
| 1237 | The company is not a member of the customer group. |
| 1238 | No business unit matches one of the given `companyBusinessUnitUuids`. Each unknown UUID gets its own `errors[]` entry. |
| 1239 | The business unit is not a member of the customer group. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
