---
title: PaaS: migration instructions
description: This document is aggregated list of activities which has to be done in order to move the on-Prem hosted Spryker project to PaaS.
template: howto-guide-template
---

This document is aggregated list of activities which has to be done in order to move the on-Prem hosted Spryker project to PaaS.

## Assessment

Go through the following documents to estimate the effort needed to migrate the project.

1. [Check if the latest version of Docker SDK is installed](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-the-latest-version-of-docker-sdk-installed.html)
2. [Is the latest version of Docker SDK integrated and project is running on Docker SDK?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-the-latest-version-of-docker-sdk-integrated.html)
3. [Are performance and security guidelines implemented?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/are-performance-and-security-guidelines-implemented.html)
4. [Is currently used PHP Version >=8.0?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-currently-used-php-version-8-0.html)
5. [Are all used packages support PHP Version >=8.0?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/are-all-used-packages-support-php-version-8-0.html)
6. [Check if separate endpoint bootstraps are integrated?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/check-if-separate-endpoint-bootstraps-are-integrated.html)
7. [Are ZED endpoints split to 3 (BackendApi, BackendGateway, Backoffice)?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/are-zed-endpoints-split-to-3-backendapi-backendgateway-backoffice.html)
8. [Is amount of assets small (images, assets manager, videos, import data (if needed) etc.) Files: <30 GB?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-amount-of-assets-small.html)
9. [Are there some technical complexities, that might increase efforts like: CTE, Raw SQL?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/are-there-some-technical-db-complexities-that-might-increase-efforts.html)
10. [Are there some technical complexities, that might increase efforts like: non standard services, high traffic amount, VPN?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/are-there-some-technical-services-complexities-that-might-increase-efforts.html)
11. [Is deployment process compatible with PaaS OOTB deployment process?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-deployment-process-compatible-with-paas-ootb-deployment-process.html)
12. [Is ENV variables approach used for environment settings specification?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-env-variables-approach-used-for-environment-settings-specification.html)
13. [Test coverage: Is common E-com flow covered?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/test-coverage-is-common-e-com-flow-covered.html)
14. [Test coverage: Is critical custom functionality of E-com flow covered?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/test-coverage-is-critical-custom-functionality-of-e-com-flow-covered.html)
15. [Is S3 bucket integrated for all needed storages of files?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-s3-bucket-integrated-for-all-needed-storages-of-files.html)
16. [Has multi-store support?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/has-multi-store-support.html)
17. [Is MariaDB / MySQL used in the project?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/is-mariadb-mysql-used-in-the-project.html)
18. [Are ElasticSearch and Redis restorable?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/are-elasticsearch-and-redis-restorable.html)
19. [How to do the transition?](/docs/scos/dev/migration-program/migration-to-paas/paas-assessment-documents/how-to-do-the-transition.html)

## Migration

Migrations process itself. Documents below explains common todos, tools and best practices for project migration.

1. [Install the latest version of Docker SDK](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/install-the-latest-version-of-docker-sdk.html)
2. [Integrate the latest version of Docker SDK and run project on it](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/integrate-the-latest-version-of-docker-sdk-and-run-project-on-it.html)
3. [Implement security and performance guidelines](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/implement-security-and-performance-guidelines.html)
4. [Migrate project to PHP >=8.0](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-project-to-php-8-0.html)
5. [Upgrade all used packages to be compatible with PHP >=8.0](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/upgrade-all-used-packages-to-be-compatible-with-php-8-0.html)
6. [Upgrade project packages](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/upgrade-project-packages.html)
7. [Split ZED endpoints to 3 (BackendApi, BackendGateway, Backoffice)](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/split-zed-endpoints-to-3-backendapi-backendgateway-backoffice.html)
8. [Migrate assets (images, assets manager, videos, import data (if needed) etc.)](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-assets-images-assets-manager-videos-import-data-if-needed-etc.html)
9. [Migrate CTEs, Raw SQL queries, Views, Procedures etc.](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-ctes-raw-sql-queries-views-procedures-etc.html)
10. [Migrate non standard services. Apply settings for high traffic, external connections, VPN etc.](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-non-standard-services.html)
11. \-
12. [Transfer environment specific application settings to Spryker Cloud (ENV variables)](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/transfer-environment-specific-application-settings-to-spryker-cloud-env-variables.html)
13. [Migrate / develop common E-com flow tests](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-develop-common-e-com-flow-tests.html)
14. [Migrate / develop critical custom functionality of E-com flow](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-develop-critical-custom-functionality-of-e-com-flow.html)
15. [Migrate files storages usage to S3 usage](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-files-storages-usage-to-s3-usage.html)
16. \-
17. [Migrate existing DB driver to MariaDB](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/migrate-existing-db-driver-to-mariadb.html)
18. [Restore Elasticsearch and Redis](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/restore-elasticsearch-and-redis.html)
19. [Switch from on prem to Spryker Cloud](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/switch-from-on-prem-to-spryker-cloud.html)
