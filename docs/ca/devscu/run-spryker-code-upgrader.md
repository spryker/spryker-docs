---
title: Run Spryker Code Upgrader
description: Manually run Spryker Code Upgrader by triggering it from the Upgrader UI, allowing project analysis and automatic creation of pull requests for updates.
template: concept-topic-template
last_updated: Sep 25, 2023
redirect_from:
  - /docs/paas-plus/dev/run-spryker-code-upgrader.html
---

Spryker Code Upgrader runs automatically based on the [configured schedule](/docs/ca/devscu/configure-spryker-code-upgrader.html).

To manually trigger the Upgrader, follow the steps:

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select **Spryker Code Upgrader**.
    This opens the **Pipelines** page.
3. Next to the **Upgrader** pipeline, click **Run**.
    This manually triggers the Upgrader. It analyzes the connected project and creates a PR with updates.

## Next step

* [Troubleshooting](/docs/ca/devscu/troubleshooting/troubleshooting-spryker-code-upgrader-issues.html)
* [Finilizing upgrades](/docs/ca/devscu/finilizing-upgrades.html)
