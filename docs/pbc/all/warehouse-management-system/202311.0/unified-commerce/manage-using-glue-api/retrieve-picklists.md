---
title: Retrieve picklists
description: Learn how to retrieve picklists using Glue API
template: glue-api-storefront-guide-template
---

This endpoint allows retrieving picklists.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
* [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Retrieve picklists

***
`GET` **/picking-lists**
***  

### Request

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>picking-list-items</li> <li>users</li> <li>warehouses</li></ul> |

| REQUEST  | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/picking-lists` | Retrieve all picking lists.  |
| `GET https://glue.mysprykershop.com/picking-lists?include=picking-list-items` | Retrieve all picking lists with picklist items included.  |
| `GET https://glue.mysprykershop.com/picking-lists?include=users` | Retrieve all picking lists. Include information about the users that started or finished picking. |
| `GET https://glue.mysprykershop.com/picking-lists?include=warehouses` |  |


### Response

<details open>
  <summary>Response sample: retrieve picklists</summary>

```json
{
    "data": [
        {
            "type": "picking-lists",
            "id": "44ae0215-06a2-5d10-85da-c996c0c2f79e",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-02 12:16:55.000000",
                "updatedAt": "2023-11-02 12:30:20.000000"
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists/44ae0215-06a2-5d10-85da-c996c0c2f79e"
            }
        },
        {
            "type": "picking-lists",
            "id": "217f10d7-9c03-541b-b782-28797327afdc",
            "attributes": {
                "status": "ready-for-picking",
                "createdAt": "2023-11-02 12:33:00.000000",
                "updatedAt": "2023-11-02 12:33:00.000000"
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists/217f10d7-9c03-541b-b782-28797327afdc"
            }
        },
        {
            "type": "picking-lists",
            "id": "efbbe047-37df-5dc5-9f7f-d306be203082",
            "attributes": {
                "status": "ready-for-picking",
                "createdAt": "2023-11-03 12:11:59.000000",
                "updatedAt": "2023-11-03 12:11:59.000000"
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists/efbbe047-37df-5dc5-9f7f-d306be203082"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists"
    }
}
```  

</details>

<details open>
  <summary>Response sample: retrieve picklists with items included</summary>

```json
{
    "data": [
        {
            "type": "picking-lists",
            "id": "44ae0215-06a2-5d10-85da-c996c0c2f79e",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-02 12:16:55.000000",
                "updatedAt": "2023-11-02 12:30:20.000000"
            },
            "relationships": {
                "picking-list-items": {
                    "data": [
                        {
                            "type": "picking-list-items",
                            "id": "b38e74bf-f40d-5a89-a398-0f868f1702ca"
                        },
                        {
                            "type": "picking-list-items",
                            "id": "ac549fc5-0e9e-55bc-a32d-4f0835497c00"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists/44ae0215-06a2-5d10-85da-c996c0c2f79e?include=picking-list-items"
            }
        },
        {
            "type": "picking-lists",
            "id": "efbbe047-37df-5dc5-9f7f-d306be203082",
            "attributes": {
                "status": "ready-for-picking",
                "createdAt": "2023-11-03 12:11:59.000000",
                "updatedAt": "2023-11-03 12:11:59.000000"
            },
            "relationships": {
                "picking-list-items": {
                    "data": [
                        {
                            "type": "picking-list-items",
                            "id": "bdff472f-74d2-51bc-b692-3890651ebf0c"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists/efbbe047-37df-5dc5-9f7f-d306be203082?include=picking-list-items"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists?include=picking-list-items"
    },
    "included": [
        {
            "type": "picking-list-items",
            "id": "b38e74bf-f40d-5a89-a398-0f868f1702ca",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 0,
                "numberOfNotPicked": 1,
                "orderItem": {
                    "uuid": "3db99597-99a0-58a9-a0ea-696e8da0026e",
                    "sku": "009_30692991",
                    "quantity": 1,
                    "name": "Canon IXUS 285"
                }
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-list-items/b38e74bf-f40d-5a89-a398-0f868f1702ca?include=picking-list-items"
            }
        },
        {
            "type": "picking-list-items",
            "id": "ac549fc5-0e9e-55bc-a32d-4f0835497c00",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 0,
                "numberOfNotPicked": 1,
                "orderItem": {
                    "uuid": "40274175-4398-5927-8980-48ead5053e69",
                    "sku": "020_21081478",
                    "quantity": 1,
                    "name": "Sony Cyber-shot DSC-W830"
                }
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-list-items/ac549fc5-0e9e-55bc-a32d-4f0835497c00?include=picking-list-items"
            }
        },
        {
            "type": "picking-list-items",
            "id": "bdff472f-74d2-51bc-b692-3890651ebf0c",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 0,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "b9521823-39fe-532f-b7d9-74c33fe5e677",
                    "sku": "201_11217755",
                    "quantity": 1,
                    "name": "Sony NEX-VG20EH"
                }
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-list-items/bdff472f-74d2-51bc-b692-3890651ebf0c?include=picking-list-items"
            }
        }
    ]
}
```

</details>

<details open>
  <summary>Response sample: retrieve picklists with users included</summary>

```json
{
    "data": [
        {
            "type": "picking-lists",
            "id": "44ae0215-06a2-5d10-85da-c996c0c2f79e",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-02 12:16:55.000000",
                "updatedAt": "2023-11-02 12:30:20.000000"
            },
            "relationships": {
                "users": {
                    "data": [
                        {
                            "type": "users",
                            "id": "0d743cc3-a772-5145-971e-d4018ee7a489"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists/44ae0215-06a2-5d10-85da-c996c0c2f79e?include=users"
            }
        },
        {
            "type": "picking-lists",
            "id": "efbbe047-37df-5dc5-9f7f-d306be203082",
            "attributes": {
                "status": "ready-for-picking",
                "createdAt": "2023-11-03 12:11:59.000000",
                "updatedAt": "2023-11-03 12:11:59.000000"
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists/efbbe047-37df-5dc5-9f7f-d306be203082?include=users"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/picking-lists?include=users"
    },
    "included": [
        {
            "type": "users",
            "id": "0d743cc3-a772-5145-971e-d4018ee7a489",
            "attributes": {
                "username": "herald.hopkins@spryker.com",
                "firstName": "Herald",
                "lastName": "Hopkins"
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/users/0d743cc3-a772-5145-971e-d4018ee7a489?include=users"
            }
        }
    ]
}
```

</details>


## Retrieve a picklist

***
`GET` **{% raw %}/picking-lists/{{picklist_id}}**{% endraw %}
***  


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{picklist_id}}***{% endraw %} | ID of the picklist to retrieve. To get it, see                            |

### Request

Request sample:


### Response
