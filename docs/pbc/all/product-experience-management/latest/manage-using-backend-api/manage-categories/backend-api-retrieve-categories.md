---
title: "Backend API: Retrieve categories"
description: Learn how to retrieve the category collection and single categories, and how to paginate, sort, and filter them using the Spryker Backend API.
last_updated: Sep 4, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Create a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-create-a-category.html
  - title: Update a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-update-a-category.html
  - title: Delete a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-delete-a-category.html
  - title: Manage product assignments of a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-manage-product-assignments-of-a-category.html
---

The `categories` resource of the Backend API lets Back Office integrations read the category tree of the shop. This document describes how to retrieve a paginated category collection and a single category by its key.

## Installation

For details on the module that provides the API capability and how to install it, see [Install the Product Experience Management feature](/docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html).

## Retrieve categories

To retrieve a paginated collection of categories, send the request:

---
`GET` **/categories**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| page[limit] | Number of categories per page. Default: `10`. | `page[limit]=20` |
| page[offset] | Number of categories to skip. Default: `0`. | `page[offset]=20` |
| sort | Sorts the collection by a field. Prefix the field with `-` for descending order. Supported fields: `categoryKey`, `position`, `name`. `name` sorts by the localized name in the request locale, which you pass in the `Accept-Language` header; if the header is missing, the default locale is used. Categories without a name in that locale are not part of a name-sorted result. Any other field returns a `400` error. | `sort=name`<br>`sort=-position` |
| parentCategoryKey | Returns only the direct children of the category with the specified key, including the categories that have it as an additional parent. The key is matched case-insensitively. An unknown key returns a `404` error. | `parentCategoryKey=computer` |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/categories` | Retrieve the first page of the category collection. |
| `GET https://glue-backend.mysprykershop.com/categories?page[limit]=2&page[offset]=2` | Retrieve the second page of the collection with two categories per page. |
| `GET https://glue-backend.mysprykershop.com/categories?sort=-name` | Retrieve categories sorted by their localized name in descending order. |
| `GET https://glue-backend.mysprykershop.com/categories?parentCategoryKey=computer&sort=position` | Retrieve the direct child categories of the `computer` category ordered as in the Back Office category tree. |

### Response

The pagination summary is returned in the top-level `meta.pagination` object, and the pagination links in the top-level `links` object. Collection members do not carry pagination data.

<details>
<summary>Response sample: retrieve categories</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/categories",
        "first": "https://glue-backend.mysprykershop.com/categories?page[limit]=2&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/categories?page[limit]=2&page[offset]=32",
        "prev": "https://glue-backend.mysprykershop.com/categories?page[limit]=2&page[offset]=0",
        "next": "https://glue-backend.mysprykershop.com/categories?page[limit]=2&page[offset]=4"
    },
    "meta": {
        "pagination": {
            "numFound": 34,
            "currentPage": 2,
            "maxPage": 17,
            "currentItemsPerPage": 2
        }
    },
    "data": [
        {
            "id": "camcorders",
            "type": "categories",
            "attributes": {
                "categoryKey": "camcorders",
                "isActive": true,
                "isInMenu": true,
                "isSearchable": true,
                "isClickable": true,
                "templateName": "Catalog (default)",
                "parentCategoryKey": "cameras-and-camcorder",
                "position": 90,
                "extraParentCategoryKeys": [],
                "localizedAttributes": [
                    {
                        "localeName": "de_DE",
                        "name": "Digitale Videokameras",
                        "metaTitle": "Digitale Videokameras",
                        "metaDescription": "Digitale Videokameras",
                        "metaKeywords": "Digitale Videokameras",
                        "url": "/de/kameras-&-camcorders/digitale-videokameras"
                    },
                    {
                        "localeName": "en_US",
                        "name": "Camcorders",
                        "metaTitle": "Camcorders",
                        "metaDescription": "Camcorders",
                        "metaKeywords": "Camcorders",
                        "url": "/en/cameras-&-camcorders/camcorders"
                    }
                ],
                "stores": [
                    "DE",
                    "AT"
                ],
                "imageSets": [],
                "isRoot": false
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/categories/camcorders"
            }
        },
        {
            "id": "digital-cameras",
            "type": "categories",
            "attributes": {
                "categoryKey": "digital-cameras",
                "isActive": true,
                "isInMenu": true,
                "isSearchable": true,
                "isClickable": true,
                "templateName": "Catalog (default)",
                "parentCategoryKey": "cameras-and-camcorder",
                "position": 100,
                "extraParentCategoryKeys": [],
                "localizedAttributes": [
                    {
                        "localeName": "de_DE",
                        "name": "Digitale Kameras",
                        "metaTitle": "Digitale Kameras",
                        "metaDescription": "Digitale Kameras",
                        "metaKeywords": "Digitale Kameras",
                        "url": "/de/kameras-&-camcorders/digitale-kameras"
                    },
                    {
                        "localeName": "en_US",
                        "name": "Digital Cameras",
                        "metaTitle": "Digital Cameras",
                        "metaDescription": "Digital Cameras",
                        "metaKeywords": "Digital Cameras",
                        "url": "/en/cameras-&-camcorders/digital-cameras"
                    }
                ],
                "stores": [
                    "DE",
                    "AT"
                ],
                "imageSets": [],
                "isRoot": false
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/categories/digital-cameras"
            }
        }
    ]
}
```

</details>

| META ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| pagination.numFound | Integer | Total number of categories in the collection. |
| pagination.currentPage | Integer | Number of the current page. |
| pagination.maxPage | Integer | Total number of pages. |
| pagination.currentItemsPerPage | Integer | Number of categories per page. |

{% include /pbc/all/glue-api-guides/latest/categories-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/categories-backend-response-attributes.md -->

## Retrieve a category

To retrieve a single category, send the request:

---
`GET` **/categories/*{% raw %}{{category_key}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{category_key}}***{% endraw %} | Key of the category to retrieve. The key is matched case-insensitively. To get it, [retrieve categories](#retrieve-categories). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: retrieve a category

`GET https://glue-backend.mysprykershop.com/categories/computer`

### Response

<details>
<summary>Response sample: retrieve a category</summary>

```json
{
    "data": {
        "id": "computer",
        "type": "categories",
        "attributes": {
            "categoryKey": "computer",
            "isActive": true,
            "isInMenu": true,
            "isSearchable": true,
            "isClickable": true,
            "templateName": "CMS Block",
            "parentCategoryKey": "demoshop",
            "position": 100,
            "extraParentCategoryKeys": [],
            "localizedAttributes": [
                {
                    "localeName": "de_DE",
                    "name": "Computer",
                    "metaTitle": "Computer",
                    "metaDescription": "Computer",
                    "metaKeywords": "Computer",
                    "url": "/de/computer"
                },
                {
                    "localeName": "en_US",
                    "name": "Computer",
                    "metaTitle": "Computer",
                    "metaDescription": "Computer",
                    "metaKeywords": "Computer",
                    "url": "/en/computer"
                }
            ],
            "stores": [
                "DE",
                "AT"
            ],
            "imageSets": [],
            "isRoot": false
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/categories/computer"
        }
    }
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/categories-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/categories-backend-response-attributes.md -->

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 400 | 400 | The `sort` parameter references an unsupported field. The supported fields are listed in the error details. |
| 404 | N/A | The category with the specified key doesn't exist, or the category specified in the `parentCategoryKey` parameter doesn't exist. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `categories` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
