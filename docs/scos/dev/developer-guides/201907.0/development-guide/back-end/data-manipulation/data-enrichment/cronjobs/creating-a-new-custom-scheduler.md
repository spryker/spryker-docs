---
title: Creating a New Custom Scheduler
description: This tutorial describes how to create a new custom scheduler.
originalLink: https://documentation.spryker.com/v3/docs/ht-create-a-new-custom-scheduler
originalArticleId: 6ae8307a-47af-4824-bf61-9c62eb995d5b
redirect_from:
  - /v3/docs/ht-create-a-new-custom-scheduler
  - /v3/docs/en/ht-create-a-new-custom-scheduler
---

To create a new custom scheduler:

1. Create a reader plugin that reads configuration of jobs from the specific source.
2. Create an adapter plugin that covers the basic scheduler functionality.
3. Enable plugins in `\Pyz\Zed\Scheduler\SchedulerDependencyProvider` and adjust configuration settings according to your changes.


<!--*Last review date: Oct 29, 2019* by Oleksandr Myrnyi, Andrii Tserkovnyi-->


