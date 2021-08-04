---
title: Retrieving protected resources
originalLink: https://documentation.spryker.com/v6/docs/getting-the-list-of-protected-resources
redirect_from:
  - /v6/docs/getting-the-list-of-protected-resources
  - /v6/docs/en/getting-the-list-of-protected-resources
---

Since shop owners can define which resources are protected, the list is different in each shop. That's why, before sending any requests, you might need to check which resources are protected and [authenticate](https://documentation.spryker.com/docs/authentication-and-authorization). 

In your development, the Customer Access API helps you to protect resources from guest access and perform pre-flight checks to avoid sending requests to protected resources without authentication.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Customer Access feature integration](https://documentation.spryker.com/docs/glue-customer-access-feature-integration).

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
                "self": "https://glue.mysprykershop.com/customer-access
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/customer-access
    }
}
```


| Attribute | Type | Description |
| --- | --- | --- |
| resourceTypes | String[] | Contains a `string` array, where each element is a resource type that is protected from unauthorized access. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
