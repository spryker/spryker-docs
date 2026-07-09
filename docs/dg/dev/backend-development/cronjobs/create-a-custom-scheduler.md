---
title: Create a custom scheduler
description: Learn how to create a custom scheduler in Spryker's backend to automate tasks. Enhance your ecommerce platform's efficiency with tailored scheduling solutions.
last_updated: Jun 16, 2021
template: howto-guide-template
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

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


To create a new custom scheduler, follow these steps:

1. Create a reader plugin that reads the configuration of jobs from the specific source.
2. Create an adapter plugin that covers the basic scheduler functionality.
3. In `\Pyz\Zed\Scheduler\SchedulerDependencyProvider`, enable plugins and adjust configuration settings according to your changes.
