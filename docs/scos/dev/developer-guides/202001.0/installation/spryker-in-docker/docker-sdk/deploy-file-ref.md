---
title: Deploy File Reference - 1.0
originalLink: https://documentation.spryker.com/v4/docs/deploy-file-reference-10
redirect_from:
  - /v4/docs/deploy-file-reference-10
  - /v4/docs/en/deploy-file-reference-10
---

This reference page describes version 1 of the Deploy file format. This is the newest version.

## Glossary

**Deploy file**

>A YAML file defining Spryker infrastructure and services for Spryker tools used to deploy Spryker applications in different environments.

**Region**

> Defines one or more isolated instances of Spryker applications that have only one persistent database to work with; limits the visibility of a project's **Stores** to operate only with the **Stores** that belong to a **Region**; refers to geographical terms like data centers, regions and continents in the real world.

**Group**

> Defines a group of Spryker applications within a **Region** that is scaled separately from other groups; can be assumed as an auto scaling group in the Cloud.

**Store**

>A store related context a request is processed in.

**Application**

>A Spryker application, like Zed, Yves or Glue.

**Service**

> An external storage or utility service. Represents service type and configuration. The configuration can be defined on different levels: project-wide, region-wide, store-specific or endpoint-specific with limitations based on the service type.

**Endpoint**

> A point of access to **Application** or **Service**. The key format is `domain[:port]`. By default, the port for HTTP endpoints is 80 . Port is mandatory for TCP endpoints.

## Deploy File Structure

The topics below are organized alphabetically for top-level keys and sub-level keys to describe the hierarchy.

You can use the extended YAML syntax according to [YAML™ Version 1.2](https://yaml.org/spec/1.2/spec.html).
Find B2B/B2C deploy file examples for [development](https://documentation.spryker.com/v4/docs/modes-overview#development-mode) and [demo](https://documentation.spryker.com/v4/docs/modes-overview#demo-mode) environments in the table:

| Development mode | Demo mode |
| --- | --- |
| [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.dev.yml) | [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.yml) |
| [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.dev.yml) | [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.yml) |

***
**version**:

Defines the version of the Deploy file format.

This reference page describes the Deploy file format for versions 1.*.

```yaml
version: 1.0

namespace: spryker-demo
...
```
{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`version: "0.1"`



{% endinfo_block %}

***

**namespace**:

Defines the namespace to separate different deployments in a single environment.

For example, Docker images, containers and volume names start with a `namespace:` to avoid intersections between different deployments on a single host machine.

```yaml
version: 1.0
namespace: spryker-demo
```
{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`namespace: spryker`



{% endinfo_block %}
***

**tag**:

Defines a tag to separate different boots for a single deployment.

By default, the tag is a randomly generated, unique value.

For example, Docker images and volumes are tagged with a `tag:` to avoid intersections between different boots for a signle deployment on a single host machine. The tag can be set directly in the deploy file to ensure that all the boots of a deployment run with the same images and volumes.
```yaml
version: 1.0

tag: '1.0'
```
```yaml
version: 1.0

tag: 'custom-one'
```
{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`tag: '1.0'`



{% endinfo_block %}

***

**environment**:

Defines the environment name for Spryker applications mainly to point to specific configuration files, namely `config/Shared/config-default_%environment_name%{store}.php`.

The `APPLICATION_ENV` environment variable is set for all the corresponding Spryker applications.
```yaml
version: 1.0

environment: 'docker'
```

{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`environment: 'docker'`



{% endinfo_block %}

***

**image**:

Defines the Docker image to run Spryker applications in. It can be set according to tags for the `spryker/php` images located at [Docker Hub](https://hub.docker.com/r/spryker/php/tags). Possible values are:
1. `spryker/php:7.2` - applies the default image (currently, it is Debian).

2. `spryker/php:7.2-debian` - applies Debian as a base image.

3. `spryker/php:7.2-alpine` - applies Alpine as a base image. The Alpine images are smaller, but you may have issues with:
    * iconv
    * NFS 
    * Non-lating languages
    * Tideways

```yaml
version: 1.0

image:  spryker/php:7.2
```

{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`image: spryker/php:7.2`



{% endinfo_block %}
***

**regions**:

Defines the list of **Regions**.

<a name="regions-services"></a>
* `regions: services:` - defines settings for **Region**-specific `services:`. Only `database:` is currently allowed here.
* `regions: stores:` - defines the list of **Stores**.
<a name="regions-stores-services"></a>
* `regions: stores: services:` - defines application-wide, **Store**-specific settings for **Services**. Only `broker:`, `key_value_store:` and `search:` are currently allowed here. See [services:](#services-reference) to learn more.

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

Defines the list of **Groups**.

* `groups: region:` - defines the relation to a **Region** by key.
* `groups: applications:` - defines the list of **Applications**. See [groups: applications:](#groups-applications) to learn more.

```yaml
version: "1.0"

groups:
	BACKEND-1:
		region: REGION-1
		applications:
			zed_1:
				application: zed
				endpoints:
					zed.store1.spryker.local:
						store: STORE-1
						services:
							# Application-Store-specific services settings
					zed.store2.spryker.local:
						store: STORE-2
						services:
							# Application-Store-specific services settings
	STOREFRONT-1:
		region: REGION-1
		applications:
			yves_1:
				application: yves
				endpoints:
					yves.store1.spryker.local:
						store: STORE-1
						services:
							# Application-Store-specific services settings
					yves.astore2t.spryker.local:
						store: STORE-2
						services:
							# Application-Store-specific services settings
			glue_1:
				application: glue
				endpoints:
					glue.store1.spryker.local:
						store: STORE-1
					glue.store2.spryker.local:
						store: STORE-2
		
 ```

Applications can be defined as **Store**-agnostic, as in the example above. Also, applications can be defined as **Store**-specific by leaving a single endpoint pointing to each application. You can see it in the example below. You can use both approaches to scale applications separately by **Store**.
```yaml
version: "1.0"

groups:
	BACKEND-1:
		region: REGION-1
		applications:
			zed_store_1:
				application: zed
				endpoints:
					zed.store1.spryker.local:
						store: STORE-1
			zed_store_2:
				application: zed
				endpoints:
					zed.store2.spryker.local:
						store: STORE-2
		
 ```

***
<a name="groups-applications"></a>
**groups: applications**:

Defines the list of **Applications**.

The key must be project-wide unique.

Each `application:` should contain the following:

* `groups: applications: application:` - defines the type of **Application**. Possible values are `Zed`, `Yves` and `Glue`.
* `groups: applications: endpoints:` - defines the list of **Endpoints** to access the **Application**. See [groups: applications: endpoints:](#groups-applications-endpoints) to learn more.

***
<a name="services-reference"></a>
**services:**

Defines the list of **Services** and their project-wide settings.

Each service has its own set of settings to be defined. See [Services](#services) to learn more.

Find common settings for all services below:

* `engine:` - defines a third-party application supported by Spryker that does the job specific for the **Service**. For example, you can currently set database `engine:` to `postgres` or `mysql`.
* `endpoints:` - defines the list of **Endpoints** that point to the **Service** web interface or port.
* `version:` - defines the version of the service to be installed.
{% info_block infoBox "Optional variable" %}
If not specified, the [default version](https://github.com/spryker/docker-sdk#supported-services
{% endinfo_block %} applies. )

```yaml
services:
database:
	engine: postgres
	version: 9.6
	root:
		username: "root"
		password: "secret"

broker:
	engine: rabbitmq
	api:
		username: "root"
		password: "secret"
	endpoints:
		queue.spryker.local:

	session:
		engine: redis
		version: 5.0

	key_value_store:
		engine: redis

	search:
		engine: elastic
		version: 6.8

	scheduler:
		engine: jenkins
		version: 2.176
		endpoints:
			scheduler.spryker.local:

	mail_catcher:
		engine: mailhog
		endpoints:
			mail.spryker.local:
 ```
:::(Warning)
After changing a service version, make sure to re-import demo data:
1. Remove all Spryker volumes:
```shell
docker/sdk clean-data
```

2. Populate Spryker demo data:
```shell
docker/sdk demo-data
```
:::
Service settings can be extended on other levels for specific contexts. See [regions: services:](#regions-services), [regions: stores: services:](#regions-stores-services) and [groups: applications: endpoints: services:](groups-applications-endpoints-services) to learn more.

***
<a name="groups-applications-endpoints"></a>
**groups: applications: endpoints:**

Defines the list of **Endpoints** to access the **Application**.

The format of the key  is `domain[:port]`. The key must be project-wide unique.
* `groups: applications: endpoints: store:` defines the **Store** as context to process requests within.
<a name="groups-applications-endpoints-services"></a>
* `groups: applications: endpoints: services:` defines the **Store**-specific settings for services. Only `session:` is currently allowed here. See [Services](#services) to learn more.

**services: endpoints:**
Defines the list of **Endpoints** to access a **Service** for development or monitoring needs. The format of the key  is `domain[:port]`. The key must be project-wide unique.
* `services: endpoints: protocol:` defines the protocol. Possible values are: `tcp`and `http`. The default one is `http`.

A port must be defined if protocol is set to `tcp`. The TCP port must be project-wide unique.

***

**docker**:

Defines the settings for Spryker Docker SDK tools to make deployment based on Docker containers.
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
    
**docker: docker-machine:**
Defines the virtualization engine to be used for the overall development environment. Possible values are:
1. `docker:`.
2. `parallels:`
[Parallels](https://www.parallels.com/) requires a paid license to be used. 

When no engine is defined in `deploy.yml`, the Docker Engine is used.
***
**docker: ssl:**

Defines configuration for SSL module in Spryker Docker SDK.

If `docker: ssl: enabled:` is set to `true`, all endpoints use HTTPS.
```yaml
version: 1.0

docker:
	ssl:
		enabled: true
		
 ```
{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`enabled: false`



{% endinfo_block %}

To enable secure connection in your browser, register the self-signed CA certificate from `./docker/generator/openssl/default.crt` in your system.


***

**docker: debug:**

Defines the configuration for debugging.

If `docker: debug: enabled:` is set to `true`, all applications work in debugging mode.
```yaml
version: 1.0

docker:
	debug:
		enabled: true
		
 ```

***
**docker: logs:**
* `docker: logs: path:` defines the path to the directory with Docker logs.

{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`path: '/var/log/spryker'`



{% endinfo_block %}

***
**docker: testing:**

Defines the configuration for testing.

* `docker: testing: store:` defines a **Store** as the context for running tests using specific console commands, like `docker/sdk console code:test`.

{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`store: DE`



{% endinfo_block %}
***

**docker: mount**

Defines the mode for mounting source files into application containers.

1. `baked:`- source files are copied into the image, so they cannot be changed from host machine.
{% info_block infoBox "Optional variable" %}

If not specified, the default value applies:
`baked:baked`



{% endinfo_block %}
2. `native:`- source files are mounted from host machine into containers directly. We recommend using it Linux.
3. `docker-sync:`- source files are synced from host machine into containers during runtime. Use it as a workaround solution with MacOS and Windows.
4.  `mutagen:`- source files are synced from host machine into containers during runtime. Use it as a workaround solution with MacOS and Windows.

`As mount:` is a platform-specific setting. You can define multiple mount modes. Use the`platforms:` list to define the mount mode for a particular platform. Possible platforms are `windows`, `macos` and `linux`.

The first mount mode matching the host platform is selected by default.
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
 
**composer:**

Defines the composer settings to be used during deployment.

1. `mode:` - defines whether packages should be installed from the  `require` or `require-dev` section of `composer.json`. Possible values are `--no-dev`and `-dev`.

2. `autoload:` - defines composer autoload options. Possible values are `--optimize` and `--classmap-authoritative`.


 
{% info_block infoBox "Optional variable" %}

If not specified, the default values apply:

1. Development mode:
    * `mode: --dev`
    * `autoload: --optimize`
2. Demo mode:
    * `mode: --no-dev`
    * `autoload: --classmap-authoritative`

{% endinfo_block %}

***

### Services

You can configure and use external tools that are shipped with Spryker in Docker as services.
If a service has a dedicated configuration, it is configured and run when the current environment is set up and executed.


The following services are supported:

*     database
*     broker
*     session
*     key_value_store
*     scheduler
*     swagger-ui
*     mail_catcher

**database:**

An SQL database management system **Service**.

* Project-wide

  - `database: engine:` - possible values are `postgres`and `mysql`.
  - `database: root: username:`, `database: root: password:` - defines the user with root privileges.
  - `database: endpoints:` - defines the service's port that can be accessed via given endpoints.

* Region-specific

  - `database: database:` - defines database name.
  - `database: username:`, `database: password:` - defines database credentials.


***

**broker:**

A message broker **Service**.

* Project-wide

  - `broker: engine:` - possible values is `rabbitmq`.
  - `broker: api: username`, `database: api: password:` - defines the credentails for the message broker's API.
  - `broker: endpoints:` - defines the service's port or/and web-interface that can be accessed via given endpoints.

* Store-specific

  - `broker: namespace:` - defines a namespace (virtual host).
  - `broker: username:`, `broker: password:` - defines the credentials to access the namespace (virtual host) defined by `broker: namespace:`.


***

**session:**

A key-value store **Service** for storing session data.

* Project-wide

  - `session: engine:` - possible values is `redis`.
  - `session: endpoints:` - defines the service's port that can be accessed via given endpoints.

* Endpoint-specific

  - `session: namespace:` - defines a namespace (number for Redis).


***

**key_value_store:**

A key-value store **Service** for storing business data.

* Project-wide

  * `key_value_store: engine:` - possible value is: `redis`.
  * `session: endpoints:` - defines the service's port that can be accessed via given endpoints.

* Store-specific

  * `key_value_store: namespace:` - defines a namespace (number for Redis).


***

**scheduler:**

A scheduler **Service** used to run application-specific jobs periodically in the background.

* Project-wide

  * `scheduler: engine:` - possible value is `jenkins`.
  * `scheduler: endpoints:` - defines the service's port or/and web interface that can be accessed via given endpoints.


***
**swagger:**

The swagger-ui **Service** used to run Swagger UI to develop API endpoints.

* Project-wide
    * `swagger: engine:`- possible value is `swagger-ui`.
    * `swagger-ui: endpoints:` - defines the service's port or/and web interface that can be accessed via given endpoints.
        
***

**mail_catcher:**

A mail catcher **Service** used to catch all outgoing emails for development or testing needs.

* Project-wide

     - `mail_catcher: engine:` - possible value is `mailhog`.
     - `mail_catcher: endpoints:`- defines the service's port or/and web interface that can be accessed via given endpoints.

***

### Change log

* Initial reference document is introduced.
