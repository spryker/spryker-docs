---
title: Active detection of incompatibilies
description: How Spryker Code Upgrader actively detects and warns you when your code becomes incompatible with the code in upgraded modules
template: concept-topic-template
---

It is very important for Spryker Code Upgrader to ensure stability of the upgrades. On the one hand you have your automated tests that you rely on, those tests are run in your CI system and you use them before you merge the pull request created by Spryker Code Upgrader. On the other hand and in addition we run a number of code checks to offer an early warning system even without having a full context or knowledge of your project.

# Validations and warnings

The upgrader offers validations ensure the accuracy and safety of the upgrade process.
The warnings provide guidance on potential risks or necessary actions for a successful upgrade.

Warning types:
- Major code releases warning.
  All the major releases should be installed manually to integrate the BC breaks.
- PHP Broken Files.
  Phpstan checks project code after each release application and provides corresponding warnings.
- Conflict between project class, which extends a private class in a Spryker module, and a changes made by Spryker in their latest release.
  To resolve this conflict you need to re-write the custom class with the necessary changes.
- Module name conflict warnings.
  Custom project module has the same name with spryker released module and should be renamed.
- Release integration warnings (warnings related to the integration process)
- Upgrader warnings (warnings related to the upgrader process)

# What to do when you see these warnings in the PR?

In most cases, warnings come with specific information that helps you identify the class or file needed to fix the issue.
Most of these issues are easily fixable in your IDE.

