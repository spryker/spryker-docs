---
title: "Backend API: Manage customer access"
description: Learn how to retrieve and update the content types that are hidden from logged-out customers in your Spryker shop using the Spryker Backend API.
last_updated: Sep 24, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage customer access using the Backend API. You can use these endpoints to build Back Office extensions and to keep the setting in step with a deployment or a configuration pipeline.

Customer access decides which content types a customer sees before they log in. A restricted content type is hidden from customers who are not logged in; an unrestricted one is visible to everyone. For what each content type covers on the Storefront, see [Customer Access feature overview](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-access-feature-overview.html).

This is one shop-wide setting rather than a per-customer one, so the resource holds a single item and has no identifier.

{% info_block infoBox "Customer access and protected Storefront API resources" %}

This resource controls what logged-out customers see in the shop. It does not control which Storefront API resources require authentication. For that, see [Managing customer access to Storefront API resources](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/manage-customer-access-to-glue-api-resources.html).

{% endinfo_block %}

## Installation

These endpoints are provided by API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

## Retrieve customer access settings

To retrieve the current setting, send the request:

***
`GET` **/customer-access**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

Request sample: `GET https://glue-backend.mysprykershop.com/customer-access`

The response lists every content type configured for the project, whether it is restricted or not, so you never need to know the list of content types in advance.

### Response

Response sample:

```json
{
    "data": {
        "type": "customer-access",
        "id": "",
        "attributes": {
            "contentTypeAccess": [
                {
                    "contentType": "price",
                    "isRestricted": true
                },
                {
                    "contentType": "order-place-submit",
                    "isRestricted": true
                },
                {
                    "contentType": "add-to-cart",
                    "isRestricted": true
                },
                {
                    "contentType": "wishlist",
                    "isRestricted": false
                },
                {
                    "contentType": "shopping-list",
                    "isRestricted": false
                }
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customer-access"
        }
    }
}
```

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| contentTypeAccess | Array | One entry per content type configured for the project. |
| contentTypeAccess[].contentType | String | Identifier of the content type. |
| contentTypeAccess[].isRestricted | Boolean | `true` hides this content from customers who are not logged in. `false` makes it visible to everyone. |

Because the setting has a single item, `data.id` is empty.

The content types shipped with Spryker are `price`, `order-place-submit`, `add-to-cart`, `wishlist`, and `shopping-list`. A project can add more, and any content type a project adds is returned here alongside the others.

## Update customer access settings

To change the setting, send the request:

***
`PATCH` **/customer-access**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/customer-access`

```json
{
    "data": {
        "type": "customer-access",
        "attributes": {
            "contentTypeAccess": [
                {
                    "contentType": "price",
                    "isRestricted": true
                },
                {
                    "contentType": "wishlist",
                    "isRestricted": false
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| contentTypeAccess | Array | &check; | The content types to change. Must contain at least one entry. |
| contentTypeAccess[].contentType | String | &check; | Identifier of the content type to change. Must be one of the content types configured for this project, and must not exceed 100 characters. |
| contentTypeAccess[].isRestricted | Boolean | &check; | `true` hides this content from customers who are not logged in. `false` makes it visible to everyone. |

`contentTypeAccess` is a partial list: send only the content types you want to change. A content type you leave out keeps its current flag — it is neither reset nor removed. Sending the flag a content type already has succeeds and changes nothing.

An unknown content type is rejected rather than added as a new one, and nothing is saved. The response returns `422` with the error code `1226`, and the error message names the content types the project is configured with. Sending the same content type twice in one request returns `422` with the error code `1227`.

{% info_block warningBox "isRestricted has no default" %}

Both `contentType` and `isRestricted` are required in every entry you send. An entry that omits `isRestricted` is rejected with `422`. It does not fall back to `false`, and it does not keep the current value.

To leave a content type as it is, leave it out of `contentTypeAccess` entirely.

{% endinfo_block %}

The change takes effect on the Storefront once it has been published to storage. The save triggers the publish, so no extra call is needed.

### Response

A successful request returns the `200 OK` status code.

The response describes the full current setting, including the content types you left out of the payload, with the same attributes as [Retrieve customer access settings](#retrieve-customer-access-settings).

## Other management options

- [Manage customer access in the Back Office](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-access.html)
- [Customer Access feature overview](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-access-feature-overview.html)
- [Managing customer access to Storefront API resources](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/manage-customer-access-to-glue-api-resources.html)
- [Backend API: Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html)

## Possible errors

| CODE  | REASON |
| --- | --- |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1226 | A content type in the payload is not configured for this project. |
| 1227 | The same content type was sent more than once in one request. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
