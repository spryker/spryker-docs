---
title: Configure Azure Pipelines
description: Set up Azure Pipelines for CI/CD in Spryker Cloud Commerce OS, with steps for YAML configuration, testing, and connecting to an AWS repository.
template: howto-guide-template
last_updated: Nov 21, 2024
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
1. On the [Support Portal](https://support.spryker.com), create a **Infrastructure Change Request/Access Management>Change** request for an existing Parameter Store Variable. In the request, link this document and request your AWS repository URL and credentials.

2. Add the following to the end of `azure-pipelines.yml`:
```yaml
...
- job: repo_mirror
  displayName: "Mirror repository to the AWS"
  variables:
    - group: AWS_repo_credentials #there possible to store credentials and use them in the different pipelines
  pool:
    vmImage: ubuntu-latest
  steps:
    - checkout: none
    - script: |
        # Install urlencode function to encode reserved characters in passwords
        sudo apt-get install gridsite-clients

        mkdir repo-mirror
        # Create local mirror of Azure DevOps repository
        git -c http.extraheader="AUTHORIZATION: bearer $(System.AccessToken)" clone --mirror $(AZURE_REPO_URL) repo-mirror

        # Sync AWS CodeCommit repository
        cd repo-mirror
        git push --mirror https://$(AWS_GIT_USERNAME):$(urlencode $(AWS_GIT_PASSWORD))@$(AWS_REPO_URL)

      displayName: 'Sync repository with AWS CodeCommit'
```

3. For security reasons, we recommend adding variables to Azure DevOps group variables instead of hardcoding them. For the prior example, create a group with the name `AWS_repo_credentials` and the following variables:

| VARIABLE | DESCRIPTION |
| - | - |
| `$(AZURE_REPO_URL)` |  URL of your Azure repository. |
| `$(AWS_REPO_URL)` |  URL of the AWS repository you’ve received from support. |
| `$(AWS_GIT_USERNAME)` and `$(AWS_GIT_PASSWORD)` |  credentials you’ve received from support. |
| `$(System.AccessToken)` |  Azure DevOps internal variable to access the current repo. You can also use other auth options. For more information, see [Pipeline options for Git repositories](https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/pipeline-options-for-git). |



You’ve configured Azure pipelines.
