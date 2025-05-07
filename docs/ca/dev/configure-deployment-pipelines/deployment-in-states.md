---
title: Deployment in states
description: States of applications during deployment and how they affect its behaviour.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/deployment-pipelines
originalArticleId: 14d91c9f-6c4e-4481-83ee-005683ce602f
redirect_from:
  - /docs/deployment-pipelines
  - /docs/en/deployment-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/deployment-pipelines/deployment-pipelines.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.html
---

When it comes to complex applications, deploying to production environments is not just going from version one to version two. This document describes the states that an application goes through during a deployment, potential issues, and what you need to do to avoid them.

{% info_block infoBox %}

The described issues are directly related to how changes are introduced in a project. You can  easily avoid them by respecting backward compatibility and using feature flags.

{% endinfo_block %}


## Pipelines in SCCOS

To learn how pipelines work in Spryker Cloud Commerce OS, see [Deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/deployment-pipelines.html).

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

When no pipeline is running, a working application behaves as follows:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.md/working-application.mp4" type="video/mp4">
  </video>
</figure>

## Build_and_Prepare

In this step, AWS builds the containers for the services that are going to be deployed. For the sake of simplicity, we use only Glue and Zed in our examples.

![Build and Prepare step](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.md/build-and-prepare-step.jpg)


## Configure_RabbitMQ_Vhosts_and_Permissions

In this step, Rabbit MQ vhosts, users, and permissions are updated. Usually, they are updated rarely, but if they are, while they are being updated, the following may happen:


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.md/configure-rabbitmq-step.mp4" type="video/mp4">
  </video>
</figure>

## Run_pre-deploy_hook

In this step, the following happens:
* The scripts you defined for this step in the `SPRYKER_HOOK_BEFORE_DEPLOY` are run. The default command is `vendor/bin/install -r pre-deploy -vvv`.
* The `vendor/bin/console scheduler:suspend -vvv --no-ansi` command is run to stop the scheduler. It waits for the currently running jobs to finish and gracefully shuts down. Stopping the scheduler prevents data corruption or errors for the duration of the deployment.

![Suspend the scheduler](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.md/suspend-scheduler.jpg)

While the scripts you defined are running and the scheduler finishes the currently running jobs, requests keep coming in. For this duration, all the services that are in an updated state may respond incorrectly to requests:


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.md/pre-deploy-step.mp4" type="video/mp4">
  </video>
</figure>

## Deploy_Scheduler

In this step, scheduler V2 is deployed. Because the scheduler has been paused, it will not run against incorrect data or services.

{% info_block infoBox "" %}

Scheduler is based on the Zed container, as it uses the codebase of Zed.

{% endinfo_block %}

![stopped scheduler](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.md/stopped-scheduler.jpg)

During this step, all the services in an updated state may still respond to requests incorrectly:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.md/deploy-scheduler-step.mp4" type="video/mp4">
  </video>
</figure>

## Run_install

In this step, the scripts in the `SPRYKER_HOOK_INSTALL` are run. By default, it's `vendor/bin/install -r EU/production --no-ansi -vvv`.

The script runs all the propel database migrations, so the database is updated to V2. However, Search and Redis are not, as the synchronization was "paused".

![Database migrations](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.md/database-migration.jpg)

From this point on, all the V1 services that are communicating with the database may respond to requests incorrectly. For each request, it depends on what data was migrated. For example, Glue V1 retrieves information about a product from Redis V1 and Search V1. Then Glue V1 makes a request to the database to put the product to cart. If the product still exists in the database, it will be added to cart. Otherwise, this request will result in an error.

At the end of this step, the following command re-enables the scheduler and sets up new jobs:

```shell
vendor/bin/console scheduler:setup -vvv --no-ansi
```

The scheduler restarts queue workers and updates search and Redis.


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.md/update-search-and-redis.mp4" type="video/mp4">
  </video>
</figure>

Depending on the amount of data that needs to be processed, this process may take a while. While Redis and search are being updated, they may process requests incorrectly:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.md/install-step.mp4" type="video/mp4">
  </video>
</figure>

## Deploy_Spryker_services

In this step, services of V2 are deployed. In our example, Zed V2 and Glue V2.

For the sake of simplicity, let's assume that Redis and search are done updating. The asterisks on the schema serve as a reminder that it may not be the case. It depends on the size of the migration.

![Deploy Spryker services](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-in-states.md/deploy-spryker-services.jpg)

The services are deployed as follows:
1. AWS spawns the services of V2.
2. When the services of V2 are up and running, AWS takes the services of V1 down.

Since this process is uncontrollable, there is a potential timeframe in which the application may run services of V1 and V2 in random combinations. When a service of V1 communicates with a service of V2 or the other way around, it may result in an error.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.md/deploy-services-step.mp4" type="video/mp4">
  </video>
</figure>

## Run_post-deploy_hook

In this step, the scripts you defined for this step in the `SPRYKER_HOOK_AFTER_DEPLOY` are run. By default, there are no scripts for this step. If you define any scripts for this step, they will just increase the duration of the deployment.

## Conclusion

Pipelines do not eliminate all the issues related to CI/CD. Since there is lots of space for potential issues, we recommend dividing your updates into smaller chunks. Smaller updates take less time to be deployed, which reduces the timeframe during which issues can occur.

Another powerful technique we recommend is feature flags. They let you enable updates *after* they are deployed. This entirely eliminates the potential risks related to deployment.

## Next steps


[Deploying in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)
