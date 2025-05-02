---
title: Handling concurrent REST requests and caching with entity tags
description: This article will provide you with information on how to handle concurrent requests and implement client-side caching with the help of entity tags.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/handling-concurrent-rest-requests-and-caching-with-entity-tags
originalArticleId: cad91b14-3390-44bb-8e8e-4c6b72926dcc
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/handling-concurrent-rest-requests-and-caching-with-entity-tags.html
  - /docs/scos/dev/glue-api-guides/202204.0/handling-concurrent-rest-requests-and-caching-with-entity-tags.html
  - /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/handling-concurrent-rest-requests-and-caching-with-entity-tags
related:
  - title: Glue Infrastructure
    link: docs/dg/dev/glue-api/page.version/rest-api/glue-infrastructure.html
  - title: Shared Cart Feature Overview
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/feature-overviews/shared-carts-feature-overview.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

{% info_block warningBox %}

This document is related to the Old Glue infrastructure. For the new one, see [Decoupled Glue API](/docs/dg/dev/glue-api/{{page.version}}/decoupled-glue-api.html)

{% endinfo_block %}

Some Spryker Glue API resources allow concurrent changes from multiple sources. For example, a shared cart can be changed by multiple users that act independently.

To ensure resource integrity and consistency, such resources implement *Entity Tags* (ETags). An ETag is a unique identifier of the state of a specific resource at a certain point in time. It allows a server to identify if the client initiating a change has received the last state of the resource known to the server prior to sending the change request.

Apart from that, ETags can also boost API performance via caching. They can be used by a client to identify when a new version of a resource needs to be requested. For example, a client can cache the state of a user's cart and request an updated version only when the associated ETag changes. Since Etags are stored in Spryker's KV Storage ([Redis](/docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage.html) by default), tag matching is performed much faster than fetching cart data.

## Request flow

When a client requests a resource that supports ETag optimization and is authorized to use it, the Glue API server responds with a REST response. It contains an identifier of the current state of the resource in the ETag header.

Request sample:

`GET http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab`

```
Content-Type: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNhO...
...
```

Response sample:

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

![Workflow diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Handling+Concurrent+REST+Requests+and+Caching+with+Etags/entity-tag-process-flow.png)

## Resources supporting concurrent requests with ETags

The following resource support concurrent requests with ETag headers by default:

| ENDPOINT | METHODS | RESOURCE |
| --- | --- | --- |
| /carts | PATCH, DELETE | Registered users' cart. |

## Possible errors

The following error responses can be returned by the server when a resource supporting ETags is updated:

| CODE | REASON |
| --- | --- |
| 005 | Pre-condition required.<br>The `If-Match` header is missing. |
| 006 | Pre-condition failed.<br>The `If-Match` header value is invalid or outdated. <br>Request the current state of the resource using a `GET` request to obtain a valid tag value. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
