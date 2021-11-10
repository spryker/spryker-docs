---
title: Creating a custom scheduler
description: This tutorial describes how to create a new custom scheduler.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-create-a-new-custom-scheduler
originalArticleId: 782c6672-6cf9-4295-9bb5-d6c5fe98891d
redirect_from:
  - /2021080/docs/ht-create-a-new-custom-scheduler
  - /2021080/docs/en/ht-create-a-new-custom-scheduler
  - /docs/ht-create-a-new-custom-scheduler
  - /docs/en/ht-create-a-new-custom-scheduler
  - /v6/docs/ht-create-a-new-custom-scheduler
  - /v6/docs/en/ht-create-a-new-custom-scheduler
  - /v5/docs/ht-create-a-new-custom-scheduler
  - /v5/docs/en/ht-create-a-new-custom-scheduler
  - /v4/docs/ht-create-a-new-custom-scheduler
  - /v4/docs/en/ht-create-a-new-custom-scheduler
related:
  - title: Cronjob Scheduling
    link: docs/scos/dev/sdk/cronjob-scheduling.html
---

To create a new custom scheduler:

1. Create a reader plugin that reads configuration of jobs from the specific source.
2. Create an adapter plugin that covers the basic scheduler functionality.
3. Enable plugins in `\Pyz\Zed\Scheduler\SchedulerDependencyProvider` and adjust configuration settings according to your changes.


<!--*Last review date: Oct 29, 2019* by Oleksandr Myrnyi, Andrii Tserkovnyi-->
