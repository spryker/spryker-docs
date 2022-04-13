---
title: Deployment pipelines
description: Deployment pipelines consist of three configurable stages.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/deployment-pipelines
originalArticleId: 14d91c9f-6c4e-4481-83ee-005683ce602f
redirect_from:
  - /docs/deployment-pipelines
  - /docs/en/deployment-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/deployment-pipelines/deployment-pipelines.html
---

Spryker Cloud Commerce OS(SCCOS) provides automated CI/CD(Continuous Integration/Continuous Deployment) Pipelines based on the following AWS Code Suite services:

*   [CodePipeline](https://aws.amazon.com/codepipeline/) - Build and Deploy scenarios

*   [CodeBuild](https://aws.amazon.com/codebuild/) - Stages of pipeline execution


## Deployment pipeline types


There are two deployment pipelines: normal and destructive.

_Normal deploy_ is a pipeline that includes all the stages of a complete CI/CD flow. You can set it to run automatically on version control system updates. The `install` stage of this pipeline does not perform any dangerous data manipulations like database cleanup or scheduler reset. Use it for production deployments.

_Destructive deploy_ is a pipeline that includes all the stages of a complete CI/CD flow. You can set it to run automatically on version control system updates. The `install` stage of this pipeline resets all the data in applications. Use it for initial or non-production deployments.

## Deployment stages


Regardless of the pipeline type, deployment is divided into three stages:

1. `pre-deploy`
2. `install`
3. `post-deploy`


The stages are configured as [CodeBuild projects](https://docs.aws.amazon.com/codebuild/latest/userguide/builds-projects-and-builds.html) in AWS.

Each stage is configured to execute a set of commands. The configuration is based on two files:

*   `buildspec.yml` provides the default configuration of SCCOS. This is a CodeBuild configuration file that is used if no custom configuration is provided for a stage.

*   `deploy.yml` provides a custom configuration overwriting `buildspec.yml`. This file is located in the project repository root.

{% info_block infoBox "Deploy file name" %}

Deploy file name depends on the project and environment you are working with.

{% endinfo_block %}


The variables in the `image: environment:` section of `deploy.yml` are injected into the Docker image built with [Spryker Docker SDK](/docs/scos/dev/the-docker-sdk/{{site.version}}/the-docker-sdk.html).

```yaml
...
image:
  tag: spryker/php:7.3-alpine3.12
  environment:
    SPRYKER_DEFAULT_STORE: "US"
    SPRYKER_ACTIVE_STORES: "US"
    SPRYKER_HOOK_BEFORE_DEPLOY: "vendor/bin/install -r US/pre-deploy -vvv"
    SPRYKER_HOOK_AFTER_DEPLOY: "true"
    SPRYKER_HOOK_INSTALL: "vendor/bin/install -r US/production --no-ansi -vvv"
    SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install -r US/destructive --no-ansi -vvv"
...
```

Any shell commands specified in environment variables as hooks are executed with a shell inside the CodeBuild runtime. For example:

```yaml
...
environment:
  SPRYKER_HOOK_BEFORE_DEPLOY: “touch /some/file && echo OK || echo FAIL“
  SPRYKER_HOOK_AFTER_DEPLOY: “curl http://some.host.com:<port>/notify“
  SPRYKER_HOOK_INSTALL: “chmod +x ./some_custom_script.sh && ./some_custom_scipt.sh“
  SPRYKER_HOOK_DESTRUCTIVE_INSTALL: “vendor/bin/install -r destructive --no-ansi -vvv“
...
 ```




## Pre-deploy stage


The `pre-deploy` stage is configured as a pre-deploy hook.

![pre-deploy-stage](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/pre-deploy-stage.png)

The command or a shell script executed during the `pre-deploy` stage are set in `image: environment: SPRYKER_HOOK_BEFORE_DEPLOY:`.

The default command is `vendor/bin/install -r pre-deploy -vvv`.

The CodeBuild project of this stage is named `Run_pre-deploy_for_<project_name>`. It uses the currently running application image in the ECS cluster as an environment image, and all Zed environment variables are accessible.

{% info_block warningBox "Updating the pre-deploy hook" %}

The CodeBuild project of the pre-deploy hook uses a *currently running* application image. If you add a new command to the hook, it is added to the hook during the next deployment. So, after updating the hook's configuration, the command only runs starting from the second deployment.

{% endinfo_block %}

The default configuration in `buildspec.yml` looks as follows:

![pre-deploy-spec](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/pre-deploy-buildspec.png)

## Install stage


The `install` stage is configured as an install script.

![install-stage](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/install-stage.png)

Depending on the pipeline type, the `install` stage command or script is specified in the following variables in `deploy.yml`:

*   normal: `image: environment: SPRYKER_HOOK_INSTALL:`

*   destructive: `image: environment: SPRYKER_HOOK_DESTRUCTIVE_INSTALL:`


The CodeBuild project of this stage is named `Run_install_for_<project_name>`. The currently built Docker image is used as the environment image and all Zed environment variables are accessible.

The default configuration in `buildspec.yml` looks as follows:

![install-spec](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/install-spec.png)

`production` and `destructive` refer to the `production.yml` and `destructive.yml` install scripts respectively. By default, they are located in `config/install`.


## Post-deploy stage


`post-deploy` stage is configured as a post-deploy hook.

![post-deploy-stage](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/post-deploy-stage.png)

The command or shell script of the `post-deploy` stage is set in `image: environment: SPRYKER_HOOK_AFTER_DEPLOY:`.

The CodeBuild project of this stage is named `Run_post-deploy_for_<project_name>`. The currently active image is used as the environment image of CodeBuild project and all Zed environment variables are accessible.

The default command just returns `true` during the `post-deploy` stage. The default configuration in `buildspec.yml` looks as follows:

![post-deploy-spec](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/post-deploy-spec.png)

## Deployment diagram

Schematically, deployment in Spryker Cloud Commerce OS looks as follows.

<details open>
    <summary>Deployment flow diagram</summary>

![deployment-diagram](https://confluence-connect.gliffy.net/embed/image/18f6b79e-7e90-4a4e-b371-20b44d49983b.png?utm_medium=live&utm_source=custom)

</details>

## Next steps


*   [Deploying in a staging environemnt](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html)
