---
title: Active detection of incompatibilies
description: How Spryker Code Upgrader actively detects and warns you when your code becomes incompatible with the code in upgraded modules
template: concept-topic-template
---

It is very important for Spryker Code Upgrader to ensure stability of the upgrades. On the one hand you have your automated tests that you rely on, those tests are run in your CI system and you use them before you merge the pull requested created by Spryker Code Upgrader. On the other hand and in addition we run a number of code checks to offer an early warning system even without having a full context or knowledge of your project.

# What kind of validations we run?

- Major code releases
- PHP Broken Files (phpstan)
- Conflict between your class that extended a private class in a Spryker module and when Spryker changed their class in the release
- Module name conflict checker
- Release integration warnings
- Upgrader warnings

# What to do when you see these warnings in the PR?

Generic explanation about how to check a file in PHP Storm -> fix the file, rename module or class, recheck the inherited class to be compatible with the base one.

