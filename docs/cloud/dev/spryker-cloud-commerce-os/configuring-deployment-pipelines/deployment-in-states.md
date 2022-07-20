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

When it comes to complex applications, deploying to production environments is not just going from version one to version two. This document describes the states which an application goes through during a deployment, potential issues, and what you need to do to avoid them.

## Pipelines in SCCOS

To learn how pipelines work in Spryker Cloud Commerce OS, see [Deployment pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/deployment-pipelines.html).

## Production pipeline steps

A regular production pipeline contains the following steps. Highlighted in *italic* are the steps that may break or impact the application.

* Source
* Please_approve
* Build_and_Prepare
* *Configure_RabbitMQ_Vhosts_and_Permissions*
* *Run_pre-deploy_hook*
* Pre_Deployment_Configuration
* *Deploy_Scheduler*
* *Run_install*
* *Deploy_Spryker_services*
* UpdateDeployedVersion
* Post_Deployment_Configuration
* *Run_post-deploy_hook*

The following sections describe the potential issues applications can encounter during each step of deployment. To cover all the issues, we use pessimistic scenarios. During an actual deployment, an application is more likely to encounter one of the issues than all of them.

## Initial state

This is how an working application behaves when no pipeline is running:

![Initial state](./images/initial_state/initial-state.gif)

## Build_and_Prepare

In this step, the containers of the services that are going to deployed are built. For the sake of simplicity, we use only Glue and Zed in our examples.

![Build_and_Prepare](./images/Build_and_Prepare/Build_and_Prepare.jpg)

## Configure_RabbitMQ_Vhosts_and_Permissions

In this step, Rabbit MQ vhosts, users, and permissions are updated. Usually, you would change them rarely, but, if you do, while they are being updated, the following may happen:

![Configure_RabbitMQ_Vhosts_and_Permissions](./images/Configure_RabbitMQ_Vhosts_and_Permissions/rmq.gif)

## Run_pre-deploy_hook

In this step, the following happens:
* The scripts you defined for this step in the `SPRYKER_HOOK_BEFORE_DEPLOY` are run. The default command is `vendor/bin/install -r pre-deploy -vvv`.
* The scheduler stops by the `vendor/bin/console scheduler:suspend -vvv --no-ansi` command. It waits for the currently running jobs to finish and gracefully shuts down. Stopping the scheduler prevents data corruption or errors for the duration of the deployment.

![scheduler:suspend](./images/Run_pre-deploy_hook/Run_pre-deploy_hook.jpg)

While the scripts you defined are running and the scheduler finishes the currently running jobs, requests keep coming in. For this duration, all the services that are in an updated state may respond incorrectly to requests:

![Run_pre-deploy_hook](./images/Run_pre-deploy_hook/pre_deploy.gif)

## Deploy_Scheduler

In this step, scheduler V2 is deployed. Because the scheduler has been paused, it will not run against incorrect data or services.

{% info_block infoBox "" %}

Scheduler is based on the Zed container, as it uses the codebase of Zed.

{% endinfo_block %}

![scheduler_paused](./images/Deploy_Scheduler/Deploy_Scheduler.jpg)

During this step, all the services in an updated state may still respond to requests incorrectly:

![Deploy_Scheduler](./images/Deploy_Scheduler/deploy_scheduler.gif)

## Run_install

In this step, the scripts in the `SPRYKER_HOOK_INSTALL` are run. By default, it is `vendor/bin/install -r EU/production --no-ansi -vvv`.

The script runs all the propel database migrations, so the database is updated to V2. However, Search and Redis are not, as we "paused" the synchronization.

![migrations](./images/Run_install/migrations.jpg)

From this point on, all the V1 services that are communicating with the database may respond to requests incorrectly. For each request, it depends on what data was migrated. For example, Glue V1 retrieves information about a product from Redis V1 and Search V1. Then Glue V1 makes a request to the the database to put the product to cart. If the product still exists in the database, it will be added to cart. Otherwise, this request will result in an error.

At the end of this step, the scheduler is re-enabled and new jobs are set up:
```shell
vendor/bin/console scheduler:setup -vvv --no-ansi
```
It restarts queue workers and updates search and Redis.

![Run_install](./images/Run_install/install_dbs_updates/install_dbs_updates.gif)

Depending on the amount of data that needs to be processed, this process may take a while. While Redis and search are being updated, they cannot process the requests the are coming in:

![Run_install_requests](./images/Run_install/request_during_install/install_request.gif)

## Deploy_Spryker_services

In this step, V2 of the services are deployed. In our example, Zed V2 and Glue V2.

For the sake of simplicity, let's assume that Redis and search are done updating. The asterisks on the schema serve as a reminder that it may not be the case. It depends on the size of the migration.

![Deploy_Spryker_services](./images/Deploy_Spryker_services/Deploy_Spryker_services.jpg)

The services are deployed as follows:
1. AWS spawns the services of V2.
2. When the services of V2 are up and running, AWS takes the services of V1 down.

Since this process is uncontrollable, there is potentially a timeframe in which the application may run services of V1 and V2 in random combinations. When a service of V1 communicates with a service of V2 or the other way around, it may result into an error.

![Deploy_Spryker_services_requests](./images/Deploy_Spryker_services/deploy_services.gif)

## Run_post-deploy_hook

In this step, the scripts you defined for this step in the `SPRYKER_HOOK_AFTER_DEPLOY` are run. By default, there are no scripts for this step. If you define any scripts for this step, they will just increase the duration of the deployment.

## Conclusion

Pipelines do not eliminate all the issues related to CI/CD. Since there is lots of space for potential issues, we recommend dividing your updates into smaller chunks. Smaller updates take less time to be deployed, which reduces the timeframe during which issues can occur.

Another powerful technique we recommend is feature flags. They let you enable updates *after* they were deployed. This entirely eliminates the potential risks related to deployment.
