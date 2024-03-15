# Table of Content

# Documentation structure

## Development Use-Cases
Understanding the development scenarios in which Spryker Commerce Operating System (SCOS) can be utilized is crucial for maximizing its potential. We have outlined specific behaviors and guidelines tailored to different use-cases:

- Project Development: If you are developing a project, you will need to adhere to specific project development rules to ensure smooth integration.
- Boilerplate and Accelerator Contribution: Contributing to boilerplates or accelerators requires additional considerations. We provide guidelines specific to this use-case to streamline your contributions.
- Module Contribution: For those contributing to modules, there are specialized rules to follow within the module folders. This ensures consistency and compatibility across SCOS.

## Directive Classification
Throughout this documentation, you will encounter two types of directives:
- Convention: These are mandatory requirements that contributors must adhere to in order to enable specific SCOS features or ensure proper application responses.
- Guideline: While not mandatory, following these guidelines is highly recommended. Doing so promotes long-term code maintainability and facilitates smoother development processes.

# Applications
Spryker utilises application layers into applications to enable constructing the necessary application architecture for the specific business requirements to provide a quick project start, and long-term maintainability.
- Backend applications (eg: Zed, Backend API, Backend Gateway, Backoffice, GlueBackend, MerchantPortal) typically use the Zed-, Glue-, Client-, Service-, and Shared application layers.
- Storefront applications (eg: Yves, Configurator, Glue, GlueStorefront) typically use the Yves-, Glue-, Client-, Service- and Shared application layers.

# Application Layers
Spryker organises responsibilities/functionalities over a set of application layers (see [Conceptual Overview](https://docs.spryker.com/docs/dg/dev/architecture/conceptual-overview.html)) to enable flexible business logic orchestration across the applications.

The application layers are aggregations of layers (see [Modules and Application Layers](https://docs.spryker.com/docs/dg/dev/architecture/modules-and-application-layers.html))
- Zed: is a **multi-layer composition** of the 4 layers: Presentation Layer, Communication Layer, Business Layer, Persistence Layer
- Yves: is a **single-layered** Presentation Layer merged with Communication Layer.
- Glue: is a **single-layered** Communication Layer.
- Client: is a **single-layered** Communication Layer.
- Service: is a **single-layered**, overarching Business Layer.
- Shared: is a layer-overarching, stateless, abstraction library.

## Zed

Zed serves as the backend application layer responsible for housing all business logic and persisting data.
```
[Organization]
└── Zed
    └── [Module]
        ├── Presentation
        │   ├── _layout
        │   │   └── layout.twig
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
        │   │       └── [Name]Plugin.php
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
        │   ├── Installer
        │   │   ├── [Module]InstallerInterface.php
        │   │   └── [Module]Installer.php        
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
        │           └── [table_prefix].schema.xml
        │
        ├── Dependency
        │   ├── Facade
        │   │   ├── [Module]To[Module]FacadeBridge.php
        │   │   └── [Module]To[Module]FacadeInterface.php
        │   └── Plugin
        │       └── [Name]PluginInterface.php
        │                
        ├── [Module]Config.php
        └── [Module]DependencyProvider.php
```
Used components
- [Bridge](#bridge)
- [Config](#module-configuration)
- [Controller](#controller)
- [Dependency Provider](#dependency-provider)
- [Entity](#entity)
- [Entity Manager](#entity-manager)
- [Facade](#facade)
- [Factory](#factory)
- [Gateway Controller](#gateway-controller)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Models](#model)
- [navigation.xml](#navigationxml)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Query Container](#query-container-facade)
- [Repository](#repository)
- [Schema](#persistence-schema)

← [Back to Application Layers](#application-layers)


## Yves
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
        │   └── Plugin
        │       └── [Name]PluginInterface.php
        ├── Plugin
        │   ├── Provider
        │   │   ├── [Name]ControllerProvider.php
        │   │   └── [Name]ServiceProvider.php
        │   └── [ConsumerModule]
        │       └── [Name]Plugin.php
        ├── Theme
        │   └── [default]
        │       ├── components
        │       │   │── organisms
        │       │   │   └── [name]
        │       │   │── atoms
        │       │   │   └── [name]
        │       │   └── molecules
        │       │       └── [name]
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
- [Config](#module-configuration)
- [Controller](#controller)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Provider / Router](#provider--router)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Theme](#theme)
- [Widget](#widget)

← [Back to Application Layers](#application-layers)

## Glue

The Glue application layer serves as a conduit for providing data access points through APIs.
It acts as an interface for external systems to interact with the application's data.

```
[Organization]
└── Glue
    └── [Module]
        ├── Controller
        │   └── [Name]Controller.php
        ├── [CustomDirectory]
        │   ├── [ModelName]Interface.php
        │   └── [ModelName].php        
        ├── Dependency
        │   ├── Client
        │   │   ├── [Module]To[Module]ClientBridge.php
        │   │   └── [Module]To[Module]ClientInterface.php
        │   └── Plugin
        │       └── [Name]PluginInterface.php
        ├── Plugin
        │   ├── Provider
        │   │   ├── [Name]ControllerProvider.php
        │   │   └── [Name]ServiceProvider.php
        │   └── [ConsumerModule]
        │       └── [Name]Plugin.php
        ├── [Module]Config.php
        ├── [Module]DependencyProvider.php
        └── [Module]Factory.php
```

Used components
- [Bridge](#bridge)
- [Config](#module-configuration)
- [Controller](#controller)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)

← [Back to Application Layers](#application-layers)

## Client

A lightweight application layer that handles all data access, such as
- Persistence access (such as Key-Value Storage (Redis), Search (Elasticsearch)),
- Yves Sessions,
- Zed as a data-source (RPC),
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
        │   └── Plugin
        │       └── [Name]PluginInterface.php            
        ├── Plugin
        │   └── [ConsumerModule]
        │       └── [Name]Plugin.php
        ├── Zed
        │   ├── [Module]Stub.php
        │   └── [Module]StubInterface.php
        ├── [CustomDirectory]
        ├── [Module]ClientInterface.php
        ├── [Module]Client.php
        ├── [Module]Config.php
        ├── [Module]DependencyProvider.php
        └── [Module]Factory.php
```

Used components
- [Bridge](#bridge)
- [Client facade](#client-facade)
- [Config](#module-configuration)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Plugin](#plugin), [Plugin Interface](#plugin-interface)
- [Zed Stub](#zed-stub)

← [Back to Application Layers](#application-layers)

## Service

The Service layer encapsulates a multi-purpose library that can be utilized across various application layers, such as Yves or Zed application layers.
A Service primarily consists of reusable lightweight stateless business logic components.
Due to its deployment across all applications, a Service is constrained to accessing data providers that are available universally. For instance, the backend database is not accessible from storefront applications by default.

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
- [Config](#module-configuration)
- [Dependency Provider](#dependency-provider)
- [Factory](#factory)
- [Mapper / Expander / Hydrator](#mapper--expander--hydrator)
- [Model](#model)
- [Service facade](#service-facade)

← [Back to Application Layers](#application-layers)

## Shared

The Shared library contains code that is designed to be utilized across different application layers and modules.
The Shared library is intended to facilitate the sharing of code among various application layers and modules.
To ensure compatibility and versatility across different application architecture setups, any content within the Shared library must be free of application layer-specific elements. Therefore, the use of factories is not permitted within the Shared library.

```
[Organization]
└── Shared
    └── [Module]
        ├── Transfer
        │   └── [module].transfer.xml
        ├── [Module]Constants.php
        └── [Module]Config.php
```
Used components
- [Config](#module-configuration)
- [Constants](#module-configuration)
- [Transfer](#transfer-object)

← [Back to Application Layers](#application-layers)

# Layers

An application layer can have four logical layers with clear purpose and communication rules.
- **Presentation Layer**: contains twig-templates, JS and CSS files
- **Communication Layer**: contains controllers, forms, tables and plugins
- **Business Layer**: contains the business logic of a module
- **Persistence Layer**: contains queries, entities and the schema of a module

## Presentation Layer responsibilities
- Responsible for handling the user interface (UI) presentation.
- Contains Twig templates, JavaScript (JS), and Cascading Style Sheets (CSS) files.
- Handles user interactions and input validations on the client side.
- Interacts with the [Communication Layer](#communication-layer-responsibilities) to retrieve necessary data for display.

## Communication Layer responsibilities
- Acts as an intermediary between the [Presentation Layer](#presentation-layer-responsibilities) and the [Business Layer](#business-layer-responsibilities).
- Contains [controllers](#controller) responsible for handling HTTP requests and responses.
- Contains [plugins](#plugin) responsible for flexible, overarching requests and responses.
- Manages form processing and validation.
- Handles [routing and dispatching requests](#provider--router) to appropriate [controllers](#controller).
- Interacts with the [Business Layer](#business-layer-responsibilities) to perform business operations.

## Business Layer responsibilities
- Contains the main business logic.
- Implements business rules and processes.
- Performs data manipulation, calculations, and validation.
- Interacts with the [Persistence Layer](#persistence-layer-responsibilities) to read and write data.
- Independent of the user interface and communication protocols.

## Persistence Layer responsibilities
- Responsible for data storage and retrieval.
- Contains queries (via [Entity Manager](#entity-manager) or [Repository](#repository)), [entities](#entity) (data models), and [database schema definitions](#persistence-schema).
- Handles database operations such as CRUD (`Create`, `Read`, `Update`, `Delete`).
- Ensures data integrity and security.
- Interacts with the [Business Layer](#business-layer-responsibilities) to provide data access for business operations.

# Components

**Conventions**
- The components MUST be placed according to the corresponding application layer’s directory architecture (see [Application Layers](#application-layers)) in order to come in effect.
- The components MUST be extended from the application-layer corresponding abstract class in `Kernel` module, or from the extended class.
- The components MUST be stateless to be deterministic and easy to comprehend.

<details><summary markdown='span'>Additional Conventions for Module Development</summary>
- The components MUST be extended __only__ from the application-layer corresponding abstract class in `Kernel` module.<br/>
</details>

## Client facade
**Description**

The `Client` is the internal API of [Client application layer](#client), and represents the only entry point to the [Client Application](#applications).
The `Client` follows the [facade design pattern](#facade-design-pattern).

There are domain entity specific `Clients` like `CatalogClient`, `CartClient`, `SalesClient`, etc. and there are four generic `Clients` `SearchClient`, `SessionClient`, `StorageClient` and `ZedClient`.

**Conventions**
- Naming: `[Module]Client.php`.
- Additionally, the [facade design pattern](#facade-design-pattern) conventions apply.

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


## Controller

**Description**

Application access point for any kind of HTTP communication with end-users or other applications.

Responsibilities of a controller are
- to adapt the received input data to the underlying layers (syntactical validation, delegation),
- delegate the processing of the input data,
- and to adapt the results of processing to the expected output format (eg: add flash messages, set response format, trigger redirect).

**Conventions**
- Naming: `[ControllerName]Controller.php::[actionName]Action()`
  - The `Gateway` controller name is reserved for the `Gateway Controller` behaviour (see [Gateway Controller](#gateway-controller)).
  - The `Index` controller name is reserved for the default controller, which serves as the default controller during request controller resolution.
  - The `index` action name is reserved for the default action during request action resolution.
- `Public` methods are considered as an `Action` and therefore MUST use the `Action` suffix.
- Action methods MUST have either no parameter or receive the `\Symfony\Component\HttpFoundation\Request` object to access system or request variables.
- Received data MUST be [syntactically validated](#https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- `Public` methods can be non-action.<br/>
- Action method parameters can be freely chosen, and can access system or request parameters in any preferred way.<br/>
</details>

**Guideline**
- Actions should not contain any logic that is outside the regular responsibilities of a `Controller` (see `Controller` description above).
- `Controller` has an inherited `castId()` method that should be used for casting numerical IDs.

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

**Description**

Injects required dependencies to a module layer. Typically, these are [facades](#facade-design-pattern) or [plugins](#plugin).

**Conventions**
- Naming: `[Module]DependencyProvider.php`
- Dependencies MUST be wired through the layer corresponding inherited method:
```php
public function provideCommunicationLayerDependencies(Container $container)
public function provideBusinessLayerDependencies(Container $container)
public function providePersistenceLayerDependencies(Container $container)
public function provideDependencies(Container $container)
public function provideBackendDependencies(Container $container)
public function provideServiceLayerDependencies(Container $container)
```
- Only three type of methods MUST be defined, either `public provide*(Container $container)`, `protected get*(Container $container)`, or `protected add*(Container $container)`.
  - Each `provide*()` method MUST
      - call its parent `provide*()` method,
      - and call only `add*()` methods.
  - Each `add*()` method MUST only introduce one dependency to the `Container` (a plugin-stack is considered one dependency in this respect).
      - Setting dependency using the `container::set()` MUST be paired with late-binding closure definition to decouple instantiation.
  - Each `get*()` method MUST actually source the corresponding dependency.
      - Plugin sourcing methods MUST be named as `get[PluginInterfaceName]Plugins(Container $container)`.
- All constants MUST be `public` (to decrease conflicts in definition for being a public API class).
  - Each dependency MUST be defined using a class constant.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Constants can have any access modifier, they are not limited to `public`. <br/>
- Methods can have any access modifier. <br/>
- `provide*()` methods can call other methods than `add*()`. <br/>
- `add*()` methods can introduce more dependency to the `Container`.<br/>
- The `Container $container` argument can be introduced on need-to-have basis instead of being always mandatory.
</details>

<details><summary markdown='span'>Additional Conventions for Module Development</summary>
- [Facades](#facade-design-pattern) are always wrapped into a [Bridge](#bridge) to avoid coupling another module.<br/>
- [Plugins](#plugin) are never wired on module level.<br/>
- [Plugin](#plugin) defining methods MUST be tagged with `@api` tag as they are considered module API. <br/>
</details>


**Examples**
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

**Description**

Active record object which represents a row in a table. `Entities` have getter and setter methods to access the underlying data.
Each `Entity` has a generated identical [Entity Transfer Object](#transfer-object) which can be used during interaction with other layers.
Each database table definition results as the creation of an `Entity` by Propel, into the `src/Orm` directory.

**3-tier class hierarchy**: The Propel generated 2-tier `Entity` class hierarchy is injected in the middle with a SCOS module class to enable adding functionality on SCOS module level (see example below).

See [Propel Documentation - Active Record Class](#https://propelorm.org/documentation/reference/active-record.html)

**Conventions**
- `Entity` base classes MUST NOT be defined manually but generated via [Persistence Schema](#persistence-schema). 
- `Entities` MUST be instantiated and used only from the [Entity Manager](#entity-manager) of the same module.
- `Entities` MUST NOT leak outside the module's persistence layer (as they are heavy, stateful, module specific objects).
- `Entities` MUST be implemented according to the 3-tier class hierarchy (see in description & example) to support extension from Propel and SCOS.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- The 3-tier class hierarchy is NOT applicable for database tables that are independent to SCOS features.
</details>

**Guidelines**
- A typical use-case is to define `preSave()` or `postSave()` methods in the `Entity` object.
- It is recommended to define manager classes instead of overloading the `Entity` with complex or context-specific logic.

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

**Description**

Persists [Entities](#entity) by using their internal saving mechanism.
The `Entity Manager` can be accessed from the same module's business layer.

**Conventions**
- Naming: `[Module]EntityManager.php`.
- The repository class MUST define and implement an interface (`[Model]EntityManagerInterface.php`) that holds the specification of each `public` method.
- Public methods MUST have a functionality describing prefix, such as `create*()`, `delete*()`, `update*()`
- Creating, updating and deleting functions MUST be separated by concern even if they use overlapping internal methods.
- Only [Transfer Objects](#transfer-object) MUST be used as input parameters.
- Methods MUST return `void` or the saved object as [Transfer Object](#transfer-object).

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- It recommended to NOT define or maintain entity manager interfaces unless there is a justified reason.<br/>
- Methods MAY use also native php types as input argument or result value (although it is NOT recommended due it leads to granular methods).
</details>

## Facade

**Description**

The Facade is the internal API of `Bussiness layer`.
The Facade follows the [facade design pattern](#facade-design-pattern).

**Conventions**
- Naming: `[Module]Facade.php`
- Additionally, the [facade design pattern](#facade-design-pattern) conventions apply

**Example**

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

## Facade design pattern
**Description**

Spryker defines the facade design pattern as the primary entry point for layers following the [standard facade design pattern](#https://en.wikipedia.org/wiki/Facade_pattern).

There are currently four components that use the facade design pattern:
- The [Facade](#facade) component that is the facade of the `Business layer`.
- The [Client](#client-facade) facade component that is the facade of the `Client application layer`.
- The [Service](#service-facade) facade component that is the facade of the `Service application layer`.
- The [Query Container](#query-container-facade) facade component that is an overarching facade of the `Persistence layer`.

The facade provides functionality for other layers and/or modules. The functionality behind the facade normally accesses the sibling functionality directly and not from the facade.

**Conventions**

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

__TBD__ (Note: Service is not serving data => no CRUD)

**Guidelines**
- The methods MAY throw exceptions.
- Single-item-flow methods SHOULD be avoided as they are NOT scalable.
- Multi-item-flow methods SHOULD operate in batches to be scalable.
- Multi-item-flow `Create` and `Update` methods SHOULD return a list of entities + error list.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Definition of interface is NOT recommended. <br/>
- Specification of each method MUST be included in the facade class instead.
</details>

<details><summary markdown='span'>Additional Conventions for Module Development</summary>
- All methods MUST add `@api`, and `{@inheritdoc}` tags on their method documentation. <br/>
- Single-item-flow methods MUST be avoided as they are NOT scalable.
</details>

## Factory

**Description**

The responsibility of a factory is to instantiate and to wire up the classes of a module.
Factories do NOT define/implement interface as practically they are never fully replaced. 

**Conventions**
- The factory MUST orchestrate the instantiation of objects in solitude (without reaching out to class-external logic).
- The methods MUST either instantiate one new object and named as `create[Class]()`, or wire the dependencies and named as `get[Class]()`.
- All methods MUST be `public`.
- The method MUST use the constants defined in [dependency provider](#dependency-provider) when reaching out to dependencies.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Methods can have any access modifier.
</details>

## Gateway Controller

**Description**

`Gateway Controller` is special, reserved controller (see [Controllers](#controller)) in SCOS, that serves as an entry point in `Zed` for serving `Client` requests (see [Zed Stub](#zed-stub) for more details).

**Conventions**
- `Gateway Controller` actions MUST define a single [transfer object](#transfer-object) as argument, and another/same [transfer object](#transfer-object) for return.

## Mapper / Expander / Hydrator

**Description**

To differentiate between the recurring cases of data mapping, and unify naming, this convention aligns the terminology with intensions.

`Persistance mapper` stands for a `mapper` that transforms [propel entity](#entity) or [entity transfers object](#transfer-object) into generic [transfer objects](#transfer-object).

**Conventions**
- Transforming / appending the provided data into another structure, is considered a `mapper` and the method MUST be named as `map[<SourceEntityName>[To<TargetEntityName>]]($sourceEntity, $targetEntity)`.
  - Mappers MUST be free of any business logic, only mapping logic is allowed.
  - Mapping MAY have multiple source entities if it still does NOT violate mapping-only directive.
  - Mappers MUST NOT have data resolving (eg: remote calls, database lazy load) logic as they are utilised in high-batch processing scenarios.
  - Mappers MUST NOT use dependencies or restrict to [module configuration](#module-configuration), other `mappers`, or lightweight [Services](#service-facade).
  - `Persistence mappers` MUST be in [Persistence layer](#zed) only and named as `[Module|Entity]Mapper.php`.
- Retrieving and appending additional data into the existing data structure, is considered an `expander` and the method MUST be named as `expand[With<AdditionalDataExplainer>]($targetEntity)`.
- The `hydrator/hydration` keywords MUST NOT be used but instead `mapper` or `expander`.

**Guidelines**
- It is recommended to NOT define interface for `Persistence mappers`.

## Model

**Description**

Models hold logic. Models MAY appear on multiple layers, the content must fit the corresponding [layer's responsibility](#layers).
- [Communication layer](#application-layers) models are present in [Yves](#yves), [Glue](#glue), [Client](#client).
- [Business layer](#application-layers) models are present in [Zed](#zed), [Service](#service).
- [Persistence layer](#application-layers) models are present in [Zed](#zed).

**Conventions**

- Each model class MUST define and implement an interface (`[ModelName]Interface.php`) that holds the specification of each `public` method.
- Dependencies MUST be injected via constructor.
  - Models MUST NOT instantiate any object but [Transfer Objects](#transfer-object).
- Dependencies MUST be referred by interface.
- Dependencies MUST be from the same module, either `models`, [Repository](#repository), [Entity Manager](#entity-manager), [Config](#module-configuration), or [Bridge wrapped facade](#bridge).
  - Models MUST NOT interact directly with other module's models (eg: via inheritance, shared constants, instantiation, etc.).
- Models MUST be grouped under a folder by activity (eg: `Writers/ProductWriter.php`, `Readers/ProductReader.php`).
- Models MUST NOT be named using generic words, such as `Executor`, `Handler`, or `Worker`.
- Model methods MUST NOT be `private`.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Dependencies can be referred directly via class.
</details>

## Module Configuration

**Description**
- **Module configuration**: module specific, environment independent configuration in `[Module]Config.php.`
- **Environment configuration**: configuration keys in `[Module]Constants.php` that can be controlled per environment via `config_default.php`.

The module configuration class can access the environment configuration values via `$this->get('key')`.
The module configurations are strictly defined in `Shared` application layer only, yet can be accessed from any application layer using the layer specific `Config`.

**Conventions**

- Module configuration
  - Getter methods (prefixed with `get`) MUST be defined to retrieve configuration values.
    - `Protected` constants MAY also be defined to support the getter methods (example: to enable cross-module referencing via `@uses`).
- Environment configuration
  - constants MUST be always `public` and have specification about their purpose.
  - constants MUST contain the same UPPERCASE value as the key is + properly prefixed with MODULE_NAME (see Example below).

<details><summary markdown='span'>Additional Conventions for Boilerplate, Accelerator, and Module Development</summary>
- The module configuration relays exclusively on `static::` to support extension.
</details>

<details><summary markdown='span'>Guidelines for Module Development</summary>
- `Protected` items are NOT recommended in module configuration as they tend to create BC problems on project extensions.
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

**Description**

Represents the module entries of the Backoffice navigation panel.
The icons are taken from [Font Awesome Icons Library](#https://fontawesome.com/v4/icon/files-o).

**Example**
- The below example adds navigation elements, under the already existing `product` navigation element (defined in another module).
- The `pages` reserved node holds the navigation items.
- The navigation items are defined within a logical node (`configurable-bundle-templates`) according to business requirements.
- The `bundle` identifies in which `module` the processing `controller` is located.
```xml
<?xml version="1.0"?>
<config>
  <product>
    <pages>
      <configurable-bundle-templates>
        <label>Configurable Bundle Templates</label>
        <title>Configurable Bundle Templates</title>
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

**Description**

Permission plugins are a way to put a scope on the usage of an application during a request lifecycle.

**Conventions**

- Permission plugins MUST implement `\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface`.

**Guidelines**
- When using one of the traits in a model, use a protected constant string to reference the permission plugin that will be used in the model. As an annotation for this string you should add `@uses` annotation to the `PermissionPlugin::KEY` string that you will compare against (see in example below).
- The `\Spryker\[Application]\Kernel\PermissionAwareTrait` trait allows the model in the corresponding application to check if a permission is granted to an application user.

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

**Description**

The schema file defines the module's tables and columns (see [Propel Documentation - Schema XML](#https://propelorm.org/documentation/reference/schema.html)).

**Conventions**

- Table name MUST follow the format `spy_[module]_[domain entity]` (eg: `spy_customer_address`, `spy_customer_address_book`).
- Tables MUST have an integer ID primary key, following the format `id_[module]_[domain entity]` (eg: `id_customer_address`, `id_customer_address_book`).
- Table definitions MUST include the `phpName` attribute.
- Table foreign key MUST follow the format `fk_[remote entity]` (eg: `fk_customer_address`, `fk_customer_address_book`).
- Table foreign key definitions MUST include the `phpName` attribute.
- Tables with sensitive primary key (eg: `spy_order` ID gives information about submitted order count) MUST include UUID field for public access purpose.
  - The field MAY be `null` by default.
  - The field MUST be eventually unique across the table (until the unique value is provided, the business logic MAY NOT operate appropriately).

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- The table prefix (`spy_`) can be chosen freely if compatibility with SCOS featuresis not desired.
</details>

**Guidelines**
- `PhpName` is usually the CamelCase version of the "SQL name" (eg: `<table name="spy_customer" phpName="SpyCustomer">`).
- A module (eg: `Product` module) may inject columns into a table which belong to another module (eg: `Url` module). This case is usually used if the direction of a relation is opposed to the direction of the dependency. For this scenario, the injector module will contain a separate, foreign module schema definition file (eg: `Product` module will contain `spy_url.schema.xml` next to `spy_product.schema.xml` that defines the injected columns into the `Url` domain).
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

Injecting columns from `Product` to a `Url` domain by defining `spy_url.schema.xml` schema file in `Product` module.
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Url\Persistence" package="src.Orm.Zed.Url.Persistence">

    <table name="spy_url">
        <column name="fk_resource_product_abstract" type="INTEGER"/>
        <foreign-key name="spy_url-fk_resource_product_abstract" foreignTable="spy_product_abstract" phpName="SpyProduct" onDelete="CASCADE">
            <reference foreign="id_product_abstract" local="fk_resource_product_abstract"/>
        </foreign-key>
    </table>
</database>
```

## Provider / Router

**Description**

Providers are used during the bootstrap of [Yves](#yves). There are three types of providers:
- **Controller Provider** - Registers [Controllers](#controller) of a module and binds them to a path.
- **Service Provider** - Represents a cross-functional service (eg: a validator).
- **Router** - Resolves a path into a module, [Controller and Action](#controller).

**Conventions**
- All providers and routers MUST be registered in `[Module]/Yves/ShopApplication/YvesBootstrap.php` (see [Silex Documentation about Providers](#https://symfony.com/blog/the-end-of-silex/doc/1.3/providers.html))
- A `Controller Provider` MUST extend `\SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider`.
- A `Service Provider` MUST implement `\Silex\ServiceProviderInterface and may extend \Spryker\Yves\Kernel\AbstractPlugin`.
- A `Router` MUST extend `\SprykerShop\Yves\ShopRouter\Plugin\Router\AbstractRouter`.
- A provider is classified as a [Plugin](#plugin) and so the plugin's conventions apply.

## Query Container facade

**Description**

The Query Container is the internal API of Persistence layer, and represents and entry point to database access.
The Query Container follows the [facade design pattern](#facade-design-pattern).
The more advanced and modular [Entity Manager](#entity-manager) and [Repository](#repository) pattern was introduced to counter the problems of cross-module leaks of `Query Container` concept.

**Conventions**
- Naming: `[Module]QueryContainer.php`.
- Additionally, the [facade design pattern](#facade-design-pattern) conventions apply.
- New `QueryContainer` functionality MUST NOT be introduced but through the advanced [Entity Manager](#entity-manager) and [Repository](#repository) pattern.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- `QueryContainers` can be used/developed further but it is recommended to transition toward the [Entity Manager](#entity-manager) and [Repository](#repository) pattern.
</details>

## Repository

**Descriptions**

Executes queries and returns the results as [Transfer Objects](#transfer-object) or native types.
The repository can be accessed from the same module's [Communication and Business Layer](#layers).

**Conventions**

- Naming: `[Module]Repository.php`
- The repository class MUST define and implement an interface (`[Model]RepositoryInterface.php`) that holds the specification of each method.
- `Public` methods MUST receive and return [Transfer Objects](#transfer-object) only.
- Hidden, hard dependencies appearing through `join` MUST be defined via `@module [RemoteModule1][,[...]]` tag (see example below)
- The methods MUST return with a collection of items or a single item (eg: using and wrapping the results of `find()` or `findOne()`).

**Example**

```php
  namespace Spryker\Zed\Product\Persistence;
  
  /**
   * @module Url,ProductComment
   */
  public function findOneProduct()
  {
      $query = new SpyProductQuery();
      $query
        ->joinSpyUrl()
        ->joinSpyProductComment();

      return $query;
  }
```


## Service facade

**Description**

The Service is the internal API of Service application layer, and represents the only entry point to the Service Application.
The Service follows the [facade design pattern](#facade-design-pattern).

**Conventions**
- Naming: `[Module]Service.php`
- Additionally, the [facade design pattern](#facade-design-pattern) conventions apply

## Theme

**Description**

Yves can have one or multiple themes that define the overall look and feel.
Spryker implements the concept of Atomic Web Design .
Yves provides only 1-level Theme inheritance: Current Theme > Default Theme.
- Current Theme - a single theme defined on a project level. Eg b2b-theme, b2c-theme.
- Default Theme - a theme provided from Spryker by default and used in the Master Suite. Used for incremental project updates (start from default and change components one-by-one) and a graceful fallback in case Spryker provides a new functionality that does not have own frontend in a project.

**Contract**
- There is always a "default" theme.
- A Theme may contain Views, Templates or Components (atoms, molecules or organisms)

## Transfer Object

**Description**

Transfer objects are pure data containers with getters and setters.
They can be used in all Applications and all Layers.
They are described in XML files and then become autogenerated into the `src/Generated/Shared/Transfer` directory.
For every defined table in [Peristence Schema](#persistence-schema) a matching `EntityTransfer` will be generated with `EntityTransfer` suffix.
`EntityTransfers` are the lightweight data transfer objects of the underlying data, and this object should be used as source of communication.

**Conventions**

- Naming: `[module].transfer.xml`.
- **Backend API** module transfer names MUST use plural entity name with `BackendApiAttributes` suffix
- **Storefront API** module transfer names MUST use plural entity name with `Api` suffix.
- `EntityTransfers` MUST NOT be defined manually but rather will be generated automatically based on [Peristence Schema](#persistence-schema) definitions.
- A module can only use those transfer objects and their properties which are declared in the module (transfer definitions accessed through composer dependencies are considered as violation).

**Guidelines**
- They can be instantiated directly anywhere (not just via Factory).

**Examples**
- **BAPI resource names**: `PickingListsBackendApiAttributes` for picking list, `PickingListItemsBackendApiAttributes` for picking list items.
- **SAPI resource names**: `PickingListsApiAttributes` for picking list, `PickingListItemsApiAttributes` for picking list items.


## Widget

**Description**

A widget represents a part of a webpage in Yves which can be reused.

**Convention**
- A widget MUST contain only lightweight, render related logic.
- A widget MUST have a unique name across SCOS features.
- When Widget call is implemented, it MUST be considered that a widget is always optionally enabled.
- A widget MUST NOT implement an interface.

<details><summary markdown='span'>Additional Conventions for Project Development</summary>
- Widget can be considered present (not optional), and called accordingly.
</details>

<details><summary markdown='span'>Additional Conventions for Module Development</summary>
- Widget module MUST NOT appear as dependency (as it goes against the basic concept of the optional widgets).
- Implementing a widget MUST happen in a widget module.
</details>

**Guidelines**
- Widget modules MAY contain only frontend components (molecules, etc.) without widget class.
- The widget class receives the input/rendering parameters via its constructor.
- Use factory to access logic or additional data.
- Widgets are meant to provide functionality in a decoupled, modular and configurable way.
- Widgets are meant to provide functionality with backend support.

## Zed Stub

**Description**

A Zed Stub is a class which defines interactions between Yves (or Glue) and Zed.
Under the hood, the Zed Stub makes RPC calls to Zed.

**Conventions**
- The RPC call endpoints must be implemented in a Zed application [GatewayController](#gateway-controller) of the receiving module.
- The Zed stub methods MUST contain only delegation but no additional logic.
- Has public methods which only use [Transfer Objects](#transfer-object) as input or output parameter.
- All methods that make requests to URLs of Zed MUST add a `@uses` tag to the target [GatewayController](#gateway-controller) action in the docblock
- Descendant of `\Spryker\Client\ZedRequest\Stub\ZedRequestStub`.

# Module Contribution Components

The components below are necessity in module developments for modularity but recommended to avoid in Project or Boilerplate development.

**Conventions**
- The components MUST be placed according to the corresponding application layer’s directory architecture (see [Application Layers](#application-layers)) in order to come in effect.
- The components MUST be extended __only__ from the application-layer corresponding Abstract class in `Kernel` module.
- The components MUST be stateless to be deterministic and easy to comprehend.

## Bridge

**Description**

According to the Interface Segregation Principle each module defines an interface for each foreign class it depends on. Bridges are used to wrap and decouple dependencies (such as Facade, Client, Service, external library class, etc).This way it declares its own requirements and any class which implements the interface can be used. The problem appears when a facade from another module wants to implement the interface. In this case there is a cross-module coupling between that facade and the implemented interface. To avoid this situation we are using the bridge pattern. This allows easy module decoupling and both can evolve independently.

**Conventions**

- Bridges and their interfaces are defined in Dependency\{facade type}\ directory.
  - Class name follows `[CurrentModule]To[FacadeOnwerModule]FacadeBridge`.
  - Interface name follow `[CurrentModule]To[FacadeOwnerModule]FacadeInterface` (mind the missing Bridge word!).
- A Bridge always comes with an interface which contains exactly these methods which are used by the module that holds the bridge (ISP Principle).
- The Bridge implements the methods from the interface and delegates all calls to the related Facade
- Bridges don't appear in any class of a Module except for the Dependency Provider. Instead the interface of the Bridge is used.
- The foreign Facade is injected via constructor. The Bridge does not use a typed parameter here to avoid coupling to a specific class.
- Bridges and their interfaces must be declared as strict as possible (types for param/return) compared to their parent with valid types (no mixed, no x|y)

**Guidelines**
- Bridge vs Adapter: for simplification, we keep using bridge pattern even when adapting the earlier version of a Facade. Adapters are used when the remote class' life-cycle is less-controllable by Spryker or there is a huge technical difference between the adaptee and adaptor.
- During bridge definitions, type definition mistakes in remote facades become more visible. In these cases, be aware of the cascading effect of changing/restricting an argument type in public API when you consider such changes.

**Example**

```php
namespace Spryker\Zed\Product\Business;

interface ProductFacadeInterface
{
public function addProduct(ProductAbstractTransfer $productAbstractTransfer, array $productConcreteCollection): int;
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

**Description**
- Plugins are classes which are used to realize Inversion-Of-Control - instead of a direct call to another module's facade, a `plugin` can be provided as an optional and configurable class.
- Plugins are the only classes that can be instantiated across modules.
- See more details about the implementation in [Plugin Interface](#plugin-interface) component.

**Conventions**
- The plugin MUST NOT contain business logic but delegates to the underlying facade.
- Plugin method names MUST use words `pre` and `post` instead of `before`, `after`.
- Plugin class names MUST use words `pre`, `post`, `create`, `update`, `delete`, instead of `creator`, `updater`, `deleter`.
- The plugin MUST implement a [Plugin Interface](#plugin-interface) which is provided by an extension module.

**Guidelines**
- Plugin name should be unique and give and overview about the behaviour that the plugin delivers (consider developers searching a plugin in a catalog across SCOS features only by plugin name).

**Example**

```php
  /**
    * @see /F/Q/N/FooDependencyProvider::getFooPlugins()
    * @see /F/Q/N/BarDependencyProvider::getBarPlugins()
    */
  class ZipZapPlugin extends AbstractPlugin implements FooPluginInterface, BarPluginInterface {}
```

## Plugin Interface

**Description**

- Modules which consume plugins need to define their requirements with an interface.
- The plugin interface needs to be placed in an “extension module”.

There are three modules involved:

1. **Plugin definer** (aka extension module): The module that defines and holds the plugin interface (example: CompanyPostCreatePluginInterface in CompanyExtension module.
2. **Plugin executor**: The module that demands the plugin(s) in its Dependency Provider (example: CompanyDependencyProvider::getCompanyPostCreatePlugins() in Company module)
3. **Plugin providers**: The modules that implement a plugin (example: CompanyBusinessUnitCreatePlugin in CompanyBusinessUnit module)



**Conventions**
- Plugin interfaces MUST be defined in extension module.
  - Extension modules MUST be suffixed with Extension and follow regular module architecture.
  - Extension modules MUST NOT contain anything else but plugin interfaces and Shared layer.
- Plugin interface MUST have a class specification with plugin-stack details.
- Each method of a plugin receives a collection as an input argument.

**Guidelines**

- Operations on single items in plugin stack is forbidden except for the following reasons (check this RFC for more details):
  - it is strictly and inevitably a single-item flow.
  - the items go in FIFO order and there is no other way to use a collection instead.
- Plugin interface class specification SHOULD explain:
  - how the plugins will be used
  - what are the typical use-cases of a plugin

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
