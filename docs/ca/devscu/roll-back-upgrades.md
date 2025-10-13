---
title: Roll back upgrades
description: Learn how to roll back Spryker Code Upgrader upgrades by deploying previous versions of the application and using GitHub, GitLab, or Git strategies to revert changes.
template: concept-topic-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/paas-plus/dev/roll-back-upgrades.html
---

To roll back an upgrade, you need to deploy the previous version of the application using the regular deploy process. For instructions, see one of the following documents:

- [Deploying in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)
- [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html)

## Other deployment pipelines

In general, most of the revert strategies apply the same steps. If you are using different deployment pipelines, check the relevant documentation:  


- [Reverting a pull request in GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request).

- [Reverting a merge request in GitLab](https://docs.gitlab.com/ee/user/project/merge_requests/revert_changes.html#revert-a-merge-request).

- [git revert](https://git-scm.com/docs/git-revert).

- [git reset](https://git-scm.com/docs/git-reset).
