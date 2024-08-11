---
title: 'Migrate to cloud: Migrate non-standard services'
description: To migrate to SCCOS, you need to migrate non-standard services.
template: howto-guide-template
redirect_from:
- /docs/scos/dev/migration-concepts/migrate-to-sccos/step-3-migrate-non-standard-services.html
---

Spryker comes pre-configured with the following services by default:

* RabbitMQ
* ElasticSearch
* Redis
* MariaDB
* Jenkins

After you have [upgraded the PHP version](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-upgrade-the-php-version.html), you can migrate these services. You should be able to do that without significant challenges. However, check their versions to make sure if the on-prem versions of your services are different from those of the Spryker Cloud Commerce OS. If your project uses components beyond the standard configuration, such as Kafka, we highly recommend conducting a thorough investigation and making a decision on whether to replace them or find a way to continue using them.

For more information about the standard components and configuration, see [Spryker technology stack](/docs/dg/dev/architecture/technology-stack.html) and [conceptual overview](/docs/dg/dev/architecture/conceptual-overview.html).

## Postgres to MariaDB

Currently, within the Spryker Cloud Commerce OS environment, only the MariaDB engine is compatible with databases. Consequently, if the project previously relied on PostgreSQL, it's necessary to migrate to MariaDB. To accommodate this change, you need to make specific adjustments within the `config/Shared/config_*.php` files.

Consider that CTE queries or any other raw SQL queries or DB structure specific to PostgreSQL have to be reviewed for compatibility with MariaDB. Also, it's a known fact that the CTE queries work slower on the MariDB-based engine.

## Next step

[Provision the Spryker Cloud Commerce OS environments](/docs/dg/dev/upgrade-and-migrate/migrate-to-cloud/migrate-to-cloud-provision-the-sccos-environments.html)
