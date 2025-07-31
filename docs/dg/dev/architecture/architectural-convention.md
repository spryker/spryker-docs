---
title: Architectural convention
description: The Spryker framework includes a diverse range of components designed to address common challenges and streamline development processes. These components establish conventions and guidelines to ensure appropriate application responses.
last_updated: Jul 28, 2025
template: concept-topic-template
redirect_from:
- /docs/dg/dev/architecture/architectural-convention-reference.html
related:
  - title: Conceptual Overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Modules and Application Layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
---


This document provides an overview of our conventions and guidelines. The technology landscape is ever-evolving, so this document is subject to continuous refinement and improvement.

Your feedback and suggestions are highly valued to enhance the accuracy, relevance, and effectiveness of Spryker. We encourage you to contribute your insights and recommendations by submitting changes through our designated channels.

## Structure of the document

This section describes how to interpret different terms in this document.

### Conventions per development use cases

Understanding the development scenarios in which Spryker can be used is crucial for maximizing its potential. This document describes guidelines and conventions tailored to the following use cases:

- *Project development*: If you are developing a project, you need to adhere to specific project development guidelines to ensure a smooth integration.
- *Module development*: Contributing reusable third-party modules, boilerplates, or accelerators requires additional considerations. Because such functionalities are reusable on multiple projects in different contexts, these guidelines are more strict than those for *project development*.
- *Core module development*: When contributing to Spryker modules, there are rules to follow in the module folders. This ensures consistency and compatibility across product lines in the Spryker Framework. These requirements are the the most strict to be reusable on multiple projects in different business verticals, like B2C, B2B, Marketplace, or Unified Commerce. These rules also ensure the stability of the module API used by Spryker development ecosystem and community.

### Directive classification

There are two types of directives:
- Convention: These are mandatory requirements that contributors must adhere to enable specific Spryker features and ensure proper application responses.
- Guideline: While not mandatory, following these guidelines is highly recommended to promote long-term code maintainability and facilitate smoother development processes.

## Applications

Spryker uses application layers to enable the construction of the necessary application architecture for specific business requirements to provide a quick project start and long-term maintainability.
- Backend applications, like Zed, Backend API, Backend Gateway, Back Office, GlueBackend, MerchantPortal, Console, typically use the Zed-, Glue-, Client-, Service-, and Shared application layers.
- Storefront applications, like Yves, Configurator, Glue, GlueStorefront, Console, typically use the Yves-, Glue-, Client-, Service-, and Shared application layers.

## Application layers

Spryker organizes responsibilities and functionalities over a set of [application layers](https://docs.spryker.com/docs/dg/dev/architecture/conceptual-overview.html) to enable flexible business logic orchestration across applications.

The application layers are aggregations of [layers](https://docs.spryker.com/docs/dg/dev/architecture/modules-and-application-layers.html). Some application layers are multi-layered with components organized in layer directories, while others are flat-layered with components merged in the same directory.

| APPLICATION LAYER | LAYERING | LAYER |
|-|-|
| Glue |  flat-layered | Communication layer |
| Client |  flat-layered | Communication layer |
| Service |  flat-layered | Overarching Business layer |
| Yves |  flat-layered |  Presentation layer merged with Communication layer |
| Zed |  multi-layered | Presentation, Communication, Business, and Persistence layers |

The Shared application layer is a layer-overarching, stateless, abstraction library.

### Zed

Zed serves as the backend application layer responsible for housing all business logic, persisting data and the backend UI, like the Back Office.

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

Yves application layer provides a lightweight shop application.

```text
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

The Glue application layer provides data access points through APIs. It acts as an interface for external systems to interact with the application's data.

```text
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
- Persistence access: key-value storage (Redis or Valkey), Search (Elasticsearch), Yves sessions
- Zed as a data-source (RPC)
- Third-party communication

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

The Service application layer is a multipurpose library that's used across various application layers, such as Yves, Client, Glue, or Zed.

A service primarily consists of reusable lightweight stateless business logic components. Because of its deployment across all applications, a service is constrained to accessing data providers that are available universally. For example, the backend database is not accessible from Storefront applications by default.

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

To ensure compatibility and versatility across different application architecture setups, the content in the Shared library must be free of application layer-specific elements. So, [factories](#factory) are not allowed in the `Shared` library.

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
- Presentation layer: contains frontend assets, like Twig templates, JS, or CSS files.
- Communication layer: contains controllers, console commands, forms, tables, and plugins.
- Business layer: contains the business logic of a module.
- Persistence layer: contains repository, entity manager, simple data mappers, and the schema of entities.

### Presentation layer responsibilities

- Handles the UI presentation.
- Contains frontend assets, like HTML, Twig templates, JS, TypeScript, or CSS files.
- Handles user interactions and input validations on the client side.
- Interacts with the [Communication layer](#communication-layer-responsibilities) to retrieve data for display.

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

### Persistence layer responsibilities

- Responsible for data storage and retrieval.
- Contains queries (via [Entity Manager](#entity-manager) or [Repository](#repository)), [entities](#entity) (data models), and [database schema definitions](#persistence-schema).
- Handles database operations such as CRUD: create, read, update, delete.
- Ensures data integrity and security.
- Maps database entities into business data transfer objects.

## Components

### Conventions

- Components must be placed according to the corresponding [application layer's](#application-layers) directory architecture  to take effect.
- Components are required to inherit from the [application layer](#application-layers) corresponding abstract class in the  `Kernel` module to take effect.

<details>
  <summary> For *core module development* </summary>
- Components must be extended directly from the [application layer's](#application-layers) corresponding abstract class in the `Kernel` module.
</details>

### Guidelines

- The components should be stateless to be deterministic and easy to comprehend.
<details>
  <summary>For *project development*</summary>

- Module development and core module development conventions and guidelines may offer solutions for long-term requirements or recurring issues. We recommend considering them for each component.

</details>
<details>
  <summary>For *module development* and *core module development*</summary>

- Components must be stateless to be deterministic and easy to comprehend.

</details>

### Controller

```text
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

`Controllers` and `Actions` are application access points for any kind of HTTP communication with end-users or other applications.

Responsibilities of a controller are as follows:
- Adapt the received input data to the underlying layers: syntactical validation, delegation.
- Delegate the processing of the input data.
- Adapt the results of processing to the expected output format. For example, add flash messages, set a response format, trigger a redirect.

The `Gateway` controller name is reserved for the [Gateway Controller](#gateway-controller).

The `Index` controller name acts as the default controller during request controller resolution.

The `index` action name acts as the default action during request action resolution.

#### Conventions

- `Action` methods must be suffixed with `Action` and be `public` in order to be accessible. They need to define the entry points of the `Controller` in a straight-forward manner.

<details>
  <summary>For *module development* and *core module development*</summary>

- For simplicity, only `Action` methods can be `public`.
- `Action` methods need to have either no parameter or receive the `\Symfony\Component\HttpFoundation\Request` object to access system or request variables.
- `Action` methods must orchestrate [syntactical validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) before delegating to underlying processing layers.
- `Action` methods can't directly contain any logic that's outside the regular responsibilities of a `Controller`.

</details>

#### Guidelines

- `Controller` has an inherited `castId()` method that should be used for casting numerical IDs.
- The inherited `getFactory()` method grants access to the [Factory](#factory).
- The inherited `getFacade()` and `getClient()` methods grant access to the corresponding [facade](#facade-design-pattern) functionalities.

#### Examples

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

```text
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


Injects required dependencies into the module application layer. Typically, dependencies are [facades](#facade-design-pattern) or [plugins](#plugin).

Dependency injection is orchestrated through a `provide-add-get` structure. See the following examples.

- The `provide` method is the highest level that holds only `add` calls without any additional logic.
- The `add` method is the middle level that injects the dependencies into the dependency container using a class constant and a late-binding instantiating closure.
- The `get` method is the lowest level that sources the dependency.

#### Conventions

- Setting a dependency using the `container::set()` needs to be paired with late-binding closure definition to decouple instantiation.
- Dependencies that require individual instances per injection need to additionally use the `Container::factory()` method to ensure expected behavior. For example, [Query Objects](#query-object). See the following examples.
- `Provide` methods need to call their parent `provide` method to inject the parent-level dependencies.
- Dependencies need to be wired through the target layer corresponding to the inherited method to be accessible via the corresponding [Factory](#factory):

```php
public function provideCommunicationLayerDependencies(Container $container)
public function provideBusinessLayerDependencies(Container $container)
public function providePersistenceLayerDependencies(Container $container)
public function provideDependencies(Container $container)
public function provideBackendDependencies(Container $container)
public function provideServiceLayerDependencies(Container $container)
```

<details>
  <summary>For *module development* and *core module development*</summary>

- Only three types of methods can be defined: `provide`, `get`, or `add`.

```php
function provide*Dependencies(Container $container)
function add[Dependency](Container $container)
function add[PluginInterfaceName]Plugins(Container $container)
function get[Dependency](Container $container)
function get[PluginInterfaceName]Plugins(Container $container)
```

- All class constants are required to be `public` to decrease conflicts in definition for being a public API class and to allow referring to them from [Factory](#factory).
- `Add`, `provide`, and `get` methods must have the `$container` `Container` as the only argument.
- `Provide` methods can call only  `add` methods.
- `Add` and `get` methods need to be `protected`.
- `Add` methods can only introduce one dependency to the `Container`. A plugin stack is considered one dependency in this regard.
- [Facades](#facade-design-pattern) must be wrapped into a [Bridge](#bridge) to avoid coupling another module.
- [Plugins](#plugin) can't be wired on the module level.
- [Plugins](#plugin) defining `get` methods must be tagged with the `@api` tag.

</details>

#### Guidelines

Dependency constant names should be descriptive and follow the `[COMPONENT_NAME]_[MODULE_NAME]` or `PLUGINS_[PLUGIN_INTERFACE_NAME]` pattern, with a name matching its value. See the following examples.

#### Examples

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

```text
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

An active record object that represents a row in a table. `Entities` have getter and setter methods to access the underlying data.
Each `Entity` has a generated identical [Entity Transfer Object](#transfer-object), which can be used during the interaction with other layers. Each database table definition results in the creation of an `Entity` by Propel.

3-tier class hierarchy: The Propel generated 2-tier `Entity` class hierarchy is injected in the middle with a core module abstract class to enable adding functionality from the core module level. See the following examples.

For more information, see [Active Record Class in the Propel docs](https://propelorm.org/documentation/reference/active-record.html).

For more details on domains, see [Persistence Schema](#persistence-schema).

#### Conventions

- `Entity` classes need to be generated via [Persistence Schema](#persistence-schema).
- `Entities` can't leak to any [facade](#facade-design-pattern)'s level. That's because they are heavy, stateful, module-specific objects.
- `Entities` must be implemented according to the 3-tier class hierarchy to support extension from Propel and SCOS. For more context, see the description and examples.

<details>
  <summary>For *module development* and *core module development*</summary>

- `Entities` can be instantiated only in the [Persistance Layer](#persistence-layer-responsibilities).

</details>

#### Guidelines

- A typical use case is to define `preSave()` or `postSave()` methods in the `Entity` object.
- We recommend defining manager classes instead of overloading the `Entity` with complex or context-specific logic.
- `Entities` should not leak outside the module's persistence layer.

#### Examples

The lowest-level class generated by Propel, containing the base Propel functionality.

```php
namespace Orm\Zed\ConfigurableBundle\Persistence\Base;

/**
 * Base class that represents a row from the 'spy_configurable_bundle_template' table.
 */
abstract class SpyConfigurableBundleTemplate implements Propel\Runtime\ActiveRecord\ActiveRecordInterface {...}
```

The middle-level class generated in a Spryker module, containing the core module functionality.

```php
namespace Spryker\Zed\ConfigurableBundle\Persistence\Propel;

abstract class AbstractSpyConfigurableBundleTemplate extends Orm\Zed\ConfigurableBundle\Persistence\Base\SpyConfigurableBundleTemplate {...}
```

The highest-level class generated on project, containing the project-specific functionality.

```php
namespace Orm\Zed\ConfigurableBundle\Persistence;

class SpyConfigurableBundleTemplate extends Spryker\Zed\ConfigurableBundle\Persistence\Propel\AbstractSpyConfigurableBundleTemplate {...}
```

## Entity Manager

```text
[Organization]
└── Zed
    └── [Module]
        └── Persistence
            ├── [Module]EntityManagerInterface.php
            └── [Module]EntityManager.php
```

Persists [Entities](#entity) by using their internal saving mechanism and/or collaborating with [Query Objects](#query-object).
The `Entity Manager` can be accessed from the same module's [business layer](#business-layer-responsibilities).

### Conventions

No general conventions.

<details><summary>For *module development* and *core module development*</summary>

- `public` `Entity manager` methods need to have a functionality describing prefix: `create*()`, `delete*()`, or `update*()`.
- Creating, updating, and deleting functions need to be separated by concern, even if they use overlapping internal methods.
- The `Entity manager` class needs to define and implement an interface that holds the specification of each `public` method.
- `Entity manager` methods need to receive only [Transfer Objects](#transfer-object) as input parameters.
- `Entity manager` methods need to return `void` or the saved object or objects as [Transfer Objects](#transfer-object).
-`Entitie manager` needs to use [Entities](#entity) and/or [Query Objects](#query-object) for database operations because raw SQL usage isn't feasible.

</details>

### Guidelines

No general guidelines.

<details><summary>For *project development*</summary>

Solutions in `Entity manager` can use raw SQL queries for performance reasons, but this also removes all Propel ORM benefits like triggering events. Use with caution.

</details>

### Facade design pattern

```text
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

Spryker defines the facade design pattern as the primary entry point for layers following the [standard facade design pattern](https://en.wikipedia.org/wiki/Facade_pattern).

There are four components that use the facade design pattern, referred to as facades:
- `Facade` is the API of [Business layer](#business-layer-responsibilities).
- `Client` is the API of [Client application layer](#client), and it's the only entry point to the [Client Application](#applications).
- `Service` is the API of [Service application layer](#service), and it's the only entry point to the [Service Application](#applications).
- `Query Container` is the API of [Persistence layer](#persistence-layer-responsibilities), and it's the entry point to database access. The more advanced and modular [Entity Manager](#entity-manager) and [Repository](#repository) pattern counter the problems of cross-module leaks of the `Query Container` concept.

The facades provide functionality for other layers and modules. The functionality behind the facade accesses other sibling functionality directly and not from the facade. For example, [Models](#model) call their sibling [Models](#model) as a dependency rather than through the `facade`.

#### Conventions

- All methods need to have [Transfer Objects](#transfer-object) or native types as an argument and return a value.

<details><summary>For *module development* and *core module development*</summary>

- Methods need to have a descriptive name that describes the use case and enables readers to easily select them. Examples:
  - `addToCart()`
  - `saveOrder()`
  - `triggerEvent()`
- The inherited `getFactory()` method needs to be used to instantiate the underlying classes.
- Methods need to contain only the delegation to the underlying [model](#model).
- Methods need to be `public` and stand for an outsourced function of the underlying functionality.
- Each facade class needs to define and implement an interface that holds the `Specification` of each `public` method.
  - The `Specification` is considered as the semantic contract of the method — all significant behavior needs to be highlighted.
- All facade class methods need to add `@api` and `{@inheritdoc}` tags to their method documentation.
- New `QueryContainer` functionality can't be added but implemented through the advanced [Entity Manager](#entity-manager) and [Repository](#repository) pattern.
- Single-item-flow methods need to be avoided unless one of the following reasons apply:
  - There is only a single-entity flow ever, proven by business cases.
  - The items need to go in first-in-first-out order, and there is no way to use a collection instead.
- Multi-item-flow methods need to do the following:
  - Receive a [Transfer Object](#transfer-object) collection as input with the following naming pattern: `[DomainEntity]Collection[Request|Criteria|TypedCriteria|TypedRequest]Transfer`.
  - Return a [Transfer Object](#transfer-object) collection with the following naming pattern: `[DomainEntity][Collection|CollectionResponse]Transfer`.
- Create-Update-Delete (CUD) directives:
  - `Create` method needs to be defined as `create[DomainEntity]Collection([DomainEntity]CollectionRequestTransfer): [DomainEntity]CollectionResponseTransfer`.
  - `Update` method needs to be defined as `update[DomainEntity]Collection([DomainEntity]CollectionRequestTransfer): [DomainEntity]CollectionResponseTransfer`.
  - `Delete` method needs to be defined as `delete[DomainEntity]Collection([DomainEntity]CollectionDeleteCriteriaTransfer): [DomainEntity]CollectionResponseTransfer`.
  - `Create` and `Update` methods need to be implemented for each business entity. `Delete` is optional and can be implemented on demand.
  - CUD methods can't have any other arguments except the prior defined.
  - `[DomainEntity]CollectionRequestTransfer` and `[DomainEntity]CollectionDeleteCriteriaTransfer` objects need to support transactional entity manipulation that's defaulted to true and documented in the facade function specification.
  - `[DomainEntity]CollectionRequestTransfer` should support bulk operations.
  - `[DomainEntity]CollectionDeleteCriteriaTransfer` should contain only arrays of attributes to filter the deletion of entities by.
  - `[DomainEntity]CollectionDeleteCriteriaTransfer` needs to use the `IN` operation to filter the deletion of entities. Each item in the array of the filled attributes causes the deletion of one entity.
  - `[DomainEntity]CollectionDeleteCriteriaTransfer` attributes that support deleting need to be mentioned in facade specification.
  - `[DomainEntity]CollectionResponseTransfer` should contain a returned list of entities and an error list.
    - If the entity manipulation function operation is fully successful, the error list must be empty and the entity list must contain all entities that were manipulated.
    - If the entity manipulation function operation isn't successful, and the request is transactional, the error list must contain the error that caused the transaction rollback. The error must point out the entity that caused the rollback. The entities after the error must not be manipulated. The response entity list must reflect the state of the database after the rollback.
    - If the entity manipulation function operation isn't successful and the request isn't transactional, the error list must contain all errors. Each error must point out the related entity that caused that error. The response entity list must reflect the state of the database after the rollback.

</details>

#### Guidelines

- The `Service` facade functionalities are commonly used to transform data, so CUD directives are usually not applicable.
- Avoid single-item-flow methods because they aren't scalable.

<details><summary>For *project development*</summary>

- You can use and further develop `Query Containers`; but we highly recommend transitioning toward the [Entity Manager](#entity-manager) and [Repository](#repository) pattern.

</details>

#### Examples

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
     * - Returns fallback locale translation if provided single locale translation doesn't exist or translation key if nothing found.
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

```text
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

`Factory` instantiates classes and injects dependencies during instantiation.

#### Conventions

No general conventions.

<details><summary>For *module development* and *core module development*</summary>

- `Factories` need to orchestrate the instantiation of objects in solitude, that is without reaching out to class-external logic.
- `Factory` classes must not define and implement interfaces because they are never fully replaced and offer no benefit.
- `Factory` methods need to be `public`.
- `Factory` methods need to either instantiate one new object and be named as `create[Class]()` or wire the dependencies and be named as `get[Class]()`.
- When reaching out to module dependencies, `Factory` methods need to use the constants defined in [dependency provider](#dependency-provider).

</details>


### Gateway Controller

```text
[Organization]
└── Zed
    └── [Module]
        └── Communication
            └── Controller
                └── GatewayController.php
```

`Gateway Controller` is a special reserved [Controller](#controller) in the core that serves as an entry point in [Zed](#zed) for serving remote application [Client](#client) requests. For more details, see [Zed Stub](#zed-stub).

#### Conventions

- `Gateway Controller` actions must define a single [transfer object](#transfer-object) as an argument and another or the same [transfer object](#transfer-object) for return.
- `Gateway Controllers` follow the [Controller](#controller) conventions.

### Layout

```text
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

A `Layout` is the skeleton of a page and defines its structure.


### Mapper / Expander / Hydrator


To differentiate between the recurring cases of data mapping, and to provide a clear separation of concerns, the following terms are introduced:
- `Mappers` are lightweight transforming functions that adjust one specific data structure to another in solitude, that is without reaching out for additional data than the provided input.
  - `Persistance Mapper` stands for `Mappers` in [Persistence layer](#persistence-layer-responsibilities), typically transforming [propel entities](#entity), [entity transfers objects](#transfer-object), or generic [transfer objects](#transfer-object).
- `Expanders` source additional data into the provided input; restructuring may also happen.

#### Conventions

No general conventions.

<details><summary>For *module development* and *core module development*</summary>

- `Mapper` methods need to be named as `map[<SourceEntityName>[To<TargetEntityName>]]($sourceEntity, $targetEntity)`.
  - `Mappers` need to be free of any logic other than structuring directives.
    - `Mappers` can't have data resolving logic, like remote calls or database lazy load, because they are used in high-batch processing scenarios.
  - `Mappers` can have multiple source entities if they don't violate the structural-mapping-only directive.
  - `Mappers` can't use dependencies except [module configurations](#module-configurations), other `mappers`, or lightweight [Service calls](#facade-design-pattern).
  - `Persistence Mappers` need to be in [Persistence layer](#zed) only and named as `[Entity]Mapper.php` or `[Module]Mapper.php`.
- `Expander` methods need to be named as `expand[With<description>]($targetEntity)`.
- The `hydrator/hydration` keywords can't be used. Use `Mapper` or `Expander` instead.

</details>

#### Examples

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

```text
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

`Models` encapsulate logic and can be used across various layers in the application architecture and in the boundaries of each [layer's specific responsibilities](#layers).
- [Communication layer](#communication-layer-responsibilities) `Models` are present in [Yves](#yves), [Glue](#glue), and [Client](#client).
- [Business layer](#business-layer-responsibilities) `Models` are present in [Zed](#zed) and [Service](#service).
- [Persistence layer](#persistence-layer-responsibilities) `Models` are present in [Zed](#zed).

#### Conventions

- `Model` dependencies can be [facades](#facade-design-pattern) or from the same module, either `Models`, [Repository](#repository), [Entity Manager](#entity-manager) or [Config](#module-configurations).
  - `Models` can't directly interact with other modules' `Models`: via inheritance, shared constants, instantiation, etc.

<details><summary>For *module development* and *core module development*</summary>

- `Model` dependencies need to be injected via constructor.
- `Models` can't instantiate any object but [Transfer Objects](#transfer-object).
- `Models` need to be grouped under a folder by activity. Examples: `Writers/ProductWriter.php`, `Readers/ProductReader.php`.
- `Models` can't be named using generic words, like `Executor`, `Handler`, or `Worker`.
- Each `Model` class needs to define and implement an interface that holds the specification of each `public` method.
- `Model` dependencies needs to be referred, used, or defined by an interface instead of a class.
- `Model` methods can't be `private`.

</details>

### Module Configurations

```text
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

- Module configuration: module specific, environment independent configuration in `[Module]Config.php.`
- Environment configuration: configuration keys in `[Module]Constants.php` that can be controlled per environment via `config_default.php`.

The `module configuration` class can access the `environment configuration` values using `$this->get('key')`.

When `module configuration` is defined in the [Shared](#shared) application layer, it can be accessed from any other [application layer](#application-layers) using the [application layer](#application-layers) specific `Config`.

When `module configuration` is defined in an [application layer](#application-layers) other than [Shared](#shared), they are dedicated and accessible only to that single [application layer](#application-layers).

#### Conventions

No general conventions.

<details><summary>For *module development* and *core module development*</summary>

- `Module configuration`:
  - Getter methods, prefixed with `get`, need to be defined to retrieve configuration values, instead of accessing values via constants directly. This enables a more flexible extension structure and an easier to control access tracking.
    - Constants can also be defined to support the getter methods. For example, to enable cross-module referencing via `@uses`.
- `Environment configuration`:
  - Constants need to have a specification about their purpose.
  - Constants need to contain the UPPERCASE value matching the value of the key. See the following examples.
  - Constants need to be prefixed with {MODULE_NAME}. See the following examples.
- `Module configuration` constants need to be `protected`.
- The `module configuration` relays exclusively on `static::` to support extension.
- `Environment configuration` constants need to be `public`.

</details>

#### Guidelines

No general guidelines.

<details><summary>For *module development* and *core module development*</summary>

`Protected` items are not recommended in `module configuration` because they tend to create backward compatibility problems on project extensions.

</details>

#### Examples

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


### Navigation.xml

```text
[Organization]
└── Zed
    └── [Module]
        └── Communication              
            └── navigation.xml   
```

Module entries of the Back Office navigation panel. The icons are taken from [Font Awesome Icons Library](https://fontawesome.com/v4/).

#### Examples

The following example adds navigation elements under the existing `product` navigation element, which is defined in another module:
- The `pages` reserved node holds the navigation items.
- The navigation items are defined within the `configurable-bundle-templates` logical node according to business requirements.
- The `bundle` identifies which `module` the processing `controller` is located in.
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

```text
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

`Permission Plugins` are used to put a scope on the usage of an application during a request lifecycle.

#### Conventions

- `Permission Plugins` need to implement `\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface`.
- `Permission Plugins` need to adhere to [Plugin](#plugin) conventions.

#### Guidelines

- When using one of the traits in a [Model](#model),  when possible, refer directly to the remote `Permission Plugin` key string instead of defining a local constant.
- The `\Spryker\[Application]\Kernel\PermissionAwareTrait` trait enables the [Model](#model) in the corresponding [application](#applications) to check if a permission is granted to an application user.

<details><summary>For *module development* and *core module development*</summary>

- When using one of the traits in a [Model](#model), use a `protected` constant string to reference the `Permission Plugin` that will be used in the [Model](#model). As an annotation for this string, add the `@uses` annotation to the `PermissionPlugin::KEY` string which you will compare against. See the following examples.

</details>


## Examples

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

```text
[Organization]
└── Zed
    └── [Module]
        └── Persistence
            └── Propel
                └── Schema
                    └── spy_[domain_name].schema.xml
```

The schema file defines the module's tables and columns. Schema files are organized into business `domains`, each representing a module overarching group that encapsulates related domain entities. For more details, see [Propel Documentation - Schema XML](https://propelorm.org/documentation/reference/schema.html).

#### Conventions


- Tables need to have an integer ID primary key following the `id_[domain_entity_name]` format. Examples: `id_customer_address`, `id_customer_address_book`.
- Table foreign key column needs to follow the `fk_[remote_entity]` format. Examples: `fk_customer_address`, `fk_customer_address_book`. If the same table is referred multiple times, follow-up foreign key columns need to be named as `fk_[custom_connection_name]`.
- Table names need to follow the following format:

| ENTITY | FORMAT | EXAMPLE |
| - | - | - |
| Business | `[org]_[domain_entity_name]` | `spy_customer_address` |
| Relation |  `[org]_[domain_entity_name]_to_[domain_entity_name]` | `spy_cms_slot_to_cms_slot_template`  |
| Search  |  `[org]_[domain_entity_name]_search`  | `spy_configurable_bundle_template_page_search`  |
| Storage  |  `[org]_[domain_entity_name]_storage` |  `spy_configurable_bundle_template_image_storage`  |

<details><summary>For *module development* and *core module development*</summary>

- The table `[org]` prefix needs to be `spy_`.
- The schema file `[org]` prefix needs to be `spy_`.
- The `uuid` field needs to be defined and used for external communication to uniquely identify records and hide possible sensitive data. For example, the `spy_order` primary key gives information about the submitted order count.
  - The field can be `null` by default.
  - The field needs to be eventually unique across the table; until a unique value is provided, the business logic may not operate appropriately.
- Table foreign key definitions needs to include the `phpName` attribute.
- Each field **must** have a description of the fields value; This helps understand the data model and the internal usage of a fields value. F.e. name="price" description="The base unit of a currency f.e. for the currency EUR it is cent."`.

</details>

#### Guidelines

- `PhpName` is usually the CamelCase version of the "SQL name", for example—`<table name="spy_customer" phpName="SpyCustomer">`.
- A module, like the `Product` module, may inject columns into a table which belongs to another module, like the `Url` module. This usually happens if the direction of a relation is opposed to the direction of the dependency. For this scenario, the injector module contains a separate foreign module schema definition file. For example, the `Product` module contains `spy_url.schema.xml` next to `spy_product.schema.xml` that defines the injected columns into the `Url` `domain`. See the following examples.
- The `database` element's `package` and `namespace` attributes are used during class generation and control the placement and namespace of generated files.

#### Examples

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ConfigurableBundle\Persistence" package="src.Orm.Zed.ConfigurableBundle.Persistence">
    <table name="spy_configurable_bundle_template">
        <column name="id_configurable_bundle_template" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
        <column name="uuid" required="false" type="VARCHAR" size="255" description="The UUID of the product bundle template for external reference."/>
        <column name="name" required="true" type="VARCHAR" size="255" descrption="The display name of the product bundle template."/>
        <column name="is_active" required="true" default="false" type="BOOLEAN" description="A boolean flag indicating if the product bundle template can be used or not./>

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

Injecting columns from `Product` to the `Url` `domain` by defining the `spy_url.schema.xml` schema file in the `Product` module.

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

```text
[Organization]
└── Yves
    └── [Module]  
        └── Plugin
            ├── Provider
            │   └── [Name]ControllerProvider.php
            └── [ConsumerModule]
                └── [RouterName]Plugin.php
```

`Providers` and `Routers` are used for bootstrapping the [Yves](#applications) application.
- Controller Provider: registers [Yves](#applications) [Controllers](#controller) of a module and binds them to a path.
- Router: resolves a path into an [Yves](#applications) [Controller and Action](#controller).

Controllers in the [Zed](#zed) application layer are autowired and don't require a manual registration. An `ExampleController::indexAction()` in `ExampleModule` can be accessed via the `/example-module/example/index` URI.

#### Conventions

- A `Controller Provider` needs to extend `\SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider`.
- A `Router` needs to extend `\SprykerShop\Yves\ShopRouter\Plugin\Router\AbstractRouter`.
- A `providers` are `routers` are classified as a [Plugin](#plugin) so the plugin's conventions apply.
- `Providers` and `routers` are classified as plugins so the [Plugin's](#plugin) conventions apply.

### Query Object

```text
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

Enables to write queries to the related table in an SQL engine agnostic way. `Query Objects` can be instantiated and used only from the [Repository](#repository) and [Entity Manager](#entity-manager) of the definer module or modules.

For more information, see the following:
- [Query class in the Propel docs](https://propelorm.org/documentation/reference/model-criteria.html)
- More details on the 3-tier class hierarchy in [Entity](#entity), and domains in [Persistence Schema](#persistence-schema).

#### Conventions

No general conventions.

<details><summary>For *module development* and *core module development*</summary>

Hidden hard dependencies appearing through `join` need to be defined using the `@module [RemoteModule1][,[...]]` tag. See the following examples.

</details>

#### Examples

In the following example, the `SpyProductQuery` is part of the `Product` `domain`, while `SpyUrl` belongs to `Url` `domain`,  and `SpyProductComment` belongs to `ProductComment` `domain`.

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

```text
[Organization]
└── Zed
    └── [Module]
        └── Persistence
            ├── [Module]Repository.php      
            └── [Module]RepositoryInterface.php
```


Retrieves data from the database by executing queries and returns the results as [Transfer Objects](#transfer-object) or native types.
The `Repository` can be accessed from the same module's [Communication](#communication-layer-responsibilities) and [Business layers](#business-layer-responsibilities).

#### Conventions

No general conventions.

<details><summary>For *module development* and *core module development*</summary>

- `Repostiories` can retrieve data in the database, but can't change it.
- `Repositories` need to use [Entities](#entity) and/or [Query Objects](#query-object) to retrieve data from the database.
- The `Repository` class needs to define and implement an interface that holds the specification of each `public` method.
- `Public` methods need to receive and return only [Transfer Objects](#transfer-object).
- `Public` methods need to return with a collection of items or a single item, for example—using and wrapping the results of `find()` or `findOne()`.

</details>

#### Guidelines

No general guidelines.

<details><summary>For project development</summary>

Methods can use native PHP types as input arguments or result values. Because it leads to granular methods, it's not recommended.

</details>

### Theme

```text
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

[Yves application layer](#yves) can have one or multiple themes that define the overall look and feel.

Spryker implements the concept of [atomic web design](https://bradfrost.com/blog/post/atomic-web-design/).

[Yves application layer](#yves) provides only one-level theme inheritance: `current theme` > `default theme`. A `Theme` may contain `views`, `templates`, and `components`.
- Current theme: a single theme defined on a project level. Examples: `b2b-theme`, `b2c-theme`.
- Default theme: a theme provided by default and used in the `boilerplate implementations`. Used for incremental project updates, that is starting from default and changing frontend components one by one. Also used for a  graceful fallback if the core delivers a new functionality that doesn't have own frontend in a project.
- Views are the templates for [Controllers](#controller) and [Widgets](#widget).
- Templates are reusable templates like page [Layouts](#layout).
- Components are reusable parts of the UI, further divided into `atoms`, `molecules`, and `organisms`.


### Transfer Object

```text
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
                └── [module_name]_rest_api.transfer.xml   
```

`Transfer Objects` are pure data transfer objects (DTO) with getters and setters. They can be used in all [applications](#applications) and all [layers](#layers). Business transfer objects are described in module specific XML files and then auto-generated into the `src/Generated/Shared/Transfer` directory.

For every defined table in [Persistence Schema](#persistence-schema), a matching `EntityTransfer` `Transfer Object` is generated with the `EntityTransfer` suffix. `EntityTransfers` are the lightweight DTO representations of the [Entities](#entity), so `Entity Transfers` should be used primarily during layer or module overarching communication.

#### Conventions

- `Transfer Objects` need to be defined in the transfer XML file.
- The `Attributes` transfer name suffix is reserved for `Glue API modules`, that is modules with the `RestApi` suffix, and must not be used for other purposes to avoid collision.
- The `ApiAttributes` transfer name suffix is reserved for `Storefront API modules`, that is modules with the `Api` suffix, and must not be used for other purposes to avoid collision.
- The `BackendApiAttributes` transfer name suffix is reserved for `Backend API modules`, that is modules with `BackendApi` suffix, and must not be used for other purposes to avoid collision.
- `EntityTransfers` must not be defined manually. It's generated automatically based on the [Peristence Schema](#persistence-schema) definitions.
  - The `Entity` suffix is reserved for the auto-generated `EntityTransfers` and must not be used in manual transfer definitions to avoid collision.

<details><summary>For *module development* and *core module development*</summary>

### General

- A module can only use the `Transfer Objects` and their properties that are declared in the same module. Transfer definitions accessed through composer dependencies are considered as a violation.

### Transfer schemas

- Must have a `description` for each field; This helps understand the data model and the internal usage of a fields value. F.e. `name="price" description="The base unit of a currency f.e. for the currency EUR it is cent."`.

### RestAPI Transfer Schemas

The following rules only apply to the API transfer schema definitions following the name pattern `[module_name]_rest_api.transfer.xml`.

- Must have a `description` for each field; This helps understand the data model and the internal usage of a fields value. F.e. `name="price" description="The base unit of a currency f.e. for the currency EUR it is cent."`.
- Should use the `example` attribute when applicable; This is used by the OpenAPI schema generator to provide possible usage examples for a field.
- Should use the `restRequestParameter` attribute when applicable with either of: `required`, `yes`, or `no`; This is used by the OpenAPI schema generator to show if a field is used in the request and if it is required or not.
- Should use the `restResponseParameter` attribute when applicable with either of: `required`, `yes`, or `no`; This is used by the OpenAPI schema generator to show if a field is used in the response and if it is required or not.

Further reading [Document Glue API resources](/docs/dg/dev/glue-api/latest/glue-api-tutorials/document-glue-api-resources.html)

</details>

#### Guidelines

`Transfer Objects` can be directly instantiated everywhere, not just via [Factory](#factory).

#### Examples

- BAPI resource names: `PickingListsBackendApiAttributes` for picking list, `PickingListItemsBackendApiAttributes` for picking list items.
- SAPI resource names: `PickingListsApiAttributes` for picking list, `PickingListItemsApiAttributes` for picking list items.

```xml
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

```text
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

A `Widget` is a reusable part of a webpage in the [Yves](#yves) application layer. `Widgets` provide functionality in a decoupled, modular, and configurable way.

#### Conventions

- A `Widget` needs to have a unique name across all features.

<details><summary>For *module development* and *core module development*</summary>

- A `Widget` needs to contain only lightweight, display related logic.
  - The `Widget` class needs to use the inherited [Factory](#factory) method to delegate complex logic or access additional data.
- `Widget` module can't appear as dependency because it's against the basic concept of optional widgets.
- Implementing a `Widget` needs to happen in a widget module.
- When a `Widget` call is implemented, take into account that a `Widget` is always enabled optionally.

</details>

#### Guidelines

- Widget modules can contain frontend components, like templates, atoms, molecules, or organisms, without defining an actual `Widget` class.
- The `Widget` class receives the input or rendering parameters via its constructor.


#### Examples

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

```text
[Organization]
└── Client
    └── [Module]
        └── Zed
            ├── [Module]Stub.php
            └── [Module]StubInterface.php
```

A `Zed Stub` is a class that defines interactions between [Yves](#yves) with [Glue](#glue) application layers and [Zed](#zed) application layer. Under the hood, the `Zed Stub` makes RPC calls to [Zed](#zed) application layer.

#### Conventions

- The `Zed Stub` call's endpoints need to be implemented in a [Zed application](#applications) [Gateway Controller](#gateway-controller) of the receiving module.
- `Zed Stubs` need to be a descendant of `\Spryker\Client\ZedRequest\Stub\ZedRequestStub`.

<details><summary>For *module development* and *core module development*</summary>

- The `Zed Stub` methods need to contain only delegation but no additional logic.
- `Zed Stub` methods need to be `public`.
- `Zed Stub` methods need to use [Transfer Objects](#transfer-object) as input and output parameters.
- `Zed Stub` methods need to add an `@uses` tag with the targeted [Gateway Controller](#gateway-controller) action in the docblock to enable easy code flow tracking.

</details>

#### Examples

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

## Core module development components

The following components are used in `core module development` to ensure modularity and customizability.
For `project development` and `module development`, these components are recommended. Consider implementing these components based on their relevance to your business or technical requirements.

### Conventions

- Components must be placed according to the corresponding [application layer's](#application-layers) directory architecture to take effect.
- The components must inherit from the [application layer's](#application-layers) corresponding abstract class in `Kernel` module to take effect.

<details><summary>For *core module development*</summary>

- Components must be extended directly from the [application layer's](#application-layers) corresponding abstract class in `Kernel` module.

</details>

### Guidelines

- Components should be stateless to be deterministic and easy to comprehend.

<details><summary>For *project development*</summary>

- It is recommended for each component to consider the conventions and guidelines of *module development* and *core module development* because they may offer solutions for long-term requirements or recurring issues.

</details>

<details><summary>For *module development* and *core module development*</summary>

- Components must be stateless to be deterministic and easy to comprehend.

</details>

### Bridge

```text
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

According to the Interface Segregation Principle, every module defines an interface for each external class it relies on. To decouple and encapsulate these dependencies effectively, `Bridges` are used. These `Bridges` serve to wrap dependencies such as [Facade](#facade-design-pattern), [Client](#facade-design-pattern), [Service](#facade-design-pattern), external library classes, and more. By doing so, a module explicitly declares its own requirements, enabling any class that implements the interface to be used. This approach facilitates seamless module decoupling, allowing both modules to evolve independently while maintaining a high degree of flexibility and maintainability.

#### Conventions

- The `Bridge` class needs to define and implement an interface that holds the specification of each `public` method. Mind the missing `bridge` suffix word in the interface name.

<details><summary>For *module development* and *core module development*</summary>

- `Bridges` must contain only the delegation logic to the friend method.
- The `Bridge` constructor can't have parameters to avoid coupling to a specific class.
- Bridge classes and interfaces need to declare input arguments and return values as strict as possible using valid types in alignment to their friend method. For example, there should be no `mixed`, no `x|y`.

</details>

#### Guidelines

- Bridge versus adapter: for simplification, we keep using bridge pattern even when adapting the earlier version of a core [facade](#facade-design-pattern). Adapters are used when the remote class' life cycle is independent to the core or there is a huge technical difference between the adaptee and adaptor.
- During `Bridge` definitions, type definition mistakes in remote [facades](#facade-design-pattern) become more visible. In these cases, be aware of the cascading effect of changing or restricting an argument type in [facades](#facade-design-pattern) when you consider such changes.
- [QueryContainer](#facade-design-pattern) and [Facade](#facade-design-pattern) dependencies are available only in the [Glue](#glue) application layers that have access to the database.

#### Examples

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

```text
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


- `Plugins` are classes that are used to realize Inversion Of Control: instead of a direct call to another module's [facade](#facade-design-pattern), a `plugin` can be provided as an optional and configurable class.
- `Plugins` are the only classes that can be instantiated across modules, normally via the [Dependency Provider](#dependency-provider).

See more details about the implementation in [Plugin Interface](#plugin-interface) component, and instantiation in [Dependency Provider](#dependency-provider).

#### Conventions

No general conventions.

<details><summary>For *module development* and *core module development*</summary>

- `Plugins` can't contain business logic but delegate to the underlying models, preferably via [Factory](#factory).
- `Plugin` method names need to contain `pre` and `post` instead of `before`, `after`.
- `Plugin` class names need to contain `pre`, `post`, `create`, `update`, and `delete`, instead of `creator`, `updater`, and `deleter`.
- `Plugin` classes need to implement a [Plugin Interface](#plugin-interface), which is provided by an `extension module`.

</details>

#### Guidelines

`Plugin` class name should be unique and give and overview about the behavior the `Plugin` delivers. Consider developers searching for a `Plugin` in a catalog across all features only by a plugin class name.

#### Examples

```php
  /**
    * @see /F/Q/N/FooDependencyProvider::getFooPlugins()
    * @see /F/Q/N/BarDependencyProvider::getBarPlugins()
    */
  class ZipZapPlugin extends AbstractPlugin implements FooPluginInterface, BarPluginInterface {}
```

### Plugin Interface

```text
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

#### Description

- Modules which consume [Plugins](#plugin) need to define their requirements with an interface.
- The `Plugin Interface` needs to be placed in an `extension module`.

There are three modules involved:

1. **Plugin definer** (aka **extension module**): The module that defines and holds the `Plugin Interface` (example: `CompanyPostCreatePluginInterface` in `CompanyExtension` module).
2. **Plugin executor**: The module that uses the [plugin or plugins](#plugin) in its [Dependency Provider](#dependency-provider) thus provides extension point (example: `CompanyDependencyProvider::getCompanyPostCreatePlugins()` in `Company` module)
3. **Plugin providers**: The modules that implement a [Plugin](#plugin) thus provide extension for the given extension point (example: `CompanyBusinessUnitCreatePlugin` in `CompanyBusinessUnit` module)

#### Conventions

No general conventions.

<details><summary>Conventions For *module development* and *core module development*</summary>

- `Plugin interfaces` need to be defined in extension modules.
  - `Extension modules` need to be suffixed with `Extension` and follow regular module architecture.
  - `Extension modules` can't contain anything else but `Plugin Interfaces` and [Shared application layer](#shared).
- `Plugin interface` methods need to receive input items as collection for scalability reasons.

</details>

#### Guidelines

- Operations on single items in plugin stack methods is not feasible, except for the following reasons:
  - it's strictly and inevitably a single-item flow.
  - the items go in FIFO order and there is no other way to use a collection instead.
- Plugin interface class specification should explain:
  - how the [Plugins](#plugin) will be used,
  - what are the typical use-cases of a [Plugin](#plugin).

#### Example

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
