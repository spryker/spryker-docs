---
title: Spryker Data Exchange
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: Mar 21, 2025
layout: custom_new
article_status: published
nav_pr: 3.4
tags: 
  - ECO Module
  - ACP
  - API
  - Custom Build
  - Community Contribution
---

For most non-trivial third-party integrations, creating a dedicated, new module within the Spryker project is the most robust and maintainable approach. This new module will encapsulate all the logic, data structures, and configurations specific to interacting with the particular third-party vendor. This aligns with Spryker's "Project Modules" development strategy, which promotes high upgradability.

## Best Practices for Creating a New Module

When initiating the development of a new integration module, adhering to Spryker's established best practices is crucial for ensuring consistency, maintainability, and compatibility.

### Namespace and Module Creation:

1.  First, enable a custom namespace for your company or project by adding it to the `KernelConstants::CORE_NAMESPACES` array in your project's `config/Shared/config_default.php` file. This allows Spryker to recognize and load your custom modules.
    ```php
    // Example: in config/Shared/config_default.php
    $config[KernelConstants::CORE_NAMESPACES] = [
        'SprykerShop',
        'SprykerEco',
        'Spryker',
        'MyCompany', // Your company's namespace
    ];
    ```
2.  Use the Spryker development console to scaffold the basic structure of your new module:
    ```bash
    vendor/bin/spryker-dev-console dev:module:create MyCompany.MyIntegrationModule
    ```
    Replace `MyCompany` with your registered namespace and `MyIntegrationModule` with the desired name for your integration module (e.g., `PaymentProviderX`, `ErpConnector`).

### Adhere to Architectural Principles:

* **Single-Responsibility Principle (SRP)**: Each module, including your integration module, should have a single, well-defined responsibility. For an integration module, this responsibility is typically to manage all interactions with a specific third-party vendor.
* **Cohesion**: Group related features and logic concerning the third-party vendor within this single module. However, avoid creating a monolithic module if the vendor offers vastly different, separable services that could logically be split further.
* **Decoupling**: Clearly define the boundaries of your integration module. It should interact with other Spryker modules or external systems through well-defined interfaces, such as its own Facade (for other Spryker modules to consume its services), Clients (if it needs to call other Spryker services), or Plugins (to extend or be extended by other modules).
* **Layered Organization**: Structure your integration module according to Spryker's application layers: Persistence, Business, Communication, and potentially Presentation (for any Back Office configuration UIs). This architectural consistency simplifies development and maintenance.
* **Avoid Over-Modularization**: While modularity is beneficial, creating excessively small modules for trivial aspects of the integration can lead to unnecessary complexity.
* **Testability**: Design your module and its components to be independently testable. This is crucial for verifying the integration's functionality and ensuring stability during upgrades.

The HelloWorld module tutorial provides a basic example of creating a new module, including its layers and components, which can serve as a structural reference.

## Defining the Module Structure

A typical integration module will have components across Spryker's standard application layers.

### Persistence Layer

If your integration requires storing vendor-specific data—such as API credentials (though see Section 6.2 for secure storage recommendations), mapping tables between Spryker entities and vendor entities, transaction logs, or custom configurations not suitable for environment variables—you will need to define a Persistence Layer.

* **Database Schema (`schema.xml`)**: Define the structure of your custom tables in an XML file located at `src/MyCompany/Zed/MyIntegrationModule/Persistence/Propel/Schema/my_integration_module.schema.xml`. Remember to use your project-specific prefix (e.g., `pyz_` or a custom one like `mcmy_`) for table names to avoid conflicts with Spryker core tables.
* **Propel Class Generation**: After defining or modifying your schema, run `vendor/bin/console propel:install`. This command will parse the schema files, generate the corresponding Propel entity and query classes, and create database migrations. The architectural walkthrough tutorial demonstrates adding a schema file and running this command.
* **Repositories**: For read operations, implement Repository classes that extend `Spryker\Zed\Kernel\Persistence\AbstractRepository`. Repositories are responsible for fetching data and typically map Propel entities to Transfer Objects for use in the Business Layer.
* **EntityManagers**: For write operations (create, update, delete), you might implement EntityManager classes, although often this logic can be encapsulated within Business Models that use the generated Propel entities directly.
* **QueryContainers**: To organize and provide easy access to your module's Propel query objects, implement a QueryContainer class extending `Spryker\Zed\Kernel\Persistence\AbstractQueryContainer`. The architectural walkthrough also includes an example of creating a `HelloSprykerQueryContainer`.

### Business Layer

This layer houses the core logic of your integration.

* **Facades (`AbstractFacade`)**: The Facade (e.g., `MyIntegrationModuleFacade.php`) serves as the public API for your integration module's business logic. Other Spryker modules that need to interact with your integration will do so through its Facade. The Facade should implement a corresponding interface (e.g., `MyIntegrationModuleFacadeInterface.php`) defining its public methods. It delegates calls to the appropriate Business Models. The architectural walkthrough provides an example of creating a `HelloSprykerFacade`.
* **Business Models**: These classes contain the actual integration logic. This could include:
    * Transforming data between Spryker's format and the third-party vendor's format.
    * Making API calls to the third-party service.
    * Handling API responses, including error conditions.
    * Implementing any specific business rules related to the integration.
    It's good practice to group models by activity, for example, in subdirectories like `Reader/`, `Writer/`, `Processor/`. Dependencies (like HTTP clients or other Facades) are typically injected into models via their constructors by the Factory.
* **Factories (`AbstractBusinessFactory`)**: The Business Factory (e.g., `MyIntegrationModuleBusinessFactory.php`) is responsible for instantiating the Business Models, Repositories, and other necessary objects within the Business Layer. It also handles injecting dependencies into these objects. The Factory can access the module's configuration (see Section 6.2) via its inherited `getConfig()` method to retrieve settings like API keys or base URLs needed for instantiating service clients. The architectural walkthrough includes creating a `HelloSprykerBusinessFactory`.
* **Transfer Objects (DTOs)**: These are simple value objects used to pass structured data between layers and modules, promoting loose coupling. Define their structure in XML files (e.g., `src/MyCompany/Shared/MyIntegrationModule/Transfer/my_integration_module.transfer.xml`) and generate the PHP classes using `vendor/bin/console transfer:generate`. The architectural walkthrough demonstrates creating `hello_spryker.transfer.xml`.

### Communication Layer

This layer handles interactions between your integration module and the "outside world," which could be other Spryker modules or incoming requests from the third-party vendor.

* **Controllers (`AbstractController`)**: If your integration needs to expose HTTP endpoints—for instance, to receive webhook notifications or callbacks from the third-party vendor—you will implement Controllers in this layer. These controllers will typically delegate processing to the Business Layer via the module's Facade.
* **Plugins (`AbstractPlugin`)**: Plugins are a crucial part of the Communication Layer for integrations. Your integration module might:
    * **Provide plugins**: To allow other Spryker modules to extend or interact with its functionality. For example, a payment integration module would provide plugins for the Checkout module.
    * **Consume plugins**: To extend the functionality of other Spryker modules. For example, an integration might provide a plugin to add custom data to an order export plugin stack. An example of a plugin in the Communication Layer is the `ProductTableConfigurationExpanderPlugin` shown in the standalone module creation guide, which modifies a UI table.
* **RouteProviderPlugins**: If your module includes Controllers that expose HTTP endpoints, you'll need to create a `RouteProviderPlugin` (e.g., `MyIntegrationModuleRouteProviderPlugin.php`) to define the routes that map URLs to your controller actions. This plugin is then registered in the application's `RouterDependencyProvider`. The architectural walkthrough shows creating a `HelloSprykerRouteProviderPlugin`.

## Managing Dependencies: Effective Use of DependencyProvider Classes

`DependencyProvider` classes are central to Spryker's Inversion of Control (IoC) mechanism. They are responsible for declaring and injecting the dependencies a module requires from other modules or core services. For an integration module, this is how it gains access to other Spryker Facades (e.g., `SalesFacade`, `ProductFacade`), Clients, or shared services.

### Structure and Conventions:

* Each application layer of your module (Zed, Client, Yves, Service) can have its own `DependencyProvider` (e.g., `MyIntegrationModuleDependencyProvider.php` for the Zed layer), extending the appropriate `AbstractBundleDependencyProvider`.
* Dependencies are typically injected within layer-specific methods like `provideBusinessLayerDependencies()`, `provideCommunicationLayerDependencies()`, or `providePersistenceLayerDependencies()`.
* The provide-add-get pattern is often used:
    * The `provide...Dependencies()` method calls various `add...()` methods.
    * Each `add...()` method injects a single dependency (or a collection like a plugin stack) into the `$container` using `$container->set(KEY, $closure)` or `$container->factory(KEY, $closure)` for services that need a new instance each time.
    * `KEY` is usually a public constant defined within the `DependencyProvider` (e.g., `public const FACADE_SALES = 'FACADE_SALES';`).
    * The closure provides late-binding, instantiating the dependency only when it's actually requested.
* When injecting a Facade from another module, it's a Spryker convention to wrap it in a Bridge to further decouple the modules. The Bridge implements an interface defined by the consuming module, and the `DependencyProvider` injects this Bridge. This creates an anti-corruption layer, making the integration module dependent on its own interface rather than the concrete implementation of another module's Facade, enhancing resilience to changes.

### Accessing Dependencies in Factories:

* Once a dependency is provided via the `DependencyProvider`, it can be retrieved in the module's Factory (for the corresponding layer) using `$this->getProvidedDependency(MyIntegrationModuleDependencyProvider::KEY_OF_DEPENDENCY)`.
* The architectural walkthrough provides an example where `HelloSprykerDependencyProvider` provides `FACADE_STRING_REVERSER`, which is then accessed in `HelloSprykerBusinessFactory` using `getProvidedDependency()`.

Mastering the use of `DependencyProvider`s is essential for building well-structured and maintainable Spryker integrations that adhere to the platform's architectural principles of loose coupling and clear dependency management.

The following table summarizes the core components typically found in a custom integration module:

**Table 2: Core Components for Custom Integration Modules**

| Layer                       | Key Component                                        | Purpose in Integration                                                                                             | Snippet Reference for Example/Convention          |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| **Shared** | TransferObject (`*.transfer.xml`)                    | Define data structures for communication between layers and modules.                                               |                                                   |
| **Persistence** | `schema.xml`                                         | Define custom database tables for integration-specific data.                                                       |                                                   |
|                             | Repository                                           | Provide read-access to persisted integration data, map to Transfer Objects.                                        |                                                   |
|                             | EntityManager                                        | Provide write-access to persisted integration data (can also be done in Business Models).                          |                                                   |
|                             | QueryContainer                                       | Organize and provide access to Propel query objects for the module.                                                |                                                   |
| **Business** | Facade & FacadeInterface                             | Expose the integration module's business logic as an API to other Spryker modules.                                 |                                                   |
|                             | BusinessFactory                                      | Instantiate Business Models, inject dependencies (including configurations and other services).                    |                                                   |
|                             | BusinessModel (Readers, Writers, Processors)         | Contain the core logic for interacting with the third-party vendor (API calls, data transformation, etc.).         |                                                   |
| **Communication** | Controller                                           | Handle incoming HTTP requests if the integration exposes endpoints (e.g., webhooks).                               |                                                   |
|                             | Plugin                                               | Extend other Spryker modules or provide extension points for the integration module itself.                        |                                                   |
|                             | RouteProviderPlugin                                  | Define URL routes for the module's Controllers.                                                                    |                                                   |
| **Zed/Client/Yves** (as applicable) | DependencyProvider                                   | Declare and inject dependencies (other Facades, Clients, Plugins, Configs) required by the integration module. |                                                   |
|                             | Config (`*Config.php`)                               | Provide module-specific configuration values, potentially sourced from global configs or environment variables.  |                                                   |
|                             | Constants (`*Constants.php`)                         | Define constant keys for configuration values.                                                                     |                                                   |

For more extensive documentation on [Creating a new module](https://docs.spryker.com/docs/dg/dev/developing-standalone-modules/developing-standalone-modules)

## Helpful Articles

* **Tutorial: Architectural Walkthrough**: Provides a practical example of creating a module, including its layers. [https://docs.spryker.com/docs/dg/dev/architecture/tutorial-architectural-walkthrough.html](https://docs.spryker.com/docs/dg/dev/architecture/tutorial-architectural-walkthrough.html)
* **Create Modules (Tutorial)**: A general guide on module creation. [https://docs.spryker.com/docs/dg/dev/backend-development/extend-spryker/create-modules.html](https://docs.spryker.com/docs/dg/dev/backend-development/extend-spryker/create-modules.html)
* **Dependency Provider**: Crucial for managing dependencies between your integration module and other Spryker modules.
    * The "Architectural Convention" page covers Dependency Providers extensively.
    * Specific examples of plugin registration in Dependency Providers: [https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/plugins-registration.html](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/plugins-registration.html)
    * General guide on Dependency Providers (though link was inaccessible, this is a key concept): `https://docs.spryker.com/docs/dg/dev/backend-development/dependency-provider/dependency-provider.html`
* **Facade**: Understanding how to create and use Facades as the API for your module. [https://docs.spryker.com/docs/dg/dev/backend-development/zed/business-layer/facade/facade.html](https://docs.spryker.com/docs/dg/dev/backend-development/zed/business-layer/facade/facade.html)
* **Factory**: For instantiating objects within your module. [https://docs.spryker.com/docs/dg/dev/backend-development/factory/factory.html](https://docs.spryker.com/docs/dg/dev/backend-development/factory/factory.html)
* **Persistence Layer (Database Schema, Repositories, Entities)**:
    * Database Schema Definition: [https://docs.spryker.com/docs/dg/dev/backend-development/zed/persistence-layer/database-schema-definition.html](https://docs.spryker.com/docs/dg/dev/backend-development/zed/persistence-layer/database-schema-definition.html)
    * Entity: [https://docs.spryker.com/docs/dg/dev/backend-development/zed/persistence-layer/entity.html](https://docs.spryker.com/docs/dg/dev/backend-development/zed/persistence-layer/entity.html)
    * Repository: [https://docs.spryker.com/docs/dg/dev/backend-development/zed/persistence-layer/repository.html](https://docs.spryker.com/docs/dg/dev/backend-development/zed/persistence-layer/repository.html)