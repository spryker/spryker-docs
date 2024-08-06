---
title: Testing the Publish and Synchronization process
description: Learn how you can test Publish and Synchronization
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization-testing
originalArticleId: 5691dcf2-a612-4cf9-bdff-8609f299ffec
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/executing-tests/test-the-publish-and-synchronization-process.html
  - /docs/scos/dev/guidelines/testing/publish-and-synchronization-testing.html
  - /docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html
related:
  - title: Available test helpers
    link: docs/scos/dev/guidelines/testing-guidelines/available-test-helpers.html
  - title: Code coverage
    link: docs/scos/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/scos/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/scos/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
  - title: Setting up tests
    link: docs/scos/dev/guidelines/testing-guidelines/setting-up-tests.html
  - title: Test framework
    link: docs/scos/dev/guidelines/testing-guidelines/test-framework.html
  - title: Test helpers
    link: docs/scos/dev/guidelines/testing-guidelines/test-helpers.html
  - title: Testify
    link: docs/scos/dev/guidelines/testing-guidelines/testify.html
  - title: Testing best practices
    link: docs/scos/dev/guidelines/testing-guidelines/testing-best-practices.html
  - title: Testing concepts
    link: docs/scos/dev/guidelines/testing-guidelines/testing-concepts.html
  - title: Testing console commands
    link: docs/scos/dev/guidelines/testing-guidelines/testing-console-commands.html
---

Publish & Synchronize (P&S) is an asynchronous process of changing data available to customers by pushing the data into storage, for example, Redis, and making it searchable, for example, with Elasticsearch. Due to its asynchronous nature, it is not easy to test the full process while developing.

In short, in P&S, you create or update an entity in the database. The process is like this:

1. The changes trigger new messages in the queue.
2. The messages from the queue are consumed and prepare the data to be synchronized.
3. The prepared data is stored in the `*_storage` or in the `*_search` database tables and add new messages to the queue.
4. The data is loaded from the database tables and pushed to Storage or Search.

For a better testing experience, Spryker provides some helpers that turn this asynchronous process into a synchronous one. For some sort of the process visualization, use the `-vvv` flag in `vendor/bin/codecept` to see what happens in the background.

The main helpers involved in the P&S testing are:

- [PublishAndSynchronizeHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#publishandsynchronizehelper)
- [EventBehaviorHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#eventbehaviorhelper)
- [QueueHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#queuehelper)
- [StorageHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#storagehelper)
- [SearchHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#searchhelper)

## P&S testing storage

Let's test that the relevant data of a saved entity is available in the Storage, for example, in Redis.

Since we work with the real database, we execute one test for:

- Saving an entity
- Updating an entity
- Removing an entity

### Preparation

To prepare for the test, do the following:

- Create a `Persistence` test suite for your `*Storage` module.
- Besides some other [helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html), add the necessary P&S helpers:
    - [PublishAndSynchronizeHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#publishandsynchronizehelper)
    - [EventBehaviorHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#eventbehaviorhelper)
    - [QueueHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#queuehelper)
    - [StorageHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#storagehelper)
- Add the `PublishAndSynchronizeTest` class

This being done, you can start testing the entire process.

### Saving an entity

When you save an entity to the database:

* `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
* `$this->tester->assertEntityIsSynchronizedToStorage('storage queue name');` method starts the queue worker for the given queue name and pushes the data to the storage. This method also asserts that at least one message was consumed from the queue.
* `$this->tester->assertStorageHasKey('your expected storage key');` method asserts that the expected key can be found in the Storage.


### Updating an entity

When you update an entity:

* `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
* `$this->tester->assertEntityIsUpdatedInStorage('storage queue name');` method starts the queue worker for the given queue name and pushes the data to the storage. This method also asserts that at least one message was consumed from the queue.

### Deleting an entity

When you delete an entity:

* `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
* `$this->tester->assertEntityIsRemovedFromStorage('storage queue name');` method starts the queue worker for the given queue name and removes the data from the storage. This method also asserts that at least one message was consumed from the queue.
* `$this->tester->assertStorageNotHasKey('your expected storage key');` method ensures that the key and its data have been removed from the Storage.


## P&S testing Search

Let's test that the relevant data of a saved entity is available in the Search, for example, Elasticsearch.

Since we work with the real database, we execute one test for:

- Saving an entity
- Updating an entity
- Removing an entity

### Preparation

To prepare for the test, do the following:

- Create a `Persistence` test suite for your `*Search` module
- Besides some other [helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html), add the necessary P&S helpers:
    - [PublishAndSynchronizeHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#publishandsynchronizehelper)
    - [EventBehaviorHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#eventbehaviorhelper)
    - [QueueHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#queuehelper)
    - [SearchHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#searchhelper)
- Add the `PublishAndSynchronizeTest` class

This being done, you can start testing the entire process.

### Saving an entity

When you save an entity to the database:

* `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
* `$this->tester->assertEntityIsSynchronizedToSearch('search queue name');` method starts the queue worker for the given queue name and pushes the data to the Search. This method also asserts that at least one message was consumed from the queue.
* `$this->tester->assertSearchHasKey('your expected search key');` method asserts that the expected key can be found in the Search.

### Updating an entity

When you update an entity:

* `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.        
* `$this->tester->assertEntityIsUpdatedInSearch('search queue name');` method starts the queue worker for the given queue name and pushes the data to the Search. This method also asserts that at least one message was consumed from the queue.

### Deleting an entity

When you delete an entity:

* `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
* `$this->tester->assertEntityIsRemovedFromSearch('search queue name');` method starts the queue worker for the given queue name and removes the data from the Search. This method also asserts that at least one message was consumed from the queue.
* `$this->tester->assertSearchNotHasKey('your expected search key');` method ensures that the key and it's data was removed from the Search.

## Troubleshooting

When you see the following error:

*Propel\Runtime\Exception\PropelException - This operation is not allowed inside of transaction in ...*

add `@disableTransaction` in the doc block of your test case.
