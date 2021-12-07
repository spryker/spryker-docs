---
title: Available test helpers
description: Get a list and descriptions of test helpers to assist you in testing your project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/available-test-helpers
originalArticleId: 04ad76c7-5d63-4db8-aa96-7446cd8c0541
redirect_from:
  - /2021080/docs/available-test-helpers
  - /2021080/docs/en/available-test-helpers
  - /docs/available-test-helpers
  - /docs/en/available-test-helpers
  - /v6/docs/available-test-helpers
  - /v6/docs/en/available-test-helpers
  - /v5/docs/twig
  - /v5/docs/en/twig
  - /v5/docs/propel
  - /v5/docs/en/propel
  - /docs/scos/dev/guidelines/testing/available-test-helpers.html
---

Spryker supports a number of test helpers to assist you in testing your project. This article provides details on the supported helpers.

## TwigHelper
Adds the `TwigApplicationPlugin` to your test suite and offers methods to add the `TwigPluginInterface` and `TwigLoaderPluginInterface` plugin interfaces.

## EventDispatcherHelper
Adds the `EventDispatcherApplicationPlugin` to your test suite and provides methods to create events.

## Propel TransactionHelper
Propel TransactionHelper ensures that a connection to the database can be established. Additionally, this helper wraps each test in a transaction. This allows you to test against the database without mocking the database away and rolling back after each test.

## Testify helpers
[Testify](/docs/scos/dev/guidelines/testing-guidelines/testify.html) offers many useful helpers that are especially helpful when setting up the infrastructure for your tests.

### Shared helpers
Shared helpers can be used for all application tests.

#### ConfigHelper

This helper lets you easily mock configurations and gives you access to the ModuleConfig.
To find out the ModuleConfig of the current module under test, run
```
$this->tester->getModuleConfig()
```

Manipulating the configuration can be done with:

- `\SprykerTest\Shared\Testify\Helper\ConfigHelper::mockEnvironmentConfig()`: Mock an environment specific configuration here.

- `\SprykerTest\Shared\Testify\Helper\ConfigHelper::mockConfigMethod()`:  Mock a return value of the ModuleConfig method here.

- `\SprykerTest\Shared\Testify\Helper\ConfigHelper::mockSharedConfigMethod`: Mock a return value of a SharedModuleConfig here.


#### VirtualFilesystemHelper
This helper lets you mock away the real filesystem.

This helper has the following methods:

* `\SprykerTest\Shared\Testify\Helper\VirtualFilesystemHelper::getVirtualDirectory()`: Returns a string that points to a virtual directory.
* `\SprykerTest\Shared\Testify\Helper\VirtualFilesystemHelper::getVirtualDirectoryContents()`: Returns the contents of the file in the virtual directory.

There are also some `assert*()` methods that you can use to make assertions for your tests.

{% info_block infoBox %}

More information on this helper will follow soon.

{% endinfo_block %}

### Client Helpers

<a name=searchhelper></a>

#### SearchHelper
When you have this helper, an in-memory search adapter is automatically used instead of the ones defined on the project side. This allows you to work with [Search](https://github.com/spryker/search) in a synchronous way, for example, when using together with the [Publish and Synchronization tests](/docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html).

 {% info_block infoBox %}

To use SearchClient with the in-memory search you can either use the `SearchHelper::getClient()` method or `$locator->search()->client()`.

{% endinfo_block %}

This helper has the following methods:

- `assertSearchHasKey()`: Use this method to validate that an entry with the given ID exists in Search.
- `assertSearchNotHasKey()`: Use this method to validate that an entry with a given id does not exist in Search.
- `getClient()`: Use this method to retrieve SearchClient that uses the in-memory search.
- `cleanupInMemorySearch()`: Use this method when you need to clean up the in-memory search.

<a name=storagehelper></a>

#### StorageHelper
When you have this helper, an in-memory storage plugin is automatically used instead of the ones defined on the project side. This allows you to work with [Storage](https://github.com/spryker/storage) in a synchronous way, for example, when using together with the [Publish and Synchronization tests](/docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html).

{% info_block infoBox %}

To use StorageClient with the in-memory search you can either use the `StorageHelper::getClient()` method or `$locator->storage()->client()`.

{% endinfo_block %}

This helper has the following methods:

- `assertStorageHasKey()`: Use this method to validate that entry with the given ID exists in Storage.
- `assertStorageNotHasKey()`: Use this to validate that entry with the given ID does not exist in Storage.
- `getClient()`: Use this method to retrieve SearchClient that uses the in-memory storage.
- `cleanupInMemoryStorage()`: Use this method when you need to clean up the in-memory storage.

<a name="queuehelper"></a>

#### QueueHelper
When you have this helper, an in-memory queue adapter is automatically used instead of the ones defined on the project side. This allows you to work with [Queue](https://github.com/spryker/queue) in a synchronous way, for example, when using together with the [Publish and Synchronization tests](/docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html).

{% info_block infoBox %}

To use QueueClient with the in-memory search you can either use the `QueueHelper::getClient()` method or `$locator->queue()->client()`

{% endinfo_block %}

This helper has the following methods:

- `assertMessagesConsumedFromEventQueue()`: Triggers `QueueFacade::startTask()` which starts consuming messages from the given queue. This method also ensures that all messages consumed from the queue are either *acknowledged*, *rejected* or *errored*. When something went wrong in the process, the helper informs about that.
- `assertQueueMessageCount()`: Use this method to validate that at least the passed number of entries exists in the queue.
- `assertMessagesConsumedFromQueueAndSyncedToStorage()`: Use this method to start the task for consuming message from the queue. Optionally, you can pass `$expectedStorageKeyThatShouldExist` to also make an assertion on Storage.
- `assertMessagesConsumedFromQueueAndUpdatedInStorage()`: Use this method to start the task for consuming message from the queue. Optionally, you can pass  `$expectedStorageKeyThatShouldExist` to also make an assertion on Storage.
- `assertMessagesConsumedFromQueueAndRemovedFromStorage()`: Use this method to start the task for consuming message from the queue. Optionally, you can pass `$expectedStorageKeyThatShouldExist` to also make an assertion on Storage.
- `assertMessagesConsumedFromQueueAndSyncedToSearch()`: Use this method to start the task for consuming message from the queue. Optionally, you can pass `$expectedSearchKeyThatShouldExist` to also make an assertion on Search.
- `assertMessagesConsumedFromQueueAndUpdatedInSearch()`: Use this method to start the task for consuming message from the queue. Optionally, you can pass `$expectedSearchKeyThatShouldExist` to also make an assertion on Search.
- `assertMessagesConsumedFromQueueAndRemovedFromSearch()`: Use this method to start the task for consuming message from the queue. Optionally, you can pass `$expectedSearchKeyThatShouldExist` to also make an assertion on Search.
- `getClient()`: Use this method to retrieve SearchClient that uses the in-memory queue.
- `cleanupInMemoryQueue()`: Use this method when you need to cleanup the in-memory queue.


### Zed Helpers
You can use the Zed helpers only for testing the Zed application.

<a name="publishandsynchronizehelper"></a>

#### PublishAndSynchronizeHelper
PublishAndSynchronizeHelper is a helper wrapper that simplifies implementation of the [Publish and Synchronization tests](/docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html).

This helper has the following methods:

- `assertEntityIsPublished()`: Use this method after an entity you want to test has been saved.
- `assertEntityCanBeManuallyPublished()`: Use this method when you don't use the events created by [EventBehavior](https://github.com/spryker/event-behavior).
- `assertEntityIsSynchronizedToStorage()`: This method triggers the required [QueueHelper](#queuehelper) methods for consuming messages and assertions.
- `assertEntityIsUpdatedInStorage()`: This method triggers the required QueueHelper methods for consuming messages and
assertions.
- `assertEntityIsRemovedFromStorage()`: This method triggers the required QueueHelper methods for consuming messages and
assertions.
- `assertEntityIsSynchronizedToSearch()`: This method triggers the required QueueHelper methods for consuming messages and
assertions.
- `assertEntityIsUpdatedInSearch()`: This method triggers the required QueueHelper methods for consuming messages and
assertions.
- `assertEntityIsRemovedFromSearch()`: This method triggers the required QueueHelper methods for consuming messages and
assertions.

#### DependencyProviderHelper
Allows to mock dependencies required for your tests.

<a name=eventbehaviorhelper></a>

#### EventBehaviorHelper
This helper is useful for the [Publish and Synchronization tests](/docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html).

This helper has the following methods:

- `triggerRuntimeEvents()` - After an entity has been changed, you need to publish its data by using this method.
- `assertAtLeastOneEventBehaviorEntityChangeEntryExistsForEvent()` - After the runtime events have been triggered, with this method, you can assert that at least one entry in the intermediate database table exists.

#### BusinessHelper
Allows to mock and access business layer classes like BusinessFactory.

#### CommunicationHelper
Allows to mock and access communication layer classes like the CommunicationFactory.

#### TableHelper
Allows you to work with tables rendered on pages.

### Yves Helpers
The Yves helpers can only be used for testing the Yves application.

#### FactoryHelper
Allows you to mock and access the Factory.

#### DependencyProviderHelper
Allows you to mock dependencies required for your tests.

## PropelSchemaHelper
Allows you to create SimpleXMLElement based on the XML schema file and format the XML content.

## TableHelper
Allows you to create a table in the database and the `\Propel\Generator\Model\Table` object based on a database engine.

## PropelFileHelper
Allows you to create Propel model files based on builders and tables.

## Next Steps
* [Set up an organization of your tests](/docs/scos/dev/guidelines/testing-guidelines/setting-up-tests.html).
* [Create or enable a test helper](/docs/scos/dev/guidelines/testing-guidelines/test-helpers.html).
Learn about the [console commands you can use to execute your tests](/docs/scos/dev/guidelines/testing-guidelines/executing-tests.html).
* [Configure data builders to create transfers your tests](/docs/scos/dev/guidelines/testing-guidelines/data-builders.html).
* [Generate code coverage report for your tests](/docs/scos/dev/guidelines/testing-guidelines/code-coverage.html).
* Learn about the [testing best practices](/docs/scos/dev/guidelines/testing-guidelines/testing-best-practices.html).
