---
title: Handling Concurrent REST Requests and Caching with Etags
originalLink: https://documentation.spryker.com/v5/docs/handling-concurrent-rest-requests-and-caching-with-etags-201907
redirect_from:
  - /v5/docs/handling-concurrent-rest-requests-and-caching-with-etags-201907
  - /v5/docs/en/handling-concurrent-rest-requests-and-caching-with-etags-201907
---

Certain resources of Spryker Glue API allow concurrent changes from multiple sources. For example, a shared cart can be changed by multiple users who may not know about each other's actions and act independently. To ensure resource integrity and consistency, such resources implement **Entity Tags** (also called ETags). An ETag is a unique identifier of the state of a specific resource at a certain point in time. It allows the server to identify whether the client initiating a change has received the last state of the resource known to the server prior to sending the change request.
Apart from that, ETags can also boost the API performance via caching. They can be used by the client to identify when a new version of a resource needs to be requested. For example, the client can cache the state of a user's cart and request an updated version only when the associated ETag changes. Since Etags are stored in Spryker's KV Storage (Redis by default), tag matching can be performed much faster than fetching cart data.

## Request Flow
Once a client requests a resource that supports optimization via ETags, and provided that it is authorized to do so, the Glue API server responds with a REST response. It contains an identifier of the current state of the resource in the ETag header.

**Sample Request**

```
GET http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab

Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNhO...
...
```

**Sample Response**

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 18 Jun 2019 12:55:31 GMT
ETag: "cc89022a51522f705c44fcfced188cc8"
...
```

When updating the resource, the client must pass the Etag in the If-Match header, for example:

```
PATCH http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab

Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNhO...
If-Match: "cc89022a51522f705c44fcfced188cc8"
...
```

If the resource is updated successfully, the server response contains a new ETag:

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 18 Jun 2019 12:55:31 GMT
ETag: "ccc86e1a41d1f4e0ea52419a0bcd9761"
...
```

If the client makes a new attempt to update the resource, it needs to supply the new ETag value in the If-Match header. Any requests from other clients with the old ETag value will be denied as well.

## Error Responses
The following error responses can be returned by the server when a resource supporting ETags is updated:

| Status | Reason |
| --- | --- |
| 412 | Pre-condition failed.</br>The If-Match header value is invalid or outdated. </br>Request the current state of the resource using a GET request to obtain a valid tag value. |
| 428 | Pre-condition required.</br>The If-Match header is missing. |

## Workflow Diagram
The workflow of resources that support concurrent requests is presented in the diagram below:

![Workflow diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Handling+Concurrent+REST+Requests+and+Caching+with+Etags/entity-tag-process-flow.png){height="" width=""}

## Supported Resources
Currently, only a single resource supports concurrent requests with ETag headers out of the box:

| Endpoint | Methods | Resource |
| --- | --- | --- |
| [/carts](https://documentation.spryker.com/docs/en/rest-api-reference#/carts) | PATCH, DELETE | Registered user's cart. |

{% info_block infoBox "Info" %}
The list of resources supporting concurrent requests can vary depending on your project implementation.
{% endinfo_block %}
