---
title: How send a request in Dynamic Data API
description: This guide shows how to send a request in Dynamic Data API.
last_updated: June 23, 2023
template: howto-guide-template
---

This guide shows how to send a request in Dynamic Data API.

{% info_block infoBox %}

Ensure the Dynamic Data API is integrated (follow [Dynamic Data API integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/dynamic-data-api-integration.html))
and configured (follow [How to configure Dynamic Data API](/docs/scos/dev/glue-api-guides/{{page.version}}/dynamic-data-api/how-to-guides/how-to-configure-dynamic-data-api.html))
as described in the guides.

{% endinfo_block %}

Let's say you have an endpoint `/dynamic-data/country` to operate with data in `spy_country` table in database.

The Dynamic Data API is a non-resource-based API and routes directly to a controller all specified endpoints.

By default, all routes within the Dynamic Data API are protected to ensure data security.
To access the API, you need to obtain an access token by sending a POST request to the `/token/` endpoint with the appropriate credentials:

```bash
POST /token/ HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 67

grant_type=password&username={username}&password={password}
```

### Sending a `GET` request

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

Note, by default the API `GET` request returns up to 20 records.

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

To create a collection of countries, submit the following HTTP request:

```bash
POST /dynamic-entity/country HTTP/1.1
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

{% info_block warningBox "Verification" %}

If everything is set up correctly you will get the following response:

```json
[
  {
    "iso2_code": "WA",
    "iso3_code": "WWA",
    "name": "FOO",
    "id_country": 257
  }
]
```

The response payload includes all the specified fields from the request body, along with the ID of the newly created entity.

{% endinfo_block %}

{% info_block infoBox %}

Note that all fields included in the request payload are marked as `isCreatable: true` in the configuration. 
Therefore, the API will create a new record with all the provided fields. 
However, if any of the provided fields are configured as `isCreatable: false` it will result in an error. 

Let's configure `isCreatable: false` for `iso3_code` and send the same request.
You will receive the following error response because a non-creatable field `iso3_code` is provided:

```json
[
  {
    "message": "Modification of immutable field `iso3_code` is prohibited.",
    "status": 400,
    "code": "505"
  }
]
```

{% endinfo_block %}

{% info_block infoBox %}

It is important to consider that certain database-specific configurations may result in issues independent of entity configurations.

For instance, in the case of MariaDB, it is not possible to set the ID value for an auto-incremented field. 
Additionally, for the `iso2_code` field in the `spy_country` table, it must have a unique value. 
Therefore, before creating a new record, it is necessary to verify that you do not pass a duplicated value for this field. 
Otherwise, you will receive the following response:

```json
[
    {
        "message": "Failed to persist the data. Please verify the provided data and try again. Entry is duplicated.",
        "status": 400,
        "code": "511"
    }
]
```

This response is caused by a caught Propel exception, specifically an integrity constraint violation `(Integrity constraint violation: 1062 Duplicate entry 'WA' for key 'spy_country-iso2_code')`. 

{% endinfo_block %}

### Sending `PATCH` request

To update a collection of countries, submit the following HTTP request:

```bash
PATCH /dynamic-entity/country HTTP/1.1
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

{% info_block warningBox "Verification" %}

If everything is set up correctly you will get the following response:

```json
[
  {
    "iso2_code": "WB",
    "iso3_code": "WWB",
    "name": "FOO",
    "id_country": 1
  }
]
```

The response payload includes all the specified fields from the request body.

{% endinfo_block %}

{% info_block infoBox %}

It is also possible to send a `PATCH` request for a specific ID instead of a collection, use the following request:

```bash
PATCH /dynamic-entity/country/1 HTTP/1.1
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

{% endinfo_block %}

{% info_block infoBox %}

Note that all fields included in the request payload are marked as `isEditable: true` in the configuration.
Therefore, the API will update the found record with all the provided fields.
However, if any of the provided fields are configured as `isEditable: false` it will result in an error.

Let's configure `isEditable: false` for `iso3_code` and send the same request.

You will receive the following error response because a non-editable field `iso3_code` is provided:

```json
[
  {
    "message": "Modification of immutable field `iso3_code` is prohibited.",
    "status": 400,
    "code": "505"
  }
]
```

{% endinfo_block %}

{% info_block infoBox %}

If `id_country` is not provided you will get the following response:

```json
[
  {
    "message": "Incomplete Request - missing identifier.",
    "status": 400,
    "code": "512"
  }
]
```

If `id_country` is not found you will get the following response:

```json
[
  {
    "message": "The entity could not be found in the database.",
    "status": 404,
    "code": "504"
  }
]
```

{% endinfo_block %}

{% info_block infoBox %}

Similarly to the `POST` request, it is important to consider database-specific configurations when sending a `PATCH` request. 

{% endinfo_block %}

### Sending `PUT` request

When you send a PUT request, you provide the updated representation of the resource in the request
payload. The server then replaces the entire existing resource with the new representation provided. If the resource does not exist at the specified URL, a PUT request can also create a new resource.

Let's send the following `PUT` request to update the existing entity:

```bash
PUT /dynamic-entity/country HTTP/1.1
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

{% info_block warningBox "Verification" %}

If everything is set up correctly you will get the following response:

```json
[
  {
    "iso2_code": "WB",
    "iso3_code": "WWB",
    "name": "FOO",
    "postal_code_mandatory": null,
    "postal_code_regex": null,
    "id_country": 1
  }
]
```

The response payload includes all touched fields for the provided resource.

{% endinfo_block %}

{% info_block infoBox %}

It is also possible to send a `PUT` request for a specific ID instead of a collection using the following request:

```bash
PUT /dynamic-entity/country/1 HTTP/1.1
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

{% endinfo_block %}

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


| Error code | Message | Description |
| --- | --- | --- |
| 1301 | Invalid or missing data format. Please ensure that the data is provided in the correct format. Example request body: `{'data':[{...},{...},..]}` | The request body is not valid. Please review the data format for validity. Ensure that the data is provided in the correct format. An example request body would be: `{'data':[{...data entity...},{...data entity...},...]}`. `data` If the data format is invalid or missing, an error message will be displayed. |
| 1302 | Failed to persist the data. Please verify the provided data and try again. | The data could not be persisted in the database. Please verify the provided data entities and try again. |
| 1303 | The entity could not be found in the database. | The requested entity could not be found in the database for retrieval or update. |
| 1304 | Modification of immutable field `field` is prohibited. | The field is prohibited from being modified. Please check the configuration for this field.  |
| 1305 | Invalid data type for field: `field` |  The specified field has an incorrect type. Please check the configuration for this field and correct the value. | 
| 1306 | Invalid data value for field: `field`, row number: `row`. Field rules: `validation rules`. | The error indicates a data row and a field that does not comply with the validation rules in the configuration. Here is an example of the error: `Invalid data value for field: id, row number: 2. Field rules: min: 0, max: 127`. |
| 1307 | The required field must not be empty. Field: `field` | The specified field is required according to the configuration. The field was not provided. Please check the data you are sending and try again. |
| 1308 | Entity not found by identifier, and new identifier can not be persisted. Please update the request. | The entity could not be found using the provided identifier, and a new identifier cannot be persisted. Please update your request accordingly or check configuration for identifier field. | 
| 1309 | Failed to persist the data. Please verify the provided data and try again. Entry is duplicated. | Failed to persist the data. Please verify the provided data and try again. This error may occur if a record with the same information already exists in the database. |