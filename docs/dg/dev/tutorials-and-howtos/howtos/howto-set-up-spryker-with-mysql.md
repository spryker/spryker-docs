---
title: "HowTo: Set up Spryker with MySQL"
description: Use the guide to install Spryker to run with MySQL.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-setup-spryker-with-mysql
originalArticleId: aab5461c-ee4c-4502-b70d-eafa4ed690e4
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-spryker-with-mysql.html
related:
  - title: Database access credentials
    link: docs/scos/dev/set-up-spryker-locally/database-access-credentials.html
---

Spryker supports connecting to the MySQL database. To install a demo shop with this database, follow the instructions to adjust the configuration.

## MySQL version

Spryker works only with MySQL version 5.7 or higher.

## Adjust Spryker to run with MySQL

To run the Spryker Demoshop with MySQL, adjust the following parts in your configs:

1. In `config/Shared/config_default.php`, modify the database configuration:

```bash
$config[PropelConstants::ZED_DB_PORT] = 3306;
$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
$config[PropelQueryBuilderConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
```

2. In `deploy/setup/params.sh`, modify `DATABASE_DEFAULT_ENGINE` to `mysql`:

```yaml
DATABASE_DEFAULT_ENGINE='mysql'
```

3. Install Spryker with MySQL:

```bash
vendor/bin/install
```

## Configure MySQL GroupBy setting

In some MySQL servers, there is the `ONLY_FULL_GROUP_BY` option which forces all columns to be present in `group_by`. This option must be removed from your configurations of MySQL:

*Wrong setting*:

```bash
[mysqld]

# server mode
sql-mode = STRICT_ALL_TABLES,ONLY_FULL_GROUP_BY
```

*Correct setting*:

```bash
[mysqld]

# server mode
sql-mode = STRICT_ALL_TABLES
```
