---
title: Deploy file reference
description: Use this reference to create a deploy file for building environment for Spryker in Docker.
last_updated: Dec 13, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/deploy-file-reference-10
originalArticleId: 9bba41b4-3fc7-4129-a2b7-8e98d32b5f20
redirect_from:
  - /docs/scos/dev/the-docker-sdk/202311.0/deploy-file/deploy-file-reference-1.0.html
  - /docs/scos/dev/the-docker-sdk/202204.0/deploy-file-reference-1.0.html
  - /docs/scos/dev/installation/spryker-in-docker/docker-sdk/deploy-file-reference-1.0.html
  - /docs/scos/dev/the-docker-sdk/202204.0/deploy-file/deploy-file-reference-1.0.html
  - /docs/scos/dev/the-docker-sdk/202204.0/deploy-file-reference-1.0.html
  - /docs/scos/dev/installation/spryker-in-docker/docker-sdk/deploy-file-reference-1.0.html
  - /docs/scos/dev/the-docker-sdk/202307.0/deploy-file/deploy-file-reference-1.0.html
  - /docs/scos/dev/the-docker-sdk/202212.0/deploy-file/deploy-file-reference-1.0.html


related:
  - title: Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html
  - title: Deploy file inheritance—common use cases
    link: docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-inheritance-common-use-cases.html
  - title: Deploy file
    link: docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html
---


This reference page describes version 1 of the Deploy file format. This is the newest version.
<div class="bg-section">
<h2> Glossary</h2>
<dl>
 <dt>Deploy file</dt>
 <dd>A YAML file defining Spryker infrastructure and services for Spryker tools used to deploy Spryker applications in different environments.</dd>

 <dt>Region</dt>
 <dd>Defines one or more isolated instances of Spryker applications that have only one persistent database to work with; limits the visibility of a project's <i>Stores</i> to operate only with the <i>Stores</i> that belong to a <i>Region</i>; refers to geographical terms like data centers, regions and continents in the real world.</dd>

 <dt>Group</dt>
 <dd>Defines a group of Spryker applications within a <i>Region</i> that is scaled separately from other groups; can be assumed as an auto scaling group in the Cloud.</dd>

 <dt>Store</dt>
 <dd>A store related context a request is processed in.</dd>

<!-- vale off -->

<dt>Application</dt>
<dd>A Spryker application, like Backoffice(Zed), Backend-Gateway, Yves, GlueStorefront(Glue), GlueBackend or MerchantPortal.</dd>

<!-- vale on -->

 <dt>Service</dt>
 <dd>An external storage or utility service. Represents service type and configuration. The configuration can be defined on different levels: project-wide, region-wide, store-specific or endpoint-specific with limitations based on the service type.</dd>

 <dt>Endpoint</dt>
 <dd>A point of access to <i>Application</i> or <i>Service</i>. The key format is <code>domain[:port]</code>. By default, the port for HTTP endpoints is 80 . Port is mandatory for TCP endpoints.</dd>

</dl>
</div>

## Deploy file structure

The topics below are organized alphabetically for top-level keys and sub-level keys to describe the hierarchy.

You can use the extended YAML syntax according to [YAML™ Version 1.2](https://yaml.org/spec/1.2/spec.html).
Find B2B and B2C deploy file examples for [development](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html#development-mode) and [demo](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html#demo-mode) environments in the table:

| DEVELOPMENT MODE | DEMO MODE |
| --- | --- |
| [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.dev.yml) | [B2C Demo Shop deploy file](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.yml) |
| [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.dev.yml) | [B2B Demo Shop deploy file](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.yml) |

***

<!-- markdownlint-disable -->

### version:

Defines the version of the Deploy file format.

This reference page describes the Deploy file format for versions 1.*.

This variable is optional. If not specified, the default value applies: `version: "0.1"`.

```yaml
version: 1.0

namespace: spryker-demo
...
```

***

### namespace:

Defines the namespace to separate different deployments in a single environment.

For example, Docker images, containers and volume names start with a `namespace:` to avoid intersections between different deployments on a single host machine.

This variable is optional. If not specified, the default value applies: `namespace: spryker`.

```yaml
version: 1.0
namespace: spryker-demo
```

***

### tag:

Defines a tag to separate different boots for a single deployment.

By default, the tag is a randomly generated, unique value.

For example, Docker images and volumes are tagged with a `tag:` to avoid intersections between different boots for a single deployment on a single host machine. The tag can be set directly in the deploy file to ensure that all the boots of a deployment run with the same images and volumes.

This variable is optional. If not specified, the default value applies: `tag: '1.0'`.

```yaml
version: 1.0

tag: '1.0'
```

```yaml
version: 1.0

tag: 'custom-one'
```

***

### environment:

Defines the environment name for Spryker applications mainly to point to specific configuration files, namely `config/Shared/config-default_{environment_name}_{store}.php`.

The `APPLICATION_ENV` environment variable is set for all the corresponding Spryker applications.

This variable is optional. If not specified, the default value applies: `environment: 'docker'`.

```yaml
version: 1.0

environment: 'docker'
```

***

### environment-configuration: secrets:

Defines secrets and their configuration:

* `environment-configuration: secrets: name:`—secret's name.
* `environment-configuration: secrets: grant:`—users' permissions. `limited` provides read while `public` provides read and write permissions. The default one is `limited`.
* `environment-configuration: secrets: bucket:`—defines what the secret is used for. The acceptable value is `app`.

***

### environment-configuration: params:

Defines parameters and their configuration:

* `environment-configuration: params: name:`—parameter's name.
* `environment-configuration: params: bucket:`—defines what the parameter  is used for. The acceptable value is `app`.
* `environment-configuration: params: default:`—parameter's default value. Accepts string, number, and json values.
* `environment-configuration: params: grant:`—IAM users' permissions. `limited` provides read while `public` provides read and write permissions. The default one is `limited`.

***


### imports:

Defines any of the following:

* Imports of additional deploy files to be included into a build. Supports imports of the same deploy file multiple times. To define a deploy file and dynamic parameters for this type of import, see [imports: {import_name}:](#imports-importname).

```yaml
imports:
    {import_name}:
    {import_name}:       
```     

* Additional deploy files to be included into a build. To define dynamic parameters for this type of import, see [imports: {deploy_file_name}:](#imports-deployfilename).

```yaml
version: 1.0
imports:
    {deploy_file_name}:
    {deploy_file_name}:
```

* An array of additional deploy files to be included into a build. Supports imports of the same deploy file multiple times. To define dynamic parameters for this type of import, see [imports: parameters:](#imports-parameters)

```yaml
imports:
    - template: {deploy_file_name}
    - template: {deploy_file_name}
```

The files must exist on a [project or base layer](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html).

{% info_block infoBox "Merged deploy files" %}

If you include a deploy file, the included deploy file is merged with the original one. The final deploy file is used to build the application. To check how the final deploy file looks without stopping containers, run `docker config {DEPLOY_FILE_NAME}`. For example, if your main deploy file is `deploy.dev.yml`, run `docker config deploy.dev.yml`. The command parses the included deploy files and returns the merged file and validation errors, if any.

{% endinfo_block %}

***

### imports: parameters:

Defines the [dynamic parameters](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html#dynamic-parameters) to be used when parsing the included deploy file. In the included deploy file, the parameter name should be wrapped in `%`.

```yaml
imports:
  - template: {deploy_file_name}
    parameters:
      {dynamic_parameter_name}: '{dynamic_parameter_value}'
      {dynamic_parameter_name}: '{dynamic_parameter_value}'
```            

Example:

```yaml
imports:
  - template: deploy.porject.yml
    parameters:
      env-name: 'dev'
      locale: 'en'
```

{% info_block warningBox "" %}

Affects the included deploy file that it follows in an array of included deploy files. To learn how you can add dynamic parameters for other types of imports, see [imports: {import_name}:](#imports-importname) and [imports: {deploy_file_name}:](#imports-deployfilename).

{% endinfo_block %}

***

### imports: {import_name}:

Defines the configuration of the import:

* `{import_name}: template:`—defines the deploy file to be included into a build  as part of this import.
* `{import_name}: parameters:`—defines the [dynamic parameters](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html#dynamic-parameters) to be used when parsing the included deploy file. In the included deploy file, the parameter name should be wrapped in `%`.

```yaml
imports:
    {import_name}:
        template: {deploy_file_name}
        parameters:
          {dynamic_parameter_name}: '{dynamic_parameter_value}'
          {dynamic_parameter_name}: '{dynamic_parameter_value}'
```

Example:

```yaml
imports:
    base:
        template: deploy.base.template.yml
        parameters:
          env_name: 'dev'
          locale: 'en'
```

***

### imports: {deploy_file_name}:

Defines the configuration to be used when parsing the included deploy file.

* `{deploy_file_name}: parameters:`—defines the [dynamic parameters](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html#dynamic-parameters) to be used when parsing the included deploy file. In the included deploy file, the parameter name should be wrapped in `%`.

```yaml
version: 1.0
imports:
    {deploy_file_name}:
      parameters:
        {dynamic_parameter_name}: '{dynamic_parameter_value}'
        {dynamic_parameter_name}: '{dynamic_parameter_value}'  
```

Example:

```yaml
version: 1.0
imports:
    deploy.base.template.yml:
      parameters:
        env_name: 'dev'
        locale: 'en'
```

***

### image:

Defines the Docker image configuration to run Spryker applications in.

***

### image:tag

Defines the image tag according to the `spryker/php` images located at [Docker Hub](https://hub.docker.com/r/spryker/php/tags).

This variable is optional. If not specified, the default value applies: `image: spryker/php:7.3`.

```yaml
version: 1.0

image:
    tag: spryker/php:7.3
```

***

### image: environment:

Defines additional environment variables for Spryker applications.

```yaml
version: 1.0

image:
  environment:
        {env_variable}: {env_variable_value}
```
***

### image: node:

Defines Node.js settings.

* `image: node: version:`—defines a Node.js version. Supports only major versions that are greater than the default one. The default version is `12`.
* `image: node: npm`—defines a npm version. Supports only major versions that are greater than the default one. The default version is `6`.
* `image: node: distro:`—defines a Linux distribution for the Node Docker image. Should be equal to your base PHP image. Possible values are `alpine` and `debian`. This variable is optional with the default value of `alpine`.

```yaml
image:
    ...
    node:
        version: 18
        distro: alpine
        npm: 8
```
***

### image: php:

Defines PHP settings.
{% info_block warningBox "Memory Limits" %}

The maximum recommended PHP memory limit's 2048M. Going above this limit's rarely necessary and can lead to stability and performance issues in your environment. Test any configuration change carefully in a non-production setting.

{% endinfo_block %}

* `image: php: ini:`—defines `php.ini` configuration.
* `image: php: enabled-extensions`—defines enabled PHP extensions. The following extensions are allowed:
  * `blackfire`
  * `newrelic`
  * `tideways`

```yaml
image:
    ...
    php:
        ini:
            memory_limit: 2048M
        enabled-extensions:
            - blackfire
            - newrelic
            - tideways
```

***

### assets:

Defines the setting of *Assets*.

* `assets: image:`—defines a docker image for a front-end container. If not specified, the default value applies:
`assets: image: nginx:alpine`.
* `assets: mode:`—defines a mode for running a static build section from the install recipe. Possible values are `production` and `development`. This variable is optional with the default value of `development`.
* `assets: compression:`—defines an engine for static compressions. Possible values are `gzip` and `brotli`.
* `assets: compression: engine: static:`—defines a comression mode. Allowed values are `only`, `true`, and `false`.
* `assets: compression: engine: level:`—defines a compression level. Allowed range is from `1` to `9`.
* `assets: compression: engine: types:`—defines additional MIME types to be compressed.

***

### regions:

Defines the list of *Regions*.

<a name="regions-services"></a>
* `regions: services:`—defines settings for *Region*-specific `services:`. Only `database:` and `mail: sender:` are allowed here.
	* `regions: services: database:`—see `database:` on this page.
	* `regions: services: mail: sender:`—defines the mail sender configuration. Possible values are `name:` and `email:`.
* `regions: stores:`—defines the list of *Stores*.
<a name="regions-stores-services"></a>
* `regions: stores: services:`—defines application-wide, *Store*-specific settings for *Services*. Only `broker:`, `key_value_store:` and `search:` are currently allowed here. See [services:](#services) to learn more.

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

### groups:

Defines the list of *Groups*.

* `groups: region:`—defines the relation to a *Region* by key.
* `groups: applications:`—defines the list of *Applications*. See [groups: applications:](#groups-applications) to learn more.

```yaml
version: "1.0"

groups:
  BACKEND-1:
    region: REGION-1
    applications:
      backoffice_1:
        application: backoffice
        endpoints:
          backoffice.store1.spryker.local:
            store: STORE-1
            services:
              # Application-Store-specific services settings
          backoffice.store2.spryker.local:
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
          yves.store2.spryker.local:
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

Applications can be defined as *Store*-agnostic, as in the example above. Also, applications can be defined as *Store*-specific by leaving a single endpoint pointing to each application. You can see it in the example below. You can use both approaches to scale applications separately by *Store*.

```yaml
version: "1.0"

groups:
  BACKEND-1:
    region: REGION-1
    applications:
      backoffice_store_1:
        application: backoffice
        endpoints:
          backoffice.store1.spryker.local:
            store: STORE-1
      backoffice_store_2:
        application: backoffice
        endpoints:
          backoffice.store2.spryker.local:
            store: STORE-2

 ```

***

### groups: applications:

Defines the list of *Applications*.

The key must be project-wide unique.

Obligatory parameters for `application:`:

* `groups: applications: application:`—defines the type of *Application*. Possible values are `backoffice`, `backend-gateway`, `zed`, `yves`, `glue-storefront`, `glue-backend`,`glue` and `merchant-portal`.
* `groups: applications: endpoints:`—defines the list of *Endpoints* to access the *Application*. See [groups: applications: endpoints:](#groups-applications-endpoints) to learn more.

Optional parameters for `application:`:

* `groups: applications: application: application:`—defines if the application is static. Only `static` is allowed here.
* `groups: applications: application: endpoints: endpoint: entry-point:`—defines an entry-point, the path to the index directory of the application.
* `groups: applications: application: endpoints: endpoint: redirect:`—defines redirect rules.
* `groups: applications: application: endpoints: endpoint: redirect: code`—defines an HTTP code for a redirect. Allowed values are `301` and `302`.
* `groups: applications: application: endpoints: endpoint: redirect: url`—defines a URL to redirect to.

* `groups: applications: application: endpoints: real-ip: from:`—defines gateway IP addresses to fetch the real IP address.
* `groups: applications: application: endpoints: auth:`—defines the basic auth.
* `groups: applications: application: endpoints: auth: engine:`—defines an engine for the basic auth. Only one of the following is allowed per an endpoint: `basic` or `whitelist`.
  * Basic auth variables:
    * `groups: applications: application: endpoints: auth: users:`—defines user credentials for basic auth.
    	* `groups: applications: application: endpoints: auth: users: username:`—defines a username for basic auth.
	* `groups: applications: application: endpoints: auth: users: password:`—defines a password for basic auth.
    * `groups: applications: application: endpoints: auth: exclude:`—defines the IPs from which clients can access the endpoint bypassing the basic auth.
  * Whitelist auth variables:
    * `groups: applications: application: endpoints: auth: include:`—defines the IPs to allow access from.

* `groups: applications: application: endpoints: primal:`—defines if a ZED endpoint is primal for a store. Yves and Glue applications send Zed RPC calls to the primal endpoint. This variable is optional with the default value of `false`. If no endpoint is defined as primal for a store, the first endpoint in descending order is considered primal.
* `groups: applications: application: http: max-request-body-size:`—defines the maximum allowed size of the request body that can be sent to the application, in MB. If not specified, the default values apply:
* `backoffice`—`10m`
  * `merchant-portal`—`10m`
* `glue-storefront`—`10m`
* `glue-backend`—`10m`
* `glue`—`2m`
* `yves`—`1m`

```yaml
...
    applications:
      backoffice:
        application: backoffice
        http:
          max-request-body-size: 20m
        endpoints:
          backoffice.store1.spryker.local:
            store: STORE-1
 ```


{% info_block infoBox %}

To disable the validation of request body size against this parameter, set it to `0`. We don't recommended disabling it.

{% endinfo_block %}

* `groups: applications: application: limits: workers`—defines the maximum number of concurrent child processes a process manager can serve simultaneously.
```yaml
...
    applications:
      zed:
        application: zed
        limits:
            workers: 4
        ...
```


{% info_block infoBox %}

* In cloud environments, increasing the number of workers requires infrastructure changes. Increasing the number of workers should be thoroughly tested beforehand and may have drastic impact on your application's resource requirements. Coordinate this change with our Operations team using the Infrastrucute Change Request (Change to existing Parameter Store Variable).
* Increase this number if you are getting the following error in logs: **server reached pm.max_children setting**.
* We recommend the following increase steps: 4, 8, 12.

{% endinfo_block %}


***

### services:

Defines the list of *Services* and their project-wide settings.

Each service has its own set of settings to be defined. See [Services](#services) to learn more.

Find common settings for all services below:

* `engine:`—defines a third-party application supported by Spryker that does the job specific for the *Service*. For example, you can currently set `database:engine:` to `postgres` or `mysql`.
* `endpoints:`—defines the list of *Endpoints* that point to the *Service* web interface or port.
* `version:`—defines the version of the service to be installed. If `database:engine:` is set to `mysql`, also defines if MySQL or MariaDB is used according to the [version](https://github.com/spryker/docker-sdk#supported-services). See Database on this page for detailed configuration instructions.
This variable is optional. If not specified, the [default version](https://github.com/spryker/docker-sdk#supported-services) applies.

```yaml
services:
    database:
        engine: postgres
        version: 17
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

{% info_block warningBox %}

After changing a service version, make sure to re-import demo data:

1. Remove all Spryker volumes:
```shell
docker/sdk clean-data
```

2. Populate Spryker demo data:
```shell
docker/sdk demo-data
```

{% endinfo_block %}

You can extend service settings on other levels for specific contexts. See [regions: services:](#regions), [regions: stores: services:](#regions) and [groups: applications: endpoints: services:](#groups-applications-endpoints) to learn more.

***

### groups: applications: endpoints:

Defines the list of *Endpoints* to access the *Application*.

The format of the key  is `domain[:port]`. The key must be project-wide unique.

* `groups: applications: endpoints: store:` defines the *Store* as context to process requests within.
* `groups: applications: endpoints: services:` defines the *Store*-specific settings for services. Only `session:` is currently allowed here. See [Services](#services) to learn more.
* `groups: applications: endpoints: cors-allow-origin:` defines a [CORS header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin). It is allowed for `glue` application only. Possible values are:
  * Single domain as a string
  * `*` – allows all domains
{% info_block infoBox "Allowing all domains" %}

  For security reasons, we recommend allowing all domains only as a temporary workaround. As a permanent solution:
  * Define the desired domains as separate endpoints with separate CORS headers.
  * Define the desired domains on the application level

{% endinfo_block %}

### services: endpoints:

Defines the list of *Endpoints* to access a *Service* for development or monitoring needs. The format of the key  is `domain[:port]`. The key must be project-wide unique.

* `services: endpoints: protocol:` defines the protocol. Possible values are: `tcp`and `http`. The default one is `http`.

A port must be defined if protocol is set to `tcp`. The TCP port must be project-wide unique.

***

### docker:

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

### docker: newrelic:

Defines the [New Relic](/docs/dg/dev/integrate-and-configure/configure-services.html#new-relic) configuration.

* `docker: newrelic: license:`—defines a New Relic license. Aquire it from [New Relic](https://www.newrelic.com/).
* `docker: newrelic: appname:`—defines a New Relic application name. This variable is optional and does not have a default value.
* `docker: newrelic: enabled:`—defines if Newrelic is enabled. Possible values are `true` and `false`. This variable is optional with the default value of `true`.
* `docker: newrelic: distributed-tracing: enabled`—defines if [New Relic distributed tracing](https://docs.newrelic.com/docs/agents/php-agent/features/distributed-tracing-php-agent/) is enabled. Possible values are `true` and `false`.
* `docker: newrelic: distributed-tracing: exclude-newrelic-header`—defines if New Relic distributed tracing headers are enabled. Possible values are `true` and `false`. For information about the headers, see [How trace context is passed between applications](https://docs.newrelic.com/docs/distributed-tracing/concepts/how-new-relic-distributed-tracing-works/#headers).
* `docker: newrelic: transaction-tracer: threshold`—defines the New Relic transaction tracer threshold. Accepts numeric values starting from `0`. For information about the threshold, see [Configure transaction traces](https://docs.newrelic.com/docs/apm/transactions/transaction-traces/configure-transaction-traces/).

```yaml
docker:
    newrelic:
        license: eu01xxaa7460e1ea3abdfbbbd34e85c10cd0NRAL
```

***

### docker: ssl:

Defines configuration for SSL module in Spryker Docker SDK.

If `docker: ssl: enabled:` is set to `true`, all endpoints use HTTPS.

This variable is optional. If not specified, the default value applies: `enabled: false`.

```yaml
version: 1.0

docker:
  ssl:
    enabled: true

```

{% info_block infoBox %}

To enable secure connection in your browser, register the self-signed CA certificate from `./docker/generator/openssl/default.crt` in your system.

{% endinfo_block %}




***

### docker: debug:

Defines the configuration for debugging.

If `docker: debug: enabled:` is set to `true`, all applications work in debugging mode.

```yaml
version: 1.0

docker:
  debug:
    enabled: true

```

* `docker: debug: xdebug: enabled:`—defines if Xdebug is enabled.

***

### docker: maintenance: enabled:

Defines if applications work in maintenance mode. The default value is `false`.

```yaml
version: 1.0
docker:
    maintenance:
        enabled: {true | false}
 ```

***

### docker: maintenance: whitelist: ips:

Defines the IPs from which the application in the maintenance mode can be accessed.

```yaml
version: 1.0

docker:
    maintenance:
        enabled: true
        whitelist:
          ips:
              - {IP_ADDRESS}
              - {IP_ADDRESS}
 ```

### docker: logs:

* `docker: logs: path:` defines the path to the directory with Docker logs. This variable is optional. If not specified, the default value applies: `path: '/var/log/spryker`.

***

### docker: testing:

Defines the configuration for testing.

* `docker: testing: store:` defines a *Store* as the context for running tests using specific console commands, like `docker/sdk console code:test`. This variable is optional. If not specified, the default value applies: `store: DE`.

***

### docker: mount:

Defines the mode for mounting source files into application containers.

1. `baked:`- source files are copied into the image, so they cannot be changed from host machine. This variable is optional. If not specified, the default value applies: `baked:baked`.
2. `native:`- source files are mounted from host machine into containers directly. We recommend using it Linux.
3. `docker-sync:`- source files are synced from host machine into containers during runtime. Use it as a workaround solution with MacOS and Windows.
4.  `mutagen:`- source files are synced from the host machine into running containers. Use it as a workaround for MacOS and Windows.

`As mount:` is a platform-specific setting. You can define multiple mount modes. Use the`platforms:` list to define a mount mode for a platform. Possible platforms are `windows`, `macos`, and `linux`.

The first mount mode matching the host platform is selected by default.

```yaml
version: 1.0

docker:
  mount:
    native:
      platforms:
        - linux
        mutagen:
            platforms:
                - macos
    docker-sync:
      platforms:
        - windows

```
***

### composer:

Defines the composer settings to be used during deployment.

1. `mode:`—defines whether packages should be installed from the  `require` or `require-dev` section of `composer.json`. Possible values are `--no-dev` and `-dev`. This variable is optional. If not specified, the default values apply:

  * [Development mode]: `mode: --dev`
	* [Demo mode]: `mode: --no-dev`

2. `autoload:`—defines composer autoload options. Possible values are `--optimize` and `--classmap-authoritative`. This variable is optional. If not specified, the default values apply:

  * Development mode: `autoload: --optimize`
	* Demo mode: `autoload: --classmap-authoritative`

***

## Services

You can configure and use external tools that are shipped with Spryker in Docker as services.
If a service has a dedicated configuration, it's configured and run when the current environment is set up and executed.


The following services are supported:

* blackfire
* broker
* dashboard
* database
* key_value_store
* kibana
* mail_catcher
* Key-value store (Redis or Valkey)-gui
* scheduler
* search
* session
* swagger
* tideways
* webdriver

***

### blackfire:

An application profiler *Service* used for testing and debugging.

* Project-wide
    - `blackfire: engine:`—possible value is `blackfire`.
    - `blackfire: server-id:`—defines the server id used to authenticate with Blackfire. Use it only if you have a shared agent between multiple environments.
    - `blackfire: server-token:`—defines the server token used to authenticate with Blackfire. Use it only if you have a shared agent between multiple environments.
    - `blackfire: client-id:`—defines the client ID from the Client ID/Client Token credentials pair.
    - `blackfire: client-token:`—defines the client Token from the Client ID/Client Token credentials pair.

***

### broker:

A message broker *Service*.

* Project-wide

  - `broker: engine:`—possible values is `rabbitmq`.
  - `broker: api: username`, `database: api: password:`—defines the credentails for the message broker's API.
  - `broker: endpoints:`—defines the service's port or/and web-interface that can be accessed via given endpoints.

* Store-specific

  - `broker: namespace:`—defines a namespace (virtual host).
  - `broker: username:`, `broker: password:`—defines the credentials to access the namespace (virtual host) defined by `broker: namespace:`.

***

### dashboard:

A real-time log monitoring *Service*.

* Project-wide

  - `dashboard: engine:`—possible value is `dashboard`.
  - `dashboard: endpoints:`—defines the service's port and web interface that can be accessed via given endpoints.

***

### database:

An SQL database management system *Service*.

{% info_block warningBox "SCCOS" %}

In Spryker Cloud Commerse OS, `database: root: username:` and `database: root: password:` are generated automatically for security reasons. You *do not* need to define them for cloud environments.  

{% endinfo_block %}

* Project-wide

  - `database: engine:`—possible values are `postgres`and `mysql`.
  - `database: version:`—defines the version of the database engine. If `database:engine:` is set to `mysql`, also defines if MySQL or MariaDB is used according to the [version](https://github.com/spryker/docker-sdk#supported-services). See Database on this page for detailed configuration instructions.
  - `database: root: username:`, `database: root: password:`—defines the user with root privileges.
  - `database: endpoints:`—defines the service's port that can be accessed via given endpoints.

* Region-specific

  - `database: database:`—defines database name.
  - `database: username:`, `database: password:`—defines database credentials.

***

### key_value_store:

A key-value store *Service* for storing business data.

* Project-wide

  * `key_value_store: engine:`—possible value is: `redis`.
  * `key_value_store: replicas: number:`—defines the number of replicas. The default value is `0`.
  * `session: endpoints:`—defines the service's port that can be accessed via given endpoints.

* Store-specific

  * `key_value_store: namespace:`—defines a namespace (number for Redis).

***

### kibana:

A *Service* to visualize Elasticsearch data and navigate the Elastic Stack.

* Project-wide
    * `kibana: engine:`—possible value is: `kibana`.
    * `kibana: endpoints:`—defines the service's port and web interface that can be accessed via given endpoints.

***

### mail_catcher:

A mail catcher *Service* used to catch all outgoing emails for development or testing needs.

* Project-wide

     - `mail_catcher: engine:`—possible value is `mailhog`.
     - `mail_catcher: endpoints:`-defines the service's port and web interface that can be accessed via given endpoints.

***

### redis-gui:

A **Service** that provides a graphical user interface to access Redis databases.

* Project-wide
     - `redis-gui: engine:`—possible value is `redis-commander`.
     - `redis-gui: endpoints:`—defines the service's port and web interface that can be accessed via given endpoints.

***


### scheduler:

A scheduler *Service* used to run application-specific jobs periodically in the background.

* Project-wide
  * `scheduler: engine:`—possible value is `jenkins`.
  * `scheduler: endpoints:`—defines the service's port and web interface that can be accessed via given endpoints.

***

### search:

A search *Service* that provides a distributed, multitenant-capable full-text search engine.

* Project-wide
  * `search: engine:`—possible value is `elastic`.
  * `search: endpoints:`—defines the service's port and web interface that can be accessed via given endpoints.

***

### session:

A key-value store *Service* for storing session data.

* Project-wide

  - `session: engine:`—possible values is `redis`.
  - `session: endpoints:`—defines the service's port that can be accessed via given endpoints.

* Endpoint-specific

  - `session: namespace:`—defines a namespace (number for Redis).


***
### swagger:

The swagger-ui *Service* used to run Swagger UI to develop API endpoints.

* Project-wide
    * `swagger: engine:`–possible value is `swagger-ui`.
    * `swagger-ui: endpoints:`—defines the service's port or/and web interface that can be accessed via given endpoints.

***

### tideways:

An application profiler *Service* for testing and debugging.

* Project-wide
  - `tideways: apikey:`—defines the api-key to authenticate with Tideways.
  - `tideways: environment-name:`—defines the environment name of your environment on Tideways. This variable is optional with the default value of `production`.
  - `tideways: cli-enabled:`—defines if profiling of CLI script is enabled. This variable is optional with the default value of `false`.

***

### webdriver:

A **Service** to control user agents.

* Project-wide
    * `webdriver: engine:`—possible values are `chromedriver,` `phantomjs`. This variable is optional with the default value of `phantomjs`.

***

<!-- markdownlint-enable -->

## Change log

Initial reference document is introduced.
