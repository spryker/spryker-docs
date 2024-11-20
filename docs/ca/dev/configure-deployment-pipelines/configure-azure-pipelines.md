---
title: Configure Azure Pipelines
description: Set up Azure Pipelines for CI/CD in Spryker Cloud Commerce OS, with steps for YAML configuration, testing, and connecting to an AWS repository.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/configuring-azure-pipelines
originalArticleId: df3448d4-34a8-43a8-bc58-f37ea8b6cd8d
redirect_from:
  - /docs/configuring-azure-pipelines
  - /docs/en/configuring-azure-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/configuring-azure-pipelines.html
---

This document describes how to configure Azure pipelines and connect them to your Spryker Commerce OS project.

Azure Pipelines automatically builds and tests code projects to make them available to others. It works with just about any language or project type. Azure Pipelines combines continuous integration (CI) and continuous delivery (CD) to constantly and consistently test and build your code and ship it to any target.

The main building blocks of azure pipelines are stages, jobs, and steps. To learn more, see [Azure Pipelines documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/?view=azure-devops).

## Prerequisites

In the repository root directory, create the CI/CD configuration file: `azure-pipelines.yml`.

## Configuring groups of tests via the Docker SDK

Adjust the following example or use it as a reference to configure the desired group of tests:

```yaml
pool:
    vmImage: ubuntu-18.04

steps:
    - script:
          git clone https://github.com/spryker/docker-sdk.git docker
      displayName: 'Download docker/sdk'

    # Azure vm doesn't have `/dev/stderr` device.
    # To prevent a pipline fail, stderr redirected to `/dev/null`
    - script:
          docker/sdk bootstrap deploy.ci.functional.yml 2>/dev/null
      displayName: 'Boot project'

    - script:
          docker/sdk up -t
      displayName: 'Launch project'

    - script: |
          docker/sdk console code:sniff:style
      displayName: 'Code style check'

    - script: |
          docker/sdk console propel:schema:validate -vvv
          docker/sdk console propel:schema:validate-xml-names -vvv
          docker/sdk console transfer:validate -vvv
      displayName: 'Propel schemas validation'

    - script: |
          docker/sdk console transfer:validate -vvv
      displayName: 'Transfer validation'

    - script: |
          docker/sdk console code:phpstan --level=4
          docker/sdk cli phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority 2
      displayName: 'Static code analysis'

    - script:
          docker/sdk testing codecept run -c codeception.functional.yml
      displayName: 'Functional tests'
  ```

## Connecting Azure Pipelines to your project

To connect Azure Pipelines with your AWS repository:
1. Request your AWS repository URL and credentials from [support](https://spryker.force.com/support/s/).

2. Add the following to the end of `azure-pipelines.yml`:
```yaml
...
    - script: |
          git clone --mirror ${source-repo.url} ${source-repo.name}
          cd ${source-repo.name} && ls -la
          git remote add sync git remote add sync https://${target-repo.username}:${target-repo.password}@${target-repo.url}
          git push sync --mirror
    displayName: 'Sync with Target repo'
```

Values to replace:

`{source-repo.url}`: URL of your Azure repository.

`{source-repo.name}`: name of the directory from which the repository will be mirrored.

`{aws.mirror-repo.url}`: URL of the AWS repository you’ve received from support.

`{target-repo.username}` and `{target-repo.password}`: credentials you’ve received from support.



You’ve configured Azure pipelines.
