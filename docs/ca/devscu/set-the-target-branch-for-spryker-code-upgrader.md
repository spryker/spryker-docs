---
title: Set the target branch for Spryker Code Upgrader
description: Learn how to select a target branch on Spryker CI
template: howto-guide-template
last_updated: Aug 14, 2023
redirect_from:
  - /docs/paas-plus/dev/select-target-branch-for-prs.html
  - /docs/scu/dev/select-target-branch-for-prs.html
---

The Upgarder creates PRs with upgrades to a defined target branch in your repository.

To select a target branch, follow the steps:

1. In the Upgrader UI, go to **Projects**.
2. On the **Projects** page, select the **Spryker Upgrade Service** project.
3. On the **Pipelines** page, click **Code**.
4. On the **Code** page, click **Branches**.

![Spryker CI Code - Branches](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/select-target-branch-for-prs.md/branches-tab.png)

5. Next to the branch name you want to use as a target, click <span class="inline-img">![settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/select-target-branch-for-prs.md/kebab-menu.png)</span> > **Set as default branch**.

![Spryker CI Code - Target branch selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/select-target-branch-for-prs.md/set-as-default-branch.png)

Now the Upgrader starts creating PRs for this branch.

## Next step

[Run the Upgrader](/docs/ca/devscu/run-spryker-code-upgrader.html)
