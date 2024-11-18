---
title: Customize deployment pipelines
description: Customize deployment pipelines in Spryker Cloud Commerce OS by adding different commands using YAML files and shell scripts.
template: howto-guide-template
last_updated: Oct 6, 2023
originalLink: https://cloud.spryker.com/docs/customizing-deployment-pipelines
originalArticleId: 84961c76-f48a-42db-95e4-789434c891e0
redirect_from:
  - /docs/customizing-deployment-pipelines
  - /docs/en/customizing-deployment-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/customizing-deployment-pipelines.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/customizing-deployment-pipelines.html
---

This document describes how to customize deployment pipelines.

{% info_block warningBox %}

* To prevent timeouts and issues, avoid adding long operations like data import to deployment pipelines. Export long operations to Jenkins jobs that run separately from deployment. To learn how long operations affect pipelines, see [Deploymment in states](/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.html).


* In this document, we use the `pre-deploy` stage and its environment variable `SPRYKER_HOOK_BEFORE_DEPLOY` as an example. When customizing a different stage of a pipeline, use the respective variable. You can learn about environment variables for each deployment stage in [Deployment stages](/docs/ca/dev/configure-deployment-pipelines/deployment-pipelines.html#deployment-stages).

* Also, we use the default location of deployment scripts: `/config/install/`. Before you edit or add new scripts, make sure to check where they are stored in your project.

{% endinfo_block %}


### Adding a single command to a deployment pipeline

To customize the `pre-deploy` stage of a pipeline:

1.  In a deploy file of the desired environment, set the shell command as a value of the `SPRYKER_HOOK_BEFORE_DEPLOY:` variable:

```yaml    
environment: ...
image:
  tag: ...
  environment:
        ...
        SPRYKER_HOOK_BEFORE_DEPLOY: "{shell_command}"
        ...
```

2. Push the changes to the repository.

During the next deployment, the command will be executed in the `pre-deploy` stage.

### Adding multiple commands to a deployment pipeline via a shell script

To add multiple commands to the `pre-deploy` stage:

1.  Create a shell script with the desired commands.

The file should have a `.yml` extension. For example, `pre-deploy.yml`.

2. In `deploy.yml`, define `SPRYKER_HOOK_BEFORE_DEPLOY` with the command that executes the script you’ve created:

```yaml
environment: ...
image:
  tag: ...
  environment:
        SPRYKER_HOOK_AFTER_DEPLOY: "vendor/bin/install -r {path_to_script} -vvv"
```

Do not include the `.yml` extension of the file name in `{path_to_script}`. For example, if your script is located in `/config/install/EU/pre-deploy.yml`, the `{path_to_script}` should be `EU/pre-deploy`.

3. Push the changes to the repository.

During the next deployment, the commands in the script will be executed in the `pre-deploy` stage.

### Adding different commands for different environments and pipeline types

By default, in `pre-deploy` and `post-deploy` stages, there is no possibility to run different commands for combinations of different environments and pipeline types. To do that, you can set up a custom shell script with _if statements_.

Using the following script example, create your own script and add it to the desired pipeline by following [Adding multiple commands to a deployment pipeline via a shell script](#adding-multiple-commands-to-a-deployment-pipeline-via-a-shell-script).

```yaml
 if [ "${SPRYKER_PROJECT_NAME}" == "spryker-staging" ]; then
  {list_of_commands}
fi

if [ "${SPRYKER_PROJECT_NAME}" == "spryker-dev" ]; then
  {list_of_commands}
fi

if [ "${SPRYKER_PIPELINE_TYPE}" == "normal" ]; then
  {list_of_commands}
fi

if [ "${SPRYKER_PIPELINE_TYPE}" == "destructive" ]; then
  {list_of_commands}
fi
```

### Adding commands to the install stage of deployment pipelines

To add one or more commands to the `install` stage of a deployment pipeline:

1.  Depending on the desired environment, add the desired commands to one of the following files:

* Normal: `config/install/production`

* Destructive: `config/install/destructive`

2.  Push the changes to the repository.


During the next deployment, the commands in the script will be executed in the `install` stage.
