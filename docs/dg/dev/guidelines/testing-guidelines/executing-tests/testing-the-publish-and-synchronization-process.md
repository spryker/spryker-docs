---
title: Testing the Publish and Synchronization process
description: Learn how to test the publish and synchronization process with this helpful guide for your Spryker based projects.
last_updated: Sep 17, 2026
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/publish-and-synchronization-testing
originalArticleId: 5691dcf2-a612-4cf9-bdff-8609f299ffec
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/executing-tests/test-the-publish-and-synchronization-process.html
  - /docs/scos/dev/guidelines/testing/publish-and-synchronization-testing.html
  - /docs/scos/dev/guidelines/testing-guidelines/publish-and-synchronization-testing.html
related:
  - title: Testing strategy
    link: docs/dg/dev/guidelines/testing-guidelines/testing-strategy.html
  - title: Testing the Publish and Synchronization golden path
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-golden-path.html
  - title: Available test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
  - title: Code coverage
    link: docs/dg/dev/guidelines/testing-guidelines/code-coverage.html
  - title: Data builders
    link: docs/dg/dev/guidelines/testing-guidelines/data-builders.html
  - title: Executing tests
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/executing-tests.html
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

Publish & Synchronize (P&S) is an asynchronous process of changing data available to customers by pushing the data into storage, for example, Redis, and making it searchable, for example, with Elasticsearch. Because of its asynchronous nature, it's not easy to test the full process while developing.

In short, in P&S, you create or update an entity in the database. The process is like this:

1. The changes trigger new messages in the queue.
2. The messages from the queue are consumed and prepare the data to be synchronized.
3. The prepared data is stored in the `*_storage` or in the `*_search` database tables and add new messages to the queue.
4. The data is loaded from the database tables and pushed to Storage or Search.

For a better testing experience, Spryker provides some helpers that turn this asynchronous process into a synchronous one. For some sort of the process visualization, use the `-vvv` flag in `vendor/bin/codecept` to see what happens in the background.

## What a P&S module test proves

{% include diagrams/testing/publish-and-synchronize-coverage.md %}

A P&S module test runs in one process against the real database. The queue, the storage, and the search are replaced by in-memory helpers: `QueueHelper`, `StorageHelper`, and `SearchHelper` each register an in-memory plugin in place of the real service. No message reaches a real broker and no key reaches a real storage or search product. The test proves that the module's publisher and synchronizer produce the right event, the right `*_storage` or `*_search` table row, and the right key and payload. It cannot prove that the real services are wired correctly; that is the job of the [golden path test](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-golden-path.html), which runs once per critical domain on the assembled project and is still *Planned*. For how the two fit into the wider picture, see [Testing strategy](/docs/dg/dev/guidelines/testing-guidelines/testing-strategy.html).

The tests live in the `Communication` suite of the `*Storage` or `*Search` module, because the subjects are plugins: the publish listener or publisher plugin that writes the table row, and the synchronization data repository plugin that reads it back for the queue. `Persistence` in Spryker names the Propel application layer of a module, so it is not the place for these tests even though storage and search hold data.

## Two ways to write the test

Core modules test the plugins directly. This is the common form and the one to start with:

- A publish listener test creates an entity through the module's fixture helper, calls `handleBulk()` on the listener with the entity's id and event name, and asserts through the storage module's repository that the expected `*_storage` row exists with the expected payload fields.
- A synchronization data repository plugin test creates a storage row through the fixture helper, calls `getData()` on the plugin, and asserts that the returned synchronization data transfers carry the expected key and data.

Both tests register the queue adapters through `setDependency()` so that no real broker is contacted.

The `PublishAndSynchronizeHelper` offers the second form: it drives the whole in-process chain from a saved entity to a key in the in-memory storage or search. Use it when a module's chain has several steps between event and key, for example a publisher that fans out into more than one storage table, and the plugin-level tests would leave the connection between those steps unproven. The rest of this page describes that form.

The main helpers involved in the P&S testing are:

- [PublishAndSynchronizeHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#publishandsynchronizehelper)
- [EventBehaviorHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#eventbehaviorhelper)
- [QueueHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#queuehelper)
- [StorageHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#storagehelper)
- [SearchHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#searchhelper)

## P&S testing storage

Let's test that the relevant data of a saved entity is available in the Storage. In the test, the Storage is the in-memory replacement registered by `StorageHelper`, not the key-value store the project runs, for example, Redis or Valkey.

Since we work with the real database, we execute one test for:

- Saving an entity
- Updating an entity
- Removing an entity

### Preparation

To prepare for the test, do the following:

- Use the `Communication` test suite of your `*Storage` module.
- Besides some other [helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html), add the necessary P&S helpers:
  - [PublishAndSynchronizeHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#publishandsynchronizehelper)
  - [EventBehaviorHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#eventbehaviorhelper)
  - [QueueHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#queuehelper)
  - [StorageHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#storagehelper)
- Add the `PublishAndSynchronizeTest` class

This being done, you can start testing the entire process.

### Saving an entity

When you save an entity to the database:

- `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
- `$this->tester->assertEntityIsSynchronizedToStorage('storage queue name');` method starts the queue worker for the given queue name and pushes the data to the storage. This method also asserts that at least one message was consumed from the queue.
- `$this->tester->assertStorageHasKey('your expected storage key');` method asserts that the expected key can be found in the Storage.


### Updating an entity

When you update an entity:

- `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
- `$this->tester->assertEntityIsUpdatedInStorage('storage queue name');` method starts the queue worker for the given queue name and pushes the data to the storage. This method also asserts that at least one message was consumed from the queue.

### Deleting an entity

When you delete an entity:

- `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
- `$this->tester->assertEntityIsRemovedFromStorage('storage queue name');` method starts the queue worker for the given queue name and removes the data from the storage. This method also asserts that at least one message was consumed from the queue.
- `$this->tester->assertStorageNotHasKey('your expected storage key');` method ensures that the key and its data have been removed from the Storage.


## P&S testing Search

Let's test that the relevant data of a saved entity is available in the Search. In the test, the Search is the in-memory replacement registered by `SearchHelper`, not the search engine the project runs, for example, Elasticsearch.

Since we work with the real database, we execute one test for:

- Saving an entity
- Updating an entity
- Removing an entity

### Preparation

To prepare for the test, do the following:

- Use the `Communication` test suite of your `*Search` module
- Besides some other [helpers](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html), add the necessary P&S helpers:
  - [PublishAndSynchronizeHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#publishandsynchronizehelper)
  - [EventBehaviorHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#eventbehaviorhelper)
  - [QueueHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#queuehelper)
  - [SearchHelper](/docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html#searchhelper)
- Add the `PublishAndSynchronizeTest` class

This being done, you can start testing the entire process.

### Saving an entity

When you save an entity to the database:

- `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
- `$this->tester->assertEntityIsSynchronizedToSearch('search queue name');` method starts the queue worker for the given queue name and pushes the data to the Search. This method also asserts that at least one message was consumed from the queue.
- `$this->tester->assertSearchHasKey('your expected search key');` method asserts that the expected key can be found in the Search.

### Updating an entity

When you update an entity:

- `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
- `$this->tester->assertEntityIsUpdatedInSearch('search queue name');` method starts the queue worker for the given queue name and pushes the data to the Search. This method also asserts that at least one message was consumed from the queue.

### Deleting an entity

When you delete an entity:

- `$this->tester->assertEntityIsPublished('your event name', 'publish queue name');` method triggers runtime events for the given `eventName` and asserts that at least one entry exists in the expected queue.
- `$this->tester->assertEntityIsRemovedFromSearch('search queue name');` method starts the queue worker for the given queue name and removes the data from the Search. This method also asserts that at least one message was consumed from the queue.
- `$this->tester->assertSearchNotHasKey('your expected search key');` method ensures that the key and it's data was removed from the Search.

## Troubleshooting

When you see the following error:

*Propel\Runtime\Exception\PropelException - This operation is not allowed inside of transaction in ...*

add `@disableTransaction` in the doc block of your test case.
