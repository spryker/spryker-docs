
## The difference between core and example modules

**Core modules** provide generic, reusable functionality that benefits a wide range of customers. They offer a foundation for customization and serve as versatile building blocks.

**Example Modules** in contrast, are designed for specific, one-off use-cases. Their functionality is tightly aligned with unique business requirements and isn't suitable for broad reuse. These modules serve as specialized, project-specific solutions.

## Example module use-cases

### SCOS: Showcase functionality

SCOS uses example modules to fill the gap with concrete/example implementation over an abstract workflow (latter is the target of delivery), where the concrete/example implementation is never actually usable by any concrete customer or business use-case, thus the actual business logic is not part of the core (eg: the React API Example).

### SCOS: Unique business use-case

SCOS uses example modules to implement functionality that is unique business (customer) use-case specific. The actual business logic is not part of the core as it does NOT offer regular core quality and is extracted into an example module.

## What Spryker delivers

* **Compliance**
  * All Example Modules will be part of the Spyker Example organization on Github.
  * All Example Modules will be released as standalone modules.
  * All Example Modules will be released under the MIT license.
* **Uniformity**
  * Example modules will be suffixed with “example”.
* **Testability**
  * They might provide tests, but they don't have to.
* **Learnability**
  * A proper explanation of the implemented functionality will be provided in the `readme.md`.

## What's Not Included

Unlinke for our SCOS Core Modules, Sprkyer has no strict guidelines and regulations regarding the Example Modules.

* **Stability**
  * We aim to keep our example modules in good shape, but we don't promise a stable release.
* **Compatibility**
  * While we work to keep things compatible, we can't guarantee forward or backward compatibility.
  * There is no upgradability support for projects, or demoshop integrations.
* **Learnability**
  * We provide documentation when we can, but it's not a firm commitment. We encourage community learning and support.
* **Maintainability**
  * There is NO obligation to maintain them.
  * They MAY be abandoned at any time.
  * They are NOT supported in any way.
  * Maintenance is NOT part of the design.
* **Customisability**
  * We don't support nor encourage customization of example modules.
  * They are never designed to be used, extended or configured in projects.
* **Modularity**
  * No additional effort regarding modularity and extendibility will be made for example modules.
* **Security**
  * Sprkyer provides security for it's production grade core modules. Example modules might receive security updates but there is no urgency for security fixes for example modules, as they are not intended to be used in production.
* **Performance**
  * While we try to deliver good performance, we have no intention to optimize example modules beyond any best practice we already apply.
* **Testability**
  * We might provide tests for the example modules but they have no priority, because the modules are not thought to be used in production or to be extended.

In a nutshell, think of our example packages as a playground - there's potential for fun and innovations -, explore at your own pace!