---
title: "Backend API: Manage product assignments of a category"
description: Learn how to assign products to a category, retrieve the assigned products, and unassign them in bulk using the Spryker Backend API.
last_updated: Sep 4, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve categories
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-retrieve-categories.html
  - title: Create a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-create-a-category.html
  - title: Update a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-update-a-category.html
  - title: Delete a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-delete-a-category.html
---

The `category-products` sub-resource of the Backend API manages which abstract products are assigned to a category. This document describes how to assign products to a category in bulk, retrieve the assigned products, and unassign some or all of them.

## Installation

For details on the module that provides the API capability and how to install it, see [Install the Product Experience Management feature](/docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html).

## Assign products to a category

To assign one or more abstract products to a category, send the request:

---
`POST` **/categories/*{% raw %}{{category_key}}{% endraw %}*/assign-products**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{category_key}}***{% endraw %} | Key of the category. The key is matched case-insensitively. To get it, [retrieve categories](/docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-retrieve-categories.html#retrieve-categories). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: assign products to a category

`POST https://glue-backend.mysprykershop.com/categories/gaming-laptops/assign-products`

```json
{
    "data": {
        "type": "category-products",
        "attributes": {
            "skus": ["112", "113"]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| skus | Array | &check; | Non-empty list of abstract product SKUs to assign. The operation is all-or-nothing: if any SKU is unknown, nothing is assigned. SKUs that are already assigned are ignored, so repeating the request is safe. |

### Response

If the products are assigned successfully, the endpoint returns the `204 No Content` status code.

## Retrieve the products assigned to a category

To retrieve the paginated list of abstract products assigned to a category, send the request:

---
`GET` **/categories/*{% raw %}{{category_key}}{% endraw %}*/products**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| page[limit] | Number of products per page. Default: `10`. | `page[limit]=20` |
| page[offset] | Number of products to skip. Default: `0`. | `page[offset]=20` |

The products are ordered by their position within the category in ascending order. The product name is returned in the request locale, which you pass in the `Accept-Language` header; if the header is missing, the default locale is used.

Request sample: retrieve the products assigned to a category

`GET https://glue-backend.mysprykershop.com/categories/gaming-laptops/products?page[limit]=1`

### Response

<details>
<summary>Response sample: retrieve the products assigned to a category</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/categories/gaming-laptops/products",
        "first": "https://glue-backend.mysprykershop.com/categories/gaming-laptops/products?page[limit]=1&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/categories/gaming-laptops/products?page[limit]=1&page[offset]=1",
        "next": "https://glue-backend.mysprykershop.com/categories/gaming-laptops/products?page[limit]=1&page[offset]=1"
    },
    "meta": {
        "pagination": {
            "numFound": 2,
            "currentPage": 1,
            "maxPage": 2,
            "currentItemsPerPage": 1
        }
    },
    "data": [
        {
            "id": "112",
            "type": "category-products",
            "attributes": {
                "sku": "112",
                "name": "Acer Extensa M2610",
                "position": 0
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/categories/gaming-laptops/products/112"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| sku | String | SKU of the assigned abstract product. It is also the resource `id`. |
| name | String | Name of the product in the request locale. |
| position | Integer | Position of the product within the category. |

The pagination summary in `meta.pagination` has the same structure as in the [category collection](/docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-retrieve-categories.html#retrieve-categories).

## Retrieve a product assigned to a category

To retrieve a single product assignment, send the request:

---
`GET` **/categories/*{% raw %}{{category_key}}{% endraw %}*/products/*{% raw %}{{sku}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{category_key}}***{% endraw %} | Key of the category. |
| {% raw %}***{{sku}}***{% endraw %} | SKU of the abstract product. To get it, [retrieve the products assigned to the category](#retrieve-the-products-assigned-to-a-category). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: retrieve a product assigned to a category

`GET https://glue-backend.mysprykershop.com/categories/gaming-laptops/products/112`

### Response

<details>
<summary>Response sample: retrieve a product assigned to a category</summary>

```json
{
    "data": {
        "id": "112",
        "type": "category-products",
        "attributes": {
            "sku": "112",
            "name": "Acer Extensa M2610",
            "position": 0
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/categories/gaming-laptops/products/112"
        }
    }
}
```

</details>

## Unassign products from a category

To unassign some or all abstract products from a category, send the request:

---
`POST` **/categories/*{% raw %}{{category_key}}{% endraw %}*/unassign-products**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: unassign specific products from a category

`POST https://glue-backend.mysprykershop.com/categories/gaming-laptops/unassign-products`

```json
{
    "data": {
        "type": "category-products",
        "attributes": {
            "skus": ["112"]
        }
    }
}
```

Request sample: unassign all products from a category

`POST https://glue-backend.mysprykershop.com/categories/gaming-laptops/unassign-products`

```json
{
    "data": {
        "type": "category-products",
        "attributes": {
            "all": true
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| skus | Array | &check; unless `all` is `true` | Non-empty list of abstract product SKUs to unassign. The operation is all-or-nothing: if any SKU is unknown or not assigned to the category, nothing is removed. |
| all | Boolean | &check; unless `skus` is provided | Set to `true` to unassign all products from the category. Cannot be combined with `skus`. Repeating the request on a category without assignments is safe. |

### Response

If the products are unassigned successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 400 | 400 | `skus` is missing or empty in the assign request. |
| 400 | 400 | Neither `skus` nor `all: true` is provided in the unassign request, or both are provided. |
| 404 | N/A | The category with the specified key doesn't exist. |
| 404 | N/A | The product with the specified SKU doesn't exist or is not assigned to the category. |
| 422 | N/A | One or more SKUs in the assign request are unknown. Nothing is assigned; the unknown SKUs are listed in the error details. |
| 422 | N/A | One or more SKUs in the unassign request are unknown or not assigned to the category. Nothing is removed; the offending SKUs are listed in the error details. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `categories` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
