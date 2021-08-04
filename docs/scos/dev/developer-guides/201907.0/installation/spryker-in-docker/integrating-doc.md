---
title: Integrating Docker into an Existing Project
originalLink: https://documentation.spryker.com/v3/docs/integrating-docker-into-an-existing-project-201907
redirect_from:
  - /v3/docs/integrating-docker-into-an-existing-project-201907
  - /v3/docs/en/integrating-docker-into-an-existing-project-201907
---



This page describes how you can convert an existing non-docker based project into a docker based one. If you want to install Spryker Commerce OS in Docker from scratch, start from [Getting Started with Docker](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/getting-started).

## Prerequisites

To start Docker integration into your project, overview and install the necessary features:

| Name | Feature | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Feature](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/spryker-core-fe) |

## Set up .dockerignore

Create a new [`.dockerignore`](https://docs.docker.com/engine/reference/builder/#dockerignore-file)file to match the project file structure.
```yaml
.git
.idea
node_modules
/vendor
/data
!/data/import
.git*
.unison*
/.nvmrc
/.scrutinizer.yml
/.travis.yml
/newrelic.ini

/docker
!/docker/deployment/
```

## Set up Configuration

Under `config/Shared`, adjust or create a configuration file which depends on the environment name.

As the Docker configuration file is too big, find a ready-made working example in [config_default-docker.php](https://github.com/spryker-shop/b2c-demo-shop/blob/master/config/Shared/config_default-docker.php). Also, the configuration has to be adjusted for specific store(s), e.g [`config_default-docker_DE.php`](https://github.com/spryker-shop/b2c-demo-shop/blob/master/config/Shared/config_default-docker_DE.php).

## Set up Deploy File

[Deploy file](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-sdk/deploy-file-ref) is a YAML file defining Spryker infrastructure and services for Spryker tools used to deploy Spryker applications in different environments.

It's possible to create an unlimited amount of deployment files with different configuration settings, e.g `deploy.yml` for demo mode or `deploy.dev.yml` for development mode.

Find an example of deploy file for demo mode (DE, AT, and US stores) below:
<details open>
    <summary>deploy.yml</summary>

```yaml
 version: "0.1"

namespace: spryker_b2c
tag: '1.0'

environment: docker
image: spryker/php:7.2

regions:
 EU:
 services:
 database:
 database: eu-docker
 username: spryker
 password: secret

 stores:
 DE:
 services:
 broker:
 namespace: de-docker
 key_value_store:
 namespace: 1
 search:
 namespace: de_search
 AT:
 services:
 broker:
 namespace: at-docker
 key_value_store:
 namespace: 2
 search:
 namespace: at_search
 US:
 services:
 database:
 database: us-docker
 username: spryker
 password: secret
 stores:
 US:
 services:
 broker:
 namespace: us-docker
 key_value_store:
 namespace: 3
 search:
 namespace: us_search
groups:
 EU:
 region: EU
 applications:
 yves_eu:
 application: yves
 endpoints:
 yves.de.demo-spryker.com:
 store: DE
 services:
 session:
 namespace: 1
 yves.at.demo-spryker.com:
 store: AT
 services:
 session:
 namespace: 2
 glue_eu:
 application: glue
 endpoints:
 glue.de.demo-spryker.com:
 store: DE
 glue.at.demo-spryker.com:
 store: AT
 zed_eu:
 application: zed
 endpoints:
 zed.de.demo-spryker.com:
 store: DE
 services:
 session:
 namespace: 3
 zed.at.demo-spryker.com:
 store: AT
 services:
 session:
 namespace: 4
 US:
 region: US
 applications:
 yves_us:
 application: yves
 endpoints:
 yves.us.demo-spryker.com:
 store: US
 services:
 session:
 namespace: 5
 glue_us:
 application: glue
 endpoints:
 glue.us.demo-spryker.com:
 store: US
 zed_us:
 application: zed
 endpoints:
 zed.us.demo-spryker.com:
 store: US
 services:
 session:
 namespace: 6
services:
 database:
 engine: postgres
 root:
 username: "root"
 password: "secret"
 broker:
 engine: rabbitmq
 api:
 username: "spryker"
 password: "secret"
 endpoints:
 queue.demo-spryker.com:
 session:
 engine: redis
 key_value_store:
 engine: redis
 search:
 engine: elastic
 scheduler:
 engine: jenkins
 endpoints:
 scheduler.demo-spryker.com:
 mail_catcher:
 engine: mailhog
 endpoints:
 mail.demo-spryker.com:

docker:

 ssl:
 enabled: false

 testing:
 store: DE

 mount:
 baked:
```
</details>

Find an example of deploy file for development mode (DE, AT, and US stores) below:

<details open>
    <summary>deploy.dev.yml</summary>

 ```yaml
version: "0.1"

namespace: spryker_b2c_dev
tag: 'dev'

environment: docker
image: spryker/php:7.2

regions:
 EU:
 services:
 database:
 database: eu-docker
 username: spryker
 password: secret

 stores:
 DE:
 services:
 broker:
 namespace: de-docker
 key_value_store:
 namespace: 1
 search:
 namespace: de_search
 AT:
 services:
 broker:
 namespace: at-docker
 key_value_store:
 namespace: 2
 search:
 namespace: at_search
 US:
 services:
 database:
 database: us-docker
 username: spryker
 password: secret
 stores:
 US:
 services:
 broker:
 namespace: us-docker
 key_value_store:
 namespace: 3
 search:
 namespace: us_search
groups:
 EU:
 region: EU
 applications:
 yves_eu:
 application: yves
 endpoints:
 yves.de.demo-spryker.com:
 store: DE
 services:
 session:
 namespace: 1
 yves.at.demo-spryker.com:
 store: AT
 services:
 session:
 namespace: 2
 glue_eu:
 application: glue
 endpoints:
 glue.de.demo-spryker.com:
 store: DE
 glue.at.demo-spryker.com:
 store: AT
 zed_eu:
 application: zed
 endpoints:
 zed.de.demo-spryker.com:
 store: DE
 services:
 session:
 namespace: 3
 zed.at.demo-spryker.com:
 store: AT
 services:
 session:
 namespace: 4
 US:
 region: US
 applications:
 yves_us:
 application: yves
 endpoints:
 yves.us.demo-spryker.com:
 store: US
 services:
 session:
 namespace: 5
 glue_us:
 application: glue
 endpoints:
 glue.us.demo-spryker.com:
 store: US
 zed_us:
 application: zed
 endpoints:
 zed.us.demo-spryker.com:
 store: US
 services:
 session:
 namespace: 6
services:
 database:
 engine: postgres
 root:
 username: "root"
 password: "secret"
 endpoints:
 localhost:5432:
 protocol: tcp
 broker:
 engine: rabbitmq
 api:
 username: "spryker"
 password: "secret"
 endpoints:
 queue.demo-spryker.com:
 session:
 engine: redis
 key_value_store:
 engine: redis
 search:
 engine: elastic
 scheduler:
 engine: jenkins
 endpoints:
 scheduler.demo-spryker.com:
 mail_catcher:
 engine: mailhog
 endpoints:
 mail.demo-spryker.com:

docker:

 ssl:
 enabled: false

 testing:
 store: DE

 debug:
 enabled: true

 mount:
 native:
 platforms:
 - linux

 docker-sync:
 platforms:
 - macos
 - windows
```
</details>

## Set up Installation Script

Under `config/Shared`, prepare the installation recipe<!--(https://documentation.spryker.com/v4/docs/install-tool)--> that defines the way Spryker should be installed.

Find  installation recipe examples below:
* [B2B Dmo Shop installation recipe](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.yml)
* [B2C Demo Shop installation recipe](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.yml)

## Start Developing

Follow the instructions in [Docker SDK](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-sdk/docker-sdk) to start working with Docker.
