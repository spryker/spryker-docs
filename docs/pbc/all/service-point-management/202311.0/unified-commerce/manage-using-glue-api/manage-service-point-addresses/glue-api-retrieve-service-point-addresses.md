---
title: "Glue API: Retrieve service point addresses"
description: Learn how to retrieve service point addresses using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you retrieve service point addresses.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Retrieve service point addresses

***
`GET` {% raw %}**/service-points/*{{service-point-uuid}}*/service-point-addresses**{% endraw %}
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{service-point-uuid}}***{% endraw %} | ID of a service point to retrieve the addresses of. To get it, [retrieve service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-retrieve-service-points.html). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses`

### Response

Response sample:
```json
{
    "data": [
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
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses"
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->


## Retrieve a service point address

***
`GET` {% raw %}**/service-points/*{{service-point-uuid}}*/service-point-addresses/*{{service-point-address-uuid}}***{% endraw %}
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{service-point-uuid}}***{% endraw %} | ID of a service point to retrieve the address of. To get it, [retrieve service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-retrieve-service-points.html). |
| {% raw %}***{{service-point-address-uuid}}***{% endraw %} | ID of a service point address to retrieve. To get it using the Storefront API, [retrieve service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-retrieve-service-points.html) with the `service-point-addresses` resource included. To get it using the backend API, see [retrieve service point addresses](#retrieve-service-point-addresses). |


### Request


Request sample: `GET https://glue.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54`



### Response

Response sample:

```json
{
    "data": {
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
}
```


{% include pbc/all/glue-api-guides/{{page.version}}/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->



## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
