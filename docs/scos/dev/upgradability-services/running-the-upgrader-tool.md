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

```
composer global require spryker-sdk/upgrader
```

## Run the upgrader tool

To update all the modules and libraries to the latest versions, do the following:

1. Run the upgrader tool:
```bash
$HOME/.composer/vendor/bin/upgrader upgrade
```

If the upgrade was successful, the upgrader tool created a PR with the updates.

2. Review the changes in the PR and merge it.

Your modules are up to date.
