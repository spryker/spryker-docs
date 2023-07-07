---
title: How to configure Dynamic Data API endpoints.
description: This guide shows how to configure the Dynamic Data API endpoints.
last_updated: June 23, 2023
template: howto-guide-template
---

This guide shows how to configure the Dynamic Data API endpoints.

In order to incorporate a new endpoint for interacting with entities in the database, 
it is necessary to add a corresponding row to the `spy_dynamic_entity_configuration` table. 

The `spy_dynamic_entity_configuration` table represents the configuration for dynamic entity endpoints in the system. It has the following columns:

| COLUMN | SPECIFICATION |
| --- | --- |
| id_dynamic_entity_configuration | The unique ID for the configuration. |
| table_alias | An alias used in the request URL to refer to the endpoint. |
| table_name | The name of the corresponding table in the database to operate on. |
| is_active | Indicates whether the endpoint is enabled or disabled. |
| definition | A JSON-formatted string containing the configuration details for each field in the table. |
| created_at | Represents the date and time when the configuration was created. |
| updated_at | Represents the date and time when the configuration was last updated. |

{% info_block infoBox %}

Currently, the process entails manually executing SQL queries as there is no existing user interface (UI) feature in Spryker for it. 
However, future releases are expected to introduce an UI solution for adding new rows to the `spy_dynamic_entity_configuration` table.

{% endinfo_block %}

Let's dive deeper into the configuration of the `spy_dynamic_entity_definition.definition` field.

Below is an example snippet illustrating the structure of a possible definition value based on `spy_country` table:

```json
{
  "identifier": "id_country",
  "fields": [
    {
      "fieldName": "id_country",
      "fieldVisibleName": "id_country",
      "isEditable": false,
      "isCreatable": false,
      "type": "integer",
      "validation": {
        "isRequired": false
      }
    },
    { 
      "fieldName": "iso2_code",
      "fieldVisibleName": "iso2_code",
      "type": "string", 
      "isEditable": true,
      "isCreatable": true,
      "validation": {
        "isRequired": true,
        "maxLength": 2,
        "minLength": 2
      }
    }
  ]
}
```

And now, let's delve into the meaning of each field within the snippet. Here's a breakdown of the purpose of each field:

| FIELD | SPECIFICATION |
| --- | --- |
| identifier | The name of the column in the table that serves as an identifier. It can be any chosen column from the table, typically used as a unique ID for each record. |
| fields | An array containing the descriptions of the columns from the table. It allows customization of which columns are included for interaction. By specifying the desired columns in the "fields" array, the API will only expose and operate on those specific columns. Any columns not included in the array will be inaccessible through API requests. |
| fieldName | The actual name of the column in the database table. |
| fieldVisibleName | The name used for interacting with the field through API requests. It provides a more user-friendly and descriptive name compared to the physical column name. |
| type | The data type of the field. It specifies the expected data format for the field, enabling proper validation and handling of values during API interactions. |
| isEditable | A flag indicating whether the field can be modified. When set to "true," the field is editable, allowing updates to its value. |
| isCreatable | A flag indicating whether the field can be set. If set to "true," the field can be included in requests to provide an initial value during record creation. |
| validation | Contains validation configurations. Proper validation ensures that the provided data meets the specified criteria. |
| required | A validation attribute that determines whether the field is required or optional. When set to "true," the field must be provided in API requests. |
| maxLength/minLength | An optional validation attribute that specifies the minimum/maximum length allowed for the field defined with a string type. It enforces a lower boundary, ensuring that the field's value meets or exceeds the defined minimum requirement. |
| max/min | An optional validation attribute that specifies the minimum/maximum value allowed for the field defined with an integer type. It enforces a lower boundary, ensuring that the field's value meets or exceeds the defined minimum requirement. |

{% info_block infoBox %}

It is recommended to set `isEditable` and `isCreatable` to `false` for fields that serve as identifiers or keys, ensuring their immutability and preserving the integrity of the data model.

{% endinfo_block %}

{% info_block infoBox %}

When configuring the definition for the field responsible for the numerable values, keep in mind that an integer data type is a non-decimal number 
between -2147483648 and 2147483647 in 32-bit systems, and between -9223372036854775808 and 9223372036854775807 in 64-bit systems. 
However, if there is a need to use values outside this range or if the person providing the configuration anticipates 
larger values, the field can be set as a string type instead.

{% endinfo_block %}

{% info_block infoBox %}

So far the Dynamic Data API supports the following types for the configured fields: boolean, integer, string and decimal.

{% endinfo_block %}

Let's say you want to have a new endpoint `/dynamic-data/country` to operate with data in `spy_country` table in database.

Based on the provided information, the SQL transaction for interacting with the `spy_country` table through the API request via `dynamic-entity/country` would be as follows:

```sql
BEGIN;
INSERT INTO `spy_dynamic_entity_configuration` VALUES ('country', 'spy_country', 1, '{\"identifier\":\"id_country\",\"fields\":[{\"fieldName\":\"id_country\",\"fieldVisibleName\":\"id_country\",\"isEditable\":false,\"isCreatable\":false,\"type\":\"integer\",\"validation\":{\"isRequired\":false}},{\"fieldName\":\"iso2_code\",\"fieldVisibleName\":\"iso2_code\",\"type\":\"string\",\"isEditable\":true,\"isCreatable\":true,\"validation\":{\"isRequired\":true,\"maxLength\":2,\"minLength\":2}},{\"fieldName\":\"iso3_code\",\"fieldVisibleName\":\"iso3_code\",\"type\":\"string\",\"isEditable\":true,\"isCreatable\":true,\"validation\":{\"isRequired\":true,\"maxLength\":3,\"minLength\":3}},{\"fieldName\":\"name\",\"fieldVisibleName\":\"name\",\"type\":\"string\",\"isEditable\":true,\"isCreatable\":true,\"validation\":{\"isRequired\":true,\"maxLength\":255,\"minLength\":1}},{\"fieldName\":\"postal_code_mandatory\",\"fieldVisibleName\":\"postal_code_mandatory\",\"type\":\"boolean\",\"isEditable\":true,\"isCreatable\":true,\"validation\":{\"isRequired\":false}},{\"fieldName\":\"postal_code_regex\",\"isEditable\":\"false\",\"isCreatable\":\"false\",\"fieldVisibleName\":\"postal_code_regex\",\"type\":\"string\",\"validation\":{\"isRequired\":false,\"maxLength\":500,\"minLength\":1}}]}');
COMMIT;
```

{% info_block warningBox "Verification" %}

If everything is set up correctly, you can follow [How to send request in Dynamic Data API](/docs/scos/dev/glue-api-guides/{{page.version}}/dynamic-data-api/how-to-guides/how-to-send-request-in-dynamic-data-api.html) to discover how to request your API endpoint.
Or if you're in the middle of the integration process for the Dynamic Data API follow [Dynamic Data API integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/dynamic-data-api-integration.html) to proceed with it.

{% endinfo_block %}
