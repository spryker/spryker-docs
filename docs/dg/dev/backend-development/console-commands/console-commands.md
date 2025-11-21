---
title: Console commands
description: The list of console commands contains the command names together with a short description of what the command does.
last_updated: Aug 31, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/console
originalArticleId: d4062a3e-5dac-4905-afc7-105978e27432
redirect_from:
  - /docs/scos/dev/back-end-development/console-commands/console-commands.html
  - /docs/scos/dev/back-end-development/202108.0/console-commandsconsole-commands-in-spryker.html
  - /docs/scos/dev/back-end-development/202204.0/console-commandsconsole-commands-in-spryker.html
related:
  - title: Get the list of console commands and available options
    link: docs/scos/dev/back-end-development/console-commands/getting-the-list-of-console-commands-and-available-options.html
  - title: Implement a new console command
    link: docs/scos/dev/back-end-development/console-commands/implementing-a-new-console-command.html
  - title: Multi process run console
    link: docs/dg/dev/backend-development/cronjobs/multi-process-run-console.html
---

The [list of console commands](/docs/dg/dev/backend-development/console-commands/get-the-list-of-console-commands-and-available-options.html) contains the command names together with a short description of what the command does. The most important commands in Spryker can be split into four categories: collector commands, order management system commands, setup commands, and frontend-related commands. This document provides details about each of the commands.

## Collector commands

Collector commands are responsible for exporting the data in the SQL database to the frontend data storages (key-value store (Redis or Valkey) and Elasticsearch):

- `collector:search:export`—exports data to the Elasticsearch storage.
- `collector:search:update`—updates the data in the Elasticsearch storage.
- `collector:storage:export`—exports data to key-value storage (Redis or Valkey).

## Order Management System commands

Check whether conditions are satisfied for the orders that are in the state that is the source state for the transition that has a condition attached.

```bash
console oms:check-condition
```

Options:

- `-s`, `--store=store`—filters by the given store.
- `-l`, `--limit=limit`—limits the number of orders.

Examples:

```bash
console oms:check-condition -s DE
console oms:check-condition --limit=100 --store=DE
```

---
Check whether the timeout was reached for the orders that are in the state that is the source state for the transition that has a timeout attached.

```bash
console oms:check-timeout
```

Options:

- `-s`, `--store=store`—filter by the given store
- `-l`, `--limit=limit`—limit the number of orders

Examples:

```bash
console oms:check-timeout --store=DE --limit=100
console oms:check-timeout -l 100
```

## Installation setup commands

- The following command runs a set of commands necessary for installing or updating the application.

```bash
setup:install
```

  The following steps are performed when running this command:

  1. Delete all cache files for all stores:

  ```bash
  cache:delete-all
  ```

  2. Remove the directory that contains the generated files, such as transfer classes, merged database schema XML files, or autocompletion classes:

  ```bash
  setup:remove-generated-directory
  ```

  3. Create or migrate the database:

  ```bash
  setup:propel
  ```

  4. Generate transfer classes for each of the objects defined in the XML transfer files:

  ```bash
  transfer:generate
  ```

  5. Initialize the database with required data:

  ```bash
  setup:init-db
  ```

  6. Generate IDE auto-completion files to activate navigation to referenced classes. Generated auto-completion classes can be found for each application under the generated folder.

```bash
dev:ide:generate-auto-completion
```

  7. Build the project resources for Yves and Zed.
  8. Build the navigation tree.

  ```bash
  application:build-navigation-tree
  ```

  {% info_block infoBox %}

  Each of the commands contained in the previous steps can also be executed individually.

  {% endinfo_block %}

- Insert demo data into the database for testing reasons.

```bash
setup:install:demo-data
```

- Setup propel command runs a set of commands, necessary for creating or migrating the database.

```bash
setup:propel
```

  The following steps are performed when running this command:

  1. Write propel configuration:

  ```bash
  setup:propel:config:convert
  ```

  2. Create the database if it doesn't exist yet, based on the configuration set in the previous step:

  ```bash
  setup:propel:database:create
  ```

  3. Ensure compatibility with PostgreSQL, if necessary, by adjusting the Propel XML schema files:

  ```bash
  setup:propel:pg-sql-compat
  ```

  4. Copy schema files from Spryker and project packages to the generated folder:

  ```bash
  setup:propel:schema:copy
  ```

  5. Build Propel classes based on the XML schema files:

  ```bash
  setup:propel:model:build
  ```

  6. Compare the propel models with the database tables and generate the diff to prepare for migration:

  ```bash
  setup:propel:diff
  ```

  7. Migrate the database: update the database so that's in sync with the propel models in the project:

  ```bash
  setup:propel:migrate
  ```

## Jenkins setup commands

Cron jobs are scheduled by using Jenkins. For setting up Jenkins, the following console commands can be used from the command line:

- Start the Jenkins service:

```bash
scheduler:resume
```

- Shut down the Jenkins service:

```bash
scheduler:suspend
```

- Set up the cron jobs based on the definitions contained in the configuration file (the config file for jobs is placed in `/config/Zed/cronjobs/jobs.php`):

```bash
scheduler:setup
```

- Clean Jenkins jobs:

```bash
scheduler:clean
```

{% info_block infoBox "Git Commands" %}

Git commands are activated through console commands and they affect the Spryker packages.

{% endinfo_block %}

## Frontend-related commands

Depending on your environment and needs, there is a number of commands you can run. The following table provides an overview of such commands.

{% info_block infoBox %}

To use the npm commands, download and install [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). The minimum version for Node.js is *18.x* and for npm it's *9.x*. Then, you can use the appropriate commands listed in the table.

{% endinfo_block %}

| ENVIRONMENT          | COMMAND DESCRIPTION                                                                                                                                          | LOCAL COMMAND               | DOCKER CLI COMMAND                                   |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|------------------------------------------------------|
| Project/Core         |                                                                                                                                                              |                             |                                                      |
|                      | Removes all content from the cache directories.                                                                                                              |                             | console cache:empty-all                              |
|                      | Executes importers (full-import).                                                                                                                            |                             | console data:import                                  |
|                      | Imports all text translations for both core and project level.                                                                                               |                             | console data:import:glossary                         |
|                      | Generates transfer objects from transfer XML definition files.                                                                                               |                             | console transfer:generate                            |
|                      | Generates a cache file for twig templates.                                                                                                                   |                             | console twig:cache:warmer                            |
| Yves                 | Installs dependencies from the project level.                                                                                                                | npm install                 | console frontend:project:install-dependencies        |
|                      | Builds both core and project scripts, styles, fonts, and images to the `public/Yves/assets` folder.                                                          | npm run yves                | console frontend:yves:build                          |
|                      | Runs a build command every time either core or project scripts or style files change during the development.                                                 | npm run yves:watch          |                                                      |
|                      | Runs a production build which compresses and minifies both core and project scripts, styles, fonts, and images to the `public/Yves/assets` folder.           | npm run yves:production     | console frontend:yves:build --environment production |
|                      | Precompiles Twig templates on Yves to improve performance by avoiding on-the-fly compilation during the first page load.                                     |                             | vendor/bin/yves twig:template:warmer                 |
| Zed                  | Installs dependencies. Installs and packages all modules from `vendor/spryker` for the split version and `vendor/spryker/spryker` for the non-split version. |                             | console frontend:project:install-dependencies        |
|                      | Builds Zed scripts, styles, fonts, and images to the `public/Zed/assets` folder.                                                                             | npm run zed                 | console frontend:zed:build                           |
|                      | Runs a build command every time when Zed scripts or style files change during development.                                                                   | npm run zed:watch           |                                                      |
|                      | Runs a production build which compresses and minifies Zed scripts, styles, fonts, and images to the `public/Zed/assets` folder.                              | npm run zed:production      | console frontend:zed:build --environment production  |
|                      | Precompiles Twig templates on Zed to improve performance by avoiding on-the-fly compilation during the first page load.                                      |                             | console twig:template:warmer                         |
| Merchant Portal      | Installs dependencies. Installs and packages all modules from `vendor/spryker` for the split version and `vendor/spryker/spryker` for the nonsplit version.  |                             | console frontend:project:install-dependencies        |
|                      | Builds Merchant Portal scripts, styles, fonts, and images to the `public/MerchantPortal/assets` folder.                                                      | npm run mp:build            | console frontend:mp:build                            |
|                      | Runs a build command every time when Merchant Portal scripts or style files change during the development.                                                   | npm run mp:build:watch      |                                                      |
|                      | Runs a production build which compresses and minifies Merchant Portal scripts, styles, fonts, and images to the `public/MerchantPortal/assets` folder.       | npm run mp:build:production | console frontend:mp:build --environment production   |
| Legacy Demoshop Yves | Installs dependencies (from the project level).                                                                                                              | npm install                 | console frontend:project:install-dependencies        |
|                      | Builds both core and project scripts, styles, fonts, and images to the `public/Yves/assets/default` folder.                                                  | npm run yves                | console frontend:yves:build                          |
|                      | Runs a build command every time either core or project scripts or style files change during the development.                                                 | npm run yves:dev            |                                                      |
|                      | Runs a production build which compresses and minifies both core and project scripts, styles, fonts, and images to the `public/Yves/assets/default` folder.   | npm run yves:prod           | console frontend:yves:build --environment production |
| Legacy Demoshop Zed  | Installs and packages all modules from `vendor/spryker` for the split version and `vendor/spryker/spryker` for the non-split version.                        |                             | console frontend:project:install-dependencies        |
|                      | Builds Zed scripts, styles, fonts, and images to the `public/Zed/assets` folder.                                                                             | npm run zed                 | console frontend:zed:build                           |
|                      | Runs a build command every time Zed scripts or styles files change during development.                                                                       | npm run zed:dev             |                                                      |
|                      | Runs a production build that compresses and minifies Zed scripts, styles, fonts, and images to the `public/Zed/assets` folder.                               | npm run zed:prod            |                                                      |
