---
title: "Backend API: Manage discount voucher codes"
description: Learn how to retrieve, generate, delete, and export the voucher codes of a discount in your Spryker shop using the Spryker Backend API.
last_updated: Sep 29, 2026
template: glue-api-backend-guide-template
related:
  - title: "Backend API: Manage discounts"
    link: docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discounts.html
  - title: Export voucher codes in the Back Office
    link: docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/export-voucher-codes.html
---

This document describes how to manage the voucher codes of a discount using the Backend API. A voucher discount is applied only when the customer redeems one of its codes. The endpoints cover what the Back Office **Discount** page offers for a voucher pool: listing the codes with their usage, generating a batch of codes, removing a code, and downloading all codes as a CSV file.

Voucher codes belong to a discount and are addressed below it, by the discount `uuid` and the code itself. The discount must be of the `voucher` type; to create one, see [Backend API: Manage discounts](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discounts.html#create-a-discount).

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the voucher code endpoints and their installation instructions, see [Install the Discounts Backend API](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-discounts-backend-api.html).

## Conventions

Request headers, pagination, and the filter and sort syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html). This page lists only what is specific to voucher codes.

## Retrieve voucher codes

To retrieve a paginated collection of the voucher codes of a discount, send the request:

***
`GET` {% raw %}**/discounts/*{{discount_uuid}}*/voucher-codes**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{discount_uuid}}***{% endraw %} | UUID of the discount whose codes to retrieve. To get it, [retrieve discounts](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discounts.html#retrieve-discounts). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to `100`. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |
| filter[discount-voucher-codes.code] | Filters the collection by a partial code, matched case-insensitively. | Any string. |
| filter[discount-voucher-codes.voucherBatch] | Filters the collection down to the codes generated in one batch. | Batch number as returned by [Generate voucher codes](#generate-voucher-codes). `0` matches the codes created one by one in the Back Office. |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | code, numberOfUses, maxNumberOfUses, createdAt, voucherBatch |

Without a `sort` parameter, the collection is ordered by `createdAt`. Sorting by a field that is not on the list returns `400` with the error code `5740`.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes` | Retrieve the first page of voucher codes of the discount. |
| `GET https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes?filter[discount-voucher-codes.voucherBatch]=3&sort=code` | Retrieve the codes of batch 3 in alphabetical order. |
| `GET https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes?filter[discount-voucher-codes.code]=SALE-` | Retrieve the codes containing `SALE-`. |
| `GET https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes?sort=-numberOfUses&page[limit]=100` | Retrieve the 100 most redeemed codes. |

### Response

<details>
  <summary>Response sample: retrieve voucher codes</summary>

```json
{
    "data": [
        {
            "type": "discount-voucher-codes",
            "id": "discountUuid=2e622c64-5ddb-58dd-b313-af61c15c65ba;code=SALE-7GH2KQ",
            "attributes": {
                "discountUuid": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
                "code": "SALE-7GH2KQ",
                "maxNumberOfUses": 1,
                "numberOfUses": 1,
                "isActive": true,
                "voucherBatch": 3,
                "createdAt": "2026-09-29 09:28:50"
            }
        },
        {
            "type": "discount-voucher-codes",
            "id": "discountUuid=2e622c64-5ddb-58dd-b313-af61c15c65ba;code=SALE-M4XP9A",
            "attributes": {
                "discountUuid": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
                "code": "SALE-M4XP9A",
                "maxNumberOfUses": 1,
                "isActive": true,
                "voucherBatch": 3,
                "createdAt": "2026-09-29 09:28:50"
            }
        }
    ],
    "meta": {
        "pagination": {
            "numFound": 100,
            "currentPage": 1,
            "maxPage": 10,
            "currentItemsPerPage": 10
        }
    },
    "links": {
        "self": "https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes",
        "first": "https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes?page[limit]=10&page[offset]=90",
        "next": "https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes?page[limit]=10&page[offset]=10"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| discountUuid | String | UUID of the discount the code belongs to. |
| code | String | The voucher code the customer redeems. Together with `discountUuid`, it forms the resource `id`. |
| maxNumberOfUses | Integer | How many times the code can be redeemed in total. `0` means unlimited. |
| numberOfUses | Integer | How many times the code has been redeemed so far. Omitted for a code that has never been redeemed. |
| isActive | Boolean | Whether the code can currently be redeemed. |
| voucherBatch | Integer | Number of the generation batch the code was created in. `0` for a code created one by one in the Back Office. |
| createdAt | String | Date and time when the code was created. |

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

## Generate voucher codes

To generate a batch of voucher codes for a discount, send the request:

***
`POST` {% raw %}**/discounts/*{{discount_uuid}}*/voucher-codes/generate**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{discount_uuid}}***{% endraw %} | UUID of the voucher discount to generate codes for. To get it, [retrieve discounts](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discounts.html#retrieve-discounts). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: generate 100 single-use codes with a prefix

`POST https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes/generate`

```json
{
    "data": {
        "type": "discount-voucher-codes-generate",
        "attributes": {
            "quantity": 100,
            "codeLength": 6,
            "customCode": "SALE-[code]",
            "maxNumberOfUses": 1
        }
    }
}
```

Request sample: generate 10 random codes that can be redeemed without limit

`POST https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes/generate`

```json
{
    "data": {
        "type": "discount-voucher-codes-generate",
        "attributes": {
            "quantity": 10,
            "codeLength": 8
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| quantity | Integer | &check; | Number of codes to generate, from `1` to `14000`. The allowed range is listed in `voucherCodesQuantity` by [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html). |
| codeLength | Integer |  | Length of the random part of each code, from `3` to `10`. Required when `customCode` is not given. The allowed range is listed in `voucherCodeLength` by [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html). |
| customCode | String |  | Template of the codes. The `[code]` placeholder is replaced by the random part; without the placeholder, the random part is appended to the template. Required when `codeLength` is not given. |
| maxNumberOfUses | Integer |  | How many times each generated code can be redeemed. `0` means unlimited. Defaults to `0`. |

The generated codes are not part of the response. To read them, [retrieve voucher codes](#retrieve-voucher-codes) filtered by the returned `voucherBatch`, or [export voucher codes](#export-voucher-codes).

### Response

Response sample:

```json
{
    "data": {
        "type": "discount-voucher-codes-generate",
        "id": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
        "attributes": {
            "discountUuid": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
            "voucherBatch": 3,
            "generatedCount": 100
        }
    }
}
```

A successful request returns the `201 Created` status code.

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| discountUuid | String | UUID of the discount the codes were generated for. |
| voucherBatch | Integer | Number assigned to the batch. Use it as the `voucherBatch` filter of [Retrieve voucher codes](#retrieve-voucher-codes). |
| generatedCount | Integer | Number of codes actually generated. |

{% info_block infoBox "Codes are unique across the shop" %}

A generated code must not exist in any voucher pool. When every attempt to generate a code collides with an existing one—for example, because a short `codeLength` is exhausted—the request is rejected with `422` and the error code `5726`. Increase `codeLength` or change `customCode`.

{% endinfo_block %}

## Delete a voucher code

To delete a voucher code, send the request:

***
`DELETE` {% raw %}**/discounts/*{{discount_uuid}}*/voucher-codes/*{{code}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{discount_uuid}}***{% endraw %} | UUID of the discount the code belongs to. |
| {% raw %}***{{code}}***{% endraw %} | The voucher code to delete. To get it, [retrieve voucher codes](#retrieve-voucher-codes). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes/SALE-7GH2KQ`

### Response

A successful request returns the `204 No Content` status code with an empty body. The code is deleted permanently. A code that does not belong to the given discount returns `404` with the error code `5720`.

## Export voucher codes

To download all voucher codes of a discount as a CSV file, send the request:

***
`GET` {% raw %}**/discounts/*{{discount_uuid}}*/voucher-codes/export**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{discount_uuid}}***{% endraw %} | UUID of the discount whose codes to export. |

The URL is also provided as the `voucherCodesExport` link of a voucher discount in [Retrieve a discount](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discounts.html#retrieve-a-discount).

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes/export`

### Response

The response is not a JSON:API document. It carries the `Content-Type: text/csv; charset=UTF-8` and `Content-Disposition: attachment; filename="vouchers.csv"` headers, and its body is the file, with a header row followed by one row per code:

```text
code,maxNumberOfUses,numberOfUses,isActive
SALE-7GH2KQ,1,1,1
SALE-M4XP9A,1,,1
```

| COLUMN | DESCRIPTION |
| --- | --- |
| code | The voucher code. |
| maxNumberOfUses | How many times the code can be redeemed in total. `0` means unlimited. |
| numberOfUses | How many times the code has been redeemed. Empty for a code that has never been redeemed. |
| isActive | `1` if the code can currently be redeemed, `0` otherwise. |

The file is the same the Back Office produces with [Export voucher codes](/docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/export-voucher-codes.html). A voucher discount without codes returns the header row only; a cart rule returns the header row as well, because it has no voucher pool.

## Possible errors

| CODE  | REASON |
| --- | --- |
| 901 | The request body or a query parameter failed schema validation—for example, `quantity` is out of range, neither `codeLength` nor `customCode` is given, or `maxNumberOfUses` is negative. Each body error names the rejected attribute in `source.pointer`. |
| 5700 | No discount matches the given UUID. |
| 5720 | No voucher code with the given value belongs to the discount. |
| 5721 | Voucher codes can be generated for a voucher discount only, and the discount is a cart rule. |
| 5726 | No code could be generated for the given length and template, because every candidate collides with an existing code. |
| 5740 | The `sort` parameter names a field that the collection does not support. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
