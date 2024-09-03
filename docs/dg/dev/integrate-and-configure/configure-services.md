---
title: Configure services
description: Learn how to configure services.
last_updated: May 8, 2024
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configuring-services
originalArticleId: 5b51acd3-1f5c-477d-995a-d821e88fd5f8
redirect_from:
  - /docs/scos/dev/the-docker-sdk/202005.0/services.html  
  - /docs/scos/dev/the-docker-sdk/201811.0/configuring-services.html
  - /docs/scos/dev/the-docker-sdk/201903.0/configuring-services.html
  - /docs/scos/dev/the-docker-sdk/201907.0/configuring-services.html
  - /docs/scos/dev/the-docker-sdk/202005.0/configuring-services.html
  - /docs/scos/dev/installation/spryker-in-docker/configuration/services.html
  - /docs/scos/dev/the-docker-sdk/202204.0/configuring-services.html
  - /docs/scos/dev/technology-partner-guides/202212.0/operational-tools-monitoring-legal-etc/installing-and-configuring-tideways-with-vagrant.html
  - /docs/scos/dev/technology-partner-guides/202212.0/operational-tools-monitoring-legal-etc/new-relic/installing-and-configuring-new-relic–with–vagrant.html
  - /scos/dev/technology-partner-guides/202200.0/operational-tools-monitoring-legal-etc/new-relic/configuring-new-relic-logging.html
  - /scos/dev/technology-partner-guides/202212.0/operational-tools-monitoring-legal-etc/new-relic/configuring-new-relic-logging.html  
  - /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-new-relic-monitoring.html
  - /docs/scos/dev/technology-partner-guides/202212.0/operational-tools-monitoring-legal-etc/new-relic/configuring-new-relic-logging.html
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-mariadb-database-engine.html
  - /docs/scos/dev/technical-enhancements/mariadb-database-engine.html
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-chromium-browser-for-tests.html
  - /docs/scos/dev/technical-enhancements/chromium-browser-for-tests.html
  - /docs/scos/dev/the-docker-sdk/202204.0/configure-services.html
  - /docs/scos/dev/technology-partner-guides/202204.0/operational-tools-monitoring-legal-etc/new-relic/configuring-new-relic-logging.html
  - /docs/scos/dev/technology-partner-guides/202204.0/operational-tools-monitoring-legal-etc/new-relic/installing-and-configuring-new-relic–with–vagrant.html
  - /docs/scos/dev/technology-partner-guides/202204.0/operational-tools-monitoring-legal-etc/installing-and-configuring-tideways-with-vagrant.html
  - /docs/scos/dev/the-docker-sdk/202311.0/configure-services.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-spryker-with-mysql.html
  - /docs/scos/user/technology-partners/202200.0/operational-tools-monitoring-legal-etc/new-relic.html
  - /docs/pbc/all/miscellaneous/202311.0/third-party-integrations/operational-tools-monitoring-legal/new-relic.html
  - /docs/pbc/all/miscellaneous/202212.0/third-party-integrations/operational-tools-monitoring-legal/new-relic.html
  - /docs/pbc/all/miscellaneous/202307.0/third-party-integrations/operational-tools-monitoring-legal/new-relic.html

related:
  - title: Deploy file reference
    link: docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html
  - title: The Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-quick-start-guide.html
  - title: Docker environment infrastructure
    link: docs/dg/dev/sdks/the-docker-sdk/docker-environment-infrastructure.html
  - title: Docker SDK configuration reference
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/configure-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/dg/dev/sdks/the-docker-sdk/configure-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html
  - title: Running tests with the Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
---

This document describes how to configure services shipped by default.

## Prerequisites

Install or update the Docker SDK to the latest version:

```bash
git clone https://github.com/spryker/docker-sdk.git ./docker
```

## Service versions

When configuring a service, you need to define its version. The Docker SDK supports the following service versions:

| SERVICE | ENGINE  | VERSIONS | ARM SUPPORT | NOTE |
|----|----|----|----|---|
| datab | postgres | 9.6*         | &check;     |    |
|       |          | 10           | &check;     |    |
|       |          | 11           | &check;     |    |
|       |          | 12           | &check;     |    |
|       | mysql    | 5.7          |             |    |
|       |          | mariadb-10.2 | &check;     |    |
|       |          | mariadb-10.3 | &check;     |    |
|       |          | mariadb-10.4 | &check;     |    |
|       |          | mariadb-10.5 | &check;     |    |
|       |          | mariadb-10.6 | &check;     |    |
|       |          | mariadb-10.11 | &check;     |    |
| broke | rabbitmq | 3.7          |             |    |
|       |          | 3.8          | &check;     |    |
|       |          | 3.9          | &check;     |    |
| session         | redis    | 5.0          | &check;     |    |
| key_value_store | redis    | 5.0          | &check;     |    |
| search          | elastic  | 5.6*         | &check;     | https://www.elastic.co/support/eol |
|                 |          | 6.8          | &check;     | https://www.elastic.co/support/eol |
|                 |          | 7.6          | &check;     |    |
|                 |          | 7.10         | &check;     |    |
|                 | opensearch | 1.3         | &check;     |    |
| scheduler       | jenkins  | 2.176        |             |    |
|                 |          | 2.305        | &check;     |    |
|                 |          | 2.324        | &check;     |    |
| webdriver       | phantomjs| latest*      |             |    |
|                 | chromedriver | latest   | &check;      |    |
| mail_catcher    | mailhog  | 1.0          | &check;     |    |
| swagger         | swagger-ui   | v3.24    | &check;      |    |
| kibana          | kibana   | 5.6*         | &check;     | https://www.elastic.co/support/eol |
|                 |          | 6.8          | &check;     | https://www.elastic.co/support/eol |
|                 |          | 7.6          | &check;     |    |
|                 |          | 7.10         | &check;     |    |
| blackfire       | blackfire  | latest   | &check;      |      |


## Database services

[MariaDB](https://mariadb.org/) is provided as a service by default. MariaDB is about 40% faster on write operations when compared, for example, to PostgreSQL.

You can switch to MySQL or PostgreSQL as described in the following sections.

### MariaDB

[MariaDB](https://mariadb.org/) is a community-developed, commercially supported fork of the [MySQL](https://www.mysql.com/) relational database management system.

For more details, see [MariaDB knowledge base](https://mariadb.com/kb/en/).

{% info_block infoBox "Default service" %}

MariaDB is provided as a service by default. You may only need to use this configuration if you are running an older version of the Docker SDK or if you've previously switched to another database engine.

{% endinfo_block %}

#### Configure MariaDB

To switch the database service to MariaDB, follow these steps:

1. In `deploy.*.yml`, adjust the `services` section:

```yaml
...
services:
    database:
        engine: mysql
        version: mariadb-10.4
        ...
        endpoints:
            localhost:3306:
...
```

2. Bootstrap the docker setup, regenerate demo data, and rebuild the application:

```bash
docker/sdk boot deploy.*.yml
docker/sdk clean-data
docker/sdk up --build --data
```

### MySQL

[MySQL](https://www.mysql.com) is an open-source relational database management system based on Structured Query Language (SQL). MySQL allows data to be stored and accessed across multiple storage engines, including InnoDB, CSV, and NDB. Also, MySQL can replicate data and partition tables for better performance and durability.

For more details, see [MySQL documentation](https://dev.mysql.com/doc/).

#### Configure MySQL

To switch the database engine to MySQL, follow these steps:

1. In `deploy.*.yaml`, adjust the `services` section:

```yaml
...
services:
    database:
        engine: mysql
        ...
        endpoints:
            localhost:3306:
...
```

2. Bootstrap the docker setup, regenerate demo data, and rebuild the application:

```bash
docker/sdk boot deploy.*.yml
docker/sdk clean-data
docker/sdk up --build --data
```


### PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is an open-source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

For more details, see [PostgreSQL documentation](https://www.postgresql.org/docs/).

#### Configure PostgreSQL

To switch the database engine to PostgreSQL, follow these steps:

1. In `deploy.*.yml`, adjust the `services` section:

```yaml
...
services:
    database:
        engine: postgres
        ...
        endpoints:
            localhost:5432:
...
```

2. Bootstrap the docker setup, regenerate demo data, and rebuild the application:

```bash
docker/sdk boot deploy.*.yml
docker/sdk clean-data
docker/sdk up --build --data
```

## ElasticSearch

[Elasticsearch](https://www.elastic.co/elasticsearch/) is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents.

For more information, see the following documents:

* [Configure Elasticsearch](/docs/pbc/all/search/{{site.version}}/base-shop/tutorials-and-howtos/configure-elasticsearch.html)—describes ElastciSearch configuration in Spryker.
* [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)—provides detailed information about ElasticSearch.

### Configure ElasticSearch

In `deploy.*.yml`, adjust the `services` section to open the port used for accessing ElasticSearch:
```yaml
services:
    search:
        engine: elastic
        endpoints:
            localhost:9200
                protocol: tcp
```

## Kibana UI

[Kibana](https://www.elastic.co/kibana) is an open-source analytics and visualization platform designed to work with Elasticsearch. You use Kibana to search, view, and interact with data stored in Elasticsearch indices. You can easily perform advanced data analysis and visualize your data in a variety of charts, tables, and maps.

For more information, see [Kibana documentation](https://www.elastic.co/guide/en/kibana/current/index.html).

In Docker SDK, Kibana UI is provided as a service by default.

### Configure Kibana UI

To configure an endpoint for Kibana UI, follow these steps:

1. In `deploy.*.yml`, adjust the `services` section:

```yaml
services:
    ...
    kibana:
        engine: kibana
        endpoints:
            {custom_endpoint}:
```

2. Add the endpoint to the `hosts` file:

```bash
echo "127.0.0.1 {custom_endpoint}" | sudo tee -a /etc/hosts
```

## RabbitMQ

[RabbitMQ](https://www.rabbitmq.com/) is a messaging broker—an intermediary for messaging. It gives your applications a common platform to send and receive messages and your messages a safe place to live until received.

### Configure RabbitMQ

In `deploy.*.yml`, adjust the `services` section to open the port used for accessing RabbitMQ:
```yaml
services:
    broker:
    ...
        endpoints:
    ...
            localhost:5672:
                protocol: tcp
            api.queue.spryker.local:
```

## Swagger UI

[Swagger UI](https://swagger.io/tools/swagger-ui/) allows anyone—be it your development team or your end consumers—to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for backend implementation and client-side consumption.

For more details, see [Swagger UI documentation](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/).

In Docker SDK, Swagger UI is provided as a service by default.

### Rest API Reference in Spryker

Spryker provides the basic functionality to generate [OpenApi schema specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) for REST API endpoints. This document provides an overview of REST API endpoints. For each endpoint, you can find the URL, REST request parameters as well as the appropriate request and response data formats.

### Configure Swagger UI

To configure an endpoint for Swagger UI, follow these steps:

1. In `deploy.*.yml`, adjust the `services` section:

```yaml
services:
    ...
    swagger:
        engine: swagger-ui
        endpoints:
            {custom_endpoint}:
```

2. Add the endpoint to the `hosts` file:

```bash
echo "127.0.0.1 {custom_endpoint}" | sudo tee -a /etc/hosts
```

## Redis

[Redis](https://redis.io) is an open-source (BSD licensed), in-memory data structure store used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries, and streams.

For more information, see [Redis documentation](https://redis.io/documentation).

### Configure Redis

In `deploy.*.yml`, adjust the `services` section to open the port used for accessing Redis:

```yaml
services:
    key_value_store:
        engine: redis
        endpoints:
            localhost:16379:
                protocol: tcp
```

## Redis GUI
[Redis Commander](http://joeferner.github.io/redis-commander/) is a web management tool that provides a graphical user interface to access Redis databases and perform basic operations like view keys as a tree, view CRUD keys, or import and export databases.

### Configure Redis GUI

To configure an endpoint for Redis Commander, follow the steps:

1. In `deploy.*.yml`, adjust the `services` section:

```yaml
services:
...    
    redis-gui:
        engine: redis-commander
        endpoints:
            {custom_endpoint}: //redis-commander.spryker.local:
```

2. Adjust hosts file:

```bash
echo "127.0.0.1 {custom_endpoint}" | sudo tee -a /etc/hosts
```

## MailHog

[MailHog](https://github.com/mailhog/MailHog) is a mail catcher service that is used with Spryker in Docker for Demo and Development environments. Developers use this email testing tool to catch and show emails locally without an SMTP (Simple Mail Transfer Protocol) server.

With the MailHog service, developers can do the following:
* Configure an application to use MailHog for SMTP delivery.
* View messages in the web UI or retrieve them via JSON API.

{% info_block infoBox %}

By default, the following applies:

* `http://mail.demo-spryker.com/` is used to see incoming emails.
* Login is not required.

{% endinfo_block %}

### Configure MailHog

In `deploy.*.yml`, adjust the `services` section to specify a custom endpoint:

```yaml
services:
        ...
        mail_catcher:
                engine: mailhog
                endpoints:
                          {custom_endpoint}:
```

## Blackfire

[Blackfire](https://blackfire.io/) is a tool used to profile, test, debug, and optimize the performance of PHP applications. It gathers data about consumed server resources like memory, CPU time, and I/O operations. The data and configuration can be checked through the Blackfire web interface.

### Configure Blackfire

To enable Blackfire, follow these steps:

1. In the `image` section, adjust `deploy.*.yml` to enable the Blackfire PHP extension:

```yaml
image:
    tag: spryker/php:7.4 # Use the same tag you had in `image`
    php:
        ...
        enabled-extensions:
            - blackfire
```

1. In `deploy.*.yml`, adjust the `services` section to configure the Blackfire client:

```yaml
services:
    ...
    blackfire:
        engine: blackfire
        server-id: {server_id}
        server-token: {server_token}
        client-id: {client_id}
        client-token: {client-token}
```

#### Alternative configuration

Use the following configuration if you are going to change server or client details often or if you don’t want to define them in your deploy file.

To enable Blackfire, follow these steps:

1. In the `image` section, adjust `deploy.*.yml` to enable the Blackfire PHP extension:

```yaml
image:
    tag: spryker/php:7.4 # Use the same tag you had in `image`
    php:
        ...
        enabled-extensions:
            - blackfire
```

2. In the `services` section, adjust `deploy.*.yml` to enable the Blackfire service:

```yaml
services:
    ...
    blackfire:
        engine: blackfire
```

3. Pass Blackfire client details:

```bash
BLACKFIRE_CLIENT_ID={client_id} BLACKFIRE_CLIENT_TOKEN={client-token} docker/sdk cli
```

4. Pass Blackfire server details:

```bash
BLACKFIRE_SERVER_ID={client-token} BLACKFIRE_SERVER_TOKEN={server_token} docker/sdk up
```

{% info_block infoBox %}

You can pass the server details only with the `docker/sdk up` command.

It is not obligatory to pass all the details as environment variables or define all the details in the deploy file. You can pass the details in any combination.

{% endinfo_block %}

## New Relic

[New Relic](https://newrelic.com/) is a tool used to track the performance of services and the environment to quickly find and fix issues.

The solution consists of a client and a server. The client is used to collect data about applications in an environment and send it to the server for further analysis and presentation. The server is used to aggregate, analyse, and present the data.

### Prerequisites

* [New Relic license key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/). (NEWRELIC_LICENSE)
* NewRelic Account ID (NEWRELIC_ACCOUNT_ID)
* NewRelic Insights Key (NEWRELIC_INSIGHTS_KEY)
* The New Relic module.

### Install the New Relic module

While most environments come with New Relic already available, you may need to add the module to your project. Add the module to your `composer.json`:

```bash
composer require spryker-eco/new-relic
```

### SCCOS: Configure New Relic

1. Adjust `deploy.*.yml` in the `image:` section:

```yaml
image:
    ...
    php:
        ...
        enabled-extensions:
            ...
            - newrelic
    environment:
        ...
        NEWRELIC_CUSTOM_APP_ENVIRONMENT: ENVIRONMENT_VALUE_HERE # staging, dev, production, uat
```

2. Push and deploy the changes using one of the following guides:

  * [Deploying in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)
  * [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html)



3. Submit an infrastructure change request via the [Support Portal](/docs/about/all/support/using-the-support-portal.html) . Set up a Change Request for existing Parameter Store values and request your values to be set for these parameters
* NEWRELIC_LICENSE
* NEWRELIC_ACCOUNT_ID
* NEWRELIC_INSIGHTS_KEY

Once New Relic is enabled, in the New Relic dashboard, you may see either `company-staging-newrelic-app` or `YVES-DE (docker.dev)`. New Relic displays these APM names by the application name setup in the configuration files.

![screenshot](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/the-docker-sdk/configure-services.md/new-relic-apms.png)


{% info_block infoBox %}

If you update the name of an application, [contact support](/docs/about/all/support/using-the-support-portal.html) to update the changes in your APM.

{% endinfo_block %}



### Local: Configure New Relic

1. In `deploy.*.yml`, adjust the `docker` section:

```yaml
docker:
    newrelic:
        license: {new_relic_license}
	distributed tracing:
            enabled: true
```

2. In the `deploy.*.yml`, adjust the `image` section:

```yaml
image:
    ...
    php:
        ...
        enabled-extensions:
            ...
            - newrelic
```

### Configure YVES, ZED, and GLUE as separate APMs

By default, in the New Relic dashboard, the APM is displayed as `company-staging-newrelic-app`. To improve visibility, you may want to configure each application as a separate APM. For example, `YVES-DE (docker.dev)`.

To do it, add the `NewRelicMonitoringExtensionPlugin` by creating the class `src/Pyz/Service/Monitoring/MonitoringDependencyProvider.php`:  

```php
<?php declare(strict_types = 1);
​
/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
​
namespace Pyz\Service\Monitoring;
​
use Spryker\Service\Monitoring\MonitoringDependencyProvider as SprykerMonitoringDependencyProvider;
use Pyz\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin;
​
class MonitoringDependencyProvider extends SprykerMonitoringDependencyProvider
{
    /**
     * @return \Spryker\Service\MonitoringExtension\Dependency\Plugin\MonitoringExtensionPluginInterface[]
     */
    protected function getMonitoringExtensions(): array
    {
        return [
            new NewRelicMonitoringExtensionPlugin(),
        ];
    }
}
```

Next, create the class `src/Pyz/Service/NewRelic/Plugin/NewRelicMonitoringExtensionPlugin.php`

```php
<?php
​
/**
 * MIT License
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
​
namespace Pyz\Service\NewRelic\Plugin;
​
use SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin as SprykerNewRelicMonitoringExtensionPlugin;
​
class NewRelicMonitoringExtensionPlugin extends SprykerNewRelicMonitoringExtensionPlugin
{
    /**
     * @param string|null $application
     * @param string|null $store
     * @param string|null $environment
     *
     * @return void
     */
    public function setApplicationName(?string $application = null, ?string $store = null, ?string $environment = null): void
    {
        if (!$this->isActive) {
            return;
        }
​
        // Custom application environment name, or use $environment as fallback
        $environment = getenv('NEWRELIC_CUSTOM_APP_ENVIRONMENT') ?: $environment;
​
        $this->application = $application . '-' . $store . ' (' . $environment . ')';
​
        newrelic_set_appname($this->application, '', false);
    }
}
```

{% info_block infoBox %}

* Some builds have the Monitoring service built into the Yves application. If `src/Pyz/Service/Monitoring/MonitoringDependencyProvider.php` does not exist, you may want to check `src/Pyz/Yves/Monitoring/`.

* If the class is missing from the Monitoring service, create it.


{% endinfo_block %}



With `new \SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin()` being returned with the `getMonitoringExtensions()` function, the Monitoring class includes New Relic. Now applications are displayed as separate APMs, and an appropriate endpoint or class is displayed with each transaction.

![screenshot](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/the-docker-sdk/configure-services.md/new-relic-transactions.png)

### Track deployments

To notify New Relic about new deployments, include the console command `\SprykerEco\Zed\NewRelic\Communication\Console\RecordDeploymentConsole` in `\Pyz\Zed\Console\ConsoleDependencyProvider` as follows:
```php
namespace Pyz\Zed\Console;

...
use SprykerEco\Zed\NewRelic\Communication\Console\RecordDeploymentConsole;
...

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
...
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
	    ....
            new RecordDeploymentConsole(),
        ];
	....
        return $commands;
    }
....
}

```

From now on you can use the record deployment functionality built-in in the console command, as follows:

```bash
vendor/bin/console newrelic:record-deployment <AppName>
```
where `AppName` corresponds to the preconfigured in NewRelicEnv::NEW_RELIC_APPLICATION_ID_ARRAY.
For more details, see [Upgrade the Monitoring module](/docs/scos/dev/module-migration-guides/migration-guide-monitoring.html)

## Webdriver

PhantomJS is provided as a webdriver service by default, but you can switch to ChromeDriver as described below.

### ChromeDriver

[ChromeDriver](https://chromedriver.chromium.org/) is a thin wrapper on WebDriver and a [Chromium](https://chromedriver.chromium.org/) headless browser. It is used for automating web page interaction, JavaScript execution, and other testing-related activities. It provides full-control API to make end-to-end testing flexible and comfortable.  

#### Configure ChromeDriver

To enable Chromedriver, adjust `deploy.*.yml` as follows:

```yaml
services:
    webdriver:
        engine: chromedriver
```

### PhantomJS

[PhantomJS](https://phantomjs.org/) is a headless browser for automating web page interaction. It ships with a WebDriver based on [Selenium](https://www.selenium.dev/).

#### Configure PhantomJS

To enable PhantomJS, adjust `deploy.*.yml` as follows:

```yaml
services:
    webdriver:
        engine: phantomjs
```

## Dashboard

Dashboard is a tool that helps to monitor logs in real time. You can monitor logs in all or a particular container.

### Configure dashboard

To configure Dashboard, in the `services` section, adjust `deploy.*.yml`:

```yaml
services:
    dashboard:
            engine: dashboard
            endpoints:
                {custom_endpoint}:
```

## Tideways

[Tideways](https://tideways.com/) is an application profiler used for testing and debugging. Its main functions are profiling, monitoring, and exception tracking.

### Configure Tideways

To configure Tideways, do the following:

1. In `deploy.*.yml`, adjust the `services` section:

```yaml
services:
    tideways:
        apikey: {tideways_api_key}
        engine: tideways
        environment-name: {tideways_environment_name}
        cli-enabled: {true|false}
```

2. In the `image` section of `deploy.*.yml`, add Tideways to the list of enabled extensions:

```yaml
image:
    tag: spryker/php:7.4 # the image tag was previously used in `image`
    php:
        ...
        enabled-extensions:
            - tideways
```
