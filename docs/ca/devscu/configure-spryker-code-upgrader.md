---
title: Configure Spryker Code Upgrader
description: Configure Spryker Code Upgrader with custom variables for pipelines, including cron schedules and version limits, to tailor updates to your project needs.
template: concept-topic-template
last_updated: Aug 15, 2023
redirect_from:
  - /docs/paas-plus/dev/configure-spryker-code-upgrader.html
---

Spryker Code Upgrader offers customization options to tailor the upgrading process to your project requirements. The Upgrader is customized by running a dedicated pipeline with configuration variables.

To configure the Upgrader, follow the steps:

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select **Spryker Code Upgrader**.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_projects.png)

3. On the **Pipelines** page, next to the **Change Upgrader config** pipeline, click **Run**.

![Spryker CI Config Upgrader Pipeline](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/configure-spryker-code-upgrader.md/config-upgrader-variables.png)

4. On the **Run Change Upgrader config** page, click **Run now**.

![Spryker CI Run Config Upgrader Pipeline](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/configure-spryker-code-upgrader.md/set-upgrader-variables-run-now.png)

5. On the **Run: #1** page, update the needed parameters and click **Proceed**.

![Spryker CI Set Config Upgrader Pipeline](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/configure-spryker-code-upgrader.md/set-spryker-code-upgrader-variables.png)

This runs the pipeline. After it finishes, the configuration gets updated.

## Customization variables

| VARIABLE              | DESCRIPTION                                                                                                                                                                                                                                                                                          | DEFAULT VALUE |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| CRON_STRING                | A cron schedule expression that defines the frequency and timing of when the Spryker Code Upgrader pipeline is automatically executed.    | 0 8 * * MON       |
| MAX_ALLOWED_MINOR_VERSIONS | The maximum number of installed *minor* versions of Spryker modules. This serves as a flexible threshold. In some scenarios, the actual count of installed minor Spryker module versions might exceed this  value. | 10                |
| MAX_ALLOWED_PATCH_VERSIONS | The maximum number of installed *patch* versions of Spryker modules. This serves as a flexible threshold. In some scenarios, the actual count of installed patch Spryker module versions might exceed this  value. | 30                |
