---
title: Database access credentials
description: Learn how to find Database access credentials for MariaDB, MySQL, and PostgreSQL for your Local Spryker Environments.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/database-access-credentials
originalArticleId: 1e227c7f-f4f2-4c7e-b5c4-5ed1d9174ec7
redirect_from:
- /docs/scos/dev/set-up-spryker-locally/database-access-credentials.html
---

In this document, you can find credentials for accessing your database. By default, you can access a database only in [Development mode](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html#development-mode).

MySQL or MariaDB database:

* `host` - `localhost`
* `port` - `3306`
* `user` - `spryker`
* `pw` - `secret`

PostgreSQL database:

* `host` - `localhost`
* `port` - `5432`
* `user` - `spryker`
* `pw` - `secret`

You can change the credentials in the [Deploy file](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html).

You can find the credentials in your project with this command:

```bash
$ grep SPRYKER_DB_ docker/deployment/default/env/cli/de.env | grep -v ROOT
```

Example output:

```bash
SPRYKER_DB_ENGINE=mysql
SPRYKER_DB_HOST=database
SPRYKER_DB_PORT=3306
SPRYKER_DB_DATABASE=eu-docker
SPRYKER_DB_USERNAME=spryker
SPRYKER_DB_PASSWORD=secret
SPRYKER_DB_CHARACTER_SET=utf8
SPRYKER_DB_COLLATE=utf8_general_ci
```

You then can connect to the database in this example like so:

```bash
# connect to cli first
$ docker/sdk cli
```

```bash
# inside the docker/sdk cli
╭─/data | Store: DE | Env: docker.dev | Debug: (.) | Testing: (.)
╰─$ mariadb -u $SPRYKER_DB_USERNAME -p$SPRYKER_DB_PASSWORD -h $SPRYKER_DB_HOST $SPRYKER_DB_DATABASE
```
