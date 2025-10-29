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

The Spryker architectural framework is fundamentally built upon the "Design by Contract" principle, a methodology that ensures stability and predictability in a complex, modular system. Central to this principle is the `@api` annotation. This annotation is not merely a documentation tag; it serves as an explicit marker of a "semantic contract" between different parts of the system. When a method or class is marked with @api, it signals a commitment to backward compatibility, assuring developers that its signature and behavior will remain stable across minor and patch versions of the module.
Spryker's architectural conventions explicitly mandate this practice for key interaction points. Each facade class needs to define and implement an interface that holds the Specification of each public method. The Specification is considered as the semantic contract of the method. 
All facade class methods need to add `@api` and `{@inheritdoc}` tags to their method documentation. This directly establishes the `@api` tag as the formal indicator of this crucial semantic contract.
But not only things that marked with `@api` are part of the public API. There are several other cases that are also part of the public API.

In the Spryker Commerce OS's core, the following is the public API:

- Public methods in these locatable classes:
  - [Facades and Facade Interfaces](/docs/dg/dev/backend-development/zed/business-layer/facade/facade.html) (have an `@api` tag in the doc block`)
  - [Clients and Client Interfaces](/docs/dg/dev/backend-development/client/client.html) (have an `@api` tag in the doc block`)
  - [Query Containers and Query Container Interfaces](/docs/dg/dev/backend-development/zed/persistence-layer/query-container/query-container.html) (have an `@api` tag in the doc block`)
  - [Services and Service Interfaces](/docs/dg/dev/backend-development/messages-and-errors/registering-a-new-service.html) (have an `@api` tag in the doc block`)

- Other cases:
  - [Plugins and Plugin Interfaces](/docs/dg/dev/backend-development/plugins/plugins.html). (have an `@api` tag in the doc block`)
  - [Module Config](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html) (have an `@api` tag in the doc block`)
  - [Controllers](/docs/dg/dev/backend-development/yves/controllers-and-actions.html) (only public methods) (have no `@api` tag in the doc block`)
  - [Console commands](/docs/dg/dev/backend-development/console-commands/implement-console-commands.html) (have no `@api` tag in the doc block`)
  - Public constants that define environment configuration in [Constant Interfaces](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html) (have an `@api` tag in the doc block`)
  - [Database definition](/docs/dg/dev/backend-development/zed/persistence-layer/database-schema-definition.html) (have no `@api` tag in the doc block`)
  - Search and [Storage](/docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage.html) structure. Specifically keys and structure of the data stored in these systems. (have no `@api` tag in the doc block`)
  - [Transfer objects](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html) (have no `@api` tag in the doc block`)
  - [Glossary keys](/docs/dg/dev/internationalization-and-multi-store/managing-glossary-keys) (have no `@api` tag in the doc block`)
  - [Dependency Provider](/docs/dg/dev/backend-development/data-manipulation/data-interaction/define-module-dependencies-dependency-provider.html) methods with plugins. Removal of those methods is a BC break as it will break existing project implementations. (have no `@api` tag in the doc block`)



### BC breaking changes

There are several classes and files which are part of the public API, but not every change in the file causes a BC break. In general, there is a BC break whenever an existing contract is changed. A contract is what the user of the API expects. This includes the signature of methods as well as the expected behavior. For this reason, we have added an ApiDoc to the most used APIs like facades and plugin interfaces.

We always try to avoid breaking changes of BC and reduce the effort needed to upgrade a module to a new version. There are several ways to add functionality to APIs without a BC break. So you can add new methods and even parameters to the existing methods as long as they are optional.


## Private API

To maintain a clean and upgradable architecture, Spryker explicitly designates certain components as internal implementation details. Interacting with these components from outside their parent module is an anti-pattern that leads to tight coupling and future maintenance issues.

### Business Models (Readers, Writers, etc.)

The true business logic of a module is implemented in various model classes residing within the Business layer, often following patterns like Readers and Writers. The entire purpose of the Facade is to hide this internal complexity from the rest of the system. Architectural conventions state that "Models can't directly interact with other modules' Models". These classes must be considered private to their module.



### Persistence Layer Components

The Persistence Layer contains components for data storage and retrieval, including Repositories, EntityManagers, and Query Containers. While these components have interfaces (for example, ModuleRepositoryInterface, ModuleEntityManagerInterface), they are strictly for internal use within their own module.

Repositories and EntityManagers: The Repository pattern is used to read data, while the EntityManager handles create, update, and delete operations. The documentation is clear that to expose functionality from a Repository, a developer "have to create a Facade method in a corresponding module which would delegate to Repository". This rule explicitly designates the Facade as the public boundary, making direct calls to another module's Repository or EntityManager an architectural violation.

Query Containers: Query Containers are defined as a public api at the beginning of this document, but they are soft-deprecated as a concept and should not be used for new development. And because of that, they should not be used outside of their module anymore. If you need to access data from another module, use the Facade of that module instead.