---
title: HowTo - Handle twenty five million prices in Spryker Commerce OS
originalLink: https://documentation.spryker.com/2021080/docs/howto-handle-twenty-five-million-prices-in-spryker-commerce-os
redirect_from:
  - /2021080/docs/howto-handle-twenty-five-million-prices-in-spryker-commerce-os
  - /2021080/docs/en/howto-handle-twenty-five-million-prices-in-spryker-commerce-os
---


B2B business model usually challenges any software with higher requirements to amounts of data and business complexity.

Imagine you have thousands of products and customers with unique pricing terms and conditions. A product can have thousands of prices assigned — one per customer. In this article, we share the technical challenges of handling such a number of prices and the solutions we used to solve them. 

Such a number of prices cannot be managed manually, but it is defined by business rules based on which the prices can be generated automatically. For example, you might agree on the special terms with your B2B partner, and he receives his own prices for the whole catalog. It might be considered as a discount, but usually it is not a single simple rule, but a set of rules and their priorities for each partner. These rules exist in an ERP system which can export data through SOAP or CSV files. 

In Spryker, each price is imported as a [price dimension](https://documentation.spryker.com/docs/price-per-merchant-relation-feature-overview) and has a unique key which determines its relation to a customer. For example, `specificPrice-DEFAULT-EUR-NET_MODE-FOO1-BAR2`. To appear on the Storefront, the prices should appear in Redis price entries and abstract product search documents, so that facet filters can be applied in search and categories. 


Price import flow:
![price import flow ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+handle+25+million+prices+in+Spryker+Commerce+OS/price-import-flow.jpg){height="" width=""}


## Challenges

When enabling Spryker to handle such a number of prices, we faced the following challenges: 

1. 25 000 000 prices should be imported in two separate price dimensions.

2. A product can have about 40 000 prices. This results in overpopulated product abstract search documents: each document aggregates prices of abstract products and all related concrete products. Each price is represented as an indexed field in the search document. Increasing the number of indexed fields slows ElasticSearch(ES) down. Just for comparison, the [recommended limit](https://www.elastic.co/guide/en/elasticsearch/reference/master/mapping.html#mapping-limit-settings) is 1000. 

3. Overloaded product abstract search documents cause issues with memory limit and slow down [Publish and Synchronization](https://documentation.spryker.com/docs/publish-and-synchronization). Average document size is bigger than 1 MB.

4. When more than 100 product abstract search documents are processed at a time, payload gets above 100 MB, and ES rejects queries. [AWS native service](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html) does not allow changing this limit.
The queries rejected by ES are considered successful by Spryker because the [Elastica library](https://elastica.io/) ignores the 413 error code.

5. Each price having a unique key results in more different index properties in the whole index. Key structure: `specificPrice-DEFAULT-EUR-NET_MODE-FOO1-BAR2`. This key structure requires millions of actual facets, which slows down ES too much.


## Problem

Below, is an example of a short version of the overpopulated document structure:

```json
{
	"store": "ABC",
	"locale": "en_US",
	"type": "product_abstract",
	"is-active": true,
	"integer-facet": [{
			"facet-name": "specificPrice-DEFAULT-EUR-NET_MODE-FOO1-BAR2",
			"facet-value": [319203]
		}, {
			"facet-name": "specificPrice-DEFAULT-EUR-GROSS_MODE-FOO2-BAR1",
			"facet-value": [379852]
		}, {
			"facet-name": "specificPrice-DEFAULT-EUR-NET_MODE-FOO3-BAR3",
			"facet-value": [324272]
		}, {
			"facet-name": "specificPrice-DEFAULT-EUR-GROSS_MODE-FOO4-BAR4",
			"facet-value": [385884]
		},
		{
			"facet-name": "merchantPrice-DEFAULT-EUR-NET_MODE-30",
			"facet-value": [319200]
		}, {
			"facet-name": "merchantPrice-DEFAULT-EUR-GROSS_MODE-30",
			"facet-value": [379848]
		}
	],
	"integer-sort": {
		"merchantPrice-DEFAULT-EUR-NET_MODE-30": 319200,
		"merchantPrice-DEFAULT-EUR-GROSS_MODE-30": 379848,
		"specificPrice-DEFAULT-EUR-NET_MODE-FOO-BAR": 122,
		"specificPrice-DEFAULT-EUR-GROSS_MODE-FOO1-BAR1": 379852,
		"specificPrice-DEFAULT-EUR-NET_MODE-FOO2-BAR2": 324272,
		"specificPrice-DEFAULT-EUR-GROSS_MODE-FOO3-BAR3": 385884
	}
}
```

All the `specificPrice-DEFAULT-EUR-NET_MODE-FOO-BAR` properties in the document are converted into mapping properties in ES. We hit the default limit of 1000 properties quickly and receive the following exception:

```text
\/de_search\/page\/product_abstract:de:de_de:576 caused Limit of total fields [1000] in index [de_search] has been exceeded\nindex`
```

We could increase the limit, but it makes the reindexing process a lot slower. 

The events with the data for ES are processed and acknowledged in RabbitMQ but not delivered to the search service, and we don’t get any related errors.

In AWS, the `http.max_content_length` ES limit defines the maximum payload size in an HTTP request. In our case, the payload is higher than the default limit of 100 MB without the infrastructural option to increase it. See [Amazon Elasticsearch Service Limits](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html) to learn about cloud service providers, technologies, and limits.

## Evaluated solutions

We evaluated the following solutions:

1. ES join field type
This ES functionality is similar to the classical joins in relational databases.

We chose this solution because it looked like it solved our problem faster and with less effort. See [ElasticSearch join data type - implementation](#elasticsearch-join-data-type-implementation) to learn how we implemented this solution. Also, have a look at the other evaluated solutions as they may be more appropriate in your particular case. 

Documentation: [Join field type](https://www.elastic.co/guide/en/elasticsearch/reference/current/parent-join.html)

2. Multi sharding with the `_routing` field
The idea is to avoid indexing problems by sharing big documents between shards. Breaking a huge index into smaller ones makes it easier for the search to index data. The solution is complex and does not solve the payload issues. 

Documentation: [`_routing` field](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-routing-field.html)

3. Use Postgres or combine ES and Postgres
Postgres provides search functionalities and it is possible to set up an additional database dedicated to running searches or helping ES with additional data. The `script_scoring` function in search allows to embed any data, though performance is decreased, as this script is evaluated for every document when search is being performed. 
Compared to the first option, this solution is more complex.

Documentation:
[Script score query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-score-query.html#script-score-query-ex-request)
[Chapter 12. Full Text Search](https://www.postgresql.org/docs/9.5/textsearch.html)

## ElasticSearch Join field type - implementation

To solve the ES indexing issue, we reduced the size of product abstract documents which reduced dynamic mapping properties. 

To implement the solution:

1. To be able to use the Join field type feature and declare a join relation in `search.json`, restrict the ES index to use a single type of document. Below, you can see an example of a mapping definition with a declared join relation:

```json
{
	"settings": {
		"mapping.single_type": true,
	},

	"mappings": {
		"page": {
			"properties": {
				"joined_price": {
					"type": "join",
					"relations": {
						"product_price": ["specific_price"]
					}
				}
			}
		}
	}
}
```

2. To make the product-price relation work:
	1. Extend product abstract documents with the required `joined_price` section:
    
    ```json
    product_abstract:abc:en_us:876
    {
        "store": "ABC",
        "locale": "en_US",
        "type": "product_abstract",
        "is-active": true,
        .....
        "joined_price": {
            "name": "product_price"
        }
    }
    ```

	2. Introduce a new type of price document with the following parameters:
	* parent document ID
    * price
	* currency
	* unique identifier. 
    
    Example of the price document:

    ```json
    price_product_concrete_group_specific:abc:50445:foo-bar:en_us
    {
        "joined_price": {
            "name": "specific_price",
            "parent": "product_abstract:abc:en_us:50504"
        },
        "kg_ekg": "FOO-BAR",
        "currency": "EUR",
        "price": 101
    }
    ```

These two documents can be viewed as two tables with a foreign key in terms of relational databases. 



### ElasticSearch join data type feature - side effects

The side effects of this solution are:

1. The [Product Reviews feature](https://documentation.spryker.com/docs/product-reviews) is disabled because it requires multiple document types per index. 
2. Performance requires additional attention. You can read about performance issues related to the feature in [Parent-join and performance](https://www.elastic.co/guide/en/elasticsearch/reference/current/parent-join.html#_parent_join_and_performance).
3. You can’t build proper queries to run sorting by prices due to ES limitations. Only facet filtering is possible.

### How to speed up publishing process

To implement a parent-child relationship between documents, we built a standard search module that follows [Spryker architecture](https://documentation.spryker.com/docs/publish-and-synchronization). The new price search module is subscribed to the publish and unpublish events of abstract products to manage related price documents in the search. The listener in the search module receives a product abstract ID and fetches all related prices to publish or unpublish them depending on the incoming event. Due to a big number of prices, the publish process became slow. This causes the following issues.

#### Issues
We addressed the following issues related to a slow publish process:


1. Memory limit and performance issues. As a product abstract can stand for about forty thousand prices, a table with 25 000 000 rows is parsed every time to find them. 

The default message chunk size of an event queue is 500. With this size, about two million rows of data have to be published per one bulk. 


2. The following has to be done simultaneously:
    * Trigger product abstract events to update their structure in ES
    * Trigger their child documents to be published


3. RabbitMQ connection issues. Connection is getting closed after fetching a bunch of messages because the PHP process takes too long to be executed. After processing the messages, PHP tries to acknowledge them using the old connection which has been closed by RabbitMQ. Being single-threaded, the PHP library cannot asynchronously send any heartbeats when the thread is busy with something else.
See [Detecting Dead TCP Connections with Heartbeats and TCP Keepalives](https://www.rabbitmq.com/heartbeats.html) to learn more.

#### Evaluated Solutions

We evaluated the following solutions:
 

1. Use [Common Table Expression (CTE)](https://www.postgresql.org/docs/10/queries-with.html) queries to handle bulk insert and update operations in the `_search` table. We chose this solution because we had implemented it previously. See [Data Importer Speed Optimization](https://documentation.spryker.com/docs/dataimporter-speed-optimization#data-importer-speed-optimization) to learn how this solution is used to optimize the speed of data importers. 
2. Use [PostgreSQL trigger feature](https://www.postgresql.org/docs/9.1/sql-createtrigger.html) to fill the `search` table on the insert update operations in the `entity` table.
3. Implement a reconnection logic that establishes a new connection after catching an exception.

#### Bulk insertion with raw SQL

[Postgresql CTE](http://CTE) allows to manage bulk inserts and updates of huge data amounts, which speeds up the execution of PHP processes.

<details open>
    <summary>SQL query example</summary>

```sql
WITH records AS 
( 
          SELECT    input.fkproduct, 
                    input.fkkg, 
                    input.fkekg, 
                    input.pricekey, 
                    input.fkerprecid, 
                    input.data, 
                    input.KEY, 
                    id_pyz_price_product_concrete_group_specific_search AS idpyzpriceproductconcretegroupspecificsearch
          FROM      ( 
                           SELECT Unnest(? :: varchar []) AS fkkg, 
                                  Unnest(? :: varchar []) AS fkekg, 
                                  Json_array_elements(?)  AS data, 
                                  unnest(?::integer[])    AS fkproduct, 
                                  unnest(?::varchar[])    AS pricekey, 
                                  unnest(?::varchar[])    AS fkerprecid, 
                                  unnest(?::varchar[])    AS KEY ) input 
          LEFT JOIN pyz_price_product_concrete_group_specific_search 
          ON        pyz_price_product_concrete_group_specific_search.KEY = input.KEY ), updated AS
( 
       UPDATE pyz_price_product_concrete_group_specific_search 
       SET    fk_kg = records.fkkg, 
              fk_ekg = records.fkekg, 
              fk_product = records.fkproduct, 
              data = records.data, 
              price_key = records.pricekey, 
              fk_erp_rec_id = records.fkerprecid, 
              KEY = records.KEY, 
              updated_at = now() 
       FROM   records 
       WHERE  records.KEY = pyz_price_product_concrete_group_specific_search.KEY returning id_pyz_price_product_concrete_group_specific_search ), inserted AS
( 
            INSERT INTO pyz_price_product_concrete_group_specific_search 
                        ( 
                                    id_pyz_price_product_concrete_group_specific_search, 
                                    fk_kg, 
                                    fk_ekg, 
                                    fk_product, 
                                    data, 
                                    price_key, 
                                    fk_erp_rec_id, 
                                    KEY, 
                                    created_at, 
                                    updated_at 
                        ) 
                        ( 
                               SELECT nextval('pyz_price_product_concrete_group_specific_search_pk_seq'),
                                      fkkg, 
                                      fkekg, 
                                      fkproduct, 
                                      data, 
                                      pricekey, 
                                      fkerprecid, 
                                      KEY, 
                                      now(), 
                                      now() 
                               FROM   records 
                               WHERE  idpyzpriceproductconcretegroupspecificsearch IS NULL ) returning id_pyz_price_product_concrete_group_specific_search )
SELECT updated.id_pyz_price_product_concrete_group_specific_search 
FROM   updated 
UNION ALL 
SELECT inserted.id_pyz_price_product_concrete_group_specific_search 
FROM   inserted;
```
    
</details>

### Price Events Quick Lane

Prices are published by pushing the corresponding message to the generic event queue. As this queue can hold a lot more messages than just those related to prices, it makes sense to introduce a dedicated queue for publishing only price-related information. 

You can configure it by tweaking the Event and EventBehavior modules. Allow the `EventBehavior` Propel behavior to accept additional parameters (except those related to columns). For example, allow it to accept the name of a custom queue, which is used later for pushing messages to the queue. In this case, price events are segregated from all other events and can be processed in parallel without being blocked by other heavier events. Also, this allows to configure different chunk size for the subscriber, resulting in a more optimized usage of CPU and faster processing. 


To implement this functionality:


1. Extend `EventEntityTransfer` with a new field, like `queueName`.
2. Override `\Spryker\Zed\EventBehavior\Persistence\Propel\Behavior\EventBehavior` and adjust it to be able to accept an additional `queueName` parameter (except those related to columns) through the Propel schema files. 

{% info_block errorBox %}

Ensure that `\Pyz\Zed\EventBehavior\Persistence\Propel\Behavior\ResourceAwareEventBehavior::addParameter()` is stored as a part of the `data` payload, which is saved to the`spy_event_behavior` table.

{% endinfo_block %}

3. Adjust `\Pyz\Zed\EventBehavior\Business\Model\TriggerManager::triggerEvents()` to extract the new piece of data from the payload obtained from database and set it as the value of the newly created `EventEntityTransfer::queueName` property.

4. Configure `\Spryker\Zed\Event\Business\Queue\Producer\EventQueueProducer::enqueueListenerBulk()` to check if `queueName` is set on the `EventEntityTransfer.` If it is set, this queue name should be used to push event messages to. Otherwise, it should fall back to the default event queue.

Now you should have a separate event queue for prices. This approach is applicable to any type of event. “Quick lane” ensures that critical data is replicated faster. 

### Tweaking Database

With millions of prices in a shop, we needed analytics tools to monitor data consistency in the database. The CSV files, which are the source of price data for analytics, are too big, so it’s hard to process them. That's why we decided to convert them into Postgres database tables. 

The Postgres `COPY` command is the fastest and easiest way to do that. This command copies the data from a CSV file to a database table. 

{% info_block errorBox %}

To convert data successfully, the order of the columns in the database table should reflect the order in the CSV files. 

{% endinfo_block %}


Example:

```bash
#Populate tables with data from csv files
if ! PGPASSWORD=$DB_PASSWORD psql -d $DB_NAME -h $DB_HOST -U $DB_LOGIN -p $DB_PORT -v "ON_ERROR_STOP=1" <<EOT
SET synchronous_commit TO OFF;
BEGIN;

TRUNCATE TABLE public.$DESTINATION_TABLE;
\copy public.$DESTINATION_TABLE from '$CSV_FILE' DELIMITER ';';

COMMIT;
EOT
then
    exit 1
fi
```

#### Disabling Synchronous Commit

We were running the analytics at night when there was no intensive activity in our shop. This allowed us to disable synchronous commit to reduce the processing time of the `COPY` operations. 

The following line in the previous code snippet disables synchronous commit: `SET synchronous_commit TO OFF;` 



{% info_block errorBox %}

If you disable synchronous commit, make sure to enable it back after you’ve finished importing the files.

{% endinfo_block %}




### Materialized views for analytics

Materialized view is a tool that aggregates data for analysis. Applying indexes to filterable columns in the views allows you to run `SELECT` queries faster than in relational tables.

Exemplary procedure:

1. Create an aggregated view of all the merchant prices that are already imported into a relational database with a proper normalization.

```sql
CREATE materialized VIEW IF NOT EXISTS debug_merchant_relationship_prices_view AS 
SELECT *
FROM spy_price_product_merchant_relationship;

create index IF NOT exists debug_merchant_relationship_prices_view_net_price ON debug_merchant_relationship_prices_view (net_price);
```

2. Create another view based on the table that contains the pure data copied from the original CSV source file.

```sql
CREATE materialized VIEW IF NOT EXISTS debug_merchant_relationship_prices_csv_data_view AS 
SELECT *
FROM csv_data_merchant_relationship_prices;

create index IF NOT exists csv_data_merchant_relationship_prices_net_price ON csv_data_merchant_relationship_prices (net_price);
```

3. Compare the views to detect inconsistencies. 

## Conclusion
With the configuration and customizations described in this document, Spryker can hold and manage millions of prices in one instance. RabbitMQ, internal APIs, data import modules and Glue API allow to build a custom data import to:

* Fetch a lot of data from a third-party system
* Successfully import it into the database
* Denormalize and replicate it to be used by quick storages, such as Redis and ES



