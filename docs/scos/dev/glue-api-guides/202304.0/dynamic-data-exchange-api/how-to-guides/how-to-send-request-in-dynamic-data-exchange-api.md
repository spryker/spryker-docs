---
title: How send a request in Dynamic Data Exchange API
description: This guide shows how to send a request in Dynamic Data Exchange API.
last_updated: June 23, 2023
template: howto-guide-template
---

This guide shows how to send a request in Dynamic Data Exchange API.

{% info_block infoBox %}

Ensure the Dynamic Data Exchange API is integrated (follow [Dynamic Data Exchange API integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/dynamic-data-exchange-api-integration.html))
and configured (follow [How to configure Dynamic Data Exchange API](/docs/scos/dev/glue-api-guides/{{page.version}}/dynamic-data-exchange-api/how-to-guides/how-to-configure-dynamic-data-exchange-api.html))
as described in the guides.

{% endinfo_block %}

Let's say you have an endpoint `/dynamic-data/country` to operate with data in `spy_country` table in database.

The Dynamic Data Exchange API is a non-resource-based API and routes directly to a controller all specified endpoints.

By default, all routes within the Dynamic Data Exchange API are protected to ensure data security.
To access the API, you need to obtain an access token by sending a POST request to the `/token/` endpoint with the appropriate credentials:

```bash
POST /token/ HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 67

grant_type=password&username={username}&password={password}
```

### Sending `GET` request

To retrieve a collection of countries, a `GET` request should be sent to the `/dynamic-entity/country` endpoint. 
This request needs to include the necessary headers, such as Content-Type, Accept, and Authorization, with the access token provided.

The response body will contain all the columns from the `spy_country` table that have been configured in the `spy_dynamic_entity_definition.definition`. 
Each column will be represented using the `fieldVisibleName` as the key, providing a comprehensive view of the table's data in the API response.
   
Pagination allows for efficient data retrieval by specifying the desired range of results.
To implement pagination, include the desired page limit and offset in the request:

```bash
GET /dynamic-entity/country?page[offset]=1&page[limit]=2 HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```

{% info_block warningBox "Verification" %}

If everything is set up correctly you will get the following response:

```json
[
    {
        "id_country": 2,
        "iso2_code": "AD",
        "iso3_code": "AND",
        "name": "Andorra",
        "postal_code_mandatory": true,
        "postal_code_regex": "AD\\d{3}"
    },
    {
        "id_country": 3,
        "iso2_code": "AE",
        "iso3_code": "ARE",
        "name": "United Arab Emirates",
        "postal_code_mandatory": false,
        "postal_code_regex": null
    }
]
```

{% endinfo_block %}

{% info_block infoBox %}

Note, by default, API `GET` request returns up to 20 records.

{% endinfo_block %}

Filtering enables targeted data retrieval, refining the response to match the specified criteria.
To apply filtering to the results based on specific fields, include the appropriate filter parameter in the request:  

```bash
GET /dynamic-entity/country?filter[country.iso2_code]=AA HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```

{% info_block warningBox "Verification" %}

If everything is set up correctly you will get the following response:

```json
[
  {
    "id_country": 1,
    "iso2_code": "AA",
    "iso3_code": "UUD",
    "name": "Create",
    "postal_code_mandatory": false,
    "postal_code_regex": null
  }
]
```

{% endinfo_block %}

{% info_block infoBox %}

Note, so far when you combine multiple filters in a single request, the system applies an "AND" condition to the retrieved results.

{% endinfo_block %}

To retrieve a country by a specific ID, you can send a `GET` request with the following parameters:

```bash
GET /dynamic-entity/country/3 HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```
{% info_block warningBox "Verification" %}

If everything is set up correctly you will get the following response:

```json
[
  {
    "id_country": 3,
    "iso2_code": "AE",
    "iso3_code": "ARE",
    "name": "United Arab Emirates",
    "postal_code_mandatory": false,
    "postal_code_regex": null
  }
]
```

{% endinfo_block %}

{% info_block infoBox %}

Note if a current endpoint is not configured in `spy_dynamic_entity_configuration` and it's not found you'll get the following response:

```json
[
    {
        "message": "Not found",
        "status": 404,
        "code": "007"
    }
]
```

{% endinfo_block %}

### Sending `POST` request

