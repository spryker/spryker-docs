---
title: "Backend API: Delete a category"
description: Learn how to delete categories and what happens to their child categories using the Spryker Backend API.
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
  - title: Manage product assignments of a category
    link: docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-manage-product-assignments-of-a-category.html
---

The `categories` resource of the Backend API lets Back Office integrations delete categories. This document describes how to delete a category and how the category tree changes as a result.

## Installation

For details on the module that provides the API capability and how to install it, see [Install the Product Experience Management feature](/docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html).

## Delete a category

To delete a category, send the request:

---
`DELETE` **/categories/*{% raw %}{{category_key}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{category_key}}***{% endraw %} | Key of the category to delete. The key is matched case-insensitively. To get it, [retrieve categories](/docs/pbc/all/product-experience-management/latest/manage-using-backend-api/manage-categories/backend-api-retrieve-categories.html#retrieve-categories). |

Deleting a category behaves as in the Back Office:

- The child categories of the deleted category are moved under its parent category.
- All additional-parent placements of the deleted category are removed together with their URLs; the subtrees below those placements are moved under the respective parent.
- The product assignments of the deleted category are removed.
- The root category cannot be deleted.

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: delete a category

`DELETE https://glue-backend.mysprykershop.com/categories/gaming-laptops`

### Response

If the category is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 404 | N/A | The category with the specified key doesn't exist. |
| 422 | N/A | The category is the root category. The root category cannot be deleted. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `categories` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
