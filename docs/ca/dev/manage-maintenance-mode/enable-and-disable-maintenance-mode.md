---
title: Enable and disable maintenance mode
description: Learn how to enable and disable maintenance mode in Spryker Cloud Commerce OS using AWS CodePipeline, with customizable maintenance pages and IP allowlisting for access.
template: howto-guide-template
last_updated: Apr 22, 2026
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/manage-maintenance-mode/enable-and-disable-maintenance-mode.html
---

Maintenance mode is used many cases, like deploying a new application version or fixing an unexpected error. To automate the process, we created dedicated pipelines for enabling and disabling maintenance mode. The following sections describe how to run maintenance mode pipelines. After you update the maintenance page, rebuild the images by running a normal or destructive deployment pipeline.

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}

## Prerequisites

When you enable maintenance mode, the landing pages of your applications, like the Back Office or Storefront, are replaced with maintenance pages in `public/{{APPLICATION}}/maintenance/index.html`. Adjust the pages to match the design of your application and fulfill business requirements.

### Per-store and per-region maintenance pages

{% info_block infoBox %}

Per-store and per-region maintenance pages require Docker SDK version 1.75.0 or higher.

{% endinfo_block %}

By default, all endpoints of an application share the same maintenance page located at `public/{application}/maintenance/index.html`—for example, `public/Yves/maintenance/index.html`.

You can customize the maintenance page per store or per region by placing an `index.html` file in a subdirectory named after the store or region code:

```text
public/Yves/maintenance/
├── index.html          # Default maintenance page (fallback)
├── EU/
│   └── index.html      # Maintenance page for EU region
├── US/
│   └── index.html      # Maintenance page for US region
├── DE/
│   └── index.html      # Maintenance page for DE store (legacy store mode)
└── AT/
    └── index.html      # Maintenance page for AT store (legacy store mode)
```

The same structure applies to all applications, such as `Backoffice`, `MerchantPortal`, and `Zed`.

Nginx resolves the maintenance page using the following fallback order.

**Dynamic store mode** (region-based endpoints):
1. `maintenance/{region}/index.html`—region-specific page
2. `maintenance/index.html`—default page

**Legacy store mode** (store-based endpoints):
1. `maintenance/{store}/index.html`—store-specific page
2. `maintenance/{region}/index.html`—region-specific page
3. `maintenance/index.html`—default page

If no store-specific or region-specific page exists, the default `maintenance/index.html` is served. The default maintenance page is required and must always be present.

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
