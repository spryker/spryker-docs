---
title: Retrieving Protected Resources
description: The article describes how to retrieve a list of resources protected from unauthorized access.
last_updated: Aug 13, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v4/docs/getting-the-list-of-protected-resources
originalArticleId: 20a16f9a-a283-42a5-a990-917d06b7b123
redirect_from:
  - /v4/docs/getting-the-list-of-protected-resources
  - /v4/docs/en/getting-the-list-of-protected-resources
related:
  - title: Authentication and Authorization
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/authenticating-as-a-customer.html
  - title: Logging In as Company User
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/authenticating-as-a-company-user.html
  - title: Hide Content from Logged out Users Overview
    link: docs/scos/user/features/page.version/customer-access-feature-overview.html
---

Shop owners can decide which resources are available to unauthenticated customers, and which of them they are not  allowed to view. In Spryker frontend, this is done via the [Managing Customer Access](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customer-access.html) Feature. On the REST API side, the capability is supported by the **Customer Access API**. The API allows protecting resources from access by unauthorized customers and also provides an endpoint that returns a list of resources protected from unauthenticated access.

{% info_block warningBox "Note" %}

An attempt to retrieve any of the resources protected by the API without authentication will result in a **403 Forbidden** error.

{% endinfo_block %}

In your development, the API will help you to protect certain resources from guest access, as well as perform pre-flight checks to avoid accessing endpoints that a guest user doesn't have sufficient permissions to view.

## Installation
For detailed information on how to enable the functionality and related instructions, see [Glue API: Customer Access Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-access-feature-integration.html).

## Usage
To retrieve a list of protected resources, send a GET request to the following endpoint:

**/customer-access**

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
