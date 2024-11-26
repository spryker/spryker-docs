---
title: Deploy in a production environment
description: Deploy an application in a production environment in the AWS Management Console.
template: howto-guide-template
last_updated: Jan 19, 2024
originalLink: https://cloud.spryker.com/docs/deploying-in-a-production-environment
originalArticleId: 71dae250-39b8-4adc-a57d-ba9376587f7c
redirect_from:
  - /docs/deploying-in-a-production-environment
  - /docs/en/deploying-in-a-production-environment
  - /docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html
---

This document describes how to deploy an application to [ECS cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html) in a [production environment](/docs/ca/dev/environments-overview.html#production-prod).


## Prerequisites

We use the *spryker-prod* environment as an example. Adjust the name according to your project name.

In this document, an *application version* is a Git commit hash string which is set as a Docker Image tag for all [Elastic Container Registry (ECR) repositories](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html) for the environment.

Example of Git commit hash: `290b955bd06d029c8643c093b58a0cedb86b1c8d`

Example of the ECR images with the application version in tags:

* `spryker-prod-b2c-yves:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-prod-b2c-zed:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-prod-b2c-glue:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-prod-frontend:290b955bd06d029c8643c093b58a0cedb86b1c8d`
* `spryker-prod-jenkins:290b955bd06d029c8643c093b58a0cedb86b1c8d`




## 1. Check the version to deploy

To deploy a specific application version, copy the version of the respective GitHub commit:


![version to deploy](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/version-to-deploy.png)




## 2. Define the version to deploy

1. In the AWS Management Console, go to **Services** > **Systems Manager** > **Application Management** > **Parameter Store**.

2. Click **/spryker-prod/desired_version**.

3. Click **Edit**.

4. Enter the application version into the **Value** field.

5. Click **Save changes**.


## 3. Run a deployment pipeline

1. In the AWS Management Console, go to **Services** > **CodePipeline**.

2. Click **NORMAL_Deploy_Spryker_spryker-prod**.


{% info_block infoBox "Normal deploy" %}

*Normal deploy* is a pipeline that includes all the stages of a complete CI/CD flow. The *Install* stage of this pipeline does not perform any dangerous data manipulations like database cleanup or scheduler reset. We recommend this type of deploy for production environments.

{% endinfo_block %}

3. Optional: check the deployed application version and the application version to be deployed:

    1. In the *Prepare_versions_information_for_Approval_stage* stage, click **Details**.



    ![compare application versions](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/compare-application-versions.png)

    2. Click **Tail logs** and check the job output.

    ![tail logs](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/tail-logs.png)

    3. Check `Deploymnet version` and `Latest deployed version` in the output.



    ![deployment-versions-logs](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/deployment-versions-logs-prod.png)

4. To approve the application version to be deployed, in the **Please_approve** stage, click **Review**.

5. Review the details and click **Approve**.

6. Click **Release change**.

![release change](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/release-change.png)

If the deployment is successful, the **/spryker-prod/last_deployed_version** parameter in the Parameter Store is updated with the application version you’ve deployed.


## Check the deployed application version

To check the deployed application version in the ECS cluster, follow the steps:

1. In the AWS Management Console, go to **Services** > **Elastic Container Service**.
2. Click **spryker-prod**.
3. Click one of the following services:
    * **spryker-prod-storeapp**
    * **spryker-prod-backoffice**
    * **spryker-prod-frontend**
    * **spryker-prod-zed**
    * **spryker-prod-yves**

![cluster](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/cluster-spryker-prod.png)

4. Go to the **Tasks** tab.

5. Click the task.

![select task](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/select-task-prod.png)

7. In the **Image** column of the **Containers** section, ensure that the image name of the container contains the correct application version.

![check image task](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deploying+in+a+production+environment/check-image-task-prod.png)

## Roll back an application

1. Find out the application version you want to roll back to. See [1. Check the version to deploy](#check-the-version-to-deploy) for more details.

2. In Parameter Store, set the application version as the value of the **/spryker-staging/desired_version** parameter. See [2. Define the version to deploy](#define-the-version-to-deploy) for more details.

3. Run a deployment pipeline as described in [3. Run a deployment pipeline](#run-a-deployment-pipeline).
