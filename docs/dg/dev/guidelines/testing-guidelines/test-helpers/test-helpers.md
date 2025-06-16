---
title: Test helpers
description: Get a list and descriptions of test helpers to assist you in testing your project.
last_updated: Jan 10, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/available-test-helpers
originalArticleId: 04ad76c7-5d63-4db8-aa96-7446cd8c0541
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/test-helpers/available-test-helpers.html
  - /docs/scos/dev/guidelines/testing/available-test-helpers.html
  - /docs/scos/dev/guidelines/testing-guidelines/available-test-helpers.html
related:
  - title: Code coverage
    link: docs/dg/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/dg/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
  - title: Publish and Synchronization testing
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html
  - title: Setting up tests
    link: docs/dg/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Test framework
    link: docs/dg/dev/guidelines/testing-guidelines/test-framework.html
  - title: Test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/using-test-helpers.html
  - title: Testify
    link: docs/dg/dev/guidelines/testing-guidelines/testify.html
  - title: Testing best practices
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
  - title: Testing concepts
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/testing-concepts.html
  - title: Testing console commands
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/test-console-commands.html
---

Spryker supports a number of test helpers to assist you in testing your project. This article provides details on the supported helpers.

## TwigHelper

Adds `TwigApplicationPlugin` to your test suite and offers methods to add the `TwigPluginInterface` and `TwigLoaderPluginInterface` plugin interfaces.

## EventDispatcherHelper

Adds `EventDispatcherApplicationPlugin` to your test suite and provides methods to create events.

## Propel TransactionHelper

Propel `TransactionHelper` ensures that a connection to the database can be established. Additionally, this helper wraps each test in a transaction. This lets you test against the database without mocking the database away and rolling back after each test.

## Testify helpers

[Testify](/docs/dg/dev/guidelines/testing-guidelines/testify.html) offers many useful helpers that are especially helpful when setting up the infrastructure for your tests.

### Shared helpers

Shared helpers can be used for all application tests.

#### ConfigHelper

This helper lets you easily mock configurations and gives you access to `ModuleConfig`.
To find out `ModuleConfig` of the current module under test, run the following:

```php
$this->tester->getModuleConfig()
```

Manipulating the configuration can be done with the following:
- `\SprykerTest\Shared\Testify\Helper\ConfigHelper::mockEnvironmentConfig()`: Mock an environment-specific configuration here.
- `\SprykerTest\Shared\Testify\Helper\ConfigHelper::mockConfigMethod()`:  Mock a return value of the ModuleConfig method here.
- `\SprykerTest\Shared\Testify\Helper\ConfigHelper::mockSharedConfigMethod`: Mock a return value of a SharedModuleConfig here.


#### VirtualFilesystemHelper

This helper lets you mock away the real filesystem.

This helper has the following methods:

- `\SprykerTest\Shared\Testify\Helper\VirtualFilesystemHelper::getVirtualDirectory()`: Returns a string that points to a virtual directory.
- `\SprykerTest\Shared\Testify\Helper\VirtualFilesystemHelper::getVirtualDirectoryContents()`: Returns the contents of the file in the virtual directory.

There are also some `assert*()` methods that you can use to make assertions for your tests.

### Client helpers

<a name=searchhelper></a>

#### SearchHelper

When you have this helper, an in-memory search adapter is automatically used instead of the ones defined on the project side. This lets you synchronously work with [Search](https://github.com/spryker/search)—for example, when using it together with the [Publish and Synchronization tests](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html).

{% info_block infoBox %}

To use `SearchClient` with the in-memory search, you can either use the `SearchHelper::getClient()` method or `$locator->search()->client()`.

{% endinfo_block %}

This helper has the following methods:
- `assertSearchHasKey()`: Use this method to validate that an entry with the given ID exists in Search.
- `assertSearchNotHasKey()`: Use this method to validate that an entry with a given id does not exist in Search.
- `getClient()`: Use this method to retrieve `SearchClient` that uses the in-memory search.
- `cleanupInMemorySearch()`: Use this method to clean up the in-memory search.

<a name=storagehelper></a>

#### StorageHelper

When you have this helper, an in-memory storage plugin is automatically used instead of the ones defined on the project side. This lets you synchronously work with [Storage](https://github.com/spryker/storage)—for example, when using it together with the [Publish and Synchronization tests](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html).

{% info_block infoBox %}

To use `StorageClient` with the in-memory search, you can either use the `StorageHelper::getClient()` method or `$locator->storage()->client()`.

{% endinfo_block %}

This helper has the following methods:
- `assertStorageHasKey()`: Use this method to validate that entry with the given ID exists in Storage.
- `assertStorageNotHasKey()`: Use this to validate that entry with the given ID does not exist in Storage.
- `getClient()`: Use this method to retrieve SearchClient that uses the in-memory storage.
- `cleanupInMemoryStorage()`: Use this method to clean up the in-memory storage.

<a name="queuehelper"></a>

#### QueueHelper

When you have this helper, an in-memory queue adapter is automatically used instead of the ones defined on the project side. This lets you synchronously work with [Queue](https://github.com/spryker/queue)—for example, when using it together with the [Publish and Synchronization tests](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html).

{% info_block infoBox %}

To use `QueueClient` with the in-memory search, you can either use the `QueueHelper::getClient()` method or `$locator->queue()->client()`

{% endinfo_block %}

This helper has the following methods:

- `assertMessagesConsumedFromEventQueue()`: Triggers `QueueFacade::startTask()`, which starts consuming messages from the given queue. This method also ensures that all messages consumed from the queue are either *acknowledged*, *rejected*, or *errored*. When something went wrong in the process, the helper informs about that.
- `assertQueueMessageCount()`: Use this method to validate that at least the passed number of entries exists in the queue.
- `assertMessagesConsumedFromQueueAndSyncedToStorage()`: Use this method to start the task for consuming the message from the queue. Optionally, you can pass `$expectedStorageKeyThatShouldExist` to also make an assertion on Storage.
- `assertMessagesConsumedFromQueueAndUpdatedInStorage()`: Use this method to start the task for consuming the message from the queue. Optionally, you can pass  `$expectedStorageKeyThatShouldExist` to also make an assertion on Storage.
- `assertMessagesConsumedFromQueueAndRemovedFromStorage()`: Use this method to start the task for consuming the message from the queue. Optionally, you can pass `$expectedStorageKeyThatShouldExist` to also make an assertion on Storage.
- `assertMessagesConsumedFromQueueAndSyncedToSearch()`: Use this method to start the task for consuming the message from the queue. Optionally, you can pass `$expectedSearchKeyThatShouldExist` to also make an assertion on Search.
- `assertMessagesConsumedFromQueueAndUpdatedInSearch()`: Use this method to start the task for consuming the message from the queue. Optionally, you can pass `$expectedSearchKeyThatShouldExist` to also make an assertion on Search.
- `assertMessagesConsumedFromQueueAndRemovedFromSearch()`: Use this method to start the task for consuming the message from the queue. Optionally, you can pass `$expectedSearchKeyThatShouldExist` to also make an assertion on Search.
- `getClient()`: Use this method to retrieve SearchClient that uses the in-memory queue.
- `cleanupInMemoryQueue()`: Use this method to clean up the in-memory queue.


### Zed helpers

You can use the Zed helpers only for testing the Zed application.

<a name="publishandsynchronizehelper"></a>

#### PublishAndSynchronizeHelper

`PublishAndSynchronizeHelper` is a helper wrapper that simplifies the implementation of the [Publish and Synchronization tests](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html).

This helper has the following methods:
- `assertEntityIsPublished()`: Use this method after an entity you want to test has been saved.
- `assertEntityCanBeManuallyPublished()`: Use this method when you don't use the events created by [EventBehavior](https://github.com/spryker/event-behavior).
- `assertEntityIsSynchronizedToStorage()`: This method triggers the required [QueueHelper](#queuehelper) methods for consuming messages and assertions.
- `assertEntityIsUpdatedInStorage()`: This method triggers the required `QueueHelper` methods for consuming messages and
assertions.
- `assertEntityIsRemovedFromStorage()`: This method triggers the required `QueueHelper` methods for consuming messages and
assertions.
- `assertEntityIsSynchronizedToSearch()`: This method triggers the required `QueueHelper` methods for consuming messages and
assertions.
- `assertEntityIsUpdatedInSearch()`: This method triggers the required `QueueHelper` methods for consuming messages and
assertions.
- `assertEntityIsRemovedFromSearch()`: This method triggers the required `QueueHelper` methods for consuming messages and
assertions.


<a name=eventbehaviorhelper></a>

#### EventBehaviorHelper

This helper is useful for the [Publish and Synchronization tests](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html).

This helper has the following methods:

- `triggerRuntimeEvents()`—After an entity has been changed, you need to publish its data using this method.
- `assertAtLeastOneEventBehaviorEntityChangeEntryExistsForEvent()`—After the runtime events have been triggered, with this method, you can assert that at least one entry in the intermediate database table exists.

#### BusinessHelper

Lets you mock and access business layer classes like `BusinessFactory` inside a mocked facade.
Example of usage:

```php
$this->tester->mockFacadeMethod('reloadItems', function(){ return new QuoteTransfer()});
$this->tester->mockFactoryMethod('createQuoteReloader', function() { return ... });
$facade = $this->tester->getFacade();
$facade->someThing();
```

Alternatively, you can pass this as a mock to another module using `DependencyHelper`.


#### CommunicationHelper

Lets you mock and access communication layer classes like `CommunicationFactory`.

#### TableHelper

Lets you work with tables rendered on pages.

### Yves Helpers

The Yves helpers can only be used for testing the Yves application.

#### FactoryHelper

Lets you mock and access the factory.


#### DependencyHelper

Lets you mock the dependencies of a module.

To enable this feature, in the config used to run tests, set `\Spryker\Shared\Kernel\KernelConstants::ENABLE_CONTAINER_OVERRIDING` to `true`. This is already implemented in `config_ci.php` in our Demo Shops.

Calling in your test `$this->tester->setDependency(OmsDependencyProvider::FACADE_SALES, $salesFacadeMock);` provides `$salesFacadeMock` whenever any model is created with a dependency to Sales facade.

Technically, in the `Oms` module, calling `$this->getProvidedDependency(OmsDependencyProvider::FACADE_SALES)` returns `$salesFacadeMock`.

### Glue Helpers

The Glue helpers can only be used for testing the Glue application.

#### DependencyProviderHelper

Lets you set dependencies to a module or mock existing ones.

#### FactoryHelper

Lets you mock factory methods and access the factory.

#### OpenApi3

Lets you validate the response of Glue API endpoints against the OpenApi3 schema.

#### JsonPath

Lets you navigate through the JSON response of the API endpoints.

#### GlueRest

Lets you send requests to the Glue API endpoints and validate response data.

#### GlueBackendApiJsonApiHelper

Lets you send requests to the Glue Backend API endpoints that implement JSON API convention and validate response data.

#### GlueBackendApiOpenApi3Helper

Lets you validate the response of Glue Backend API endpoints against the OpenApi3 schema.


## PropelSchemaHelper

Lets you create `SimpleXMLElement` based on the XML schema file and format the XML content.

## TableHelper

Lets you create a table in the database and the `\Propel\Generator\Model\Table` object based on a database engine.

## PropelFileHelper

Lets you create Propel model files based on builders and tables.

## Next step

[Enable a test helper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html).
