---
title: "Backend API: Manage company business unit addresses"
description: Learn how to retrieve, create, and update company business unit addresses in your Spryker shop using the Spryker Backend API.
last_updated: Sep 20, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage company business unit addresses using the Backend API. An address belongs to a company and can be assigned to any number of that company's business units.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the address endpoints and their installation instructions, see [Install the Company Business Unit Addresses Backend API](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-company-business-unit-addresses-backend-api.html).

## Conventions

Request headers, pagination, and the filter and sort syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html). This page lists only what is specific to business unit addresses.

## How addresses relate to business units

An address is owned by a **company**, set through `companyUuid` when the address is created. Assigning it to a **business unit** is a separate step, done from the business unit side with `addressUuids`—see [Edit a business unit](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-business-units.html#edit-a-business-unit).

This means:

- A newly created address belongs to a company but is assigned to no business unit.
- One address can be assigned to several business units of the same company. Such an address is listed once in the collection.
- Deleting a business unit does not delete its addresses; they stay with the company and lose the assignment.

## Retrieve business unit addresses

To retrieve a paginated collection of addresses, send the request:

***
`GET` **/company-business-unit-addresses**
***

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| q | Searches the collection partially and case-insensitively across the country name, city, zip code, street, number, addition to address, and the name of the owning company. | Any string. |
| filter[company-business-unit-addresses.companyUuid] | Narrows the collection to the addresses of one company. | UUID of a company. |
| filter[company-business-unit-addresses.companyBusinessUnitUuid] | Narrows the collection to the addresses assigned to one business unit. | UUID of a business unit. |
| sort | Sorts the collection by the given fields, applied in the order they are named. Prefix a field with `-` to sort in descending order. | city, zipCode |

Without either filter, the collection contains every address. A filter addressing any other property returns `400` with the error code `1215`.

Without a `sort` parameter, the most recently created address appears first.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/company-business-unit-addresses` | Retrieve the first page of addresses. |
| `GET https://glue-backend.mysprykershop.com/company-business-unit-addresses?filter[company-business-unit-addresses.companyUuid]=0818f408-cc84-575d-ad54-92118a0e4273` | Retrieve the addresses of one company. |
| `GET https://glue-backend.mysprykershop.com/company-business-unit-addresses?filter[company-business-unit-addresses.companyBusinessUnitUuid]=4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01` | Retrieve the addresses assigned to one business unit. |
| `GET https://glue-backend.mysprykershop.com/company-business-unit-addresses?q=berlin` | Retrieve the addresses matching `berlin` in any searched field. |
| `GET https://glue-backend.mysprykershop.com/company-business-unit-addresses?sort=-zipCode` | Retrieve addresses in descending zip code order. |

### Response

<details>
  <summary>Response sample: retrieve business unit addresses</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/company-business-unit-addresses",
        "first": "https://glue-backend.mysprykershop.com/company-business-unit-addresses?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/company-business-unit-addresses?page[limit]=10&page[offset]=0"
    },
    "meta": {
        "pagination": {
            "numFound": 3,
            "currentPage": 1,
            "maxPage": 1,
            "currentItemsPerPage": 10
        }
    },
    "data": [
        {
            "type": "company-business-unit-addresses",
            "id": "9f2c7b41-5d8e-5a3c-b06f-1e4d7a9c2b58",
            "attributes": {
                "uuid": "9f2c7b41-5d8e-5a3c-b06f-1e4d7a9c2b58",
                "companyUuid": "0818f408-cc84-575d-ad54-92118a0e4273",
                "iso2Code": "DE",
                "street": "Julie-Wolfthorn-Straße",
                "number": "1",
                "additionToAddress": "Floor 3",
                "city": "Berlin",
                "zipCode": "10115",
                "comment": "Deliveries accepted between 9am and 5pm.",
                "labels": [
                    "contact person"
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/company-business-unit-addresses/9f2c7b41-5d8e-5a3c-b06f-1e4d7a9c2b58"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique identifier of the address. Use it to address the record in subsequent operations. |
| companyUuid | String | Identifier of the company that owns the address. |
| iso2Code | String | Two-letter ISO country code of the address country. |
| street | String | Street of the address. |
| number | String | House number of the address. |
| additionToAddress | String | Additional address line. |
| city | String | City of the address. |
| zipCode | String | Zip code of the address. |
| comment | String | Free-text note kept with the address. |
| labels | Array | Names of the labels attached to the address. |

## Retrieve a business unit address

To retrieve a single address, send the request:

***
`GET` {% raw %}**/company-business-unit-addresses/*{{address_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{address_uuid}}***{% endraw %} | UUID of the address to retrieve. To obtain it, [retrieve business unit addresses](#retrieve-business-unit-addresses). |

### Response

The response contains one address with the same attributes as [Retrieve business unit addresses](#retrieve-business-unit-addresses).

## Create a business unit address

To create an address, send the request:

***
`POST` **/company-business-unit-addresses**
***

### Request

Request sample: `POST https://glue-backend.mysprykershop.com/company-business-unit-addresses`

```json
{
    "data": {
        "type": "company-business-unit-addresses",
        "attributes": {
            "companyUuid": "0818f408-cc84-575d-ad54-92118a0e4273",
            "iso2Code": "DE",
            "street": "Julie-Wolfthorn-Straße",
            "city": "Berlin",
            "zipCode": "10115"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| companyUuid | String | &check; | Identifier of the company that owns the address. Must be a UUID. |
| iso2Code | String | &check; | Two-letter ISO country code. Must be a country the shop stocks. |
| street | String | &check; | Street of the address. At most 255 characters, and never blank. |
| city | String | &check; | City of the address. At most 255 characters, and never blank. |
| zipCode | String | &check; | Zip code of the address. At most 10 characters, and never blank. |
| number | String |  | House number. At most 255 characters. |
| additionToAddress | String |  | Additional address line. At most 255 characters. |
| comment | String |  | Free-text note. At most 255 characters. |
| labels | Array |  | Names of the labels to attach, chosen from the labels configured in the shop. |

{% info_block infoBox "Labels are matched by name" %}

`labels` accepts the label names configured in the shop, such as `contact person` or `billing`, rather than identifiers. A name that no configured label matches is rejected with `422`, and the error lists the names the shop accepts.

Sending `labels` replaces the whole set, so send every label that should stay attached. An empty array detaches all of them, and leaving the attribute out of an update keeps the current labels.

{% endinfo_block %}

### Response

A successful request returns the `201 Created` status code. The response contains the created address, with the same attributes as [Retrieve a business unit address](#retrieve-a-business-unit-address), and the `uuid` you use to address it afterwards—including when assigning it to a business unit.

## Edit a business unit address

To update an address, send the request:

***
`PATCH` {% raw %}**/company-business-unit-addresses/*{{address_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{address_uuid}}***{% endraw %} | UUID of the address to update. To get it, [retrieve business unit addresses](#retrieve-business-unit-addresses). |

### Request

Request sample: `PATCH https://glue-backend.mysprykershop.com/company-business-unit-addresses/9f2c7b41-5d8e-5a3c-b06f-1e4d7a9c2b58`

```json
{
    "data": {
        "type": "company-business-unit-addresses",
        "attributes": {
            "city": "Hamburg",
            "zipCode": "20095"
        }
    }
}
```

The request accepts the same writable attributes as [Create a business unit address](#create-a-business-unit-address). All attributes are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

Unlike a business unit, an address can be moved to another company: send `companyUuid` with the new owner.

### Response

The response contains the updated address, with the same attributes as [Retrieve a business unit address](#retrieve-a-business-unit-address).

{% info_block warningBox "Addresses are not deleted" %}

There is no endpoint for deleting a business unit address. To take an address out of use, unassign it from every business unit by sending the remaining addresses in `addressUuids` for each business unit.

{% endinfo_block %}

## Possible errors

| CODE  | REASON |
| --- | --- |
| 011 | A filter key is not in the `filter[company-business-unit-addresses.<property>]` form. |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1210 | `iso2Code` is a valid ISO country code, but the shop does not stock that country. |
| 1213 | No company matches `companyUuid`. |
| 1215 | A filter addresses a property other than `companyUuid` or `companyBusinessUnitUuid`. |
| 1217 | No business unit matches the filtered UUID. |
| 1227 | No address matches the given UUID. |
| 1228 | The address was rejected by the domain. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
