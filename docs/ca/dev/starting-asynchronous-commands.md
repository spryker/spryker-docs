---
title: Starting asynchronous commands
description: Learn how to run asynchronous commands
last_updated: May 24, 2022
template: howto-guide-template
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/starting-asynchronous-commands.html
---

The Spryker architecture lets you run background asynchronous console commands as scheduled jobs in [Jenkins](/docs/dg/dev/backend-development/console-commands/console-commands.html#jenkins-setup-commands). Jenkins is available as a Spryker Cloud service. For details about how to use it, see [Cronjobs](/docs/dg/dev/backend-development/cronjobs/cronjobs.html).

During the deployment, the scheduling of jobs is paused, and the jobs are terminated to roll out a new version. Therefore, long-lasting jobs should be tolerable to interruption and restart.
