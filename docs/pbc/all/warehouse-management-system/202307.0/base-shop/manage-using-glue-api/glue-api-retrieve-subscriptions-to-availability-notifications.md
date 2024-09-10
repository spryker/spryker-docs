---
title: Retrieve subscriptions to availability notifications
description: Retrieve subscriptions to notifications on product availability via Glue API
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-subscriptions-to-availability-notifications
originalArticleId: 59346a4d-f331-461f-a6b1-486500ae0d9c
redirect_from:
  - /docs/scos/dev/glue-api-guides/201903.0/managing-products/managing-availability-notifications/retrieving-subscriptions-to-availability-notifications.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-products/managing-availability-notifications/retrieving-subscriptions-to-availability-notifications.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-products/managing-availability-notifications/retrieving-subscriptions-to-availability-notifications.html
  - /docs/scos/dev/glue-api-guides/202307.0/managing-products/managing-availability-notifications/retrieving-subscriptions-to-availability-notifications.html
  - /docs/pbc/all/warehouse-management-system/202307.0/base-shop/manage-using-glue-api/retrieve-subscriptions-to-availability-notifications.html
related:
  - title: Managing availability notifications
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-manage-availability-notifications.html
---

This endpoint allows retrieving subscriptions to availability notifications of a registered customer.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Availability Notification Glue API](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-availability-notification-glue-api.html).

## Retrieve subscriptions to availability notifications

To retrieve subscriptions to availability notifications, send the request:

---
`GET` **/my-availability-notifications/**
---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by authenticating as a customer. |

Request sample: retrieve subscriptions to availability notifications

`GET https://glue.mysprykershop.com/my-availability-notifications`

### Response

<details><summary>Response sample: retrieve subscriptions to availability notifications</summary>

```json
{
    "data": [
        {
            "type": "availability-notifications",
            "id": "05f2004950e01a056537384a405ec9a0",
            "attributes": {
                "localeName": "en_US",
                "email": "sonia@spryker.com",
                "sku": "213_123"
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com:80/availability-notifications/05f2004950e01a056537384a405ec9a0"
            }
        },
        {
            "type": "availability-notifications",
            "id": "0fdc733c5d91ef9645e5a9b7114b37d8",
            "attributes": {
                "localeName": "en_US",
                "email": "sonia@spryker.com",
                "sku": "190_25111746"
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com:80/availability-notifications/0fdc733c5d91ef9645e5a9b7114b37d8"
            }
        }
    ],
    "links": []
}
```
</details>

## Other management options

There is an alternative way to retrieve subscriptions to availability notifications of a registered customer. For details, see [Managing customers](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-create-customers.html#create-a-customer).

## Possible errors

| CODE | REASON |
|-|-|
| 001 | Access token is invalid. |
| 002 | Access token is missing. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
