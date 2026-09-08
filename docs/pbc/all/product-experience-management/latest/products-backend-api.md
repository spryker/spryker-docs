---
title: Products Backend API
description: Manage products programmatically through the Glue Backend API, running the same business rules as the Back Office.
last_updated: Sep 7, 2026
template: default
---

The Products Backend API lets external systems create, read, and update products in your shop over HTTP. It covers the product data a Back Office user works with — names and descriptions per locale, prices, stock, images, categories, and store assignments — and presents it as a single `products` resource on the Glue Backend API.

The resource is built on [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html) and ships with the Product Experience Management feature. For the products themselves, see the [Product feature overview](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html).

## When to use the Products Backend API

Use this API when an external system needs to read or change product data through Spryker business logic:

- **Custom Back Office applications.** You replace or extend the standard Back Office with your own interface and need product management operations that behave identically to the standard one.
- **Third-party system integrations.** A PIM, ERP, or middleware platform maintains product data in Spryker as part of an ongoing exchange, rather than through scheduled file imports.

### Products behave as they do in the Back Office

Every request runs through the same business rules, validation, and cross-module side effects that apply when a Back Office user edits a product. A product created through the API is indistinguishable from one created in the Back Office: references to categories, warehouses, or tax sets are checked before anything is written, and search indexes and Storefront data are updated the same way.

### One request covers the whole product

A single request updates prices, stocks, image sets, categories, bundles, product classes, and shipment types together. An integration does not have to call several endpoints in sequence or reproduce the rules governing the order in which product data must be written.

## How the Products Backend API compares to other product APIs

Spryker offers three ways to work with product data over HTTP. They serve different purposes:

| API | Audience | Business logic | Typical use |
| --- | --- | --- | --- |
| Storefront API | Shoppers and Storefront applications | Read-only projections optimized for the Storefront | Displaying catalog data in a headless Storefront |
| [Data Exchange API](/docs/integrations/spryker-api/backend-api/data-exchange-api/sending-requests-to-data-exchange-api.html) | Technical integrations | None — generic access to configured database entities | Moving raw records in and out of tables |
| Products Backend API | Back Office applications and business integrations | Full Back Office business rules, validation, and side effects | Managing products from a custom Back Office or a third-party system |

The Data Exchange API writes to tables you configure and does not apply product business rules. The Products Backend API applies them, which is why it validates references, keeps abstract and concrete data consistent, and triggers the same publishing and search updates as the Back Office.

Within the Product Experience Management feature, the API is the programmatic counterpart of the CSV import and export workflow. Use the CSV workflow for bulk changes prepared and reviewed by Back Office users, and the API for ongoing programmatic access.

## Supported operations

| OPERATION | METHOD AND PATH |
| --- | --- |
| Retrieve a concrete product | `GET /products/{sku}` |
| Retrieve concrete products | `GET /products` |
| Create a concrete product | `POST /products` |
| Update a concrete product | `PATCH /products/{sku}` |

For requests, responses, the full attribute reference, and update behavior, see [Glue API: Manage products](/docs/pbc/all/product-experience-management/latest/glue-api-manage-products.html).

## Current constraints

- `DELETE` is not supported. Products are deactivated by setting `isActive` to `false`, not removed.
- Nothing can be unassigned through this API. Stores, categories, product classes, shipment types, and bundled products can only be added or updated. Remove them in the Back Office.
- `abstractSku` is immutable. A concrete product cannot be moved to another abstract product through this API.
- `superAttributeValues` cannot be written directly. It is derived from `attributes`.
- Product data is only accepted for entities that already exist. Warehouses, stores, categories, tax sets, product classes, shipment types, and locales must be created before they are referenced.

## Related Developer documents

| GLUE API GUIDES | INSTALLATION GUIDES |
| --- | --- |
| [Glue API: Manage products](/docs/pbc/all/product-experience-management/latest/glue-api-manage-products.html) | [Install the Products Backend API](/docs/pbc/all/product-experience-management/latest/install/install-the-products-backend-api.html) |
| [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html) | [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html) |
