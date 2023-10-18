---
title: Active detection of incompatibilies
description: How Spryker Code Upgrader actively detects and warns you when your code becomes incompatible with the code in upgraded modules
template: concept-topic-template
---

It is very important for Spryker Code Upgrader to ensure stability of the upgrades. On the one hand you have your automated tests that you rely on, those tests are run in your CI system and you use them before you merge the pull request created by Spryker Code Upgrader. On the other hand and in addition we run a number of code checks to offer an early warning system.

# Validations and warnings

The upgrader offers validations ensure the accuracy and safety of the upgrade process.
The warnings provide guidance on potential risks or necessary actions for a successful upgrade.

Warning types:
- Major code release.
  All the major releases should be installed manually to integrate the BC breaks.
- Broken PHP files.
  Phpstan checks the project's code after a release is integrated. To resolve the issue, fix the identified broken files.
- Conflict between a project class that extends a private class in a Spryker module and the changes introduced in the latest release.
  To resolve the conflict, rewrite the custom class with the necessary changes.
- Module name conflict warnings.
  A project module matches the name of a Spryker module. To resolve the issue, rename the project-level module.
- Release integration warnings.
  Resolve the issue using the instructions in the warning.
- Upgrader warnings
  Resolve the issue using the instructions in the warning.
