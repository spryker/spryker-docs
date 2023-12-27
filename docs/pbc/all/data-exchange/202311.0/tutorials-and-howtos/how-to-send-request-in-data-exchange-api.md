---
title: How to send a request in Data Exchange API
description: This guide shows how to send a request in Data Exchange API.
last_updated: Dec 5, 2023
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202304.0/dynamic-data-api/how-to-guides/how-to-send-request-in-data-exchange-api.html
  - /docs/scos/dev/glue-api-guides/202307.0/dynamic-data-api/how-to-guides/how-to-send-request-in-data-exchange-api.html
  - /docs/scos/dev/glue-api-guides/202307.0/data-exchange-api/how-to-guides/how-to-send-request-in-data-exchange-api.html
  - /docs/scos/dev/glue-api-guides/202311.0/data-exchange-api/how-to-guides/how-to-send-request-in-data-exchange-api.html
  - /docs/pbc/all/data-exchange/202311.0/tutorials-and-howtoes/how-to-send-request-in-data-exchange-api.html
---

This document describes how to send interact with databases using the Data Exchange API. The Data Exchange API lets you configure endpoints to interact with any database tables. In this document, we are using the `/dynamic-data/countries` to interact with the `spy_country` and `spy_tax_rate` tables as an example.


## Prerequisites

* [Install the Data Exchange API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/data-exchange-api-integration.html)
* [Configure the Data Exchange API](/docs/scos/dev/glue-api-guides/{{page.version}}/data-exchange-api/how-to-guides/how-to-configure-data-exchange-api.html)


The Data Exchange API is a non-resource-based API and routes all specified endpoints directly to a controller. By default, all routes within the Data Exchange API are protected to ensure data security. To access the API, you need to obtain an access token by sending the `POST /token/` request with the appropriate credentials:

```bash
POST /token/ HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 67

grant_type=password&username={username}&password={password}
```

## Retrieve a collection of fields

To retrieve a collection of countries, you need to send the `GET https://glue.mysprykershop.com/dynamic-entity/countries` request. The request needs to include the necessary headers, such as Content-Type, Accept, and Authorization, with the access token provided.

Pagination allows for efficient data retrieval by specifying the desired range of results. To use pagination, include the desired page limit and offset in the request:

```bash
GET /dynamic-entity/countries?page[offset]=1&page[limit]=2 HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```

Response sample:

```json
{
  "data": [
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
}
```

The response contains all the columns from the `spy_country` table that are configured in `spy_dynamic_entity_definition.definition`. Each column is represented using the `fieldVisibleName` as the key, providing a comprehensive view of the table's data in the API response. By default the API `GET` request returns up to 20 records.


Filtering enables targeted data retrieval, refining the response to match the specified criteria. To apply filtering to the results based on specific fields, include the appropriate filter parameter in the request:  

```bash
GET /dynamic-entity/countries?filter[country.iso2_code]=AA HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```

Response sample:

```json
{
  "data": [
    {
      "id_country": 1,
      "iso2_code": "AA",
      "iso3_code": "UUD",
      "name": "Create",
      "postal_code_mandatory": false,
      "postal_code_regex": null
    }
  ]
}
```

{% info_block infoBox %}

When you combine multiple filters in a single request, the system applies an `AND` condition to the retrieved results.

{% endinfo_block %}

To retrieve a country by a specific ID, send a `GET` request with the following parameters:

```bash
GET /dynamic-entity/countries/3 HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```

Response sample:

```json
{
  "data":[
    {
      "id_country": 3,
      "iso2_code": "AE",
      "iso3_code": "ARE",
      "name": "United Arab Emirates",
      "postal_code_mandatory": false,
      "postal_code_regex": null
    }
  ]
}
```


If you send a request to an endpoint that's not configured in `spy_dynamic_entity_configuration`, the following is returned:

```json
[
    {
        "message": "Not found",
        "status": 404,
        "code": "007"
    }
]
```

### Retrieve a collection of entities together with relations

To retrieve a collection of countries with relations, you need to send the `GET https://glue.mysprykershop.com/dynamic-entity/countries?include=countryTaxRates` request.
`include` parameter allows to define a list of relations that we want to retrieve by the request together with the main entity,
it has the following format `{mainEntity}?include={childRelationOfTheMainEntity.childRelationOfTheChildRelation},{secondRelationChain},{thirdRelationChain}`, where:
- Include parameter can consist from one or several relation chains with `,` delimiter.
- Each relation chain represents a list of relation names (See spy_dynamic_entity_configuration_relation.name) separated with `.` delimiter`.
- Each relation in the relation chain is a connection between two `spy_dynamic_entity_configuration`, see `spy_dynamic_entity_configuration_relation` table structure.

```bash
GET /dynamic-entity/countries?include=countryTaxRates HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
```

Response sample:

```json
{
  "data": [
    "...",
    {
      "id_country": 14,
      "iso2_code": "AT",
      "iso3_code": "AUT",
      "name": "Austria",
      "postal_code_mandatory": true,
      "postal_code_regex": "\\d{4}",
      "countryTaxRates": [
        {
          "id_tax_rate": 1,
          "fk_country": 14,
          "name": "Austria Standard",
          "rate": "20.00"
        },
        {
          "id_tax_rate": 21,
          "fk_country": 14,
          "name": "Austria Reduced1",
          "rate": "13.00"
        },
        {
          "id_tax_rate": 22,
          "fk_country": 14,
          "name": "Austria Reduced2",
          "rate": "10.00"
        }
      ]
    },
    "..."
  ]
}
```

The response contains all the columns from the `spy_country` table and included `spy_tax_rate` table that are configured in `spy_dynamic_entity_definition.definition`. Each column is represented using the `fieldVisibleName` as the key, providing a comprehensive view of the table's data in the API response.

{% info_block infoBox %}

Currently, filters do not work with `relations` and only used to filter the root entity results.

{% endinfo_block %}


## Sending `POST` requests

To create a collection of countries, submit the following HTTP request:

```bash
POST /dynamic-entity/countries HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 154

{
    "data": [
        {
            "iso2_code": "WA",
            "iso3_code": "WWA",
            "name": "FOO"
        }
    ]
}
```

The response payload includes all the specified fields from the request body, along with the ID of the created entity. Response sample:

```json
{
  "data":[
    {
      "iso2_code": "WA",
      "iso3_code": "WWA",
      "name": "FOO",
      "id_country": 257
    }
  ]
}
```


All fields included in the request payload are marked as `isCreatable: true` in the configuration. So, the API creates a new record with all the provided fields.
However, if any of the provided fields are configured as `isCreatable: false`, the request results in an error.

For example, configure `isCreatable: false` for `iso3_code` and send the same request. You should receive the following error response:

```json
[
  {
    "message": "Modification of immutable field `iso3_code` is prohibited.",
    "status": 400,
    "code": "1304"
  }
]
```


Certain database-specific configurations may result in issues independent of entity configurations. For example, with MariaDB, it is impossible to set the ID value for an auto-incremented field. Additionally, the `iso2_code` field in the `spy_country` table must have a unique value. Therefore, before creating a new record, you need to make sure you are not passing a duplicate value for this field. If a duplicate value is passed, the following is returned:

```json
[
    {
        "message": "Failed to persist the data. Please verify the provided data and try again. Entry is duplicated.",
        "status": 400,
        "code": "1309"
    }
]
```

This response is caused by a caught Propel exception, specifically an integrity constraint violation: `(Integrity constraint violation: 1062 Duplicate entry 'WA' for key 'spy_country-iso2_code')`.



### Sending `PATCH` requests

To update a collection of countries, submit the following HTTP request:

```bash
PATCH /dynamic-entity/countries HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 174
{
    "data": [
        {
            "id_country": 1,
            "iso2_code": "WB",
            "iso3_code": "WWB",
            "name": "FOO"
        }
    ]
}
```

The response payload includes all the specified fields from the request body. Response sample:

```json
{
    "data":[
      {
        "iso2_code": "WB",
        "iso3_code": "WWB",
        "name": "FOO",
        "id_country": 1
      }
    ]
}
```


To update a specific country, send the following HTTP request:

```bash
PATCH /dynamic-entity/countries/1 HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 143
{
    "data": {
            "iso2_code": "WB",
            "iso3_code": "WWB",
            "name": "FOO"
        }
}
```

All fields included in the request payload are marked as `isCreatable: true` in the configuration. So, the API creates a new record with all the provided fields.
However, if any of the provided fields are configured as `isCreatable: false`, the request results in an error.

For example, configure `isCreatable: false` for `iso3_code` and send the same request. You should receive the following error response:

```json
[
  {
    "message": "Modification of immutable field `iso3_code` is prohibited.",
    "status": 400,
    "code": "1304"
  }
]
```



If `id_country` is not provided, the following is returned:

```json
[
  {
    "message": "Incomplete Request - missing identifier.",
    "status": 400,
    "code": "1310"
  }
]
```

If `id_country` is not found, the following is returned:

```json
[
  {
    "message": "The entity could not be found in the database.",
    "status": 404,
    "code": "1303"
  }
]
```


{% info_block infoBox %}

Similarly to the `POST` request, it is important to consider database-specific configurations when sending a `PATCH` request.

{% endinfo_block %}

### Sending `PUT` request

When you send a PUT request, you provide the updated representation of the resource in the request payload. The server replaces the entire existing resource with the new representation provided. If the resource does not exist at the specified URL, the request creates a new resource.

To replace an existing entity, send the following `PUT` request:

```bash
PUT /dynamic-entity/countries HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 263
{
    "data": [
        {
            "id_country": 1,
            "iso2_code": "WB",
            "iso3_code": "WWB",
            "name": "FOO"
        }
    ]
}
```

The response payload includes all touched fields for the provided resource. Response sample:

```json
{
  "data": [
    {
      "iso2_code": "WB",
      "iso3_code": "WWB",
      "name": "FOO",
      "postal_code_mandatory": null,
      "postal_code_regex": null,
      "id_country": 1
    }
  ]
}
```


It is also possible to send a `PUT` request for a specific ID instead of a collection using the following request:

```bash
PUT /dynamic-entity/countries/1 HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 143
{
    "data": {
            "iso2_code": "WB",
            "iso3_code": "WWB",
            "name": "FOO"
        }
}
```

{% info_block infoBox %}

When using `PUT` requests, it's important to consider that the same rules and configurations apply
as with `PATCH` and `POST` requests. This means that the `isEditable` attribute determines whether existing
items can be modified during a `PUT` request. Additionally, the `isCreatable` attribute is used for non-existing
items that are created automatically according to the `PUT` request RFC.

In technical terms, the `PUT` request follows the same guidelines as `PATCH` and `POST` requests in relation to
the definition and database-specific configurations. The `isEditable` attribute governs the update capability
of existing items during a `PUT` request, ensuring that only editable fields can be modified. Similarly, the `isCreatable`
attribute pertains to non-existing items and governs their automatic creation as part of the `PUT` request process,
adhering to the standards outlined in the `PUT` request RFC. It's crucial to adhere to these rules and configurations
to ensure accurate and consistent data manipulation during `PUT` operations.

{% endinfo_block %}

#### Error codes

Bellow you can find a list of error codes that you can receive when sending `GET`, `POST`, `PATCH` or `PUT` requests.

| Error code | Message                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                         |
| --- |--------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1301 | Invalid or missing data format. Please ensure that the data is provided in the correct format. Example request body: `{'data':[{...},{...},..]}` | The request body is not valid. Please review the data format for validity. Ensure that the data is provided in the correct format. An example request body would be: `{'data':[{...data entity...},{...data entity...},...]}`. `data` If the data format is invalid or missing, an error message will be displayed. |
| 1302 | Failed to persist the data. Please verify the provided data and try again.                                                                       | The data could not be persisted in the database. Please verify the provided data entities and try again.                                                                                                                                                                                                            |
| 1303 | The entity could not be found in the database.                                                                                                   | The requested entity could not be found in the database for retrieval or update.                                                                                                                                                                                                                                    |
| 1304 | Modification of immutable field `field` is prohibited.                                                                                           | The field is prohibited from being modified. Please check the configuration for this field.                                                                                                                                                                                                                         |
| 1305 | Invalid data type for field: `field`                                                                                                             | The specified field has an incorrect type. Please check the configuration for this field and correct the value.                                                                                                                                                                                                     |
| 1306 | Invalid data value for field: `field`, row number: `row`. Field rules: `validation rules`.                                                       | The error indicates a data row and a field that does not comply with the validation rules in the configuration. Here is an example of the error: `Invalid data value for field: id, row number: 2. Field rules: min: 0, max: 127`.                                                                                  |
| 1307 | The required field must not be empty. Field: `field`                                                                                             | The specified field is required according to the configuration. The field was not provided. Please check the data you are sending and try again.                                                                                                                                                                    |
| 1308 | Entity `some field identifier` not found by identifier, and new identifier can not be persisted. Please update the request.                      | The entity could not be found using the provided identifier, and a new identifier cannot be persisted. Please update your request accordingly or check configuration for identifier field.                                                                                                                          |
| 1309 | Failed to persist the data. Please verify the provided data and try again. Entry is duplicated.                                                  | Failed to persist the data. Please verify the provided data and try again. This error may occur if a record with the same information already exists in the database.                                                                                                                                               |
| 1310 | Incomplete Request - missing identifier.                                                                                                         | The request is incomplete. The identifier is missing. Please check the request and try again.                                                                                                                                                                                                                       |
| 1311       | The provided `field` is incorrect or invalid.                                                                                                    | The request contains field that is not present in configuration. Please check field names.                                                                                                                                                                                                                          |
| 1312       | Dynamic entity configuration for table alias `alias` not found.                                                                                  | Make sure that you send the valid alias of the entity in the request.                                                                                                                                                                                                                                               |
| 1313       | Relation `relation` not found. Please check the requested relation name and try again.                                                           | Make sure that the relation, that you send in the relation chain is valid, and present in `spy_dynamic_entity_configuration_relation` table.                                                                                                                                                                        |