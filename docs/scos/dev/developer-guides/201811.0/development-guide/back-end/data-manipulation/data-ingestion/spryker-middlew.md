---
title: Spryker Middleware
originalLink: https://documentation.spryker.com/v1/docs/spryker-middleware
redirect_from:
  - /v1/docs/spryker-middleware
  - /v1/docs/en/spryker-middleware
---

## Overview
Spryker Middleware is a constructor that allows you to set up a linear data processing flow, also referred to as pipeline, for import/export of data from some system to shop, or from shop to some system. For example, it can be used for importing products to a shop, or exporting orders from a shop.

### Pipeline Structure
The Middleware applies the pipeline pattern allowing to connect different stages of data processing together and inverting dependencies between them. The imported/exported items are processed one by one and go through a set of specific steps called “stages”.

The pipeline contains 5 standard stages: reader, validator, mapper, translator, and writer. However, you can use them or define any number of stages.

First of all, a source item is **read**. Then, it is **validated** to make sure that all attributes etc. are correct and all the necessary data is available. Having passed the validation, the item is **mapped**, i.e. keys of the source system are mapped onto the target system. This being done, the items go through a **translator** which processes the values and translates them into a respective format (for example, the price value is a decimal value, but should be init - it’s translator’s responsibility to change it to the required value). After that, the item is **written** to the target system (to the database, in case of import, to a file, if it’s export etc.).
![Pipeline stages](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Spryker+Middleware/stages.png){height="" width=""}

Each stage can be abstracted as having:

1. Input – item is received from the previous stage, exception might be a reader, which receives nothing.
2. Output – item is provided for the next stage, exception might be a writer, which persists data and sends back nothing.
3. Configuration – configuration of the stage, e.g. validation rules for the validator.
4. Logging – used by any stage to leave some artefacts of processing data.
![Input output](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Spryker+Middleware/input-output.png){height="" width=""}

The incoming data is taken from the stream - the Middleware does not care about the source of the data, whether it comes from a file, from an API etc. The middleware provides its own interface, so that the source of data does not really matter.

### How the Middleware Works

The Middleware provides a console interface to allow job triggering and Jenkins integration. It is evoked by running the `middleware:process: run` command. The main parameter of the command is *-p* (process name) which defines the process to be started.

The default implementation of the middleware constructor includes the interface, reading/writing from/to JSON, .csv, .xml formats, business logic of mapping, translation and validation (you can add your own translators and validators).

There are two main plugin interfaces, which should be implemented to configure Middleware Process: `ConfigurationProfilePluginInterface` and `ProccessConfigurationPluginInterface`.

The `ConfigurationProfilePluginInterface` registers the processes (like import/export) and the list of custom translators/validators (if any) implemented at the project level. The interface can be implemented in any module under `\Spryker\Zed\[MODULE]\Communication\Plugin\Configuration`.

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

Each process is a separate plugin that consists of the following methods (ProcessConfigurationPluginInterface):

**getProcessName** - returns the process name which is used to find necessary process with the parameter (transferred with -p option).

**getInputStreamPlugin** - configures the source where the data is read from.

**getOutputStreamPlugin** - configures the target where the data is written.

**getIteratorPlugin** - either does nothing and releases the input stream for processing as is, or alters the data for further processing. For example, if the input stream is just a file, the iterator does nothing and lets the data be processed further. If the input stream is, for example, a file catalog, `getInputStreamPlugin` returns the file name, the iterator goes through all the files, and if, say each file is in the JSON format, the iterator returns each JSON file of the catalog for processing to pipeline.

You can use one of two iterators that are provided out of the box (NullIterator, JsonDirectoryIterator) or implement your own iterator.

**getStagePlugins** - contains a list of all stages the items go through (reader, validator, mapper, translator, writer) and makes sure each item passes each stage one by one.

**getLoggerPlugin** - defines the way logging happens. The default Middleware logger logs to the PHP standard error stream (php://stderr) (this can be changed as needed). Detalization of the logging is fully customizable, which means you can configure it as you wish.

**getPreProcessorHookPlugins** and **getPreProcessorHookPlugins** - define what should be done prior to or after a process. For example, it might be necessary to download a file with the categories prior to the categories import: this would be specified in `getPreProcessHookPlugins`.

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

### Code Organization

The Middleware is a set of modules in the Middleware namespace allowing to group common functionalities together. The middleware cannot provide readers and writers for all systems, these should be implemented in scope of respective modules and namespaces.

Here is an example of code organization for a project:
![Code organization](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Spryker+Middleware/code-organization.png){height="" width=""}

### Middleware Integration

The core of the Spryker Middleware is implemented in the Process module. This module collects all process plugins and creates processes out of them.

To install Process module, run this command in console:

```
composer require spryker-middleware/process
```

Add the `SprykerMiddleware` namespace to your project’s core namespaces:

```bash
$config[ KernelConstants::CORE_NAMESPACES] = [
   'SprykerShop',
   'SprykerMiddleware',
   'SprykerEco',
   'Spryker',
];    
```

Add the Middleware Process console command to `ConsoleDependencyProvider` in your project:

```php
	…
use SprykerMiddleware\Zed\Process\Communication\Console\ProcessConsole;
…
protected function getConsoleCommands(Container $container)
{
   $commands = [
       … 
       new ProcessConsole(),
   ];
   …
   return $commands;
}    
```

Add the Process module on project level and specify configuration profiles in `ProcessDependencyProvider`:

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

See [this example](https://github.com/spryker-eco/akeneo-pim-middleware-connector/blob/feature/ECO-1205-update-module-according-to-middleware-changes/src/SprykerEco/Zed/AkeneoPimMiddlewareConnector/Communication/Plugin/Configuration/DefaultProductImportConfigurationPlugin.php) on how to implement a process.

### Middleware Reports

You can view the results of the Spryker Middleware processes in the Middleware *Reports* section under the *Maintenance* menu of the Administration interface. This *Middleware Reports* section provides an overview of all the processes run with Middleware, overview of the process results (start time, duration, item count, and status of each process), as well as the detailed information on each process. The detailed information includes:

**Process details:**

* process name
* process start/end times
* process duration
* items count
* processed items
* skipped items
* status
* duration

**Configuration details:**

* iterator plugin
* post process hook plugins
* input stream plugin
* output stream plugin
* logger plugin
* stage plugins
* pre process hook plugins
* paths (if applicable)

**Process stage results:**

* stage name
* input item count
* output item count
* total execution time
* average item execution time

### Reports Integration
To install Report module, run this command in console:

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

After that, you will be able to see the result of your process runs in the Admin UI (Maintenance\ Middleware Reports).

### OmsMiddlewareConnector Module

The `OmsMiddlewareConnector` module provides `TriggerOrderExportProcessCommand` which enables triggering of a Middleware process from OMS. Also, this module provides `OrderReadStreamPlugin` that provides input stream for reading orders and pass them to next stages of Middleware process.

To install `OmsMiddlewareConnector` module, run this command in console:

```bash
composer require spryker-middleware/oms-middleware-connector
```

Please refer to 

config/Shared/config.dist.php

 for example of module configuration. To set up the order export process which should be triggered from the OMS command, add configuration of its name to your project’s config:

```php
$config[OmsMiddlewareConnectorConstants::ORDER_EXPORT_PROCESS_NAME] = OrderExportProcessConfigurationPlugin::PROCESS_NAME;
```

Now, `TriggerOrderExportProcessCommand` is available and can be registered in `OmsDependencyProvider` as well as used in your Oms configuration:

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
       $commandCollection->add(new TriggerOrderExportProcessCommand(), ‘Order/Export);
        
       return $commandCollection;
   });
 
   return $container;
}
...
```

### Mapper

A mapper is a way to generate an array for `WriteSteam` via data taken from `ReadStream`. You should define keys for the new array and match them to payload data according to the strict rules provided as `MapperConfigTransfer`.

At first, you should implement `SprykerMiddleware\Zed\Process\Business\Mapper\Map\AbstractMap`. The abstract methods necessary for implementation are `getStrategy()` and `getMap()`.

By default, Middleware supports two strategies:

| Strategy | Description |
| --- | --- |
| SprykerMiddleware\Zed\Process\Business\Mapper\Map\MapInterface::MAPPER_STRATEGY_SKIP_UNKNOWN | This strategy will skip the keys which weren't mentioned in the mapper configuration from the payload. |
| SprykerMiddleware\Zed\Process\Business\Mapper\Map\MapInterface::MAPPER_STRATEGY_COPY_UNKNOWN | This strategy will copy keys with values which weren't mentioned in the mapper configuration from the payload. |

There are 5 different ways to set mapper rules:

* ArrayMapRule - this rule allows using the given payload as an array with a recursive call;
* DynamicMapRule - this rule allows using the value from the payload as a key;
* ClosureMapRule - this rule allows using a custom function for the payload array;
* DynamicArrayMapRule - this rule allows using the value from the payload as a key and works with the payload as with an array with recursive calls;
* KeyMapeRule - the simplest rule for the mapper that gets the value via the key from the payload. You can use . symbol as a key separator for getting value from the payload.

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
							'&locale; => 'is_allowed',
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

A validator is a way to validate the mapped payload. You should define the validation rules for the mapped array and provide it as `ValidatorConfigTransfer`.

At first, you should implement `SprykerMiddleware\Zed\Process\Business\Validator\ValidationRuleSet\AbstractValidationRuleSet`. The abstract method is necessary for the `getRules()` implementation. This method returns an array with validation rules for the mapped payload.

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

#### Default Validators
There are many predefined validators that can be used in `ValidationRuleSet`.

| Validator Name | Description | Options |
| --- | --- | --- |
| DateTime | Validates that a value is a valid "datetime", meaning a string (or an object that can be cast into a string) that follows a specific format. | format (opt, string) |
| EqualTo | Validates that a value is equal to another value, defined in the options. | value (req, mixed) |
| GreaterOrEqualThan | Validates that a value is equal to or greater than another value, defined in the options. | value (req, mixed) |
| GreaterThan | Validates that a value is greater than another value, defined in the options. | value (req, mixed) |
| InList | Validates that a value is included in a list of values, defined in the options. | values (req, array) |
| Length | Validates that a value's length is greater than a minimum or less than a maximum, defined in options. | min (opt, int)  |
| max (opt, int) |
| LessOrEqualThan | Validates that a value is equal to or less than another value, defined in the options. | value (req, mixed) |
| LessThan | Validates that a value is less than another value, defined in the options. | value (req, mixed) |
| NotBlank | Validates that a value is not blank. |   |
| NotEqualTo | Validates that a value is equal to another value, defined in the options. | value (req, mixed) |
| Regex | Validates that a value matches a regular expression. | pattern (req, string) |
| Required | Validates that a value is not strictly equal to null. |   |
| Type | Validates that a value is of a specific data type. For example, if a variable should be an array, you can use this constraint with the array type option to validate this. | type (req, string) |

#### Create a Custom Validator
To create your own validator, extend `SprykerMiddleware\Zed\Process\Business\Validator\Validators\AbstractValidator` and implement the `validate()` method.

Now, you are ready to create a new validator plugin. You need to extend `SprykerMiddleware\Zed\Process\Communication\Plugin\Validator\AbstractGenericValidatorPlugin`, implement the `getName()` and `getValidatorClassName()` methods, and use this plugin in the `SprykerMiddleware\Zed\Process\ProcessDependencyProvider::getValidatorStack()` method.

#### Example of ValidationRuleSet

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

A translator is a way to update the values from the mapped payload using strict rules from a dictionary. You should define the keys and translator functions provided as `TranslatorConfigTransfer`.

At first, you should implement `SprykerMiddleware\Zed\Process\Business\Translator\Dictionary\AbstractDictionary`. The abstract method is necessary for the `getDictionary()` implementation. This method returns an array with translation rules for mapped payload.

You can apply translator function for value with the type array. You can use the `*` symbol to apply translator function to each value in the array like `mapped_key.*` or use the `mapped_key.*`.subkey syntax to apply translator function to the certain key in the array.

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
				'mapped_key.*.subkey => [
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

| Name | Description | Options |
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

#### Create a Custom Translator Function
To create your own translator function, extend `SprykerMiddleware\Zed\Process\Business\Translator\TranslatorFunction\AbstractTranslatorFunction` and implement the `translate()` method.

Now you are ready to create validator plugin. You should extend `SprykerMiddleware\Zed\Process\Communication\Plugin\TranslatorFunction\AbstractGenericTranslatorFunctionPlugin`, implement the `getName()` and `getTranslatorFunctionClassName()` methods, and use this plugin in the `SprykerMiddleware\Zed\Process\ProcessDependencyProvider::getTranslatorFunctionStack()` method.

Check out an example of the dictionary below:

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

## Data Import Plugins and Business Logic

### Creating importer
First of all, you need to create a business model to import data to the database. Usually, it's called Importer. It should be implemented at the project level.

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

### Prepare Publisher and datasetStepBroker
As an example, we can create `DataImporter` for categories.

Importer business model expects 3 parameters in the constructor, so let's create it.

Firstly, you need to update the business factory with the following methods:

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

So, now we can create a facade method which uses Importer.

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

Now, we need to update the communication layer and create the plugin to import categories.

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

Then, you need to add `CategoryDataImporterPlugin` to communication dependencies.

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

To save the categories into the database you need to create your own `WriteStream`. `SprykerMiddleware\Shared\Process\Stream\WriteStreamInterface` should be implemented.

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

As the parameter for `DataImportWriteStream`, we should use `CategoryDataImporterPlugin`. Now, we add the method to our `BusinessFactory`.

```php
	/*
	 * @return \SprykerMiddleware\Shared\Process\Stream\WriteStreamInterface
	 */
	public function createCategoryWriteStream(): WriteStreamInterface
	{
		return new DataImportWriteStream($this->categoryImporterPlugin);
	}
```

### Update Process Plugins

Finally, you are ready to update process plugins:

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
Now, you should update the communication factory:

```php
	/**
	 * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Stream\OutputStreamPluginInterface
	 */
	public function getCategoryImportOutputStreamPlugin(): OutputStreamPluginInterface
	{
		return $this->getProvidedDependency(MyModuleDependencyProvide::CATEGORY_IMPORT_OUTPUT_STREAM_PLUGIN);
	}
```

The last step is to update Configuration plugin:

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

If the configuration plugin is updated accordingly, category import from `ReadStream` to `WriteStream` will be executed every time when the `CATEGORY_IMPORT_PROCESS` command is run.

<!-- Last review date: Mar 29, 2019- by Valerii Pravoslavnyi, Yuliia Boiko -->
