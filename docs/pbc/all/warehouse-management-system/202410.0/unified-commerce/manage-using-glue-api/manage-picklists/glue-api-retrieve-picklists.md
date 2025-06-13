---
title: "Glue API: Retrieve picklists"
description: Learn how to retrieve picklist items using Spryker Glue API in your Spryker Unified Commerce Store.
template: glue-api-storefront-guide-template
last_updated: Dec 7, 2023
---

This endpoint allows retrieving picklists.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

- [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
- [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Retrieve picklists

---
`GET` **/picking-lists**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>picking-list-items</li> <li>users</li> <li>warehouses</li></ul> |

| REQUEST  | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/picking-lists` | Retrieve all picklists.  |
| `GET https://glue.mysprykershop.com/picking-lists?include=picking-list-items` | Retrieve all picklists with picklist items included.  |
| `GET https://glue.mysprykershop.com/picking-lists?include=users` | Retrieve all picklists. Include information about the users you are authenticated with. |
| `GET https://glue.mysprykershop.com/picking-lists?include=warehouses` | Retrieve all picklists. Include information about the warehouses the picking lists are available in. |


### Response

<details>
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/44ae0215-06a2-5d10-85da-c996c0c2f79e"
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/217f10d7-9c03-541b-b782-28797327afdc"
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/efbbe047-37df-5dc5-9f7f-d306be203082"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/picking-lists"
    }
}
```  

</details>

<details>
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/44ae0215-06a2-5d10-85da-c996c0c2f79e?include=picking-list-items"
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/efbbe047-37df-5dc5-9f7f-d306be203082?include=picking-list-items"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/picking-lists?include=picking-list-items"
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
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/b38e74bf-f40d-5a89-a398-0f868f1702ca?include=picking-list-items"
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
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/ac549fc5-0e9e-55bc-a32d-4f0835497c00?include=picking-list-items"
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
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/bdff472f-74d2-51bc-b692-3890651ebf0c?include=picking-list-items"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Response sample: retrieve picklists with information about the authenticated user</summary>

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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/44ae0215-06a2-5d10-85da-c996c0c2f79e?include=users"
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/efbbe047-37df-5dc5-9f7f-d306be203082?include=users"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/picking-lists?include=users"
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
                "self": "https://glue-backend.mysprykershop.com/users/0d743cc3-a772-5145-971e-d4018ee7a489?include=users"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Response sample: retrieve picklists with warehouses included</summary>

```json
{
    "data": [
        {
            "type": "picking-lists",
            "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-07 17:09:32.000000",
                "updatedAt": "2023-11-07 17:10:23.000000"
            },
            "relationships": {
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=warehouses"
            }
        },
        {
            "type": "picking-lists",
            "id": "eeee32bc-dd52-5130-809f-b64710a791ee",
            "attributes": {
                "status": "picking-finished",
                "createdAt": "2023-11-07 19:18:12.000000",
                "updatedAt": "2023-11-07 19:20:23.000000"
            },
            "relationships": {
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
                "self": "https://glue-backend.mysprykershop.com/picking-lists/eeee32bc-dd52-5130-809f-b64710a791ee?include=warehouses"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/picking-lists?include=warehouses"
    },
    "included": [
        {
            "type": "warehouses",
            "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
            "attributes": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouses/834b3731-02d4-5d6f-9a61-d63ae5e70517?include=warehouses"
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




## Retrieve a picklist

---
`GET` **/picking-lists/*{% raw %}{{picklist_id}}{% endraw %}***

---


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{picklist_id}}***{% endraw %} | ID of the picklist to retrieve. To get it, [retrieve picklists](#retrieve-picklists).     |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html).  |

| REQUEST  | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313` | Retrieve the picklist specified with the ID.  |
| `GET https://glue.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=picking-list-items` | Retrieve the picklist specified with the ID with picklist items included.  |
| `GET https://glue.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=users` | Retrieve the picklist specified with the ID. Include information about the user you are authenticated with. |
| `GET https://glue.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=warehouses` | Retrieve the picklist specified with the ID. Include information about the warehouses the picking list is available in. |

### Response


<details>
  <summary>Response sample: Retrieve the picklist spcified with the ID</summary>

```json
{
    "data": {
        "type": "picking-lists",
        "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
        "attributes": {
            "status": "picking-finished",
            "createdAt": "2023-11-07 17:09:32.000000",
            "updatedAt": "2023-11-07 17:10:23.000000"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313"
        }
    }
}
```

</details>


<details>
  <summary>Response sample: Retrieve the picklist spcified with the ID with picklist items included</summary>

```json
{
    "data": {
        "type": "picking-lists",
        "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
        "attributes": {
            "status": "picking-finished",
            "createdAt": "2023-11-07 17:09:32.000000",
            "updatedAt": "2023-11-07 17:10:23.000000"
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
            "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=picking-list-items"
        }
    },
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
                    "sku": "141_29380410",
                    "quantity": 1,
                    "name": "Asus Zenbook US303UB"
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/9ac9fd06-f491-506e-b302-0b166786d91c?include=picking-list-items"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Response sample: Retrieve the picklist spcified with the ID. Include information about the authenticated user</summary>

```json
{
    "data": {
        "type": "picking-lists",
        "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
        "attributes": {
            "status": "picking-finished",
            "createdAt": "2023-11-07 17:09:32.000000",
            "updatedAt": "2023-11-07 17:10:23.000000"
        },
        "relationships": {
            "users": {
                "data": [
                    {
                        "type": "users",
                        "id": "ce63fe5c-4897-5a17-b683-39f2825316b8"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=users"
        }
    },
    "included": [
        {
            "type": "users",
            "id": "ce63fe5c-4897-5a17-b683-39f2825316b8",
            "attributes": {
                "username": "herald.hopkins@spryker.com",
                "firstName": "Herald",
                "lastName": "Hopkins"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/users/ce63fe5c-4897-5a17-b683-39f2825316b8?include=users"
            }
        }
    ]
}
```

</details>  


<details>
  <summary>Response sample: Retrieve the picklist spcified with the ID with warehouses included</summary>

```json

{
    "data": {
        "type": "picking-lists",
        "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
        "attributes": {
            "status": "picking-finished",
            "createdAt": "2023-11-07 17:09:32.000000",
            "updatedAt": "2023-11-07 17:10:23.000000"
        },
        "relationships": {
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
            "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313?include=warehouses"
        }
    },
    "included": [
        {
            "type": "warehouses",
            "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
            "attributes": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouses/834b3731-02d4-5d6f-9a61-d63ae5e70517?include=warehouses"
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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
