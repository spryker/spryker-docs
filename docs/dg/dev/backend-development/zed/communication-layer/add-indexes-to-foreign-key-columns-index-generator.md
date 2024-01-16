---
title: Addi indexes to foreign key columns - index generator
description: The index generator module adds the missing indexes for foreign key columns in Postgres.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/postgres-index-generator
originalArticleId: 1eab644c-12b6-40c1-a69e-57614c314b52
redirect_from:
  - /docs/scos/dev/back-end-development/zed/communication-layer/add-indexes-to-foreign-key-columns-index-generator.html
  - /docs/scos/dev/back-end-development/zed/communication-layer/adding-indexes-to-foreign-key-columns-index-generator.html
related:
  - title: About Communication layer
    link: docs/scos/dev/back-end-development/zed/communication-layer/communication-layer.html
---

Postgres doesn't automatically add indexes to foreign key columns. This can lead to performance issues with the database. In MySQL and MariaDB, you get the indexes for foreign key columns automatically. Most likely, with Postgres, no one adds indexes for the foreign key columns manually.

For an almost automated way of adding the (missing) indexes for the foreign key columns in Postgres, we added a new index generator module.


To get indexes for the foreign key columns, follow these steps:

1. Install the `IndexGenerator` module.
2. In your project's namespace, add the console commands to the `ConsoleDependencyProvider` class.
   * `Spryker\Zed\IndexGenerator\Communication\Console\PostgresIndexGeneratorConsole`
   * `Spryker\Zed\IndexGenerator\Communication\Console\PostgresIndexRemoverConsole`
3. Copy and merge all schema files from the core and the project:
```bash
console propel:schema:copy
```

4. Generate new schema files with the missing indexes:
```bash
console propel:postgres-indexes:generate
```

5. In `src/{PROJECT-NAMESPACE}/Zed/IndexGenerator/Persistence/Propel/Schema/*`,check the generated schema files.
6. Merge the generated index schema files:
```bash
console propel:schema:copy
```

Once the Propel setup is done, you get the indexes for all the foreign key columns where they are missing.
