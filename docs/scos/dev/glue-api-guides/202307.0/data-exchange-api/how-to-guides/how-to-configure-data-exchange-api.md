---
title: How to configure Data Exchange API endpoints.
description: This guide shows how to configure the Data Exchange API endpoints.
last_updated: June 23, 2023
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202304.0/data-exchange-api/how-to-guides/how-to-configure-data-exchange-api.html
---

This document describes how to configure the Data Exchange API endpoints by executing SQL queries.

To create an endpoint for interacting with entities in the database, you need to add a corresponding row to the `spy_dynamic_entity_configuration` table.

The `spy_dynamic_entity_configuration` table contains the configuration of dynamic entity endpoints and has the following columns:

| COLUMN | SPECIFICATION |
| --- | --- |
| id_dynamic_entity_configuration | The unique ID of the configuration. |
| table_alias | An alias used in the request URL to refer to the endpoint. |
| table_name | The name of the corresponding table in the database to operate on. |
| is_active | Indicates whether the endpoint is enabled or disabled. |
| definition | A JSON-formatted string containing the configuration details for each field in the table. |
| created_at | Date and time when the configuration was created. |
| updated_at | Date and time when the configuration was last updated. |

Dive deeper into the configuration of the `spy_dynamic_entity_definition.definition` field.

The following example shows the structure of a possible definition value based on the `spy_country` table:

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

The following table describes the purpose of each field:

| FIELD | SPECIFICATION |
| --- | --- |
| identifier | The name of the column in the table that serves as an identifier. It can be any chosen column from the table, typically used as a unique ID for each record. |
| fields | An array containing the descriptions of the columns from the table. It defines the columns that are included for interaction. The API exposes and operates on the included columns. Columns that are not included in the array are inaccessible through API requests. |
| fieldName | The name of the column in the database table. |
| fieldVisibleName | The name used for interacting with the field through API requests. It's a more user-friendly and descriptive name compared to the physical column name. |
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

So far the Data Exchange API supports the following types for the configured fields: boolean, integer, string and decimal.

{% endinfo_block %}

Let's say you want to have a new endpoint `/dynamic-data/country` to operate with data in `spy_country` table in database.

In order to configure the endpoint, you need to go to Data Exchange API section in Backoffice and click on "Create Data Exchange API configuration" button.

[PASTE SCREENSHOT HERE]

Then you need to select a configurable table in the form below. In our case it is `spy_country`:

[PASTE SCREENSHOT HERE]

{% info_block infoBox %}

Note, that you can only select tables that are not excluded from configuring.
In order to exclude a table from configuring follow [Data Exchange API integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/data-exchange-api-integration.html).

{% endinfo_block %}

After you select a table, you will see a form for configuring the endpoint. Let's fill in the form with the following values:

[PASTE SCREENSHOT HERE]

{% info_block infoBox %}

Note, that you have to enable the endpoint in order to be able to use it. And besides that, you have to provide enable each field you want to use as well.

{% endinfo_block %}

After you click "Save" button, you will see a new endpoint in the list of endpoints in Data Exchange API section in Backoffice.
And you will be able to send request to it.

{% info_block warningBox "Verification" %}

If everything is set up correctly, you can follow [How to send request in Data Exchange API](/docs/scos/dev/glue-api-guides/{{page.version}}/data-exchange-api/how-to-guides/how-to-send-request-in-data-exchange-api.html) to discover how to request your API endpoint.
Or if you're in the middle of the integration process for the Data Exchange API follow [Data Exchange API integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/data-exchange-api-integration.html) to proceed with it.

{% endinfo_block %}
