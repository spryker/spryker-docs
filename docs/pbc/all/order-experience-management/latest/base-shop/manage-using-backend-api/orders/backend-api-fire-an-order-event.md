---
title: "Backend API: Fire an order event"
description: Learn how to trigger an order-management event over a chosen set of a placed order's line items using the Spryker Backend API.
last_updated: Sep 15, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve orders
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html
  - title: Create an order
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-create-an-order.html
---

The `order-transitions` resource of the Backend API lets Back Office integrations fire one order-management (OMS) event over a chosen set of a placed order's line items—for example, marking items shipped or canceling them. This document describes how to fire an event and how to read the outcome per item.

An order has no state of its own: its line items advance independently through the OMS state machine, which is why this endpoint targets items rather than the order as a whole.

## Installation

The endpoints are provided by the `OrderExperienceManagement` module, which delegates state transitions to the existing `Oms` module rather than reimplementing them. Install it with `composer require spryker-feature/order-experience-management`, then run `console transfer:generate` and `console propel:install` to apply the module's schema extension.

## Fire an order event

To fire an event, send the request:

---
`POST` **/orders/*{% raw %}{{orderReference}}{% endraw %}*/transitions**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{orderReference}}***{% endraw %} | Reference of the order to transition items of. To get it, [retrieve orders](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html#retrieve-orders). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: ship two specific line items

`POST https://glue-backend.mysprykershop.com/orders/DE--1234/transitions`

```json
{
    "data": {
        "type": "order-transitions",
        "attributes": {
            "event": "ship",
            "itemUuids": [
                "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "9c1e0b2a-4f3d-4a91-8c77-1d5b6e2f0a34"
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| event | String | &check; | OMS event to fire. Must currently be legal for every item named in `itemUuids`—read the legal set from `items.availableEvents` on [retrieving an order](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html#retrieve-an-order), which is the same source this endpoint admits against. Timeout-only events are never accepted, even where the OMS would otherwise allow them. |
| itemUuids | Array | | `items.uuid` values from retrieving the order. Every UUID must belong to this order. Omit it to target every item of the order for which the event is currently legal. |

{% info_block infoBox "Assertion versus scope selector" %}

Given explicitly, `itemUuids` is an assertion: one ineligible item rejects the whole request and fires nothing. Omitted, it is a scope selector: ineligible items are reported as `skipped` and the eligible subset is triggered.

{% endinfo_block %}

An item belonging to a different order is indistinguishable from one that doesn't exist—both come back as unknown. Telling them apart would turn the endpoint into an existence oracle for other orders' item UUIDs.

### Response

Read `items.outcome` to tell whether every admitted item advanced—a partial failure is still reported as `200`, since some items did advance.

<details>
<summary>Response sample: fire an order event</summary>

```json
{
    "data": {
        "id": "DE--1234",
        "type": "order-transitions",
        "attributes": {
            "orderReference": "DE--1234",
            "event": "ship",
            "items": [
                {
                    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "outcome": "transitioned",
                    "stateBefore": "exported",
                    "state": "shipped"
                },
                {
                    "uuid": "9c1e0b2a-4f3d-4a91-8c77-1d5b6e2f0a34",
                    "outcome": "unchanged",
                    "stateBefore": "canceled",
                    "state": "canceled"
                }
            ],
            "messages": []
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| items | Array | Returned only when the event was applied. One entry per item the request targeted—the named `itemUuids` if given, otherwise every item of the order—in the order the order reports them. A targeted item is never absent, so it can never be silently implied to have succeeded. |
| items.uuid | String | The line item, as `items.uuid` on retrieving the order. |
| items.outcome | String | `transitioned`—the item advanced. `unchanged`—the event was admitted for the item but didn't advance it, because a business rule refused it or its state changed between admission and trigger. `skipped`—the event wasn't currently legal for the item and the request omitted `itemUuids`, so it was excluded rather than rejecting the whole request. |
| items.stateBefore | String | OMS state immediately before the trigger. Equal to `state` when nothing advanced. |
| items.state | String | OMS state immediately after the trigger. |
| messages | Array | Additional messages reported for the event, if any—on success as well as failure, so a warning is never dropped. Commonly empty. |

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 404 | N/A | No order with the specified `orderReference`. |
| 409 | N/A | The OMS state machine is locked for one of these items—a concurrent transition is running. Retry. |
| 422 | 901 | A required attribute is missing, is blank, or has a wrong type—for example, `event => This value should not be blank.`. |
| 422 | N/A | Nothing was applied—every named item was unknown, ineligible, or none was eligible. See the error message for which. |
| 500 | N/A | The OMS reported an internal failure; the resulting state is indeterminate. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `order-transitions` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
