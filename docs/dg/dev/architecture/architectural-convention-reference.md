---
title: Architectural convention reference
description: The Spryker framework includes a diverse range of components designed to address common challenges and streamline development processes. These components establish conventions and guidelines to ensure appropriate application responses.
last_updated: Apr 10, 2024
template: concept-topic-template
related:
  - title: Conceptual Overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Modules and Application Layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
---


This document serves as a dynamic resource intended to provide an overview of our conventions and guidelines. We acknowledge that the technology landscape is ever-evolving, and as such, this document is subject to continuous refinement and improvement.

Your feedback and suggestions are highly valued to enhance the accuracy, relevance, and effectiveness of Spryker. We encourage you to contribute your insights and recommendations by proposing changes through our designated channels.

## Documentation structure

### Development Use-Cases

Understanding the development scenarios in which Spryker can be used is crucial for maximizing its potential. We have outlined specific behaviors and guidelines tailored to different use-cases:

- **Project development**: If you are developing a project, you need to adhere to specific project development guidelines to ensure a smooth integration.
- **Module development**: Contributing third-party reusable modules, boilerplates or accelerators requires additional considerations. We provide guidelines specific to this use-case to streamline your contributions.  Because such functionalities should be reusable on multiple projects in different contexts, these guidelines are more strict than *Project Development*.
- **Module development**: Contributing third-party reusable modules, boilerplates or accelerators requires additional considerations. We provide guidelines specific to this use-case to streamline your contributions. Because such functionalities should be reusable on multiple projects in different contexts, these guidelines are more strict than *Project Development*.
- **Core module development**: For those contributing to Spryker modules, there are specialized rules to follow within the module folders. This ensures consistency and compatibility across product lines based on the Spryker Framework. These requirements are the the most strict to be reusable on multiple projects in different business verticals, like B2C, B2B, Marketplace, Unified Commerce, and ensure the stability of module API used by Spryker development ecosystem and community.

Our guidelines and conventions for each component begin with generic instructions applicable to all development use cases. Following this, you will find specific details to the more specialized versions of development use cases.

### Directive Classification

There are two types of directives:
- **Convention**: These are mandatory requirements that contributors must adhere to enable specific Spryker features and ensure proper application responses.
- **Guideline**: While not mandatory, following these guidelines is highly recommended to promote long-term code maintainability and facilitate smoother development processes.

## Applications

Spryker uses application layers to enable constructing the necessary application architecture for the specific business requirements to provide a quick project start and long-term maintainability.
- Backend applications, like Zed, Backend API, Backend Gateway, Backoffice, GlueBackend, MerchantPortal, Console, typically use the Zed-, Glue-, Client-, Service-, and Shared application layers.
- Storefront applications, like Yves, Configurator, Glue, GlueStorefront, Console, typically use the Yves-, Glue-, Client-, Service- and Shared application layers.

## Application Layers

Spryker organizes responsibilities and functionalities over a set of [application layers](https://docs.spryker.com/docs/dg/dev/architecture/conceptual-overview.html) to enable flexible business logic orchestration across the applications.

The application layers are aggregations of [layers](https://docs.spryker.com/docs/dg/dev/architecture/modules-and-application-layers.html). Some application layers are multi-layered with components organized in layer directories, while others are flat-layered with components merged in the same directory.

| APPLICATION LAYER | LAYERING | LAYER |
| Glue |  flat-layered | Communication layer |
| Client |  flat-layered | Communication layer |
| Service |  flat-layered | Overarching Business layer |
| Yves |  flat-layered |  Presentation layer merged with Communication layer |
| Zed |  multi-layered | Presentation, Communication, Business, and Persistence layers |

The Shared application layer is a layer-overarching, stateless, abstraction library.

### Zed

Zed serves as the backend application layer responsible for housing all business logic, persisting data and backend UI, like the Back Office.

```text
[Organization]
└── Zed
    └── [Module]
        ├── Presentation
        │   ├── Layout
        │   │   └── [layout-name].twig
        │   └── [name-of-controller]
        │       └── [name-of-action].twig
        │    
        ├── Communication
        │   ├── Controller
        │   │   ├── IndexController.php
        │   │   ├── GatewayController.php
        │   │   └── [Name]Controller.php
        │   ├── [CustomDirectory]
        │   │   ├── [ModelName]Interface.php
        │   │   └── [ModelName].php        
        │   ├── Exception
        │   ├── Plugin
        │   │   └── [ConsumerModule]
        │   │       └── [PluginName]Plugin.php
        │   ├── Form
        │   │   ├── [Name]Form.php
        │   │   └── DataProvider
        │   │       └── [Name]FormDataProvider.php
        │   ├── Table
        │   │   └── [Name]Table.php                
        │   ├── navigation.xml       
        │   └── [Module]CommunicationFactory.php
        │            
        ├── Business
        │   ├── [CustomDirectory]
        │   │   ├── [ModelName]Interface.php
        │   │   └── [ModelName].php        
        │   ├── Exception   
        │   ├── [Module]BusinessFactory.php
        │   ├── [Module]Facade.php
        │   └── [Module]FacadeInterface.php
        │
        ├── Persistence
        │   ├── [Module]EntityManagerInterface.php
        │   ├── [Module]EntityManager.php
        │   ├── [Module]QueryContainer.php
        │   ├── [Module]PersistenceFactory.php
        │   ├── [Module]RepositoryInterface.php
        │   ├── [Module]Repository.php
        │   └── Propel
        │       ├── Abstract[TableName].php
        │       ├── AbstractSpy[TableName]Query.php
        │       ├── Mapper
        │       │   └── [Module|Entity]Mapper.php
        │       └── Schema
        │           └── [organization_name]_[domain_name].schema.xml
        │
        ├── Dependency
        │   ├── Client
        │   │   ├── [Module]To[Module]ClientBridge.php
        │   │   └── [Module]To[Module]ClientInterface.php          
        │   ├── Facade
        │   │   ├── [Module]To[Module]FacadeBridge.php
        │   │   └── [Module]To[Module]FacadeInterface.php
        │   ├── QueryContainer
        │   │   ├── [Module]To[Module]QueryContainerBridge.php
        │   │   └── [Module]To[Module]QueryContainerInterface.php      
        │   ├── Service
        │   │   ├── [Module]To[Module]ServiceBridge.php
        │   │   └── [Module]To[Module]ServiceInterface.php      
        │   └── Plugin
        │       └── [PluginInterfaceName]PluginInterface.php
        │                
        ├── [Module]Config.php
        └── [Module]DependencyProvider.php
```

Used components:
- [Bridge](#bridge)
- [Config](#module-configurations)
- [Controller](#controller)
- [Dependency provider](#dependency-provider)
- [Entity](#entity)
- [Entity Manager](#entity-manager)
- [Facade](#facade-design-pattern)
- [Factory](#factory)
- [Gateway controller](#gateway-controller)
- [Layout](#layout)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Models](#model)
- [navigation.xml](#navigationxml)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Query container](#facade-design-pattern)
- [Query object](#query-object)
- [Repository](#repository)
- [Schema](#persistence-schema)

### Yves

Yves application layer provides a lightweight Shop Application.

```
[Organization]
└── Yves
    └── [Module]
        ├── Controller
        │   ├── IndexController.php
        │   └── [Name]Controller.php
        ├── [CustomDirectory]
        │   ├── [ModelName]Interface.php
        │   └── [ModelName].php                
        ├── Dependency
        │   ├── Client
        │   │   ├── [Module]To[Module]ClientBridge.php
        │   │   └── [Module]To[Module]ClientInterface.php
        │   ├── Service
        │   │   ├── [Module]To[Module]ServiceBridge.php
        │   │   └── [Module]To[Module]ServiceInterface.php           
        │   └── Plugin
        │       └── [PluginInterfaceName]PluginInterface.php
        ├── Plugin
        │   ├── Provider
        │   │   └── [Name]ControllerProvider.php
        │   └── [ConsumerModule]
        │       ├── [PluginName]Plugin.php
        │       └── [RouterName]Plugin.php
        ├── Theme
        │   └── ["default"|theme]
        │       ├── components
        │       │   │── organisms
        │       │   │   └── [organism-name]
        │       │   │       └── [organism-name].twig
        │       │   │── atoms
        │       │   │   └── [atom-name]
        │       │   │       └── [atom-name].twig
        │       │   └── molecules
        │       │       └── [molecule-name]
        │       │           └── [molecule-name].twig
        │       ├── templates
        │       │   ├── page-layout-[page-layout-name]
        │       │   │   └── page-layout-[page-layout-name].twig
        │       │   └── [template-name]
        │       │       └── [template-name].twig
        │       └── views
        │           └── [name-of-controller]
        │               └── [name-of-action].twig        
        ├── Widget
        │   └── [Name]Widget.php
        ├── [Module]Config.php
        ├── [Module]DependencyProvider.php
        └── [Module]Factory.php
```

Used components:
- [Bridge](#bridge)
- [Config](#module-configurations)
- [Controller](#controller)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Layout](#layout)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Provider / Router](#provider--router)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Templates](#theme)
- [Theme](#theme)
- [Widget](#widget)

### Glue

The Glue application layer serves as a conduit for providing data access points through APIs.
It acts as an interface for external systems to interact with the application's data.

```
[Organization]
└── Glue
    └── [Module]
        ├── Controller
        │   ├── IndexController.php        
        │   └── [Name]Controller.php                
        ├── [CustomDirectory]
        │   ├── [ModelName]Interface.php
        │   └── [ModelName].php        
        ├── Dependency
        │   ├── Client
        │   │   ├── [Module]To[Module]ClientBridge.php
        │   │   └── [Module]To[Module]ClientInterface.php
        │   ├── Facade
        │   │   ├── [Module]To[Module]FacadeBridge.php
        │   │   └── [Module]To[Module]FacadeInterface.php
        │   ├── QueryContainer
        │   │   ├── [Module]To[Module]QueryContainerBridge.php
        │   │   └── [Module]To[Module]QueryContainerInterface.php      
        │   ├── Service
        │   │   ├── [Module]To[Module]ServiceBridge.php
        │   │   └── [Module]To[Module]ServiceInterface.php           
        │   └── Plugin
        │       └── [PluginInterfaceName]PluginInterface.php
        ├── Plugin
        │   ├── Provider
        │   │   └── [Name]ControllerProvider.php
        │   └── [ConsumerModule]
        │       └── [PluginName]Plugin.php
        ├── [Module]Config.php
        ├── [Module]DependencyProvider.php
        └── [Module]Factory.php
```

Used components:
- [Bridge](#bridge)
- [Config](#module-configurations)
- [Controller](#controller)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)

### Client

Client is a lightweight application layer that handles all data access, such as the following:
- Persistence access: key-value storage (Redis), Search (Elasticsearch), Yves sessions
- Zed as a data-source (RPC)
- third-party communication

{% info_block infoBox %}

Backend database access is an exception for performance streamlining.

{% endinfo_block %}

```text
[Organization]
└── Client
    └── [Module]
        ├── [CustomDirectory]
        │   ├── [ModelName]Interface.php
        │   └── [ModelName].php        
        ├── Dependency
        │   ├── Client
        │   │   ├── [Module]To[Module]ClientBridge.php
        │   │   └── [Module]To[Module]ClientInterface.php
        │   ├── Service
        │   │   ├── [Module]To[Module]ServiceBridge.php
        │   │   └── [Module]To[Module]ServiceInterface.php           
        │   └── Plugin
        │       └── [PluginInterfaceName]PluginInterface.php            
        ├── Plugin
        │   └── [ConsumerModule]
        │       └── [PluginName]Plugin.php
        ├── Zed
        │   ├── [Module]Stub.php
        │   └── [Module]StubInterface.php
        ├── [Module]ClientInterface.php
        ├── [Module]Client.php
        ├── [Module]Config.php
        ├── [Module]DependencyProvider.php
        └── [Module]Factory.php
```

Used components:
- [Bridge](#bridge)
- [Client facade](#facade-design-pattern)
- [Config](#module-configurations)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Zed Stub](#zed-stub)

### Service

The Service application layer is multipurpose library that can be used across various application layers, such as Yves, Client, Glue, or Zed.

A service primarily consists of reusable lightweight stateless business logic components. Due to its deployment across all applications, a service is constrained to accessing data providers that are available universally. For example, the backend database is not accessible from Storefront applications by default.

```text
[Organization]
└── Service
    └── [Module]
        ├── [CustomDirectory]
        │   ├── [ModelName]Interface.php
        │   └── [ModelName].php        
        ├── [Module]Config.php            
        ├── [Module]DependencyProvider.php
        ├── [Module]ServiceFactory.php
        ├── [Module]ServiceInterface.php
        └── [Module]Service.php
```

Used components:
- [Config](#module-configurations)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Service facade](#facade-design-pattern)

### Shared

The Shared library contains code and configuration that's used across any application layer and module. It facilitates the sharing of code among application layers and modules.

To ensure compatibility and versatility across different application architecture setups, any content within the Shared library must be free of application layer-specific elements. So, [factories](#factory) are not allowed in the `Shared` library.

```text
[Organization]
└── Shared
    └── [Module]
        ├── Transfer
        │   └── [module_name].transfer.xml
        ├── [Module]Constants.php
        └── [Module]Config.php
```

Used components:
- [Config](#module-configurations)
- [Constants](#module-configurations)
- [Transfer](#transfer-object)

## Layers

An application layer can have up to four logical layers with clear purpose and communication rules:
- Presentation layer: contains frontend assets, like twig templates, JS, or CSS files.
- Communication layer: contains controllers, console commands, forms, tables, and plugins.
- Business layer: contains the business logic of a module.
- Persistence layer: contains repository, entity manager, simple data mappers, and the schema of entities.

### Presentation layer responsibilities

- Handles the UI presentation.
- Contains frontend assets, like HTML, Twig templates, JS, TypeScript, or CSS files.
- Handles user interactions and input validations on the client side.
- Interacts with the [Communication layer](#communication-layer-responsibilities) to retrieve necessary data for display.

### Communication layer responsibilities

- Acts as an intermediary between the [Presentation layer](#presentation-layer-responsibilities) and the [Business layer](#business-layer-responsibilities).
- Contains [controllers](#controller) responsible for handling HTTP requests and responses.
- Contains [plugins](#plugin) responsible for flexible, overarching requests and responses.
- Contains console commands.
- Manages form processing and validation.
- Handles [routing and dispatching requests](#provider--router) to appropriate [controllers](#controller).
- Interacts with the [Business layer](#business-layer-responsibilities) to perform business operations.

### Business layer responsibilities

- Contains the main business logic.
- Implements business rules and processes.
- Performs data manipulation, calculations, and validation.
- Interacts with the [Persistence Layer](#persistence-layer-responsibilities) to read and write data.

### Persistence Layer responsibilities

- Responsible for data storage and retrieval.
- Contains queries (via [Entity Manager](#entity-manager) or [Repository](#repository)), [entities](#entity) (data models), and [database schema definitions](#persistence-schema).
- Handles database operations such as CRUD: create, read, update, delete.
- Ensures data integrity and security.
- Maps database entities into business data transfer objects.

## Components

**Conventions**
- The components are required to be placed according to the corresponding [application layer’s](#application-layers) directory architecture in order to take effect.
- The components are required to inherit from the [application layer](#application-layers) corresponding abstract class in the  `Kernel` module to take effect.
- For core module development: The components are required to be extended directly from the [application layer](#application-layers) corresponding abstract class in the `Kernel` module.<br/>

</details>

**Guidelines**
- The components should be stateless to be deterministic and easy to comprehend.
- Project development: Module development and core module development conventions and guidelines may offer solutions for long-term requirements or recurring issues. We recommend considering them for each component.
- Module development and Core module development: The components are required to be stateless to be deterministic and easy to comprehend.

</details>

### Controller

```
[Organization]
├── Zed
│   └── [Module]
│       └── Communication
│           └── Controller
│               ├── IndexController.php
│               ├── GatewayController.php
│               └── [Name]Controller.php
│
├── Yves
│   └── [Module]
│       └── Controller
│           ├── IndexController.php
│           └── [Name]Controller.php    
│
└── Glue
    └── [Module]
        └── Controller
            ├── IndexController.php        
            └── [Name]Controller.php                      
```
**Description**

`Controllers` and `Actions` are application access points for any kind of HTTP communication with end-users or other applications.

Responsibilities of a controller are
- to adapt the received input data to the underlying layers (syntactical validation, delegation),
- delegate the processing of the input data,
- and to adapt the results of processing to the expected output format (eg: add flash messages, set response format, trigger redirect).

The `Gateway` controller name is reserved for the [Gateway Controller](#gateway-controller).

The `Index` controller name acts as the default controller during request controller resolution.

The `index` action name acts as the default action during request action resolution.

**Conventions**
- `Action` methods are required to be suffixed with `Action` and be `public` in order to be accessible, and straight forward define the entry points of the `Controller`.

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- Only `Action` methods can be `public` for simplicity.<br/>
- `Action` methods need to have either no parameter or receive the `\Symfony\Component\HttpFoundation\Request` object to access system or request variables.<br/>
- `Action` methods are required to orchestrate [syntactical validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) before delegating to underlying processing layers.<br/>
- `Action` methods can not contain any logic directly that is outside the regular responsibilities of a `Controller` (see `description` above).

</details>

**Guideline**
- `Controller` has an inherited `castId()` method that should be used for casting numerical IDs.
- The inherited `getFactory()` method grants access to the [Factory](#factory).
- The inherited `getFacade()` or `getClient()` methods grant access to the corresponding [facade](#facade-design-pattern) functionalities.

**Example**
```php
<?php

namespace Pyz\Zed\ConfigurableBundleGui\Communication\Controller;

/**
 * @method \Pyz\Zed\ConfigurableBundleGui\Communication\ConfigurableBundleGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\ConfigurableBundleGui\Business\ConfigurableBundleGuiFacadeInterface getFacade()
 */
class TemplateController extends Spryker\Zed\ConfigurableBundleGui\Communication\Controller\TemplateController
{
    /**
     * @var string
     */
    protected const PARAM_ID_CONFIGURABLE_BUNDLE_TEMPLATE = 'id-configurable-bundle-template';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function slotTableAction(Request $request): JsonResponse
    {
        $idConfigurableBundleTemplate = $this->castId(
            $request->get(static::PARAM_ID_CONFIGURABLE_BUNDLE_TEMPLATE),
        );

        $table = $this->getFactory()->createConfigurableBundleTemplateSlotTable($idConfigurableBundleTemplate);

        return $this->jsonResponse($table->fetchData());
    }
}
```

### Dependency Provider

```
[Organization]
├── Zed
│   └── [Module]        
│       └── [Module]DependencyProvider.php
├── Yves
│   └── [Module]        
│       └── [Module]DependencyProvider.php
├── Glue
│   └── [Module]        
│       └── [Module]DependencyProvider.php
├── Client
│   └── [Module]        
│       └── [Module]DependencyProvider.php
└── Service
    └── [Module]        
        └── [Module]DependencyProvider.php
```

**Description**

Injects required dependencies to a module application layer. Typically, dependencies are [facades](#facade-design-pattern) or [plugins](#plugin).

Dependency injection is orchestrated through a `provide-add-get` structure (see `examples` below).
- The `provide` method is the highest level that holds only `add` calls without any additional logic.
- The `add` method is the middle level that injects the dependencies into the dependency container using a class constant and a late-binding instantiating closure.
- The `get` method is the lowest level that sources the dependency.

**Conventions**
- Setting dependency using the `container::set()` needs to be paired with late-binding closure definition to decouple instantiation.
- Dependencies that require individual instances per injection need to use `Container::factory()` method additionally to ensure expected behaviour (eg: [Query Objects](#query-object), see `examples` below).
- `Provide` methods need to call their parent `provide` method to inject the parent level dependencies.
- Dependencies need to be wired through the target layer corresponding inherited method to be accessible later via the corresponding [Factory](#factory):
```php
public function provideCommunicationLayerDependencies(Container $container)
public function provideBusinessLayerDependencies(Container $container)
public function providePersistenceLayerDependencies(Container $container)
public function provideDependencies(Container $container)
public function provideBackendDependencies(Container $container)
public function provideServiceLayerDependencies(Container $container)
```

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- Only three type of methods can be defined, either `provide`, `get`, or `add`.<br/>
```php
function provide*Dependencies(Container $container)
function add[Dependency](Container $container)
function add[PluginInterfaceName]Plugins(Container $container)
function get[Dependency](Container $container)
function get[PluginInterfaceName]Plugins(Container $container)
```
- All class constants are required to be `public` (to decrease conflicts in definition for being a public API class, to allow referring to them from [Factory](#factory)).<br/>
- `Add`, `provide`, and `get` methods must have `Container $container` as the only argument.<br/>
- `Provide` methods can only call `add` methods.<br/>
- `Add` and `get` methods need to be `protected`.<br/>
- `Add` methods can only introduce one dependency to the `Container` (a plugin-stack is considered one dependency in this respect).<br/>
- [Facades](#facade-design-pattern) are required to be wrapped into a [Bridge](#bridge) to avoid coupling another module.<br/>
- [Plugins](#plugin) can not be wired on module level.<br/>
- [Plugin](#plugin) defining `get` methods are required to be tagged with `@api` tag.<br/>

</details>

**Guidelines**
- Dependency constant names should be descriptive and follow the `[COMPONENT_NAME]_[MODULE_NAME]` or `PLUGINS_[PLUGIN_INTERFACE_NAME]` pattern, with a name matching its value (see in `examples`).

**Examples**

```php
namespace Spryker\Zed\Agent;

use Orm\Zed\User\Persistence\SpyUserQuery;
use Spryker\Zed\Kernel\Container;

class AgentDependencyProvider extends Spryker\Zed\Kernel\AbstractBundleDependencyProvider
{
    public const PROPEL_QUERY_USER = 'PROPEL_QUERY_USER';

    public function providePersistenceLayerDependencies(Container $container)
    {
        $container = $this->addUserPropelQuery($container);

        return $container;
    }

    protected function addUserPropelQuery(Container $container): Container
    {
        $container->set(static::PROPEL_QUERY_USER, $container->factory(function (): SpyUserQuery {
            return SpyUserQuery::create();
        }));

        return $container;
    }
}
```

```php
<?php

namespace Pyz\Zed\ConfigurableBundle;

use Spryker\Zed\ConfigurableBundle\Dependency\Facade\ConfigurableBundleToGlossaryFacadeBridge;

/**
 * @method \Spryker\Zed\ConfigurableBundle\ConfigurableBundleConfig getConfig()
 */
class ConfigurableBundleDependencyProvider extends Spryker\Zed\ConfigurableBundle\ConfigurableBundleDependencyProvider
{
    /**
     * @var string
     */
    public const FACADE_GLOSSARY = 'FACADE_GLOSSARY';

    /**
     * @var string
     */
    public const PLUGINS_PRODUCT_OFFER_POST_UPDATE = 'PLUGINS_PRODUCT_OFFER_POST_UPDATE';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addGlossaryFacade($container);
        $container = $this->addProductOfferPostUpdatePlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = parent::provideCommunicationLayerDependencies($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function providePersistenceLayerDependencies(Container $container): Container
    {
        $container = parent::providePersistenceLayerDependencies($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addGlossaryFacade(Container $container): Container
    {
        $container->set(static::FACADE_GLOSSARY, function (Container $container) {
                $container->getLocator()->glossary()->facade()
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addProductOfferPostUpdatePlugins(Container $container): Container
    {
        $container(static::PLUGINS_PRODUCT_OFFER_POST_UPDATE, function (Container $container) {
            return $this->getProductOfferPostUpdatePlugins($container);
        });

        return $container;
    }

    /**
     * @api
     *
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface>
     */
    protected function getProductOfferPostUpdatePlugins(Container $container): array
    {
        return [];
    }
}
```

### Entity

```
src
├── Generated
│   └── Shared
│       └── Transfer
│           └── [EntityName]EntityTransfer.php
│
├── Orm
│   └── Zed   
│       └── [DomainName]   
│           ├── Base
│           │   ├── [EntityName].php
│           │   └── [EntityName]Query.php
│           ├── Map
│           │   └── [EntityName]TableMap.php
│           ├── [EntityName].php
│           └── [EntityName]Query.php
│
└── [Organisation]
    └── Zed
        └── [ModuleName]
            └── Persistence
                └── Propel
                    ├── Abstract[EntityName].php
                    └── Abstract[EntityName]Query.php
```

**Description**

Active record object which represents a row in a table. `Entities` have getter and setter methods to access the underlying data.
Each `Entity` has a generated identical [Entity Transfer Object](#transfer-object) which can be used during interaction with other layers.
Each database table definition results as the creation of an `Entity` by Propel.

**3-tier class hierarchy**: The Propel generated 2-tier `Entity` class hierarchy is injected in the middle with a SCOS module abstract class to enable adding functionality from SCOS module level (see `examples` below).

See [Propel Documentation - Active Record Class](https://propelorm.org/documentation/reference/active-record.html).

See more details on domains in [Persistence Schema](#persistence-schema).

**Conventions**
- `Entity` classes need to be generated via [Persistence Schema](#persistence-schema).
- `Entities` can not leak to any [facade](#facade-design-pattern)'s level (as they are heavy, stateful, module specific objects).
- `Entities` are required to be implemented according to the 3-tier class hierarchy (see in `description` and `examples`) to support extension from Propel and SCOS.

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- `Entities` can be instantiated in the [Persistance Layer](#persistence-layer-responsibilities) only.

</details>

**Guidelines**
- A typical use-case is to define `preSave()` or `postSave()` methods in the `Entity` object.
- It is recommended to define manager classes instead of overloading the `Entity` with complex or context-specific logic.
- `Entities` should not leak outside the module's persistence layer.

**Examples**

The lowest level class generated by Propel, containing the base Propel functionality.
```php
namespace Orm\Zed\ConfigurableBundle\Persistence\Base;

/**
 * Base class that represents a row from the 'spy_configurable_bundle_template' table.
 */
abstract class SpyConfigurableBundleTemplate implements Propel\Runtime\ActiveRecord\ActiveRecordInterface {...}
```

The middle level class generated in a Spryker module, containing the SCOS module functionality.
```php
namespace Spryker\Zed\ConfigurableBundle\Persistence\Propel;

abstract class AbstractSpyConfigurableBundleTemplate extends Orm\Zed\ConfigurableBundle\Persistence\Base\SpyConfigurableBundleTemplate {...}
```

The highest level class generated on project, containing the project specific functionality.
```php
namespace Orm\Zed\ConfigurableBundle\Persistence;

class SpyConfigurableBundleTemplate extends Spryker\Zed\ConfigurableBundle\Persistence\Propel\AbstractSpyConfigurableBundleTemplate {...}
```

## Entity Manager

```
[Organization]
└── Zed
    └── [Module]
        └── Persistence
            ├── [Module]EntityManagerInterface.php
            └── [Module]EntityManager.php
```

**Description**

Persists [Entities](#entity) by using their internal saving mechanism and/or collaborating with [Query Objects](#query-object).
The `Entity Manager` can be accessed from the same module's [business layer](#business-layer-responsibilities).

**Conventions**
- No generic conventions.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- `Entity manager` `public` methods need to have a functionality describing prefix, such as `create*()`, `delete*()`, `update*()`.<br/>
- Creating, updating and deleting functions need to be separated by concern even if they use overlapping internal methods.<br/>
- The `Entity manager` class needs to define and implement an interface that holds the specification of each `public` method.<br/>
- `Entity manager` methods need to receive only [Transfer Objects](#transfer-object) as input parameters.<br/>
- `Entity manager` methods need to return `void` or the saved object(s) as [Transfer Object(s)](#transfer-object).<br/>
-`Entitie manager` needs to utilise [Entities](#entity) and/or [Query Objects](#query-object) for database operations (raw SQL usage is not feasible).<br/>

</details>

**Guidelines**
- No generic guidelines.

<details><summary markdown='span'>Guidelines for Project Development</summary>

- Solutions in `Entity manager` can consider to use raw SQL queries for performance reasons, but this will also remove all Propel ORM benefits (eg: triggering events, etc.), thus it should be used with caution.<br/>

</details>

### Facade design pattern

```
[Organization]
├── Client
│   └── [Module]
│       ├── [Module]ClientInterface.php
│       └── [Module]Client.php        
├── Service
│   └── [Module]
│       ├── [Module]Service.php
│       └── [Module]ServiceInterface.php
└── Zed
    └── [Module]
        ├── Business
        │   ├── [Module]Facade.php
        │   └── [Module]FacadeInterface.php    
        └── Persistence
            └── [Module]QueryContainer.php                   
```

**Description**

Spryker defines the facade design pattern as the primary entry point for layers following the [standard facade design pattern](https://en.wikipedia.org/wiki/Facade_pattern).

There are currently four components that use the facade design pattern, thus referred as facades:
- The `Facade` is the API of [Business layer](#business-layer-responsibilities).
- The `Client` is the API of [Client application layer](#client), and acts as the only entry point to the [Client Application](#applications).
- The `Service` is the API of [Service application layer](#service), and represents the only entry point to the [Service Application](#applications).
- The `Query Container` is the API of [Persistence layer](#persistence-layer-responsibilities), and represents and entry point to database access. The more advanced and modular [Entity Manager](#entity-manager) and [Repository](#repository) pattern was introduced to counter the problems of cross-module leaks of `Query Container` concept.

The facades provide functionality for other layers and/or modules. The functionality behind the facade normally accesses other sibling functionality directly and not from the facade (eg: [Models](#model)  call their sibling [Models](#model) as a dependency, rather than through the `facade`).

**Conventions**
- All methods need to have [Transfer Objects](#transfer-object) or native types as argument and return value.

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- The methods need to have descriptive name that describes the use-case and allows easy selection for readers (eg: `addToCart()`, `saveOrder()`, `triggerEvent()`).<br/>
- The inherited `getFactory()` method needs to be used to instantiate the underlying classes.<br/>
- The methods need to contain only the delegation to the underlying [model](#model).<br/>
- All methods need to be `public` and stand for an outsourced function of the underlying functionality.<br/>
- Each facade class needs to define and implement an interface that holds the `Specification` of each `public` method.<br/>
  - The `Specification` is considered the semantic contract of the method - all significant behaviour needs to be highlighted.<br/>
- All facade class methods need to add `@api`, and `{@inheritdoc}` tags on their method documentation. <br/>
- New `QueryContainer` functionality can not be added but implemented through the advanced [Entity Manager](#entity-manager) and [Repository](#repository) pattern.<br/>
- Single-item-flow methods need to be avoided unless one of the reasons apply:<br/>
  - there is only a single-entity flow ever, proven by the business cases.<br/>
  - the items need to go in FIFO order and there is no way to use a collection instead.<br/>
- Multi-item-flow methods need to <br/>
  - receive a [Transfer Object](#transfer-object) collection as input with the following naming pattern `[DomainEntity]Collection[Request|Criteria|TypedCriteria|TypedRequest]Transfer`.<br/>
  - return a [Transfer Object](#transfer-object) collection with the following naming pattern `[DomainEntity][Collection|CollectionResponse]Transfer`.<br/>
- Create-Update-Delete (`CUD`) directives:<br/>
  - `Create` method needs to be defined as `create[DomainEntity]Collection([DomainEntity]CollectionRequestTransfer): [DomainEntity]CollectionResponseTransfer`.<br/>
  - `Update` method needs to be defined as `update[DomainEntity]Collection([DomainEntity]CollectionRequestTransfer): [DomainEntity]CollectionResponseTransfer`.<br/>
  - `Delete` method needs to be defined as `delete[DomainEntity]Collection([DomainEntity]CollectionDeleteCriteriaTransfer): [DomainEntity]CollectionResponseTransfer`.<br/>
  - `Create` and `Update` methods need to be implemented for each business entity (`Delete` is optional on-demand).<br/>
  - `CUD` methods can not have additional arguments except the above defined.<br/>
  - `[DomainEntity]CollectionRequestTransfer` and `[DomainEntity]CollectionDeleteCriteriaTransfer` objects need to support transactional entity manipulation that is defaulted to true and documented in facade function specification.<br/>
  - `[DomainEntity]CollectionRequestTransfer` should support bulk operations.<br/>
  - `[DomainEntity]CollectionDeleteCriteriaTransfer` should contain only arrays of attributes to filter the deletion of entities by.<br/>
  - `[DomainEntity]CollectionDeleteCriteriaTransfer` need to use `IN` the operation to filter deletion of entities (each item in the array of the filled attributes will cause deletion of 1 entity).<br/>
  - `[DomainEntity]CollectionDeleteCriteriaTransfer` attributes that support deleting need to be mentioned in facade specification.<br/>
  - `[DomainEntity]CollectionResponseTransfer` should contain a returned list of entities and error list.<br/>
    - if the entity manipulation function operation was fully successful, the error list must be empty and the entity list must contain all entities that were manipulated.<br/>
    - if the entity manipulation function operation was not successful and the request is transactional, the error list must contain the error that caused the transaction rollback, the error must point out the entity that caused the rollback, the entities after the error must not be manipulated, and the response entity list must reflect the state of the database after the rollback.<br/>
    - if the entity manipulation function operation was not successful and the request is not transactional, the error list must contain all errors, each error must point out the related entity that caused that error, and the response entity list must reflect the state of the database after the rollback.<br/>

</details>

**Guidelines**
- The `Service` facade functionalities are commonly used to transform data, thus Create-Update-Delete (`CUD`) directives are usually not applicable.
- Single-item-flow methods should be avoided as they are not scalable.

<details><summary markdown='span'>Additional Guidelines for Project Development</summary>

- `Query Containers` can be used/developed further, but it is highly recommended to transition toward the [Entity Manager](#entity-manager) and [Repository](#repository) pattern.<br/>

</details>

**Example**
```php
namespace Spryker\Client\ConfigurableBundleCart;

/**
 * @method \Spryker\Client\ConfigurableBundleCart\ConfigurableBundleCartFactory getFactory()
 */
class ConfigurableBundleCartClient extends Spryker\Client\Kernel\AbstractClient implements ConfigurableBundleCartClientInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CreateConfiguredBundleRequestTransfer $createConfiguredBundleRequestTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteResponseTransfer
     */
    public function addConfiguredBundle(CreateConfiguredBundleRequestTransfer $createConfiguredBundleRequestTransfer): QuoteResponseTransfer
    {
        return $this->getFactory()
            ->createConfiguredBundleCartAdder()
            ->addConfiguredBundleToCart($createConfiguredBundleRequestTransfer);
    }
}
```

```php
namespace Spryker\Client\ConfigurableBundleCart;

interface ConfigurableBundleCartClientInterface
{
    /**
     * Specification:
     * - Adds configured bundle to the cart.
     * - Requires `configuredBundle.quantity` property to control amount of configured bundles put to cart.
     * - Requires `configuredBundle.template.uuid` property to populate configurable bundle template related data.
     * - Requires `items` property with `sku`, `quantity` and `configuredBundleItem.slot.uuid` properties to define how many
     * items were added in total to a specific slot.
     * - Returns QuoteResponseTransfer.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CreateConfiguredBundleRequestTransfer $createConfiguredBundleRequestTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteResponseTransfer
     */
    public function addConfiguredBundle(CreateConfiguredBundleRequestTransfer $createConfiguredBundleRequestTransfer): QuoteResponseTransfer;
}
```

```php
namespace Spryker\Zed\ConfigurableBundle\Business;

/**
 * @method \Spryker\Zed\ConfigurableBundle\Business\ConfigurableBundleBusinessFactory getFactory()
 * @method \Spryker\Zed\ConfigurableBundle\Persistence\ConfigurableBundleEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\ConfigurableBundle\Persistence\ConfigurableBundleRepositoryInterface getRepository()
 */
class ConfigurableBundleFacade extends Spryker\Zed\Kernel\Business\AbstractFacade implements ConfigurableBundleFacadeInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ConfigurableBundleTemplateFilterTransfer $configurableBundleTemplateFilterTransfer
     *
     * @return \Generated\Shared\Transfer\ConfigurableBundleTemplateResponseTransfer
     */
    public function getConfigurableBundleTemplate(
        ConfigurableBundleTemplateFilterTransfer $configurableBundleTemplateFilterTransfer
    ): ConfigurableBundleTemplateResponseTransfer {
        return $this->getFactory()
            ->createConfigurableBundleTemplateReader()
            ->getConfigurableBundleTemplate($configurableBundleTemplateFilterTransfer);
    }
}
```

```php
namespace Spryker\Zed\ConfigurableBundle\Business;

interface ConfigurableBundleFacadeInterface
{
    /**
     * Specification:
     * - Retrieves configurable bundle template from Persistence.
     * - Filters by criteria from ConfigurableBundleTemplateFilterTransfer.
     * - Expands found configurable bundle templates with translations.
     * - Returns translations for locales specified in ConfigurableBundleTemplateFilterTransfer::translationLocales, or for all available locales otherwise.
     * - Returns product image sets for locales specified in ConfigurableBundleTemplateFilterTransfer::translationLocales, or for all available locales otherwise.
     * - Returns always empty-locale ("default") image sets.
     * - Returns fallback locale translation if provided single locale translation does not exist or translation key if nothing found.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\ConfigurableBundleTemplateFilterTransfer $configurableBundleTemplateFilterTransfer
     *
     * @return \Generated\Shared\Transfer\ConfigurableBundleTemplateResponseTransfer
     */
    public function getConfigurableBundleTemplate(
        ConfigurableBundleTemplateFilterTransfer $configurableBundleTemplateFilterTransfer
    ): ConfigurableBundleTemplateResponseTransfer;
}
```

### Factory

```
[Organization]
├── Zed
│   └── [Module]
│       ├── Communication
│       │   └── [Module]CommunicationFactory.php
│       │
│       ├── Business
│       │   └── [Module]BusinessFactory.php
│       │
│       └── Persistence
│           └── [Module]PersistenceFactory.php
├── Yves
│   └── [Module]
│       └── [Module]Factory.php
├── Glue
│   └── [Module]
│       └── [Module]Factory.php
├── Client
│   └── [Module]
│       └── [Module]Factory.php
└── Service
    └── [Module]
        └── [Module]ServiceFactory.php
```

**Description**

The responsibility of a `Factory` is to instantiate classes and inject dependencies during instantiation.

**Conventions**
- No generic conventions.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- `Factories` need to orchestrate the instantiation of objects in solitude (without reaching out to class-external logic).<br/>
- `Factory` classes must not define/implement interface as practically they are never fully replaced and offer no benefit.<br/>
- `Factory` methods need to be `public`.<br/>
- `Factory` methods need to either instantiate one new object and named as `create[Class]()`, or wire the dependencies and named as `get[Class]()`.<br/>
- `Factory` methods need to use the constants defined in [dependency provider](#dependency-provider) when reaching out to module dependencies.<br/>

</details>


### Gateway Controller

```
[Organization]
└── Zed
    └── [Module]
        └── Communication
            └── Controller
                └── GatewayController.php
```

**Description**

`Gateway Controller` is special, reserved [Controller](#controller) in SCOS, that serves as an entry point in [Zed](#zed) for serving remote application [Client](#client) requests (see [Zed Stub](#zed-stub) for more details).

**Conventions**
- `Gateway Controller` actions must define a single [transfer object](#transfer-object) as argument, and another/same [transfer object](#transfer-object) for return.
- `Gateway Controllers` follow the [Controller](#controller) conventions.

### Layout

```
[Organization]
├── Yves
│   └── [Module]
│       └── Theme
│           └── ["default"|theme]
│               └── templates
│                   ├── page-layout-[page-layout-name]
│                   │   └── page-layout-[page-layout-name].twig
│                   └── [template-name]
│                       └── [template-name].twig                
└── Zed
    └── [Module]
        └── Presentation
            └── Layout
                └── [layout-name].twig
```

**Description**

Layouts are the skeleton of the page, and they define the structure of the page.


### Mapper / Expander / Hydrator

**Description**

To differentiate between the recurring cases of data mapping, and to provide a clear separation of concerns, the following terms are introduced:
- `Mappers` are lightweight transforming functions that adjust one specific data structure to another in solitude (without the need of reaching out for additional data than the provided input).
  - `Persistance Mapper` stands for `Mappers` in [Persistence layer](#persistence-layer-responsibilities), typically transforming [propel entities](#entity), [entity transfers objects](#transfer-object), or generic [transfer objects](#transfer-object).
- `Expanders` are focusing on sourcing additional data into the provided input - restructuring may also happen.

**Conventions**
- No generic conventions.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- `Mapper` methods need to be named as `map[<SourceEntityName>[To<TargetEntityName>]]($sourceEntity, $targetEntity)`.<br/>
  - `Mappers` need to be free of any logic other than structuring directives.<br/>
    - `Mappers` can not have data resolving (eg: remote calls, database lazy load) logic as they are utilised in high-batch processing scenarios.<br/>
  - `Mappers` can have multiple source entities if it still does not violate structural-mapping-only directive.<br/>
  - `Mappers` can not use dependencies except [module configurations](#module-configurations), other `mappers`, or lightweight [Service calls](#facade-design-pattern).<br/>
  - `Persistence Mappers` need to be in [Persistence layer](#zed) only and named as `[Entity]Mapper.php` or `[Module]Mapper.php`.<br/>
- `Expander` methods need to be named as `expand[With<description>]($targetEntity)`.<br/>
- The `hydrator/hydration` keywords can not be used but instead `Mapper` or `Expander`.<br/>

</details>

**Examples**

```php
namespace Spryker\Zed\ConfigurableBundle\Persistence\Propel\Mapper;

class ConfigurableBundleMapper
{
    /**
     * @param \Propel\Runtime\Collection\Collection $configurableBundleTemplateEntities
     *
     * @return \Generated\Shared\Transfer\ConfigurableBundleTemplateCollectionTransfer
     */
    public function mapTemplateEntityCollectionToTemplateTransferCollection(
        Collection $configurableBundleTemplateEntities
    ): ConfigurableBundleTemplateCollectionTransfer {
        $configurableBundleTemplateCollectionTransfer = new ConfigurableBundleTemplateCollectionTransfer();

        foreach ($configurableBundleTemplateEntities as $configurableBundleTemplateEntity) {
            $configurableBundleTemplateTransfer = $this->mapTemplateEntityToTemplateTransfer(
                $configurableBundleTemplateEntity,
                new ConfigurableBundleTemplateTransfer(),
            );

            $configurableBundleTemplateCollectionTransfer->addConfigurableBundleTemplate($configurableBundleTemplateTransfer);
        }

        return $configurableBundleTemplateCollectionTransfer;
    }
}
```

```php
namespace Spryker\Client\ProductReview\ProductViewExpander;

class ProductViewExpander implements ProductViewExpanderInterface
{
    public function __construct(
        ProductReviewSummaryCalculatorInterface $productReviewSummaryCalculator,
        ProductReviewSearchReaderInterface $productReviewSearchReader
    ) {
        $this->productReviewSummaryCalculator = $productReviewSummaryCalculator;
        $this->productReviewSearchReader = $productReviewSearchReader;
    }

    public function expandProductViewWithProductReviewData(
        ProductViewTransfer $productViewTransfer,
        ProductReviewSearchRequestTransfer $productReviewSearchRequestTransfer
    ): ProductViewTransfer {
        $productReviews = $this->productReviewSearchReader->findProductReviews($productReviewSearchRequestTransfer);

        if (!isset($productReviews[static::KEY_RATING_AGGREGATION])) {
            return $productViewTransfer;
        }

        $productReviewSummaryTransfer = $this->productReviewSummaryCalculator
            ->calculate($this->createRatingAggregationTransfer($productReviews));

        $productViewTransfer->setRating($productReviewSummaryTransfer);

        return $productViewTransfer;
    }
}
```

### Model

```
[Organization]
├── Zed
│   └── [Module]
│       ├── Communication
│       │   └── [CustomDirectory]
│       │       ├── [ModelName]Interface.php
│       │       └── [ModelName].php   
│       └── Business
│           └── [CustomDirectory]
│               ├── [ModelName]Interface.php
│               └── [ModelName].php  
├── Yves
│   └── [Module]
│       └── [CustomDirectory]
│           ├── [ModelName]Interface.php
│           └── [ModelName].php   
├── Glue
│   └── [Module]
│       └── [CustomDirectory]
│           ├── [ModelName]Interface.php
│           └── [ModelName].php    
├── Client
│   └── [Module]
│       └── [CustomDirectory]
│           ├── [ModelName]Interface.php
│           └── [ModelName].php                
└── Service
    └── [Module]
        └── [CustomDirectory]
            ├── [ModelName]Interface.php
            └── [ModelName].php    
```

**Description**

`Models` encapsulate logic and can be utilized across various layers within the application architecture, within to boundaries of each [layer's specific responsibilities](#layers).
- [Communication layer](#communication-layer-responsibilities) `Models` are present in [Yves](#yves), [Glue](#glue), and [Client](#client).
- [Business layer](#business-layer-responsibilities) `Models` are present in [Zed](#zed) and [Service](#service).
- [Persistence layer](#persistence-layer-responsibilities) `Models` are present in [Zed](#zed).

**Conventions**
- `Model` dependencies can be [facades](#facade-design-pattern) or from the same module, either `Models`, [Repository](#repository), [Entity Manager](#entity-manager) or [Config](#module-configurations).
  - `Models` can not interact directly with other module's `Models` (eg: via inheritance, shared constants, instantiation, etc.).

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- `Model` dependencies need to be injected via constructor.<br/>
- `Models` can not instantiate any object but [Transfer Objects](#transfer-object).<br/>
- `Models` need to be grouped under a folder by activity (eg: `Writers/ProductWriter.php`, `Readers/ProductReader.php`).<br/>
- `Models` can not be named using generic words, such as `Executor`, `Handler`, or `Worker`.<br/>
- Each `Model` class needs to define and implement an interface that holds the specification of each `public` method.<br/>
- `Model` dependencies needs to be referred/used/defined by an interface (instead of class).<br/>
- `Model` methods can not be `private`.<br/>

</details>

### Module Configurations

```
[Organization]
├── Zed
│   └── [Module]
│       └── [Module]Config.php
├── Yves
│   └── [Module]
│       └── [Module]Config.php  
├── Glue
│   └── [Module]
│       └── [Module]Config.php    
├── Client
│   └── [Module]
│       └── [Module]Config.php   
├── Service
│   └── [Module]      
│       └── [Module]Config.php
└── Shared
    └── [Module]
        ├── [Module]Constants.php
        └── [Module]Config.php       
```

**Description**
- **Module configuration**: module specific, environment independent configuration in `[Module]Config.php.`
- **Environment configuration**: configuration keys in `[Module]Constants.php` that can be controlled per environment via `config_default.php`.

The `module configuration` class can access the `environment configuration` values via `$this->get('key')`.

When `module configuration` is defined in [Shared](#shared) application layer, it can be accessed from any other [application layer](#application-layers) using the [application layer](#application-layers) specific `Config`.

When `module configuration` is defined in another [application layer](#application-layers) than [Shared](#shared), they are dedicated and accessible to that single [application layer](#application-layers) only.

**Conventions**
- No generic conventions.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- `Module configuration`<br/>
  - Getter methods (prefixed with `get`) need to be defined to retrieve configuration values, instead of accessing values via constants directly (this enables a more flexible extension structure, and an easier to control access tracking).<br/>
    - Constants can also be defined to support the getter methods (example: to enable cross-module referencing via `@uses`).<br/>
- `Environment configuration`<br/>
  - constants need to have specification about their purpose.<br/>
  - constants need to contain the same UPPERCASE value as the key is + properly prefixed with MODULE_NAME (see `examples` below).<br/>
- `Module configuration` constants need to be `protected`.<br/>
- The `module configuration` relays exclusively on `static::` to support extension.<br/>
- `Environment configuration` constants need to be `public`.<br/>

</details>

**Guidelines**
- No generic guidelines.

<details><summary markdown='span'>Guidelines for Module development and Core module development</summary>

- `Protected` items are not recommended in `module configuration` as they tend to create backward compatibility problems on project extensions.<br/>

</details>

**Examples**

```php
namespace Spryker\Shared\Oms;

interface OmsConstants
{
    /**
     * Specification:
     * - Defines if OMS transition log is enabled.
     *
     * @api
     *
     * @var string
     */
    public const ENABLE_OMS_TRANSITION_LOG = 'OMS:ENABLE_OMS_TRANSITION_LOG';
}
```


### Navigation.XML

```
[Organization]
└── Zed
    └── [Module]
        └── Communication              
            └── navigation.xml   
```

**Description**

Module entries of the Backoffice navigation panel.
The icons are taken from [Font Awesome Icons Library](https://fontawesome.com/v4/).

**Example**
- The below example adds navigation elements, under the already existing `product` navigation element (defined in another module).
- The `pages` reserved node holds the navigation items.
- The navigation items are defined within a logical node (`configurable-bundle-templates`) according to business requirements.
- The `bundle` identifies in which `module` the processing `controller` is located.
- The `icon` is the [Font Awesome Icon](https://fontawesome.com/v4/) name.
```xml
<?xml version="1.0"?>
<config>
  <product>
    <pages>
      <configurable-bundle-templates>
        <label>Configurable Bundle Templates</label>
        <title>Configurable Bundle Templates</title>
        <icon>fa-files-o</icon>
        <bundle>configurable-bundle-gui</bundle>
        <controller>template</controller>
        <action>index</action>
        <visible>1</visible>
        <pages>
          <configurable-bundle-template-create>
            <label>Create Configurable Bundle Template</label>
            <title>Create Configurable Bundle Template</title>
            <bundle>configurable-bundle-gui</bundle>
            <controller>template</controller>
            <action>create</action>
            <visible>0</visible>
          </configurable-bundle-template-create>
        </pages>
      </configurable-bundle-templates>
    </pages>
  </product>
</config>
```

### Permission Plugin

```
[Organization]
├── Zed
│   └── [Module]
│       └── Communication
│           └── Plugin
│               └── [ConsumerModule]
│                   └── [PluginName]Plugin.php
├── Yves
│   └── [Module]
│       └── Plugin
│           └── [ConsumerModule]
│               └── [PluginName]Plugin.php
├── Glue
│   └── [Module]
│       └── Plugin
│           └── [ConsumerModule]
│               └── [PluginName]Plugin.php    
└── Client
    └── [Module]        
        └── Plugin
            └── [ConsumerModule]
                └── [PluginName]Plugin.php        
```

**Description**

`Permission Plugins` are a way to put a scope on the usage of an application during a request lifecycle.

**Conventions**

- `Permission Plugins` need to implement `\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface`.
- `Permission Plugins` need to adhere to [Plugin](#plugin) conventions.

**Guidelines**
- When using one of the traits in a [Model](#model), refer directly to the remote `Permission Plugin` key string when possible, instead of defining a local constant.
- The `\Spryker\[Application]\Kernel\PermissionAwareTrait` trait allows the [Model](#model) in the corresponding [application](#applications) to check if a permission is granted to an application user.

<details><summary markdown='span'>Additional Guidelines for Module development and Core module development</summary>

- When using one of the traits in a [Model](#model), use a `protected` constant string to reference the `Permission Plugin` that will be used in the [Model](#model). As an annotation for this string you should add `@uses` annotation to the `PermissionPlugin::KEY` string that you will compare against (see in `examples` below).

</details>


**Example**

```php
class QuotePermissionChecker implements QuotePermissionCheckerInterface
{
    use PermissionAwareTrait;

    /**
     * @uses \Spryker\Client\SharedCart\Plugin\ReadSharedCartPermissionPlugin::KEY
     */
    protected const PERMISSION_PLUGIN_KEY_READ_SHARED_CART = 'ReadSharedCartPermissionPlugin';

    public function checkQuoteReadPermission(QuoteTransfer $quoteTransfer): bool
    {
        ...
      return $this->can(
        static::PERMISSION_PLUGIN_KEY_READ_SHARED_CART,
        $quoteTransfer->getCustomer()->getCompanyUserTransfer()->getIdCompanyUser(),
        $quoteTransfer->getIdQuote(),
      );
    }
```

### Persistence Schema

```
[Organization]
└── Zed
    └── [Module]
        └── Persistence
            └── Propel
                └── Schema
                    └── spy_[domain_name].schema.xml
```

**Description**

The schema file defines the module's tables and columns (see [Propel Documentation - Schema XML](https://propelorm.org/documentation/reference/schema.html)). Schema files are organized into business `domains`, each representing a module overarching group that encapsulates related domain entities.

**Conventions**

- Table names need to follow the format `[org]_[domain_entity_name]` for business entities, `[org]_[domain_entity_name]_to_[domain_entity_name]` for relations, `[org]_[domain_entity_name]_search` for Search entities, and `[org]_[domain_entity_name]_storage` for Storage entities  (eg: `spy_customer_address`, `spy_customer_address_book`, `spy_cms_slot_to_cms_slot_template`, `spy_configurable_bundle_template_image_storage`, `spy_configurable_bundle_template_page_search`).
- Tables need to have an integer ID primary key, following the format `id_[domain_entity_name]` (eg: `id_customer_address`, `id_customer_address_book`).
- Table foreign key column needs to follow the format `fk_[remote_entity]` (eg: `fk_customer_address`, `fk_customer_address_book`)
  - Exception can be to the case if the same table is referred multiple times, in which case the follow-up foreign key columns need to be named as `fk_[custom_connection_name]` .

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- The table `[org]` prefix needs to be `spy_`.<br/>
- The schema file `[org]` prefix needs to be `spy_`.
- The `uuid` field needs to be defined and used for external communication to uniquely identify records and hide possible sensitive data (eg: `spy_order` primary key gives information about submitted order count).<br/>
  - The field can be `null` by default.<br/>
  - The field needs to be eventually unique across the table (until the unique value is provided, the business logic may not operate appropriately).<br/>
- Table foreign key definitions needs to include the `phpName` attribute.<br/>

</details>

**Guidelines**
- `PhpName` is usually the CamelCase version of the "SQL name" (eg: `<table name="spy_customer" phpName="SpyCustomer">`).
- A module (eg: `Product` module) may inject columns into a table which belong to another module (eg: `Url` module). This case is usually used if the direction of a relation is opposed to the direction of the dependency. For this scenario, the injector module will contain a separate, foreign module schema definition file (eg: `Product` module will contain `spy_url.schema.xml` next to `spy_product.schema.xml` that defines the injected columns into the `Url` `domain`) (see below in `examples`).
- The `database` element's `package` and `namespace` attributes are used during class generation and control the placement and namespace of generated files.

**Examples**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ConfigurableBundle\Persistence" package="src.Orm.Zed.ConfigurableBundle.Persistence">
    <table name="spy_configurable_bundle_template">
        <column name="id_configurable_bundle_template" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
        <column name="uuid" required="false" type="VARCHAR" size="255"/>
        <column name="name" required="true" type="VARCHAR" size="255"/>
        <column name="is_active" required="true" default="false" type="BOOLEAN"/>

        <unique name="spy_configurable_bundle_template-uuid">
            <unique-column name="uuid"/>
        </unique>

        <index name="index-spy_configurable_bundle_template-name">
            <index-column name="name"/>
        </index>

        <behavior name="uuid">
            <parameter name="key_columns" value="id_configurable_bundle_template"/>
        </behavior>

        <behavior name="timestampable"/>

        <id-method-parameter value="spy_configurable_bundle_template_pk_seq"/>
    </table>
</database>

```

Injecting columns from `Product` to a `Url` `domain` by defining `spy_url.schema.xml` schema file in `Product` module.
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Url\Persistence" package="src.Orm.Zed.Url.Persistence">

    <table name="spy_url">
        <column name="fk_product_abstract" type="INTEGER"/>
        <foreign-key name="spy_url-fk_product_abstract" foreignTable="spy_product_abstract" phpName="SpyProduct" onDelete="CASCADE">
            <reference foreign="id_product_abstract" local="fk_product_abstract"/>
        </foreign-key>
    </table>

</database>
```

### Provider / Router

```
[Organization]
└── Yves
    └── [Module]  
        └── Plugin
            ├── Provider
            │   └── [Name]ControllerProvider.php
            └── [ConsumerModule]
                └── [RouterName]Plugin.php
```


**Description**

`Providers` and `Routers` are used during the bootstrap of [Yves](#applications) application.
- **Controller Provider** - Registers [Yves](#applications) [Controllers](#controller) of a module and binds them to a path.
- **Router** - Resolves a path into a [Yves](#applications) [Controller and Action](#controller).

Controllers in [Zed](#zed) application layer are autowired and do not require manual registration. An `ExampleController::indexAction()` in `ExampleModule` can be accessed via `/example-module/example/index` URI.

**Conventions**
- A `Controller Provider` needs to extend `\SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider`.
- A `Router` needs to extend `\SprykerShop\Yves\ShopRouter\Plugin\Router\AbstractRouter`.
- A `providers` are `routers` are classified as a [Plugin](#plugin) and so the plugin's conventions apply.

### Query Object

```
src
├── Orm
│   └── Zed   
│       └── [DomainName]   
│           ├── Base
│           │   └── [EntityName]Query.php
│           └── [EntityName]Query.php
│
└── [Organisation]
    └── Zed
        └── [ModuleName]
            └── Persistence
                └── Propel
                    └── Abstract[EntityName]Query.php
```

**Description**

Enables to write queries to the related table in an SQL engine agnostic way.
`Query Objects` can be instantiated and used only from the [Repository](#repository) and [Entity Manager](#entity-manager) of the definer module(s).

See [Propel Documentation - Query Class](https://propelorm.org/documentation/reference/model-criteria.html)

See more details on the 3-tier class hierarchy in [Entity](#entity), and domains in [Persistence Schema](#persistence-schema).

**Convention**
- No generic conventions.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- Hidden, hard dependencies appearing through `join` need to be defined via `@module [RemoteModule1][,[...]]` tag (see `examples` below).

</details>

**Example**

In the below example, the `SpyProductQuery` is part of the `Product` `domain` while `SpyUrl` belongs to `Url` `domain` and `SpyProductComment` belongs to `ProductComment` `domain`.

```php
  /**
   * @module Url,ProductComment
   */
  public function exampleMethod()
  {
      $query = $this->getFactory()->getProductQuery();
      $query
        ->joinSpyUrl()
        ->joinSpyProductComment();
      ...
  }
```


### Repository

```
[Organization]
└── Zed
    └── [Module]
        └── Persistence
            ├── [Module]Repository.php      
            └── [Module]RepositoryInterface.php
```

**Descriptions**

Responsible for retrieving data from database by executing queries and returning the results as [Transfer Objects](#transfer-object) or native types.
The `Repository` can be accessed from the same module's [Communication](#communication-layer-responsibilities) and [Business layers](#business-layer-responsibilities).

**Conventions**
- No generic conventions.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- `Repostiories` can not alter the data in the database, only retrieve it.<br/>
- `Repositories` need to use [Entities](#entity) and/or [Query Objects](#query-object) to retrieve data from the database.<br/>
- The `Repository` class needs to define and implement an interface that holds the specification of each `public` method.<br/>
- `Public` methods need to receive and return [Transfer Objects](#transfer-object) only.<br/>
- `Public` methods need to return with a collection of items or a single item (eg: using and wrapping the results of `find()` or `findOne()`).<br/>

</details>

**Guidelines**
- No generic guidelines.

<details><summary markdown='span'>Guidelines for Project Development</summary>

- Methods can use native PHP types as input arguments or result values, although this is not recommended as it leads to granular methods.

</details>

### Theme

```
[Organization]
└── Yves
    └── [Module]
        └── Theme
            └── ["default"|theme]
                ├── components
                │   │── organisms
                │   │   └── [organism-name]
                │   │       └── [organism-name].twig
                │   │── atoms
                │   │   └── [atom-name]
                │   │       └── [atom-name].twig
                │   └── molecules
                │       └── [molecule-name]
                │           └── [molecule-name].twig
                ├── templates
                │   ├── page-layout-[page-layout-name]
                │   │   └── page-layout-[page-layout-name].twig
                │   └── [template-name]
                │       └── [template-name].twig                
                └── views
                    └── [name-of-controller]
                        └── [name-of-action].twig    
```

**Description**

[Yves application layer](#yves) can have one or multiple themes that define the overall look and feel.

SCOS implements the concept of [atomic web design](https://bradfrost.com/blog/post/atomic-web-design/).

[Yves application layer](#yves) provides only 1-level theme inheritance: `current theme` > `default theme`.
- **Current theme**: a single theme defined on a project level (eg: `b2b-theme`, `b2c-theme`).
- **Default theme**: a theme provided by default and used in the `boilerplate implementations`. Used for incremental project updates (start from default and change frontend components one-by-one) and a graceful fallback in case SCOS delivers a new functionality that does not have own frontend in a project.
A `Theme` may contain `views`, `templates`, or `components` (`atoms`, `molecules`, or `organisms`).
- **Views**: are the templates for the [Controllers](#controller) and [Widgets](#widget).
- **Templates**: are reusable templates, such as page [Layouts](#layout).
- **Components**: are reusable parts of the UI, further divided into `atoms`, `molecules`, and `organisms`.


### Transfer Object

```
src
├── Generated
│   └── Shared
│       └── Transfer
│           ├── [EntityName]EntityTransfer.php
│           └── [Name]Transfer.php
└── [Organisation]
    └── Shared
        └── [Module]
            └── Transfer
                └── [module_name].transfer.xml   
```

**Description**

`Transfer Objects` are pure data transfer objects (DTO) with getters and setters.
They can be used in all [applications](#applications) and all [layers](#layers).
Business transfer objects are described in module specific XML files and then auto-generated into the `src/Generated/Shared/Transfer` directory.

For every defined table in [Peristence Schema](#persistence-schema) a matching `EntityTransfer` `Transfer Object` will be generated with `EntityTransfer` suffix. `EntityTransfers` are the lightweight DTO representations of the [Entities](#entity), thus `Entity Transfers` should be used primarily during layer or module overarching communication.

**Conventions**
- `Transfer Objects` need to be defined in the transfer XML file.
- The `Attributes` transfer name suffix is reserved for `Glue API modules` (modules with `RestApi` suffix) and must not be used for other purposes to avoid collision.
- The `ApiAttributes` transfer name suffix is reserved for `Storefront API modules` (modules with `Api` suffix) and must not be used for other purposes to avoid collision.
- The `BackendApiAttributes` transfer name suffix is reserved for `Backend API modules` (modules with `BackendApi` suffix) and must not be used for other purposes to avoid collision.
- `EntityTransfers` must not be defined manually but rather will be generated automatically based on [Peristence Schema](#persistence-schema) definitions.
  - The `Entity` suffix is reserved for the auto-generated `EntityTransfers` and must not be used in manual transfer definitions to avoid collision.

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- A module can only use those `Transfer Objects` and their properties which are declared in the same module (transfer definitions accessed through composer dependencies are considered as violation).

</details>

**Guidelines**
- `Transfer Objects` can be instantiated directly anywhere (not just via [Factory](#factory)).

**Examples**
- **BAPI resource names**: `PickingListsBackendApiAttributes` for picking list, `PickingListItemsBackendApiAttributes` for picking list items.
- **SAPI resource names**: `PickingListsApiAttributes` for picking list, `PickingListItemsApiAttributes` for picking list items.

```
<?xml version="1.0"?>
<transfers xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="spryker:transfer-01" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="ConfigurableBundleTemplate">
        <property name="idConfigurableBundleTemplate" type="int"/>
        <property name="uuid" type="string"/>
        <property name="name" type="string"/>
        <property name="isActive" type="bool"/>
        <property name="translations" type="ConfigurableBundleTemplateTranslation[]" singular="translation"/>
        <property name="productImageSets" type="ProductImageSet[]" singular="productImageSet"/>
    </transfer>
</transfers>
```

### Widget

```
[Organization]
└── Yves
    └── [Module]
        ├── Plugin
        │   └── [ConsumerModule]
        │       ├── [PluginName]Plugin.php
        │       └── [RouterName]Plugin.php      
        └── Widget
            └── [Name]Widget.php
```

**Description**

A `Widget` is a reusable part of a webpage in [Yves](#yves) application layer. `Widgets` are meant to provide functionality in a decoupled, modular and configurable way.

**Convention**
- A `Widget` needs to have a unique name across all features.

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- A `Widget` needs to contain only lightweight, display related logic.<br/>
  - The `Widget` class needs to use the inherited [Factory](#factory) method to delegate complex logic or access additional data.<br/>
- `Widget` module can not appear as dependency (as it goes against the basic concept of the optional widgets).<br/>
- Implementing a `Widget` needs to happen in a widget module.<br/>
- When `Widget` call is implemented, it needs to be considered that a `Widget` is always optionally enabled.<br/>

</details>

**Guidelines**
- Widget modules can contain frontend components (templates, atoms, molecules, organisms, etc.) without defining an actual `Widget` class.<br/
- The `Widget` class receives the input/rendering parameters via its constructor.

```php
namespace SprykerShop\Yves\CurrencyWidget\Widget;

class CurrencyWidget extends \Spryker\Yves\Kernel\Widget\AbstractWidget
{
    public function __construct()
    {
        $this->addParameter('currencies', $this->getCurrencies())
            ->addParameter('currentCurrency', $this->getCurrentCurrency());
    }

    public static function getName(): string
    {
        return 'CurrencyWidget';
    }

    public static function getTemplate(): string
    {
        return '@CurrencyWidget/views/currency-switcher/currency-switcher.twig';
    }

    /**
     * @return array<\Generated\Shared\Transfer\CurrencyTransfer>
     */
    protected function getCurrencies(): array
    {
        $currencyClient = $this->getFactory()->getCurrencyClient();
        $availableCurrencyCodes = $currencyClient->getCurrencyIsoCodes();

        $currencies = [];
        foreach ($availableCurrencyCodes as $currency) {
            $currencies[$currency] = $currencyClient->fromIsoCode($currency);
        }

        return $currencies;
    }

    protected function getCurrentCurrency(): string
    {
        return $this->getFactory()->getCurrencyClient()->getCurrent()->getCodeOrFail();
    }
}
```

### Zed Stub

```
[Organization]
└── Client
    └── [Module]
        └── Zed
            ├── [Module]Stub.php
            └── [Module]StubInterface.php
```

**Description**

A `Zed Stub` is a class which defines interactions between [Yves](#yves)/[Glue](#glue) application layers and [Zed](#zed) application layer. Under the hood, the `Zed Stub` makes RPC calls to [Zed](#zed) application layer.

**Conventions**
- The `Zed Stub` call's endpoints need to be implemented in a [Zed application](#applications) [Gateway Controller](#gateway-controller) of the receiving module.
- `Zed Stubs` need to be a descendant of `\Spryker\Client\ZedRequest\Stub\ZedRequestStub`.

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- The `Zed Stub` methods need to contain only delegation but no additional logic.<br/>
- `Zed Stub` methods need to be `public`.<br/>
- `Zed Stub` methods need to use [Transfer Objects](#transfer-object) as input and output parameter.<br/>
- `Zed Stub` methods need to add a `@uses` tag with the targeted [Gateway Controller](#gateway-controller) action in the docblock to enable easy code flow tracking.<br/>

</details>

```php
namespace Spryker\Client\ConfigurableBundleCartsRestApi\Zed;

class ConfigurableBundleCartsRestApiZedStub implements ConfigurableBundleCartsRestApiZedStubInterface
{
    /**
     * @var \Spryker\Client\ConfigurableBundleCartsRestApi\Dependency\Client\ConfigurableBundleCartsRestApiToZedRequestClientInterface
     */
    protected $zedRequestClient;

    public function __construct(ConfigurableBundleCartsRestApiToZedRequestClientInterface $zedRequestClient)
    {
        $this->zedRequestClient = $zedRequestClient;
    }

    /**
     * @uses \Spryker\Zed\ConfigurableBundleCartsRestApi\Communication\Controller\GatewayController::addConfiguredBundleAction()
     *
     * @param \Generated\Shared\Transfer\CreateConfiguredBundleRequestTransfer $createConfiguredBundleRequestTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteResponseTransfer
     */
    public function addConfiguredBundle(CreateConfiguredBundleRequestTransfer $createConfiguredBundleRequestTransfer): QuoteResponseTransfer
    {
        /** @var \Generated\Shared\Transfer\QuoteResponseTransfer $quoteResponseTransfer */
        $quoteResponseTransfer = $this->zedRequestClient->call(
            '/configurable-bundle-carts-rest-api/gateway/add-configured-bundle',
            $createConfiguredBundleRequestTransfer,
        );

        return $quoteResponseTransfer;
    }
```

## Core module development Components

The components below are essential in `core module development` for the purpose of modularity and customisability. For `project development` and `module development` these components are recommended on need to have basis (consider implementing these components based on their relevance to your business or technical requirements).

**Conventions**
- The components are required to be placed according to the corresponding [application layer’s](#application-layers) directory architecture in order to take effect.
- The components are required to inherit from the [application layer](#application-layers) corresponding abstract class in `Kernel` module to take effect.

<details><summary markdown='span'>Additional Conventions for Core module development</summary>

- The components are required to be extended directly from the [application layer](#application-layers) corresponding abstract class in `Kernel` module.<br/>

</details>

**Guidelines**
- The components should be stateless to be deterministic and easy to comprehend.

<details><summary markdown='span'>Additional Guidelines for Project Development</summary>

- It is recommended for each component to consider the conventions and guidelines of Module development and Core module development as they may offer solutions for long-term requirements or recurring issues.<br/>

</details>

<details><summary markdown='span'>Additional Guidelines for Module development and Core module development</summary>

- The components are required to be stateless to be deterministic and easy to comprehend.<br/>

</details>

### Bridge

```
[Organization]
├── Zed
│   └── [Module]
│       └── Dependency
│           ├── Client
│           │   ├── [Module]To[Module]ClientBridge.php
│           │   └── [Module]To[Module]ClientInterface.php          
│           ├── Facade
│           │   ├── [Module]To[Module]FacadeBridge.php
│           │   └── [Module]To[Module]FacadeInterface.php
│           ├── Service
│           │   ├── [Module]To[Module]ServiceBridge.php
│           │   └── [Module]To[Module]ServiceInterface.php    
│           └── QueryContainer
│               ├── [Module]To[Module]QueryContainerBridge.php
│               └── [Module]To[Module]QueryContainerInterface.php    
├── Yves
│   └── [Module]             
│       └── Dependency
│           ├── Client
│           │   ├── [Module]To[Module]ClientBridge.php
│           │   └── [Module]To[Module]ClientInterface.php
│           └── Service
│               ├── [Module]To[Module]ServiceBridge.php
│               └── [Module]To[Module]ServiceInterface.php      
├── Glue
│   └── [Module]    
│       └── Dependency
│           ├── Client
│           │   ├── [Module]To[Module]ClientBridge.php
│           │   └── [Module]To[Module]ClientInterface.php
│           ├── Facade
│           │   ├── [Module]To[Module]FacadeBridge.php
│           │   └── [Module]To[Module]FacadeInterface.php
│           ├── Service
│           │   ├── [Module]To[Module]ServiceBridge.php
│           │   └── [Module]To[Module]ServiceInterface.php    
│           └── QueryContainer
│               ├── [Module]To[Module]QueryContainerBridge.php
│               └── [Module]To[Module]QueryContainerInterface.php    
└── Client
    └── [Module]      
        └── Dependency
            ├── Client
            │   ├── [Module]To[Module]ClientBridge.php
            │   └── [Module]To[Module]ClientInterface.php
            └── Service
                ├── [Module]To[Module]ServiceBridge.php
                └── [Module]To[Module]ServiceInterface.php  
```

**Description**

According to the Interface Segregation Principle, every module defines an interface for each external class it relies upon. To decouple and encapsulate these dependencies effectively, we utilize `Bridges`. These `Bridges` serve to wrap dependencies such as [Facade](#facade-design-pattern), [Client](#facade-design-pattern), [Service](#facade-design-pattern), external library classes, and more. By doing so, a module explicitly declares its own requirements, enabling any class that implements the interface to be utilized. This approach facilitates seamless module decoupling, allowing both modules to evolve independently while maintaining a high degree of flexibility and maintainability.

**Conventions**

- The `Bridge` class needs to define and implement an interface that holds the specification of each `public` method (mind the missing `bridge` suffix word in the interface name).

<details><summary markdown='span'>Additional Conventions for Module development and Core module development</summary>

- `Bridges` must contain only the delegation logic to the friend method.<br/>
- The `Bridge` constructor can not have parameters to avoid coupling to a specific class.<br/>
- `Bridge` classes and interfaces need to be declared as strict as possible for input arguments and returns values, compared to their friend method with valid types (no `mixed`, no `x|y`).<br/>

</details>

**Guidelines**
- Bridge vs adapter: for simplification, we keep using bridge pattern even when adapting the earlier version of a SCOS [facade](#facade-design-pattern). Adapters are used when the remote class' life-cycle is independent to SCOS or there is a huge technical difference between the adaptee and adaptor.
- During `Bridge` definitions, type definition mistakes in remote [facades](#facade-design-pattern) become more visible. In these cases, be aware of the cascading effect of changing/restricting an argument type in [facades](#facade-design-pattern) when you consider such changes.
- [QueryContainer](#facade-design-pattern) and [Facade](#facade-design-pattern) dependencies are only available in those [Glue](#glue) application layers where the application layer has access to database.

**Example**

```php
namespace Spryker\Zed\Product\Business;

interface ProductFacadeInterface
{
    public function addProduct(ProductAbstractTransfer $productAbstractTransfer, array $productConcreteCollection): int;
}
```

```php
namespace Spryker\Zed\ProductApi\Dependency\Facade;

class ProductApiToProductBridge implements ProductApiToProductInterface
{
  /**
   * @var \Spryker\Zed\Product\Business\ProductFacadeInterface
   */
  protected $productFacade;

  public function __construct($productFacade)
  {
    $this->productFacade = $productFacade;
  }

  public function addProduct(ProductAbstractTransfer $productAbstractTransfer, array $productConcreteCollection): int
  {
    return $this->productFacade->addProduct($productAbstractTransfer, $productConcreteCollection);
  }
}
```

### Plugin

```
[Organization]
├── Zed
│   ├── [Module]
│   │    └── Communication
│   │        └── Plugin
│   │            └── [ConsumerModule]
│   │                └── [PluginName]Plugin.php
│   └── [ConsumerModule]Extension
│       └── Dependency
│           └── Plugin
│               └── [PluginInterfaceName]PluginInterface.php
│
├── Yves
│   ├── [Module]
│   │   └── Plugin
│   │       └── [ConsumerModule]
│   │           └── [PluginName]Plugin.php
│   └── [ConsumerModule]Extension
│       └── Dependency
│           └── Plugin
│               └── [PluginInterfaceName]PluginInterface.php
│
├── Glue
│   ├── [Module]
│   │   └── Plugin
│   │       └── [ConsumerModule]
│   │           └── [PluginName]Plugin.php    
│   └── [ConsumerModule]Extension
│       └── Dependency
│           └── Plugin
│               └── [PluginInterfaceName]PluginInterface.php
│
└── Client
    ├── [Module]        
    │   └── Plugin
    │       └── [ConsumerModule]
    │           └── [PluginName]Plugin.php    
    └── [ConsumerModule]Extension
        └── Dependency
            └── Plugin
                └── [PluginInterfaceName]PluginInterface.php

```

**Description**
- `Plugins` are classes which are used to realize Inversion-Of-Control - instead of a direct call to another module's [facade](#facade-design-pattern), a `plugin` can be provided as an optional and configurable class.
- `Plugins` are the only classes that can be instantiated cross modules (normally via the [Dependency Provider](#dependency-provider)).
- See more details about the implementation in [Plugin Interface](#plugin-interface) component, and instantiation in [Dependency Provider](#dependency-provider).

**Conventions**
- No generic convention.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- `Plugins` can not contain business logic but delegate to the underlying [facade](#facade-design-pattern).
- `Plugin` method names need to use words `pre` and `post` instead of `before`, `after`.
- `Plugin` class names need to use words `pre`, `post`, `create`, `update`, `delete`, instead of `creator`, `updater`, `deleter`.
- `Plugin` classes need to implement a [Plugin Interface](#plugin-interface) which is provided by an `extension module`.

</details>

**Guidelines**
- `Plugin` class name should be unique and give and overview about the behaviour that the `Plugin` delivers (consider developers searching a `Plugin` in a catalog across all features only by plugin class name).

**Example**

```php
  /**
    * @see /F/Q/N/FooDependencyProvider::getFooPlugins()
    * @see /F/Q/N/BarDependencyProvider::getBarPlugins()
    */
  class ZipZapPlugin extends AbstractPlugin implements FooPluginInterface, BarPluginInterface {}
```

### Plugin Interface

```
[Organization]
├── Zed
│   ├── [Module]
│   │    └── Communication
│   │        └── Plugin
│   │            └── [ConsumerModule]
│   │                └── [PluginName]Plugin.php
│   └── [ConsumerModule]Extension
│       └── Dependency
│           └── Plugin
│               └── [PluginInterfaceName]PluginInterface.php
│
├── Yves
│   ├── [Module]
│   │   └── Plugin
│   │       └── [ConsumerModule]
│   │           └── [PluginName]Plugin.php
│   └── [ConsumerModule]Extension
│       └── Dependency
│           └── Plugin
│               └── [PluginInterfaceName]PluginInterface.php
│
├── Glue
│   ├── [Module]
│   │   └── Plugin
│   │       └── [ConsumerModule]
│   │           └── [PluginName]Plugin.php    
│   └── [ConsumerModule]Extension
│       └── Dependency
│           └── Plugin
│               └── [PluginInterfaceName]PluginInterface.php
│
└── Client
    ├── [Module]        
    │   └── Plugin
    │       └── [ConsumerModule]
    │           └── [PluginName]Plugin.php    
    └── [ConsumerModule]Extension
        └── Dependency
            └── Plugin
                └── [PluginInterfaceName]PluginInterface.php

```

**Description**

- Modules which consume [Plugins](#plugin) need to define their requirements with an interface.
- The `Plugin Interface` needs to be placed in an `extension module`.

There are three modules involved:

1. **Plugin definer** (aka **extension module**): The module that defines and holds the `Plugin Interface` (example: `CompanyPostCreatePluginInterface` in `CompanyExtension` module).
2. **Plugin executor**: The module that uses the [Plugin(s)](#plugin) in its [Dependency Provider](#dependency-provider) thus provides extension point (example: `CompanyDependencyProvider::getCompanyPostCreatePlugins()` in `Company` module)
3. **Plugin providers**: The modules that implement a [Plugin](#plugin) thus provide extension for the given extension point (example: `CompanyBusinessUnitCreatePlugin` in `CompanyBusinessUnit` module)

**Conventions**
- No generic conventions.

<details><summary markdown='span'>Conventions for Module development and Core module development</summary>

- `Plugin interfaces` need to be defined in extension modules.<br/>
  - `Extension modules` need to be suffixed with `Extension` and follow regular module architecture.<br/>
  - `Extension modules` can not contain anything else but `Plugin Interfaces` and [Shared application layer](#shared).<br/>
- `Plugin interface` methods need to receive input items as collection for scalability reasons.<br/>

</details>

**Guidelines**
- Operations on single items in plugin stack methods is not feasible, except for the following reasons:
  - it is strictly and inevitably a single-item flow.
  - the items go in FIFO order and there is no other way to use a collection instead.
- Plugin interface class specification should explain:
  - how the [Plugins](#plugin) will be used,
  - what are the typical use-cases of a [Plugin](#plugin).

**Example**

```php
<?php

namespace Spryker\Zed\PickingListExtension\Dependency\Plugin;

use Generated\Shared\Transfer\PickingListCollectionTransfer;

/**
 * Provides an ability to expand `PickingListCollectionTransfer` with additional data.
 *
 * Implement this plugin interface to expand `PickingListCollectionTransfer` after the fetching picking list data from the persistence.
 */
interface PickingListCollectionExpanderPluginInterface
{
    /**
     * Specification:
     * - Expands `PickingListCollectionTransfer` with an additional data.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PickingListCollectionTransfer $pickingListCollectionTransfer
     *
     * @return \Generated\Shared\Transfer\PickingListCollectionTransfer
     */
    public function expand(PickingListCollectionTransfer $pickingListCollectionTransfer): PickingListCollectionTransfer;
}
```
