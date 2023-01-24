---
title: Enable and disable maintenance mode
description: Learn how to deploy maintenance pages for Spryker applications.
template: howto-guide-template
---

Maintenance mode is used many cases, like deploying a new application version or fixing an unexpected error. To automate the process, we created dedicated pipelines for enabling and disabling maintenance mode. The following sections describe how to run maintenance mode pipelines.

## Prerequisites

When you enable maintenance mode, the landing pages of your applications, like the Back Office or Storefront, are replaced with maintenance pages in `public/{{APPLICATION}}/maintenance/index.html`. Adjust the pages to match the design of your application and fulfill business requirements.

## Enable maintenance mode

1. In the AWS Management Console, go to **Services** > **CodePipeline**.
2. On the **Pipelines** pane, click **Maintenance_Enable_{{ENVIRONMENT_NAME}}**.
3. On the pipeline's page, click **Release change**.

    The deployment time depends on the application's complexity. Once the deployment is finished, Storefront and Back Office visitors will see the maintenance page.

![Maintenance mode enable pipeline](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/enable-and-disable-maintenance-mode.md/maintenance-enable-pipeline.png)

## Disable maintenance mode

1. In the AWS Management Console, go to **Services** > **CodePipeline**.
2. On the **Pipelines** pane, click **Maintenance_Disable_{{ENVIRONMENT_NAME}}**.
3. On the pipeline's page, click **Release change**.

    The deployment time depends on the application's complexity. Once the deployment is finished, Storefront and Back Office visitors will be able to access the application.

![Maintenance mode disable pipeline](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/enable-and-disable-maintenance-mode.md/maintenance-disable-pipeline.png)
