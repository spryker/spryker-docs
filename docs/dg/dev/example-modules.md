---
title: Example modules
description: Spryker example modules are designed for specific use cases and their functionality is aligned with unique business requirements.
last_updated: Jan 11, 2024
template: concept-topic-template
redirect_from:
- /docs/scos/dev/example-modules.html
---

The Spryker *core modules* provide generic, reusable functionality that benefits a wide range of use cases. These modules offer a foundation for customization and serve as versatile building blocks.

*Example modules*, in contrast, are designed for specific, one-off use cases. Their functionality is tightly aligned with unique business requirements and isn't suitable for broad reuse. These modules serve as specialized, project-specific solutions. See the [Product Warehouse Allocation Example](https://github.com/spryker/product-warehouse-allocation-example) module.

## Example module use-cases

Use cases for example modules include showcasing functionality and demonstrating specific use cases.

### SCCOS: Showcase functionality

SCCOS uses example modules to fill the gap with concrete example implementation for an abstract workflow, which is the delivery target. However, this concrete implementation is not intended for actual use by any specific customer or business use case. Therefore, the core does not include the actual business logic.

### SCCOS: Unique business use-case

SCCOS uses example modules to implement functionality that is tailored to specific business use cases. The core does not include the actual business logic, as it doesn't meet the standard core quality. Instead, this logic is extracted into an example module.

## What Spryker delivers

* **Compliance:**
  * All example modules will be part of the Spyker Example organization on GitHub.
  * All example modules will be released as standalone modules.
  * All example modules will be released under the MIT license.
* **Uniformity:**
  * Example modules will be suffixed with “example”.
* **Testability:**
  * Example modules might include tests, but they don't have to.
* **Learnability:**
  * A proper explanation of the implemented functionality will be provided in the `readme.md` file.

## What isn't included

In contrast to Spryker SCCOS core modules, example modules do not adhere to strict guidelines and regulations.

* **Stability:**
  While we strive to maintain the quality of our example modules, we do not guarantee a stable release.
* **Compatibility:**
  * While we do our best to keep things compatible, we can't guarantee forward or backward compatibility.
  * There is no upgradability support for projects or Demo Shop integrations.
* **Learnability:**
  While documentation is provided when possible, it is not a firm commitment. We encourage community learning and support.
* **Maintainability:**
  * There is no obligation to maintain example modules.
  * Example modules may be abandoned at any time.
  * Example modules aren't supported in any way.
  * Maintenance isn't part of the design.
* **Customizability:**
  * We neither support nor encourage customization of example modules.
  * Example modules have not been designed for use, extension, or configuration in projects.
* **Modularity:**
  No additional effort will be invested in enhancing modularity and extendibility for example modules.
* **Security:**
  Spryker ensures security for its production-grade core modules. While example modules might receive security updates, there is no urgency for fixes, as they are not intended for production use.
* **Performance:**
  While we aim for good performance, optimizing example modules beyond existing best practices is not a priority.
* **Testability:**
  We might provide tests for example modules, but they don't have high priority, as the modules aren't intended for production use or extension.

In a nutshell, think of our example packages as a playground - they offer potential for fun and innovation, so explore them at your own pace.
