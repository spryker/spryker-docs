---
title: Handle concurrent requests with entity tags in API Platform
description: Enable ETag and If-Match handling for API Platform resources to protect concurrent updates and support client-side caching.
last_updated: Jul 31, 2026
template: howto-guide-template
related:
  - title: Resource schemas
    link: docs/integrations/spryker-api/api-platform/resource-schemas.html
  - title: API Platform
    link: docs/integrations/spryker-api/api-platform/api-platform.html
  - title: Handle concurrent requests with entity tags in Glue
    link: docs/integrations/spryker-api/storefront-api/developing-apis/handling-concurrent-rest-requests-and-caching-with-entity-tags.html
---

Entity tags (ETags) protect resources from conflicting concurrent updates and support client-side caching. A `GET` request returns an `ETag` response header; update requests send that value back in the `If-Match` request header, and the API rejects the update if the resource has changed in the meantime.

The client-facing contract—the `ETag` and `If-Match` headers and the `412 Precondition Failed` and `428 Precondition Required` responses—is the same as on the legacy Glue infrastructure. For enabling entity tags on Glue-served endpoints, see [Handling concurrent REST requests and caching with entity tags](/docs/integrations/spryker-api/storefront-api/developing-apis/handling-concurrent-rest-requests-and-caching-with-entity-tags.html).

## Prerequisites

Entity tag handling for API Platform resources is provided by the `EntityTagsRestApi` module together with the `EntityTag` module, which stores and validates the tags. Make sure both modules are installed in your project.

## Enable entity tags for a resource

Declare the entity tag behavior per operation using `extraProperties` flags in the resource schema:

```yaml
resource:
    name: Carts
    shortName: carts

    operations:
        - type: Post
          extraProperties:
              entityTag: write

        - type: Get
          extraProperties:
              entityTag: read

        - type: Patch
          extraProperties:
              entityTag: write
              ifMatchRequired: true
```

Regenerate the resources afterwards:

```bash
docker/sdk cli glue api:generate
```

The Carts resource shipped by Spryker uses this configuration by default.

## Flag reference

| Flag | Behavior |
| --- | --- |
| `entityTag: read` | The `GET` operation reads the stored ETag—or lazily writes one from the response payload if none is stored yet—and returns it in the `ETag` response header. |
| `entityTag: write` | The `POST` or `PATCH` operation overwrites the stored ETag with a fresh hash of the response payload and returns the new value in the `ETag` response header. |
| `ifMatchRequired: true` | The request must carry an `If-Match` header. A missing header results in `428 Precondition Required`; a value that does not match the stored ETag results in `412 Precondition Failed`. |

## Request flow example

1. The client retrieves the resource and receives the current entity tag:

   ```http
   GET /carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9
   → 200 OK
   → ETag: "df9bda1710b58ea1f8fda3a780f53c13"
   ```

2. The client updates the resource, passing the tag back:

   ```http
   PATCH /carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9
   If-Match: "df9bda1710b58ea1f8fda3a780f53c13"
   → 200 OK
   → ETag: "a1b2c3d4e5f67890a1b2c3d4e5f67890"
   ```

3. A concurrent client that still holds the old tag is rejected:

   ```http
   PATCH /carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9
   If-Match: "df9bda1710b58ea1f8fda3a780f53c13"
   → 412 Precondition Failed
   ```

4. A request without the `If-Match` header—when the operation declares `ifMatchRequired: true`—is rejected:

   ```http
   PATCH /carts/0c3ec260-694a-5cec-b78c-d37d32f92ee9
   → 428 Precondition Required
   ```
