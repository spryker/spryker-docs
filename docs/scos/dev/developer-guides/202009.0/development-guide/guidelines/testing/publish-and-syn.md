---
title: Publish and Synchronization testing
originalLink: https://documentation.spryker.com/v6/docs/publish-and-synchronization-testing
redirect_from:
  - /v6/docs/publish-and-synchronization-testing
  - /v6/docs/en/publish-and-synchronization-testing
---

Publish & Synchronize (P&S) is an asynchronous process of changing data available to customers by pushing the data into storage, for example, Redis, and making it searchable, for example, with Elasticsearch. Due to its asynchronous nature, it is not easy to test the full process while developing. 

In short, in P&S, you create or update an entity in the database. The process is like this:
1. The changes trigger new messages in the queue.
2. The messages from the queue are consumed and prepare the data to be synchronized.
3. The prepared data is stored in the `*_storage` or in the `*_search` database tables and add new messages to the queue. 
4. The data is loaded from the database tables and pushed to Storage or Search.

For a better testing experience, Spryker provides some helpers that turn this asynchronous process into a synchronous one. For some sort of the process visualization, use the `-vvv` flag in `vendor/bin/codecept` to see what happens in the background.

The main helpers involved in the P&S testing are:

- [PublishAndSynchronizeHelper](https://documentation.spryker.com/docs/available-test-helpers#publishandsynchronizehelper)
- [EventBehaviorHelper](https://documentation.spryker.com/docs/available-test-helpers#eventbehaviorhelper)
- [QueueHelper](https://documentation.spryker.com/docs/available-test-helpers#queuehelper)
- [StorageHelper](https://documentation.spryker.com/docs/available-test-helpers#storagehelper)
- [SearchHelper](https://documentation.spryker.com/v6/docs/available-test-helpers#searchhelper)

## P&S testing Storage
Let's test that the relevant data of a saved entity is available in the Storage, for example, in Redis.

Since we work with the real database, we execute one test for:

- Saving an entity
- Updating an entity
- Removing an entity

### Preparation
To prepare for the test, do the following:

- Create a `Persistence` test suite for your `*Storage` module.
- Besides some other [helpers](https://documentation.spryker.com/docs/test-helpers), add the necessary P&S helpers:
    - [PublishAndSynchronizeHelper](https://documentation.spryker.com/docs/available-test-helpers#publishandsynchronizehelper)
    - [EventBehaviorHelper](https://documentation.spryker.com/docs/available-test-helpers#eventbehaviorhelper)
    - [QueueHelper](https://documentation.spryker.com/docs/available-test-helpers#queuehelper)
    - [StorageHelper](https://documentation.spryker.com/docs/available-test-helpers#storagehelper)
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

### Preparation:
To prepare for the test, do the following:
- Create a `Persistence` test suite for your `*Search` module
- Besides some other [helpers](https://documentation.spryker.com/docs/test-helpers), add the necessary P&S helpers:
    - [PublishAndSynchronizeHelper](https://documentation.spryker.com/docs/available-test-helpers#publishandsynchronizehelper)
    - [EventBehaviorHelper](https://documentation.spryker.com/docs/available-test-helpers#eventbehaviorhelper)
    - [QueueHelper](https://documentation.spryker.com/docs/available-test-helpers#queuehelper)
    - [SearchHelper](https://documentation.spryker.com/docs/available-test-helpers#searchhelper)
- Add the `PublishAndSynchronizeTest` class

This being done, you can start testing the entire process.

### Saving an entity

When you save an entity to the database:

* `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
* `$this->tester->assertEntityIsSynchronizedToSearch('search queue name');` method starts the queue worker for the given queue name and pushes the data to the Search. This method also asserts that at least one message was consumed from the queue.
* `$this->tester->assertSearchHasKey('your expected search key');` metod asserts that the expected key can be found in the Search.

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
