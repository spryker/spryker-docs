---
title: Database schema definition
description: With Propel, a database schema is defined in an XML file. Each module carries it s own part of the big schema that is collected and merged.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/database-schema-definition
originalArticleId: 49d1d709-2b32-486f-888f-484f0ad72319
redirect_from:
  - /docs/scos/dev/back-end-development/zed/persistence-layer/database-schema-definition.html
related:
  - title: Database overview
    link: docs/dg/dev/backend-development/zed/persistence-layer/database-overview.html
  - title: Entity
    link: docs/dg/dev/backend-development/zed/persistence-layer/entity.html
  - title: Entity manager
    link: docs/dg/dev/backend-development/zed/persistence-layer/entity-manager.html
  - title: About the query container
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-container/query-container.html
  - title: Query objects - creation and usage
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-objects-creation-and-usage.html
  - title: Repository
    link: docs/dg/dev/backend-development/zed/persistence-layer/repository.html
---

With Propel, a [database schema](http://propelorm.org/documentation/reference/schema.html) is defined in an XML file. Each module has its own part of the big schema that is collected and merged.
This document describes the database schema file and how to use it in your project.

## Example schema XML file

This file can be copied into your module to `(module)/Persistence/Propel/Schema/`. Make sure to adapt the file to your needs.

```xml
<?xml version="1.0"?>
<database name="zed"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
    namespace="Orm\Zed\Customer\Persistence"
    package="src.Orm.Zed.Customer.Persistence">

    <table name="spy_customer" idMethod="native">
        <column name="id_customer" required="true" type="INTEGER" autoIncrement="true" primaryKey="true" />
        <column name="email" required="true" size="255" type="VARCHAR" />
        <column name="first_name" size="100" type="VARCHAR" />
        <column name="last_name" size="100" type="VARCHAR" />
        <unique>
            <unique-column name="email" />
        </unique>
    </table>
</database>
```

{% info_block infoBox "XML file prefix " %}

The name of the XML file that contains the DB schema definition must be prefixed with the `spy_` string for the core level development and `pyz_` for new tables on the project level.

{% endinfo_block %}

### Composed names

When you need to use a composed name for a field, you define it in your table. For this, use small cases and separate the words using underscores—for example, `category_image_name`.

## Migrations

To apply a change in the DB schema, run the following command:

```php
vendor/bin/console propel:install
```

The schema migration is a part of the `setup:install` call.

The workflow can be described like this:

* Collect the schema XML files from all bundles.
* Merge schemas and copy them into one directory ( `src/Generated/Propel/DE/Schema` ).
* Generation of entities and query objects.
* Diff of the new and the existing schema.
* Run migration.

## Schema file merge

Sometimes it's useful to add columns to a table that belongs to another module. Possible use cases are:

* A core module wants to inject a foreign key into a table from another core module. This happens when the dependency direction is in contrast to the direction of the relation.
* A project module wants to add a column to a table from a core module.

When you add a column to a core table, this column must not be mandatory. Otherwise, the core classes, not knowing the mandatory fields, become unusable and, thus, have to be overwritten. This makes updating more difficult. In most cases, you need to avoid adding a column to a core table, as it can cause compatibility problems in the future.

What happens when the next release adds a column with the same name but another meaning? To avoid this problem, it's a good practice to add a new table and use a one-to-one relationship.

### Merge workflow

Merging works like this:

1. Find all schema XML files from the core and project levels.
2. Group them by filename.
3. Check the number of files per filename.

{% info_block infoBox "Changing attribute values" %}

Note the following:
* If one filename has one path: copy it to `src/Orm/Propel/DE/Schema`.
* If one filename has more than one path: merge them.
* Check if the database attributes name, package, and namespace are consistent; otherwise, throw an exception.
* Merge XML by the name attribute on all levels.
* Copy the merged XML to `src/Orm/Propel/DE/Schema`.

{% endinfo_block %}

### Merge example

`src/Spryker/Zed/Customer/Persistence/Propel/Schema/spy_customer.schema.xml`

```xml
<table name="spy_customer" idMethod="native">
    <column name="first_name" size="100" type="VARCHAR" />
</table>
```

`YourProject/Zed/Acl/Persistence/Propel/Schema/spy_customer.schema.xml`

```xml
<table name="spy_customer">
    <column name="last_name" size="100" type="VARCHAR" />
</table>
```

Merged file:

```xml
<table name="spy_customer" idMethod="native">
    <column name="first_name" size="100" type="VARCHAR" />
    <column name="last_name" size="100" type="VARCHAR" />
</table>
```

{% info_block infoBox "Changing attribute values" %}

You can change the attribute value—for example, `type="VARCHAR"` to `type="LONGVARCHAR"` or `size="100"` to `size="200"`. Keep in mind that this can have strong side effects and must be avoided when possible.

{% endinfo_block %}

### Schema validation

To avoid accidental change of attribute values, run `vendor/bin/console propel:schema:validate` after you added the `PropelSchemaValidatorConsole` class to your `ConsoleDependencyProvider`. This shows you when a merge of your schema files changes the attribute value.

To give you more control over the validation of the attribute values, we have added a whitelist to run the validator also when you have changed an attribute value on purpose. For details, see `PropelConfig::getWhitelistForAllowedAttributeValueChanges()`.

### Case insensitive fields

MySQL provides a case-insensitive text type, and this is mostly related to PostgreSQL. But you still can have some benefits from using case-insensitive text fields—for example, handling lower or upper case comparison on the DB side.

Sometimes, a table requires a case-insensitive field. A good example is the `email` field. A customer must not be able to register twice with the same email but with a different character case.

To enable this option, for the column attribute, set `caseInsensitive` with `true` in a schema XML file of a target table.

### Data migrations

If your DB changes, include any operations with data that already exist. Spryker persistence provides functionality to execute any custom business logic that can be written in PHP while applying a migration.

To leverage this mechanism, you can create a migration file—for example, `PropelMigration_1622797441.php` for the migration folder. At the end of the file name, use a timestamp that is older than the previous migration file's timestamp. You can add any business logic that impacts your data to this file for execution.

This migration is applied only once and is registered in the `propel_migration table`.

## Migrate to specific version

{% info_block warningBox "Warning" %}

Functionality is available only with versions later than `202212.0`.

{% endinfo_block %}

Spryker allows migration to a specific version by using the `migrate-to-version` option with the `propel:migrate` command. The option defines the version to migrate the database to and expects value that can be taken from the `version` column in the `propel_migration` table.

For example:

```bash
vendor/bin/console propel:migrate --migrate-to-version=1622797441
```

Depending on the current database version, the command either migrates or rolls back to the given version.

To check the current version, use the `propel:migration:check` command with the `last-version` option. The option lets you receive the version of the last executed migration.

```bash
vendor/bin/console propel:migration:check --last-version
```

## Related Spryks

You can use the following definitions to generate related code:
* `vendor/bin/console spryk:run AddZedPersistencePropelSchema`: Add Zed Persistence Propel Schema
* `vendor/bin/console spryk:run AddZedPersistencePropelSchemaTable`: Add Zed Persistence Propel Schema Table

For details, see [Spryks](/docs/dg/dev/sdks/sdk/spryks/spryks.html).
