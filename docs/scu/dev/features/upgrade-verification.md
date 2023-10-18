---
title: Handling upgrade warnings
description: How Spryker Code Upgrader actively detects and warns you when your code becomes incompatible with the code in upgraded modules
template: concept-topic-template
---

To ensure successful upgrades, Spryker Code Upgrader evaluates your project before creating each PR. We recommend implementing your own CI system with tests that should run before you merge PRs. The Upgrader's warning system focuses on preventing upgrade-related issues.

The warnings provide guidance on potential risks or necessary actions for a successful upgrade.

| WARNING TYPE | HOW TO ADDRESS THE WARNING |
| - | - |
| Major code release | Notifies your about a major release you need to install manually to integrate BC breaks. |
| Broken PHP files | Identifies broken PHP files in the code using Phpstan. To resolve the issue, fix the identified broken files.
| Class conflict | Conflict between a project class that extends a private class in a Spryker module and the changes introduced in the latest release. To resolve the conflict, rewrite the custom class with the necessary changes. |
| Module name conflict | Name of a project module matches the name of a Spryker module. | To resolve the issue, rename the project-level module.
| Release integration | Resolve the issue using the information in the warning. |
| Upgrader-related | Resolve the issue using the information in the warning. |
