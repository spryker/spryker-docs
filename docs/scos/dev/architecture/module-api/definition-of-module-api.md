---
title: Definition of Module API
description: This article defines internal APIs according to which the version type is defined.
last_updated: Sep 27, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/definition-api
originalArticleId: d86471b1-719e-4ab5-b5eb-b5e915f0a837
redirect_from:
  - /2021080/docs/definition-api
  - /2021080/docs/en/definition-api
  - /docs/definition-api
  - /docs/en/definition-api
  - /v6/docs/definition-api
  - /v6/docs/en/definition-api
  - /v5/docs/definition-api
  - /v5/docs/en/definition-api
  - /v4/docs/definition-api
  - /v4/docs/en/definition-api
  - /v3/docs/definition-api
  - /v3/docs/en/definition-api
  - /v2/docs/definition-api
  - /v2/docs/en/definition-api
  - /v1/docs/definition-api
  - /v1/docs/en/definition-api
---

According to [Semantic Versioning](http://semver.org/), Spryker releases a major version “when there are incompatible API changes”. To make a sound decision about the version type, we need to define our internal APIs.

In the Spryker Commerce OS’s core, all public methods in theses locatable classes are considered as API:

* [Facades](/docs/scos/dev/back-end-development/zed/business-layer/facade/facade.html)
* [Clients](/docs/scos/dev/back-end-development/client/client.html)
* [Query Containers](/docs/scos/dev/back-end-development/zed/persistence-layer/query-container/query-container.html)
* [Services](/docs/scos/dev/back-end-development/messages-and-errors/registering-a-new-service.html)
* Plugin defining protected methods in dependency providers.

And the interfaces which are implemented everywhere are also part of the API:

* Plugin interfaces
* Plugins

In addition to these obvious cases, there are some other classes that are part of the API and can cause a BC break:

* module Config [`Client/Yves/Zed/Shared/Service`](/docs/scos/dev/back-end-development/data-manipulation/configuration-management.html)
* Controllers
* Twig functions
* [CLI commands](/docs/scos/dev/back-end-development/console-commands/implementing-a-new-console-command.html)
* Public constants that define environment configuration in [Constant Interfaces](/docs/scos/dev/back-end-development/data-manipulation/configuration-management.html)

Every change in a schema can cause a BC break:

* [Database](/docs/scos/dev/back-end-development/zed/persistence-layer/database-schema-definition.html)
* Search
* [Storage](/docs/scos/dev/back-end-development/client/using-and-configuring-redis-as-a-key-value-storage.html)
* Changes in [transfer objects](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/creating-using-and-extending-the-transfer-objects.html) can also cause BC breaks e.g. when an existing field is renamed.

There are several other ways to cause a BC break:

* A new major version of an open-source component that is embedded in the Spryker Commerce OS.
* A new glossary key in the existing business logic (because there is no translation in the project).
* The whole software design is part of the API. These modules are marked as Engine. For example, it would be a global BC break if we would enforce another structure of Twig templates for all modules or require another directory structure for modules or change a method in the abstract controller.

Not parts of the API are all module-internal classes are instantiated by factories. Although they have public methods, they are not intended to be used from the project code.

## BC Breaking changes

As described above, there are several classes and files which are part of the API. But not every change there would cause a BC break. In general, we can say: there is a BC break whenever an existing contract is changed. A contract is what the user of the API expects. This includes the signature of methods as well as the expected behavior. For this reason, we have added an ApiDoc to the most used APIs like facades and plugin interfaces.

In any case, Spryker Commerce OS's core team wants to avoid BC breaking changes and reduce the effort needed in projects to use a new version of a module. There are several ways to add functionality to APIs without a BC break. So it is possible to add new methods and even parameters to the existing methods as long as they are optional.
