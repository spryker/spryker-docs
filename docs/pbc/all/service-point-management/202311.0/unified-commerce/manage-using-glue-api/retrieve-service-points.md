---
title: "Glue API: Retrieve service points"
description: Learn how to retrieve service points using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you retrieve service points.

## Retrieve service points

---
`GET` **/service-points**
---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|-|-|-|
| include | Adds resource relationships to the request. | services service-point-addresses |

| REQUEST | USAGE |
|-|-|
| `GET https://glue-backend.mysprykershop.com/service-points` | Retrieve all service points. |
| `GET https://glue-backend.mysprykershop.com/service-points?include=services` | Retrieve service points with services included. |
| `GET https://glue-backend.mysprykershop.com/service-points?include=service-point-addresses` | Retrieve service points with addresses included. |


### Response


<details open>
  <summary>Retrieve all service points</summary>

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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points"
    }
}
```

</details>

<details open>
  <summary>Retrieve service points with services included</summary>

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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8?include=services"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points?include=services"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=services"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/services/6358f60b-958b-53f9-9401-306c063b1282?include=services"
            }
        }
    ]
}
```

</details>


<details open>
  <summary>Retrieve service points with services included</summary>

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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/7e3b03e0-c53c-5298-9ece-968f4628b4f8?include=service-point-addresses"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points?include=service-point-addresses"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54?include=service-point-addresses"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-point-addresses/7a711afc-02ce-5f54-a08c-fadfaf5713c6?include=service-point-addresses"
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->



## Retrieve a service point

---
`GET` {% raw %}**/service-points/*{{service_point_id}}***{% endraw %}
---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{cart_uuid}}***{% endraw %} | ID of a service point to retrieve. To get it, [add a service point] or [retrieve service points](#retrieve-service-points). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|-|-|-|
| include | Adds resource relationships to the request. | services service-point-addresses |

| REQUEST | USAGE |
|-|-|
| `GET https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e` | Retrieve the service point with the specified ID. |
| `GET https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services` | Retrieve the service point with the specified ID. Include the information about its services. |
| `GET https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses` | Retrieve the service point with the specified ID. Include the information about its address. |


### Response

<details open>
  <summary>Retrieve the service point with the specified ID</summary>

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
            "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e"
        }
    }
}
```

</details>

<details open>
  <summary>Retrieve the service point with the specified ID. Include information about its services</summary>

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
            "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/services/37ef89d3-7792-533c-951c-981c6b56312c?include=services"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=services"
            }
        }
    ]
}
```

</details>


<details open>
  <summary>Retrieve the service point with the specified ID. Include information about its address</summary>

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
            "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-point-addresses"
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
                "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54?include=service-point-addresses"
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
