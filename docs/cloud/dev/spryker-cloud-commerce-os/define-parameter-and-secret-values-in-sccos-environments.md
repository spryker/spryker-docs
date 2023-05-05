---
title: Add parameters and secrets
description: Learn how to define parameter values in the Parameter Store.
last_updated: Jan 23, 2023
template: howto-guide-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/managing-parameters-in-the-parameter-store.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/define-parameter-and-secret-values-in-sccos-environments.html
---

Variables, such as parameters and secrets, are used for multiple purposes, like storing mail server details or providing Composer authentication details to the build and deploy process securely.


## Naming convention for variables

Variables must follow this naming convention: `/{project}/{environment}/{type}/{bucket}/{grant}/{name}`.

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

* /fashion_club_store/staging/config/common/limited

* /deans_jeans/prod/config/app/public


## Variable path hierarchy

Path hierarchy is needed to cover the cases when several variables with the same name are declared. If several variables with the same name are declared, the variable with a higher priority applies. The following rules apply:

1. For any `type` and `bucket`, the priority is `public` > `limited` > `internal`.
2. Foy any `bucket`, the priority is `bucket` > `common`.
3. For any variable with the same name, the priority is `secret` > `config`.

The following variables are arranged from lower to higher priority:

* /{project}/{environment}/config/common/internal

* /{project}/{environment}/config/common/limited

* /{project}/{environment}/config/common/public

* /{project}/{environment}/config/{app | scheduler}/internal

* /{project}/{environment}/config/{app | scheduler}/limited

* /{project}/{environment}/config/{app | scheduler}/public

* /{project}/{environment}/secret/common/internal

* /{project}/{environment}/secret/common/limited

* /{project}/{environment}/secret/common/public

* /{project}/{environment}/secret/{app | scheduler}/internal

* /{project}/{environment}/secret/{app | scheduler}/limited

* /{project}/{environment}/secret/{app | scheduler}/public

## Add variables

The following sections describe how to add variables and secrets for different resources.

{% info_block warningBox "Propagation of variables" %}

To make variables available in your Jenkins instance, we need to terraform your added or changed variables. To do this, create a [support case](https://docs.spryker.com/docs/scos/user/intro-to-spryker/support/how-to-use-the-support-portal.html#plattform-change-requests).

{% endinfo_block %}

## Add plaintext variables to all resource types

1. In the AWS Management Console, go to **Services > Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/config/common/public/{name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: Enter a **Description**.
    This may be a note about what this variable is used for.
5. Select a **Type** based on your requirements.    
6. Enter a **Value**.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.    
8. Go to **Services** > **CodePipeline**.
9. On the **Pipelines** page, select the **NORMAL_Deploy_Spryker_{project}-{environemt}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.

## Add secret variables to all resource types

1. In the AWS Management Console, go to **Services > Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/secret/common/public/{name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: Enter a **Description**.
    This may be a note about what this variable is used for.
5. For **Type**, select **SecureString**.
6. Enter a **Value**.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.    
8. Go to **Services** > **CodePipeline**.
9. On the **Pipelines** page, select the **NORMAL_Deploy_Spryker_{project}-{environemt}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.

## Add plaintext variables to ECS applications

1. In the AWS Management Console, go to **Services > Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/config/app/public/{name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: Enter a **Description**.
    This may be a note about what this variable is used for.
5. Select a **Type** based on your requirements.    
6. Enter a **Value**.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.    
8. Go to **Services** > **CodePipeline**.
9. On the **Pipelines** page, select the **ECS-updater-{project}-{environemt}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.

## Adding secret variables to ECS applications

1. In the AWS Management Console, go to **Services > Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter `/{project}/{environment}/secret/app/public/{name}`.
    Make sure to replace the placeholders based on your requirements.
4. Optional: Enter a **Description**.
    This may be a note about what this variable is used for.
5. For **Type**, select **SecureString**.
6. Enter a **Value**.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.    
8. Go to **Services** > **CodePipeline**.
9. On the **Pipelines** page, select the **ECS-updater-{project}-{environemt}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.    

## Add variables and secrets to Scheduler

1. In the AWS Management Console, go to **Services > Parameter Store**.
2. In the **My parameters** pane, click **Create parameter**.
    This opens the **Create parameter** page.
3. For **Name**, enter one of the following:
    * Variable: `/{project}/{environment}/config/scheduler/public/{name}`
    * Secret: `/{project}/{environment}/secret/scheduler/public/{name}`
        Make sure to replace the placeholders based on your requirements.
4. Optional: Enter a **Description**.
    This may be a note about what this variable is used for.
5. For **Type**, select **SecureString**.
6. Enter a **Value**.
7. Click **Create parameter**.
    This opens the **Parameter Store** page with a success message displayed.    
8. Go to **Services** > **CodePipeline**.
9. On the **Pipelines** page, select the **Rollout_Scheduler_{project}-{environemt}** pipeline.
10. On the pipeline's page, click **Release change**.
11. In the **Release change** window, click **Release**.
    After the pipeline finishes running, the variable gets available for your application.  
