---
title: Configuring database servers
description: This article describes how you can change your database server (MySQL or PostgreSQL).
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configure-database-server
originalArticleId: c8b4aa23-f0af-4cec-b5fb-9b31057f6535
redirect_from:
  - /2021080/docs/configure-database-server
  - /2021080/docs/en/configure-database-server
  - /docs/configure-database-server
  - /docs/en/configure-database-server
  - /v6/docs/configure-database-server
  - /v6/docs/en/configure-database-server
  - /v5/docs/configure-database-server
  - /v5/docs/en/configure-database-server
  - /v4/docs/configure-database-server
  - /v4/docs/en/configure-database-server
  - /v3/docs/configure-database-server
  - /v3/docs/en/configure-database-server
  - /v2/docs/configure-database-server
  - /v2/docs/en/configure-database-server
  - /v1/docs/configure-database-server
  - /v1/docs/en/configure-database-server
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-the-database-server.html
related:
  - title: Configure Spryker after installing with DevVM
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-spryker-after-installing-with-devvm.html
  - title: Updating Node.js in DevVM to the latest version
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/updating-node.js-in-devvm-to-the-latest-version.html
---
{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

This article describes how you can change your database server.

Spryker supports MySQL, MariaDB, and PostgreSQL as database servers. By default, the virtual machine is configured to use the MariaDB database server, but you can easily switch to PostgreSQL.

To configure the database server you want to use, you have to keep in mind these constants and use them in the corresponding configuration file:

| DATABASE SERVER | ZED_DB_ENGINE   | ZED_DB_PORT |
| ------------- | ----------------- | --------- |
| MySQL or MariaDB | ZED_DB_ENGINE_MYSQL |    3306     |
| PostgreSQL | ZED_DB_ENGINE_PGSQL |    5432     |

The configuration files are placed under the `config/Shared/` folder. For example, `config/Shared/config_default-development.php` is the configuration file for the development environment.


## Using MySQL or MariaDB as a DB Server

```php
 <?php

$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
$config[PropelConstants::ZED_DB_PORT] = 3306;
```

## Using PostgreSQL as a DB Server

```php
<?php

$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_PGSQL];
$config[PropelConstants::ZED_DB_PORT] = 5432;
```

## Creating the database

To create or update the database configuration, run the installation tool using this command:

```php
vendor/bin/install
```

If the application is already installed on your virtual machine and you switch to a different database server, you can also run:

```php
vendor/bin/install
```

Use the `-h` option to see the help page for this command.
