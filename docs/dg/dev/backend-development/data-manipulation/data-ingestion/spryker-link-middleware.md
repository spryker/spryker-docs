---
title: Spryker LINK Middleware
description: Spryker LINK Middleware is a constructor that allows you to set up a linear data processing flow, also referred to as pipeline, for import/export of data from some system to shop, or from shop to some system.
last_updated: Oct 13, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/spryker-middleware
originalArticleId: b7dfbdc2-5647-4314-9bb3-5302f378ce2b
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-ingestion/spryker-link-middleware.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-ingestion/spryker-middleware.html
---

{% info_block warningBox "Warning" %}

Spryker LINK Middleware has been discontinued.

{% endinfo_block %}

## Overview

Spryker LINK Middleware is a constructor that lets you set up a linear data processing flow, also referred to as a pipeline, to import and export data from some system to a shop or from the shop to some system. For example, it can be used for importing products to a shop or exporting orders from a shop.

### Pipeline structure

The middleware applies the pipeline pattern letting you connect different stages of data processing together and inverting dependencies between them. The imported and exported items are processed one by one and go through a set of specific steps called *stages*.

The pipeline contains five standard stages: reader, validator, mapper, translator, and writer. However, you can use them or define any number of stages.

First of all, a source item is *read*. Then, it's *validated* to make sure that all attributes are correct and all the necessary data is available. Having passed the validation, the item is *mapped*—for example, keys of the source system are mapped onto the target system. This being done, the items go through a *translator*, which processes the values and translates them into a respective format—for example, the price value is a decimal value, but it must be an integer, and it's the translator's responsibility to change it to the required value. After that, the item is *written* to the target system (to the database, in case of import, to a file, if it's export).

![Pipeline stages](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Spryker+Middleware/stages.png)

Each stage can be abstracted as having the following:

1. *Input*. The item is received from the previous stage; an exception might be a reader that receives nothing.
2. *Output*. The item is provided for the next stage; an exception might be a writer that persists data and sends back nothing.
3. *Configuration*. The configuration of the stage—for example, validation rules for the validator.
4. *Logging*. It is set by any stage to leave some artifacts of processing data.
![Input output](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Spryker+Middleware/input-output.png)

The incoming data is taken from the stream. The middleware does not care about the source of the data, whether it comes from a file or an API. The middleware provides its own interface so that the source of data does not matter.

### How Spryker LINK Middleware works

The middleware provides a console interface to allow job triggering and Jenkins integration. It is evoked by running the `middleware:process:run` command. The main parameter of the command is `-p` (process name), which defines the process to be started.

The default implementation of the middleware constructor includes the interface, reading and writing from and to JSON, CSV, and XML formats, and the business logic of mapping, translation, and validation (you can add your own translators and validators).

There are two main plugin interfaces that must be implemented to configure the middleware process: `ConfigurationProfilePluginInterface` and `ProccessConfigurationPluginInterface`.

The `ConfigurationProfilePluginInterface` plugin registers the processes (like import or export) and the list of custom translators or validators (if any) implemented at the project level. The interface can be implemented in any module under `\Spryker\Zed\[MODULE]\Communication\Plugin\Configuration`.

This plugin implements the interface as follows:

```php
class AkeneoPimConfigurationProfilePlugin extends AbstractPlugin implements ConfigurationProfilePluginInterface
{
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ProcessConfigurationPluginInterface[]
     */
    public function getProcessConfigurationPlugins(): array
    {
        return $this->getFactory()
            ->getAkeneoPimProcesses();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\TranslatorFunction\TranslatorFunctionPluginInterface[]
     */
    public function getTranslatorFunctionPlugins(): array
    {
        return $this->getFactory()
            ->getAkeneoPimTranslatorFunctions();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Validator\ValidatorPluginInterface[]
     */
    public function getValidatorPlugins(): array
    {
        return [];
    }
}
```

Each process is a separate plugin that consists of the following methods (`ProcessConfigurationPluginInterface`):

* `getProcessName`—returns the process name which is used to find the necessary process with the parameter (transferred with the `-p` option).
* `getInputStreamPlugin`—configures the source where the data is read from.
* `getOutputStreamPlugin`—configures the target where the data is written.

* `getIteratorPlugin`—either does nothing and releases the input stream for processing as is, or alters the data for further processing. For example, if the input stream is just a file, the iterator does nothing and lets the data be processed further. If the input stream is, for example, a file catalog, `getInputStreamPlugin` returns the file name, the iterator goes through all the files, and if each file is in the JSON format, the iterator returns each JSON file of the catalog for processing to the pipeline.

You can use one of two iterators that are provided out of the box (`NullIterator`, `JsonDirectoryIterator`) or implement your own.

`getStagePlugins`—contains a list of all stages the items go through (reader, validator, mapper, translator, writer) and ensures each item passes each stage one by one.

`getLoggerPlugin`—defines the way logging happens. The default middleware logger logs to the PHP standard error stream (`php://stderr`; this can be changed as needed). The detalization of the logging is fully customizable, which means you can configure it as you wish.

`getPreProcessorHookPlugins` and `getPostProcessorHookPlugins`—define what is done before or after a process. For example, it might be necessary to download a file with the categories before the categories import; this is specified in `getPreProcessHookPlugins`.

```php
class CategoryImportConfigurationPlugin extends AbstractPlugin implements ProcessConfigurationPluginInterface
{
    const PROCESS_NAME = 'CATEGORY_IMPORT_PROCESS';

    /**
     * @return string
     */
    public function getProcessName(): string
    {
        return static::PROCESS_NAME;
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\InputStreamPluginInterface
     */
    public function getInputStreamPlugin(): InputStreamPluginInterface
    {
        return $this->getFactory()
            ->getCategoryImportInputStreamPlugin();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\OutputStreamPluginInterface
     */
    public function getOutputStreamPlugin(): OutputStreamPluginInterface
    {
        return $this->getFactory()
            ->getCategoryImportOutputStreamPlugin();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Iterator\ProcessIteratorPluginInterface
     */
    public function getIteratorPlugin(): ProcessIteratorPluginInterface
    {
        return $this->getFactory()
            ->getCategoryImportIteratorPlugin();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\StagePluginInterface[]
     */
    public function getStagePlugins(): array
    {
        return $this->getFactory()
            ->getCategoryImportStagePluginsStack();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Log\MiddlewareLoggerConfigPluginInterface
     */
    public function getLoggerPlugin(): MiddlewareLoggerConfigPluginInterface
    {
        return $this->getFactory()
            ->getAkeneoPimLoggerConfigPlugin();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Hook\PreProcessorHookPluginInterface[]
     */
    public function getPreProcessorHookPlugins(): array
    {
        return $this->getFactory()
            ->getCategoryImportPreProcessorPluginsStack();
    }

    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Hook\PostProcessorHookPluginInterface[]
     */
    public function getPostProcessorHookPlugins(): array
    {
        return $this->getFactory()
            ->getCategoryImportPostProcessorPluginsStack();
    }
}
```

### Code organization

The middleware is a set of modules in the middleware namespace allowing you to group common functionalities together. The middleware cannot provide readers and writers for all systems. These must be implemented in the scope of respective modules and namespaces.

The following is an example of code organization for a project:

![Code organization](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Spryker+Middleware/code-organization.png)

### Integrate Spryker LINK Middleware

The core of the Spryker LINK Middleware is implemented in the `Process` module. This module collects all process plugins and creates processes out of them.

1. Install the `Process` module:

```bash
composer require spryker-middleware/process
```

2. Add the `SprykerMiddleware` namespace to your project's core namespaces:

```bash
$config[KernelConstants::CORE_NAMESPACES] = [
   'SprykerShop',
   'SprykerMiddleware',
   'SprykerEco',
   'Spryker',
];    
```

3. Add the Middleware Process console command to `ConsoleDependencyProvider` in your project:

```php
…
use SprykerMiddleware\Zed\Process\Communication\Console\ProcessConsole;
…
protected function getConsoleCommands(Container $container): array
{
   $commands = [
       …
       new ProcessConsole(),
   ];
   …
   return $commands;
}    
```

4. Add the `Process` module on the project level and specify configuration profiles in `ProcessDependencyProvider`:

```php
class ProcessDependencyProvider extends SprykerMiddlewareProcessDependencyProvider
{
    …
   protected function getConfigurationProfilePluginsStack(): array
   {
       $profileStack = parent::getConfigurationProfilePluginsStack();
       $profileStack[] = new PimConfigurationProfilePlugin();
       $profileStack[] = new DefaultConfigurationProfilePlugin();

       return $profileStack;
   }
}    
```

For more information about the process implementation, see [DefaultProductImportConfigurationPlugin.php](https://github.com/spryker-eco/akeneo-pim-middleware-connector/blob/master/src/SprykerEco/Zed/AkeneoPimMiddlewareConnector/Communication/Plugin/Configuration/DefaultProductImportConfigurationPlugin.php).

### Middleware reports

You can view the results of the Spryker Middleware processes in the Middleware **Reports** section under the **Maintenance** menu of the Administration interface. This **Middleware Reports** section provides an overview of all the processes run with Middleware, the overview of the process results (start time, duration, item count, and status of each process), as well as detailed information about each process. The detailed information includes the following:

**Process details:**
* Process name
* Process start/end times
* Process duration
* Items count
* Processed items
* Skipped items
* Status
* Duration

**Configuration details:**
* Iterator plugin
* Post process hook plugins
* Input stream plugin
* Output stream plugin
* Logger plugin
* Stage plugins
* Preprocess hook plugins
* Paths (if applicable)

**Process stage results:**
* Stage name
* Input item count
* Output item count
* Total execution time
* Average item execution time

### Integrate reports

Install the `Report` module:

```
composer require spryker-middleware/report
```

To add the reporting functionality to your Middleware process, add the following plugin to the list of post hook plugins in your Process configuration:

```php
use SprykerMiddleware\Zed\Report\Communication\Plugin\Hook\ReportPostProcessorHookPlugin;
...
public function getPostProcessorHookPlugins(): array
{
   return [
      ...
      new ReportPostProcessorHookPlugin(),
   ];
}
...
```

After that, you can see the result of your process runs in the Admin UI (Maintenance\ Middleware Reports).

### `OmsMiddlewareConnector` module

The `OmsMiddlewareConnector` module provides `TriggerOrderExportProcessCommand`, which enables the triggering of a Middleware process from OMS. Also, this module provides `OrderReadStreamPlugin`, which gives the input stream for reading orders and passes them to the next stages of the Middleware process.

Install the `OmsMiddlewareConnector` module:

```bash
composer require spryker-middleware/oms-middleware-connector
```

For an example of the module configuration, refer to `config/Shared/config.dist.php`. To set up the order export process, which must be triggered from the OMS command, add the configuration of its name to your project's config:

```php
$config[OmsMiddlewareConnectorConstants::ORDER_EXPORT_PROCESS_NAME] = OrderExportProcessConfigurationPlugin::PROCESS_NAME;
```

`TriggerOrderExportProcessCommand` is available and can be registered in `OmsDependencyProvider` as well as used in your Oms configuration:

```php
...
/**
* @param \Spryker\Zed\Kernel\Container $container
*
* @return \Spryker\Zed\Kernel\Container
*/
public function provideBusinessLayerDependencies(Container $container)
{
   $container = parent::provideBusinessLayerDependencies($container);
   $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
       $commandCollection->add(new TriggerOrderExportProcessCommand(), 'Order/Export');

       return $commandCollection;
   });

   return $container;
}
...
```

### Mapper

A *mapper* is a way to generate an array for `WriteStream` by data taken from `ReadStream`. You must define keys for the new array and match them to payload data according to the strict rules provided as `MapperConfigTransfer`.

First, you need to implement `SprykerMiddleware\Zed\Process\Business\Mapper\Map\AbstractMap`. The abstract methods necessary for implementation are `getStrategy()` and `getMap()`.

By default, Middleware supports two strategies:

| STRATEGY | DESCRIPTION |
| --- | --- |
| SprykerMiddleware\Zed\Process\Business\Mapper\Map\MapInterface::MAPPER_STRATEGY_SKIP_UNKNOWN | This strategy skips the keys which are not mentioned in the mapper configuration from the payload. |
| SprykerMiddleware\Zed\Process\Business\Mapper\Map\MapInterface::MAPPER_STRATEGY_COPY_UNKNOWN | This strategy copies keys with values which are not mentioned in the mapper configuration from the payload. |

There are five ways to set mapper rules:
* `ArrayMapRule`. This rule lets you use the given payload as an array with a recursive call.
* `DynamicMapRule`. This rule lets you use the value from the payload as a key.
* `ClosureMapRule`. This rule lets you use a custom function for the payload array.
* `DynamicArrayMapRule`. This rule lets you use the value from the payload as a key and works with the payload as with an array with recursive calls.
* `KeyMapeRule`. This simplest rule for the mapper that gets the value using the key from the payload. You can use the *. (period)* symbol as a key separator for getting value from the payload.

You can check the examples of each rule in the following snippet. It's a final mapper example with examples of payload and their result.

```js
$payload = [
    'prices' => [
     [
      'locale' => 'en_GB',
      'price' => 12.35,
     ],
     [
      'locale' => 'de_DE',
      'price' => 12.50,
     ],
     [
      'locale' => 'nl_NL',
      'price' => 12.80,
     ],
    ],
    'delivery' => [
     [
      'locale' => 'en_GB',
      'is_allowed' => true,
     ],
     [
      'locale' => 'de_DE',
      'is_allowed' => false,
     ],
    ],
    'values' => [
     'attributes' => [
      'color' => 'white',
      'size' => 'L',
     ],
     'name' => [
      [
       'locale' => 'en_GB',
       'name' => 'name-en',
      ],
      [
       'locale' => 'de_DE',
       'name' => 'name-de',
      ],
      [
       'locale' => 'nl_NL',
       'name' => 'name-nl',
      ],
     ],
     'categories' => [
      'category1',
      'category2',
     ],
    ],
   ];

 ...

 class TestImportMap extends AbstractMap
 {
  /**
   * @return array
   */
  public function getMap(): array
  {
   return [
    'categories' => 'values.categories', //KeyMapRule,
    'names' => function ($payload) { //ClosureMapRule
      $result = [];
      foreach ($payload['values']['name'] as $name) {
       $result[$name['locale']] = $name['name'];
      }

      return $result;
     },
    '&values.attributes.color' => 'values.attributes.size', //DynamicMapRule
    'delivery' => [ //DynamicArrayMapRule
      'delivery',
      'dynamicItemMap' => [
       'locale' => 'is_allowed',
      ],
     ],
    'delivery' => [ //ArrayMapRule
      'delivery',
      'itemMap' => [
       'locale' => 'locale',
       'is_exist' => 'is_allowed',
      ],
     ],
   ];
  }

  /**
   * @return string
   */
  public function getStrategy(): string
  {
   return MapInterface::MAPPER_STRATEGY_SKIP_UNKNOWN;
  }
 }

 ...

 $result = [
  'categories' => [
   'category1',
   'category2',
  ],
  'names' => [
   'en_GB' => 'name-en',
   'de_DE' => 'name-de',
   'nl_NL' => 'name-nl',
  ],
  'white' => 'L',
  'delivery' => [
   'en_GB' => true,
   'de_DE' => false,
  ],
  'delivery' => [
   [
    'locale' => 'en_GB',
    'is_allowed' => true,
   ],
   [
    'locale' => 'de_DE',
    'is_allowed' => false,
   ],
  ],
 ]
```

### Validator

A *validator* is a way to validate the mapped payload. You must define the validation rules for the mapped array and provide it as `ValidatorConfigTransfer`.

At first, you need to implement `SprykerMiddleware\Zed\Process\Business\Validator\ValidationRuleSet\AbstractValidationRuleSet`. The abstract method is necessary for the `getRules()` implementation. This method returns an array with validation rules for the mapped payload.

Use the following format to define validation rules:

```php
 /**
  * @return array
  */
 protected function getRules(): array
 {
  return [
   'mapped_key' => [
    'ValidatorName1',
      [
      'ValidatorName2',
      'options' => [
        'option1' => 'value1',
        'option2' => 'value2',
      ]
     ]
   ],
  ];
 }
```

#### Default validators

Many predefined validators can be used in `ValidationRuleSet`.

| VALIDATOR NAME | DESCRIPTION | OPTIONS |
| --- | --- | --- |
| DateTime | Validates that a value is a valid *datetime*, meaning a string (or an object that can be cast into a string) that follows a specific format. | format (opt, string) |
| EqualTo | Validates that a value is equal to another value, defined in the options. | value (req, mixed) |
| GreaterOrEqualThan | Validates that a value is equal to or greater than another value, defined in the options. | value (req, mixed) |
| GreaterThan | Validates that a value is greater than another value, defined in the options. | value (req, mixed) |
| InList | Validates that a value is included in a list of values defined in the options. | values (req, array) |
| Length | Validates that a value's length is greater than a minimum or less than a maximum defined in options. | min (opt, int)  |
| max (opt, int) |
| LessOrEqualThan | Validates that a value is equal to or less than another value, defined in the options. | value (req, mixed) |
| LessThan | Validates that a value is less than another value, defined in the options. | value (req, mixed) |
| NotBlank | Validates that a value is not blank. |   |
| NotEqualTo | Validates that a value is equal to another value defined in the options. | value (req, mixed) |
| Regex | Validates that a value matches a regular expression. | pattern (req, string) |
| Required | Validates that a value is not strictly equal to null. |   |
| Type | Validates that a value is of a specific data type. For example, if a variable is an array, you can use this constraint with the array type option to validate this. | type (req, string) |

#### Create a custom validator

To create your own validator, extend `SprykerMiddleware\Zed\Process\Business\Validator\Validators\AbstractValidator` and implement the `validate()` method.

After this, you can create a new validator plugin. You need to extend `SprykerMiddleware\Zed\Process\Communication\Plugin\Validator\AbstractGenericValidatorPlugin`, implement the `getName()` and `getValidatorClassName()` methods, and use this plugin in the `SprykerMiddleware\Zed\Process\ProcessDependencyProvider::getValidatorStack()` method.

#### Example of `ValidationRuleSet`

```php
 ...
 use SprykerMiddleware\Zed\Process\Business\Validator\ValidationRuleSet\AbstractValidationRuleSet;
 use SprykerMiddleware\Zed\Process\Business\Validator\ValidationRuleSet\ValidationRuleSetInterface;
 ...
 class ProductModelImportValidationRuleSet extends AbstractValidationRuleSet implements ValidationRuleSetInterface
 {
  /**
   * @return array
      */
  protected function getRules(): array
  {
   return [
    'categories' => [
     'Required',
     [
      'Length',
      'options' => [
       'min' => 3,
      ],
     ],
    ];
   }
  }
```

### Translator

A *translator* is a way to update the values from the mapped payload using strict rules from a dictionary. You must define the keys and translator functions provided as `TranslatorConfigTransfer`.

First, implement `SprykerMiddleware\Zed\Process\Business\Translator\Dictionary\AbstractDictionary`. The abstract method is necessary for `getDictionary()` implementation. This method returns an array with translation rules for the mapped payload.

You can apply the translator function for value with the type array. You can use the asterisk (`*`) symbol to apply the translator function to each value in the array like `mapped_key.*` or use the `mapped_key.*` subkey syntax to apply the translator function to a certain key in the array.

Use the following format to define translation rules:

```php
 ...
 use SprykerMiddleware\Zed\Process\Business\Translator\Dictionary\AbstractDictionary;
 ...

 class AttributeMapDictionary extends AbstractDictionary
 {
  /**
   * @return array
   */
  public function getDictionary(): array
  {
   return [
    'mapped_key' => [
     [
      'TranslatorFunction1',
      'options' => [
       'option1' => 'value1',
      ],
     ],
     [
      'TranslatorFunction2',
      'options' => [
       'option2' => 'value2',
      ],
     ],
    ],
    'mapped_key.*' => [
     [
      'TranslatorFunction3',
     ],
    ],
    'mapped_key.*.subkey' => [
     [
      'TranslatorFunction4',
     ],
    ],
   ];
  }
 }

 ...
```

#### Default translator functions

| NAME | DESCRIPTION | OPTIONS |
| --- | --- | --- |
| ArrayToString | Join array elements with a string. | glue (req, string) |
| BoolToString | Transforms a bool value to a string value ('true' or 'false'). |   |
| DateTimeToString | Transforms the DateTime object to the string value with the provided format. | format (req, string) |
| Enum | Uses a payload value as the key for the array map and return value. | map (req, array) |
| FloatToInt | Transforms a value from the float value to the integer value. |   |
| FloatToString | Transforms the float value to the string value. |   |
| IntToFloat | Transforms the integer value to the float value. |   |
| IntToString | Transforms the integer value to the string value. |   |
| MoneyDecimalToInteger | Transforms a money value from the decimal value to the integer value. |   |
| MoneyIntegerToDecimal | Transforms a money value from the integer value to the decimal value. |   |
| StringToArray | Split the string to the array by the delimiter. | delimiter (req, string) |
| StringToBool | Transforms the string value to the boolean value. |   |
| StringToDateTime | Transforms the string value to the DateTime object. |   |
| StringToFloat | Transforms the string value to the float value. |   |
| StringToInt | Transforms the string value to the integer value. |   |

#### Create a custom translator function

To create your own translator function, extend `SprykerMiddleware\Zed\Process\Business\Translator\TranslatorFunction\AbstractTranslatorFunction` and implement the `translate()` method.

After that, you are ready to create the translator plugin. You need to extend `SprykerMiddleware\Zed\Process\Communication\Plugin\TranslatorFunction\AbstractGenericTranslatorFunctionPlugin`, implement the `getName()` and `getTranslatorFunctionClassName()` methods, and use this plugin in the `SprykerMiddleware\Zed\Process\ProcessDependencyProvider::getTranslatorFunctionStack()` method.

Check out an example of the following dictionary:

```php
 ...
 use SprykerMiddleware\Zed\Process\Business\Translator\Dictionary\AbstractDictionary;
 ...

 class ProductImportDictionary extends AbstractDictionary
 {
  ...

  /**
   * @return array
   */
  public function getDictionary(): array
  {
   return [
    'values.*' => 'MeasureUnitToInt',
    'values' => [
     [
      'EnrichAttributes',
      'options' => [
       'map' => $this->getAttributeMap(),
       'excludeKeys' => [
        'country_availability',
       ],
      ],
     ],
     [
      'ValuesToAttributes',
      'options' => [
       'locales' => $this->config->getLocalesForImport(),
      ],
     ],
     [
      'ValuesToLocalizedAttributes',
      'options' => [
       'locales' => $this->config->getLocalesForImport(),
      ],
     ],
    ],
    'values.price' => [
     [
      'PriceSelector',
      'options' => [
       PriceSelector::OPTION_LOCALE_TO_PRICE_MAP => $this->config->getLocaleToPriceMap(),
      ],
     ],
    ],
    'values.localizedAttributes' => [
     [
      'LocaleKeysToIds',
      'options' => [
       'map' => $this->getLocaleMap(),
      ],
     ],
     [
      'MoveLocalizedAttributesToAttributes',
      'options' => [
       'blacklist' => [
        'name',
        'title',
        'product_description',
        'tax_set',
        'is_active_per_locale',
        'price',
        'bild_information',
        'picto_informationen',
        'meta_title',
        'meta_description',
        'meta_keywords',
       ],
      ],
     ],
    ],
    'values.localizedAttributes.*' => [
     [
      'ExcludeKeysAssociativeFilter',
      'options' => [
       'excludeKeys' => [
        'price',
        'bild_information',
        'picto_information',
        'tax_set',
       ],
      ],
     ],
     [
      'AddMissingAttributes',
      'options' => [
       'attributes' => [
        'name' => '',
        'description' => '',
        'meta_title' => '',
        'meta_description' => '',
        'meta_keywords' => '',
        'is_searchable' => true,
       ],
      ],
     ],
    ],
    'values.attributes' => [
     [
      'ExcludeKeysAssociativeFilter',
      'options' => [
       'excludeKeys' => [
        'price',
        'country_availability',
       ],
      ],
     ],
    ],
   ];
  }

  ...
 }  
```

## Create an importer

Create a business model to import data to the database. Usually, it's called Importer. It must be implemented at the project level.

```php
 <?php

 namespace Pyz\Zed\MyModule\Business\Importer;

 use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
 use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface;
 use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisherInterface;
 use Spryker\Zed\EventBehavior\EventBehaviorConfig;

 class Importer implements ImporterInterface
 {
  /**
   * @var \Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisherInterface
   */
  protected $dataImporterPublisher;

  /**
   * @var \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface
   */
  private $dataSetStepBroker;

  /**
   * @var \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface
   */
  private $dataSet;

  /**
   * @param \Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisherInterface $dataImporterPublisher
   * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface $dataSetStepBroker
   * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
   */
  public function __construct(
   DataImporterPublisherInterface $dataImporterPublisher,
   DataSetStepBrokerInterface $dataSetStepBroker,
   DataSetInterface $dataSet
  ) {
   $this->dataImporterPublisher = $dataImporterPublisher;
   $this->dataSetStepBroker = $dataSetStepBroker;
   $this->dataSet = $dataSet;
  }

  /**
   * @param array $data
   *
   * @return void
   */
  public function import(array $data): void
  {
   EventBehaviorConfig::disableEvent();
   foreach ($data as $item) {
    $this->dataSet->exchangeArray($item);
    $this->dataSetStepBroker->execute($this->dataSet);
   }

   EventBehaviorConfig::enableEvent();
   $this->dataImporterPublisher->triggerEvents();
  }
 }
```

### Prepare Publisher and `datasetStepBroker`

As an example, you can create `DataImporter` for categories.

The importer business model expects three parameters in the constructor. You need to create it.

1. Update the business factory with the following methods:

```php
 <?php
 ...

 class MyModuleBusinessFactory extends SprykerMyModuleBusinessFactory
 {
  ...

  public function createCategoryImporter()
  {
   return new Importer(
    $this->createDataImporterPublisher(),
    $this->createCategoryImportDataSetStepBroker(),
    $this->createDataSet()
   );
  }

  protected function createDataImporterPublisher()
  {
   return new DataImporterPublisher($this->createDataImportToEventBridge());
  }

  protected function createCategoryImportDataSetStepBroker()
  {
   $dataSetStepBroker = new DataSetStepBroker();
   $dataSetStepBroker->addStep($this->createCategoryWriteStep());
   return $dataSetStepBroker;
  }

  protected function createCategoryWriteStep()
  {
   return new CategoryWriterStep($this->createCategoryReader());
  }

  protected function createCategoryReader(): CategoryReader
  {
   return new CategoryReader();
  }

  protected function createDataSet()
  {
   return new DataSet();
  }

  ...
 }

 ...
```

2. Create a facade method that uses the importer.

```php
 <?php

 ...

 class MyModuleFacade extends SprykerMyModuleFacade implements MyModuleFacadeInterface
 {
  ...

  /**
   * @param array $data
   *
   * @return void
   */
  public function importCategories(array $data)
  {
   $this->getFactory()
    ->createCategoryImporter()
    ->import($data);
  }

  ...
 }
```

3. Update the communication layer and create the plugin to import categories.

```php
 class CategoryDataImporterPlugin extends AbstractPlugin
 {
  /**
   * @param array $data
   *
   * @return void
   */
  public function import(array $data): void
  {
   $this->getFacade()
    ->importCategories($data);
  }
 }
```

4. Add `CategoryDataImporterPlugin` to communication dependencies.

```php
 /**
  * @param \Spryker\Zed\Kernel\Container $container
  *
  * @return \Spryker\Zed\Kernel\Container
  */
 protected function addCategoryDataImporterPlugin(Container $container): Container
 {
  $container[static::MY_MODULE_CATEGORY_IMPORTER_PLUGIN] = function () {
   return new CategoryDataImporterPlugin();
  };

  return $container;
 }
```

### Prepare WriteStream

To save the categories into the database, create your own `WriteStream`. `SprykerMiddleware\Shared\Process\Stream\WriteStreamInterface` needs to be implemented.

```php
 class DataImportWriteStream implements WriteStreamInterface
 {
  /**
   * @var \SprykerEco\Zed\MyModule\Dependency\Plugin\DataImporterPluginInterface
   */
  protected $dataImporterPlugin;

  /**
   * @var array
   */
  protected $data = [];

  /**
   * @param \SprykerEco\Zed\MyModule\Dependency\Plugin\DataImporterPluginInterface $dataImporterPlugin
   */
  public function __construct(DataImporterPluginInterface $dataImporterPlugin)
  {
   $this->dataImporterPlugin = $dataImporterPlugin;
  }

  /**
   * @return bool
   */
  public function open(): bool
  {
   $this->data = [];
   return true;
  }

  /**
   * @return bool
   */
  public function close(): bool
  {
   return true;
  }

  /**
   * @param int $offset
   * @param int $whence
   *
   * @throws \SprykerMiddleware\Zed\Process\Business\Exception\MethodNotSupportedException
   *
   * @return int
   */
  public function seek(int $offset, int $whence): int
  {
   throw new MethodNotSupportedException();
  }

  /**
   * @throws \SprykerMiddleware\Zed\Process\Business\Exception\MethodNotSupportedException
   *
   * @return bool
   */
  public function eof(): bool
  {
   throw new MethodNotSupportedException();
  }

  /**
   * @param array $data
   *
   * @return int
   */
  public function write(array $data): int
  {
   $this->data[] = $data;
   return 1;
  }

  /**
   * @return bool
   */
  public function flush(): bool
  {
   $this->dataImporterPlugin->import($this->data);
   return true;
  }
 }
```

As the parameter for `DataImportWriteStream`, use `CategoryDataImporterPlugin`. Add the method to your `BusinessFactory`.

```php
 /*
  * @return \SprykerMiddleware\Shared\Process\Stream\WriteStreamInterface
  */
 public function createCategoryWriteStream(): WriteStreamInterface
 {
  return new DataImportWriteStream($this->categoryImporterPlugin);
 }
```

### Update process plugins

1. Update process plugins as follows:

```php
 class MyModuleDependencyProvider {

 ...

 /**
  * @param \Spryker\Zed\Kernel\Container $container
  *
  * @return \Spryker\Zed\Kernel\Container
  */
 protected function addCategoryImportProcessPlugins(Container $container): Container
 {
  ...

  $container[static::CATEGORY_IMPORT_OUTPUT_STREAM_PLUGIN] = function () {
   return new CategoryWriteStreamPlugin();
  };

  ...

  return $container;
 }
```

2. Update the communication factory:

```php
 /**
  * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\OutputStreamPluginInterface
  */
 public function getCategoryImportOutputStreamPlugin(): OutputStreamPluginInterface
 {
  return $this->getProvidedDependency(MyModuleDependencyProvide::CATEGORY_IMPORT_OUTPUT_STREAM_PLUGIN);
 }
```

3. Update the Configuration plugin:

```php
 class CategoryImportConfigurationPlugin extends AbstractPlugin implements ProcessConfigurationPluginInterface
 {
  protected const PROCESS_NAME = 'CATEGORY_IMPORT_PROCESS';

  /**
   * @return string
   */
  public function getProcessName(): string
  {
   return static::PROCESS_NAME;
  }


  /**
   * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\OutputStreamPluginInterface
   */
  public function getOutputStreamPlugin(): OutputStreamPluginInterface
  {
   return $this->getFactory()
    ->getCategoryImportOutputStreamPlugin();
  }
 }
```

If the configuration plugin is updated accordingly, category import from `ReadStream` to `WriteStream` is executed whenever the `CATEGORY_IMPORT_PROCESS` command is run.
