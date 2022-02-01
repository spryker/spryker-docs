---
title: Tutorial — Troubleshooting a failed deployment
description: Learn how to troubleshoot a failed deployment
template: troubleshooting-guide-template
---

A deployment fails, and there are no errors in the deploy or build output. Based on the step the deployment fails at, do the following:


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

## Deployment fails at the Run_pre-deploy_hook step

Check step execution details

1. On the page of the deployment in the `Build_Push_if_not_exist` step, select **Details**.

![execution_details]

2. In the *Action execution failed* window that opens, select **Link to execution details**.

3. If **PRE_BUILD** State: **FAILED**, go back to the failed step and, to rerun it, select **Retry**.

![retry_run_pre-deploy_hook]

4. If **BUILD** State: **FAILED** you need to check **SPRYKER_HOOK_BEFORE_DEPLOY** script

   1. you can find the variable in the environment deploy file or in the execution log

   ![SPRYKER_HOOK_BEFORE_DEPLOY_variable]

   2. if variable isn't set default script will be executed

    ```vendor/bin/install -r pre-deploy -vvv```

###Example:
In my case **SPRYKER_HOOK_BEFORE_DEPLOY** = ```vendor/bin/install -r EU/pre-deploy -vvv```

![SPRYKER_HOOK_BEFORE_DEPLOY_variable]

it means that in the code repository, I have a **config/install/EU/pre-deploy.yml** file that contains all commands that execute on the BUILD step

![pre-deploy-file]

as you might notice **scheduler:suspendddddddddddd** argument is misspelled, and it is a root cause of the issue

![hook_before_deploy_execution]

In this particular case I just need to fix the command and rerun the deployment afterward

###Conclusion:

Most of the issues that you may face at the **Run_pre-deploy_hook** step are related to the scripts that contain in the recipe file, you can add an additional debug commands to the script that can help you research the issue.

## Deployment fails at the Deploy_Spryker_services step

If a deployment fails at the `Deploy_Spryker_services`, check the ECS services that have failed to deploy and their tasks as follows:

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
