---
title: How Spryker Code Upgrader works
description: Learn how Spryker Code Upgrader works, from identifying module updates and applying security releases to creating Git branches, committing changes, and submitting PRs for seamless upgrades.
template: concept-topic-template
last_updated: Aug 22, 2023
redirect_from:
  - /docs/paas-plus/dev/how-the-spryker-code-upgrader-works.html
  - /docs/scu/dev/how-the-spryker-code-upgrader-works.html
---

To update a project, Spryker Code Upgrader runs the following steps.

## 1. Identify the available updates for the Spryker modules

1. To identify the modules to be updated, the Upgrader compares the information present in the `composer.json` and `composer.lock` files with Spryker's latest released code.
2. It creates a list of modules and third-party libraries to be updated and groups the modules according to how they are released.

{% info_block infoBox "Module groups" %}

Because modules depend on other modules, we tend to release them in groups. When the Upgrader identifies a module to be updated, apart from the identified module, it also adds all the other related modules from its group to the list.

{% endinfo_block %}


## 2. Update the modules and libraries

Using `composer`, the Upgrader updates the modules in groups.

Firstly, it applies the security releases: the releases with security updates. For these releases, only minor and patch versions are applied. The major releases are applied after the module is updated to the major version.

After updating the modules, the Upgrader returns the list of updated modules and proceeds to the next step.

If the Upgrader can't update a module, it skips the module and the remaining groups. If all the groups fail to update, the Upgrader returns the errors causing this and stops. With at least one group updated, it returns the list of updated modules and proceeds to the next step.

By default, the Upgrader updates only minor and patch versions. When the Upgrader finds a group with a [major release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html#major-release), it doesn't update it and informs you about that:

```bash
There is a major release available for module spryker/merchant-product-approval.
Please follow the link below to find all documentation needed to help you upgrade to the latest release
https://api.release.spryker.com/release-group/XXXX
```

{% info_block infoBox "Major security releases" %}

Major security releases are skipped silently.

{% endinfo_block %}


To continue running the Upgrader, install the major version manually, and rerun the Upgrader.

{% info_block infoBox "Composer dependency conflict" %}

The Upgrader uses [Composer](https://getcomposer.org/) for updating modules and libraries. If Composer detects a conflict, it stops the update process and generates an error message. To resolve the conflict, you need to manually update the conflicting module and rerun the Upgrader pipeline.

{% endinfo_block %}

## 3. Create a Git branch

The Upgrader creates a separate Git branch to commit the changes to. The branch name follows the pattern: `upgradebot/upgrade-for-{base-branch-name}-{last-commit-hash-in-the-base-branch}`.

## 4. Commit the changes

The Upgrader commits the changes in the `composer.json` and `composer.lock` files to the branch.

## 5. Push the changes

The Upgrader pushes the changes to your source code provider.

## 6. Create a PR

The Upgrader creates a PR using your source code provider API. After the PR is created, you can review and merge it to apply the updates.

## Next step

[Developing with Spryker Code Upgrader](/docs/ca/devscu/developing-with-spryker-code-upgrader.html)
