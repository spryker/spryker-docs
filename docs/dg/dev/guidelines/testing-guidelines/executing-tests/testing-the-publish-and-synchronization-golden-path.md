---
title: Testing the Publish and Synchronization golden path
description: Learn how a golden path test proves that queue, storage, and search are wired correctly on a fully assembled project after a full data import, and where such tests live.
last_updated: Sep 17, 2026
template: concept-topic-template
related:
  - title: Testing strategy
    link: docs/dg/dev/guidelines/testing-guidelines/testing-strategy.html
  - title: Testing the Publish and Synchronization process
    link: docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html
  - title: Test helpers
    link: docs/dg/dev/guidelines/testing-guidelines/test-helpers/test-helpers.html
---

A golden path test proves that Publish and Synchronize (P&S) works on the fully assembled project: the real queue, the real storage, and the real search engine, wired the way the project configured them. It runs once per critical domain after a full data import. It is the counterpart of the [P&S module test](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html), which runs in one process with in-memory replacements for those services.

{% info_block warningBox "This test type does not exist yet" %}

The golden path is *Planned*. Nothing described on this page ships today. The page states the target design so that projects can plan for it and so that the reference implementation Spryker is building in the demo shops has something to match. Until it arrives, the [P&S module test](/docs/dg/dev/guidelines/testing-guidelines/executing-tests/testing-the-publish-and-synchronization-process.html) is the only automated proof of P&S, and it cannot see past the in-memory helpers.

{% endinfo_block %}

## Golden path and module test

The two tests have different subjects. The module test proves that a module's publisher and synchronizer produce the right event, the right storage or search table row, and the right key and payload. It cannot see past the adapter, because the queue, storage, and search are in-memory. The golden path proves everything the module test cannot see: queue configuration, the registered publisher plugins, key generation, the storage and search adapters, index mappings, and the workers. It says nothing new about any single module.

{% include diagrams/testing/publish-and-synchronize-coverage.md %}

| | P&S module test | Golden path |
|---|---|---|
| Processes | one | the full stack with queue workers |
| Real | database | database, queue, storage, search |
| Replaced | queue, storage, search | nothing |
| Proves | the module's mapping and key logic | the platform wiring |
| Fails when | the module is wrong | the configuration or the infrastructure is wrong |
| Count | one per Storage or Search module, covering save, update, and delete | one per critical domain |
| Writes come from | the test itself, which saves, updates, and deletes an entity | the data import and the publish step that run before the suite |
| The test method itself | writes, then reads back | only reads |
| Owner | the module | the project |

The golden path suite writes plenty: the data import fills the database, the publish step produces the events, and the queue workers write into storage and search. What the *test methods* do is read, because everything worth asserting has already happened by the time the suite starts. A golden path test that wrote its own entity would be a slower copy of the module test.

Every in-memory storage, search, or queue helper in a module test is a substitute. The golden path is the test that pairs those substitutes with the real services, which is why it exists and why it stays small.

## Why a Cypress journey is not enough

A Cypress journey walks the storefront, so it reads the same data the golden path reads, and it is fair to ask what the golden path adds. It adds attribution and reach.

Consider a publisher plugin that a project forgot to register in its `PublishEventDependencyProvider`. After a fresh import, the product detail page returns "not found". Cypress reports a missing page: the failure could be routing, a template, the import, the queue, the storage adapter, or the plugin, and somebody bisects the stack to find out. The golden path reports that an imported product abstract never reached storage, which leaves one place to look.

The golden path also runs in the job that already assembles the stack and already runs the import, so it costs that job seconds rather than a new environment, and a developer can reproduce it without a browser. A P&S defect should be found by the test type that owns P&S, not by the last and slowest test type in the suite.

## Why the golden path lives in the project

Only the project knows its own wiring: which publisher and synchronization plugins are registered, how the queues are named and grouped, which stores and locales exist, which data import recipe fills the database, and which storage and search products run underneath. A core module cannot assert a stack it does not own. The golden path is therefore delivered and maintained at the project level. Spryker ships a reference implementation in the demo shops that a project copies and adjusts to its own domains.

## Where the tests live

The directory structure below is the target shape. No project ships it yet.

```text
tests/PyzTest/Shared/PublishAndSynchronize/
├── codeception.yml            # suite: GoldenPath
├── GoldenPath/
│   ├── ProductGoldenPathTest.php
│   ├── PriceGoldenPathTest.php
│   ├── AvailabilityGoldenPathTest.php
│   ├── CategoryGoldenPathTest.php
│   ├── CmsPageGoldenPathTest.php
│   └── GlossaryGoldenPathTest.php
└── _support/
    └── PublishAndSynchronizeGoldenPathTester.php
```

The suite does not enable the in-memory `StorageHelper`, `SearchHelper`, or `QueueHelper`. The tester resolves the real Storage and Search clients, so the test reads exactly what a storefront request would read.

One test class per critical domain. Start with the domains a customer cannot shop without: product, price, availability, category, CMS page, and glossary. Add a domain only when its data reaches the storefront through its own publisher and its own storage or search module.

## How the golden path runs

The golden path runs in a job on the assembled stack, not on a developer machine by default. The sequence is fixed:

1. Start the full stack with the real queue, storage, and search.
2. Run the full data import.
3. Trigger publishing for all publisher plugins.
4. Start the queue workers until every queue is empty.
5. Run the `GoldenPath` suite.

```bash
console data:import
console publish:trigger-events
console queue:worker:start --stop-when-empty
vendor/bin/codecept run -c tests/PyzTest/Shared/PublishAndSynchronize GoldenPath
```

The first assertion of the suite is that the run itself was clean: no queue holds an unprocessed message and no message ended in an error queue. A non-empty error queue fails the suite before any domain test runs, because every later assertion would report the same root cause less clearly.

## How a golden path test looks

A golden path test does three things: it picks an entity that the data import created, it reads that entity back through the real clients, and it asserts that the read succeeded with the declared shape. It never hard-codes a SKU, a name, or a price from the import files. It selects an entity from the database at run time, so the test survives every change to the import data.

```php
namespace PyzTest\Shared\PublishAndSynchronize\GoldenPath;

use Codeception\Test\Unit;
use PyzTest\Shared\PublishAndSynchronize\PublishAndSynchronizeGoldenPathTester;

class ProductGoldenPathTest extends Unit
{
    protected PublishAndSynchronizeGoldenPathTester $tester;

    public function testGivenImportedProductAbstractWhenReadingFromStorageThenTheDeclaredAttributesArePresent(): void
    {
        // Arrange
        $productAbstractEntity = $this->tester->pickAnyActiveProductAbstract();
        $localeName = $this->tester->getDefaultLocaleName();

        // Act
        $storageData = $this->tester->getClient()->findProductAbstractStorageData(
            $productAbstractEntity->getIdProductAbstract(),
            $localeName,
        );

        // Assert
        $this->assertNotNull($storageData, 'Product abstract was imported but did not reach storage.');
        $this->assertSame($productAbstractEntity->getIdProductAbstract(), $storageData['id_product_abstract']);
        $this->assertSame($productAbstractEntity->getSku(), $storageData['sku']);
        $this->assertArrayHasKey('name', $storageData);
        $this->assertArrayHasKey('url', $storageData);
    }

    public function testGivenImportedProductAbstractWhenReadingFromSearchThenTheDocumentExists(): void
    {
        // Arrange
        $productAbstractEntity = $this->tester->pickAnyActiveProductAbstract();
        $searchKey = $this->tester->buildProductPageSearchKey($productAbstractEntity);

        // Act
        $document = $this->tester->getSearchClient()->read($searchKey);

        // Assert
        $this->assertNotNull($document, 'Product abstract was imported but did not reach search.');
        $this->assertSame($productAbstractEntity->getSku(), $document['search-result-data']['sku']);
    }
}
```

The tester holds the small amount of project knowledge the tests need: how to pick an entity, the default store and locale, how the project builds its search keys, and how to resolve the domain storage client and the Search client. Everything else comes from the real clients.

### Rules for a golden path test

- **One entity per domain.** A second product proves no new wiring. It repeats the module test at many times the cost.
- **Identity and shape, never business values.** Assert the id and the SKU match the database row and that the declared attributes are present. Do not assert a price, a stock level, or a translated name. Those belong to the facade test of the module that produced them.
- **Pick, do not hard-code.** Select the entity from the database at run time. A test that names a SKU from the import files breaks when the files change and hides whether the wiring or the data moved.
- **Read through the real clients.** Use the domain storage client or the Search client, not a raw connection to the storage or search product. The clients are what the storefront uses, and the adapter behind them is part of what the test proves.
- **Fail early on a dirty run.** Assert empty queues and an empty error queue before any domain test.
- **No permutations.** One store and one locale per domain. A second locale earns a test only when its data reaches storage through a different code path.

## Reading a failure

A golden path failure means the configuration or the infrastructure is wrong, because the module logic behind the same entity is covered by its module test. Check, in this order: the error queue contents, the queue configuration for the domain's publish and synchronize queues, whether the publisher plugin for the domain is registered, the storage and search connection settings, and the search index mapping. If the module test of the domain also fails, fix that first; the golden path failure is a consequence.

If a golden path test fails and no module test does, and the cause turns out to be module logic, the module test is missing a case. Add it there.
