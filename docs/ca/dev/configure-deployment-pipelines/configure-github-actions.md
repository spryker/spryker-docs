---
title: Configuring GitHub Actions
last_updated: May 15, 2023
description: Set up GitHub Actions for continuous integration and delivery in Spryker Cloud Commerce OS, with detailed guidance on workflow configuration, running tests, and automating deployments.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/configuring-github-actions
originalArticleId: ad8a174f-1372-4cae-b530-fa77a9cd5479
redirect_from:
  - /docs/configuring-github-actions
  - /docs/en/configuring-github-actions
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/configuring-github-actions.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/upcoming-release/configuring-github-actions.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/configuring-github-actions.html
---

This document describes how to configure continuous integration using GitHub Actions.

## GitHub Actions

GitHub Actions helps you automate your software development workflows in the same place you store code and collaborate on pull requests and issues. You can write individual tasks, called actions, and combine them to create a custom workflow. Workflows are custom automated processes that you can set up in your repository to build, test, package, release, or deploy any code project on GitHub.

For more information on GitHub Actions, see the following documents:
- [GitHub Actions](https://github.com/features/actions)
- [Learn GitHub Actions](https://docs.github.com/en/actions/learn-github-actions)


<details>
<summary>Release 202307.0</summary>

## Prerequisites

In a GitHub repository, create the workflow configuration file: `.github/workflows/{project_name}.yml`.

## Configuring basic validation with GitHub Actions

Set up the job that performs the basic validation like the following:
- Code style
- Architecture
- Security
- Database schema


<details>
<summary>Example of .github/workflows/{project_name}.yml</summary>

```yaml
...
jobs:
    ...
    validation:
        name: "CS, ArchSniffer, PHPStan, Security"
        runs-on: ubuntu-20.04
        strategy:
            fail-fast: false
            matrix:
                php-version: [
                    '8.0'
                ]

        env:
            APPLICATION_ENV: devtest
            APPLICATION_STORE: DE
            PROJECT: project-name

        steps:
            - uses: actions/checkout@v3

            - name: Configure sysctl limits
              run: |
                  sudo swapoff -a
                  sudo sysctl -w vm.swappiness=1
                  sudo sysctl -w fs.file-max=262144
                  sudo sysctl -w vm.max_map_count=262144
            - name: Runs Elasticsearch
              uses: elastic/elastic-github-actions/elasticsearch@master
              with:
                  stack-version: 7.6.0
                  port: 10005

            - uses: actions/setup-node@v3
              with:
                  node-version: '18'

            - name: NPM cache
              uses: actions/cache@v3
              with:
                  path: ~/.npm
                  key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-${% raw %}{{{% endraw %} hashFiles('**/package-lock.json') {% raw %}}}{% endraw %}
                  restore-keys: |
                      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-
            - name: Composer get cache directory
              id: composer-cache
              run: |
                  echo "dir=$(composer config cache-files-dir)" >> $GITHUB_OUTPUT
            - name: Composer cache
              uses: actions/cache@v3
              with:
                  path: ${% raw %}{{{% endraw %} steps.composer-cache.outputs.dir {% raw %}}}{% endraw %}
                  key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-composer-${% raw %}{{{% endraw %} hashFiles('**/composer.lock') {% raw %}}}{% endraw %}
                  restore-keys: |
                      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-composer-
            - name: Composer validate
              run: composer validate

            - name: Composer install
              run: |
                  composer --version
                  composer install
            - name: Setup PHP
              uses: shivammathur/setup-php@v2
              with:
                  php-version: ${% raw %}{{{% endraw %} matrix.php-version {% raw %}}}{% endraw %}
                  extensions: mbstring, intl, pdo_mysql
                  tools: composer:v2

            - name: Generate transfer objects
              run: vendor/bin/console transfer:generate

            - name: Generate transfer databuilder objects
              run: vendor/bin/console transfer:databuilder:generate

            - name: Propel install
              run: |
                  vendor/bin/console propel:schema:copy
                  vendor/bin/console propel:model:build
                  vendor/bin/console transfer:entity:generate
            - name: Setup search
              run: vendor/bin/console setup:search

            - name: Codecept build
              run: vendor/bin/codecept build --ansi

            - name: Generate autocompletion files
              run: vendor/bin/console dev:ide-auto-completion:generate

            - name: Generate rest API dcoumentation
              run: vendor/bin/console rest-api:generate:documentation

            - name: Frontend install-dependencies
              run: |
                  vendor/bin/console frontend:project:install-dependencies -vvv
            - name: Install NPM packages
              run: |
                  sudo npm install --location=global --unsafe-perm speccy@0.11.0
            - name: Speccy lint Glue specification
              run: speccy lint src/Generated/Glue/Specification/spryker_rest_api.schema.yml --rules=default

            - name: Style lint
              run: npm run yves:stylelint

            - name: ES lint
              run: npm run yves:lint

            - name: Front-end Formatter
              run: npm run formatter

            - name: Front-end MP Lint
              run: npm run mp:lint

            - name: Front-end MP Style lint
              run: npm run mp:stylelint

            - name: Front-end MP Unit Tests
              run: npm run mp:test

            - name: Validate propel files
              run: |
                  vendor/bin/console propel:schema:validate
                  vendor/bin/console propel:schema:validate-xml-names
            - name: Validate transfer files
              run: vendor/bin/console transfer:validate

            - name: Run CodeStyle checks
              run: vendor/bin/console code:sniff:style

            - name: Run Architecture rules
              run: vendor/bin/phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority 2

            - name: Run PHPStan
              run: vendor/bin/phpstan analyze -l 5 -c phpstan.neon src/

            - name: Run Security check
              run: vendor/bin/console security:check
...
```

</details>

## Configuring groups of tests via the Docker SDK

To set up a job that runs a specific group of tests via the [Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html):
1. After the job with the basic validation, add the following job template:

```yaml
...
    php-{php_version}-{database_type}-{tests_type}-{image}:
        name: "PHP {php_version} / {database_type} / {tests_type} / {image}"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:{image_tag}
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v3

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot {deployment_configuration_file} -v
                  docker/sdk up -t -v
                  docker/sdk testing codecept run -c {tests_configuration_file}
```

2. Glue API tests: To fill the storage with the data used by Glue API, add the following commands to load fixtures to the `Run docker` action as shown in the code snippet:
- `docker/sdk testing codecept fixtures`
- `docker/sdk testing console queue:worker:start --stop-when-empty`

```yaml
...
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot {deployment_configuration_file} -v
                  docker/sdk up -t -v
                  docker/sdk testing codecept fixtures
                  docker/sdk testing console queue:worker:start --stop-when-empty
                  docker/sdk testing codecept run -c {tests_configuration_file}
```

3. Replace the placeholders with the actual values using the following description.

| PLACEHOLDER                     | DESCRIPTION                                                                                                                                                                                                            | EXAMPLE IN THE PROPERTY NAME     | EXAMPLE IN THE PROPERTY VALUE |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|-------------------------------|
| {php_version}                   | PHP version on which validation is based. The version must correspond to the Docker image defined in `{image_tag}`.                                                                                                    | 74                               | 7.4                           |
| {database_type}                 | Database type on which validation is based.                                                                                                                                                                            | mariadb                          | MariaDB                       |
| {tests_type}                    | The group of tests to run.                                                                                                                                                                                             | glue                             | Glue                          |
| {image}                         | Docker image on which the validation is based. The name must correspond to the Docker image defined in `{image_tag}`.                                                                                                  | alpine                           | Alpine                        |
| {image_tag}                     | Tag of the Docker image on which the validation is based. Check all the images in the [Spryker Docker hub](https://hub.docker.com/r/spryker/php/tags?page=1&ordering=last_updated&name=-debian).                       | 7.4                              |                               |
| {deployment_configuration_file} | Deploy file configured for building an application suitable to run the desired group of tests. Example: [deploy.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.ci.functional.yml) | deploy.ci.functional.mariadb.yml |                               |
| {tests_configuration_file}      | Codeception configuration files that defines tests to run. Example: [codeception.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/codeception.ci.functional.yml)                           | codeception.functional.yml       |                               |

1. Repeat steps 1 to 3 until you add all the desired jobs.

For different configuration examples, see [Configuring groups of tests via the Docker SDK: Configuration examples](#configuring-groups-of-tests-via-the-docker-sdk-configuration-examples).

### Configuring groups of tests via the Docker SDK: Configuration examples

This section describes examples of running groups of tests based on different configuration requirements.

#### Example 1: Running functional tests on a specific version of Alpine with MySQL and PHP 7.3

To run functional tests on Alpine 3.12.0 with MySQL and PHP 7.3, follow these steps:

1. Update the desired deploy file:
    1. Define the Docker image tag:

        ```yaml
        ...
        image:
            tag: spryker/php:7.3-alpine3.12
        ...
        ```

    2. Define the MySQL database engine:

        ```yaml
        ...
        services:
            database:
                engine: mysql
                ...
        ```

    3. Bootstrap docker setup:

        ```bash
        docker/sdk boot {deploy_file.yml}
        ```

    4. Run the application with the new configuration:

        ```bash
        docker/sdk up
        ```

2. Update the desired workflow configuration file:

```yaml
  ...
    php-73-mysql-functional-alpine:
        name: "PHP 7.3 / MySQL / Functional / Alpine"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:7.3-alpine3.12
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v3

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.functional.yml
                  docker/sdk up -t
                  docker/sdk testing codecept run -c codeception.functional.yml
```



#### Example 2: Running Glue API tests on Debian with PostgreSQL and PHP 8.0

To run Glue API tests on Debian with PostgreSQL and PHP 8.0, follow these steps:
1. Update the desired deploy file:
    1. Define the Docker image tag:

        ```yaml
        ...
        image:
            tag: spryker/php:8.0-debian
        ...
        ```

    2. Define the PostgreSQL database engine:

        ```yaml
        ...
        services:
            database:
                engine: postgres
                ...
        ```

    3. Bootstrap docker setup:

        ```bash
        docker/sdk boot {deploy_file.yml}
        ```

    4. Run the application with the new configuration:

        ```bash
        docker/sdk up
        ```

2. Update the desired workflow configuration file:

```yaml
...
    php-80-postgresql-glue-debian:
        name: "PHP 8.0 / PostgreSQL / Glue / Debian"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:8.0-debian
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v3

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.glue.yml
                  docker/sdk up -t
                  docker/sdk testing codecept fixtures
                  docker/sdk testing console queue:worker:start --stop-when-empty
                  docker/sdk testing codecept run -c codeception.glue.yml
```

#### Example 3: Running acceptance tests on Alpine with MariaDB and PHP 7.4

{% info_block infoBox "Default configuration" %}

- Since Alpine is the default platform and a specific version is not needed, don't define it in the image tag in the deploy and workflow files.
- MariaDB is the default database engine, so you don't need to define it in the deploy file.

{% endinfo_block %}


To run acceptance tests on Alpine with MariaDB and PHP 7.4, follow these steps:

1. In the desired deploy file, define the Docker image tag:

```yaml
...
image:
    tag: spryker/php:7.4
...
```

2. Update the desired workflow configuration file:

```yaml
...
    php-7.4-mariadb-acceptance-alpine:
        name: "PHP 7.4 / MariaDB / Acceptance / Alpine"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:7.4
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v3

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.acceptance.yml
                  docker/sdk up -t
                  docker/sdk testing codecept run -c codeception.acceptance.yml
```

## Related documentation

- To learn about workflow configuration, see [Learn GitHub Actions](https://docs.github.com/en/actions/learn-github-actions).
- To learn how to choose the language and to create a basic template for workflow configuration files, see [Quickstart for GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/starting-with-preconfigured-workflow-templates)
- To learn about encrypted secrets in a workflow on demand, see [Encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
- To learn about the Deploy file, see [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html)
- To learn about configuring services with the Docker SDK, see [Configuring services](/docs/dg/dev/integrate-and-configure/configure-services.html)
</details>

<details>
<summary>Release 202212.0</summary>

## Prerequisites

In a GitHub repository, create the workflow configuration file: `.github/workflows/{project_name}.yml`.

## Configuring basic validation with GitHub Actions

Set up the job that performs the basic validation like the following:
- Code style
- Architecture
- Security
- Database schema


<details>
<summary>Example of .github/workflows/{project_name}.yml</summary>

```yaml
...
jobs:
    ...
    validation:
        name: "CS, ArchSniffer, PHPStan, Security"
        runs-on: ubuntu-20.04
        strategy:
            fail-fast: false
            matrix:
                php-version: [
                    '8.0'
                ]

        env:
            APPLICATION_ENV: devtest
            APPLICATION_STORE: DE
            PROJECT: project-name

        steps:
            - uses: actions/checkout@v2

            - name: Configure sysctl limits
              run: |
                  sudo swapoff -a
                  sudo sysctl -w vm.swappiness=1
                  sudo sysctl -w fs.file-max=262144
                  sudo sysctl -w vm.max_map_count=262144
            - name: Runs Elasticsearch
              uses: elastic/elastic-github-actions/elasticsearch@master
              with:
                  stack-version: 7.6.0
                  port: 10005

            - uses: actions/setup-node@v1
              with:
                  node-version: '16'

            - name: NPM cache
              uses: actions/cache@v2
              with:
                  path: ~/.npm
                  key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-${% raw %}{{{% endraw %} hashFiles('**/package-lock.json') {% raw %}}}{% endraw %}
                  restore-keys: |
                      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-
            - name: Composer get cache directory
              id: composer-cache
              run: |
                  echo "::set-output name=dir::$(composer config cache-files-dir)"
            - name: Composer cache
              uses: actions/cache@v2
              with:
                  path: ${% raw %}{{{% endraw %} steps.composer-cache.outputs.dir {% raw %}}}{% endraw %}
                  key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-composer-${% raw %}{{{% endraw %} hashFiles('**/composer.lock') {% raw %}}}{% endraw %}
                  restore-keys: |
                      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-composer-
            - name: Composer validate
              run: composer validate

            - name: Composer install
              run: |
                  composer --version
                  composer install
            - name: Setup PHP
              uses: shivammathur/setup-php@v2
              with:
                  php-version: ${% raw %}{{{% endraw %} matrix.php-version {% raw %}}}{% endraw %}
                  extensions: mbstring, intl, pdo_mysql
                  tools: composer:v2

            - name: Generate transfer objects
              run: vendor/bin/console transfer:generate

            - name: Generate transfer databuilder objects
              run: vendor/bin/console transfer:databuilder:generate

            - name: Propel install
              run: |
                  vendor/bin/console propel:schema:copy
                  vendor/bin/console propel:model:build
                  vendor/bin/console transfer:entity:generate
            - name: Setup search
              run: vendor/bin/console setup:search

            - name: Codecept build
              run: vendor/bin/codecept build --ansi

            - name: Generate autocompletion files
              run: vendor/bin/console dev:ide-auto-completion:generate

            - name: Generate rest API dcoumentation
              run: vendor/bin/console rest-api:generate:documentation

            - name: Frontend install-dependencies
              run: |
                  vendor/bin/console frontend:project:install-dependencies -vvv
            - name: Install NPM packages
              run: |
                  sudo npm install --location=global --unsafe-perm speccy@0.11.0
            - name: Speccy lint Glue specification
              run: speccy lint src/Generated/Glue/Specification/spryker_rest_api.schema.yml --rules=default

            - name: Style lint
              run: node ./frontend/libs/stylelint

            - name: TS lint
              run: node ./frontend/libs/tslint --format stylish

            - name: Front-end Formatter
              run: node ./frontend/libs/formatter

            - name: Front-end MP Unit Tests
              run: npm run mp:test

            - name: Validate propel files
              run: |
                  vendor/bin/console propel:schema:validate
                  vendor/bin/console propel:schema:validate-xml-names
            - name: Validate transfer files
              run: vendor/bin/console transfer:validate

            - name: Run CodeStyle checks
              run: vendor/bin/console code:sniff:style

            - name: Run Architecture rules
              run: vendor/bin/phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority 2

            - name: Run PHPStan
              run: vendor/bin/phpstan analyze -l 5 -c phpstan.neon src/

            - name: Run Security check
              run: vendor/bin/console security:check
...
```

</details>

## Configuring groups of tests via the Docker SDK

To set up a job that runs a specific group of tests via the [Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html):
1. After the job with the basic validation, add the following job template:

```yaml
...
    php-{php_version}-{database_type}-{tests_type}-{image}:
        name: "PHP {php_version} / {database_type} / {tests_type} / {image}"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:{image_tag}
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot {deployment_configuration_file} -v
                  docker/sdk up -t -v
                  docker/sdk testing codecept run -c {tests_configuration_file}
```

2. Glue API tests: To fill the storage with the data used by Glue API, add the following commands to load fixtures to the `Run docker` action as shown in the code snippet:
- `docker/sdk testing codecept fixtures`
- `docker/sdk testing console queue:worker:start --stop-when-empty`

```yaml
...
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot {deployment_configuration_file} -v
                  docker/sdk up -t -v
                  docker/sdk testing codecept fixtures
                  docker/sdk testing console queue:worker:start --stop-when-empty
                  docker/sdk testing codecept run -c {tests_configuration_file}
```

3. Replace the placeholders with the actual values using the following description.

| PLACEHOLDER                     | DESCRIPTION                                                                                                                                                                                                            | EXAMPLE IN THE PROPERTY NAME     | EXAMPLE IN THE PROPERTY VALUE |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|-------------------------------|
| {php_version}                   | PHP version on which validation is based. The version must correspond to the Docker image defined in `{image_tag}`.                                                                                                    | 74                               | 7.4                           |
| {database_type}                 | Database type on which validation is based.                                                                                                                                                                            | mariadb                          | MariaDB                       |
| {tests_type}                    | The group of tests to run.                                                                                                                                                                                             | glue                             | Glue                          |
| {image}                         | Docker image on which the validation is based. The name must correspond to the Docker image defined in `{image_tag}`.                                                                                                  | alpine                           | Alpine                        |
| {image_tag}                     | Tag of the Docker image on which the validation is based. Check all the images in the [Spryker Docker hub](https://hub.docker.com/r/spryker/php/tags?page=1&ordering=last_updated&name=-debian).                       | 7.4                              |                               |
| {deployment_configuration_file} | Deploy file configured for building an application suitable to run the desired group of tests. Example: [deploy.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.ci.functional.yml) | deploy.ci.functional.mariadb.yml |                               |
| {tests_configuration_file}      | Codeception configuration files that defines tests to run. Example: [codeception.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/codeception.ci.functional.yml)                           | codeception.functional.yml       |                               |

1. Repeat steps 1 to 3 until you add all the desired jobs.

For different configuration examples, see [Configuring groups of tests via the Docker SDK: Configuration examples](#configuring-groups-of-tests-via-the-docker-sdk-configuration-examples).

### Configuring groups of tests via the Docker SDK: Configuration examples

This section describes examples of running groups of tests based on different configuration requirements.

#### Example 1: Running functional tests on a specific version of Alpine with MySQL and PHP 7.3

To run functional tests on Alpine 3.12.0 with MySQL and PHP 7.3, follow these steps:

1. Update the desired deploy file:
    1. Define the Docker image tag:

        ```yaml
        ...
        image:
            tag: spryker/php:7.3-alpine3.12
        ...
        ```

    2. Define the MySQL database engine:

        ```yaml
        ...
        services:
            database:
                engine: mysql
                ...
        ```

    3. Bootstrap docker setup:

        ```bash
        docker/sdk boot {deploy_file.yml}
        ```

    4. Run the application with the new configuration:

        ```bash
        docker/sdk up
        ```

2. Update the desired workflow configuration file:

```yaml
  ...
    php-73-mysql-functional-alpine:
        name: "PHP 7.3 / MySQL / Functional / Alpine"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:7.3-alpine3.12
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.functional.yml
                  docker/sdk up -t
                  docker/sdk testing codecept run -c codeception.functional.yml
```



#### Example 2: Running Glue API tests on Debian with PostgreSQL and PHP 8.0

To run Glue API tests on Debian with PostgreSQL and PHP 8.0, follow these steps:
1. Update the desired deploy file:
    1. Define the Docker image tag:

        ```yaml
        ...
        image:
            tag: spryker/php:8.0-debian
        ...
        ```

    2. Define the PostgreSQL database engine:

        ```yaml
        ...
        services:
            database:
                engine: postgres
                ...
        ```

    3. Bootstrap docker setup:

        ```bash
        docker/sdk boot {deploy_file.yml}
        ```

    4. Run the application with the new configuration:

        ```bash
        docker/sdk up
        ```

2. Update the desired workflow configuration file:

```yaml
...
    php-80-postgresql-glue-debian:
        name: "PHP 8.0 / PostgreSQL / Glue / Debian"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:8.0-debian
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.glue.yml
                  docker/sdk up -t
                  docker/sdk testing codecept fixtures
                  docker/sdk testing console queue:worker:start --stop-when-empty
                  docker/sdk testing codecept run -c codeception.glue.yml
```

#### Example 3: Running acceptance tests on Alpine with MariaDB and PHP 7.4

{% info_block infoBox "Default configuration" %}

- Since Alpine is the default platform and a specific version is not needed, don't define it in the image tag in the deploy and workflow files.
- MariaDB is the default database engine, so you don't need to define it in the deploy file.

{% endinfo_block %}


To run acceptance tests on Alpine with MariaDB and PHP 7.4, follow these steps:

1. In the desired deploy file, define the Docker image tag:

```yaml
...
image:
    tag: spryker/php:7.4
...
```

2. Update the desired workflow configuration file:

```yaml
...
    php-7.4-mariadb-acceptance-alpine:
        name: "PHP 7.4 / MariaDB / Acceptance / Alpine"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:7.4
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.acceptance.yml
                  docker/sdk up -t
                  docker/sdk testing codecept run -c codeception.acceptance.yml
```

## Related documentation

- To learn about workflow configuration, see [Learn GitHub Actions](https://docs.github.com/en/actions/learn-github-actions).
- To learn how to choose the language and to create a basic template for workflow configuration files, see [Quickstart for GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/starting-with-preconfigured-workflow-templates)
- To learn about encrypted secrets in a workflow on demand, see [Encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
- To learn about the Deploy file, see [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html)
- To learn about configuring services with the Docker SDK, see [Configuring services](/docs/dg/dev/integrate-and-configure/configure-services.html)
</details>


<details>
<summary>Release 202204.0</summary>

## Prerequisites

In a GitHub repository, create the workflow configuration file: `.github/workflows/{project_name}.yml`.

## Configuring basic validation with GitHub Actions

Set up the job that performs the basic validation like:
- Code style
- Architecture
- Security
- Database schema


<details>
    <summary>Example of .github/workflows/{project_name}.yml</summary>

```yaml
...
jobs:
    ...
    validation:
        name: "CS, ArchSniffer, PHPStan, Security"
        runs-on: ubuntu-20.04
        strategy:
            fail-fast: false
            matrix:
                php-version: [
                    '7.4'
                ]

        env:
            APPLICATION_ENV: devtest
            APPLICATION_STORE: DE
            PROJECT: project-name

        steps:
            - uses: actions/checkout@v2

            - name: Configure sysctl limits
              run: |
                  sudo swapoff -a
                  sudo sysctl -w vm.swappiness=1
                  sudo sysctl -w fs.file-max=262144
                  sudo sysctl -w vm.max_map_count=262144
            - name: Runs Elasticsearch
              uses: elastic/elastic-github-actions/elasticsearch@master
              with:
                  stack-version: 7.6.0
                  port: 10005

            - uses: actions/setup-node@v1
              with:
                  node-version: '12'

            - name: NPM cache
              uses: actions/cache@v2
              with:
                  path: ~/.npm
                  key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-${% raw %}{{{% endraw %} hashFiles('**/package-lock.json') {% raw %}}}{% endraw %}
                  restore-keys: |
                      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-node-
            - name: Yarn get cache directory
              id: yarn-cache-dir-path
              run: echo "::set-output name=dir::$(yarn cache dir)"

            - name: Yarn cache
              uses: actions/cache@v2
              id: yarn-cache
              with:
                  path: ${% raw %}{{{% endraw %} steps.yarn-cache-dir-path.outputs.dir {% raw %}}}{% endraw %}
                  key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-yarn-${% raw %}{{{% endraw %} hashFiles('**/yarn.lock') {% raw %}}}{% endraw %}
                  restore-keys: |
                      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-yarn-
            - name: Composer get cache directory
              id: composer-cache
              run: |
                  echo "::set-output name=dir::$(composer config cache-files-dir)"
            - name: Composer cache
              uses: actions/cache@v2
              with:
                  path: ${% raw %}{{{% endraw %} steps.composer-cache.outputs.dir {% raw %}}}{% endraw %}
                  key: ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-composer-${% raw %}{{{% endraw %} hashFiles('**/composer.lock') {% raw %}}}{% endraw %}
                  restore-keys: |
                      ${% raw %}{{{% endraw %} runner.os {% raw %}}}{% endraw %}-composer-
            - name: Composer validate
              run: composer validate

            - name: Composer install
              run: |
                  composer --version
                  composer install
            - name: Setup PHP
              uses: shivammathur/setup-php@v2
              with:
                  php-version: ${% raw %}{{{% endraw %} matrix.php-version {% raw %}}}{% endraw %}
                  extensions: mbstring, intl, pdo_mysql
                  tools: composer:v2

            - name: Generate transfer objects
              run: vendor/bin/console transfer:generate

            - name: Generate transfer databuilder objects
              run: vendor/bin/console transfer:databuilder:generate

            - name: Propel install
              run: |
                  vendor/bin/console propel:schema:copy
                  vendor/bin/console propel:model:build
                  vendor/bin/console transfer:entity:generate
            - name: Setup search
              run: vendor/bin/console setup:search

            - name: Codecept build
              run: vendor/bin/codecept build --ansi

            - name: Generate autocompletion files
              run: vendor/bin/console dev:ide-auto-completion:generate

            - name: Generate rest API dcoumentation
              run: vendor/bin/console rest-api:generate:documentation

            - name: Frontend install-dependencies
              run: |
                  vendor/bin/console frontend:project:install-dependencies
                  vendor/bin/console frontend:yves:install-dependencies
                  vendor/bin/console frontend:mp:install-dependencies
            - name: Install NPM packages
              run: |
                  sudo npm install -g --unsafe-perm speccy@0.11.0
            - name: Speccy lint Glue specification
              run: speccy lint src/Generated/Glue/Specification/spryker_rest_api.schema.yml --rules=default

            - name: Style lint
              run: node ./frontend/libs/stylelint

            - name: TS lint
              run: node ./frontend/libs/tslint --format stylish

            - name: Front-end Formatter
              run: node ./frontend/libs/formatter

            - name: Front-end MP Unit Tests
              run: yarn mp:test

            - name: Front-end MP Build
              run: yarn mp:build

            - name: Validate propel files
              run: |
                  vendor/bin/console propel:schema:validate
                  vendor/bin/console propel:schema:validate-xml-names
            - name: Validate transfer files
              run: vendor/bin/console transfer:validate

            - name: Run CodeStyle checks
              run: vendor/bin/console code:sniff:style

            - name: Run Architecture rules
              run: vendor/bin/phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority 2

            - name: Run PHPStan
              run: vendor/bin/phpstan analyze -l 5 -c phpstan.neon src/

            - name: Run Security check
              run: vendor/bin/console security:check
...
```

</details>

## Configuring groups of tests via the Docker SDK

To set up a job that runs a specific group of tests via the [Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html):
1. After the job with the basic validation, add the following job template:

```yaml
...
    php-{php_version}-{database_type}-{tests_type}-{image}:
        name: "PHP {php_version} / {database_type} / {tests_type} / {image}"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:{image_tag}
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot {deployment_configuration_file} -v
                  docker/sdk up -t -v
                  docker/sdk testing codecept run -c {tests_configuration_file}
```

2. Glue API tests: To fill the storage with the data used by Glue API, add the following commands to load fixtures to the `Run docker` action as shown in the code snippet:
- `docker/sdk testing codecept fixtures`
- `docker/sdk testing console queue:worker:start --stop-when-empty`

```yaml
...
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot {deployment_configuration_file} -v
                  docker/sdk up -t -v
                  docker/sdk testing codecept fixtures
                  docker/sdk testing console queue:worker:start --stop-when-empty
                  docker/sdk testing codecept run -c {tests_configuration_file}
```

3. Replace the placeholders with the actual values using the following description.

| PLACEHOLDER                     | DESCRIPTION                                                                                                                                                                                                         | EXAMPLE IN THE PROPERTY NAME     | EXAMPLE IN THE PROPERTY VALUE |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|-------------------------------|
| {php_version}                   | PHP version on which validation is based. The version should correspond to the Docker image defined in `{image_tag}`.                                                                                               | 74                               | 7.4                           |
| {database_type}                 | Database type on which validation is based.                                                                                                                                                                         | mariadb                          | MariaDB                       |
| {tests_type}                    | The group of tests to run.                                                                                                                                                                                          | glue                             | Glue                          |
| {image}                         | Docker image on which the validation is based. The name should correspond to the Docker image defined in `{image_tag}`.                                                                                             | alpine                           | Alpine                        |
| {image_tag}                     | Tag of the Docker image on which the validation is based. Check all the images in the [Spryker Docker hub](https://hub.docker.com/r/spryker/php/tags?page=1&ordering=last_updated&name=-debian).                    | 7.4                              |                               |
| {deployment_configuration_file} | Deploy file configured for building application suitable to run the desired group of tests. Example: [deploy.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.ci.functional.yml) | deploy.ci.functional.mariadb.yml |                               |
| {tests_configuration_file}      | Codeception configuration files that defines the tests to run. Example: [codeception.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/codeception.ci.functional.yml)                    | codeception.functional.yml       |                               |

4. Repeat steps 1 to 3 until you add all the desired jobs.

For different configuration examples, see Configuring groups of tests via the [Configuring groups of tests via the Docker SDK: Configuration examples](/docs/ca/dev/configure-deployment-pipelines/configure-github-actions.html#configuring-groups-of-tests-via-the-docker-sdk).

### Configuring groups of tests via the Docker SDK: Configuration examples

This section describes examples of running groups of tests based on different configuration requirements.

#### Example 1: Running functional tests on a specific version of Alpine with MySQL and PHP 7.3

To run functional tests on Alpine 3.12.0 with MySQL and PHP 7.3:

1. Update the desired deploy file:
    1. Define the Docker image tag:

        ```yaml
        ...
        image:
            tag: spryker/php:7.3-alpine3.12
        ...
        ```

    2. Define the MySQL database engine:

        ```yaml
        ...
        services:
            database:
                engine: mysql
                ...
        ```

    3. Bootstrap docker setup:

        ```bash
        docker/sdk boot {deploy_file.yml}
        ```

    4. Run the application with the new configuration:

        ```bash
        docker/sdk up
        ```

2. Update the desired workflow configuration file:

```yaml
  ...
    php-73-mysql-functional-alpine:
        name: "PHP 7.3 / MySQL / Functional / Alpine"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:7.3-alpine3.12
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.functional.yml
                  docker/sdk up -t
                  docker/sdk testing codecept run -c codeception.functional.yml
```



#### Example 2: Running Glue API tests on Debian with PostgreSQL and PHP 8.0

To run Glue API tests on Debian with PostgreSQL and PHP 8.0:
1. Update the desired deploy file:
    1. Define the Docker image tag:

        ```yaml
        ...
        image:
            tag: spryker/php:8.0-debian
        ...
        ```

    2. Define the PostgreSQL database engine:

        ```yaml
        ...
        services:
            database:
                engine: postgres
                ...
        ```

    3. Bootstrap docker setup:

        ```bash
        docker/sdk boot {deploy_file.yml}
        ```

    4. Run the application with the new configuration:

        ```bash
        docker/sdk up
        ```

2. Update the desired workflow configuration file:

```yaml
...
    php-80-postgresql-glue-debian:
        name: "PHP 8.0 / PostgreSQL / Glue / Debian"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:8.0-debian
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.glue.yml
                  docker/sdk up -t
                  docker/sdk testing codecept fixtures
                  docker/sdk testing console queue:worker:start --stop-when-empty
                  docker/sdk testing codecept run -c codeception.glue.yml
```

#### Example 3: Running acceptance tests on Alpine with MariaDB and PHP 7.4

{% info_block infoBox "Default configuration" %}

- Since Alpine is the default platform and we don't need a specific version, we don't define it in the image tag in the deploy and workflow files.
- MariaDB is the default database engine, so we don't need to define it in the deploy file.

{% endinfo_block %}


To run acceptance tests on Alpine with MariaDB and PHP 7.4:

1. In the desired deploy file, define the Docker image tag:

```yaml
...
image:
    tag: spryker/php:7.4
...
```

2. Update the desired workflow configuration file:

```yaml
...
    php-7.4-mariadb-acceptance-alpine:
        name: "PHP 7.4 / MariaDB / Acceptance / Alpine"
        runs-on: ubuntu-20.04
        env:
            PROGRESS_TYPE: plain
            SPRYKER_PLATFORM_IMAGE: spryker/php:7.4
            TRAVIS: 1

        steps:
            - uses: actions/checkout@v2

            - name: Install apt-packages
              run: |
                  sudo apt-get install apache2-utils
            - name: Install docker-compose
              run: |
                  sudo curl -L "https://github.com/docker/compose/releases/download/2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                  sudo chmod +x /usr/local/bin/docker-compose
            - name: Run docker
              run: |
                  git clone https://github.com/spryker/docker-sdk.git ./docker
                  docker/sdk boot -v deploy.ci.acceptance.yml
                  docker/sdk up -t
                  docker/sdk testing codecept run -c codeception.acceptance.yml
```

## Related documentation

- To learn about workflow configuration, see [Learn GitHub Actions](https://docs.github.com/en/actions/learn-github-actions).
- To learn how to choose the language and to create a basic template for workflow configuration files, see [Quickstart for GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/starting-with-preconfigured-workflow-templates)
- To learn about encrypted secrets in a workflow on demand, see [Encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
- To learn about the Deploy file, see [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html)
- To learn about configuring services with the Docker SDK, see [Configuring services](/docs/dg/dev/integrate-and-configure/configure-services.html)
</details>
