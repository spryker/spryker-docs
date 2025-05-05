---
title: Add variables in the Parameter Store
description: Learn to add and manage environment variables in Spryker's Parameter Store, including variable structure guidelines for secure and organized configuration.
last_updated: Aug 21, 2023
template: howto-guide-template
keywords: environment variable management
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/managing-parameters-in-the-parameter-store.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/define-parameter-and-secret-values-in-sccos-environments.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/add-variables.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/add-variables-in-the-parameter-store.html
  - /docs/managing-parameters-in-the-parameter-store
  - /docs/en/managing-parameters-in-the-parameter-store
  - /docs/cloud/dev/spryker-cloud-commerce-os/managing-parameters-in-the-parameter-store.html
  - /docs/ca/dev/managing-parameters-in-the-parameter-store.html
---

Variables, such as parameters and secrets, are used for multiple purposes, like storing mail server details or providing Composer authentication details to the build and deploy process securely.

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}

For complex or system-critical changes to variables, we recommend consulting with our support to prevent unexpected issues.

## Customer-owned and Spryker-owned variables

There are two types of environment variables: customer-owned and Spryker-owned.

Spryker-owned variables are managed and can be updated only with the help of Spryker Cloud or support teams. To request a variable change, in [Support Portal](https://support.spryker.com/), create the following request: Infrastructure Change Request > Change to existing parameter store variable.

Customer-owned variables are created and managed by you or implementation partner. You have full control over these variables and can add or edit them according to your needs. Changes to these variables don't automatically propagate into a running environment. To apply changes made to your environment variables, you need to run an ECS-updater-* pipeline to bring them to the containers or run a full redeploy. You can do this whole process without creating support tickets.

### Customer-owned variables with limited access

The following customer-owned variables can be updated only with the help of Spryker Cloud or support teams:

* /{project}/{environment}/secret/scheduler/limited/{variable_name}

* /{project}/{environment}/secret/pipeline/limited/{variable_name}

* /{project}/{environment}/secret/infra/limited/{variable_name}

* /{project}/{environment}/secret/common/limited/{variable_name}

* /{project}/{environment}/secret/app/limited/{variable_name}

* /{project}/{environment}/config/scheduler/limited/{variable_name}

* /{project}/{environment}/config/pipeline/limited/{variable_name}

* /{project}/{environment}/config/infra/limited/{variable_name}

* /{project}/{environment}/config/common/limited/{variable_name}

* /{project}/{environment}/config/app/limited/{variable_name}


## Naming convention for variables

Variables must follow this naming convention: `/{project}/{environment}/{type}/{bucket}/{grant}/{variable_name}`.

Placeholder description:

* `type`: defines the type of a variable. Possible values:
  * `config`: parameter
  * `secret`: secret

* `bucket`: defines what services a variable is used for. Possible values:
  * `common`: used by all the buckets.
  * `app`: used only by application services.
  * `scheduler`: used by the scheduler.

* `grant`: Defines access permissions to variables. Possible values:
  * `public`: readable and writable
  * `limited`: readable

Path examples:

* /fashion_club_store/staging/config/common/limited/composer_pass

* /deans_jeans/prod/config/app/public/mail_host

### Reserved variables

Reserved variables are reserved in Spryker for dedicated functions. These names can't be used to create more variables. If you're already using reserved variables in your code, you need to change their names to avoid any service issues.

Reserved variables:
* `SPRYKER_*`: Every variable name with this prefix
* `ALLOWED_IP`
* `BLACKFIRE_AGENT_SOCKET`
* `BLACKFIRE_SERVER_ID`
* `BLACKFIRE_SERVER_TOKEN`
* `DATA_IMPORT_S3_BUCKET`
* `DATA_IMPORT_S3_KEY`
* `DATA_IMPORT_S3_SECRET`
* `DUMMY_INIT`
* `ENABLE_NRI_ECS`
* `JAVA_OPTS`
* `JENKINS_URL`
* `NEWRELIC_APPNAME`
* `NEWRELIC_ENABLED`
* `NEWRELIC_LICENSE`
* `NRIA_CUSTOM_ATTRIBUTES`
* `NRIA_LICENSE_KEY`
* `NRIA_OVERRIDE_HOST_ROOT`
* `NRIA_PASSTHROUGH_ENVIRONMENT`
* `NRIA_VERBOSE`
* `ONEAGENT_INSTALLER_DOWNLOAD_TOKEN`
* `ONEAGENT_INSTALLER_SCRIPT_URL`
* `RABBITMQ_DEFAULT_PASS`
* `RABBITMQ_DEFAULT_USER`
* `RABBITMQ_DEFAULT_VHOST`
* `RABBITMQ_ENDPOINT`
* `RABBITMQ_EXCHANGE_REGEXES`
* `RABBITMQ_INTEGRATIONS_INTERVAL`
* `RABBITMQ_NODENAME`
* `RABBITMQ_PASSWORD`
* `RABBITMQ_PORT`
* `RABBITMQ_QUEUES_REGEXES`
* `RABBITMQ_USE_SSL`
* `RABBITMQ_USERNAME`
* `TIDEWAYS_APIKEY`
* `TIDEWAYS_CLI_ENABLED`
* `TIDEWAYS_DAEMON_URI`
* `TIDEWAYS_ENVIRONMENT`



## Variable path hierarchy

Path hierarchy is needed to cover the cases when several variables with the same name are declared. If several variables with the same name are declared, the variable with a higher priority applies. The following rules define the priority of variables:

1. For any `type` and `bucket`, the priority is `public` > `limited`.
2. Foy any `bucket`, the priority is `bucket` > `common`.
3. For any variable with the same name, the priority is `secret` > `config`.

The following variables are arranged from lower to higher priority:

* /{project}/{environment}/config/common/limited/{variable_name}

* /{project}/{environment}/config/common/public/{variable_name}

* /{project}/{environment}/config/{app | scheduler}/limited/{variable_name}

* /{project}/{environment}/config/{app | scheduler}/public/{variable_name}

* /{project}/{environment}/secret/common/limited/{variable_name}

* /{project}/{environment}/secret/common/public/{variable_name}

* /{project}/{environment}/secret/{app | scheduler}/limited/{variable_name}

* /{project}/{environment}/secret/{app | scheduler}/public/{variable_name}

## Add variables

The following sections describe how to add parameters and secrets for different resources.

### Add parameters to all resource types

1. In the AWS Management Console, go to **Services&nbsp;<span aria-label="and then">></span> Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/config/common/public/{variable_name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: For **Description**, enter a description of the variable. This may be a note about what this variable is used for.
5. For **Type**, select a type of the variable based on your requirements.
6. For **Value**, enter the value of the variable.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.
8. Go to **Services**&nbsp;<span aria-label="and then">></span> **CodePipeline**.
9. On the **Pipelines** page, select the **NORMAL_Deploy_Spryker_{project}-{environment}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.

### Add secrets to all resource types

1. In the AWS Management Console, go to **Services&nbsp;<span aria-label="and then">></span> Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/secret/common/public/{variable_name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: For **Description**, enter a description of the variable. This may be a note about what this variable is used for.
    This may be a note about what this variable is used for.
5. For **Type**, select **SecureString**.
6. For **Value**, enter the value of the variable.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.
8. Go to **Services&nbsp;<span aria-label="and then">></span> CodePipeline**.
9. On the **Pipelines** page, select the **NORMAL_Deploy_Spryker_{project}-{environment}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.

### Add parameters to ECS applications

1. In the AWS Management Console, go to **Services&nbsp;<span aria-label="and then">></span> Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/config/app/public/{variable_name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: For **Description**, enter a description of the variable. This may be a note about what this variable is used for.
    This may be a note about what this variable is used for.
5. For **Type**, select a type of the variable based on your requirements.
6. For **Value**, enter the value of the variable.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.
8. Go to **Services&nbsp;<span aria-label="and then">></span> CodePipeline**.
9. On the **Pipelines** page, select the **ECS-updater-{project}-{environment}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.

### Adding secrets to ECS applications

1. In the AWS Management Console, go to **Services&nbsp;<span aria-label="and then">></span> Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/secret/app/public/{variable_name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: For **Description**, enter a description of the variable. This may be a note about what this variable is used for.
    This may be a note about what this variable is used for.
5. For **Type**, select **SecureString**.
6. For **Value**, enter the value of the variable.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.
8. Go to **Services**&nbsp;<span aria-label="and then">></span> **CodePipeline**.
9. On the **Pipelines** page, select the **ECS-updater-{project}-{environment}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.

### Add parameters and secrets to Scheduler

1. In the AWS Management Console, go to **Services&nbsp;<span aria-label="and then">></span> Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter one of the following:
    * Variable: `/{project}/{environment}/config/scheduler/public/{variable_name}`
    * Secret: `/{project}/{environment}/secret/scheduler/public/{variable_name}`
        Make sure to replace the placeholders based on your requirements.
4. Optional: For **Description**, enter a description of the variable. This may be a note about what this variable is used for.
    This may be a note about what this variable is used for.
5. For **Type**, select **SecureString**.
6. For **Value**, enter the value of the variable.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.
8. Go to **Services&nbsp;<span aria-label="and then">></span> CodePipeline**.
9. On the **Pipelines** page, select the **Rollout_Scheduler_{project}-{environment}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.  
