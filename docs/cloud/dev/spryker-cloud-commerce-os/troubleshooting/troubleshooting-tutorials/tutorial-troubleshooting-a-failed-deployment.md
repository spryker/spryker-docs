---
title: Tutorial — Troubleshooting a failed deployment
description: Learn how to troubleshoot a failed deployment
template: troubleshooting-guide-template
---

If a deployment fails and there are no errors in the deploy or build output, do the following:


## 1. Check deploy logs

Check the build logs via Log groups as follows. Filter the log groups by `codebuild`. If the deployment fails at the `Deploy_Scheduler` step, after checking the `codebuild` logs, filter by `jenkins` and check the logs.

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->



## 2. Check multiple log groups at once

Check multiple log groups via Logs Insights as follows. Select the log groups containing `codebuild`. If the deployment fails at the `Deploy_Scheduler` step, also select the groups containing `jenkins`.

{% include searching-by-multiple-log-groups.md %} <!-- To edit, see /_includes/searching-by-multiple-log-groups.md -->

## 3. Check the status of services and tasks

If the deployment fails at the `Deploy_Spryker_services` step, check the failed services and tasks for errors as follows:

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->




## 4. Check Jenkins status

If the deployment fails at the `Deploy_Scheduler` step, check Jenkins status:

{% include checking-jenkins-status.md %} <!-- To edit, see /_includes/checking-jenkins-status.md -->


## 5. Check Jenkins system information

If the deployment fails at the `Deploy_Scheduler` step, check Jenkins system information:


{% include checking-jenkins-system-information.md %} <!-- To edit, see /_includes/checking-jenkins-status.md -->
