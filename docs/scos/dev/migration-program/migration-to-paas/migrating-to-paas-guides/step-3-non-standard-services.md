---
title: 'Step 3: Non-standard services migration'
description: 
template: howto-guide-template
---

## Adapt to non-standard services

Spryker comes pre-configured with the following services by default:
* RabbitMQ
* ElasticSearch
* Redis
* MariaDB
* Jenkins

The services listed can be migrated without significant challenges, although it's crucial to separately validate their versions. In cases where a project utilizes components beyond the standard configuration, such as Kafka, a thorough investigation should be conducted independently.

For more information see [Spryker technology stack](docs/scos/dev/architecture/technology-stack.html) and [conceptual overview](docs/scos/dev/architecture/conceptual-overview.html#application-separation.html).

## Postgres to MariaDB

At present, within the Spryker PaaS environment, exclusively the MariaDB engine is compatible for databases. Consequently, if the project previously relied on PostgreSQL, a migration to MariaDB is imperative. Specific adjustments need to be made within the `config/Shared/config_*.php` files to accommodate this change.

Consider that CTE queries or any other raw SQL queries or DB structure specific to PostgreSQL have to be reviewed for compatibility with MariaDB. Also it's known fact that the CTE queries works slower on MariDB based engine.
