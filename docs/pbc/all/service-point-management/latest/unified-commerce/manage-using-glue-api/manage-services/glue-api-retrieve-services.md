---
title: "Glue API: Retrieve services"
description: Learn how to retrieve services to your Unified Commerce shop using Spryker Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
redirect_from:
---

This endpoint lets you retrieve services.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Retrieve services

***
`GET` **/services**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|-|-|-|
| include | Adds resource relationships to the request. | service-points service-types |

| REQUEST | USAGE |
|-|-|
| `GET https://glue-backend.mysprykershop.com/services` | Retrieve all services. |
| `GET https://glue-backend.mysprykershop.com/services?include=service-types` | Retrieve services with service types included. |
| `GET https://glue-backend.mysprykershop.com/services?include=service-points` | Retrieve services with service points included. |


### Response

<details>
  <summary>Retrieve services</summary>

```json
{
    "data": [
        {
            "type": "services",
            "id": "37ef89d3-7792-533c-951c-981c6b56312c",
            "attributes": {
                "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
                "isActive": true,
                "key": "s1"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c"
            }
        },
        {
            "type": "services",
            "id": "6358f60b-958b-53f9-9401-306c063b1282",
            "attributes": {
                "uuid": "6358f60b-958b-53f9-9401-306c063b1282",
                "isActive": true,
                "key": "s2"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/services/6358f60b-958b-53f9-9401-306c063b1282"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/services"
    }
}
```



<details>
  <summary>Retrieve services with service types included</summary>

```json
{
    "data": [
        {
            "type": "services",
            "id": "37ef89d3-7792-533c-951c-981c6b56312c",
            "attributes": {
                "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
                "isActive": true,
                "key": "s1"
            },
            "relationships": {
                "service-types": {
                    "data": [
                        {
                            "type": "service-types",
                            "id": "2370ad95-4e9f-5ac3-913e-300c5805b181"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=service-types"
            }
        },
        {
            "type": "services",
            "id": "6358f60b-958b-53f9-9401-306c063b1282",
            "attributes": {
                "uuid": "6358f60b-958b-53f9-9401-306c063b1282",
                "isActive": true,
                "key": "s2"
            },
            "relationships": {
                "service-types": {
                    "data": [
                        {
                            "type": "service-types",
                            "id": "2370ad95-4e9f-5ac3-913e-300c5805b181"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/services/6358f60b-958b-53f9-9401-306c063b1282?include=service-types"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/services?include=service-types"
    },
    "included": [
        {
            "type": "service-types",
            "id": "2370ad95-4e9f-5ac3-913e-300c5805b181",
            "attributes": {
                "name": "Pickup",
                "key": "pickup"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-types/2370ad95-4e9f-5ac3-913e-300c5805b181?include=service-types"
            }
        }
    ]
}
```

</details>



</details>


<details>
  <summary>Retrieve services with service points included</summary>

```json
{
    "data": [
        {
            "type": "services",
            "id": "37ef89d3-7792-533c-951c-981c6b56312c",
            "attributes": {
                "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
                "isActive": true,
                "key": "s1"
            },
            "relationships": {
                "service-points": {
                    "data": [
                        {
                            "type": "service-points",
                            "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=service-points"
            }
        },
        {
            "type": "services",
            "id": "6358f60b-958b-53f9-9401-306c063b1282",
            "attributes": {
                "uuid": "6358f60b-958b-53f9-9401-306c063b1282",
                "isActive": true,
                "key": "s2"
            },
            "relationships": {
                "service-points": {
                    "data": [
                        {
                            "type": "service-points",
                            "id": "7e3b03e0-c53c-5298-9ece-968f4628b4f8"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/services/6358f60b-958b-53f9-9401-306c063b1282?include=service-points"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/services?include=service-points"
    },
    "included": [
        {
            "type": "service-points",
            "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
            "attributes": {
                "name": "Spryker Main Store",
                "key": "sp1",
                "isActive": true,
                "stores": [
                    "DE",
                    "AT"
                ]
            },
            "relationships": {
                "services": {
                    "data": [
                        {
                            "type": "services",
                            "id": "37ef89d3-7792-533c-951c-981c6b56312c"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-points"
            }
        },
        {
            "type": "service-points",
            "id": "7e3b03e0-c53c-5298-9ece-968f4628b4f8",
            "attributes": {
                "name": "Spryker Berlin Store",
                "key": "sp2",
                "isActive": true,
                "stores": [
                    "DE",
                    "AT"
                ]
            },
            "relationships": {
                "services": {
                    "data": [
                        {
                            "type": "services",
                            "id": "6358f60b-958b-53f9-9401-306c063b1282"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8?include=service-points"
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/services-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/services-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/service-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-types-response-attributes.md -->




## Retrieve a service

***
`GET` {% raw %}**/services/*{{service_id}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{service_id}}***{% endraw %} | ID of a service to retrieve. To get it, [add a service](/docs/pbc/all/service-point-management/202311.0/unified-commerce/manage-using-glue-api/manage-services/glue-api-add-services.html) or [retrieve services](#retrieve-services). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|-|-|-|
| include | Adds resource relationships to the request. | service-types service-points |

| REQUEST | USAGE |
|-|-|
| `GET https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c` | Retrieve a service with the specified ID. |
| `GET https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=service-types` | Retrieve a service point with the specified ID. Include the information about its services. |
| `GET https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=service-types` | Retrieve a service point with the specified ID. Include the information about its address. |


### Response

<details>
  <summary>Retrieve a service with the specified ID</summary>

```json
{
    "data": {
        "type": "services",
        "id": "37ef89d3-7792-533c-951c-981c6b56312c",
        "attributes": {
            "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
            "isActive": true,
            "key": "s1"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c"
        }
    }
}
```

</details>

<details>
  <summary>Retrieve a service with the specified ID. Include information about its service type</summary>

```json
{
    "data": {
        "type": "services",
        "id": "37ef89d3-7792-533c-951c-981c6b56312c",
        "attributes": {
            "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
            "isActive": true,
            "key": "s1"
        },
        "relationships": {
            "service-types": {
                "data": [
                    {
                        "type": "service-types",
                        "id": "2370ad95-4e9f-5ac3-913e-300c5805b181"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=service-types"
        }
    },
    "included": [
        {
            "type": "service-types",
            "id": "2370ad95-4e9f-5ac3-913e-300c5805b181",
            "attributes": {
                "name": "Pickup",
                "key": "pickup"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-types/2370ad95-4e9f-5ac3-913e-300c5805b181?include=service-types"
            }
        }
    ]
}
```

</details>


<details>
  <summary>Retrieve a service point with the specified ID. Include information about its service point</summary>

```json
{
    "data": {
        "type": "services",
        "id": "37ef89d3-7792-533c-951c-981c6b56312c",
        "attributes": {
            "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
            "isActive": true,
            "key": "s1"
        },
        "relationships": {
            "service-points": {
                "data": [
                    {
                        "type": "service-points",
                        "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=service-points"
        }
    },
    "included": [
        {
            "type": "service-points",
            "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
            "attributes": {
                "name": "Spryker Main Store",
                "key": "sp1",
                "isActive": true,
                "stores": [
                    "DE",
                    "AT"
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-points"
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/services-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/services-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/service-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-types-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
