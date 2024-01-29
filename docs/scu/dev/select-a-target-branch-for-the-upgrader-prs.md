---
title: Select target branch for the Upgrader PRs
description: Learn how to select a target branch on Spryker CI
template: howto-guide-template
last_updated: Aug 14, 2023
redirect_from:
  - /docs/paas-plus/dev/select-target-branch-for-prs.html
  - /docs/scu/dev/select-target-branch-for-prs.html
---

After connecting Spryker Code Upgrader to a repository, you can change the target branch for PRs. The PRs created by the Upgrader will be merged into the target branch.

To select a target branch, follow the steps:

1. In the Upgrader UI, go to **Code**.
2. On the **Code** page, click **Branches**.

![Spryker CI Code - Branches](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/select-target-branch-for-prs.md/branches-tab.png)

3. Next to the branch name you want to use as a target, click <span class="inline-img">![settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/select-target-branch-for-prs.md/kebab-menu.png)</span> > **Set as default branch**.

![Spryker CI Code - Target branch selection](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/select-target-branch-for-prs.md/set-as-default-branch.png)

Now the Upgrader will create PRs for the selected branch.
