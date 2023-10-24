
## The difference between core and example modules

**Core modules** provide generic, reusable functionality that benefits a wide range of customers. They offer a foundation for customization and serve as versatile building blocks.

**Example Modules** in contrast, are designed for specific, one-off use-cases. Their functionality is tightly aligned with unique business requirements and isn't suitable for broad reuse. These modules serve as specialized, project-specific solutions.

## Example module use-cases

### SCOS: Showcase functionality

SCOS uses example modules to fill the gap with concrete/example implementation over an abstract workflow (latter is the target of delivery), where the concrete/example implementation is never actually usable by any concrete customer or business use-case, thus the actual business logic is not part of the core (eg: the React API Example).

### SCOS: Unique business use-case

SCOS uses example modules to implement functionality that is unique business (customer) use-case specific. The actual business logic is not part of the core as it does NOT offer regular core quality and is extracted into an example module.

## Obligations

### Exclusions and Non-Commitments

Sprkyer has no strict obligations regarding the maintenance, compatibility, flexibility, and extendibility of the example modules.

* **Compliance**
  * Examples modules will never reach a stable release.
* **Compatibility**
  * Forward and backward compatibility is NOT guranteed.
  * NO upgradability support for projects, or demoshop integrations.
* **Learnability**
  * NO commitment on documentation.
* **Maintainability**
  * There is NO obligation to maintain them.
  * They MAY be abandoned at any time.
  * They are NOT supported in any way.
  * Maintenance is NOT part of the design.
* **Customisability**
  * They do NOT support to build other functionality on/related to them.
  * They are NOT designed to be used, extended, configured in projects.
* **Modularity**
  * NO guarantee on modularity & reusability.
* **Security**
  * NO obligations on security fixes.
* **Performance**
  * NO commitment on performance.
* **Testability**
  * NO commitment on any level of correct behaviour per any release.

### Commitments

* **Compliance**
  * All Example Modules will be part of the Spyker Example organization on Github.
  * All Example Modules will be released as standalone modules.
  * All Example Modules will be released under the MIT license.
* **Uniformity**
  * Example modules will be suffixed with “example”.
* **Testability**
  * They might provide tests.
* **Learnability**
  * A proper explanation of the implemented functionality will be provided in the `readme.md`.
