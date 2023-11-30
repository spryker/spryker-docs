---
title: "Glue API: Update service point addresses"
description: Learn how to update service point addresses using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you update service point addresses.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Retrieve service points

---
`PATCH` {% raw %}**/service-points/*{{service-point-uuid}}*/service-point-addresses/*{{service-point-address-uuid}}**{% endraw %}
---


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{service-point-uuid}}***{% endraw %} | ID of a service point to update the addresses of. To get it, [retrieve service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/manage-using-glue-api/manage-service-points/retrieve-service-points.html). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `PATCH https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e/service-point-addresses`

### Response

Response sample:
```json
{
    "data": {
        "type": "service-point-addresses",
        "id": "c5da4439-ee5e-5f2a-ba1c-8a18c3dd9178",
        "attributes": {
            "uuid": "c5da4439-ee5e-5f2a-ba1c-8a18c3dd9178",
            "regionUuid": null,
            "countryIso2Code": "US",
            "address1": "123",
            "address2": "address3",
            "address3": "address2",
            "city": "123",
            "zipCode": "10115"
        },
        "links": {
            "self": "https://glue-backend.de.b2c-marketplace.demo-spryker.com/service-points/924ed48a-b4f0-516a-9921-5e9fd2149638/service-point-addresses/c5da4439-ee5e-5f2a-ba1c-8a18c3dd9178"
        }
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/service-point-addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-point-addresses-response-attributes.md -->

## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |
| 5415 | Zip code value is length from 4 to 15 characters

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
