---
title: Enable and disable maintenance mode
description: Learn how to enable and disable maintenance mode in Spryker Cloud Commerce OS using AWS CodePipeline, with customizable maintenance pages and IP allowlisting for access.
template: howto-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/manage-maintenance-mode/enable-and-disable-maintenance-mode.html
---

Maintenance mode is used many cases, like deploying a new application version or fixing an unexpected error. To automate the process, we created dedicated pipelines for enabling and disabling maintenance mode. The following sections describe how to run maintenance mode pipelines.

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}

## Prerequisites

When you enable maintenance mode, the landing pages of your applications, like the Back Office or Storefront, are replaced with maintenance pages in `public/{{APPLICATION}}/maintenance/index.html`. Adjust the pages to match the design of your application and fulfill business requirements.

## Enable maintenance mode

1. In the AWS Management Console, go to **Services** > **CodePipeline**.
2. On the **Pipelines** pane, click **Maintenance_Enable_{ENVIRONMENT_NAME}**.
3. On the pipeline's page, click **Release change**.

    The deployment time depends on the application's complexity. Once the deployment is finished, Storefront and Back Office visitors should see the maintenance page. To get access to the frontend applications in maintenance mode, you can allowlist the needed IP addresses. For instructions, see [Configure access to applications in maintenance mode](/docs/ca/dev/manage-maintenance-mode/configure-access-to-applications-in-maintenance-mode.html).

![Maintenance mode enable pipeline](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/enable-and-disable-maintenance-mode.md/maintenance-enable-pipeline.png)

## Disable maintenance mode

1. In the AWS Management Console, go to **Services** > **CodePipeline**.
2. On the **Pipelines** pane, click **Maintenance_Disable_{ENVIRONMENT_NAME}**.
3. On the pipeline's page, click **Release change**.

    The deployment time depends on the application's complexity. Once the deployment is finished, Storefront and Back Office visitors will be able to access the application.

![Maintenance mode disable pipeline](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/enable-and-disable-maintenance-mode.md/maintenance-disable-pipeline.png)
