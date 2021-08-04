---
title: Retrieving subscriptions to availability notifications
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-subscriptions-to-availability-notifications
redirect_from:
  - /2021080/docs/retrieving-subscriptions-to-availability-notifications
  - /2021080/docs/en/retrieving-subscriptions-to-availability-notifications
---

This endpoint allows retrieving subscriptions to availability notifications of a registered customer.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue: Availability Notification feature integration](https://documentation.spryker.com/2021080/docs/glue-api-availability-notification-feature-integration).

## Retrieve subscriptions to availability notifications

To retrieve subscriptions to availability notifications, send the request:

`GET` **/my-availability-notifications/**

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by authenticating as a customer. |

Request sample: `GET https://glue.mysprykershop.com/my-availability-notifications`

### Response

<details open><summary>Response sample</summary>

```json
Response

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
There is an alternative way to retrieve subscriptions to availability notifications of a registered customer. For details, see [Managing customers](https://documentation.spryker.com/docs/managing-customers-via-glue-api#create-a-customer).

## Possible errors

| CODE | REASON |
|-|-|
| 001 | Access token is invalid. |
| 002 | Access token is missing. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).











