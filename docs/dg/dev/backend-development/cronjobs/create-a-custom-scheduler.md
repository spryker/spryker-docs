---
title: Create a custom scheduler
description: This tutorial describes how to create a new custom scheduler.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-create-a-new-custom-scheduler
originalArticleId: 782c6672-6cf9-4295-9bb5-d6c5fe98891d
redirect_from:
  - /docs/scos/dev/back-end-development/cronjobs/creating-a-custom-scheduler.html
  - /docs/scos/dev/back-end-development/cronjobs/create-a-custom-scheduler.html
related:
  - title: Cronjobs
    link: docs/scos/dev/back-end-development/cronjobs/cronjobs.html
  - title: Add and configure cronjobs
    link: docs/scos/dev/back-end-development/cronjobs/add-and-configure-cronjobs.html
  - title: Migrate to Jenkins
    link: docs/scos/dev/back-end-development/cronjobs/migrate-to-jenkins.html
  - title: Cronjob scheduling
    link: docs/scos/dev/sdk/cronjob-scheduling.html
---

To create a new custom scheduler, follow these steps:

1. Create a reader plugin that reads the configuration of jobs from the specific source.
2. Create an adapter plugin that covers the basic scheduler functionality.
3. In `\Pyz\Zed\Scheduler\SchedulerDependencyProvider`, enable plugins and adjust configuration settings according to your changes.
