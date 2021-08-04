---
title: Handling concurrent REST requests and caching with entity tags
originalLink: https://documentation.spryker.com/2021080/docs/handling-concurrent-rest-requests-and-caching-with-entity-tags
redirect_from:
  - /2021080/docs/handling-concurrent-rest-requests-and-caching-with-entity-tags
  - /2021080/docs/en/handling-concurrent-rest-requests-and-caching-with-entity-tags
---

Some Spryker Glue API resources allow concurrent changes from multiple sources. For example, a shared cart can be changed by multiple users that act independently. 

To ensure resource integrity and consistency, such resources implement *Entity Tags* (ETags). An ETag is a unique identifier of the state of a specific resource at a certain point in time. It allows a server to identify if the client initiating a change has received the last state of the resource known to the server prior to sending the change request.

Apart from that, ETags can also boost API performance via caching. They can be used by a client to identify when a new version of a resource needs to be requested. For example, a client can cache the state of a user's cart and request an updated version only when the associated ETag changes. Since Etags are stored in Spryker's KV Storage ([Redis](https://documentation.spryker.com/docs/redis-as-kv) by default), tag matching is performed much faster than fetching cart data.

## Request flow
When a client requests a resource that supports ETag optimization and is authorized to use it, the Glue API server responds with a REST response. It contains an identifier of the current state of the resource in the ETag header.

Sample request: 
`GET http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab`

```
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNhO...
...
```

Sample response:

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 18 Jun 2019 12:55:31 GMT
ETag: "cc89022a51522f705c44fcfced188cc8"
...
```

When updating the resource, the client must pass the Etag in the `If-Match` header. For example:

`PATCH http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab`

```
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNhO...
If-Match: "cc89022a51522f705c44fcfced188cc8"
...
```

If the resource is updated successfully, the server returns a new ETag:

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 18 Jun 2019 12:55:31 GMT
ETag: "ccc86e1a41d1f4e0ea52419a0bcd9761"
...
```

If the client makes a new attempt to update the resource, it needs to send the new ETag value in the `If-Match` header. Requests with the old ETag are rejected.

## Workflow diagram
The following diagram shows the workflow of resources that support concurrent requests:

![Workflow diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Handling+Concurrent+REST+Requests+and+Caching+with+Etags/entity-tag-process-flow.png){height="" width=""}

## Resources supporting concurrent requests with ETags
The following resource support concurrent requests with ETag headers by default:

| Endpoint | Methods | Resource |
| --- | --- | --- |
| [/carts](https://documentation.spryker.com/docs/rest-api-reference#/carts) | PATCH, DELETE | Registered users' cart. |

## Possible errors
The following error responses can be returned by the server when a resource supporting ETags is updated:

| Status | Reason |
| --- | --- |
| 412 | Pre-condition failed.</br>The `If-Match` header value is invalid or outdated. </br>Request the current state of the resource using a `GET` request to obtain a valid tag value. |
| 428 | Pre-condition required.</br>The `If-Match` header is missing. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

