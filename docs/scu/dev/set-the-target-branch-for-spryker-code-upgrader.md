---
title: Set the target branch for Spryker Code Upgrader
description: Learn how to set the target branch for the Upgrader
template: concept-topic-template
last_updated: May 4, 2023
redirect_from:
  - /docs/scu/dev/change-default-branch.html
---

The Upgarder creates PRs with upgrades to a defined target branch in your repository. To set the target branch, follow the steps:

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.

![Spryker CI Projects](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/onboard-to-spryker-code-upgrader/connect-spryker-code-upgrader-to-a-github-managed-project.md/spryker_ci_projects.png)

3. On the **Pipelines** page, click **Code**.
4. On the **Code** page, click the **Branches** tab.
5. For the branch you want to set as the target branch, click on the "..." button to open a dropdown menu, then click **Set as default branch**.

![Set branch as default](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/change-default-branch.md/set-default-branch.png)

Now the Upgrader starts creating PRs for this branch.

## Next step

[Configure the Upgrader](/docs/scu/dev/configure-spryker-code-upgrader.html)
