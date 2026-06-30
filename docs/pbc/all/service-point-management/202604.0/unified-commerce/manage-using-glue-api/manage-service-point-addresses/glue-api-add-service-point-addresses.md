---
title: "Glue API: Add service point addresses"
description: Learn how to add service point addresses to your Unified Commerce shop using Spryker Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you add service point addresses.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html)

## Retrieve service points

***
`POST` {% raw %}**/service-points/*{{service-point-uuid}}*/service-point-addresses**{% endraw %}
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{service-point-uuid}}***{% endraw %} | ID of a service point to add the address to. To get it, [retrieve service points](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-retrieve-service-points.html). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/latest/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses`

```json
{
    "data": {
        "type": "service-point-address",
        "attributes": {
            "address1": "Caroline-Michaelis-Straße",
            "address2": "8",
            "address3": "null",
            "city": "Berlin",
            "zipCode": "10115",
            "countryIso2Code": "DE",
            "regionUuid": "02"
        }
    }
}
```

### Response

Response sample:

```json
{
    "data": {
        "type": "service-point-addresses",
        "id": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
        "attributes": {
            "uuid": "74768ee9-e7dd-5e3c-bafd-b654e7946c54",
            "regionUuid": 02,
            "countryIso2Code": "DE",
            "address1": "Caroline-Michaelis-Straße",
            "address2": "8",
            "address3": "null",
            "city": "Berlin",
            "zipCode": "10115"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses/74768ee9-e7dd-5e3c-bafd-b654e7946c54"
        }
    }
}
```

{% include pbc/all/glue-api-guides/latest/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->

## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |
| 5415 | Zip code value is outside of accepted length range. The accepted length range is from 4 to 15 characters. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
