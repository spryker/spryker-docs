---
title: Deploy in a staging environment
description: Deploy an application in a staging environment.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/deploying-in-a-staging-environment
originalArticleId: 9a152894-26bd-488f-8dfa-a8e645063c51
redirect_from:
  - /docs/deploying-in-a-staging-environment
  - /docs/en/deploying-in-a-staging-environment
  - /docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html
---

This document describes how to deploy an application to [ECS cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html) in a [staging environment](/docs/ca/dev/environments-overview.html#staging-stage).


## Prerequisites
We use the *spryker-staging* environment as an example. Adjust the name according to your project name.

In this document, an *application version* is a Git commit hash string which is set as a Docker Image tag for all [Elastic Container Registry (ECR) repositories](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html) for the environment.

Example of Git commit hash: `290b955bd06d029c8643c093b58a0cedb86b1c8d`

Example of the ECR images with the application version in tags:

* `spryker-staging-b2c-yves:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-staging-b2c-zed:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-staging-b2c-glue:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-staging-frontend:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-staging-jenkins:290b955bd06d029c8643c093b58a0cedb86b1c8d`




## 1. Check the version to deploy

To deploy a specific application version, copy the version of the respective GitHub commit:


![version to deploy](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/version-to-deploy.png)





## 2. Define the version to deploy

1. In the AWS Management Console, go to **Services** > **Systems Manager** > **Application Management** > **[Parameter Store](https://eu-central-1.console.aws.amazon.com/systems-manager/parameters/)**.

2. Select */spryker-staging/desired_version*.

3. Select **Edit**.

4. Enter the application version into the **Value** field.

{% info_block infoBox "Deploying *latest*" %}

Enter *latest* if you want to deploy the last built application version. You can check this version in the */spryker-staging/lastbuildversion* parameter in the [Parameter Store](https://eu-central-1.console.aws.amazon.com/systems-manager/parameters). We recommend deploying *latest* in the staging environment to:
* Keep the application up to date with the latest changes.
* Avoid updating */spryker-staging/desired_version* during each deployment.

{% endinfo_block %}



5. Select **Save changes**.


## 3. Run a deployment pipeline

1. In the AWS Management Console, go to **Services** > **[CodePipeline](https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines)**.

2. Select *NORMAL_Deploy_Spryker_spryker-staging*.


{% info_block infoBox "Deploy types" %}

Normal deploy is a pipeline that includes all the stages of a complete CI/CD flow.  The Install stage of this pipeline does not perform any dangerous data manipulations like database cleanup or scheduler reset. If you want to reset demo data during deployment, select *DESTRUCTIVE_Deploy_Spryker_spryker-staging*.

{% endinfo_block %}


3. Optional: check the deployed application version and the application version to be deployed:

    1. In the *Prepare_versions_information_for_Approval_stage* stage, select **Details**.

    ![compare application stage](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/compare-application-stage.png)


    2. Select **Tail logs** and check the job output.



    ![tail logs](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/tail-logs.png)

    3. Check `Deploymnet version` and `Latest deployed version` in the output.



    ![deployment versions logs](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/deployment-versions-logs-staging.png)

4. Approve the application version to be deployed:

    1. In the *Please_approve* stage, select **Review**.

    2. Review the details and select **Approve**.

5. Select **Release change**.

![release change](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/release-change-staging.png)

If the deployment is successful, the */spryker-staging/lastdeployedversion* parameter in the [Parameter Store](https://eu-central-1.console.aws.amazon.com/systems-manager/parameters) is updated with the application version you’ve deployed.


## Check the deployed application version
To check the deployed application version in the ECS cluster, do following:

1. In the AWS Management Console, go to **Services** > **[Elastic Container Service](https://eu-central-1.console.aws.amazon.com/ecs/home?region=eu-central-1)**.
2. Select *spryker-staging*.
3. Select one of the following services:
    * *spryker-staging-storeapp*
    * *spryker-staging-backoffice*
    * *spryker-staging-frontend*
    * *spryker-staging-zed*
    * *spryker-staging-yves*

![cluster](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/cluster-spryker-stage.png)

4. Go to the **Tasks** tab.

5. Select the task.

![select task](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/select-task-stage.png)

7. In the *Image* column of the *Containers* section, ensure that the image name of the container contains the correct application version.

![check image task](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+staging+environment/check-image-task-stage.png)

## Roll back an application
To roll back an application:

1. Find out the application version you want to roll back to. See [1. Check the version to deploy](#check-the-version-to-deploy) for more details.

2. In [Parameter Store](https://eu-central-1.console.aws.amazon.com/systems-manager/parameters/), set the application version as the value of the */spryker-staging/desired_version* parameter. See [2. Define the version to deploy](#define-the-version-to-deploy) for more details.

3. Run a deployment pipeline as described in [3. Run a deployment pipeline](#run-a-deployment-pipeline).


## Next step
[Configuring debugging](/docs/ca/dev/configure-debugging.html)
