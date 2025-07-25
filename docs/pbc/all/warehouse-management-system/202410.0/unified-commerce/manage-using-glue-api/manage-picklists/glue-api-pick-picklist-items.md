---
title: "Glue API: Pick picklist items"
description: Learn how to pick picklist items using Spryker Glue API in your Spryker Unified Commerce Store.
template: glue-api-storefront-guide-template
last_updated: Dec 7, 2023
---

This endpoint lets you pick picklist items.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

- [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
- [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Pick a picklist item

***
`PATCH` **/picking-lists/*{% raw %}{{picklist_id}}{% endraw %}*/picking-list-items**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{picklist_id}}***{% endraw %} | ID of the picklist to to pick an item of. To get it, [retrieve picklists](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-picklists/glue-api-retrieve-picklists.html).     |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users, warehouses |

| REQUEST  | USAGE |
| --- | --- |
| `PATCH https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-list-items` | Pick an item in the picklist with the specified ID.  |
| `PATCH https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-list-items?include=users` | Pick an item in the picklist with the specified ID. Include information about the authenticated user. |
| `PATCH https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-list-items?include=warehouses` | Pick an item in the picklist with the specified ID. Include information about the warehouse the order is fulfilled in. |

```json
{
    "data": [
        {
            "id": "9ac9fd06-f491-506e-b302-0b166786d91c",
            "type": "picking-list-items",
            "attributes": {
                "numberOfPicked": 0,
                "numberOfNotPicked": 1
            }
        }
    ]
}

```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| id | String | &check; | Unique identifier of the item to pick. To get it, [retrieve picklists](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-picklists/glue-api-retrieve-picklists.html) with `picking-list-items` included.   |
| numberOfPicked | Integer | &check; | Quantity of the item that was collected.  |
| numberOfNotPicked.uuid | Integer | &check; | Quantity of the item that was not found. |




### Response

<details>
  <summary>Pick an item in the picklist with the specified ID.</summary>

```json
{
    "data": [
        {
            "type": "picking-lists",
            "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-13 13:33:03.000000",
                "updatedAt": "2023-11-13 13:57:20.767594"
            },
            "relationships": {
                "picking-list-items": {
                    "data": [
                        {
                            "type": "picking-list-items",
                            "id": "9ac9fd06-f491-506e-b302-0b166786d91c"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313"
            }
        }
    ],
    "included": [
        {
            "type": "picking-list-items",
            "id": "9ac9fd06-f491-506e-b302-0b166786d91c",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 0,
                "numberOfNotPicked": 1,
                "orderItem": {
                    "uuid": "42de8c95-69a7-56b1-b43e-ce876ca79458",
                    "sku": "201_11217755",
                    "quantity": 1,
                    "name": "Sony NEX-VG20EH"
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-list-items/9ac9fd06-f491-506e-b302-0b166786d91c"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Pick an item in the picklist with the specified ID. Include information about the authenticated user.</summary>

```json
{
    "data": [
        {
            "type": "picking-lists",
            "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-13 13:33:03.000000",
                "updatedAt": "2023-11-13 13:57:20.000000"
            },
            "relationships": {
                "picking-list-items": {
                    "data": [
                        {
                            "type": "picking-list-items",
                            "id": "9ac9fd06-f491-506e-b302-0b166786d91c"
                        }
                    ]
                },
                "users": {
                    "data": [
                        {
                            "type": "users",
                            "id": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=users"
            }
        }
    ],
    "included": [
        {
            "type": "picking-list-items",
            "id": "9ac9fd06-f491-506e-b302-0b166786d91c",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 1,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "42de8c95-69a7-56b1-b43e-ce876ca79458",
                    "sku": "201_11217755",
                    "quantity": 1,
                    "name": "Sony NEX-VG20EH"
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-list-items/9ac9fd06-f491-506e-b302-0b166786d91c?include=users"
            }
        },
        {
            "type": "users",
            "id": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "attributes": {
                "username": "herald.hopkins@spryker.com",
                "firstName": "Herald",
                "lastName": "Hopkins"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/users/0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da?include=users"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Pick an item in the picklist with the specified ID. Include information about the warehouse the order is fulfilled in.</summary>

```json
{
    "data": [
        {
            "type": "picking-lists",
            "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-13 13:33:03.000000",
                "updatedAt": "2023-11-13 13:57:20.000000"
            },
            "relationships": {
                "picking-list-items": {
                    "data": [
                        {
                            "type": "picking-list-items",
                            "id": "9ac9fd06-f491-506e-b302-0b166786d91c"
                        }
                    ]
                },
                "warehouses": {
                    "data": [
                        {
                            "type": "warehouses",
                            "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=warehouses"
            }
        }
    ],
    "included": [
        {
            "type": "picking-list-items",
            "id": "9ac9fd06-f491-506e-b302-0b166786d91c",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 1,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "42de8c95-69a7-56b1-b43e-ce876ca79458",
                    "sku": "201_11217755",
                    "quantity": 1,
                    "name": "Sony NEX-VG20EH"
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-list-items/9ac9fd06-f491-506e-b302-0b166786d91c?include=warehouses"
            }
        },
        {
            "type": "warehouses",
            "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
            "attributes": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/warehouses/834b3731-02d4-5d6f-9a61-d63ae5e70517?include=warehouses"
            }
        }
    ]
}
```

</details>  


{% include pbc/all/glue-api-guides/{{page.version}}/picking-lists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/picking-lists-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/picking-list-items-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/picking-list-items-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/users-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/users-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/warehouses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/warehouses-response-attributes.md -->

## Possible errors

| CODE | DESCRIPTION |
|-|-|
| 5303 | The picklist with the specified ID doesn't exist.  |
| 5304 | The picklist item with the specified ID doesn't exist.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
