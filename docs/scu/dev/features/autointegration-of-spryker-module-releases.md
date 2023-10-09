---
title: Integration of Code Releases into your project repository
description: How Spryker Code Upgrader automatically integreates code releases into your code base
template: concept-topic-template
---

# Challenges of integrating Spryker Code Releases

Spryker architecture provides extensibility of different modules by using extension points in the project code.
With Spryker Code Upgrader, the process of integrating plugins, configuration updates, adding new translations, and other code changes is automated.
As the result the manual step can be skipped when engineers have to understand and apply code changes by themselves in order to add new features in the project.

Supported extension points:
- Configure
  - module
  - environment
- Copy module files
- Add/Remove
  - plugin
  - navigation
  - widget
  - glue relationship
- Add
  - transfer
  - db schema

# What is release rating
The release rating is a measure of the integrability coverage of each spryker release, representing the percentage of integrated plugins, configurations, schemas, and other components.
This rating is determined through internal testing, where the updated code is compared with the released code to assess the level of integration achieved.

There are some kind of releases that provide only dependency updates without any code integrations (so called module-only releases). Such releases have 100% coverage. 

The rating for each applied release can be found in the upgrader pull request description.

# How to enable and configure
By default, the Integrator is enabled. It applies integrations of releases that have rating of more than 70% (this threshold can be configured through the spryker CI configuration).

It is important to note that after the integration process is completed, a style fixer is applied to the updated files. It's recommended for the project to have its own style fixer to expose project-specific code style conventions.

# What to do if you see a generated code, that is not valid
1. Make sure that your project code follows the Upgradability Guidelines and passes the [Evaluator check](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).
2. You can try manually updating the generated code as a quick fix.
3. If none of the above solutions work, please contact us for further assistance.
