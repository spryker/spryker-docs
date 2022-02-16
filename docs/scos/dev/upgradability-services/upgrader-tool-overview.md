---
title: Upgradability tool overview
description: Functionalities of the upgradability tool
last_updated: Nov 25, 2021
template: concept-topic-template
---



The upgrader tool is a utility that automatically updates a Spryker project’s modules and libraries to the latest versions.



## How the upgrader tool works

To update a project, the upgrader tool runs the following steps.

### 1. Checks for uncommitted changes

The upgrader tools checks if there are uncommitted changes in your branch. If none, the upgrader proceeds to the next step. If there are uncommitted changes, the upgrader stops and returns the output:

```bash
VCS: You have to fix uncommitted changes
Upgrade command has been finished with errors
```

After committing the changes, re-run the upgrader.

### 2. Identifies the Spryker modules and third-party libraries to update

The upgrader performs the following sub-steps:

1. To identify the modules to be updated, compares the information in the `composer.json` and `composer.lock` files with our latest released code.

2. Creates a list of modules and third-party libraries to be updated. Groups the modules according to how we released them.

{% info_block infoBox "Module groups" %}

As modules depend on other modules, we release them in groups. When the upgrader identifies a module to be updated, apart from the identified module, it also adds all the other modules from its group to the list.

{% endinfo_block %}



### 3. Updates the modules and libraries

Using Composer, the upgrader updates the modules in groups. After updating the modules, the upgrader returns the list of updated modules and proceeds to the next step.

If the upgrader can’t update a module, it skips the module’s and the remaining groups. If all the groups failed to update, the upgrader returns the errors and stops. With at least one group updated, it returns the list of updated modules and proceeds to the next step.

The upgrader skips the groups that contain the modules changed on the project level or that were part of a [major release](/docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html#what-is-a-major-release). For example, if one or more modules in a group contain changes on the project level, you get an error similar to the following:

```bash
VCS: git update-index --refresh
PackageManager: spryker/configurable-bundle-gui:1.1.1
PackageManager: spryker/customer:7.36.0
PackageManager: spryker/customers-rest-api:1.17.0
PackageManager: Release group contains changes on project level. Name: SUPESC-163 Shopping List Page Optimisation [Remove unused requests]
```

To update the skipped modules, fix the errors, and re-run the upgrader.

### 4. Creates a Git branch

Creates a separate Git branch to commit the changes to. The branch name follows the pattern: `upgradebot/upgrade-for-{base-branch-name}-{last-commit-hash-in-the-base-branch}`.

### 5. Commits the changes

Commits the changes in the `composer.json` and `composer.lock` files to the branch.

### 6. Pushes the changes

Pushes the changes to GitHub using the authentication details in the environment configuration.

### 7. Creates a PR

Creates a PR using [PHP GitHub API](https://github.com/KnpLabs/php-github-api). After the PR is created, you can review and merge it to apply the updates.

### 8. Optional: Rolls back the changes

If any step results in an error, the upgrader proceeds directly to this step to roll back all the changes. In particular, it performs the following sub-steps:

1. Discards the local changes
2. Deletes the local branch
3. Deletes the remote branch


For example, if at step 6, due to incorrect authentication details, the upgrader fails to push changes, it proceeds to step 8 to discard the committed changes and delete local and remote branches.



## Next steps

[Running the upgrader tool](/docs/scos/dev/upgradability-services/running-the-upgrader-tool.html)
