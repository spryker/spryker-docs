---
title: Add variables in the Parameter Store
description: Learn how to define variables in the Parameter Store.
last_updated: May 3, 2023
template: howto-guide-template
keywords: environment variable management
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/managing-parameters-in-the-parameter-store.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/define-parameter-and-secret-values-in-sccos-environments.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/add-variables.html
---



Variables, such as parameters and secrets, are used for multiple purposes, like storing mail server details or providing Composer authentication details to the build and deploy process securely.

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}


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
    * `internal`: hidden

Path examples:

* /fashion_club_store/staging/config/common/limited/composer_pass

* /deans_jeans/prod/config/app/public/mail_host


## Variable path hierarchy

Path hierarchy is needed to cover the cases when several variables with the same name are declared. If several variables with the same name are declared, the variable with a higher priority applies. The following rules define the priority of variables:

1. For any `type` and `bucket`, the priority is `public` > `limited` > `internal`.
2. Foy any `bucket`, the priority is `bucket` > `common`.
3. For any variable with the same name, the priority is `secret` > `config`.

The following variables are arranged from lower to higher priority:

* /{project}/{environment}/config/common/internal/{variable_name}

* /{project}/{environment}/config/common/limited/{variable_name}

* /{project}/{environment}/config/common/public/{variable_name}

* /{project}/{environment}/config/{app | scheduler}/internal/{variable_name}

* /{project}/{environment}/config/{app | scheduler}/limited/{variable_name}

* /{project}/{environment}/config/{app | scheduler}/public/{variable_name}

* /{project}/{environment}/secret/common/internal/{variable_name}

* /{project}/{environment}/secret/common/limited/{variable_name}

* /{project}/{environment}/secret/common/public/{variable_name}

* /{project}/{environment}/secret/{app | scheduler}/internal/{variable_name}

* /{project}/{environment}/secret/{app | scheduler}/limited/{variable_name}

* /{project}/{environment}/secret/{app | scheduler}/public/{variable_name}

## Add variables

The following sections describe how to add parameters and secrets for different resources.

{% info_block warningBox "Propagation of variables" %}

To make variables available in your Jenkins instance, we need to terraform your added or changed variables. To do this, create a [support case](/docs/scos/user/intro-to-spryker/support/how-to-use-the-support-portal.html#platform-change-requests).

{% endinfo_block %}

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
