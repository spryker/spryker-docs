---
title: Extend the database schema
description: Expand Spryker's database schema with ease. Follow step-by-step guidance on schema files, database migration, and compatibility for your custom needs.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-extend-db-schema
originalArticleId: 724041dd-a274-4835-8ef1-085fb4c686f9
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/extending-the-database-schema.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/extend-the-database-schema.html
related:
  - title: Create, use, and extend the transfer objects
    link: docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html
---

This document shows how to extend the database schema.

Fields can be added to the existing database tables, but they cannot be removed (removing fields from the tables could break the functionalities implemented in Spryker Core).

{% info_block infoBox "Info" %}

In addition, you can create a new database table:

```bash
console spryk:run AddZedPersistencePropelSchema
```

{% endinfo_block %}

As an example, let's add a description field to the `spy_price_type` table. The structure of this table is defined in the `PriceProduct` module, in the `spy_price_product.schema.xml` file as follows:

```xml
    ...
    <table name="spy_price_type">
        <column name="id_price_type" type="INTEGER" required="true" primaryKey="true" autoIncrement="true"/>
        <column name="name" type="VARCHAR" size="255" required="true"/>
        <column name="price_mode_configuration" type="ENUM" valueSet="NET_MODE, GROSS_MODE, BOTH"/>

        <unique name="spy_price_type-name">
            <unique-column name="name"/>
        </unique>

        <id-method-parameter value="spy_price_type_pk_seq"/>
    </table>
    ...
```

To add a column to this table, follow these steps:

1. On the project side, if it hasn't been created yet, add a corresponding XML file ( follow the same folder structure and give it the same name)

```bash
mkdir -p src/Pyz/Zed/PriceProduct/Persistence/Propel/Schema
touch src/Pyz/Zed/PriceProduct/Persistence/Propel/Schema/spy_price_product.schema.xml

```

2. Add the additional fields to the table definition:

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
    xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
    namespace="Orm\Zed\Price\Persistence"
    package="src.Orm.Zed.Price.Persistence">

    <table name="spy_price_type">
        <column name="description" type="VARCHAR" size="255" required="false"/>
    </table>

</database>
```

1. Update the database:

```bash
vendor/bin/console propel:install
```

## Troubleshooting

If you stumble upon an exception *Uncommitted migrations have been found*, either execute or delete them before rerunning the `diff` task:

```bash
vendor/bin/console propel:migration:delete
```
