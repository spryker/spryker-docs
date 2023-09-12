---
title: Configure Data Exchange API endpoints
description: This guide shows how to configure the Data Exchange API endpoints.
last_updated: June 23, 2023
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202304.0/data-exchange-api/how-to-guides/how-to-configure-data-exchange-api.html
---

This document describes how to configure the Data Exchange API endpoints by executing SQL queries.

## Configuration of Data Exchange API endpoints

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
| isEditable | Defines if the field's value can be changed. |
| isCreatable | Defines if the field can be included in requests to provide an initial value during record creation. |
| validation | Contains validation configurations. Proper validation ensures that the provided data meets the specified criteria. |
| required | Defines if the field must be provided in API requests. |
| maxLength/minLength | Defines the minimum/maximum length allowed for the field with a string type. It enforces a lower boundary, ensuring that the field's value meets or exceeds the defined minimum requirement. |
| max/min | Defines the minimum/maximum value allowed for the field with an integer type. It enforces a lower boundary, ensuring that the field's value meets or exceeds the defined minimum requirement. Optional. |


{% info_block infoBox %}

* We recommend setting `isEditable` and `isCreatable` to `false` for fields that serve as identifiers or keys, ensuring their immutability and preserving the integrity of the data model.

* For the fields with numerable values, an integer data type is a non-decimal number between -2147483648 and 2147483647 in 32-bit systems and, in 64-bit systems, between -9223372036854775808 and 9223372036854775807. If you need or anticipate values outside of this range, you can set the value as a string type.

* The Data Exchange API supports the following types for the configured fields:
  * boolean
  * integer
  * string
  * decimal

{% endinfo_block %}

## Create Data Exchange API endpoints

In this example, we are creating the `/dynamic-data/country` endpoint to operate with data in the `spy_country` table. When following the steps, adjust the data per your requirements:


1. In the Back Office, go to **Data Exchange API Configuration**.
2. On the **Data Exchange API Configuration** page, click **Create Data Exchange API configuration**.

[PASTE SCREENSHOT HERE]

3. Then you need to select a configurable table in the form below. In our case it is `spy_country`:

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

## Download Data Exchange API specification

You can download the specification of for all available endpoints including the Data Exchange API endpoints in the OpenAPI format. To do so, click **Download API Specification** on the **Data Exchange API Configuration** page.

[PASTE SCREENSHOT deapi_download_spec_button.png HERE]

After you click the button, the specification will be downloaded to your computer.

If you added new endpoints, documentation will be updated automatically with the new endpoints, but need wait 1 minute for it. Button **Download API Specification** will be disabled during this time and aviailable after 1 minute. You can see  message about it in the top of the page:

[PASTE SCREENSHOT deapi_generation_in_progress.png HERE]

***Also if for some reason file not exists, you will see the message about it***

[PASTE SCREENSHOT deapi_spec_file_not_exists.png HERE]

Please regenerate specification in this case manually or add new endpoints for Data Exchange API.

```bash 
 vendor/bin/glue api:generate:documentation
```
