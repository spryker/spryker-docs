---
title: Database Schema Definition
originalLink: https://documentation.spryker.com/v2/docs/database-schema-definition
redirect_from:
  - /v2/docs/database-schema-definition
  - /v2/docs/en/database-schema-definition
---

With Propel, a database schema is defined in an XML file. Each module carries has its own part of the big schema that is collected and merged.

Propel’s documentation on defining the database schema: [Database schema](http://propelorm.org/documentation/reference/schema.html)

## Example Schema XML File

This file can be copied into your module into `(module)/Persistence/Propel/Schema/`. Don’t forget to adopt it to your needs.

```php
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

**XML File Prefix** 
The name of the XML file that contains DB schema definition must be prefixed with the `spy_` string for the core level development and `pyz_` for new tables on a project level.

### Composed Names

When you need to use a composed name for a field, you define it in your table. For this, use small cases and separate the words using underscores.

For example: `category_image_name`

------

## Migrations

To apply a change in the database schema, run a command line call:

```php
vendor/bin/console propel:install
```

The schema migration is a part of the setup:install call.

The workflow can be described like this:

* Collect the schema-xml files from all bundles
* Merge schemas and copy them into one directory ( `src/Generated/Propel/DE/Schema` )
* Generation of entities and query objects
* Diff of new and existing schema
* Run migration

------

## Schema File Merge

Sometimes it is useful to add columns to a table which belongs to another module. Possible use cases are as follows:

* A core module wants to inject a foreign key into a table from another core module. This happens when the dependency direction is in contrast to the direction of the relation.
* A project module wants to add a column to a table from a core module.

When you add a column to a core table, this column must not be mandatory, because in this case the core classes, not knowing the mandatory fields, become unusable and, thus, have to be overwritten, which increases the difficulty to update. In most cases you can and should avoid adding a column to a core table. This can cause compatibility problems in the future. 

What happens, when the next release adds a column with the same name but another meaning? To avoid this problem, it is a good practice to add a new table and use a one-to-one relationship.

### Merge Workflow

The merging works like this:

1. Find all schema xml files from core and project level.
2. Group them by filename.
3. Check number of files per filename.

* If one filename has one path: copy to `src/Orm/Propel/DE/Schema`.
* If one filename has more than one path: merge them:
  * Check if the database attributes name, package, and namespace are consistent, otherwise throw an exception.
  * Merge xml by the name attribute on all levels.
  * Copy the merged xml to `src/Orm/Propel/DE/Schema`

### Merge Example

`src/Spryker/Zed/Customer/Persistence/Propel/Schema/spy_customer.schema.xml`

```php
<table name="spy_customer" idMethod="native">
    <column name="first_name" size="100" type="VARCHAR" />
</table>
```

`YourProject/Zed/Acl/Persistence/Propel/Schema/spy_customer.schema.xml`

```php
<table name="spy_customer">
    <column name="last_name" size="100" type="VARCHAR" />
</table>
```

Merged file :

```php
<table name="spy_customer" idMethod="native">
    <column name="first_name" size="100" type="VARCHAR" />
    <column name="last_name" size="100" type="VARCHAR" />
</table>
```

**Change attribute values** 
It is possible to change the value of an attribute, for example, `type="VARCHAR"` to `type="LONGVARCHAR"` or `size="100"` to `size="200"`. Be aware that this can have strong side effects and should be avoided when possible.

### Schema Validation

To avoid accidental change of attribute values, run `vendor/bin/console propel:schema:validate` after you added the `PropelSchemaValidatorConsole` class to your `ConsoleDependencyProvider`. This will show you when a merge of your schema files would lead to a change of an attribute value.

To give you more control about the validation of the attribute values, we added a whitelist, so you can run the validator also when you have changed an attribute value on purpose. See `PropelConfig::getWhitelistForAllowedAttributeValueChanges()` for more details.

### Case Insensitive Fields

MySQL provides case insensitive text type and this paragraph is mostly related to PostgreSql. But you still could have some benefits from using case insensitive text fields (for example, handling lower/upper case comparison on DB side).

Sometimes a table requires a case insensitive field. A good example is the `email` field. A customer should not be able to register twice with the same email but different character case.

To enable this option, just set a column attribute `caseInsensitive` with `true` in a schema XML file of a target table.

## Related Spryks

You might use the following definitions to generate related code:

* `vendor/bin/console spryk:run AddZedPersistencePropelSchema` - Add Zed Persistence Propel Schema
* `vendor/bin/console spryk:run AddZedPersistencePropelSchemaTable` - Add Zed Persistence Propel Schema Table

See the [Spryk](https://documentation.spryker.com/v2/docs/spryk-201903) documentation for details.
