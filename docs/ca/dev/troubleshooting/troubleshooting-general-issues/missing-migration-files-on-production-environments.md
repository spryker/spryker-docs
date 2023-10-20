---
title: Missing migration files on production environments
description: Troubleshoot issues you might encounter when you have your Spryker-based project in Cloud. Missing migration files on production environment
last_updated: Jun 9, 2022
template: troubleshooting-guide-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-general-issues/missing-migration-files-on-production-environments.html
---

There are no tables in the DB after deploy.

{% info_block warningBox "Note" %}

It is recommended to define a strategy for migrations at the start of the project.
We recommend to push all the migrations to a repository as a go-live preparation to make sure that all the migrations that are executed against production are also in the repositoriy to ease possible troubleshooting in the future.

{% endinfo_block %}

During the development you can keep your migrations ignored by a repositoriy to simplify the process of development.

## Solution

1. Check if the files are not under ignore (for example, `.dockerignore`) and added to the version control system (for example, Github).
2. Check that during the deployment the files are not removed. For example, check if during the deployment (in the pipeline) you are not using the command that removes migrations:

```bash
console propel:migration:delete
```

Find more information about [deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/deployment-pipelines.html) or [customizing deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/customize-deployment-pipelines.html)
