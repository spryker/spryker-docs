---
title: Definition of Module API
description: This article defines internal APIs according to which the version type is defined.
originalLink: https://documentation.spryker.com/2021080/docs/definition-api
originalArticleId: d86471b1-719e-4ab5-b5eb-b5e915f0a837
redirect_from:
  - /2021080/docs/definition-api
  - /2021080/docs/en/definition-api
  - /docs/definition-api
  - /docs/en/definition-api
---

According to [Semantic Versioning](http://semver.org/) the Spryker Commerce OS core team releases a major version “when there are incompatible API changes”. To make a sound decision about the type of the version, we need to define our internal APIs.

In Spryker Commerce OS’s core, all public methods in theses locatable classes are considered as API:

* [Facades](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/zed/business-layer/facade/about-facade.html)
* [Clients](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/client/client.html)
* [Query Containers](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/zed/persistence-layer/query-container/about-the-query-container.html)
* [Services](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/data-manipulation/data-enrichment/messages-and-errors/registering-a-new-service.html)

And the interfaces which are implemented everywhere are also part of the API:

* Plugin interfaces
* Plugins

In addition to these obvious cases, there are some other classes which are part of the API and can cause a BC break:

* module Config (`Client/Yves/Zed/Shared/Service`)(https://documentation.spryker.com/docs/configuration-management#how-to-retrieve-the-configuration)
* Controllers
* Twig functions
* [CLI commands](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/data-manipulation/data-enrichment/console-commands/implementing-a-new-console-command.html)
* Public constants especially in [Constant Interfaces](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/data-manipulation/configuration-management.html#constant-interfaces)

And every change in a schema can cause a BC break:

* [Database](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/zed/persistence-layer/database-schema-definition.html)
* Search
* [Storage](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/client/using-and-configuring-redis-as-a-key-value-storage.html)
* Changes in [transfer objects](/docs/scos/dev/developer-guides/{{page.version}}/development-guide/back-end/data-manipulation/data-ingestion/structural-preparations/creating-using-and-extending-the-transfer-objects.html) can also cause BC breaks e.g. when an existing field is renamed.

There are several other ways to cause a BC break:

* A new major version of an open source component which is embedded in Spryker Commerce OS.
* A new glossary key (because there is no translation in the project).
* The whole software design is part of the API. These modules are marked as Engine. E.g. it would be a global BC break if we would enforce another structure of Twig templates for all modules or require another directory structure for modules or change a method in the abstract controller.

Not part of the API are all module-internal classes which are instantiated by factories. Although they have public methods, they are not intended to be used from project code.

## BC Breaking Changes

As described above, there are several classes and files which are part of the API. But not every change there would cause a BC break. In general we can say: there is a BC break whenever an existing contract is changed. A contract is what the user of the API expects. This includes the signature of methods but also the expected behavior. For this reason we added an ApiDoc to the most used APIs like facades and plugin interfaces.

In any case, Spryker Commerce OS's core team wants to avoid BC breaking changes and to reduce the effort which are needed in project to use a new version of a module. There are several ways to add functionality to APIs without a BC break. So it is possible to add new methods and even parameters to existing methods as long as they are optional.
