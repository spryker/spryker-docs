---
title: Integration of Code Releases into your project repository
description: How Spryker Code Upgrader automatically integreates code releases into your code base
template: concept-topic-template
---

# Challenges of integrating Spryker Code Releases

Spryker architecture requires to connect functionalities of different modules in your project code by using the defined extention points. Spryker Code Upgrader automatically integrates Plugins, sets configurations keys, adds new translations etc to your project code. This results in removing the manual step when your engineer needs to understand and apply code changes to activate the new feature in your project.

Explain supported extention points:
- Configurations (find links)
    default php
    module config
- Plugin stacks (find links)
- Translations (find links)
- XML
- ???

# How to enable and configure

- enabled by default
- not all the releases are integrated, but those having high integratability coverage
- code is process by code style fixers, ensure you have it in your project

 How Upgrader decides what release to integrate?
- each release has an integrability coverage which is from 0 to 100%, Upgrader integrates those releases having 70+% but it can be changed by self-service.

# What is integrability coverage
- internally Spryker tests how the release can be integrated and what plugins, configuration etc need to change in your project code the coverage shows the number of those changes that can be replayed automatically
- there are some releases that do not need any integrations (so called module-only releases), these receive 100% coverage. Explain what module-only means or find a better name
- you can see the coverage of each release in the PR that is created by Spryker Code Upgrader

# What to do if you see a generated code, that is not valid
1. Ensure that your project code is passing Upgradability Guidelines and Evaluator check (links)
2. Quick fix might be to manually correct the generated code
3. If none of those help, please contact us
