---
title: Running the upgrader tool
description: Instructions for running the upgrader tool
last_updated: Nov 25, 2021
template: concept-topic-template
---
This document describes how to upgrade all the modules to the latest versions.

## Prerequisites

To enable the upgrader tool to commit and push changes, adjust your project’s Git and environment configuration as follows:

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

## Install the upgrader tool

As the upgrader tool is part of Spryker-SDK, we should install it globally into the *docker/sdk cli* and initialize it.
After that we will be able to run the upgrader command

```
docker/sdk cli
composer global require spryker-sdk/sdk "dev-master"
~/.composer/vendor/spryker-sdk/sdk/bin/console sdk:init:sdk
```

## Run the upgrader tool

To update all the modules and libraries to the latest versions, do the following:

1. Run the upgrader tool:
```bash
~/.composer/vendor/spryker-sdk/sdk/bin/console upgradability:php:upgrade
```

If the upgrade was successful, the upgrader tool created a PR with the updates.

2. Review the changes in the PR and merge it.

Your modules are up to date.
