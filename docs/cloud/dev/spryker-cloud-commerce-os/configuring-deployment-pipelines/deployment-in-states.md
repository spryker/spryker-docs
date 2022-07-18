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

When it comes to complex application, deploying to production environments is not just going from version one to version two. This document describes the states though which an application goes through during a deployment and how they affect its behavior.

## Prerequisites

To learn how pipelines work in SCCOS, see [Deployment pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/deployment-pipelines.html).

## Production Pipeline

Here is the list of the steps that we will find in a regular pipeline. Highlighted in **bold** are the steps that have a potential to break (or at least impact) our application.
* Source
* Please_approve
* **Build_and_Prepare**
* **Configure_RabbitMQ_Vhosts_and_Permissions**
* **Run_pre-deploy_hook**
* Pre_Deployment_Configuration
* **Deploy_Scheduler**
* **Run_install**
* **Deploy_Spryker_services**
* UpdateDeployedVersion
* Post_Deployment_Configuration
* **Run_post-deploy_hook**

Let's see one by one how they can affect our application. Please keep in mind that this is a pessimistic approach, in order to show the potential issues within our deployments.
It does not reflect the reality of a pipeline deployment.

### Initial state
This is how our application behaves  when no pipeline is running. In a fully working state:

![Initial state](./images/initial_state/initial-state.gif)

### Build_and_Prepare

In this step, we build the Containers of each service that we are going to deploy (zed, yves, frontend, backoffice, backapi, glue, etc.)
For the sake of simplicity, we will use only Glue and Zed in our examples. 

![Build_and_Prepare](./images/Build_and_Prepare/Build_and_Prepare.jpg)

### Configure_RabbitMQ_Vhosts_and_Permissions

Here we update Rabbit MQ vhosts, users and permissions. 
It should rarely be updated, but in this pessimistic approach, we want to illustrate what would happen if a request would come in while  RabbitMQ is updated:

![Configure_RabbitMQ_Vhosts_and_Permissions](./images/Configure_RabbitMQ_Vhosts_and_Permissions/rmq.gif)

### Run_pre-deploy_hook

This step will run our application defined scripts. They are registered under the constant `SPRYKER_HOOK_BEFORE_DEPLOY` of our deploy.yml file. By default it  runs: 
```shell
vendor/bin/install -r pre-deploy -vvv
```
We mention this step here because it is important to understand that if our script takes a long time to run, we need to keep in mind all the services that are currently (or soon) in an updated state might respond incorrectly to requests. 

An important part of this deployment step is this command:
```shell
vendor/bin/console scheduler:suspend -vvv --no-ansi
```
as it will stop our scheduler from running. Hereby preventing any data corruption or error for the duration of the deployment.
It will first wait for the currently running jobs to finish and gracefully shutdown. (add this to the duration of the deployment)

![scheduler:suspend](./images/Run_pre-deploy_hook/Run_pre-deploy_hook.jpg)

Requests in the meantime are still coming in:

![Run_pre-deploy_hook](./images/Run_pre-deploy_hook/pre_deploy.gif)

### Deploy_Scheduler

Now it's time to deploy the scheduler. It is based on the Zed container, as it needs to use Zed codebase. 

![scheduler_paused](./images/Deploy_Scheduler/Deploy_Scheduler.jpg)

Because the scheduler was paused, we don't need to fear it will run against incorrect data or services. 
However, requests still are coming in:

![Deploy_Scheduler](./images/Deploy_Scheduler/deploy_scheduler.gif)

### Run_install

This step should take care of running the necessary migrations for our new version (V2 here) of our application.
The script that we run is associated with the constant: `SPRYKER_HOOK_INSTALL`.
By default, this will run:
```shell
vendor/bin/install -r EU/production --no-ansi -vvv
```

After this step, the database should be updated. However, Search and Redis are not, as we "paused" the synchronization.

![migrations](./images/Run_install/migrations.jpg)

we should realize by now, that requests still coming in might error out. It all depends on what was migrated.

At the very end of this step, we re-enable our scheduler, and setup the new jobs (if there was any)
```shell
vendor/bin/console scheduler:setup -vvv --no-ansi
```
When this command run, it will restart our queue workers, and update search and redis.

![Run_install](./images/Run_install/install_dbs_updates/install_dbs_updates.gif)

This process might take a while, depending on the amount of data that needs to be processed. And request are still coming in:

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
