---
title: "Glue API: Retrieve service points"
description: Learn how to retrieve service points using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you retrieve service points.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Retrieve service points

***
`GET` **/service-points**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | For backend API. | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | API TYPE | DESCRIPTION | POSSIBLE VALUES |
|-|-|-|-|
| include | Backend | Adds resource relationships to the request. | services, service-point-addresses |

| REQUEST | API TYPE | USAGE |
|-|-|-|
| `GET https://glue-backend.mysprykershop.com/service-points` | Backend | Retrieve all service points. |
| `GET https://glue-backend.mysprykershop.com/service-points?include=services` | Backend | Retrieve service points with services included. |
| `GET https://glue-backend.mysprykershop.com/service-points?include=service-point-addresses` | Backend | Retrieve service points with addresses included. |
| `GET https://glue.mysprykershop.com/service-points` | Storefront | Retrieve all service points. |
| `GET https://glue.mysprykershop.com/service-points?include=service-point-addresses` | Storefront | Retrieve service points with addresses included. |



### Response


<details>
  <summary>Backend: Retrieve all service points</summary>

```json
{
    "data": [
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
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e"
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
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/service-points"
    }
}
```

</details>

<details>
  <summary>Backend: Retrieve service points with services included</summary>

```json
{
    "data": [
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
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services"
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
                "self": "https://glue-backend.mysprykershop.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8?include=services"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/service-points?include=services"
    },
    "included": [
        {
            "type": "services",
            "id": "37ef89d3-7792-533c-951c-981c6b56312c",
            "attributes": {
                "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
                "isActive": true,
                "key": "s1"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=services"
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
                "self": "https://glue-backend.mysprykershop.com/services/6358f60b-958b-53f9-9401-306c063b1282?include=services"
            }
        }
    ]
}
```

</details>


<details>
  <summary>Backend: Retrieve service points with addresses included</summary>

```json
{
    "data": [
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
                "service-point-addresses": {
                    "data": [
                        {
                            "type": "service-point-addresses",
                            "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses"
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
                "service-point-addresses": {
                    "data": [
                        {
                            "type": "service-point-addresses",
                            "id": "7a711afc-02ce-5f54-a08c-fadfaf5713c6"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8?include=service-point-addresses"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/service-points?include=service-point-addresses"
    },
    "included": [
        {
            "type": "service-point-addresses",
            "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
            "attributes": {
                "uuid": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
                "regionUuid": null,
                "countryIso2Code": "DE",
                "address1": "Caroline-Michaelis-Straße",
                "address2": "8",
                "address3": null,
                "city": "Berlin",
                "zipCode": "10115"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54?include=service-point-addresses"
            }
        },
        {
            "type": "service-point-addresses",
            "id": "7a711afc-02ce-5f54-a08c-fadfaf5713c6",
            "attributes": {
                "uuid": "7a711afc-02ce-5f54-a08c-fadfaf5713c6",
                "regionUuid": null,
                "countryIso2Code": "DE",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": null,
                "city": "Berlin",
                "zipCode": "10115"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-point-addresses/7a711afc-02ce-5f54-a08c-fadfaf5713c6?include=service-point-addresses"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Storefront: Retrieve all service points</summary>

```json
{
    "data": [
        {
            "type": "service-points",
            "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
            "attributes": {
                "name": "Spryker Main Store",
                "key": "sp1"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e"
            }
        },
        {
            "type": "service-points",
            "id": "7e3b03e0-c53c-5298-9ece-968f4628b4f8",
            "attributes": {
                "name": "Spryker Berlin Store",
                "key": "sp2"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/service-points"
    }
}
```

</details>



<details>
  <summary>Storefront: Retrieve all service points</summary>

```json
{
    "data": [
        {
            "type": "service-points",
            "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
            "attributes": {
                "name": "Spryker Main Store",
                "key": "sp1"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses"
            },
            "relationships": {
                "service-point-addresses": {
                    "data": [
                        {
                            "type": "service-point-addresses",
                            "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54"
                        }
                    ]
                }
            }
        },
        {
            "type": "service-points",
            "id": "7e3b03e0-c53c-5298-9ece-968f4628b4f8",
            "attributes": {
                "name": "Spryker Berlin Store",
                "key": "sp2"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8?include=service-point-addresses"
            },
            "relationships": {
                "service-point-addresses": {
                    "data": [
                        {
                            "type": "service-point-addresses",
                            "id": "7a711afc-02ce-5f54-a08c-fadfaf5713c6"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/service-points?include=service-point-addresses"
    },
    "included": [
        {
            "type": "service-point-addresses",
            "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
            "attributes": {
                "countryIso2Code": "DE",
                "address1": "Caroline-Michaelis-Straße",
                "address2": "8",
                "address3": null,
                "zipCode": "10115",
                "city": "Berlin"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54"
            }
        },
        {
            "type": "service-point-addresses",
            "id": "7a711afc-02ce-5f54-a08c-fadfaf5713c6",
            "attributes": {
                "countryIso2Code": "DE",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": null,
                "zipCode": "10115",
                "city": "Berlin"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8/service-point-addresses/7a711afc-02ce-5f54-a08c-fadfaf5713c6"
            }
        }
    ]
}
```

</details>



{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/services-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/services-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->



## Retrieve a service point

***
`GET` {% raw %}**/service-points/*{{service_point_id}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{service_point_id}}***{% endraw %} | ID of a service point to retrieve. To get it, [add a service point](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-add-service-points.html) or [retrieve service points](#retrieve-service-points). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | For backend API. | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | API TYPE | DESCRIPTION | POSSIBLE VALUES |
|-|-|-|-|
| include | Backend | Adds resource relationships to the request. | services, service-point-addresses |

| REQUEST | API TYPE | USAGE |
|-|-|-|
| `GET https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e` | Backend | Retrieve the service point with the specified ID. |
| `GET https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services` | Backend |Retrieve the service point with the specified ID. Include the information about its services. |
| `GET https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses` | Backend |Retrieve the service point with the specified ID. Include the information about its address. |
| `GET https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e` | Storefront | Retrieve the service point with the specified ID. |
| `GET https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses` | Storefront | Retrieve the service point with the specified ID. Include the information about its address. |


### Response

<details>
  <summary>Backend: Retrieve the service point with the specified ID</summary>

```json
{
    "data": {
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
            "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e"
        }
    }
}
```

</details>

<details>
  <summary>Backend: Retrieve the service point with the specified ID. Include information about its services</summary>

```json
{
    "data": {
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
            "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services"
        }
    },
    "included": [
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
                "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=services"
            }
        },
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
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services"
            }
        }
    ]
}
```

</details>


<details>
  <summary>Backend: Retrieve the service point with the specified ID. Include information about its address</summary>

```json
{
    "data": {
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
            "service-point-addresses": {
                "data": [
                    {
                        "type": "service-point-addresses",
                        "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses"
        }
    },
    "included": [
        {
            "type": "service-point-addresses",
            "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
            "attributes": {
                "uuid": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
                "regionUuid": null,
                "countryIso2Code": "DE",
                "address1": "Caroline-Michaelis-Straße",
                "address2": "8",
                "address3": null,
                "city": "Berlin",
                "zipCode": "10115"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54?include=service-point-addresses"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Storefront: Retrieve the service point with the specified ID</summary>

```json
{
    "data": {
        "type": "service-points",
        "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
        "attributes": {
            "name": "Spryker Main Store",
            "key": "sp1"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e"
        }
    }
}
```

</details>

<details>
  <summary>Storefront: Retrieve the service point with the specified ID</summary>

```json
{
    "data": {
        "type": "service-points",
        "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
        "attributes": {
            "name": "Spryker Main Store",
            "key": "sp1"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses"
        },
        "relationships": {
            "service-point-addresses": {
                "data": [
                    {
                        "type": "service-point-addresses",
                        "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "service-point-addresses",
            "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
            "attributes": {
                "countryIso2Code": "DE",
                "address1": "Caroline-Michaelis-Straße",
                "address2": "8",
                "address3": null,
                "zipCode": "10115",
                "city": "Berlin"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54"
            }
        }
    ]
}
```

</details>





{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/services-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/services-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
