---
title: Services
originalLink: https://documentation.spryker.com/v4/docs/services
redirect_from:
  - /v4/docs/services
  - /v4/docs/en/services
---

## General Information
This page describes configuration options of the services shipped with Spryker in Docker by default.  Find the list of the services below:

*     MySQL
*     ElasticSearch
*     Kibana UI
*     RabbitMQ
*     Swagger UI
*     Redis
*     MailHog

{% info_block infoBox %}

* Before you start configuring a service, make sure to install or update Docker SDK to the latest version:
```bash
git clone https://github.com/spryker/docker-sdk.git ./docker
```
 
* After enabling a service, make sure to apply the new configuration:
    1. Bootstrap docker setup:
    ```bash
    docker/sdk boot {deploy.yml | deploy.dev.yml}
    ```

    2. Once the job finishes, build and start the instance:
    ```bash
    docker/sdk up
    ```




{% endinfo_block %}

## MySQL
[MySQL](https://www.mysql.com) is an open source relational database management system based on Structured Query Language (SQL). MySQL enables data to be stored and accessed across multiple storage engines, including InnoDB, CSV and NDB. MySQL is also capable of replicating data and partitioning tables for better performance and durability.

See [MySQL documentation](https://dev.mysql.com/doc/) for more details.

In Docker SDK, [PostgreSQL](https://www.postgresql.org) is provided as a service by default, but you can switch to MySQL as described below.

### Configuration
Follow the steps below to switch database engine to MySQL:
1. Adjust `deploy.*.yml` in the `services:` section:
```yaml
...
services:
    database:
        engine: mysql
...
```
2. Regenerate demo data:
```bash
docker/sdk clean-data
docker/sdk demo-data
```

## ElasticSearch

[Elasticsearch](https://www.elastic.co/elasticsearch/) is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents. 

See:
* [Configuring Elasticsearch](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-interaction/search/search-configur) to learn more about Elastcisearch configuration in Spryker.
* [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) for more information on Elasticsearch.

### Configuration

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

### Configuration
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
2. Adjust host file:
```bash
echo "127.0.0.1 kibana.spryker.local" | sudo tee -a /etc/hosts
```

## RabbitMQ

RabbitMQ is a messaging broker - an intermediary for messaging. It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.

### Configuration

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

[Swagger UI](https://swagger.io/tools/swagger-ui/) allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client-side consumption.

See [Swagger UI documentation](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/) for more details.

In Docker SDK, Swagger UI is provided as a service by default.

### Rest API Reference in Spryker

Spryker provides the basic functionality to generate [OpenApi schema specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) for REST API endpoints. This document provides an overview of REST API endpoints. For each endpoint, you will find the URL, REST request parameters as well as the appropriate request and response data formats.

### Configuration
Follow the steps to configure an endpoint for Swagger UI:
1. Adjust `deploy.*.yml` in the `services:` section:
```yml	
services:
    ...
    swagger:
        engine: swagger-ui
        endpoints:
            {custom_endpoint}:
```

2. Adjust the `host` file:
```bash
echo "127.0.0.1 {custom_endpoint}" | sudo tee -a /etc/hosts
```

## Redis

[Redis](https://redis.io) is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. 

See [Redis documentation](https://redis.io/documentation) for more details.
### Configuration

Adjust `deploy.*.yml` in the `services:` section to open the port used for accessing Redis:
```yml
services:
    key_value_store:
        engine: redis
        endpoints:
            localhost:16379:
                protocol: tcp
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
### Configuration
Adjust `deploy.*.yml` in the `services:` section to specify a custom endpoint:
```yml
services:
        ...
        mail_catcher:
                engine: mailhog
                endpoints:
                          {custom_endpoint}:
```

