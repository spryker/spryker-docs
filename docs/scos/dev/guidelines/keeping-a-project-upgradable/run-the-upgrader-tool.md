---
title: Run the upgrader tool
description: Instructions for running the upgrader tool
last_updated: Nov 25, 2021
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/upgradability-services/run-the-upgrader-tool.html
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/running-the-upgrader-tool.html

related:
  - title: Keeping a project upgradable
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
  - title: Upgrader tool overview
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgrader-tool-overview.html
  - title: Run the evaluator tool
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html
  - title: Define custom prefixes for core entity names
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/define-customs-prefixes-for-core-entity-names.html
---
This document describes how to upgrade all the modules to the latest versions.

## Prerequisites

1. Install the upgrader by [installing Spryker SDK](https://github.com/spryker-sdk/sdk#installation).

{% info_block warningBox "Running the upgrader without installing Spryker SDK" %}

Alternatively, you can use the `spryker-sdk` image from the project directory without installing it. To do that, run all the commands in this doc as follows: `docker run -ti -v $PWD:/data/project --entrypoint bash spryker/php-sdk:latest -c 'cd /data/project && ../bin/console {COMMAND}'

{% endinfo_block %}

2. To enable the upgrader tool to commit and push changes, adjust your project’s Git and environment configuration as follows:

  * Add a GitHub token with the permissions to push branches and create PRs:

  ```bash
  export GITHUB_ACCESS_TOKEN={GITHUB_TOCKEN}
  ```

  * Add the organization name:

  ```bash
  export GITHUB_ORGANIZATION={ORGANIZATION_NAME}
  ```

  * Add the repository name:

  ```bash
  export GITHUB_REPOSITORY={REPOSITORY_NAME}
  ```

  * Add a global Git username:

  ```bash
  git config --global user.name "{GIT_USERNAME}"
  ```

  * Add a global Git email address:

  ```bash
  git config --global user.email "{GIT_EMAIL_ADDRESS}"
  ```

## Run the upgrader tool

To update all the modules and libraries to the latest versions, do the following:

1. Run the upgrader tool:

```bash
spryker-sdk upgradability:php:upgrade
```

If the upgrade was successful, the upgrader tool created a PR with the updates.

2. Review the changes in the PR and merge it.

Your modules are up to date.
