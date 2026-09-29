---
title: "Backend API: Manage discounts"
description: Learn how to retrieve, create, update, activate, and deactivate discounts in your Spryker shop using the Spryker Backend API.
last_updated: Sep 29, 2026
template: glue-api-backend-guide-template
related:
  - title: "Backend API: Manage discount voucher codes"
    link: docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discount-voucher-codes.html
  - title: "Backend API: Retrieve discount options"
    link: docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html
  - title: Create discounts in the Back Office
    link: docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html
---

This document describes how to manage discounts using the Backend API. The `discounts` resource exposes the same discount configuration the Back Office **Discount** form uses—cart rules and voucher discounts, their calculation method, the items they apply to, and the cart conditions under which they apply—so you can build Back Office extensions, campaign tooling, and ERP or PIM integrations against one contract.

Discounts are addressed by `uuid`. The internal database identifier is never exposed. A discount is created inactive unless `isActive` is sent; you switch it on and off by updating `isActive`.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the discount endpoints and their installation instructions, see [Install the Discounts Backend API](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-discounts-backend-api.html).

## Conventions

Request headers, pagination, and the filter and sort syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html). This page lists only what is specific to discounts.

Attributes that have no value are omitted from a response. For example, a discount whose items are selected by a promotion carries no `collector`, and a discount without a description carries no `description`.

## Retrieve discounts

To retrieve a paginated collection of discounts, send the request:

***
`GET` **/discounts**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to `100`. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |
| filter[discounts.displayName] | Filters the collection by a partial display name, matched case-insensitively. | Any string. |
| filter[discounts.isActive] | Filters the collection by the activation state. | `true`, `false` |
| filter[discounts.discountType] | Filters the collection by the discount type. Separate several types with a comma. | `cart_rule`, `voucher` |
| filter[discounts.store] | Filters the collection down to the discounts available in a store. Separate several stores with a comma. An unknown store name matches nothing. | Name of a store—for example, `DE`. |
| filter[discounts.validFrom] | Returns the discounts that are valid from the given moment or later. | A UTC date and time in the `Y-m-d H:i:s` format—for example, `2026-01-01 00:00:00`. |
| filter[discounts.validTo] | Returns the discounts that are valid until the given moment or earlier. | A UTC date and time in the `Y-m-d H:i:s` format. |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | displayName, isActive, isExclusive, priority, createdAt |

Filters combine with each other. The collection then contains only the discounts that match every criterion. The bare `filter[<property>]` form without the `discounts.` prefix is accepted as well.

Without a `sort` parameter, the collection is ordered by `createdAt` descending, so the newest discount leads. Sorting by a field that is not on the list returns `400` with the error code `5740`, and the error message names the supported fields. An `isActive` filter that is not a boolean returns `422` with the error code `901`.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/discounts` | Retrieve the first page of discounts, newest first. |
| `GET https://glue-backend.mysprykershop.com/discounts?page[limit]=50&page[offset]=100` | Retrieve 50 discounts, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/discounts?filter[discounts.displayName]=spring` | Retrieve the discounts whose display name contains `spring`. |
| `GET https://glue-backend.mysprykershop.com/discounts?filter[discounts.discountType]=voucher&filter[discounts.isActive]=true` | Retrieve the active voucher discounts. |
| `GET https://glue-backend.mysprykershop.com/discounts?filter[discounts.store]=DE,AT` | Retrieve the discounts available in the `DE` or `AT` store. |
| `GET https://glue-backend.mysprykershop.com/discounts?sort=priority,-createdAt` | Retrieve discounts by ascending priority, newest first within the same priority. |

### Response

<details>
  <summary>Response sample: retrieve discounts</summary>

```json
{
    "data": [
        {
            "type": "discounts",
            "id": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
            "attributes": {
                "uuid": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
                "displayName": "Spring voucher",
                "description": "10% off with a voucher code",
                "discountType": "voucher",
                "isActive": true,
                "isExclusive": false,
                "validFrom": "2026-01-01 00:00:00",
                "validTo": "2026-12-31 23:59:59",
                "calculatorType": "percentage",
                "percentage": 10,
                "fixedAmounts": [],
                "collectorStrategyType": "query-string",
                "collector": {
                    "rules": [
                        {
                            "field": "sku",
                            "operator": "=",
                            "value": "*"
                        }
                    ],
                    "groups": []
                },
                "decisionRule": {
                    "condition": "and",
                    "rules": [
                        {
                            "field": "sub-total",
                            "operator": ">=",
                            "value": "500"
                        }
                    ],
                    "groups": [
                        {
                            "condition": "or",
                            "rules": [
                                {
                                    "field": "currency",
                                    "operator": "=",
                                    "value": "EUR"
                                },
                                {
                                    "field": "currency",
                                    "operator": "=",
                                    "value": "CHF"
                                }
                            ]
                        }
                    ]
                },
                "collectorQueryString": "sku = '*'",
                "decisionRuleQueryString": "sub-total >= '500' and (currency = 'EUR' or currency = 'CHF')",
                "minimumItemQuantity": 1,
                "priority": 100,
                "stores": [
                    "DE"
                ],
                "createdAt": "2026-09-29 09:02:38"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba"
            }
        },
        {
            "type": "discounts",
            "id": "344cd2d5-0644-5568-8602-077383bba134",
            "attributes": {
                "uuid": "344cd2d5-0644-5568-8602-077383bba134",
                "displayName": "5 EUR off",
                "discountType": "cart_rule",
                "isActive": false,
                "isExclusive": false,
                "validFrom": "2026-01-01 00:00:00",
                "validTo": "2026-12-31 23:59:59",
                "calculatorType": "fixed",
                "percentage": 0,
                "fixedAmounts": [
                    {
                        "currencyIsoCode": "EUR",
                        "netAmount": 500,
                        "grossAmount": 595
                    }
                ],
                "collectorStrategyType": "query-string",
                "collector": {
                    "rules": [
                        {
                            "field": "sku",
                            "operator": "=",
                            "value": "*"
                        }
                    ],
                    "groups": []
                },
                "decisionRule": {
                    "rules": [],
                    "groups": []
                },
                "collectorQueryString": "sku = '*'",
                "decisionRuleQueryString": "",
                "minimumItemQuantity": 1,
                "priority": 100,
                "stores": [
                    "DE",
                    "AT"
                ],
                "createdAt": "2026-09-29 09:02:40"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/discounts/344cd2d5-0644-5568-8602-077383bba134"
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
        "self": "https://glue-backend.mysprykershop.com/discounts",
        "first": "https://glue-backend.mysprykershop.com/discounts?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/discounts?page[limit]=10&page[offset]=10",
        "next": "https://glue-backend.mysprykershop.com/discounts?page[limit]=10&page[offset]=10"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique identifier of the discount. Use it to address the discount in subsequent operations. |
| displayName | String | Display name of the discount. Unique across discounts. |
| description | String | Free-text description. |
| discountType | String | `cart_rule` for a discount applied automatically when its conditions match, or `voucher` for a discount that requires a voucher code. |
| isActive | Boolean | Whether the discount is applied. Defaults to `false` on creation. |
| isExclusive | Boolean | Whether the discount is exclusive. An exclusive discount is not combined with other discounts. |
| validFrom | String | Start of the validity period, UTC, in the `Y-m-d H:i:s` format. The discount is not applied before this moment. |
| validTo | String | End of the validity period, UTC, in the `Y-m-d H:i:s` format. The discount is not applied after this moment. |
| calculatorType | String | Key of the calculation method—for example, `percentage` or `fixed`. The available methods, their display names, and their `inputType` are listed by [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html). |
| percentage | Number | Percentage of the discount from `1` to `100`, where `10` stands for 10%. Used by calculation methods with the `calculator-default-input-type` input type and ignored by the others. |
| fixedAmounts | Array | Fixed amounts per currency, in cents. Used by calculators with the `calculator-money-input-type` input type and ignored by the others. Whether `netAmount` or `grossAmount` is applied depends on the price mode of the cart. |
| fixedAmounts.currencyIsoCode | String | ISO 4217 code of a currency of one of the selected stores. |
| fixedAmounts.netAmount | Integer | Net amount in cents, applied to carts in the net price mode. |
| fixedAmounts.grossAmount | Integer | Gross amount in cents, applied to carts in the gross price mode. |
| collectorStrategyType | String | How the discounted items are selected: `query-string` for the items matched by the `collector` rules, or `promotion` for the promotional products of `promotion`. The available strategies are listed by [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html). |
| collector | Object | Rule group that selects the cart items the discount applies to. Present when `collectorStrategyType` is `query-string`. For the structure, see [Rule groups](#rule-groups). |
| decisionRule | Object | Rule group of the cart conditions under which the discount applies. A root group without rules and nested groups, or no group at all, means that the discount applies to every cart. For the structure, see [Rule groups](#rule-groups). |
| collectorQueryString | String | `collector` in the query string notation of the Back Office. Read-only. |
| decisionRuleQueryString | String | `decisionRule` in the query string notation of the Back Office. Read-only. |
| minimumItemQuantity | Integer | Minimum number of cart items matching the collector rules for the discount to apply. |
| priority | Integer | Priority of the discount among the discounts applicable to the same cart, from `1` to `9999`. A lower number is applied first. |
| stores | Array | Names of the stores the discount is available in. |
| promotion | Object | Promotional products offered when the conditions match. Present when `collectorStrategyType` is `promotion`, and only if the `DiscountPromotion` module is installed. |
| promotion.abstractSkus | Array | SKUs of the abstract products offered as promotional items. |
| promotion.quantity | Integer | Maximum quantity of the promotional product the customer may add. |
| createdAt | String | Date and time when the discount was created. |

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

### Rule groups

`collector` and `decisionRule` share one structure, the rule group. It is the object form of the query string the Back Office **Discount** form builds:

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| condition | String | Logical operator that combines the rules and nested groups of this group: `and` or `or`. Omitted in a response when the group holds a single rule. |
| rules | Array | Rules of the group. |
| rules.field | String | Field the rule checks—for example, `sku`, `sub-total`, or `currency`. The fields, their operators, and their fixed values are listed by [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html): `collectorFields` for `collector` and `decisionRuleFields` for `decisionRule`. |
| rules.attribute | String | Product attribute the rule checks. Only for attribute-based fields. |
| rules.operator | String | Operator of the rule—for example, `=`, `>=`, or `is in`. |
| rules.value | String | Value the field is compared with, always a string. `*` matches any value. For the list operators, separate the values with `;`—for example, `shoes;sneakers`. |
| groups | Array | Nested rule groups, combined with the rules of this group by `condition`. A rule group can be nested three levels deep, including the root group. A nested group must contain at least one rule or group. |

## Retrieve a discount

To retrieve a single discount, send the request:

***
`GET` {% raw %}**/discounts/*{{discount_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{discount_uuid}}***{% endraw %} | UUID of the discount to retrieve. To get it, [retrieve discounts](#retrieve-discounts). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba`

### Response

The response contains one discount, with the same attributes as [Retrieve discounts](#retrieve-discounts).

A voucher discount carries the `voucherCodesExport` link next to `self`. It is the URL of [Export voucher codes](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discount-voucher-codes.html#export-voucher-codes), so a client can offer the download without composing the URL. Cart rules carry no such link, and the items of the collection response carry `self` only.

<details>
  <summary>Response sample: retrieve a voucher discount</summary>

```json
{
    "data": {
        "type": "discounts",
        "id": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
        "attributes": {
            "uuid": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
            "displayName": "Spring voucher",
            "description": "10% off with a voucher code",
            "discountType": "voucher",
            "isActive": true,
            "isExclusive": false,
            "validFrom": "2026-01-01 00:00:00",
            "validTo": "2026-12-31 23:59:59",
            "calculatorType": "percentage",
            "percentage": 10,
            "fixedAmounts": [],
            "collectorStrategyType": "query-string",
            "collector": {
                "rules": [
                    {
                        "field": "sku",
                        "operator": "=",
                        "value": "*"
                    }
                ],
                "groups": []
            },
            "decisionRule": {
                "rules": [
                    {
                        "field": "sub-total",
                        "operator": ">=",
                        "value": "500"
                    }
                ],
                "groups": []
            },
            "collectorQueryString": "sku = '*'",
            "decisionRuleQueryString": "sub-total >= '500'",
            "minimumItemQuantity": 1,
            "priority": 100,
            "stores": [
                "DE"
            ],
            "createdAt": "2026-09-29 09:02:38"
        },
        "links": {
            "voucherCodesExport": "https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba/voucher-codes/export",
            "self": "https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba"
        }
    }
}
```

</details>

## Create a discount

To create a discount, send the request:

***
`POST` **/discounts**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: create a percentage cart rule for orders of 500 EUR or more

`POST https://glue-backend.mysprykershop.com/discounts`

```json
{
    "data": {
        "type": "discounts",
        "attributes": {
            "displayName": "10% off from 500",
            "description": "Spring campaign, all categories",
            "discountType": "cart_rule",
            "isExclusive": false,
            "validFrom": "2026-01-01 00:00:00",
            "validTo": "2026-12-31 23:59:59",
            "calculatorType": "percentage",
            "percentage": 10,
            "collectorStrategyType": "query-string",
            "collector": {
                "condition": "and",
                "rules": [
                    { "field": "sku", "operator": "=", "value": "*" }
                ]
            },
            "decisionRule": {
                "condition": "and",
                "rules": [
                    { "field": "sub-total", "operator": ">=", "value": "500" }
                ],
                "groups": [
                    {
                        "condition": "or",
                        "rules": [
                            { "field": "currency", "operator": "=", "value": "EUR" },
                            { "field": "currency", "operator": "=", "value": "CHF" }
                        ]
                    }
                ]
            },
            "minimumItemQuantity": 1,
            "priority": 100,
            "stores": ["DE", "AT"]
        }
    }
}
```

Request sample: create a fixed amount voucher discount

`POST https://glue-backend.mysprykershop.com/discounts`

```json
{
    "data": {
        "type": "discounts",
        "attributes": {
            "displayName": "5 EUR voucher",
            "discountType": "voucher",
            "isExclusive": true,
            "validFrom": "2026-01-01 00:00:00",
            "validTo": "2026-12-31 23:59:59",
            "calculatorType": "fixed",
            "fixedAmounts": [
                { "currencyIsoCode": "EUR", "netAmount": 500, "grossAmount": 595 },
                { "currencyIsoCode": "CHF", "netAmount": 460, "grossAmount": 500 }
            ],
            "collector": {
                "rules": [
                    { "field": "sku", "operator": "=", "value": "*" }
                ]
            },
            "decisionRule": {
                "rules": []
            },
            "minimumItemQuantity": 1,
            "priority": 50,
            "stores": ["DE"]
        }
    }
}
```

Request sample: create a promotion that offers a free product

`POST https://glue-backend.mysprykershop.com/discounts`

```json
{
    "data": {
        "type": "discounts",
        "attributes": {
            "displayName": "Free camera bag from 1000",
            "discountType": "cart_rule",
            "isExclusive": false,
            "validFrom": "2026-01-01 00:00:00",
            "validTo": "2026-12-31 23:59:59",
            "calculatorType": "percentage",
            "percentage": 100,
            "collectorStrategyType": "promotion",
            "promotion": {
                "abstractSkus": ["001"],
                "quantity": 1
            },
            "decisionRule": {
                "rules": [
                    { "field": "sub-total", "operator": ">=", "value": "1000" }
                ]
            },
            "minimumItemQuantity": 1,
            "priority": 10,
            "stores": ["DE"]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| displayName | String | &check; | Display name of the discount. Never blank, and unique across discounts. |
| description | String |  | Free-text description. |
| discountType | String | &check; | `cart_rule` or `voucher`. A voucher discount is created with an empty voucher pool; add codes with [Generate voucher codes](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discount-voucher-codes.html#generate-voucher-codes). |
| isActive | Boolean |  | Whether the discount is applied right away. Defaults to `false`. |
| isExclusive | Boolean | &check; | Whether the discount is exclusive. |
| validFrom | String | &check; | Start of the validity period, UTC, in the `Y-m-d H:i:s` format. Must be before `2038-01-19 03:14:07`. |
| validTo | String | &check; | End of the validity period, UTC, in the `Y-m-d H:i:s` format. Must be after `validFrom` and before `2038-01-19 03:14:07`. |
| calculatorType | String | &check; | Calculation method. Must be one of the keys listed in `calculatorTypes` by [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html). |
| percentage | Number |  | Percentage value from `1` to `100`. Required when `calculatorType` is `percentage`. |
| fixedAmounts | Array |  | Fixed amounts per currency, in cents, for calculators with the `calculator-money-input-type` input type. At least one amount is required for such a calculator, and each currency must belong to one of the selected `stores`. |
| collectorStrategyType | String |  | `query-string` or `promotion`. Defaults to `query-string`. |
| collector | Object |  | Rule group that selects the discounted items. Required when `collectorStrategyType` is `query-string`, where a missing group is rejected with the error code `5706`; ignored otherwise. For the structure, see [Rule groups](#rule-groups). |
| decisionRule | Object |  | Rule group of the cart conditions. Omit it, send `null`, or send a group with an empty `rules` array to create a discount without conditions. |
| promotion | Object |  | Promotional products. Required when `collectorStrategyType` is `promotion`, ignored otherwise. Requires the `DiscountPromotion` module. |
| promotion.abstractSkus | Array | &check; | SKUs of existing abstract products offered as promotional items. At least one. |
| promotion.quantity | Integer | &check; | Maximum quantity of the promotional product the customer may add. |
| minimumItemQuantity | Integer | &check; | Minimum number of cart items matching the collector rules. At least `1`. |
| priority | Integer |  | Priority from `1` to `9999`. The allowed range is listed in `priority` by [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html). |
| stores | Array |  | Names of existing stores the discount is available in. |

{% info_block infoBox "Which amount attribute to send" %}

Every calculator declares an `inputType` in [Retrieve discount options](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-retrieve-discount-options.html). A calculation method with `calculator-default-input-type` reads `percentage`; one with `calculator-money-input-type` reads `fixedAmounts`. The other attribute is ignored, and the stored value is echoed back as `0` or an empty array.

{% endinfo_block %}

{% info_block infoBox "Rules are validated as the Back Office validates them" %}

Each rule's `field`, `operator`, and `value` type must match the field definitions of the corresponding options list. A rule that uses an unknown field or an operator the field does not support is rejected with `422` and the error code `5706`, and the error message quotes the query string parser. A rule group nested deeper than three levels is rejected with the error code `5707`.

{% endinfo_block %}

### Response

<details>
  <summary>Response sample: create a discount</summary>

```json
{
    "data": {
        "type": "discounts",
        "id": "9a3d1b2c-3d4e-5f60-7d2b-4e0e3f9c1c1e",
        "attributes": {
            "uuid": "9a3d1b2c-3d4e-5f60-7d2b-4e0e3f9c1c1e",
            "displayName": "10% off from 500",
            "description": "Spring campaign, all categories",
            "discountType": "cart_rule",
            "isActive": false,
            "isExclusive": false,
            "validFrom": "2026-01-01 00:00:00",
            "validTo": "2026-12-31 23:59:59",
            "calculatorType": "percentage",
            "percentage": 10,
            "fixedAmounts": [],
            "collectorStrategyType": "query-string",
            "collector": {
                "rules": [
                    {
                        "field": "sku",
                        "operator": "=",
                        "value": "*"
                    }
                ],
                "groups": []
            },
            "decisionRule": {
                "condition": "and",
                "rules": [
                    {
                        "field": "sub-total",
                        "operator": ">=",
                        "value": "500"
                    }
                ],
                "groups": [
                    {
                        "condition": "or",
                        "rules": [
                            {
                                "field": "currency",
                                "operator": "=",
                                "value": "EUR"
                            },
                            {
                                "field": "currency",
                                "operator": "=",
                                "value": "CHF"
                            }
                        ]
                    }
                ]
            },
            "collectorQueryString": "sku = '*'",
            "decisionRuleQueryString": "sub-total >= '500' and (currency = 'EUR' or currency = 'CHF')",
            "minimumItemQuantity": 1,
            "priority": 100,
            "stores": [
                "DE",
                "AT"
            ],
            "createdAt": "2026-09-29 10:15:00"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/discounts/9a3d1b2c-3d4e-5f60-7d2b-4e0e3f9c1c1e"
        }
    }
}
```

</details>

A successful request returns the `201 Created` status code. The response contains the discount as stored, with the `uuid` that you can use to address it in subsequent requests. The discount is inactive unless `isActive` was sent as `true`.

## Edit a discount

To update a discount, send the request:

***
`PATCH` {% raw %}**/discounts/*{{discount_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{discount_uuid}}***{% endraw %} | UUID of the discount to update. To get it, [retrieve discounts](#retrieve-discounts). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/discounts/2e622c64-5ddb-58dd-b313-af61c15c65ba`

```json
{
    "data": {
        "type": "discounts",
        "id": "2e622c64-5ddb-58dd-b313-af61c15c65ba",
        "attributes": {
            "description": "Extended to the autumn campaign",
            "validTo": "2027-03-31 23:59:59",
            "priority": 7,
            "isActive": true
        }
    }
}
```

The request accepts the same attributes as [Create a discount](#create-a-discount), and all of them are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value. Attributes that hold a list or an object behave as follows:

- `fixedAmounts`: omit the attribute to keep the stored amounts, send an empty array to clear them, or send a list to replace them.
- `collector` and `decisionRule`: a rule group you send replaces the stored group. Inside it, omit `groups` to keep the stored nested groups, or send an empty array to clear them.
- `promotion.abstractSkus`: omit the attribute to keep the stored SKUs, send an empty array to clear them, or send a list to replace them. A promotion discount must keep at least one SKU.
- `stores`: a list you send replaces the stored store assignment.

{% info_block infoBox "Changing the discount type" %}

Changing `discountType` from `voucher` to `cart_rule` detaches the voucher codes of the discount; changing it to `voucher` creates an empty voucher pool. Changing `collectorStrategyType` away from `promotion` stops validating and persisting `promotion`.

{% endinfo_block %}

### Response

The response contains the updated discount, with the same attributes as [Retrieve a discount](#retrieve-a-discount).

## Deactivate or delete a discount

A discount can be deactivated but not deleted through the API, as in the Back Office. To take a discount out of use, [edit it](#edit-a-discount) with `isActive` set to `false`. A deactivated discount keeps its configuration and voucher codes and can be activated again the same way.

## Possible errors

A business validation error names the rejected attribute in `detail`, in the form `<attribute> => <message>`—for example, `calculatorType => Calculator type "PLUGIN_X" is not available.` or `fixedAmounts.1 => Invalid fixed amount. ...` for the second fixed amount.

| CODE  | REASON |
| --- | --- |
| 901 | The request body or a query parameter failed schema validation—for example, a required attribute is missing, `validTo` is before `validFrom`, `priority` or `percentage` is out of range, a fixed amount is negative, or `filter[discounts.isActive]` is not a boolean. Each body error names the rejected attribute in `source.pointer`. |
| 5700 | No discount matches the given UUID. |
| 5701 | The display name is already used by another discount. |
| 5703 | `calculatorType` names a calculation method this installation does not offer. |
| 5705 | The fixed amounts are invalid: none was given for a money calculator, or a currency does not belong to one of the selected stores. |
| 5706 | A rule of `collector` or `decisionRule` is invalid. The error message quotes the query string parser. |
| 5707 | A rule group is nested deeper than three levels. |
| 5710 | `stores` names a store that does not exist. |
| 5730 | `promotion` is invalid: `abstractSkus` is empty or names a product that does not exist, or `quantity` is below `1`. |
| 5740 | The `sort` parameter names a field that the collection does not support. |
| 5799 | The discount was rejected by another business rule—for example, an invalid validity period. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
