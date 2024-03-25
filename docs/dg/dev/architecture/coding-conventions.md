{% info_block infoBox "Info" %}

This document serves as a dynamic resource intended to provide an overview of our conventions and guidelines. We acknowledge that the technology landscape is ever-evolving, and as such, this document is subject to continuous refinement and improvement.

Your feedback and suggestions are highly valued to enhance the accuracy, relevance, and effectiveness of Spryker Commerce Operating System (SCOS). We encourage you to contribute your insights and recommendations by proposing changes through our designated channels.

{% endinfo_block %}

# Documentation structure

## Development Use-Cases
Understanding the development scenarios in which Spryker Commerce Operating System (SCOS) can be utilized is crucial for maximizing its potential. We have outlined specific behaviors and guidelines tailored to different use-cases:

- **Project Development**: If you are developing a project, you will need to adhere to specific project development guidelines to ensure smooth integration.
- **Module Development**: Contributing 3rd-party reusable modules, boilerplates or accelerators requires additional considerations. We provide guidelines specific to this use-case to streamline your contributions. These guidelines are stricter than `Project Development`, as such functionalities should be re-usable on multiple projects in different contexts.
- **Core Module Development**: For those contributing to Spryker modules, there are specialised rules to follow within the module folders. This ensures consistency and compatibility across product lines based on SCOS Framework. These requirements are the strictest in order to be re-usable on multiple projects in different business verticals (B2C, B2B, Marketplace, Unified Commerce, etc.), and ensure stability of module API used by Spryker development ecosystem and community.

## Directive Classification
Throughout this documentation, you will encounter two types of directives:
- **Convention**: These are mandatory requirements that contributors must adhere to in order to enable specific SCOS features or ensure proper application responses.
- **Guideline**: While not mandatory, following these guidelines is highly recommended. Doing so promotes long-term code maintainability and facilitates smoother development processes.

# Applications
Spryker utilises application layers into applications to enable constructing the necessary application architecture for the specific business requirements to provide a quick project start, and long-term maintainability.
- Backend applications (eg: Zed, Backend API, Backend Gateway, Backoffice, GlueBackend, MerchantPortal, Console) typically use the Zed-, Glue-, Client-, Service-, and Shared application layers.
- Storefront applications (eg: Yves, Configurator, Glue, GlueStorefront, Console) typically use the Yves-, Glue-, Client-, Service- and Shared application layers.

# Application Layers
Spryker organises responsibilities/functionalities over a set of application layers (see [Conceptual Overview](https://docs.spryker.com/docs/dg/dev/architecture/conceptual-overview.html)) to enable flexible business logic orchestration across the applications.

The application layers are aggregations of layers (see [Modules and Application Layers](https://docs.spryker.com/docs/dg/dev/architecture/modules-and-application-layers.html)). Some application-layers are multi-layered and organising their components in layer directories, while others are flat-layered and merging their components in the same directory.
- **Glue**: is a **flat-layered** `Communication Layer`.
- **Client**: is a **flat-layered** `Communication Layer`.
- **Service**: is a **flat-layered**, overarching `Business Layer`.
- **Yves**: is a **flat-layered** `Presentation Layer` merged with `Communication Layer`.
- **Zed**: is a **multi-layered** of the 4 layers: `Presentation Layer`, `Communication Layer`, `Business Layer`, `Persistence Layer`.
- **Shared**: is a layer-overarching, stateless, abstraction library.

## Zed

`Zed` serves as the backend application layer responsible for housing all business logic, persisting data and backend UI (eg: backoffice).

```
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

Used components
- [Bridge](#bridge)
- [Config](#module-configurations)
- [Controller](#controller)
- [Dependency Provider](#dependency-provider)
- [Entity](#entity)
- [Entity Manager](#entity-manager)
- [Facade](#facade-design-pattern)
- [Factory](#factory)
- [Gateway Controller](#gateway-controller)
- [Layout](#layout)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Models](#model)
- [navigation.xml](#navigationxml)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Query Container](#facade-design-pattern)
- [Query Object](#query-object)
- [Repository](#repository)
- [Schema](#persistence-schema)

## Yves
`Yves` application layer provides a lightweight Shop Application.

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

Used components
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

## Glue

The `Glue` application layer serves as a conduit for providing data access points through APIs.
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

Used components
- [Bridge](#bridge)
- [Config](#module-configurations)
- [Controller](#controller)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)

## Client

`Client` is a lightweight application layer that handles all data access, such as
- Persistence access (such as Key-Value Storage (Redis), Search (Elasticsearch), Yves sessions),
- `Zed` as a data-source (RPC),
- 3rd party communication.

Note: Backend database access is an exception for performance streamlining.

```
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

Used components
- [Bridge](#bridge)
- [Client facade](#facade-design-pattern)
- [Config](#module-configurations)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Zed Stub](#zed-stub)

## Service

The `Service` application layer encapsulates a multipurpose library that can be utilized across various application layers, such as `Yves`, `Client`, `Glue` or `Zed` application layers.
A `Service` primarily consists of reusable lightweight stateless business logic components.
Due to its deployment across all applications, a `Service` is constrained to accessing data providers that are available universally (for instance, the backend database is not accessible from storefront applications by default).

```
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

Used components
- [Config](#module-configurations)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Service facade](#facade-design-pattern)

## Shared

The `Shared` library contains code and configuration that is designed to be utilized across any application layer and module.
The `Shared` library is intended to facilitate the sharing of code among various application layers and modules.
To ensure compatibility and versatility across different application architecture setups, any content within the `Shared` library must be free of application layer-specific elements. Therefore, the use of [Factories](#factory) is not permitted within the `Shared` library.

```
[Organization]
└── Shared
    └── [Module]
        ├── Transfer
        │   └── [module_name].transfer.xml
        ├── [Module]Constants.php
        └── [Module]Config.php
```

Used components
- [Config](#module-configurations)
- [Constants](#module-configurations)
- [Transfer](#transfer-object)

# Layers

An application layer can have up to four logical layers with clear purpose and communication rules.
- **Presentation Layer**: contains frontend assets (such as twig-templates, JS, CSS files, etc.)
- **Communication Layer**: contains controllers, console commands, forms, tables and plugins.
- **Business Layer**: contains the business logic of a module
- **Persistence Layer**: contains repository, entity manager, simple data mappers and the schema of entities.

## Presentation Layer responsibilities
- Responsible for handling the user interface (UI) presentation.
- Contains frontend assets, such as HTML, Twig templates, JavaScript (JS), TypeScript, Cascading Style Sheets (CSS) files, and so on.
- Handles user interactions and input validations on the client side.
- Interacts with the [Communication Layer](#communication-layer-responsibilities) to retrieve necessary data for display.

## Communication Layer responsibilities
- Acts as an intermediary between the [Presentation Layer](#presentation-layer-responsibilities) and the [Business Layer](#business-layer-responsibilities).
- Contains [controllers](#controller) responsible for handling HTTP requests and responses.
- Contains [plugins](#plugin) responsible for flexible, overarching requests and responses.
- Contains console commands.
- Manages form processing and validation.
- Handles [routing and dispatching requests](#provider--router) to appropriate [controllers](#controller).
- Interacts with the [Business Layer](#business-layer-responsibilities) to perform business operations.

## Business Layer responsibilities
- Contains the main business logic.
- Implements business rules and processes.
- Performs data manipulation, calculations, and validation.
- Interacts with the [Persistence Layer](#persistence-layer-responsibilities) to read and write data.

## Persistence Layer responsibilities
- Responsible for data storage and retrieval.
- Contains queries (via [Entity Manager](#entity-manager) or [Repository](#repository)), [entities](#entity) (data models), and [database schema definitions](#persistence-schema).
- Handles database operations such as CRUD (`Create`, `Read`, `Update`, `Delete`).
- Ensures data integrity and security.
- Maps database entities into business data transfer objects.

# Components

**Conventions**
- The components are required to be placed according to the corresponding [application layer’s](#application-layers) directory architecture in order to take effect.
- The components are required to inherit from the [application layer](#application-layers) corresponding abstract class in `Kernel` module to take effect.
- The components need to be stateless to be deterministic and easy to comprehend.

<details><summary markdown='span'>Additional Conventions for Module Development</summary>
- The components are required to be extended directly from the [application layer](#application-layers) corresponding abstract class in `Kernel` module.<br/>
</details>

## Controller

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
- Action methods are required to be suffixed with `Action` and be `public` in order to be accessible, and straight forward define the entry points of the `Controller`.

<details><summary markdown='span'>Additional Conventions for Module Development and Core Module Development</summary>
- Only action methods can be `public` for simplicity.<br/>
- Action methods need to have either no parameter or receive the `\Symfony\Component\HttpFoundation\Request` object to access system or request variables.<br/>
- Action methods are required to orchestrate [syntactical validation](#https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) before delegating to underlying processing layers.<br/>
- Action methods can not contain any logic directly that is outside the regular responsibilities of a `Controller` (see `description` above).
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

## Dependency Provider

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
- Only three type of methods can be defined, either `provide`, `get`, or `add`.
```php
function provide*Dependencies(Container $container)
function add[Dependency](Container $container)
function add[PluginInterfaceName]Plugins(Container $container)
function get[Dependency](Container $container)
function get[PluginInterfaceName]Plugins(Container $container)
```

<details><summary markdown='span'>Additional Conventions for Module Development and Core Module Development</summary>
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
- Dependency constant names should be descriptive and follow the `[COMPONENT_NAME]_[MODULE_NAME]` or `PLUGINS_[PLUGIN_INTERFACE_NAME]` pattern, with a name matching its value (see in example).
- Dependencies need to be wired through the target layer corresponding inherited method to be accessible via the corresponding [Factory](#factory):
```php
public function provideCommunicationLayerDependencies(Container $container)
public function provideBusinessLayerDependencies(Container $container)
public function providePersistenceLayerDependencies(Container $container)
public function provideDependencies(Container $container)
public function provideBackendDependencies(Container $container)
public function provideServiceLayerDependencies(Container $container)
```

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

## Entity

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

**3-tier class hierarchy**: The Propel generated 2-tier `Entity` class hierarchy is injected in the middle with a SCOS module abstract class to enable adding functionality from SCOS module level (see example below).

See [Propel Documentation - Active Record Class](#https://propelorm.org/documentation/reference/active-record.html)
See more details on domains in [Persistence Schema](#persistence-schema).

**Conventions**
- `Entity` base classes MUST NOT be defined manually but generated via [Persistence Schema](#persistence-schema). 
- `Entities` MUST be instantiated and used only from the [Entity Manager](#entity-manager) of the same module.
- `Entities` MUST NOT leak to any facade's level (as they are heavy, stateful, module specific objects).
- `Entities` MUST be implemented according to the 3-tier class hierarchy (see in description & example) to support extension from Propel and SCOS.
- `Entities` MUST use [Query Objects](#query-object) for database operations.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- The 3-tier class hierarchy is NOT applicable for database tables that are independent to SCOS features.
</details>

**Guidelines**
- A typical use-case is to define `preSave()` or `postSave()` methods in the `Entity` object.
- It is recommended to define manager classes instead of overloading the `Entity` with complex or context-specific logic.
- `Entities` should not leak outside the module's persistence layer.

**Example**

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

Persists [Entities](#entity) by using their internal saving mechanism.
The `Entity Manager` can be accessed from the same module's [business layer](#business-layer-responsibilities).

**Conventions**
- The entity manager class MUST define and implement an interface that holds the specification of each `public` method.
- Entity manager `public` methods MUST have a functionality describing prefix, such as `create*()`, `delete*()`, `update*()`.
- Creating, updating and deleting functions MUST be separated by concern even if they use overlapping internal methods.
- Entity manager methods MUST receive only [Transfer Objects](#transfer-object) as input parameters.
- Entity manager methods MUST return `void` or the saved object(s) as [Transfer Object(s)](#transfer-object).

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- It is recommended to NOT define or maintain `Entity Manager` interfaces.<br/>
- Methods can use also native php types as input argument or result value (although it is NOT recommended due it leads to granular methods).<br/>
- Solutions in `Entity manager` can consider to use raw SQL queries for performance reasons, but this will also remove all Propel ORM benefits (eg: triggering events, etc.), thus it should be used with caution.<br/>
</details>

## Facade design pattern

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

Spryker defines the facade design pattern as the primary entry point for layers following the [standard facade design pattern](#https://en.wikipedia.org/wiki/Facade_pattern).

There are currently four components that use the facade design pattern:
- The `Facade` is the API of [Business layer](#business-layer-responsibilities).
- The `Client` is the API of [Client application layer](#client), and acts as the only entry point to the [Client Application](#applications).
- The `Service` is the API of [Service application layer](#service), and represents the only entry point to the [Service Application](#applications).
- The `Query Container` is the API of [Persistence layer](#persistence-layer-responsibilities), and represents and entry point to database access. The more advanced and modular [Entity Manager](#entity-manager) and [Repository](#repository) pattern was introduced to counter the problems of cross-module leaks of `Query Container` concept.

The facade provides functionality for other layers and/or modules. The functionality behind the facade normally accesses the sibling functionality directly and not from the facade.

**Conventions**

- The inherited `getFactory()` MUST be used to instantiate the underlying classes.
- The methods MUST contain only the delegation to the underlying [model](#model).
  - Underlying classes MUST be instantiated using the inherited `getFactory()` factory access.
- All methods MUST be `public` and stand for an outsourced function.
- All methods MUST have [Transfer Objects](#transfer-object) or native types as argument and return value.
- Each facade class MUST define and implement an interface that holds the specification of each `public` method.
  - The specification is considered the semantic contract of the method - all significant behaviour MUST be highlighted.
- The methods MUST have descriptive name that describes the use-case and allows easy selection for readers (eg: `addToCart()`, `saveOrder()`, `triggerEvent()`).
- Multi-item-flow methods MUST 
  - receive a [Transfer Object](#transfer-object) collection as input with the following naming pattern `[DomainEntity]Collection[Request|Criteria|TypedCriteria|TypedRequest]Transfer`.
  - return a [Transfer Object](#transfer-object) collection with the following naming pattern `[DomainEntity][Collection|CollectionResponse]Transfer`.
  - declare the `Create` and `Update` CUD methods per entity as follows: `[create|update][DomainEntity]Collection([DomainEntity]CollectionRequestTransfer): [DomainEntity]CollectionResponseTransfer`
  - declare the `Delete` CUD method as follows: `delete[DomainEntity]Collection([DomainEntity]CollectionDeleteCriteriaTransfer): [DomainEntity]CollectionResponseTransfer;`
- Multi-item-flow `Create` and `Update` methods MUST
  - support the transactional entity manipulation, and document it in facade specification.
- New `QueryContainer` functionality MUST NOT be introduced but through the advanced [Entity Manager](#entity-manager) and [Repository](#repository) pattern.

__TBD__ (Note: Service is not serving data => no CRUD)

**Guidelines**
- Single-item-flow methods SHOULD be avoided as they are NOT scalable.
- Multi-item-flow methods SHOULD operate in batches to be scalable.
- Multi-item-flow `Create` and `Update` methods SHOULD return a list of entities + error list.

<details><summary markdown='span'>Additional Conventions for Boilerplate Development and Accelerator Development</summary>
- Instantiation can happen with other methods than `getFactory()` (eg: `new`, `create`, `make`, etc.).<br/>
</details>

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Instantiation can happen with other methods than `getFactory()` (eg: `new`, `create`, `make`, etc.).<br/>
- Definition of interface without purpose is NOT recommended. <br/>
- Specification of each method MUST be included in the facade class instead.
- `QueryContainers` can be used/developed further, but it is highly recommended to transition toward the [Entity Manager](#entity-manager) and [Repository](#repository) pattern.
</details>

<details><summary markdown='span'>Additional Conventions for Module Development</summary>
- All methods MUST add `@api`, and `{@inheritdoc}` tags on their method documentation. <br/>
- Single-item-flow methods MUST be avoided as they are NOT scalable.<br/>
- Multi-item-flow `Create` and `Update` methods MUST return a list of entities + error list.
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





## Factory

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
- `Factories` MUST NOT define/implement interface as practically they are never fully replaced.
- `Factories` MUST orchestrate the instantiation of objects in solitude (without reaching out to class-external logic).
- Factory methods MUST either instantiate one new object and named as `create[Class]()`, or wire the dependencies and named as `get[Class]()`.
- Factory methods MUST be `public`.
- Factory methods MUST use the constants defined in [dependency provider](#dependency-provider) when reaching out to module dependencies.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- `Factories` can define/implement interfaces on demand.<br/>
- Factory methods can instantiate and write dependencies in one step, but this case MUST be named as `get[Class]()`.<br/>
- Factory methods can have any access modifier.
</details>

## Gateway Controller

```
[Organization]
└── Zed
    └── [Module]
        └── Communication
            └── Controller
                └── GatewayController.php
```

**Description**

`Gateway Controller` is special, reserved `Controller` (see [Controllers](#controller)) in SCOS, that serves as an entry point in [Zed](#zed) for serving remote application [Client](#client) requests (see [Zed Stub](#zed-stub) for more details).

**Conventions**
- Gateway controller actions MUST define a single [transfer object](#transfer-object) as argument, and another/same [transfer object](#transfer-object) for return.
- `Gateway Controllers` follow the [Controller](#controller) conventions.

## Layout

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


## Mapper / Expander / Hydrator

**Description**

To differentiate between the recurring cases of data mapping, and to provide a clear separation of concerns, the following terms are introduced:
- `Mappers` are lightweight transforming functions that adjust one specific data structure to another in solitude (without the need of reaching out for additional data than the provided input).
  - `Persistance Mapper` stands for `Mappers` in [Persistence layer](#persistence-layer-responsibilities), typically transforming [propel entities](#entity), [entity transfers objects](#transfer-object), or generic [transfer objects](#transfer-object).
- `Expanders` are focusing on sourcing additional data into the provided input - restructuring may also happen.

**Conventions**
- `Mapper` methods MUST be named as `map[<SourceEntityName>[To<TargetEntityName>]]($sourceEntity, $targetEntity)`.
  - `Mappers` MUST be free of any logic other than structural.
    - `Mappers` MUST NOT have data resolving (eg: remote calls, database lazy load) logic as they are utilised in high-batch processing scenarios.
  - `Mappers` MAY have multiple source entities if it still does NOT violate structural-mapping-only directive.
  - `Mappers` MUST NOT use dependencies except [module configurations](#module-configurations), other `mappers`, or lightweight [Service calls](#facade-design-pattern).
  - `Persistence Mappers` MUST be in [Persistence layer](#zed) only and named as `[Entity]Mapper.php` or `[Module]Mapper.php`.
- `Expander` methods MUST be named as `expand[With<AdditionalDataExplainer>]($targetEntity)`.
- The `hydrator/hydration` keywords MUST NOT be used but instead `Mapper` or `Expander`.

**Guidelines**
- It is recommended to NOT define interface for `Persistence Mappers`.

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

## Model

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

- Each model class MUST define and implement an interface (`[ModelName]Interface.php`) that holds the specification of each `public` method.
- Dependencies MUST be injected via constructor.
  - `Models` MUST NOT instantiate any object but [Transfer Objects](#transfer-object).
- Dependencies MUST be referred/used/defined by interface.
- Dependencies MUST be from the same module, either `Models`, [Repository](#repository), [Entity Manager](#entity-manager), [Config](#module-configurations), or [Bridge wrapped facades](#bridge).
  - `Models` MUST NOT interact directly with other module's `Models` (eg: via inheritance, shared constants, instantiation, etc.).
- `Models` MUST be grouped under a folder by activity (eg: `Writers/ProductWriter.php`, `Readers/ProductReader.php`).
- `Models` MUST NOT be named using generic words, such as `Executor`, `Handler`, or `Worker`.
- `Model` methods MUST NOT be `private`.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Dependencies can be referred directly via class.
- It is recommended to NOT define interface for `Models` without project specific reason.
- Facades can be directly used as dependency, use of `Bridge` wrapping is NOT recommended without a project specific reason.
</details>

## Module Configurations

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

- `Module configuration`
  - Getter methods (prefixed with `get`) MUST be defined to retrieve configuration values, instead of accessing values via constants directly (this enables a more flexible extension structure, and an easier to control access tracking).
    - `Protected` constants MAY also be defined to support the getter methods (example: to enable cross-module referencing via `@uses`).
- `Environment configuration`
  - constants MUST be always `public` and have specification about their purpose.
  - constants MUST contain the same UPPERCASE value as the key is + properly prefixed with MODULE_NAME (see example below).

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- `Module configuration` constants can be defined with any access modifier.
- `Environment configuration` constants can be defined with any access modifier.
</details>

<details><summary markdown='span'>Additional Conventions for Boilerplate, Accelerator, and Module Development</summary>
- The module configuration relays exclusively on `static::` to support extension.
</details>

<details><summary markdown='span'>Guidelines for Module Development</summary>
- `Protected` items are NOT recommended in module configuration as they tend to create backward compatibility problems on project extensions.
</details>

**Example**

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


## Navigation.XML

```
[Organization]
└── Zed
    └── [Module]
        └── Communication              
            └── navigation.xml   
```

**Description**

Module entries of the Backoffice navigation panel.
The icons are taken from [Font Awesome Icons Library](#https://fontawesome.com/v4/).

**Example**
- The below example adds navigation elements, under the already existing `product` navigation element (defined in another module).
- The `pages` reserved node holds the navigation items.
- The navigation items are defined within a logical node (`configurable-bundle-templates`) according to business requirements.
- The `bundle` identifies in which `module` the processing `controller` is located.
- The `icon` is the [Font Awesome Icon](#https://fontawesome.com/v4/) name.
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

## Permission Plugin

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

- `Permission Plugins` MUST implement `\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface`.
- `Permission Plugins` MUST adhere to [Plugin](#plugin) conventions.

**Guidelines**
- When using one of the traits in a [Model](#model), use a `protected` constant string to reference the `Permission Plugin` that will be used in the [Model](#model). As an annotation for this string you should add `@uses` annotation to the `PermissionPlugin::KEY` string that you will compare against (see in example below).
- The `\Spryker\[Application]\Kernel\PermissionAwareTrait` trait allows the [Model](#model) in the corresponding [application](#applications) to check if a permission is granted to an application user.


<details><summary markdown='span'>Additional Guidelines for Project Development</summary>
- When using one of the traits in a [Model](#model), refer directly to the remote `Permission Plugin` key string when possible, instead of defining a local constant.
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

## Persistence Schema

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

The schema file defines the module's tables and columns (see [Propel Documentation - Schema XML](#https://propelorm.org/documentation/reference/schema.html)). Schema files are organized into business `domains`, each representing a module overarching group that encapsulates related domain entities.

**Conventions**

- Table name MUST follow the format `spy_[domain_entity_name]` for business entities, `spy_[domain_entity_name]_to_[domain_entity_name]` for relations, `spy_[domain_entity_name]_search` for Search entities, and `spy_[domain_entity_name]_storage` for Storage entities  (eg: `spy_customer_address`, `spy_customer_address_book`, `spy_cms_slot_to_cms_slot_template`, `spy_configurable_bundle_template_image_storage`, `spy_configurable_bundle_template_page_search`).
- Tables MUST have an integer ID primary key, following the format `id_[domain_entity_name]` (eg: `id_customer_address`, `id_customer_address_book`).
- Table foreign key column MUST follow the format `fk_[remote_entity]` (eg: `fk_customer_address`, `fk_customer_address_book`)
  - Exception can be to the case if the same table is referred multiple times, in which case the follow-up foreign key columns MUST be named as `fk_[custom_connection_name]` .
- Table foreign key definitions MUST include the `phpName` attribute.
- The `uuid` field MUST be defined and used for external communication to uniquely identify records and hide possible sensitive data (eg: `spy_order` primary key gives information about submitted order count).
  - The field MAY be `null` by default.
  - The field MUST be eventually unique across the table (until the unique value is provided, the business logic MAY NOT operate appropriately).

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- The table prefix (`spy_`) can be chosen freely if compatibility with SCOS features is not desired.
- Schema file prefix (`spy_`) can be freely chosen if compatibility with SCOS features is not desired.
</details>

**Guidelines**
- `PhpName` is usually the CamelCase version of the "SQL name" (eg: `<table name="spy_customer" phpName="SpyCustomer">`).
- A module (eg: `Product` module) may inject columns into a table which belong to another module (eg: `Url` module). This case is usually used if the direction of a relation is opposed to the direction of the dependency. For this scenario, the injector module will contain a separate, foreign module schema definition file (eg: `Product` module will contain `spy_url.schema.xml` next to `spy_product.schema.xml` that defines the injected columns into the `Url` `domain`) (see below in examples).
- The `database` element's `package` and `namespace` attributes describe for generation the placement and namespace of generated files.

**Example**

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

## Provider / Router

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

`Providers` and `Routers` are used during the bootstrap of [Yves](#applications) application. There are three types of them:
- **Controller Provider** - Registers [Yves](#applications) [Controllers](#controller) of a module and binds them to a path.
- **Router** - Resolves a path into a [Yves](#applications) [Controller and Action](#controller).

Controllers in `Zed` application layer are autowired and do not require manual registration. An `ExampleController::indexAction()` in `ExampleModule` can be accessed via `/example-module/example/index` URI.

**Conventions**
- A `Controller Provider` MUST extend `\SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider`.
- A `Router` MUST extend `\SprykerShop\Yves\ShopRouter\Plugin\Router\AbstractRouter`.
- A provider is classified as a [Plugin](#plugin) and so the plugin's conventions apply.

## Query Object

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

See [Propel Documentation - Query Class](#https://propelorm.org/documentation/reference/model-criteria.html)
See more details on the 3-tier class hierarchy in [Entity](#entity), and domains in [Persistence Schema](#persistence-schema).

**Convention**

- Hidden, hard dependencies appearing through `join` MUST be defined via `@module [RemoteModule1][,[...]]` tag (see example below).

**Example**

In the below example, the `SpyProductQuery` is part of the `Product` `domain` while `SpyUrl` belongs to `Url` `domain` and `SpyProductComment` belongs to `ProductComment` `domain`.

```php
  /**
   * @module Url,ProductComment
   */
  public function exampleMethod()
  {
      $query = new SpyProductQuery();
      $query
        ->joinSpyUrl()
        ->joinSpyProductComment();
      ...
  }
```


## Repository

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
The `Repository` can be accessed from the same module's [Communication](#communication-layer-responsibilities) and [Business Layers](#business-layer-responsibilities).

**Conventions**

- The `Repository` class MUST define and implement an interface (`[Model]RepositoryInterface.php`) that holds the specification of each `public` method.
- `Public` methods MUST receive and return [Transfer Objects](#transfer-object) only.
- The methods MUST return with a collection of items or a single item (eg: using and wrapping the results of `find()` or `findOne()`).
- `Repositories` MUST use [Query Objects](#query-object) to retrieve data from the database.
- `Repostiories` MUST NOT alter the data in the database, only retrieve it.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Methods can use native PHP types as input arguments or result values, although this is not recommended as it leads to granular methods.
</details>

## Theme

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

SCOS implements the concept of [atomic web design](#https://bradfrost.com/blog/post/atomic-web-design/).

[Yves application layer](#yves) provides only 1-level theme inheritance: `current theme` > `default theme`.
- **Current theme**: a single theme defined on a project level (eg: `b2b-theme`, `b2c-theme`).
- **Default theme**: a theme provided by default and used in the `boilerplate implementations`. Used for incremental project updates (start from default and change frontend components one-by-one) and a graceful fallback in case SCOS delivers a new functionality that does not have own frontend in a project.
A `Theme` may contain `views`, `templates`, or `components` (`atoms`, `molecules`, or `organisms`).
- **Views**: are the templates for the [Controllers](#controller) and [Widgets](#widget).
- **Templates**: are reusable templates, such as page [Layouts](#layout).
- **Components**: are reusable parts of the UI, further divided into `atoms`, `molecules`, and `organisms`.


## Transfer Object

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
- `Transfer Objects` MUST be defined in the transfer XML file.
- **Backend API module** transfer names MUST use plural entity name with `BackendApiAttributes` suffix.
- **Storefront API module** transfer names MUST use plural entity name with `Api` suffix.
- `EntityTransfers` MUST NOT be defined manually but rather will be generated automatically based on [Peristence Schema](#persistence-schema) definitions.
- A module can only use those `Transfer Objects` and their properties which are declared in the same module (transfer definitions accessed through composer dependencies are considered as violation).

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Module may use any transfer object.
</details>

**Guidelines**
- They can be instantiated directly anywhere (not just via [Factory](#factory)).

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

## Widget

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
- A `Widget` MUST contain only lightweight, display related logic.
  - `Widget` MUST use [Factory](#factory) to execute complex logic or access additional data.
- A `Widget` MUST have a unique name across SCOS features.
- When `Widget` call is implemented, it MUST be considered that a `Widget` is always optionally enabled.
- A `Widget` MUST NOT implement an interface.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- `Widget` can be considered present (not optional), and called accordingly.
</details>

<details><summary markdown='span'>Additional Conventions for Module Development</summary>
- `Widget` module MUST NOT appear as dependency (as it goes against the basic concept of the optional widgets).<br/>
- Implementing a widget MUST happen in a widget module.
</details>

**Guidelines**
- Widget modules can contain only frontend components (templates, atoms, molecules, organisms, etc.) without widget class.<br/
- The widget class receives the input/rendering parameters via its constructor.

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

## Zed Stub

```
[Organization]
└── Client
    └── [Module]
        └── Zed
            ├── [Module]Stub.php
            └── [Module]StubInterface.php
```

**Description**

A `Zed Stub` is a class which defines interactions between [Yves application layer](#yves) (or [Glue application layer](#glue)) and [Zed application layer](#zed). Under the hood, the `Zed Stub` makes RPC calls to [Zed application layer](#zed).

**Conventions**
- The `Zed Stub` call's endpoints MUST be implemented in a [Zed application](#applications) [GatewayController](#gateway-controller) of the receiving module.
- The `Zed Stub` methods MUST contain only delegation but no additional logic.
- `Zed Stub` methods MUST be `public`.
- `Zed Stub` methods MUST use [Transfer Objects](#transfer-object) as input and/or output parameter.
- `Zed Stub` methods MUST add a `@uses` tag with the targeted [GatewayController](#gateway-controller) action in the docblock to enable easy code flow tracking.
- `Zed Stub` MUST be a descendant of `\Spryker\Client\ZedRequest\Stub\ZedRequestStub`.

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

# Core Module Development Components

The components below are essential in `core module development` for the purpose of modularity and customisability. For `project development` and `module development` these components are recommended on need to have basis (consider implementing these components based on their relevance to your business or technical requirements).

**Conventions**
- The components are required to be placed according to the corresponding [application layer’s](#application-layers) directory architecture in order to take effect.
- The components are required to be extended directly from the [application layer](#application-layers) corresponding abstract class in `Kernel` module.
- The components need to be stateless to be deterministic and easy to comprehend.

## Bridge

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
- `Bridges` must contain only the delegation logic to the friend method.
- The `Bridge` constructor can not have parameters to avoid coupling to a specific class.
- `Bridge` classes and interfaces need to be declared as strict as possible for input arguments and returns values, compared to their friend method with valid types (no `mixed`, no `x|y`).

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

## Plugin

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
- `Plugins` can not contain business logic but delegate to the underlying [facade](#facade-design-pattern).
- `Plugin` method names need to use words `pre` and `post` instead of `before`, `after`.
- `Plugin` class names need to use words `pre`, `post`, `create`, `update`, `delete`, instead of `creator`, `updater`, `deleter`.
- `Plugin` classes need to implement a [Plugin Interface](#plugin-interface) which is provided by an `extension module`.

**Guidelines**
- `Plugin` class name should be unique and give and overview about the behaviour that the `Plugin` delivers (consider developers searching a `Plugin` in a catalog across SCOS features only by plugin class name).

**Example**

```php
  /**
    * @see /F/Q/N/FooDependencyProvider::getFooPlugins()
    * @see /F/Q/N/BarDependencyProvider::getBarPlugins()
    */
  class ZipZapPlugin extends AbstractPlugin implements FooPluginInterface, BarPluginInterface {}
```

## Plugin Interface

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
- `Plugin interfaces` need to be defined in extension modules.
  - `Extension modules` need to be suffixed with `Extension` and follow regular module architecture.
  - `Extension modules` can not contain anything else but `Plugin Interfaces` and [Shared application layer](#shared).
- `Plugin interface` methods need to receive input items as collection for scalability reasons.

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
