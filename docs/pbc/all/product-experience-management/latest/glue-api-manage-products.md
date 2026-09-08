---
title: "Glue API: Manage products"
description: Retrieve, create, and update products through the Products Backend API, including the full attribute reference and update behavior.
last_updated: Sep 7, 2026
template: glue-api-storefront-guide-template
---

This document describes the `products` resource of the [Products Backend API](/docs/pbc/all/product-experience-management/latest/products-backend-api.html). The resource represents a concrete product together with the data of its parent abstract product.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Products Backend API](/docs/pbc/all/product-experience-management/latest/install/install-the-products-backend-api.html).

## Authorization

All operations require an authenticated Back Office user. To get an access token, see [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | Access token of a Back Office user. Requests without a valid token return `401`. |
| Content-Type | string | ✓ | `application/vnd.api+json`. |

## Retrieve a concrete product

To retrieve a concrete product, send the request:

---
`GET` **/products/{% raw %}{{sku}}{% endraw %}**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}{{sku}}{% endraw %} | SKU of the concrete product. |

### Request

```http
GET /products/093_56994599
Authorization: Bearer <access_token>
```

### Response

```json
{
    "data": {
        "type": "products",
        "id": "093_56994599",
        "attributes": {
            "sku": "093_56994599",
            "abstractSku": "093",
            "isActive": true,
            "attributes": {
                "color": "Black",
                "storage_capacity": "32 GB"
            },
            "superAttributeValues": {
                "color": "Black"
            },
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "name": "Canon IXUS 160",
                    "description": "Compact camera with a 20x optical zoom.",
                    "isSearchable": true
                }
            ],
            "prices": [
                {
                    "uuid": "7f3b1c92-5d64-4a0e-8b21-2f9c7d5e1a30",
                    "priceTypeName": "DEFAULT",
                    "currencyCode": "EUR",
                    "storeName": "DE",
                    "grossAmount": 12000,
                    "netAmount": 10800,
                    "volumePrices": []
                }
            ],
            "imageSets": [],
            "stocks": [
                {
                    "uuid": "c1a4e7b8-3f52-4d69-9e07-8b2d5c1f3a46",
                    "stockName": "Warehouse1",
                    "quantity": 42,
                    "isNeverOutOfStock": false
                }
            ],
            "productBundle": [],
            "productClass": [],
            "shipmentType": [],
            "stores": ["DE"],
            "taxSet": {
                "uuid": "2c4e3f10-1111-4a2b-9c3d-abcdef012345",
                "name": "Standard"
            },
            "categories": [
                {
                    "uuid": "cfe982b2-a558-5684-97d3-96f5ecf710c8",
                    "categoryKey": "digital-cameras",
                    "isActive": true,
                    "localizedAttributes": [
                        {
                            "localeName": "en_US",
                            "name": "Digital Cameras",
                            "url": null
                        }
                    ]
                }
            ]
        }
    }
}
```

For the attributes of the response, see [Product attributes](#product-attributes).

Nullable attributes are omitted from the response when they have no value.

## Retrieve concrete products

To retrieve a collection of concrete products, send the request:

---
`GET` **/products**

---

| QUERY PARAMETER | DESCRIPTION |
| --- | --- |
| `filter[products.sku]` | Returns the concrete product with this SKU. |
| `filter[products.skus][]` | Returns the concrete products with these SKUs. Repeat the parameter once per SKU. |
| `filter[products.abstractSku]` | Returns all variants of this parent abstract product. |
| `page` | Number of the page to return. The default is `1`. |
| `perPage` | Number of products per page. The default is `10`. |

Filter keys must include the `products.` resource prefix. A key without the prefix is rejected. An unknown value in `filter[products.abstractSku]` matches nothing and returns an empty collection with status `200`, not an error.

The API does not enforce a maximum page size, so keep `perPage` moderate on large catalogs.

### Request

```http
GET /products?filter[products.abstractSku]=093&page=2&perPage=20
Authorization: Bearer <access_token>
```

### Response

The response contains a `data` array of product resources in the same shape as [Retrieve a concrete product](#retrieve-a-concrete-product).

## Create a concrete product

To create a concrete product, send the request:

---
`POST` **/products**

---

### Request

`sku` is required. All other attributes are optional. When `abstractSku` is omitted, a parent abstract product is created automatically — see [Abstract and concrete product scope](#abstract-and-concrete-product-scope).

```http
POST /products
Authorization: Bearer <access_token>
Content-Type: application/vnd.api+json

{
    "data": {
        "type": "products",
        "attributes": {
            "sku": "093_56994599",
            "isActive": true,
            "attributes": {
                "color": "Black"
            },
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "name": "Canon IXUS 160",
                    "isSearchable": true
                }
            ],
            "prices": [
                {
                    "priceTypeName": "DEFAULT",
                    "storeName": "DE",
                    "currencyCode": "EUR",
                    "netAmount": 10800,
                    "grossAmount": 12000
                }
            ],
            "stocks": [
                {
                    "stockName": "Warehouse1",
                    "quantity": 42,
                    "isNeverOutOfStock": false
                }
            ]
        }
    }
}
```

### Response

The response contains the created product in the same shape as [Retrieve a concrete product](#retrieve-a-concrete-product).

## Update a concrete product

To update a concrete product, send the request:

---
`PATCH` **/products/{% raw %}{{sku}}{% endraw %}**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}{{sku}}{% endraw %} | SKU of the concrete product. |

### Request

Send only the attributes you want to change. Omitted attributes keep their stored values. For how collections are merged, see [Update behavior](#update-behavior).

```http
PATCH /products/093_56994599
Authorization: Bearer <access_token>
Content-Type: application/vnd.api+json

{
    "data": {
        "type": "products",
        "attributes": {
            "isActive": false,
            "stocks": [
                {
                    "uuid": "e7f3c1d2-4b5a-4c6d-8e9f-0a1b2c3d4e5f",
                    "stockName": "Warehouse1",
                    "quantity": 0
                }
            ]
        }
    }
}
```

### Response

The response contains the updated product in the same shape as [Retrieve a concrete product](#retrieve-a-concrete-product).

## Product attributes

The `products` resource combines concrete-level and abstract-level data in one flat attribute set. The `SCOPE` column shows which record an attribute belongs to. Abstract-level attributes are shared by all variants of the same abstract product.

| ATTRIBUTE | TYPE | WRITABLE | SCOPE | DESCRIPTION |
| --- | --- | --- | --- | --- |
| `sku` | string | Yes, on `POST` | Concrete | Unique SKU of the concrete product. Serves as the resource identifier. |
| `abstractSku` | string | Yes, on `POST` | Concrete | SKU of the parent abstract product. When omitted on `POST`, a parent is created automatically. |
| `isActive` | boolean | Yes | Concrete | Whether the concrete product is active. |
| `validFrom` | string | Yes | Concrete | Date and time from which the concrete product is valid, in `Y-m-d H:i:s` format. |
| `validTo` | string | Yes | Concrete | Date and time until which the concrete product is valid, in `Y-m-d H:i:s` format. |
| `attributes` | object | Yes | Concrete | Non-localized attribute key-value map. |
| `superAttributeValues` | object | No | Concrete | Values of the super attributes of the parent abstract product, derived from `attributes`. |
| `localizedAttributes` | array | Yes | Concrete | Localized names and descriptions, one entry per locale. |
| `prices` | array | Yes | Concrete | Prices per price type, store, and currency. |
| `imageSets` | array | Yes | Concrete | Image sets and their images. |
| `stocks` | array | Yes | Concrete | Stock quantities per warehouse. |
| `productBundle` | array | Yes | Concrete | Bundled product assignments. Empty when the product is not a bundle. |
| `productClass` | array | Yes | Concrete | Product class assignments. |
| `shipmentType` | array | Yes | Concrete | Shipment type assignments. |
| `stores` | array of string | Yes | Abstract | Names of the stores the abstract product is assigned to. |
| `taxSet` | object | Yes | Abstract | Tax set assigned to the abstract product. `null` when none is assigned. |
| `categories` | array | Yes | Abstract | Category assignments of the abstract product. |
| `newFrom` | string | Yes | Abstract | Date and time from which the abstract product counts as new, in `Y-m-d H:i:s` format. |
| `newTo` | string | Yes | Abstract | Date and time until which the abstract product counts as new, in `Y-m-d H:i:s` format. |

### Attributes and super attribute values

`attributes` is a free-form key-value map of non-localized attribute values:

```json
{
    "attributes": {
        "color": "Black",
        "storage_capacity": "32 GB"
    }
}
```

`superAttributeValues` is read-only and derived server-side. It contains the subset of `attributes` whose keys are super attribute keys of the parent abstract product. You never write it directly: assign a super attribute through `attributes`, and it surfaces in `superAttributeValues` automatically. Values sent in `superAttributeValues` are ignored.

### Localized attributes

| ATTRIBUTE | TYPE | WRITABLE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- | --- |
| `localeName` | string | Yes | Yes | Locale the entry applies to, for example, `en_US`. |
| `name` | string | Yes | Yes | Localized product name. |
| `description` | string | Yes | No | Localized product description. |
| `isSearchable` | boolean | Yes | No | Whether the product is searchable in this locale. |

```json
{
    "localizedAttributes": [
        {
            "localeName": "en_US",
            "name": "Canon IXUS 160",
            "description": "Compact camera with a 20x optical zoom.",
            "isSearchable": true
        }
    ]
}
```

An unknown locale is rejected with a validation error.

### Prices

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | No | UUID of the stored price row. |
| `priceTypeName` | string | Yes | Price type, for example, `DEFAULT` or `ORIGINAL`. |
| `currencyCode` | string | Yes | ISO 4217 currency code. |
| `storeName` | string | Yes | Store the price applies to. |
| `grossAmount` | integer | Yes | Gross amount in minor units, for example, cents. |
| `netAmount` | integer | Yes | Net amount in minor units, for example, cents. |
| `volumePrices` | array | Yes | Quantity-tiered prices. |

Prices are addressed on write by the combination of `priceTypeName`, `currencyCode`, and `storeName`. Sending a price whose combination already exists updates that price instead of creating a second one. Amounts must be zero or greater.

```json
{
    "prices": [
        {
            "priceTypeName": "DEFAULT",
            "currencyCode": "EUR",
            "storeName": "DE",
            "grossAmount": 12000,
            "netAmount": 10800,
            "volumePrices": [
                {
                  "quantity": 5,
                  "netPrice": 600,
                  "grossPrice": 660
                },
                {
                  "quantity": 10,
                  "netPrice": 500,
                  "grossPrice": 550
                }
            ]
        }
    ]
}
```

### Image sets

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | Yes | UUID of an image set already owned by this product. Omit it to add a new set. |
| `name` | string | Yes | Name of the image set. |
| `localeName` | string | Yes | Locale of the image set. Omit it for a locale-agnostic set. |
| `images` | array | Yes | Ordered images belonging to the set. |

An unknown `uuid` is rejected with a validation error. It is never silently ignored, and nothing from the request is persisted.

#### Images

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `externalUrlSmall` | string | Yes | URL of the small-format image. |
| `externalUrlLarge` | string | Yes | URL of the large-format image. |
| `altTextSmall` | string | Yes | Alternative text of the small-format image. |
| `altTextLarge` | string | Yes | Alternative text of the large-format image. |
| `sortOrder` | integer | Yes | Position of the image within the set, in ascending order. |

```json
{
    "imageSets": [
        {
            "name": "default",
            "localeName": "en_US",
            "images": [
                {
                    "externalUrlSmall": "https://example.com/images/small/ixus-160.jpg",
                    "externalUrlLarge": "https://example.com/images/large/ixus-160.jpg",
                    "altTextSmall": "Canon IXUS 160, front view",
                    "altTextLarge": "Canon IXUS 160, front view, high resolution",
                    "sortOrder": 0
                }
            ]
        }
    ]
}
```

Both image URLs must be valid URLs.

### Stocks

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | No | UUID of the warehouse the stock row belongs to. |
| `stockName` | string | Yes | Warehouse name. |
| `quantity` | integer | Yes | Available quantity. Must be zero or greater. |
| `isNeverOutOfStock` | boolean | Yes | When `true`, `quantity` is ignored and the product is always available. |

An unknown stock is rejected with a validation error.

```json
{
    "stocks": [
        {
            "uuid": "e7f3c1d2-4b5a-4c6d-8e9f-0a1b2c3d4e5f",
            "stockName": "Warehouse1",
            "quantity": 42,
            "isNeverOutOfStock": false
        }
    ]
}
```

### Product bundle

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `sku` | string | Yes | SKU of the bundled concrete product. |
| `quantity` | integer | Yes | Number of units of the bundled product. Must be greater than zero. |

```json
{
    "productBundle": [
        {
            "sku": "094_30663301",
            "quantity": 2
        }
    ]
}
```

### Product class

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `key` | string | Yes | Key of the assigned product class. |
| `name` | string | No | Display name of the assigned product class. |

Product classes are assigned by `key`. An unknown key is rejected with a validation error.

### Shipment type

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | Yes | UUID of the assigned shipment type. |
| `name` | string | No | Display name of the assigned shipment type. |

Shipment types are assigned by `uuid`. An unknown UUID is rejected with a validation error.

### Stores

`stores` is an array of store names assigned to the parent abstract product:

```json
{
    "stores": ["DE", "AT"]
}
```

An unknown store name is rejected with a validation error.

### Tax set

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | Yes | UUID of the tax set assigned to the parent abstract product. |
| `name` | string | No | Display name of the assigned tax set. |

The tax set is written by `uuid` and read back with its display name. The attribute is `null` when the abstract product has no tax set.

### Categories

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | Yes | UUID of the assigned category. |
| `categoryKey` | string | No | Machine key of the category. |
| `isActive` | boolean | No | Whether the category is active. |
| `localizedAttributes` | array | No | Localized attributes of the category, one entry per locale. |

Categories are assigned by `uuid`. Everything else is returned for convenience on read.

#### Category localized attributes

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| `localeName` | string | Locale the entry applies to. |
| `name` | string | Localized category name. |
| `url` | string | Localized category URL. `null` when not set. |

```json
{
    "categories": [
        {
            "uuid": "cfe982b2-a558-5684-97d3-96f5ecf710c8",
            "categoryKey": "digital-cameras",
            "isActive": true,
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "name": "Digital Cameras",
                    "url": null
                }
            ]
        }
    ]
}
```

{% info_block infoBox "Category, tax set, price, and image set UUIDs" %}

Categories, tax sets, prices, and image sets are referenced by UUID. Records created before you installed this API have no UUID until you generate them. See [Install the Products Backend API](/docs/pbc/all/product-experience-management/latest/install/install-the-products-backend-api.html).

{% endinfo_block %}

## Abstract and concrete product scope

The resource represents a concrete product, but five attributes act on its parent abstract product: `stores`, `taxSet`, `categories`, `newFrom`, and `newTo`. Because abstract-level data is shared, writing any of them through one variant changes it for every variant of the same abstract product.

When you send `POST /products` without `abstractSku`, a parent abstract product is created automatically. Its SKU is derived from the concrete SKU using the `%s-abstract` pattern, so `093_56994599` produces `093_56994599-abstract`. The new abstract product also receives copies of the `attributes`, `localizedAttributes`, `prices`, and `imageSets` sent in the request, and any abstract-level attributes you supplied.

When you send `abstractSku`, the concrete product is attached to that existing abstract product. The abstract product is only written when the request contains at least one abstract-level attribute.

## Update behavior

`PATCH` merges the submitted data into the stored product. Omitting an attribute leaves the stored value untouched, which lets an integration send only what changed.

Within that model, each collection has its own matching rule:

- **Every collection is additive.** `stores`, `categories`, `productClass`, `shipmentType`, `productBundle`, `stocks`, and `prices` entries sent in the request are added or updated, but entries already stored are never removed, and sending an empty array does not clear them. Product classes are matched by `key`, shipment types by `uuid`, bundled products by `sku`, and stocks by `stockName`. Remove an assignment in the Back Office instead.
- **Read-only attributes** such as `superAttributeValues` and `categories.localizedAttributes` are ignored when sent. Echoing a previous response back in a `PATCH` request is safe.

Every write runs inside a single database transaction. If any part of the request fails validation, nothing is persisted — a request that changes a stock quantity and references an unknown category leaves the stock quantity unchanged.

## Possible errors

| CODE | REASON |
| --- | --- |
| 901 | The request failed validation. An attribute is malformed, or it references an entity that does not exist. |
| 902 | No concrete product exists with the requested SKU. |

Errors are returned in an `errors` array. Each entry carries the Spryker error `code`, the HTTP `status`, and a message:

```json
{
    "errors": [
        {
            "code": "901",
            "status": 422,
            "detail": "Field \"newFrom\" must not be later than \"newTo\".",
            "message": "Field \"newFrom\" must not be later than \"newTo\"."
        }
    ]
}
```

A request with a body that is not a valid JSON:API document, or with the identifier missing from the path, returns `400`. A request without a valid Back Office access token returns `401`.
