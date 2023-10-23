
## The difference between core and example modules

**Core modules** provide generic, reusable functionality that benefits a wide range of projects. They offer a foundation for customization and serve as versatile building blocks.

**Example Modules** in contrast, are designed for specific, one-off use-cases. Their functionality is tightly aligned with unique business requirements and isn't suitable for broad reuse. These modules serve as specialized, project-specific solutions.

## Example module use-cases

### SCOS: Showcase functionality

SCOS uses example modules to fill the gap with concrete/example implementation over an abstract workflow (latter is the target of delivery), where the concrete/example implementation is never actually usable by any concrete customer or business use-case, thus the actual business logic is not part of the core (eg: Example picking strategy).

### SCOS: Unique business use-case

SCOS uses example modules to implement functionality that is unique business (customer) use-case specific. The actual business logic is not part of the core as it does NOT offer regular core quality and is extracted into an example module.

## Obligations

### Exclusions and Non-Commitments

Sprkyer has no strict obligations regarding the maintenance, compatibility, flexibility, and extendibility of the example modules.

* **Compliance**
  * Example modules MUST NOT be mapped to features.
  * Examples modules MUST never reach a stable release.
* **Compatibility**
  * Forward and backward compatibility is NOT in scope (more majors).
  * NO upgradability support for projects, or demoshop integrations.
* **Learnability**
  * NO commitment on documentation (MAY increase learning curve for project / core development).
* **Maintainability**
  * There is NO obligation to maintain them.
  * They MAY be abandoned at any time.
  * They are NOT supported in any way.
  * Maintenance is NOT part of the design (more expensive core adjustments & more majors around core adjustments).
* **Customisability**
  * They do NOT support to build other functionality on/related to them (neither for core/project).
    * Consequence: Application infrastructure can NOT be developed in example module.
  * They are NOT designed to be used, extended, configured on project production.
* **Modularity**
  * NO guarantee on modularity & reusability (the parts are NOT designed to be reusable without investment both for project/core).
* **Security**
  * NO obligations on security fixes.
* **Performance**
  * NO commitment on performance.
* **Testability**
  * (NOT wired in Spryker Products) NO commitment on any level of correct behaviour per any release.

### Commitments

* **Compliance**
  * The code quality MUST match the project quality guidelines (or better).
  * New Example Modules MUST be in the “example organisation” (SprykerExample).
  * All Example Modules MUST be released as standalone modules.
  * All Example Modules MUST be released under the MIT license.
* **Maintenance**
  * Feature integrations in Spryker Products MUST be aligned with the integrated example modules (extra maintenance effort on the Feature modules + on the example module).
  * Project development MUST clean-up (aka “remove”) the example module when enabling it for production.
* **Uniformity**
  * Example modules MUST be suffixed with “example”.
  * Example modules MUST provide the before-mentioned disclaimer.
* **Testability**
  * They SHOULD provide tests.
* **Learnability**
  * A proper explanation of the implemented functionality MUST be provided in the `readme.md`.
