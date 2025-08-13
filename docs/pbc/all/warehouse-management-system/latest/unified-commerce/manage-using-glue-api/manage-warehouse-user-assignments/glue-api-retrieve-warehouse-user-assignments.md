---
title: "Glue API: Retrieve warehouse user assignments"
description: Learn how to retrieve warehouse user assignments using Glue API within your Spryker Unified Commerce project.
template: glue-api-storefront-guide-template
redirect_from:
last_updated: Dec 7, 2023
---

A warehouse user can have multiple warehouses assigned to them. However, because a user can be physically present only in one warehouse, a single warehouse assignment can be active for them at a time. This endpoint lets you retrieve warehouse user assignments.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

- [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
- [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)

## Retrieve warehouse user assignments

---
`GET` **/warehouse-user-assignments**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |


| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users |
| filter | Filters out the warehouse user assignments to be retrieved. | warehouseUuid, userUuid, isActive, uuid  |

| REQUEST  | USAGE |
| --- | --- |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments` | Retrieve all warehouse user assignments.  |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users` | Retrieve all warehouse user assignments. Include information about the authenticated user.  |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da` | Retrieve warehouse user assignments of the user with the specified ID. |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.uuid]=99e048ef-8cd8-5e52-aca9-50a590a469c2` | Retrieve the warehouse user assignment with the specified ID. |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.isActive]=false` | Retrieve inactive warehouse user assignments. |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.warehouseUuid]=86496ec7-0d44-518c-81e4-f472b9e8547d` | Retrieve warehouse user assignments with the warehouse with the specified ID. |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da&filter[warehouse-user-assignments.isActive]=false` | Retrieve inactive warehouse user assignments of the user with the specified ID. |


### Response

<details>
  <summary>Retrieve all warehouse user assignments</summary>

```json
{
    "data": [
        {
            "type": "warehouse-user-assignments",
            "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": true,
                "warehouse": {
                    "name": "Warehouse1",
                    "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2"
            }
        },
        {
            "type": "warehouse-user-assignments",
            "id": "39fcc049-758b-5f96-96c4-ecd5e103a8f9",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Video King MER000002 Warehouse 1",
                    "uuid": "86496ec7-0d44-518c-81e4-f472b9e8547d",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/39fcc049-758b-5f96-96c4-ecd5e103a8f9"
            }
        },
        {
            "type": "warehouse-user-assignments",
            "id": "1bbc2472-44e8-5f4a-8824-4b580b8d58f7",
            "attributes": {
                "userUuid": "471f5093-fca8-50b7-83d0-d06adc273442",
                "isActive": false,
                "warehouse": {
                    "name": "Budget Cameras MER000005 Warehouse 1",
                    "uuid": "5bf5cc56-a50b-5029-9011-feeed83af180",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/1bbc2472-44e8-5f4a-8824-4b580b8d58f7"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments"
    }
}
```

</details>

<details>
  <summary>Retrieve all warehouse user assignments with the information about authenticated user</summary>

```json
{
    "data": [
        {
            "type": "warehouse-user-assignments",
            "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": true,
                "warehouse": {
                    "name": "Warehouse1",
                    "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                    "isActive": true
                }
            },
            "relationships": {
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
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users"
            }
        },
        {
            "type": "warehouse-user-assignments",
            "id": "39fcc049-758b-5f96-96c4-ecd5e103a8f9",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Video King MER000002 Warehouse 1",
                    "uuid": "86496ec7-0d44-518c-81e4-f472b9e8547d",
                    "isActive": true
                }
            },
            "relationships": {
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
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/39fcc049-758b-5f96-96c4-ecd5e103a8f9?include=users"
            }
        },
        {
            "type": "warehouse-user-assignments",
            "id": "1bbc2472-44e8-5f4a-8824-4b580b8d58f7",
            "attributes": {
                "userUuid": "471f5093-fca8-50b7-83d0-d06adc273442",
                "isActive": false,
                "warehouse": {
                    "name": "Budget Cameras MER000005 Warehouse 1",
                    "uuid": "5bf5cc56-a50b-5029-9011-feeed83af180",
                    "isActive": true
                }
            },
            "relationships": {
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
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/1bbc2472-44e8-5f4a-8824-4b580b8d58f7?include=users"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users"
    },
    "included": [
        {
            "type": "users",
            "id": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "attributes": {
                "username": "herald.hopkins@spryker.com",
                "firstName": "Herald",
                "lastName": "Hopkins"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/users/0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da?include=users"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Retrieve warehouse user assignment of the user with the specified ID</summary>

```json
{
    "data": [
        {
            "type": "warehouse-user-assignments",
            "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": true,
                "warehouse": {
                    "name": "Warehouse1",
                    "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da"
            }
        },
        {
            "type": "warehouse-user-assignments",
            "id": "39fcc049-758b-5f96-96c4-ecd5e103a8f9",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Video King MER000002 Warehouse 1",
                    "uuid": "86496ec7-0d44-518c-81e4-f472b9e8547d",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/39fcc049-758b-5f96-96c4-ecd5e103a8f9?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da"
    }
}
```

</details>


<details>
  <summary>Retrieve the warehouse user assignment with the specified ID</summary>

```json
{
    "data": [
        {
            "type": "warehouse-user-assignments",
            "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": true,
                "warehouse": {
                    "name": "Warehouse1",
                    "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?filter[warehouse-user-assignments.uuid]=99e048ef-8cd8-5e52-aca9-50a590a469c2"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.uuid]=99e048ef-8cd8-5e52-aca9-50a590a469c2"
    }
}
```

</details>

<details>
  <summary>Retrieve inactive warehouse user assignments</summary>

```json
{
    "data": [        
        {
            "type": "warehouse-user-assignments",
            "id": "39fcc049-758b-5f96-96c4-ecd5e103a8f9",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Video King MER000002 Warehouse 1",
                    "uuid": "86496ec7-0d44-518c-81e4-f472b9e8547d",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/39fcc049-758b-5f96-96c4-ecd5e103a8f9?filter[warehouse-user-assignments.isActive]=false"
            }
        },
        {
            "type": "warehouse-user-assignments",
            "id": "1bbc2472-44e8-5f4a-8824-4b580b8d58f7",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Budget Cameras MER000005 Warehouse 1",
                    "uuid": "5bf5cc56-a50b-5029-9011-feeed83af180",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/1bbc2472-44e8-5f4a-8824-4b580b8d58f7?filter[warehouse-user-assignments.isActive]=false"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.isActive]=false"
    }
}
```

</details>

<details>
  <summary>Retrieve warehouse user assignments with the warehouse with the specified ID.</summary>

```json
{
    "data": [
        {
            "type": "warehouse-user-assignments",
            "id": "39fcc049-758b-5f96-96c4-ecd5e103a8f9",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Video King MER000002 Warehouse 1",
                    "uuid": "86496ec7-0d44-518c-81e4-f472b9e8547d",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/39fcc049-758b-5f96-96c4-ecd5e103a8f9?filter[warehouse-user-assignments.warehouseUuid]=86496ec7-0d44-518c-81e4-f472b9e8547d"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.warehouseUuid]=86496ec7-0d44-518c-81e4-f472b9e8547d"
    }
}
```

</details>

<details>
  <summary>Retrieve inactive warehouse user assignments of the user with the specified ID.</summary>

```json
{
    "data": [
        {
            "type": "warehouse-user-assignments",
            "id": "39fcc049-758b-5f96-96c4-ecd5e103a8f9",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Video King MER000002 Warehouse 1",
                    "uuid": "86496ec7-0d44-518c-81e4-f472b9e8547d",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/39fcc049-758b-5f96-96c4-ecd5e103a8f9?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da&filter[warehouse-user-assignments.isActive]=false"
            }
        },
        {
            "type": "warehouse-user-assignments",
            "id": "1bbc2472-44e8-5f4a-8824-4b580b8d58f7",
            "attributes": {
                "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
                "isActive": false,
                "warehouse": {
                    "name": "Budget Cameras MER000005 Warehouse 1",
                    "uuid": "5bf5cc56-a50b-5029-9011-feeed83af180",
                    "isActive": true
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/1bbc2472-44e8-5f4a-8824-4b580b8d58f7?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da&filter[warehouse-user-assignments.isActive]=false"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments?filter[warehouse-user-assignments.userUuid]=0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da&filter[warehouse-user-assignments.isActive]=false"
    }
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/warehouse-user-assignments-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/warehouse-user-assignments-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/users-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/users-response-attributes.md -->

## Retrieve a warehouse user assignment

---
`GET` **/warehouse-user-assignments/*{% raw %}{{warehouse_user_assignment_id}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| - | - |
| ***{% raw %}{{warehouse_user_assignment_id}}{% endraw %}*** | ID of the user warehouse assignment to retrieve. You get it when [creating a warehouse user assignment](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-warehouse-user-assignments/glue-api-create-warehouse-user-assignments.html) |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users |

| REQUEST  | USAGE |
| --- | --- |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2` | Retrieve the warehouse assignment with the specified ID.  |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users` | Retrieve the warehouse assignment with the specified ID. Include information about the authenticated user. |




### Response


<details>
  <summary>Retrieve a warehouse user assignment</summary>

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
        "attributes": {
            "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "isActive": true,
            "warehouse": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2"
        }
    }
}
```

</details>

<details>
  <summary>Retrieve a warehouse user assignment with user information included</summary>

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
        "attributes": {
            "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "isActive": true,
            "warehouse": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            }
        },
        "relationships": {
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
            "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users"
        }
    },
    "included": [
        {
            "type": "users",
            "id": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "attributes": {
                "username": "herald.hopkins@spryker.com",
                "firstName": "Herald",
                "lastName": "Hopkins"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/users/0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da?include=users"
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/warehouse-user-assignments-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/warehouse-user-assignments-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/users-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/users-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 5201 | The warehouse user assignment with the specified ID doesn't exist.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
