---
title: "Backend API: Create a category"
description: Learn how to create categories, including root and nested categories with localized attributes, stores, and image sets, using the Spryker Backend API.
last_updated: Sep 4, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve categories
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-retrieve-categories.html
  - title: Update a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-update-a-category.html
  - title: Delete a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-delete-a-category.html
  - title: Manage product assignments of a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-manage-product-assignments-of-a-category.html
---

The `categories` resource of the Backend API lets Back Office integrations create categories in the category tree. This document describes how to create a category and which validations the request has to pass.

## Installation

For details on the module that provides the API capability and how to install it, see [Install the Product Experience Management feature](/docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html).

## Create a category

To create a category, send the request:

---
`POST` **/categories**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: create a category

`POST https://glue-backend.mysprykershop.com/categories`

```json
{
    "data": {
        "type": "categories",
        "attributes": {
            "categoryKey": "gaming-laptops",
            "parentCategoryKey": "computer",
            "templateName": "Catalog (default)",
            "isActive": true,
            "isInMenu": true,
            "isSearchable": true,
            "isClickable": true,
            "position": 5,
            "stores": ["DE", "AT"],
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "name": "Gaming Laptops",
                    "metaTitle": "Gaming Laptops",
                    "metaDescription": "High-performance laptops",
                    "metaKeywords": "gaming, laptops"
                },
                {
                    "localeName": "de_DE",
                    "name": "Gaming-Laptops",
                    "metaTitle": "Gaming-Laptops",
                    "metaDescription": "Leistungsstarke Laptops",
                    "metaKeywords": "gaming, laptops"
                }
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
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| categoryKey | String | &check; | Unique key of the category. It becomes the resource `id` and cannot be changed later. Keys are matched case-insensitively, so a key that differs from an existing one only by case is rejected as a duplicate. |
| parentCategoryKey | String | &check; unless `isRoot` is `true` | Key of the parent category. The key is matched case-insensitively; the response contains the stored key. |
| templateName | String | &check; | Name of an existing category template. The name is case-sensitive. |
| localizedAttributes | Array | &check; | Localized attributes of the category. Provide at least one entry; each entry needs `localeName` and a non-empty `name`. |
| localizedAttributes.localeName | String | &check; | Name of an available locale—for example, `en_US`. |
| localizedAttributes.name | String | &check; | Name of the category in the locale. Must be unique among the categories on the same level. The category URL is generated from it. |
| localizedAttributes.metaTitle | String | | Meta title of the category in the locale. |
| localizedAttributes.metaDescription | String | | Meta description of the category in the locale. |
| localizedAttributes.metaKeywords | String | | Meta keywords of the category in the locale. |
| isRoot | Boolean | | Set to `true` to create the root category. Only one root category can exist, and `parentCategoryKey` must be omitted. Default: `false`. |
| isActive | Boolean | | Defines whether the category is active. Default: `false`. |
| isInMenu | Boolean | | Defines whether the category is shown in the Storefront navigation menu. Default: `true`. |
| isSearchable | Boolean | | Defines whether the category is searchable. Default: `true`. |
| isClickable | Boolean | | Defines whether the category is clickable in the Storefront. Default: `true`. |
| position | Integer | | Sort weight of the category among its siblings. Duplicates are allowed; setting it doesn't renumber the siblings. |
| extraParentCategoryKeys | Array | | Keys of additional parent categories. The keys are matched case-insensitively. |
| stores | Array | | Names of existing stores to assign the category to. |
| imageSets | Array | | Image sets of the category. |
| imageSets.localeName | String | | Locale name of the image set. Omit it for the default image set. |
| imageSets.name | String | &check; | Name of the image set. |
| imageSets.images | Array | &check; | Images of the image set. |
| imageSets.images.externalUrlSmall | String | &check; | URL of the small image. |
| imageSets.images.externalUrlLarge | String | &check; | URL of the large image. |
| imageSets.images.sortOrder | Integer | | Order of the image within the image set. |

{% info_block infoBox "Localized attributes" %}

The Back Office requires a name in every available locale. The API accepts a subset of locales, but a category without a name in a locale is not shown in the Back Office and in the Storefront for that locale, and it is not part of a name-sorted collection in that locale. Provide all locales unless you have a reason not to.

{% endinfo_block %}

### Response

<details>
<summary>Response sample: create a category</summary>

```json
{
    "data": {
        "id": "gaming-laptops",
        "type": "categories",
        "attributes": {
            "categoryKey": "gaming-laptops",
            "isActive": true,
            "isInMenu": true,
            "isSearchable": true,
            "isClickable": true,
            "templateName": "Catalog (default)",
            "parentCategoryKey": "computer",
            "position": 5,
            "extraParentCategoryKeys": [],
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "name": "Gaming Laptops",
                    "metaTitle": "Gaming Laptops",
                    "metaDescription": "High-performance laptops",
                    "metaKeywords": "gaming, laptops",
                    "url": "/en/computer/gaming-laptops"
                },
                {
                    "localeName": "de_DE",
                    "name": "Gaming-Laptops",
                    "metaTitle": "Gaming-Laptops",
                    "metaDescription": "Leistungsstarke Laptops",
                    "metaKeywords": "gaming, laptops",
                    "url": "/de/computer/gaming-laptops"
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

The request is validated as a whole: if any check fails, nothing is created and all failed checks are returned in the `errors` array.

| STATUS | CODE | REASON |
| --- | --- | --- |
| 422 | 901 | A required attribute is missing or has a wrong type—for example, `categoryKey => This field is missing.` |
| 422 | N/A | A category with the specified `categoryKey` already exists. |
| 422 | N/A | `parentCategoryKey` is missing and `isRoot` is not `true`. |
| 422 | N/A | `parentCategoryKey` is provided together with `isRoot: true`. |
| 422 | N/A | `isRoot` is `true`, but a root category already exists. |
| 422 | N/A | The category specified in `parentCategoryKey` or `extraParentCategoryKeys` doesn't exist. |
| 422 | N/A | The template specified in `templateName` doesn't exist. The available template names are listed in the error details. |
| 422 | N/A | `localizedAttributes` is missing or empty, an entry has no `localeName`, or an entry has no `name`. |
| 422 | N/A | A locale specified in `localizedAttributes` is not available. |
| 422 | N/A | A store specified in `stores` doesn't exist. |
| 422 | N/A | A category with the same name already exists on the same level. |
| 422 | N/A | The URL generated for a locale conflicts with an existing URL. The category is not created. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `categories` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
