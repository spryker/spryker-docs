---
title: "Backend API: Manage merchants"
description: Learn how to retrieve, create, and update merchants in your Spryker shop using the Spryker Backend API.
last_updated: Sep 22, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage merchants using the Backend API. You can use these endpoints to build Back Office extensions, ERP and PIM integrations, and merchant onboarding automation.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the merchant endpoints and their installation instructions, see [Install the Merchants Backend API](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-merchants-backend-api.html).

The uniqueness and URL validation behind error code `1302` requires the validator plugins registered—see [Register the merchant validator plugins](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-merchants-backend-api.html#2-register-the-merchant-validator-plugins).

The `isOpenForRelationRequest` attribute is added by the Merchant Relation Request module and is present only when it is installed—see [Enable isOpenForRelationRequest](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-merchants-backend-api.html#enable-isopenforrelationrequest).

## Conventions

Request headers, pagination, and the filter and sort syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/backend-api-conventions.html). This page lists only what is specific to merchants.

## Retrieve merchants

To retrieve a paginated collection of merchants, send the request:

***
`GET` **/merchants**
***

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. | name, -name, merchantReference, -merchantReference, status, -status |
| filter[merchants.isActive] | Filters the collection to active or inactive merchants. | true, false |
| filter[merchants.statuses] | Filters the collection to the given approval statuses. Accepted as a comma-separated value or as a repeated parameter. | waiting-for-approval, approved, denied |
| filter[merchants.stores] | Filters the collection to the merchants assigned to the given stores. Accepted as a comma-separated value or as a repeated parameter. | DE, AT |
| filter[merchants.q] | Filters the collection to the merchants whose name or merchant reference contains the given term, matched case-insensitively. | Any string. |

{% info_block infoBox "Sorting" %}

You can sort by only one field at a time; naming more than one returns `400` with the error code `1309`. Without a `sort` parameter, the collection is ordered by name. The collection is ordered deterministically, so paging through it never repeats or skips a merchant.

{% endinfo_block %}

`isActive`, `statuses`, `stores`, and `q` are the only filterable properties; a filter addressing any other property returns `400` with the error message naming the supported properties. `isActive` accepts only a boolean value; any other value returns `400` with the error code `1313`. `statuses` accepts only the values listed above; an unknown status returns `400` with the error code `1316`.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/merchants` | Retrieve the first page of merchants, ordered by name. |
| `GET https://glue-backend.mysprykershop.com/merchants?page[limit]=50&page[offset]=100` | Retrieve 50 merchants, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/merchants?filter[merchants.q]=spryker` | Retrieve the merchants whose name or merchant reference contains `spryker`. |
| `GET https://glue-backend.mysprykershop.com/merchants?filter[merchants.isActive]=true` | Retrieve only active merchants. |
| `GET https://glue-backend.mysprykershop.com/merchants?filter[merchants.statuses]=approved,denied` | Retrieve merchants that are approved or denied. |
| `GET https://glue-backend.mysprykershop.com/merchants?filter[merchants.stores]=DE,AT` | Retrieve merchants assigned to the DE or AT store. |
| `GET https://glue-backend.mysprykershop.com/merchants?sort=-name` | Retrieve merchants in descending name order. |

### Response

<details>
  <summary>Response sample: retrieve merchants</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/merchants?filter[merchants.isActive]=true",
        "first": "https://glue-backend.mysprykershop.com/merchants?filter[merchants.isActive]=true&page[limit]=20&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/merchants?filter[merchants.isActive]=true&page[limit]=20&page[offset]=20",
        "prev": "https://glue-backend.mysprykershop.com/merchants?filter[merchants.isActive]=true&page[limit]=20&page[offset]=0"
    },
    "meta": {
        "pagination": {
            "numFound": 23,
            "currentPage": 2,
            "maxPage": 2,
            "currentItemsPerPage": 20
        }
    },
    "data": [
        {
            "type": "merchants",
            "id": "MER000001",
            "attributes": {
                "merchantReference": "MER000001",
                "name": "Spryker Merchant",
                "email": "merchant@spryker.local",
                "registrationNumber": "HRB 12345",
                "status": "approved",
                "isActive": true,
                "stores": [
                    "DE",
                    "AT"
                ],
                "merchantUrls": [
                    {
                        "localeName": "de_DE",
                        "url": "/de/merchant/spryker-merchant"
                    },
                    {
                        "localeName": "en_US",
                        "url": "/en/merchant/spryker-merchant"
                    }
                ],
                "warehouses": [
                    "Warehouse1"
                ],
                "isOpenForRelationRequest": true
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/merchants/MER000001"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| merchantReference | String | Public unique identifier of the merchant. Use it to address the merchant in subsequent operations. |
| name | String | Name of the merchant. |
| email | String | Contact email address of the merchant. Unique across merchants. |
| registrationNumber | String | Official business registration number of the merchant. `null` if not set. |
| status | String | Approval status of the merchant: `waiting-for-approval`, `approved`, or `denied`. |
| isActive | Boolean | Whether the merchant is active. |
| stores | Array | Names of the stores the merchant is assigned to. `null` if none are assigned. |
| merchantUrls | Array | Storefront URLs of the merchant, one per locale, each with `localeName` and the full `url` path, including the automatically added locale prefix and `/merchant/` segment. `null` if none are set. |
| warehouses | Array | Names of the warehouses assigned to the merchant. Read-only. `null` if none are assigned. |
| isOpenForRelationRequest | Boolean | Whether the merchant accepts relation requests from customers on the storefront. Present only if the Merchant Relation Request module is installed—see [Installation](#installation). `null` if not set. |

## Retrieve a merchant

To retrieve a single merchant, send the request:

***
`GET` {% raw %}**/merchants/*{{merchant_reference}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchant_reference}}***{% endraw %} | Reference of the merchant to retrieve. To get it, [retrieve merchants](#retrieve-merchants). |

### Request

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/merchants/MER000001` | Retrieve the merchant with the given reference. |

### Response

<details>
  <summary>Response sample: retrieve a merchant</summary>

```json
{
    "data": {
        "type": "merchants",
        "id": "MER000001",
        "attributes": {
            "merchantReference": "MER000001",
            "name": "Spryker Merchant",
            "email": "merchant@spryker.local",
            "registrationNumber": "HRB 12345",
            "status": "approved",
            "isActive": true,
            "stores": [
                "DE",
                "AT"
            ],
            "merchantUrls": [
                {
                    "localeName": "de_DE",
                    "url": "/de/merchant/spryker-merchant"
                },
                {
                    "localeName": "en_US",
                    "url": "/en/merchant/spryker-merchant"
                }
            ],
            "warehouses": [
                "Warehouse1"
            ],
            "isOpenForRelationRequest": true
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/merchants/MER000001"
        }
    }
}
```

</details>

The response contains the same attributes as [Retrieve merchants](#retrieve-merchants), without the `meta.pagination` object.

A reference that matches no merchant returns `404` with the error code `1301`.

## Create a merchant

To create a merchant, send the request:

***
`POST` **/merchants**
***

### Request

Request sample: `POST https://glue-backend.mysprykershop.com/merchants`

```json
{
    "data": {
        "type": "merchants",
        "attributes": {
            "merchantReference": "MER000001",
            "name": "Spryker Merchant",
            "email": "merchant@spryker.local",
            "registrationNumber": "HRB 12345",
            "stores": [
                "DE",
                "AT"
            ],
            "merchantUrls": [
                {
                    "localeName": "de_DE",
                    "url": "spryker-merchant"
                },
                {
                    "localeName": "en_US",
                    "url": "spryker-merchant"
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| merchantReference | String | &check; | Public unique identifier of the merchant. Cannot be changed afterwards. |
| name | String | &check; | Name of the merchant. |
| email | String | &check; | Contact email address of the merchant. Unique across merchants. |
| registrationNumber | String |  | Official business registration number of the merchant. |
| status | String |  | Approval status of the merchant. Defaults to `waiting-for-approval`. |
| isActive | Boolean |  | Whether the merchant is active. Defaults to `false`. |
| stores | Array |  | Names of the stores to assign the merchant to. An unknown store name is rejected. |
| merchantUrls | Array |  | Storefront URLs of the merchant, one per locale. Each entry needs `localeName` and the URL slug. |
| isOpenForRelationRequest | Boolean |  | Whether the merchant accepts relation requests from customers on the storefront. Left out of the payload, it keeps its current value rather than resetting to a default. Present only if the Merchant Relation Request module is installed—see [Installation](#installation). |

A merchant created without `status` or `isActive` is `waiting-for-approval` and inactive, exactly as a merchant created in the Back Office.

{% info_block infoBox "The locale prefix and /merchant/ segment are added automatically" %}

Send only the slug in `url`—for example, `spryker-merchant`. The backend automatically prepends the locale's URL prefix and the `/merchant/` segment, so the value is stored and returned as `/de/merchant/spryker-merchant`. Do not include either part yourself.

{% endinfo_block %}

{% info_block infoBox "Every locale needs a URL" %}

On create, every locale must end up with a non-blank URL, matching the requirement the Back Office form enforces. Send the slug for each locale in `merchantUrls`.

{% endinfo_block %}

### Response

<details>
  <summary>Response sample: create a merchant</summary>

```json
{
    "data": {
        "type": "merchants",
        "id": "MER000001",
        "attributes": {
            "merchantReference": "MER000001",
            "name": "Spryker Merchant",
            "email": "merchant@spryker.local",
            "registrationNumber": "HRB 12345",
            "status": "waiting-for-approval",
            "isActive": false,
            "stores": [
                "DE",
                "AT"
            ],
            "merchantUrls": [
                {
                    "localeName": "de_DE",
                    "url": "/de/merchant/spryker-merchant"
                },
                {
                    "localeName": "en_US",
                    "url": "/en/merchant/spryker-merchant"
                }
            ],
            "warehouses": null,
            "isOpenForRelationRequest": null
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/merchants/MER000001"
        }
    }
}
```

</details>

A successful request returns the `201 Created` status code.

## Edit a merchant

To update a merchant, send the request:

***
`PATCH` {% raw %}**/merchants/*{{merchant_reference}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchant_reference}}***{% endraw %} | Reference of the merchant to update. To get it, [retrieve merchants](#retrieve-merchants). |

### Request

Request sample: `PATCH https://glue-backend.mysprykershop.com/merchants/MER000001`

```json
{
    "data": {
        "type": "merchants",
        "attributes": {
            "status": "approved"
        }
    }
}
```

The request accepts the same writable attributes as [Create a merchant](#create-a-merchant), except `merchantReference`, which cannot be changed. All attributes are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

{% info_block infoBox "Status transitions" %}

Only a transition allowed from the current status is accepted: `waiting-for-approval` to `approved` or `denied`, `approved` to `denied`, or `denied` to `approved`. Repeating the current status is accepted and changes nothing. Any other transition is rejected.

{% endinfo_block %}

{% info_block infoBox "Replacing stores" %}

Sending `stores` replaces the whole assignment, including an empty array, which clears it entirely. Omitting the property leaves the current assignment unchanged.

{% endinfo_block %}

{% info_block infoBox "Merchant URLs cannot be deleted" %}

Sending `merchantUrls` upserts the URL of each included locale, from the slug you send in `url`. A locale absent from the payload keeps its current URL, because merchant URLs cannot be deleted.

{% endinfo_block %}

{% info_block warningBox "Warehouses are read-only" %}

`warehouses` cannot be set through this resource. Warehouse assignment is managed in the Back Office.

{% endinfo_block %}

{% info_block infoBox "isOpenForRelationRequest requires the Merchant Relation Request module" %}

`isOpenForRelationRequest` is available only if the Merchant Relation Request module is installed—see [Installation](#installation). Omitting it keeps its current value.

{% endinfo_block %}

### Response

The response contains the updated merchant, with the same attributes as [Retrieve a merchant](#retrieve-a-merchant).

## Possible errors

| CODE | REASON |
| --- | --- |
| 011 | A filter key is not in the `filter[merchants.<property>]` form. |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1301 | No merchant matches the given reference. |
| 1302 | The merchant was rejected by the domain—for example, a duplicate email, a duplicate merchant reference, or a duplicate or blank merchant URL, or, on update, a status transition that is not allowed from the current status. |
| 1303 | The `sort` parameter names a field that the collection does not support. |
| 1304 | A `stores` entry names an unknown store. |
| 1305 | A `merchantUrls` entry names an unknown locale. |
| 1309 | The `sort` parameter names more than one field. |
| 1313 | The `filter[merchants.isActive]` value is not a boolean. |
| 1314 | The merchant was rejected without a reported reason. |
| 1316 | The `filter[merchants.statuses]` value names an unknown status. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
