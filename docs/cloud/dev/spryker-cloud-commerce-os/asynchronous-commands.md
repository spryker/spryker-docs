---
title: Starting asynchronous commands
description: How to run asynchronous commands
template: howto-guide-template
---

Spryker architecture allows to run background asynchronous console commands as scheduled jobs in (Jenkins)[https://docs.spryker.com/docs/scos/dev/back-end-development/console-commands/console-commands.html#jenkins-setup-commands].

Jenkins is available as a Spryker Cloud service and can be used as described (here)[https://docs.spryker.com/docs/scos/dev/back-end-development/cronjobs/cronjobs.html].

During the deployment the scheduling of jobs is paused and the jobs are terminated to roll out a new version, therefore long-lasting jobs should be tolerable to interruption and restart.


