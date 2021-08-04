---
title: Adding indexes to foreign key columns- index generator
originalLink: https://documentation.spryker.com/2021080/docs/postgres-index-generator
redirect_from:
  - /2021080/docs/postgres-index-generator
  - /2021080/docs/en/postgres-index-generator
---

Postgres doesn't automatically add indexes to foreign key columns. This can lead to performance issues with the database. In MySQL and MariaDB, you get the indexes for foreign key columns without automatically. Most likely, with Postgres, no one adds indexes for the foreign key columns manually.

For an almost automated way of adding the (missing) indexes for the foreign key columns in Postgres, we added a new index generator module.


To get indexes for the foreign key columns:


1. Install the IndexGenerator module.
2. Add the console commands to the `ConsoleDependencyProvider` class in the Projects namespace:
  * `Spryker\Zed\IndexGenerator\Communication\Console\PostgresIndexGeneratorConsole`
  * `Spryker\Zed\IndexGenerator\Communication\Console\PostgresIndexRemoverConsole`
3. Copy and merge all schema files from the core and the project:
```bash
console propel:schema:copy
```
4 Generate new schema files with the missing indexes:
```bash
console propel:postgres-indexes:generate
```
5. Check the generated schema files in `src/{PROJECT-NAMESPACE}/Zed/IndexGenerator/Persistence/Propel/Schema/*`.
6. Merge the generated index schema files:
```bash
console propel:schema:copy
```

Once the Propel setup is done, you get the indexes for all the foreign key columns where they are missing.

 

