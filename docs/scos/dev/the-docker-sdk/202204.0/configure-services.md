---
title: Configure services
description: Learn how to configure services.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configuring-services
originalArticleId: 5b51acd3-1f5c-477d-995a-d821e88fd5f8
redirect_from:
  - /2021080/docs/configuring-services
  - /2021080/docs/en/configuring-services
  - /docs/configuring-services
  - /docs/en/configuring-services
  - /docs/scos/dev/the-docker-sdk/201811.0/configuring-services.html
  - /docs/scos/dev/the-docker-sdk/201903.0/configuring-services.html
  - /docs/scos/dev/the-docker-sdk/201907.0/configuring-services.html
  - /docs/scos/dev/the-docker-sdk/202005.0/configuring-services.html
  - /docs/scos/dev/installation/spryker-in-docker/configuration/services.html
  - /docs/scos/dev/the-docker-sdk/202204.0/configuring-services.html  
related:
  - title: Deploy File Reference - 1.0
    link: docs/scos/dev/the-docker-sdk/page.version/deploy-file/deploy-file-reference-1.0.html
  - title: The Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-quick-start-guide.html
  - title: Docker environment infrastructure
    link: docs/scos/dev/the-docker-sdk/page.version/docker-environment-infrastructure.html
  - title: Docker SDK configuration reference
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-debugging-in-docker.html
  - title: Running tests with the Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
---

This document describes how to configure services shipped by default.

## Prerequisites

Install or update the Docker SDK to the latest version:

```bash
git clone https://github.com/spryker/docker-sdk.git ./docker
```


{% info_block warningBox "After updating a service" %}

After you've updated a service's configuration, bootstrap it:

```bash
docker/sdk boot {DEPLOY_FILE_NAME}
```

{% endinfo_block %}

## Service versions

When configuring a service, you will need to define it's version. The Docker SDK supports the following service versions:

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
| broke | rabbitmq | 3.7          |             |    |
|       |          | 3.8          | &check;     |    |
|       |          | 3.9          | &check;     |    |
| session         | redis    | 5.0          | &check;     |    |
| key_value_store | redis    | 5.0          | &check;     |    |
| search          | elastic  | 5.6*         | &check;     | https://www.elastic.co/support/eol |
|                 |          | 6.8          | &check;     | https://www.elastic.co/support/eol |
|                 |          | 7.6          | &check;     |    |
|                 |          | 7.10         | &check;     |    |
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

Anyway, you can switch to MySQL or PostgreSQL as described below.

### MariaDB

[MariaDB](https://mariadb.org/) is a community-developed, commercially supported fork of the [MySQL](https://www.mysql.com/) relational database management system.

See [MariaDB knowledge base](https://mariadb.com/kb/en/) for more details.

{% info_block warningBox "Default service" %}

MariaDB is provided as a service by default. You may only need to use this configuration if you are running an older version of the Docker SDK or if you've previously switched to another database engine.

{% endinfo_block %}

#### Configure MariaDB

Follow the steps below to switch the database service to MariaDB:

1. Adjust `deploy.*.yml` in the `services:` section:

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

[MySQL](https://www.mysql.com) is an open source relational database management system based on Structured Query Language (SQL). MySQL enables data to be stored and accessed across multiple storage engines, including InnoDB, CSV and NDB. MySQL is also capable of replicating data and partitioning tables for better performance and durability.

See [MySQL documentation](https://dev.mysql.com/doc/) for more details.

#### Configure MySQL

Follow the steps below to switch database engine to MySQL:

1. Adjust `deploy.*.yaml` in the `services:` section:

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

[PostgreSQL](https://www.postgresql.org/) PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

See [PostgreSQL documentation](https://www.postgresql.org/docs/) for more details.

#### Configure PostgreSQL

Follow the steps below to switch database engine to PostgreSQL:

1. Adjust `deploy.*.yml` in the `services:` section:

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

See:

* [Configure Elasticsearch](/docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configure-elasticsearch.html) to learn more about ElastciSearch configuration in Spryker.
* [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) for more information on ElasticSearch.

### Configure ElasticSearch

Adjust `deploy.*.yml` in the `services:` section to open the port used for accessing ElasticSearch:
```yaml
services:
    search:
        engine: elastic
        endpoints:
            localhost:9200
                protocol: tcp
```

## Kibana UI

[Kibana](https://www.elastic.co/kibana) is an open source analytics and visualization platform designed to work with Elasticsearch. You use Kibana to search, view, and interact with data stored in Elasticsearch indices. You can easily perform advanced data analysis and visualize your data in a variety of charts, tables, and maps.

See [Kibana documentation](https://www.elastic.co/guide/en/kibana/current/index.html) to learn more.

In Docker SDK, Kibana UI is provided as a service by default.

### Configure Kibana UI

Follow the steps to configure an endpoint for Kibana UI:

1. Adjust `deploy.*.yml` in the `services:` section:

```yaml
services:
    ...
    kibana:
        engine: kibana
        endpoints:
            {custom_endpoint}:
```

2. Add the endpoint to the hosts file:

```bash
echo "127.0.0.1 {custom_endpoint}" | sudo tee -a /etc/hosts
```

## RabbitMQ

[RabbitMQ](https://www.rabbitmq.com/) is a messaging broker - an intermediary for messaging. It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.

### Configure RabbitMQ

Adjust `deploy.*.yml` in the `services:` section to open the port used for accessing RabbitMQ:
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

[Swagger UI](https://swagger.io/tools/swagger-ui/) allows anyone—be it your development team or your end consumers—to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client-side consumption.

See [Swagger UI documentation](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/) for more details.

In Docker SDK, Swagger UI is provided as a service by default.

### Rest API Reference in Spryker

Spryker provides the basic functionality to generate [OpenApi schema specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) for REST API endpoints. This document provides an overview of REST API endpoints. For each endpoint, you will find the URL, REST request parameters as well as the appropriate request and response data formats.

### Configure Swagger UI

Follow the steps to configure an endpoint for Swagger UI:

1. Adjust `deploy.*.yml` in the `services:` section:

```yaml
services:
    ...
    swagger:
        engine: swagger-ui
        endpoints:
            {custom_endpoint}:
```

2. Add the endpoint to the hosts file:

```bash
echo "127.0.0.1 {custom_endpoint}" | sudo tee -a /etc/hosts
```

## Redis

[Redis](https://redis.io) is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams.

See [Redis documentation](https://redis.io/documentation) for more details.

### Configure Redis

Adjust `deploy.*.yml` in the `services:` section to open the port used for accessing Redis:

```yaml
services:
    key_value_store:
        engine: redis
        endpoints:
            localhost:16379:
                protocol: tcp
```


## Redis GUI
[Redis Commander](http://joeferner.github.io/redis-commander/) is a web management tool that provides a graphical user interface to access Redis databases and perform basic operations like view keys as a tree, view CRUD keys or import/export databases.

### Configure Redis GUI

Follow the steps to configure an endpoint for Redis Commander:

1. Adjust `deploy.*.yml` in the `services:` section:

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

With the MailHog service, developers can:

* configure an application to use MailHog for SMTP delivery;
* view messages in the web UI or retrieve them via JSON API.

{% info_block infoBox %}

By default the following applies:

*  `http://mail.demo-spryker.com/` is used to see incoming emails.
* Login is not required

{% endinfo_block %}

### Configure MailHog

Adjust `deploy.*.yml` in the `services:` section to specify a custom endpoint:

```yaml
services:
        ...
        mail_catcher:
                engine: mailhog
                endpoints:
                          {custom_endpoint}:
```

## Blackfire

[Blackfire](https://blackfire.io/) is a tool used to profile, test, debug, and optimize performance of PHP applications. It gathers data about consumed server resources like memory, CPU time, and I/O operations. The data and configuration can be checked via Blackfire web interface.

### Configure Blackfire

Follow the steps to enable Blackfire:

1. Adjust `deploy.*.yml` in the `image:` section to enable the Blackfire PHP extension:

```yaml
image:
    tag: spryker/php:7.4 # Use the same tag you had in `image:`
    php:
        ...
        enabled-extensions:
            - blackfire
```

2. Adjust `deploy.*.yml` in the `services:` section to configure Blackfire client:

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

Use the following configuration if you are going to change server or client details often, or if you don’t want to define them in your deploy file.

Follow the steps to enable Blackfire:

1. Adjust `deploy.*.yml` in the `image:` section to enable the Blackfire PHP extension:

```yaml
image:
    tag: spryker/php:7.4 # Use the same tag you had in `image:`
    php:
        ...
        enabled-extensions:
            - blackfire
```

2. Adjust `deploy.*.yml` in the `services:` section to enable the Blackfire service:

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

{% info_block warningBox "Note" %}

You can pass the server details only with the `docker/sdk up` command.

{% endinfo_block %}

It is not obligatory to pass all the details as environment variables or define all the details in the deploy file. You can pass the details in any combination.

## New Relic

[New Relic](https://newrelic.com/) is a tool used to track the performance of services, environment to quickly find and fix issues.

The solution consists of a client and a server. The client is used to collect the data about applications in an environment and send it to the server for further analysis and presentation. The server is used to aggregate, analyse and present the data.

### Prerequisites

* Access to New Relic with an APM account.
* A New Relic license key.
* The New Relic module.

Spryker provides is own New Relic licenses for use with its PaaS environments. A New Relic license key is only required if you wish to set up your own local monitoring.

#### Installing the New Relic module

While most environments may come with New Relic already available, you may need to include the module for your project. Available from Spryker, you can find the [Spryker new-relic module](https://github.com/spryker-eco/new-relic) within our module repositories. To include this repository into your project, it will need to be added to your `composer.json` file with the following command:

```bash
composer require spryker-eco/new-relic
```

### Configure New Relic (PaaS)

Follow the steps to enable New Relic for your PaaS environment:

1. Adjust `deploy.*.yml` in the `image:` section:

```yaml
image:
    tag: spryker/php:7.4 # the image tag that has been previously used in `image:`
    php:
        ...
        enabled-extensions:
            ...
            - newrelic
```

Once New Relic has been enabled in your deploy file, please [contact Spryker Support](/docs/scos/user/intro-to-spryker/support/how-to-contact-spryker-support.html) to have it integrated into your environment. This can be done by submitting an infrastructure change request through the [Support Portal](/docs/scos/user/intro-to-spryker/support/how-to-use-the-support-portal.html). The Support team will confirm that a New Relic APM account is available for you and will ensure that the correct application naming convention is set up to cascade to the appropriate APM.

Once these changes have been enabled and integrated, in the New Relic dashboard, you may see either `company-staging-newrelic-app` or `YVES-DE (docker.dev)`. New Relic displays these APM names by the application name set up in the configuration files. If you update the name of your application, please reach out to Spryker Support to have these changes reflected in your APM.

![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmRPsydm6Ds2eRmKS_lMRNjBnqhBLsvtN_ul_R1EMO7Z4pj74Mbpw3kMdAnjH6gIwLt9cvOqLcI=w1920-h919)

### Configure New Relic (local)

To enable New Relic on your local environment, a license key is required. For help with creating an API key with New Relic, please refer to the following documentation: [New Relic API keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/)

Follow the steps to enable New Relic for your local environment:

1. Adjust `deploy.*.yml` in the `docker:` section:

```yaml
docker:
    newrelic:
        license: {new_relic_license}
	distributed tracing:
            enabled: true
```

2. Adjust `deploy.*.yml` in the `image:` section:

```yaml
image:
    tag: spryker/php:7.4 # the image tag that has been previously used in `image:`
    php:
        ...
        enabled-extensions:
            ...
            - newrelic
```

### Showing YVES, ZED, and GLUE as their own APM

By default, the APM will display in the form of `company-staging-newrelic-app` within the New Relic dashboard. This behavior can be updated so that each of the available applications shows as their own APM (i.e. `YVES-DE (docker.dev)`) for improved visibility.

To do so, additional changes will need to be made to the Monitoring service. Within `src/Pyz/Service/Monitoring/`, we can edit the `MonitoringDependencyProvider.php` to enable this functionality.

```php
<?php declare(strict_types = 1);

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Monitoring;

use Spryker\Service\Monitoring\MonitoringDependencyProvider as SprykerMonitoringDependencyProvider;
use SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin;

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

With `new \SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin()` being returned within the `getMonitoringExtensions()` function, this tells the Monitoring class to include New Relic. Without these changes, New Relic will only report the base (i.e. `index.php`) without showing the appropriate  endpoint or class being called with each transaction.

![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmTnab3UR-VObOo2cPS2IzeFY5uYPy6WmdBgvn9FLBn7WV3b-kouvW0rUUw1MjKppzpck4InEtc=w1920-h878)

![screenshot](https://lh3.googleusercontent.com/drive-viewer/AJc5JmTs7PzBBgaotIid707cuXeru3hc5L6PZv9a_zQAyDMhp2FWKiCSTc2kmqHCaLVsBtjIcoUVYKY=w1920-h919)

{% info_block warningBox "Note" %}

Different builds may have the Monitoring service built into the Yves application. If you are unable to locate `MonitoringDependencyProvider.php` within `src/Pyz/Service/Monitoring/`, you may find it integrated at `src/Pyz/Yves/Monitoring/`

{% endinfo_block %}

## Webdriver

ChromeDriver is provided as a webdriver service by default, but you can switch to PhantomJS as described below.

### ChromeDriver

[ChromeDriver](https://chromedriver.chromium.org/) is a thin wrapper on WebDriver and [Chromium](https://chromedriver.chromium.org/) headless browser. It is used for automating web page interaction, JavaScript execution, and other testing-related activities. It provides full-control API to make end-to-end testing flexible and comfortable.  

{% info_block warningBox "Default service" %}

Chromedriver is provided as a service by default. You may only need to use this configuration if you are running an older version of the Docker SDK or if you've previously switched to another WebDriver.

{% endinfo_block %}

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

### Configure Dashboard

To configure Dashboard, adjust `deploy.*.yml` in the `services:` section:

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

1. Adjust `deploy.*.yml` in the `services:` section:

```yaml
services:
    tideways:
        apikey: {tideways_api_key}
        engine: tideways
        environment-name: {tideways_environment_name}
        cli-enabled: {true|false}
```

2. Add Tideways to the list of enabled extensions in the `image:` section of `deploy.*.yml`:

```yaml
image:
    tag: spryker/php:7.4 # the image tag was previously used in `image:`
    php:
        ...
        enabled-extensions:
            - tideways
```
