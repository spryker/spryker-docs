---
title: Code Architecture Guidance and Tool
description: We use our Architecture Sniffer Tool to assert a certain quality of Spryker architecture for both core and project.
last_updated: Sep 15, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/code-architecture-guide
originalArticleId: ecf19653-3419-4eb2-b754-e724e0239e13
redirect_from:
  - /docs/scos/dev/guidelines/coding-guidelines/code-architecture-guide.html
related:
  - title: Code Quality
    link: docs/scos/dev/guidelines/coding-guidelines/code-quality.html
  - title: Code style guide
    link: docs/scos/dev/guidelines/coding-guidelines/code-style-guide.html
  - title: Secure Coding Practices
    link: docs/scos/dev/guidelines/coding-guidelines/secure-coding-practices.html
---
This document outlines Spryker recommendations for the code architecture.

## Architecture and layer separation

* Storage/Search modules should not make RPC calls to ZED and should focus on fetching data from the key-value storage.
* Maintain separation between layers, sticking to the following rules:
  * Avoid calling Facade functions in the Persistence layer.
  * Database queries must exclusively occur within the Persistence layer.
  * Ensure the Client layer is not dependent on Yves or Zed Communication layers.
  * Prevent the Service layer from relying on the Business layer of another module.
  * Encourage the Business layer to depend on the Persistence layer, for example, a Repository, but not on ORM directly.
  * Avoid cross-module Business layer dependencies. Use injected Facades instead.
* To identify all violations, you can run `docker/sdk cli vendor/bin/deptrac analyse` on the `./src` directory.
* A service can contain only reusable lightweight stateless business logic without using the database, storage connections, or global variables. All required data must be provided as an input.

## Dependency handling and business logic
* Singleton instances should be provided from Dependency Provider classes, and avoid using `getInstance()` method outside the Dependency Provider.
* Ensure there is no business logic within Non-Business layers. Plugins should focus on using business classes and making simple, one-line calls.
* There is no need to follow the Bridge design pattern on the project level. Refrain from creating or extending bridges from the core.
* Business Factory classes can resolve Repository, Entity Manager, and Config classes without needing initialization inside the Factory class.

## Code quality
* If a method has multiple tasks, it violates the Single Responsibility Principle. The ideal approach is for a method to perform one task that aligns with its name.
* Handle exceptions in your code base to provide meaningful error messages to customers at runtime.
* Separate reader and mapper responsibilities for optimal implementation; mappers convert data types, and readers retrieve data from sources.
* Avoid using deprecated classes or functions.
* Eliminate commented code blocks and unused classes or methods. Remove them instead of keeping them as comments.
* Exclusively utilize constants within the configuration classes.
* Utilize constants exclusively within configuration classes.
* For the sake of the improved management, enhanced readability, and clearer code intent, avoid hard-coded strings and IDs with variables or constants.
* Avoid unnecessary duplications from the core; consider using "parent" when applicable or exploring alternative development strategies such as plug-and-play.
* Avoid suppressing PHPStan checks. These checks are there to improve the quality of the code base.
* Eliminate unused features from the project to streamline upgrade processes and enhance overall project maintainability.
* Address technical debt promptly to maintain code quality and maintainability. Search and resolve `todo`, `fixme`, and `workaround` on the project level.

## Code testability and cleanup
* Avoid mocking a service outside a test environment.
* Use of global variables will reduce the testability of the code base.
* Remove example modules such as `ExampleProductSalePage`, `ExampleStateMachine`, etc.
* Rather than relying on comments to ensure that code remains unchanged, we recommend creating a unit test that fails if the requirements are not met.

## Tools

We use our [Architecture Sniffer Tool](https://github.com/spryker/architecture-sniffer) to assert a certain quality of Spryker architecture for both core and project.

## Running the tool

The sniffer can find a lot of violations and report them:

```php
$ vendor/bin/console code:sniff:architecture

// Sniff a specific subfolder of your project - with verbose output
$ vendor/bin/console code:sniff:architecture src/Pyz/Zed -v

// Sniff a specific module
$ vendor/bin/console code:sniff:architecture -m Customer
```

Tip: `c:s:a` can be used as a shortcut.

**Additional options**:

* -p: Priority [1 (highest), 2 (medium), 3 (experimental)] (defaults to 2)
* -s: Strict (to also report those nodes with a @SuppressWarnings annotation)
* -d: Dry-run, only output the command to be run

Run –help or -h to get help about usage of all options available.

See the [architecture sniffer](https://github.com/spryker/architecture-sniffer) documentation for details and information on how to set it up for your CI system as a checking tool for each PR.
