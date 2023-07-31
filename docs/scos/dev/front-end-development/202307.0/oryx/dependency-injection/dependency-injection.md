---
title: Dependency injection
description: Dependency injection lets you customize logic but keep your project upgradable
template: concept-topic-template
last_updated: Apr 13, 2023
---

{% info_block warningBox %}

Oryx is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

Dependency injection (DI) is a design pattern that provides loosely-coupled, maintainable, and testable code. It improves modularity, maintainability, testability, and is easily customizable and extensible.

In the context of Oryx, DI enables you to customize logic deep inside the framework, which is particularly useful for projects with complex or rapidly-evolving requirements. Without DI, you need to override large portions of the logic or create a lot of boilerplate code. By leveraging DI, you can override logic while still being able to upgrade to new versions of Oryx.

The key advantage of using Oryx's DI implementation is that it is vanilla JavaScript and can be used in other frameworks as well. Although there are popular DI packages available, using Oryx's implementation ensures seamless integration and compatibility with its features.

## Next step

[Oryx service layer](/docs/scos/dev/front-end-development/{{page.version}}/oryx/dependency-injection/oryx-service-layer.html)
