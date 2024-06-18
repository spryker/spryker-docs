---
title: Configure Data Exchange API endpoints
description: This guide shows how to configure the Data Exchange API endpoints.
last_updated: May 30, 2024
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202304.0/dynamic-data-api/how-to-guides/how-to-configure-data-exchange-api.html
  - /docs/scos/dev/glue-api-guides/202307.0/dynamic-data-api/how-to-guides/how-to-configure-data-exchange-api.html
  - /docs/scos/dev/glue-api-guides/202307.0/data-exchange-api/how-to-guides/how-to-configure-data-exchange-api.html
  - /docs/scos/dev/glue-api-guides/202311.0/data-exchange-api/how-to-guides/how-to-configure-data-exchange-api.html
  - /docs/pbc/all/data-exchange/202311.0/tutorials-and-howtoes/how-to-configure-data-exchange-api.html
---

This document describes how to create and configure the Data Exchange API endpoints.

The Data Exchange API lets you create endpoints to interact with any database tables through API. In this example, we are creating the `/dynamic-data/countries` endpoint to interact with the `spy_country` and `spy_tax_rate` tables. When following the steps, adjust the data per your requirements.

## Create and configure a Data Exchange API endpoint

To register an endpoint for interacting with entities in the database, you need to add a corresponding row to the `spy_dynamic_entity_configuration` table. The table contains the configuration of dynamic entity endpoints and has the following columns:

| COLUMN | SPECIFICATION |
| --- | --- |
| id_dynamic_entity_configuration | ID of the configuration. |
| table_alias | An alias used in the request URL to refer to the endpoint. |
| table_name | Name of the database table to operate on. |
| is_active | Defines if the endpoint can be interacted with. |
| definition | A JSON-formatted string containing the configuration details for each field in the table. |
| created_at | Date and time when the configuration was created. |
| updated_at | Date and time when the configuration was updated. |

You can optionally create a relation by adding new rows to `spy_dynamic_entity_configuration_relation` and `spy_dynamic_entity_configuration_relation_field_mapping` tables. 
The `spy_dynamic_entity_configuration_relation` contains the configuration of relations for dynamic entity endpoints and has the following columns:

| COLUMN | SPECIFICATION                                                                                   |
| --- |-------------------------------------------------------------------------------------------------|
| id_dynamic_entity_configuration_relation | ID of the configuration relation.                                                               |
| fk_parent_dynamic_entity_configuration | Foreign key of the dynamic entity configuration for parent dynamic entity configuration ID. |
| fk_child_dynamic_entity_configuration | Foreign key of the dynamic entity configuration for child dynamic entity configuration ID.  |
| name | Name of the dynamic entity relation.                                                        |
| is_editable | Defines if the endpoint can be editable.                                                        |

`spy_dynamic_entity_configuration_relation_field_mapping` contains the configuration of relation field mapping for dynamic entity endpoints and has the following columns:

| COLUMN | SPECIFICATION                                                                                              |
| --- |------------------------------------------------------------------------------------------------------------|
| id_dynamic_entity_configuration_relation_field_mapping | ID of the configuration relation field mapping.                                                            |
| fk_dynamic_entity_configuration_relation | Foreign key of the dynamic entity configuration relation for dynamic entity configuration relation ID. |
| child_field_name | Foreign field key name for the child data table.                                                       |
| parent_field_name | Reference field name for the parent data table.                                                        |

The following example shows a possible value of the `spy_dynamic_entity_configuration.definition` field configured for the `spy_country` table:

```json
{
  "identifier": "id_country",
  "isDeletable": false,
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

and for `spy_tax_rate` table:

```json
{
  "identifier": "id_tax_rate",
  "isDeletable": false,
  "fields": [
    {
      "fieldName": "id_tax_rate",
      "fieldVisibleName": "id_tax_rate",
      "isCreatable": true,
      "isEditable": true,
      "type": "integer",
      "validation": { "isRequired": false }
    },
    {
      "fieldName": "fk_country",
      "fieldVisibleName": "fk_country",
      "isCreatable": true,
      "isEditable": true,
      "type": "integer",
      "validation": { "isRequired": false }
    },
    {
      "fieldName": "name",
      "fieldVisibleName": "name",
      "isCreatable": true,
      "isEditable": true,
      "type": "string",
      "validation": { "isRequired": true }
    },
    {
      "fieldName": "rate",
      "fieldVisibleName": "rate",
      "isCreatable": true,
      "isEditable": true,
      "type": "float",
      "validation": { "isRequired": true }
    }
  ]
}
```

{% info_block infoBox %}

For configuration relations follow [Configure Dynamic Data installation](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html#configure-dynamic-data-installation) .

{% endinfo_block %}


| FIELD | DESCRIPTION                                                                                                                                                                                                                                                           |
| --- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| identifier | The name of the column in the table that serves as an identifier. It can be any chosen column from the table, typically used as a unique ID for each record.                                                                                                          |
| isDeletable | Defines if the entity can be deleted.                                                                                                                                                                                                                                 |
| fields | An array containing the descriptions of the columns from the table. It defines the columns that are included for interaction. The API exposes and operates on the included columns. Columns that are not included in the array are inaccessible through API requests. |
| fieldName | The name of the column in the database table.                                                                                                                                                                                                                         |
| fieldVisibleName | The name used for interacting with the field through API requests. It's a more user-friendly and descriptive name compared to the physical column name.                                                                                                               |
| type | The data type of the field. It specifies the expected data format for the field, enabling proper validation and handling of values during API interactions.                                                                                                           |
| isEditable | Defines if the field's value can be changed.                                                                                                                                                                                                                          |
| isCreatable | Defines if the field can be included in requests to provide an initial value during record creation.                                                                                                                                                                  |
| validation | Contains validation configurations. Proper validation ensures that the provided data meets the specified criteria.                                                                                                                                                    |
| required | Defines if the field must be provided in API requests.                                                                                                                                                                                                                |
| maxLength | Defines the maximum length allowed for the field with a string type. It enforces a boundary, ensuring that the field's value meet or doesn't exceed the defined requirement.                                                                                          |
| minLength | Defines the minimum length allowed for the field with a string type. It enforces a boundary, ensuring that the field's value meets or exceeds the defined requirement.                                                                                                |
| max | Defines the maximum value allowed for the field with an integer type. It enforces a boundary, ensuring that the field's value meet or doesn't exceed the defined requirement. Optional.                                                                               |
| min | Defines the minimum value allowed for the field with an integer type. It enforces a boundary, ensuring that the field's value meets or exceeds the defined minimum requirement. Optional.                                                                             |


{% info_block infoBox %}

* We recommend setting `isEditable` and `isCreatable` to `false` for fields that serve as identifiers or keys, ensuring their immutability and preserving the integrity of the data model.

* For the fields with numerable values, an integer data type is a non-decimal number between -2147483648 and 2147483647 in 32-bit systems and, in 64-bit systems, between -9223372036854775808 and 9223372036854775807. If you need or anticipate values outside of this range, you can set the value as a string type.

* The Data Exchange API supports the following types for the configured fields:
  * boolean
  * integer
  * string
  * decimal

{% endinfo_block %}

## Enable and configure the Data Exchange API endpoint in the Back Office

1. In the Back Office, go to **Data Exchange API Configuration**.
2. On the **Data Exchange API Configuration** page, click **Create Data Exchange API configuration**.

![configure-data-exchange-in-back-office](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/configure-data-exchange-api/configure-data-exchange-in-back-office.png)

3. In **CREATE DATA EXCHANGE API CONFIGURATION** pane, for **TABLE NAME**, select the table you want to configure the API for. In our example, it's `spy_country`.

![create-data-exchange-api-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/configure-data-exchange-api/create-data-exchange-api-configuration.png)

{% info_block infoBox %}

If you don't see the needed table, it may be [excluded from configuring](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html#set-up-the-configuration).

{% endinfo_block %}

4. Click **Create**.
    This opens the **EDIT DATA EXCHANGE API CONFIGURATION** page.
5. For **RESOURCE NAME**, enter the name of the endpoint you want to create. In our case, it's `countries`.
5. Optional: To enable the endpoint after it's configured, select **IS ENABLED**.
6. Configure the fields for interactions per your requirements.

![edit-data-exchange-api-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/configure-data-exchange-api/edit-data-exchange-api-configuration.png)


7. Click **Save**.
This opens the **Data Exchange API Configuration** page with the endpoint displayed in the list. Now you can send requests to this endpoint.

{% info_block warningBox "Verification" %}

If everything is set up correctly, you can follow [How to send request in Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/tutorials-and-howtos/how-to-send-request-in-data-exchange-api.html) to discover how to request your API endpoint.
Or if you're in the middle of the integration process for the Data Exchange API follow [Install the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html) to proceed with it.

{% endinfo_block %}

## Download Data Exchange API specification

You can download the specification of all the available endpoints, including the Data Exchange API endpoints, in the OpenAPI format. 
To download the specification, go to the *Data Exchange API Configuration* page, click **Download API Specification**. This initiates the download of the specification to your computer.

![deapi_download_spec_button](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/configure-data-exchange-api/deapi_download_spec_button.png)

In case you've added new endpoints, the documentation will be automatically updated with the new information after a minute. The **Download API Specification** button is inactive during the documentation update process and becomes available again after one minute. There is a notification about this at the top of the page:

![deapi_generation_in_progress](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/data-exchange/configure-data-exchange-api/deapi_generation_in_progress.png)

## Next steps

[Send request in Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/tutorials-and-howtos/how-to-send-request-in-data-exchange-api.html)
