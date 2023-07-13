---
title: Data importer speed optimization
description: This document defines the best practices for Spryker modules that need to work with two infrastructure concepts like DataImport and Publish & Synchronize.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/dataimporter-speed-optimization
originalArticleId: a2e441c4-b1e9-43d4-8641-b4d2ff1e26f9
redirect_from:
  - /2021080/docs/dataimporter-speed-optimization
  - /2021080/docs/en/dataimporter-speed-optimization
  - /docs/dataimporter-speed-optimization
  - /docs/en/dataimporter-speed-optimization
---

## Concept

{% info_block infoBox "Info" %}

Writing code is the easy part of every feature but writing a scalable and fast solution is a challenge.

{% endinfo_block %}

This document defines the best practices for Spryker modules that need to work with two infrastructure concepts like DataImport and Publish & Synchronize. After several reviews and tests, we decided to define these rules to help developers to write more scalable and high-performance code when they implement their features. Most of the time when developers create features, they don't consider very high traffic or heavy data processing for big data. This document describes all necessary requirements when you want to create new features and they need to work with big data. For example, you want to create a new DataImport or a new P&S module that save millions of entities into a database in a very short amount of time.

## Rules for data importers

The `DataImport` module is responsible for reading data from different formats like CSV and JSON and importing them into a database with proper Spryker data structure. Usually, data import is a time-consuming process and you need to follow some best practices to increase performance. In the following sections, you can find some of them.

### Single vs batch operation

Assuming you are writing a data importer for `ProductAbstract`, you might want to find a category for each product abstract, your very basic code would be something like this:

```php
protected function importProductAbstract(DataSetInterface $dataSet): void
{
    $categoryKey = $dataSet['category_key'];
    $productCategory = SpyCategoryQuery::create()->findOneByCategoryKey($categoryKey);
    $dataSet['product_category'] = $productCategory;
      
    $this->importProductCategories($dataSet);
}
```

This works fine and you already achieved your goals, but can you see the problem here?

Here is the problem:

```php
protected function importProductAbstract(DataSetInterface $dataSet): void
{
    ...
    $productCategory = SpyCategoryQuery::create()->findOneByCategoryKey($categoryKey); // expensive call
 ...
}
```

`importProductAbstract` method calls for each line of your CSV, imagine if you have one CSV file with 1,000,000 lines, it means you run this query again and again one million times! The possible solution is to avoid single processing and implement a batch query for it.

The current solution for `DataImport` is to add another step before the main step to gather all the information you need for the next steps. like querying all categories and remembering them in memory and the next step can do a fast PHP look-up from that result in memory.

{% info_block warningBox "Note" %}

`DataImport` v1.4.x doesn't support batch processing by default and the next version provides a very clear solution for it.

{% endinfo_block %}

### ORM vs PDO

*Object-relational mapping (ORM)* is an approach when you work on very big and complex software but it's not always the answer to all problems especially when it comes to batch processing. ORMs are slow by design because they need to handle so much internal hydration and mapping.

Here is an example of using the Propel ORM, this is a very clean and nice approach but not optimized enough for importing big data.

```php
protected function createOrUpdateProductAbstract(DataSetInterface $dataSet): SpyProductAbstract
{
    $productAbstractEntityTransfer = $this->getProductAbstractTransfer($dataSet);
  
    $productAbstractEntity = SpyProductAbstractQuery::create()
        ->filterBySku($productAbstractEntityTransfer->getSku())
        ->findOneOrCreate()
        ->save()
    ;
  
    return $productAbstractEntity;
}
```

This approach has two problems:

* It runs two queries, one SELECT for `findOneOrCreate` and one INSERT or UPDATE for `save`.
* Single process approach (repeated per each entry).

The solution is as follows:

1. Avoid ORM, you can use a very simple raw SQL but also avoid complex raw or big raw SQL queries.  
2. To achieve the batch processing approach implement `DataSetWriterInterface`, prepare one by one and write them once—take a look at `ProductAbstractWriter` in `Dataimport` as an example.

### Facade calls

Sometimes you may need to run some validation or business logic for each data set, the easiest and safest way would be a Facade API call, that's totally fine, but then imagine if these APIs also call some heavy queries very deep! this has a huge side effect on your performance during importing millions of data.

Here, you can see for each product stock, there are two facade calls, each facade call may run more than five queries. This means, for importing 1,000,000 data, you need 10,000,000 queries! (this will never finish!).

```php
protected function updateBundleAvailability(): void
{
    foreach (static::$stockProductCollection as $stockProduct) {
        if (!$stockProduct[ProductStockHydratorStep::KEY_IS_BUNDLE]) {
            continue;
        }
        $this->productBundleFacade->updateBundleAvailability($stockProduct[ProductStockHydratorStep::KEY_CONCRETE_SKU]);
        $this->productBundleFacade->updateAffectedBundlesAvailability($stockProduct[ProductStockHydratorStep::KEY_CONCRETE_SKU]);
    }
}
```

The solution is as follows:

1. Implement a new Facade API for batch operation. 
2. Only call facade if they are very lightweight, and they don't run any query to a database.

### Memory management

Let's say you already started to work with the batch operation, one of the challenges is to keep the memory as low as possible. Sometimes you create variables and try to remember them always, but you may need them only until the end of the batch operation, so it's better to release them as soon as possible.

### Database vendor approach

Spryker supports PostgreSQL, MySQL, and MariaDB. When working with databases, it's good to know their related features. For example, one of the great features is [CTE](https://www.postgresql.org/docs/9.1/queries-with.html). If you insert or update big amounts of data, like millions of millions, use CTE as a replacement for multiple inserts and updates. You can find examples of implementations in our [Demo Shops](/docs/scos/user/intro-to-spryker/intro-to-spryker.html#spryker-b2bb2c-demo-shops).

## Rules for Publish and Synchronize

P&S is a concept for transferring data from the Zed database to Yves databases like Redis and ES, This operation is separated into two isolated processes, which call *Publish* and *Synchronize*. Publishing is a process of aggregating data and writing it to Database and Queue. Synchronization is a process to read an aggregated message from a queue and write it to external endpoints. The performance issues mostly come from the *Publishing* part. Again, you need to follow the best practices to increase performance. Here, you can find some of them:

### Single vs batch operation

When creating a new listener, consider these rules:

* Run your logic against a chunk of event messages not per each.
* Don't run the query inside for-loop statements.
* Try to save them with a bulk operation, not one by one.

Take a look at this example:

```php
public function publish(array $productAbstractIds): void
{
    foreach ($productAbstractIds as $idProductAbstract) {
        $productAbstractProductListStorageEntity = $this->queryProductAbstractProductListEntity($idProductAbstract);
    }
  
}
```

Here, a set of IDs is passed, and then a query for each product abstract is run. Imagine if you have 2000 events as a chunk, then you have 2000 queries in a database.

You can easily fix this by changing the query and running the query only once per 2000 IDs.

```php
public function publish(array $productAbstractIds): void
{
     $productAbstractProductListStorageEntities = $this->queryProductAbstractProductListEntities($productAbstractIds);
}
```

### Facade calls

Another point that you need to be very careful about here is to call Facade API without any thinking through. You must make sure that these APIs do not run queries inside the same as the `DataImport` rule. You are allowed to call Facade API if the following conditions are met:

* There is no query inside.
* Facade API designed for batch operation (`findPriceForSku` versus `findPricesForSkus`).

### Triggering events

DataImporters are triggering events manually, this is happening because of performance reasons:

Triggering events automatically generates many duplicated events during data importing—for example, inserting a product into the `spy_product` and `spy_product_localized_attribute` table generates two events with the same `id_product`.
Events are triggered one by one.

You can always switch the Event Triggering process with two methods:

```php
use Spryker\Zed\EventBehavior\EventBehaviorConfig;
...
  
    public function foo()
    {
        /**
         * Disable the events triggering automatically
         */
        EventBehaviorConfig::disableEvent();
  
        // 1. Create many entities in multiple tables—for example, API bulk import, nightly update jobs)
        // 2. Trigger proper events if it's necessary ($eventFacade->triggerBulk('ProductAbstractPublish', $eventTransfers))
  
        /**
         * Enable the events triggering automatically
         */
        EventBehaviorConfig::enableEvent();
    }
```
 
### P&S and CTE

Sometimes the amount of data that needs to be synced is very high. For this reason, you can not rely on a standard ORM solution for storing data in the database tables. we recommend you use bulk insert operation whenever you have more than hundreds of thousand of data. You can still use the CTE technique, which was used in DataImporter before. Spryker suite comes with several examples of using the CTE technique. In the Storage and Search modules you can replace them by overwriting the Business Factory in the modules:

{% info_block warningBox "Note" %}

The following examples were only tested for PostgreSQL:

* `src/Pyz/Zed/PriceProductStorage/Business/Storage/PriceProductAbstractStorageWriter.php`
* `src/Pyz/Zed/PriceProductStorage/Business/Storage/PriceProductConcreteStorageWriter.php`
* `src/Pyz/Zed/ProductPageSearch/Business/Publisher/ProductAbstractPagePublisher.php`
* `src/Pyz/Zed/ProductPageSearch/Business/Publisher/ProductConcretePageSearchPublisher.php`
* `src/Pyz/Zed/ProductStorage/Business/Storage/ProductAbstractStorageWriter.php`
* `src/Pyz/Zed/ProductStorage/Business/Storage/ProductConcreteStorageWriter.php`
* `src/Pyz/Zed/UrlStorage/Business/Storage/UrlStorageWriter.php`

Example classes are going to be replaced with a Core CTE solution.

{% endinfo_block %}

## Conclusion

When facing some batch operation, think about big data and performance under heavy loading. You are not allowed to write code that only does the job, the code needs to be scalable and fast for high usage. The main points are as follows:

* Create batch queries and processes.
* Don’t use ORM for batch processing as it’s slow by design.
* Don’t run separate queries for each data set.
* Don’t call any facade logic if they are slow or run internal queries.
* Release memory after each bulk operation to prevent memory issues.
* Use the CTE technique (supported by PostgreSQL or MySQL >= 8, and MariaDB >= 10.2).