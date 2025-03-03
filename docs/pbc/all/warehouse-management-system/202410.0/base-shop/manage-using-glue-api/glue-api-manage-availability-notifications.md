---
title: Manage availability notifications
description: Manage product availability notifications for registered users with the Spryker Glue API for your Spryker based projects.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-availability-notifications
originalArticleId: 664b1f47-879b-43c4-8538-5f74397d6816
redirect_from:
  - /docs/scos/dev/glue-api-guides/201907.0/managing-products/managing-availability-notifications/managing-availability-notifications.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-products/managing-availability-notifications/managing-availability-notifications.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-products/managing-availability-notifications/managing-availability-notifications.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/managing-availability-notifications/managing-availability-notifications.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/manage-using-glue-api/manage-availability-notifications.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/manage-using-glue-api/glue-api-manage-availability-notifications.html
related:
  - title: Retrieve subscriptions to availability notifications
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-subscriptions-to-availability-notifications.html
---

*Availability Notification* allows registered and guest customers to subscribe to availability notifications for an unavailable product so that when the product is back in stock, they could receive a notification.

This endpoint allows managing availability notifications of registered and guest customers.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Availability Notification Glue API](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-availability-notification-glue-api.html).

## Subscribe to availability notifications

To subscribe to availability notifications for an out-of-stock product, send the request:

---
`POST` **/availability-notifications**

---

### Request

<details><summary>Request sample: subscribe to availability notifications
</summary>

`POST https://glue.mysprykershop.com/availability-notifications`

```json
{
  "data": {
    "type": "availability-notifications",
    "attributes": {
      "sku": "130_24725761",
      "email": "sonia@spryker.com"
    }
  }
}
```
</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| sku | string | &check; | SKU of a product to subscribe the customer to. |
| email | string | &check; | Customer email where product availability notifications will be sent to. |

### Response

<details><summary>Response sample: subscribe to availability notifications
</summary>

```json
{
    "data": {
        "type": "availability-notifications",
        "id": "70b47ccf1e1a2262f83fddabd19d4828",
        "attributes": {
            "localeName": "en_US",
            "email": "sonia@spryker.com",
            "sku": "130_24725761"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/availability-notifications/70b47ccf1e1a2262f83fddabd19d4828"
        }
    }
}
```
</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| localeName | string | Locale of the subscribed customer. |
| email | string | Customer email where the product availability notifications are sent to. |
| sku | string | SKU of the product the customer receives notifications about. |

## Unsubscribe from availability notifications

To unsubscribe from availability notifications for a product, send the request:

---
`DELETE` **/availability-notifications/*{% raw %}{{{% endraw %}subscriptionKey{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}subscriptionKey{% raw %}}}{% endraw %}*** | Subscription id that is assigned when the subscription is created. To get it as an `id` attribute, subscribe to product availability email notifications or retrieve existing subscriptions. Exampe: `"id": "d634981b8d1930f7db6e2780b7d5600a"`. <br>Note that anyone who has a subscription id can delete the subscription the id is assigned to. |

### Request

Request sample: unsubscribe from availability notifications

`DELETE https://glue.mysprykershop.com/availability-notifications/05f2004950e01a056537384a405ec9a0`

### Response

If a customer's subscription is deleted successfully, the endpoint returns the `204 No Content` status code.

| CODE | REASON |
|-|-|
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 901 | SKU or email is not provided; email is invalid. |
| 4601 | Product is not found. |
| 4602 | Subscription already exists. |
| 4603 | Subscription doesn't exist. |
| 4606 | Request is not authorized. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
