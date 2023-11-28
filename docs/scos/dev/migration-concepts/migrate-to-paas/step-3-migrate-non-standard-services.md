---
title: 'Step 3: Migrate non-standard services'
description: To migrate to PaaS, you need to migrate non-standard services.
template: howto-guide-template
---

Spryker comes pre-configured with the following services by default:

* RabbitMQ
* ElasticSearch
* Redis
* MariaDB
* Jenkins

After you have [upgraded the PHP version](/docs/scos/dev/migration-concepts/migrate-to-paas/step-2-upgrade-the-php-version.html), you can migrate these services without significant challenges, however, make sure to validate their versions. If your project uses components beyond the standard configuration, such as Kafka, we highly recommend to conduct thorough investigation.

For more information about the standard components and configuration, see [Spryker technology stack](/docs/scos/dev/architecture/technology-stack.html) and [conceptual overview](/docs/scos/dev/architecture/conceptual-overview.html).

## Postgres to MariaDB

Currently, within the Spryker PaaS environment, exclusively the MariaDB engine is compatible for databases. Consequently, if the project previously relied on PostgreSQL, it is necessary to migrate to MariaDB. To accommodate this change, you need to make specific adjustments within the `config/Shared/config_*.php` files.

Consider that CTE queries or any other raw SQL queries or DB structure specific to PostgreSQL have to be reviewed for compatibility with MariaDB. Also it's known fact that the CTE queries works slower on MariDB based engine.

## Next step

[Provision the Spryker PaaS environments](docs\scos\dev\migration-concepts\migrate-to-paas\step-4-provision-the-spryker-paas-environments.html)
