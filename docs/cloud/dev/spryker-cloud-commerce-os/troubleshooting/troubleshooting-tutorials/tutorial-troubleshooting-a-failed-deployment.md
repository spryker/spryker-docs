---
title: Tutorial — Troubleshooting a failed deployment
description: Learn how to troubleshoot a failed deployment
template: troubleshooting-guide-template
---

A deployment fails and there are no errors in the deploy or build output. Based on the step the deployment fails at, do the following:


## Deployment fails at the Build_Push_if_not_exist step

If a deployment fails at the `Build_Push_if_not_exist`, do the following.

### 1. Check deploy logs

Check the build logs via Log groups as follows. Filter the log groups by `codebuild`.

{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->

### 2. Check deploy logs in multiple log groups at once

Check multiple log groups via Logs Insights as follows. Select the log groups containing `codebuild`.

{% include searching-by-multiple-log-groups.md %} <!-- To edit, see /_includes/searching-by-multiple-log-groups.md -->

### 3. Check Build_Push_if_not_exist step execution details

1. On the page of the deployment in the `Build_Push_if_not_exist` step, select **Details**.

![execution_details]

2. In the *Action execution failed* window that opens, select **Link to execution details**.

3. On the page of the step execution, switch to the **Phase details** tab.

4. If one or more of the statuses is not *Succeeded*, check the reason in the *Context* column.

![phase_details]

## Deployment fails at the Deploy_Spryker_services step

If a deployment fails at the `Deploy_Spryker_services`, check the ECS services and tasks that are postfixed with:

{% include checking-the-status-of-ecs-services-and-tasks.md %} <!-- To edit, see /_includes/checking-the-status-of-ecs-services-and-tasks.md -->



## Deployment fails at the Deploy_Scheduler step

If a deployment fails at the `Deploy_Scheduler`, do the following.

### 1. Check Jenkins status

{% include checking-jenkins-status.md %} <!-- To edit, see /_includes/checking-jenkins-status.md -->

### 2. Check Jenkins system information

{% include checking-jenkins-system-information.md %} <!-- To edit, see /_includes/checking-jenkins-status.md -->

### 3. Check Jenkins deploy logs

Check Jenkins deploy logs via Log groups as follows. Filter the log groups by `jenkins`.
{% include searching-by-logs.md %} <!-- To edit, see /_includes/searching-by-logs.md -->
