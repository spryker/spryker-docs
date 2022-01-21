---
title: Tutorial — Troubleshooting a failed deployment
description: Learn how to troubleshoot a failed deployment
template: troubleshooting-guide-template
---

A deployment fails and there are no errors in the deploy or build output. Based on the step the deployment fails at, do the following:


## Deployment fails at the Build_Push_if_not_exist step

### 1. Check deploy logs

Check the build logs via Log groups as follows. Filter the log groups by `codebuild`.

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->

### 2. Check multiple log groups at once

Check multiple log groups via Logs Insights as follows. Select the log groups containing `codebuild`.

{% include searching-by-multiple-log-groups.md %} <!-- To edit, see /_includes/searching-by-multiple-log-groups.md -->

### 3. Check step execution details

If you couldn't find any error messages in the logs check "Phase details" tab

1.Click on execution **"Details"**

![execution_details]

2. In the *Action execution failed* window that opens, select **Link to execution details**.

3. Click on **"Phase details"** tab

![phase_details]

## Deployment fails at the Deploy_Spryker_services step

### Check the failed services and tasks for errors as follows:

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->



## Deployment fails at the "Deploy_Scheduler" step

### 1. Check Jenkins status:

{% include checking-jenkins-status.md %} <!-- To edit, see /_includes/checking-jenkins-status.md -->

### 2. Check Jenkins system information:

{% include checking-jenkins-system-information.md %} <!-- To edit, see /_includes/checking-jenkins-status.md -->

### 3. Check jenkins logs

Check the build logs via Log groups as follows. Filter the log groups by `jenkins`.
{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->
