---
title: Console Commands in Spryker
originalLink: https://documentation.spryker.com/v3/docs/console
redirect_from:
  - /v3/docs/console
  - /v3/docs/en/console
---

The [list of console commands](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/console-commands/getting-the-lis) contains the command names together with a short description of what the command does. The most important commands in Spryker can be split into 3 categories : collector commands, order managemenet system commands and setup commands. This article provides details on each of the commands.

### Collector Commands

Collector commands are responsible of exporting the data in the SQL database to the front-end data storages (Redis and Elasticsearch)

* `collector:search:export` - exports data to the Elasticsearch storage
* `collector:search:update` - updates the data in the Elasticsearch storage
* `collector:storage:export` - exports data to Key-Value storage (Redis)

### Order Management System Commands

* `oms:check-condition` - check if conditions are satisfied for orders that are in a state that is the source state for a transition that has a condition attached
* `oms:check-timeout` - check if timeout was reached for orders that are in a state that is the source state for a transition that has a timeout attached

### Setup Commands
#### Installation Setup Commands

`setup:install` - runs a set of commands, necessary for installing or updating the application. The following steps are performed when running this command:

1. delete all cache files for all stores (`cache:delete-all`)
2. remove the directory that contains the generated files, such as transfer classes, merged database schema XML files or autocompletion classes (`setup:remove-generated-directory`)
3. create or migrate the database (`setup:propel`)
4. generate transfer classes for each of the objects defined in the XML transfer files (`transfer:generate`)
5. initialize the database with required data (`setup:init-db`)
6. generate ide auto-completion files to enable navigation to referenced classes (`dev:ide:generate-auto-completion`). Generated auto-completion classes will be found for each application under the generated folder.
7. build the project resources for Yves and Zed
8. build the navigation tree (`application:build-navigation-tree`)

{% info_block infoBox %}
Each of the commands contained in the steps above can also be executed individually.
{% endinfo_block %}

`setup:install:demo-data` - inserts demo data into the database for testing reasons

`setup:propel` - runs a set of commands, necessary for creating or migrating the database. The following steps are performed when running this command:

1. write propel configuration (`setup:propel:config:convert`)
2. creates the database if it doesn’t exist yet, based on the configuration set in the previous step (`setup:propel:database:create`)
3. ensure compatibility with Postgresql if necessary, by adjusting the Propel XML schema files (`setup:propel:pg-sql-compat`)
4. copy schema files from Spryker and project packages to the generated folder (`setup:propel:schema:copy`)
5. build Propel classes based on the XML schema files (`setup:propel:model:build`)
6. compare the propel models with the database tables and generate the diff, in order to prepare for migration (`setup:propel:diff`)
7. migrate the database: update the database so that’s in sync with the propel models in the project (`setup:propel:migrate`)

#### Jenkins Setup Commands

Cron jobs are scheduled by using Jenkins. For setting up Jenkins, the following console commands can be used from the command line:

* `scheduler:resume` - starts the Jenkins service
* `scheduler:suspend` - shut downs the Jenkins service
* `scheduler:setup` - sets up the cron jobs based on the definitions contained in the configuration file (the config file for jobs is placed in `/config/Zed/cronjobs/jobs.php`)
* `scheduler:clean` - cleans Jenkins jobs

#### Git Commands
Git commands are enabled through console commands and they have effect over the Spryker packages.
