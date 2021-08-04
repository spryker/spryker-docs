---
title: HowTo - Set up Spryker with MySQL
originalLink: https://documentation.spryker.com/v6/docs/ht-setup-spryker-with-mysql
redirect_from:
  - /v6/docs/ht-setup-spryker-with-mysql
  - /v6/docs/en/ht-setup-spryker-with-mysql
---

Spryker supports MySQL database. To install it with this database, follow these instructions to adjust the configuration.

## MySQL Version
Currently Spryker works only with MySQL version 5.7 or higher.

##  Adjusting Spryker to Run with MySQL
To run the Spryker Demoshop with MySQL, adjust some parts in our configs:

1. Go to `config/Shared/config_default.php` and modify the database configuration:

```bash
$config[PropelConstants::ZED_DB_PORT] = 3306;
$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
$config[PropelQueryBuilderConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
```
2. Go to `deploy/setup/params.sh` and modify `DATABASE_DEFAULT_ENGINE` to MySQL:

```yaml
DATABASE_DEFAULT_ENGINE='mysql'
```
3. That's it. Now, run `vendor/bin/install` to install Spryker with MySQL.

## MySQL GroupBy Setting
In some MySQL servers, there is the `ONLY_FULL_GROUP_BY` option which forces all columns to be present in `group_by`. This option should be removed from your configurations of MySQL:
        
**Wrong setting:**

```bash
[mysqld]

# server mode
sql-mode = STRICT_ALL_TABLES,ONLY_FULL_GROUP_BY
```

**Correct setting:**

```bash
[mysqld]

# server mode
sql-mode = STRICT_ALL_TABLES
```
