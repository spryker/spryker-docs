---
title: Data Importer Speed Optimization
originalLink: https://documentation.spryker.com/v2/docs/dataimporter-speed-optimization
redirect_from:
  - /v2/docs/dataimporter-speed-optimization
  - /v2/docs/en/dataimporter-speed-optimization
---

## Concept
**"Writing code is the easy part of every feature but writing a scalable and fast solution is a challenge"**

This article will define the best practices for Spryker modules that need to work with two infrastructure concepts like DataImport and Publish & Synchronize. After several reviews and tests, we found that we need to define these rules to help developers to write more scalable and high-performance code when they implementing their features. Most of the time when developers create features, they don't consider very high traffic or heavy data processing for big data. This article is going to describe all necessary requirements when you want to create new features and they should work with big data, for example, you want to create a new DataImport or a new P&S module which save millions of entities into a database in a very short amount of time.

## Rules for Data Importers
`DataImport` module is responsible for reading data from different formats like CSV, JSON, etc and import them into a database with proper Spryker data structure. Usually importing of data is a time-consuming process and we need to follow some best practices to increase the performance. Here you will find some of them:

### Single vs Batch operation
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
This will work fine and you already achieved to your goals, but can you see the problem here?

Here is the problem:
```php
protected function importProductAbstract(DataSetInterface $dataSet): void
{
    ...
    $productCategory = SpyCategoryQuery::create()->findOneByCategoryKey($categoryKey); // expensive call
 ...
}
```
`importProductAbstract` method will call for each line of your CSV, imagine if you have one CSV file with 1,000,000 lines, it means you will run this query again and again for 1 million times! The possible solution is to avoid single processing and implementing a batch query for it.

The current solution for DataImport is to add another step before the main step to gather all the information you need for the next steps. like querying all categories and remember them in memory and the next step can do a fast PHP look up from that result in memory. 
{% info_block warningBox "Note" %}
`DataImport` v1.4.x doesn't support the batch processing by default and the next version will provide a very clear solution for it
{% endinfo_block %}

### ORM vs PDO
ORM (Object-relational mapping) is a very good approach when we are working on very big and complex software but it's not always the answer to all problems especially when it comes to batch processing. ORM is slow by design as they need to handle so many internal hydration and mapping.

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

1. It runs two queries, one SELECT for `findOneOrCreate` and one INSERT or UPDATE for `save`.
2. Single process approach (repeated per each entry)

The solution is:

1. Avoid ORM, you can use a very simple raw SQL but you should also avoid complex raw or big raw SQL queries.  
2. Implement `DataSetWriterInterface` to achieve the batch processing approach, prepare one by one and write them once (Take a look at `ProductAbstractWriter` in `Dataimport` as an example).

### Facade Calls 
Sometimes you may need to run some validation or business logic for each data set, the easiest and safest way would be a Facade API call, that's totally fine, but then imagine if these APIs also call some heavy queries very deep! this has a huge side effect on your performance during importing millions of data.

Here you can see for each product stock, there are two facade calls, each facade call may run more than 5 queries, this means for importing 1,000,000 data, you will have 10,000,000 queries! (this will never finish!) 
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
The solution is:

1. Implement a new Facade API for batch operation  
2. Only call facade if they are very lightweight and they don't run any query to a database

### Memory management
Let's say you already started to work with the batch operation, one of the challenges would be to keep the memory as low as possible. Sometimes you create variables and try to remember them always, but you may need them only until the end of the batch operation, so it's better to release them as soon as possible.

### Database vendor approach 
In Spryker we are supporting both PostgreSQL and MySQL, both are very powerful and come with very promising and handy features. When we are working with databases, it's always good to know these features, one of the very cool features that we like is [CTE](https://www.postgresql.org/docs/9.1/queries-with.html), If you think you are inserting or updating very big data like millions of millions, use CTE as a replaceable for multiple inserts/update. you can find some of Spryker implementation in our demo shops.

## Rules for Publish and Synchronize
P&S is a concept for transferring data from Zed database to Yves databases like Redis and ES, This operation is separated into two isolated processes which call ** Publish** and **Synchronize**. Publishing is a process to aggregating data and writing it to Database and Queue. Synchronization is a process to read an aggregated message from a queue and write it to external endpoints. The performance issues mostly come from **Publishing** part. Again we need to follow the best practices to increase the performance. Here you will find some of them:

### Single vs Batch Operation
When you are creating a new listener you should consider these rules:

* Run your logic against a chunk of event messages not per each.
* Don't run the query inside of for-loop 
* Try to save them with a bulk operation, not one by one

Take a look at this example:
```php
public function publish(array $productAbstractIds): void
{
    foreach ($productAbstractIds as $idProductAbstract) {
        $productAbstractProductListStorageEntity = $this->queryProductAbstractProductListEntity($idProductAbstract);
    }
  
}
```
Here we are passing a set of ids and then we try to run a query for each product abstract. Imagine if you have 2000 events as a chunk, then you have 2000 queries to a database.

We can easily fix this by changing the query and run query only once per 2000 ids.
```php
public function publish(array $productAbstractIds): void
{
     $productAbstractProductListStorageEntities = $this->queryProductAbstractProductListEntities($productAbstractIds);
}
```
### Facade calls 
Another point that we need to be very careful here is to call Facade API without any thinking through, we must make sure that these APIs will not run queries inside same as DataImport rule. You are allowed to call Facade API but if:

* There is no query inside
* Facade API designed for batch operation (`findPriceForSku` vs `findPricesForSkus`) 

### Triggering Events
DataImporters are triggering events manually, this is happening because of performance reasons :

Triggering events automatically will generate so many duplicates events during data importing, (e.g: Inserting a Product into `spy_product` and `spy_product_localized_attrbite` table will generate two events with the same `id_product`)
Events will be triggered one by one
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
  
        // 1.Create many entities in multiple tables (e.g API bulk import, nightly update jobs)
        // 2.Trigger proper events if it's necessary ($eventFacade->triggerBulk('ProductAbstractPublish', $eventTransfers))
  
        /**
         * Enable the events triggering automatically
         */
        EventBehaviorConfig::enableEvent();
    }
```
 
 ### P&S and CTE

Sometimes the amount of the data which needs be synced is very high, for this reason, we can not rely on a standard ORM solution for storing data in the database tables. we recommend you to use bulk insert operation whenever you have more than hundreds of thousand of data. you can still use the CTE technique which was used in DataImporter before. Spryker suite comes with several examples of using CTE technique in Storage and Search module you can replace them by overwriting the Business Factory in the modules:
{% info_block warningBox "Note" %}
These examples only tested for PostgreSQL
{% endinfo_block %}


* `src/Pyz/Zed/PriceProductStorage/Business/Storage/PriceProductAbstractStorageWriter.php`
* `src/Pyz/Zed/PriceProductStorage/Business/Storage/PriceProductConcreteStorageWriter.php`
* `src/Pyz/Zed/ProductPageSearch/Business/Publisher/ProductAbstractPagePublisher.php`
* `src/Pyz/Zed/ProductPageSearch/Business/Publisher/ProductConcretePageSearchPublisher.php`
* `src/Pyz/Zed/ProductStorage/Business/Storage/ProductAbstractStorageWriter.php`
* `src/Pyz/Zed/ProductStorage/Business/Storage/ProductConcreteStorageWriter.php`
* `src/Pyz/Zed/UrlStorage/Business/Storage/UrlStorageWriter.php`

Example classes are going to be replaced with a Core CTE solution.

## Conclusion
When we are facing some batch operation, we need to think about big data and performance under heavy loading, we are not allowed to write same code that only does the job, it needs to be scalable and fast for high usages. Below you can find our main points:

* Create batch queries and processes
* Don’t use ORM for batch processing as it’s slow by design
* Don’t run separated queries for each data-set
* Don’t call any facade logic if they are slow or run internal queries
* Release memory after each bulk operations to prevent memory issues
* Use CTE technique (supported by PostgreSQL and MySQL)

<!-- Last review date: Aug 12, 2019by Oksana Karasyova -->
