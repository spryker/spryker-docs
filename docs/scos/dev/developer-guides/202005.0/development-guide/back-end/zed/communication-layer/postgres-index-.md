---
title: Adding Indexes to Foreign Key Columns- Index Generator
originalLink: https://documentation.spryker.com/v5/docs/postgres-index-generator
redirect_from:
  - /v5/docs/postgres-index-generator
  - /v5/docs/en/postgres-index-generator
---

Postgres doesn't automatically add indexes to foreign key columns. This can lead to performance issues with the database. In MySQL, you will get the indexes for the foreign key columns without the need to do something. Most likely no one adds indexes for the foreign key columns manually when they use Postgres.

For an almost automated way of adding the (missing) indexes for the foreign key columns, in Postgres, we added a new index generator module which does add them.

To get indexes for the foreign key columns, you need to:

* Install the IndexGenerator module
* Add these console commands to the ConsoleDependencyProvider class in the Projects namespace:
  * `Spryker\Zed\IndexGenerator\Communication\Console\PostgresIndexGeneratorConsole`
  * `Spryker\Zed\IndexGenerator\Communication\Console\PostgresIndexRemoverConsole`
* Run `console propel:schema:copy` to copy and merge all schema files from the core and the project
* Run `console propel:postgres-indexes:generate` to generate new schema files with the missing indexes.
* Check the generated schema files in `src/{PROJECT-NAMESPACE}/Zed/IndexGenerator/Persistence/Propel/Schema/*`
* Run `console propel:schema:copy` again to merge the generated index schema files

When the Propel setup is done, you will get the indexes for all the foreign key columns where they are missing.

 
<!-- Last review date: Oct 17, 2018 by René Klatt, Dmitry Beirak  -->
