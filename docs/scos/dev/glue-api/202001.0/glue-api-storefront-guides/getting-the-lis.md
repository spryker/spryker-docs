---
title: Getting the List of Protected Resources
originalLink: https://documentation.spryker.com/v4/docs/getting-the-list-of-protected-resources
redirect_from:
  - /v4/docs/getting-the-list-of-protected-resources
  - /v4/docs/en/getting-the-list-of-protected-resources
---

Shop owners can decide which resources are available to unauthenticated customers, and which of them they are not  allowed to view. In Spryker frontend, this is done via the [Managing Customer Access](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/customers/customers-customer-access-customer-groups/managing-custom) Feature. On the REST API side, the capability is supported by the **Customer Access API**. The API allows protecting resources from access by unauthorized customers and also provides an endpoint that returns a list of resources protected from unauthenticated access.

{% info_block warningBox "Note" %}

An attempt to retrieve any of the resources protected by the API without authentication will result in a **403 Forbidden** error.

{% endinfo_block %}

In your development, the API will help you to protect certain resources from guest access, as well as perform pre-flight checks to avoid accessing endpoints that a guest user doesn't have sufficient permissions to view.

## Installation
For detailed information on how to enable the functionality and related instructions, see [Glue API: Customer Access Feature Integration](https://documentation.spryker.com/v4/docs/glue-customer-access-feature-integration).

## Usage
To retrieve a list of protected resources, send a GET request to the following endpoint:

**[/customer-access](https://documentation.spryker.com/v4/docs/rest-api-reference#/customer-access/get_customer_access)**

### Request
Sample request: `GET http://glue.mysprykershop.com/customer-access`

### Response
If the request was successful, the endpoint returns the types of API resources that should not be accessed without proper authentication.

**Response Attributes**

| Field* | Type | Description |
| --- | --- | --- |
| **resourceTypes** | String[] | Contains a `string` array, where each element is a resource type that is protected from unauthorized access. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample Response**

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
                "self": "http://glue.mysprykershop.com/customer-access
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/customer-access
    }
}
```
