---
title: How the Spryker Code Upgrader works
description: Spryker Code Upgrader overview
template: concept-topic-template
last_updated: Aug 22, 2023
redirect_from:
  - /docs/paas-plus/dev/how-the-spryker-code-upgrader-works.html
---

To update a project, the Spryker Code Upgrader runs the following steps.

### 1. Identifies the available updates for the Spryker modules

The Upgrader tool performs the following sub-steps:
1. To identify the modules to be updated, it compares the information present in the `composer.json` and `composer.lock` files with our latest released code.
2. It creates a list of modules and third-party libraries to be updated and groups the modules according to how we released them.

{% info_block infoBox "Module groups" %}

Because modules depend on other modules, we tend to release them in groups. When the Spryker Code Upgrader identifies a module to be updated, apart from the identified module, it also adds all the other related modules from its group to the list.

{% endinfo_block %}


### 2. Updates the modules and libraries

Using `composer`, the Upgrader tool updates the modules in groups.

Firstly, it applies the security releases (the releases with security updates). For these releases, only minor and patch versions are applied. The major releases are applied after the module is updated to the major version.

After updating the modules, the Upgrader tool returns the list of updated modules and proceeds to the next step.

If the Upgrader tool can’t update a module, it skips the module and the remaining groups. If all the groups fail to update, the Upgrader tool returns the errors causing this and stops. With at least one group updated, it returns the list of updated modules and proceeds to the next step.

By default, the Upgrader tool updates only minor and patch versions. When the Upgrader tool finds a group with a [major release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html#what-is-a-major-release), it doesn't update it and informs you about that (the exclusion only for the security major releases that silently skipped):

```bash
There is a major release available for module spryker/merchant-product-approval. 
Please follow the link below to find all documentation needed to help you upgrade to the latest release 
https://api.release.spryker.com/release-group/XXXX
```

To continue running the Upgrader tool, install the major version manually, and rerun the Upgrader tool.

{% info_block infoBox "Composer dependency conflict" %}

Spryker Code Upgrader uses the [composer](https://getcomposer.org/) for updating modules and libraries.
If the composer detects a conflict, it stops the update process and generates an error message. To resolve the conflict, you must manually update the conflicting module and rerun the Upgrader pipeline.

{% endinfo_block %}

### 3. Creates a Git branch

The Upgrader tool creates a separate Git branch to commit the changes to. The branch name follows the pattern: `upgradebot/upgrade-for-{base-branch-name}-{last-commit-hash-in-the-base-branch}`.

### 4. Commits the changes

The Upgrader tool commits the changes in the `composer.json` and `composer.lock` files to the branch.

### 5. Pushes the changes

The Upgrader tool pushes the changes to your source code provider using the authentication details provided in [SprykerCI](/docs/scu/dev/spryker-ci.html).

### 6. Creates a PR

The Upgrader tool creates a PR using your source code provider API. After the PR is created, you can review and merge it to apply the updates.

## Next steps

[Spryker Code Upgrader in a development workflow](/docs/scu/dev/spryker-code-upgrader-in-a-development-workflow.html)
