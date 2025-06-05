---
title: "Declaration of module APIs: Public and private"
description: Learn how to define and manage public and private APIs for Spryker modules to ensure efficient integration and security in your ecommerce platform.
last_updated: Sep 27, 2021
originalLink: https://documentation.spryker.com/2021080/docs/definition-api
originalArticleId: d86471b1-719e-4ab5-b5eb-b5e915f0a837
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/architecture/module-api/definition-of-module-api.html
  - /docs/scos/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html
related:
  - title: Performance and scalability
    link: docs/dg/dev/architecture/module-api/performance-and-scalability.html
  - title: Semantic versioning - major vs. minor vs. patch release
    link: docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html
  - title: Using ~ Composer constraint for customized modules
    link: docs/dg/dev/architecture/module-api/use-composer-constraint-for-customized-modules.html
---

According to [Semantic Versioning](http://semver.org/), we release a major version of a module when there are backward compatibility (BC) breaking changes in the Public API. This document declares what public and private APIs are.

## Public API

In the Spryker Commerce OS's core, the following is the public API:

- Public methods in these locatable classes:
  - [Facades](/docs/dg/dev/backend-development/zed/business-layer/facade/facade.html)
  - [Clients](/docs/dg/dev/backend-development/client/client.html)
  - [Query Containers](/docs/dg/dev/backend-development/zed/persistence-layer/query-container/query-container.html)
  - [Services](/docs/dg/dev/backend-development/messages-and-errors/registering-a-new-service.html)

- Interfaces:
  - Plugin interfaces
  - Plugins

- Other classes:
  - Module Config [`Client/Yves/Zed/Shared/Service`](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html)
  - Controllers
  - Twig functions
  - [CLI commands](/docs/dg/dev/backend-development/console-commands/implement-console-commands.html)
  - Public constants that define environment configuration in [Constant Interfaces](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html)
- [Database](/docs/dg/dev/backend-development/zed/persistence-layer/database-schema-definition.html)
- Search
- [Storage](/docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage.html)
- [Transfer objects](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html)
- Glossary keys



### BC breaking changes

There are several classes and files which are part of the public API, but not every change in the file causes a BC break. In general, there is a BC break whenever an existing contract is changed. A contract is what the user of the API expects. This includes the signature of methods as well as the expected behavior. For this reason, we have added an ApiDoc to the most used APIs like facades and plugin interfaces.

We always try to avoid breaking changes of BC and reduce the effort needed to upgrade a module to a new version. There are several ways to add functionality to APIs without a BC break. So you can add new methods and even parameters to the existing methods as long as they are optional.


## Private API

The *public API* term is introduced by Semantic Versioning. To refer to everything that is not part of the public API in Spryker Commerce OS, we introduced a *private API*.
