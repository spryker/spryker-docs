---
title: How to configure Data Exchange API endpoints for import or export data. 
description: This guide shows how to configure the Data Exchange API endpoints to import or export data. 
last_updated: Aug 5, 2024
template: howto-guide-template
---

## Prerequisites  

Before you start configuring the Data Exchange API endpoints, please check another guide on how to set up  and configure the Data Exchange API. 

* [Install the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html)
* [Configure the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/configure-data-exchange-api.html)
* [Sending requests with Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/sending-requests-with-data-exchange-api.md)


## Create a configuration for the Data Exchange API to import or export data.

To create the necessary configuration, you need to define all the required relations in the table and the data you want to import or export. 
Then expand the configuration in the `src/Pyz/Zed/DynamicEntity/data/installer/configuration.json` file. More information about the configuration can be found in this part of the  [documentation](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html#configure-dynamic-data-installation). 
It is also possible to configure directly in the database in the tables `spy_dynamic_entity_configuration`, `spy_dynamic_entity_configuration_relation`, and `spy_dynamic_entity_configuration_relation_field_mapping`. 
Also, it is possible to configure the Data Exchange API through the user interface for specific tables, but the relations between tables need to be defined in the database.


### Example of creating a configuration for importing discount vouchers

Consider an example of creating a configuration for importing discount coupons with some base tables for these enities: 

Main tables for data discount vouchers:
`spy_discount_voucher_pool` - pool of vouchers that contains the name and status of the activity.
`spy_discount_voucher` - a table for storing discount coupons that contain the coupon code, activity status, number of uses and other data..
`spy_discount` - a table for storing discount settings that contain information about the discount, type of discount, priority and other data.
`spy_discount_store` - table for storing relaton between discount and store.

`spy_discount_voucher_pool` have relation to  `spy_discount_voucher` and `spy_discount` tables via forign keys `fk_discount_voucher.fk_discount_voucher_pool` and `fk_discount.fk_discount_voucher_pool`. Table `spy_discount_store` have relation to `spy_discount` table via forign key `fk_discount`.

We need to define the relations between the tables and create a complex configuration.

All configurations need to be added to the file: `src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`. 

For import configuration to the database, you need to clear the tables `spy_dynamic_entity_configuration`, `spy_dynamic_entity_configuration_relation`, and `spy_dynamic_entity_configuration_relation_field_mapping` and run the command:

```bash
vendor/bin/console setup:init-db
```

1. **Create and add configuration for `spy_discount` table:**

`src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`
```json 
[
    //...
    {
        "tableName": "spy_discount",
        "tableAlias": "discounts",
        "isActive": true,
        "definition": {
            "identifier": "id_discount",
            "isDeletable": false,
            "fields": [
                {
                    "fieldName": "id_discount",
                    "fieldVisibleName": "id_discount",
                    "type": "integer",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "fk_discount_voucher_pool",
                    "fieldVisibleName": "fk_discount_voucher_pool",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "fk_store",
                    "fieldVisibleName": "fk_store",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "amount",
                    "fieldVisibleName": "amount",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "calculator_plugin",
                    "fieldVisibleName": "calculator_plugin",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "collector_query_string",
                    "fieldVisibleName": "collector_query_string",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "decision_rule_query_string",
                    "fieldVisibleName": "decision_rule_query_string",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "description",
                    "fieldVisibleName": "description",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "discount_key",
                    "fieldVisibleName": "discount_key",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "discount_type",
                    "fieldVisibleName": "discount_type",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "display_name",
                    "fieldVisibleName": "display_name",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "is_active",
                    "fieldVisibleName": "is_active",
                    "type": "boolean",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "is_exclusive",
                    "fieldVisibleName": "is_exclusive",
                    "type": "boolean",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "minimum_item_amount",
                    "fieldVisibleName": "minimum_item_amount",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "priority",
                    "fieldVisibleName": "priority",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "valid_from",
                    "fieldVisibleName": "valid_from",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "valid_to",
                    "fieldVisibleName": "valid_to",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "created_at",
                    "fieldVisibleName": "created_at",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "updated_at",
                    "fieldVisibleName": "updated_at",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                }
            ]
        }
    }
    // ... 
]

```

{% info_block warningBox "Verification" %}
After adding the configuration to the file, you need to import the configuration into the database. 

```bash
GET /dynamic-entity/discounts HTTP/1.1
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
            "id_discount": 1,
            "fk_discount_voucher_pool": null,
            "fk_store": null,
            "amount": 1000,
            "calculator_plugin": "PLUGIN_CALCULATOR_PERCENTAGE",
            "collector_query_string": "sku = \"*\"",
            "decision_rule_query_string": "( currency = 'CHF' AND sub-total >= '115' )  OR ( currency = 'EUR' AND sub-total >= '100' ) ",
            "description": "Get a 10% discount on all orders above 100 EUR or 115 CHF",
            "discount_key": "discount_1",
            "discount_type": "cart_rule",
            "display_name": "10% off minimum order",
            "is_active": true,
            "is_exclusive": false,
            "minimum_item_amount": 1,
            "priority": 5000,
            "valid_from": "2016-01-01 00:00:00.000000",
            "valid_to": "2037-12-31 00:00:00.000000",
            "created_at": "2024-07-17 12:13:15.000000",
            "updated_at": "2024-07-17 12:13:15.000000"
        },
        {
            "id_discount": 2,
            "fk_discount_voucher_pool": null,
            "fk_store": null,
            "amount": 0,
            "calculator_plugin": "PLUGIN_CALCULATOR_FIXED",
            "collector_query_string": "item-quantity = \"5\"",
            "decision_rule_query_string": "(day-of-week = \"2\" OR day-of-week = \"3\") AND item-quantity >= \"5\"",
            "description": "Get €5 off on Tuesdays and Wednesdays when you buy at least 5 items",
            "discount_key": "discount_2",
            "discount_type": "cart_rule",
            "display_name": "Tu & Wed €5 off 5 or more",
            "is_active": true,
            "is_exclusive": false,
            "minimum_item_amount": 1,
            "priority": null,
            "valid_from": "2016-01-01 00:00:00.000000",
            "valid_to": "2037-12-31 00:00:00.000000",
            "created_at": "2024-07-17 12:13:15.000000",
            "updated_at": "2024-07-17 12:13:15.000000"
        },
        // ....
    ]
}
```

{% endinfo_block %}


2. **Create and add configuration for `spy_store` table:**

This configuration should be by default, but if you don't have it, you can add it.

`src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`
```json
[
    //...
    {
        "tableName": "spy_store",
        "tableAlias": "stores",
        "isActive": true,
        "definition": {
            "identifier": "id_store",
            "isDeletable": false,
            "fields": [
                {
                    "fieldName": "id_store",
                    "fieldVisibleName": "id_store",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": { "isRequired": false },
                    "type": "integer"
                },
                {
                    "fieldName": "fk_locale",
                    "fieldVisibleName": "fk_locale",
                    "isCreatable": true,
                    "isEditable": true,
                    "type": "integer",
                    "validation": { "isRequired": true }
                },
                {
                    "fieldName": "fk_currency",
                    "fieldVisibleName": "fk_currency",
                    "isCreatable": true,
                    "isEditable": true,
                    "type": "integer",
                    "validation": { "isRequired": true }
                },
                {
                    "fieldName": "name",
                    "fieldVisibleName": "name",
                    "isCreatable": true,
                    "isEditable": true,
                    "type": "string",
                    "validation": { "isRequired": false }
                }
            ]
        }
    }
    // ... 
]

```

{% info_block warningBox "Verification" %}
After adding the configuration to the file, you need to import the configuration into the database. 

```bash
GET /dynamic-entity/stores HTTP/1.1
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
            "id_store": 1,
            "fk_currency": 93,
            "fk_locale": 66,
            "name": "DE"
        },
        {
            "id_store": 2,
            "fk_currency": 93,
            "fk_locale": 66,
            "name": "AT"
        }
    ]
}
```

{% endinfo_block %}


3. **Create and add configuration for `spy_discount_store` table:**

`src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`
```json
[
    //...
    {
        "tableName": "spy_discount_store",
        "tableAlias": "discount-stores",
        "isActive": true,
        "definition": {
            "identifier": "id_discount_store",
            "isDeletable": false,
            "fields": [
                {
                    "fieldName": "id_discount_store",
                    "fieldVisibleName": "id_discount_store",
                    "type": "integer",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "fk_discount",
                    "fieldVisibleName": "fk_discount",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "fk_store",
                    "fieldVisibleName": "fk_store",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                }
            ]
        }
    }

    //...
]

```

{% info_block warningBox "Verification" %}
After adding the configuration to the file, you need to import the configuration into the database. 

```bash
GET /dynamic-entity/discount-stores HTTP/1.1
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
            "id_discount_store": 1,
            "fk_discount": 1,
            "fk_store": 1
        },
        {
            "id_discount_store": 9,
            "fk_discount": 1,
            "fk_store": 2
        },
        {
            "id_discount_store": 2,
            "fk_discount": 2,
            "fk_store": 1
        },
        {
            "id_discount_store": 10,
            "fk_discount": 2,
            "fk_store": 2
        }
        // ... 
    ]
}
```
{% endinfo_block %}


3. **Create and add configuration for `spy_discount_voucher` table:**

`src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`
```json 
[
    // ...
    {
        "tableName": "spy_discount_voucher",
        "tableAlias": "discount-vouchers",
        "isActive": true,
        "definition": {
            "identifier": "id_discount_voucher",
            "isDeletable": false,
            "fields": [
                {
                    "fieldName": "id_discount_voucher",
                    "fieldVisibleName": "id_discount_voucher",
                    "type": "integer",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "fk_discount_voucher_pool",
                    "fieldVisibleName": "fk_discount_voucher_pool",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "code",
                    "fieldVisibleName": "code",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "is_active",
                    "fieldVisibleName": "is_active",
                    "type": "boolean",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "max_number_of_uses",
                    "fieldVisibleName": "max_number_of_uses",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "number_of_uses",
                    "fieldVisibleName": "number_of_uses",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "voucher_batch",
                    "fieldVisibleName": "voucher_batch",
                    "type": "integer",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "created_at",
                    "fieldVisibleName": "createdAt",
                    "type": "string",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "updated_at",
                    "fieldVisibleName": "updatedAt",
                    "type": "string",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                }
            ]
        }
    },
    // ...
]

```

{% info_block warningBox "Verification" %}
After adding the configuration to the file, you need to import the configuration into the database. 

```bash
GET /dynamic-entity/discount-vouchers HTTP/1.1
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
            "id_discount_voucher": 1,
            "fk_discount_voucher_pool": 1,
            "code": "sprykerhu9p",
            "is_active": true,
            "max_number_of_uses": 10,
            "number_of_uses": null,
            "voucher_batch": 1,
            "createdAt": "2024-07-17 12:13:15.000000",
            "updatedAt": "2024-07-17 12:13:15.000000"
        },
        {
            "id_discount_voucher": 2,
            "fk_discount_voucher_pool": 1,
            "code": "sprykerba4r",
            "is_active": true,
            "max_number_of_uses": 10,
            "number_of_uses": null,
            "voucher_batch": 1,
            "createdAt": "2024-07-17 12:13:15.000000",
            "updatedAt": "2024-07-17 12:13:15.000000"
        },
        {
            "id_discount_voucher": 3,
            "fk_discount_voucher_pool": 1,
            "code": "sprykerfe5r",
            "is_active": true,
            "max_number_of_uses": 10,
            "number_of_uses": null,
            "voucher_batch": 1,
            "createdAt": "2024-07-17 12:13:15.000000",
            "updatedAt": "2024-07-17 12:13:15.000000"
        },
        // ... 
    ]
}
```
{% endinfo_block %}


4. **Create and add configuration for `spy_discount_voucher_pool` table:**

`src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`
```json 
[
    // ...
    {
        "tableName": "spy_discount_voucher_pool",
        "tableAlias": "discount-voucher-pools",
        "isActive": true,
        "definition": {
            "identifier": "id_discount_voucher_pool",
            "isDeletable": false,
            "fields": [
                {
                    "fieldName": "id_discount_voucher_pool",
                    "fieldVisibleName": "id_discount_voucher_pool",
                    "type": "integer",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "is_active",
                    "fieldVisibleName": "is_active",
                    "type": "boolean",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "name",
                    "fieldVisibleName": "name",
                    "type": "string",
                    "isCreatable": true,
                    "isEditable": true,
                    "validation": {
                        "isRequired": true
                    }
                },
                {
                    "fieldName": "created_at",
                    "fieldVisibleName": "created_at",
                    "type": "string",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                },
                {
                    "fieldName": "updated_at",
                    "fieldVisibleName": "updated_at",
                    "type": "string",
                    "isCreatable": false,
                    "isEditable": false,
                    "validation": {
                        "isRequired": false
                    }
                }
            ]
        },
    // ...
]
```


{% info_block warningBox "Verification" %}
After adding the configuration to the file, you need to import the configuration into the database. 

```bash
GET /dynamic-entity/discount-voucher-pools HTTP/1.1
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
            "id_discount_voucher_pool": 1,
            "is_active": true,
            "name": "5% off white",
            "created_at": "2024-07-17 12:13:15.000000",
            "updated_at": "2024-07-17 12:13:15.000000"
        },
        {
            "id_discount_voucher_pool": 2,
            "is_active": true,
            "name": "10% off Intel Core",
            "created_at": "2024-07-17 12:13:15.000000",
            "updated_at": "2024-07-17 12:13:15.000000"
        },
        {
            "id_discount_voucher_pool": 3,
            "is_active": true,
            "name": "5% off white products",
            "created_at": "2024-07-17 12:13:15.000000",
            "updated_at": "2024-07-17 12:13:15.000000"
        },
        // ... 
    ]
}
```
{% endinfo_block %}


5. **Extend configuration with child relation**

Finally, need to define the relations between the tables and create a complex configuration.

Add `stores` to discount relation:

`src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`
```json 
    {
        "tableName": "spy_discount",
        "tableAlias": "discounts",
        "isActive": true,
        "definition": { ... } ,
        "childRelations": [
            {
                "name": "stores",
                "isEditable": true,
                "childDynamicEntityConfiguration": {
                    "tableAlias": "discount-stores"
                },
                "relationFieldMappings": [
                    {
                        "childFieldName": "fk_discount",
                        "parentFieldName": "id_discount"
                    }
                ]
            }
        ]
    },
```

{% info_block warningBox "Verification" %}
After adding the configuration to the file, you need to import the configuration into the database. 

```bash
GET /dynamic-entity/discounts?include=stores HTTP/1.1
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
            "id_discount": 1,
            "fk_discount_voucher_pool": null,
            "fk_store": null,
            "amount": 1000,
            "calculator_plugin": "PLUGIN_CALCULATOR_PERCENTAGE",
            "collector_query_string": "sku = \"*\"",
            "decision_rule_query_string": "( currency = 'CHF' AND sub-total >= '115' )  OR ( currency = 'EUR' AND sub-total >= '100' ) ",
            "description": "Get a 10% discount on all orders above 100 EUR or 115 CHF",
            "discount_key": "discount_1",
            "discount_type": "cart_rule",
            "display_name": "10% off minimum order",
            "is_active": true,
            "is_exclusive": false,
            "minimum_item_amount": 1,
            "priority": 5000,
            "valid_from": "2016-01-01 00:00:00.000000",
            "valid_to": "2037-12-31 00:00:00.000000",
            "created_at": "2024-07-17 12:13:15.000000",
            "updated_at": "2024-07-17 12:13:15.000000",
            "stores": [
                {
                    "id_discount_store": 1,
                    "fk_discount": 1,
                    "fk_store": 1
                },
                {
                    "id_discount_store": 9,
                    "fk_discount": 1,
                    "fk_store": 2
                }
            ]
        },
        // ... other discounts
    ]
}
```
{% endinfo_block %}

And next step to add child relation for `spy_voucher_pool`:  add `vouchers`, `discounts` relations. 

`src/Pyz/Zed/DynamicEntity/data/installer/configuration.json`
```json 
    {
        "tableName": "spy_discount_voucher_pool",
        "tableAlias": "discount-voucher-pools",
        "isActive": true,
        "definition": { ... } ,
        "childRelations": [
            {
                "name": "vouchers",
                "isEditable": true,
                "childDynamicEntityConfiguration": {
                    "tableAlias": "discount-vouchers"
                },
                "relationFieldMappings": [
                    {
                        "childFieldName": "fk_discount_voucher_pool",
                        "parentFieldName": "id_discount_voucher_pool"
                    }
                ]
            },
            {
                "name": "discounts",
                "isEditable": true,
                "childDynamicEntityConfiguration": {
                    "tableAlias": "discounts"
                },
                "relationFieldMappings": [
                    {
                        "childFieldName": "fk_discount_voucher_pool",
                        "parentFieldName": "id_discount_voucher_pool"
                    }
                ]
            }
        ]
    },
```

So, we have a basic configuration for importing discount vouchers (some fields can be removed or added depending on the project needs).

{% info_block infoBox %}
For the import of the configuration into the database, you need to clear the tables `spy_dynamic_entity_configuration`, `spy_dynamic_entity_configuration_relation`, and `spy_dynamic_entity_configuration_relation_field_mapping` and run the command:

```bash

vendor/bin/console setup:init-db

```
{% endinfo_block %}

After successful import of the configuration into the database, you can proceed to check the configuration. 


{% info_block warningBox "Verification" %}

For check the correctness, you can send a request to the Data Exchange API using the `GET` method and check the response. (data about vouchers should be present in the database)

```bash

GET /dynamic-entity/discount-voucher-pools?include=vouchers,discounts,discounts.stores HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}

```
As response, you should get data about discount vouchers and can use this data for export. 

```json 

{
    "data": [
        {
            "id_discount_voucher_pool": 1,
            "is_active": true,
            "name": "5% off white",
            "created_at": "2024-07-17 12:13:15.000000",
            "updated_at": "2024-07-17 12:13:15.000000",
            "vouchers": [
                {
                    "id_discount_voucher": 1,
                    "fk_discount_voucher_pool": 1,
                    "code": "sprykerhu9p",
                    "is_active": true,
                    "max_number_of_uses": 10,
                    "number_of_uses": null,
                    "voucher_batch": 1,
                    "createdAt": "2024-07-17 12:13:15.000000",
                    "updatedAt": "2024-07-17 12:13:15.000000"
                }
                // other vouchers
            ],
            "discounts": [
                {
                    "id_discount": 3,
                    "fk_discount_voucher_pool": 1,
                    "fk_store": null,
                    "amount": 500,
                    "calculator_plugin": "PLUGIN_CALCULATOR_PERCENTAGE",
                    "collector_query_string": "attribute.color = \"white\"",
                    "decision_rule_query_string": "sku = \"*\"",
                    "description": "Get a 5% discount on all white products with voucher code",
                    "discount_key": "discount_3",
                    "discount_type": "voucher",
                    "display_name": "5% off white",
                    "is_active": true,
                    "is_exclusive": false,
                    "minimum_item_amount": 1,
                    "priority": null,
                    "valid_from": "2016-01-01 09:00:00.000000",
                    "valid_to": "2037-12-31 11:59:00.000000",
                    "created_at": "2024-07-17 12:13:15.000000",
                    "updated_at": "2024-07-17 12:13:15.000000", 
                    "stores": [
                        {
                            "id_discount_store": 3,
                            "fk_discount": 3,
                            "fk_store": 1
                        },
                        {
                            "id_discount_store": 11,
                            "fk_discount": 3,
                            "fk_store": 2
                        }
                    ]
                }
            ]
        }
    ]
}

```
So we have a working configuration, we also need to check the data import. 

For import data, you can use the `POST` method and send data in JSON format to the newly created Data Exchange API endpoint.    

```bash

POST /dynamic-entity/discount-voucher-pools HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 174
{
    "data": [
        {
            "is_active": true,
            "name": "Some pool name",
            "vouchers": [
                {
                    "code": "SOMECODE1",
                    "is_active": true,
                    "max_number_of_uses": 1,
                    "number_of_uses": 0,
                    "voucher_batch": 0
                },
                {
                    "code": "SOMECODE2",
                    "is_active": true,
                    "max_number_of_uses": 1,
                    "number_of_uses": 0,
                    "voucher_batch": 0
                }
            ],
            "discounts": [
                {
                    "fk_store": null,
                    "amount": 0,
                    "calculator_plugin": "PLUGIN_CALCULATOR_FIXED",
                    "collector_query_string": "sku = '*'",
                    "decision_rule_query_string": "",
                    "description": "Some discount pool",
                    "discount_key": null,
                    "discount_type": "voucher",
                    "display_name": "Some discount pool",
                    "is_active": true,
                    "is_exclusive": false,
                    "minimum_item_amount": 1,
                    "priority": 9999,
                    "valid_from": "2022-02-24 00:00:00",
                    "valid_to": "2022-02-24 00:00:00",
                    "stores": [
                        {
                            "fk_store": 1
                        },
                        {
                            "fk_store": 2
                        }
                    ]
                }
            ]
        }
    ]
}
```
We should receive a response with the status code `201` and the corresponding data that was transmitted in the body of the request and entity id.

Response simple: 

```json 
{
    "data": [
        {
            "is_active": true,
            "name": "Some pool name",
            "id_discount_voucher_pool": 5,
            "created_at": "2024-07-25 16:51:53.168908",
            "updated_at": "2024-07-25 16:51:53.168908",
            "vouchers": [
                {
                    "code": "SOMECODE1",
                    "is_active": true,
                    "max_number_of_uses": 1,
                    "number_of_uses": 0,
                    "voucher_batch": 0,
                    "fk_discount_voucher_pool": 5,
                    "id_discount_voucher": 111,
                    "createdAt": "2024-07-25 16:51:53.169475",
                    "updatedAt": "2024-07-25 16:51:53.169475"
                },
                {
                    "code": "SOMECODE2",
                    "is_active": true,
                    "max_number_of_uses": 1,
                    "number_of_uses": 0,
                    "voucher_batch": 0,
                    "fk_discount_voucher_pool": 5,
                    "id_discount_voucher": 112,
                    "createdAt": "2024-07-25 16:51:53.170560",
                    "updatedAt": "2024-07-25 16:51:53.170560"
                }
            ],
            "discounts": [
                {
                    "amount": 0,
                    "calculator_plugin": "PLUGIN_CALCULATOR_FIXED",
                    "collector_query_string": "sku = '*'",
                    "decision_rule_query_string": "",
                    "description": "Some discount pool",
                    "discount_type": "voucher",
                    "display_name": "Some discount pool",
                    "is_active": true,
                    "is_exclusive": false,
                    "minimum_item_amount": 1,
                    "priority": 9999,
                    "valid_from": "2022-02-24 00:00:00",
                    "valid_to": "2022-02-24 00:00:00",
                    "fk_discount_voucher_pool": 5,
                    "id_discount": 17,
                    "fk_store": null,
                    "discount_key": null,
                    "created_at": "2024-07-25 16:51:53.171091",
                    "updated_at": "2024-07-25 16:51:53.171091",
                    "stores": [
                        {
                            "fk_store": 1,
                            "fk_discount": 17,
                            "id_discount_store": 17
                        },
                        {
                            "fk_store": 2,
                            "fk_discount": 17,
                            "id_discount_store": 18
                        }
                    ]
                }
            ]
        }
    ]
}
```
So, we have successfully imported data into the Data Exchange API and can use this data for further work.

{% endinfo_block %}



## Troubleshooting with data import via Data Exchange API

### Allow access to disallowed tables

{% info_block warningBox %}

Remember that opening disallowed tables can affect the security of your project!

{% endinfo_block %}


In some cases, you may need to allow access to disallowed tables. To do this, override the `getDefaultDisallowedTables` method in the `DisallowedTablesReader` class in your project.

Example of possible implementation of the `getDefaultDisallowedTables` method in the `DisallowedTablesReader` class:

`src/Pyz/Zed/DynamicEntity/Business/Reader/DisallowedTablesReader.php` 
```php
<?php

namespace Pyz\Zed\DynamicEntity\Business\Reader;

use Spryker\Zed\DynamicEntity\Business\Reader\DisallowedTablesReader as SprykerDisallowedTablesReader;

class DisallowedTablesReader extends SprykerDisallowedTablesReader
{
    /**
     * @return array<string>
     */
    protected function getDefaultDisallowedTables(): array
    {
        return array_diff(parent::getDefaultDisallowedTables(), $this->getForceEnableTables());
    }

    /**
     * @return array<string>
     */
    protected function getForceEnableTables(): array
    {
        return [
            // list of tables that should be enabled
            'pyz_table_name',
            'spy_table_name',
        ];
    }
}

```

`src/Pyz/Zed/DynamicEntity/Business/Reader/DisallowedTablesReader.php` 
```php
<?php

namespace Pyz\Zed\DynamicEntity\Business;

use Pyz\Zed\DynamicEntity\Business\Reader\DisallowedTablesReader;
use Spryker\Zed\DynamicEntity\Business\DynamicEntityBusinessFactory as SprykerDynamicEntityBusinessFactory;
use Spryker\Zed\DynamicEntity\Business\Reader\DisallowedTablesReaderInterface;

/**
 * @method \Pyz\Zed\DynamicEntity\DynamicEntityConfig getConfig()
 * @method \Spryker\Zed\DynamicEntity\Persistence\DynamicEntityEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\DynamicEntity\Persistence\DynamicEntityRepositoryInterface getRepository()
 */
class DynamicEntityBusinessFactory extends SprykerDynamicEntityBusinessFactory
{
    /**
     * @return \Spryker\Zed\DynamicEntity\Business\Reader\DisallowedTablesReaderInterface
     */
    public function createDisallowedTablesReader(): DisallowedTablesReaderInterface
    {
        return new DisallowedTablesReader(
            $this->getConfig(),
        );
    }
}

```


### Adding constraint validators to Data Exchange API

In the process of importing or exporting data, it may be necessary to add validators to check the data. Let's consider an example of adding a validator to check input data.
Example of creating a validator to check data:


`src/Pyz/Zed/DynamicEntity/Business/Validator/Field/Completeness/Constraint/DataConstraint.php`
```php
<?php

namespace Pyz\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint;

use Generated\Shared\Transfer\DynamicEntityFieldDefinitionTransfer;
use Generated\Shared\Transfer\DynamicEntityTransfer;
use Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface;

class DataConstraint implements ConstraintInterface
{
    /**
     * @var string
     */
    protected const APPLICABLE_FIELD_NAME = 'field_name';

    /**
     * @var string
     */
    protected const GLOSSARY_KEY_INVALID_KEY = 'dynamic_entity.validation.invalid_key';

    /**
     * @param string $constraintName
     *
     * @return bool
     */
    public function isApplicable(string $constraintName): bool
    {
        return $constraintName === static::APPLICABLE_FIELD_NAME;
    }

    /**
     * @param \Generated\Shared\Transfer\DynamicEntityTransfer $dynamicEntityTransfer
     * @param \Generated\Shared\Transfer\DynamicEntityFieldDefinitionTransfer $fieldDefinitionTransfer
     *
     * @return bool
     */
    public function isValid(DynamicEntityTransfer $dynamicEntityTransfer, DynamicEntityFieldDefinitionTransfer $fieldDefinitionTransfer): bool
    {
        // Add your validation logic here...

        return true;
    }

    /**
     * @return string
     */
    public function getErrorMessage(): string
    {
        return static::GLOSSARY_KEY_INVALID_KEY;
    }
}

```

`src/Pyz/Zed/DynamicEntity/Business/DynamicEntityBusinessFactory.php`
```php
<?php

namespace Pyz\Zed\DynamicEntity\Business;

use Pyz\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\DataConstraint;
use Spryker\Zed\DynamicEntity\Business\DynamicEntityBusinessFactory as SprykerDynamicEntityBusinessFactory;
use Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface;

class DynamicEntityBusinessFactory extends SprykerDynamicEntityBusinessFactory
{
    /**
     * @return array<\Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface>
     */
    public function getFieldsValidationConstraints(): array
    {
        return parent::getFieldsValidationConstraints() + [
            $this->createDataContraint(),
        ];
    }

    /**
     * @return \Spryker\Zed\DynamicEntity\Business\Validator\Field\Completeness\Constraint\ConstraintInterface
     */
    public function createDataContraint(): ConstraintInterface
    {
        return new DataConstraint();
    }
}
```

### Adding post-plugins to Data Exchange API

In some cases, it is necessary to call facade methods or perform some manipulations after data import. To do this, you can add post-plugins to the Data Exchange API. To do this, you need to implement the interface `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface` or `Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostUpdatePluginInterface` and add it to the configuration. You can see more details in already existing plugins, please check documentation [Install the Data Exchange API + Category Management feature](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api-category-management-feature.html) or [Install the Data Exchange API + Inventory Management feature](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api-inventory-management-feature.html).
