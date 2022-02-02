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


### 1. Check step execution logs

1. On the page of the deployment in the `Build_Push_if_not_exist` step, select **Details**.

![execution_details]

2. In the *Action execution failed* window that opens, select **Link to execution details**.

3. In **Build logs**, check the `PRE_BUILD State`.

4. If the state is `FAILED`, go back to the pipeline and rerun the step by selecting **Retry**.

![retry_run_pre-deploy_hook]

5. If the step fails, recheck the `PRE_BUILD State` by following steps 1 to 3.
  If the state is `FAILED`, [check the script of the step](#2-check-the-script-of-the-step)


### 2. Check the script of the step

1. In the **Build logs**, check the value of `SPRYKER_HOOK_BEFORE_DEPLOY` variable.

![SPRYKER_HOOK_BEFORE_DEPLOY_variable]

{% info_block infoBox "Deploy file" %}

Alternatively, you can check the script of the step in the environment's deploy file.

{% endinfo_block %}

If the variable isn't set, the default script is executed:
```bash
vendor/bin/install -r pre-deploy -vvv
```

2. Check the commands of the script in the deploy file specified in the variable.
  For example, on the earlier screenshot, the `SPRYKER_HOOK_BEFORE_DEPLOY` variable value is `vendor/bin/install -r EU/pre-deploy -vvv`. This means that you can check the commands of the build step in `config/install/EU/pre-deploy.yml`.

![pre-deploy-file]

In this example, the `scheduler:suspendddddddddddd` is misspelled, and it is the root cause of the issue.

###Example:
In my case **SPRYKER_HOOK_BEFORE_DEPLOY** = ```vendor/bin/install -r EU/pre-deploy -vvv```

![SPRYKER_HOOK_BEFORE_DEPLOY_variable]

it means that in the code repository, I have a **config/install/EU/pre-deploy.yml** file that contains all commands that execute on the BUILD step



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
