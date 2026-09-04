---
title: "Backend API: Update a category"
description: Learn how to update category attributes, move a category to another parent, and reorder categories using the Spryker Backend API.
last_updated: Sep 4, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve categories
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-retrieve-categories.html
  - title: Create a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-create-a-category.html
  - title: Delete a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-delete-a-category.html
  - title: Manage product assignments of a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-manage-product-assignments-of-a-category.html
---

The `categories` resource of the Backend API lets Back Office integrations update categories, including moving them in the category tree and reordering them among their siblings. This document describes how to update a category.

## Installation

For details on the module that provides the API capability and how to install it, see [Install the Product Experience Management feature](/docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html).

## Update a category

To update a category, send the request:

---
`PATCH` **/categories/*{% raw %}{{category_key}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{category_key}}***{% endraw %} | Key of the category to update. The key is matched case-insensitively. To get it, [retrieve categories](/docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-retrieve-categories.html#retrieve-categories). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

The update is partial: attributes you omit keep their stored values. Attributes that hold a list behave as follows:

- `localizedAttributes`: entries are merged by `localeName`. An entry updates only the fields it contains; locales you omit stay untouched.
- `extraParentCategoryKeys`, `stores`, `imageSets`: the stored list is replaced with the provided one. Omit the attribute to keep the stored list; send an empty array to remove all entries.

Request sample: move a category under another parent and update its attributes

`PATCH https://glue-backend.mysprykershop.com/categories/gaming-laptops`

```json
{
    "data": {
        "type": "categories",
        "id": "gaming-laptops",
        "attributes": {
            "parentCategoryKey": "notebooks",
            "position": 1,
            "isActive": false,
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "metaTitle": "Gaming Laptops and Notebooks"
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| parentCategoryKey | String | | Key of the new parent category. A new value moves the category with its whole subtree under the new parent and regenerates the category URLs. The key is matched case-insensitively. The category itself and its descendants are not allowed as the parent. The root category cannot be moved. |
| position | Integer | | New sort weight of the category among its siblings. Use it to reorder categories on one level. |
| templateName | String | | Name of an existing category template. The name is case-sensitive. |
| isActive | Boolean | | Defines whether the category is active. |
| isInMenu | Boolean | | Defines whether the category is shown in the Storefront navigation menu. |
| isSearchable | Boolean | | Defines whether the category is searchable. |
| isClickable | Boolean | | Defines whether the category is clickable in the Storefront. |
| localizedAttributes | Array | | Localized attributes to update, merged by `localeName`. Changing `name` regenerates the category URL in that locale. |
| extraParentCategoryKeys | Array | | Keys of the additional parent categories. Replaces the stored list. |
| stores | Array | | Names of the stores the category is assigned to. Replaces the stored list. |
| imageSets | Array | | Image sets of the category. Replaces the stored list. |

`categoryKey` and `isRoot` cannot be changed.

### Response

<details>
<summary>Response sample: update a category</summary>

```json
{
    "data": {
        "id": "gaming-laptops",
        "type": "categories",
        "attributes": {
            "categoryKey": "gaming-laptops",
            "isActive": false,
            "isInMenu": true,
            "isSearchable": true,
            "isClickable": true,
            "templateName": "Catalog (default)",
            "parentCategoryKey": "notebooks",
            "position": 1,
            "extraParentCategoryKeys": [],
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "name": "Gaming Laptops",
                    "metaTitle": "Gaming Laptops and Notebooks",
                    "metaDescription": "High-performance laptops",
                    "metaKeywords": "gaming, laptops",
                    "url": "/en/computer/notebooks/gaming-laptops"
                },
                {
                    "localeName": "de_DE",
                    "name": "Gaming-Laptops",
                    "metaTitle": "Gaming-Laptops",
                    "metaDescription": "Leistungsstarke Laptops",
                    "metaKeywords": "gaming, laptops",
                    "url": "/de/computer/notebooks/gaming-laptops"
                }
            ],
            "stores": [
                "DE",
                "AT"
            ],
            "imageSets": [
                {
                    "localeName": "en_US",
                    "name": "default",
                    "images": [
                        {
                            "externalUrlSmall": "https://images.example.com/gaming-s.jpg",
                            "externalUrlLarge": "https://images.example.com/gaming-l.jpg",
                            "sortOrder": 0
                        }
                    ]
                }
            ],
            "isRoot": false
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/categories/gaming-laptops"
        }
    }
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/categories-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/categories-backend-response-attributes.md -->

## Possible errors

The request is validated as a whole: if any check fails, nothing is updated and all failed checks are returned in the `errors` array.

| STATUS | CODE | REASON |
| --- | --- | --- |
| 404 | N/A | The category with the specified key doesn't exist. |
| 422 | 901 | An attribute has a wrong type. |
| 422 | N/A | `categoryKey` differs from the key of the category. The key cannot be changed. |
| 422 | N/A | `isRoot` differs from the stored value. The root status cannot be changed. |
| 422 | N/A | `parentCategoryKey` is provided for the root category. The root category cannot be moved. |
| 422 | N/A | The category specified in `parentCategoryKey` or `extraParentCategoryKeys` doesn't exist. |
| 422 | N/A | The category specified in `parentCategoryKey` or `extraParentCategoryKeys` is the category itself or one of its descendants. |
| 422 | N/A | The template specified in `templateName` doesn't exist. The available template names are listed in the error details. |
| 422 | N/A | A locale specified in `localizedAttributes` is not available, or an entry has no `localeName`. |
| 422 | N/A | A store specified in `stores` doesn't exist. |
| 422 | N/A | A category with the same name already exists on the target level. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `categories` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
