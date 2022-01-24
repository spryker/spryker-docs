---
title: Running the upgrader tool
description: Instructions for running the upgrader tool
last_updated: Nov 25, 2021
template: concept-topic-template
---
This document describes how to upgrade all the modules to the latest versions.

## Prerequisites

To start working with the upgrader tool, do the following:

1. To enable the upgrader tool to commit and push changes, adjust your project’s Git and environment configuration as follows:
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

2. Connect to the Docker SDK CLI container:
```bash
docker/sdk cli
```

## Install the upgrader tool

To install the upgrader tool, do the following:

1. In the Docker SDK CLI, install Spryker SDK globally:
```bash
composer global require spryker-sdk/sdk "dev-master"
```

2. Initialize Spryker SDK:
```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console sdk:init:sdk
```

## Run the upgrader tool

To update all the modules and libraries to the latest versions, do the following:

1. In the Docker SDK CLI, run the upgrader tool:
```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console upgradability:php:upgrade
```

If the upgrade was successful, the upgrader tool created a PR with the updates.

2. Review the changes in the PR and merge it.

Your modules are up to date.
