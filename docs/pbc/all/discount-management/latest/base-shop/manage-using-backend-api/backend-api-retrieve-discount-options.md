---
title: "Backend API: Retrieve discount options"
description: Learn how to retrieve the values a discount is configured from—calculation methods, rule fields and operators, stores, and value ranges—using the Spryker Backend API.
last_updated: Sep 29, 2026
template: glue-api-backend-guide-template
related:
  - title: "Backend API: Manage discounts"
    link: docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discounts.html
  - title: "Backend API: Manage discount voucher codes"
    link: docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discount-voucher-codes.html
---

This document describes how to retrieve the discount options using the Backend API. The `discount-options` resource lists every value the Back Office **Discount** form offers in its dropdowns and enforces in its ranges: the discount types, the calculation methods with their display names and which amount attribute each reads, the item-selection strategies, the rule fields with their operators and fixed values, the stores with their currencies, and the allowed ranges for the priority and the voucher code generation. Read it before you [create a discount](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discounts.html#create-a-discount) to build a valid payload, or to render a discount form of your own.

The values are not static. Calculation methods, rule fields, and strategies come from the plugins registered in the project, so an installation with additional discount plugins lists additional options.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the discount endpoints and their installation instructions, see [Install the Discounts Backend API](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-discounts-backend-api.html).

## Retrieve discount options

To retrieve the discount options, send the request:

***
`GET` **/discount-options**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/discount-options`

The resource is a singleton without an identifier and without pagination. The request takes no query parameters.

### Response

<details>
  <summary>Response sample: retrieve discount options</summary>

```json
{
    "data": {
        "type": "discount-options",
        "id": "discount-options",
        "attributes": {
            "discountTypes": [
                "cart_rule",
                "voucher"
            ],
            "calculatorTypes": [
                {
                    "key": "percentage",
                    "label": "Percentage",
                    "inputType": "calculator-default-input-type"
                },
                {
                    "key": "fixed",
                    "label": "Fixed amount",
                    "inputType": "calculator-money-input-type"
                }
            ],
            "collectorStrategyTypes": [
                {
                    "key": "query-string",
                    "label": "Query String"
                },
                {
                    "key": "promotion",
                    "label": "Discount promotion to product"
                }
            ],
            "priority": {
                "min": 1,
                "max": 9999
            },
            "voucherCodesQuantity": {
                "min": 1,
                "max": 14000
            },
            "voucherCodeLength": {
                "min": 3,
                "max": 10
            },
            "stores": [
                {
                    "name": "DE",
                    "currencyIsoCodes": [
                        "CHF",
                        "EUR"
                    ]
                },
                {
                    "name": "AT",
                    "currencyIsoCodes": [
                        "CHF",
                        "EUR"
                    ]
                }
            ],
            "decisionRuleFields": [
                {
                    "field": "sub-total",
                    "operators": [
                        "=",
                        "!=",
                        "<",
                        "<=",
                        ">",
                        ">="
                    ],
                    "acceptedTypes": [
                        "number"
                    ],
                    "valueOptions": []
                },
                {
                    "field": "currency",
                    "operators": [
                        "=",
                        "!=",
                        "contains",
                        "does not contain"
                    ],
                    "acceptedTypes": [
                        "string"
                    ],
                    "valueOptions": [
                        {
                            "value": "CHF",
                            "label": "Swiss Franc"
                        },
                        {
                            "value": "EUR",
                            "label": "Euro"
                        }
                    ]
                }
            ],
            "collectorFields": [
                {
                    "field": "sku",
                    "operators": [
                        "=",
                        "!=",
                        "contains",
                        "does not contain",
                        "is in",
                        "is not in"
                    ],
                    "acceptedTypes": [
                        "string",
                        "list"
                    ],
                    "valueOptions": []
                },
                {
                    "field": "item-quantity",
                    "operators": [
                        "=",
                        "!=",
                        "contains",
                        "does not contain",
                        "is in",
                        "is not in",
                        "<",
                        "<=",
                        ">",
                        ">="
                    ],
                    "acceptedTypes": [
                        "number",
                        "list"
                    ],
                    "valueOptions": []
                }
            ],
            "logicalOperators": [
                "and",
                "or"
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/discount-options"
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| discountTypes | Array | Allowed values of the `discountType` attribute of a discount. |
| calculatorTypes | Array | Available calculation methods for the `calculatorType` attribute. |
| calculatorTypes.key | String | Key of the calculation method—for example, `percentage` or `fixed`. It is the value of the `calculatorType` attribute of a discount. A calculator plugin added by the project is listed under its plugin key until the project maps it to a readable key in `Spryker\Glue\Discount\DiscountConfig::getCalculatorPluginKeyByCalculatorType()`. |
| calculatorTypes.label | String | Name of the calculation method to show to users, translated into the locale of the `Accept-Language` header—for example, `Percentage`. A method added by the project without a translation is labeled by its plugin key without the `PLUGIN_CALCULATOR_` prefix—for example, `Bonus points` for `PLUGIN_CALCULATOR_BONUS_POINTS`. |
| calculatorTypes.inputType | String | Which amount attribute the method reads: `calculator-default-input-type` reads `percentage`, `calculator-money-input-type` reads `fixedAmounts`. |
| collectorStrategyTypes | Array | Available item-selection strategies for the `collectorStrategyType` attribute. `query-string` is always present; other strategies, such as `promotion`, are contributed by their modules. |
| collectorStrategyTypes.key | String | Key of the strategy. |
| collectorStrategyTypes.label | String | Label of the strategy as shown in the Back Office. |
| priority | Object | Allowed range of the `priority` attribute. |
| priority.min | Integer | Lowest allowed value. |
| priority.max | Integer | Highest allowed value. |
| voucherCodesQuantity | Object | Allowed range of the `quantity` attribute when [generating voucher codes](/docs/pbc/all/discount-management/latest/base-shop/manage-using-backend-api/backend-api-manage-discount-voucher-codes.html#generate-voucher-codes). |
| voucherCodeLength | Object | Allowed range of the `codeLength` attribute when generating voucher codes. |
| stores | Array | Stores a discount can be assigned to, with the currencies a fixed amount can be given in. |
| stores.name | String | Name of the store, as used in the `stores` attribute of a discount. |
| stores.currencyIsoCodes | Array | ISO 4217 codes of the currencies available in the store, as used in `fixedAmounts.currencyIsoCode`. |
| decisionRuleFields | Array | Fields a `decisionRule` rule can check. |
| collectorFields | Array | Fields a `collector` rule can check. |
| decisionRuleFields.field, collectorFields.field | String | Name of the field, as used in `rules.field`. |
| decisionRuleFields.operators, collectorFields.operators | Array | Operators the field supports, as used in `rules.operator`. |
| decisionRuleFields.acceptedTypes, collectorFields.acceptedTypes | Array | Value types the field accepts: `string`, `number`, or `list`. A field that accepts `list` supports the `is in` and `is not in` operators with `;`-separated values. |
| decisionRuleFields.valueOptions, collectorFields.valueOptions | Array | Fixed values the field can be compared with, each with a `value` and a `label`. Empty for a field that accepts any value. |
| logicalOperators | Array | Allowed values of the `condition` attribute of a rule group. |

## Possible errors

The endpoint has no errors of its own. To view generic errors, such as a missing or expired access token, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
