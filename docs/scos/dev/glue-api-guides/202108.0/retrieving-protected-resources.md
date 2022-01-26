---
title: Retrieving protected resources
description: The article describes how to retrieve a list of resources protected from unauthorized access.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-protected-resources
originalArticleId: 549c4614-f8b4-4fa5-9609-c92b6cbc0e89
redirect_from:
  - /2021080/docs/retrieving-protected-resources
  - /2021080/docs/en/retrieving-protected-resources
  - /docs/retrieving-protected-resources
  - /docs/en/retrieving-protected-resources
related:
  - title: Authentication and Authorization
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/authenticating-as-a-customer.html
  - title: Hide Content from Logged out Users Overview
    link: docs/scos/user/features/page.version/customer-access-feature-overview.html
  - title: Searching by company users
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/searching-by-company-users.html
---

Since shop owners can define which resources are protected, the list is different in each shop. That's why, before sending any requests, you might need to check which resources are protected and [authenticate](/docs/scos/dev/glue-api-guides/{{page.version}}/authentication-and-authorization.html).

In your development, the Customer Access API helps you to protect resources from guest access and perform pre-flight checks to avoid sending requests to protected resources without authentication.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Customer Access feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-access-feature-integration.html).

## Retrieve protected resources

To retrieve protected resources, send the request:

***
`GET` **/customer-access**
***

### Request

Request sample: `GET http://glue.mysprykershop.com/customer-access`

### Response



Response sample:

```json
{
    "data": [
        {
            "type": "customer-access",
            "id": null,
            "attributes": {
                "resourceTypes": [
                    "abstract-product-prices",
                    "concrete-product-prices",
                    "wishlists",
                    "wishlist-items"
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/customer-access"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/customer-access"
    }
}
```


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| resourceTypes | String | Contains a `string` array, where each element is a resource type that is protected from unauthorized access. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
