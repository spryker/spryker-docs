---
title: Configuring GitLab pipelines
description: Learn how to configure GitLab Pipelines for continuous integration and delivery in Spryker Cloud Commerce OS
template: howto-guide-template
last_updated: Dec 4, 2023
originalLink: https://cloud.spryker.com/docs/configuring-gitlab-pipelines
originalArticleId: ed39b199-299a-4ad0-87c0-b259c5c171f0
redirect_from:
  - /docs/configuring-gitlab-pipelines
  - /docs/en/configuring-gitlab-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/configuring-gitlab-pipelines.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/configuring-gitlab-pipelines.html
---

This document describes how to configure continuous integration using GitLab Pipelines.

## What is GitLab Pipelines?
GitLab pipelines automate steps in the SDLC like builds, tests, and deployments. When a team takes advantage of automated pipelines, they simplify the handoff process and decrease the chance of human error, creating faster iterations and better quality code. Everyone can see where code is in the process and identify problems long before they make it to production.

For more information on Gitlab Pipelines, see [GitLab CI/CD](https://docs.gitlab.com/ee/ci/pipelines/).

## Prerequisites
In the repository root, create the CI/CD configuration file: `.gitlab-ci.yml`.

## Configuring groups of tests via the Docker SDK
To configure GitLab pipelines:

1. To `.gitlab-ci.yml`, add the basic configuration:

```yaml
variables:
  DOCKER_HOST: tcp://docker:2375
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ""
  GIT_SUBMODULE_STRATEGY: recursive
default:
  image: docker/compose:latest
  services:
    - docker:19.03.12-dind
.tests:
  stage: test
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_PIPELINE_SOURCE == "scheduled"
    - if: $CI_PIPELINE_SOURCE == "push"
      when: never
    - when: always
  artifacts:
    when: always
  before_script:
    - apk update && apk upgrade && apk add bash curl git
    - docker info
    - docker-compose -v
    - git clone https://github.com/spryker/docker-sdk.git ./docker
    - bash docker/sdk boot -v $YMLPATH
    - bash docker/sdk up -t -v
```

2. After the basic configuration, add the following template for running Docker SDK tests:

```yaml
{tests_type}:
  extends: .tests
  variables:
    YMLPATH: {deployment_configuration_file}
    JUNITREPORT: {tests_configuration_file}
  script:
    - bash docker/sdk testing codecept run -c {tests_configuration_file} --xml /data/$JUNITREPORT
```

3. Glue API tests: To fill the storage with the data used by Glue API, add the following commands to load fixtures to the `Run docker` action as shown in the code snippet:
* `docker/sdk testing codecept fixtures -d`
* `docker/sdk testing console queue:worker:start --stop-when-empty`

```yaml
{tests_type}:
  extends: .tests
  variables:
    YMLPATH: {deployment_configuration_file}
    JUNITREPORT: {tests_configuration_file}
  script:
    - bash docker/sdk testing codecept fixtures -d
    - bash docker/sdk testing console queue:worker:start --stop-when-empty
    - bash docker/sdk testing codecept run -c {tests_configuration_file} --xml /data/$JUNITREPORT
```

4. Replace the placeholders with the actual values using the following description.

|PLACEHOLDER |DESCRIPTION |VALUE EXAMPLE |
|---|---|---|
| {tests_type} |A group of tests to run. |api-tests |
| {deployment_configuration_file} |Deploy file configured for building application suitable to run the desired group of tests. Example: [deploy.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/deploy.ci.functional.yml) |deploy.ci.functional.mariadb.yml |
| {tests_configuration_file} |Codeception configuration files that defines the tests to run. Example: [codeception.ci.functional.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/codeception.ci.functional.yml)  |codeception.functional.yml|

5. Repeat steps 2-4 until you add all the desired tests.

6. In the end of the file, add the job that performs the basic validation like:

* code style
* architecture
* security
* database schema

```yaml
...
validation:
  extends: .tests
  variables:
    YMLPATH: deploy.ci.functional.mariadb.yml
  script:
    - bash docker/sdk console dev:ide-auto-completion:generate
    - bash docker/sdk console search:setup:source-map
    - bash docker/sdk console transfer:entity:generate
    - bash docker/sdk console transfer:generate
    - bash docker/sdk console propel:schema:validate -vvv
    - bash docker/sdk console propel:schema:validate-xml-names -vvv
    - bash docker/sdk console transfer:validate -vvv
    - bash docker/sdk console code:sniff:style -vvv
    - bash docker/sdk console code:phpstan -vvv
    - bash docker/sdk cli phpstan analyze -c phpstan.neon -l 5 -vvv src/
    - bash docker/sdk cli phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority 2
    - bash docker/sdk cli vendor/bin/phpcs --standard=config/ruleset.xml -v src/Pyz
    - bash docker/sdk cli vendor/bin/psalm.phar -c psalm.xml --long-progress --stats
```


## Running Docker SDK tests: Configuration examples
This section describes examples of running groups of tests.

Glue API tests:
```yaml
api-tests:
  extends: .tests
  variables:
    YMLPATH: deploy.ci.api.mariadb.yml
    JUNITREPORT: codeception.api.xml
  script:
    - bash docker/sdk testing codecept fixtures -d
    - bash docker/sdk testing console queue:worker:start --stop-when-empty
    - bash docker/sdk testing codecept run -c codeception.api.yml --xml /data/$JUNITREPORT
```

Functional tests:
```yaml
functional-tests:
  extends: .tests
  variables:
    YMLPATH: deploy.ci.functional.mariadb.yml
    JUNITREPORT: codeception.functional.xml
  script:
    - bash docker/sdk testing codecept run -c codeception.functional.yml --xml /data/$JUNITREPORT
```
Acceptance tests:

```yaml
functional-tests:
  extends: .tests
  variables:
    YMLPATH: deploy.ci.acceptance.mariadb.yml
    JUNITREPORT: codeception.acceptance.xml
  script:
    - bash docker/sdk testing codecept run -c codeception.acceptance.yml --xml /data/$JUNITREPORT
```

## See also

For more configuration options of GitLab pipelines, see [CI/CD YAML syntax reference](https://docs.gitlab.com/ee/ci/yaml/).
