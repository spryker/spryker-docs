---
title: Deployment in states
description: Deployment pipelines consist of three configurable stages.
template: howto-guide-template
originalLink: https://cloud.spryker.com/docs/deployment-pipelines
originalArticleId: 14d91c9f-6c4e-4481-83ee-005683ce602f
redirect_from:
  - /docs/deployment-pipelines
  - /docs/en/deployment-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/deployment-pipelines/deployment-pipelines.html
---

When it comes to complex applications, deploying to production environments is not just going from version one to version two. This document describes the states which an application goes through during a deployment and how they affect its behavior.

## Prerequisites

To learn how pipelines work in SCCOS, see [Deployment pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/deployment-pipelines.html).

## Production pipeline steps

A regular production pipeline contains the following steps. Highlighted in **italic** are the steps that have a potential to break or impact the application.

* Source
* Please_approve
* Build_and_Prepare
* **Configure_RabbitMQ_Vhosts_and_Permissions**
* **Run_pre-deploy_hook**
* Pre_Deployment_Configuration
* **Deploy_Scheduler**
* **Run_install**
* **Deploy_Spryker_services**
* UpdateDeployedVersion
* Post_Deployment_Configuration
* **Run_post-deploy_hook**

The following sections describe the potential issues applications can encounter during each step of deployment. To cover all the issues, we use pessimistic scenarios. During an actual deployment, an application is more likely to encounter one of the issues than all of them.

## Initial state

This is how an working application behaves when no pipeline is running:

![Initial state](./images/initial_state/initial-state.gif)

## Build_and_Prepare

In this step, we build the containers of each service that we are going to deploy, like zed, yves, frontend, backoffice, backapi or glue. For the sake of simplicity, we will use only Glue and Zed in our examples.

![Build_and_Prepare](./images/Build_and_Prepare/Build_and_Prepare.jpg)

## Configure_RabbitMQ_Vhosts_and_Permissions

In this step, Rabbit MQ vhosts, users, and permissions are updated. Usually, they are changed rarely, but if you do, while they are being updated, the following happens:

![Configure_RabbitMQ_Vhosts_and_Permissions](./images/Configure_RabbitMQ_Vhosts_and_Permissions/rmq.gif)

### Run_pre-deploy_hook

In this step, the following happens:
* The scripts you defined are run. If a script takes a long time to run, while it's running, all the services that are in an updated state, may respond incorrectly to requests.
* The scheduler stops. It waits for the currently running jobs to finish and gracefully shuts down. Stopping the scheduler prevents data corruption or errors for the duration of the deployment.

![scheduler:suspend](./images/Run_pre-deploy_hook/Run_pre-deploy_hook.jpg)

While the scheduler finishes the currently running jobs and the scripts you defined for this step run, requests are coming in:

![Run_pre-deploy_hook](./images/Run_pre-deploy_hook/pre_deploy.gif)

### Deploy_Scheduler

In this step, scheduler v2 is deployed. Because the scheduler has been paused, it will not run against incorrect data or services.

{% info_block infoBox "" %}

Scheduler is based on the Zed container, as it uses the codebase of Zed.

{% endinfo_block %}

![scheduler_paused](./images/Deploy_Scheduler/Deploy_Scheduler.jpg)

In the mean time, requests are still coming in:

![Deploy_Scheduler](./images/Deploy_Scheduler/deploy_scheduler.gif)

### Run_install

This step should take care of running the necessary migrations for our new version (V2 here) of our application. After this step, the database should be updated. However, Search and Redis are not, as we "paused" the synchronization.

![migrations](./images/Run_install/migrations.jpg)

we should realize by now, that requests still coming in might error out. It all depends on what was migrated.

At the very end of this step, we re-enable our scheduler, and setup the new jobs (if there was any)
```shell
vendor/bin/console scheduler:setup -vvv --no-ansi
```
When this command run, it will restart our queue workers, and update search and redis.

![Run_install](./images/Run_install/install_dbs_updates/install_dbs_updates.gif)

Depending on the amount of data that needs to be processed, this process may take a while. While Redis and search are being updated, they cannot process the requests the are coming in:

![Run_install_requests](./images/Run_install/request_during_install/install_request.gif)

### Deploy_Spryker_services
Finally, we are going to deploy our services with the updated codebase. (Zed V2, Glue V2).
For the sake of simplicity, let's assume that Redis and search are done updating. (We leave the asterisks on the schema, as a reminder that it might not be the case, it depends on the size of the migration)

![Deploy_Spryker_services](./images/Deploy_Spryker_services/Deploy_Spryker_services.jpg)

This process takes some time. AWS first spawn our v2 services, and when they are up and running, they take V1 down.
We do not control this process, so there is potentially a timeframe here where the application will run V1 and V2 or services in a random combination. (pessimistic approach)


![Deploy_Spryker_services_requests](./images/Deploy_Spryker_services/deploy_services.gif)

### Run_post-deploy_hook
This step is the final step that has an impact on the pipeline. It runs the script associated with the constant `SPRYKER_HOOK_AFTER_DEPLOY`. By default, it is not associated with any script.
We mention it here, because we need to keep in mind that any script run during the pipeline will have an impact on the total running time of the deployment.

That's all.
