---
title: Deploy File Reference - 1.0
originalLink: https://documentation.spryker.com/v3/docs/deploy-file-reference-version-1-201907
redirect_from:
  - /v3/docs/deploy-file-reference-version-1-201907
  - /v3/docs/en/deploy-file-reference-version-1-201907
---

{% info_block infoBox %}
This reference page describes version 1 of the Deploy file format. This is the newest version.
{% endinfo_block %}

## Glossary

**Deploy file**

>A YAML file defining Spryker infrastructure and services for Spryker tools used to deploy Spryker applications in different environments.

**Region**

> Defines the isolated instance(s) of Spryker applications that has only one persistent database to work with; limits the visibility of project's **Stores** to operate only with the **Stores** that belong to a **Region**; refers to geographical terms like data centers/regions/continents in the real world.

**Group**

> Defines a group of Spryker applications within a **Region** that is scaled separately from other groups; can be assumed as an auto scaling group in the Cloud.

**Store**

>A store-related context in which a request is processed.

**Application**

>A Spryker application, like Zed, Yves or Glue.

**Service**

> An external storage or utility service. Represents the type and configuration of a service. Configuration can be defined on different levels: project-wide, region-wide, store-specific or endpoint-specific with limitations depending on the service type.

**Endpoint**

> A point of access to **Application** or **Service**. Key format: `domain[:port]`. By default, the port for HTTP endpoints is 80 . Port is mandatory for TCP endpoints.

## Deploy file structure

The topics here are organized alphabetically for top-level keys along with sub-level keys to describe the hierarchy.

You can use extended YAML syntax according to [YAML™ Version 1.2](https://yaml.org/spec/1.2/spec.html).
Find B2B/B2C deploy file examples for development and demo environments in the table:

| Development mode | Demo mode |
| --- | --- |
| [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.dev.yml) | [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.yml) |
| [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.dev.yml) | [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.yml) |

**version**:

Defines the version of the Deploy file format.

This reference page describes the Deploy file format for versions 1.*.

```yaml
version: 1.0

namespace: spryker-demo
...
```

***

**namespace**:

Defines the namespace to separate different deployments in the same environment.

For example, Docker images, containers and volume names start with a namespace: to avoid intersections between different deployments on the same host machine.

```yaml
version: 1.0
namespace: spryker-demo
```

***

**tag**:

Defines a tag to separate different boots for the same deployment.

By default, the tag is a randomly generated, unique value.

For example, Docker images and volumes are tagged with a  tag: to avoid intersections between different boots for the same deployment on the same host machine. The tag can be set directly in the deploy file to ensure that all the boots of the same deployment run with the same images and volumes.
```yaml
version: 1.0

tag: '1.0'
```
```yaml
version: 1.0

tag: 'custom-one'
```

***

**environment**:

Defines the environment name for Spryker applications mainly to point to specific configuration files, namely `config/Shared/config-default_%environment_name%{store}.php`.

APPLICATION_ENV environment variable will be set for all the corresponding Spryker applications.
```yaml
version: 1.0

environment: 'docker'
```

***

**image**:

Defines the Docker image to run Spryker applications in. It can be set according to tags for `spryker/php` images located at [Docker Hub](https://hub.docker.com/r/spryker/php/tags). Here, you can define custom images.
```yaml
version: 1.0

image: 'spryker/php:7.2'
```

***

**regions**:

Defines the list of **Regions**.

* `regions: services:` - defines settings for **Region**-specific services:. Only `database:` is currently allowed here.
* `regions: stores:` - defines the list of **Stores**.
* `regions: stores: services:` - defines application-wide **Store**-specific settings for **Services**. Only broker:, `key_value_store:` and `search:` are currently allowed here. Refer to the **Services** section for more information.

```yaml
version: "1.0"

regions:
 REGION-1:
 services:
 # Region-specific services settings

 stores:
 STORE-1:
 services:
 # Store-specific services settings
 STORE-2:
 services:
 # Store-specific services settings
 ```

***

**groups**:

Defines the list of Groups.

* `groups: region:` - defines the link to a **Region** by key.
* `groups: applications:` - defines the list of **Applications**. For more information, see the **groups: applications**: section.

```yaml
version: "1.0"

groups:
 BACKEND-1:
 region: REGION-1
 applications:
 zed_1:
 application: zed
 endpoints:
 zed.store1.demo-spryker.com:
 store: STORE-1
 services:
 # Application-Store-specific services settings
 zed.store2.demo-spryker.com:
 store: STORE-2
 services:
 # Application-Store-specific services settings
 STOREFRONT-1:
 region: REGION-1
 applications:
 yves_1:
 application: yves
 endpoints:
 yves.store1.demo-spryker.com:
 store: STORE-1
 services:
 # Application-Store-specific services settings
 yves.astore2t.demo-spryker.com:
 store: STORE-2
 services:
 # Application-Store-specific services settings
 glue_1:
 application: glue
 endpoints:
 glue.store1.demo-spryker.com:
 store: STORE-1
 glue.store2.demo-spryker.com:
 store: STORE-2
 ```

Applications can be defined as **Store**-agnostic, as in example above. Also applications can be defined as **Store**-specific, as in example below, by leaving only one endpoint pointing to the application. The approaches can be mixed in order to scale applications separately by **Store**.
```yaml
version: "1.0"

groups:
 BACKEND-1:
 region: REGION-1
 applications:
 zed_store_1:
 application: zed
 endpoints:
 zed.store1.demo-spryker.com:
 store: STORE-1
 zed_store_2:
 application: zed
 endpoints:
 zed.store2.demo-spryker.com:
 store: STORE-2
 ```

***

**groups: applications**:

Defines the list of **Applications**.

The key must be project-wide unique.

Each `application:` should contain:

* `groups: applications: application:` - defines the type of **Application**. Possible values are `Zed`, `Yves` and `Glue`.
* `groups: applications: endpoints:` - defines the list of **Endpoints** to access the **Application**. For more information, see the **groups: applications: endpoints:** section.

***

**services:**

Defines the list of **Services** and their project-wide settings.

Each service has its own set of settings to be defined. Refer to the Services section for more details.

Common settings for all services are:

* `engine:` - defines a third-party application supported by Spryker that does the job specific for the **Service**. E.g. you can currently set database engine to postgres or mysql.
* `endpoints:` - defines a list of **Endpoints** that point to the **Service** web interface or service's port.

```yaml
    services:
database:
 engine: postgres
 root:
 username: "root"
 password: "secret"

broker:
 engine: rabbitmq
 api:
 username: "root"
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
 ```

Service's settings can be extended on other levels for specific contexts. Refer to  regions: services:, regions: stores: services:, groups: applications: endpoints: services: sections.

***

**groups: applications: endpoints:**

Defines the list of **Endpoints** to access the **Application**.

The key format is "domain[:port]". The key must be project-wide unique.

* `services: endpoints: protocol:` defines the protocol. Possible values: `tcp`, `http`. The default one is `http`.

The port must be defined if protocol is set to tcp. The TCP port must be project-wide unique.

***

**docker**:

Defines settings for Spryker Docker SDK tools to make deployment based on Docker containers.
```yaml
version: 1.0

docker:

 ssl:
 enabled: true

 testing:
 store: STORE-1

 mount:
 baked:
 ```

***

**docker: ssl:**

Defines configuration for SSL module in Spryker Docker SDK.

In case when `docker: ssl: enabled:` set to true all endpoints work in HTTPS mode.
```yaml
version: 1.0

docker:
 ssl:
 enabled: true
 ```
Register self-sighed CA certificate from `./docker/generator/openssl/default.crt` in your system in order to have trusted connections in browser.

***

**docker: debug:**

Defines configuration for debugging.

In case when `docker: debug: enabled:` set to true all applications work in debugging mode.
```yaml
version: 1.0

docker:
 debug:
 enabled: true
 ```

***

**docker: testing:**

Defines configuration for testing.

* `docker: testing: store:` defines the <b>Store** as context for running tests using specific console commands, like `docker/sdk console code:test`.</b>

***

**docker: mount**

Defines the mode for mounting source files into the application containers.

1. `baked:` - source files are copied into image, so they cannot be changed from host machine.
2. `native:` - source files are mounted from host machine into containers directly. Works perfectly with Linux.
3. `docker-sync:` - source files are synced from host machine into containers during runtime. Works as a workaround solution with MacOS and Windows.

`As mount:` is a platform-specific setting, it is possible to define multiple mount modes. The mount mode for a particular platform can be specified by using platforms: list. Possible platforms are windows, macos and linux. Check the example below.

The first mount mode matching the host platform is chosen. 
```yaml
version: 1.0

docker:
 mount:
 native:
 platforms:
 - linux

 docker-sync:
 platforms:
 - macos
 - windows
 ```

***

### Services

**database:**

The SQL DBMS **Service**.

* Project-wide

  - `database: engine:` - possible values are: `postgres`, `mysql`.
  - `database: root:` username, database: root: password: - defines the user with root privileges.
  - `database: endpoints:` - can be defined to expose service's port that can be accessed from outside via given endpoints.

* Region-specific

  - `database: database:` - defines database name.
  - `database: username:, database: password:` - defines database credentials.


***

**broker:**

The message broker **Service**.

* Project-wide

  - `broker: engine:` - possible values are: `rabbitmq`.
  - `broker: api: username, database: api: password:` - defines the user for Broker's API.
  - `broker: endpoints:` - can be defined to expose service's port or/and web-interface that can be accessed from outside via given endpoints.

* Store-specific

  - `broker: namespace:` - defines a namespace (virtual host).
  - `broker: username:, broker: password:` - defines credentials to access the namespace (virtual host)


***

**session:**

The key-value store **Service** for storing session data.

* Project-wide

  - `session: engine:` - possible values are: `redis`.
  - `session: endpoints:` - can be defined to expose service's port that can be accessed from outside by given endpoints.

* Endpoint-specific

  - `session: namespace:` - defines a namespace (number for redis).


***

key_value_store:

The key-value store <b>Service** for storing business data.</b>

* Project-wide

  - `key_value_store: engine:` - possible values are: `redis`.
  - `session: endpoints:` - can be defined to expose service's port that can be accessed from outside via given endpoints.

* Store-specific

  - key_value_store: namespace: - defines a namespace (number for redis).


***

**scheduler:**

The scheduler **Service** to run application-specific jobs periodically in the background.

* Project-wide

  - `scheduler: engine:` - possible values are: jenkins.
  - `scheduler: endpoints:` - can be defined to expose service's port or/and web interface that can be accessed from outside via given endpoints.


***

**mail_catcher:**

The mail catcher **Service** to catch all outgoing emails for development or testing needs.

    * Project-wide

     - `mail_catcher: engine:` - possible values are: mailhog.
     - `mail_catcher: endpoints:`- can be defined to expose service's port or/and web interface that can be accessed from outside via given endpoints.


***

### Change log

* Initial reference document is introduced.

