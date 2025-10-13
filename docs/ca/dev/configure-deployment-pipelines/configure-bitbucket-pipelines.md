---
title: Configure Bitbucket Pipelines
description: Set up Bitbucket Pipelines for continuous integration and delivery in Spryker Cloud Commerce OS, with steps for configuring YAML files, validation, and test grouping.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/configuring-bitbucket-pipelines
originalArticleId: f100164f-976a-4ce5-b713-7c58335f9965
redirect_from:
  - /docs/configuring-bitbucket-pipelines
  - /docs/en/configuring-bitbucket-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/configuring-bitbucket-pipelines.html
---

This document describes how to configure continuous integration using Bitbucket Pipelines.

## Bitbucket Pipelines

Bitbucket Pipelines is an integrated CI/CD service, built into Bitbucket. It allows you to automatically build, test, and deploy your code, based on a configuration file in your repository.

For more information on Bitbucket Pipelines, see [Get started with Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/).

## Prerequisites

1. In the repository root, create the CI/CD configuration file: `bitbucket-pipelines.yml`.
2. To choose the language, create a basic pipeline template and environment variables, follow [Get started with Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/).

{% info_block infoBox "Secured variables" %}

To make the values of environment variables hidden in logs, set up secured variables. See [Variables and secrets](https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/) for details.


{% endinfo_block %}



## Configuring basic validation with Bitbucket Pipelines

Configure services and a basic validation of:

- code style
- architecture
- security
- database schema

<details>
    <summary>Example of bitbucket-pipelines.yml</summary>

```yaml
image: spryker/php:7.4-debian

pipelines:
  default:
    - step:
        size: 2x
        name: 'validation'
        caches:
          - composer
          - node
        script:
          - curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
          - apt-get update && apt-get install -y unzip && apt-get install -y nodejs && apt-get install -y npm
          - npm install && npm test
          - composer install --optimize-autoloader --no-interaction
          - vendor/bin/install $APPLICATION_STORE -r testing -x frontend -x queue -v
          - vendor/bin/phpstan analyze -c phpstan.neon src/ -l 4
          - vendor/bin/console propel:schema:validate
          - vendor/bin/console propel:schema:validate-xml-names
          - vendor/bin/console transfer:validate
          - vendor/bin/console code:sniff:style
          - vendor/bin/phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority 2
          - node ./frontend/libs/stylelint
          - node ./frontend/libs/tslint stylish
        services:
          - mysql
          - redis
          - elasticsearch
          - broker

definitions:
  services:
    mysql:
      image: mariadb:10.3
      variables:
        MYSQL_USER: $MYSQL_USER
        MYSQL_PASSWORD: $MYSQL_PASSWORD
        MYSQL_ROOT_PASSWORD: $MYSQL_ROOT_PASSWORD
        MYSQL_DATABASE: $MYSQL_DATABASE
    redis:
      image: redis:5.0-alpine
    elasticsearch:
      image: docker.elastic.co/elasticsearch/elasticsearch:6.8.4
      environment:
        ES_JAVA_OPTS: '-Xms512m -Xmx512m'
    broker:
      image: spryker/rabbitmq:4.1
      environment:
        RABBITMQ_DEFAULT_USER: $RABBITMQ_DEFAULT_USER
        RABBITMQ_DEFAULT_PASS: $RABBITMQ_DEFAULT_PASS
        RABBITMQ_DEFAULT_VHOST: $RABBITMQ_DEFAULT_VHOST
```

</details>



To adjust the services used in the configuration, see [Configure bitbucket-pipelines.yml](https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/).

## Configuring groups of tests

{% info_block infoBox %}

Docker SDK tests will be supported after Bitbucket starts supporting [Docker BuildKit](https://docs.docker.com/develop/develop-images/build_enhancements/). We will update this document with the configuration instructions.  

{% endinfo_block %}


To set up a job that runs a specific group of tests:

1. To `bitbucket-pipelines.yml`, add the following configuration template:

```yaml
...
    - step:
        image: spryker/php:{image_tag}
        name: 'tests'
        size: 2x
        caches:
            - composer
            - node
        script:
            - echo $APPLICATION_STORE
            - curl --location --output installer.sig https://composer.github.io/installer.sig
            - php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
            - php -r "if (hash_file('SHA384', 'composer-setup.php') === file_get_contents('installer.sig')) { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
            - php composer-setup.php
            - php -r "unlink('composer-setup.php'); unlink('installer.sig');"
            - php composer.phar config -g github-oauth.github.com $GITHUB_ACCESS_TOKEN
            - apt-get update && apt-get install -y unzip && apt-get install -y nodejs && apt-get install -y npm
            - npm install && npm test
            - composer install --optimize-autoloader --no-interaction
            - vendor/bin/install $APPLICATION_STORE -r testing -x frontend -x queue -v
            - APPLICATION_ENV=devtest vendor/bin/codecept run -c {tests_configuration_file}
```

2. Replace the placeholders with the actual values using the following description.

|PLACEHOLDER | DESCRIPTION | EXAMPLE IN THE PROPERTY VALUE |
|---|---|---|
|{image_tag} | Tag of the Docker image on which the validation is based. Check all the images in the [Spryker Docker hub](https://hub.docker.com/r/spryker/php/tags?page=1&ordering=last_updated&name=-debian). | 7.4 |
|{tests_configuration_file} | Codeception configuration files that defines the tests to run. Example: codeception.ci.functional.yml  | codeception.functional.yml|
